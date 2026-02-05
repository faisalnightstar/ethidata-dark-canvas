import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface CursorTrackerProps {
  size?: number;
  magneticStrength?: number;
}

export function CursorTracker({ 
  size = 20,
  magneticStrength = 0.3
}: CursorTrackerProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    // Hide on mobile
    const isMobile = window.matchMedia('(hover: none)').matches;
    if (isMobile) {
      cursor.style.display = 'none';
      cursorDot.style.display = 'none';
      return;
    }
    
    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      
      if (!isVisible) {
        setIsVisible(true);
      }
      
      // Smooth follow for outer cursor
      gsap.to(cursor, {
        x: e.clientX - size / 2,
        y: e.clientY - size / 2,
        duration: 0.5,
        ease: 'power2.out'
      });
      
      // Faster follow for dot
      gsap.to(cursorDot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
        ease: 'power2.out'
      });
    };
    
    const onMouseEnterMagnetic = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      
      gsap.to(cursor, {
        scale: 2.5,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Magnetic effect on the element
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const onMouseMoveElement = (e: MouseEvent) => {
        const deltaX = (e.clientX - centerX) * magneticStrength;
        const deltaY = (e.clientY - centerY) * magneticStrength;
        
        gsap.to(target, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      
      target.addEventListener('mousemove', onMouseMoveElement as EventListener);
      
      target.addEventListener('mouseleave', () => {
        gsap.to(target, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
        target.removeEventListener('mousemove', onMouseMoveElement as EventListener);
      }, { once: true });
    };
    
    const onMouseLeaveMagnetic = () => {
      setIsHovering(false);
      
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    const onMouseEnterLink = () => {
      gsap.to(cursor, {
        scale: 1.5,
        borderColor: 'hsl(var(--primary))',
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    const onMouseLeaveLink = () => {
      gsap.to(cursor, {
        scale: 1,
        borderColor: 'hsl(var(--foreground) / 0.5)',
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    // Event listeners
    document.addEventListener('mousemove', onMouseMove);
    
    // Magnetic elements
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterMagnetic);
      el.addEventListener('mouseleave', onMouseLeaveMagnetic);
    });
    
    // Links and buttons
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });
    
    // MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      const newMagnetics = document.querySelectorAll('.magnetic');
      newMagnetics.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterMagnetic);
        el.addEventListener('mouseleave', onMouseLeaveMagnetic);
      });
      
      const newInteractives = document.querySelectorAll('a, button, [role="button"]');
      newInteractives.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      
      magneticElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterMagnetic);
        el.removeEventListener('mouseleave', onMouseLeaveMagnetic);
      });
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, [size, magneticStrength, isVisible]);
  
  // Hide on mobile
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
  if (isMobile) return null;
  
  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-difference"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: '1px solid hsl(var(--foreground) / 0.5)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'hsl(var(--primary))',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
    </>
  );
}

export default CursorTracker;