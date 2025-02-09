import { useState, useEffect } from "react";
import "./Password.css";
import { useNavigate } from "react-router-dom";

const Password = () => {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isPasswordSet, setIsPasswordSet] = useState(false); // برای بررسی اینکه پسورد ست شده یا نه
  const navigate = useNavigate(); // برای هدایت به صفحه‌ی دیگر

  useEffect(() => {
    // چک می‌کنیم که آیا پسورد ذخیره شده است یا نه
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedPassword) {
      setIsPasswordSet(true); // اگر پسورد ذخیره شده باشد، آن را به عنوان true در نظر می‌گیریم
    }
  }, []);

  const addNumber = (num) => {
    if (enteredPassword.length < 8) {
      setEnteredPassword((prev) => prev + num);
    }
  };

  const deleteLast = () => {
    setEnteredPassword((prev) => prev.slice(0, -1));
  };

  const checkPassword = () => {
    const savedPassword = localStorage.getItem("savedPassword");

    if (!savedPassword) {
      // اگر پسورد ذخیره نشده باشد، آن را در localStorage ذخیره کرده و از کاربر می‌خواهیم که رمز را وارد کند
      localStorage.setItem("savedPassword", enteredPassword);
      alert("رمز شما با موفقیت ذخیره شد!");
      setEnteredPassword(""); // پاک کردن ورودی
      setIsPasswordSet(true); // پسورد ست شده
      navigate("/cointransfer", { replace: true });
    } else {
      // اگر پسورد ذخیره شده باشد، آن را با پسورد وارد شده مقایسه می‌کنیم
      if (enteredPassword === savedPassword) {
        navigate("/cointransfer", { replace: true }); // هدایت به صفحه انتقال سکه
      } else {
        alert("رمز نادرست است!");
        if (navigator.vibrate) {
          navigator.vibrate(200); // ویبره در صورت پشتیبانی
        }
        setEnteredPassword(""); // پاک کردن ورودی
      }
    }
  };

  useEffect(() => {
    if (enteredPassword.length === 8) {
      checkPassword(); // وقتی پسورد کامل شد، تابع checkPassword را صدا می‌زنیم
    }
  }, [enteredPassword]);

  return (
    <div className="dial-pad">
      <div className="password-header">
        {isPasswordSet ? "رمز ورود" : "ست کردن رمز"}{" "}
        {/* نمایش متن بر اساس وضعیت پسورد */}
      </div>
      <div className="stars-display">{enteredPassword.replace(/./g, "•")}</div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "⌫"].map((item, index) => (
        <div
          key={index}
          className="button"
          onClick={() =>
            item === "⌫"
              ? deleteLast()
              : item !== "*" && addNumber(Number(item))
          }
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Password;
