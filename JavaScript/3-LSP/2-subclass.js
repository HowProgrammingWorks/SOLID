'use strict';

// Object <- EventEmitter <- Stream <- Readable

const stream = require('node:stream');

const { Readable } = stream;
console.log(Readable.name);

const Stream = Object.getPrototypeOf(Readable);
console.log(Stream.name);

const EventEmitter = Object.getPrototypeOf(Stream);
console.log(EventEmitter.name);

// Accept EventEmitter or derived classes

const interceptErrors = (eventEmitter) => {
  if (!(eventEmitter instanceof EventEmitter)) {
    throw new Error('Expected EventEmitter or derived');
  }
  eventEmitter.on('error', (error) => {
    console.error(error.message);
  });
};

// Usage

const randomStream = new Readable({
  read(size) {
    const data = new Array(size);
    for (let i = 0; i < size; i++) {
      data[i] = Math.floor(Math.random() * 256);
    }
    this.push(Buffer.from(data));
    throw new Error('Custom error');
  }
});

interceptErrors(randomStream);

const signal = AbortSignal.timeout(1000);
stream.addAbortSignal(signal, randomStream);

setTimeout(() => {
  const data = randomStream.read(10);
  console.log({ data });
}, 100);
