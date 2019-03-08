export const actionTypes = {
  LOGIN_USER: 'LOGIN_USER',
  SIGNUP_USER: 'SIGNUP_USER',
}

export function login({email, rememberMe}, cb) {
  setTimeout(cb, 1500);
  return {
      type: actionTypes.LOGIN_USER,
      payload: {
        user: {
          email,
          rememberMe,
          isAuth: true
        }
      }
  }
}

export function signUp({email}, cb) {
  setTimeout(cb, 1500);
  return {
      type: actionTypes.SIGNUP_USER,
      payload: {
        user: { email }
      }
  }
}