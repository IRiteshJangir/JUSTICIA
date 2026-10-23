import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatsCounter = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, idx) => (
        <StatItem key={idx} stat={stat} index={idx} />
      ))}
    </div>
  );
};

const StatItem = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(stat.value, 10) || 0;
      if (start === end) return;
      
      const duration = 2000;
      const incrementTime = (duration / end);
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-serif font-bold text-gold mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-sm md:text-base text-gray-400 uppercase tracking-wider">
        {stat.label}
      </div>
    </motion.div>
  );
};

export default StatsCounter;
