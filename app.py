from flask import Flask, render_template, json
from flask_restful import Resource, Api, reqparse
from guestbook.models import db, Guest

app = Flask(__name__)
app.config.from_pyfile('setup.py')
api = Api(app)

db.init_app(app)


class GuestAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('id', type=int, location='json')
        self.reqparse.add_argument('name', type=str, location='json')
        self.reqparse.add_argument('email', type=str, location='json')
        super(GuestAPI, self).__init__()

    def get(self, pk=None):
        if pk:
            guest = Guest.query.get(ident=pk)
            return guest.to_json() if guest else {'Error': 'Something wrong in request data'}
        else:
            guests = Guest.query.all()
            r = {'guests': [guest.to_json() for guest in guests]}
            return r

    def post(self):
        args = self.reqparse.parse_args()
        if args['name'] and not args['id']:
            guests = Guest.query.order_by(Guest.id).all()
            pk = guests[-1].id + 1
            guest = Guest(name=args['name'], email=args['email'], pk=pk)
            db.session.add(guest)
            db.session.commit()
            return {'Status': 'Added'}
        return {'Error': 'Error in POST'}

    def delete(self, pk=None):
        try:
            guest = Guest.query.get(ident=pk)
        except:
            return {'Error': 'Something wrong in request data'}
        db.session.delete(guest)
        db.session.commit()
        return {'Status': 'Deleted'}

    def put(self, pk=None):
        try:
            guest = Guest.query.get(ident=pk)
        except:
            return {'Error': 'Something wrong in request data'}
        guest.email = '&&&&&&&&&&&&&&&&'
        db.session.commit()
        return {'Status': 'Deleted'}


@app.route('/')
def index():
    return render_template('index.html')


api.add_resource(GuestAPI, '/api/guests/<pk>', '/api/guests/')

if __name__ == '__main__':
    app.run()
