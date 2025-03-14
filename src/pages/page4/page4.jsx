import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const Page4 = () => {
	const styles = {
		body: {
			backgroundColor: "black",
			color: "white",
			fontFamily: "Arial, sans-serif",
			margin: 0,
			padding: 0,
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			minHeight: "100vh",
		},
		userInfo: {
			textAlign: "center",
			padding: "20px",
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
			alignItems: "center",
			cursor: "pointer",
			fontSize: "18px",
			padding: "10px",
			borderRadius: "10px",
			boxShadow: "0 0 15px #00ff00",
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
			alignItems: "center",
			cursor: "pointer",
			transition: "transform 0.3s ease",
		},
		bottomTabItemHover: {
			transform: "translateY(-10px)",
		},
		page4Content: {
			display: "flex",
			flexDirection: "column", // در موبایل لینک‌ها به‌صورت عمودی
			alignItems: "center",
			padding: "20px",
			width: "100%", // پر کردن عرض صفحه
			gap: "10px",
			marginTop: "2rem",
		},
		page4ContentDiv: {
			width: "90%", // در موبایل تمام عرض را می‌گیرد
			maxWidth: "400px", // حداکثر عرض در دسکتاپ
			padding: "15px",
			borderRadius: "10px",
			boxShadow: "0 0 15px #00ff00",
			textAlign: "center",
			backgroundColor: "#222",
			color: "white",
			textDecoration: "none",
			fontSize: "18px",
			fontWeight: "bold",
			transition: "background 0.3s ease",
		},
		page4ContentDivHover: {
			backgroundColor: "#00ff00",
			color: "black",
		},
		"@media (min-width: 768px)": {
			page4Content: {
				flexDirection: "row", // در دسکتاپ لینک‌ها به‌صورت افقی نمایش داده شوند
				flexWrap: "wrap",
				justifyContent: "center",
			},
			page4ContentDiv: {
				width: "40%", // در دسکتاپ دو ستونه نمایش داده شود
			},
		},
	};

	return (
		<div style={styles.body}>
			<button
				className="back-button1"
				style={{ left: "15px" }}
				onClick={() => {
					window.history.back();
				}}>
				<IoMdClose />
			</button>
			<div style={styles.userInfo}></div>
			<div style={styles.page4Content}>
				<Link
					to="/DiceGame"
					style={styles.page4ContentDiv}>
					Grundbetrag
				</Link>
				<Link
					to="/Crowd"
					style={styles.page4ContentDiv}>
					Erste Hilfe
				</Link>
				<Link
					to="/sehtest"
					style={styles.page4ContentDiv}>
					Sehtest
				</Link>
				<Link
					to="/football-prediction-game/en"
					style={styles.page4ContentDiv}>
					Online Zugang
				</Link>
				<Link
					to="/FirebaseConfiguration"
					style={styles.page4ContentDiv}>
					Theoriestunden
				</Link>
				<Link
					to="DiceCardGame"
					style={styles.page4ContentDiv}>
					ADAC Mitgliedschaft
				</Link>
				<Link
					to="/McqQuiz"
					style={styles.page4ContentDiv}>
					MCQ Quiz
				</Link>
			</div>
		</div>
	);
};

export default Page4;
