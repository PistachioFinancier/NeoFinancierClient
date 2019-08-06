const amortSchedUS = (amount, rate, term, amortization) => {
  let sched = [];

  const J = rate / 12 / 100;

  let monthlyPayment =
    Math.round(((amount * J) / (1 - (1 + J) ** -amortization)) * 100) / 100;

  let monthlyInterest = rate / 12 / 100;
  let principalLeft = amount;
  let accInterest = 0;
  for (var i = 0; i < term; i++) {
    let interest = Math.round(monthlyInterest * principalLeft * 100) / 100;
    let principal = monthlyPayment - interest;
    principalLeft = principalLeft - principal;
    accInterest += interest;
    sched[i] = {
      "payment number": Number(i + 1),
      interest: Number(interest.toFixed(2)),
      principal: Number(principal.toFixed(2)),
      monthlyPayment: Number(monthlyPayment.toFixed(2)),
      "principal remaining": Number(principalLeft.toFixed(2)),
      "accrued interest": Number(accInterest.toFixed(2)),
      "starting principal": Number((principalLeft + principal).toFixed(2))
    };
  }

  return sched;
};

const discountedSavingsUS = (
  amount,
  rate1,
  rate2,
  term,
  amortization,
  discount
) => {
  const loan1 = amortSchedUS(amount, rate1, term, amortization);
  const loan2 = amortSchedUS(amount, rate2, term, amortization);
  let sum = 0;

  if (discount === 0) {
    return Math.abs(
      parseFloat(loan1[term - 1].interest) -
        parseFloat(loan2[term - 1].interest)
    ).toFixed(2);
  } else {
    for (let payment = 0; payment < term; payment++) {
      sum +=
        Math.abs(
          parseFloat(loan1[payment].interest) -
            parseFloat(loan2[payment].interest)
        ) /
        (1 + discount / 1200) ** (payment + 1);
    }
  }
  return sum.toFixed(2);
};

export { amortSchedUS, discountedSavingsUS };
