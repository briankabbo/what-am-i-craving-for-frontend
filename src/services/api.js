const API = import.meta.env.VITE_API_URL || "/api";

const request = async (endpoint, options = {}) => {
    try {
        const res = await fetch(`${API}${endpoint}`, options);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`API Error (${endpoint}):`, err);
        return null;
    }
};

export const fetchFoods = async (cuisine, mood) => {
    const params = new URLSearchParams();
    if (cuisine !== "All") params.append("cuisine", cuisine);
    if (mood !== "All") params.append("mood", mood);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const data = await request(`/foods${queryString}`);
    if (!Array.isArray(data)) {
        return [];
    }
    
    // Map backend's 'moods' to frontend's 'mood' and ensure it's a normalized string
    return data.map(food => {
        let moodVal = food.moods || food.mood || "";
        if (Array.isArray(moodVal)) {
            moodVal = moodVal.join(", ");
        } else if (typeof moodVal !== "string") {
            moodVal = String(moodVal);
        }
        return { ...food, mood: moodVal };
    });
};

export const fetchFavourites = async () => {
    const data = await request("/favourites");
    return Array.isArray(data) ? data : [];
};

export const addFavourite = async (foodId) => {
    return await request("/favourites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodId })
    });
};

export const removeFavourite = async (id) => {
    const res = await fetch(`${API}/favourites/${id}`, { method: "DELETE" });
    return res.ok;
};
