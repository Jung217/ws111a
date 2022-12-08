export function layout(title, content) {
    return `
    <html>
    <head>
      <title>${title}</title>
      <style>
        body {
          padding: 80px;
          font: 16px Helvetica, Arial;
          border: 3px lightslategray solid;
          border-radius: 30px;
        }
        #mp{
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 70px;
        }
        h1 {
          font-size: 2.5em;
        }
    
        h2 {
          font-size: 1.2em;
        }
    
        #posts {
          margin: 0;
          padding: 0;
        }
    
        #posts li {
          margin: 40px 0;
          padding: 0;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          list-style: none;
        }
    
        #posts li:last-child {
          border-bottom: none;
        }
    
        textarea {
          width: 500px;
          height: 300px;
        }
    
        input[type=text],
        textarea {
          border: 1px solid #eee;
          border-top-color: #ddd;
          border-left-color: #ddd;
          border-radius: 2px;
          padding: 15px;
          font-size: .8em;
        }
    
        input[type=text] {
          width: 500px;
        }

        @keyframes anforh2 {
            0%{color: crimson;}
            16%{color: orange;}
            33%{color: yellow}
            48%{color: green;}
            67%{color:blue}
            83%{color: darkblue}
            100%{color:purple}
        }

        .h1t{
            animation-name: anforh2;
            animation-duration: 5s;
            animation-iteration-count: infinite;
        }
      </style>
    </head>
    <body>
      <section id="content">
        ${content}
      </section>
    </body>
    </html>
    `
  }
  
  export function list(posts) {
    let list = []
    for (let post of posts) {
      list.push(`
      <li>
        <h2>${ post.title }</h2>
        <h4>${ post.time}</h4>
        <p><a href="/post/${post.id}">Schedule details</a></p>
      </li>
      `)
    }
    let content = `
    <h1 class="h1t">Schedules</h1>
    <p>You have <strong>${posts.length}</strong> schedules!</p>
    <p>To create a new schedule, click the button at bottom right.</p>
    <ul id="posts">
      ${list.join('\n')}
    </ul>
    <a href="/post/new"><img id="mp" style="border-radius: 50%;" alt="Avatar" src="https://cdn.icon-icons.com/icons2/902/PNG/512/plus_icon-icons.com_69322.png"></a>
    `
    return layout('Posts', content)
  }
  
  export function newPost() {
    return layout('New Schedule', `
    <h1 class="h1t">New Schedule</h1>
    <p>Create a new schedule.</p>
    <form action="/post" method="post">
      <p><input type="text" placeholder="Title" name="title"></p>
      <p><input type="date" name="time"></p>
      <p><textarea placeholder="Details" name="body"></textarea></p>
      <p><input type="submit" value="Create"></p>
    </form>
    `)
  }
  
  export function show(post) {
    return layout(post.title, `
      <h1>${post.title}</h1>
      <h2>${post.time}</h2>
      <pre>${post.body}</pre>
      <a href="/post/new"><img id="mp" style="border-radius: 50%;" alt="Avatar" src="https://cdn.icon-icons.com/icons2/902/PNG/512/plus_icon-icons.com_69322.png"></a>
    `)
  }