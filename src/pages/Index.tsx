import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OpeningSection from "@/components/OpeningSection";
import ChocolateHunt from "@/components/ChocolateHunt";
import ChocolateDiary from "@/components/ChocolateDiary";
import IntimateChoice from "@/components/IntimateChoice";
import FinaleSection from "@/components/FinaleSection";

const Index = () => {
  const [phase, setPhase] = useState<
    "opening" | "hunt" | "diary" | "choice" | "finale"
  >("opening");

  const mainRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const advance = (next: typeof phase) => {
    setPhase(next);
    setTimeout(scrollToTop, 100);
  };

  return (
    <div ref={mainRef} className="bg-background min-h-screen">
      <AnimatePresence mode="wait">
        {phase === "opening" && (
          <motion.div
            key="opening"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <OpeningSection onStart={() => advance("hunt")} />
          </motion.div>
        )}

        {phase === "hunt" && (
          <motion.div
            key="hunt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ChocolateHunt onAllUnwrapped={() => advance("diary")} />
          </motion.div>
        )}

        {phase === "diary" && (
          <motion.div
            key="diary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ChocolateDiary />
            <div className="text-center pb-16">
              <button
                className="btn-unwrap text-lg"
                onClick={() => advance("choice")}
              >
                Continue 💝
              </button>
            </div>
          </motion.div>
        )}

        {phase === "choice" && (
          <motion.div
            key="choice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <IntimateChoice onChosen={() => advance("finale")} />
          </motion.div>
        )}

        {phase === "finale" && (
          <motion.div
            key="finale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FinaleSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
