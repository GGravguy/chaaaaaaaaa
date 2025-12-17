javascript:(function(){
  if(window.__CHAOS_ACTIVE__){
    clearInterval(window.__CHAOS_MOVE__);
    clearInterval(window.__CHAOS_COLOR__);
    clearInterval(window.__CHAOS_TEXT__);
    clearInterval(window.__CHAOS_TITLE__);
    clearInterval(window.__CHAOS_FAVICON__);
    if(window.__CHAOS_AUDIO__) window.__CHAOS_AUDIO__.stop();
    document.querySelectorAll('.__chaos_text,.__chaos_mouse').forEach(e=>e.remove());
    document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]').forEach(f=>f.remove());
    window.__CHAOS_ACTIVE__=false;
    document.title="Chaos Stopped 😇";
    console.log("Chaos stopped 😇");
    return;
  }

  window.__CHAOS_ACTIVE__=true;
  console.log("CHAOS MODE ACTIVATED 😈");

  const rand=(a,b)=>Math.random()*(b-a)+a;
  const words=[
    "ERROR","LOL","???","BRUH","WHAT","404","CHAOS",
    "RUN","HELP","GLITCH","HAHA","???","!!!"
  ];
  const glitchTitles=[
    "&@*^$@^%", "0100101010101010", "¯\\_(ツ)_/¯", "▓▒░▓▒░", "☠☢☣☹", 
    "┌( ಠ_ಠ)┘", "▂▃▅▆▇█", "¤¢¥€£", "░▒▓█▒░▓█", "><><><><", 
    "⚡☄✶✹✺", "⊙﹏⊙", "ಠ_ಠ", "▓█░▓█░▓", "1010101010"
  ];

  const mouseImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSICRTZW3wNlGuGoTfZ0PqrpVXWHHLWLlPy7Q&s";

  // 🔀 TELEPORT ELEMENTS
  window.__CHAOS_MOVE__=setInterval(()=>{
    document.querySelectorAll("body *").forEach(el=>{
      if(el.classList.contains("__chaos_text")) return;
      const w=el.offsetWidth, h=el.offsetHeight;
      if(w===0||h===0) return;

      if(w > window.innerWidth*0.5 || h > window.innerHeight*0.5){
        el.style.zIndex=0;
        el.style.position="static";
        return;
      }

      el.style.position="fixed";
      el.style.left=rand(0,window.innerWidth-w)+"px";
      el.style.top=rand(0,window.innerHeight-h)+"px";
      el.style.transition="all 0.3s linear";
      el.style.zIndex=999;
    });
  },600);

  // 🎨 RANDOM COLORS
  window.__CHAOS_COLOR__=setInterval(()=>{
    document.querySelectorAll("body *").forEach(el=>{
      if(el.classList.contains("__chaos_text")) return;
      el.style.backgroundColor=`hsl(${Math.random()*360},100%,50%)`;
      el.style.color=`hsl(${Math.random()*360},100%,20%)`;
      el.style.filter=`hue-rotate(${Math.random()*360}deg)`;
    });
  },500);

  // 📢 POP-UP TEXT
  window.__CHAOS_TEXT__=setInterval(()=>{
    const tdiv=document.createElement("div");
    tdiv.className="__chaos_text";
    tdiv.textContent=words[Math.floor(Math.random()*words.length)];
    tdiv.style.position="fixed";
    const fontSize = rand(20,50);
    tdiv.style.fontSize=fontSize+"px";
    tdiv.style.fontWeight="bold";
    tdiv.style.color=`hsl(${Math.random()*360},100%,50%)`;
    tdiv.style.pointerEvents="none";
    tdiv.style.zIndex=999999;

    const maxX = window.innerWidth - fontSize*2; 
    const maxY = window.innerHeight - fontSize;
    tdiv.style.left = rand(0, maxX)+"px";
    tdiv.style.top = rand(0, maxY)+"px";

    document.body.appendChild(tdiv);
    setTimeout(()=>tdiv.remove(),1000);
  },150);

  // 🎵 BYTEBEAT AUDIO
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();
  const bufferSize = 4096;
  const node = ctx.createScriptProcessor(bufferSize, 0, 1);
  let t=0;

  node.onaudioprocess = function(e){
    let output = e.outputBuffer.getChannelData(0);
    for(let i=0;i<bufferSize;i++){
      output[i] = (((t >> 9) & 30) * t % 256)/128 - 1;
      t++;
    }
  };
  node.connect(ctx.destination);
  window.__CHAOS_AUDIO__ = { stop: ()=>node.disconnect() };

  // 🌀 GLITCH TAB TITLE
  window.__CHAOS_TITLE__ = setInterval(()=>{
    document.title = glitchTitles[Math.floor(Math.random()*glitchTitles.length)];
  },50);

  // 🖼 RANDOM FAVICON
  window.__CHAOS_FAVICON__ = setInterval(()=>{
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx2 = canvas.getContext("2d");
    ctx2.fillStyle=`hsl(${Math.random()*360},100%,50%)`;
    ctx2.fillRect(0,0,32,32);
    ctx2.font="20px monospace";
    ctx2.fillStyle=`hsl(${Math.random()*360},100%,50%)`;
    ctx2.fillText(["#","@","%","&","*","!","?"][Math.floor(Math.random()*7)], rand(0,20), rand(15,28));

    const link = document.createElement("link");
    link.rel = "icon";
    link.href = canvas.toDataURL("image/png");
    document.head.appendChild(link);

    document.querySelectorAll('link[rel="icon"]:not(:last-child), link[rel="shortcut icon"]:not(:last-child)').forEach(f=>f.remove());
  },100);

  // 🖱 MOUSE TRAIL
  document.addEventListener("mousemove", function(e){
    const img = document.createElement("img");
    img.src = mouseImg;
    img.className="__chaos_mouse";
    img.style.position="fixed";
    img.style.width="32px";
    img.style.height="32px";
    img.style.left=(e.clientX-16)+"px";
    img.style.top=(e.clientY-16)+"px";
    img.style.pointerEvents="none";
    img.style.zIndex=1000000;
    document.body.appendChild(img);
    setTimeout(()=>img.remove(), 1000);
  });
})();
