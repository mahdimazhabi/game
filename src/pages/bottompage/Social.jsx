import { useState } from "react";

const InvitePage = () => {
  const socialMedia = [
    {
      name: "Instagram",
      link: "https://www.instagram.com/sisil_org",
      logo: "/instagram-logo.png",
    },
    {
      name: "Telegram",
      link: "https://t.me/sisil_org",
      logo: "/telegram-logo.png",
    },
    {
      name: "Twitter",
      link: "https://twitter.com/sisil_org",
      logo: "/twitter-logo.png",
    },
    {
      name: "YouTube",
      link: "https://www.youtube.com/@sisil_org",
      logo: "/youtube-logo.png",
    },
    {
      name: "TikTok",
      link: "https://www.tiktok.com/@sisil_org",
      logo: "/tiktok-logo.png",
    },
  ];

  // استیت برای ذخیره وضعیت هاور هر آیتم
  const [hoveredIndex, setHoveredIndex] = useState();

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      backgroundColor: "#000",
      color: "#fff",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      marginBottom: "30px",
      fontSize: "2.5rem",
    },
    socialLinks: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
    },
    link: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      textDecoration: "none",
      background: "rgba(255, 255, 255, 0.1)",
      transition: "transform 0.3s, box-shadow 0.3s, background 0.3s",
    },
    image: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      transition: "transform 0.2s",
    },
    hoverEffect: {
      transform: "scale(1.1)",
      boxShadow:
        "0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 0, 255, 0.8)",
      background: "rgba(255, 255, 255, 0.2)",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Join Our Channels</h1>
      <div style={styles.socialLinks}>
        {socialMedia.map((item, index) => (
          <a
            key={item.name}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...styles.link,
              ...(hoveredIndex === index ? styles.hoverEffect : {}),
            }}
            title={item.name}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={item.logo}
              alt={`${item.name} Logo`}
              style={styles.image}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default InvitePage;
