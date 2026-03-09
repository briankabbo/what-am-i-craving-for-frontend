import { useState, useEffect, useRef } from "react";

const API = "http://localhost:5174/api";

const MOODS = ["All", "comfort", "light", "hearty", "spicy", "fresh", "healthy", "cheesy", "sweet"];
const CUISINES = ["All", "Italian", "Japanese", "Mexican", "Thai", "South Asian", "American", "Mediterranean", "British"];

const MOOD_LABELS = {
    comfort: "😌 Comfort", light: "🌿 Light", hearty: "💪 Hearty",
    spicy: "🌶️ Spicy", fresh: "✨ Fresh", healthy: "💚 Healthy",
    cheesy: "🧀 Cheesy", sweet: "🍯 Sweet", All: "🎲 Any Mood"
};

export default function FoodPicker() {
    const [cuisine, setCuisine] = useState("All");
    const [mood, setMood] = useState("All");
    const [result, setResult] = useState(null);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [favourites, setFavourites] = useState(() => {
        try { return JSON.parse(localStorage.getItem("foodFavs") || "[]"); } catch { return []; }
    });
    const [view, setView] = useState("home"); // home | result | favourites
    const [wheelItems, setWheelItems] = useState([]);
    const [wheelOffset, setWheelOffset] = useState(0);
    const [darkMode, setDarkMode] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);
    const wheelRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e) => setDarkMode(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        const fetchFavs = async () => {
            const res = await fetch(`${API}/favourites`);
            const data = await res.json();
            setFavourites(data.map(f => f.food));
        };
        fetchFavs();
    }, []);
    useEffect(() => {
        const fetchFoods = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API}/foods?cuisine=${cuisine}&mood=${mood}`);
                const data = await res.json();
                setFoods(data);
            } catch (err) {
                console.error("Failed to fetch foods", err);
            }
            setLoading(false);
        };
        fetchFoods();
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
        const totalFrames = 60;
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
                }, 300);
            }
        };
        animRef.current = requestAnimationFrame(animate);
    };

    const toggleFav = async (food) => {
        if (isFav(food)) {
            const fav = await fetch(`${API}/favourites`).then(r => r.json());
            const match = fav.find(f => f.foodId === food.id);
            if (match) await fetch(`${API}/favourites/${match.id}`, { method: "DELETE" });
            setFavourites(prev => prev.filter(f => f.id !== food.id));
        } else {
            await fetch(`${API}/favourites`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ foodId: food.id })
            });
            setFavourites(prev => [...prev, food]);
        }
    };

    const isFav = (food) => favourites.some(f => f.id === food?.id);

    const bg = darkMode ? "#0f0f0f" : "#fafaf8";
    const card = darkMode ? "#1a1a1a" : "#ffffff";
    const border = darkMode ? "#2a2a2a" : "#ebebeb";
    const text = darkMode ? "#f0f0f0" : "#1a1a1a";
    const sub = darkMode ? "#888" : "#999";
    const accent = "#e85d26";
    const accentLight = darkMode ? "#2a1a0f" : "#fff4ee";

    return (
        <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", transition: "background 0.3s, color 0.3s" }}>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

            {/* Header */}
            <header style={{ padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "22px" }}>🍽️</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700 }}>craving?</span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => setView("home")} style={{ ...navBtn(view === "home", darkMode, accent) }}>Pick</button>
                    <button onClick={() => setView("favourites")} style={{ ...navBtn(view === "favourites", darkMode, accent) }}>
                        Saved {favourites.length > 0 && <span style={{ background: accent, color: "#fff", borderRadius: "99px", padding: "1px 7px", fontSize: "11px", marginLeft: "4px" }}>{favourites.length}</span>}
                    </button>
                </div>
            </header>

            <main style={{ maxWidth: "520px", margin: "0 auto", padding: "40px 24px" }}>

                {/* HOME VIEW */}
                {(view === "home" || view === "result") && (
                    <>
                        {view === "home" && (
                            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 6vw, 48px)", fontWeight: 700, lineHeight: 1.1, marginBottom: "12px" }}>
                                    What are you<br />craving today?
                                </h1>
                                <p style={{ color: sub, fontSize: "15px" }}>Filter by mood and cuisine, then spin.</p>
                            </div>
                        )}

                        {/* Filters */}
                        <div style={{ marginBottom: "28px" }}>
                            <label style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: sub, display: "block", marginBottom: "10px" }}>Mood</label>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {MOODS.map(m => (
                                    <button key={m} onClick={() => setMood(m)} style={{
                                        padding: "7px 14px", borderRadius: "99px", fontSize: "13px", fontWeight: 500,
                                        border: `1.5px solid ${mood === m ? accent : border}`,
                                        background: mood === m ? accentLight : "transparent",
                                        color: mood === m ? accent : text,
                                        cursor: "pointer", transition: "all 0.15s"
                                    }}>{MOOD_LABELS[m] || m}</button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: "36px" }}>
                            <label style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: sub, display: "block", marginBottom: "10px" }}>Cuisine</label>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {CUISINES.map(c => (
                                    <button key={c} onClick={() => setCuisine(c)} style={{
                                        padding: "7px 14px", borderRadius: "99px", fontSize: "13px", fontWeight: 500,
                                        border: `1.5px solid ${cuisine === c ? accent : border}`,
                                        background: cuisine === c ? accentLight : "transparent",
                                        color: cuisine === c ? accent : text,
                                        cursor: "pointer", transition: "all 0.15s"
                                    }}>{c}</button>
                                ))}
                            </div>
                        </div>

                        {/* Spin Wheel */}
                        <div style={{ position: "relative", height: "240px", borderRadius: "16px", overflow: "hidden", border: `1px solid ${border}`, background: card, marginBottom: "20px" }}>
                            {/* Center highlight */}
                            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, transform: "translateY(-50%)", height: "80px", background: darkMode ? "rgba(232,93,38,0.08)" : "rgba(232,93,38,0.05)", borderTop: `1px solid ${accent}22`, borderBottom: `1px solid ${accent}22`, zIndex: 2, pointerEvents: "none" }} />
                            {/* Fade top */}
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "80px", background: `linear-gradient(to bottom, ${card}, transparent)`, zIndex: 3, pointerEvents: "none" }} />
                            {/* Fade bottom */}
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: `linear-gradient(to top, ${card}, transparent)`, zIndex: 3, pointerEvents: "none" }} />

                            <div ref={wheelRef} style={{ position: "absolute", top: `${80 - wheelOffset}px`, left: 0, right: 0, transition: spinning ? "none" : "top 0.3s ease" }}>
                                {wheelItems.length > 0 ? wheelItems.map((f, i) => (
                                    <div key={i} style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", fontSize: "15px", fontWeight: 500, opacity: 0.5 }}>
                                        <span style={{ fontSize: "24px" }}>{f.emoji}</span>
                                        <span>{f.name}</span>
                                    </div>
                                )) : (
                                    <div style={{ height: "240px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
                                        <span style={{ fontSize: "32px" }}>🤔</span>
                                        <span style={{ color: sub, fontSize: "14px" }}>No matches — try different filters</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button onClick={spin} disabled={spinning || foods.length === 0} style={{
                            width: "100%", padding: "16px", borderRadius: "12px", fontSize: "16px", fontWeight: 600,
                            background: foods.length === 0 ? border : accent, color: "#fff",
                            border: "none", cursor: foods.length === 0 ? "not-allowed" : "pointer",
                            transition: "all 0.2s", transform: spinning ? "scale(0.98)" : "scale(1)",
                            boxShadow: foods.length > 0 ? `0 4px 20px ${accent}44` : "none"
                        }}>
                            {spinning ? "Spinning..." : foods.length === 0 ? "No matches found" : "🎲 Spin"}
                        </button>

                        {/* Result Card */}
                        {view === "result" && result && (
                            <div style={{ marginTop: "32px", borderRadius: "16px", border: `1px solid ${border}`, background: card, overflow: "hidden" }}>
                                <div style={{ padding: "32px", textAlign: "center", borderBottom: `1px solid ${border}` }}>
                                    <div style={{ fontSize: "56px", marginBottom: "12px" }}>{result.emoji}</div>
                                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, marginBottom: "6px" }}>{result.name}</h2>
                                    <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
                                        <span style={{ fontSize: "13px", padding: "4px 12px", borderRadius: "99px", background: accentLight, color: accent, fontWeight: 500 }}>{result.cuisine}</span>
                                        {result.mood.split(",").map(m => (
                                            <span key={m} style={{ fontSize: "13px", padding: "4px 12px", borderRadius: "99px", background: darkMode ? "#222" : "#f5f5f3", color: sub }}>{m}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Nutrition */}
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}>
                                    {[["Calories", result.calories, "kcal"], ["Protein", result.protein, ""], ["Carbs", result.carbs, ""], ["Fat", result.fat, ""]].map(([label, val, unit]) => (
                                        <div key={label} style={{ padding: "16px 12px", textAlign: "center", borderRight: `1px solid ${border}` }}>
                                            <div style={{ fontSize: "18px", fontWeight: 600 }}>{val}<span style={{ fontSize: "11px", color: sub }}>{unit}</span></div>
                                            <div style={{ fontSize: "11px", color: sub, marginTop: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ padding: "16px 20px", display: "flex", gap: "10px" }}>
                                    <button onClick={() => toggleFav(result)} style={{
                                        flex: 1, padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: 500,
                                        border: `1.5px solid ${isFav(result) ? accent : border}`,
                                        background: isFav(result) ? accentLight : "transparent",
                                        color: isFav(result) ? accent : text, cursor: "pointer", transition: "all 0.15s"
                                    }}>
                                        {isFav(result) ? "❤️ Saved" : "🤍 Save"}
                                    </button>
                                    <button onClick={() => { setView("home"); setResult(null); setWheelItems([]); }} style={{
                                        flex: 1, padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: 500,
                                        border: `1.5px solid ${border}`, background: "transparent", color: text, cursor: "pointer"
                                    }}>
                                        🔄 Try Again
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* FAVOURITES VIEW */}
                {view === "favourites" && (
                    <div>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>Saved Foods</h2>
                        <p style={{ color: sub, fontSize: "14px", marginBottom: "28px" }}>{favourites.length} item{favourites.length !== 1 ? "s" : ""} saved</p>

                        {favourites.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "60px 20px", color: sub }}>
                                <div style={{ fontSize: "40px", marginBottom: "12px" }}>🤍</div>
                                <p>No saved foods yet.<br />Spin and save your favourites!</p>
                                <button onClick={() => setView("home")} style={{ marginTop: "20px", padding: "10px 24px", borderRadius: "10px", border: `1.5px solid ${border}`, background: "transparent", color: text, cursor: "pointer", fontSize: "14px" }}>Start Picking</button>
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                {favourites.map(food => (
                                    <div key={food.id} style={{ borderRadius: "14px", border: `1px solid ${border}`, background: card, padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px" }}>
                                        <span style={{ fontSize: "32px" }}>{food.emoji}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 600, fontSize: "15px" }}>{food.name}</div>
                                            <div style={{ fontSize: "12px", color: sub, marginTop: "2px" }}>{food.cuisine} · {food.calories} kcal</div>
                                        </div>
                                        <button onClick={() => toggleFav(food)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: accent }}>✕</button>
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

function navBtn(active, darkMode, accent) {
    return {
        padding: "8px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 500,
        border: "none", cursor: "pointer", transition: "all 0.15s",
        background: active ? accent : "transparent",
        color: active ? "#fff" : darkMode ? "#888" : "#999",
    };
}