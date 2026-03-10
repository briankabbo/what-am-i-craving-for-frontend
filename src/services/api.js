const API = "http://localhost:5174/api";

export const fetchFoods = async (cuisine, mood) => {
    try {
        const res = await fetch(`${API}/foods?cuisine=${cuisine}&mood=${mood}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("Error fetching foods:", err);
        return [];
    }
};

export const fetchFavourites = async () => {
    try {
        const res = await fetch(`${API}/favourites`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("Error fetching favourites:", err);
        return [];
    }
};

export const addFavourite = async (foodId) => {
    try {
        const res = await fetch(`${API}/favourites`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ foodId })
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("Error adding favourite:", err);
        throw err;
    }
};

export const removeFavourite = async (id) => {
    try {
        const res = await fetch(`${API}/favourites/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return true;
    } catch (err) {
        console.error("Error removing favourite:", err);
        throw err;
    }
};
