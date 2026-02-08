import { motion } from "framer-motion";
import { chocolates } from "@/data/chocolates";

const ChocolateDiary = () => {
  return (
    <section className="min-h-screen px-4 py-16 md:py-24 max-w-3xl mx-auto">
      <motion.h2
        className="text-3xl md:text-5xl font-serif-display text-center gold-shimmer mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        📖 Chocolate Day Diary
      </motion.h2>
      <motion.p
        className="text-center text-muted-foreground mb-12 font-handwritten text-xl italic"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        — For Her —
      </motion.p>

      <div className="space-y-6">
        {chocolates.map((choc, i) => (
          <motion.div
            key={choc.id}
            className="diary-card"
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="font-serif-display text-lg md:text-xl font-semibold mb-2">
              {choc.emoji} {choc.name}
            </h3>
            <p className="leading-relaxed text-sm md:text-base opacity-90">
              {choc.description}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-center mt-16 font-handwritten text-2xl md:text-3xl text-gold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        "If love had a flavor… it would taste like you."
      </motion.p>
    </section>
  );
};

export default ChocolateDiary;
