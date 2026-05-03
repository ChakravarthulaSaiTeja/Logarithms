import { problems } from "../data/problems.js";

const state = {
  filter: "All",
  stepState: {},
};

function normalized(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, "");
}

function getVisibleProblems() {
  if (state.filter === "All") return problems;
  return problems.filter((p) => p.level === state.filter);
}

export function renderProblems() {
  const container = document.getElementById("probsList");
  if (!container) return;

  const visible = getVisibleProblems();
  container.innerHTML = visible
    .map((p) => {
      const idx = problems.indexOf(p);
      return `
      <div class="prob">
        <div class="prob-tag ${p.tag}">${p.level}</div>
        <div class="prob-q">${p.question}</div>
        <div class="prob-tools">
          <button class="prob-btn" data-action="hint" data-index="${idx}">Hint</button>
          <button class="prob-btn" data-action="step" data-index="${idx}">Next Step</button>
        </div>
        <div class="prob-hint" id="hint-${idx}">${p.hint}</div>
        <div class="prob-steps" id="steps-${idx}"></div>
        <div class="prob-answer">
          <input id="answer-${idx}" placeholder="Enter answer" />
          <button class="prob-btn" data-action="check" data-index="${idx}">Check</button>
          <div class="prob-feedback" id="feedback-${idx}"></div>
        </div>
      </div>`;
    })
    .join("");
}

function showHint(i) {
  const el = document.getElementById(`hint-${i}`);
  if (!el) return;
  el.style.display = el.style.display === "block" ? "none" : "block";
}

function showStep(i) {
  if (typeof state.stepState[i] !== "number") state.stepState[i] = 0;
  const stepContainer = document.getElementById(`steps-${i}`);
  if (!stepContainer) return;

  const step = problems[i]?.steps[state.stepState[i]];
  if (!step) return;

  stepContainer.innerHTML += `<div class="prob-step">${step}</div>`;
  state.stepState[i] += 1;
}

function checkAnswer(i) {
  const input = document.getElementById(`answer-${i}`);
  const feedback = document.getElementById(`feedback-${i}`);
  if (!input || !feedback) return;

  const user = normalized(input.value);
  const correct = normalized(problems[i].answer);
  if (user && user === correct) {
    feedback.textContent = "Correct";
    feedback.classList.add("ok");
    feedback.classList.remove("bad");
  } else {
    feedback.textContent = "Try again";
    feedback.classList.add("bad");
    feedback.classList.remove("ok");
  }
}

function pickRandomProblem() {
  const visible = getVisibleProblems();
  if (visible.length === 0) return;
  const picked = visible[Math.floor(Math.random() * visible.length)];
  const idx = problems.indexOf(picked);
  state.stepState[idx] = 0;
  renderProblems();
  const node = document.getElementById(`answer-${idx}`);
  node?.scrollIntoView({ behavior: "smooth", block: "center" });
  node?.focus();
}

export function initProblems() {
  const container = document.getElementById("probsList");
  const filter = document.getElementById("difficultyFilter");
  const randomBtn = document.getElementById("randomProblemBtn");

  container?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const index = Number(target.dataset.index);
    const action = target.dataset.action;
    if (Number.isNaN(index) || !action) return;
    if (action === "hint") showHint(index);
    if (action === "step") showStep(index);
    if (action === "check") checkAnswer(index);
  });

  filter?.addEventListener("change", () => {
    state.filter = filter.value;
    renderProblems();
  });

  randomBtn?.addEventListener("click", pickRandomProblem);
  renderProblems();
}
