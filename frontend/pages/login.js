import Head from "next/head";
import Layout from "../components/Layout";
import Modal from "../components/Modal";

export default function Login(props) {
  return (
    <Layout>
      <Head>
        <title>LOGIN</title>
      </Head>
      <form>
        <Modal page='login' />
      </form>
    </Layout>
  );
}