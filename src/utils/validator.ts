export const validateFullName = (fullName: string) => {
  return fullName.length >= 3;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email.length > 0 && emailRegex.test(email);
};

export const validateConfirmEmail = (email: string, confirmEmail: string) => {
  return email === confirmEmail;
};
