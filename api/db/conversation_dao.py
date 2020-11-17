
class ConversationDAO():

    def does_conversation_exist(self, db, user1, user2):
        try:
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
        except:
            print('error')
            return False

    def create_conversation(self, db, user1, user2, secret_key):
        cursor = db.connection.cursor()
        insert = """
            INSERT INTO
                vaunect.conversations
            (user1, user2, secret_key)
            VALUES
            (%s, %s, %s)
        """
        cursor.execute(insert, (user1, user2, secret_key))
        data = {'user1': user1, 'user2': user2, 'secret_key': secret_key}
        db.connection.commit()
        return {'results': data, 'success': True, 'status': 200}

    def get_conversation(self, db, user1, user2):
        cursor = db.connection.cursor()
        get = """
        SELECT 
            conversation_id,
            user1,
            user2,
            secret_key
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
        key = results[3].split(',')
        res = {'conversation_id': results[0], 'user1': results[1], 'user2': results[2], 'secret_key': key}
        return {'results': res, 'success': True, 'status': 200}


