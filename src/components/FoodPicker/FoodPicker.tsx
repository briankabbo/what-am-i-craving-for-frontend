import { useState, useEffect } from "react";
import { COLORS } from "./constants";
import { useFoods } from "../../hooks/useFoods";
import { useFavourites } from "../../hooks/useFavourites";
import { useSpinAnimation } from "../../hooks/useSpinAnimation";

import Header from "./Header";
import FilterPanel from "./FilterPanel";
import Wheel from "./Wheel";
import ResultCard from "./ResultCard";
import FavouritesList from "./FavouritesList";
import "./FoodPicker.css";
import { Theme } from "../../types";

export default function FoodPicker() {
    const [cuisine, setCuisine] = useState<string>("All");
    const [mood, setMood] = useState<string>("All");
    const [view, setView] = useState<string>("home");
    const [darkMode, setDarkMode] = useState<boolean>(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

    const theme: Theme = darkMode ? "dark" : "light";

    const { foods } = useFoods(cuisine, mood);
    const { favourites, toggleFavourite, isFavourite } = useFavourites();
    const { spinning, result, wheelItems, wheelOffset, spin, reset } = useSpinAnimation(foods);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const handleSpin = () => {
        spin(() => setView("result"));
    };

    const handleTryAgain = () => {
        setView("home");
        reset();
    };

    const handleHome = () => {
        setView("home");
        reset();
    };

    return (
        <div className="food-picker-container" style={{ background: COLORS.bg[theme], color: COLORS.text[theme] }}>
            <Header view={view} setView={setView} onHome={handleHome} favouritesCount={favourites.length} theme={theme} />

            <main className="main-layout">
                {(view === "home" || view === "result") && (
                    <>
                        <FilterPanel
                            cuisine={cuisine} setCuisine={setCuisine}
                            mood={mood} setMood={setMood}
                            theme={theme}
                        />

                        <div className="wheel-result-container">
                            {view === "result" && result ? (
                                <ResultCard
                                    result={result}
                                    isFav={isFavourite(result)}
                                    toggleFav={toggleFavourite}
                                    onTryAgain={handleTryAgain}
                                    theme={theme}
                                />
                            ) : (
                                <div className="wheel-wrapper" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", width: "100%", maxWidth: "480px" }}>
                                     <Wheel wheelItems={wheelItems} wheelOffset={wheelOffset} theme={theme} />
                                <button
                                        onClick={handleSpin}
                                        disabled={spinning || foods.length === 0}
                                        className="spin-button"
                                    style={{
                                        background: foods.length === 0 ? COLORS.border[theme] : COLORS.accent,
                                        color: "#fff",
                                        transform: spinning ? "scale(0.98)" : "scale(1)",
                                        boxShadow: foods.length > 0 ? `0 4px 20px ${COLORS.accent}44` : "none",
                                        width: "100%",
                                                }}>
                                        {spinning ? "𖦹 Spinning..." : foods.length === 0 ? "No matches found" : "𖦹 Spin"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {view === "favourites" && (
                    <FavouritesList
                        favourites={favourites}
                        toggleFav={toggleFavourite}
                        setView={setView}
                        theme={theme}
                    />
                )}
            </main>
        </div>
    );
}
