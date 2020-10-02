import Head from "next/head";
// next.js
import { useRouter } from "next/router";

// react.js
import { useState } from "react";

// components
import Layout from '../../components/Layout';
import Menu from '../../components/Menu';
import Content from '../../components/Content';

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

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Menu updateSection={(section) => setSection(section)} />
      <Content section={section} />
    </Layout>
  );
}