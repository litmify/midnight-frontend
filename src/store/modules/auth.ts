const SET_AUTHTOKEN = 'auth/setToken';
const GET_AUTHTOKEN = 'auth/get';
const SET_AUTHUSERNAME = 'auth/setUsername';
const GET_AUTHUSERNAME = 'auth/getUsername';

export const setAuthToken = (token: string) => ({ type: SET_AUTHTOKEN, token });
export const getAuthToken = () => ({ type: GET_AUTHTOKEN });
export const setAuthUsername = (username: string) => ({ type: SET_AUTHUSERNAME, username });
export const getAuthUsername = () => ({ type: GET_AUTHUSERNAME });

const initialState = {
  token: '',
  username: '',
};

type actionType = {
  type: string;
  token: string;
  username: string;
};

export default function auth(state = initialState, action: actionType) {
  switch (action.type) {
    case SET_AUTHTOKEN:
      return {
        ...state,
        token: action.token,
      };
    case GET_AUTHTOKEN:
      return state.token;
    case SET_AUTHUSERNAME:
      return {
        ...state,
        username: action.username,
      };
    case GET_AUTHUSERNAME:
      return state.username;
    default:
      return state;
  }
}
