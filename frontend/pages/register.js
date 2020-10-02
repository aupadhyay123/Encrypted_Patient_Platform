import Layout from "../components/Layout";
import Head from "next/head";
import Navbar from '../components/Navbar';
import RegisterModal from "../components/RegisterModal";

export default function Register(props) {
  return (
    <Layout>
      <Head>
        <title>SIGN UP</title>
      </Head>
      <Navbar />
      <RegisterModal />
    </Layout>
  );
}