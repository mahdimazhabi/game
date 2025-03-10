// src/api.js
import axios from "axios";

// ایجاد یک نمونه از axios با تنظیمات دلخواه
const api = axios.create({
  baseURL: "https://asp-backend-proxy.chbk.app/api", // آدرس API خود را وارد کنید
  timeout: 10000, // افزایش تایم‌اوت به 10000 میلی‌ثانیه (10 ثانیه)
  headers: {
    "Content-Type": "application/json", // نوع محتوا را JSON تنظیم می‌کنیم
  },
});

// شما می‌توانید اینجا از Interceptorها برای درخواست‌ها و پاسخ‌ها استفاده کنید

export default api;
