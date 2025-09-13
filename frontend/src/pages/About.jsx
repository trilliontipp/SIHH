import React, { useEffect, useState } from "react";

// Global styles for consistency (assuming this is defined in App.jsx or a separate theme file)
const globalStyles = {
  mainBackground: "linear-gradient(180deg, #fbfcfe 0%, #f7f9fc 100%)", // Light, subtle background for the entire app
  cardBackground: "rgba(255, 255, 255, 0.85)", // Slightly opaque white for frosted look of cards
  borderColor: "#e0e7f0", // Light subtle border
  shadowLight: "0 4px 12px rgba(0, 0, 0, 0.06)",
  shadowMedium: "0 8px 20px rgba(0, 0, 0, 0.08)",
  shadowHeavy: "0 15px 40px rgba(0, 0, 0, 0.08)",
  primaryColor: "#6a40ed", // Main purple
  secondaryColor: "#d459eb", // Main pink
  textColorPrimary: "#1a202c",
  textColorSecondary: "#4a5568",
  textColorMuted: "#9ca3af",
  successGreen: "#10b981",
  successBg: "#f0fdf4",
  successBorder: "#dcfce7",
  borderRadiusBase: "12px", // Consistent border radius
  borderRadiusLarge: "16px",
  borderRadiusXLarge: "20px",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const About = () => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    {
      title: "Our Mission",
      content:
        "To bring India’s rich cultural heritage to life through augmented reality, making history immersive, interactive, and unforgettable.",
    },
    {
      title: "Our Vision",
      content:
        "Empower people to explore, learn, and experience historical monuments and temples in ways never seen before, bridging technology and tradition.",
    },
    {
      title: "Why AR Explorer?",
      content:
        "Because we believe history should be experienced, not just read. Explore, interact, and travel back in time with just a tap.",
    },
  ];

  const styles = {
    container: {
      minHeight: "100%", // Take full height of main content area
      width: "100%",
      // --- REMOVED REDUNDANT BACKGROUND ---
      // This container ITSELF is the frosted card, App.jsx's mainBackground will show around it.
      background: globalStyles.cardBackground, // This is the white, frosted background for the *entire* About page content block.
      backdropFilter: "blur(12px)", // Apply frosted effect here for the main About page block
      color: globalStyles.textColorSecondary, // Default text color
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "60px 20px", // Consistent padding inside this main block
      boxSizing: "border-box",
      fontFamily: globalStyles.fontFamily,
      position: "relative",
      overflow: "hidden", 
      borderRadius: globalStyles.borderRadiusLarge, // Match main content area rounding
      boxShadow: globalStyles.shadowHeavy, // Give it a pronounced card-like feel
    },
    heroSection: {
      textAlign: "center",
      maxWidth: "900px",
      marginBottom: "60px",
      opacity: fade ? 1 : 0,
      transform: fade ? "translateY(0)" : "translateY(30px)",
      transition: "all 1s ease-out",
    },
    heroHeading: {
      fontSize: "3.2rem",
      fontWeight: "800",
      marginBottom: "20px",
      color: globalStyles.textColorPrimary, 
      background: `linear-gradient(135deg, ${globalStyles.primaryColor} 0%, ${globalStyles.secondaryColor} 100%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      letterSpacing: "-0.03em",
    },
    heroParagraph: {
      fontSize: "1.25rem",
      lineHeight: "1.7",
      color: globalStyles.textColorSecondary,
    },
    sectionsWrapper: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "stretch", 
      gap: "30px",
      width: "100%",
      maxWidth: "1200px",
    },
    sectionCard: {
      background: globalStyles.cardBackground, // Frosted white background for individual cards
      backdropFilter: "blur(10px)", // Frosted glass effect for individual cards (slightly less blur than main container)
      color: globalStyles.textColorSecondary,
      borderRadius: globalStyles.borderRadiusXLarge,
      padding: "35px",
      flex: "1 1 300px",
      boxShadow: globalStyles.shadowMedium,
      border: `1px solid ${globalStyles.borderColor}`,
      opacity: fade ? 1 : 0,
      transform: fade ? "translateY(0)" : "translateY(50px)",
      transition: `all 0.6s ease-out`,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      textAlign: "left",
    },
    cardTitle: {
      fontSize: "1.6rem", 
      fontWeight: "700",
      marginBottom: "15px",
      color: globalStyles.textColorPrimary, 
      letterSpacing: "-0.02em",
    },
    cardContent: {
      fontSize: "1.05rem", 
      lineHeight: "1.6",
      color: globalStyles.textColorSecondary,
    },
    backgroundPattern: { // Subtle grid pattern
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.03,
        background: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='100' height='100' fill='none'/%3E%3Cline x1='0' y1='0' x2='100' y2='0' stroke='%23d1d5db' stroke-width='0.2'/%3E%3Cline x1='0' y1='100' x2='100' y2='100' stroke='%23d1d5db' stroke-width='0.2'/%3E%3Cline x1='0' y1='0' x2='0' y2='100' stroke='%23d1d5db' stroke-width='0.2'/%3E%3Cline x1='100' y1='0' x2='100' y2='100' stroke='%23d1d5db' stroke-width='0.2'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
        pointerEvents: "none",
        zIndex: 0,
    },
    purpleBlobAmbiance: { // Blurred gradient blob
        position: "absolute",
        width: "600px",
        height: "300px",
        background: `linear-gradient(135deg, ${globalStyles.primaryColor} 0%, ${globalStyles.secondaryColor} 100%)`,
        borderRadius: "50%",
        filter: "blur(70px)",
        opacity: 0.08, 
        bottom: "-150px",
        left: "-200px",
        pointerEvents: "none",
        zIndex: 0,
    }
  };

  return (
    <div style={styles.container}>
      {/* Background elements for ambiance (within this frosted card) */}
      {/* These will appear *inside* the main frosted About card, blending with it. */}
      <div style={styles.backgroundPattern} />
      <div style={styles.purpleBlobAmbiance} />

      {/* Hero section */}
      <div style={styles.heroSection}>
        <h1 style={styles.heroHeading}>About AR Explorer</h1>
        <p style={styles.heroParagraph}>
          AR Explorer is your gateway to India’s most iconic monuments, forts, and temples through cutting-edge augmented reality. We aim to make history interactive, engaging, and unforgettable.
        </p>
      </div>

      {/* Sections */}
      <div style={styles.sectionsWrapper}>
        {sections.map((sec, idx) => (
          <div
            key={idx}
            style={{
              ...styles.sectionCard,
              transitionDelay: `${idx * 0.1}s`, // Staggered fade-in
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = globalStyles.shadowHeavy;
              e.currentTarget.style.transition = "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = globalStyles.shadowMedium;
              e.currentTarget.style.transition = "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out";
            }}
          >
            <h2 style={styles.cardTitle}>{sec.title}</h2>
            <p style={styles.cardContent}>{sec.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;