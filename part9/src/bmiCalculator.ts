const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height / 100) ** 2)
  if (bmi < 18.5) {
    return 'Underweight. Go eat a sandwich.'
  }
  else if (bmi < 25) {
    return 'Healthy weight. Carry on as usual.'
  }
  else {
    return 'Overweight. Go for a walk to get some vegetables.'
  }
}

console.log(calculateBmi(158, 54))

export default calculateBmi