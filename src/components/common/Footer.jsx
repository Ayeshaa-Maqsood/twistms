import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-quantum-dark text-quantum-cyan py-4 px-6 text-center">
      <p>© {new Date().getFullYear()} TwistMS Properties. All rights reserved.</p>
    </footer>
  );
}

