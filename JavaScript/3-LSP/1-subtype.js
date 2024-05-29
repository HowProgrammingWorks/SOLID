'use strict';

// Object <- Function <- AsyncFunction

const fn = () => {
  console.log('Sync function');
};

const asyncFn = async () => {
  console.log('Async function');
};

//setTimeout({}, 500);
setTimeout(fn, 600);
setTimeout(asyncFn, 700);
