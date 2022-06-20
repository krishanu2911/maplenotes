const emailRegex = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
const validateForm = (name, value) => {
  switch (name) {
    case "email":
      return !emailRegex.test(value);
    case "password":
      return !value.length > 6;
    default:
      return true;
  }
};
export { validateForm };
