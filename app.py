from flask import Flask
from flask import render_template
from flask_restful import Resource, Api
from flask import jsonify, json
from guestbook.models import db, Guest

app = Flask(__name__)
app.config.from_pyfile('setup.py')
api = Api(app)

db.init_app(app)


class GuestAPI(Resource):
    def get(self):
        guests = Guest.query.all()
        r = [guest.to_json() for guest in guests]
        return jsonify(r)


@app.route('/')
def index():
    return render_template('index.html')


api.add_resource(GuestAPI, '/api/guests')

if __name__ == '__main__':
    app.run()
