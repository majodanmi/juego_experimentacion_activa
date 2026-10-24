import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// ===== Geometría de la rosa: la misma del simulador Rose Lab AR =====
const PASILLO = 0.7;        // ancho del camino entre camas (m)
const CAMA = 0.9;           // ancho de cada cama (m)
const ALTO_SETO = 1.55;     // altura del follaje
const MIN_TALLO = 0.40;     // longitud mínima de tallo (m)
const ALCANCE = 1.5;        // distancia máxima de la tijera (m)
const UMBRAL_INM = 0.42;    // apertura < umbral -> inmadura
const UMBRAL_PAS = 0.80;    // apertura > umbral -> sobreabierta
// Color según madurez: inmadura (rojo oscuro, opaco, algo verdoso) -> en punto (rojo saturado) -> pasada (más rosada)
// Tono medido en las fotos de la finca (cabezas de Freedom): rojo vino, tono ≈ -12°, saturación ≈ 0,6
// Inmadura #662834 · En punto #612431 · Sobreabierta #822441 (mediana de las cabezas detectadas)
// Para la simulación se conserva ese tono y se aclara para compensar el contraluz de las fotos.
const COLOR_INM = new THREE.Color('#752333');   // vino opaco, más oscuro (botón cerrado)
const COLOR_OPT = new THREE.Color('#bc1a35');   // rojo vino intenso y saturado (en punto)
const COLOR_PAS = new THREE.Color('#cc5176');   // más claro y rosado-magenta (pasada)
const VERDE_BOTON = new THREE.Color('#8aa83f'); // verde de pétalos externos y base en botón cerrado
const COLOR_VIEJO = new THREE.Color('#602b38'); // bordes que se oscurecen cuando la flor se pasa
// Color de cada punto del pétalo. k: capa (0 interna, 1 externa). v: posición (0 base, 1 punta)
const _cp=new THREE.Color();
function colorPetalo(t,k,v){
  _cp.copy(colorPorT(t));
  const inmad=Math.max(0,1-t/UMBRAL_INM);                       // 1 en botón cerrado, 0 al llegar al punto
  _cp.lerp(VERDE_BOTON, inmad*(0.08+0.32*k)*Math.pow(1-v,1.5)); // toque verde solo en la base de los pétalos externos
  if(t>0.8) _cp.lerp(COLOR_VIEJO,(t-0.8)/0.2*0.5*v*k);           // pasada: bordes externos se oscurecen
  const brillo=(t>=UMBRAL_INM&&t<=UMBRAL_PAS)?1.12:0.92;          // la rosa en punto destaca
  const sh=(0.5+0.5*k)*(0.66+0.34*v)*brillo;
  return [Math.min(1,_cp.r*sh),Math.min(1,_cp.g*sh),Math.min(1,_cp.b*sh)];
}

// =====================================================================
// Utilidades
// =====================================================================
const $ = id => document.getElementById(id);
const lerp = (a,b,k) => a + (b-a)*k;
const key3 = (t,a,b,c) => t < 0.55 ? lerp(a,b,t/0.55) : lerp(b,c,(t-0.55)/0.45);
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
function hashTexto(s){let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
let rnd = Math.random;
const R = (a,b) => a + (b-a)*rnd();
const estadoDe = t => t < UMBRAL_INM ? 'inmadura' : t > UMBRAL_PAS ? 'sobreabierta' : 'punto';
function colorPorT(t){
  const c = new THREE.Color();
  return t < UMBRAL_INM ? c.copy(COLOR_INM).lerp(COLOR_OPT, Math.pow(t/UMBRAL_INM, 2.2)*0.6)
       : t < UMBRAL_PAS ? c.copy(COLOR_OPT)
       : c.copy(COLOR_OPT).lerp(COLOR_PAS, (t-UMBRAL_PAS)/(1-UMBRAL_PAS));
}

// Lámina curva: pétalo, sépalo u hoja. +Y arriba, +Z afuera.
function lamina({ancho,alto,copa,inclin,curva,perfil,nu=5,nv=6,sombra=null}){
  const n=(nu+1)*(nv+1), pos=new Float32Array(n*3), col=sombra?new Float32Array(n*3):null, idx=[];
  let y=0,z=0,p=0,q=0; const dl=alto/nv;
  for(let j=0;j<=nv;j++){
    const v=j/nv;
    if(j>0){const a=inclin+curva*(v-0.5/nv); y+=dl*Math.cos(a); z+=dl*Math.sin(a);}
    const a=inclin+curva*v, ny=Math.sin(a), nz=-Math.cos(a), w=ancho*perfil(v);
    for(let i=0;i<=nu;i++){
      const u=i/nu-0.5, x=u*w, d=copa*(4*u*u)*w*0.25;
      pos[p++]=x; pos[p++]=y+ny*d; pos[p++]=z+nz*d;
      if(col){const s=sombra(v,u); if(Array.isArray(s)){col[q++]=s[0];col[q++]=s[1];col[q++]=s[2];} else {col[q++]=s;col[q++]=s;col[q++]=s;}}
    }
  }
  for(let j=0;j<nv;j++)for(let i=0;i<nu;i++){const a=j*(nu+1)+i,b=a+1,c=a+nu+1,d=c+1; idx.push(a,c,b,b,c,d);}
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.BufferAttribute(pos,3));
  if(col) g.setAttribute('color',new THREE.BufferAttribute(col,3));
  g.setIndex(idx); g.computeVertexNormals();
  return g;
}
const pfPetalo = v => 0.35+0.65*Math.sin(Math.PI*Math.min(1,0.15+0.8*v));
const pfSepalo = v => (1-v)*(0.6+0.4*Math.sin(Math.PI*v));
const pfHoja   = v => 0.08+Math.pow(Math.sin(Math.PI*v),0.8);

// Cabeza floral por apertura t (0 cerrada · 0.55 en punto · 1 sobreabierta), en caché
const cacheCabeza = new Map();
// Curva de forma: cambia mucho hasta el punto, casi nada dentro del punto y se abre solo después
function keyF(t,a,b,c){
  const b2=lerp(b,c,0.12);
  return t<UMBRAL_INM ? lerp(a,b,t/UMBRAL_INM) : t<UMBRAL_PAS ? lerp(b,b2,(t-UMBRAL_INM)/(UMBRAL_PAS-UMBRAL_INM)) : lerp(b2,c,(t-UMBRAL_PAS)/(1-UMBRAL_PAS));
}
function geoCabeza(t){
  const q = Math.round(t*20)/20;
  if (cacheCabeza.has(q)) return cacheCabeza.get(q);
  // Forma según las fotos de la finca:
  //  inmadura  -> botón pequeño y en punta, pétalos cerrados, sépalos pegados
  //  en punto  -> botón más grande y en copa, cabeza recta/cuadrada, puntas externas apenas abiertas, sépalos hacia abajo
  //  pasada    -> flor abierta, pétalos externos extendidos
  const L=5, P=5, s=keyF(q,0.72,1.0,1.18)*1.5, partes=[];
  for(let i=0;i<L;i++){
    const k=i/(L-1);
    const g=lamina({
      ancho:(0.016+0.02*k)*s*keyF(q,0.85,1.0,1.1), alto:(0.034+0.012*k)*s,
      copa:keyF(q,1.35,1.1,0.55),
      inclin:keyF(q,0.02+0.06*k,0.05+0.14*k,0.35+1.0*k),
      curva:keyF(q,-0.45-0.1*k,-0.12+0.42*k,0.4+0.9*k),
      perfil:pfPetalo, sombra:(v)=>colorPetalo(q,k,v)
    });
    const r0=keyF(q,0.0015+0.003*k,0.002+0.0055*k,0.004+0.013*k)*s;
    for(let p=0;p<P;p++){
      const gg=g.clone();
      gg.applyMatrix4(new THREE.Matrix4().makeRotationY(p/P*Math.PI*2+i*0.63).multiply(new THREE.Matrix4().makeTranslation(0,0,r0)));
      partes.push(gg);
    }
    g.dispose();
  }
  const sep=[];
  const gs=lamina({ancho:0.009*s,alto:0.034*s*keyF(q,1.15,1.0,1.0),copa:0.5,inclin:keyF(q,0.25,1.75,2.1),curva:keyF(q,-0.25,0.35,0.5),perfil:pfSepalo,nu:3,nv:5});
  for(let p=0;p<5;p++){
    const gg=gs.clone();
    gg.applyMatrix4(new THREE.Matrix4().makeRotationY(p/5*Math.PI*2+0.3).multiply(new THREE.Matrix4().makeTranslation(0,0.002,keyF(q,0.009,0.011,0.013)*s)));
    sep.push(gg);
  }
  gs.dispose();
  const base=new THREE.SphereGeometry(0.0068*s,10,8); base.deleteAttribute('uv'); base.scale(1,0.85,1); sep.push(base);
  const r={pet:mergeGeometries(partes), sep:mergeGeometries(sep)};
  partes.forEach(g=>g.dispose()); sep.forEach(g=>g.dispose());
  cacheCabeza.set(q,r); return r;
}

// ===== Línea de tiempo (ilustrativa): día relativo al punto óptimo -> apertura t =====
const PUNTOS=[[-6,0.08],[-5,0.15],[-4,0.22],[-3,0.29],[-2,0.35],[-1,0.40],[0,0.50],[1,0.62],[2,0.74],[3,0.90]];
function tDeDia(d){ for(let i=0;i<PUNTOS.length-1;i++){ const [d0,t0]=PUNTOS[i],[d1,t1]=PUNTOS[i+1]; if(d<=d1) return t0+(t1-t0)*Math.max(0,(d-d0)/(d1-d0)); } return PUNTOS[PUNTOS.length-1][1]; }
// Fotos reales de referencia (rosas distintas, ordenadas por apertura) en assets/maquina-del-tiempo/
const FOTOS=[
  {"d": -6, "e": "botón verde", "foto": "dia_m6.jpg"},
  {"d": -5, "e": "botón cerrado", "foto": "dia_m5.jpg"},
  {"d": -4, "e": "asoma el color", "foto": "dia_m4.jpg"},
  {"d": -3, "e": "cerrada", "foto": "dia_m3.jpg"},
  {"d": -2, "e": "cerrada", "foto": "dia_m2.jpg"},
  {"d": -1, "e": "casi", "foto": "dia_m1.jpg"},
  {"d": 0, "e": "en su punto", "foto": "dia_0.jpg"},
  {"d": 1, "e": "copa", "foto": "dia_p1.jpg"},
  {"d": 2, "e": "copa abierta", "foto": "dia_p2.jpg"},
  {"d": 3, "e": "se pasó", "foto": "dia_p3.jpg"}
];

// ===== Escena =====
const visor=$('visor');
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2)); visor.prepend(renderer.domElement);
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(42,1,0.005,20);
scene.add(new THREE.HemisphereLight(0xffffff,0xb7ad98,1.15));
const relleno=new THREE.DirectionalLight(0xfff4ec,0.9); relleno.position.set(0.2,-1,0.4); scene.add(relleno);
const sol=new THREE.DirectionalLight(0xffffff,1.0); sol.position.set(0.5,2,1); scene.add(sol);
const matSepalo=new THREE.MeshStandardMaterial({color:'#3b6e2f',side:THREE.DoubleSide,roughness:0.75});
const matTallo=new THREE.MeshStandardMaterial({color:'#3f7434',roughness:0.8});
const matHoja=new THREE.MeshStandardMaterial({color:'#2f5f2a',side:THREE.DoubleSide,roughness:0.8});
const ALTO=0.55;
const tallo=new THREE.Mesh(new THREE.CylinderGeometry(0.0045,0.006,ALTO,8),matTallo); tallo.position.y=ALTO/2; scene.add(tallo);
for(const [y,rot,esc] of [[0.30,0.4,1],[0.40,2.6,0.85],[0.19,4.4,1.1]]){
  const g=lamina({ancho:0.045*esc,alto:0.085*esc,copa:0.6,inclin:0.9,curva:0.5,perfil:pfHoja,nu:4,nv:6});
  const h=new THREE.Mesh(g,matHoja); h.position.y=y; h.rotation.y=rot; scene.add(h);
}
const cabeza=new THREE.Group(); cabeza.position.y=ALTO; scene.add(cabeza);
const matPet=new THREE.MeshStandardMaterial({vertexColors:true,side:THREE.DoubleSide,roughness:0.5});
let mPet=null, mSep=null, qActual=-1;
function ponerCabeza(t){
  const q=Math.round(t*20)/20; if(q===qActual) return; qActual=q;
  const geo=geoCabeza(q);
  if(mPet){ cabeza.remove(mPet,mSep); }
  matPet.roughness=(q>=UMBRAL_INM&&q<=UMBRAL_PAS)?0.45:0.7;
  mPet=new THREE.Mesh(geo.pet,matPet); mSep=new THREE.Mesh(geo.sep,matSepalo); cabeza.add(mPet,mSep);
}
const controls=new OrbitControls(camera,renderer.domElement);
controls.target.set(0,ALTO+0.03,0); controls.enableDamping=true; controls.minDistance=0.12; controls.maxDistance=0.7; controls.enablePan=false;
const VISTAS={abajo:{pos:new THREE.Vector3(0.10,ALTO-0.20,0.17),txt:'VISTA DESDE ABAJO · COMO EL TRABAJADOR'},
              mano:{pos:new THREE.Vector3(0.05,ALTO+0.24,0.09),txt:'VISTA EN LA MANO · SOLO SE VE AL CORTAR'}};
let destino=VISTAS.abajo.pos.clone(); camera.position.copy(destino);
function vista(n){ destino=VISTAS[n].pos.clone(); $('rotVista').textContent=VISTAS[n].txt; $('vAbajo').classList.toggle('on',n==='abajo'); $('vMano').classList.toggle('on',n==='mano'); }
$('vAbajo').onclick=()=>vista('abajo'); $('vMano').onclick=()=>vista('mano');
let moviendo=0; controls.addEventListener('start',()=>{ moviendo=1; destino=null; });
function ajustar(){ const w=visor.clientWidth,h=visor.clientHeight; renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix(); }
new ResizeObserver(ajustar).observe(visor); ajustar();
renderer.setAnimationLoop(()=>{ if(destino){ camera.position.lerp(destino,0.08); if(camera.position.distanceTo(destino)<0.002) destino=null; } controls.update(); renderer.render(scene,camera); });

// ===== Estado de la rosa e indicadores =====
const NOMBRE={inmadura:['Inmadura','#F04432'],punto:['Óptima','#008B56'],sobreabierta:['Sobreabierta','#8a3fb5']};
let ocultarDia=false;
function textoDias(d){ const r=Math.round(-d), e=estadoDe(tDeDia(d)); if(e==='sobreabierta') return 'ya pasó el punto';
  if(e==='punto') return d>=1.5?'córtala hoy: está por pasarse':'córtala: está en su punto'; return `faltan ~${Math.max(1,r)} ${Math.max(1,r)===1?'día':'días'}`; }
function actualizar(){
  const d=+$('dia').value, t=tDeDia(d), e=estadoDe(t); ponerCabeza(t);
  const [n,c]=NOMBRE[e];
  $('estado').style.background=c; $('estado').innerHTML=ocultarDia?'¿Cuántos días le faltan?':`${n}<small>${textoDias(d)}</small>`;
  const sep=Math.min(1,keyF(t,0.25,1.75,2.1)/1.85), tam=(keyF(t,0.72,1.0,1.18)-0.72)/0.46, forma=t, col=Math.min(1,t/UMBRAL_INM);
  const set=(id,tid,v,txt)=>{ $(id).style.width=Math.round(v*100)+'%'; $(tid).textContent=txt; };
  set('bSep','tSep',sep, sep<0.35?'pegados':sep<0.8?'separándose':'hacia abajo');
  set('bTam','tTam',tam, tam<0.35?'pequeña':tam<0.75?'creciendo':'completa');
  set('bFor','tFor',forma, t<0.3?'botón en punta':t<UMBRAL_INM?'cerrada':t<=UMBRAL_PAS?'copa':'abierta');
  set('bCol','tCol',col, col<0.6?'rojo oscuro':col<1?'tomando color':'vivo e intenso');
  document.querySelectorAll('#tira figure').forEach(f=>f.classList.toggle('on',Math.abs(+f.dataset.d-d)<0.5&&!ocultarDia));
}
$('etqDias').innerHTML=[-6,-5,-4,-3,-2,-1,0,1,2,3].map(d=>`<span class="${d===0?'cero':''}">${d===0?'Óptima':d>0?'+'+d:d}</span>`).join('');
$('dia').addEventListener('input',()=>{ parar(); actualizar(); });

// ===== Reproducir =====
let anim=null;
function parar(){ if(anim){ cancelAnimationFrame(anim); anim=null; $('btnPlay').textContent='▶ Reproducir los días'; } }
function reproducir(hasta, alTerminar){
  parar(); $('btnPlay').textContent='⏸ Pausar'; let ult=performance.now();
  const paso=(now)=>{ const dt=(now-ult)/1000; ult=now; let d=+$('dia').value+dt*1.4;
    if(d>=hasta){ d=hasta; $('dia').value=d; actualizar(); parar(); if(alTerminar) alTerminar(); return; }
    $('dia').value=d; actualizar(); anim=requestAnimationFrame(paso); };
  anim=requestAnimationFrame(paso);
}
$('btnPlay').onclick=()=>{ if(anim){ parar(); return; } if(+$('dia').value>=3) $('dia').value=-6; reproducir(3); };

// ===== Fotos reales de referencia =====
$('tira').innerHTML=FOTOS.map(f=>`<figure data-d="${f.d}"><img src="../assets/maquina-del-tiempo/${f.foto}" alt="Rosa de la finca"><figcaption>${f.d===0?'Óptima':(f.d>0?'+':'')+f.d+(Math.abs(f.d)===1?' día':' días')}<small>${f.e}</small></figcaption></figure>`).join('');
document.querySelectorAll('#tira figure').forEach(f=>f.onclick=()=>{ if(ocultarDia) return; parar(); $('dia').value=f.dataset.d; actualizar(); });

// ===== Modo "¿cuántos días le faltan?" =====
let reto=null, aciertos=0, intentos=0;
function nuevoReto(){
  parar(); reto=[-5,-4,-3,-2,-1,0][Math.floor(Math.random()*6)]; ocultarDia=true;
  $('dia').value=reto; $('resp').textContent=''; $('resp').className='resp';
  document.querySelectorAll('.ops button').forEach(b=>b.disabled=false); vista('abajo'); actualizar();
}
document.querySelectorAll('.ops button').forEach(b=>b.onclick=()=>{
  if(!ocultarDia) return; const r=+b.dataset.r, real=Math.min(4,-reto); intentos++;
  const ok=r===real; if(ok) aciertos++;
  $('resp').className='resp '+(ok?'bien':'mal');
  $('resp').textContent=ok?`✔ ¡Correcto! ${real===0?'Ya estaba óptima.':real===1?'Le faltaba 1 día.':`Le faltaban ${real===4?'4 o más días':real+' días'}.`}`:
    `✖ ${real===0?'Ya estaba óptima: se podía cortar.':`${real===1?'Le faltaba 1 día':`Le faltaban ${real===4?'4 o más días':real+' días'}`}. Mira cómo avanza hasta su punto…`}`;
  $('puntaje').textContent=`Aciertos: ${aciertos} de ${intentos}`;
  document.querySelectorAll('.ops button').forEach(x=>x.disabled=true);
  ocultarDia=false; actualizar(); if(reto<0) reproducir(0);
});
$('btnOtra').onclick=nuevoReto;
function modo(m){ const q=m==='quiz'; $('mExplorar').classList.toggle('on',!q); $('mQuiz').classList.toggle('on',q);
  $('panelExplorar').style.display=q?'none':'block'; $('panelQuiz').style.display=q?'block':'none';
  $('bloqueLinea').style.visibility=q?'hidden':'visible';
  if(q) nuevoReto(); else { ocultarDia=false; actualizar(); } }
$('mExplorar').onclick=()=>modo('explorar'); $('mQuiz').onclick=()=>modo('quiz');
actualizar();
window.__mt={tDeDia,actualizar};
