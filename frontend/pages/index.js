// next imports
import Head from 'next/head';
import Link from 'next/link';

// components
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import Modal from '../components/Modal';

export default function Landing() {
  return (
    <div>
      <Layout>
        <Head>
          <title>VAUNECT</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Modal page='index'/>
      </Layout>
    </div>
  );
}