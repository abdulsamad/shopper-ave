import React from 'react';
import { motion } from 'framer-motion';

const HamburgerIcon = ({ opened }: { opened: boolean }) => (
  <div className="space-y-[5px]">
    <motion.div
      animate={{
        rotateZ: opened ? '45deg' : '0deg',
        translateY: opened ? 6.5 : 0,
        transition: { delay: 0.1 },
      }}
      className="h-[1.5px] w-5 rounded-full bg-black"
      aria-hidden={true}
    />
    <motion.div
      animate={{ opacity: opened ? 0 : 1, scaleX: opened ? 0 : 1 }}
      className="h-[1.5px] w-5 rounded-full bg-black"
      aria-hidden={true}
    />
    <motion.div
      animate={{
        rotateZ: opened ? '-45deg' : '0deg',
        translateY: opened ? -6.5 : 0,
        transition: { delay: 0.25 },
      }}
      className="h-[1.5px] w-5 rounded-full bg-black"
      aria-hidden={true}
    />
  </div>
);

export default HamburgerIcon;
