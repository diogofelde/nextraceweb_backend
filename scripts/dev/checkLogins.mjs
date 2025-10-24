import fetch from 'node-fetch';

async function postLogin(username, password) {
  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const text = await res.text();
  let body;
  try { body = JSON.parse(text); } catch { body = text; }
  return { status: res.status, body };
}

(async () => {
  console.log('== testuser ==');
  console.log(await postLogin('testuser', 'Test@123'));
  console.log('\n== admin ==');
  console.log(await postLogin('admin', 'Admin@123'));
})();