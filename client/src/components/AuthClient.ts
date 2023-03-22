import { NetworkError, HTTPError } from "error-reporting";
import { JustfixUser } from "state-machine";
import browser from "../util/browser";

const BASE_URL = browser.addTrailingSlash(process.env.REACT_APP_API_BASE_URL);
const AUTH_SERVER_BASE_URL = browser.addTrailingSlash(process.env.REACT_APP_AUTH_SERVER_BASE_URL);

let _user: JustfixUser | undefined;
const user = () => _user;
const fetchUser = async () => {
  if (!_user) {
    try {
      const authCheck = await userAuthenticated();
      _user = {
        email: authCheck?.["email"],
        subscriptions: authCheck?.["subscriptions"],
      };
    } catch {}
  }
  return _user;
};
const setUser = (user: JustfixUser) => (_user = user);

/**
 * Authenticates a user with the given email and password.
 * Creates an account for this user if one does not already exist.
 */
const authenticate = async (username: string, password: string) => {
  const json = await postAuthRequest(`${BASE_URL}auth/authenticate`, { username, password });
  fetchUser();
  return json;
};

/**
 * Authenticates a user, returning an access token, a refresh token,
 * and expiry time.
 */
const login = async (username: string, password: string) => {
  const json = await postAuthRequest(`${BASE_URL}auth/login`, { username, password });
  return json;
};

/**
 * Revokes the current access token, if one is present
 */
const logout = async () => {
  const json = await postAuthRequest(`${BASE_URL}auth/logout`);
  _user = undefined;
  return json;
};

/**
 * Checks to see if a user account with this email exists
 */
const userExists = async (username: string) => {
  try {
    const response = await fetch(
      `${AUTH_SERVER_BASE_URL}user/exists/?email=${encodeURIComponent(username)}`
    );
    return !!response.ok;
  } catch (e) {
    if (e instanceof Error) {
      throw new NetworkError(e.message);
    } else {
      throw new Error("Unexpected error");
    }
  }
};

const resetPasswordRequest = async (username: string) => {
  return await postAuthRequest(`${BASE_URL}auth/reset_password`, { username });
};

/**
 * Checks to see if a user is currently authenticated (via httponly cookie)
 */
const userAuthenticated = async () => {
  return await postAuthRequest(`${BASE_URL}auth/auth_check`);
};

/**
 * Sends an authenticated request to verify the user email
 */
const verifyEmail = async () => {
  const params = new URLSearchParams(window.location.search);
  try {
    await postAuthRequest(`${BASE_URL}auth/verify_email?code=${params.get("code")}`);
    return true;
  } catch {
    return false;
  }
};

/**
 * Sends an authenticated request to update the user email
 */
const updateEmail = async (newEmail: string) => {
  return await postAuthRequest(`${BASE_URL}user/update`, { new_email: newEmail });
};

/**
 * Sends an authenticated request to update the user email
 */
const buildingSubscribe = async (bbl: string) => {
  return await postAuthRequest(`${BASE_URL}auth/subscriptions/${bbl}`);
};

/**
 * Fetches the list of all subscriptions associated with a user
 */
const userSubscriptions = async () => {
  return await postAuthRequest(`${BASE_URL}auth/subscriptions`);
};

/**
 * Wrapper function for authentication POST requests
 */

const postAuthRequest = async (
  url: string,
  params?: { [key: string]: string },
  headers?: { [key: string]: string }
) => {
  const body = params
    ? Object.keys(params)
        .map((k) => `${k}=${encodeURIComponent(params[k])}`)
        .join("&")
    : "";
  const result = await friendlyFetch(url, {
    method: "POST",
    mode: "cors",
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers,
    },
    credentials: "include",
  });
  const json = await result.json();
  return json;
};

// TODO shakao Move shared APIClient functions to util
const friendlyFetch: typeof fetch = async (input, init) => {
  let response: Response;
  try {
    response = await fetch(input, init);
  } catch (e) {
    if (e instanceof Error) {
      throw new NetworkError(e.message);
    } else {
      throw new Error("Unexpected error");
    }
  }
  if (!response.ok) {
    throw new HTTPError(response);
  }
  return response;
};

const Client = {
  userExists,
  userAuthenticated,
  user,
  fetchUser,
  setUser,
  authenticate,
  login,
  logout,
  verifyEmail,
  updateEmail,
  resetPasswordRequest,
  buildingSubscribe,
  userSubscriptions,
};

export default Client;
