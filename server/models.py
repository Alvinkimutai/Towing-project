from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
import uuid
from enum import Enum

db = SQLAlchemy()


# Enum types
class TransmissionEnum(Enum):
    manual = 'manual'
    automatic = 'automatic'


class FuelTypeEnum(Enum):
    petrol = 'petrol'
    diesel = 'diesel'


class ServiceEnum(Enum):
    towing = 'towing'
    other = 'other'


class ReviewTypeEnum(Enum):
    complaint = 'complaint'
    compliment = 'compliment'
    other = 'other'


# User Model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    roles = db.relationship('Role', secondary='user_roles', backref='users')
    vehicles = db.relationship('Vehicle', backref='user', lazy=True)
    profile = db.relationship('Profile', uselist=False, backref='user')
    garages = db.relationship('Garage', backref='user', lazy=True)
    payments = db.relationship('Payment', backref='user', lazy=True)
    reviews = db.relationship('Review', backref='user', lazy=True)
    user_chats = db.relationship('UserChat', backref='user', lazy=True)


# Role Model
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)


# UserRoles Association Table
class UserRoles(db.Model):
    __tablename__ = 'user_roles'
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), primary_key=True)
    role_id = db.Column(db.String(36), db.ForeignKey('roles.id'), primary_key=True)


# Profile Model
class Profile(db.Model):
    __tablename__ = 'profile'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    location = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# Vehicle Model
class Vehicle(db.Model):
    __tablename__ = 'vehicle'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    registration = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    photo_url = db.Column(db.String(255))
    engine = db.Column(db.String(100))
    transmission = db.Column(db.Enum(TransmissionEnum))
    fuel_type = db.Column(db.Enum(FuelTypeEnum))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# Vehicle Features Model
class VehicleFeature(db.Model):
    __tablename__ = 'vehicle_features'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    feature = db.Column(db.String(100), nullable=False)
    vehicle_id = db.Column(db.String(36), db.ForeignKey('vehicle.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# Garage Model
class Garage(db.Model):
    __tablename__ = 'garage'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    contact = db.Column(db.String(100))
    email = db.Column(db.String(100))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user_chats = db.relationship('UserChat', backref='garage', lazy=True)
    products = db.relationship('Product', backref='garage', lazy=True)
    services = db.relationship('GarageService', backref='garage', lazy=True)


# Products Model
class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    garage_id = db.Column(db.String(36), db.ForeignKey('garage.id'))


# Garage Services Model
class GarageService(db.Model):
    __tablename__ = 'garage_services'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    service = db.Column(db.String(100), nullable=False)
    service_type = db.Column(db.Enum(ServiceEnum))
    garage_id = db.Column(db.String(36), db.ForeignKey('garage.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# Service Details Model
class ServiceDetail(db.Model):
    __tablename__ = 'service_detail'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    detail = db.Column(db.Text, nullable=False)
    service_id = db.Column(db.String(36), db.ForeignKey('garage_services.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# Service Pricing Model
class ServicePricing(db.Model):
    __tablename__ = 'service_pricing'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    amount = db.Column(db.Float, nullable=False)
    detail = db.Column(db.String(255))
    service_id = db.Column(db.String(36), db.ForeignKey('garage_services.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# Payments Model
class Payment(db.Model):
    __tablename__ = 'payment'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    service_id = db.Column(db.String(36), db.ForeignKey('garage_services.id'))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# Review Model
class Review(db.Model):
    __tablename__ = 'review'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    review = db.Column(db.Text, nullable=False)
    service_id = db.Column(db.String(36), db.ForeignKey('garage_services.id'))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    review_type = db.Column(db.Enum(ReviewTypeEnum))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# User Chats Model
class UserChat(db.Model):
    __tablename__ = 'user_chats'
    chat_id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    garage_id = db.Column(db.String(36), db.ForeignKey('garage.id'))


# Chats Model
class Chat(db.Model):
    __tablename__ = 'chats'
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user_chats = db.relationship('UserChat', backref='chat', lazy=True)
