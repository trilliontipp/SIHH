// src/pages/AR.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Assuming sitesData is available and structured with id and name properties
import { sitesData } from "../data/sitesData"; 

// Global styles for consistency (from App.jsx)
const globalStyles = {
  mainBackground: "linear-gradient(180deg, #fbfcfe 0%, #f7f9fc 100%)", // Light, subtle background
  cardBackground: "rgba(255, 255, 255, 0.85)", // Slightly opaque white for frosted look
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
  borderRadiusBase: "12px",
  borderRadiusLarge: "16px",
  shadowPrimaryButton: "0 6px 15px rgba(106, 64, 237, 0.35)", // For primary buttons
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};


const AR = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const siteId = location.state?.siteId;
  const site = sitesData.find(s => s.id === siteId);

  // Define styles for this specific component
  const styles = {
    // This container will now fit within App.jsx's main content area
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // No longer full viewport height/width, but full available space in main content
      height: "100%", // Take full height of its parent (main tag)
      width: "100%",  // Take full width of its parent (main tag)
      background: globalStyles.mainBackground, // Use the light theme background
      color: globalStyles.textColorPrimary, // Dark text
      padding: "40px", // Consistent padding as other pages
      textAlign: "center",
      fontFamily: globalStyles.fontFamily,
      boxSizing: "border-box", 
      overflow: "auto", // Allow content to scroll if it exceeds height
      position: "relative",
      borderRadius: globalStyles.borderRadiusLarge, // Match content area cards
      boxShadow: globalStyles.shadowHeavy, // Give it a pronounced card-like feel
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "20px",
      color: globalStyles.textColorPrimary, // Dark text for headings
      background: `linear-gradient(135deg, ${globalStyles.primaryColor} 0%, ${globalStyles.secondaryColor} 100%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    paragraph: {
      fontSize: "1.2rem",
      marginBottom: "30px",
      color: globalStyles.textColorSecondary, // Muted text
      maxWidth: "500px",
      lineHeight: "1.6",
    },
    primaryButton: {
      padding: "16px 32px",
      backgroundColor: globalStyles.primaryColor,
      color: "#fff",
      border: "none",
      borderRadius: globalStyles.borderRadiusBase,
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow: globalStyles.shadowPrimaryButton,
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    },
    secondaryButton: { 
      padding: "12px 25px",
      backgroundColor: globalStyles.cardBackground, // Frosted background for secondary button
      color: globalStyles.primaryColor, // Primary color text
      border: `1px solid ${globalStyles.borderColor}`, // Light border
      borderRadius: globalStyles.borderRadiusBase,
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      // No longer fixed positioning, will be part of the flow
      marginTop: "20px", // Space from paragraph
      zIndex: 1, // Ensure it's above potential background elements
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: globalStyles.shadowLight, // Subtle shadow
    },
  };

  // Hover effects for buttons
  const handlePrimaryButtonHover = (e, isHover) => {
    if (isHover) {
      e.target.style.backgroundColor = "#5a32d1"; // Darker purple
      e.target.style.transform = "translateY(-2px)";
      e.target.style.boxShadow = "0 10px 20px rgba(106, 64, 237, 0.45)";
    } else {
      e.target.style.backgroundColor = globalStyles.primaryColor;
      e.target.style.transform = "translateY(0)";
      e.target.style.boxShadow = globalStyles.shadowPrimaryButton;
    }
  };

  const handleSecondaryButtonHover = (e, isHover) => {
    if (isHover) {
      e.target.style.backgroundColor = "rgba(106, 64, 237, 0.05)"; // Light purple tint on hover
      e.target.style.borderColor = globalStyles.primaryColor; // Primary color border on hover
      e.target.style.transform = "translateY(-1px)";
      e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    } else {
      e.target.style.backgroundColor = globalStyles.cardBackground;
      e.target.style.borderColor = globalStyles.borderColor;
      e.target.style.transform = "translateY(0)";
      e.target.style.boxShadow = globalStyles.shadowLight;
    }
  };


  if (!site) {
    return (
      <div style={styles.container}> {/* Use the new container style */}
        <h2 style={styles.heading}>No AR experience found!</h2>
        <p style={styles.paragraph}>Please select a site from the list to view its Augmented Reality model.</p>
        <button
          onClick={() => navigate("/sites")}
          style={styles.primaryButton}
          onMouseEnter={(e) => handlePrimaryButtonHover(e, true)}
          onMouseLeave={(e) => handlePrimaryButtonHover(e, false)}
        >
          Browse Sites
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}> {/* Use the new container style */}
      <h2 style={styles.heading}>AR View: {site.name}</h2>
      <p style={styles.paragraph}>AR experience loading...</p>
      {/* Actual AR content placeholder. This could be an iframe, a 3D canvas, etc. */}
      <div style={{
          width: '80%', // Example size for AR display area
          height: '400px', // Example height
          backgroundColor: '#333', // Dark background for AR content
          borderRadius: globalStyles.borderRadiusLarge,
          marginTop: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          fontSize: '1.2rem',
          boxShadow: globalStyles.shadowHeavy,
      }}>
        [Your AR Model or Camera Feed Here]
      </div>
      
      <button
        onClick={() => navigate(`/sites/${site.id}`)}
        style={styles.secondaryButton}
        onMouseEnter={(e) => handleSecondaryButtonHover(e, true)}
        onMouseLeave={(e) => handleSecondaryButtonHover(e, false)}
      >
        ← Back to Details
      </button>
    </div>
  );
};

export default AR;