import toBase64 from '../helpers/toBase64';
import fromBase64 from '../helpers/fromBase64';

import serviceAccount from '../__sensitive__/chatodron-firebase-adminsdk-4u8aq-cf046722d6.json';

const base64Data = toBase64(JSON.stringify(serviceAccount));
console.log('Base64: ', base64Data);
console.log('Original: ', fromBase64(base64Data));

console.log('======');

const fromEnvVariable = process.env.CHATODRON_SERVICE_ACCOUNT;
if (fromEnvVariable) {
  console.log('From env variable', JSON.parse(fromBase64(fromEnvVariable)));
} else {
  console.error('Did not find the value in environment variable');
}
