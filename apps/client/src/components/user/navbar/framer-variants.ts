import { Variants } from 'framer-motion';

export const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,

    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const DropdownItemVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};
