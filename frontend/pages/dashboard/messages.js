// component imports
import Layout from '../../components/Layout';
import Menu from '../../components/Menu';

// next.js imports
import Head from 'next/head';

const items = [
  'profile',
  'messages',
  'search',
  'settings'
]

export default function Messages() {
  return (
    <Layout>
      <Head>
        <title>Messages</title>
      </Head>
      <Menu items={items} />
    </Layout>
  );
}