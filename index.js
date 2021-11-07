import {
  cheerio
} from "https://deno.land/x/cheerio@1.0.4/mod.ts";
import {
  oakCors
} from "https://deno.land/x/cors/mod.ts";
import {
  Application,
  Router
} from "https://deno.land/x/oak/mod.ts";


async function parseHtml(html) {
  const $ = cheerio.load(html, null, true)

  const prevSelector = '#middleContainer > ul:nth-child(2) > li:nth-child(2) > a'
  const nextSelector = '#middleContainer > ul:nth-child(4) > li:nth-child(4) > a'
  const prevlink = $(prevSelector)
  const nextlink = $(nextSelector)
  let prev = prevlink.attr('href')
  let next = nextlink.attr('href')
  let imgsrc
  let title

  const comicdiv = $('#comic')
  comicdiv.each((idx, el) => {
    imgsrc = $(el).children().attr('src')
    title = $(el).children().attr('title')
    imgsrc = imgsrc
  })

  return {
    prev,
    next,
    imgsrc,
    title
  }
}

const router = new Router();
router
  .get("/:id", async (context) => {
    const {id} = context.params

    let data 
    const BASE = 'https://xkcd.com/'+id
    try {
      const fet = await fetch(BASE)
      const text = await fet.text()
      data = await parseHtml(text)      
    } catch (error) {
      data = {error:error.message}
      context.response.status = 500
    }
    const response = new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json"
      }
    })
    context.response.body = data;
  })
  .get("/", async (context) => {

    let data
    const BASE = 'https://xkcd.com/'
    try {      
      const fet = await fetch(BASE)
      const text = await fet.text()
      data = await parseHtml(text)
    } catch (error) {
      data = error
      context.response.status = 500
    }
    const response = new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json"
      }
    })
    context.response.body = data;
  });

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
const port = 8000

/* await app.listen({
  port
}); */ 

addEventListener("fetch", app.fetchEventHandler());