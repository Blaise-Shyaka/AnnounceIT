const userExistsMessage = {
  status: 'error',
  error: 'The account already exists. Proceed with sign in instead'
};

const signupInstead = {
  status: 'error',
  error: 'User does not exist. Signup instead'
};

const incorrectCredentials = {
  status: 'error',
  error: 'Incorrect email or password'
};

module.exports = { userExistsMessage, signupInstead, incorrectCredentials };
