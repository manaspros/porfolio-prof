import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./PointerHighlight.css";

// Utility function for combining class names
const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
}) {
  const containerRef = useRef(null);
  const pointerRef = useRef(null);
  const rectangleRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      // Kill previous animation if it exists
      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Create new timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%", // Start animation when element is 75% into viewport
          toggleActions: "play none none reset", // Play animation when scrolled to, reset when scrolled away
        },
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          // Pulse animation for the rectangle after drawing is complete
          gsap.to(rectangleRef.current, {
            boxShadow: "0 0 10px rgba(98, 60, 234, 0.5)",
            duration: 1,
            repeat: -1,
            yoyo: true,
          });
        },
      });

      // Set initial states
      tl.set(rectangleRef.current, {
        width: 0,
        height: dimensions.height,
        opacity: 1,
      });

      tl.set(pointerRef.current, {
        x: 0,
        y: dimensions.height / 2,
        opacity: 0,
        rotate: -90,
      });

      // Animate the rectangle drawing with a bounce effect at the end
      tl.to(rectangleRef.current, {
        width: dimensions.width,
        duration: 1.2,
        ease: "power2.out",
      });

      // Add a slight "breathe" effect to the rectangle 
      tl.to(rectangleRef.current, {
        scaleX: 1.1, 
        scaleY: 1.14,
        duration: 0.3,
        ease: "power1.out",
      }, "-=0.2");
      
      tl.to(rectangleRef.current, {
        scaleX: 1.09,
        scaleY: 1.12,
        duration: 0.2,
      });

      // Animate the pointer with a slight bounce
      tl.to(
        pointerRef.current,
        {
          x: dimensions.width + 8,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

      // Store the animation reference for cleanup
      animationRef.current = tl;

      return () => {
        if (animationRef.current) {
          animationRef.current.kill();
        }
      };
    }
  }, [dimensions]);

  return (
    <>
    <span
      className={classNames("pointer-highlight-container", containerClassName)}
      ref={containerRef}
    >
      {children}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <div className="pointer-highlight-animation">
          <div
            ref={rectangleRef}
            className={classNames("pointer-highlight-rectangle", rectangleClassName)}
          ></div>
          <div ref={pointerRef} className="pointer-highlight-pointer">
            <svg
              className={classNames("pointer-svg", pointerClassName)}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
            </svg>
          </div>
        </div>
      )}
    </span>
    </>
  );
}
