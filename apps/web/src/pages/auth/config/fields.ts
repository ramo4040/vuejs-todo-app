export interface FormField {
  name: string
  label: string
  type: string
  placeholder: string
}

// Field configurations for different forms
export const loginFields: FormField[] = [
  {
    name: 'email',
    label: 'E-mail address',
    type: 'email',
    placeholder: 'Enter your e-mail address...',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password...',
  },
]

export const forgotPasswordFields: FormField[] = [
  {
    name: 'email',
    label: 'E-mail address',
    type: 'email',
    placeholder: 'Enter your e-mail address...',
  },
]

export const resetPasswordFields: FormField[] = [
  {
    name: 'password',
    label: 'New Password',
    type: 'password',
    placeholder: 'Enter your new password...',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Re-enter your password...',
  },
]

export const registerStep1Fields: FormField[] = [
  {
    name: 'full_name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'Enter phone number',
  },
]

export const registerStep2Fields: FormField[] = [
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
  {
    name: 'password_confirmation',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm your password',
  },
]
