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


addEventListener("fetch", async event => {
  const data = {
    res: "Hello World"
  }
  const BASE = 'https://xkcd.com/'
  const fet = await fetch(BASE)
  data.res = await fet.text()
  const response = new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json"
    }
  })
  event.respondWith(response)
})