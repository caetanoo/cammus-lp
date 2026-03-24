
        // ✅ CORREÇÃO: Scroll animations com IntersectionObserver adicionado
        const revealEls = document.querySelectorAll('.animate-fade-in-up');
        if (revealEls.length > 0) {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                revealEls.forEach(el => el.classList.add('is-visible'));
            } else {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                        }
                    });
                }, { threshold: 0.1 });
                revealEls.forEach(el => observer.observe(el));
            }
        }
