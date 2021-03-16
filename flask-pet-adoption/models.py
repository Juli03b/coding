from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, TextField, TextAreaField
from wtforms.validators import InputRequired, Optional, url, NumberRange, AnyOf
from wtforms.widgets import html5

DEFAULT_IMG_URL = "https://dkt6rvnu67rqj.cloudfront.net/cdn/ff/T8cy0-640W8sartvA9TWmv08NbGPFxsVvf8gFtBDE08/1577112797/public/styles/600x400/public/media/int_files/elephant_in_tanzania.jpg?h=f507d761&itok=Ei8OXcGi"
db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class Pet(db.Model):
    """Create a SQL entry for a pet with a name, species, photo, availability, and notes"""

    __tablename__ = 'pets'

    id = db.Column(db.Integer, autoincrement=True , primary_key=True)
    name = db.Column(db.String, nullable=False)
    species = db.Column(db.String, nullable=False)
    photo_url = db.Column(db.String, default=DEFAULT_IMG_URL)
    available = db.Column(db.Boolean, nullable=False , default=True)
    age = db.Column(db.Integer)
    notes = db.Column(db.String)

    def __repr__(self):
        return f'<Pet {self.id} {self.name}>'

class AddPetForm(FlaskForm):

    name = StringField('Name', render_kw={'class':'form-control'}, 
        validators=[InputRequired('Must enter a name')])
    species = StringField('Species', render_kw={'class':'form-control'}, 
        validators=[InputRequired('Must enter a species'), 
        AnyOf(['dog', 'cat', 'porcupine', 'Dog', 'Cat', 'Porcupine', 'CAT', 'DOG', 'PORCUPINE', 'cappy', 'Cappy'], 'We only carry dogs, cats, and porcupines')], )
    photo_url = StringField('Photo URL', render_kw={'class':'form-control'}, 
        validators=(Optional(True), url(message="Please enter a valid photo URL") ))
    age = IntegerField('Age', render_kw={'class':'form-control'}, 
        validators=[NumberRange(0, 30,"Age can't be higher than 30")])
    notes = TextAreaField('Notes', render_kw={'class':'form-control'})
    available = BooleanField('Available?', default='checked' ,render_kw={'class':'form-check-input'})
    