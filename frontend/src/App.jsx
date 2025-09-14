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
  mainBackground: "linear-gradient(180deg, #fbfcfe 0%, #f7f9fc 100%)",
  cardBackground: "rgba(255, 255, 255, 0.85)",
  borderColor: "#e0e7f0",
  shadowLight: "0 4px 12px rgba(0, 0, 0, 0.06)",
  shadowMedium: "0 8px 20px rgba(0, 0, 0, 0.08)",
  shadowHeavy: "0 15px 40px rgba(0, 0, 0, 0.08)",
  primaryColor: "#6a40ed",
  secondaryColor: "#d459eb",
  textColorPrimary: "#1a202c",
  textColorSecondary: "#4a5568",
  textColorMuted: "#9ca3af",
  successGreen: "#10b981",
  successBg: "#f0fdf4",
  successBorder: "#dcfce7",
  borderRadiusBase: "12px",
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

  const sidebarWidth = isMobile ? "260px" : (sidebarOpen ? "260px" : "72px");
  // Corrected logic: Show text only when the sidebar is explicitly open.
  // This fixes the desktop collapsed view.
  const showText = sidebarOpen;
  const iconSize = isMobile ? "1.2rem" : "1.35rem";
  const menuGap = isMobile ? "8px" : "15px";

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: sidebarWidth,
        height: "100%",
        background: globalStyles.cardBackground,
        backdropFilter: "blur(10px)",
        borderRight: `1px solid ${globalStyles.borderColor}`,
        // Use transform for smooth slide-in/out on mobile
        transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        paddingTop: "24px",
        zIndex: 1000,
        boxShadow: globalStyles.shadowMedium,
        overflow: "hidden",
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        paddingLeft: showText ? "24px" : "20px",
        paddingRight: "24px",
        marginBottom: "32px",
        gap: "12px",
        transition: "opacity 0.3s ease",
      }}>
        {/* Hamburger button is now only for DESKTOP */}
        {!isMobile && (
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
              e.currentTarget.style.backgroundColor = "#f0f2f5";
              e.currentTarget.style.color = globalStyles.textColorPrimary;
              e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = globalStyles.textColorSecondary;
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
            }}
          >
            <FaBars />
          </button>
        )}
        {showText && (
          <h2 style={{
            fontSize: "1.6rem",
            fontWeight: "800",
            color: globalStyles.textColorPrimary,
            margin: 0,
            letterSpacing: "-0.03em",
            whiteSpace: "nowrap", // Prevent text wrapping during transition
          }}>
            AR Explorer
          </h2>
        )}
      </div>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          padding: showText ? "0 16px" : "0 12px",
          gap: "8px",
        }}
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => { if (isMobile) setSidebarOpen(false); }} // Close sidebar on nav click on mobile
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: showText ? menuGap : "0",
              padding: "14px 18px",
              borderRadius: globalStyles.borderRadiusBase,
              textDecoration: "none",
              color: isActive ? globalStyles.primaryColor : globalStyles.textColorSecondary,
              backgroundColor: isActive ? "rgba(106, 64, 237, 0.1)" : "transparent",
              fontWeight: isActive ? "700" : "500",
              fontSize: "0.95rem",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              justifyContent: showText ? "flex-start" : "center",
              cursor: "pointer",
              border: isActive ? `1px solid rgba(106, 64, 237, 0.2)` : `1px solid transparent`,
              boxShadow: isActive ? "0 2px 8px rgba(106, 64, 237, 0.1)" : "none",
            })}
            onMouseEnter={(e) => {
              const isActive = location.pathname === item.path;
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "#f0f2f5";
                e.currentTarget.style.color = globalStyles.textColorPrimary;
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.08)";
              }
            }}
            onMouseLeave={(e) => {
              const isActive = location.pathname === item.path;
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = globalStyles.textColorSecondary;
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          >
            <span style={{ fontSize: "1.2rem", minWidth: "24px", textAlign: "center" }}>
              {item.icon}
            </span>
            {showText && (
              <span style={{
                whiteSpace: "nowrap",
                opacity: 1,
                transition: "opacity 0.3s ease 0.1s"
              }}>
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {showText && (
        <div
          style={{
            marginTop: "auto",
            padding: "24px",
            borderTop: `1px solid ${globalStyles.borderColor}`,
            fontSize: "0.8rem",
            color: globalStyles.textColorMuted,
            textAlign: "center",
            opacity: 1,
            transition: "opacity 0.3s ease 0.2s",
            whiteSpace: "nowrap",
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
    // On mobile, start with the sidebar closed
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const isHomePage = location.pathname === "/";
  const isChatPage = location.pathname === "/chat";
  const isARPage = location.pathname === "/ar";
  const isFullScreenPage = isHomePage || isChatPage || isARPage;

  // Header appears on all pages except Home and Chat
  const showHeader = !isHomePage && !isChatPage;

  // Mobile specific: Overlay for when sidebar is open and it's a mobile device
  const showOverlay = isMobile && sidebarOpen;

  // CORRECTED LOGIC: On mobile, margin is always 0. On desktop, it changes.
  const mainMarginLeft = isMobile ? "0px" : (sidebarOpen ? "260px" : "72px");
  const headerLeft = isMobile ? "0px" : (sidebarOpen ? "260px" : "72px");

  // Header margin-top is only applied if the header is shown
  const mainMarginTop = showHeader ? "72px" : "0";

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: globalStyles.fontFamily,
      background: globalStyles.mainBackground,
      color: globalStyles.textColorPrimary,
    }}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} isMobile={isMobile} />

      {/* MOBILE-ONLY Hamburger button. Lives outside the sidebar so it's always visible */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            zIndex: 1001, // Above the sidebar
            background: globalStyles.cardBackground,
            border: `1px solid ${globalStyles.borderColor}`,
            color: globalStyles.textColorSecondary,
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: globalStyles.borderRadiusBase,
            boxShadow: globalStyles.shadowLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <FaBars />
        </button>
      )}

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
            zIndex: 999, // Below sidebar but above content
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
          left: headerLeft,
          height: "72px",
          background: globalStyles.cardBackground,
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${globalStyles.borderColor}`,
          color: globalStyles.textColorPrimary,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          zIndex: 900,
          transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: globalStyles.shadowLight,
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            backgroundColor: globalStyles.successBg,
            border: `1px solid ${globalStyles.successBorder}`,
            borderRadius: "18px",
            fontSize: "0.75rem",
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

      <main
        style={{
          flex: 1,
          marginLeft: mainMarginLeft,
          marginTop: mainMarginTop,
          minHeight: "100vh",
          background: globalStyles.mainBackground,
          color: globalStyles.textColorPrimary,
          boxSizing: "border-box",
          overflow: "auto",
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)", // Only transition margin
        }}
      >
        <div style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          // Corrected padding logic for full-screen pages
          padding: isFullScreenPage ? "0" : "40px",
          paddingLeft: isMobile || isFullScreenPage ? (isFullScreenPage ? "0" : "16px") : "32px",
          paddingRight: isMobile || isFullScreenPage ? (isFullScreenPage ? "0" : "16px") : "32px",
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            {/* REMOVED the problematic wrapper div. The AR component can now fill its container correctly. */}
            <Route path="/ar" element={<AR />} />
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
