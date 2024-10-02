import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (elementId) => {
  useEffect(() => {
    gsap.fromTo(
      elementId,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: elementId,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [elementId]);
};
