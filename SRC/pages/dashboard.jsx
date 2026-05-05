import { useDispatch, useSelector } from "react-redux";
import { setThreats } from "../redux/threatSlice";
import { fetchThreatNews } from "../services/api";
import { useState } from "react";
import ThreatChart from "../components/ThreatChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const threats = useSelector((state) => state.threats.threats);

  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      const data = await fetchThreatNews();
      const titles = data.map((item) => item.title);

      dispatch(setThreats(titles));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Filter logic
  const filteredThreats = threats.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        minHeight: "100vh",
      }}
    >
      <h2>Cyber Threat Dashboard</h2>

      {/* 🌙 Dark Mode */}
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </button>

      <br /><br />

      {/* 🔄 Load Data */}
      <button onClick={handleClick}>
        Load Live Threat Data
      </button>

      {/* ⏳ Loading */}
      {loading && <p>Loading data...</p>}

      <br />

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search threats..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", width: "250px" }}
      />

      <h3>Threat List:</h3>

      {/* 🎨 Cards */}
      {filteredThreats.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid gray",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: darkMode ? "#1e1e1e" : "#f9f9f9",
          }}
        >
          {item}
        </div>
      ))}

      {/* 📊 Chart */}
      <h3>Threat Analysis Chart:</h3>
      <ThreatChart threats={filteredThreats} />
    </div>
  );
};

export default Dashboard;
