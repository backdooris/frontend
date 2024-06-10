/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Button, ButtonProps } from "@mui/joy";
import { AnonymousIcon, GoogleIcon } from "../../icons";

export function LoginButton(props: LoginButtonProps): JSX.Element {
  const { signInMethod, ...other } = props;

  const icon =
    signInMethod === "google.com" ? (
      <GoogleIcon />
    ) : signInMethod === "anonymous" ? (
      <AnonymousIcon />
    ) : null;

  return (
    <Button
      startDecorator={icon}
      variant="outlined"
      onClick={() => {}}
      loading={true}
      children={
        signInMethod === "google.com"
          ? "Continue via Google"
          : signInMethod === "anonymous"
            ? "Continue as anonymous"
            : "unknown"
      }
      {...other}
    />
  );
}

export type LoginButtonProps = Omit<
  ButtonProps<
    "button",
    {
      signInMethod: "google.com" | "anonymous";
    }
  >,
  "children"
>;
