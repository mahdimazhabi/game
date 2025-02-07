// src/api.js
import axios from 'axios';

// ایجاد یک نمونه از axios با تنظیمات دلخواه
const api = axios.create({
  baseURL: ' http://127.0.0.1:8001', // آدرس API خود را وارد کنید
  timeout: 10000, // افزایش تایم‌اوت به 10000 میلی‌ثانیه (10 ثانیه)
  headers: {
    'Content-Type': 'application/json', // نوع محتوا را JSON تنظیم می‌کنیم
  },
});

// شما می‌توانید اینجا از Interceptorها برای درخواست‌ها و پاسخ‌ها استفاده کنید

export default api;
