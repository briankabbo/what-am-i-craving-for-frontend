import { useState, useEffect } from "react";
import { fetchFavourites, addFavourite, removeFavourite } from "../services/api";

export const useFavourites = () => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await fetchFavourites();
            // API may return { food: {...} } or just the food object directly
            setFavourites(data.map(f => f.food ?? f).filter(Boolean));
        };
        load();
    }, []);

    const toggleFavourite = async (food) => {
        const existing = favourites.find(f => f.id === food.id);
        try {
            if (existing) {
                const favs = await fetchFavourites();
                const match = favs.find(f => (f.foodId || f.food?.id) === food.id);
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

    const isFavourite = (food) => favourites.some(f => f.id === food?.id);

    return { favourites, toggleFavourite, isFavourite };
};
