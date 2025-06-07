import React from "react";
import { words } from "../constants/index.js";
import Button from "../components/Button.jsx";
import Heroexperience from "../components/heromodels/HeroExperience.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedCounter from "../components/AnimatedCounter.jsx";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene  from "../components/heromodels/Scene.jsx"
const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.5,
        ease: "power2.inOut",
      }
    );
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <img
          src="/images/bg.png"
          alt="background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 hero-layout">
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
             <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
  Building Real Solutions
</h1>
<h1 className="text-4xl md:text-6xl font-bold leading-tight" style={{ color: '#7E5A9B' }}>
  From Full-Stack to AI
</h1>


              {/* Sliding Words Section */}
              <div className="mt-6">
                <span className="text-xl md:text-2xl font-light text-gray-300">
                  Shaping&nbsp;
                </span>
                <span className="slide inline-block overflow-hidden h-12 align-middle">
                  <span className="wrapper block animate-slideUp">
                    {words.map((word, index) => (
                      <span
                        key={`${word.text}-${index}`}
                        className="flex items-center md:gap-3 gap-2 mb-3"
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className="w-8 h-8 bg-white p-1 rounded-full"
                        />
                        <span className="text-white text-lg">{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>

                {/* Description */}
                <p className="text-white/50 md:text-xl relative z-10 pointer-events-none mt-4">
                  Hi, I'm Saumya — a second-year student at IIIT building full-stack and AI projects.
                </p>

                
              </div>
            </div>
          </div>
        </header>

        {/* Right 3D model */}
        <figure>
          <div className="hero-3d-layout">
         <Heroexperience/>
          </div>
        </figure>
      </div>
      <AnimatedCounter />
    </section>
  );
};

export default Hero;
