const jwt = require('jsonwebtoken');
const token = jwt.sign({ sub: 1 }, "secret", { expiresIn: '8h' });
const base64url = token.split('.')[1];
const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
const payload = JSON.parse(Buffer.from(padded, 'base64').toString('utf8'));
console.log("Token:", token);
console.log("Payload:", payload);
console.log("Is exp a number?", typeof payload.exp === 'number');
