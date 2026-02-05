import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
}

interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: NavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

export function PillNav({
  logo = '/brand/edt-logo-nobg.png',
  logoAlt = 'EDT Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = 'hsl(var(--foreground))',
  pillColor = 'hsl(var(--surface-2))',
  hoveredPillTextColor = 'hsl(var(--background))',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true
}: PillNavProps) {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tlRefs = useRef<gsap.core.Timeline[]>([]);
  const activeTweenRefs = useRef<gsap.core.Tween[]>([]);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;
        
        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;
        
        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;
        
        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });
        
        const label = pill.querySelector('.pill-label') as HTMLElement;
        const hoverLabel = pill.querySelector('.pill-label-hover') as HTMLElement;
        
        if (label) gsap.set(label, { y: 0 });
        if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });
        
        tlRefs.current[index]?.kill();
        
        const tl = gsap.timeline({ paused: true });
        
        tl.to(circle, {
          scale: 1.2,
          xPercent: -50,
          duration: 0.5,
          ease,
          overwrite: 'auto'
        }, 0);
        
        if (label) {
          tl.to(label, {
            y: -(h + 8),
            duration: 0.5,
            ease,
            overwrite: 'auto'
          }, 0);
        }
        
        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hoverLabel, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease,
            overwrite: 'auto'
          }, 0);
        }
        
        tlRefs.current[index] = tl;
      });
    };
    
    layout();
    
    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    
    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }
    
    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1 });
    }
    
    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItems = navItemsRef.current;
      
      if (logoEl) {
        gsap.set(logoEl, { scale: 0 });
        gsap.to(logoEl, {
          scale: 1,
          duration: 0.6,
          ease
        });
      }
      
      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease,
          delay: 0.2
        });
      }
    }
    
    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);
  
  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };
  
  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };
  
  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.5,
      ease,
      overwrite: 'auto'
    });
  };
  
  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    
    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;
    
    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }
    
    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }
    
    onMobileMenuClick?.();
  };
  
  const isActive = (href: string) => {
    return location.pathname === href;
  };
  
  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text': resolvedPillTextColor
  } as React.CSSProperties;
  
  return (
    <nav
      className={cn('pill-nav-container', className)}
      style={cssVars}
    >
      <div className="pill-nav">
        {/* Logo */}
        <Link
          to="/"
          ref={logoRef}
          className="pill-logo magnetic"
          onMouseEnter={handleLogoEnter}
        >
          <img
            ref={logoImgRef}
            src={logo}
            alt={logoAlt}
            className="h-full w-full object-contain"
          />
        </Link>
        
        {/* Desktop Nav Items */}
        <div ref={navItemsRef} className="pill-nav-items desktop-only">
          <ul className="pill-list">
            {items.map((item, i) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn('pill magnetic', isActive(item.href) && 'is-active')}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <div
                    ref={el => { circleRefs.current[i] = el; }}
                    className="hover-circle"
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover">{item.label}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          ref={hamburgerRef}
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div ref={mobileMenuRef} className="mobile-menu-popover">
        <ul className="mobile-menu-list">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn('mobile-menu-link', isActive(item.href) && 'is-active')}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default PillNav;