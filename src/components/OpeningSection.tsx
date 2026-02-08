import { motion } from "framer-motion";

interface OpeningSectionProps {
  onStart: () => void;
}

const OpeningSection = ({ onStart }: OpeningSectionProps) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center chocolate-gradient relative overflow-hidden">
      {/* Floating chocolate emojis */}
      {["🍫", "🤎", "✨", "💝", "🍫"].map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl sm:text-3xl opacity-20 pointer-events-none"
          style={{
            top: `${15 + i * 18}%`,
            left: `${10 + i * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          {emoji}
        </motion.span>
      ))}

      <motion.p
        className="font-handwritten text-xl sm:text-2xl md:text-4xl text-gold max-w-xl leading-relaxed px-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        "Some chocolates melt in your mouth… but you melted into my life."
      </motion.p>

      <motion.p
        className="mt-6 sm:mt-8 text-sm sm:text-base md:text-xl text-cream max-w-lg leading-relaxed italic opacity-80 px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
      >
        "I don't need a single chocolate to describe her… because somehow,
        she's all of them."
      </motion.p>

      <motion.button
        className="btn-unwrap mt-8 sm:mt-12 text-base sm:text-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
      >
        Unwrap the Love 🍫
      </motion.button>
    </section>
  );
};

export default OpeningSection;
