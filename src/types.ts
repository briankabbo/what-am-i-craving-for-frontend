export type Theme = "light" | "dark";

export interface Food {
    id: string | number;
    name: string;
    emoji: string;
    cuisine: string;
    mood: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    [key: string]: any;
}
