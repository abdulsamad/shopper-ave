import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

export const formatCurrency = (price: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    ...options,
  }).format(price);
};

export const formatNumber = (num: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('en-US', { ...options }).format(num);
};

export const createFormData = (data: object) => {
  const formData = new FormData();

  for (const [formKey, val] of Object.entries(data)) {
    if (!val) continue;

    // File
    if (typeof val === 'object' && val.constructor.name.toLowerCase() === 'filelist') {
      for (let i = 0; i < val.length; i++) {
        // Confirm it's a file blob
        if (val[i] instanceof Blob) {
          formData.append(formKey, val[i]);
        }
      }

      continue;
    }

    // Other Fields
    if (typeof val === 'string') formData.append(formKey, val);
  }

  return formData;
};

export const generateAvatar = (seed: string, size: number) => {
  return createAvatar(lorelei, { seed, size }).toDataUriSync();
};

// Sleep for dev experiments
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
