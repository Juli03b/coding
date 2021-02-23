from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import Story, stories
from random import choice

app = Flask(__name__)
app.config['SECRET_KEY'] = 'oosp'
debug = DebugToolbarExtension(app)

@app.route('/')
def welcome():
    
    return render_template('welcome.html', stories=stories)

@app.route('/story')
def story():
    if request.args['story-choice'] == 'Random':
        story = choice(stories)
    else:
        for s in stories:
            if s.template == request.args['story-choice']:
                story = s 


    return render_template('story.html', story=story.generate(request.args))