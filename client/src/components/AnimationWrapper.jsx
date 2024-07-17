import { AnimatePresence, motion } from "framer-motion";

function AnimationWrapper({
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
}) {
  return (
    <AnimatePresence>
      <motion.div initial={initial} animate={animate}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default AnimationWrapper;
