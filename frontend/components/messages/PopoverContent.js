// redux
import { connect } from 'react-redux';

export default function PopoverContent() {
  return (
    <div style={{backgroundColor:'red', padding:'25px'}}>
      <h1>hello</h1>
    </div>
  );
}

const mapStateToProps = (state) => ({
  friends: state.friends.friends,
});

// export default connect(mapStateToProps)(PopoverContent);