import React from 'react';

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className="flex items-center">
      <img
        className="w-6 h-6 mr-2 rounded-full"
        src={photoURL}
        alt={displayName}
      />
      <span className="font-medium truncate hidden md:block">
        {displayName}
      </span>
    </div>
  );
}
