
export function isRequired(v) {
  return v && v.length > 0 ? null : "Required"
}

export function isValidAge(v) {
  const currentYear = new Date().getFullYear();
  return parseInt(v) && currentYear - parseInt(v) >= 15 && currentYear - parseInt(v) <= 75 ? null : "Enter valid YEAR";
}

export function didAgree(checked) {
  return checked ? null : "must be agreed to"
}