from app import connect_db, app, db

connect_db(app)
db.drop_all()
db.create_all()