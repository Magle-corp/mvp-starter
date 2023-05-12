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
  ORGANIZATION_TEMPER = '/organization_animal_tempers',
  ANIMALS = '/animals',
  ANIMALS_ORG = '/animals/organization',
  ANIMAL_TEMPERS_ORG = '/animal_tempers/organization',
  ANIMAL_RACES_ORG = '/animal_races/organization',
  ANIMAL_TYPES_ORG = '/animal_types/organization',
  ANIMAL_SEXES = '/animal_sexes',
}

export default ApiRoutes;
