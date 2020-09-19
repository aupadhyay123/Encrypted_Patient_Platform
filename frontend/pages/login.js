import Head from "next/head";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";

export default function Login(props) {
  return (
    <Layout>
      <Head>
        <title>LOGIN</title>
      </Head>
      <Navbar />
      <Modal page='login' />
    </Layout>
  );
}