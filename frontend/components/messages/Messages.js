// components
import MessageList from './MessageList';
import Conversation from './Conversation';
import PopoverContent from './PopoverContent';

// redux
import { connect } from 'react-redux';

// css
import styles from './Messages.module.css';
import { useRef, useState } from 'react';

// react-popover
import Popover from 'react-popover';

function Messages(props) {
  const [open, setOpen] = useState(false);

  const content = (
    <div style={{backgroundColor:'red', padding:'25px'}}>
      <h1>hello</h1>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div className={styles.addContainer}>
          <Popover preferPlace={'right'} isOpen={open} body={content}>
            <div className={styles.addButton} onClick={() => setOpen(!open)}>
              <img src={'/images/icons/plus.png'} />
            </div>
          </Popover>
        </div>
        <MessageList />
      </div>
      <Conversation />
    </div>
  );
}

const mapStateToProps = (state) => ({
  friends: state.friends.friends,
});

export default connect(mapStateToProps)(Messages);