from unittest import TestCase
from app import app, connect_db, db, AddPetForm, Pet

app.config['WTF_CSRF_ENABLED'] = False
app.config['DB_TB_HOSTS'] = ['dont-show-debug-toolbar']

connect_db(app)

db.drop_all()
db.create_all()


class TestAdoption(TestCase):

    def setUp(self):
        Pet.query.delete()
        pet = Pet(name='Thalonious', age='1', species="cappy", available=True)
        
        db.session.add(pet)
        db.session.commit()

        self.pet = pet

    def tearDown(self):
        db.session.rollback()
        
    def test_show_pet(self):
        with app.test_client() as client:
            res = client.get(f'/{self.pet.id}')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('Thalonious', html)
        
    def test_add_pet(self):
        with app.test_client() as client:
            data = {'name':'coopie', 'species':'cat'}
            res = client.get(f'/add', data=data, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('coopie', html)
        
    def test_edit_pet(self):
        with app.test_client() as client:
            data = {'name':'cookie cat', 'species':'dog'}
            res = client.post(f'/{self.pet.id}', data=data, follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('cookie cat', html)
        
    def test_delete_pet(self):
        with app.test_client() as client:
            res = client.get(f'/{self.pet.id}/delete', follow_redirects=True)
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertNotIn('Thalonious', html)
        