export function layout(title, content) {
  return `
  <html>
  <head>
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>${title}</title>
    <style>
      body {
        padding: 80px;
        font: 16px Helvetica, Arial;
        border: 3px #3E6B7E solid;
        border-radius: 30px;
      }
      #mp{
        position: fixed;
        bottom: 40px;
        right: 30px;
        width: 80px;
      }
      #heart{
        position: relative;
        bottom: 775px;
        left: 700px;
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

      input[type=text],[type=password],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 3px;
        padding: 15px;
        font-size: .8em;
        width: 400px;
      }

      input[type=text]{
        position: relative;
        top: 30px;
      }

      input[type=password]{
        position: relative;
        top: 50px;
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
      .holder {
        width: 600px;
        height: 500px;
        background: #efefef;
        padding: 30px 10px;
        box-sizing: border-box;
        margin: 0 auto;
        margin-top: 20px;  
        text-align: center;
        border-radius: 10px;
      }

      .SLB{
        width: 300px;
        height: 60px;
        text-align: center;
        background: linear-gradient(to bottom, #4eb5e5 0%,#389ed5 100%); /* W3C */
        border: none;
        border-radius: 5px;
        position: relative;
        top: 40px;
        border-bottom: 4px solid #2b8bc6;
        color: #fbfbfb;
        font-weight: 600;
        font-family: 'Open Sans', sans-serif;
        text-shadow: 1px 1px 1px rgba(0,0,0,.4);
        font-size: 15px;
        text-align: left;
        text-indent: 5px;
        box-shadow: 0px 3px 0px 0px rgba(0,0,0,.2);
        cursor: pointer;

        display: block;
        margin: 0 auto;
        margin-bottom: 20px;
      }

      .SLB:active {
        box-shadow: 0px 2px 0px 0px rgba(0,0,0,.2);
        top: 41px;
      }
    </style>
  </head>
  <body>
    <a id="mp" href="/SignUp"><img style="width: 75px;" src="https://pic.onlinewebfonts.com/svg/img_411076.png"/></a>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `
}

export function list(posts) {
  let list = []
  let ID = 0;
  function getRandomInt(max) {
    ID = Math.floor(Math.random() * max);
    return ID;
  }
  getRandomInt(12);
  console.log(ID.toString());
  for (let post of posts) {
    list.push(`
    <li>
      <img style="height:125px; float:right" src="${ post.pic }"/>
      <h2>${ post.title }</h2>
      <h4>${ post.time}</h4>
      <p><a href="/post/${post.id}">Details</a></p>
    </li>
    `)
  }
  let content = `
  <h1 class="h1t">風獅爺園地</h1>
  <p>這個網頁總共展示<strong>${posts.length}</strong>隻風獅爺 !</p>
  <p>This website totally shows <strong>${posts.length}</strong> Wind Lion Gods</p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  <button id="lucky" style="width: 200px; height: 30px;" onclick="location.href='/post/${ID}'">尋找幸運風獅爺</button>
 `
  return layout('Show', content)
}

export function tosign() {
  return layout('Sign up',`
  <div class="holder">
  <h1 class="h1t">Sign up</h1>
  <hr/>
  <form action="/create" method="post">
    <p><input type="text" placeholder="User ID" name="userId"/></p>
    <p><input type="password" placeholder="Password" name="password"/></p>
    <br/>
    <p><input class="SLB" type="submit" value="Sign up"></p>
  </form>
  <a style="test-aligan: center; position: relative; top: 145px;" href="/login">Login</a>
  </div>
  `)
}

export function tologin() {
  return layout('Login',`
  <div class="holder">
  <h1 class="h1t">Login</h1>
  <hr/>
  <form action="/check" method="post">
    <p><input type="text" placeholder="User ID" name="userId"/></p>
    <p><input type="password" placeholder="Password" name="password"/></p>
    <br/>
    <p><input class="SLB" type="submit" value="Login"></p>
  </form>
  </div>
  `)
}

export function shome() {
  return layout('Home', `
  <h1 class="h1t">風獅爺園地</h1>
  <p style="display:inline;">大學來到金門，了解此特殊文化，此網站因蘊而生</p>
  <img style="width:700px; float: right;" src="https://live.staticflickr.com/65535/52054157046_a1701c3386_b.jpg"/>
  <p><a href="/show">See More</a></p>
  <hr style="width:625px;" />
  <p><strong>Contact Author</strong></p><a href="mailto:alex24922665@gamil.com"><img style="border-radius: 50%;" alt="Avatar" src="https://live.staticflickr.com/65535/52056356816_0b119f47d3.jpg" width="80"></a>
  `)
}

export function show(post) {
  return layout(post.title, `
    <h1>${post.title}</h1>
    <h1>${post.time}</h1>
    <pre>${post.body}</pre>
    <img style="width:500px" src='${post.pic}'/>
    <img id="heart" src="https://www.iconpacks.net/icons/1/free-heart-icon-492-thumb.png" width="100">
    <script>
      var myImage = document.getElementById('heart');
      myImage.onclick = function(){
        let mySrc = myImage.getAttribute('src');
        if(mySrc === 'https://www.iconpacks.net/icons/1/free-heart-icon-492-thumb.png'){
          myImage.setAttribute('src', 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/heart-icon.png');
          window.alert("你收藏了這尊風獅爺");
        }
        if(mySrc === 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/heart-icon.png'){
          myImage.setAttribute('src', 'https://www.iconpacks.net/icons/1/free-heart-icon-492-thumb.png');
          window.alert("你取消收藏了這尊風獅爺");
        }
      }
    </script>
  `)
}
