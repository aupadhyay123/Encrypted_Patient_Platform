import Head from "next/head";
// next.js
import { useRouter } from "next/router";

// react.js
import { useState } from "react"

// components
import Layout from '../../components/Layout';
import Menu from '../../components/Menu';

const sections = [
  'profile',
  'messages',
  'search',
  'settings'
]

export default function User() {
  const [section, setSection] = useState('messages');

  const router = useRouter();
  const { user } = router.query;

  const Content = () => {
    if(section === 'messages') {
      
    }
    else if(section === 'profile') {

    }
    else if(section === 'settings') {

    }
    else if(section === 'search') {

    }
  };

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Menu />
      {/* <Content /> */}
    </Layout>
  );
}