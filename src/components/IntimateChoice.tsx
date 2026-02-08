import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chocolates } from "@/data/chocolates";

interface IntimateChoiceProps {
  onChosen: () => void;
}

const IntimateChoice = ({ onChosen }: IntimateChoiceProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const [hasAdvanced, setHasAdvanced] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("chocolateChoice");
    if (saved) {
      setSelected(Number(saved));
      setShowResponse(true);
    }
  }, []);

  const handleSelect = (id: number) => {
    setSelected(id);
    setShowResponse(false);
    localStorage.setItem("chocolateChoice", String(id));
    setTimeout(() => setShowResponse(true), 400);
    if (!hasAdvanced) {
      setHasAdvanced(true);
      setTimeout(onChosen, 2500);
    }
  };

  return (
    <section className="min-h-screen px-4 py-12 md:py-24 max-w-2xl mx-auto flex flex-col items-center justify-center">
      <motion.h2
        className="text-2xl md:text-4xl font-serif-display text-center text-pink-soft mb-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        🤍
      </motion.h2>
      <motion.p
        className="font-handwritten text-xl md:text-3xl text-center text-cream mb-8 md:mb-10 px-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        "Which chocolate felt most like you today?"
      </motion.p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 w-full">
        {chocolates.map((choc) => (
          <motion.button
            key={choc.id}
            onClick={() => handleSelect(choc.id)}
            className={`rounded-xl p-2 sm:p-3 md:p-4 text-center transition-all duration-300 ${
              selected === choc.id
                ? "gift-box text-[hsl(var(--chocolate-deep))] glow-pulse"
                : "card-chocolate hover:border-[hsl(var(--gold)/0.5)]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl sm:text-2xl block mb-1">{choc.emoji}</span>
            <span className="text-[10px] sm:text-xs font-serif-display leading-tight block">{choc.name}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {showResponse && (
          <motion.div
            className="mt-8 md:mt-12 text-center"
            key={selected}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-handwritten text-xl md:text-3xl text-gold">
              "I knew you'd choose that…
            </p>
            <p className="font-handwritten text-xl md:text-3xl text-pink-soft mt-2">
              that's why I fell for you."
            </p>
            <span className="text-3xl md:text-4xl block mt-4 animate-heartbeat">💝</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default IntimateChoice;
