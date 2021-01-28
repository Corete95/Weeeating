export const setSignupActive = (bool: boolean) => ({
  type: SETMODAL.SET_SIGNUP,
  payload: bool
});

export const setLoginActive = (bool: boolean) => ({
  type: SETMODAL.SET_LOGIN,
  payload: bool
});

export const SETMODAL = {
  SET_SIGNUP: "SET_SIGNUP",
  SET_LOGIN: "SET_LOGIN"
};
