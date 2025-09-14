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

  // Corrected sidebar width logic for mobile
  const sidebarWidth = isMobile ? (sidebarOpen ? "260px" : "0px") : (sidebarOpen ? "260px" : "72px");
  const showSidebarContent = sidebarOpen || !isMobile; // Show text labels if sidebar is open or on desktop
  const iconSize = isMobile ? "1.2rem" : "1.35rem";
  const menuGap = isMobile ? "8px" : "15px";

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: sidebarWidth, // This now correctly shrinks to 0 on mobile when closed
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
        overflow: "hidden", // Important to prevent content spill when width is 0
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        paddingLeft: showSidebarContent ? "24px" : "20px",
        paddingRight: "24px",
        marginBottom: "32px",
        gap: "12px",
        opacity: showSidebarContent ? 1 : 0, // Hide logo text on mobile when collapsed
        transition: "opacity 0.3s ease",
      }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: "none",
            border: "none",
            color: globalStyles.textColorSecondary,
            fontSize: iconSize,
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
        {showSidebarContent && (
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
          padding: showSidebarContent ? "0 16px" : "0 12px",
          gap: "8px",
        }}
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: showSidebarContent ? menuGap : "0",
              padding: "14px 18px",
              borderRadius: globalStyles.borderRadiusBase,
              textDecoration: "none",
              color: isActive ? globalStyles.primaryColor : globalStyles.textColorSecondary,
              backgroundColor: isActive ? "rgba(106, 64, 237, 0.1)" : "transparent",
              fontWeight: isActive ? "700" : "500",
              fontSize: "0.95rem",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              justifyContent: showSidebarContent ? "flex-start" : "center",
              cursor: "pointer",
              border: isActive ? `1px solid rgba(106, 64, 237, 0.2)` : `1px solid transparent`,
              boxShadow: isActive ? "0 2px 8px rgba(106, 64, 237, 0.1)" : "none",
            })}
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
            <span style={{ fontSize: "1.2rem" }}>
              {item.icon}
            </span>
            {showSidebarContent && (
              <span style={{
                opacity: 1, // Always visible if showSidebarContent is true
                transition: "opacity 0.3s ease 0.1s"
              }}>
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {showSidebarContent && (
        <div
          style={{
            marginTop: "auto",
            padding: "24px",
            borderTop: `1px solid ${globalStyles.borderColor}`,
            fontSize: "0.8rem",
            color: globalStyles.textColorMuted,
            textAlign: "center",
            opacity: 1, // Always visible if showSidebarContent is true
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
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHomePage = location.pathname === "/";
  const isChatPage = location.pathname === "/chat";
  const isARPage = location.pathname === "/ar"; // Explicitly define AR page

  // Sidebar is always present for navigation, but its width and content visibility change
  const showSidebar = true;

  // Header appears on all pages except Home and Chat
  const showHeader = !isHomePage && !isChatPage;

  // Mobile specific: Overlay for when sidebar is open and it's a mobile device
  const showOverlay = isMobile && sidebarOpen && showSidebar;

  // Corrected logic for main content margin based on sidebar state and mobile
  const mainMarginLeft = showSidebar
    ? (isMobile ? (sidebarOpen ? "260px" : "0px") : (sidebarOpen ? "260px" : "72px"))
    : "0";

  // Header's left position also needs to dynamically adjust based on sidebar state and mobile
  const headerLeft = showSidebar
    ? (isMobile ? (sidebarOpen ? "260px" : "0px") : (sidebarOpen ? "260px" : "72px"))
    : "0";

  // Header margin-top is only applied if the header is shown
  const mainMarginTop = showHeader ? "72px" : "0";

  // Adjust padding for main content based on whether it's Home/Chat or other pages
  const mainContentPadding = isHomePage || isChatPage ? "0" : "40px";

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: globalStyles.fontFamily,
      background: globalStyles.mainBackground,
      color: globalStyles.textColorPrimary,
    }}>
      {/* Sidebar - always rendered but width controlled by sidebarOpen and isMobile */}
      {showSidebar && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />}

      {/* Overlay for mobile when sidebar is open */}
      {showOverlay && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 900,
            transition: "all 0.3s ease",
          }}
        />
      )}

      {/* Header - rendered on all pages except Home and Chat */}
      {showHeader && (
        <header style={{
          position: "fixed",
          top: 0,
          right: 0,
          left: headerLeft, // Dynamically adjust left based on sidebar and mobile
          height: "72px",
          background: globalStyles.cardBackground,
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${globalStyles.borderColor}`,
          color: globalStyles.textColorPrimary,
          display: "flex",
          alignItems: "center",
          padding: "0 24px", // Responsive padding
          zIndex: 900,
          transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: globalStyles.shadowLight,
        }}>
          {/* AI-Powered Experience Status Indicator */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            backgroundColor: globalStyles.successBg,
            border: `1px solid ${globalStyles.successBorder}`,
            borderRadius: "18px",
            fontSize: "0.75rem", // Smaller font for mobile
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
            gap: "16px"
          }}>
            {/* The "Explore • Discover • Experience" Tagline */}
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
          </div>
        </header>
      )}

      {/* Main content area */}
      <main
        style={{
          flex: 1,
          marginLeft: mainMarginLeft, // This now correctly accounts for mobile collapsed sidebar
          marginTop: mainMarginTop,
          minHeight: "100vh",
          background: globalStyles.mainBackground,
          color: globalStyles.textColorPrimary,
          boxSizing: "border-box",
          overflow: "auto",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{
          width: "100%",
          maxWidth: "1200px", // Keep max-width for content readability on larger screens
          margin: "0 auto",
          padding: mainContentPadding, // Apply padding to content within main
          // Responsive horizontal padding for content inside main
          paddingLeft: isMobile ? "16px" : (isHomePage || isChatPage ? "0" : "32px"),
          paddingRight: isMobile ? "16px" : (isHomePage || isChatPage ? "0" : "32px"),
          paddingTop: isHomePage || isChatPage ? "0" : "40px", // Consistent top padding for non-special pages
          paddingBottom: isHomePage || isChatPage ? "0" : "40px",
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/ar" element={
              <div style={{
                // AR page specific styles to ensure it takes full available space without padding from AppWrapper
                width: "100%",
                height: "calc(100vh - " + (showHeader ? "72px" : "0px") + ")", // Adjust height to account for header
                marginTop: showHeader ? "72px" : "0", // Push content down if header exists
                marginLeft: mainMarginLeft, // Align AR content with the main layout flow
                overflow: "hidden", // Important for AR to fill space correctly
                backgroundColor: "#000", // Black background for AR immersion, AR.jsx can override if needed
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
