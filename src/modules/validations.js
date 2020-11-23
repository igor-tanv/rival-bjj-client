
export function isRequired(v) {
  return v && v.length > 0 ? null : "is required"
}

export function isValidAge(v) {
  // we need to check the age range (15-75) and cannot be from future
  return parseInt(v) && v.toString().length === 4 ? null : "enter your 4 digit birthyear"
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