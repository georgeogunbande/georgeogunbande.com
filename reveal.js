/* Scroll reveal. Needs motion.js (Motion 11) loaded first.
   Progressive enhancement: returns before hiding anything unless Motion and
   IntersectionObserver exist and the visitor has not asked for reduced motion. */
(function(){
  var M=window.Motion;
  if(!M||!M.animate||!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var skip=':not(.stagehero):not(.page-hero):not(.hero):not(.hero-plain)';
  var sel=[
    'main section'+skip+' .wrap > *',
    'main section.wrap'+skip+' > *',
    'main section'+skip+' > .sec-head',
    'footer .wrap > *',
    '.role, .art, .topics li, .cover'
  ].join(',');
  var els=[].slice.call(document.querySelectorAll(sel)).filter(function(e){
    return !e.closest('.stagehero, .page-hero, .hero, .hero-plain, header');
  });
  if(!els.length)return;
  var st=document.createElement('style');
  st.textContent='.mo{opacity:0;transform:translateY(28px)}@media print{.mo{opacity:1!important;transform:none!important}}';
  document.head.appendChild(st);
  els.forEach(function(e){e.classList.add('mo')});
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting)return;
      var el=en.target;io.unobserve(el);
      var done=function(){el.classList.remove('mo');el.style.opacity='';el.style.transform=''};
      M.animate(el,{opacity:[0,1],transform:['translateY(28px)','translateY(0px)']},{duration:.8,easing:[.16,.84,.24,1]}).then(done,done);
    });
  },{rootMargin:'0px 0px -5% 0px'});
  els.forEach(function(e){io.observe(e)});
})();
