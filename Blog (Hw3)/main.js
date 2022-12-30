import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const posts = [
    {id:0, title:'Today is a good day',userId:'Alex', body:'Today is a good day. The sun is shining brightly in the sky, and the birds are chirping happily. The air is warm and inviting, and there is a sense of optimism in the air. I feel energetic and ready to tackle whatever tasks come my way. I am looking forward to spending time with friends and loved ones, and just enjoying the simple pleasures of life. Overall, today just feels like a positive, enjoyable day, and I am grateful for it.'},
    {id:1, title:'I heard you',userId:'Luna', body:'I heard you when you spoke to me earlier. Your words were clear and easy to understand, and I paid close attention to what you were saying. I appreciate that you took the time to communicate with me and share your thoughts and ideas. It is important to me to listen carefully and actively engage in conversation, and I am glad that I was able to do so with you. Thank you for speaking up and making sure that I heard you.'}
];

const db = new DB("members.db");
db.query("CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, userId TEXT, password TEXT)");

let LoginId = -1;
let LOID = "";

const router = new Router();
router.get('/', list);
router.get('/post/new', add);
router.post('/create', create);
router.get('/SignUp', sign);
router.get('/login', login);
router.post('/build', build);
router.post('/check', check);

router.get('/json', (ctx) => {
    ctx.response.body = posts
  })

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

function query(sql) {
  let list = []
  for (const [id, userId, password] of db.query(sql)) {
    list.push({id, userId, password})
  }
  return list
}

async function sign(ctx) {
  ctx.response.body = await render.tosign();
}
  
async function login(ctx) {
  ctx.response.body = await render.tologin();
}

async function list(ctx) {
  ctx.response.body = await render.list(posts);
}

async function add(ctx) {
  ctx.response.body = await render.newPost();
}

async function create(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    const pairs = await body.value
    const post = {}
    for (const [key, value] of pairs) {
      post[key] = value
    }
    console.log('post=', post)
    const id = posts.push(post) - 1;
    post.created_at = new Date();
    post.id = id;
    post.userId = LOID
    ctx.response.redirect('/');
  }
}

async function build(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    const pairs = await body.value
    const member = {}
    let su = 0;
    for (const [key, value] of pairs) {
      if (value != "") {
        member[key] = value
        su++;
      }else {
        console.log('Empty value');
        ctx.response.redirect('/SignUp');
        break;
      }  
    }
    if (su == 2){
      db.query("INSERT INTO members (userId, password) VALUES (?, ?)", [member.userId, member.password]);
      console.log('create successul:',member)
      let all = db.query("SELECT * FROM members");
      console.log("members = ",all);
      ctx.response.redirect('/login');
    }
  }
}
  
async function check(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    const pairs = await body.value
    const member = {}
    let cct = false;
    for (const [key, value] of pairs) {
      member[key] = value
    }     
    for (const [id, userId, password] of db.query("SELECT id, userId, password FROM members")){
      let ct=0;
      if (member.userId === userId) ct++ ;
      if (member.password === password) ct++ ;
      if (ct == 2) {
        cct = true;
        LoginId = id
        LOID = member.userId 
        console.log('loginId : ', LoginId)
        console.log('LOID : ', LOID)
        console.log('check successul')
        ctx.response.redirect('/')
      }
    }
    if (cct != true){
      console.log('fail');
      ctx.response.redirect('/login');
    }
  }
}
  

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });