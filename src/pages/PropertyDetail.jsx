import React from 'react';
import { useParams } from 'react-router-dom';

export default function PropertyDetail() {
  const { id } = useParams();

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-quantum-cyan">
        Property Detail – ID: {id}
      </h1>
      <p className="text-quantum-dark">
        This page will display full property information, images, map, contact form, etc.
      </p>
    </section>
  );
}
