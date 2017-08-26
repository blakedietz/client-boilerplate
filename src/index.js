import react from 'react';
import redux from 'redux';
import './app.css';

import printMe from './print.js';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = 'Testing'

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);

  return element;
}

if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe Module!');
    printMe();
  });
}

document.body.appendChild(component());
