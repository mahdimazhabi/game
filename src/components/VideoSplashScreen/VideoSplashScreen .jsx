import { useEffect } from "react";
import sampleVideo from "../../assets/video/sample.mp4";

const VideoSplashScreen = ({ onFinish }) => {
  // 🟢 `onFinish` را به‌درستی دریافت کنید
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onFinish === "function") {
        onFinish(); // بعد از چند ثانیه وارد صفحه اصلی شود
      }
    }, 15000); // تنظیم زمان نمایش ویدیو (۵ ثانیه)

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <video
      autoPlay
      playsInline
      muted
      className="object-cover"
      style={{ width: "20rem", height: "60rem", objectFit: "cover" }}
    >
      <source src={sampleVideo} type="video/mp4" />
    </video>
  );
};

export default VideoSplashScreen;
