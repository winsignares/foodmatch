from flask import Flask, Blueprint, request, redirect,render_template,jsonify
from config.db import db,app,ma

from models.UserModel import Users, UsersSchema

usuario_schema = UsersSchema()
usuarios_schema = UsersSchema(many=True)

ruta_user = Blueprint("ruta_user", __name__)

@ruta_user.route("/user", methods=["GET"])
def all_users():
    resultAll = Users.query.all()
    resp = usuarios_schema(resultAll)
    return jsonify(resp)

@ruta_user.route("/saveUser", methods=["POST"])
def save_user():
    fullname = request.json["fullname"]
    email = request.json["email"]
    new_user = Users(fullname,email)
    db.session.add(new_user)
    db.session.commit()
    return "Datos guardados" 
