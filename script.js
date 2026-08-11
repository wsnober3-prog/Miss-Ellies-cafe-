(() => {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  /* MOBILE MENU */
  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";

      toggle.setAttribute("aria-expanded", String(!expanded));
      mobileNav.setAttribute("aria-hidden", String(expanded));

      mobileNav.style.display = expanded ? "none" : "block";

      if (!expanded) {
        mobileNav.animate(
          [
            {
              transform: "translateY(-10px)",
              opacity: 0
            },
            {
              transform: "translateY(0)",
              opacity: 1
            }
          ],
          {
            duration: 250,
            easing: "ease-out"
          }
        );
      }
    });
  }

  /* CLOSE MOBILE MENU AFTER CLICKING LINK */
  document.querySelectorAll("[data-scroll]").forEach(link => {
    link.addEventListener("click", () => {
      if (
        toggle &&
        mobileNav &&
        toggle.getAttribute("aria-expanded") === "true"
      ) {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("aria-hidden", "true");
        mobileNav.style.display = "none";
      }
    });
  });

  /* NAVBAR EFFECT WHEN SCROLLING */
  function updateHeader() {
    if (!header) return;

    if (window.scrollY > 25) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();

  /* SCROLL REVEAL ANIMATIONS */
  const revealElements = document.querySelectorAll(
    ".section, .card, .special-card, .masonry figure, .why-card, .review-card"
  );

  revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition =
      "opacity 0.65s ease, transform 0.65s ease";
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    observer.observe(element);
  });

  /* HERO IMAGE PARALLAX */
  const heroImage = document.querySelector(".hero-media img");

  if (heroImage) {
    window.addEventListener(
      "scroll",
      () => {
        const rect = heroImage.getBoundingClientRect();
        const screenHeight = window.innerHeight;

        if (rect.top < screenHeight && rect.bottom > 0) {
          const movement = window.scrollY * 0.015;

          heroImage.style.transform =
            `translateY(${movement}px) scale(1.02)`;
        }
      },
      {
        passive: true
      }
    );
  }

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

})();
