import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hook/useSupabaseAuth";

const NavBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useSupabaseAuth();

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const handleSearch = () => {
    if (searchInput.trim()) {
      navigate(`/?search=${encodeURIComponent(searchInput)}`);
      setSearchInput("");
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error.message);
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.logo}>무비라운지</Link>
      </div>

      <div style={styles.center}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
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
        {isLoggedIn ? (
          <div style={styles.thumbnailContainer}>
            <img
              src="path/to/thumbnail.jpg"
              alt="User Thumbnail"
              style={styles.thumbnail}
              onClick={toggleMenu}
            />
            {showMenu && (
              <div style={styles.dropdownMenu}>
                <Link to="/mypage" style={styles.menuItem}>
                  마이 페이지
                </Link>
                <div onClick={handleLogout} style={styles.menuItem}>
                  로그아웃
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button style={styles.button}>로그인</button>
            </Link>
            <Link to="/signup">
              <button style={styles.button}>회원가입</button>
            </Link>
          </>
        )}
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
  thumbnailContainer: {
    position: "relative",
  },
  thumbnail: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "5px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1,
  },
  menuItem: {
    padding: "10px 15px",
    textDecoration: "none",
    display: "block",
    cursor: "pointer",
  },
};


export default NavBar;
