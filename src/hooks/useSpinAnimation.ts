import { useState, useRef, useEffect } from "react";
import { Food } from "../types";

export const useSpinAnimation = (foods: Food[]) => {
    const [spinning, setSpinning] = useState<boolean>(false);
    const [result, setResult] = useState<Food | null>(null);
    const [wheelItems, setWheelItems] = useState<Food[]>([]);
    const [wheelOffset, setWheelOffset] = useState<number>(0);
    const animRef = useRef<number | null>(null);

    useEffect(() => {
        if (foods.length === 0) return;
        const pool = foods.length >= 6 ? foods : [...foods, ...foods, ...foods].slice(0, 6);
        const preview = Array.from({ length: 8 }, () => pool[Math.floor(Math.random() * pool.length)]);
        setWheelItems(preview);
        setWheelOffset(0);
    }, [foods]);

    const spin = (onFinish?: (chosen: Food) => void) => {
        if (spinning || foods.length === 0) return;
        
        setResult(null);
        setSpinning(true);

        const pool = foods.length >= 6 ? foods : [...foods, ...foods, ...foods].slice(0, 6);
        const picks = Array.from({ length: 20 }, () => pool[Math.floor(Math.random() * pool.length)]);
        setWheelItems(picks);
        setWheelOffset(0);

        let frame = 0;
        const totalFrames = 80;
        const ITEM_H = 80;
        const target = (picks.length - 3) * ITEM_H;
        const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const animate = () => {
            frame++;
            const progress = ease(Math.min(frame / totalFrames, 1));
            setWheelOffset(progress * target);
            
            if (frame < totalFrames) {
                animRef.current = requestAnimationFrame(animate);
            } else {
                const chosen = picks[picks.length - 3];
                setTimeout(() => {
                    setResult(chosen);
                    setSpinning(false);
                    if (onFinish) onFinish(chosen);
                }, 400);
            }
        };
        animRef.current = requestAnimationFrame(animate);
    };

    const reset = () => {
        setResult(null);
        if (foods.length > 0) {
            const pool = foods.length >= 6 ? foods : [...foods, ...foods, ...foods].slice(0, 6);
            const preview = Array.from({ length: 8 }, () => pool[Math.floor(Math.random() * pool.length)]);
            setWheelItems(preview);
            setWheelOffset(0);
        } else {
            setWheelItems([]);
            setWheelOffset(0);
        }
    };

    return { spinning, result, wheelItems, wheelOffset, spin, reset };
};