'use strict';

class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }
}

class Auth {
  static async login(user) {
    console.log('Authentication logic', user);
  }

  static async register(user) {
    console.log('Registration logic', user);
  }
}

// Usage

const main = async () => {
  const user = new User('marcus', '123');
  console.log({ user });
  try {
    await Auth.login(user);
  } catch {
    await Auth.register(user);
  }
};

main();
