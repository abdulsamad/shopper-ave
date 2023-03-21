import React from 'react';

import Button from '@utils/Button';

const Ad = () => {
  return (
    <section className="bg-cyan flex w-full items-center justify-center bg-gradient-to-r from-[#FDC830] to-[#F37335] shadow">
      <div className="flex items-center space-x-5 italic">
        <h2 className="text-lg text-white">
          <span>Upto</span> <span className="font-bold text-slate-50">30% Off</span> on Electronics
        </h2>
        <Button className="bg-gray-100 shadow">Shop Now</Button>
      </div>
    </section>
  );
};

export default Ad;
