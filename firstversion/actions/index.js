export function login({email, password, rememberMe}) {
  return {
      type: 'LOGIN_USER',
      payload: {
        user: {
          email,
          rememberMe
        }
      }
  }
}