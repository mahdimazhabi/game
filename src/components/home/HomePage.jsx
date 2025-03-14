import { Link } from "react-router-dom";
import { Container, Row, Col, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Homepage.module.css"; // استایل‌های سفارشی
import tab1 from "./image/tab1.jpg";
import tab2 from "./image/tab2.jpg";
import tab3 from "./image/tab3.jpg";
import user from "../../assets/img/images.png";

import Airdrop from "../Airdrop/Airdrop";
import { useEffect, useState } from "react";
import useUserApi from "../../api/UserApi/useUserApi";
import useUserId from "../../hook/useUserId ";

export default function Homepage() {
  const [data, setData] = useState([]);
  const { getDataUserById } = useUserApi();
  const userId = useUserId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataUserById(userId);
        setData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  console.log(data);

  return (
    <div className="container12">
      <p className="text-start mt-4">
        <img src={user} alt="User" width="35" className="img" />
        Username: {data[0]?.username} | Level:{" "}
        <span className="mt-2">{data[0]?.level}</span>
        <span>| point:{data[0]?.userId * 12}</span>
      </p>

      {/* 🔹 Tab section */}
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col>
            <Nav className="flex-row justify-content-center gap-4">
              <Nav.Item>
                <Link to="/games/morc" className={styles.tabItem}>
                  <img src={tab1} alt="Code Mors" className={styles.tabIcon} />
                  <div className={styles.tabText}>Code Mors</div>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/games/number-guess" className={styles.tabItem}>
                  <img
                    src={tab2}
                    alt="Number Guess"
                    className={styles.tabIcon}
                  />
                  <div className={styles.tabText}>Number Guess</div>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/games/kart-context" className={styles.tabItem}>
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
