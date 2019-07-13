export default function fromBase64(base64Data: string): string {
  return new Buffer(base64Data, 'base64').toString('utf8');
}