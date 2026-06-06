import { COLORS } from "./constants";

export default function ResultCard({ result, isFav, toggleFav, onTryAgain, theme }) {
    return (
        <div className="result-card" style={{ border: `1px solid ${COLORS.border[theme]}`, background: COLORS.card[theme], "--border-color": COLORS.border[theme] }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "24px 32px", borderBottom: `1px solid ${COLORS.border[theme]}` }}>
                <div style={{ fontSize: "64px", marginBottom: "12px" }}>{result.emoji}</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, marginBottom: "10px", textAlign: "center" }}>{result.name}</h2>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px" }}>
                    <span style={{ fontSize: "13px", padding: "4px 12px", borderRadius: "99px", background: COLORS.accentLight[theme], color: COLORS.accent, fontWeight: 500 }}>{result.cuisine}</span>
                    {result.mood.split(",").map(m => (
                        <span key={m} style={{ fontSize: "13px", padding: "4px 12px", borderRadius: "99px", background: theme === "dark" ? "#222" : "#f5f5f3", color: COLORS.sub[theme] }}>{m}</span>
                    ))}
                </div>
            </div>
            <div className="nutrition-grid">
                {[["Calories", result.calories, "kcal"], ["Protein", result.protein, ""], ["Carbs", result.carbs, ""], ["Fat", result.fat, ""]].map(([label, val, unit], idx) => (
                    <div key={label} className={`nutrition-item item-${idx}`} style={{ padding: "16px 12px", textAlign: "center" }}>
                        <div style={{ fontSize: "18px", fontWeight: 600 }}>{val}<span style={{ fontSize: "11px", color: COLORS.sub[theme] }}>{unit}</span></div>
                        <div style={{ fontSize: "11px", color: COLORS.sub[theme], marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                    </div>
                ))}
            </div>
            <div className="action-buttons">
                <button onClick={() => toggleFav(result)} className="pill-button" style={{
                    flex: 1, padding: "12px",
                    border: `1.5px solid ${isFav ? COLORS.accent : COLORS.border[theme]}`,
                    background: isFav ? COLORS.accentLight[theme] : "transparent",
                    color: isFav ? COLORS.accent : COLORS.text[theme],
                }}>
                    {isFav ? "❤️ Saved" : "🤍 Save"}
                </button>
                <button onClick={onTryAgain} className="pill-button" style={{
                    flex: 1, padding: "12px",
                    border: `1.5px solid ${COLORS.border[theme]}`, color: COLORS.text[theme]
                }}>
                     ⟳ Try Again
                </button>
            </div>
        </div>
    );
}
