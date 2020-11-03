// css
import styles from './Search.module.css';

// react.js
import { useState, useEffect } from 'react';

// next.js
import { useRouter } from 'next/router';

// redux
import { connect } from 'react-redux';
import { friendQuery } from '../../actions/friendQuery';
import { friendResults } from '../../actions/friendResults';

// components
import SearchResult from './SearchResult';

function Search(props) {
  useEffect(() => {
    console.log('Search Query: ' + props.friendQuery);
    if(props.friendQuery) {
      const url = 'http://localhost:5000/search';
      fetch(url, {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          query: props.friendQuery,
          user: props.user
        })
      })
      .then(res => {
        return res.json()
      })
      .then(data => {
        console.log(data['results']);
        props.setFriendResults(data['results']);
      })
      .catch(error => {
        console.log("Fetch error: " + error);
      })
    }
    else {
      props.setFriendResults([]);
    }
  }, [props.friendQuery]);

  const Results = props.friendResults.map(user => (
    <SearchResult key={user['username']} username={user['username']} status={user['status']}/>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input autoFocus type='text' placeholder={'Search for users...'} value={props.friendQuery} onChange={(e) => props.setFriendQuery(e)} />
      </div>
      <div className={styles.results}>
        {Results}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  friendQuery: state.friendQuery.friendQuery,
  friendResults: state.friendResults.friendResults,
  user: state.login.user,
});

const dispatchStateToProps = (dispatch) => ({
  setFriendQuery: (e) => dispatch(friendQuery(e.target.value)),
  setFriendResults: (results) => dispatch(friendResults(results)),
});

export default connect(mapStateToProps, dispatchStateToProps)(Search);