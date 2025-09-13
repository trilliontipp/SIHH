// src/pages/SiteDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sitesData } from "../data/sitesData";

const SiteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const site = sitesData.find(s => s.id === parseInt(id));

  if (!site) return <p style={{ padding: "20px" }}>Site not found!</p>;

  return (
    <div style={{ padding: "30px", maxWidth: "1000px", margin: "0 auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <button onClick={() => navigate(-1)} style={{
        padding: "10px 25px",
        marginBottom: "30px",
        background: "#2575fc",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px"
      }}>← Back</button>

      <h1 style={{ marginBottom: "25px", color: "#1e1e2f" }}>{site.name}</h1>

      {site.images.map((img, idx) => (
        <img key={idx} src={img} alt={`${site.name} ${idx+1}`} style={{ width: "100%", borderRadius: "15px", marginBottom: "25px", boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }} />
      ))}

      <section style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#2575fc", marginBottom: "10px" }}>History</h2>
        <p style={{ lineHeight: "1.6", color: "#333" }}>{site.history}</p>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#2575fc", marginBottom: "10px" }}>Influence</h2>
        <p style={{ lineHeight: "1.6", color: "#333" }}>{site.influence}</p>
      </section>

      <section style={{ marginBottom: "25px" }}>
        <h2 style={{ color: "#2575fc", marginBottom: "10px" }}>Location</h2>
        <p style={{ lineHeight: "1.6", color: "#333" }}>{site.location}</p>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ color: "#2575fc", marginBottom: "10px" }}>Visiting Tips</h2>
        <p style={{ lineHeight: "1.6", color: "#333" }}>{site.visitingTips}</p>
      </section>
    </div>
  );
};

export default SiteDetail;
