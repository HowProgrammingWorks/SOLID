'use strict';

class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }
}

const login = async (user) => {
  console.log('Authentication logic', user);
};

const register = async (user) => {
  console.log('Registration logic', user);
};

// Usage

const main = async () => {
  const user = new User('marcus', '123');
  console.log({ user });
  try {
    await login(user);
  } catch {
    await register(user);
  }
};

main();
