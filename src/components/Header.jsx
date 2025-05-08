import { useNavigate } from "react-router-dom"
import styles from "./Header.module.css"
function Header () {
 const Nav = useNavigate()
    return(
        <>
    
        <div className={styles.box}>
            <h3 className={styles.logo} onClick={()=>{Nav('/')}}>SYMovie</h3>
            <input type="text"  className={styles.serche} placeholder="검색어를 입력하세요"/>
            <button className={styles.Sbutton}>🔍</button>
            <div className={styles.login}>
                <button className={styles.Lbutton}>로그인</button>
            </div>
        </div>
        </>
    )
}
export default Header