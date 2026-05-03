import { quizQuestions } from "../data/quiz.js";

const state = { qi: 0, answered: false };

export function buildQuiz() {
  const box = document.getElementById("quizBox");
  if (!box) return;

  if (state.qi >= quizQuestions.length) {
    box.innerHTML = `<div class="qbox" style="text-align:center;padding:2rem"><div style="font-family:var(--serif);font-size:36px;color:var(--a3);margin-bottom:1rem">All done!</div><button class="btn" id="quizRestart">Restart</button></div>`;
    document.getElementById("quizRestart")?.addEventListener("click", () => {
      state.qi = 0;
      state.answered = false;
      buildQuiz();
    });
    return;
  }

  const q = quizQuestions[state.qi];
  state.answered = false;

  box.innerHTML = `<div class="qbox"><div class="qprog">${state.qi + 1} of ${
    quizQuestions.length
  }</div><div class="qtxt" style="margin-top:.75rem">${q.q}</div><div class="qopts">${q.opts
    .map((o, i) => `<button class="qo" data-opt="${i}">${o}</button>`)
    .join(
      ""
    )}</div><div class="qfb" id="qfb"></div><div class="qnav"><span></span><button class="btn" id="qnxt" style="display:none">Next →</button></div></div>`;

  box.querySelectorAll(".qo").forEach((btn) => {
    btn.addEventListener("click", () => answerQuestion(Number(btn.dataset.opt)));
  });
  document.getElementById("qnxt")?.addEventListener("click", () => {
    state.qi += 1;
    state.answered = false;
    buildQuiz();
  });
}

function answerQuestion(i) {
  if (state.answered) return;
  state.answered = true;

  const q = quizQuestions[state.qi];
  document.querySelectorAll(".qo").forEach((b, j) => {
    b.disabled = true;
    if (j === q.c) b.classList.add("correct");
    else if (j === i) b.classList.add("wrong");
  });
  const fb = document.getElementById("qfb");
  if (fb) {
    fb.innerHTML =
      i === q.c
        ? `<span style="color:var(--a3);font-weight:600">Correct! </span>${q.ex}`
        : `<span style="color:var(--re);font-weight:600">Not quite. </span>${q.ex}`;
  }
  document.getElementById("qnxt")?.style.setProperty("display", "block");
}
