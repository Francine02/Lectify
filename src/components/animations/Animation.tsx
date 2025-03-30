import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimatedProps = {
    children: ReactNode;
    direction?: "left" | "right" | "up" | "down";
    duration?: number;
};

export default function Animated({ children, direction = "right", duration = 0.6 }: AnimatedProps) {
    const variants = {
        hidden: {
            opacity: 0,
            x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
            y: direction === "up" ? -20 : direction === "down" ? 20 : 0,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration, ease: "easeInOut" },
        },
        exit: {
            opacity: 0,
            x: direction === "left" ? -20 : direction === "right" ? 20 : 0,
            y: direction === "up" ? -20 : direction === "down" ? 20 : 0,
            transition: { duration, ease: "easeInOut" },
        },
    };

    return (
        <motion.div initial="hidden" animate="visible" exit="exit" variants={variants}>
            {children}
        </motion.div>
    );
}
