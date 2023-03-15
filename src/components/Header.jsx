import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { RxPerson } from 'react-icons/rx';

export default function Header() {
  const [text, setText] = useState('');

  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="w-full flex justify-between mb-10">
      <form className="w-full flex gap-3" onSubmit={handleSubmit}>
        <BiSearch className="text-2xl" />
        <input
          className="w-10/12 outline-none"
          type="text"
          value={text}
          placeholder="Search photo"
          onChange={handleChange}
        />
      </form>
      <RxPerson className="text-2xl" />
    </header>
  );
}
