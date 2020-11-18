// next.js
import Head from "next/head";

// components
import Layout from '../../components/miscellaneous/Layout';
import Menu from '../../components/dashboard/Menu';
import Content from '../../components/dashboard/Content';

// redux
import { connect } from 'react-redux';
import { updateFriends } from '../../actions/updateFriends';
import { updateFriendRequests } from '../../actions/updateFriendRequests';

// react
import { useEffect } from 'react';
import { useRouter } from "next/router";

function User(props) {
  const router = useRouter();

  console.log('user: ' + props.user);
  useEffect(() => {
    if(!props.user) {
      router.push('/login');
    }

    getFriends();
    getFriendRequests();
  }, []);

  const getFriends = () => {
    const url = 'http://localhost:5000/friends';

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user: props.user,
      }),
    })
    .then(res => {
      return res.json();
    })
    .then(({ friends }) => {
      console.log('friends', friends);
      props.updateFriends(friends);
    })
  };

  const getFriendRequests = () => {
    const url = 'http://localhost:5000/friend-requests';

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user: props.user,
      }),
    })
    .then(res => {
      return res.json();
    })
    .then(({ friend_requests }) => {
      console.log('friend requests', friend_requests);
      props.updateFriendRequests(friend_requests);
    })
  };

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Menu />
      <Content />
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  user: state.login.user
});

const dispatchStateToProps = (dispatch) => ({
  updateFriends: (friends) => dispatch(updateFriends(friends)),
  updateFriendRequests: (friendRequests) => dispatch(updateFriendRequests(friendRequests)),
});

export default connect(mapStateToProps, dispatchStateToProps)(User);