from marshmallow import Schema, fields

class UserAccountSchema(Schema):
  user_id         = fields.Int(required=True)
  user_first_name = fields.Str()
  user_last_name  = fields.Str()
  user_type       = fields.Str()
  user_email      = fields.Str()
  user_dob_year   = fields.Int()
  user_dob_month  = fields.Int()
  user_dob_day    = fields.Int()

