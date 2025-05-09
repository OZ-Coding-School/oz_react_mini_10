import { useNavigate } from "react-router-dom"
import styles from "./Header.module.css"
import { useEffect, useState } from "react"
import useDebounce from "../hooks/useDebounde"
function Header () {
 const Nav = useNavigate()
 const [query, setQuery] = useState('')
 const debouncedQuery = useDebounce(query, 500)
 console.log("입력한 검색어:", query); 
 useEffect(()=>{
    if(debouncedQuery.trim()){
        Nav(`/?search=${debouncedQuery}`)
    }
 },[debouncedQuery])
    return(
        <>
    
        <div className={styles.box}>
            <h3 className={styles.logo} onClick={()=>{Nav('/')}}>SYMovie</h3>
            <input type="text"  className={styles.serche} placeholder="검색어를 입력하세요" value={query}
                onChange={(e)=>setQuery(e.target.value)}/>
            <div className={styles.login}>
                <button className={styles.Lbutton}>로그인</button>
            </div>
        </div>
        </>
    )
}
export default Header