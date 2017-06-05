import xml.etree.ElementTree as ET

from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, reqparse
from flask import Response, request, json

db = SQLAlchemy()


class Guest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, name, email, pk=None):
        self.id = pk
        self.name = name
        self.email = email

    def __repr__(self):
        return '<Guest {}>'.format(self.name)

    def to_json(self):
        return {'id': self.id, 'name': self.name, 'email': self.email}

    def to_xml(self):
        return '<guest>\n<id>{}</id>\n<name>{}</name>\n<email>{}</email>\n</guest>'.format(self.id, self.name,
                                                                                           self.email)


class GuestAPI(Resource):
    def __init__(self):
        self.location = request.url.rpartition('.')[-1]
        self.resp = Response(status=200, mimetype='application/' + self.location)
        super(GuestAPI, self).__init__()

    def __set_data(self):
        if self.location == 'json':
            data = json.loads(request.data)
            self.id = data.get('id', None)
            self.name = data.get('name', None)
            self.email = data.get('email', None)
        elif self.location == 'xml':
            data = request.data
            data = ET.fromstring(data.decode())
            self.id = data.findtext('id')
            self.name = data.findtext('name')
            self.email = data.findtext('email')
        else:
            return 'Error in setting data'

    def get(self, pk=None):
        if pk:
            guest = Guest.query.get(ident=pk)
            data = {'json': json.dumps(guest.to_json()), 'xml': guest.to_xml()}[self.location]
        else:
            guests = Guest.query.all()
            data = {'json': json.dumps({'guests': [guest.to_json() for guest in guests]}),
                    'xml': '<guests>{}</guests>'.format('\n'.join([guest.to_xml() for guest in guests]))} \
                [self.location]
        self.resp.data = data
        return self.resp

    def delete(self, pk=None):
        try:
            guest = Guest.query.get(ident=pk)
            db.session.delete(guest)
            db.session.commit()
        except Exception as e:
            return str(e)
        return

    def post(self):
        self.__set_data()
        if self.name and not self.id:
            try:
                guests = Guest.query.order_by(Guest.id).all()
                pk = guests[-1].id + 1 if guests else 1
                guest = Guest(name=self.name, email=self.email, pk=pk)
                db.session.add(guest)
                db.session.commit()
                return 'Added'
            except Exception as e:
                return 'Error ', str(e)
        return 'Error ', self

    def put(self, pk=None):
        self.__set_data()
        if str(self.id) != str(pk):
            return 'Error in id'
        try:
            guest = Guest.query.get(ident=pk)
            guest.email = self.email
            guest.name = self.name
            db.session.commit()
        except Exception as e:
            return 'Error', str(e)
        return 'Updated'


class GuestJSONAPI(GuestAPI):
    pass


class GuestXMLAPI(GuestAPI):
    pass
