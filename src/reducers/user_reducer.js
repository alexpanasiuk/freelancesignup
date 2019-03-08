import { actionTypes } from '../actions'; 

export default function(state = {}, action) {
  switch (action.type) {

    case(actionTypes.LOGIN_USER) :
      return {
        ...action.payload
      }

    case(actionTypes.SIGNUP_USER) :
      return {
        ...action.payload
      }

    default:
      return state;
  }
}