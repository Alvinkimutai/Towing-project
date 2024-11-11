from datetime import datetime
from faker import Faker
from app import app, db  # Import the app object
from models import ReviewTypeEnum,ServiceEnum,FuelTypeEnum,TransmissionEnum,User, Role, Profile, Vehicle, Garage, VehicleFeature, Product, GarageService, ServicePricing, Payment, Review, UserChat, Chat, UserRoles,ServiceDetail
import uuid

# Initialize Faker
fake = Faker()

def clear_data():
    """Delete all data in the tables."""
    db.session.query(UserChat).delete()
    db.session.query(Chat).delete()
    db.session.query(ServiceDetail).delete()
    db.session.query(UserRoles).delete()
    db.session.query(VehicleFeature).delete()
    db.session.query(ServicePricing).delete()
    db.session.query(Review).delete()
    db.session.query(Payment).delete()
    db.session.query(Product).delete()
    db.session.query(GarageService).delete()
    db.session.query(Garage).delete()
    db.session.query(Vehicle).delete()
    db.session.query(Profile).delete()
    db.session.query(Role).delete()
    db.session.query(User).delete()
    db.session.commit()

def create_roles():
    """Create default roles."""
    roles = ['admin', 'user', 'mechanic']
    for role_name in roles:
        if not Role.query.filter_by(name=role_name).first():  # Ensure no duplicates
            role = Role(name=role_name)
            db.session.add(role)
    db.session.commit()

def create_users():
    """Create fake users with profiles, vehicles, and roles."""
    roles = Role.query.all()
    user_role_map = {}  # Map to ensure unique role assignments

    for _ in range(10):  # Adjust number of users
        role = fake.random_element(elements=roles)
        
        # Ensure role uniqueness for a user
        while role.id in user_role_map:
            role = fake.random_element(elements=roles)
        
        user = User(
            email=fake.email(),
            password=fake.password(),
        )
        db.session.add(user)
        db.session.flush()  # To get the user.id before committing

        # Assign the role if not already assigned
        if role not in user.roles:
            user.roles.append(role)

        # Create user profile
        profile = Profile(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            user_id=user.id,
            location=fake.city(),
        )
        db.session.add(profile)

        # Create vehicles for user
        for _ in range(fake.random_int(min=1, max=3)):  # Each user gets 1-3 vehicles
            vehicle = Vehicle(
                name=fake.word(),
                model=fake.word(),
                registration=fake.license_plate(),
                user_id=user.id,
                engine=fake.word(),
                transmission=fake.random_element(elements=[transmission.value for transmission in TransmissionEnum]),
                fuel_type=fake.random_element(elements=[fuel.value for fuel in FuelTypeEnum]),
            )
            db.session.add(vehicle)

            # Add vehicle features
            for _ in range(fake.random_int(min=1, max=2)):  # 1-2 features per vehicle
                feature = VehicleFeature(
                    feature=fake.word(),
                    vehicle_id=vehicle.id
                )
                db.session.add(feature)

        # Create a garage for mechanics
        if role.name == 'mechanic':
            garage = Garage(
                name=fake.company(),
                location=fake.address(),
                contact=fake.phone_number(),
                email=fake.company_email(),
                user_id=user.id,
                description=fake.paragraph(),
            )
            db.session.add(garage)

            # Add products to garage
            for _ in range(fake.random_int(min=1, max=5)):  # 1-5 products per garage
                product = Product(
                    name=fake.word(),
                    garage_id=garage.id,
                )
                db.session.add(product)

            # Add garage services
            for _ in range(fake.random_int(min=1, max=3)):  # 1-3 services per garage
                service = GarageService(
                    service=fake.word(),
                    service_type=fake.random_element(elements=[service.value for service in ServiceEnum]),
                    garage_id=garage.id,
                )
                db.session.add(service)

                # Add service pricing
                for _ in range(fake.random_int(min=1, max=2)):  # 1-2 pricing options per service
                    pricing = ServicePricing(
                        amount=fake.random_number(),
                        service_id=service.id,
                    )
                    db.session.add(pricing)

        db.session.commit()  # Commit after all user-related data is added

def create_payments_and_reviews():
    """Create fake payments and reviews."""
    users = User.query.all()
    garages = Garage.query.all()
    services = GarageService.query.all()
    
    payments_reviews_to_add = []  # List to accumulate payments and reviews

    for _ in range(20):  # Create 20 payments/reviews
        user = fake.random_element(elements=users)
        garage = fake.random_element(elements=garages)
        service = fake.random_element(elements=services)
        
        # Payment
        payment = Payment(
            service_id=service.id,
            user_id=user.id
        )
        payments_reviews_to_add.append(payment)

        # Review
        review_type = fake.random_element(elements=[review.value for review in ReviewTypeEnum])
        review = Review(
            review=fake.text(),
            service_id=service.id,
            user_id=user.id,
            review_type=review_type,
        )
        payments_reviews_to_add.append(review)

    db.session.bulk_save_objects(payments_reviews_to_add)  # Bulk commit payments and reviews
    db.session.commit()

def create_user_chats():
    """Create fake user chats and link them with users."""
    users = User.query.all()
    garages = Garage.query.all()

    user_chats_to_add = []

    for user in users:
        chat = Chat(message=f"Chat for {user.email}")
        db.session.add(chat)
        db.session.flush()  # To get the chat.id

        # Avoid duplicate user-chat relationships
        existing_user_chat = UserChat.query.filter_by(user_id=user.id, chat_id=chat.id).first()
        
        if not existing_user_chat:
            user_chat = UserChat(user_id=user.id, chat_id=chat.id)
            user_chats_to_add.append(user_chat)

            # Optionally, associate the garage with the user chat (for mechanic users)
            if user.roles and 'mechanic' in [role.name for role in user.roles]:
                garage = fake.random_element(elements=garages)
                user_chat.garage_id = garage.id  # Linking garage to user-chat

    db.session.bulk_save_objects(user_chats_to_add)  # Bulk commit user-chats in one go
    db.session.commit()

# Main function to seed database
def seed_database():
    with app.app_context():  # Ensure we are within the app context
        db.create_all()  # Create all tables in the database if not already created
        clear_data()  # Clear existing data before seeding
        create_roles()  # Create default roles
        create_users()  # Create fake users with associated roles and vehicles
        create_payments_and_reviews()  # Create payments and reviews
        create_user_chats()  # Create user chats

    print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()
