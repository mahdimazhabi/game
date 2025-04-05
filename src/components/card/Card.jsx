import "./Card.css";
import { useEffect, useState } from "react";
import useGiftApi from "./../../api/GiftAPI/useGiftAPI.jsx"; // Adjust import path

const Card = () => {
    const { getAllGifts, getAllUsersCoins, addCoin, editCoin } = useGiftApi();
    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        const loadGifts = async () => {
            const giftsData = await getAllGifts();
            if (giftsData) setGifts(giftsData);
        };
        loadGifts();
    }, []);

    const getCoinName = (levelCoin) => {
        switch (levelCoin) {
            case 1: return "Diamond";
            case 2: return "Gold";
            case 3: return "Silver";
            case 4: return "Bronze";
            default: return "";
        }
    };

    const handleCardClick = async (gift) => {
        const userId = parseInt(localStorage.getItem("userId"));
        if (!userId) {
            alert("User not authenticated!");
            return;
        }

        try {
            if (gift.isCoin === 1) {
                const userCoins = await getAllUsersCoins();
                const existingCoin = userCoins.find(
                    coin => coin.levelCoinId === gift.levelCoin
                );

                const requestBody = {
                    levelCoinId: gift.levelCoin,
                    count: gift.coinCount
                };
                let res
                if (existingCoin) {
                    res = await editCoin({
                        ...requestBody,
                        levelCoinCountId: existingCoin.levelCoinCountId,
                        count: existingCoin.count + gift.coinCount
                    });
                } else {
                    res = await addCoin({
                        ...requestBody,
                        userId: userId
                    });
                }
                if (res) alert(`Congratulations! You win ${gift.coinCount} ${getCoinName(gift.levelCoin)} Coins`);
            } else {
                alert(`Congratulations! You win ${gift.name}`);
            }
        } catch (error) {
            console.error("Operation failed:", error);
            alert("An error occurred!");
            return;
        }

        window.history.back();
    };

    return (
        <div className="card-container" style={{ marginBottom: "10rem" }}>
            {gifts.map((gift) => (
                <div
                    key={gift.giftId}
                    className="card"
                    onClick={() => handleCardClick(gift)}
                >
                    <h3>{gift.name}</h3>
                </div>
            ))}
        </div>
    );
};

export default Card;