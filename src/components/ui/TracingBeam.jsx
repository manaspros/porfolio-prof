import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./TracingBeam.css";

// Utility function to combine class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

export const TracingBeam = ({ children, className }) => {
  const ref = useRef(null);
  const gradientRef = useRef(null);
  const pathRef = useRef(null);
  const contentRef = useRef(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      // Set initial height
      const updateHeight = () => {
        const height = contentRef.current.offsetHeight;
        setSvgHeight(height > 0 ? height : 1000); // Fallback height if calculation fails
        console.log("TracingBeam height set to:", height);
      };
      
      updateHeight();
      
      // Update height on resize
      const handleResize = () => {
        updateHeight();
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (!svgHeight || svgHeight < 100) return;

    console.log("Initializing TracingBeam animation with height:", svgHeight);

    // Make sure ScrollTrigger is registered
    gsap.registerPlugin(ScrollTrigger);
    
    // Clear any existing animations
    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.id === 'tracingBeam') st.kill();
    });

    // Create animation for the gradient stops
    const firstStop = gsap.to(gradientRef.current.children[0], {
      id: 'tracingBeam1',
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.8, // Slower animation
      },
      attr: { offset: 0.2 },
      ease: "none",
      duration: 1
    });

    const secondStop = gsap.to(gradientRef.current.children[1], {
      id: 'tracingBeam2',
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.8, // Slower animation
      },
      attr: { offset: 0.6 },
      ease: "none",
      duration: 1
    });

    const thirdStop = gsap.to(gradientRef.current.children[2], {
      id: 'tracingBeam3',
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.8, // Slower animation
      },
      attr: { offset: 0.9 },
      ease: "none",
      duration: 1
    });

    // Path animation (slower)
    const pathAnimation = gsap.to(pathRef.current, {
      id: 'tracingBeamPath',
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1.8, // Slower animation
      },
      strokeDashoffset: 0,
      ease: "power1.inOut", // Smoother ease
      duration: 1
    });

    return () => {
      firstStop.kill();
      secondStop.kill();
      thirdStop.kill();
      pathAnimation.kill();
    };
  }, [svgHeight]);

  return (
    <div
      ref={ref}
      className={cn("tracing-beam", className)}
    >
      <div className="beam-container">
        {/* Removed the dot container completely */}
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="beam-svg"
          aria-hidden="true"
        >
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            strokeWidth="2"
          ></path>
          <path
            ref={pathRef}
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3.5"
            className="beam-path-highlight"
            strokeDasharray={svgHeight * 2}
            strokeDashoffset={svgHeight * 2}
          ></path>
          <defs>
            <linearGradient
              ref={gradientRef}
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1="0"
              y2={svgHeight}
            >
              <stop stopColor="#623CEA" stopOpacity="0.2" offset="0.0"></stop>
              <stop stopColor="#623CEA" stopOpacity="1" offset="0.2"></stop>
              <stop stopColor="#FF7D54" stopOpacity="1" offset="0.5"></stop>
              <stop stopColor="#FF7D54" stopOpacity="0.2" offset="0.8"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef} className="tracing-content">
        {children}
      </div>
    </div>
  );
};
