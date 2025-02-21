import { Link } from "react-router-dom";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Homepage.module.css"; // استایل‌های سفارشی
import tab1 from "./image/tab1.jpg";
import tab2 from "./image/tab2.jpg";
import tab3 from "./image/tab3.jpg";
import { CiUser } from "react-icons/ci";
import api from "../../api";
import Airdrop from "../Airdrop/Airdrop";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("products")
      .then((res) => {
        setProducts(res.data); // Store the API response data in state
        console.log(res.data); // Log the response data to console
      })
      .catch((err) => {
        console.log(err.message); // Log any error
      });
  }, []);

  return (
    <div className="container12">
      <p className="text-start mt-4 ">
        <CiUser size={24} />
        mahdi mazhabi
      </p>

      {/* 🔹 Tab section */}
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col>
            <Nav
              className=" flex-row justify-content-center gap-4"
              style={{ marginTop: "8rem" }}
            >
              <Nav.Item>
                <Link as={Link} to="/games/morc" className={styles.tabItem}>
                  <img src={tab1} alt="Code Mors" className={styles.tabIcon} />
                  <div className={styles.tabText}>Code Mors</div>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  as={Link}
                  to="/games/number-guess"
                  className={styles.tabItem}
                >
                  <img
                    src={tab2}
                    alt="Number Guess"
                    className={styles.tabIcon}
                  />
                  <div className={styles.tabText}>Number Guess</div>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link
                  as={Link}
                  to="/games/kart-context"
                  className={styles.tabItem}
                >
                  <img
                    src={tab3}
                    alt="Kart Context"
                    className={styles.tabIcon}
                  />
                  <div className={styles.tabText}>Kart Context</div>
                </Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>

      {/* 🔹 Large image between sections */}
      <div className={styles.largeImageContainer}>
        <Airdrop />
      </div>

      {/* 🔹 Bottom Tab bar with Links */}
    </div>
  );
}
