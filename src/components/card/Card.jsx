import "./Card.css";

const Card = () => {
  const prizes = [
    "یک تخفیف 10%!",
    "یک قهوه رایگان!",
    "یک هدیه ویژه!",
    "پاداش 5000 تومانی!",
  ]; // جوایز رندوم

  const handleClick = () => {
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)]; // انتخاب جایزه رندوم
    alert(`تبریک! شما جایزه زیر را بردید: ${randomPrize}`); // نمایش جایزه در alert
    window.history.back(); // بازگشت به صفحه قبلی
  };

  const cards = Array(100).fill(null); // ایجاد آرایه با 100 کارت

  return (
    <div className="card-container">
      {cards.map((_, index) => (
        <div key={index} className="card" onClick={handleClick}>
          <h3>Card {index + 1}</h3>
        </div>
      ))}
    </div>
  );
};

export default Card;
