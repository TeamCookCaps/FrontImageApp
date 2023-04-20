import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PhotoDetail() {
  const {
    state: { photo },
  } = useLocation();

  return <h1>{photo.id}</h1>;
}
