import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { loveLetter } from "@/data/chocolates";

const FinaleSection = () => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    const end = Date.now() + 3000;
    const colors = ["#D4A574", "#F4C2C2", "#8B4513", "#FFD700"];
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const handleRedeem = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#D4A574", "#F4C2C2", "#8B4513", "#FFD700", "#FFF8DC"],
    });
  };

  const letterParagraphs = loveLetter.split("\n\n");

  // Typewriter: split each paragraph into words for staggered reveal
  const WordReveal = ({ text, paraIndex }: { text: string; paraIndex: number }) => {
    const words = text.split(" ");
    const baseDelay = 0.8 + paraIndex * 0.6;
    return (
      <motion.p
        className="font-handwritten text-sm sm:text-base md:text-xl leading-relaxed text-[hsl(var(--chocolate-deep))]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: baseDelay, duration: 0.3 }}
      >
        {words.map((word, wi) => (
          <motion.span
            key={wi}
            className="inline-block mr-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: baseDelay + wi * 0.04,
              duration: 0.3,
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    );
  };

  return (
    <section className="min-h-screen px-3 sm:px-4 py-12 md:py-24 flex flex-col items-center justify-center">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-5xl font-serif-display text-center gold-shimmer mb-8 md:mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        🎁 A Gift For You
      </motion.h2>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="box"
            className="cursor-pointer"
            onClick={handleOpen}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div
              className="gift-box w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center relative overflow-hidden"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 sm:w-4 h-full bg-[hsl(var(--pink-warm))] opacity-60 absolute" />
                <div className="h-3 sm:h-4 w-full bg-[hsl(var(--pink-warm))] opacity-60 absolute" />
              </div>
              <div className="relative z-10 text-center">
                <span className="text-5xl sm:text-6xl md:text-7xl block mb-3 md:mb-4">🎁</span>
                <p className="font-handwritten text-base sm:text-lg md:text-xl text-[hsl(var(--chocolate-deep))]">
                  Tap to open…
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="max-w-2xl w-full"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="bg-cream rounded-2xl p-4 sm:p-6 md:p-10 shadow-2xl">
              <div className="space-y-4 md:space-y-5">
                {letterParagraphs.map((para, i) => (
                  <WordReveal key={i} text={para} paraIndex={i} />
                ))}
              </div>

              <motion.div
                className="mt-8 md:mt-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
              >
                <button
                  className="btn-unwrap text-sm sm:text-base md:text-lg"
                  onClick={handleRedeem}
                >
                  Redeem This Chocolate in Real Life 🍫
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FinaleSection;
