import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sitesData } from "../data/sitesData"; // Assuming sitesData is correctly structured

// Global styles for consistency (from App.jsx or theme file)
const globalStyles = {
  mainBackground: "linear-gradient(180deg, #fbfcfe 0%, #f7f9fc 100%)", // Light, subtle background
  cardBackground: "rgba(255, 255, 255, 0.85)", // Slightly opaque white for frosted look
  borderColor: "#e0e7f0", // Light subtle border
  shadowLight: "0 4px 12px rgba(0, 0, 0, 0.06)",
  shadowMedium: "0 8px 20px rgba(0, 0, 0, 0.08)",
  shadowHeavy: "0 15px 40px rgba(0, 0, 0, 0.08)",
  primaryColor: "#6a40ed", // Main purple
  secondaryColor: "#d459eb", // Main pink
  textColorPrimary: "#1a202c", // Dark text
  textColorSecondary: "#4a5568", // Muted dark text
  textColorMuted: "#9ca3af",
  successGreen: "#10b981",
  successBg: "#f0fdf4",
  successBorder: "#dcfce7",
  borderRadiusBase: "12px", // Consistent border radius
  borderRadiusLarge: "16px",
  borderRadiusXLarge: "20px",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  // No specific dark blue for this page, it will be light themed.
  // We'll define specific colors for card titles/descriptions within the styles for clarity.
};

const Sites = () => {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const styles = {
    // The main container for the entire Sites page content
    container: {
      minHeight: "100%", // Takes full height of its parent (App.jsx main content area)
      width: "100%",
      background: globalStyles.cardBackground, // This entire page content block is now a frosted white card
      backdropFilter: "blur(12px)", // Frosted effect for the main block
      color: globalStyles.textColorPrimary, // Default text color for the page content is dark
      fontFamily: globalStyles.fontFamily,
      boxSizing: "border-box",
      borderRadius: globalStyles.borderRadiusLarge, // Match App.jsx's main content wrapper
      boxShadow: globalStyles.shadowHeavy, // Give it a pronounced card-like feel
      overflow: "hidden",
      padding: "60px 20px", // Overall padding for the page content inside this container
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // Center content horizontally
      position: "relative", // For background ambiance
    },
    // The h1 title section
    titleSection: {
      textAlign: "center",
      width: "100%",
      maxWidth: "900px",
      marginBottom: "60px", // More space below title
      opacity: fade ? 1 : 0,
      transform: fade ? "translateY(0)" : "translateY(30px)",
      transition: "all 1s ease-out",
      boxSizing: "border-box",
    },
    pageTitle: {
      fontSize: "3.2rem", // Larger, consistent with Home/About headings
      fontWeight: "800",
      color: globalStyles.textColorPrimary, // Default color if gradient fails
      // Apply gradient text effect
      background: `linear-gradient(135deg, ${globalStyles.primaryColor} 0%, ${globalStyles.secondaryColor} 100%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      letterSpacing: "-0.03em",
      margin: "0", // Remove default margin from h1
    },
    // Container for the grid of cards
    cardsGridWrapper: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Responsive grid
      gap: "30px", // Gap between cards
      justifyContent: "center", // Center cards in the grid
      alignItems: "stretch", // Ensure cards have equal height
      width: "100%",
      maxWidth: "1200px", // Max width for content
      opacity: fade ? 1 : 0,
      transform: fade ? "translateY(0)" : "translateY(50px)",
      transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
      boxSizing: "border-box",
    },
    siteCard: {
      cursor: "pointer",
      borderRadius: globalStyles.borderRadiusLarge, // Consistent large rounding
      overflow: "hidden",
      boxShadow: globalStyles.shadowMedium, // Softer shadow for cards
      backgroundColor: globalStyles.cardBackground, // Frosted white background for the card itself
      backdropFilter: "blur(8px)", // Frosted effect for individual cards
      border: `1px solid ${globalStyles.borderColor}`, // Subtle border
      color: globalStyles.textColorSecondary, // Default text color for card description
      display: "flex",
      flexDirection: "column",
      transition: "all 0.3s ease",
    },
    cardImageWrapper: {
      position: "relative",
      height: "220px", // Fixed height for images
      overflow: "hidden",
    },
    cardImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.3s ease",
    },
    imageOverlay: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "60%",
      background: "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0))", // Slightly lighter overlay
    },
    cardContent: {
      padding: "25px",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    cardTitle: {
      color: globalStyles.primaryColor, // Use primary purple for card titles
      marginBottom: "12px",
      fontSize: "1.4rem",
      fontWeight: "700",
      letterSpacing: "-0.01em",
    },
    cardDescription: {
      color: globalStyles.textColorSecondary, // Muted dark text for description
      lineHeight: "1.6",
      flexGrow: 1,
      fontSize: "0.95rem",
    },
    // Background ambiance elements (from Home/About)
    backgroundPattern: {
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
    purpleBlobAmbiance: {
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
      <div style={styles.backgroundPattern} />
      <div style={styles.purpleBlobAmbiance} />

      {/* Title Section */}
      <div style={styles.titleSection}>
        <h1 style={styles.pageTitle}>Famous Sites of Madhya Pradesh</h1>
      </div>

      {/* Cards Grid */}
      <div style={styles.cardsGridWrapper}>
        {sitesData.map((site) => (
          <div
            key={site.id}
            onClick={() => navigate(`/sites/${site.id}`, { state: { siteId: site.id } })}
            style={styles.siteCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)"; // Lift effect
              e.currentTarget.style.boxShadow = globalStyles.shadowHeavy; // Enhanced shadow
              e.currentTarget.querySelector('img').style.transform = "scale(1.05)"; // Zoom image
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = globalStyles.shadowMedium; // Reset to medium shadow
              e.currentTarget.querySelector('img').style.transform = "scale(1)"; // Reset image zoom
            }}
          >
            <div style={styles.cardImageWrapper}>
              <img
                src={site.images[0]} // Use the first image from the array
                alt={site.name}
                style={styles.cardImage}
              />
              <div style={styles.imageOverlay} />
            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{site.name}</h3>
              <p style={styles.cardDescription}>{site.history.slice(0, 150)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sites;