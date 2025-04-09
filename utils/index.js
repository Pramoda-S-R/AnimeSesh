export function capitalize(string) {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch (error) {
    return "";
  }
}

export function getSeason(date) {
  if (!(date instanceof Date)) {
    throw new Error("Input must be a Date object.");
  }

  const month = date.getMonth(); // 0 = January, 11 = December

  if (month >= 0 && month <= 2) {
    return "Winter";
  } else if (month >= 3 && month <= 5) {
    return "Spring";
  } else if (month >= 6 && month <= 8) {
    return "Summer";
  } else if (month >= 9 && month <= 11) {
    return "Fall";
  }
}
