// next imports
import Head from 'next/head';
import Link from 'next/link';

// components
import Navbar from '../components/miscellaneous/Navbar';

export default function Landing() {
  return (
    <div>
      <Head>
        <title>VAUNECT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <img src={'/images/logo.png'} style={{width:'40%', position: 'relative', marginTop: '10%', left: '30%'}}/>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <img src={'/images/HomeScreen.png'} style={{width:'100%'}}/>

      <img src={'/images/HomeGradient.png'} style={{width: '85%', marginTop: '250px', marginBottom: '-150px', position: 'relative', left: '7.5%'}} />

      <div style={{backgroundColor: 'black'}}>
      <p style={{color: 'white', width: '80%', position: 'relative', left: '10%'}}> 
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
          <h1 style={{color: '#9AC355'}}>VAUNECT™</h1>
          <br></br> 
          <br></br>
          <strong>noun</strong>
          <br></br> 
          Refers to the secure, private communication system, and the associated VAUNECT™ 
          online service and App, of the VAULTCAST® Secure Digital Network (SDN), that provides secure 
          electronic communications between its members. 
          <br></br>
          <br></br>
          - “I downloaded the VAUNECT™ App on my iPhone and was securely communicating with my colleagues" 
          <br></br>
          <br></br>
          <strong>verb</strong> 
          <br></br>
          vaunect™; 3rd person present: vaunects™; 
          past tense: vaunected™; past participle: vaunected™; gerund or present participle: vaunecting™ 
          bring together or into contact, within the VAULTCAST® Secure Digital Network (SDN), so that a 
          virtual, digital, electronic, or notional connection or link is established. 
          <br></br>
          <br></br>
          - join together, within the VAULTCAST® Secure Digital Network, so as to provide access and communication
          <br></br>
          - "the office and their clients were vaunected™ to each other” 
          <br></br>
          - "I communicate securely online by being vaunected™ with my clients" 
          <br></br>
          <br></br>
          synonyms: connect, attach, join, fasten, fix, affix, couple, link, secure, hitch 
          <br></br>
          <br></br>
          - put (someone) into contact by electronic mail, messaging, or other 
          methods of electronic communications associate or relate in some respect 
          <br></br>
          - "employees are rewarded with bonuses based on their vaunection™ with their company's performance”
          <br></br>
          <br></br>
          synonyms: connect with, associate with, link to/with, couple with; 
          <br></br>
          <br></br>
          - think of as being linked, related, or having a relationship with (someone or thing) 
          <br></br>
          - “John and I vaunected™ through VAULTCAST®” 
          <br></br>
          <br></br>
          - form a relationship or feel an affinity 
          <br></br>
          - "I was looking for a new doctor online and I vaunected™ with Dr. Jones through VAULTCAST®”
      </p>
      <br></br><br></br><br></br><br></br><br></br><br></br>
      </div>

      <div className='Footer'>
        <br></br>
        <p style={{textAlign: 'center', fontSize: '18px', width: '80%', position: 'relative', left: '10%'}}>VAULTCAST®, VAUNECT™, "Securing eLife", "Securing eConnections", VAUNECTIONS™(Vaunected™, 
          Vaunecting™, Disvaunect™, and other tenses/varations of the word VAUNECT®), and the logos, 
          icons, slogans and taglines are trademarks or registered trademarks of VAULTCAST, INC.</p>
        <br></br>
        <p style={{textAlign: 'center', fontSize: '20px'}}>© 2016-2020 VAULTCAST, INC.</p>
        <br></br>
      </div>
    </div>
  );
}