// css
import styles from './Profile.module.css';

// next.js
import { useRouter } from 'next/router';

// react.js
import { useEffect } from 'react';

// redux
import { connect } from 'react-redux';

function Profile(props) {
  useEffect(() => {
    const url = 'http:localhost:5000/dashboard/';

    fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
      // body: JSON.stringify({
      //   user: props.user,
      // }),
    })
    .then(res => {
      console.log(res);
    })
  });

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.profilePic}>
          <img src={'/images/ProfilePic.png'} />
        </div>
        <div className={styles.info}>
          <h1>{'@' + props.user}</h1>
        </div>
      </div>
      <div className={styles.connections}>
        <div className={styles.friends}>

        </div>
        <div className={styles.friendRequests}>

        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.login.user,
});

export default connect(mapStateToProps)(Profile);

// export default function Profile(props) {
//     const router = useRouter();
//     const { user } = router.query;

//   return (
//     <div>

//         <img src={'/images/ProfilePic.png'} style={{width:'20%', position: 'relative', marginTop: '1%', left: '40%'}}/>
//         <br></br>
//         <h1 style={{position: 'relative', textAlign: 'center'}}>Hello, {user}</h1>
//         <br></br>

//         <div className={styles.medicalDocs}>

//             <h2>Medical Documents</h2>
//             <br></br>
//             <img src={'doesnotexist.png'} />
//             <br></br><br></br>
//             <p>This area will be populated with patients medical files that they wish to store
//                 with this service.</p>
            
//             <br></br>
            
//             <table>
//                 <tr>
//                     <td><a href={'Google.com'}>Vaccine Record</a></td>
//                     <td>Updated 9/20/20</td>
//                 </tr>
//                 <tr>
//                     <td><a href={'Google.com'}>Dental Records</a></td>
//                     <td>Updated 8/14/20</td>
//                 </tr>
//                 <tr>
//                     <td><a href={'Google.com'}>Emergency Room Visit</a></td>
//                     <td>Updated 1/1/20</td>
//                 </tr>
//             </table>

//             <br></br><br></br>
//             <a href={'Google.com'}>show more</a>

//         </div>

//         <br></br><br></br>

//         <div className={styles.doctorInfo}>

//             <h2>Primary Physician Info</h2>
//             <br></br>

//             <table>
//                 <tr>
//                     <td><strong>Adam Stroberg</strong></td>
//                     <td>stroberg@usc.edu</td>
//                     <td><a href='google.com'>message</a></td>
//                 </tr>
//                 <tr>
//                     <td><strong>John Galdones</strong></td>
//                     <td>galdones@usc.edu</td>
//                     <td><a href='google.com'>message</a></td>
//                 </tr>
//                 <tr>
//                     <td><strong>Arif Ahmed</strong></td>
//                     <td>arifahme@usc.edu</td>
//                     <td><a href='google.com'>message</a></td>
//                 </tr>
//                 <tr>
//                     <td><strong>Atharva Upadhyay</strong></td>
//                     <td>aaupadhy@usc.edu</td>
//                     <td><a href='google.com'>message</a></td>
//                 </tr>
//             </table>

//             <br></br><br></br>
//             <a href={'Google.com'}>show more</a>

//         </div>

//     </div>

//   );
// }