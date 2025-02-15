import { Link } from "react-router-dom";

const Page4 = () => {
  // استایل‌ها به صورت یک شیء جاوااسکریپتی
  const styles = {
    body: {
      backgroundColor: "black",
      color: "white",
      fontFamily: "Arial, sans-serif",
      margin: 0,
      padding: 0,
      display: "flex",
    },
    userInfo: {
      textAlign: "center",
      padding: "20px",
    },
    userInfoHeading: {
      margin: 0,
      fontSize: "24px",
    },
    userInfoParagraph: {
      margin: "5px 0 0",
      fontSize: "16px",
    },
    profileSection: {
      textAlign: "center",
      padding: "10px",
    },
    profileImg: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      marginBottom: "10px",
    },
    profileButton: {
      backgroundColor: "#00ff00",
      color: "black",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
    },
    topTabs: {
      display: "flex",
      justifyContent: "space-around",
      padding: "20px 0",
    },
    topTabItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      fontSize: "18px",
      padding: "10px",
      borderRadius: "10px",
      boxShadow: "0 0 15px #00ff00",
    },
    topTabImg: {
      width: "40px",
      height: "40px",
      marginBottom: "5px",
      borderRadius: "50%",
      boxShadow: "0 0 10px #00ff00",
    },
    bottomTabBar: {
      display: "flex",
      justifyContent: "space-around",
      backgroundColor: "#111",
      padding: "10px 0",
      position: "fixed",
      bottom: 0,
      width: "100%",
    },
    bottomTabItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      transition: "transform 0.3s ease",
    },
    bottomTabItemHover: {
      transform: "translateY(-10px)",
    },
    bottomTabImg: {
      width: "30px",
      height: "30px",
      marginBottom: "5px",
      borderRadius: "50%",
      boxShadow: "0 0 10px #00ff00",
    },
    page4Content: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      padding: "20px",
    },
    page4ContentDiv: {
      minWidth: "40%",
      height: "auto",
      padding: "15px",
      margin: "10px",
      borderRadius: "10px",
      boxShadow: "0 0 15px #00ff00",
      textAlign: "center",
    },
    page5Content: {
      textAlign: "center",
      padding: "20px",
      fontSize: "24px",
      boxShadow: "0 0 15px #00ff00",
      borderRadius: "10px",
      margin: "20px",
      animation: "glow 2s infinite alternate",
    },
    page5ContentParagraph: {
      margin: 0,
    },
    glowAnimation: {
      animation: "glow 2s infinite alternate",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.userInfo}></div>

      <div style={styles.page4Content}>
        <Link to="/DiceGame" style={styles.page4ContentDiv}>
          Grundbetrag
        </Link>
        <Link to="/Crowd" style={styles.page4ContentDiv}>
          Erste Hilfe
        </Link>
        <Link to="/sehtest" style={styles.page4ContentDiv}>
          Sehtest
        </Link>
        <Link to="/football-prediction-game/en" style={styles.page4ContentDiv}>
          Online Zugang
        </Link>
        <Link to="/theoriestunden" style={styles.page4ContentDiv}>
          Theoriestunden
        </Link>
        <Link to="/adac-mitgliedschaft" style={styles.page4ContentDiv}>
          ADAC Mitgliedschaft
        </Link>
      </div>
    </div>
  );
};

export default Page4;
