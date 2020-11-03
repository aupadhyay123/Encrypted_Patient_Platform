// components
import MessageList from './MessageList';
import Conversation from './Conversation';
import AddButton from './AddButton';

// next.js
import { useRouter } from "next/router";

// css
import styles from './Messages.module.css';
import { useState } from 'react';

export default function Messages() {
  const [conversation, setConversation] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.addContainer}>
          <AddButton size='20px' />
        </div>
        <MessageList selectConversation={(conversation) => setConversation(conversation)} />
      </div>
      <Conversation selected={conversation} />
    </div>
  );
}