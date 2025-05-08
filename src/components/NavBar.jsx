import styles from "./NavBar.module.css"
const NavBar = () => {
 return (
  <>
  <div className={styles.NavBar}>
    <h3 className={styles.Home}>홈 화면</h3>
    <input className={styles.search} type="text"placeholder="Search..."/>
    <div className={styles.buttons}>
      <button className={styles.btn1}>Log in</button>
      <button className={styles.btn2}>Register</button>
    </div>
    </div>
  
  </>
 )
};

export default NavBar;
