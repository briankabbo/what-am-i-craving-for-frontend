import { COLORS } from "./constants";

export default function Wheel({ wheelItems, wheelOffset, theme }) {
    return (
        <div className="wheel-container" style={{ border: `1px solid ${COLORS.border[theme]}`, background: COLORS.card[theme] }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, transform: "translateY(-50%)", height: "80px", background: theme === "dark" ? "rgba(232,93,38,0.06)" : "rgba(232,93,38,0.04)", borderTop: `1px solid ${COLORS.accent}15`, borderBottom: `1px solid ${COLORS.accent}15`, zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "80px", background: `linear-gradient(to bottom, ${COLORS.card[theme]}, transparent)`, zIndex: 3, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: `linear-gradient(to top, ${COLORS.card[theme]}, transparent)`, zIndex: 3, pointerEvents: "none" }} />

            {wheelItems.length > 0 && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, transform: `translateY(${160 - wheelOffset}px)` }}>
                    {wheelItems.map((f, i) => (
                        <div key={i} className="wheel-item" style={{
                            opacity: i === wheelItems.length - 3 ? 1 : 0.4,
                            transform: i === wheelItems.length - 3 ? "scale(1.08)" : "scale(1)"
                        }}>
                            <span style={{ fontSize: "24px" }}>{f.emoji}</span>
                            <span>{f.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}