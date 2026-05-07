import { useState, useEffect } from "react";
import { fetchFoods } from "../services/api";

export const useFoods = (cuisine, mood) => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const data = await fetchFoods(cuisine, mood);
            setFoods(data);
            setLoading(false);
        };
        load();
    }, [cuisine, mood]);

    return { foods, loading };
};
