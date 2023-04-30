export type SignIn = {
  email: string;
  password: string;
};

export type SignUp = {
  email: string;
  password: string;
  confirmPassword: string;
  acceptCGU: boolean;
};

export type SignUpValidation = {
  token: string;
};

export type ForgotPassword = {
  email: string;
};

export type ResetPassword = {
  token?: string;
  password: string;
  confirmPassword: string;
};
