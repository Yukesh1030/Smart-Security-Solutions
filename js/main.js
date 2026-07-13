document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle via Event Delegation (Foolproof)
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('.mobile-menu-toggle');
    if (toggle) {
      const header = document.querySelector('header');
      if (header) header.classList.toggle('nav-open');
    }
  });

  // Navbar transition logic removed per request.

  // GSAP ScrollTrigger Animations with Mobile Responsiveness
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop Animations (min-width: 768px)
    mm.add("(min-width: 768px)", () => {
      // Non-staggered fade up elements
      gsap.utils.toArray('.animate-fade-up:not(.stagger-child)').forEach(el => {
        gsap.fromTo(el, 
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Staggered parent animations
      gsap.utils.toArray('.stagger-parent').forEach(parent => {
        const children = parent.querySelectorAll('.stagger-child');
        if (children.length > 0) {
          gsap.fromTo(children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: parent,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });
    });

    // Mobile Animations (max-width: 767px)
    mm.add("(max-width: 767px)", () => {
      // Non-staggered fade up elements
      gsap.utils.toArray('.animate-fade-up:not(.stagger-child)').forEach(el => {
        gsap.fromTo(el, 
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Staggered parent animations
      gsap.utils.toArray('.stagger-parent').forEach(parent => {
        const children = parent.querySelectorAll('.stagger-child');
        if (children.length > 0) {
          gsap.fromTo(children,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: parent,
                start: "top 90%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });
    });

    // Counter animation with ScrollTrigger
    gsap.utils.toArray('.counter-val').forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: counter,
          start: "top 90%",
          toggleActions: "play none none none"
        },
        onUpdate: () => {
          counter.innerText = Math.ceil(obj.val).toLocaleString();
        }
      });
    });
  } else {
    // Fallback: If GSAP or ScrollTrigger failed to load, ensure all content is visible
    document.querySelectorAll('.animate-fade-up, .stagger-child').forEach(el => {
      el.style.opacity = '1';
    });
  }

  // Form Validation Utility
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

      inputs.forEach(input => {
        const errorMsg = input.nextElementSibling;
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'red';
          if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.style.display = 'block';
          }
        } else {
          input.style.borderColor = 'rgba(0,0,0,0.1)';
          if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.style.display = 'none';
          }
        }
      });

      if (isValid) {
        if (form.id === 'loginForm') {
          alert('Action successful! (Static UI Demo)');
          form.reset();
        } else {
          window.location.href = '404.html';
        }
      }
    });
  });

  // Jello Stretchy Variable Font Animation
  const heroTitle = document.querySelector('.hero h1, main > section:first-of-type h1');
  if (heroTitle && typeof gsap !== 'undefined') {
    // A robust function to wrap characters in inline-block spans
    const splitText = (el, spanClass) => {
      const text = el.innerHTML.trim();
      let result = '';
      let inTag = false;
      
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === '<') {
          inTag = true;
          result += char;
        } else if (char === '>') {
          inTag = false;
          result += char;
        } else if (inTag) {
          result += char;
        } else {
          if (char === ' ' || char === '\n' || char === '\r') {
            result += ' ';
          } else {
            result += `<span class="${spanClass}" style="display: inline-block; transform-origin: bottom center; will-change: font-variation-settings, transform; font-variation-settings: 'wght' 400;">${char}</span>`;
          }
        }
      }
      el.innerHTML = result;
    };

    // Hide title initially to prevent flash of unstyled content
    gsap.set(heroTitle, { opacity: 0 });
    splitText(heroTitle, 'jello-char');
    gsap.set(heroTitle, { opacity: 1 });

    // Initial stagger entrance animation
    gsap.fromTo('.jello-char', 
      {
        opacity: 0,
        y: 40,
        scaleX: 0.4,
        scaleY: 1.6,
        fontVariationSettings: '"wght" 100'
      },
      {
        opacity: 1,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        fontVariationSettings: '"wght" 700',
        duration: 1.4,
        stagger: {
          each: 0.04,
          from: "start"
        },
        ease: "elastic.out(1.1, 0.4)",
        delay: 0.3
      }
    );

    // Interactive Hover Effect
    document.querySelectorAll('.jello-char').forEach(char => {
      char.addEventListener('mouseenter', () => {
        // Stop any current animation on this specific character
        gsap.killTweensOf(char);
        
        // Stretchy Jello timeline
        gsap.timeline()
          .to(char, {
            opacity: 1, // FIX: Ensure opacity is restored to 1 if hover interrupts stagger
            scaleX: 1.5,
            scaleY: 0.5,
            fontVariationSettings: '"wght" 700',
            duration: 0.15,
            ease: "power2.out"
          })
          .to(char, {
            scaleX: 0.8,
            scaleY: 1.25,
            fontVariationSettings: '"wght" 200',
            duration: 0.15,
            ease: "power2.inOut"
          })
          .to(char, {
            scaleX: 1.1,
            scaleY: 0.9,
            fontVariationSettings: '"wght" 600',
            duration: 0.15,
            ease: "power2.inOut"
          })
          .to(char, {
            scaleX: 1,
            scaleY: 1,
            fontVariationSettings: '"wght" 400',
            duration: 0.6,
            ease: "elastic.out(1.2, 0.4)"
          });
      });
    });

    // Paragraph Animation: Split and animate like GSAP starter template
    const heroParagraphs = document.querySelectorAll('.hero-content p, main > section:first-of-type p');
    heroParagraphs.forEach(p => {
      gsap.set(p, { opacity: 0 });
      splitText(p, 'p-char');
      gsap.set(p, { opacity: 1 });
      
      const pChars = p.querySelectorAll('.p-char');
      gsap.from(pChars, {
        x: 20,
        yPercent: -50,
        opacity: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.7
      });
    });
  }
});
