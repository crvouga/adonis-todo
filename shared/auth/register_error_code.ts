const REGISTER_ERROR_CODE = {
  EMAIL_TAKEN: 'EMAIL_TAKEN',
  PASSWORD_MISMATCH: 'PASSWORD_MISMATCH',
  UNKNOWN: 'UNKNOWN',
} as const

export type RegisterErrorCode = keyof typeof REGISTER_ERROR_CODE

function toMessage(code: RegisterErrorCode): string {
  switch (code) {
    case 'EMAIL_TAKEN':
      return 'An account with this email already exists. Please use a different email or try logging in.'
    case 'PASSWORD_MISMATCH':
      return 'Passwords do not match. Please make sure both passwords are identical.'
    case 'UNKNOWN':
      return 'Sorry, we encountered an error while creating your account. Please try again later or contact support if the problem persists.'
    default:
      return 'Unknown error'
  }
}

export const RegisterErrorCode = {
  REGISTER_ERROR_CODE,
  toMessage,
}
