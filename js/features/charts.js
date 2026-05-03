import { big, sub, sup } from "../utils.js";

const state = {
  egChart: null,
  lgChart: null,
  showEgB1: true,
  showEgB2: true,
  showLg1: true,
  showLg2: true,
  showLgE: true,
  showLgM: false,
};

export function updateMult(n) {
  document.getElementById("mVal").textContent = n;
  document.getElementById("painN").textContent = n;
  const show = Math.min(n, 18);
  let html = "";
  for (let i = 0; i < show; i += 1) html += `<div class="mb">${i === 0 ? "2" : "×2"}</div>`;
  if (n > 18) html += `<span style="font-size:12px;color:var(--mt);padding:4px 8px;align-self:center">...+${n - 18} more</span>`;
  document.getElementById("mBlocks").innerHTML = html;
  const val = Math.pow(2, n);
  document.getElementById("mResult").textContent = val > 1e15 ? `2${sup(n)}` : big(val);
  document.getElementById("mNote").textContent = val > 1e15 ? `(≈${val.toExponential(2)})` : `= 2${sup(n)}`;
  document.getElementById("mPain").style.display = n >= 8 ? "block" : "none";
}

export function updateLogEx() {
  const lBase = document.getElementById("lBase");
  const lPow = document.getElementById("lPow");
  const b = +lBase.value;
  const x = +lPow.value;
  document.getElementById("lBaseV").textContent = b;
  document.getElementById("lPowV").textContent = x;
  const n = Math.pow(b, x);
  const ns = n > 1e9 ? n.toExponential(2) : n.toLocaleString();
  document.getElementById("expForm").textContent = `${b}${sup(x)} = ${ns}`;
  document.getElementById("logForm").textContent = `log${sub(b)}(${ns}) = ${x}`;
  document.getElementById("readAloud").textContent = `"What power must I raise ${b} to, to get ${ns}? Answer: ${x}."`;
}

function ensureChartJs() {
  if (typeof Chart === "undefined") {
    console.error("Chart.js not loaded!");
    return false;
  }
  return true;
}

export function toggleEg(which) {
  if (which === "b1") state.showEgB1 = !state.showEgB1;
  else state.showEgB2 = !state.showEgB2;
  document.getElementById("togEg1").classList.toggle("on", state.showEgB1);
  document.getElementById("togEg2").classList.toggle("on2", state.showEgB2);
  buildEgGraph();
}

export function buildEgGraph() {
  if (!ensureChartJs()) return;
  const b = parseFloat(document.getElementById("egBase").value);
  const datasets = [];

  if (state.showEgB1) {
    const pts = [];
    for (let x = -4; x <= 5; x += 0.15) {
      const y = Math.pow(b, x);
      if (y < 50) pts.push({ x: +x.toFixed(2), y: +y.toFixed(4) });
    }
    datasets.push({ label: `${b.toFixed(1)}ˣ (a>1)`, data: pts, borderColor: "#7eb8f7", borderWidth: 2.5, pointRadius: 0, tension: 0.3, fill: false });
  }

  if (state.showEgB2) {
    const b2 = b > 1 ? 1 / b : b;
    const pts = [];
    for (let x = -4; x <= 5; x += 0.15) {
      const y = Math.pow(b2, x);
      if (y < 50) pts.push({ x: +x.toFixed(2), y: +y.toFixed(4) });
    }
    datasets.push({ label: `${b2.toFixed(2)}ˣ (0<a<1)`, data: pts, borderColor: "#7edfa0", borderWidth: 2.5, pointRadius: 0, tension: 0.3, fill: false });
  }

  if (!datasets || datasets.length === 0) return;
  const c = document.getElementById("egChart");
  if (state.egChart) state.egChart.destroy();
  state.egChart = new Chart(c, {
    type: "scatter",
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        x: { type: "linear", min: -4, max: 5, ticks: { color: "#666", maxTicksLimit: 7, font: { size: 11 } }, grid: { color: "rgba(255,255,255,0.05)" }, title: { display: true, text: "x", color: "#888" } },
        y: { min: 0, max: 12, ticks: { color: "#666", maxTicksLimit: 7, font: { size: 11 } }, grid: { color: "rgba(255,255,255,0.05)" }, title: { display: true, text: "y", color: "#888" } },
      },
    },
  });
}

export function toggleLg(which) {
  if (which === "log1") state.showLg1 = !state.showLg1;
  else if (which === "log2") state.showLg2 = !state.showLg2;
  else if (which === "exp") state.showLgE = !state.showLgE;
  else state.showLgM = !state.showLgM;
  document.getElementById("togLg1").classList.toggle("on", state.showLg1);
  document.getElementById("togLg2").classList.toggle("on2", state.showLg2);
  document.getElementById("togLgE").classList.toggle("on3", state.showLgE);
  document.getElementById("togLgM").classList.toggle("on", state.showLgM);
  buildLgGraph();
}

export function buildLgGraph() {
  if (!ensureChartJs()) return;
  const b = parseFloat(document.getElementById("lgBase").value);
  const lB = Math.log(b);
  const datasets = [];
  if (state.showLg1) {
    const pts = [];
    for (let x = 0.04; x <= 12; x += 0.12) pts.push({ x: +x.toFixed(3), y: +(Math.log(x) / lB).toFixed(4) });
    datasets.push({ label: "log₂(x)", data: pts, borderColor: "#7eb8f7", borderWidth: 2.5, pointRadius: 0, tension: 0.3, fill: false });
  }
  if (state.showLg2) {
    const lB2 = Math.log(0.5);
    const pts = [];
    for (let x = 0.04; x <= 12; x += 0.12) pts.push({ x: +x.toFixed(3), y: +(Math.log(x) / lB2).toFixed(4) });
    datasets.push({ label: "log₀.₅(x)", data: pts, borderColor: "#7edfa0", borderWidth: 2.5, pointRadius: 0, tension: 0.3, fill: false, borderDash: [4, 3] });
  }
  if (state.showLgE) {
    const pts = [];
    for (let x = -3; x <= 5; x += 0.12) {
      const y = Math.pow(b, x);
      if (y <= 12) pts.push({ x: +x.toFixed(2), y: +y.toFixed(4) });
    }
    datasets.push({ label: `${b.toFixed(1)}ˣ`, data: pts, borderColor: "#c8a96e", borderWidth: 1.5, pointRadius: 0, tension: 0.3, fill: false, borderDash: [5, 4] });
  }
  if (state.showLgM) datasets.push({ label: "y=x", data: [{ x: -3, y: -3 }, { x: 12, y: 12 }], borderColor: "rgba(255,255,255,0.15)", borderWidth: 1.5, pointRadius: 0, fill: false, borderDash: [3, 5] });

  if (!datasets || datasets.length === 0) return;
  const c = document.getElementById("lgChart");
  if (state.lgChart) state.lgChart.destroy();
  state.lgChart = new Chart(c, {
    type: "scatter",
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        x: { type: "linear", min: -3, max: 12, ticks: { color: "#666", maxTicksLimit: 8, font: { size: 11 } }, grid: { color: "rgba(255,255,255,0.05)" }, title: { display: true, text: "x", color: "#888" } },
        y: { min: -4, max: 8, ticks: { color: "#666", maxTicksLimit: 8, font: { size: 11 } }, grid: { color: "rgba(255,255,255,0.05)" }, title: { display: true, text: "y", color: "#888" } },
      },
    },
  });
}

export function initChartEvents() {
  const mSlider = document.getElementById("mSlider");
  const egBase = document.getElementById("egBase");
  const lgBase = document.getElementById("lgBase");
  const lBase = document.getElementById("lBase");
  const lPow = document.getElementById("lPow");

  mSlider?.addEventListener("input", () => updateMult(+mSlider.value));
  lBase?.addEventListener("input", updateLogEx);
  lPow?.addEventListener("input", updateLogEx);
  egBase?.addEventListener("input", () => {
    document.getElementById("egBaseVal").textContent = parseFloat(egBase.value).toFixed(1);
    buildEgGraph();
  });
  lgBase?.addEventListener("input", () => {
    document.getElementById("lgBaseVal").textContent = parseFloat(lgBase.value).toFixed(1);
    buildLgGraph();
  });

  window.toggleEg = toggleEg;
  window.toggleLg = toggleLg;
}

export function postRenderResize() {
  setTimeout(() => {
    if (state.egChart) state.egChart.resize();
    if (state.lgChart) state.lgChart.resize();
  }, 200);
}
