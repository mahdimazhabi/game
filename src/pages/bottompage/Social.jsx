import React, { useState } from "react";
import "./Social.css"; // فایل CSS را جداگانه ذخیره کنید
import instagram from "./image/instagram.jpg";
import telegram from "./image/telegram.png";
import twitter from "./image/twitter.png";
import youtube from "./image/youtube.png";
import tik from "./image/54.jfif";
const InvitePage = () => {
  const [letter, setLetter] = useState("شما نامه‌ای از مدیر ندارید.");

  const handleGetLetter = () => {
    setLetter("سلام! خوش آمدید به کانال ما. امیدواریم که از مطالب ما لذت ببرید.");
  };

  return (
    <div className="invite-page">
      <h1>دعوت به عضویت در کانال‌ها</h1>

      <div className="mailbox">
        <i className="fas fa-envelope"></i>
        <h2>صندوق نامه</h2>
        <p>{letter}</p>
        <button onClick={handleGetLetter}>دریافت نامه</button>
      </div>

      <div className="social-links">
        <a href="https://www.instagram.com/sisil_org" target="_blank" className="instagram" title="اینستاگرام">
          <img src={instagram} alt="Instagram Logo" />
        </a>
        <a href="https://t.me/sisil_org" target="_blank" className="telegram" title="تلگرام">
          <img src={telegram} alt="Telegram Logo" />
        </a>
        <a href="https://twitter.com/sisil_org" target="_blank" className="twitter" title="تویتر">
          <img src={twitter} alt="Twitter Logo" />
        </a>
        <a href="https://www.youtube.com/@sisil_org" target="_blank" className="youtube" title="یوتیوب">
          <img src={youtube} alt="YouTube Logo" />
        </a>
        <a href="https://www.tiktok.com/@sisil_org" target="_blank" className="tiktok" title="تیک‌تاک">
          <img src={tik} alt="Tiktok Logo" />
        </a>
      </div>
    </div>
  );
};

export default InvitePage;
