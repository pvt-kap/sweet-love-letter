import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chocolates } from "@/data/chocolates";
import ProgressHearts from "./ProgressHearts";

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
    <section className="min-h-screen px-3 sm:px-4 py-12 md:py-24 max-w-5xl mx-auto">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-5xl font-serif-display text-center gold-shimmer mb-3 md:mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        💝 The Chocolate Hunt
      </motion.h2>
      <motion.p
        className="text-center text-muted-foreground mb-8 md:mb-12 text-sm sm:text-base md:text-lg px-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        Tap each chocolate to unwrap her story…
      </motion.p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-5">
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
                    className="card-chocolate rounded-xl p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center min-h-[130px] sm:min-h-[150px] md:min-h-[180px] hover:border-[hsl(var(--gold)/0.5)] transition-colors"
                    whileHover={{ scale: 1.04, rotateY: 5 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">{choc.emoji}</span>
                    <span className="font-serif-display text-xs sm:text-sm md:text-base text-gold text-center leading-tight">
                      {choc.name}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    className="bg-cream rounded-xl p-3 sm:p-4 md:p-5 min-h-[130px] sm:min-h-[150px] md:min-h-[180px] max-h-[200px] sm:max-h-[220px] md:max-h-none flex flex-col overflow-hidden"
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-base sm:text-lg md:text-xl mb-1 shrink-0">
                      {choc.emoji} {choc.name}
                    </span>
                    <p className="text-[10px] sm:text-xs md:text-sm leading-relaxed text-[hsl(var(--chocolate-deep))] flex-1 overflow-y-auto scrollbar-thin">
                      {choc.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Hearts */}
      <motion.div
        className="mt-8 md:mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ProgressHearts total={10} filled={unwrapped.size} />
      </motion.div>

      {unwrapped.size === 10 && (
        <motion.p
          className="text-center mt-4 text-pink-soft font-handwritten text-lg md:text-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          ✨ All unwrapped! Your diary awaits…
        </motion.p>
      )}
    </section>
  );
};

export default ChocolateHunt;
