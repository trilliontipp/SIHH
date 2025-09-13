import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Monument data
const monuments = [
  { id: 1, name: "Khajuraho Temples", lat: 24.85, lng: 79.92, description: "Famous for stunning erotic sculptures and Hindu-Jain architecture." },
  { id: 2, name: "Sanchi Stupa", lat: 23.48, lng: 77.74, description: "Buddhist complex known for the Great Stupa, built in 3rd century BCE." },
  { id: 3, name: "Gwalior Fort", lat: 26.22, lng: 78.18, description: "Massive hilltop fort with historical palaces and temples." },
  { id: 4, name: "Orchha Fort", lat: 26.42, lng: 78.61, description: "Royal fort with beautiful palaces and temples." },
  { id: 5, name: "Ujjain Mahakaleshwar", lat: 23.18, lng: 75.78, description: "One of the 12 Jyotirlinga shrines of Lord Shiva." },
  { id: 6, name: "Indore Rajwada", lat: 22.72, lng: 75.85, description: "Historic palace blending Maratha, Mughal and French styles." },
  { id: 7, name: "Chanderi Fort", lat: 24.73, lng: 78.12, description: "Famous for ancient architecture and Chanderi sarees." },
  { id: 8, name: "Maheshwar Fort", lat: 22.72, lng: 75.73, description: "Historic fort on the banks of the Narmada River." },
  { id: 9, name: "Bandhavgarh Fort", lat: 23.69, lng: 80.38, description: "Legendary fort surrounded by Bandhavgarh National Park." },
  { id: 10, name: "Pachmarhi Caves", lat: 22.47, lng: 78.25, description: "Buddhist rock shelters dating back to prehistoric times." },
  { id: 11, name: "Bhimbetka Rock Shelters", lat: 23.62, lng: 77.88, description: "UNESCO World Heritage site with prehistoric cave paintings." },
  { id: 12, name: "Chitrakoot Falls", lat: 22.35, lng: 81.77, description: "Also called 'Niagara of India', one of the widest waterfalls." },
  { id: 13, name: "Omkareshwar Temple", lat: 22.23, lng: 76.16, description: "Sacred island temple shaped like the Om symbol." },
  { id: 14, name: "Bateshwar Temples", lat: 26.23, lng: 78.19, description: "Group of 101 temples dating back to the 8th-10th century." },
  { id: 15, name: "Rajgarh Fort", lat: 23.75, lng: 76.95, description: "Historical fort with panoramic views of the surrounding region." },
];

// Fly to monument component
function FlyToMonument({ monument }) {
  const map = useMap();
  if (monument) {
    map.flyTo([monument.lat, monument.lng], 13, { duration: 1.5 });
  }
  return null;
}

const MapPage = () => {
  const [selectedMonument, setSelectedMonument] = useState(null);
  const [search, setSearch] = useState("");

  // Filter monuments by search
  const filteredMonuments = monuments.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      {/* Map */}
      <div style={{ flex: 1, position: "relative" }}>
        <MapContainer
          center={[23.25, 77.5]}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {monuments.map((m) => (
            <Marker key={m.id} position={[m.lat, m.lng]}>
              <Popup>
                <strong>{m.name}</strong>
                <br />
                {m.description}
                <br />
                Coordinates: {m.lat}, {m.lng}
              </Popup>
            </Marker>
          ))}
          {selectedMonument && <FlyToMonument monument={selectedMonument} />}
        </MapContainer>

        {/* Floating Search */}
        <input
          type="text"
          placeholder="Search monuments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 15px",
            width: "250px",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            fontSize: "1rem",
            zIndex: 1000,
          }}
        />
      </div>

      {/* Side Scroller / Cards */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          padding: "15px",
          background: "#1e1e2f",
        }}
      >
        {filteredMonuments.map((m) => (
          <div
            key={m.id}
            onClick={() => setSelectedMonument(m)}
            style={{
              flex: "0 0 auto",
              minWidth: "200px",
              marginRight: "15px",
              padding: "15px",
              borderRadius: "12px",
              background:
                selectedMonument?.id === m.id ? "#2575fc" : "#fff",
              color: selectedMonument?.id === m.id ? "#fff" : "#1e1e2f",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
          >
            <h4 style={{ margin: "0 0 5px 0" }}>{m.name}</h4>
            <p style={{ margin: 0, fontSize: "0.85rem" }}>
              {m.description.length > 50
                ? m.description.slice(0, 50) + "..."
                : m.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapPage;
