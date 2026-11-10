/* ==========================================================================
   Downtown Dental — main.js  (one script for every page, no dependencies)
   PART 1  Approved header / menu / credential behaviour (verbatim).
   PART 2  Smooth scroll (Lenis), scroll reveal, parallax, dropdowns, demo form.
   Load assets/js/lenis.min.js first. If it is missing, the page falls back to native scrolling.
   WordPress: enqueue in the footer from the child theme.
   ========================================================================== */
(function(){
  var header = document.querySelector('.site-header');
  var onScroll = function(){ header.classList.toggle('scrolled', window.scrollY > 4); };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // Desktop dropdowns (hover via CSS; click/tap + keyboard via JS)
  var dds = document.querySelectorAll('.has-dd');
  dds.forEach(function(dd){
    var btn = dd.querySelector('.trigger');
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var open = !dd.classList.contains('open');
      dds.forEach(function(o){ o.classList.remove('open'); o.querySelector('.trigger').setAttribute('aria-expanded','false'); });
      if(open){ dd.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    });
  });
  document.addEventListener('click', function(){
    dds.forEach(function(o){ o.classList.remove('open'); o.querySelector('.trigger').setAttribute('aria-expanded','false'); });
  });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ closeMenu(); dds.forEach(function(o){o.classList.remove('open');}); } });

  // Mobile menu
  var burger = document.getElementById('burger');
  function closeMenu(){ document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded','false'); burger.setAttribute('aria-label','Open menu'); }
  burger.addEventListener('click', function(){
    var open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.querySelectorAll('.mobile-menu .acc').forEach(function(li){
    var b = li.querySelector('button');
    b.addEventListener('click', function(){
      var open = li.classList.toggle('open'); b.setAttribute('aria-expanded', open);
    });
  });
  document.querySelectorAll('.mobile-menu a').forEach(function(a){ a.addEventListener('click', closeMenu); });
  window.addEventListener('resize', function(){ if(window.innerWidth > 960) closeMenu(); });

  // Credential logos: fall back to text if an image file is missing
  document.querySelectorAll('.cred img').forEach(function(img){
    var mark = function(){ img.parentElement.classList.add('missing'); };
    img.addEventListener('error', mark);
    if(img.complete && img.naturalWidth === 0) mark();
  });
})();

/* ---------- PART 2 ---------- */
(function(){
  var root = document.documentElement;

  // Scroll reveal (content stays visible if JS or IntersectionObserver is unavailable)
  var items = document.querySelectorAll('.dt-reveal');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(items.length && 'IntersectionObserver' in window && !reduce){
    root.classList.add('dt-js');
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, {rootMargin:'0px 0px -8% 0px', threshold:0.08});
    items.forEach(function(el){ io.observe(el); });
    // anything already on screen at load animates in right away
    window.requestAnimationFrame(function(){ window.requestAnimationFrame(function(){
      var vh0 = window.innerHeight;
      items.forEach(function(el){ if(el.getBoundingClientRect().top < vh0 - 20){ el.classList.add('is-in'); io.unobserve(el); } });
    }); });
  }

  // Smooth scrolling (Lenis) for mouse and trackpad. All scroll effects below
  // run inside Lenis's frame so they stay perfectly in step with the page.
  var lenis = null;
  if(window.Lenis && !reduce){
    document.querySelectorAll('.mobile-menu,textarea').forEach(function(el){ el.setAttribute('data-lenis-prevent', ''); });
    // syncTouch stays off: it removed flick momentum in testing, and native touch scrolling
    // is already smooth. Lenis still reports it, so the effects stay in step on phones.
    lenis = new window.Lenis({autoRaf:true, lerp:0.09, smoothWheel:true, syncTouch:false});

    // In-page links: land below the fixed header
    document.addEventListener('click', function(e){
      var a = e.target.closest ? e.target.closest('a[href*="#"]') : null;
      if(!a || a.target === '_blank') return;
      var href = a.getAttribute('href'), cut = href.indexOf('#'), hash = href.slice(cut);
      // links like contact-us.html#book are in-page when we are already on that page
      if(cut > 0 && a.pathname !== window.location.pathname) return;
      if(hash === '#') return;
      var target = hash === '#top' ? 0 : document.querySelector(hash);
      if(target === null) return;
      e.preventDefault();
      var hdr = (document.querySelector('.site-header') || {}).offsetHeight || 0;
      // targets with scroll-margin-top already account for the header (Lenis applies it)
      var gap = hash === '#top' || parseFloat(getComputedStyle(target).scrollMarginTop) > 0 ? 0 : -hdr;
      lenis.scrollTo(target, {offset: gap, force: true});
      if(hash !== '#top' && window.history.pushState) window.history.pushState(null, '', hash);
    });

    // Freeze the page behind the open mobile menu
    new MutationObserver(function(){
      if(document.body.classList.contains('menu-open')) lenis.stop(); else lenis.start();
    }).observe(document.body, {attributes:true, attributeFilter:['class']});
  }

  // Scroll parallax: photo layer moves at (1 - SPEED) of scroll speed,
  // hero copy drifts and fades. Transform-only, one rAF per frame.
  var px = [].slice.call(document.querySelectorAll('.dt-parallax'));
  if(px.length && !reduce){
    var SPEED = 0.6, vh = window.innerHeight, ticking = false;
    var items2 = px.map(function(s){ return {s:s, m:s.querySelector('.dt-parallax__media'), f:s.querySelector('[data-parallax-fade]')}; });
    var layout = function(){
      vh = window.innerHeight;
      var hdr = (document.querySelector('.site-header') || {}).offsetHeight || 0;
      items2.forEach(function(it){
        var h = it.s.offsetHeight, top = it.s.getBoundingClientRect().top + window.pageYOffset;
        // anchor = where the section sits when its photo is "at rest":
        // its load position if it starts on screen, else fully inside the viewport bottom
        it.a = Math.max(0, Math.min(top, vh - h));
        // the layer only travels downward relative to the section, so it needs extra
        // height on top, except where the fixed header hides that strip anyway
        var ext = Math.max(0, it.a - hdr) * SPEED;
        if(it.m) it.m.style.top = (ext ? -Math.ceil(ext) - 2 : 0) + 'px';
      });
      frame();
    };
    var frame = function(){
      ticking = false;
      items2.forEach(function(it){
        var r = it.s.getBoundingClientRect();
        if(r.bottom < -40 || r.top > vh + 40) return;
        var d = it.a - r.top;                       // px scrolled past the rest position
        if(it.m) it.m.style.transform = 'translate3d(0,' + (d * SPEED).toFixed(1) + 'px,0)';
        if(it.f){
          var p = Math.min(Math.max(d / r.height, 0), 1);
          it.f.style.transform = 'translate3d(0,' + (p * r.height * 0.28).toFixed(1) + 'px,0)';
          it.f.style.opacity = (1 - p * 1.25).toFixed(3);
        }
      });
    };
    if(lenis) lenis.on('scroll', frame);
    else window.addEventListener('scroll', function(){ if(!ticking){ ticking = true; window.requestAnimationFrame(frame); } }, {passive:true});
    window.addEventListener('resize', layout);
    layout();
  }

  // Custom dropdowns: progressive enhancement of native <select>. The real select
  // stays in the form (and is what submits), so no-JS visitors keep a working field.
  var pickers = [];
  document.querySelectorAll('.dt-field select').forEach(function(sel, n){
    var field = sel.closest('.dt-field'), label = field.querySelector('label');
    var opts = [].slice.call(sel.options).filter(function(o){ return o.value !== ''; });
    var empty = sel.options[0] && sel.options[0].value === '' ? sel.options[0].text : '';
    var btn = document.createElement('button'), list = document.createElement('ul');
    var id = 'dt-select-' + n, open = false, active = -1, typed = '', typedAt = 0;

    btn.type = 'button'; btn.id = id + '-btn'; btn.className = 'dt-select__btn';
    btn.setAttribute('role', 'combobox');
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', id + '-list');
    list.id = id + '-list'; list.className = 'dt-select__list'; list.hidden = true;
    list.setAttribute('role', 'listbox');
    list.setAttribute('data-lenis-prevent', '');
    if(label){ label.id = label.id || id + '-label'; label.htmlFor = btn.id; btn.setAttribute('aria-labelledby', label.id + ' ' + btn.id); list.setAttribute('aria-labelledby', label.id); }

    opts.forEach(function(o, i){
      var li = document.createElement('li');
      li.id = id + '-opt-' + i; li.className = 'dt-select__opt'; li.textContent = o.text;
      li.setAttribute('role', 'option');
      li.addEventListener('mouseenter', function(){ setActive(i); });
      li.addEventListener('click', function(){ choose(i); close(); btn.focus(); });
      list.appendChild(li);
    });

    function sync(){
      var o = sel.options[sel.selectedIndex], has = !!(o && o.value !== '');
      btn.textContent = has ? o.text : empty;
      btn.classList.toggle('is-empty', !has);
      [].forEach.call(list.children, function(li, i){ li.setAttribute('aria-selected', has && opts[i] === o ? 'true' : 'false'); });
    }
    function setActive(i){
      active = i;
      [].forEach.call(list.children, function(li, k){ li.classList.toggle('is-active', k === i); });
      var el = list.children[i];
      if(el){
        btn.setAttribute('aria-activedescendant', el.id);
        if(el.offsetTop < list.scrollTop) list.scrollTop = el.offsetTop;
        else if(el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = el.offsetTop + el.offsetHeight - list.clientHeight;
      }
    }
    function choose(i){ sel.value = opts[i].value; sync(); sel.dispatchEvent(new Event('change', {bubbles:true})); }
    function place(){
      var r = btn.getBoundingClientRect(), vh = window.innerHeight, hdr = (document.querySelector('.site-header') || {}).offsetHeight || 0;
      var below = vh - r.bottom - 14, above = r.top - hdr - 14, up = below < 200 && above > below;
      field.classList.toggle('is-up', up);
      list.style.maxHeight = Math.max(150, Math.min(280, up ? above : below)) + 'px';
    }
    function show(){
      pickers.forEach(function(c){ if(c !== api) c.close(); });
      open = true; list.hidden = false; field.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      place();
      var cur = opts.indexOf(sel.options[sel.selectedIndex]);
      setActive(cur < 0 ? 0 : cur);
    }
    function close(){
      if(!open) return;
      open = false; list.hidden = true; field.classList.remove('is-open', 'is-up');
      btn.setAttribute('aria-expanded', 'false'); btn.removeAttribute('aria-activedescendant');
    }
    function typeahead(ch){
      var now = Date.now(); typed = now - typedAt > 700 ? ch : typed + ch; typedAt = now;
      for(var i = 0; i < opts.length; i++){
        if(opts[i].text.toLowerCase().indexOf(typed) === 0){ if(open) setActive(i); else choose(i); return; }
      }
    }
    btn.addEventListener('click', function(){ if(open) close(); else show(); });
    btn.addEventListener('keydown', function(e){
      var k = e.key, last = opts.length - 1;
      if(!open){
        if(k === 'ArrowDown' || k === 'ArrowUp' || k === 'Enter' || k === ' '){ e.preventDefault(); show(); }
        else if(k.length === 1 && /\S/.test(k)) typeahead(k.toLowerCase());
        return;
      }
      if(k === 'ArrowDown'){ e.preventDefault(); setActive(Math.min(active + 1, last)); }
      else if(k === 'ArrowUp'){ e.preventDefault(); setActive(Math.max(active - 1, 0)); }
      else if(k === 'Home'){ e.preventDefault(); setActive(0); }
      else if(k === 'End'){ e.preventDefault(); setActive(last); }
      else if(k === 'Enter' || k === ' '){ e.preventDefault(); choose(active); close(); }
      else if(k === 'Escape'){ e.preventDefault(); e.stopPropagation(); close(); }
      else if(k === 'Tab'){ close(); }
      else if(k.length === 1 && /\S/.test(k)){ typeahead(k.toLowerCase()); }
    });

    var api = {close: close, field: field};
    pickers.push(api);
    sel.classList.add('dt-select__native');
    sel.tabIndex = -1; sel.setAttribute('aria-hidden', 'true');
    field.classList.add('dt-select');
    field.appendChild(btn); field.appendChild(list);
    sync();
    if(sel.form) sel.form.addEventListener('reset', function(){ setTimeout(sync, 0); });
  });
  if(pickers.length){
    document.addEventListener('click', function(e){ pickers.forEach(function(c){ if(!c.field.contains(e.target)) c.close(); }); });
    window.addEventListener('resize', function(){ pickers.forEach(function(c){ c.close(); }); });
  }

  // Static mock-up forms: show the success state instead of posting.
  // (Replaced by the Elementor Pro Form widget in WordPress.)
  document.querySelectorAll('form[data-demo]').forEach(function(f){
    f.addEventListener('submit', function(e){
      e.preventDefault();
      if(!f.checkValidity()){ f.reportValidity(); return; }
      f.closest('.dt-form').classList.add('is-sent'); f.reset();
    });
  });
})();
