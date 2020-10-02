// css
import styles from './Content.module.css';

export default function Content(props) {
  const showContent = () => {
    // if(props.section === 'messages') {
    //   return (
    //     <h1>messages</h1>
    //   );
    // }
    // else if(props.section === 'profile') {
    //   return (
    //     <h1>profile</h1>
    //   );
    // }
    // else if(props.section === 'settings') {
    //   return (
    //     <h1>settings</h1>
    //   );
    // }
    // else if(props.section === 'search') {
    //   return (
    //     <h1>search</h1>
    //   );
    // }
    return (
      <h1>{props.section}</h1>
    )
  }

  return (
    <div className={styles.content}>
      {props.section}
    </div>
  )
}