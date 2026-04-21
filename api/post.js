const https = require('https');

function fetchFeed() {
  return new Promise((resolve, reject) => {
    https.get('https://aquelveranodel92.substack.com/feed', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

module.exports = async (req, res) => {
  const slug = (req.query.slug || '').trim();

  let xmlText = '';
  try {
    xmlText = await fetchFeed();
  } catch (e) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(500).send('<p>Error cargando el feed.</p>');
    return;
  }

  // Parse title, date, img, body from RSS
  function getCdata(xml, tag) {
    const m = xml.match(new RegExp('<' + tag + '><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/' + tag + '>'));
    return m ? m[1] : '';
  }
  function getTag(xml, tag) {
    const m = xml.match(new RegExp('<' + tag + '>([\\s\\S]*?)<\\/' + tag + '>'));
    return m ? m[1].trim() : '';
  }

  const items = xmlText.split('<item>').slice(1);
  let post = null;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const linkMatch = item.match(/<link>([^<]+)<\/link>/);
    const url = linkMatch ? linkMatch[1].trim() : '';
    const itemSlug = url.split('/').filter(Boolean).pop() || '';
    if (itemSlug === slug || String(i) === slug) {
      post = { item, index: i, url };
      break;
    }
  }

  if (!post) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(404).send('Post no encontrado.');
    return;
  }

  const { item, url } = post;

  const title = getCdata(item, 'title') || getTag(item, 'title');
  const pubDate = getTag(item, 'pubDate');
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const d = pubDate ? new Date(pubDate) : null;
  const dateStr = d ? months[d.getMonth()] + ' ' + d.getFullYear() : '';

  // Extract first image from content:encoded
  const encodedMatch = item.match(/<content:encoded>[\s\S]*?<!\[CDATA\[([\s\S]*?)\]\]>/);
  const encodedHtml = encodedMatch ? encodedMatch[1] : '';
  const imgMatch = encodedHtml.match(/src=["'](https:\/\/[^"']+)/i);
  const img = imgMatch ? imgMatch[1] : '';

  // Body: full content:encoded HTML, sin la primera imagen (ya está en el hero)
  const rawBody = encodedHtml || getCdata(item, 'description');
  const body = rawBody.replace(/<figure[^>]*>[\s\S]*?<\/figure>/, '').replace(/<img[^>]*>/, '');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title.replace(/</g,'&lt;')} — Marta Rived</title>
  <style>
    @font-face { font-family: 'Foun'; src: url('/Foun.ttf') format('truetype'); font-weight: 400; }
    @font-face { font-family: 'Kross'; src: url('/KrossNeueGrotesk-Light.ttf') format('truetype'); font-weight: 300; }
    @font-face { font-family: 'Kross'; src: url('/KrossNeueGrotesk-Regular.ttf') format('truetype'); font-weight: 400; }
    @font-face { font-family: 'Kross'; src: url('/KrossNeueGrotesk-Bold.ttf') format('truetype'); font-weight: 700; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root { --cream: #f2ede3; --ink: #0d0a1e; --blue: #0057FF; --sea: #0077a8; --muted: rgba(13,10,30,0.35); }
    body { background: var(--cream); font-family: 'Kross', 'Helvetica Neue', sans-serif; font-weight: 400; color: var(--ink); }

    #nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; display: flex; align-items: center; justify-content: space-between; padding: 28px 56px; mix-blend-mode: multiply; }
    .nav-logo { font-family: 'Kross', sans-serif; font-weight: 400; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink); text-decoration: none; }
    .nav-back { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.2s; display: flex; align-items: center; gap: 8px; }
    .nav-back:hover { color: var(--ink); }
    .nav-back::before { content: '←'; }

    #post-hero { width: 100%; height: 70vh; min-height: 420px; background: rgba(13,10,30,0.06); background-size: cover; background-position: center; position: relative; overflow: hidden; ${img ? `background-image: url('${img}');` : ''} }
    #post-hero::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 320px; background: linear-gradient(to bottom, transparent, var(--cream)); }

    #post-wrap { max-width: 720px; margin: 0 auto; padding: 0 32px 120px; }
    #post-meta { padding: 64px 0 40px; border-bottom: 0.5px solid rgba(13,10,30,0.1); margin-bottom: 56px; }
    .post-label { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--sea); display: flex; align-items: center; gap: 12px; margin-bottom: 28px; }
    .post-label::before { content: ''; display: block; width: 20px; height: 0.5px; background: var(--sea); }
    #post-title { font-family: 'Foun', 'Arial Narrow', sans-serif; font-weight: 400; font-size: clamp(42px, 6vw, 80px); text-transform: uppercase; color: var(--ink); letter-spacing: -0.02em; line-height: 0.9; margin-bottom: 28px; }
    #post-date { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); }

    #post-body { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 16px; line-height: 1.9; color: rgba(13,10,30,0.75); }
    #post-body p { margin-bottom: 1.6em; }
    #post-body h1, #post-body h2, #post-body h3 { font-family: 'Foun', 'Arial Narrow', sans-serif; font-weight: 400; text-transform: uppercase; color: var(--ink); letter-spacing: -0.01em; margin: 2.4em 0 0.8em; line-height: 0.95; }
    #post-body h1 { font-size: clamp(32px, 4vw, 52px); }
    #post-body h2 { font-size: clamp(26px, 3vw, 40px); }
    #post-body h3 { font-size: clamp(20px, 2.5vw, 30px); }
    #post-body a { color: var(--sea); text-decoration: none; border-bottom: 0.5px solid rgba(0,119,168,0.35); transition: border-color 0.2s, color 0.2s; }
    #post-body a:hover { color: var(--ink); border-color: var(--ink); }
    #post-body img { width: 100%; border-radius: 3px; margin: 2em 0; display: block; }
    #post-body blockquote { border-left: 2px solid var(--sea); margin: 2em 0; padding: 0 0 0 28px; font-style: italic; color: rgba(13,10,30,0.5); }
    #post-body hr { border: none; border-top: 0.5px solid rgba(13,10,30,0.1); margin: 3em 0; }
    #post-body ul, #post-body ol { padding-left: 1.4em; margin-bottom: 1.6em; }
    #post-body li { margin-bottom: 0.5em; }

    #post-footer { margin-top: 80px; padding-top: 40px; border-top: 0.5px solid rgba(13,10,30,0.1); display: flex; justify-content: space-between; align-items: center; }
    .post-footer-link { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--sea); text-decoration: none; transition: color 0.2s; }
    .post-footer-link:hover { color: var(--ink); }
    .post-substack { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.2s; }
    .post-substack:hover { color: var(--ink); }

    @keyframes up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    .fade-in { animation: up 0.7s ease forwards; }
  </style>
</head>
<body>

<nav id="nav">
  <a class="nav-logo" href="/">Marta Rived</a>
  <a class="nav-back" href="/#typing">Typing</a>
</nav>

<div id="post-hero"></div>

<div id="post-wrap" class="fade-in">
  <div id="post-meta">
    <p class="post-label">Typing</p>
    <h1 id="post-title">${title.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</h1>
    <p id="post-date">${dateStr}</p>
  </div>
  <div id="post-body">${body}</div>
  <div id="post-footer">
    <a class="post-footer-link" href="/#typing">← Volver a Typing</a>
    <a class="post-substack" href="${url}" target="_blank" rel="noopener">Leer en Substack ↗</a>
  </div>
</div>

</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
};
