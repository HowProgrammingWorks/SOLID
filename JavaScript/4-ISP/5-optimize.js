'use strict';

const fs = require('node:fs');
const { Console } = require('node:console');

class Message {
  constructor(to, subject, text) {
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.files = [];
  }

  async attach({ filename, readable }) {
    const data = [];
    for await (const chunk of readable) data.push(chunk);
    const content = Buffer.concat(data);
    this.files.push({ filename, content });
  }
}

// Imagine this is import from separate module

const mailService = {
  async send(message) {
    console.log('Send message', message);
    throw new Error('Nullae electronicae epistulae in Roma');
  }
};

// Imagine this is import from separate module

const loggingService = (() => {
  const stdout = fs.createWriteStream('./mail.log');
  const Logger = class extends Console {
    warn(data, ...args) {
      let error = data;
      if (data instanceof Error) {
        const msg = 'Message can not be sent';
        error = new Error(msg, { cause: data });
      }
      super.warn(error, ...args);
    }
  };
  return new Logger({ stdout });
})();

// Usage

const main = async () => {
  const console = loggingService;
  const subj = 'De virtutem animi';
  const text = [
    'Lucio Verissimo Fratri,',
    'Hodie cogitavi de iis quae mihi et tibi sunt communia...',
  ];
  const data = text.join('\n');
  const message = new Message('Lucius Verus', subj, data);
  const filename = './1-mixed.js';
  console.log('Attach file:', filename);
  const readable = fs.createReadStream(filename);
  const file = { filename, readable };
  await message.attach(file);
  try {
    await mailService.send(message);
  } catch (error) {
    console.warn(error);
  }
};

main();
