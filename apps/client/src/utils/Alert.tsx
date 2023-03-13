import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';

interface IAlert {
  message: string | React.ReactNode;
  type?: 'default' | 'error' | 'success' | 'info';
  className?: string;
  timeout?: number;
}

const variants = {
  default: 'text-white bg-gray-800',
  error: 'text-white bg-danger',
  success: 'text-white bg-success',
  info: 'text-white bg-info',
};

const Alert = ({ message, type = 'default', className, timeout = 5000 }: IAlert) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => setShow(false), timeout);
    return () => {
      clearTimeout(timeId);
    };
  }, [show, timeout]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, translateY: '-15px' }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: '-15px' }}
          className={`text-smshadow-lg animate-shake mb-3 origin-top rounded-md ${variants[type]} ${className}`}
          role="alert">
          <div className="flex items-center justify-between p-3">
            {message}
            <button
              type="button"
              className="inline-flex flex-shrink-0 items-center justify-center rounded-md text-sm text-white/[.7] transition-all hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-gray-800 dark:focus:ring-offset-gray-900"
              onClick={() => setShow(false)}>
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert;
