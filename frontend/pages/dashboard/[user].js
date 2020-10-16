// next.js
import Head from "next/head";

// components
import Layout from '../../components/miscellaneous/Layout';
import Menu from '../../components/dashboard/Menu';
import Content from '../../components/dashboard/Content';

export default function User(props) {
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