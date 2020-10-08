// css
import styles from './Layout.module.css';

function Layout(props) {
  return (
    <div className={styles.container} id={props.page}>
      {props.children}
    </div>
  );
}

export default Layout