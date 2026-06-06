import { MOODS, CUISINES, MOOD_LABELS, COLORS } from "./constants";
import { Theme } from "../../types";

interface FilterPanelProps {
    cuisine: string;
    setCuisine: (cuisine: string) => void;
    mood: string;
    setMood: (mood: string) => void;
    theme: Theme;
}

export default function FilterPanel({ cuisine, setCuisine, mood, setMood, theme }: FilterPanelProps) {
    return (
        <div className="filter-panel">
            <div style={{ marginBottom: "20px", textAlign: "left" }}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700, lineHeight: 1.15, marginBottom: "8px" }}>
                    What are you<br />craving today?
                </h1>
                <p style={{ color: COLORS.sub[theme], fontSize: "14px" }}>Filter by mood and cuisine, then spin.</p>
            </div>

            <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.sub[theme], display: "block", marginBottom: "10px", textAlign: "left" }}>Mood</label>
                <div className="chip-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: "8px" }}>
                    {MOODS.map(m => (
                        <button key={m} onClick={() => setMood(m)} className="pill-button" style={{
                            border: `1.5px solid ${mood === m ? COLORS.accent : COLORS.border[theme]}`,
                            background: mood === m ? COLORS.accentLight[theme] : "transparent",
                            color: mood === m ? COLORS.accent : COLORS.text[theme],
                        }}>{MOOD_LABELS[m] || m}</button>
                    ))}
                </div>
            </div>

            <div>
                <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.sub[theme], display: "block", marginBottom: "10px", textAlign: "left" }}>Cuisine</label>
                <div className="chip-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: "8px" }}>
                    {CUISINES.map(c => (
                        <button key={c} onClick={() => setCuisine(c)} className="pill-button" style={{
                            border: `1.5px solid ${cuisine === c ? COLORS.accent : COLORS.border[theme]}`,
                            background: cuisine === c ? COLORS.accentLight[theme] : "transparent",
                            color: cuisine === c ? COLORS.accent : COLORS.text[theme],
                        }}>{c}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}
