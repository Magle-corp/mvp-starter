enum ApiRoutes {
  AUTH_SIGN_IN = '/auth/sign_in',
  AUTH_SIGN_UP = '/auth/sign_up',
  AUTH_SIGN_UP_VALIDATION = '/auth/sign_up_validation',
  AUTH_RE_SEND_SIGN_UP_VALIDATION_EMAIL = '/auth/re_send_sign_up_validation_email',
  AUTH_FORGOT_PASSWORD = '/auth/forgot_password',
  AUTH_RESET_PASSWORD = '/auth/reset_password',
  AUTH_REFRESH_TOKEN = '/auth/refresh_token',
  PROFILE_UPDATE_PASSWORD = '/profile/update_password',
  ORGANIZATIONS = '/organizations',
  ORGANIZATION_TEMPERS = '/organization_animal_tempers',
  ORGANIZATION_TYPES = '/organization_animal_types',
  ORGANIZATION_RACES = '/organization_animal_races',
  ANIMALS = '/animals',
  ANIMALS_ORG = '/animals/organization',
  ANIMAL_TEMPERS_ORG = '/animal_tempers/organization',
  ANIMAL_RACES_ORG = '/animal_races/organization',
  ANIMAL_TYPES_ORG = '/animal_types/organization',
  ANIMAL_SEXES = '/animal_sexes',
  MEDIA_OBJECTS = '/media_objects',
}

export default ApiRoutes;
