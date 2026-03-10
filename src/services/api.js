const API = "http://localhost:5174/api";

// Mock data for fallback when API is down
const MOCK_FOODS = [
    { id: 1, name: "Pizza", emoji: "🍕", cuisine: "Italian", mood: "comfort,cheesy", calories: 285, protein: "12g", carbs: "36g", fat: "10g" },
    { id: 2, name: "Sushi", emoji: "🍣", cuisine: "Japanese", mood: "fresh,healthy,light", calories: 300, protein: "15g", carbs: "50g", fat: "2g" },
    { id: 3, name: "Tacos", emoji: "🌮", cuisine: "Mexican", mood: "spicy,hearty", calories: 210, protein: "10g", carbs: "20g", fat: "9g" },
    { id: 4, name: "Pad Thai", emoji: "🍜", cuisine: "Thai", mood: "spicy,sweet", calories: 350, protein: "12g", carbs: "60g", fat: "12g" },
    { id: 5, name: "Burger", emoji: "🍔", cuisine: "American", mood: "comfort,hearty", calories: 500, protein: "25g", carbs: "40g", fat: "26g" },
    { id: 6, name: "Greek Salad", emoji: "🥗", cuisine: "Mediterranean", mood: "fresh,healthy,light", calories: 150, protein: "4g", carbs: "10g", fat: "11g" },
    { id: 7, name: "Curry", emoji: "🍛", cuisine: "South Asian", mood: "spicy,hearty", calories: 400, protein: "14g", carbs: "55g", fat: "15g" },
    { id: 8, name: "Fish and Chips", emoji: "🐟", cuisine: "British", mood: "comfort", calories: 600, protein: "20g", carbs: "70g", fat: "30g" }
];

export const fetchFoods = async (cuisine, mood) => {
    try {
        const res = await fetch(`${API}/foods?cuisine=${cuisine}&mood=${mood}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.warn("Backend unavailable, using mock data for foods");
        return MOCK_FOODS.filter(f =>
            (cuisine === "All" || f.cuisine === cuisine) &&
            (mood === "All" || f.mood.includes(mood))
        );
    }
};

export const fetchFavourites = async () => {
    try {
        const res = await fetch(`${API}/favourites`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.warn("Backend unavailable, using mock data for favourites");
        // For demonstration, we'll return a subset of foods as mocks
        return MOCK_FOODS.slice(0, 2);
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
