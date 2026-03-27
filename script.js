/* ===========================
   ERHAD DJ — FUTURISTIC JS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================
  // CUSTOM CURSOR
  // ========================
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });
  (function trail() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(trail);
  })();

  document.querySelectorAll('a,button,.svc-card,.gal-card,.gc').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('hov'); ring.classList.add('hov'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('hov'); ring.classList.remove('hov'); });
  });

  // ========================
  // HUD CLOCK
  // ========================
  function updateClock() {
    const n = new Date();
    const pad = v => String(v).padStart(2,'0');
    document.getElementById('hudTime').textContent =
      pad(n.getHours())+':'+pad(n.getMinutes())+':'+pad(n.getSeconds());
  }
  updateClock();
  setInterval(updateClock, 1000);

  // ========================
  // STATUS TEXT TYPEWRITER
  // ========================
  const statuses = [
    'INITIALIZING SOUND SYSTEM...',
    'LOADING ALBANIAN BEATS...',
    'CALIBRATING BASS RESPONSE...',
    'BOOKING SYSTEM READY.',
    'ERHAD_DJ :: SYSTEM ONLINE ✓'
  ];
  let si = 0, ci = 0;
  const stEl = document.getElementById('statusText');
  function typeStatus() {
    if (!stEl) return;
    const s = statuses[si];
    stEl.textContent = s.slice(0, ci);
    ci++;
    if (ci > s.length) {
      setTimeout(() => {
        ci = 0;
        si = (si + 1) % statuses.length;
        typeStatus();
      }, si === statuses.length - 1 ? 4000 : 1200);
    } else {
      setTimeout(typeStatus, si === statuses.length - 1 ? 80 : 50);
    }
  }
  setTimeout(typeStatus, 800);

  // ========================
  // HERO CANVAS — PARTICLE GRID
  // ========================
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); initParticles(); });

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.color = Math.random() > 0.5 ? '0,245,255' : '255,0,170';
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = Array.from({length: 80}, () => new Particle());
    }
    initParticles();

    // Mouse influence
    let mouseX = W/2, mouseY = H/2;
    canvas.parentElement.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    });

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,245,255,${0.06*(1-d/100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0,0,W,H);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ========================
  // EQ VISUALIZER
  // ========================
  const eqViz = document.getElementById('eqViz');
  if (eqViz) {
    for (let i = 0; i < 16; i++) {
      const b = document.createElement('div');
      b.className = 'eq-b';
      const dur = (0.4 + Math.random()*0.6).toFixed(2);
      const delay = (Math.random()*0.4).toFixed(2);
      b.style.animationDuration = dur + 's';
      b.style.animationDelay = delay + 's';
      eqViz.appendChild(b);
    }
  }

  // ========================
  // TICKER DUPLICATE
  // ========================
  const ticker = document.getElementById('ticker');
  if (ticker) ticker.innerHTML += ticker.innerHTML;

  // ========================
  // NAVBAR SCROLL
  // ========================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ========================
  // HAMBURGER
  // ========================
  const hbg = document.getElementById('hamburger');
  const mmenu = document.getElementById('mobileMenu');
  hbg.addEventListener('click', () => {
    hbg.classList.toggle('open');
    mmenu.classList.toggle('open');
    document.body.style.overflow = mmenu.classList.contains('open') ? 'hidden' : '';
  });
  mmenu.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => {
      hbg.classList.remove('open');
      mmenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ========================
  // COUNTER ANIMATION
  // ========================
  function animCount(el, target, dur=1800) {
    let start=0;
    const step=target/(dur/16);
    const t=setInterval(()=>{
      start+=step;
      if(start>=target){ el.textContent=target+'+'; clearInterval(t); }
      else el.textContent=String(Math.floor(start)).padStart(3,'0');
    },16);
  }

  // ========================
  // DATA BARS ANIMATION
  // ========================
  function animBars() {
    document.querySelectorAll('.data-bar-fill').forEach(b => {
      const w = b.dataset.w;
      setTimeout(() => { b.style.width = w; }, 300);
    });
    document.querySelectorAll('.data-value[data-count]').forEach(el => {
      animCount(el, parseInt(el.dataset.count));
    });
  }

  // Trigger once hero is visible
  let heroAnimated = false;
  const heroObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !heroAnimated) {
      heroAnimated = true;
      setTimeout(animBars, 600);
    }
  }, {threshold:0.3});
  const heroSec = document.getElementById('hero');
  if (heroSec) heroObs.observe(heroSec);

  // ========================
  // RADAR CHART CANVAS
  // ========================
  const radar = document.getElementById('radarCanvas');
  if (radar) {
    const rc = radar.getContext('2d');
    const cx = 220, cy = 220, maxR = 160;
    const labels = ['ALBANIAN','BALKAN','HOUSE','ORIENTAL','HIP-HOP','TECHNO','COMMERCIALE','R&B'];
    const values = [0.98, 0.90, 0.80, 0.85, 0.75, 0.70, 0.82, 0.78];
    const n = labels.length;
    let animProg = 0;

    function drawRadar(prog) {
      rc.clearRect(0,0,440,440);
      // Web rings
      for (let ring=1; ring<=5; ring++) {
        const r = (maxR/5)*ring;
        rc.beginPath();
        for (let i=0;i<n;i++) {
          const a = (Math.PI*2/n)*i - Math.PI/2;
          const x = cx + r*Math.cos(a);
          const y = cy + r*Math.sin(a);
          i===0 ? rc.moveTo(x,y) : rc.lineTo(x,y);
        }
        rc.closePath();
        rc.strokeStyle = `rgba(0,245,255,${0.06+ring*0.02})`;
        rc.lineWidth=1;
        rc.stroke();
      }
      // Spokes
      for (let i=0;i<n;i++) {
        const a = (Math.PI*2/n)*i - Math.PI/2;
        rc.beginPath();
        rc.moveTo(cx,cy);
        rc.lineTo(cx+maxR*Math.cos(a), cy+maxR*Math.sin(a));
        rc.strokeStyle='rgba(0,245,255,0.08)';
        rc.lineWidth=1;rc.stroke();
      }
      // Data area
      rc.beginPath();
      for (let i=0;i<n;i++) {
        const a=(Math.PI*2/n)*i-Math.PI/2;
        const r=maxR*values[i]*prog;
        const x=cx+r*Math.cos(a), y=cy+r*Math.sin(a);
        i===0?rc.moveTo(x,y):rc.lineTo(x,y);
      }
      rc.closePath();
      // Gradient fill
      const grad = rc.createRadialGradient(cx,cy,0,cx,cy,maxR);
      grad.addColorStop(0,'rgba(0,245,255,0.25)');
      grad.addColorStop(0.5,'rgba(255,0,170,0.12)');
      grad.addColorStop(1,'rgba(0,245,255,0.05)');
      rc.fillStyle=grad;
      rc.fill();
      rc.strokeStyle='rgba(0,245,255,0.7)';
      rc.lineWidth=1.5;
      rc.stroke();
      // Dots
      for (let i=0;i<n;i++) {
        const a=(Math.PI*2/n)*i-Math.PI/2;
        const r=maxR*values[i]*prog;
        const x=cx+r*Math.cos(a), y=cy+r*Math.sin(a);
        rc.beginPath();
        rc.arc(x,y,4,0,Math.PI*2);
        rc.fillStyle='rgba(0,245,255,0.9)';
        rc.fill();
        rc.beginPath();
        rc.arc(x,y,8,0,Math.PI*2);
        rc.fillStyle='rgba(0,245,255,0.15)';
        rc.fill();
      }
      // Center dot
      rc.beginPath();
      rc.arc(cx,cy,5,0,Math.PI*2);
      rc.fillStyle='rgba(255,0,170,0.8)';rc.fill();
      rc.beginPath();
      rc.arc(cx,cy,12,0,Math.PI*2);
      rc.fillStyle='rgba(255,0,170,0.15)';rc.fill();
    }

    // Animate radar on scroll
    let radarAnimated=false;
    const radarObs=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting && !radarAnimated){
        radarAnimated=true;
        let p=0;
        const anim=()=>{
          p+=0.025;
          drawRadar(Math.min(p,1));
          if(p<1) requestAnimationFrame(anim);
        };
        anim();
      }
    },{threshold:0.3});
    radarObs.observe(radar);
    drawRadar(0);
  }

  // ========================
  // TESTIMONIALS SLIDER
  // ========================
  const cards=document.querySelectorAll('.test-card');
  const tdots=document.querySelectorAll('.tdot');
  let cur=0, autoT;

  function goSlide(i) {
    cards[cur].classList.remove('active');
    tdots[cur].classList.remove('active');
    cur=i;
    cards[cur].classList.add('active');
    tdots[cur].classList.add('active');
  }
  function nextSlide(){ goSlide((cur+1)%cards.length); }
  function prevSlide(){ goSlide((cur-1+cards.length)%cards.length); }

  autoT=setInterval(nextSlide,5000);
  document.getElementById('tNext').addEventListener('click',()=>{clearInterval(autoT);nextSlide();autoT=setInterval(nextSlide,5000);});
  document.getElementById('tPrev').addEventListener('click',()=>{clearInterval(autoT);prevSlide();autoT=setInterval(nextSlide,5000);});
  tdots.forEach(d=>d.addEventListener('click',()=>{clearInterval(autoT);goSlide(+d.dataset.i);autoT=setInterval(nextSlide,5000);}));

  // Touch swipe
  let tx=0;
  const ts=document.getElementById('testSlider');
  if(ts){
    ts.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;});
    ts.addEventListener('touchend',e=>{
      const d=tx-e.changedTouches[0].clientX;
      if(Math.abs(d)>40){ clearInterval(autoT); d>0?nextSlide():prevSlide(); autoT=setInterval(nextSlide,5000); }
    });
  }

  // ========================
  // SCROLL REVEAL (generic)
  // ========================
  const revObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('vis'); revObs.unobserve(e.target); }
    });
  },{threshold:0.12});

  // Add reveal class to sections content
  document.querySelectorAll(
    '.svc-card,.about-text>*,.cinfo,.contact-desc,.socials,'+
    '.gal-card,.test-card.active,.sec-title,.sec-tag'
  ).forEach((el,i)=>{
    el.classList.add('reveal');
    el.style.transitionDelay=(i%5)*0.07+'s';
    revObs.observe(el);
  });

  // ========================
  // CONTACT FORM
  // ========================
  const form=document.getElementById('contactForm');
  const subBtn=document.getElementById('subBtn');
  const subText=document.getElementById('subText');
  const subLoader=document.getElementById('subLoader');
  const formOk=document.getElementById('formOk');

  if(form){
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      let ok=true;
      form.querySelectorAll('[required]').forEach(f=>{
        if(!f.value.trim()){
          ok=false;
          f.parentElement.querySelector('.fl').style.background='#ff3333';
          setTimeout(()=>{ f.parentElement.querySelector('.fl').style.background=''; },2000);
        }
      });
      if(!ok) return;

      subText.style.opacity='0';
      subLoader.classList.add('on');
      subBtn.disabled=true;

      await new Promise(r=>setTimeout(r,2000));

      subLoader.classList.remove('on');
      subText.style.opacity='1';
      subBtn.disabled=false;
      formOk.classList.add('show');
      form.reset();
      setTimeout(()=>formOk.classList.remove('show'),6000);
    });
  }

  // ========================
  // SMOOTH SCROLL
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });

  // ========================
  // ACTIVE NAV ON SCROLL
  // ========================
  const secs=document.querySelectorAll('section[id]');
  const nls=document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll',()=>{
    let c='';
    secs.forEach(s=>{ if(window.scrollY>=s.offsetTop-200) c=s.id; });
    nls.forEach(l=>{
      if(l.getAttribute('href')==='#'+c){ l.style.color='var(--cyan)'; l.style.opacity='1'; }
      else{ l.style.color=''; l.style.opacity=''; }
    });
  });

  // ========================
  // PARALLAX HERO RINGS
  // ========================
  const rings=document.querySelectorAll('.holo-ring');
  window.addEventListener('mousemove',e=>{
    const x=(e.clientX/window.innerWidth-0.5)*20;
    const y=(e.clientY/window.innerHeight-0.5)*20;
    rings.forEach((r,i)=>{
      const f=(i+1)*0.3;
      r.style.transform=`translate(calc(-50% + ${x*f}px), calc(-50% + ${y*f}px))`;
    });
  });

  // ========================
  // GALLERY PARALLAX
  // ========================
  document.querySelectorAll('.gal-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=((e.clientX-r.left)/r.width-0.5)*8;
      const y=((e.clientY-r.top)/r.height-0.5)*8;
      const fill=card.querySelector('.gal-fill');
      if(fill) fill.style.transform=`scale(1.08) translate(${x}px,${y}px)`;
    });
    card.addEventListener('mouseleave',()=>{
      const fill=card.querySelector('.gal-fill');
      if(fill) fill.style.transform='';
    });
  });

  // ========================
  // GLITCH EFFECT TOGGLE ON SCROLL
  // ========================
  const heroTitle=document.querySelector('.hero-title.glitch');
  window.addEventListener('scroll',()=>{
    if(window.scrollY>100 && heroTitle){
      heroTitle.style.animation='none';
    } else if(heroTitle){
      heroTitle.style.animation='';
    }
  });

  // ========================
  // PAGE LOAD
  // ========================
  document.body.style.opacity='0';
  document.body.style.transition='opacity 0.5s ease';
  window.addEventListener('load',()=>{ document.body.style.opacity='1'; });
  setTimeout(()=>{ document.body.style.opacity='1'; },400);

});
