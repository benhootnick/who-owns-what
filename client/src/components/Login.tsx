import React, { useState, useContext } from "react";

import "styles/Login.css";
import "styles/_input.scss";

import { I18n } from "@lingui/core";
import { withI18n } from "@lingui/react";
import { Trans, t } from "@lingui/macro";
import { UserContext } from "./UserContext";
import PasswordInput from "./PasswordInput";
import { JustfixUser } from "state-machine";
import AuthClient from "./AuthClient";
import { Alert } from "./Alert";
import { AlertIcon } from "./Icons";

export enum LoginState {
  Default,
  Login,
  Register,
}

type LoginProps = {
  i18n: I18n;
  onBuildingPage?: boolean;
  onSuccess?: (user: JustfixUser) => void;
  handleRedirect?: () => void;
};

const LoginWithoutI18n = (props: LoginProps) => {
  const { i18n, onBuildingPage, onSuccess, handleRedirect } = props;
  const userContext = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [header, setHeader] = useState("Log in / sign up");
  const [subheader, setSubheader] = useState("");
  const [loginState, setLoginState] = useState(LoginState.Default);
  const isDefaultState = loginState === LoginState.Default;
  const isRegisterState = loginState === LoginState.Register;

  const [emailFormatError, setEmailFormatError] = useState(false);
  const [emptyAuthError, setEmptyAuthError] = useState(false);
  const [invalidAuthError, setInvalidAuthError] = useState(false);
  const [existingUserError, setExistingUserError] = useState(false);

  const resetErrorStates = () => {
    setEmptyAuthError(false);
    setInvalidAuthError(false);
    setExistingUserError(false);
  };

  const toggleLoginState = (endState: LoginState) => {
    if (endState === LoginState.Register) {
      setLoginState(LoginState.Register);
      if (!onBuildingPage) {
        setHeader("Sign up");
        setSubheader("With an account you can save buildings and get weekly updates");
      }
    } else if (endState === LoginState.Login) {
      setLoginState(LoginState.Login);
      if (!onBuildingPage) {
        setHeader("Log in");
        setSubheader("");
      }
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDefaultState && !!username && !emailFormatError) {
      const existingUser = await AuthClient.isEmailAlreadyUsed(username);

      if (existingUser) {
        setExistingUserError(true);
        toggleLoginState(LoginState.Login);
      } else {
        toggleLoginState(LoginState.Register);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetErrorStates();

    if (!username || !password) {
      setEmptyAuthError(true);
      return;
    }

    const existingUser = await AuthClient.isEmailAlreadyUsed(username);
    if (existingUser) {
      if (isRegisterState) {
        setExistingUserError(true);
      } else {
        const error = await userContext.login(username, password, onSuccess);
        if (!!error) {
          setInvalidAuthError(true);
        } else {
          handleRedirect && handleRedirect();
        }
      }
    } else {
      const error = isRegisterState
        ? await userContext.register(username, password, onSuccess)
        : await userContext.login(username, password, onSuccess);

      if (!!error) {
        setInvalidAuthError(true);
      } else {
        handleRedirect && handleRedirect();
      }
    }
  };

  const renderPageLevelAlert = (
    type: "error" | "success" | "info",
    message: string,
    showLogin?: boolean
  ) => {
    return (
      <Alert
        className={`page-level-alert`}
        variant="primary"
        closeType="none"
        role="status"
        type={type}
      >
        {message}
        {showLogin && (
          <button
            className="button is-text ml-5"
            onClick={() => toggleLoginState(LoginState.Login)}
          >
            <Trans>Log in</Trans>
          </button>
        )}
      </Alert>
    );
  };

  const renderAlert = () => {
    let alertMessage = "";

    switch (true) {
      case invalidAuthError:
        alertMessage = i18n._(t`The email and/or password you entered is incorrect.`);
        return renderPageLevelAlert("error", alertMessage);
      case emptyAuthError:
        alertMessage = i18n._(t`The email and/or password cannot be blank.`);
        return renderPageLevelAlert("error", alertMessage);
      case existingUserError:
        if (isRegisterState) {
          alertMessage = i18n._(t`That email is already used.`);
          // show login button in alert
          return renderPageLevelAlert("error", alertMessage, !onBuildingPage);
        } else if (onBuildingPage) {
          alertMessage = i18n._(t`Your email is associated with an account. Log in below.`);
          return renderPageLevelAlert("info", alertMessage);
        }
    }
  };

  const isBadEmailFormat = () => {
    /* valid email regex rules 
      alpha numeric characters are ok, upper/lower case agnostic 
      username: leading \_ ok, chars \_\.\- ok in all other positions
      domain name: chars \.\- ok as long as not leading. must end in a \. and at least two alphabet chars */
    const pattern =
      "^([a-zA-Z0-9_]+[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-zA-Z]{2,})$";
    const input = document.getElementById("email-input") as HTMLElement;
    const inputValue = (input as HTMLInputElement).value;

    // HTML input element has loose email validation requirements, so we check the input against a custom regex
    const passStrictRegex = inputValue.match(pattern);
    const passAutoValidation = document.querySelectorAll("input:invalid").length === 0;

    if (!passAutoValidation || !passStrictRegex) {
      setEmailFormatError(true);
      input.className = input.className + " invalid";
    } else {
      setEmailFormatError(false);
      input.className = input.className.split(" ")[0];
    }
  };

  return (
    <div className="Login">
      {renderAlert()}
      {!onBuildingPage && (
        <>
          <h4 className="page-title text-center">{i18n._(t`${header}`)}</h4>
          <h5 className="text-left">{i18n._(t`${subheader}`)}</h5>
        </>
      )}
      <form onSubmit={isDefaultState ? handleEmailSubmit : handleSubmit} className="input-group">
        <Trans render="label">Email address</Trans>
        {emailFormatError && (
          <span id="input-field-error">
            <AlertIcon />
            <Trans>Please enter a valid email address. </Trans>
          </span>
        )}
        <input
          type="email"
          id="email-input"
          className="input"
          placeholder={i18n._(t`Enter email`)}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          onBlur={isBadEmailFormat}
          value={username}
          // note: required={true} removed bc any empty state registers as invalid state
        />
        {!isDefaultState && (
          <PasswordInput
            labelText={isRegisterState ? "Create a password" : "Password"}
            username={username}
            showPasswordRules={isRegisterState}
            showForgotPassword={!isRegisterState}
            onChange={setPassword}
          />
        )}
        <input
          type="submit"
          className="button is-primary"
          value={
            isDefaultState
              ? i18n._(t`Submit`)
              : isRegisterState
              ? i18n._(t`Sign up`)
              : i18n._(t`Log in`)
          }
          // note: emabled vs. disabled state is not visually different. silently fails with below line in.
          // disabled={!validatePassword(password) && isRegisterState}
        />
      </form>
      {isRegisterState ? (
        <div className="login-type-toggle">
          <Trans>Already have an account?</Trans>
          <button
            className="button is-text ml-5"
            onClick={() => toggleLoginState(LoginState.Login)}
          >
            <Trans>Log in</Trans>
          </button>
        </div>
      ) : (
        <div className="login-type-toggle">
          <Trans>Don't have an account?</Trans>
          <button
            className="button is-text ml-5 pt-20"
            onClick={() => toggleLoginState(LoginState.Register)}
          >
            <Trans>Sign up</Trans>
          </button>
        </div>
      )}
    </div>
  );
};

const Login = withI18n()(LoginWithoutI18n);

export default Login;
