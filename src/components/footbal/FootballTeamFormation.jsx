import { useState, useEffect } from "react";
import html2canvas from "html2canvas"; // نیاز به نصب html2canvas دارید
import "./FootballTeamFormation.css";

const FootballTeamFormation = () => {
	const [formation, setFormation] = useState("4-4-2");

	const formations = {
		"4-4-2": [
			{ name: "Goalkeeper", top: "90%", left: "50%" },
			{ name: "Center Back 1", top: "70%", left: "40%" },
			{ name: "Center Back 2", top: "70%", left: "60%" },
			{ name: "Left Back", top: "60%", left: "20%" },
			{ name: "Right Back", top: "60%", left: "80%" },
			{ name: "Left Midfielder", top: "50%", left: "30%" },
			{ name: "Right Midfielder", top: "50%", left: "70%" },
			{ name: "Defensive Midfielder", top: "50%", left: "50%" },
			{ name: "Attacking Midfielder", top: "40%", left: "50%" },
			{ name: "Striker 1", top: "20%", left: "40%" },
			{ name: "Striker 2", top: "20%", left: "60%" },
		],
		"4-1-4-1": [
			{ name: "Goalkeeper", top: "90%", left: "50%" },
			{ name: "Center Back 1", top: "70%", left: "40%" },
			{ name: "Center Back 2", top: "70%", left: "60%" },
			{ name: "Left Back", top: "60%", left: "20%" },
			{ name: "Right Back", top: "60%", left: "80%" },
			{ name: "Defensive Midfielder", top: "50%", left: "50%" },
			{ name: "Left Midfielder", top: "40%", left: "30%" },
			{ name: "Central Midfielder 1", top: "40%", left: "40%" },
			{ name: "Central Midfielder 2", top: "40%", left: "60%" },
			{ name: "Right Midfielder", top: "40%", left: "70%" },
			{ name: "Striker", top: "20%", left: "50%" },
		],
		"4-3-3": [
			{ name: "Goalkeeper", top: "90%", left: "50%" },
			{ name: "Center Back 1", top: "70%", left: "40%" },
			{ name: "Center Back 2", top: "70%", left: "60%" },
			{ name: "Left Back", top: "60%", left: "20%" },
			{ name: "Right Back", top: "60%", left: "80%" },
			{ name: "Defensive Midfielder", top: "50%", left: "50%" },
			{ name: "Central Midfielder 1", top: "50%", left: "30%" },
			{ name: "Central Midfielder 2", top: "50%", left: "70%" },
			{ name: "Left Forward", top: "20%", left: "20%" },
			{ name: "Right Forward", top: "20%", left: "80%" },
			{ name: "Striker", top: "20%", left: "50%" },
		],
		"3-5-2": [
			{ name: "Goalkeeper", top: "90%", left: "50%" },
			{ name: "Center Back 1", top: "70%", left: "30%" },
			{ name: "Center Back 2", top: "70%", left: "50%" },
			{ name: "Center Back 3", top: "70%", left: "70%" },
			{ name: "Left Wing Back", top: "60%", left: "10%" },
			{ name: "Right Wing Back", top: "60%", left: "90%" },
			{ name: "Defensive Midfielder", top: "50%", left: "50%" },
			{ name: "Central Midfielder 1", top: "50%", left: "30%" },
			{ name: "Central Midfielder 2", top: "50%", left: "70%" },
			{ name: "Striker 1", top: "20%", left: "40%" },
			{ name: "Striker 2", top: "20%", left: "60%" },
		],
		"4-2-3-1": [
			{ name: "Goalkeeper", top: "90%", left: "50%" },
			{ name: "Center Back 1", top: "70%", left: "40%" },
			{ name: "Center Back 2", top: "70%", left: "60%" },
			{ name: "Left Back", top: "60%", left: "20%" },
			{ name: "Right Back", top: "60%", left: "80%" },
			{ name: "Defensive Midfielder 1", top: "50%", left: "40%" },
			{ name: "Defensive Midfielder 2", top: "50%", left: "60%" },
			{ name: "Attacking Midfielder", top: "40%", left: "50%" },
			{ name: "Left Winger", top: "30%", left: "20%" },
			{ name: "Right Winger", top: "30%", left: "80%" },
			{ name: "Striker", top: "20%", left: "50%" },
		],
		"5-3-2": [
			{ name: "Goalkeeper", top: "90%", left: "50%" },
			{ name: "Center Back 1", top: "70%", left: "30%" },
			{ name: "Center Back 2", top: "70%", left: "50%" },
			{ name: "Center Back 3", top: "70%", left: "70%" },
			{ name: "Left Wing Back", top: "60%", left: "10%" },
			{ name: "Right Wing Back", top: "60%", left: "90%" },
			{ name: "Central Midfielder 1", top: "50%", left: "30%" },
			{ name: "Central Midfielder 2", top: "50%", left: "50%" },
			{ name: "Central Midfielder 3", top: "50%", left: "70%" },
			{ name: "Striker 1", top: "20%", left: "40%" },
			{ name: "Striker 2", top: "20%", left: "60%" },
		],
		"3-4-3": [
			{ name: "Goalkeeper", top: "90%", left: "50%" },
			{ name: "Center Back 1", top: "70%", left: "30%" },
			{ name: "Center Back 2", top: "70%", left: "50%" },
			{ name: "Center Back 3", top: "70%", left: "70%" },
			{ name: "Left Midfielder", top: "50%", left: "20%" },
			{ name: "Central Midfielder 1", top: "50%", left: "40%" },
			{ name: "Central Midfielder 2", top: "50%", left: "60%" },
			{ name: "Right Midfielder", top: "50%", left: "80%" },
			{ name: "Left Forward", top: "20%", left: "20%" },
			{ name: "Striker", top: "20%", left: "50%" },
			{ name: "Right Forward", top: "20%", left: "80%" },
		],
	};

	const updateFormation = (event) => {
		setFormation(event.target.value);
	};

	// Shuffle array function
	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	};

	const selectPlayer = (name) => {
		alert(`Selected Player: ${name}`);
	};

	const share = () => {
		const field = document.getElementById("field");
		if (field) {
			html2canvas(field).then((canvas) => {
				const image = canvas.toDataURL("image/png");
				const referralLink = "https://yourwebsite.com?ref=user123";
				const shareUrl = `${referralLink}&image=${encodeURIComponent(
					image,
				)}`;

				alert("Share Image Link: " + shareUrl);
			});
		}
	};

	useEffect(() => {
		const field = document.getElementById("field");
		if (field) {
			field.innerHTML = ""; // Clear previous players
			const players = formations[formation].slice();
			shuffleArray(players);

			players.forEach((player) => {
				const playerDiv = document.createElement("div");
				playerDiv.classList.add("player");
				playerDiv.style.top = player.top;
				playerDiv.style.left = player.left;
				playerDiv.textContent = player.name;
				playerDiv.onclick = () => selectPlayer(player.name);
				field.appendChild(playerDiv);
			});
		}
	}, [formation]); // Update when formation changes

	const rate = (rating) => {
		alert(`You rated ${rating} stars`);
	};

	return (
		<div className="panle">
			<div className="control-panel">
				<label htmlFor="formation">Select Formation:</label>
				<select
					id="formation"
					onChange={updateFormation}>
					<option value="4-4-2">4-4-2</option>
					<option value="4-3-3">4-3-3</option>
					<option value="3-5-2">3-5-2</option>
					<option value="4-2-3-1">4-2-3-1</option>
					<option value="3-4-3">3-4-3</option>
					<option value="5-3-2">5-3-2</option>
					<option value="4-1-4-1">4-1-4-1</option>
				</select>
			</div>

			<div
				className="field"
				id="field">
				<div className="advertise top-ad">
					<span>Top Ad - This is an advertisement!</span>
				</div>
				<div className="advertise bottom-ad">
					<span>Bottom Ad - This is an advertisement!</span>
				</div>
				<div className="advertise left-ad">
					<span>Left Ad - This is an advertisement!</span>
				</div>
				<div className="advertise right-ad">
					<span>Right Ad - This is an advertisement!</span>
				</div>
				<div className="goal-area"></div>
				<div className="center-circle"></div>
			</div>

			<div className="share-rating-panel">
				<div className="share">
					{/* <button onClick={share}>Share</button> */}
					<div className="share-icons">
						<a
							href="https://t.me/share/url?url=https://yourwebsite.com&text=Share%20Link%20for%20Story"
							target="_blank"
							rel="noopener noreferrer">
							📱
						</a>
						<a
							href="https://twitter.com/share?url=https://yourwebsite.com&text=Share%20Link"
							target="_blank"
							rel="noopener noreferrer">
							🐦
						</a>
						<a
							href="https://www.instagram.com/create/story/?url=https://yourwebsite.com"
							target="_blank"
							rel="noopener noreferrer">
							📸
						</a>
						<a
							href="https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com"
							target="_blank"
							rel="noopener noreferrer">
							📘
						</a>
					</div>
				</div>

				<div className="rating">
					<span
						className="star"
						onClick={() => rate(1)}>
						&#9733;
					</span>
					<span
						className="star"
						onClick={() => rate(2)}>
						&#9733;
					</span>
					<span
						className="star"
						onClick={() => rate(3)}>
						&#9733;
					</span>
					<span
						className="star"
						onClick={() => rate(4)}>
						&#9733;
					</span>
					<span
						className="star"
						onClick={() => rate(5)}>
						&#9733;
					</span>
				</div>
			</div>
		</div>
	);
};

export default FootballTeamFormation;
