from flask_sqlalchemy import SQLAlchemy

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
        return '<id>{}</id>\n<name>{}</name>\n<email>{}</email>'.format(self.id, self.name, self.email)
