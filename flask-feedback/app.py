from flask import Flask, render_template, request, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import User, UserForm, Feedback, FeedbackForm, connect_db, db
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
toolbar = DebugToolbarExtension()

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'SECKR'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

connect_db(app)
db.create_all()

@app.route('/')
def redirect_to_register():

    return redirect('/register')

@app.route('/register', methods=['GET', 'POST'])
def register():

    if 'username' in session and User.query.get(session.get('username', None)):

        # flash('Still logged in!!!', 'danger')
        return redirect(f'/users/{session["username"]}')

    form = UserForm()

    if form.validate_on_submit():
        username = form.username.data
        email = form.email.data
        password = form.password.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        user = User.register(username=username, email=email, password=password, first_name=first_name, last_name=last_name)
        
        db.session.add(user)

        try:
            db.session.commit()
        except IntegrityError as err:
            flash('Usename has already been registered', 'danger')
        
            return redirect('/')

        session['username'] = user.username

        flash('Successfully registered!', 'success')
        return redirect(f'/users/{user.username}')
    
    return render_template('register.html', form=form)

@app.route('/login', methods=["GET", "POST"])
def login():

    form = UserForm.login_form()

    if form.validate_on_submit():
        user = User.authenticate(username=form.username.data, password=form.password.data)

        if user:
            session['username'] = user.username
        else:
            flash('Account does not exist', 'warning')
            return redirect('/login')

        flash('Logged in', 'success')
        return redirect(f'/users/{user.username}')

    return render_template('login.html', form=form)
        

@app.route('/users/<username>')
def show_user(username):
    if 'username' in session:
        user = User.query.get(username)
        if user:
            return render_template('user.html', user=user)

        flash('User does not exist', 'warning')
        return redirect('/')
        
    flash('no', 'danger')

    return redirect('/')

@app.route('/logout', methods=['POST'])
def logout():
    if 'username' in session:
        session.pop('username')
        flash('Logged out', 'warning')
        return redirect('/')
    
    flash('Not logged in', 'warning')
    return redirect('/')

@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    if 'username' in session:
        User.query.filter_by(username=username).delete()
        db.session.commit()
        session.pop('username')

        flash('Successfully deleted!', 'success')
        return redirect('/')
    
    return redirect(f'/users/{username}')

@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def feedback_add(username):

    form = FeedbackForm()

    if form.validate_on_submit() and 'username' in session:
        feedback = Feedback(title=form.title.data, content=form.content.data, username=username)

        db.session.add(feedback)
        db.session.commit()

        return redirect(f'/users/{username}')

    return render_template('add-feedback.html', form=form)
    
@app.route('/feedback/<feedback_id>/update', methods=['GET', 'POST'])
def feedback_update(feedback_id):
    feedback = Feedback.query.get(feedback_id)
    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.commit()

        flash('Feedback updated!', 'success')
        return redirect('/')

    return render_template('edit-feedback.html', form=form)

@app.route('/feedback/<feedback_id>/delete', methods=['POST'])
def feedback_delete(feedback_id):

    if 'username' in session:
        Feedback.query.filter_by(id=feedback_id).delete()
        db.session.commit()

        flash('Successfully deleted!', 'success')
        return redirect('/')
    
    return redirect('/')