'use strict';

class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }
}

class Auth {
  async login(user) {
    console.log('Authentication logic', user);
  }

  async register(user) {
    console.log('Registration logic', user);
  }
}

// Usage

const main = async () => {
  const auth = new Auth();
  const user = new User('marcus', '123');
  console.log({ user });
  try {
    await auth.login(user);
  } catch {
    await auth.register(user);
  }
};

main();
