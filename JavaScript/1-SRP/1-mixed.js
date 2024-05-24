'use strict';

class User {
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }

  async login() {
    console.log('Authentication logic', this);
  }

  async register() {
    console.log('Registration logic', this);
  }
}

// Usage

const main = async () => {
  const user = new User('marcus', '123');
  console.log({ user });
  try {
    await user.login();
  } catch {
    await user.register();
  }
};

main();
