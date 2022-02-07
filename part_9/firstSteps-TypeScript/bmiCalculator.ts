
//-------------------------version 3--------------------------------------------------
interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (arg: any): MultiplyValues => {
  // console.log('-------what is arg----', arg);  
  if (!arg.height || !arg.weight) throw new Error('No argument of height or weight');

  if (!isNaN(Number(arg.height)) && !isNaN(Number(arg.weight))) {
    return {
      value1: Number(arg.height),
      value2: Number(arg.weight)
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


const calculateBmi = (heightInCM: number, weightInKg: number): string => {
  const bmi = ( weightInKg * Math.pow(100, 2)) / Math.pow(heightInCM, 2);
  let message: string;
  // console.log('-------what is bmi----', bmi);  

  if ( bmi < 16.0 ) {
      message = 'Underweight (Severe thinness)';
  } else if ( bmi < 16.9 ) {
      message = 'Underweight (Moderate thinness)';
  } else if ( bmi < 18.4 ) {
      message = 'Underweight (Mild thinness)';
  } else if ( bmi < 24.9 ) {
      message = 'Normal (healthy weight)';
  } else if ( bmi < 29.9 ) {
      message = 'Overweight (Pre-obese)';
  } else if ( bmi < 34.9 ) {
      message = 'Obese (Class I)';
  } else if ( bmi < 39.9 ) {
      message = 'Obese (Class II)';
  } else {
      message = 'Obese (Class III)';
  }
  return message;
}

export { parseArguments };
export { calculateBmi };

//------------------------------------------------------------------------------------



//-------------------------version 2--------------------------------------------------
// interface MultiplyValues {
//   value1: number;
//   value2: number;
// }

// const parseArguments = (args: Array<string>): MultiplyValues => {
//   // console.log('-------what is args----', args);
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 4) throw new Error('Too many arguments');

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       value1: Number(args[2]),
//       value2: Number(args[3])
//     }
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// }


// const calculateBmi = (heightInCM: number, weightInKg: number): string => {
//   const bmi = ( weightInKg * Math.pow(100, 2)) / Math.pow(heightInCM, 2);
//   let message: string;

//   if ( bmi < 16.0 ) {
//       message = 'Underweight (Severe thinness)';
//   } else if ( bmi < 16.9 ) {
//       message = 'Underweight (Moderate thinness)';
//   } else if ( bmi < 18.4 ) {
//       message = 'Underweight (Mild thinness)';
//   } else if ( bmi < 24.9 ) {
//       message = 'Normal (healthy weight)';
//   } else if ( bmi < 29.9 ) {
//       message = 'Overweight (Pre-obese)';
//   } else if ( bmi < 34.9 ) {
//       message = 'Obese (Class I)';
//   } else if ( bmi < 39.9 ) {
//       message = 'Obese (Class II)';
//   } else {
//       message = 'Obese (Class III)';
//   }
//   return message;
// }

// try {
//   const { value1, value2 } = parseArguments(process.argv);
//   console.log(calculateBmi(value1, value2));
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.'
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }

//------------------------------------------------------------------------------------




//-------------------------version 1--------------------------------------------------
// const calculateBmi = (heightInCM: number, weightInKg: number): string => {
//     const bmi = ( weightInKg * Math.pow(100, 2)) / Math.pow(heightInCM, 2);
//     let message: string;

//     if ( bmi < 16.0 ) {
//         message = 'Underweight (Severe thinness)';
//     } else if ( bmi < 16.9 ) {
//         message = 'Underweight (Moderate thinness)';
//     } else if ( bmi < 18.4 ) {
//         message = 'Underweight (Mild thinness)';
//     } else if ( bmi < 24.9 ) {
//         message = 'Normal (healthy weight)';
//     } else if ( bmi < 29.9 ) {
//         message = 'Overweight (Pre-obese)';
//     } else if ( bmi < 34.9 ) {
//         message = 'Obese (Class I)';
//     } else if ( bmi < 39.9 ) {
//         message = 'Obese (Class II)';
//     } else {
//         message = 'Obese (Class III)';
//     }
//     return message;
// }

// console.log(calculateBmi(180, 74));

//------------------------------------------------------------------------------------