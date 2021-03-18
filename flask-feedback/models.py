from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import input_required, optional
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()
form_styles = {
    'input': 'form-control'
}

def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):

    __tablename__ = 'users'

    username = db.Column(db.String(20), primary_key=True)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)

    feedback = db.relationship('Feedback', backref='user', passive_deletes=True)

    def __repr__(self):
        return f'<User {self.username} {self.email}>'

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    @classmethod
    def register(cls, username , password, email, first_name, last_name):
        pw = bcrypt.generate_password_hash(password)
        pw = pw.decode('utf8')

        return cls(username=username, password=pw, email=email, first_name=first_name, last_name=last_name)

    @classmethod
    def authenticate(cls , username, password):
        user = User.query.get(username)
        if user and bcrypt.check_password_hash(user.password, password):

            return user

        return False

class Feedback(db.Model):

    __tablename__ = 'feedback'

    id = db.Column(db.Integer, primary_key=True, auto_increment=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(150), nullable=False)
    username = db.Column(db.String(20), db.ForeignKey('users.username', ondelete='CASCADE'), nullable=False)

class UserForm(FlaskForm):

    username = StringField('Enter Username', 
        validators=[input_required("You must enter a username")], render_kw={'class':f'{form_styles["input"]}', 'placeholder':'Username'})
    password = PasswordField('Enter password', render_kw={'class':f'{form_styles["input"]}', 'placeholder':'Password'},
        validators=[input_required("You must enter a password")])
    email = StringField('Enter Email', render_kw={'class':f'{form_styles["input"]} my-1', 'placeholder':'Email'},
        validators=[input_required("You must enter an email")])
    first_name = StringField('Enter first name', render_kw={'class':f'{form_styles["input"]}', 'placeholder':'First name'},
        validators=[input_required("You must enter an name")])
    last_name = StringField('Enter last name', render_kw={'class':f'{form_styles["input"]}', 'placeholder':'Last name'},
        validators=[input_required("You must enter an name")])

    @classmethod
    def login_form(cls):
        form = cls()
        del form.email
        del form.first_name
        del form.last_name

        return form

class FeedbackForm(FlaskForm):

    title = StringField('Enter a title', render_kw={'class':f'{form_styles["input"]}', 'placeholder':'Title'},
        validators=[input_required("You must enter a title")])
    content = StringField('Content', render_kw={'class':f'{form_styles["input"]}', 'placeholder':'Content'},
        validators=[input_required("Content required")])
    