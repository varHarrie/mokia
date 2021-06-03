export default ({ isServer }) => {
  if (!isServer) {
    window.global = window.global || window;
    window.process = window.process || { env: {} };

    window.mokia = require('mokia');
    window.producer = require('@mokia/producer');
    window.decorator = require('@mokia/decorator');

    console.log('mokia:', window.mokia);
    console.log('producer:', window.producer);
    console.log('decorator:', window.decorator);
  }
};
