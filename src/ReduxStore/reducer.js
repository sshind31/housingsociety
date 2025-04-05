// src/reducers/authReducer.js
const initialState = {
  isLoggedIn: false,
  HousingSocietyCode:'',
  MemberCode:'',
  Name:'',
  userID:-1
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        HousingSocietyCode:action.payload.HousingSocietyCode,
        MemberCode:action.payload.MemberCode,
        Name:action.payload.Name,
        userID:action.payload.UserID
      };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false,HousingSocietyCode:'', MemberCode:'', Name:'', userID:-1};
    default:
      return state;
  }
};

export default authReducer;
