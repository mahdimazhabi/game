import React, { useState } from 'react';
import './CoinTransfer.css';

const CoinTransfer = () => {
  const [transferType, setTransferType] = useState('user');
  const [coinType, setCoinType] = useState('Diamond');
  const [amount, setAmount] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [result, setResult] = useState('');

  const handleTransferTypeChange = (e) => {
    setTransferType(e.target.value);
  };

  const handleCoinTransfer = () => {
    if (transferType === 'user' && receiverId && amount) {
      setResult(`سکه ${coinType} با مقدار ${amount} به کاربر ${receiverId} منتقل شد.`);
    } else if (transferType === 'admin' && walletAddress && amount) {
      setResult(`سکه ${coinType} با مقدار ${amount} به آدرس کیف پول ${walletAddress} منتقل شد.`);
    } else {
      alert('لطفاً تمام فیلدها را به درستی پر کنید.');
    }
  };

  return (
    <div className="container">
      <h1>انتقال سکه</h1>
      <form>
        <label htmlFor="transferType">نوع انتقال</label>
        <select
          id="transferType"
          value={transferType}
          onChange={handleTransferTypeChange}
        >
          <option value="user">انتقال به کاربر</option>
          <option value="admin">انتقال به مدیر</option>
        </select>

        {transferType === 'user' && (
          <div id="userFields">
            <label htmlFor="receiverId">آیدی گیرنده</label>
            <input
              type="text"
              id="receiverId"
              value={receiverId}
              placeholder="آیدی گیرنده"
              onChange={(e) => setReceiverId(e.target.value)}
              pattern="[A-Za-z0-9]+"
              required
            />
          </div>
        )}

        {transferType === 'admin' && (
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

        <label htmlFor="coinType">نوع سکه</label>
        <select
          id="coinType"
          value={coinType}
          onChange={(e) => setCoinType(e.target.value)}
        >
          <option value="Diamond">سکه الماس</option>
          <option value="Gold">سکه طلا</option>
          <option value="Silver">سکه نقره</option>
          <option value="Bronze">سکه برنز</option>
        </select>

        <label htmlFor="amount">تعداد سکه</label>
        <input
          type="number"
          id="amount"
          value={amount}
          placeholder="تعداد سکه"
          min="1"
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button type="button" onClick={handleCoinTransfer}>
          انتقال سکه
        </button>
      </form>

      {result && (
        <div className="result">
          {result}
        </div>
      )}
    </div>
  );
};

export default CoinTransfer;
