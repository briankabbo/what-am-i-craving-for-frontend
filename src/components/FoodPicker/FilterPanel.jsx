import { MOODS, CUISINES, MOOD_LABELS, COLORS } from "./constants";

export default function FilterPanel({ cuisine, setCuisine, mood, setMood, onSpin, spinning, foodsCount, theme }) {
    return (
        <div className="filter-panel">
            <div style={{ marginBottom: "16px" }}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700, lineHeight: 1.15, marginBottom: "8px" }}>
                    What are you<br />craving today?
                </h1>
                <p style={{ color: COLORS.sub[theme], fontSize: "14px" }}>Filter by mood and cuisine, then spin.</p>
            </div>

            <div style={{ marginBottom: "12px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.sub[theme], display: "block", marginBottom: "10px" }}>Mood</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {MOODS.map(m => (
                        <button key={m} onClick={() => setMood(m)} className="pill-button" style={{
                            border: `1.5px solid ${mood === m ? COLORS.accent : COLORS.border[theme]}`,
                            background: mood === m ? COLORS.accentLight[theme] : "transparent",
                            color: mood === m ? COLORS.accent : COLORS.text[theme],
                        }}>{MOOD_LABELS[m] || m}</button>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.sub[theme], display: "block", marginBottom: "10px" }}>Cuisine</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {CUISINES.map(c => (
                        <button key={c} onClick={() => setCuisine(c)} className="pill-button" style={{
                            border: `1.5px solid ${cuisine === c ? COLORS.accent : COLORS.border[theme]}`,
                            background: cuisine === c ? COLORS.accentLight[theme] : "transparent",
                            color: cuisine === c ? COLORS.accent : COLORS.text[theme],
                        }}>{c}</button>
                    ))}
                </div>
            </div>

            <button onClick={onSpin} disabled={spinning || foodsCount === 0} className="spin-button" style={{
                background: foodsCount === 0 ? COLORS.border[theme] : COLORS.accent,
                color: "#fff",
                transform: spinning ? "scale(0.98)" : "scale(1)",
                boxShadow: foodsCount > 0 ? `0 4px 20px ${COLORS.accent}44` : "none"
            }}>
                {spinning ? "Spinning..." : foodsCount === 0 ? "No matches found" : "🎲 Spin"}
            </button>
        </div>
    );
}
