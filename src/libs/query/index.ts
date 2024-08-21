const APIQueryKey = {
  // AUTH
  GET_ME: "get_me",

  // LOCAL_STORAGE
  CHECK_AUTH: "check_auth"
};

const APIMutationKey = {
  // AUTH_KEY
  LOGOUT: "logout",
  LOGIN: "login"
};

export { APIMutationKey, APIQueryKey };
export * from "./get-query-client";
