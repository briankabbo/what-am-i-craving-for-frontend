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

export default function FoodPicker() {
    const [cuisine, setCuisine] = useState("All");
    const [mood, setMood] = useState("All");
    const [view, setView] = useState("home");
    const [darkMode, setDarkMode] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

    const theme = darkMode ? "dark" : "light";

    const { foods } = useFoods(cuisine, mood);
    const { favourites, toggleFavourite, isFavourite } = useFavourites();
    const { spinning, result, wheelItems, wheelOffset, spin, reset } = useSpinAnimation(foods);

    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e) => setDarkMode(e.matches);
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
                            onSpin={handleSpin} spinning={spinning} 
                            foodsCount={foods.length} theme={theme} 
                        />

                        <div style={{ width: "100%" }}>
                            <Wheel wheelItems={wheelItems} wheelOffset={wheelOffset} theme={theme} />

                            {view === "result" && result && (
                                <ResultCard 
                                    result={result} 
                                    isFav={isFavourite(result)} 
                                    toggleFav={toggleFavourite} 
                                    onTryAgain={handleTryAgain} 
                                    theme={theme} 
                                />
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
