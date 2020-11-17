// redux
import { connect } from 'react-redux';
import { changeSection } from '../../actions/section';
import styles from './MenuItem.module.css';

function MenuItem(props) {
  const IconStyle = {
    width: props.size
  }

  return (
    <a className={styles.menuItemContainer} onClick={() => props.selectSection(props.name)}>
      <img src={props.icon} style={IconStyle} />
      <span className={styles.tooltip}>{props.name}</span>
    </a>
  );
}
const mapDispatchToProps = (dispatch) => ({
  selectSection: (section) => dispatch(changeSection(section)),
});
export default connect(null, mapDispatchToProps)(MenuItem);