from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Guest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, name, email):
        self.name = name
        self.email = email

    def __repr__(self):
        return '<Guest {}>'.format(self.name)

    def to_json(self):
        return {'id': self.id, 'name': self.name, 'email': self.email}
