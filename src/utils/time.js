export const timezones = [
  { zone: 'UTC', relation: 0 },
  { zone: 'GMT', relation: 0 },
  { zone: 'ECT', relation: 1 },
  { zone: 'EET', relation: 2 },
  { zone: 'ART', relation: 2 },
  { zone: 'EAT', relation: 3 },
  { zone: 'MET', relation: 3.5 },
  { zone: 'NET', relation: 4 },
  { zone: 'PLT', relation: 5 },
  { zone: 'IST', relation: 5.5 },
  { zone: 'BST', relation: 6 },
  { zone: 'VST', relation: 7 },
  { zone: 'CTT', relation: 8 },
  { zone: 'JST', relation: 9 },
  { zone: 'ACT', relation: 9.5 },
  { zone: 'AET', relation: 10 },
  { zone: 'SST', relation: 11 },
  { zone: 'NST', relation: 12 },
  { zone: 'MIT', relation: -11 },
  { zone: 'HST', relation: -10 },
  { zone: 'AST', relation: -9 },
  { zone: 'PST', relation: -8 },
  { zone: 'PNT', relation: -7 },
  { zone: 'MST', relation: -7 },
  { zone: 'CST', relation: -6 },
  { zone: 'EST', relation: -5 },
  { zone: 'IET', relation: -5 },
  { zone: 'PRT', relation: -4 },
  { zone: 'CNT', relation: -3.5 },
  { zone: 'AGT', relation: -3 },
  { zone: 'BET', relation: -3 },
  { zone: 'CAT', relation: -1 },
]

export const dateHelper = () => {
  const todayDate = new Date()
  const dateArr = todayDate.toString().split(' ')
  const weekday = dateArr[0]
  const month = monthsToDigit[dateArr[1]]
  const day = parseInt(dateArr[2])
  const year = parseInt(dateArr[3])
  const localTime = dateArr[4]
  const localTimezone =
    dateArr[6].charAt(1).toUpperCase() +
    dateArr[7].charAt(0).toUpperCase() +
    dateArr[8].charAt(0).toUpperCase()
  const utcRelation = dateArr[5]

  return {
    weekday: weekday,
    month: month,
    day: day,
    year: year,
    localTime: localTime,
    localTimezone: localTimezone,
    utcRelation: utcRelation,
  }
}

const monthsToDigit = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
}

export const digitToMonth = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
}
