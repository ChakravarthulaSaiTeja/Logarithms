import { initNav, initReveal } from "./features/nav.js";
import {
  buildEgGraph,
  buildLgGraph,
  initChartEvents,
  postRenderResize,
  updateLogEx,
  updateMult,
} from "./features/charts.js";
import { buildLaws, verLaws } from "./features/laws.js";
import { initProblems } from "./features/problems.js";
import { buildQuiz } from "./features/quiz.js";

window.verLaws = verLaws;

window.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  initChartEvents();
  buildLaws();
  verLaws();
  buildQuiz();
  initProblems();

  updateMult(4);
  updateLogEx();
  buildEgGraph();
  buildLgGraph();
  postRenderResize();
});
