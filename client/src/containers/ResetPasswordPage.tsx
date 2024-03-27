import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LegalFooter from "../components/LegalFooter";

import Page from "../components/Page";
import { withI18n, withI18nProps } from "@lingui/react";
import { Trans, t } from "@lingui/macro";

import AuthClient, { ResetStatusCode } from "components/AuthClient";
import PasswordInput from "components/PasswordInput";
import { useInput } from "util/helpers";
import { FixedLoadingLabel } from "components/Loader";
import { createWhoOwnsWhatRoutePaths } from "routes";
import { LocaleLink } from "i18n";
import SendNewLink from "components/SendNewLink";
import { Button } from "@justfixnyc/component-library";

const ResetPasswordPage = withI18n()((props: withI18nProps) => {
  const { i18n } = props;
  const { search } = useLocation();
  const { account } = createWhoOwnsWhatRoutePaths();
  const params = new URLSearchParams(search);

  const [tokenStatus, setTokenStatus] = React.useState<ResetStatusCode>();
  const [resetStatus, setResetStatus] = React.useState<ResetStatusCode>();
  const [emailIsResent, setEmailIsResent] = React.useState(false);
  const {
    value: password,
    error: passwordError,
    showError: showPasswordError,
    setShowError: setShowPasswordError,
    setError: setPasswordError,
    onChange: onChangePassword,
  } = useInput("");

  const delaySeconds = 5;
  const baseUrl = window.location.origin;
  const redirectUrl = `${baseUrl}/${i18n.language}/account/login`;

  const updateCountdown = () => {
    let timeLeft = delaySeconds;
    const delayInterval = delaySeconds * 100;

    setInterval(() => {
      timeLeft && timeLeft--; // prevents counter from going below 0
      document.getElementById("countdown")!.textContent = timeLeft.toString();
      if (timeLeft <= 0) {
        document.location.href = redirectUrl;
      }
    }, delayInterval);
  };

  useEffect(() => {
    const asyncCheckToken = async () => {
      return await AuthClient.resetPasswordCheck();
    };

    asyncCheckToken().then((result) => {
      setTokenStatus(result.statusCode);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || passwordError) {
      setPasswordError(true);
      setShowPasswordError(true);
      return;
    }

    const resp = await AuthClient.resetPassword(params.get("token") || "", password);
    setResetStatus(resp.statusCode);
  };

  const expiredPage = () => (
    <>
      {emailIsResent ? (
        <Trans>Click the link we sent to your email to reset your password.</Trans>
      ) : (
        <Trans>The password reset link that we sent you is no longer valid.</Trans>
      )}
      <SendNewLink
        setParentState={setEmailIsResent}
        variant="secondary"
        onClick={async () => {
          setEmailIsResent(await AuthClient.resendVerifyEmail());
        }}
      />
    </>
  );

  const invalidPage = () => {
    return (
      <>
        <Trans render="h4">Sorry, something went wrong with the password reset.</Trans>
        <LocaleLink className="button is-primary" to={account.forgotPassword}>
          <Trans>Request new link</Trans>
        </LocaleLink>
      </>
    );
  };

  const resetPasswordPage = () => (
    <>
      <Trans render="h4">Reset your password</Trans>
      <form className="input-group" onSubmit={handleSubmit}>
        <PasswordInput
          labelText={i18n._(t`Create a password`)}
          showPasswordRules={true}
          password={password}
          onChange={onChangePassword}
          error={passwordError}
          showError={showPasswordError}
          setError={setPasswordError}
        />
        <Button
          type="submit"
          variant="primary"
          size="small"
          labelText={i18n._(t`Reset password`)}
        />
      </form>
    </>
  );

  const successPage = () => (
    <>
      <Trans render="h4">Password reset successful</Trans>
      <Trans render="div">
        You will be redirected back to Who Owns What in
        {updateCountdown()}
        <span id="countdown"> {delaySeconds}</span> seconds
      </Trans>
      <Trans render="div">
        <a href={redirectUrl} style={{ color: "#242323" }}>
          Click to log in
        </a>{" "}
        if you are not redirected
      </Trans>
    </>
  );

  return (
    <Page title={i18n._(t`Reset your password`)}>
      <div className="ResetPasswordPage Page">
        <div className="page-container">
          <div className="text-center">
            {tokenStatus === undefined ? (
              <FixedLoadingLabel />
            ) : resetStatus === ResetStatusCode.Success ? (
              successPage()
            ) : tokenStatus === ResetStatusCode.Accepted ? (
              resetPasswordPage()
            ) : tokenStatus === ResetStatusCode.Expired ? (
              expiredPage()
            ) : (
              invalidPage()
            )}
          </div>
        </div>
        <LegalFooter />
      </div>
    </Page>
  );
});

export default ResetPasswordPage;
