import { useEffect, useRef } from "react";
import sampleVideo from "../../assets/video/sample.mp4";
import "./videoCSS.css"
const VideoSplashScreen = ({ onFinish }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        // Add cache-buster to video source
        const cacheBuster = `?t=${Date.now()}`;
        if (videoRef.current) {
            videoRef.current.src = `${sampleVideo}${cacheBuster}`;
        }

        // Handle video ending
        const handleVideoEnd = () => {
            if (typeof onFinish === "function") {
                onFinish();
            }
        };

        // Set up event listeners
        const videoElement = videoRef.current;
        videoElement?.addEventListener('ended', handleVideoEnd);

        // Fallback timer in case video doesn't fire ended event
        const timer = setTimeout(() => {
            handleVideoEnd();
        }, 1);

        // Start playing explicitly
        const playPromise = videoElement?.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Video play prevented:', error);
            });
        }

        return () => {
            clearTimeout(timer);
            videoElement?.removeEventListener('ended', handleVideoEnd);
        };
    }, [onFinish]);

    return (
        <div className="video-container">
            <video
                ref={videoRef}
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