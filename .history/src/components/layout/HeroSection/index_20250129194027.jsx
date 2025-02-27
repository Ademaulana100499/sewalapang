import React from "react";
import { motion } from "framer-motion";

export const RevealLinks = () => {
  return (
    <section className="grid place-content-center gap-4 bg-green-400 px-8 py-16 text-black sm:px-2 sm:py-8 md:px-6 md:py-12 lg:px-8 lg:py-16">
      <FlipLink className="text-center text-lg sm:text-base md:text-xl lg:text-2xl">
        Tantang
      </FlipLink>
      <FlipLink className="text-center text-lg sm:text-base md:text-xl lg:text-2xl">
        Lawan
      </FlipLink>
      <FlipLink className="text-center text-lg sm:text-base md:text-xl lg:text-2xl">
        Tingkatkan
      </FlipLink>
      <FlipLink className="text-center text-lg sm:text-base md:text-xl lg:text-2xl">
        Kemampuan
      </FlipLink>
    </section>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-6xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl tracking-widest"
      style={{
        lineHeight: 1.2,
      }}>
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}>
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}>
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};
