import {useEffect, useState} from "react";
import html2canvas from "html2canvas"; // نیاز به نصب html2canvas دارید
import "./FootballTeamFormation.css";
import Modal from 'react-modal';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import useFootballFormationApi from "../../api/FootbballFormationApi/useFootballFormationApi.jsx";

const FootballTeamFormation = () => {
    const {getAllPlayersByPosition, getUserPlayersByFormation, addPlayer, deletePlayer, getAdminPlayerById} = useFootballFormationApi()
    const [formation, setFormation] = useState("4-4-2");
    const [rating, setRating] = useState(0)
    const [formationPlayers, setFormationPlayers] = useState({
        "4-4-2": [
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "GK",
                adminPlayerName: "",
                top: "89%",
                left: "43%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LCB",
                adminPlayerName: "",
                top: "75%",
                left: "30%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RCB",
                adminPlayerName: "",
                top: "75%",
                left: "60%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LB",
                adminPlayerName: "",
                top: "70%",
                left: "10%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RB",
                adminPlayerName: "",
                top: "70%",
                left: "80%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LM",
                adminPlayerName: "",
                top: "50%",
                left: "20%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RM",
                adminPlayerName: "",
                top: "50%",
                left: "70%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "CDM",
                adminPlayerName: "",
                top: "50%",
                left: "43%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "CAM",
                adminPlayerName: "",
                top: "30%",
                left: "43%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LS",
                adminPlayerName: "",
                top: "10%",
                left: "25%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RS",
                adminPlayerName: "",
                top: "10%",
                left: "65%",
            },
        ],
        "4-1-4-1": [
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "GK",
                adminPlayerName: "",
                top: "90%",
                left: "45%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LCB",
                adminPlayerName: "",
                top: "75%",
                left: "30%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RCB",
                adminPlayerName: "",
                top: "75%",
                left: "60%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LB",
                adminPlayerName: "",
                top: "65%",
                left: "10%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RB",
                adminPlayerName: "",
                top: "65%",
                left: "80%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "CDM",
                adminPlayerName: "",
                top: "55%",
                left: "45%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LM",
                adminPlayerName: "",
                top: "40%",
                left: "10%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LCM",
                adminPlayerName: "",
                top: "40%",
                left: "30%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RCM",
                adminPlayerName: "",
                top: "40%",
                left: "60%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RM",
                adminPlayerName: "",
                top: "40%",
                left: "80%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "ST",
                adminPlayerName: "",
                top: "10%",
                left: "45%"
            },
        ],
        "4-3-3": [
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "GK",
                adminPlayerName: "",
                top: "85%",
                left: "45%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LCM",
                adminPlayerName: "",
                top: "70%",
                left: "30%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RCM",
                adminPlayerName: "",
                top: "70%",
                left: "60%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LB",
                adminPlayerName: "",
                top: "65%",
                left: "10%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RB",
                adminPlayerName: "",
                top: "65%",
                left: "80%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "CDM",
                adminPlayerName: "",
                top: "40%",
                left: "45%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LCM",
                adminPlayerName: "",
                top: "40%",
                left: "20%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RCM",
                adminPlayerName: "",
                top: "40%",
                left: "71%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LS",
                adminPlayerName: "",
                top: "10%",
                left: "15%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RS",
                adminPlayerName: "",
                top: "10%",
                left: "75%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "ST",
                adminPlayerName: "",
                top: "10%",
                left: "45%"
            },
        ],
        "3-5-2": [
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "GK",
                adminPlayerName: "",
                top: "85%",
                left: "45%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LCB",
                adminPlayerName: "",
                top: "65%",
                left: "20%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "CB",
                adminPlayerName: "",
                top: "65%",
                left: "45%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RCB",
                adminPlayerName: "",
                top: "65%",
                left: "70%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LWB",
                adminPlayerName: "",
                top: "45%",
                left: "5%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RWB",
                adminPlayerName: "",
                top: "45%",
                left: "85%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "CDM",
                adminPlayerName: "",
                top: "35%",
                left: "45%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LDM",
                adminPlayerName: "",
                top: "35%",
                left: "20%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RDM",
                adminPlayerName: "",
                top: "35%",
                left: "70%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LS",
                adminPlayerName: "",
                top: "10%",
                left: "30%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RS",
                adminPlayerName: "",
                top: "10%",
                left: "60%",
            },
        ],
        "4-2-3-1": [
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "GK",
                adminPlayerName: "",
                top: "85%",
                left: "45%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LCB",
                adminPlayerName: "",
                top: "70%",
                left: "30%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RCB",
                adminPlayerName: "",
                top: "70%",
                left: "60%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LB",
                adminPlayerName: "",
                top: "60%",
                left: "10%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RB",
                adminPlayerName: "",
                top: "60%",
                left: "80%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LDM",
                adminPlayerName: "",
                top: "45%",
                left: "30%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RDM",
                adminPlayerName: "",
                top: "45%",
                left: "65%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "CAM",
                adminPlayerName: "",
                top: "30%",
                left: "47%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LW",
                adminPlayerName: "",
                top: "20%",
                left: "15%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RW",
                adminPlayerName: "",
                top: "20%",
                left: "80%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "ST",
                adminPlayerName: "",
                top: "10%",
                left: "47%"
            },
        ],
        "5-3-2": [
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "GK",
                adminPlayerName: "",
                top: "85%",
                left: "45%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LCB",
                adminPlayerName: "",
                top: "70%",
                left: "21%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "CB",
                adminPlayerName: "",
                top: "70%",
                left: "45%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RCB",
                adminPlayerName: "",
                top: "70%",
                left: "70%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LWB",
                adminPlayerName: "",
                top: "60%",
                left: "5%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RWB",
                adminPlayerName: "",
                top: "60%",
                left: "86%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LCM",
                adminPlayerName: "",
                top: "35%",
                left: "20%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "CM",
                adminPlayerName: "",
                top: "35%",
                left: "45%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RCM",
                adminPlayerName: "",
                top: "35%",
                left: "70%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LS",
                adminPlayerName: "",
                top: "10%",
                left: "30%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RS",
                adminPlayerName: "",
                top: "10%",
                left: "60%",
            },
        ],
        "3-4-3": [
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "GK",
                adminPlayerName: "",
                top: "85%",
                left: "45%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LCB",
                adminPlayerName: "",
                top: "70%",
                left: "25%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "CB",
                adminPlayerName: "",
                top: "70%",
                left: "45%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RCB",
                adminPlayerName: "",
                top: "70%",
                left: "65%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LM",
                adminPlayerName: "",
                top: "45%",
                left: "10%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LCM",
                adminPlayerName: "",
                top: "40%",
                left: "33%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RCM",
                adminPlayerName: "",
                top: "40%",
                left: "58%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RM",
                adminPlayerName: "",
                top: "45%",
                left: "80%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "LW",
                adminPlayerName: "",
                top: "15%",
                left: "15%",
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "ST",
                adminPlayerName: "",
                top: "10%",
                left: "45%"
            },
            {
                adminPlayerId: null,
                userPlayerId: null,
                position: "RW",
                adminPlayerName: "",
                top: "15%",
                left: "75%",
            },
        ],
    })
    const [targetPositionPlayers, setTargetPositionPlayers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [targetPosition, setTargetPosition] = useState("")
    const [selectedPlayer, setSelectedPlayer] = useState({
        adminPlayerId: null,
        adminPlayerName: "",
        position: null,
    })

    const handleSubmitSelection = async () => {
        const userPlayers = await getUserPlayersByFormation(formation);
        const tempPlayer = formationPlayers[formation].filter((player) => player.position === targetPosition)
        const alreadyExistedPlayerWithSameName = userPlayers.filter((userPlayer) => (userPlayer.adminPlayerName === selectedPlayer.adminPlayerName && userPlayer.formation === formation))
        if (tempPlayer[0].userPlayerId) {
            if (tempPlayer[0].adminPlayerId !== selectedPlayer.adminPlayerId) {
                await deletePlayer(tempPlayer[0].userPlayerId)
                const date = new Date();
                await addPlayer({
                    adminPlayerId: selectedPlayer.adminPlayerId,
                    userId: parseInt(localStorage.getItem("userId")),
                    formation: formation,
                    date: date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getDate() + 1),
                })
            }
        } else {
            const date = new Date();
            await addPlayer({
                adminPlayerId: selectedPlayer.adminPlayerId,
                userId: parseInt(localStorage.getItem("userId")),
                formation: formation,
                date: date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getDate() + 1),
            })
        }
        if (alreadyExistedPlayerWithSameName.length !== 0) {
            for (const p of alreadyExistedPlayerWithSameName) {
                await deletePlayer(p.userPlayerId)
            }
        }
        updateFormationPlayers().then()
        setIsModalOpen(false)
    }
    const handleChangePositionPlayer = (event) => {
        const targetPlayer = targetPositionPlayers.filter(player => player.adminPlayerId === event.target.value)
        setSelectedPlayer(targetPlayer[0]);
    }

    const handleOpenSelection = async (position) => {
        setTargetPosition(position)
        const players = await getAllPlayersByPosition(position)
        setTargetPositionPlayers(players)
        setIsModalOpen(true)
    }

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

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const updateFormationPlayers = async () => {
        const newUserPlayers = await getUserPlayersByFormation(formation);

        // Pre-fetch admin data for all user players
        const newUserPlayersWithAdmin = await Promise.all(
            newUserPlayers.map(async (userPlayer) => {
                const adminPlayer = await getAdminPlayerById(userPlayer.adminPlayerId);
                return { ...userPlayer, adminPlayer };
            })
        );

        // Create a map of positions to user players with admin data
        const positionMap = {};
        newUserPlayersWithAdmin.forEach((userPlayer) => {
            const position = userPlayer.adminPlayer?.position;
            if (position) {
                positionMap[position] = userPlayer;
            }
        });

        const rawPlayers = formationPlayers[formation];
        const editedPlayers = [];

        for (const rawPlayer of rawPlayers) {
            const userPlayer = positionMap[rawPlayer.position];
            if (userPlayer) {
                // Use the user's player data if available for this position
                editedPlayers.push({
                    position: rawPlayer.position,
                    top: rawPlayer.top,
                    left: rawPlayer.left,
                    adminPlayerId: userPlayer.adminPlayerId,
                    userPlayerId: userPlayer.userPlayerId,
                    adminPlayerName: userPlayer.adminPlayer.adminPlayerName,
                });
            } else {
                // Keep the placeholder if no user player exists for this position
                editedPlayers.push({ ...rawPlayer });
            }
        }

        // Update the state with the new formation players
        setFormationPlayers(prev => ({
            ...prev,
            [formation]: editedPlayers
        }));
        // drawPlayer()
    };

    useEffect(() => {
        updateFormationPlayers().then()
        // drawPlayer()
    }, [formation, formationPlayers]);
    useEffect(() => {
        updateFormationPlayers().then()
        // drawPlayer()
    }, []);

    const drawPlayer = () => {
        const field = document.getElementById("player-area");
        if (field) {
            field.innerHTML = ""; // Clear previous players
            const circle = document.createElement("div");
            const goal = document.createElement("div");
            circle.classList.add("center-circle");
            goal.classList.add("goal-area");
            field.appendChild(goal);
            field.appendChild(circle);
            formationPlayers[formation].forEach((player) => {
                const playerDiv = document.createElement("div");
                playerDiv.classList.add("player");
                playerDiv.style.top = player.top;
                playerDiv.style.left = player.left;
                playerDiv.textContent = player.adminPlayerName ? player.adminPlayerName : player.position;
                playerDiv.onclick = () => handleOpenSelection(player.position).then()
                field.appendChild(playerDiv);
            });
        }
    }

    const rate = (newRate) => {
        setRating(newRate);
    };
    Modal.setAppElement('#root')
    return (
        <div className="panle">
            <div className="control-panel">
                <label htmlFor="formation">Select Formation:</label>
                <select
                    id="formation"
                    onChange={(event) => setFormation(event.target.value)}>
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
                <div className="player-area" id="player-area">
                    <div className="goal-area"></div>
                    <div className="center-circle"></div>
                    {formationPlayers[formation]?.map((player) => (
                        <div
                            key={player.position}
                            className="player"
                            style={{
                                top: player.top,
                                left: player.left,
                            }}
                            onClick={() => handleOpenSelection(player.position)}
                        >
                            {player.adminPlayerName || player.position}
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={customStyles}
                contentLabel="Select Player"
            >
                <h2 style={{marginBottom: '2rem', color: "#ffd700"}}>Select Player ({targetPosition})</h2>
                <div className="modal-input-container">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <FormControl>
                            <InputLabel htmlFor={'playerSelect'}>Player</InputLabel>
                            <Select
                                id="playerSelect"
                                value={selectedPlayer.adminPlayerId}
                                label={"Player"}
                                onChange={handleChangePositionPlayer}
                                variant={'outlined'}
                            >
                                {
                                    targetPositionPlayers.map((p) => (
                                        <MenuItem key={p.adminPlayerId} value={p.adminPlayerId}>{p.adminPlayerName}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="modal-button-container">
                    <button className={'modal-button'} onClick={() => {
                        setTargetPosition("")
                        setSelectedPlayer({
                            adminPlayerId: null,
                            adminPlayerName: "",
                            position: null,
                        })
                        setIsModalOpen(false)
                    }}>close</button>
                    <button className={'modal-button'} onClick={handleSubmitSelection}>submit</button>
                </div>
            </Modal>

            <div className="share-rating-panel">
                <div className="share">
                    {/*<button onClick={share}>Share</button>*/}
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
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`star ${star <= rating ? 'active' : ''}`}
                            onClick={() => rate(star)}
                        >
                          &#9733;
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FootballTeamFormation;
