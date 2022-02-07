
//-------------------------version 3--------------------------------------------------
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: Array<number>, targetDailyHours: number): Result => {
  const result = {
      periodLength:0,
      trainingDays: 0,
      success: false,
      rating: 0,
      ratingDescription: 'initializing...',
      target: 0,
      average: 0
  };

  const sumReducer = (sum: number, hours: number) => sum + hours;

  result.periodLength = dailyHours.length;
  result.trainingDays = dailyHours.length - dailyHours.filter(h => h === 0).length;
  result.target = targetDailyHours;
  result.average = dailyHours.reduce(sumReducer) / dailyHours.length;
  result.success = (result.average > result.target) || (result.average === result.target)
                      ? true
                      : false;

  if (result.success) {
      result.rating = 3;
  } else if (Math.abs(result.target - result.average) < 0.5) {
      result.rating = 2;
  } else {
      result.rating = 1;
  }

  switch (result.rating) {
      case 1:
          result.ratingDescription = 'bad';
          break;
      case 2:
          result.ratingDescription = 'not too bad but could be better';
          break;
      case 3:
          result.ratingDescription = 'good';
          break;
  }

  return result;
};

export { calculateExercises };

//------------------------------------------------------------------------------------



//-------------------------version 2--------------------------------------------------
// interface InputValues {
//     value1: number;
//     value2: Array<number>;
//   }
  
//   const parseArgForEx = (args: Array<string>): InputValues => {
//     // console.log('-------what is args----', args);
//     if (args.length < 4) throw new Error('Not enough arguments');

//     const inputs: InputValues = {
//         value1: 0,
//         value2: []
//       };
  
//     if (!isNaN(Number(args[2]))) {
//           inputs.value1 = Number(args[2]);
//       } else {
//         throw new Error('Provided values were not numbers!');
//       }

//     for (let i = 3; i<args.length; i++) {
//         if (!isNaN(Number(args[i]))) {
//             inputs.value2.push(Number(args[i]));
//         } else {
//         throw new Error('Provided values were not numbers!');
//         }
//     }
    
//     // console.log('-------what is inputs--value1--', inputs.value1);    
//     // console.log('-------what is inputs---value2-', inputs.value2);
//     return inputs;
//   };

  
// interface Result {
//     periodLength: number;
//     trainingDays: number;
//     success: boolean;
//     rating: number;
//     ratingDescription: string;
//     target: number;
//     average: number;
// }

// const calculateExercises = (dailyHours: Array<number>, targetDailyHours: number): Result => {
//     const result = {
//         periodLength:0,
//         trainingDays: 0,
//         success: false,
//         rating: 0,
//         ratingDescription: 'initializing...',
//         target: 0,
//         average: 0
//     };

//     const sumReducer = (sum: number, hours: number) => sum + hours;

//     result.periodLength = dailyHours.length;
//     result.trainingDays = dailyHours.length - dailyHours.filter(h => h === 0).length;
//     result.target = targetDailyHours;
//     result.average = dailyHours.reduce(sumReducer) / dailyHours.length;
//     result.success = (result.average > result.target) || (result.average === result.target)
//                         ? true
//                         : false;

//     if (result.success) {
//         result.rating = 3;
//     } else if (Math.abs(result.target - result.average) < 0.5) {
//         result.rating = 2;
//     } else {
//         result.rating = 1;
//     }

//     switch (result.rating) {
//         case 1:
//             result.ratingDescription = 'bad';
//             break;
//         case 2:
//             result.ratingDescription = 'not too bad but could be better';
//             break;
//         case 3:
//             result.ratingDescription = 'good';
//             break;
//     }

//     return result;
// };

// try {
//     const { value1, value2 } = parseArgForEx(process.argv);
//     console.log(calculateExercises(value2, value1));
//   } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.';
//     if (error instanceof Error) {
//       errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
//   }

//------------------------------------------------------------------------------------




//-------------------------version 1--------------------------------------------------
// interface Result {
//     periodLength: number;
//     trainingDays: number;
//     success: boolean;
//     rating: number;
//     ratingDescription: string;
//     target: number;
//     average: number;
// }

// const calculateExercises = (dailyHours: Array<number>, targetDailyHours: number): Result => {
//     let result = {
//         periodLength:0,
//         trainingDays: 0,
//         success: false,
//         rating: 0,
//         ratingDescription: 'initializing...',
//         target: 0,
//         average: 0
//     };

//     const sumReducer = (sum: number, hours: number) => sum + hours;

//     result.periodLength = dailyHours.length;
//     result.trainingDays = dailyHours.length - dailyHours.filter(h => h === 0).length;
//     result.target = targetDailyHours;
//     result.average = dailyHours.reduce(sumReducer) / dailyHours.length;
//     result.success = (result.average > result.target) || (result.average === result.target)
//                         ? true
//                         : false;

//     if (result.success) {
//         result.rating = 3;
//     } else if (Math.abs(result.target - result.average) < 0.5) {
//         result.rating = 2;
//     } else {
//         result.rating = 1;
//     }

//     switch (result.rating) {
//         case 1:
//             result.ratingDescription = 'bad';
//             break;
//         case 2:
//             result.ratingDescription = 'not too bad but could be better';
//             break;
//         case 3:
//             result.ratingDescription = 'good';
//             break;
//     }

//     return result;
// }

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

//------------------------------------------------------------------------------------


