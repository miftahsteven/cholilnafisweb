const tokenList = [
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbW01eDRsZmcwMDAwOGtqNThlb3pyd3Y5IiwiZW1haWwiOiJhZG1pbkBjaG9saWxuYWZpcy5pZCIsInJvbGUiOiJTVVBFUl9BRE1JTiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3NzIzMzM5MzQsImV4cCI6MTc3MjM2MjczNH0.HxgqX7I5N4s',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbW01eDRsZmcwMDAwOGtqNThlb3pyd3Y5IiwiZW1haWwiOiJhZG1pbkBjaG9saWxuYWZpcy5pZCIsInJvbGUiOiJTVVBFUl9BRE1JTiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3NzIzMzQ2MjcsImV4cCI6MTc3MjM2MzQyN30.HxgqX7I5N4s'
];

tokenList.forEach(token => {
  const base64url = token.split('.')[1];
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
  
  try {
    const jsonString = decodeURIComponent(
      Array.from(atob(padded))
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    console.log("Success for atob:", JSON.parse(jsonString));
  } catch (err) {
    console.error("atob error:", err.message);
  }
});
