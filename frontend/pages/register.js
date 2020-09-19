import { useState } from 'react';
import Layout from "../components/Layout";
import Head from "next/head";
import Navbar from '../components/Navbar';
import Modal from "../components/Modal";

export default function Register(props) {
  return (
    <Layout>
      <Head>
        <title>SIGN UP</title>
      </Head>
      <Navbar />
      <Modal page='register' />
    </Layout>
  );
}