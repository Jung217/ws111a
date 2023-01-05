import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("data.db");
db.query("CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, userId TEXT, password TEXT, id0 TEXT, id1 TEXT, id2 TEXT, id3 TEXT, id4 TEXT, id5 TEXT, id6 TEXT, id7 TEXT, id8 TEXT, id9 TEXT, id10 TEXT, id11 TEXT)");
db.query("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, uid TEXT, wg TEXT, content TEXT)");

let LoginId = -1;
let LOID = "匿名";

const posts = [
  {id:0, title:'安和新莊 風獅爺', time: "2005", body:'獅(深):42(cm)  獅(面寬):37(cm)  獅(高):104(cm)  獅(頭):34(cm)', loca:'金城鎮', pic:'https://trfc.tw/culture/block_evil/fsx/KinmenCounty/jincheng/fsx085/img-8152.jpg/@@images/image/large'},
  {id:1, title:'夏墅 多拉A夢風獅爺', time: "1900", body:'獅(深):86(cm)  獅(面寬):78(cm)  獅(高):135(cm)  獅(頭):57(cm)', loca:'金城鎮', pic:'https://trfc.tw/culture/block_evil/fsx/KinmenCounty/jincheng/fsx087/img-7327.jpg/@@images/image/large'},
  {id:2, title:'泗湖 底座有白雞風獅爺', time: "1971", body:'獅(深):97(cm)  獅(面寬):67(cm)  獅(高):188(cm)  獅(頭):60(cm)', loca:'金城鎮', pic:'https://trfc.tw/culture/block_evil/fsx/KinmenCounty/jincheng/fsx088/img-7281.jpg/@@images/image/large'},
  {id:3, title:'歐厝 滿身彈痕的風獅爺', time: "1850", body:'獅(深):68(cm)  獅(面寬):58(cm)  獅(高):145(cm)  獅(頭):56(cm)', loca:'金城鎮', pic:'https://trfc.tw/culture/block_evil/fsx/KinmenCounty/jincheng/fsx089/img-7249.jpg/@@images/image/large'},
  {id:4, title:'官裏 「犰狳」風獅爺', time: "2008", body:'獅(深):84(cm)  獅(面寬):74(cm)  獅(高):146(cm)  獅(頭):48(cm)', loca:'金城鎮', pic:'https://trfc.tw/culture/block_evil/fsx/KinmenCounty/jincheng/fsx090/img-7296.jpg/@@images/image/large'},
  {id:5, title:'小古崗 有仇必報風獅爺', time: "1785", body:'獅(深):43(cm)  獅(面寬):45(cm)  獅(高):172(cm)  獅(頭):45(cm)', loca:'金城鎮', pic:'https://trfc.tw/culture/block_evil/fsx/KinmenCounty/jincheng/fsx091/img-7229.jpg/@@images/image/large'},
  {id:6, title:'官路邊 風獅爺', time: "2004", body:'獅(深):35(cm)  獅(面寬):34(cm)  獅(高):85(cm)  獅(頭):29(cm)', loca:'金城鎮', pic:'https://trfc.tw/culture/block_evil/fsx/KinmenCounty/jincheng/fsx092/img-7205.jpg/@@images/image/large'},
  {id:7, title:'舊金城 北門外新風獅爺', time: "1999", body:'獅(深):77(cm)  獅(面寬):80(cm)  獅(高):172(cm)  獅(頭):80(cm)', loca:'金城鎮', pic:'https://trfc.tw/culture/block_evil/fsx/KinmenCounty/jincheng/fsx093/img-0818.jpg/@@images/image/large'},
  {id:8, title:'舊金城 金門最老風獅爺', time: "1387", body:'獅(深):21(cm)  獅(面寬):24(cm)  獅(高):28(cm)  獅(頭):15(cm)', loca:'金城鎮', pic:'https://trfc.tw/culture/block_evil/fsx/KinmenCounty/jincheng/fsx094/img-0824.jpg/@@images/image/large'},
  {id:9, title:'前水頭 無法識別牆垣風獅爺', time: "unknown", body:'獅(面寬):16(cm)  獅(高):24(cm)  獅(頭):16(cm)', loca:'金城鎮', pic:'https://trfc.tw/culture/block_evil/fsx/KinmenCounty/jincheng/fsx095/img-6299.jpg/@@images/image/large'},
  {id:10, title:'前水頭 泥塑獅首', time: "unknown", body:'獅(深):4(cm)   獅(高):15(cm)  獅(頭):14(cm)', loca:'金城鎮', pic:'https://trfc.tw/culture/block_evil/fsx/KinmenCounty/jincheng/fsx096/img-7419.jpg/@@images/image/large'},
  {id:11, title:'前水頭 擋煞牆垣石獅', time: "unknown", body:'獅(面寬):22(cm)  獅(高):17(cm)', loca:'金城鎮', pic:'https://trfc.tw/culture/block_evil/fsx/KinmenCounty/jincheng/fsx097/img-5234.jpg/@@images/image/large'}
];

const router = new Router();
router.get('/', home);
router.get('/show', list);
router.get('/post/:id', show);
router.get('/SignUp', sign);
router.get('/login', login);
router.get('/post/new', add);
router.get('/comment', lcomment)
router.get('/comment/new', ncomment)
router.post('/create', create);
router.post('/check', check);
router.post('/comment/new/nc', nc)

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

function query(sql) {
  let list = []
  for (const [id, uid, wg, content] of db.query(sql)) {
    list.push({id, uid, wg, content})
  }
  return list
}

async function lcomment(ctx) {
  let comments = query("SELECT id, uid, wg, content FROM comments")
  console.log('list:comments=', comments)
  ctx.response.body = await render.listC(comments);
}

async function ncomment(ctx) {
  ctx.response.body = await render.newCmt();
}

async function nc(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    const pairs = await body.value
    const post = {}
    for (const [key, value] of pairs) {
      post[key] = value
    }
    console.log('create successul')
    db.query("INSERT INTO comments (uid, wg, content) VALUES (?, ?, ?)", [LOID, render.getwg(), post.content]);
    ctx.response.redirect('/comment');
  }
}

export function togetid() {
  let n = LoginId
  return n
}

export function togetLOID() {
  let n = LOID
  return n
}

async function home(ctx) {
  ctx.response.body = await render.shome();
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

async function show(ctx) {
  const id = ctx.params.id;
  const post = posts[id];
  if (!post) ctx.throw(404, 'invalid post id');
  ctx.response.body = await render.show(post);
}

async function create(ctx) {
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
      db.query("INSERT INTO members (userId, password, id0, id1, id2, id3, id4, id5, id6, id7, id8, id9, id10, id11) VALUES (?, ?, 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n', 'n')", [member.userId, member.password]);
      console.log('create successul:',member)
      let all = db.query("SELECT * FROM members");
      console.log("members = ",all);
      //db.query("UPDATE members SET id0 = 'Y' WHERE ID = 5");
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

export function update(Mid, Gid) {
  let cd = '' //UPDATE members SET id0 = 'Y' WHERE ID = 5
  let re = 0
  if (Gid === 0){
    for (const [id, id0] of db.query("SELECT id, id0 FROM members")) {
      if (Mid === id){
        if (id0 == 'n'){
          cd = "UPDATE members SET id0 = 'y' WHERE ID = " + Mid.toString() //db.query(`UPDATE members SET id0 = "y" WHERE ID = ${Mid}`)
          re = 1
        } 
        if (id0 == 'y') cd = "UPDATE members SET id0 = 'n' WHERE ID = " + Mid.toString()
        db.query(cd)    
      }
    }
  }
  if (Gid == 1){
    for (const [id, id1] of db.query("SELECT id, id0 FROM members")) {
      if (Mid === id){
        if (id1 == 'n'){
          cd = 'UPDATE members SET id0 = "y" WHERE ID = ' + Mid.toString()
          re = 1
        } 
        if (id1 == 'y') cd = 'UPDATE members SET id0 = "n" WHERE ID = ' + Mid.toString()
        db.query(cd)    
      }
    }
  }
  if (Gid == 2){
    for (const [id, id2] of db.query("SELECT id, id0 FROM members")) {
      if (Mid === id){
        if (id2 == 'n'){
          cd = 'UPDATE members SET id0 = "y" WHERE ID = ' + Mid.toString()
          re = 1
        }
        if (id2 == 'y') cd = 'UPDATE members SET id0 = "n" WHERE ID = ' + Mid.toString()
        db.query(cd)    
      }
    }
  }
  if (Gid == 3){
    for (const [id, id3] of db.query("SELECT id, id0 FROM members")) {
      if (Mid === id){
        if (id3 == 'n'){
          cd = 'UPDATE members SET id0 = "y" WHERE ID = ' + Mid.toString()
          re = 1
        }
        if (id3 == 'y') cd = 'UPDATE members SET id0 = "n" WHERE ID = ' + Mid.toString()
        db.query(cd)    
      }
    }
  }
  if (Gid == 4){
    for (const [id, id4] of db.query("SELECT id, id0 FROM members")) {
      if (Mid === id){
        if (id4 == 'n'){
          cd = 'UPDATE members SET id0 = "y" WHERE ID = ' + Mid.toString()
          re = 1
        }
        if (id4 == 'y') cd = 'UPDATE members SET id0 = "n" WHERE ID = ' + Mid.toString()
        db.query(cd)    
      }
    }
  }
  if (Gid == 5){
    for (const [id, id5] of db.query("SELECT id, id0 FROM members")) {
      if (Mid === id){
        if (id5 == 'n'){
          cd = 'UPDATE members SET id0 = "y" WHERE ID = ' + Mid.toString()
          re = 1
        }
        if (id5 == 'y') cd = 'UPDATE members SET id0 = "n" WHERE ID = ' + Mid.toString()
        db.query(cd)    
      }
    }
  }
  if (Gid == 6){
    for (const [id, id6] of db.query("SELECT id, id0 FROM members")) {
      if (Mid === id){
        if (id6 == 'n'){
          cd = 'UPDATE members SET id0 = "y" WHERE ID = ' + Mid.toString()
          re = 1
        }
        if (id6 == 'y') cd = 'UPDATE members SET id0 = "n" WHERE ID = ' + Mid.toString()
        db.query(cd)    
      }
    }
  }
  if (Gid == 7){
    for (const [id, id7] of db.query("SELECT id, id0 FROM members")) {
      if (Mid === id){
        if (id7 == 'n'){
          cd = 'UPDATE members SET id0 = "y" WHERE ID = ' + Mid.toString()
          re = 1
        }
        if (id7 == 'y') cd = 'UPDATE members SET id0 = "n" WHERE ID = ' + Mid.toString()
        db.query(cd)    
      }
    }
  }
  if (Gid == 8){
    for (const [id, id8] of db.query("SELECT id, id0 FROM members")) {
      if (Mid === id){
        if (id8 == 'n'){
          cd = 'UPDATE members SET id0 = "y" WHERE ID = ' + Mid.toString()
          re = 1
        }
        if (id8 == 'y') cd = 'UPDATE members SET id0 = "n" WHERE ID = ' + Mid.toString()
        db.query(cd)    
      }
    }
  }
  if (Gid == 9){
    for (const [id, id9] of db.query("SELECT id, id0 FROM members")) {
      if (Mid === id){
        if (id9 == 'n'){
          cd = 'UPDATE members SET id0 = "y" WHERE ID = ' + Mid.toString()
          re = 1
        }
        if (id9 == 'y') cd = 'UPDATE members SET id0 = "n" WHERE ID = ' + Mid.toString()
        db.query(cd)    
      }
    }
  }
  if (Gid == 10){
    for (const [id, id10] of db.query("SELECT id, id0 FROM members")) {
      if (Mid === id){
        if (id10 == 'n'){
          cd = 'UPDATE members SET id0 = "y" WHERE ID = ' + Mid.toString()
          re = 1
        }
        if (id10 == 'y') cd = 'UPDATE members SET id0 = "n" WHERE ID = ' + Mid.toString()
        db.query(cd)    
      }
    }
  }
  if (Gid == 11){
    for (const [id, id11] of db.query("SELECT id, id0 FROM members")) {
      if (Mid === id){
        if (id11 == 'n'){
          cd = 'UPDATE members SET id0 = "y" WHERE ID = ' + Mid.toString()
          re = 1
        }
        if (id11 == 'y') cd = 'UPDATE members SET id0 = "n" WHERE ID = ' + Mid.toString()
        db.query(cd)    
      }
    }
  }
  let mm = db.query("SELECT * FROM members");
  console.log("members = ",mm);
  return re //re=0 >> n ; re=1 >> y
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });