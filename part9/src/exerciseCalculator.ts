interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number
}

const calculateRating = (averageTargetDifference: number) => {
  if (averageTargetDifference < 0.25) {
    return {
      success: true,
      rating: 3,
      ratingDescription: 'great job!'
    };
  }
  else if (averageTargetDifference < 0.5) {
    return {
      success: false,
      rating: 2,
      ratingDescription: 'ok but try harder'
    };
  }
  else {
    return {
      success: false,
      rating: 1,
      ratingDescription: 'not that great, step up'
    };
  }
};

const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  const hoursTotal = hours.reduce(function(hoursOfCurrentDay, hoursOfNextDay) {
    return hoursOfCurrentDay + hoursOfNextDay;
  }, 0);
  const average = hoursTotal / periodLength;
  const averageTargetDifference = target - average;
  const trainingDays = hours.filter(trainingHours => trainingHours > 0).length;

  const ratings = calculateRating(averageTargetDifference);

  const stats = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: ratings.success,
    rating: ratings.rating,
    ratingDescription: ratings.ratingDescription,
    target: target,
    average: average
  };

  return stats;
};

export default calculateExercises;