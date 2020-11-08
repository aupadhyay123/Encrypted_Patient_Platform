import Head from 'next/head';
import Link from 'next/link';

export default function Landing() {
  return (
    <div>
      <Head>
        <title>VAUNECT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href='/login'>Login</Link>
    </div>
  )
}
