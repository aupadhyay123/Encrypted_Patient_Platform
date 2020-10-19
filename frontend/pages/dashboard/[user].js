// next.js
import Head from "next/head";

// components
import Layout from '../../components/miscellaneous/Layout';
import Menu from '../../components/dashboard/Menu';
import Content from '../../components/dashboard/Content';

// redux
import { connect } from 'react-redux';

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
  });

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

export default connect(mapStateToProps)(User);