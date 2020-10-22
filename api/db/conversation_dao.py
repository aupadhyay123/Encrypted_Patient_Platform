
class ConversationDAO():

    def does_conversation_exist(self, db, user1, user2):
        cursor = db.connection.cursor()
        exist = """
        SELECT conversation_id
        FROM vaunect.conversations
        WHERE 
        user1 = %s
        AND
        user2 = %s
        """
        cursor.execute(exist, (user1, user2))
        results = cursor.fetchall()
        return len(results) == 1

    def create_conversation(self, db, user1, user2, secret_key, nonce):
        cursor = db.connection.cursor()
        insert = """
            INSERT INTO
                vaunect.conversations
            (user1, user2, secret_key, nonce)
            VALUES
            (%s, %s, %s, %s)
        """
        cursor.execute(insert, (user1, user2, secret_key, nonce))
        data = {'user1': user1, 'user2': user2, 'secret_key': secret_key, 'nonce': nonce}
        db.connection.commit()
        return {'results': data, 'success': True, 'status': 200}

    def get_conversation(self, db, user1, user2):
        cursor = db.connection.cursor()
        get = """
        SELECT 
            conversation_id,
            user1,
            user2,
            secret_key,
            nonce
        FROM 
            vaunect.conversations
        WHERE
            user1 = %s
        AND
            user2 = %s
        """
        cursor.execute(get, (user1, user2))
        results = cursor.fetchone()
        print(results)
        res = {'conversation_id': results[0], 'user1': results[1], 'user2': results[2], 'secret_key': results[3], 'nonce': results[4]}
        return {'results': res, 'success': True, 'status': 200}


