from config.db import app, db, ma

class Users (db.Model):
    __tablename__ = "tblusers"

    id = db.Column(db.Integer, primaty_key = True)
    fullname = db.Column(db.String(100))
    email = db.Column(db.String(100))

    def __init__(self, fullname, email):
        self.fullname = fullname
        self.email = email

with app.app_context():
    db.create_all()


class UsersSchema(ma.Schema):
    class Meta:
        fields = ('id' , 'fullname', 'email')