// css
import styles from './Menu.module.css';

// component imports
import MenuItem from './MenuItem';

// redux
import { connect } from 'react-redux';
import { changeSection } from '../../actions/section';

function Menu(props) {
  return (
    <div className={styles.container}>
      <MenuItem icon='/images/icons/profile.png' size='30px' onClick={() => props.selectSection('profile')} />
      <MenuItem icon='/images/icons/messages.png' size='30px' onClick={() => props.selectSection('messages')} />
      <MenuItem icon='/images/icons/search.png' size='30px' onClick={() => props.selectSection('search')} />
      <MenuItem icon='/images/icons/settings.png' size='30px' onClick={() => props.selectSection('settings')} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectSection: (section) => dispatch(changeSection(section)),
  };
};

export default connect(null, mapDispatchToProps)(Menu);