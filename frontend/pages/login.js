import Head from "next/head";
import Layout from "../components/miscellaneous/Layout";
import LoginModal from "../components/modal/LoginModal";
import Navbar from "../components/miscellaneous/Navbar";

export default function Login(props) {
  return (
    <Layout page='login'>
      <Head>
        <title>LOGIN</title>
      </Head>
      <Navbar />
      <LoginModal />
    </Layout>
  );
} 