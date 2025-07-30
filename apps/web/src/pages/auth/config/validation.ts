import { configure } from 'vee-validate'

export const authValidationConfig = () => {
  configure({
    validateOnInput: false,
    validateOnBlur: false,
  })
}
