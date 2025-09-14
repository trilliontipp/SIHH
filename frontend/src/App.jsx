// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { FaHome, FaLandmark, FaMapMarkedAlt, FaInfoCircle, FaCube, FaBars, FaCommentDots } from "react-icons/fa";

import Home from "./pages/Home.jsx";
import Sites from "./pages/Sites.jsx";
import SiteDetail from "./pages/SiteDetail.jsx";
import Map from "./pages/Map.jsx";
import About from "./pages/About.jsx";
import AR from "./pages/AR.jsx";
import Chat from "./pages/Chat.jsx";

// Global styles object for consistent theme application
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
  borderRadiusBase: "12px", // Consistent border radius
  borderRadiusLarge: "16px",
  borderRadiusXLarge: "20px",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

// Sidebar component
const Sidebar = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Chat", path: "/chat", icon: <FaCommentDots /> },
    { name: "AR", path: "/ar", icon: <FaCube /> },
    { name: "Sites", path: "/sites", icon: <FaLandmark /> },
    { name: "Map", path: "/map", icon: <FaMapMarkedAlt /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
  ];

  const location = useLocation();

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: sidebarOpen ? (isMobile ? "240px" : "260px") : (isMobile ? "60px" : "72px"), // Adjusted width for mobile
        height: "100%",
        background: globalStyles.cardBackground,
        backdropFilter: "blur(10px)",
        borderRight: `1px solid ${globalStyles.borderColor}`,
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease",
        display: "flex",
        flexDirection: "column",
        paddingTop: "24px",
        zIndex: 1000,
        boxShadow: globalStyles.shadowMedium,
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        paddingLeft: sidebarOpen ? (isMobile ? "16px" : "24px") : (isMobile ? "12px" : "20px"), // Adjusted padding for mobile
        paddingRight: sidebarOpen ? (isMobile ? "16px" : "24px") : (isMobile ? "12px" : "20px"),
        marginBottom: "32px",
        gap: "12px"
      }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: "none",
            border: "none",
            color: globalStyles.textColorSecondary,
            fontSize: isMobile ? "1.2rem" : "1.35rem", // Adjusted font size for mobile
            cursor: "pointer",
            padding: "10px",
            borderRadius: globalStyles.borderRadiusBase,
            transition: "all 0.2s ease",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#f0f2f5";
            e.target.style.color = globalStyles.textColorPrimary;
            e.target.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = globalStyles.textColorSecondary;
            e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
          }}
        >
          <FaBars />
        </button>
        {sidebarOpen && !isMobile && ( // Only show title when sidebar is open and not on mobile
          <h2 style={{
            fontSize: "1.6rem",
            fontWeight: "800",
            color: globalStyles.textColorPrimary,
            margin: 0,
            letterSpacing: "-0.03em"
          }}>
            AR Explorer
          </h2>
        )}
      </div>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          padding: sidebarOpen ? (isMobile ? "0 8px" : "0 16px") : (isMobile ? "0 4px" : "0 12px"), // Adjusted padding for mobile
          gap: "8px",
        }}
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={() => {
              const isActive = location.pathname === item.path;
              return {
                display: "flex",
                alignItems: "center",
                gap: sidebarOpen ? (isMobile ? "8px" : "15px") : "0", // Adjusted gap for mobile
                padding: "12px 16px", // Adjusted padding for mobile
                borderRadius: globalStyles.borderRadiusBase,
                textDecoration: "none",
                color: isActive ? globalStyles.primaryColor : globalStyles.textColorSecondary,
                backgroundColor: isActive ? "rgba(106, 64, 237, 0.1)" : "transparent",
                fontWeight: isActive ? "700" : "500",
                fontSize: "0.9rem", // Adjusted font size for mobile
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                cursor: "pointer",
                border: isActive ? `1px solid rgba(106, 64, 237, 0.2)` : `1px solid transparent`,
                boxShadow: isActive ? "0 2px 8px rgba(106, 64, 237, 0.1)" : "none",
              };
            }}
            onMouseEnter={(e) => {
              const isActive = location.pathname === item.path;
              if (!isActive) {
                e.target.style.backgroundColor = "#f0f2f5";
                e.target.style.color = globalStyles.textColorPrimary;
                e.target.style.boxShadow = "0 1px 4px rgba(0,0,0,0.08)";
              }
            }}
            onMouseLeave={(e) => {
              const isActive = location.pathname === item.path;
              if (!isActive) {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = globalStyles.textColorSecondary;
                e.target.style.boxShadow = "none";
              }
            }}
          >
            <span style={{ fontSize: isMobile ? "1rem" : "1.2rem" }}>
              {item.icon}
            </span>
            {sidebarOpen && !isMobile && ( // Only show text label when sidebar is open and not on mobile
              <span style={{
                opacity: sidebarOpen ? 1 : 0,
                transition: "opacity 0.3s ease 0.1s"
              }}>
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {sidebarOpen && !isMobile && ( // Only show footer when sidebar is open and not on mobile
        <div
          style={{
            marginTop: "auto",
            padding: "24px",
            borderTop: `1px solid ${globalStyles.borderColor}`,
            fontSize: "0.8rem",
            color: globalStyles.textColorMuted,
            textAlign: "center",
            opacity: sidebarOpen ? 1 : 0,
            transition: "opacity 0.3s ease 0.2s"
          }}
        >
          AR Explorer v2.0
        </div>
      )}
    </aside>
  );
};

function AppWrapper() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile, automatically close sidebar if it was open when switching to mobile view
      if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      } else if (!mobile && !sidebarOpen) {
        // On larger screens, ensure sidebar is open by default or based on user preference (if saved)
        // For this example, we'll keep it togglable.
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]); // Dependency array ensures this runs if sidebarOpen changes

  const isHomePage = location.pathname === "/";
  const isChatPage = location.pathname === "/chat";

  // Determine if sidebar should be shown.
  // For mobile, we want to always show the toggle, but the sidebar content might be hidden.
  // For desktop, we want to toggle it.
  const showSidebar = true; // Always show the sidebar component

  // Header appears on all pages EXCEPT Home and Chat, and also on mobile.
  // On mobile, the header might be different or simpler.
  const showHeader = !isHomePage && !isChatPage;

  // Adjust main content padding based on sidebar and header visibility
  const mainContentMarginLeft = showSidebar ? (sidebarOpen ? (isMobile ? "240px" : "260px") : (isMobile ? "60px" : "72px")) : "0";
  const mainContentMarginTop = showHeader ? "72px" : "0"; // Fixed header height

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: globalStyles.fontFamily,
      background: globalStyles.mainBackground,
      color: globalStyles.textColorPrimary,
      overflow: "hidden", // Prevent body scroll when sidebar is open
    }}>
      {/* Sidebar - always rendered but its width and visibility are controlled */}
      {showSidebar && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 950, // Below sidebar, above content
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Header */}
      {showHeader && (
        <header style={{
          position: "fixed",
          top: 0,
          right: 0,
          left: showSidebar ? (sidebarOpen ? (isMobile ? "240px" : "260px") : (isMobile ? "60px" : "72px")) : "0",
          height: "72px",
          background: globalStyles.cardBackground,
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${globalStyles.borderColor}`,
          color: globalStyles.textColorPrimary,
          display: "flex",
          alignItems: "center",
          padding: isMobile ? "0 16px" : "0 32px", // Adjusted padding for mobile
          zIndex: 900,
          transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: globalStyles.shadowLight,
        }}>
          {/* AI-Powered Experience Status Indicator */}
          <div style={{
            display: isMobile && !sidebarOpen ? "none" : "flex", // Hide on mobile when sidebar is closed to save space
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            backgroundColor: globalStyles.successBg,
            border: `1px solid ${globalStyles.successBorder}`,
            borderRadius: "18px",
            fontSize: "0.8rem",
            color: "#166534",
            fontWeight: "600",
          }}>
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: globalStyles.successGreen,
              boxShadow: `0 0 5px ${globalStyles.successGreen}`,
            }}></div>
            AI-Powered Experience
          </div>

          <div style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "8px" : "16px"
          }}>
            {/* The "Explore • Discover • Experience" Tagline */}
            {!isMobile && ( // Hide tagline on mobile to save space
              <div style={{
                padding: "8px 16px",
                borderRadius: globalStyles.borderRadiusXLarge,
                background: `linear-gradient(135deg, ${globalStyles.primaryColor} 0%, ${globalStyles.secondaryColor} 100%)`,
                color: "#ffffff",
                fontSize: "0.7rem",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}>
                Explore • Discover • Experience
              </div>
            )}
          </div>
        </header>
      )}

      {/* Main content */}
      <main
        style={{
          flex: 1,
          marginLeft: mainContentMarginLeft,
          marginTop: mainContentMarginTop,
          minHeight: "100vh",
          background: globalStyles.mainBackground,
          color: globalStyles.textColorPrimary,
          boxSizing: "border-box",
          overflow: "auto", // Allows content scrolling
          padding: isMobile ? (showHeader ? "20px 10px" : "20px 10px") : (showHeader ? "40px" : "0"), // Adjusted padding for mobile
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Ensure content within Routes can take full width/height if needed */}
        <div style={{
          width: "100%",
          // maxWidth: "1200px", // Removed maxWidth for better mobile scaling
          margin: "0 auto",
          // padding: showHeader ? "0" : "0", // Removed redundant padding here
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/ar" element={
              <div style={{
                // These styles ensure AR content gets correct padding/margin from AppWrapper
                width: "100%",
                height: "100%",
                // AR page specific overrides for background or layout can be put here,
                // but we're letting AR.jsx handle its own full background for immersive feel.
              }}>
                <AR />
              </div>
            } />
            <Route path="/sites" element={<Sites />} />
            <Route path="/sites/:id" element={<SiteDetail />} />
            <Route path="/map" element={<Map />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
