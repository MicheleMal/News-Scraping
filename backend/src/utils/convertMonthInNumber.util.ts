export const convertMonthInNumber = (monthString: String): number => {
  let monthNumber: number = 0;
  switch (monthString.toLowerCase()) {
    case 'gennaio':
      monthNumber = 1;
      break;

    case 'febbraio':
      monthNumber = 2;
      break;

    case 'marzo':
      monthNumber = 3;
      break;

    case 'aprile':
      monthNumber = 4;
      break;

    case 'maggio':
      monthNumber = 5;
      break;

    case 'giugno':
      monthNumber = 6;
      break;

    case 'luglio':
      monthNumber = 7;
      break;

    case 'agosto':
      monthNumber = 8;
      break;
      
    case 'settembre':
      monthNumber = 9
      break;

    case 'ottobre':
      monthNumber = 10;
      break;

    case 'novembre':
      monthNumber = 11;
      break;

    case 'dicembre':
      monthNumber = 12;
      break;

  }

  return monthNumber;
};
