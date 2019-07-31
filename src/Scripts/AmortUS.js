const amortSched = (amount, rate, term, amortization) => {
  let sched = [];

  const J = rate / 12 / 100;

  let monthlyPayment =
    Math.round(((amount * J) / (1 - (1 + J) ** -amortization)) * 100) / 100;

  //   console.log("monthlyPayment", monthlyPayment);

  let monthlyInterest = rate / 12 / 100;
  let principalLeft = amount;
  let accInterest = 0;
  for (var i = 0; i < term; i++) {
    let interest = Math.round(monthlyInterest * principalLeft * 100) / 100;
    let principal = monthlyPayment - interest;
    principalLeft = principalLeft - principal;
    accInterest += interest;
    sched[i] = {
      "payment number": i + 1,
      interest: interest.toFixed(2),
      principal: principal.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      "principal remaining": principalLeft.toFixed(2),
      "accrued Interest": accInterest.toFixed(2)
    };
  }

  return sched;
};

// amortSched(1000000, 5, 60, 300);

export default amortSched;
