export default function toBase64(value: string) {
  return new Buffer(JSON.stringify(value)).toString('base64');
}