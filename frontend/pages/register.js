import Layout from "../components/miscellaneous/Layout";
import Head from "next/head";
import Navbar from '../components/miscellaneous/Navbar';
import RegisterModal from "../components/modal/RegisterModal";

export default function Register(props) {
  return (
    <Layout page='register'>
      <Head>
        <title>SIGN UP</title>
      </Head>
      <Navbar />
      <RegisterModal />
    </Layout>
  );
}