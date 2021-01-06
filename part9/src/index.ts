import express from 'express';
const app = express();
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
app.use(express.json());

app.get('/hello', (_req: any, res: any) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: any, res: any) => {
  if (Number(req.query.height) > 0 && Number(req.query.weight) > 0) {
    return res.json({
      weight: Number(req.query.weight),
      height: Number(req.query.height),
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
    });
  }
  else {
    return res.status(400).send({
      message: 'the calculator needs values for height and weight'
    });
  }
});

app.post('/exercises', (req: any, res: any) => {
  console.log(req.body);
  const stats = req.body as {hours?: number[], target?: number};

  
  console.log(stats);
  if (stats.hours && stats.target) {
    const total = stats.hours.reduce(function(hoursOfCurrentDay, hoursOfNextDay) {
      return hoursOfCurrentDay + hoursOfNextDay;
    }, 0);
    if (total >= 0 && stats.target >= 0) {
      const result = calculateExercises(stats.hours, stats.target);
      return res.json(result);
    }
    else {
      return res.status(400).send({
        message: 'the hours need to be in a number array and the target needs to be a number'
      });
    }
  }
  else {
    return res.status(400).send({
      message: 'the calculator needs values for daily exercise hours and your target'
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});