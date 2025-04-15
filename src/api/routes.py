"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint #request is imported to get access to the body
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#creates a token to login
@api.route('/login', methods=['POST'])
def handle_login():
    email_value = request.json.get("email") #allows access to email from the body, this should match the key in the body of the object, this line is needed to create the token
    password_value = request.json.get("password") #allows access to the password, should match the key in th ebody of the object
    find_user = User.query.filter_by(email=email_value).first() #email refers to the column of the table in models.py 
                    # filtering through an array of objects until there is the first match and then it stops looping through 
    if not check_password_hash(find_user.password,password_value): #this is the encrypted password, that is decoded using the check pw hash and comparing to the pw the user typed
                            #variable.key from models table.variable, the check pw hash returns true or false    
        return jsonify("incorrect password")
            #if the entered pw does not match then the token will not be created and will return the message in ""
           
                    
    token = create_access_token(identity=email_value) #this creates a token when someone logs in, connected to the user via identity=email_value

    return jsonify(token_value = token), 200 

@api.route('/signup', methods=['POST'])
def handle_signup():
    email_value = request.json.get("email") 
    password_value = request.json.get("password") 
    find_user = User.query.filter_by(email=email_value).first() 
    new_user =User(
        email = email_value,
        password = generate_password_hash(password_value) #creates encryption with the generate pw hash imported when new user creates a password
    )  #this is the syntax when creating something in the database, start with the name of the table, the value of the column=the variable given here
    db.session.add(new_user)  #line 34 and 35 is similar to git add, git commit, git push but for the back end
    db.session.commit()              
  
    return jsonify("User created"), 200 
