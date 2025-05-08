import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/?search=${encodeURIComponent(searchInput)}`);
      setSearchInput("");
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>무비라운지</Link>
      </div>

      <div style={styles.center}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="검색"
            style={styles.search}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      </div>

      <div style={styles.right}>
        <button style={styles.button}>로그인</button>
        <button style={styles.button}>회원가입</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111",
    padding: "10px 20px",
    color: "#fff",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#fff",
    textDecoration: "none",
  },
  center: {
    flex: 1,
    margin: "0 20px",
  },
  search: {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "20px",
    border: "none",
    outline: "none",
  },
  right: {
    display: "flex",
    gap: "10px",
  },
  button: {
    backgroundColor: "#a259ff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "8px 12px",
    cursor: "pointer",
  },
};

export default NavBar;
