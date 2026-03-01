const tokenUrl = 'eyJzdWIiOiJjbW01eDRsZmcwMDAwOGtqNThlb3pyd3Y5IiwiZW1haWwiOiJhZG1pbkBjaG9saWxuYWZpcy5pZCIsInJvbGUiOiBTVVBFUl9BRE1JTiIsICJ1c2VybmFtZSI6ICJhZG1pbiIsICJpYXQiOiAxNjI1MjYwNTg5LCAiZXhwIjogMTYyNTM0Njk4OX0'; // base64url example
let base64 = tokenUrl.replace(/-/g, '+').replace(/_/g, '/');
let padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
console.log("Padded length:", padded.length, padded.length % 4 === 0);
try {
  const jsonString = decodeURIComponent(
    Array.from(atob(padded))
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  console.log("Success:", jsonString);
} catch (e) {
  console.log("Error:", e.message);
}
