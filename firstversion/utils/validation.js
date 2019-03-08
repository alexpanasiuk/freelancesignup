function error(msg) {
  return {
    Valid: false,
    error: msg
  }
}

export function buildReport(object, name, validationResult) {
  if (validationResult.isValid) {
    object[name] = false;
  } else {
    object[name] = validationResult.error;
  }
}

export function validateName(field) {
  field = field.trim();

  if (!field.match(/^[a-z]{4,}$/gi)) {
    return error('enter more than 3 characters')

  } else if (!field.match(/^[A-Z][a-zA-Z]*$/g)) {
    return error('first letter must be capital');
  }

  return {
    isValid: true
  }
}

export function validateEmail(email) {
  email = email.trim();

  if (!email.match(/^[a-z]+[a-z0-9_]*@[a-z]{2,}.[a-z]{2,}$/gi)) {
    return error('Incorrect email');
  }

  return {
    isValid: true
  }
}

export function validatePassword(pw) {
  pw = pw.trim();

  if (pw.length < 9) {
    return error('password to short');
  
  } else if (!pw.match(/^[a-z0-9]*$/g)) {
    return error('incorrect password');
  }

  return {
    isValid: true
  }
}

export function comparePasswords(pw1, pw2) {
  if (pw1.trim() !== pw2.trim()) {
    return error('password doen\'t match');
  }

  return {
    isValid: true
  }
}