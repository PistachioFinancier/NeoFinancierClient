const amortSched = (amount, rate, term, amortization) => {
  let sched = [];
  let monthlyPayment =
    Math.round(
      ((amount * ((1 + rate / 200) ** (1 / 6) - 1)) /
        (1 - ((1 + rate / 200) ** (1 / 6)) ** -amortization)) *
        100
    ) / 100;
  let monthlyInterest = (1 + rate / 200) ** (1 / 6) - 1;
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

export default amortSched;
