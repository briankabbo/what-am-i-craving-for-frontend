import { Food } from "../types";

const API = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "/api";

const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T | null> => {
    try {
        const res = await fetch(`${API}${endpoint}`, options);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(`API Error (${endpoint}):`, err);
        return null;
    }
};

export const fetchFoods = async (cuisine: string, mood: string): Promise<Food[]> => {
    const params = new URLSearchParams();
    if (cuisine !== "All") params.append("cuisine", cuisine);
    if (mood !== "All") params.append("mood", mood);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const data = await request<any[]>(`/foods${queryString}`);
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

export const fetchFavourites = async (): Promise<any[]> => {
    const data = await request<any[]>("/favourites");
    return Array.isArray(data) ? data : [];
};

export const addFavourite = async (foodId: string | number): Promise<any> => {
    return await request<any>("/favourites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodId })
    });
};

export const removeFavourite = async (id: string | number): Promise<boolean> => {
    const res = await fetch(`${API}/favourites/${id}`, { method: "DELETE" });
    return res.ok;
};
