import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

function page(title, body) {
  return `<html>
  <head>
  <meta charset="UTF-8"/>
  <meta name="author" content="簡志融"/>
  <title>
  ${title}
  </title>
  <style>
  body
  {
    text-align:center;
    border: 3px lightslategray solid;
    border-radius: 30px;
    padding:15px 10px;
  }
  </style>
  </head>
  <body>
  ${body}
  </body>
  </html>`
}

app.use((ctx) => {
  let pathname = ctx.request.url.pathname
  if (pathname.startsWith("/login")) {
    ctx.response.body = page('Login',
    `
    <div>
    <h1>Login</h1>
    <hr/>
    <p><input type="text"placeholder="User ID"/></p>
    <p><input type="password"placeholder="Password"/></p>
    <button style="color: green;" onclick="window.location.href='http://127.0.0.1:8000'">Sumbit</button>
    </div>
    `)
  } else {
    ctx.response.body = page('Home',
    `
      <h1>This is a web site with home and login pages.</h1>
      <h2>By 資工二 111010501 簡志融</h2>
      <button style="color: green;" onclick="window.location.href='http://127.0.0.1:8000/login'">Login</button>
    `)
  }
});

console.log('Start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });
