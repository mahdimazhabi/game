import {useState, useEffect} from "react";
import img from "../../assets/img/IMG_20250208_182414_366-removebg-preview.png";
import "./Airdrop.css";

const TOTAL_TIME = 120 * 60; // 2 ساعت به ثانیه
const RESET_TIME = 24 * 60 * 60 * 1000; // 24 ساعت به میلی‌ثانیه
import useAirDropApi from "../../api/AirDropApi/useAirDropApi";
import useUserApi from "../../api/UserApi/useUserApi";

const Airdrop = () => {
    const [clickCount, setClickCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const {edit, getdatabyid} = useAirDropApi();
    const userId = useUserApi();
    const response = getdatabyid(userId);
    const [airdropEnded, setAirdropEnded] = useState(false);

    useEffect(() => {
        edit(clickCount, response);
    }, [clickCount]);

    useEffect(() => {
        const savedStartTime = localStorage.getItem("airdropStartTime");
        const savedTimeLeft = localStorage.getItem("airdropTimeLeft");

        const now = Date.now();

        if (savedStartTime) {
            const elapsedTime = now - parseInt(savedStartTime);

            if (elapsedTime >= RESET_TIME) {
                // اگر 24 ساعت گذشته باشد، ریست شود
                localStorage.setItem("airdropStartTime", now.toString());
                localStorage.setItem("airdropTimeLeft", TOTAL_TIME.toString());
                setTimeLeft(TOTAL_TIME);
            } else if (savedTimeLeft) {
                // محاسبه زمان باقی‌مانده
                const remainingTime = Math.max(
                    parseInt(savedTimeLeft) - Math.floor(elapsedTime / 1000),
                    0
                );
                setTimeLeft(remainingTime);
            }
        } else {
            // مقدار اولیه را تنظیم و ذخیره کنیم
            localStorage.setItem("airdropStartTime", now.toString());
            localStorage.setItem("airdropTimeLeft", TOTAL_TIME.toString());
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    setAirdropEnded(true);
                    return 0;
                }
                const newTime = prevTime - 1;
                localStorage.setItem("airdropTimeLeft", newTime.toString());
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
            2,
            "0"
        )}`;
    };

    const handleClick = () => {
        if (timeLeft > 0) {
            setClickCount((prevClickCount) => prevClickCount + 1);
            const circle = document.getElementById("clickableCircle");
            circle?.classList.add("shake");
            navigator.vibrate(100);
            setTimeout(() => circle?.classList.remove("shake"), 200);

            if ((clickCount + 1) % 5 === 0) {
                createGem();
            }
        } else {
            setAirdropEnded(true);
        }
    };

    const createGem = () => {
        const gem = document.createElement("div");
        gem.classList.add("gem");
        gem.innerText = "💎";

        const circle = document.getElementById("clickableCircle");
        if (!circle) return;

        const circleRect = circle.getBoundingClientRect();
        const x = Math.random() * (circleRect.width - 100) + circleRect.left;
        const y = Math.random() * (circleRect.height - 100) + circleRect.top;

        gem.style.position = "absolute";
        gem.style.left = `${x}px`;
        gem.style.top = `${y}px`;
        document.body.appendChild(gem);

        setTimeout(() => {
            gem.remove();
        }, 500);
    };

    return (
        <section>
            <div className="container">
                <div className="timer">{formatTime(timeLeft)}</div>
                {airdropEnded && (
                    <div className="alert-box ">The airdrop time has ended!</div>
                )}
                <h1>AirDrop</h1>
                <div className="circle" id="clickableCircle" onClick={handleClick}>
                    <img src={img} alt="Logo" className="logo"/>
                </div>
            </div>
        </section>
    );
};

export default Airdrop;
