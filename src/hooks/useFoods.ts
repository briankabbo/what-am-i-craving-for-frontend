import { useState, useEffect } from "react";
import { fetchFoods } from "../services/api";
import type { Food } from "../types";

export const useFoods = (cuisine: string, mood: string) => {
    const [foods, setFoods] = useState<Food[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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
