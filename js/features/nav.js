const sections = [
  "why",
  "what",
  "exponents",
  "expgraph",
  "crisis",
  "logdef",
  "constraints",
  "loggraph",
  "laws",
  "problems",
  "quiz",
];

export function initNav() {
  window.goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const updateNav = () => {
    let current = "why";
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 140) current = id;
    });

    document
      .querySelectorAll(".ns")
      .forEach((b, i) => b.classList.toggle("active", sections[i] === current));

    const pct =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;
    const fill = document.getElementById("progFill");
    if (fill) fill.style.width = `${Math.min(100, pct)}%`;
  };

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();
}

export function initReveal() {
  const ro = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in");
      }),
    { threshold: 0.08 }
  );
  document.querySelectorAll(".rv").forEach((el) => ro.observe(el));
}
