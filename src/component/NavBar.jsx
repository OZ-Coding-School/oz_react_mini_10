import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';git clone https://github.com/OZ-Coding-School/oz_react_mini_10.git
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; // Link import 추가
import ListPage from '../component/ListPage'; // 경로에 맞는 컴포넌트 import

    function NavScrollExample() {
    return (
        <Router> {/* BrowserRouter로 앱을 감쌈 */}
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
            <Navbar.Brand as={Link} to="/">Movie App</Navbar.Brand> {/* 수정 */}
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
                >
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/">로그인</Nav.Link>
                <Nav.Link as={Link} to="/">회원가입</Nav.Link>            
                <Nav.Link disabled>Coming Soon</Nav.Link>
                </Nav>
                <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Container>
        </Navbar>

        <Routes> {/* 라우팅 설정 */}
            <Route path="/" element={<ListPage />} /> {/* Home 컴포넌트 */}
            <Route path="/about" element={<div>About</div>} /> {/* About 컴포넌트 예시 */}
            {/* 다른 경로들도 설정 */}
        </Routes>
        </Router> 
    );
    }

export default NavScrollExample;
