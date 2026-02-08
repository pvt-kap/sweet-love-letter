import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EMOJIS = ["🍫", "🤎", "✨", "💝", "💋", "🍬", "🌟", "🤍", "⚡", "🎁"];

interface FloatingItem {
  id: number;
  emoji: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

interface FloatingChocolatesProps {
  intensity?: number; // 1-5, controls how many emojis
}

const FloatingChocolates = ({ intensity = 2 }: FloatingChocolatesProps) => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const count = Math.min(intensity * 4, 20);
    const newItems: FloatingItem[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x: Math.random() * 100,
      size: 16 + Math.random() * 20,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 6,
    }));
    setItems(newItems);
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {items.map((item) => (
          <motion.span
            key={item.id}
            className="absolute"
            style={{
              left: `${item.x}%`,
              fontSize: `${item.size}px`,
              bottom: "-40px",
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [0, -window.innerHeight - 100],
              opacity: [0, 0.3, 0.15, 0],
              rotate: [0, 360],
              x: [0, Math.sin(item.id) * 40],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {item.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingChocolates;
