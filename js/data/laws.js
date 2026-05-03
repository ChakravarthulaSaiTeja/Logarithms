export const laws = [
  {
    num: 1,
    title: "Product Rule",
    formula: "logₐ(mn) = logₐm + logₐn",
    steps: [
      { eq: "Let logₐ(m)=x, logₐ(n)=y", why: "Assign variables" },
      { eq: "Then aˣ=m, aʸ=n", why: "Convert to exponent form" },
      { eq: "mn = aˣ⁺ʸ", why: "Multiply powers with same base" },
      { eq: "logₐ(mn)=x+y", why: "Apply definition of logarithm" },
    ],
    ex: {
      lbl: "Example",
      eqs: ["log₂(4×8)", "= log₂4 + log₂8", "= 2 + 3", "= 5"],
      verify: "Check: log₂(32)=5 ✓",
    },
  },
  {
    num: 2,
    title: "Quotient Rule",
    formula: "logₐ(m/n) = logₐm − logₐn",
    steps: [
      { eq: "Let m=aˣ and n=aʸ", why: "Definition of log" },
      { eq: "m/n = aˣ⁻ʸ", why: "Exponent quotient rule" },
      { eq: "logₐ(m/n)=x−y", why: "Convert back to log form" },
    ],
    ex: {
      lbl: "Example",
      eqs: ["log₂(32/4)", "= log₂32 − log₂4", "= 5 − 2", "= 3"],
      verify: "Check: log₂(8)=3 ✓",
    },
  },
];
