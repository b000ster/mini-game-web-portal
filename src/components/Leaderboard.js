import React from "react";

export default function Leaderboard({ entries, scoreLabel, scoreKey, onClose }) {
  return (
    <div style={{
      position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
      background: "rgba(36,54,92,0.22)", display: "flex",
      justifyContent: "center", alignItems: "center", zIndex: 500
    }}>
      <div style={{
        background: "white", borderRadius: 14, minWidth: 280, maxWidth: 380,
        padding: "2rem 1.2rem 1.2rem 1.2rem", boxShadow: "0 6px 28px #4b5a9815"
      }}>
        <h2 style={{ marginTop: 0, marginBottom: "0.9rem", color: "#355" }}>Leaderboard</h2>
        <table style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th style={{ paddingBottom: "4px" }}>#</th>
              <th style={{ paddingBottom: "4px" }}>Name</th>
              <th style={{ paddingBottom: "4px" }}>{scoreLabel}</th>
              <th style={{ paddingBottom: "4px" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 && <tr><td colSpan={4} style={{ textAlign: "center", color: "#888" }}>No scores yet</td></tr>}
            {entries.map((row, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{row.name}</td>
                <td>{row[scoreKey]}</td>
                <td style={{ fontSize: "0.91em" }}>{row.date.replace("T", " ").slice(0, 16)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={onClose} style={{
          background: "#3a5998", color: "white", border: "none",
          borderRadius: 7, padding: "0.6rem 1.5rem", marginTop: 22,
          fontWeight: 650, cursor: "pointer"
        }}>Close</button>
      </div>
    </div>
  );
}
