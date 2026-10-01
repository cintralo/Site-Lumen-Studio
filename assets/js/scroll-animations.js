/* GSAP + ScrollTrigger scroll animations for the whole page:
   hero reveal & parallax, section fade-ups, feature/project/service/stat
   staggers, process timeline, infinite marquee, number counters,
   editorial parallax, manifesto ink-in and the pinned horizontal gallery. */
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  /* Hero */
  gsap.to("#hero-bg", { scale: 1, duration: 2, ease: "power2.out" });
  gsap.to(".masked-word", { y: "0%", duration: 1.2, stagger: 0.08, ease: "power4.out", delay: 0.2 });
  gsap.to(".fade-in-up", { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.8 });
  gsap.to("#hero-bg", {
    yPercent: 8, ease: "none",
    scrollTrigger: { trigger: "header", start: "top top", end: "bottom top", scrub: true }
  });
  gsap.to("#hero-content", {
    yPercent: -15, opacity: 0.25, ease: "none",
    scrollTrigger: { trigger: "header", start: "top top", end: "bottom top", scrub: true }
  });

  /* General section fade ups */
  gsap.utils.toArray(".section-fade-up").forEach(section => {
    gsap.fromTo(section,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 85%" } }
    );
  });

  /* Philosophy features */
  gsap.fromTo(".feature-item",
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: ".feature-item", start: "top 80%" } }
  );

  /* Project cards */
  gsap.fromTo(".project-card",
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".project-card", start: "top 85%" } }
  );

  /* Process timeline */
  let tl = gsap.timeline({ scrollTrigger: { trigger: ".process-step", start: "top 75%" } });
  tl.fromTo(".process-step",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" }
  );
  gsap.utils.toArray(".process-line").forEach((line, i) => {
    gsap.to(line, {
      width: "100%", duration: 1, ease: "power1.inOut", delay: i * 0.2,
      scrollTrigger: { trigger: ".process-step", start: "top 75%" }
    });
  });

  /* Infinite marquee */
  gsap.to(".marquee-track", { xPercent: -50, repeat: -1, duration: 35, ease: "none" });

  /* Services rows: staggered slide + clip reveal */
  gsap.utils.toArray(".service-row").forEach((row, i) => {
    gsap.fromTo(row,
      { x: -50, opacity: 0, clipPath: "inset(0 100% 0 0)" },
      {
        x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.out", delay: i * 0.12,
        scrollTrigger: { trigger: "#services-list", start: "top 75%" }
      }
    );
  });

  /* Stats: fade up + count numbers */
  gsap.utils.toArray(".stat-item").forEach((item, i) => {
    gsap.fromTo(item,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: i * 0.15, scrollTrigger: { trigger: "#stats-section", start: "top 80%" } }
    );
  });
  gsap.utils.toArray(".stat-num").forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    gsap.fromTo(el, { innerText: 0 }, {
      innerText: target, duration: 2, snap: { innerText: 1 }, ease: "power1.out",
      scrollTrigger: { trigger: "#stats-section", start: "top 80%" }
    });
  });

  /* Parallax editorial image */
  gsap.to(".parallax-img", {
    yPercent: 15, ease: "none",
    scrollTrigger: { trigger: ".parallax-section", start: "top bottom", end: "bottom top", scrub: true }
  });

  /* Manifesto: words ink-in as you scroll */
  gsap.fromTo(".manifesto-word", { opacity: 0.12 }, {
    opacity: 1, stagger: 0.5, ease: "none",
    scrollTrigger: { trigger: "#manifesto-section", start: "top 75%", end: "bottom 85%", scrub: true }
  });
  gsap.utils.toArray(".manifesto-pic").forEach((pic, i) => {
    gsap.fromTo(pic, { scale: 0.5, rotate: i % 2 ? 10 : -10 }, {
      scale: 1, rotate: 0, ease: "none",
      scrollTrigger: { trigger: "#manifesto-section", start: "top 75%", end: "bottom 85%", scrub: true }
    });
  });

  /* Horizontal pinned gallery */
  const track = document.getElementById("horizontal-track");
  if (track) {
    const getScroll = () => track.scrollWidth - window.innerWidth;
    const ht = gsap.to(track, {
      x: () => -getScroll(), ease: "none",
      scrollTrigger: {
        trigger: "#horizontal-section", start: "top top",
        end: () => "+=" + getScroll(), scrub: 1, pin: true,
        anticipatePin: 1, invalidateOnRefresh: true
      }
    });
    gsap.utils.toArray(".h-panel-img").forEach(img => {
      gsap.fromTo(img, { xPercent: -10 }, {
        xPercent: 0, ease: "none",
        scrollTrigger: { trigger: img, containerAnimation: ht, start: "left right", end: "right left", scrub: true }
      });
    });
    gsap.to("#h-progress", {
      scaleX: 1, ease: "none",
      scrollTrigger: { trigger: "#horizontal-section", start: "top top", end: () => "+=" + getScroll(), scrub: true }
    });
  }
});
