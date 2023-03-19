import React from 'react';
import { ImKey } from 'react-icons/im';

export default function BlurBox() {
  return (
    <>
      <section className="h-full bg-slate-300 rounded-3xl overflow-hidden blur-3xl">
        <div className="w-full h-full bg-cover bg-blur" />
      </section>
      <div className="flex items-center absolute top-1/2 xl:px-96 md:px-48 sm:px-24 text-gray-500 text-4xl font-medium">
        <ImKey className="mr-2" />
        <h2 className="whitespace-nowrap">Please, Login</h2>
      </div>
    </>
  );
}
