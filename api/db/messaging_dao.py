

class MessagingDAO():
    def create_message(self, db, conversation_id, user, message):
        cursor = db.connection.cursor()
        insert = """
            INSERT INTO vaunect.messages 
            (conversation_id, user_id, message, time) 
            VALUES (%s, %s, %s, NOW())
        """
        cursor.execute(insert, (conversation_id, user, message))
        db.connection.commit()
        message_id = cursor.lastrowid
        data = {'message_id': message_id, 'conversation_id': conversation_id, 'user': user, 'message': message}
        return {'results': data, 'success': True, 'status': 200}

    def get_conversation(self, db, conversation_id):
        cursor = db.connection.cursor()
        get = """
        SELECT * FROM vaunect.messages
        WHERE conversation_id=%s
        """
        cursor.execute(get, (conversation_id, ))
        results = cursor.fetchall()
        print(results)
        return {'results': results, 'success': True, 'status': 200}
