import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export const useAos = (dependencies = []) => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      offset: 80,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }, []);

  useEffect(() => {
    if (dependencies.length > 0) {
      requestAnimationFrame(() => {
        AOS.refreshHard();
      });
    }
  }, dependencies);
};
