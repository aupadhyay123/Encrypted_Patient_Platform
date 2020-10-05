// css
import styles from './Profile.module.css';

export default function Profile(props) {
  return (
    <div>

        <img src={'/images/ProfilePic.png'} style={{width:'20%', position: 'relative', marginTop: '1%', left: '40%'}}/>
        <br></br>
        <h1 style={{position: 'relative', textAlign: 'center'}}>Hello, John Galdones</h1>
        <p style={{textAlign: 'center'}}><h4><a href={'google.com'} style={{color: 'black'}}>12 Connections</a>   |   <a href={'google.com'} style={{color: 'black'}}>1 Pending Connection</a></h4></p>
        <br></br>

        <div className={styles.medicalDocs}>

            <h2>Medical Documents</h2>
            <br></br>
            <img src={'doesnotexist.png'} />
            <br></br><br></br>
            <p>This area will be populated with patients medical files that they wish to store
                with this service.</p>
            
            <br></br>
            
            <table>
                <tr>
                    <td><a href={'Google.com'}>Vaccine Record</a></td>
                    <td>Updated 9/20/20</td>
                </tr>
                <tr>
                    <td><a href={'Google.com'}>Dental Records</a></td>
                    <td>Updated 8/14/20</td>
                </tr>
                <tr>
                    <td><a href={'Google.com'}>Emergency Room Visit</a></td>
                    <td>Updated 1/1/20</td>
                </tr>
            </table>

            <br></br><br></br>
            <a href={'Google.com'}>show more</a>

        </div>

        <br></br><br></br>

        <div className={styles.doctorInfo}>

            <h2>Primary Physician Info</h2>
            <br></br>

            <table>
                <tr>
                    <td><strong>Adam Stroberg</strong></td>
                    <td>stroberg@usc.edu</td>
                    <td><a href='google.com'>message</a></td>
                </tr>
                <tr>
                    <td><strong>John Galdones</strong></td>
                    <td>galdones@usc.edu</td>
                    <td><a href='google.com'>message</a></td>
                </tr>
                <tr>
                    <td><strong>Arif Ahmed</strong></td>
                    <td>arifahme@usc.edu</td>
                    <td><a href='google.com'>message</a></td>
                </tr>
                <tr>
                    <td><strong>Atharva Upadhyay</strong></td>
                    <td>aaupadhy@usc.edu</td>
                    <td><a href='google.com'>message</a></td>
                </tr>
            </table>

            <br></br><br></br>
            <a href={'Google.com'}>show more</a>

        </div>

    </div>

  );
}