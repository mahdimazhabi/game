import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CardContext.css";

export default function RewardCard() {
  const navigate = useNavigate();
  const validCodes = new Set(["1234567", "7654321", "1111111"]);
  const [code, setCode] = useState("");

  // بررسی کد و هدایت به صفحه جدید
  function checkCode() {
    if (validCodes.has(code)) {
      navigate("/rewards"); // هدایت به صفحه جدید
    } else {
      alert("رمز نادرست یا قبلاً استفاده شده است.");
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="login-container">
        <h2>Login to the System</h2>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter the 7-digit password"
          maxLength={7}
        />
        <button onClick={checkCode}>Login</button>
      </div>
    </div>
  );
}
