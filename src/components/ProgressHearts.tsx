import { motion } from "framer-motion";

interface ProgressHeartsProps {
  total: number;
  filled: number;
}

const ProgressHearts = ({ total, filled }: ProgressHeartsProps) => {
  return (
    <div className="flex items-center justify-center gap-1.5 flex-wrap">
      {Array.from({ length: total }, (_, i) => {
        const isFilled = i < filled;
        return (
          <motion.span
            key={i}
            className="text-lg md:text-xl"
            initial={false}
            animate={
              isFilled
                ? { scale: [1, 1.4, 1], opacity: 1 }
                : { scale: 1, opacity: 0.3 }
            }
            transition={{
              duration: 0.4,
              delay: isFilled ? 0.05 : 0,
            }}
          >
            {isFilled ? "💝" : "🤍"}
          </motion.span>
        );
      })}
      <motion.span
        className="ml-2 font-handwritten text-gold text-base md:text-lg"
        key={filled}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {filled}/{total}
      </motion.span>
    </div>
  );
};

export default ProgressHearts;
