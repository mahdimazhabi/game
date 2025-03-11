import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import lottery from "../components/home/image/lottery.jpg";
import football from "../components/home/image/football.jpg";
import CoinTransfer from "../components/home/image/coien_transfer.jpg";
import topuser from "../components/home/image/topuser.jpg";
import social from "../components/home/image/social.jpg";
import game from "../assets/img/download.jfif";
const Footer2 = () => {
  return (
    <div className={styles.bottomTabBar}>
      <Link to="/" className={styles.bottomTabItem}>
        <img src={lottery} alt="Lottery" />
        <span>Lottery</span>
      </Link>
      <Link to="bottompage/football" className={styles.bottomTabItem}>
        <img src={football} alt="Football" />
        <span>Football</span>
      </Link>
      <Link to="bottompage/password" className={styles.bottomTabItem}>
        <img src={CoinTransfer} alt="Coin Transfer" />
        <span>Coin Transfer</span>
      </Link>
      <Link to="/page4" className={styles.bottomTabItem}>
        <img src={game} alt="Page 4" />
        <span>games</span>
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
  );
};

export default Footer2;
