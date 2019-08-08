const checkInterestRate = (rules, value, callback) => {
  if (value >= 0 && value <= 100) {
    return Promise.resolve(value);
  }
  return Promise.reject("value");
};

const validation = {
  number: {
    pattern: "^\\d+(.\\d+)?$",
    message: "Input must be a number."
  },

  percent: {
    validator: checkInterestRate,
    message: "Input must be between 0 and 100."
  }
};

export default validation;
