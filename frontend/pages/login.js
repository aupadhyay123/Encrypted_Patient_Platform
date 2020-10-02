import Head from "next/head";
import Layout from "../components/Layout";
import LoginModal from "../components/LoginModal";
import Navbar from "../components/Navbar";

export default function Login(props) {
  return (
    <Layout id='login'>
      <Head>
        <title>LOGIN</title>
      </Head>
      <Navbar />
      <LoginModal />
    </Layout>
  );
} 