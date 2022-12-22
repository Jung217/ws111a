import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("ScoreList.db");

db.query("CREATE TABLE IF NOT EXISTS students (name TEXT, score INT)");
let select = db.query("SELECT * FROM students");
console.log("students = ",select);

const router = new Router()
router.get('/', rt)
router.get('/sqlcmd/:cmd', sqlcmd)
router.get('/public/(.*)', pub)

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

async function rt(ctx) {
    ctx.response.redirect('/public/')
}

async function pub(ctx) {
    console.log(ctx.request.url.pathname)

    await send(ctx, ctx.request.url.pathname, {
        root: `${Deno.cwd()}/`,
        index: "index.html",
    })
}

async function sqlcmd(ctx) {
    try {
        let cmd = ctx.params['cmd']
        console.log('cmd=', cmd)

        ctx.response.type = 'application/json'
        let all = db.query("SELECT * FROM students");
        console.log("students = ",all);
        ctx.response.body = all
    }
    catch(e){
        console.log('error :', error)
    }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 })
