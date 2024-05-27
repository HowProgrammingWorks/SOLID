'use strict';

const fs = require('node:fs');

class Message {
  constructor(to, subject, text) {
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.files = [];
  }

  async attach(filename) {
    console.log('Attach file:', filename);
    const readable = fs.createReadStream(filename);
    const data = [];
    for await (const chunk of readable) data.push(chunk);
    const content = Buffer.concat(data);
    this.files.push({ filename, content });
  }
}

class MailService {
  static async send(message) {
    console.log('Send message', message);
    throw new Error('Nullae electronicae epistulae in Roma');
  }
}

class LoggingService {
  static async warn(cause) {
    const error = new Error('Message can not be sent', { cause });
    console.log('Message', error);
  }
}

// Usage

const main = async () => {
  const subj = 'De virtutem animi';
  const text = [
    'Lucio Verissimo Fratri,',
    'Hodie cogitavi de iis quae mihi et tibi sunt communia...',
  ];
  const data = text.join('\n');
  const message = new Message('Lucius Verus', subj, data);
  await message.attach('./1-mixed.js');
  try {
    await MailService.send(message);
  } catch (error) {
    await LoggingService.warn(error);
  }
};

main();
