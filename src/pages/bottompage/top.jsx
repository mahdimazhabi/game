import React, { useState } from "react";
import "./top.css"; // فایل استایل جداگانه

const UserPage = () => {
  const [referralLink] = useState("your-referral-link.com");

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("لینک کپی شد!");
  };

  return (
    <div className="user-page">
      <header>
        <div className="user-info">
          <div className="profile-box">
            <span className="user-name">نام کاربر</span>
          </div>
          <span>امتیاز کل: 1200</span>
        </div>
      </header>

      <div className="referral-link">
        <h2>دریافت لینک رفرال</h2>
        <input type="text" value={referralLink} readOnly />
        <button className="copy-button" onClick={handleCopy}>کپی</button>
      </div>

      <div className="container">
        <div className="box">
          <h2>پنج نفر اول جذب رفرال</h2>
          <ul>
            <li>کاربر ۱: 10 رفرال</li>
            <li>کاربر ۲: 9 رفرال</li>
            <li>کاربر ۳: 7 رفرال</li>
            <li>کاربر ۴: 5 رفرال</li>
            <li>کاربر ۵: 3 رفرال</li>
          </ul>
        </div>

        <div className="box">
          <h2>پنج نفر با بالاترین امتیاز فوتبال لیگ</h2>
          <ul>
            <li>کاربر A: 150 امتیاز</li>
            <li>کاربر B: 140 امتیاز</li>
            <li>کاربر C: 130 امتیاز</li>
            <li>کاربر D: 120 امتیاز</li>
            <li>کاربر E: 110 امتیاز</li>
          </ul>
        </div>

        <div className="box">
          <h2>پنج نفر با بالاترین امتیاز هورس لیگ</h2>
          <ul>
            <li>کاربر I: 200 امتیاز</li>
            <li>کاربر II: 190 امتیاز</li>
            <li>کاربر III: 180 امتیاز</li>
            <li>کاربر IV: 170 امتیاز</li>
            <li>کاربر V: 160 امتیاز</li>
          </ul>
        </div>
      </div>

      <footer>
        <button className="logout">خروج</button>
      </footer>
    </div>
  );
};

export default UserPage;
