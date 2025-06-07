import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Titleheader from '../components/Titleheader';
import { expCards } from '../constants';
import Glowcard from '../components/Glowcard';
import Particles from '../components/heromodels/Particle';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const Experiencesection = () => {
  const sectionRef = useRef(null);
  const isScrollingRef = useRef(true);
  const scrollTimeout = useRef(null);

  useGSAP(() => {
    // Animate GSAP timelines (unchanged)
    gsap.utils.toArray('.timeline-card').forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: 'left left',
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
        },
      });
    });

    gsap.utils.toArray('.exp-card-wrapper').forEach((wrapper) => {
      gsap.from(wrapper, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 85%',
        },
      });
    });

    gsap.to('.timeline', {
      transformOrigin: 'bottom bottom',
      scaleY: 0,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top center',
        end: '70% center',
        scrub: true,
      },
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        isScrollingRef.current = true;
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 200);
      } else {
        isScrollingRef.current = true; // always animate outside
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <section
      id="experience"
      className="relative w-full md:mt-40 mt-20 section-padding xl:px-0"
      ref={sectionRef}
    >
      {/* Particles Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas>
          <Particles count={300} isScrollingRef={isScrollingRef} />
        </Canvas>
      </div>

      {/* Content Layer */}
      <div className="w-full h-full md:px-20 px-5 relative z-10">
        <Titleheader title="Projects made 💼" sub="some of my projects made till now 😓" />
        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card, index) => (
              <div key={card.title} className="exp-card-wrapper">
                <div className="xl:w-2/6">
                  <Glowcard card={card} index={index} />
                </div>
                <div className="xl:w-4/6">
                  <div className="flex items-start">
                    <div className="timeline-wrapper">
                      <div className="timeline" />
                      <div className="gradient-line w-1 h-full" />
                    </div>
                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                      <div className="timeline-logo">
                        <img src={card.logoPath} alt="logo" />
                      </div>
                      <div>
                        <h1 className="font-semibold text-3xl">{card.title}</h1>
                        <p className="my-5 text-white-50">{card.date}</p>
                        <p className="text-[#839cb5] italic">Responsibilities</p>
                        <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                          {card.responsibilities.map((responsibility) => (
                            <li key={responsibility} className="text-lg">
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiencesection;
