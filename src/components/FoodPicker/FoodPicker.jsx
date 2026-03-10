import { useState, useEffect, useRef } from "react";
import { fetchFoods, fetchFavourites, addFavourite, removeFavourite } from "../../services/api";
import { MOODS, CUISINES, MOOD_LABELS, COLORS } from "./constants";
import "./FoodPicker.css";

export default function FoodPicker() {
    const [cuisine, setCuisine] = useState("All");
    const [mood, setMood] = useState("All");
    const [result, setResult] = useState(null);
    const [foods, setFoods] = useState([]);
    const [spinning, setSpinning] = useState(false);
    const [favourites, setFavourites] = useState([]);
    const [view, setView] = useState("home");
    const [wheelItems, setWheelItems] = useState([]);
    const [wheelOffset, setWheelOffset] = useState(0);
    const [darkMode, setDarkMode] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);
    const animRef = useRef(null);

    const theme = darkMode ? "dark" : "light";

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e) => setDarkMode(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        const loadFavs = async () => {
            const data = await fetchFavourites();
            setFavourites(data.map(f => f.food));
        };
        loadFavs();
    }, []);

    useEffect(() => {
        const loadFoods = async () => {
            const data = await fetchFoods(cuisine, mood);
            setFoods(data);
        };
        loadFoods();
    }, [cuisine, mood]);

    const spin = () => {
        if (spinning || foods.length === 0) return;
        setView("home");
        setResult(null);
        setSpinning(true);

        const pool = foods.length >= 6 ? foods : [...foods, ...foods, ...foods].slice(0, 6);
        const picks = Array.from({ length: 20 }, () => pool[Math.floor(Math.random() * pool.length)]);
        setWheelItems(picks);
        setWheelOffset(0);

        let frame = 0;
        const totalFrames = 80;
        const ITEM_H = 80;
        const target = (picks.length - 3) * ITEM_H;
        const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const animate = () => {
            frame++;
            const progress = ease(Math.min(frame / totalFrames, 1));
            setWheelOffset(progress * target);
            if (frame < totalFrames) {
                animRef.current = requestAnimationFrame(animate);
            } else {
                const chosen = picks[picks.length - 3];
                setTimeout(() => {
                    setResult(chosen);
                    setSpinning(false);
                    setView("result");
                }, 400);
            }
        };
        animRef.current = requestAnimationFrame(animate);
    };

    const isFav = (food) => favourites.some(f => f.id === food?.id);

    const toggleFav = async (food) => {
        try {
            if (isFav(food)) {
                const favs = await fetchFavourites();
                const match = favs.find(f => f.foodId === food.id);
                if (match) await removeFavourite(match.id);
                setFavourites(prev => prev.filter(f => f.id !== food.id));
            } else {
                await addFavourite(food.id);
                setFavourites(prev => [...prev, food]);
            }
        } catch (err) {
            console.error("Failed to toggle favourite", err);
        }
    };

    return (
        <div className="food-picker-container" style={{ background: COLORS.bg[theme], color: COLORS.text[theme] }}>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

            <header style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${COLORS.border[theme]}`, position: "sticky", top: 0, background: COLORS.bg[theme], zIndex: 10, width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "22px" }}>🍽️</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700 }}>craving?</span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => setView("home")} className="nav-link" style={{ background: (view === "home" || view === "result") ? COLORS.accent : "transparent", color: (view === "home" || view === "result") ? "#fff" : COLORS.sub[theme] }}>Pick</button>
                    <button onClick={() => setView("favourites")} className="nav-link" style={{ background: view === "favourites" ? COLORS.accent : "transparent", color: view === "favourites" ? "#fff" : COLORS.sub[theme] }}>
                        Saved {favourites.length > 0 && <span style={{ background: COLORS.accent, color: "#fff", borderRadius: "99px", padding: "1px 7px", fontSize: "11px", marginLeft: "4px" }}>{favourites.length}</span>}
                    </button>
                </div>
            </header>

            <main className="main-layout">
                {(view === "home" || view === "result") && (
                    <>
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

                            <button onClick={spin} disabled={spinning || foods.length === 0} className="spin-button" style={{
                                background: foods.length === 0 ? COLORS.border[theme] : COLORS.accent,
                                color: "#fff",
                                transform: spinning ? "scale(0.98)" : "scale(1)",
                                boxShadow: foods.length > 0 ? `0 4px 20px ${COLORS.accent}44` : "none"
                            }}>
                                {spinning ? "Spinning..." : foods.length === 0 ? "No matches found" : "🎲 Spin"}
                            </button>
                        </div>

                        <div style={{ width: "100%" }}>
                            <div className="wheel-container" style={{ border: `1px solid ${COLORS.border[theme]}`, background: COLORS.card[theme] }}>
                                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, transform: "translateY(-50%)", height: "80px", background: darkMode ? "rgba(232,93,38,0.08)" : "rgba(232,93,38,0.05)", borderTop: `1px solid ${COLORS.accent}22`, borderBottom: `1px solid ${COLORS.accent}22`, zIndex: 2, pointerEvents: "none" }} />
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "80px", background: `linear-gradient(to bottom, ${COLORS.card[theme]}, transparent)`, zIndex: 3, pointerEvents: "none" }} />
                                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: `linear-gradient(to top, ${COLORS.card[theme]}, transparent)`, zIndex: 3, pointerEvents: "none" }} />

                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, transform: `translateY(${80 - wheelOffset}px)` }}>
                                    {wheelItems.length > 0 ? wheelItems.map((f, i) => (
                                        <div key={i} className="wheel-item" style={{
                                            opacity: i === wheelItems.length - 3 ? 1 : 0.4,
                                            transform: i === wheelItems.length - 3 ? "scale(1.08)" : "scale(1)"
                                        }}>
                                            <span style={{ fontSize: "24px" }}>{f.emoji}</span>
                                            <span>{f.name}</span>
                                        </div>
                                    )) : (
                                        <div style={{ height: "280px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
                                            <span style={{ fontSize: "48px" }}>🎲</span>
                                            <span style={{ color: COLORS.sub[theme], fontSize: "14px" }}>Hit spin to pick your meal!</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {view === "result" && result && (
                                <div className="result-card" style={{ border: `1px solid ${COLORS.border[theme]}`, background: COLORS.card[theme] }}>
                                    <div style={{ padding: "32px", textAlign: "center", borderBottom: `1px solid ${COLORS.border[theme]}` }}>
                                        <div style={{ fontSize: "64px", marginBottom: "12px" }}>{result.emoji}</div>
                                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, marginBottom: "10px" }}>{result.name}</h2>
                                        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px" }}>
                                            <span style={{ fontSize: "13px", padding: "4px 12px", borderRadius: "99px", background: COLORS.accentLight[theme], color: COLORS.accent, fontWeight: 500 }}>{result.cuisine}</span>
                                            {result.mood.split(",").map(m => (
                                                <span key={m} style={{ fontSize: "13px", padding: "4px 12px", borderRadius: "99px", background: darkMode ? "#222" : "#f5f5f3", color: COLORS.sub[theme] }}>{m}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="nutrition-grid">
                                        {[["Calories", result.calories, "kcal"], ["Protein", result.protein, ""], ["Carbs", result.carbs, ""], ["Fat", result.fat, ""]].map(([label, val, unit]) => (
                                            <div key={label} style={{ padding: "16px 12px", textAlign: "center", borderRight: `1px solid ${COLORS.border[theme]}` }}>
                                                <div style={{ fontSize: "18px", fontWeight: 600 }}>{val}<span style={{ fontSize: "11px", color: COLORS.sub[theme] }}>{unit}</span></div>
                                                <div style={{ fontSize: "11px", color: COLORS.sub[theme], marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="action-buttons">
                                        <button onClick={() => toggleFav(result)} className="pill-button" style={{
                                            flex: 1, padding: "12px",
                                            border: `1.5px solid ${isFav(result) ? COLORS.accent : COLORS.border[theme]}`,
                                            background: isFav(result) ? COLORS.accentLight[theme] : "transparent",
                                            color: isFav(result) ? COLORS.accent : COLORS.text[theme],
                                        }}>
                                            {isFav(result) ? "❤️ Saved" : "🤍 Save"}
                                        </button>
                                        <button onClick={() => { setView("home"); setResult(null); setWheelItems([]); }} className="pill-button" style={{
                                            flex: 1, padding: "12px",
                                            border: `1.5px solid ${COLORS.border[theme]}`, color: COLORS.text[theme]
                                        }}>
                                            🔄 Try Again
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {view === "favourites" && (
                    <div style={{ gridColumn: "1 / -1" }}>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Saved Foods</h2>
                        <p style={{ color: COLORS.sub[theme], fontSize: "14px", marginBottom: "28px" }}>{favourites.length} item{favourites.length !== 1 ? "s" : ""} saved</p>
                        {favourites.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "60px 20px", color: COLORS.sub[theme] }}>
                                <div style={{ fontSize: "40px", marginBottom: "12px" }}>🤍</div>
                                <p>No saved foods yet.<br />Spin and save your favourites!</p>
                                <button onClick={() => setView("home")} className="pill-button" style={{ marginTop: "20px", padding: "10px 24px", border: `1.5px solid ${COLORS.border[theme]}`, color: COLORS.text[theme] }}>Start Picking</button>
                            </div>
                        ) : (
                            <div className="favs-grid">
                                {favourites.map(food => (
                                    <div key={food.id} style={{ borderRadius: "14px", border: `1px solid ${COLORS.border[theme]}`, background: COLORS.card[theme], padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px" }}>
                                        <span style={{ fontSize: "32px" }}>{food.emoji}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 600, fontSize: "15px" }}>{food.name}</div>
                                            <div style={{ fontSize: "12px", color: COLORS.sub[theme], marginTop: "2px" }}>{food.cuisine} · {food.calories} kcal</div>
                                        </div>
                                        <button onClick={() => toggleFav(food)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: COLORS.accent }}>✕</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
