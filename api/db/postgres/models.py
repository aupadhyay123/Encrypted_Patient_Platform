from app import db
global db


class BaseModel(db.Model):
    # Base data model for all objects
    __abstract__ = True
    # define here common methods to be used amongst db classes that you need for all your models

class UserManagementModel(BaseModel):
    #model for one of your table"""
     __tablename__ = 'pg_user'
    # define your model
