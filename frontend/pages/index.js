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
        <Head>
          <title>VAUNECT</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />

        <img src={'/images/logo.png'} style={{width: '60%', position: 'relative', marginTop: '10%', left: '20%'}} />
      
    </div>
  );
}