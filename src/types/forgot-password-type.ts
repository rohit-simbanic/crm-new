export type ForgotPassword = {
  user_name: string;
};

export type ForgotResetPassword = {
  password: string;
  confirm_password: string;
};
