# 風獅爺園地

<strong>本程式完全原創，僅參考[作業2:個人行事曆](https://github.com/Jung217/ws111a/tree/main/Personal%20Calender%20(Hw2))</strong>

## 主要功能:

* Mail 聯繫作者
* 註冊&登入(用SQLite、註冊不可留白、帳號不重複、登入驗證)
* 收藏愛心功能
* 風獅爺留言區功能(用SQLite、紀錄留言者、風獅爺、留的言)
* 隨機選擇幸運風獅爺(尚有小問題:返回不重新random)
* 以地區篩選風獅爺(目前只展示金城鎮的)
* 已名稱搜尋風獅爺(未實現)

## 說明:

以字典形式將要展示的資料寫入，用SQLite儲存會員資料及留言

## 困難:

1. import main.js 但用不了 function ， 後來 export 就解決了......

```
[uncaught application error]: TypeError - main.togetid is not a function

request: { url: "http://127.0.0.1:8000/post/0", method: "GET", hasBody: false }
response: { status: 404, type: undefined, hasBody: false, writable: true }

    at Module.show (file:///C:/Users/alex2/NQU/wsHW/Final%20project/render.js:216:14)
    at show (file:///C:/Users/alex2/NQU/wsHW/Final%20project/main.js:225:36)
    at dispatch (https://deno.land/x/oak@v11.1.0/middleware.ts:41:13)
    at https://deno.land/x/oak@v11.1.0/router.ts:1229:20
    at dispatch (https://deno.land/x/oak@v11.1.0/middleware.ts:41:13)
    at composedMiddleware (https://deno.land/x/oak@v11.1.0/middleware.ts:44:12)
    at dispatch (https://deno.land/x/oak@v11.1.0/router.ts:1235:28)
    at dispatch (https://deno.land/x/oak@v11.1.0/middleware.ts:41:13)
    at composedMiddleware (https://deno.land/x/oak@v11.1.0/middleware.ts:44:12)
    at Application.#handleRequest (https://deno.land/x/oak@v11.1.0/application.ts:436:34)
```

2. 紀錄愛心尚未有更好方法編寫

```
export function update(Mid, Gid) {
  let cd = '' //UPDATE members SET id0 = 'Y' WHERE ID = 5
  let re = 0
  if (Gid == 0){
    for (const [id, id0] of db.query("SELECT id, id0 FROM members")) {
      if (Mid === id){
        if (id0 == 'n'){
          cd = 'UPDATE members SET id0 = "y" WHERE ID = ' + Mid.toString() 
          //db.query(`UPDATE members SET id0 = "y" WHERE ID = ${Mid}`)
          re = 1
        } 
        if (id0 == 'y') cd = 'UPDATE members SET id0 = "n" WHERE ID = ' + Mid.toString()
        db.query(cd)    
      }
    }
  }
  return re //re=0 >> n ; re=1 >> y
}
```


## 備註:

展示網站功能[影片](https://youtu.be/ou6Ai6uyzKk)

資料來源:[風獅爺](https://trfc.tw/culture/block_evil/fsx)

