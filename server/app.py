from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User, Role, Profile, Vehicle, VehicleFeature, Garage, Product, GarageService, ServiceDetail, ServicePricing, Payment, Review, UserChat, Chat
from datetime import datetime
import uuid
from config import Config

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

# Initialize database and migration
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)

# Home route
@app.route('/')
def home():
    return "Welcome to the Towing Management System API!"

# --- User Routes ---
# Create a new user
@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(
        email=data['email'],
        password=data['password'],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created", "user_id": new_user.id}), 201

# Get all users
@app.route('/users', methods=['GET'])
def get_users():
    allUsers = []
    users = User.query.all()
    for user in users:
       users_json = {
           "id": user.id,
           "email": user.email,
           "created_at": user.created_at,
           "updated_at": user.updated_at
       }
       allUsers.append(users_json)
    
    return make_response(jsonify(allUsers), 200)

# Get a user by ID
@app.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({"email": user.email, "created_at": user.created_at}), 200

# --- Profile Routes ---
# Create a profile
@app.route('/profiles', methods=['POST'])
def create_profile():
    data = request.get_json()
    new_profile = Profile(
        first_name=data['first_name'],
        last_name=data['last_name'],
        user_id=data['user_id'],
        location=data['location'],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.session.add(new_profile)
    db.session.commit()
    return jsonify({"message": "Profile created", "profile_id": new_profile.id}), 201

# Get a profile by user_id
@app.route('/profiles/<user_id>', methods=['GET'])
def get_profile(user_id):
    profile = Profile.query.filter_by(user_id=user_id).first_or_404()
    return jsonify({
        "first_name": profile.first_name,
        "last_name": profile.last_name,
        "location": profile.location,
        "created_at": profile.created_at
    }), 200

# --- Vehicle Routes ---
# Create a new vehicle
@app.route('/vehicles', methods=['POST'])
def create_vehicle():
    data = request.get_json()
    new_vehicle = Vehicle(
        name=data['name'],
        model=data['model'],
        registration=data['registration'],
        user_id=data['user_id'],
        photo_url=data['photo_url'],
        engine=data['engine'],
        transmission=data['transmission'],
        fuel_type=data['fuel_type'],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify({"message": "Vehicle created", "vehicle_id": new_vehicle.id}), 201

# Get all vehicles
@app.route('/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([{"id": vehicle.id, "name": vehicle.name} for vehicle in vehicles]), 200

# Get a specific vehicle by ID
@app.route('/vehicles/<vehicle_id>', methods=['GET'])
def get_vehicle(vehicle_id):
    vehicle = Vehicle.query.get_or_404(vehicle_id)
    return jsonify({
        "name": vehicle.name,
        "model": vehicle.model,
        "registration": vehicle.registration,
        "engine": vehicle.engine,
        "transmission": vehicle.transmission,
        "fuel_type": vehicle.fuel_type
    }), 200

# --- Garage Routes ---
# Create a new garage
@app.route('/garages', methods=['POST'])
def create_garage():
    data = request.get_json()
    new_garage = Garage(
        name=data['name'],
        location=data['location'],
        contact=data['contact'],
        email=data['email'],
        user_id=data['user_id'],
        description=data['description'],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.session.add(new_garage)
    db.session.commit()
    return jsonify({"message": "Garage created", "garage_id": new_garage.id}), 201

# Get a garage by ID
@app.route('/garages/<garage_id>', methods=['GET'])
def get_garage(garage_id):
    garage = Garage.query.get_or_404(garage_id)
    return jsonify({
        "name": garage.name,
        "location": garage.location,
        "contact": garage.contact,
        "email": garage.email,
        "description": garage.description
    }), 200

# --- Service Routes ---
# Create a new garage service
@app.route('/garage_services', methods=['POST'])
def create_service():
    data = request.get_json()
    new_service = GarageService(
        service=data['service'],
        service_type=data['service_type'],
        garage_id=data['garage_id'],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.session.add(new_service)
    db.session.commit()
    return jsonify({"message": "Service created", "service_id": new_service.id}), 201

# Get all services for a garage
@app.route('/garage_services/garage/<garage_id>', methods=['GET'])
def get_services_by_garage(garage_id):
    services = GarageService.query.filter_by(garage_id=garage_id).all()
    return jsonify([{"service": service.service, "type": service.service_type} for service in services]), 200

# --- Payment Routes ---
# Create a new payment
@app.route('/payments', methods=['POST'])
def create_payment():
    data = request.get_json()
    new_payment = Payment(
        service_id=data['service_id'],
        user_id=data['user_id'],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.session.add(new_payment)
    db.session.commit()
    return jsonify({"message": "Payment created", "payment_id": new_payment.id}), 201

# Get payment history by user
@app.route('/payments/user/<user_id>', methods=['GET'])
def get_payments_by_user(user_id):
    payments = Payment.query.filter_by(user_id=user_id).all()
    return jsonify([{"service_id": payment.service_id, "created_at": payment.created_at} for payment in payments]), 200

# --- Chat Routes ---
# Create a chat for a user and garage
@app.route('/chats', methods=['POST'])
def create_chat():
    data = request.get_json()
    new_chat = Chat(
        message=data['message'],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.session.add(new_chat)
    db.session.commit()
    
    new_user_chat = UserChat(
        user_id=data['user_id'],
        garage_id=data['garage_id'],
        chat_id=new_chat.id
    )
    db.session.add(new_user_chat)
    db.session.commit()
    return jsonify({"message": "Chat created", "chat_id": new_chat.id}), 201

# Get all chats for a user and garage
@app.route('/chats/user/<user_id>/garage/<garage_id>', methods=['GET'])
def get_chats(user_id, garage_id):
    user_chats = UserChat.query.filter_by(user_id=user_id, garage_id=garage_id).all()
    return jsonify([{"chat_id": chat.chat_id, "message": chat.chats.message} for chat in user_chats]), 200


# Start the Flask app
if __name__ == "__main__":
    app.run(port=5555, debug=True)
