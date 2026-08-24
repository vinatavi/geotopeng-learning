/* =================================================================
   GEOTOPENG — Application Logic (Vanilla JS, SPA state + routing)
================================================================= */

/* ---------- CONTENT DATA ---------- */

const CHARACTERS = {
  bapang:    { key:"bapang",    name:"Bapang",    topic:"Translasi", icon:"move",            symbol:"#mask-bapang" },
  panji:     { key:"panji",     name:"Panji",     topic:"Refleksi",  icon:"flip-horizontal",  symbol:"#mask-panji" },
  klana:     { key:"klana",     name:"Klana",     topic:"Rotasi",    icon:"rotate-cw",        symbol:"#mask-klana" },
  sekartaji: { key:"sekartaji", name:"Sekartaji", topic:"Dilatasi",  icon:"maximize-2",       symbol:"#mask-sekartaji" }
};

const MATERI = {
  bapang:{
    formula:"T(x,y) = (x+a, y+b)",
    body:"Bapang digambarkan gagah dan tegas — wajahnya bergerak lurus dari satu titik ke titik lain tanpa berubah bentuk, ukuran, maupun arah hadap. Inilah <strong>translasi</strong>: pergeseran murni sejauh vektor (a, b).",
    culture:"Dalam pertunjukan, Bapang selalu melangkah maju dengan gestur lugas — melambangkan pergerakan yang konsisten, seperti translasi yang memindahkan tiap titik dengan jarak dan arah yang sama."
  },
  panji:{
    formula:"Terhadap sumbu Y: (x,y) → (−x, y)",
    body:"Panji adalah topeng paling halus dan simetris. Wajahnya seolah menjadi cermin sempurna dari dirinya sendiri. Inilah <strong>refleksi</strong>: pencerminan titik terhadap suatu garis (sumbu X, sumbu Y, atau garis lain), menghasilkan bayangan sejauh jarak yang sama di sisi berlawanan.",
    culture:"Kehalusan wajah Panji mencerminkan filosofi keseimbangan batin — sama seperti refleksi yang selalu menghasilkan bentuk kongruen, hanya berbeda arah hadap."
  },
  klana:{
    formula:"R(θ) : (x,y) → (x cosθ − y sinθ, x sinθ + y cosθ)",
    body:"Klana tampil garang dan penuh gerak — topeng ini identik dengan tarian berputar mengelilingi satu titik pusat. Inilah <strong>rotasi</strong>: perputaran suatu titik sejauh sudut θ mengelilingi titik pusat tertentu, tanpa mengubah jarak titik terhadap pusat.",
    culture:"Tari Topeng Klana terkenal dengan gerakan memutar yang dinamis — visualisasi hidup dari rotasi 0° hingga 360° mengelilingi titik porosnya."
  },
  sekartaji:{
    formula:"D(k) : (x,y) → (kx, ky)",
    body:"Sekartaji digambarkan anggun dan proporsional dalam segala ukuran. Inilah <strong>dilatasi</strong>: perbesaran atau perkecilan bentuk dengan faktor skala k terhadap titik pusat, di mana bentuk tetap sebangun (mirip) dengan aslinya.",
    culture:"Keluwesan Sekartaji dalam berbagai adegan — dari sosok kecil hingga anggun membesar di panggung — merepresentasikan bagaimana dilatasi menjaga proporsi meski ukurannya berubah."
  }
};

const PRETEST = [
  {topic:"Translasi", q:"Titik A(2,3) ditranslasikan oleh vektor (4,-1). Koordinat bayangannya adalah...", opts:["(6,2)","(−2,4)","(6,4)","(2,2)"], correct:0,
    explanation:"Translasi tinggal menjumlahkan komponen vektor ke koordinat asal: (x+a, y+b) = (2+4, 3+(−1)) = (6,2)."},
  {topic:"Refleksi", q:"Bayangan titik B(5,2) hasil refleksi terhadap sumbu Y adalah...", opts:["(5,-2)","(-5,2)","(-5,-2)","(2,5)"], correct:1,
    explanation:"Refleksi terhadap sumbu Y membalik tanda x saja, nilai y tetap: (x,y) → (−x,y), jadi (5,2) → (−5,2)."},
  {topic:"Rotasi", q:"Titik C(3,0) dirotasikan 90° berlawanan arah jarum jam terhadap pusat O. Hasilnya adalah...", opts:["(0,3)","(3,0)","(0,-3)","(-3,0)"], correct:0,
    explanation:"Rotasi 90° berlawanan jarum jam memetakan (x,y) → (−y,x). Karena y=0, hasilnya (0,3)."},
  {topic:"Dilatasi", q:"Titik D(2,4) didilatasikan dengan faktor skala k=3 terhadap pusat O. Hasilnya adalah...", opts:["(5,7)","(2,12)","(6,12)","(6,4)"], correct:2,
    explanation:"Dilatasi mengalikan tiap koordinat dengan k: (2×3, 4×3) = (6,12)."},
  {topic:"Kontekstual Topeng", q:"Gerakan tari Topeng Klana yang berputar mengelilingi titik tengah panggung paling menggambarkan transformasi...", opts:["Translasi","Refleksi","Rotasi","Dilatasi"], correct:2,
    explanation:"Gerak memutar mengelilingi satu titik pusat dengan jarak yang tetap ke pusat itu adalah ciri khas rotasi."}
];

const POSTTEST = [
  {topic:"Translasi", q:"Titik P(-1,5) ditranslasikan oleh vektor (3,2). Koordinat bayangannya adalah...", opts:["(2,7)","(-4,3)","(2,3)","(4,7)"], correct:0,
    explanation:"(x+a, y+b) = (−1+3, 5+2) = (2,7)."},
  {topic:"Refleksi", q:"Bayangan titik Q(-4,6) hasil refleksi terhadap sumbu X adalah...", opts:["(4,-6)","(-4,-6)","(4,6)","(-6,4)"], correct:1,
    explanation:"Refleksi terhadap sumbu X membalik tanda y, x tetap: (x,y) → (x,−y), jadi (−4,6) → (−4,−6)."},
  {topic:"Rotasi", q:"Titik R(0,4) dirotasikan 180° terhadap pusat O. Hasilnya adalah...", opts:["(4,0)","(0,-4)","(0,4)","(-4,0)"], correct:1,
    explanation:"Rotasi 180° memetakan (x,y) → (−x,−y). Karena x=0, hasilnya (0,−4)."},
  {topic:"Dilatasi", q:"Titik S(6,9) didilatasikan dengan faktor skala k=1/3 terhadap pusat O. Hasilnya adalah...", opts:["(2,3)","(18,27)","(3,2)","(2,6)"], correct:0,
    explanation:"Dikalikan k=1/3: (6×1/3, 9×1/3) = (2,3)."},
  {topic:"Kontekstual Topeng", q:"Ukiran topeng Sekartaji yang dibuat dalam versi mini (suvenir) hingga versi panggung berukuran besar, dengan bentuk tetap sebangun, menggambarkan konsep...", opts:["Translasi","Rotasi","Refleksi","Dilatasi"], correct:3,
    explanation:"Perubahan ukuran tanpa mengubah kesebangunan bentuk (proporsinya tetap) adalah ciri khas dilatasi."}
];

const MISSIONS = [
  {id:"m1", title:"Kenali Empat Topeng", desc:"Buka dan baca keempat kartu materi transformasi.", xp:50, requires:"materiRead", icon:"book-open"},
  {id:"m2", title:"Jelajahi Bidang Cartesian", desc:"Coba minimal 4 kontrol berbeda di halaman Eksplorasi.", xp:60, requires:"exploreInteractions", icon:"move"},
  {id:"m3", title:"Tuntaskan Pretest", desc:"Selesaikan kuis diagnostik 5 soal.", xp:70, requires:"pretestDone", icon:"clipboard-check"},
  {id:"m4", title:"Tuntaskan Posttest", desc:"Buktikan peningkatan pemahamanmu lewat evaluasi akhir.", xp:100, requires:"posttestDone", icon:"trophy"}
];

const BADGES = [
  {id:"m1", char:"bapang", name:"Sang Penjelajah"},
  {id:"m2", char:"panji", name:"Pengamat Cermat"},
  {id:"m3", char:"klana", name:"Pemberani Uji"},
  {id:"m4", char:"sekartaji", name:"Master Topeng"}
];

const LEVELS = [
  {name:"Penjelajah", min:0},
  {name:"Pelajar Muda", min:100},
  {name:"Ahli Transformasi", min:250},
  {name:"Master Topeng", min:450}
];

/* ---------- TOAST NOTIFICATIONS ---------- */
let toastStack = null;
function ensureToastStack(){
  if(toastStack) return toastStack;
  toastStack = document.createElement("div");
  toastStack.className = "toast-stack";
  toastStack.setAttribute("aria-live","polite");
  toastStack.setAttribute("aria-atomic","false");
  document.body.appendChild(toastStack);
  return toastStack;
}
const TOAST_ICONS = { success:"check-circle-2", error:"alert-circle", warning:"alert-triangle", info:"info" };
function showToast({type="info", title="", message="", duration=4000}={}){
  const stack = ensureToastStack();
  const el = document.createElement("div");
  el.className = `toast toast-${type}`;
  el.innerHTML = `
    <i data-lucide="${TOAST_ICONS[type]||TOAST_ICONS.info}" class="toast-icon"></i>
    <div class="toast-body">
      ${title ? `<strong>${title}</strong>` : ""}
      ${message ? `<span>${message}</span>` : ""}
    </div>
    <button class="toast-close" aria-label="Tutup notifikasi"><i data-lucide="x"></i></button>
    <div class="toast-bar"><div class="toast-bar-fill"></div></div>`;
  stack.appendChild(el);
  refreshIcons();
  requestAnimationFrame(()=>el.classList.add("show"));

  const fill = el.querySelector(".toast-bar-fill");
  if(fill) fill.style.animationDuration = duration+"ms";

  let removed = false;
  function remove(){
    if(removed) return;
    removed = true;
    clearTimeout(timer);
    el.classList.remove("show");
    el.classList.add("hide");
    setTimeout(()=>el.remove(), 260);
  }
  const timer = setTimeout(remove, duration);
  el.querySelector(".toast-close").addEventListener("click", remove);
  el.addEventListener("mouseenter", ()=>{ clearTimeout(timer); if(fill) fill.style.animationPlayState="paused"; });
  el.addEventListener("mouseleave", ()=>{ if(fill) fill.style.animationPlayState="running"; setTimeout(remove, 1200); });
  return { remove };
}
function toastSuccess(title, message, duration){ return showToast({type:"success", title, message, duration}); }
function toastError(title, message, duration){ return showToast({type:"error", title, message, duration:duration||5500}); }
function toastWarning(title, message, duration){ return showToast({type:"warning", title, message, duration:duration||4800}); }
function toastInfo(title, message, duration){ return showToast({type:"info", title, message, duration}); }

/* ---------- STATE ---------- */

const DEFAULT_STATE = {
  name:"", xp:0,
  pretest:null, posttest:null,
  materiRead:{}, exploreInteractions:0, missionsDone:{},
  currentCharKey:"panji"
};

let stateLoadWasCorrupt = false;
function loadState(){
  try{
    const raw = localStorage.getItem("geotopeng_state");
    if(!raw) return {...DEFAULT_STATE};
    return {...DEFAULT_STATE, ...JSON.parse(raw)};
  }catch(e){ stateLoadWasCorrupt = true; return {...DEFAULT_STATE}; }
}
function saveState(){
  try{
    localStorage.setItem("geotopeng_state", JSON.stringify(STATE));
    return true;
  }catch(e){
    toastError("Gagal menyimpan progress", "Penyimpanan browser penuh atau diblokir (mode privat?). Perubahan mungkin hilang saat halaman ditutup.");
    return false;
  }
}
let STATE = loadState();

function getLevel(){
  let lvl = LEVELS[0], idx=0;
  LEVELS.forEach((l,i)=>{ if(STATE.xp >= l.min){ lvl=l; idx=i; } });
  return {...lvl, index:idx+1};
}
function addXP(amount){
  const before = getLevel();
  STATE.xp += amount;
  saveState();
  refreshGlobalStats();
  const after = getLevel();
  if(after.index > before.index){
    setTimeout(()=>toastSuccess(`Naik ke Level ${after.index}! 🎉`, after.name, 5000), 550);
  }
}

/* ---------- ICONS ---------- */
function refreshIcons(){ if(window.lucide) lucide.createIcons(); }

/* ---------- ROUTER ---------- */
const views = document.querySelectorAll(".view");
const navGuest = document.getElementById("navGuest");
const navApp = document.getElementById("navApp");
const mobileDrawer = document.getElementById("mobileDrawer");

function navigate(viewName){
  stopNarration();
  views.forEach(v=>v.dataset.active = (v.dataset.view===viewName) ? "true":"false");
  document.querySelectorAll("[data-nav]").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.nav===viewName);
  });
  window.scrollTo({top:0,behavior:"smooth"});
  mobileDrawer.classList.remove("open");

  if(viewName==="landing"){ navGuest.hidden = false; navApp.hidden = true; }
  else { navGuest.hidden = true; navApp.hidden = false; }
  if(viewName==="dashboard") renderDashboard();
  if(viewName==="pretest") renderQuiz("pretest");
  if(viewName==="posttest") renderQuiz("posttest");
  if(viewName==="materi") renderMateri();
  if(viewName==="eksplorasi") renderExplore();
  if(viewName==="misi") renderMissions();
  if(viewName==="reward") renderReward();
  if(viewName==="profil") renderProfil();
}

document.addEventListener("click", (e)=>{
  const btn = e.target.closest("[data-nav]");
  if(btn){
    e.preventDefault();
    navigate(btn.dataset.nav);
    return;
  }
  const scrollBtn = e.target.closest("[data-scroll]");
  if(scrollBtn){
    e.preventDefault();
    const doScroll = ()=>{
      const target = document.getElementById(scrollBtn.dataset.scroll);
      if(target) target.scrollIntoView({behavior:"smooth"});
    };
    const landingView = document.querySelector('.view[data-view="landing"]');
    if(landingView && landingView.dataset.active !== "true"){
      navigate("landing");
      setTimeout(doScroll, 60);
    } else {
      doScroll();
    }
  }
});

document.getElementById("hamburgerBtn").addEventListener("click", ()=>{
  if(!mobileDrawer.dataset.built){ buildMobileDrawer(); }
  mobileDrawer.classList.toggle("open");
});
function buildMobileDrawer(){
  mobileDrawer.dataset.built = "true";
  const isApp = !navApp.hidden;
  const items = isApp
    ? [["dashboard","house","Beranda"],["materi","book-open","Belajar"],["misi","compass","Misi"],["reward","trophy","Reward"],["profil","user","Profil"]]
    : [["landing","house","Beranda"],["dashboard","arrow-right","Mulai Belajar"]];
  mobileDrawer.innerHTML = items.map(([v,i,l])=>`<button data-nav="${v}"><i data-lucide="${i}"></i>${l}</button>`).join("");
  refreshIcons();
}

/* ---------- ACCESSIBILITY WIDGET (ukuran teks & kontras) ---------- */
function loadA11yPrefs(){
  try{
    return {textSize:"normal", contrast:"normal", ...JSON.parse(localStorage.getItem("geotopeng_a11y")||"{}")};
  }catch(e){ return {textSize:"normal", contrast:"normal"}; }
}
function saveA11yPrefs(prefs){
  try{ localStorage.setItem("geotopeng_a11y", JSON.stringify(prefs)); }catch(e){}
}
function initA11yWidget(){
  const toggleBtn = document.getElementById("a11yToggleBtn");
  const panel = document.getElementById("a11yPanel");
  const textBtns = document.querySelectorAll("#a11yTextSizeRow .a11y-opt");
  const contrastBtn = document.getElementById("a11yContrastBtn");
  let prefs = loadA11yPrefs();

  function applyPrefs(){
    if(prefs.textSize === "normal"){ document.documentElement.removeAttribute("data-a11y-text"); }
    else{ document.documentElement.setAttribute("data-a11y-text", prefs.textSize); }

    if(prefs.contrast === "high"){ document.documentElement.setAttribute("data-a11y-contrast","high"); }
    else{ document.documentElement.removeAttribute("data-a11y-contrast"); }

    textBtns.forEach(b=> b.setAttribute("aria-pressed", String(b.dataset.textsize === prefs.textSize)));
    contrastBtn.setAttribute("aria-checked", String(prefs.contrast === "high"));
  }
  applyPrefs();

  function openPanel(){
    panel.hidden = false;
    toggleBtn.setAttribute("aria-expanded","true");
    document.addEventListener("click", onOutsideClick);
    document.addEventListener("keydown", onKeydown);
  }
  function closePanel(focusToggle){
    panel.hidden = true;
    toggleBtn.setAttribute("aria-expanded","false");
    document.removeEventListener("click", onOutsideClick);
    document.removeEventListener("keydown", onKeydown);
    if(focusToggle) toggleBtn.focus();
  }
  function onOutsideClick(e){
    if(!panel.contains(e.target) && e.target !== toggleBtn && !toggleBtn.contains(e.target)){ closePanel(false); }
  }
  function onKeydown(e){
    if(e.key === "Escape"){ closePanel(true); }
  }

  toggleBtn.addEventListener("click", ()=>{
    if(panel.hidden) openPanel(); else closePanel(false);
  });

  textBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      prefs = {...prefs, textSize: btn.dataset.textsize};
      saveA11yPrefs(prefs);
      applyPrefs();
    });
  });

  contrastBtn.addEventListener("click", ()=>{
    prefs = {...prefs, contrast: prefs.contrast === "high" ? "normal" : "high"};
    saveA11yPrefs(prefs);
    applyPrefs();
  });
}

/* ---------- AUDIO & NARASI (Web Speech API, tanpa autoplay) ---------- */
let AUDIO_PREFS = { volume:0.8, feedback:true };
let audioContext = null;
function loadAudioPrefs(){
  try{ AUDIO_PREFS = {...AUDIO_PREFS, ...JSON.parse(localStorage.getItem("geotopeng_audio")||"{}")}; }catch(e){}
}
function saveAudioPrefs(){ try{ localStorage.setItem("geotopeng_audio", JSON.stringify(AUDIO_PREFS)); }catch(e){} }
function stopNarration(){
  if("speechSynthesis" in window) window.speechSynthesis.cancel();
  const play=document.getElementById("audioNarrateBtn"), stop=document.getElementById("audioStopBtn"), status=document.getElementById("audioStatus");
  if(play) play.disabled=false; if(stop) stop.disabled=true; if(status) status.textContent="Siap digunakan.";
}
function playFeedback(kind="tap"){
  if(!AUDIO_PREFS.feedback) return;
  try{
    audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();
    const oscillator=audioContext.createOscillator(), gain=audioContext.createGain();
    oscillator.type="sine"; oscillator.frequency.value=kind==="success"?660:kind==="wrong"?220:440;
    gain.gain.setValueAtTime(.0001,audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.055*AUDIO_PREFS.volume+.005,audioContext.currentTime+.01);
    gain.gain.exponentialRampToValueAtTime(.0001,audioContext.currentTime+(kind==="success"?.28:.12));
    oscillator.connect(gain).connect(audioContext.destination); oscillator.start(); oscillator.stop(audioContext.currentTime+(kind==="success"?.3:.14));
  }catch(e){}
}
function getNarrationText(){
  const active=document.querySelector('.view[data-active="true"]');
  if(!active) return "Selamat datang di GEOTOPENG.";
  return [...active.querySelectorAll("h1,h2,h3,.eyebrow,p")]
    .filter(el=>!el.closest("nav,button,.quiz-options,.recap-detail")&&el.offsetParent!==null)
    .map(el=>el.textContent.replace(/\s+/g," ").trim()).filter(Boolean).join(". ").slice(0,2600)||"Halaman GEOTOPENG siap dipelajari.";
}
function initAudioWidget(){
  loadAudioPrefs();
  const toggle=document.getElementById("audioToggleBtn"),panel=document.getElementById("audioPanel"),play=document.getElementById("audioNarrateBtn"),stop=document.getElementById("audioStopBtn"),volume=document.getElementById("audioVolume"),volumeValue=document.getElementById("audioVolumeValue"),feedback=document.getElementById("audioFeedbackBtn"),status=document.getElementById("audioStatus");
  if(!toggle||!panel) return;
  volume.value=String(AUDIO_PREFS.volume); volumeValue.textContent=Math.round(AUDIO_PREFS.volume*100)+"%"; feedback.setAttribute("aria-checked",String(AUDIO_PREFS.feedback));
  toggle.addEventListener("click",()=>{panel.hidden=!panel.hidden;toggle.setAttribute("aria-expanded",String(!panel.hidden));});
  document.addEventListener("click",e=>{if(!panel.hidden&&!panel.contains(e.target)&&!toggle.contains(e.target)){panel.hidden=true;toggle.setAttribute("aria-expanded","false");}});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden){panel.hidden=true;toggle.setAttribute("aria-expanded","false");toggle.focus();}});
  volume.addEventListener("input",()=>{AUDIO_PREFS.volume=Number(volume.value);volumeValue.textContent=Math.round(AUDIO_PREFS.volume*100)+"%";saveAudioPrefs();});
  feedback.addEventListener("click",()=>{AUDIO_PREFS.feedback=!AUDIO_PREFS.feedback;feedback.setAttribute("aria-checked",String(AUDIO_PREFS.feedback));saveAudioPrefs();if(AUDIO_PREFS.feedback)playFeedback();});
  stop.addEventListener("click",stopNarration);
  play.addEventListener("click",()=>{
    if(!("speechSynthesis" in window)){status.textContent="Browser ini belum mendukung narasi suara.";return;}
    stopNarration(); const utterance=new SpeechSynthesisUtterance(getNarrationText()); const voices=window.speechSynthesis.getVoices();
    utterance.voice=voices.find(v=>/^id[-_]/i.test(v.lang))||voices.find(v=>/indonesia/i.test(v.name))||null;
    utterance.lang="id-ID";utterance.rate=.94;utterance.pitch=1;utterance.volume=AUDIO_PREFS.volume;
    utterance.onstart=()=>{play.disabled=true;stop.disabled=false;status.textContent="Sedang membacakan halaman…";}; utterance.onend=stopNarration;
    utterance.onerror=()=>{stopNarration();status.textContent="Narasi gagal diputar. Coba gunakan Chrome atau Edge.";}; window.speechSynthesis.speak(utterance);
  });
  document.addEventListener("click",e=>{if(e.target.closest("button")&&!e.target.closest("#audioNarrateBtn,#audioStopBtn,#audioFeedbackBtn"))playFeedback();});
}

/* ---------- DASHBOARD ---------- */
function refreshGlobalStats(){
  const lvl = getLevel();
  const badgeCount = Object.keys(STATE.missionsDone).length;
  const els = {
    statLevel: document.getElementById("statLevel"),
    statXP: document.getElementById("statXP"),
    statProgress: document.getElementById("statProgress"),
    statBadges: document.getElementById("statBadges"),
    dashName: document.getElementById("dashName")
  };
  if(els.statLevel) els.statLevel.textContent = lvl.index;
  if(els.statXP) els.statXP.textContent = STATE.xp;
  if(els.statProgress) els.statProgress.textContent = Math.round((Object.keys(STATE.missionsDone).length/MISSIONS.length)*100)+"%";
  if(els.statBadges) els.statBadges.textContent = `${badgeCount}/4`;
  if(els.dashName) els.dashName.textContent = STATE.name || "Penjelajah";
}

function renderDashboard(){
  refreshGlobalStats();
  const hour = new Date().getHours();
  document.getElementById("greetTime").textContent = hour<11?"Selamat pagi":hour<15?"Selamat siang":hour<18?"Selamat sore":"Selamat malam";

  const modules = [
    {view:"pretest", icon:"clipboard-check", title:"Pretest", desc:"Ukur pemahaman awalmu.", tag: STATE.pretest ? "Selesai" : "Mulai di sini"},
    {view:"materi", icon:"book-open", title:"Materi", desc:"Pelajari 4 karakter transformasi.", tag:`${Object.keys(STATE.materiRead).length}/4 dibaca`},
    {view:"eksplorasi", icon:"compass", title:"Eksplorasi", desc:"Coba geser, putar, skalakan topeng.", tag:"Discovery Learning"},
    {view:"misi", icon:"gamepad-2", title:"Misi", desc:"Selesaikan misi, kumpulkan XP.", tag:`${Object.keys(STATE.missionsDone).length}/4 misi`},
    {view:"posttest", icon:"trophy", title:"Posttest", desc:"Buktikan peningkatan pemahamanmu.", tag: STATE.posttest ? "Selesai" : (STATE.pretest? "Mulai" : "Kerjakan pretest dulu")},
    {view:"reward", icon:"medal", title:"Reward", desc:"Lihat level dan koleksi badge.", tag:"Galeri"}
  ];
  document.getElementById("moduleGrid").innerHTML = modules.map(m=>`
    <button class="module-card" data-nav="${m.view}">
      <i data-lucide="${m.icon}"></i>
      <h3>${m.title}</h3>
      <p>${m.desc}</p>
      <span class="tag">${m.tag}</span>
    </button>`).join("");
  refreshIcons();
}

/* ---------- QUIZ (shared for pretest / posttest) ---------- */
function shuffleArray(arr){
  const a = [...arr];
  for(let i=a.length-1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}
/* Sesi kuis disimpan di luar renderQuiz() supaya kalau siswa nggak
   sengaja pindah halaman (klik menu lain) di tengah mengerjakan,
   soal & jawaban yang sudah dipilih tidak hilang — begitu kembali
   ke Pretest/Posttest, posisinya tetap sama. Sesi baru dibuat cuma
   kalau kuis itu belum pernah dimulai, atau sudah pernah selesai
   (STATE.pretest/posttest sudah terisi) sehingga siap dikerjakan ulang.
*/
const quizSessions = { pretest:null, posttest:null };

function renderQuiz(kind){
  const data = kind==="pretest" ? PRETEST : POSTTEST;
  const stateKey = kind;
  const area = document.getElementById(kind+"Area");
  const progressBar = document.getElementById(kind+"ProgressBar");

  // Mulai sesi baru kalau belum ada sesi tersimpan, atau kuis ini
  // sudah pernah dituntaskan sebelumnya (berarti ini percobaan baru).
  if(!quizSessions[kind] || STATE[stateKey]){
    quizSessions[kind] = {
      // Urutan soal diacak tiap kuis dibuka, dan urutan opsi tiap soal
      // juga diacak sendiri-sendiri — supaya pengulangan kuis nggak
      // sekadar dihafal posisinya. `answers` tetap disimpan berdasarkan
      // indeks soal ASLI (bukan urutan tampilan) supaya rekap & sertifikat
      // PDF di halaman Profil tetap kompatibel tanpa perlu diubah.
      order: shuffleArray(data.map((_,i)=>i)),
      optOrders: data.map(item => shuffleArray(item.opts.map((_,i)=>i))),
      current: 0,
      answers: new Array(data.length).fill(null)
    };
  }
  const session = quizSessions[kind];
  const { order, optOrders, answers } = session;

  function draw(){
    progressBar.style.width = Math.round(((session.current)/data.length)*100)+"%";
    const realIndex = order[session.current];
    const item = data[realIndex];
    const optOrder = optOrders[realIndex];
    const selectedOrig = answers[realIndex];
    const selectedDisplayIdx = selectedOrig===null ? -1 : optOrder.indexOf(selectedOrig);
    area.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-q-label">Soal ${session.current+1} dari ${data.length} &middot; ${item.topic}</div>
        <p class="quiz-q-text">${item.q}</p>
        <div class="quiz-options">
          ${optOrder.map((origI,di)=>`
            <button class="quiz-option ${selectedDisplayIdx===di?'selected':''}" data-orig="${origI}">
              <span class="opt-letter">${String.fromCharCode(65+di)}</span>${item.opts[origI]}
            </button>`).join("")}
        </div>
      </div>
      <div class="quiz-nav">
        <button class="btn btn-secondary" id="quizPrev" ${session.current===0?'disabled':''}><i data-lucide="arrow-left"></i> Kembali</button>
        <button class="btn btn-primary" id="quizNext" ${answers[realIndex]===null?'disabled':''}>
          ${session.current===data.length-1 ? 'Selesai' : 'Lanjut'} <i data-lucide="arrow-right"></i>
        </button>
      </div>`;
    refreshIcons();

    area.querySelectorAll(".quiz-option").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        answers[realIndex] = parseInt(btn.dataset.orig);
        draw();
      });
    });
    document.getElementById("quizPrev").addEventListener("click", ()=>{ session.current--; draw(); });
    document.getElementById("quizNext").addEventListener("click", ()=>{
      if(session.current < data.length-1){ session.current++; draw(); }
      else finish();
    });
  }

  function finish(){
    let score = 0;
    answers.forEach((a,i)=>{ if(a===data[i].correct) score++; });
    const percent = Math.round((score/data.length)*100);
    playFeedback(percent >= 70 ? "success" : "wrong");
    STATE[stateKey] = {score, percent, answers, total:data.length};
    saveState();
    quizSessions[kind] = null; // sesi ditutup, percobaan berikutnya mulai baru & teracak ulang
    if(kind==="pretest") completeMission("m3", "pretestDone");
    if(kind==="posttest") completeMission("m4", "posttestDone");
    progressBar.style.width = "100%";
    setTimeout(()=>{
      toastSuccess(
        `${kind==="pretest"?"Pretest":"Posttest"} selesai!`,
        `Skor kamu ${score}/${data.length} (${percent}%).`
      );
    }, 150);
    area.innerHTML = `
      <div class="quiz-result">
        <p class="eyebrow" style="justify-content:center;display:flex;">Hasil ${kind==="pretest"?"Pretest":"Posttest"}</p>
        <div class="score-big">${score}/${data.length}</div>
        <p>Skor kamu: ${percent}%. ${kind==="pretest" ? "Yuk lanjut ke Materi untuk memperdalam pemahamanmu." : "Terima kasih sudah menuntaskan perjalanan GEOTOPENG!"}</p>
        <div style="display:flex;gap:12px;justify-content:center;margin-top:20px;flex-wrap:wrap;">
          <button class="btn btn-primary" data-nav="${kind==='pretest' ? 'materi' : 'profil'}">${kind==='pretest' ? 'Lanjut ke Materi' : 'Lihat Profil'} <i data-lucide="arrow-right"></i></button>
          <button class="btn btn-ghost" data-nav="dashboard">Kembali ke Beranda</button>
        </div>
      </div>`;
    refreshIcons();
  }

  draw();
}

/* ---------- MATERI ---------- */
function renderMateri(){
  const tabs = document.getElementById("materiTabs");
  tabs.innerHTML = Object.values(CHARACTERS).map(c=>`
    <button class="tab-btn ${STATE.currentCharKey===c.key?'active':''}" data-char="${c.key}">
      <svg viewBox="0 0 200 240"><use href="${c.symbol}"/></svg> ${c.name}
    </button>`).join("");
  tabs.querySelectorAll("[data-char]").forEach(btn=>{
    btn.addEventListener("click", ()=>{ STATE.currentCharKey = btn.dataset.char; renderMateri(); });
  });

  const c = CHARACTERS[STATE.currentCharKey];
  const m = MATERI[c.key];
  STATE.materiRead[c.key] = true;
  saveState();
  checkMateriMission();

  document.getElementById("materiPanel").innerHTML = `
    <div class="materi-visual">
      <svg class="big-mask" viewBox="0 0 200 240"><use href="${c.symbol}"/></svg>
      <span class="char-name">${c.name}</span>
      <span class="muted">${c.topic}</span>
    </div>
    <div class="materi-body">
      <h3>${c.topic}</h3>
      <span class="formula-pill">${m.formula}</span>
      <p>${m.body}</p>
      <div class="culture-note"><i data-lucide="scroll-text"></i> ${m.culture}</div>
      <div style="margin-top:22px;">
        <button class="btn btn-primary" data-nav="eksplorasi">Coba di Eksplorasi <i data-lucide="arrow-right"></i></button>
      </div>
    </div>`;
  refreshIcons();
}
function checkMateriMission(){
  if(Object.keys(STATE.materiRead).length >= 4) completeMission("m1","materiRead");
}

/* ---------- EKSPLORASI ---------- */
let exploreTouched = new Set();
function renderExplore(){
  const tabsEl = document.getElementById("exploreCharTabs");
  tabsEl.innerHTML = Object.values(CHARACTERS).map(c=>`
    <button class="${STATE.currentCharKey===c.key?'active':''}" data-char="${c.key}" title="${c.name}">
      <svg viewBox="0 0 200 240"><use href="${c.symbol}"/></svg>
    </button>`).join("");
  tabsEl.querySelectorAll("[data-char]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      STATE.currentCharKey = btn.dataset.char;
      document.getElementById("maskUse").setAttribute("href", CHARACTERS[STATE.currentCharKey].symbol);
      document.getElementById("maskGhost").querySelector("use").setAttribute("href", CHARACTERS[STATE.currentCharKey].symbol);
      renderExplore();
    });
  });

  // build grid lines once
  const gridGroup = document.getElementById("gridGroup");
  if(!gridGroup.dataset.built){
    let lines = "";
    for(let i=20;i<=380;i+=20){
      lines += `<line x1="${i}" y1="20" x2="${i}" y2="380" class="grid-line"/>`;
      lines += `<line x1="20" y1="${i}" x2="380" y2="${i}" class="grid-line"/>`;
    }
    gridGroup.innerHTML = lines;
    gridGroup.dataset.built = "true";
  }
  document.getElementById("maskUse").setAttribute("href", CHARACTERS[STATE.currentCharKey].symbol);
  document.getElementById("maskGhost").querySelector("use").setAttribute("href", CHARACTERS[STATE.currentCharKey].symbol);

  const ctrlTX = document.getElementById("ctrlTX"), ctrlTY = document.getElementById("ctrlTY");
  const ctrlRot = document.getElementById("ctrlRot"), ctrlScale = document.getElementById("ctrlScale");
  const ctrlReflect = document.getElementById("ctrlReflect");

  function update(){
    const tx = parseInt(ctrlTX.value), ty = parseInt(ctrlTY.value);
    const rot = parseInt(ctrlRot.value), scale = parseFloat(ctrlScale.value);
    const reflect = ctrlReflect.value;

    document.getElementById("valTX").textContent = tx;
    document.getElementById("valTY").textContent = ty;
    document.getElementById("valRot").textContent = rot+"°";
    document.getElementById("valScale").textContent = scale.toFixed(1)+"×";

    const baseX = 200 + tx*20;
    const baseY = 200 - ty*20;
    let scaleX = scale, scaleY = scale;
    if(reflect==="x") scaleY *= -1;
    if(reflect==="y") scaleX *= -1;

    const g = document.getElementById("maskGroup");
    g.setAttribute("transform", `translate(${baseX},${baseY}) rotate(${rot}) scale(${scaleX},${scaleY})`);

    const px = 2+tx, py = 2+ty;
    document.getElementById("formulaText").textContent =
      `(2,2) → geser(${tx>=0?'+':''}${tx},${ty>=0?'+':''}${ty}) → putar ${rot}° → skala ${scale.toFixed(1)}× ${reflect!=='none' ? '→ cermin '+reflect.toUpperCase() : ''}`;
  }

  [ctrlTX,ctrlTY,ctrlRot,ctrlScale,ctrlReflect].forEach(el=>{
    el.oninput = ()=>{
      update();
      exploreTouched.add(el.id);
      STATE.exploreInteractions = exploreTouched.size;
      saveState();
      if(exploreTouched.size >= 4) completeMission("m2","exploreInteractions");
    };
  });

  /* ---------- Mode Tantangan ---------- */
  const CHALLENGES = [
    {instruction:"Geser topeng sejauh (+4, +3) dari posisi awal. Jangan ubah rotasi, skala, atau refleksi.", target:{tx:4,ty:3,rot:0,scale:1,reflect:"none"}},
    {instruction:"Geser topeng sejauh (−5, +2) dari posisi awal.", target:{tx:-5,ty:2,rot:0,scale:1,reflect:"none"}},
    {instruction:"Cerminkan topeng terhadap sumbu Y — tanpa geser, putar, atau ubah skala.", target:{tx:0,ty:0,rot:0,scale:1,reflect:"y"}},
    {instruction:"Cerminkan topeng terhadap sumbu X.", target:{tx:0,ty:0,rot:0,scale:1,reflect:"x"}},
    {instruction:"Putar topeng 90° searah jarum jam, tanpa mengubah posisi atau ukuran.", target:{tx:0,ty:0,rot:90,scale:1,reflect:"none"}},
    {instruction:"Putar topeng 180° dari posisi awal.", target:{tx:0,ty:0,rot:180,scale:1,reflect:"none"}},
    {instruction:"Perbesar topeng jadi 2× dari ukuran awal, posisi tetap di tengah.", target:{tx:0,ty:0,rot:0,scale:2,reflect:"none"}},
    {instruction:"Perkecil topeng jadi setengah (0,5×) dari ukuran awal.", target:{tx:0,ty:0,rot:0,scale:0.5,reflect:"none"}}
  ];
  let currentChallenge = null;
  const challengeInstruction = document.getElementById("challengeInstruction");
  const challengeStartBtn = document.getElementById("challengeStartBtn");
  const challengeCheckBtn = document.getElementById("challengeCheckBtn");

  function pickChallenge(){
    let next;
    do{ next = CHALLENGES[Math.floor(Math.random()*CHALLENGES.length)]; }
    while(currentChallenge && next.instruction===currentChallenge.instruction && CHALLENGES.length>1);
    currentChallenge = next;
    ctrlTX.value=0; ctrlTY.value=0; ctrlRot.value=0; ctrlScale.value=1; ctrlReflect.value="none";
    update();
    challengeInstruction.textContent = currentChallenge.instruction;
    challengeStartBtn.innerHTML = `<i data-lucide="shuffle"></i> Tantangan Lain`;
    challengeCheckBtn.hidden = false;
    refreshIcons();
  }

  challengeStartBtn.onclick = pickChallenge;
  challengeCheckBtn.onclick = ()=>{
    if(!currentChallenge) return;
    const t = currentChallenge.target;
    const tx = parseInt(ctrlTX.value), ty = parseInt(ctrlTY.value);
    const rot = parseInt(ctrlRot.value), scale = parseFloat(ctrlScale.value);
    const reflect = ctrlReflect.value;

    const okTX = tx===t.tx, okTY = ty===t.ty, okRot = rot===t.rot,
          okScale = Math.abs(scale-t.scale)<0.05, okReflect = reflect===t.reflect;
    const allOk = okTX && okTY && okRot && okScale && okReflect;

    if(allOk){
      toastSuccess("Tepat sekali! 🎯", "Jawabanmu sesuai target. +5 XP", 3500);
      addXP(5);
      setTimeout(pickChallenge, 900);
    } else {
      const hints = [];
      if(!okTX || !okTY) hints.push("posisi geser (X/Y)");
      if(!okRot) hints.push("sudut rotasi");
      if(!okScale) hints.push("skala");
      if(!okReflect) hints.push("refleksi");
      toastWarning("Belum tepat", `Coba cek lagi bagian: ${hints.join(", ")}.`, 4000);
    }
  };

  document.getElementById("resetExplore").onclick = ()=>{
    ctrlTX.value=0; ctrlTY.value=0; ctrlRot.value=0; ctrlScale.value=1; ctrlReflect.value="none";
    update();
    toastInfo("Eksplorasi direset", "Semua kontrol dikembalikan ke posisi awal.", 2500);
  };

  update();
}

/* ---------- MISI ---------- */
function completeMission(id, flagKey){
  if(STATE.missionsDone[id]) return;
  const mission = MISSIONS.find(m=>m.id===id);
  if(!mission) return;
  STATE.missionsDone[id] = true;
  const ok = saveState();
  if(ok) toastSuccess("Misi selesai! 🎉", `${mission.title} · +${mission.xp} XP`);
  addXP(mission.xp);
}
function missionUnlocked(index){
  if(index===0) return true;
  const prev = MISSIONS[index-1];
  return !!STATE.missionsDone[prev.id];
}
function renderMissions(){
  document.getElementById("missionGrid").innerHTML = MISSIONS.map((m,i)=>{
    const unlocked = missionUnlocked(i);
    const done = !!STATE.missionsDone[m.id];
    const char = Object.values(CHARACTERS)[i];
    return `
    <div class="mission-card ${!unlocked && !done ? 'locked':''}" data-mission="${m.id}" data-mission-index="${i}" role="button" tabindex="0">
      ${done ? `<span class="mission-done"><i data-lucide="check-circle-2"></i></span>` : (!unlocked ? `<span class="mission-lock-badge"><i data-lucide="lock"></i></span>` : '')}
      <svg class="mission-mask" viewBox="0 0 200 240"><use href="${char.symbol}"/></svg>
      <div>
        <h3>${m.title}</h3>
        <p>${m.desc}</p>
        <span class="mission-xp">+${m.xp} XP</span>
      </div>
    </div>`;
  }).join("");
  refreshIcons();

  document.querySelectorAll("#missionGrid .mission-card").forEach(card=>{
    const activate = ()=>{
      const id = card.dataset.mission;
      const index = parseInt(card.dataset.missionIndex);
      const mission = MISSIONS.find(m=>m.id===id);
      const done = !!STATE.missionsDone[id];
      const unlocked = missionUnlocked(index);
      if(done){
        toastInfo(mission.title, `Sudah selesai · kamu dapat +${mission.xp} XP dari misi ini.`);
      } else if(!unlocked){
        const prevMission = MISSIONS[index-1];
        toastWarning("Misi masih terkunci", `Selesaikan dulu "${prevMission.title}" untuk membuka misi ini.`);
      } else {
        toastInfo(mission.title, mission.desc);
      }
    };
    card.addEventListener("click", activate);
    card.addEventListener("keydown", (e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); activate(); } });
  });
}

/* ---------- REWARD ---------- */
function renderReward(){
  const lvl = getLevel();
  document.getElementById("levelTrack").innerHTML = LEVELS.map((l,i)=>`
    <div class="level-stop ${STATE.xp>=l.min?'reached':''}">
      <i data-lucide="star" style="color:${STATE.xp>=l.min?'var(--terracotta)':'var(--border-color)'}"></i>
      <div class="lv-name">Level ${i+1}<br>${l.name}</div>
      <div class="lv-req">Min. ${l.min} XP</div>
    </div>`).join("");

  document.getElementById("badgeGrid").innerHTML = BADGES.map(b=>{
    const unlocked = !!STATE.missionsDone[b.id];
    const char = CHARACTERS[b.char];
    return `
    <div class="badge-card ${unlocked?'unlocked':'locked'}" data-badge="${b.id}" role="button" tabindex="0">
      <div class="badge-mask-frame">
        <svg viewBox="0 0 200 240"><use href="${char.symbol}"/></svg>
        ${!unlocked ? `<div class="lock-icon"><i data-lucide="lock"></i></div>` : ''}
      </div>
      <h4>${b.name}</h4>
      <p>${char.name} &middot; ${char.topic}</p>
    </div>`;
  }).join("");
  refreshIcons();

  document.querySelectorAll("#badgeGrid .badge-card").forEach(card=>{
    const activate = ()=>{
      const id = card.dataset.badge;
      const badge = BADGES.find(b=>b.id===id);
      const mission = MISSIONS.find(m=>m.id===id);
      const unlocked = !!STATE.missionsDone[id];
      if(unlocked){
        toastSuccess(`Lencana "${badge.name}" terbuka`, `Diperoleh dari misi "${mission.title}".`);
      } else {
        toastWarning("Lencana masih terkunci", `Selesaikan misi "${mission.title}" untuk membukanya.`);
      }
    };
    card.addEventListener("click", activate);
    card.addEventListener("keydown", (e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); activate(); } });
  });
}

/* ---------- PROFIL ---------- */

/* Grafik batang perbandingan Pretest vs Posttest per topik transformasi.
   PRETEST dan POSTTEST punya urutan topik yang sama (index-aligned), jadi
   tiap soal bisa dipasangkan 1:1 untuk melihat topik mana yang membaik. */
function renderScoreChart(pre, post){
  const topics = PRETEST.map(q=>q.topic);
  const W = 560, H = 220, padL = 34, padB = 46, padT = 14, padR = 10;
  const chartW = W - padL - padR, chartH = H - padT - padB;
  const groupW = chartW / topics.length;
  const barW = Math.min(26, groupW*0.32);

  if(!pre && !post){
    return `<div class="score-chart-empty">
      <i data-lucide="bar-chart-3" aria-hidden="true"></i>
      <p>Grafik perbandingan akan muncul di sini setelah kamu mengerjakan Pretest dan Posttest.</p>
    </div>`;
  }

  function valFor(resultObj, i){
    if(!resultObj) return null;
    return resultObj.answers[i] === PRETEST[i].correct ? 100 : 0; // per-topik: benar=100%, salah=0%
  }

  let bars = "";
  let xTicks = "";
  topics.forEach((topic,i)=>{
    const cx = padL + groupW*i + groupW/2;
    const preVal = valFor(pre, i);
    const postVal = valFor(post, i);
    const preH = preVal===null ? 0 : (preVal/100)*chartH;
    const postH = postVal===null ? 0 : (postVal/100)*chartH;
    const preX = cx - barW - 3;
    const postX = cx + 3;

    if(preVal!==null){
      bars += `<rect x="${preX}" y="${padT+chartH-preH}" width="${barW}" height="${preH}" rx="4" class="chart-bar chart-bar--pre"><title>${topic} · Pretest: ${preVal}%</title></rect>`;
    }
    if(postVal!==null){
      bars += `<rect x="${postX}" y="${padT+chartH-postH}" width="${barW}" height="${postH}" rx="4" class="chart-bar chart-bar--post"><title>${topic} · Posttest: ${postVal}%</title></rect>`;
    }
    xTicks += `<text x="${cx}" y="${H-padB+18}" class="chart-axis-label" text-anchor="middle">${topic.replace("Kontekstual Topeng","Kontekstual")}</text>`;
  });

  const gridLines = [0,25,50,75,100].map(v=>{
    const y = padT + chartH - (v/100)*chartH;
    return `<line x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}" class="chart-gridline"/>
            <text x="${padL-8}" y="${y+4}" class="chart-axis-label" text-anchor="end">${v}</text>`;
  }).join("");

  const summaryText = topics.map((topic,i)=>{
    const preVal = valFor(pre,i), postVal = valFor(post,i);
    return `${topic}: pretest ${preVal===null?'belum dikerjakan':preVal+'%'}, posttest ${postVal===null?'belum dikerjakan':postVal+'%'}`;
  }).join("; ");

  return `
    <div class="score-chart-wrap">
      <div class="score-chart-legend">
        <span><i class="legend-dot legend-dot--pre"></i> Pretest</span>
        <span><i class="legend-dot legend-dot--post"></i> Posttest</span>
      </div>
      <svg viewBox="0 0 ${W} ${H}" class="score-chart-svg" role="img" aria-label="Grafik perbandingan skor pretest dan posttest per topik. ${summaryText}.">
        ${gridLines}
        ${bars}
        ${xTicks}
      </svg>
    </div>`;
}

function renderProfil(){
  const lvl = getLevel();
  document.getElementById("profLevel").textContent = lvl.index;
  document.getElementById("profXP").textContent = STATE.xp;
  document.getElementById("profBadges").textContent = `${Object.keys(STATE.missionsDone).length}/4`;

  const nameInput = document.getElementById("profileNameInput");
  nameInput.value = STATE.name;
  let nameSaveTimer = null;
  nameInput.oninput = ()=>{
    STATE.name = nameInput.value;
    refreshGlobalStats();
    clearTimeout(nameSaveTimer);
    nameSaveTimer = setTimeout(()=>{
      const ok = saveState();
      if(ok && nameInput.value.trim()){
        toastSuccess("Nama disimpan", `Halo, ${nameInput.value.trim()}!`, 2500);
      }
    }, 700);
  };

  const pre = STATE.pretest, post = STATE.posttest;
  const improvement = (pre && post) ? (post.percent - pre.percent) : null;

  document.getElementById("scoreCompare").innerHTML = renderScoreChart(pre, post) + `
    <div class="score-summary">
      <div class="score-box"><div class="num">${pre ? pre.percent+'%' : '—'}</div><label>Pretest</label></div>
      <div class="score-box"><div class="num">${post ? post.percent+'%' : '—'}</div><label>Posttest</label></div>
      <div class="score-box improve"><div class="num">${improvement!==null ? (improvement>=0?'+':'')+improvement+'%' : '—'}</div><label>Peningkatan</label></div>
    </div>`;

  function recapRows(data, resultObj, label){
    if(!resultObj) return `<div class="recap-row"><span>${label}</span><span class="muted">Belum dikerjakan</span></div>`;
    return data.map((item,i)=>{
      const userIdx = resultObj.answers[i];
      const correct = userIdx===item.correct;
      const userText = (userIdx!==null && userIdx!==undefined) ? item.opts[userIdx] : "(tidak dijawab)";
      return `
      <details class="recap-item ${correct?'is-correct':'is-wrong'}">
        <summary>
          <span class="recap-topic">${label} · ${item.topic}</span>
          <span class="${correct?'status-ok':'status-bad'}">${correct?'Benar':'Salah'}</span>
        </summary>
        <div class="recap-detail">
          <p class="recap-q">${item.q}</p>
          <p>Jawabanmu: <strong>${userText}</strong></p>
          ${!correct ? `<p>Jawaban benar: <strong>${item.opts[item.correct]}</strong></p>` : ``}
          <p class="recap-explain"><i data-lucide="lightbulb"></i> ${item.explanation||''}</p>
        </div>
      </details>`;
    }).join("");
  }
  document.getElementById("recapGrid").innerHTML =
    recapRows(PRETEST, STATE.pretest, "Pretest") + recapRows(POSTTEST, STATE.posttest, "Posttest");
  refreshIcons();

  const resetBtn = document.getElementById("resetProgressBtn");
  if(resetBtn){
    resetBtn.onclick = ()=>{
      const sure = confirm("Yakin mau reset semua progress?\n\nXP, lencana, misi, dan hasil pretest/posttest akan terhapus permanen dan tidak bisa dikembalikan.");
      if(!sure) return;
      try{ localStorage.removeItem("geotopeng_state"); }catch(e){}
      STATE = {...DEFAULT_STATE};
      exploreTouched = new Set();
      saveState();
      refreshGlobalStats();
      renderProfil();
      toastSuccess("Progress direset", "Semua data belajar sudah kembali ke awal. Yuk mulai lagi!", 3500);
    };
  }

  const exportBtn = document.getElementById("exportProgressBtn");
  if(exportBtn){
    exportBtn.onclick = ()=>{
      try{
        const payload = { app:"geotopeng", version:1, exportedAt:new Date().toISOString(), state:STATE };
        const blob = new Blob([JSON.stringify(payload, null, 2)], {type:"application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const namePart = (STATE.name ? STATE.name.trim().replace(/[^a-z0-9]+/gi,"-").toLowerCase() : "progress");
        a.href = url;
        a.download = `geotopeng-${namePart}-${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(()=>URL.revokeObjectURL(url), 1000);
        toastSuccess("Progress diekspor", "File backup sudah diunduh. Simpan baik-baik ya!", 3500);
      }catch(e){
        toastError("Gagal mengekspor", "Terjadi kesalahan saat membuat file backup.");
      }
    };
  }

  const importBtn = document.getElementById("importProgressBtn");
  const importInput = document.getElementById("importProgressInput");
  if(importBtn && importInput){
    importBtn.onclick = ()=> importInput.click();
    importInput.onchange = ()=>{
      const file = importInput.files && importInput.files[0];
      importInput.value = "";
      if(!file) return;
      const reader = new FileReader();
      reader.onload = ()=>{
        try{
          const parsed = JSON.parse(reader.result);
          const incoming = parsed && parsed.state ? parsed.state : parsed;
          if(!incoming || typeof incoming !== "object" || !("xp" in incoming)){
            throw new Error("format tidak dikenali");
          }
          const sure = confirm("Impor file ini akan menimpa progress yang tersimpan saat ini di perangkat ini. Lanjutkan?");
          if(!sure) return;
          STATE = {...DEFAULT_STATE, ...incoming};
          exploreTouched = new Set();
          saveState();
          refreshGlobalStats();
          renderProfil();
          toastSuccess("Progress diimpor", "Data dari file backup berhasil dimuat.", 3500);
        }catch(e){
          toastError("Gagal mengimpor", "File tidak valid atau bukan file backup GEOTOPENG.");
        }
      };
      reader.onerror = ()=> toastError("Gagal membaca file", "Coba pilih file backup yang lain.");
      reader.readAsText(file);
    };
  }

  const printBtn = document.getElementById("printSummaryBtn");
  if(printBtn){
    printBtn.onclick = ()=>{
      const lvlNow = getLevel();
      const preS = STATE.pretest, postS = STATE.posttest;
      const cert = document.getElementById("printCertificate");
      cert.innerHTML = `
        <div class="cert-inner">
          <div class="cert-brand">GEOTOPENG</div>
          <p class="cert-sub">Ringkasan Hasil Belajar — Transformasi Geometri lewat Topeng Malangan</p>
          <h2>${STATE.name ? STATE.name : "Penjelajah GEOTOPENG"}</h2>
          <div class="cert-grid">
            <div><span>Level</span><strong>${lvlNow.index} — ${lvlNow.name}</strong></div>
            <div><span>Total XP</span><strong>${STATE.xp}</strong></div>
            <div><span>Misi Selesai</span><strong>${Object.keys(STATE.missionsDone).length}/4</strong></div>
            <div><span>Skor Pretest</span><strong>${preS ? preS.percent+'%' : '—'}</strong></div>
            <div><span>Skor Posttest</span><strong>${postS ? postS.percent+'%' : '—'}</strong></div>
            <div><span>Peningkatan</span><strong>${(preS&&postS)?(postS.percent-preS.percent>=0?'+':'')+(postS.percent-preS.percent)+'%':'—'}</strong></div>
          </div>
          <p class="cert-date">Dicetak pada ${new Date().toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'})}</p>
        </div>`;
      toastInfo("Menyiapkan cetak", "Pilih 'Simpan sebagai PDF' di dialog cetak untuk mengunduh.", 2500);
      setTimeout(()=>window.print(), 300);
    };
  }
}

/* ---------- INIT ---------- */
window.addEventListener("DOMContentLoaded", ()=>{
  if(!window.lucide) document.documentElement.classList.add("no-lucide");
  refreshIcons();
  initA11yWidget();
  initAudioWidget();
  refreshGlobalStats();
  navigate("landing");
  if(stateLoadWasCorrupt){
    setTimeout(()=>{
      toastWarning("Data sebelumnya tidak terbaca", "Progres lama tampaknya rusak, jadi kamu mulai dari awal lagi. Progres baru akan tersimpan normal.", 6000);
    }, 500);
  }
});

window.addEventListener("beforeunload", ()=>{ saveState(); });
