import { laws } from "../data/laws.js";
import { fmt } from "../utils.js";

export function buildLaws() {
  const c = document.getElementById("lawsList");
  if (!c) return;

  c.innerHTML = laws
    .map(
      (l) => `
    <div class="lawcard" id="lw${l.num}" onclick="this.classList.toggle('open')">
      <div class="lhdr">
        <div class="lnum">${l.num}</div>
        <div class="ltitle">${l.title}</div>
        <div class="lform">${l.formula}</div>
        <div class="lchev">▼</div>
      </div>
      <div class="lbody">
        <div class="psteps">
          ${l.steps
            .map(
              (s, i) =>
                `<div class="pstep"><div class="psn">${i + 1}</div><div><div class="peq">${s.eq}</div><div class="pwhy">${s.why}</div></div></div>`
            )
            .join("")}
        </div>
        <div class="exbox">
          <div class="exlabel">${l.ex.lbl}</div>
          <div class="exrow">${l.ex.eqs
            .map(
              (e, i) =>
                `<span class="exeq">${e}</span>${
                  i < l.ex.eqs.length - 1
                    ? '<span style="color:var(--mt);font-size:11px">→</span>'
                    : ""
                }`
            )
            .join("")}</div>
          <div style="font-size:11px;color:var(--a3);margin-top:5px">${l.ex.verify}</div>
        </div>
      </div>
    </div>`
    )
    .join("");
}

export function verLaws() {
  const b = parseFloat(document.getElementById("vBase")?.value || "2");
  const m = parseFloat(document.getElementById("vM")?.value || "8");
  const n = parseFloat(document.getElementById("vN")?.value || "4");
  const output = document.getElementById("vRes");
  if (!output) return;

  if (b <= 1 || m <= 0 || n <= 0) {
    output.innerHTML =
      '<span class="ver2">Need: base > 1, m > 0, n > 0</span>';
    return;
  }

  const lb = (v) => Math.log(v) / Math.log(b);
  const productLeft = lb(m * n);
  const productRight = lb(m) + lb(n);
  const ok = Math.abs(productLeft - productRight) < 1e-4 ? "✓" : "✗";
  output.innerHTML = `<span class="vok">Product:</span> log(${m * n}) = ${fmt(
    productLeft
  )} | log(${m})+log(${n}) = ${fmt(productRight)} <span class="${
    ok === "✓" ? "vok" : "ver2"
  }">${ok}</span>`;
}
