const API = "/api";


export const fetchFoods = async (cuisine, mood) => {
    try {
        const params = new URLSearchParams();
        if (cuisine !== "All") params.append("cuisine", cuisine);
        if (mood !== "All") params.append("mood", mood);
        
        const queryString = params.toString() ? `?${params.toString()}` : "";
        const res = await fetch(`${API}/foods${queryString}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data = await res.json();
        // Map backend's 'moods' to frontend's 'mood'
        return data.map(food => ({ ...food, mood: food.moods || food.mood || "" }));
    } catch (err) {
        console.error("Backend fetch error:", err);
        return []; // Force empty array if fetch fails so we don't confuse it with mock data
    }
};

export const fetchFavourites = async () => {
    try {
        const res = await fetch(`${API}/favourites`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error("Backend fetch error (favourites):", err);
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
