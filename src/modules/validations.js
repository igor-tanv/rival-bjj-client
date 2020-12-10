
export function isRequired(v) {
  return v && v.length > 0 ? null : "is required"
}

export function isValidAge(v) {
  const currentYear = new Date().getFullYear();
  return parseInt(v) && currentYear - parseInt(v) >= 15 && currentYear - parseInt(v) <= 75 ? null : "Must be between 15 and 75";
}

export function atLeast(v, n) {
  return v && v.length >= n ? null : `must be at least ${n} characters`
}

export function hasSpecial(v) {
  return v && new RegExp(/[\*\@\!\-]/g).test(v) ? null : `must have at least 1 special character (*@-!)`
}

export function isPassword(v) {
  const errors = [
    hasSpecial(v),
    atLeast(v, 7)
  ].filter(error => error)

  return errors.length <= 0 ? null : errors.join(", ")
}

export function didAgree(checked) {
  return checked ? null : "must be agreed to"
}