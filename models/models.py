from datetime import datetime
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

# Enables Instance Folder Configuration (instance_relative_config=True) 
app = Flask(__name__, instance_relative_config=True)

# Configuration File From Instance Folder
app.config.from_pyfile('models_config.py')

db = SQLAlchemy(app)

# User Class
class User(db.Model):
    __tablename__ = 'user'
    u_id = db.Column(db.Integer, primary_key=True)
    u_email = db.Column(db.String(255), unique=True, nullable=False)
    u_nombre = db.Column(db.String(300), unique=False, nullable=False)
    u_telefono = db.Column(db.String(20), unique=False, nullable=True)
    u_usuariocm = db.Column(db.String(15), unique=False, nullable=False)
    u_notificaciones = db.Column(db.Boolean, unique=False, nullable=True)
    u_habilitado = db.Column(db.Boolean, unique=False, nullable=True, default=True)
    u_fecha_creacion = db.Column(db.DateTime, unique=False, nullable=False, index=True, default=datetime.utcnow)
    u_roles = db.relationship('UserRoles', secondary='user_x_role', lazy='subquery', backref=db.backref('user', lazy=True))

    def __repr__(self):
        return jsonify(
            id = self.u_id,
            email = self.u_email,
            nombre = self.u_nombre,
            telefono = self.u_telefono,
            usuariocm = self.u_usuariocm,
            notificaciones = self.u_notificaciones,
            roles = self.u_roles
        )


# Role Class
class UserRole(db.Model):
    __tablename__ = 'user_role'
    ur_id = db.Column(db.Integer, primary_key=True)
    ur_nombre = db.Column(db.String(60), unique=True, nullable=False)
    ur_habilitado = db.Column(db.Boolean, unique=False, nullable=True, default=True)
    ur_usuarios = db.relationship('RoleUsers', secondary='user_x_role', lazy='subquery', backref=db.backref('user_role', lazy=True))

    def __repr__(self):
        return jsonify(
            id = self.ur_id,
            nombre = self.ur_nombre
        )


# User Roles Class
class UserXRole(db.Model):
    __tablename__ = 'user_x_role'
    uxr_user_id = db.Column(db.Integer, db.ForeignKey('user.u_id'), primary_key=True)
    uxr_user_role_id = db.Column(db.Integer, db.ForeignKey('user_role.ur_id'), primary_key=True)
    uxr_fecha_creacion = db.Column(db.DateTime, unique=False, nullable=False, index=True, default=datetime.utcnow)
