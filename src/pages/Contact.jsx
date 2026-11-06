import React from 'react';

export default function Contact() {
  return (
    <section className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-quantum-cyan">Contact Us</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 text-quantum-dark">Name</label>
          <input className="w-full p-2 border rounded" type="text" placeholder="Your name" />
        </div>
        <div>
          <label className="block mb-1 text-quantum-dark">Email</label>
          <input className="w-full p-2 border rounded" type="email" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block mb-1 text-quantum-dark">Message</label>
          <textarea className="w-full p-2 border rounded" rows={4} placeholder="Your message" />
        </div>
        <button className="px-4 py-2 bg-quantum-cyan text-quantum-dark rounded hover:opacity-90">
          Send
        </button>
      </form>
    </section>
  );
}

