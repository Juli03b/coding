from flask import Flask, request, render_template, flash, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import connect_db, db, AddPetForm, Pet 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'OOAPs'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pets'
toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route('/')
def list_pets():
    pets = Pet.query.all()

    return render_template('list-pets.html', pets=pets)

@app.route('/add', methods=['GET', 'POST'])
def add_pet():
    form = AddPetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        notes = form.notes.data
        photo_url = form.photo_url.data
        available = form.available.data
        age = form.age.data
        pet = Pet(name=name, species=species, notes=notes, available=available, age=age)
        if photo_url:
            pet.photo_url = photo_url

        db.session.add(pet)
        db.session.commit()

        flash('Added Pet', 'success')
        return redirect('/')

    return render_template('add-pet.html', form=form)

@app.route('/<int:pet_id>', methods=['GET', 'POST'])
def show_pet(pet_id):
    pet = Pet.query.get_or_404(pet_id)
    form = AddPetForm(obj=pet)

    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        pet.age = form.age.data
        photo_url = form.photo_url.data

        if photo_url:
            pet.photo_url = photo_url

        db.session.commit()

        return redirect(f'/{pet_id}')

    return render_template('/pet.html', pet=pet, form=form)

@app.route('/<pet_id>/delete')
def delete_pet(pet_id):
    Pet.query.filter_by(id=pet_id).delete()
    db.session.commit()

    return redirect('/')

@app.route('/unavailable-pets')
def show_unavailable_pets():
    pets = Pet.query.filter_by(available=False)

    return render_template('list-pets.html', pets=pets)

@app.route('/available-pets')
def show_available_pets():
    pets = Pet.query.filter_by(available=True)
    print(pets)
    return render_template('list-pets.html', pets=pets)