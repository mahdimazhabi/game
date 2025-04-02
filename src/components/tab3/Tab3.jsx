import {useCallback, useEffect, useState} from "react";
import "./Tab3.css";
import useWorldCupApi from "../../api/WorldCupApi/useWorldCupApi.jsx";
import {forEach} from "react-bootstrap/ElementChildren";

const Tab3 = () => {
    const userId = parseInt(localStorage.getItem("userId"));
    const {getTeamsByLevel, getCorrectPredictions, getTeamsAlreadyPredicted, addPrediction, editPrediction} = useWorldCupApi()
    const [status, setStatus] = useState("")
    const [playingLevel, setPlayingLevel] = useState(-1)
    const [userTeams, setUserTeams] = useState([])
    const [allTeams, setAllTeams] = useState({})
    const [updatedTeamsList, setUpdatedTeamsList] = useState([])
    const [updatedTeamsObject, setUpdatedTeamsObject] = useState({})

    const findNextLevel = (correctCounts) => {
        if (correctCounts === 16) return 2
        if (correctCounts === 24) return 3
        if (correctCounts === 28) return 4
        if (correctCounts === 30) return 5
        if (correctCounts === 31) return 6  // Winner!
        return -1
    }
    const findCurrentLevel = (correctCounts) => {
        if (0 <= correctCounts <= 16) return 1
        if (16 < correctCounts <= 24) return 2
        if (24 < correctCounts <= 28) return 3
        if (28 < correctCounts <= 30) return 4
        if (correctCounts === 31) return 5  // Winner!
    }
    const checkLevelPassed = async (level) => {
        const teams = await getTeamsByLevel(level)
        return !(teams.worldCups && teams.worldCups.length > 0);
    }
    const fetchTeamsForLevel = async () => {
        const correctPredictions = await getCorrectPredictions(userId);
        let currentLevel, nextLevel
        if (correctPredictions.message !== "Can not Play Next Level") {
            currentLevel = findCurrentLevel(correctPredictions.userWorldCups.length);
            nextLevel = findNextLevel(correctPredictions.userWorldCups.length);
            setPlayingLevel(nextLevel);
        } else {
            currentLevel = 1
            nextLevel = 2
            setPlayingLevel(1);
        }
		if (currentLevel === 5) {
            setStatus("All of your predictions were true. Congratulations!")
        }
        else {
            if (await checkLevelPassed(currentLevel)) {
                if (nextLevel === -1) {
                    setStatus("You failed. Better luck next time!")
                } else {
                    const nextLevelTeams = await getTeamsByLevel(nextLevel)
                    const groupedTeams = nextLevelTeams.reduce((acc, team) => {
                        const groupKey = String.fromCharCode(64 + team.groupNumber);
                        if (!acc[groupKey]) {
                            acc[groupKey] = [];
                        }
                        acc[groupKey].push({
                            worldCupId: team.worldCupId,
                            teamName: team.teamName,
                            groupNumber: team.groupNumber,
                        });
                        return acc;
                    }, {});
                    setAllTeams(groupedTeams);

                    const userPredictedGames = await getTeamsAlreadyPredicted(userId)
                    const predictedTeams = userPredictedGames.reduce((acc, team) => {
                        const existing = acc.find((item) => item.worldCupId === team.worldCupId);
                        if (!existing || team.userWorldCupId > existing.userWorldCupId) {
                            return [...acc.filter((item) => item.worldCupId !== team.worldCupId), team];
                        }
                        return acc;
                    }, []);
                    setUserTeams(predictedTeams);
                }
            } else {
                const nextLevelTeams = await getTeamsByLevel(currentLevel)
                const groupedTeams = nextLevelTeams.worldCups.reduce((acc, team) => {
                    const groupKey = String.fromCharCode(64 + team.groupNumber);
                    if (!acc[groupKey]) {
                        acc[groupKey] = [];
                    }
                    acc[groupKey].push({
                        worldCupId: team.worldCupId,
                        teamName: team.teamName,
                        groupNumber: team.groupNumber,
                    });
                    return acc;
                }, {});
                setAllTeams(groupedTeams);

                const userPredictedGames = await getTeamsAlreadyPredicted(userId)
                const predictedTeams = userPredictedGames.userWorldCups.reduce((acc, team) => {
                    const existing = acc.find((item) => item.worldCupId === team.worldCupId);
                    if (!existing || team.userWorldCupId > existing.userWorldCupId) {
                        return [...acc.filter((item) => item.worldCupId !== team.worldCupId), team];
                    }
                    return acc;
                }, []);
                setUserTeams(predictedTeams);
            }
        }
    };

    const handleSubmit = async () => {
        for (const updatedTeam of updatedTeamsList) {
            const existingTeam = userTeams.find((team) => team.worldCupId === updatedTeam.worldCupId);
            if (existingTeam) {
                if (existingTeam.position !== updatedTeam.position) {
                    await editPrediction(
                        {
                            userWorldCupId: updatedTeam.userWorldCupId,
                            position: (playingLevel !== 1 && updatedTeam.position !== 1) ? 3 : updatedTeam.position
                        }
                    );
                }
            } else {
                console.log({
                    worldCupId: updatedTeam.worldCupId,
                    position: (playingLevel !== 1 && updatedTeam.position !== 1) ? 3 : updatedTeam.position,
                    userId: parseInt(localStorage.getItem("userId"), 10)
                })
                await addPrediction(
                    {
                        worldCupId: updatedTeam.worldCupId,
                        position: (playingLevel !== 1 && updatedTeam.position !== 1) ? 3 : updatedTeam.position,
                        userId: parseInt(localStorage.getItem("userId"), 10)
                    }
                );
            }
        }
    };
    useEffect(() => {
        const allTeamsList = Object.values(allTeams).flat();

        const combinedList = allTeamsList.map((team) => {
            const matchingUserTeam = userTeams.find((userTeam) => userTeam.worldCupId === team.worldCupId);
            return {
                worldCupId: team.worldCupId,
                userWorldCupId: matchingUserTeam ? matchingUserTeam.userWorldCupId : null,
                position: matchingUserTeam ? matchingUserTeam.position : null,
            };
        });
        setUpdatedTeamsList(combinedList);

        const teamsObject = Object.keys(allTeams).reduce((acc, groupKey) => {
            acc[groupKey] = allTeams[groupKey].map((team) => {
                const matchingUserTeam = userTeams.find((userTeam) => userTeam.worldCupId === team.worldCupId);
                return {
                    ...team,
                    position: matchingUserTeam ? matchingUserTeam.position : null,
                };
            });
            return acc;
        }, {});

        setUpdatedTeamsObject(teamsObject);
    }, [allTeams, userTeams]);

    useEffect(() => {
        fetchTeamsForLevel().then()
    }, []);

    const setTeamPosition = (group, team, position) => {
        if (position >= 1 && position <= 4) {
            setUpdatedTeamsObject((prevTeams) => {
                const updatedTeams = {...prevTeams};

                updatedTeams[group] = updatedTeams[group].map((t) =>
                    t.worldCupId === team.worldCupId ? {...t, position} : t
                );
                return updatedTeams;
            });

            setUpdatedTeamsList((prevAllTeams) => {
                const updatedAllTeams = [...prevAllTeams];
                let targetTeam = updatedTeamsList.filter((t) => t.worldCupId === team.worldCupId)[0];
                console.log(targetTeam);
                targetTeam.position = position;
                let newTeamsList = updatedAllTeams.filter((t) => t.worldCupId !== team.worldCupId);
                newTeamsList = [...newTeamsList, targetTeam];
                return newTeamsList;
            });
        } else {
            alert("Please enter a number between 1 and 4!");
        }
    };


    const displayGroups = () => {
        return Object.keys(updatedTeamsObject).map((group) => (
            <div className="group" key={group}>
                <h3>Group {group}</h3>
                {updatedTeamsObject[group]
                    .slice()
                    .sort((a, b) => {
                        const posA = a.position ?? Infinity;
                        const posB = b.position ?? Infinity;
                        return posA - posB;
                    })
                    .map((team) => (
                        <div
                            key={team.worldCupId}
                            className="team"
                            onClick={() => {
                                const position = prompt(
                                    `Enter the position for ${team.teamName} (1 to 4):`
                                );
                                setTeamPosition(group, team, parseInt(position, 10));
                            }}>
                            {team.teamName} - Position: {team.position !== null ? team.position : "N/A"}
                        </div>
                    ))}
            </div>
        ));
    };

    return (
        <div className="container5">
            <h1>2025 FIFA Club World Cup Predictor</h1>

            {
                playingLevel !== -1 ?
                <div id="group-stage">
                    {
                        playingLevel === 1 ?
                            <h2>Group Matches</h2>
                            : playingLevel === 2 ?
                                <h2>Round of 16</h2>
                                : playingLevel === 3 ?
                                    <h2>Quarter Final</h2>
                                    : playingLevel === 4 ?
                                        <h2>Semi Final</h2>
                                        : playingLevel === 5 ?
                                            <h2>Final</h2> : null
                    }
                    <div id="groups-container">{displayGroups()}</div>
                    <button onClick={handleSubmit}>Submit predictions</button>
                </div> : <h2>{status}</h2>
            }
        </div>
    );
};

export default Tab3;
