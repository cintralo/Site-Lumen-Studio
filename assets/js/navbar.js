/* Fixed navbar: swaps between the transparent blend-mode state at the top
   of the page and a compact, blurred dark bar once the user scrolls. */
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("main-nav");
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add("bg-stone-900/80", "backdrop-blur-md", "py-4", "shadow-lg");
      nav.classList.remove("mix-blend-difference", "py-6");
    } else {
      nav.classList.remove("bg-stone-900/80", "backdrop-blur-md", "py-4", "shadow-lg");
      nav.classList.add("mix-blend-difference", "py-6");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
