import { useState, useEffect } from "react";
import html2canvas from "html2canvas"; // نیاز به نصب html2canvas دارید
import "./FootballTeamFormation.css";

const FootballTeamFormation = () => {
	const [formation, setFormation] = useState("4-4-2");

	const formations = {
		"4-4-2": [
			{
				name: "Goalkeeper",
				player: "Ali Rezaei",
				top: "89%",
				left: "43%",
			},
			{
				name: "Center Back 1",
				player: "Mehdi Karimi",
				top: "75%",
				left: "30%",
			},
			{
				name: "Center Back 2",
				player: "Hassan Parsa",
				top: "75%",
				left: "60%",
			},
			{
				name: "Left Back",
				player: "Mohammad Khosravi",
				top: "70%",
				left: "10%",
			},
			{
				name: "Right Back",
				player: "Sina Fathi",
				top: "70%",
				left: "80%",
			},
			{
				name: "Left Midfielder",
				player: "Amir Hossein Ghaffari",
				top: "50%",
				left: "20%",
			},
			{
				name: "Right Midfielder",
				player: "Navid Soleimani",
				top: "50%",
				left: "70%",
			},
			{
				name: "Defensive Midfielder",
				player: "Vahid Ghanbari",
				top: "50%",
				left: "43%",
			},
			{
				name: "Attacking Midfielder",
				player: "Saeed Mohammadi",
				top: "30%",
				left: "43%",
			},
			{
				name: "Striker 1",
				player: "Farshid Shariati",
				top: "10%",
				left: "25%",
			},
			{
				name: "Striker 2",
				player: "Reza Jahani",
				top: "10%",
				left: "65%",
			},
		],
		"4-1-4-1": [
			{
				name: "Goalkeeper",
				player: "Ali Rezaei",
				top: "90%",
				left: "45%",
			},
			{
				name: "Center Back 1",
				player: "Mehdi Karimi",
				top: "75%",
				left: "30%",
			},
			{
				name: "Center Back 2",
				player: "Hassan Parsa",
				top: "75%",
				left: "60%",
			},
			{
				name: "Left Back",
				player: "Mohammad Khosravi",
				top: "65%",
				left: "10%",
			},
			{
				name: "Right Back",
				player: "Sina Fathi",
				top: "65%",
				left: "80%",
			},
			{
				name: "Defensive Midfielder",
				player: "Vahid Ghanbari",
				top: "55%",
				left: "45%",
			},
			{
				name: "Left Midfielder",
				player: "Amir Hossein Ghaffari",
				top: "40%",
				left: "10%",
			},
			{
				name: "Central Midfielder 1",
				player: "Navid Soleimani",
				top: "40%",
				left: "30%",
			},
			{
				name: "Central Midfielder 2",
				player: "Saeed Mohammadi",
				top: "40%",
				left: "60%",
			},
			{
				name: "Right Midfielder",
				player: "Farshid Shariati",
				top: "40%",
				left: "80%",
			},
			{ name: "Striker", player: "Reza Jahani", top: "10%", left: "45%" },
		],
		"4-3-3": [
			{
				name: "Goalkeeper",
				player: "Ali Rezaei",
				top: "85%",
				left: "45%",
			},
			{
				name: "Center Back 1",
				player: "Mehdi Karimi",
				top: "70%",
				left: "30%",
			},
			{
				name: "Center Back 2",
				player: "Hassan Parsa",
				top: "70%",
				left: "60%",
			},
			{
				name: "Left Back",
				player: "Mohammad Khosravi",
				top: "65%",
				left: "10%",
			},
			{
				name: "Right Back",
				player: "Sina Fathi",
				top: "65%",
				left: "80%",
			},
			{
				name: "Defensive Midfielder",
				player: "Vahid Ghanbari",
				top: "40%",
				left: "45%",
			},
			{
				name: "Central Midfielder 1",
				player: "Navid Soleimani",
				top: "40%",
				left: "20%",
			},
			{
				name: "Central Midfielder 2",
				player: "Saeed Mohammadi",
				top: "40%",
				left: "71%",
			},
			{
				name: "Left Forward",
				player: "Amir Hossein Ghaffari",
				top: "10%",
				left: "15%",
			},
			{
				name: "Right Forward",
				player: "Farshid Shariati",
				top: "10%",
				left: "75%",
			},
			{ name: "Striker", player: "Reza Jahani", top: "10%", left: "45%" },
		],
		"3-5-2": [
			{
				name: "Goalkeeper",
				player: "Ali Rezaei",
				top: "85%",
				left: "45%",
			},
			{
				name: "Center Back 1",
				player: "Mehdi Karimi",
				top: "65%",
				left: "20%",
			},
			{
				name: "Center Back 2",
				player: "Hassan Parsa",
				top: "65%",
				left: "45%",
			},
			{
				name: "Center Back 3",
				player: "Mohammad Khosravi",
				top: "65%",
				left: "70%",
			},
			{
				name: "Left Wing Back",
				player: "Sina Fathi",
				top: "45%",
				left: "5%",
			},
			{
				name: "Right Wing Back",
				player: "Navid Soleimani",
				top: "45%",
				left: "85%",
			},
			{
				name: "Defensive Midfielder",
				player: "Vahid Ghanbari",
				top: "35%",
				left: "45%",
			},
			{
				name: "Central Midfielder 1",
				player: "Amir Hossein Ghaffari",
				top: "35%",
				left: "20%",
			},
			{
				name: "Central Midfielder 2",
				player: "Saeed Mohammadi",
				top: "35%",
				left: "70%",
			},
			{
				name: "Striker 1",
				player: "Farshid Shariati",
				top: "10%",
				left: "30%",
			},
			{
				name: "Striker 2",
				player: "Reza Jahani",
				top: "10%",
				left: "60%",
			},
		],
		"4-2-3-1": [
			{
				name: "Goalkeeper",
				player: "Ali Rezaei",
				top: "85%",
				left: "45%",
			},
			{
				name: "Center Back 1",
				player: "Mehdi Karimi",
				top: "70%",
				left: "30%",
			},
			{
				name: "Center Back 2",
				player: "Hassan Parsa",
				top: "70%",
				left: "60%",
			},
			{
				name: "Left Back",
				player: "Mohammad Khosravi",
				top: "60%",
				left: "10%",
			},
			{
				name: "Right Back",
				player: "Sina Fathi",
				top: "60%",
				left: "80%",
			},
			{
				name: "Defensive Midfielder 1",
				player: "Vahid Ghanbari",
				top: "45%",
				left: "30%",
			},
			{
				name: "Defensive Midfielder 2",
				player: "Navid Soleimani",
				top: "45%",
				left: "65%",
			},
			{
				name: "Attacking Midfielder",
				player: "Saeed Mohammadi",
				top: "30%",
				left: "47%",
			},
			{
				name: "Left Winger",
				player: "Amir Hossein Ghaffari",
				top: "20%",
				left: "15%",
			},
			{
				name: "Right Winger",
				player: "Farshid Shariati",
				top: "20%",
				left: "80%",
			},
			{ name: "Striker", player: "Reza Jahani", top: "10%", left: "47%" },
		],
		"5-3-2": [
			{
				name: "Goalkeeper",
				player: "Ali Rezaei",
				top: "85%",
				left: "45%",
			},
			{
				name: "Center Back 1",
				player: "Mehdi Karimi",
				top: "70%",
				left: "21%",
			},
			{
				name: "Center Back 2",
				player: "Hassan Parsa",
				top: "70%",
				left: "45%",
			},
			{
				name: "Center Back 3",
				player: "Mohammad Khosravi",
				top: "70%",
				left: "70%",
			},
			{
				name: "Left Wing Back",
				player: "Sina Fathi",
				top: "60%",
				left: "5%",
			},
			{
				name: "Right Wing Back",
				player: "Navid Soleimani",
				top: "60%",
				left: "86%",
			},
			{
				name: "Central Midfielder 1",
				player: "Vahid Ghanbari",
				top: "35%",
				left: "20%",
			},
			{
				name: "Central Midfielder 2",
				player: "Amir Hossein Ghaffari",
				top: "35%",
				left: "45%",
			},
			{
				name: "Central Midfielder 3",
				player: "Saeed Mohammadi",
				top: "35%",
				left: "70%",
			},
			{
				name: "Striker 1",
				player: "Farshid Shariati",
				top: "10%",
				left: "30%",
			},
			{
				name: "Striker 2",
				player: "Reza Jahani",
				top: "10%",
				left: "60%",
			},
		],
		"3-4-3": [
			{
				name: "Goalkeeper",
				player: "Ali Rezaei",
				top: "85%",
				left: "45%",
			},
			{
				name: "Center Back 1",
				player: "Mehdi Karimi",
				top: "70%",
				left: "25%",
			},
			{
				name: "Center Back 2",
				player: "Hassan Parsa",
				top: "70%",
				left: "45%",
			},
			{
				name: "Center Back 3",
				player: "Mohammad Khosravi",
				top: "70%",
				left: "65%",
			},
			{
				name: "Left Midfielder",
				player: "Sina Fathi",
				top: "45%",
				left: "10%",
			},
			{
				name: "Central Midfielder 1",
				player: "Navid Soleimani",
				top: "40%",
				left: "33%",
			},
			{
				name: "Central Midfielder 2",
				player: "Saeed Mohammadi",
				top: "40%",
				left: "58%",
			},
			{
				name: "Right Midfielder",
				player: "Farshid Shariati",
				top: "45%",
				left: "80%",
			},
			{
				name: "Left Forward",
				player: "Amir Hossein Ghaffari",
				top: "15%",
				left: "15%",
			},
			{ name: "Striker", player: "Reza Jahani", top: "10%", left: "45%" },
			{
				name: "Right Forward",
				player: "Hassan Parsa",
				top: "15%",
				left: "75%",
			},
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
				console.log(player.player);
				const playerDiv = document.createElement("div");
				playerDiv.classList.add("player");
				playerDiv.style.top = player.top;
				playerDiv.style.left = player.left;
				playerDiv.textContent = player.name;
				playerDiv.onclick = () => selectPlayer(player.player);
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
