// redux
import { connect } from 'react-redux';
import { changeSection } from '../../actions/section';

function MenuItem(props) {
  const IconStyle = {
    width: props.size
  }

  return (
    <a onClick={() => props.selectSection(props.name)}>
      <img src={props.icon} style={IconStyle} />
    </a>
  );
}

const mapDispatchToProps = (dispatch) => ({
  selectSection: (section) => dispatch(changeSection(section)),
});

export default connect(null, mapDispatchToProps)(MenuItem);