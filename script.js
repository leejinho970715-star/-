gsap.registerPlugin(ScrollTrigger);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const canvas = document.querySelector('#stars');
const ctx = canvas.getContext('2d');
let stars = [];
function makeStars(){
  const dpr = Math.min(devicePixelRatio,2);
  canvas.width = innerWidth*dpr; canvas.height = innerHeight*dpr;
  canvas.style.width=innerWidth+'px'; canvas.style.height=innerHeight+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  stars=Array.from({length:Math.min(180,Math.floor(innerWidth/6))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2+.15,a:Math.random()*.7+.15,s:Math.random()*.08+.015}));
}
function drawStars(t=0){ctx.clearRect(0,0,innerWidth,innerHeight);stars.forEach(s=>{const a=s.a*(.65+.35*Math.sin(t*.001+s.x));ctx.beginPath();ctx.fillStyle='rgba(210,202,235,'+a+')';ctx.arc(s.x,(s.y+t*s.s)%innerHeight,s.r,0,Math.PI*2);ctx.fill()});requestAnimationFrame(drawStars)}
makeStars(); addEventListener('resize',makeStars); if(!reduced) requestAnimationFrame(drawStars); else drawStars(0);

if(!reduced){
  const lenis=new Lenis({duration:1.15,smoothWheel:true,wheelMultiplier:.9});
  lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();lenis.scrollTo(a.getAttribute('href'),{offset:-60})}));
  gsap.timeline({defaults:{ease:'power4.out'}}).from('.nav',{y:-25,opacity:0,duration:1}).from('.hero h1 .line>span',{yPercent:115,duration:1.15,stagger:.13},'-.65').from('.planet',{scale:0,rotate:-40,duration:1.5},'-=1.25').from('.hero .eyebrow,.hero-foot',{opacity:0,y:25,duration:.8,stagger:.12},'-=.75');
  gsap.to('.planet',{yPercent:95,rotate:50,scale:.75,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1.2}});
  document.querySelectorAll('.reveal').forEach(el=>gsap.from(el,{y:45,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
  document.querySelectorAll('.image-reveal').forEach(w=>{gsap.to(w,{clipPath:'inset(0 0 0% 0)',duration:1.2,ease:'power4.inOut',scrollTrigger:{trigger:w,start:'top 85%',once:true}});const im=w.querySelector('img');if(im)gsap.from(im,{scale:1.15,duration:1.5,ease:'power3.out',scrollTrigger:{trigger:w,start:'top 85%',once:true}})});
  gsap.to('.ticker>div',{xPercent:-50,ease:'none',scrollTrigger:{trigger:'.ticker',start:'top bottom',end:'bottom top',scrub:1}});
  gsap.fromTo('.contact',{backgroundPosition:'center, 100% 58%'},{backgroundPosition:'center, 88% 42%',ease:'none',scrollTrigger:{trigger:'.contact',start:'top bottom',end:'bottom top',scrub:1.2}});
  document.querySelectorAll('.project-img img').forEach(im=>gsap.fromTo(im,{yPercent:-4},{yPercent:4,ease:'none',scrollTrigger:{trigger:im.parentElement,start:'top bottom',end:'bottom top',scrub:1}}));
  const cursor=document.querySelector('.cursor');addEventListener('pointermove',e=>gsap.to(cursor,{x:e.clientX,y:e.clientY,duration:.17}));
  document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>gsap.to(cursor,{scale:3,duration:.2}));el.addEventListener('mouseleave',()=>gsap.to(cursor,{scale:1,duration:.2}))});
  document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.14,y:(e.clientY-r.top-r.height/2)*.14,duration:.3})});el.addEventListener('mouseleave',()=>gsap.to(el,{x:0,y:0,duration:.5,ease:'elastic.out(1,.4)'}))});
}else document.querySelectorAll('.image-reveal').forEach(el=>el.style.clipPath='none');

const tabs=[...document.querySelectorAll('.story-tabs button')];
const panels=[...document.querySelectorAll('.story-panel')];
tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});panels.forEach(p=>{p.classList.remove('active');p.style.opacity=0});tab.classList.add('active');tab.setAttribute('aria-selected','true');const p=document.querySelector('#'+tab.dataset.tab);p.classList.add('active');if(reduced)p.style.opacity=1;else gsap.fromTo(p,{opacity:0,y:25},{opacity:1,y:0,duration:.6,ease:'power3.out'});ScrollTrigger.refresh()}));
