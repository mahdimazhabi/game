import { useEffect } from "react";
import sampleVideo from "../../assets/video/sample.mp4";

const VideoSplashScreen = ({ onFinish }) => {
  // 🟢 `onFinish` را به‌درستی دریافت کنید
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onFinish === "function") {
        onFinish(); // بعد از چند ثانیه وارد صفحه اصلی شود
      }
    }, 1); // تنظیم زمان نمایش ویدیو (۵ ثانیه)

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div>
      <video
        autoPlay
        playsInline
        muted
        className="object-cover"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      >
        <source src={sampleVideo} type="video/mp4" />
      </video>
      <h5>The Best Game in the World!</h5>
    </div>
  );
};

export default VideoSplashScreen;
