import { COLORS } from "./constants";

export default function FavouritesList({ favourites, toggleFav, setView, theme }) {
    return (
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
    );
}
