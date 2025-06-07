import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import Particle from '../components/heromodels/Particle'; // Adjust path if needed

gsap.registerPlugin(ScrollTrigger);

const Showcasesec = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);
  const project4Ref = useRef(null);

  useEffect(() => {
    // Fade in the whole section on mount
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2.5 }
    );

    // Animate each project card: slide up and fade in on scroll
    const projects = [project1Ref.current, project2Ref.current, project3Ref.current, project4Ref.current];

    projects.forEach((project, index) => {
      if (project) {
        gsap.fromTo(
          project,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3 * (index + 1),
            scrollTrigger: {
              trigger: project,
              start: 'top bottom-=100',
              // markers: true, // Uncomment to debug scroll triggers
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const cardClasses =
    "bg-gray-900 p-6 rounded-md shadow-lg flex flex-col items-center text-center text-white h-[420px] transition-all duration-300 hover:shadow-[0_0_20px_4px_rgba(59,130,246,0.6)] hover:scale-105";

  const buttonClasses =
    "mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition transform hover:scale-110 hover:shadow-[0_0_12px_3px_rgba(255,255,255,0.8)]";

  return (
    <section
      id="work"
      ref={sectionRef}
      className="app-showcase px-4 py-10 max-w-7xl mx-auto relative"
      style={{ position: 'relative' }}
    >
      {/* Particle Canvas Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none', // so it doesn't block UI interactions
          zIndex: 0,
        }}
      >
        <Canvas camera={{ position: [0, 5, 15], fov: 75 }}>
          <Particle count={200} />
        </Canvas>
      </div>

      {/* Content above the particles */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side */}
          <div className="flex flex-col gap-8 lg:w-1/2">
            {/* Project 2 */}
            <div ref={project2Ref} className={cardClasses}>
              <div className="image-wrapper h-[240px] w-full flex items-center justify-center overflow-hidden rounded-md mb-4 bg-[#1f1f1f]">
                <img
                  src="/images/sabachi.png"
                  alt="Sabachi shopping project"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <h2 className="text-lg font-semibold mb-2">
                Sabachi - your ultimate shopping destination
              </h2>
              <a
                href="https://github.com/saumya1317/django-project"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses}
              >
                Live
              </a>
            </div>

            {/* Project 3 */}
            <div ref={project3Ref} className={cardClasses}>
              <div className="image-wrapper h-[240px] w-full flex items-center justify-center overflow-hidden rounded-md mb-4 bg-[#1f1f1f]">
                <img
                  src="/images/rt.png"
                  alt="Travel destination helper"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <h2 className="text-lg font-semibold mb-2">
                RT - find your travel destination
              </h2>
              <a
                href="https://stunning-gingersnap-cc3c42.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses}
              >
                Live
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col gap-8 lg:w-1/2">
            {/* Project 1 */}
            <div ref={project1Ref} className={cardClasses}>
              <div className="image-wrapper h-[240px] w-full flex items-center justify-center overflow-hidden rounded-md mb-4 bg-[#1f1f1f]">
                <img
                  src="/images/personal.png"
                  alt="AI Interview Simulator"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <h2 className="text-2xl font-bold mb-3">
                Interview made easy with ai-coach
              </h2>
              <p className="mb-4 text-white/80">
                Built an AI-driven interview simulator using Next.js, Gemini, and Clerk.
              </p>
              <a
                href="https://mock-vanguard.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium transition transform hover:scale-110 hover:shadow-[0_0_12px_3px_rgba(255,255,255,0.8)]"
              >
                Live
              </a>
            </div>

            {/* Project 4 */}
            <div ref={project4Ref} className={cardClasses}>
              <div className="image-wrapper h-[240px] w-full flex items-center justify-center overflow-hidden rounded-md mb-4 bg-[#1f1f1f]">
                <img
                  src="/images/llm.png"
                  alt="DocumentQuery LLM"
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <h2 className="text-lg font-semibold mb-2">
                DocumentQuery - LLM for document answering
              </h2>
              <p className="mb-4 text-white/80">
                A fine-tuned DeepSeek-based LLM using Ollama to answer document queries.
              </p>
              <a
                href="https://github.com/saumya1317/rag_kids"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses}
              >
                Live
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcasesec;
