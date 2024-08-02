const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validateOnlyLetters = (str) => {
  const re = /^[A-Za-z]+$/;
  return re.test(String(str));
};

const validateOnlyNumbers = (str) => {
  const re = /^[0-9]+$/;
  return re.test(String(str));
};

const validateLettersAndNumbers = (str) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
  return re.test(String(str));
};

const validateLettersNumbersSpecialChars = (str) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  return re.test(String(str));
};

const validateStrongPassword = (str) => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(String(str));
};

export default {
  validateEmail,
  validateOnlyLetters,
  validateOnlyNumbers,
  validateLettersAndNumbers,
  validateLettersNumbersSpecialChars,
  validateStrongPassword,
};
