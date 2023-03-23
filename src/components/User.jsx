import React from 'react';

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className="flex items-center">
      <img
        className="w-7 h-7 mr-2 rounded-full"
        src={photoURL}
        alt={displayName}
      />
      <span className="text-xl truncate hidden md:block">{displayName}</span>
    </div>
  );
}
