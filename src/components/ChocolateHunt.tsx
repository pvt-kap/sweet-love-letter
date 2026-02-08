import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chocolates } from "@/data/chocolates";

interface ChocolateHuntProps {
  onAllUnwrapped: () => void;
}

const ChocolateHunt = ({ onAllUnwrapped }: ChocolateHuntProps) => {
  const [unwrapped, setUnwrapped] = useState<Set<number>>(new Set());

  const handleUnwrap = (id: number) => {
    const next = new Set(unwrapped);
    if (next.has(id)) return;
    next.add(id);
    setUnwrapped(next);
    if (next.size === 10) {
      setTimeout(onAllUnwrapped, 1200);
    }
  };

  return (
    <section className="min-h-screen px-4 py-16 md:py-24 max-w-5xl mx-auto">
      <motion.h2
        className="text-3xl md:text-5xl font-serif-display text-center gold-shimmer mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        💝 The Chocolate Hunt
      </motion.h2>
      <motion.p
        className="text-center text-muted-foreground mb-12 text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Tap each chocolate to unwrap her story…
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {chocolates.map((choc, i) => {
          const isOpen = unwrapped.has(choc.id);
          return (
            <motion.div
              key={choc.id}
              className="perspective-1000 cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleUnwrap(choc.id)}
            >
              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.div
                    key="front"
                    className="card-chocolate rounded-xl p-5 md:p-6 flex flex-col items-center justify-center min-h-[160px] md:min-h-[180px] hover:border-[hsl(var(--gold)/0.5)] transition-colors"
                    whileHover={{ scale: 1.04, rotateY: 5 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-4xl md:text-5xl mb-3">{choc.emoji}</span>
                    <span className="font-serif-display text-sm md:text-base text-gold text-center">
                      {choc.name}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    className="bg-cream rounded-xl p-4 md:p-5 min-h-[160px] md:min-h-[180px] flex flex-col"
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-xl mb-1">
                      {choc.emoji} {choc.name}
                    </span>
                    <p className="text-xs md:text-sm leading-relaxed text-[hsl(var(--chocolate-deep))] flex-1">
                      {choc.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Progress */}
      <motion.div
        className="text-center mt-10 text-lg font-handwritten text-gold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {unwrapped.size}/10 chocolates unwrapped 🍫
      </motion.div>

      {unwrapped.size === 10 && (
        <motion.p
          className="text-center mt-4 text-pink-soft font-handwritten text-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          ✨ All unwrapped! Scroll down for the diary…
        </motion.p>
      )}
    </section>
  );
};

export default ChocolateHunt;
