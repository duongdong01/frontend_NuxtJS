export function isValidEmail (email) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function isValidName (name) {
  // eslint-disable-next-line no-useless-escape
  const re = /^[a-z][a-z\s]*$/
  return re.test(name)
}

export function isValidPassword (pass) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return re.test(pass)
}

export function isValidCost (price) {
  // eslint-disable-next-line no-useless-escape
  const re = /^\d+(\.\d{2})?$/
  return re.test(price)
}
