const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);
  if (!bmi) {
    return 'Invalid arguments! Height and weight must be numbers greater than 0';
  }
  if (bmi < 18.5) {
    return 'Underweight. Go eat a sandwich.';
  }
  else if (bmi < 25) {
    return 'Healthy weight. Carry on as usual.';
  }
  else {
    return 'Overweight. Go for a walk to get some vegetables.';
  }
};

export default calculateBmi;