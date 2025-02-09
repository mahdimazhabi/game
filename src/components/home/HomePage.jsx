import { Link } from "react-router-dom";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Homepage.module.css"; // استایل‌های سفارشی
import tab1 from "./image/tab1.jpg";
import tab2 from "./image/tab2.jpg";
import tab3 from "./image/tab3.jpg";
import lottery from "./image/lottery.jpg";
import football from "./image/football.jpg";
import CoinTransfer from "./image/coien_transfer.jpg";
import topuser from "./image/topuser.jpg";
import social from "./image/social.jpg";

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
    <div className={styles.container}>
      <p className="text-start mt-4">username: mahdi mazhabi</p>

      {/* 🔹 Tab section */}
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col>
            <Nav className="d-flex flex-row justify-content-center gap-4">
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
      <div className={styles.bottomTabBar}>
        <Link to="bottompage/lottery" className={styles.bottomTabItem}>
          <img src={lottery} alt="Lottery" />
          <span>Lottery</span>
        </Link>
        <Link to="bottompage/football" className={styles.bottomTabItem}>
          <img src={football} alt="Football" />
          <span>Football</span>
        </Link>
        <Link to="bottompage/cointransfer" className={styles.bottomTabItem}>
          <img src={CoinTransfer} alt="Coin Transfer" />
          <span>Coin Transfer</span>
        </Link>
        <Link to="/page4" className={styles.bottomTabItem}>
          <img src="image/bottom-logo4.png" alt="Page 4" />
          <span>Page 4</span>
        </Link>
        <Link to="bottompage/top" className={styles.bottomTabItem}>
          <img src={topuser} alt="Top User" />
          <span>Top User</span>
        </Link>
        <Link to="bottompage/social" className={styles.bottomTabItem}>
          <img src={social} alt="Social Media" />
          <span>Social Media</span>
        </Link>
      </div>
    </div>
  );
}
