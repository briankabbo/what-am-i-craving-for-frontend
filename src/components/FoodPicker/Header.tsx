import { COLORS } from "./constants";
import type { Theme } from "../../types";

interface HeaderProps {
    view: string;
    setView: (view: string) => void;
    onHome: () => void;
    favouritesCount: number;
    theme: Theme;
}

export default function Header({ view, setView, onHome, favouritesCount, theme }: HeaderProps) {
    return (
        <header className="app-header" style={{ padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${COLORS.border[theme]}`, position: "sticky", top: 0, background: COLORS.bg[theme], zIndex: 10, width: "100%" }}>
            <div onClick={onHome} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <span className="header-emoji" style={{ fontSize: "22px" }}>🍽️</span>
                <span className="header-logo-text" style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700 }}>craving?</span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setView("home")} className="nav-link" style={{ background: (view === "home" || view === "result") ? COLORS.accent : "transparent", color: (view === "home" || view === "result") ? "#fff" : COLORS.sub[theme] }}>Pick</button>
                <button onClick={() => setView("favourites")} className="nav-link" style={{ background: view === "favourites" ? COLORS.accent : "transparent", color: view === "favourites" ? "#fff" : COLORS.sub[theme] }}>
                    Saved {favouritesCount > 0 && <span style={{ background: COLORS.accent, color: "#fff", borderRadius: "99px", padding: "1px 7px", fontSize: "11px", marginLeft: "4px" }}>{favouritesCount}</span>}
                </button>
            </div>
        </header>
    );
}
