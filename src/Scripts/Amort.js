const amortSchedCA = (amount, rate, term, amortization) => {
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
      "payment number": Number(i + 1),
      interest: Number(interest.toFixed(2)),
      principal: Number(principal.toFixed(2)),
      monthlyPayment: Number(monthlyPayment.toFixed(2)),
      "principal remaining": Number(principalLeft.toFixed(2)),
      "accrued interest": Number(accInterest.toFixed(2))
    };
  }

  return sched;
};

const discountedSavingsCA = (
  amount,
  rate1,
  rate2,
  term,
  amortization,
  discount
) => {
  const loan1 = amortSchedCA(amount, rate1, term, amortization);
  const loan2 = amortSchedCA(amount, rate2, term, amortization);
  let sum = 0;

  if (discount === 0) {
    return Math.abs(
      parseFloat(loan1[term - 1]["accrued interest"]) -
        parseFloat(loan2[term - 1]["accrued interest"])
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

const discountedCA = (amount, rate, term, amortization, discount) => {
  const loan = amortSchedCA(amount, rate, term, amortization);
  let sum = 0;

  if (discount === 0) {
    return parseFloat(loan[term - 1]["accrued interest"]);
  } else {
    for (let payment = 0; payment < term; payment++) {
      sum +=
        parseFloat(loan[payment].interest) /
        (1 + discount / 1200) ** (payment + 1);
    }
  }
  return sum;
};

export { amortSchedCA, discountedSavingsCA, discountedCA };
