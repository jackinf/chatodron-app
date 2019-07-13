const zlib = require('zlib');

const serviceAccount = require('../__sensitive__/chatodron-firebase-adminsdk-4u8aq-cf046722d6.json');
// const input = 'Hellow world';
const input = JSON.stringify(serviceAccount);

const deflated = zlib.deflateSync(input).toString('base64');
const inflated = zlib.inflateSync(new Buffer(deflated, 'base64')).toString();

console.log(deflated);
console.log(inflated);