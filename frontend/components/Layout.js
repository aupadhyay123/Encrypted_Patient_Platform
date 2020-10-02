// css
import styles from './Layout.module.css';

function Layout(props) {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  );
}

export default Layout