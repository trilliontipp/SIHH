import React, { useEffect, useState } from "react";

// Paper Airplane SVG Component
const PaperAirplane = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M21.5 2.5L12.5 21.5L8.5 12.5L21.5 2.5Z" 
      fill="white" 
      stroke="rgba(255,255,255,0.8)" 
      strokeWidth="1"
    />
    <path 
      d="M8.5 12.5L2.5 8.5L21.5 2.5" 
      fill="none" 
      stroke="rgba(255,255,255,0.6)" 
      strokeWidth="0.5"
    />
  </svg>
);

const Home = () => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Paper airplane animation keyframes with curved path following
  const airplaneKeyframes = `
    @keyframes paperAirplaneFlyPath1 {
      0% {
        transform: translateX(-50px) translateY(80px) rotate(-15deg);
        opacity: 0;
      }
      5% {
        opacity: 1;
      }
      25% {
        transform: translateX(20vw) translateY(20px) rotate(10deg);
      }
      50% {
        transform: translateX(50vw) translateY(60px) rotate(-5deg);
      }
      75% {
        transform: translateX(80vw) translateY(100px) rotate(15deg);
      }
      95% {
        opacity: 1;
      }
      100% {
        transform: translateX(calc(100vw + 50px)) translateY(120px) rotate(20deg);
        opacity: 0;
      }
    }

    @keyframes paperAirplaneFlyPath2 {
      0% {
        transform: translateX(-50px) translateY(calc(70vh)) rotate(-10deg);
        opacity: 0;
      }
      8% {
        opacity: 0.8;
      }
      30% {
        transform: translateX(25vw) translateY(calc(70vh - 40px)) rotate(5deg);
      }
      60% {
        transform: translateX(60vw) translateY(calc(70vh + 20px)) rotate(-8deg);
      }
      85% {
        transform: translateX(85vw) translateY(calc(70vh - 20px)) rotate(12deg);
      }
      92% {
        opacity: 0.8;
      }
      100% {
        transform: translateX(calc(100vw + 50px)) translateY(calc(70vh)) rotate(15deg);
        opacity: 0;
      }
    }

    @keyframes dashMove {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: 20; }
    }
  `;

  const styles = {
    container: {
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "#1f2937",
      background: "linear-gradient(180deg, #fbfcfe 0%, #f7f9fc 100%)",
      overflow: "hidden",
      padding: "0 32px",
      position: "relative",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      boxSizing: "border-box",
      transform: "translateY(-50px)",
      transition: "transform 0.8s ease-out",
    },
    
    statusIndicator: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "48px",
      padding: "8px 16px",
      backgroundColor: "#f0fdf4",
      border: "1px solid #dcfce7",
      borderRadius: "20px",
      fontSize: "0.875rem",
      color: "#166534",
      fontWeight: "500",
      opacity: fade ? 1 : 0,
      transform: fade ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      zIndex: 2,
    },
    statusDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: "#10b981",
      boxShadow: "0 0 5px #10b981",
    },
    heading: {
      fontSize: "4.5rem",
      fontWeight: "800",
      maxWidth: "900px",
      lineHeight: "1.1",
      opacity: fade ? 1 : 0,
      transform: fade ? "translateY(0)" : "translateY(30px)",
      transition: "opacity 0.8s ease-out 0.1s, transform 0.8s ease-out 0.1s",
      color: "#1a202c",
      letterSpacing: "-0.03em",
      marginBottom: "20px",
      zIndex: 2,
    },
    headingGradient: {
      background: "linear-gradient(135deg, #6a40ed 0%, #d459eb 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    paragraph: {
      fontSize: "1.3rem",
      maxWidth: "650px",
      marginBottom: "80px",
      opacity: fade ? 1 : 0,
      transform: fade ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
      color: "#4a5568",
      lineHeight: "1.7",
      zIndex: 2,
    },
    featureGrid: {
      display: "flex",
      gap: "24px",
      flexWrap: "wrap",
      justifyContent: "center",
      position: "relative",
      marginTop: "-30px",
      opacity: fade ? 1 : 0,
      transform: fade ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s",
      zIndex: 3,
    },
    featureCard: {
      padding: "14px 24px",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(229, 231, 235, 0.6)",
      borderRadius: "14px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
      fontSize: "0.95rem",
      color: "#4a5568",
      fontWeight: "600",
      minWidth: "160px",
      textAlign: "center",
      transition: "background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out",
    },
    purpleBlob: {
        position: "absolute",
        width: "350px",
        height: "100px",
        background: "linear-gradient(135deg, #6a40ed 0%, #d459eb 100%)",
        borderRadius: "50%",
        filter: "blur(40px)",
        opacity: fade ? 0.6 : 0,
        transition: "opacity 1s ease-out 0.4s",
        bottom: "-60px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1,
    },

    // Paper airplane animation styles
    airplaneAnimationWrapper: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 4,
      overflow: "hidden",
    },
    
    animatedAirplane: {
      position: "absolute",
      width: "28px",
      height: "28px",
      background: "linear-gradient(135deg, #6a40ed 0%, #d459eb 100%)",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 12px rgba(106, 64, 237, 0.4)",
    },
    
    airplane1: {
      animation: fade ? "paperAirplaneFlyPath1 12s ease-in-out infinite" : "none",
      animationDelay: "2s",
      position: "absolute",
      top: "0",
      left: "0",
    },
    
    airplane2: {
      animation: fade ? "paperAirplaneFlyPath2 15s ease-in-out infinite" : "none",
      animationDelay: "6s",
      position: "absolute",
      top: "0", 
      left: "0",
    },

    dottedPath: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 1,
    },
  };

  const handleFeatureCardHover = (e, isHover, initialTransform) => {
    if (isHover) {
      e.currentTarget.style.transform = `translateY(-15px)`;
      e.currentTarget.style.boxShadow = "0 12px 25px rgba(0, 0, 0, 0.12)";
      e.currentTarget.style.transition = "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out";
    } else {
      e.currentTarget.style.transform = initialTransform;
      e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.08)";
      e.currentTarget.style.transition = styles.featureCard.transition + ", transform 0.8s ease-out, box-shadow 0.2s ease-in-out";
    }
  };

  return (
    <div style={styles.container}>
      {/* Inject keyframes for paper airplane animation */}
      <style>{airplaneKeyframes}</style>
      
      {/* Paper Airplane Animation Wrapper */}
      <div style={styles.airplaneAnimationWrapper}>
        {/* Dotted Flight Paths */}
        <svg 
          style={styles.dottedPath}
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="dashPattern1" patternUnits="userSpaceOnUse" width="3" height="1">
              <circle cx="1.5" cy="0.5" r="0.2" fill="rgba(106, 64, 237, 0.5)"/>
            </pattern>
            <pattern id="dashPattern2" patternUnits="userSpaceOnUse" width="3" height="1">
              <circle cx="1.5" cy="0.5" r="0.2" fill="rgba(212, 89, 235, 0.5)"/>
            </pattern>
          </defs>
          {/* Path 1 - Top curved path */}
          <path 
            d="M5 20 Q30 5, 50 25 Q70 45, 95 30"
            fill="none" 
            stroke="url(#dashPattern1)"
            strokeWidth="0.4"
            strokeDasharray="2 3"
            opacity={fade ? "0.7" : "0"}
            style={{
              animation: fade ? "dashMove 3s linear infinite" : "none",
              transition: "opacity 1s ease-in-out"
            }}
          />
          {/* Path 2 - Bottom curved path */}
          <path 
            d="M5 75 Q25 60, 45 80 Q65 95, 95 75"
            fill="none" 
            stroke="url(#dashPattern2)"
            strokeWidth="0.4"
            strokeDasharray="2 3"
            opacity={fade ? "0.6" : "0"}
            style={{
              animation: fade ? "dashMove 4s linear infinite reverse" : "none",
              transition: "opacity 1s ease-in-out 0.5s"
            }}
          />
        </svg>
        
        {/* Flying Airplanes */}
        <div style={{ ...styles.animatedAirplane, ...styles.airplane1 }}>
          <PaperAirplane />
        </div>
        <div style={{ ...styles.animatedAirplane, ...styles.airplane2 }}>
          <PaperAirplane />
        </div>
      </div>
      
      <div style={styles.statusIndicator}>
        <div style={styles.statusDot}></div>
        AI-Powered Exploration
      </div>

      <h1 style={styles.heading}>
        Welcome to{" "}
        <span style={styles.headingGradient}>AR Explorer</span>
      </h1>
      
      <p style={styles.paragraph}>
        Dive into India's ancient monuments, forts, and temples in augmented
        reality. Experience history like never before.
      </p>

      <div style={styles.featureGrid}>
        <div 
          style={{ ...styles.featureCard, 
                   transform: fade ? "translate(0, -10px)" : "translate(0, 10px)", 
                   transition: `transform 0.8s ease-out 0.3s, ${styles.featureCard.transition}`
                 }}
          onMouseEnter={(e) => handleFeatureCardHover(e, true, fade ? "translate(0, -10px)" : "translate(0, 10px)")}
          onMouseLeave={(e) => handleFeatureCardHover(e, false, fade ? "translate(0, -10px)" : "translate(0, 10px)")}
        >
          AR Experience
        </div>
        <div 
          style={{ ...styles.featureCard, 
                   transform: fade ? "translate(0, 5px)" : "translate(0, 25px)", 
                   transition: `transform 0.8s ease-out 0.35s, ${styles.featureCard.transition}`
                 }}
          onMouseEnter={(e) => handleFeatureCardHover(e, true, fade ? "translate(0, 5px)" : "translate(0, 25px)")}
          onMouseLeave={(e) => handleFeatureCardHover(e, false, fade ? "translate(0, 5px)" : "translate(0, 25px)")}
        >
          Historical Sites
        </div>
        <div 
          style={{ ...styles.featureCard, 
                   transform: fade ? "translate(0, -15px)" : "translate(0, 5px)", 
                   transition: `transform 0.8s ease-out 0.4s, ${styles.featureCard.transition}`
                 }}
          onMouseEnter={(e) => handleFeatureCardHover(e, true, fade ? "translate(0, -15px)" : "translate(0, 5px)")}
          onMouseLeave={(e) => handleFeatureCardHover(e, false, fade ? "translate(0, -15px)" : "translate(0, 5px)")}
        >
          Interactive Maps
        </div>
        <div 
          style={{ ...styles.featureCard, 
                   transform: fade ? "translate(0, 0px)" : "translate(0, 20px)", 
                   transition: `transform 0.8s ease-out 0.45s, ${styles.featureCard.transition}`
                 }}
          onMouseEnter={(e) => handleFeatureCardHover(e, true, fade ? "translate(0, 0px)" : "translate(0, 20px)")}
          onMouseLeave={(e) => handleFeatureCardHover(e, false, fade ? "translate(0, 0px)" : "translate(0, 20px)")}
        >
          AI Guidance
        </div>
        <div style={styles.purpleBlob} /> 
      </div>
    </div>
  );
};

export default Home;