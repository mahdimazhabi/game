import { useState } from "react";
import "./CoinTransfer.css";
import Password from "../../components/password/Password";

const CoinTransfer = () => {
  const [transferType, setTransferType] = useState("user");
  const [coinType, setCoinType] = useState("Diamond");
  const [amount, setAmount] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [result, setResult] = useState("");

  const handleTransferTypeChange = (e) => {
    setTransferType(e.target.value);
  };

  const handleCoinTransfer = () => {
    if (transferType === "user" && receiverId && amount) {
      setResult(
        `سکه ${coinType} با مقدار ${amount} به کاربر ${receiverId} منتقل شد.`
      );
    } else if (transferType === "admin" && walletAddress && amount) {
      setResult(
        `سکه ${coinType} با مقدار ${amount} به آدرس کیف پول ${walletAddress} منتقل شد.`
      );
    } else {
      alert("لطفاً تمام فیلدها را به درستی پر کنید.");
    }
  };

  return (
    <div className="container">
      <h1>transfer of sec</h1>
      <form>
        <label htmlFor="transferType">Transfer type</label>
        <select
          id="transferType"
          value={transferType}
          onChange={handleTransferTypeChange}
        >
          <option value="user">Transfer to the user</option>
          <option value="admin">Transfer to manager</option>
        </select>

        {transferType === "user" && (
          <div id="userFields">
            <label htmlFor="receiverId">Receiver ID</label>
            <input
              type="text"
              id="receiverId"
              value={receiverId}
              placeholder="Receiver ID"
              onChange={(e) => setReceiverId(e.target.value)}
              pattern="[A-Za-z0-9]+"
              required
            />
          </div>
        )}

        {transferType === "admin" && (
          <div id="adminFields">
            <label htmlFor="walletAddress">آدرس کیف پول گیرنده</label>
            <input
              type="text"
              id="walletAddress"
              value={walletAddress}
              placeholder="آدرس کیف پول"
              onChange={(e) => setWalletAddress(e.target.value)}
              pattern="[A-Za-z0-9]+"
              required
            />
          </div>
        )}

        <label htmlFor="coinType">type of coin</label>
        <select
          id="coinType"
          value={coinType}
          onChange={(e) => setCoinType(e.target.value)}
        >
          <option value="Diamond">Diamond Coin</option>
          <option value="Gold">Gold Coin</option>
          <option value="Silver">Silver Coin</option>
          <option value="Bronze">Bronze Coin</option>
        </select>

        <label htmlFor="amount">Number of Coins</label>
        <input
          type="number"
          id="amount"
          value={amount}
          placeholder="Enter number of coins"
          min="1"
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="button" onClick={handleCoinTransfer}>
          Transfer Coins
        </button>
      </form>

      {result && <div className="result">{result}</div>}
    </div>
  );
};

export default CoinTransfer;
