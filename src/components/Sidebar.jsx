import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillCircleFill, BsTrashFill } from 'react-icons/bs';
import { AiFillThunderbolt, AiFillGift } from 'react-icons/ai';

export default function Navbar() {
  return (
    <section className="flex flex-col">
      <div className="relative">
        <Link to="/">
          <BsFillCircleFill className="text-yellow-300 text-5xl" />
          <h1 className="text-2xl absolute top-2 left-5 whitespace-nowrap">
            Team Cook
          </h1>
        </Link>
      </div>
      <h1 className="text-4xl font-extrabold py-16">Photo</h1>
      <nav className="flex flex-col gap-5">
        <Link
          to="/"
          className="flex items-center gap-2 transition-all hover:scale-105"
        >
          <AiFillThunderbolt className="text-yellow-500 text-xl" />
          <p className="text-lg font-medium">Main</p>
        </Link>
        <Link
          to="/story"
          className="flex items-center gap-2 transition-all hover:scale-105"
        >
          <AiFillGift className="text-pink-400 text-xl" />
          <p className="text-lg font-medium">Story</p>
        </Link>
        <Link
          to="/trash"
          className="flex items-center gap-2 transition-all hover:scale-105"
        >
          <BsTrashFill className="text-gray-500 text-xl" />
          <p className="text-lg font-medium">Trash</p>
        </Link>
      </nav>
    </section>
  );
}
