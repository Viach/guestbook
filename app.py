from flask import Flask, render_template
from flask_restful import Api
from models import db, GuestJSONAPI, GuestXMLAPI

app = Flask(__name__)
app.config.from_pyfile('setup.py')
api = Api(app)

db.init_app(app)


@app.route('/')
def index():
    return render_template('index.html')


api.add_resource(GuestJSONAPI, '/api/guests/<pk>.json', '/api/guests/.json')
api.add_resource(GuestXMLAPI, '/api/guests/<pk>.xml', '/api/guests/.xml')

if __name__ == '__main__':
    app.run()
