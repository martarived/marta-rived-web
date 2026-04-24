module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bayer — Marta Rived</title>
  <style>
    @font-face { font-family: 'Foun'; src: url('Foun.ttf') format('truetype'); font-weight: 400; }
    @font-face { font-family: 'Kross'; src: url('KrossNeueGrotesk-Light.ttf') format('truetype'); font-weight: 300; }
    @font-face { font-family: 'Kross'; src: url('KrossNeueGrotesk-Regular.ttf') format('truetype'); font-weight: 400; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root { --cream: #f2ede3; --ink: #0d0a1e; --sea: #0077a8; --muted: rgba(13,10,30,0.35); }
    html { scroll-behavior: smooth; }
    body { background: var(--cream); font-family: 'Kross', 'Helvetica Neue', sans-serif; font-weight: 400; color: var(--ink); }

    #nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 28px 56px; mix-blend-mode: difference; }
    .nav-logo { font-family: 'Kross', sans-serif; font-weight: 400; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--cream); text-decoration: none; }
    .nav-back { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--cream); text-decoration: none; display: flex; align-items: center; gap: 10px; transition: gap 0.2s; }
    .nav-back:hover { gap: 16px; }
    .nav-back::before { content: '←'; }

    #hero { position: relative; height: 100vh; overflow: hidden; background: var(--ink); }
    #hero img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
    #hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,10,30,0.92) 0%, rgba(13,10,30,0.25) 50%, transparent 100%); }
    #hero-content { position: absolute; bottom: 64px; left: 56px; z-index: 2; }
    .hero-label { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--sea); margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
    .hero-label::before { content: ''; display: block; width: 20px; height: 0.5px; background: var(--sea); }
    .hero-title { font-family: 'Foun', 'Arial Narrow', sans-serif; font-size: clamp(64px, 10vw, 140px); font-weight: 400; text-transform: uppercase; letter-spacing: -0.025em; line-height: 0.88; color: var(--cream); }
    .hero-title .dim { color: rgba(242,237,227,0.25); }

    .proj-meta { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 0.5px solid rgba(13,10,30,0.1); }
    .proj-meta-item { padding: 36px 40px; border-right: 0.5px solid rgba(13,10,30,0.08); }
    .proj-meta-item:last-child { border-right: none; }
    .proj-meta-label { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
    .proj-meta-value { font-family: 'Foun', 'Arial Narrow', sans-serif; font-size: clamp(16px, 2vw, 24px); text-transform: uppercase; letter-spacing: -0.01em; color: var(--ink); }

    .proj-intro { padding: 96px 56px; display: grid; grid-template-columns: 1fr 2fr; gap: 0 80px; border-bottom: 0.5px solid rgba(13,10,30,0.08); }
    .proj-intro-label { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--sea); padding-top: 6px; }
    .proj-intro-text { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 20px; line-height: 1.65; color: rgba(13,10,30,0.75); }

    .proj-stats { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 0.5px solid rgba(13,10,30,0.08); border-bottom: 0.5px solid rgba(13,10,30,0.08); }
    .proj-stat { padding: 56px 40px; border-right: 0.5px solid rgba(13,10,30,0.08); }
    .proj-stat:last-child { border-right: none; }
    .proj-stat-num { font-family: 'Foun', 'Arial Narrow', sans-serif; font-size: clamp(48px, 6vw, 88px); letter-spacing: -0.03em; line-height: 0.9; color: var(--ink); margin-bottom: 12px; }
    .proj-stat-label { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 12px; line-height: 1.7; color: rgba(13,10,30,0.5); }

    .proj-split { display: grid; grid-template-columns: 1fr 1fr; border-top: 0.5px solid rgba(13,10,30,0.08); }
    .proj-split-media { overflow: hidden; background: var(--ink); position: relative; min-height: 520px; }
    .proj-split-media iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; display: block; }
    .proj-split-text { padding: 80px 56px; display: flex; flex-direction: column; justify-content: center; }
    .proj-split-num { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 11px; letter-spacing: 0.18em; color: var(--sea); margin-bottom: 20px; }
    .proj-split-title { font-family: 'Foun', 'Arial Narrow', sans-serif; font-size: clamp(24px, 3vw, 44px); text-transform: uppercase; letter-spacing: -0.02em; line-height: 0.92; margin-bottom: 28px; }
    .proj-split-body { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 14px; line-height: 1.85; color: rgba(13,10,30,0.6); }

    .proj-quote { padding: 96px 56px; border-bottom: 0.5px solid rgba(13,10,30,0.08); border-top: 0.5px solid rgba(13,10,30,0.08); }
    .proj-quote blockquote { font-family: 'Foun', 'Arial Narrow', sans-serif; font-size: clamp(28px, 4vw, 56px); text-transform: uppercase; letter-spacing: -0.025em; line-height: 1.05; color: var(--ink); max-width: 860px; }
    .proj-quote cite { display: block; font-family: 'Kross', sans-serif; font-weight: 300; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--sea); margin-top: 24px; font-style: normal; }

    .proj-footer { padding: 64px 56px; border-top: 0.5px solid rgba(13,10,30,0.08); display: flex; align-items: center; justify-content: space-between; }
    .proj-footer-back { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); text-decoration: none; display: flex; align-items: center; gap: 10px; transition: color 0.2s, gap 0.2s; }
    .proj-footer-back:hover { color: var(--ink); gap: 16px; }
    .proj-footer-back::before { content: '←'; }
    .proj-footer-next { text-decoration: none; display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
    .proj-footer-next-label { font-family: 'Kross', sans-serif; font-weight: 300; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
    .proj-footer-next-title { font-family: 'Foun', 'Arial Narrow', sans-serif; font-size: clamp(24px, 3vw, 44px); text-transform: uppercase; letter-spacing: -0.02em; color: var(--ink); transition: color 0.2s; display: flex; align-items: center; gap: 12px; }
    .proj-footer-next-title::after { content: '→'; color: var(--sea); }
    .proj-footer-next:hover .proj-footer-next-title { color: var(--sea); }
  </style>
</head>
<body>

<nav id="nav">
  <a class="nav-logo" href="index.html">Marta Rived</a>
  <a class="nav-back" href="index.html#work">Work</a>
</nav>

<section id="hero">
  <img src="https://res.cloudinary.com/doo07efjl/image/upload/v1776425097/imgi_3_1-de-cada-2-quote-1_ob3tgp.jpg" alt="Bayer">
  <div id="hero-overlay"></div>
  <div id="hero-content">
    <p class="hero-label">Bayer · La Vanguardia · 2024</p>
    <h1 class="hero-title">
      Vivir pese<br>
      <span class="dim">a la</span><br>
      enfermedad
    </h1>
  </div>
</section>

<div class="proj-meta">
  <div class="proj-meta-item"><p class="proj-meta-label">Cliente</p><p class="proj-meta-value">Bayer</p></div>
  <div class="proj-meta-item"><p class="proj-meta-label">Medio</p><p class="proj-meta-value">La Vanguardia</p></div>
  <div class="proj-meta-item"><p class="proj-meta-label">Año</p><p class="proj-meta-value">2024</p></div>
  <div class="proj-meta-item"><p class="proj-meta-label">Rol</p><p class="proj-meta-value">Guion · Redacción · Dirección creativa</p></div>
</div>

<div class="proj-intro">
  <p class="proj-intro-label">El proyecto</p>
  <p class="proj-intro-text">Dos piezas de branded content para Bayer en La Vanguardia sobre las dos principales causas de muerte en España: el cáncer y la insuficiencia cardíaca. El objetivo era humanizar la investigación médica a través de historias reales — pacientes que viven con la enfermedad y especialistas que trabajan para cambiar su pronóstico.</p>
</div>

<div class="proj-stats">
  <div class="proj-stat"><p class="proj-stat-num">43%</p><p class="proj-stat-label">de todos los ensayos clínicos autorizados en la UE en 2023 se realizaron en hospitales españoles</p></div>
  <div class="proj-stat"><p class="proj-stat-num">10</p><p class="proj-stat-label">fármacos aprobados desde 2004 que han demostrado prolongar la supervivencia en cáncer de próstata metastásico</p></div>
  <div class="proj-stat"><p class="proj-stat-num">770K</p><p class="proj-stat-label">personas afectadas por insuficiencia cardíaca en España, con una supervivencia del 50% a los 5 años del diagnóstico</p></div>
</div>

<div class="proj-split">
  <div class="proj-split-text">
    <p class="proj-split-num">01 — Las historias</p>
    <h2 class="proj-split-title">Pacientes que dan cara a la investigación</h2>
    <p class="proj-split-body">Juancho, abogado con cáncer de próstata metastásico al que daban tres meses de vida. Soledad, escritora que tras superar un cáncer de mama desarrolló una insuficiencia cardíaca. Dos testimonios reales para contar que la investigación no es un concepto abstracto: es lo que los mantiene vivos. Escribí sus historias y desarrollé el guion de los vídeos en los que las cuentan ellos mismos.</p>
  </div>
  <div class="proj-split-media">
    <iframe src="https://www.youtube.com/embed/v3Ck2E2YE4Q?autoplay=1&mute=1&loop=1&playlist=v3Ck2E2YE4Q&controls=0&modestbranding=1" allow="autoplay; fullscreen" allowfullscreen></iframe>
  </div>
</div>

<div class="proj-quote">
  <blockquote>
    "Mi cáncer, tres años antes,<br>
    <span style="color:rgba(13,10,30,0.2);">hubiese tenido un final</span><br>
    completamente distinto"
    <cite>Juancho, paciente de cáncer de próstata metastásico</cite>
  </blockquote>
</div>

<div class="proj-split">
  <div class="proj-split-media">
    <iframe src="https://www.youtube.com/embed/R11I2ZQkc5o?autoplay=1&mute=1&loop=1&playlist=R11I2ZQkc5o&controls=0&modestbranding=1" allow="autoplay; fullscreen" allowfullscreen></iframe>
  </div>
  <div class="proj-split-text">
    <p class="proj-split-num">02 — Los expertos</p>
    <h2 class="proj-split-title">España, líder europeo en ensayos clínicos</h2>
    <p class="proj-split-body">La segunda pieza abordó el papel de España como referencia mundial en investigación clínica. Entrevisté y construí las narrativas de la Dra. Elena Castro, oncóloga del Hospital 12 de Octubre, y del Dr. Julio Núñez, cardiólogo del Hospital Clínico de Valencia — dos especialistas que pusieron en valor los avances conseguidos y los retos pendientes en prevención, diagnóstico precoz y medicina personalizada.</p>
  </div>
</div>

<div class="proj-quote">
  <blockquote>
    "No puede haber excelencia<br>
    <span style="color:rgba(13,10,30,0.2);">asistencial sin</span><br>
    investigación clínica"
    <cite>Dr. Julio Núñez, cardiólogo del Hospital Clínico Universitario de Valencia</cite>
  </blockquote>
</div>

<div class="proj-footer">
  <a class="proj-footer-back" href="index.html#work">Volver a Work</a>
  <a class="proj-footer-next" href="ford.html">
    <span class="proj-footer-next-label">Siguiente proyecto</span>
    <span class="proj-footer-next-title">Ford</span>
  </a>
</div>

</body>
</html>`);
};
