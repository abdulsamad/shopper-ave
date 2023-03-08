export const formatCurrency = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
};

export const formatNumber = (price: number) => {
  return new Intl.NumberFormat('en-US').format(price);
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
