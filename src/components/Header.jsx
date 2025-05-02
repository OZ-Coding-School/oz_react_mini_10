import styles from "./Header.module.css"
function Header () {
    return(
        <>
    
        <div className={styles.box}>
            <h3 className={styles.logo}>SYMovie</h3>
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