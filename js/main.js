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

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        
        if (el.classList.contains('stagger-parent')) {
          const children = el.querySelectorAll('.stagger-child');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
              child.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            }, index * 100);
          });
        } else {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
        }

        // Counter values animations
        const counters = el.querySelectorAll('.counter-val');
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const duration = 2000; // 2 seconds
          const interval = 16; // 60 fps
          const step = (target / (duration / interval));
          
          const updateCount = () => {
            count += step;
            if (count < target) {
              counter.innerText = Math.ceil(count).toLocaleString();
              setTimeout(updateCount, interval);
            } else {
              counter.innerText = target.toLocaleString();
            }
          };
          updateCount();
        });

        observer.unobserve(el);
      }
    });
  }, observerOptions);

  // Initialize animated elements styles
  document.querySelectorAll('.animate-fade-up, .stagger-parent').forEach(el => {
    if (!el.classList.contains('stagger-parent')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(35px)';
      el.style.willChange = 'opacity, transform';
    } else {
      el.querySelectorAll('.stagger-child').forEach(child => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(25px)';
        child.style.willChange = 'opacity, transform';
      });
    }
    animationObserver.observe(el);
  });

  // Form Validation Utility
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

      inputs.forEach(input => {
        // Find or create error message container
        let errorMsg = input.parentNode.querySelector('.error-message');
        if (!errorMsg) {
          errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          errorMsg.style.color = '#007AFF'; // mapped accent color
          errorMsg.style.fontSize = '0.8rem';
          errorMsg.style.marginTop = '0.4rem';
          errorMsg.style.display = 'none';
          input.parentNode.appendChild(errorMsg);
        }

        const value = input.value.trim();
        let inputError = false;
        let errorText = '';

        if (!value) {
          inputError = true;
          errorText = 'This field is required.';
        } else if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            inputError = true;
            errorText = 'Please enter a valid email address.';
          }
        }

        if (inputError) {
          isValid = false;
          input.style.borderColor = '#007AFF'; // accent color
          errorMsg.innerText = errorText;
          errorMsg.style.display = 'block';
        } else {
          input.style.borderColor = 'rgba(0, 122, 255, 0.15)';
          errorMsg.style.display = 'none';
        }
      });

      if (!isValid) {
        e.preventDefault();
      } else {
        // If valid and it's a redirect / submit behavior
        if (form.getAttribute('action') === null || form.getAttribute('action') === '') {
          e.preventDefault();
          alert('Submitting form successfully!');
          form.reset();
        }
      }
    });
  });

  // Interactive FAQ Accordion Listener
  document.addEventListener('click', (e) => {
    const faqQuestion = e.target.closest('.faq-question');
    if (faqQuestion) {
      const item = faqQuestion.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close other active FAQ items
      document.querySelectorAll('.faq-item').forEach(faqItem => {
        faqItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    }
  });

  // Jello Stretchy Variable Font Animation
  const heroTitle = document.querySelector('.hero h1, main > section:first-of-type h1');
  if (heroTitle && typeof gsap !== 'undefined') {
    // A robust function to wrap characters in inline-block spans
    const splitText = (el, spanClass) => {
      const htmlParts = el.innerHTML.trim().split(/(<[^>]+>)/g);
      let result = '';
      
      htmlParts.forEach(part => {
        if (part.startsWith('<')) {
          result += part;
        } else {
          const words = part.split(/(\s+)/);
          words.forEach(word => {
            if (/\s+/.test(word) || !word) {
              result += word;
            } else {
              result += `<span style="display: inline-block; white-space: nowrap;">`;
              for (let i = 0; i < word.length; i++) {
                const char = word[i];
                result += `<span class="${spanClass}" style="display: inline-block; transform-origin: bottom center; will-change: transform; font-variation-settings: 'wght' 400;">${char}</span>`;
              }
              result += `</span>`;
            }
          });
        }
      });
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
