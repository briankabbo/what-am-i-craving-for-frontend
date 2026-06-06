export const MOODS: string[] = ["All", "Happy", "Sad", "Tired", "Bored", "Stressed", "Lazy", "Romantic", "Hungry"];
export const CUISINES: string[] = ["All", "Thai", "Korean", "Italian", "Mexican", "Japanese", "South Asian", "American", "French", "Spanish", "Middle Eastern", "Chinese", "Malaysian", "Vietnamese"];

export const MOOD_LABELS: Record<string, string> = {
    Happy: "😊 Happy",
    Sad: "😢 Sad",
    Tired: "😴 Tired",
    Bored: "😐 Bored",
    Stressed: "😫 Stressed",
    Lazy: "🦥 Lazy",
    Romantic: "❤️ Romantic",
    Hungry: "😋 Hungry",
    All: "🎲 Any Mood"
};

interface ThemeColors {
    dark: string;
    light: string;
}

interface ColorPalette {
    accent: string;
    accentLight: ThemeColors;
    bg: ThemeColors;
    card: ThemeColors;
    border: ThemeColors;
    text: ThemeColors;
    sub: ThemeColors;
}

export const COLORS: ColorPalette = {
    accent: "#e85d26",
    accentLight: {
        dark: "#2a1a0f",
        light: "#fff4ee"
    },
    bg: {
        dark: "#0f0f0f",
        light: "#fafaf8"
    },
    card: {
        dark: "#1a1a1a",
        light: "#ffffff"
    },
    border: {
        dark: "#2a2a2a",
        light: "#ebebeb"
    },
    text: {
        dark: "#f0f0f0",
        light: "#1a1a1a"
    },
    sub: {
        dark: "#888",
        light: "#999"
    }
};
