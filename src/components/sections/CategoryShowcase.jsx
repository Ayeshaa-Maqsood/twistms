import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { EASE } from '../../lib/motion';

const u = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=72`;

const ITEMS = [
  {
    cat: 'Residential',
    title: 'Homes & Estates',
    body: 'Family homes, luxury estates and townhouses with verified ownership records.',
    img: u('1600596542815-ffad4c1539a9'),
  },
  {
    cat: 'Land',
    title: 'Land, Farms & Ranches',
    body: 'Hunting land, timber, farmland and recreational acreage, priced per acre.',
    img: u('1500382017468-9049fed747ef'),
  },
  {
    cat: 'Commercial',
    title: 'Commercial Property',
    body: 'Offices, industrial parks and investment buildings for businesses and investors.',
    img: u('1486406146926-c627a92ad1ab'),
  },
  {
    cat: 'Rental',
    title: 'Rentals',
    body: 'Long-term rentals and furnished residences, listed monthly.',
    img: u('1512917774080-9991f1c4c750'),
  },
];

/** One panel: the image drifts inside its frame and the frame scales up as it enters. */
function Panel({ item, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const frameScale = useTransform(scrollYProgress, [0, 0.35], [0.92, 1]);
  const shade = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.75, 0.45, 0.75]);
  const offset = index % 2 === 1 ? 'lg:mt-16' : '';

  return (
    <motion.div
      ref={ref}
      style={{ scale: reduce ? 1 : frameScale }}
      className={`relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-[0_24px_50px_-24px_rgba(10, 10, 10,0.55)] bg-[#111111] ${offset}`}
    >
      <motion.img
        src={item.img}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ y: reduce ? 0 : imgY }}
        className="absolute inset-0 w-full h-[124%] -top-[12%] object-cover"
      />
      <motion.div style={{ opacity: reduce ? 0.6 : shade }} className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <h3 className="text-xl font-extrabold text-white font-editorial">{item.title}</h3>
          <p className="mt-1 text-xs text-white/80 font-medium leading-relaxed max-w-xs">{item.body}</p>
          <Link
            to={`/search?cat=${item.cat}`}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#E0E0E0] hover:text-white link-draw"
          >
            Browse {item.title} <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function CategoryShowcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
      {ITEMS.map((item, i) => (
        <Panel key={item.cat} item={item} index={i} />
      ))}
    </div>
  );
}
