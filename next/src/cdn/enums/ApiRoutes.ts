enum ApiRoutes {
  AUTH_SIGN_IN = '/auth/signIn',
  AUTH_SIGN_UP = '/auth/signUp',
  AUTH_SIGN_UP_VALIDATION = '/auth/signUpValidation',
  AUTH_RE_SEND_SIGN_UP_VALIDATION_EMAIL = '/auth/reSendSignUpValidationEmail',
  AUTH_FORGOT_PASSWORD = '/auth/forgotPassword',
  AUTH_RESET_PASSWORD = '/auth/resetPassword',
  AUTH_REFRESH_TOKEN = '/auth/refreshToken',
  PROFILE_UPDATE_PASSWORD = '/profile/updatePassword',
  ORGANIZATIONS = '/organizations',
  ANIMALS = '/animals',
  ANIMALS_ORG = '/animals/organization',
  ANIMAL_TEMPERS_ORG = '/animal_tempers/organization',
}

export default ApiRoutes;
