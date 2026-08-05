/* global React */
const { useEffect: useEnhanceEffect } = React;

/* ============================================================
   ENHANCEMENTS — count-up stat numbers + pointer tilt.
   Mounted once; sets up IntersectionObservers / listeners
   against the live DOM so it works across re-renders.
   ============================================================ */

function runCountUps(root) {
  const els = (root || document).querySelectorAll(".countup:not([data-done])");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => { el.textContent = el.dataset.to; el.setAttribute("data-done", "1"); });
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      io.unobserve(el);
      el.setAttribute("data-done", "1");
      const to = parseFloat(el.dataset.to);
      const dec = (el.dataset.to.split(".")[1] || "").length;
      if (reduce) { el.textContent = el.dataset.to; return; }
      const dur = 1100 + Math.min(900, to * 4);
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = to * eased;
        el.textContent = dec ? v.toFixed(dec) : Math.round(v).toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = dec ? to.toFixed(dec) : to.toLocaleString();
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  els.forEach((el) => {
    if (!el.dataset.seed) { el.dataset.seed = el.textContent; }
    io.observe(el);
    /* Safety: observers get throttled in inactive/embedded iframes — never leave a stat at 0. */
    setTimeout(() => {
      if (el.hasAttribute("data-done")) return;
      io.unobserve(el);
      el.setAttribute("data-done", "1");
      el.textContent = parseFloat(el.dataset.to).toLocaleString();
    }, 2000);
  });
}

function setupTilt() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const MAX = 7;
  const onMove = (el, ev) => {
    const r = el.getBoundingClientRect();
    const px = (ev.clientX - r.left) / r.width - 0.5;
    const py = (ev.clientY - r.top) / r.height - 0.5;
    el.style.transform =
      "perspective(900px) rotateY(" + (px * MAX).toFixed(2) + "deg) rotateX(" +
      (-py * MAX).toFixed(2) + "deg) translateY(-6px)";
  };
  const reset = (el) => { el.style.transform = ""; };
  const bind = (el) => {
    if (el.__tilt) return;
    el.__tilt = true;
    el.style.transition = "transform .25s cubic-bezier(.2,.7,.2,1)";
    el.style.willChange = "transform";
    el.addEventListener("mousemove", (ev) => onMove(el, ev));
    el.addEventListener("mouseleave", () => reset(el));
  };
  document.querySelectorAll("[data-tilt]").forEach(bind);
}

function Enhance() {
  useEnhanceEffect(() => {
    const t1 = setTimeout(() => { runCountUps(); setupTilt(); }, 300);
    // re-scan after late content settles (custom elements, reveals)
    const t2 = setTimeout(() => { runCountUps(); setupTilt(); }, 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return null;
}

window.PoofEnhance = { Enhance };
