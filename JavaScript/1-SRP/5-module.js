'use strict';

class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }
}

const login = (user) => {
  console.log('Authentication logic', user);
};

const register = (user) => {
  console.log('Registration logic', user);
};

const auth = { login, register };
// module.exports = auth;

// Usage

const main = async () => {
  const user = new User('marcus', '123');
  console.log({ user });
  try {
    await auth.login(user);
  } catch {
    await auth.register(user);
  }
};

main();
