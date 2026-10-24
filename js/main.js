import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { BANCO } from './banco/banco.js';
import * as RECORRIDO from './banco/recorrido.js';

// =====================================================================
// PARÁMETROS DEL CULTIVO (ajustar con la finca)
// =====================================================================
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

function etiquetaCanvas(w=1024,h=180){
  const c=document.createElement('canvas'); c.width=w; c.height=h;
  const tex=new THREE.CanvasTexture(c); tex.colorSpace=THREE.SRGBColorSpace;
  return {c,g:c.getContext('2d'),tex};
}
function dibujarEtiqueta(e,txt,bg){
  const {c,g}=e; g.clearRect(0,0,c.width,c.height);
  g.fillStyle=bg; g.beginPath(); g.roundRect(0,0,c.width,c.height,44); g.fill();
  let fs=72; g.font=`bold ${fs}px Montserrat,sans-serif`;
  while(g.measureText(txt).width>c.width-60&&fs>22){fs-=2;g.font=`bold ${fs}px Montserrat,sans-serif`;}
  g.fillStyle='#fff'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(txt,c.width/2,c.height/2+4);
  e.tex.needsUpdate=true;
}

// =====================================================================
// Escena
// =====================================================================
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth,innerHeight);
renderer.xr.enabled=true;
renderer.xr.setReferenceSpaceType('local-floor');
document.body.appendChild(renderer.domElement);
renderer.domElement.style.cssText='position:fixed;inset:0;z-index:1';

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,0.02,80);
const rig=new THREE.Group(); rig.add(camera); scene.add(rig);
const controls=new PointerLockControls(camera,document.body);

const hemi=new THREE.HemisphereLight(0xffffff,0xb7ad98,1.1); scene.add(hemi);
// Luz de relleno desde abajo: el aprendiz mira las flores desde abajo, como en la cama
const relleno=new THREE.DirectionalLight(0xfff4ec,0.9); relleno.position.set(0.2,-1,0.4); scene.add(relleno);
const sol=new THREE.DirectionalLight(0xffffff,1.0); scene.add(sol);

let mundo=null;          // grupo con todo el cultivo
let flores=[], hits=[];  // datos de cada rosa
let instTallos=null, instHojasTallo=null, instGuia=null;
const matSepalo=new THREE.MeshStandardMaterial({color:'#3b6e2f',side:THREE.DoubleSide,roughness:0.75});
const tmpM=new THREE.Matrix4(), tmpQ=new THREE.Quaternion(), tmpV=new THREE.Vector3(), UP=new THREE.Vector3(0,1,0);
const CERO=new THREE.Matrix4().makeScale(0,0,0);

function construirCultivo(cfg,ar=false){
  if(mundo){ mundo.traverse(o=>{ if(o.geometry&&!o.userData.compartida) o.geometry.dispose(); if(o.material&&o.material!==matSepalo) (Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose()); }); scene.remove(mundo); }
  mundo=new THREE.Group(); scene.add(mundo);
  flores=[]; hits=[];
  rnd=mulberry32(hashTexto(cfg.semilla+'|'+cfg.escenario+'|'+cfg.largo+'|'+cfg.densidad+'|'+cfg.pInm+cfg.pOpt+cfg.pPas));
  const L=cfg.largo, ruido=cfg.escenario==='dificiles';

  // Luz y ambiente
  if(ar){ scene.background=null; scene.fog=null; } // AR: se ve el espacio real detrás
  else {
  scene.background=new THREE.Color(ruido?'#d9dfd9':'#eef3f2');
  scene.fog=new THREE.Fog(ruido?0xd2dad3:0xe3ebe7, ruido?4:7, ruido?20:30);
  }
  hemi.intensity=ruido?0.75:1.15;
  sol.intensity=ruido?1.9:0.9;
  if(ruido) sol.position.set(0.2,0.6,-1); else sol.position.set(0.3,1,0.25);

  // Suelo (solo en vista previa; en AR se usa el piso real)
  if(!ar){
  const suelo=new THREE.Mesh(new THREE.PlaneGeometry(14,L+12),new THREE.MeshStandardMaterial({color:'#6a5745',roughness:1}));
  suelo.rotation.x=-Math.PI/2; suelo.position.set(0,0,-L/2); mundo.add(suelo);
  const camino=new THREE.Mesh(new THREE.PlaneGeometry(PASILLO,L+2),new THREE.MeshStandardMaterial({color:'#4e3a2b',roughness:1}));
  camino.rotation.x=-Math.PI/2; camino.position.set(0,0.003,-L/2); mundo.add(camino);
  }

  // Núcleo oscuro de cada seto (evita ver a través) y camas vecinas
  const matNucleo=new THREE.MeshStandardMaterial({color:'#213a20',roughness:1});
  for(const s of [-1,1]){
    const n=new THREE.Mesh(new THREE.BoxGeometry(CAMA-0.25,ALTO_SETO-0.15,L),matNucleo);
    n.position.set(s*(PASILLO/2+CAMA/2+0.06),(ALTO_SETO-0.15)/2,-L/2); mundo.add(n);
    const v=new THREE.Mesh(new THREE.BoxGeometry(CAMA,ALTO_SETO+0.1,L),new THREE.MeshStandardMaterial({color:'#36572f',roughness:1}));
    v.position.set(s*(PASILLO*1.5+CAMA*1.5),(ALTO_SETO+0.1)/2,-L/2); if(!ar) mundo.add(v);
  }

  // Invernadero: techo a dos aguas, arcos, postes y alambres
  const ancho=4*(PASILLO+CAMA);
  const matTecho=new THREE.MeshStandardMaterial({color:'#ffffff',transparent:true,opacity:0.55,side:THREE.DoubleSide,roughness:1,emissive:'#e9efe9',emissiveIntensity:0.35});
  for(const s of [-1,1]){
    const lado=Math.hypot(ancho/2,1.0);
    const t=new THREE.Mesh(new THREE.PlaneGeometry(lado,L+8),matTecho);
    t.rotation.order='YXZ'; t.rotation.x=-Math.PI/2; t.rotation.y=s*Math.atan2(1.0,ancho/2);
    t.position.set(s*ancho/4,3.7,-L/2); if(!ar) mundo.add(t);
  }
  const matMetal=new THREE.MeshStandardMaterial({color:'#9aa3a0',roughness:0.6,metalness:0.4});
  const matMadera=new THREE.MeshStandardMaterial({color:'#7a5a3c',roughness:0.9});
  for(let z=2;!ar&&z>-L-4;z-=3){
    for(const s of [-1,1]){
      const lado=Math.hypot(ancho/2,1.0);
      const b=new THREE.Mesh(new THREE.BoxGeometry(lado,0.04,0.04),matMetal);
      b.position.set(s*ancho/4,3.68,z); b.rotation.z=-s*Math.atan2(1.0,ancho/2); mundo.add(b);
    }
    const tr=new THREE.Mesh(new THREE.BoxGeometry(ancho,0.03,0.03),matMetal); tr.position.set(0,3.2,z); mundo.add(tr);
  }
  for(let z=-1;z>-L;z-=4){
    for(const s of [-1,1]){
      const p=new THREE.Mesh(new THREE.BoxGeometry(0.05,3.2,0.05),matMadera);
      p.position.set(s*(PASILLO/2+0.08),1.6,z); mundo.add(p);
    }
  }
  const matAlambre=new THREE.LineBasicMaterial({color:'#cfd6d3'});
  for(const s of [-1,1]) for(const h of [0.9,1.4,1.85]){
    const g=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(s*(PASILLO/2+0.05),h,1),new THREE.Vector3(s*(PASILLO/2+0.05),h,-L-1)]);
    mundo.add(new THREE.Line(g,matAlambre));
  }

  // Follaje del seto (instanciado)
  const geoHoja=lamina({ancho:0.065,alto:0.095,copa:0.45,inclin:0,curva:0.35,perfil:pfHoja,nu:3,nv:4});
  geoHoja.translate(0,0,0);
  const verdes=['#3f6b35','#4c7a3a','#2f5a2c','#557f40','#386230'].map(c=>new THREE.Color(c));
  const rojizo=new THREE.Color('#8a4632');
  const porLado=Math.round(L*(ruido?260:210));
  const extra=[]; // hojas alrededor de cabezas en casos difíciles
  const totalHojas=porLado*2+600;
  const instHojas=new THREE.InstancedMesh(geoHoja,new THREE.MeshStandardMaterial({side:THREE.DoubleSide,roughness:0.8}),totalHojas);
  const e=new THREE.Euler(), sc=new THREE.Vector3(), ps=new THREE.Vector3();
  let n=0;
  const ponerHoja=(x,y,z,s,col)=>{
    e.set(R(-1.2,1.2),R(0,Math.PI*2),R(-1,1)); tmpQ.setFromEuler(e); const k=R(0.75,1.3)*s; sc.set(k,k,k); ps.set(x,y,z);
    tmpM.compose(ps,tmpQ,sc); instHojas.setMatrixAt(n,tmpM); instHojas.setColorAt(n,col); n++;
  };
  for(const s of [-1,1]) for(let i=0;i<porLado;i++){
    const prof=rnd()<0.75?Math.pow(rnd(),1.6)*0.18:R(0,CAMA-0.1);
    const y=R(0.08,ALTO_SETO+R(-0.1,0.15));
    const col=(y>1.4&&rnd()<0.12)?rojizo:verdes[(rnd()*verdes.length)|0];
    ponerHoja(s*(PASILLO/2+0.02+prof),y,R(0.3,-L-0.3),1,col);
  }

  // Rosas
  const preset={
    estandar:{p:[45,40,15], inm:[0.0,0.34], opt:[0.5,0.72], pas:[0.88,1.0]},
    comun:{p:[55,45,0], inm:[0.22,0.39], opt:[0.46,0.68], pas:[0.86,1.0]},
    dificiles:{p:[40,40,20], inm:[0.3,0.41], opt:[0.43,0.79], pas:[0.81,0.93]},
    personalizado:{p:[cfg.pInm,cfg.pOpt,cfg.pPas], inm:[0.0,0.36], opt:[0.48,0.74], pas:[0.86,1.0]},
    banco:{p:BANCO.conteos(), inm:[0.0,0.34], opt:[0.5,0.72], pas:[0.88,1.0]}
  }[cfg.escenario];
  // Banco de la finca: cada rosa virtual corresponde a una rosa real calificada por el experto
  const RANGO_DIFICIL={inm:[0.36,0.41], opt:[0.43,0.5], pas:[0.81,0.86]};
  let bancoLista=null, kB=0;
  if(cfg.escenario==='banco'){
    bancoLista=BANCO.lista().slice();
    for(let i=bancoLista.length-1;i>0;i--){ const j=Math.floor(rnd()*(i+1)); [bancoLista[i],bancoLista[j]]=[bancoLista[j],bancoLista[i]]; }
  }
  const sumaP=preset.p[0]+preset.p[1]+preset.p[2]||1;
  const nFlores=Math.max(4,Math.round(L*cfg.densidad));
  const nVacios=Math.round(L*0.5);
  const totalTallos=(nFlores+nVacios)*2;
  instTallos=new THREE.InstancedMesh((()=>{const g=new THREE.CylinderGeometry(0.0045,0.006,1,6);g.translate(0,0.5,0);return g;})(),new THREE.MeshStandardMaterial({color:'#3f7434',roughness:0.8}),totalTallos);
  instHojasTallo=new THREE.InstancedMesh(geoHoja,new THREE.MeshStandardMaterial({color:'#457a37',side:THREE.DoubleSide,roughness:0.8}),totalTallos*3);
  instGuia=new THREE.InstancedMesh((()=>{const g=new THREE.CylinderGeometry(0.011,0.011,1,10,1,true);g.translate(0,0.5,0);return g;})(),new THREE.MeshBasicMaterial({color:'#00c271',transparent:true,opacity:0.5,depthWrite:false}),nFlores*2);
  instGuia.visible=cfg.guia;
  const geoHit=new THREE.CylinderGeometry(0.03,0.03,1,6); geoHit.translate(0,0.5,0); geoHit.userData={};
  let it=0, ih=0, ig=0;

  const colocarTallo=(base,cabeza,conFlor,t)=>{
    const dir=tmpV.copy(cabeza).sub(base); const len=dir.length(); dir.normalize();
    const q=new THREE.Quaternion().setFromUnitVectors(UP,dir);
    tmpM.compose(base,q,sc.set(1,len,1)); instTallos.setMatrixAt(it,tmpM);
    const f={base:base.clone(),cabeza:cabeza.clone(),dir:dir.clone(),len,q,iTallo:it,hojas:[]}; it++;
    for(const fr of [0.3,0.55,0.78]){
      const p=base.clone().addScaledVector(dir,len*fr);
      e.set(R(0.6,1.2),R(0,Math.PI*2),0); const ql=new THREE.Quaternion().setFromEuler(e);
      const k=R(0.9,1.3); tmpM.compose(p,ql,sc.set(k,k,k)); instHojasTallo.setMatrixAt(ih,tmpM); f.hojas.push({i:ih,fr}); ih++;
    }
    return f;
  };

  for(const s of [-1,1]){
    for(let i=0;i<nFlores;i++){
      let tipo, t, itemB=null;
      if(bancoLista&&bancoLista.length){
        itemB=bancoLista[kB++%bancoLista.length];
        tipo={INM:'inm',OPT:'opt',PAS:'pas'}[itemB.label];
        t=R(...(itemB.dificil?RANGO_DIFICIL[tipo]:preset[tipo]));
      } else {
        const r=rnd()*sumaP;
        tipo=r<preset.p[0]?'inm':r<preset.p[0]+preset.p[1]?'opt':'pas';
        t=R(...preset[tipo]);
      }
      const z=R(-0.6,-L+0.6);
      const bajo=ruido&&rnd()<0.3;
      const cabeza=new THREE.Vector3(s*(PASILLO/2+R(-0.02,0.2)), bajo?R(1.55,1.72):R(1.85,2.2), z);
      const base=new THREE.Vector3(s*(PASILLO/2+R(0.2,0.4)), R(1.05,1.2), z+R(-0.1,0.1));
      const f=colocarTallo(base,cabeza,true,t);
      f.t=t; f.estado=estadoDe(t); f.lado=s; f.cortada=false; f.dificil=ruido;
      if(itemB){ f.banco=itemB.id; f.bancoLabel=itemB.label; f.bancoDificil=itemB.dificil; f.estado={INM:'inmadura',OPT:'punto',PAS:'sobreabierta'}[itemB.label]; }
      // cabeza
      const geo=geoCabeza(t);
      const grupo=new THREE.Group(); grupo.position.copy(cabeza);
      grupo.quaternion.copy(f.q).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(R(-0.15,0.15),R(0,6.28),R(-0.15,0.15))));
      const mPet=new THREE.Mesh(geo.pet,new THREE.MeshStandardMaterial({color:new THREE.Color(1,1,1).multiplyScalar(R(0.9,1)),vertexColors:true,side:THREE.DoubleSide,roughness:(t>=UMBRAL_INM&&t<=UMBRAL_PAS)?0.45:0.7}));
      const mSep=new THREE.Mesh(geo.sep,matSepalo);
      mPet.userData.compartida=true; mSep.userData.compartida=true;
      grupo.add(mPet,mSep); mundo.add(grupo); f.grupo=grupo;
      // zona de corte (40–60 cm bajo la cabeza)
      const ini=Math.max(0,f.len-0.60), fin=f.len-MIN_TALLO;
      if(fin>ini){ tmpM.compose(base.clone().addScaledVector(f.dir,ini),f.q,sc.set(1,fin-ini,1)); instGuia.setMatrixAt(ig,tmpM); f.iGuia=ig; ig++; }
      // volumen de impacto invisible para apuntar la tijera
      const hit=new THREE.Mesh(geoHit,new THREE.MeshBasicMaterial()); hit.visible=false;
      hit.position.copy(base); hit.quaternion.copy(f.q); hit.scale.set(1,f.len,1); hit.userData.flor=f;
      mundo.add(hit); hits.push(hit); f.hit=hit;
      if(ruido&&rnd()<0.55) for(let h=0;h<5&&n<totalHojas;h++) ponerHoja(cabeza.x+R(-0.08,0.08)*1,cabeza.y+R(-0.12,0.04),cabeza.z+R(-0.08,0.08),1.1,verdes[(rnd()*verdes.length)|0]);
      flores.push(f);
    }
    for(let i=0;i<nVacios;i++){ // tallos sin flor, solo para realismo
      const z=R(-0.4,-L+0.4);
      colocarTallo(new THREE.Vector3(s*(PASILLO/2+R(0.2,0.4)),R(1.1,1.3),z),new THREE.Vector3(s*(PASILLO/2+R(0,0.25)),R(1.65,2.0),z+R(-0.1,0.1)),false,0);
    }
  }
  instHojas.count=n; instTallos.count=it; instHojasTallo.count=ih; instGuia.count=ig;
  [instHojas,instTallos,instHojasTallo,instGuia].forEach(m=>{m.instanceMatrix.needsUpdate=true; if(m.instanceColor) m.instanceColor.needsUpdate=true; m.frustumCulled=false; mundo.add(m);});
  geoHoja.userData.compartida=false;
}

// =====================================================================
// Tijera, marcador y retroalimentación
// =====================================================================
const marcador=new THREE.Mesh(new THREE.TorusGeometry(0.02,0.003,8,24),new THREE.MeshBasicMaterial({color:'#ff3b3b',depthTest:false}));
marcador.renderOrder=20; marcador.visible=false; scene.add(marcador);
const QX=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI/2);

function crearTijera(){
  const g=new THREE.Group();
  const hoja=new THREE.MeshStandardMaterial({color:'#d8dcdc',metalness:0.8,roughness:0.3});
  const mango=new THREE.MeshStandardMaterial({color:'#F04432',roughness:0.5});
  for(const s of [-1,1]){
    const b=new THREE.Mesh(new THREE.BoxGeometry(0.008,0.003,0.07),hoja); b.position.set(s*0.004,0,-0.05); b.rotation.y=s*0.12; g.add(b);
    const m=new THREE.Mesh(new THREE.BoxGeometry(0.016,0.012,0.07),mango); m.position.set(s*0.012,-0.004,0.03); m.rotation.y=-s*0.2; g.add(m);
  }
  return g;
}

const feedback=[];
function mostrarFeedback(pos,txt,bueno){
  const e=etiquetaCanvas(); dibujarEtiqueta(e,txt,bueno?'#008B56':'#F04432');
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:e.tex,depthTest:false,transparent:true}));
  sp.renderOrder=30; sp.scale.set(0.42,0.42*180/1024,1); sp.position.copy(pos).add(new THREE.Vector3(0,0.12,0));
  scene.add(sp); feedback.push({sp,vida:2.8});
}
let audio=null;
function sonido(tipo){
  try{
    audio=audio||new (window.AudioContext||window.webkitAudioContext)();
    const t0=audio.currentTime;
    if(tipo==='snip'){
      const b=audio.createBuffer(1,audio.sampleRate*0.06,audio.sampleRate), d=b.getChannelData(0);
      for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,3);
      const s=audio.createBufferSource(); s.buffer=b; const f=audio.createBiquadFilter(); f.type='highpass'; f.frequency.value=2500;
      s.connect(f).connect(audio.destination); s.start();
    } else {
      const o=audio.createOscillator(), g=audio.createGain();
      o.frequency.setValueAtTime(tipo==='bien'?660:220,t0); if(tipo==='bien') o.frequency.setValueAtTime(880,t0+0.09);
      g.gain.setValueAtTime(0.12,t0); g.gain.exponentialRampToValueAtTime(0.001,t0+0.3);
      o.connect(g).connect(audio.destination); o.start(t0); o.stop(t0+0.32);
    }
  }catch(err){}
}

// =====================================================================
// Sesión
// =====================================================================
let modoAR=false, colocarPendiente=false;
let modoXR=null;               // 'ar' · 'vr' · null (computador o cámara del celular)
let cfg=null, estado='menu', tiempo=0, minZ=0, decisiones=[], resultado=null;
const raycaster=new THREE.Raycaster(); raycaster.far=ALCANCE;

function leerCfg(){
  const g=id=>$(id).value;
  return {
    nombre:g('nombre').trim()||'Aprendiz', modo:document.querySelector('input[name=modo]:checked').value,
    escenario:g('escenario'), largo:+g('largo'), densidad:+g('densidad'), tiempo:+g('tiempo'),
    pInm:+g('pInm'), pOpt:+g('pOpt'), pPas:+g('pPas'), semilla:(g('semilla').trim()||'0000').toUpperCase(),
    nombrePunto:g('nombrePunto').trim()||'Punto óptimo',
    retro:$('retro').checked, guia:$('guia').checked, ojos:Math.min(1.9,Math.max(1.3,+g('ojos')||1.55))
  };
}

window.ir=function(id){
  document.querySelectorAll('.pantalla').forEach(p=>p.classList.toggle('on',p.id===id));
  if(id==='config'&&!$('semilla').value) $('semilla').value=Math.random().toString(36).slice(2,6).toUpperCase();
  if(id==='config'){ BANCO.refrescarOpcion(); syncMenu(); }
  if(id==='inicio') BANCO.refrescarInicio();
};

const NOMBRE_ESC={estandar:'Cama estándar',comun:'Error más común',dificiles:'Casos difíciles',personalizado:'Personalizado',banco:'Banco de la finca'};
window.prepararSesion=function(){
  cfg=leerCfg();
  if(cfg.escenario==='personalizado'&&cfg.pInm+cfg.pOpt+cfg.pPas===0){alert('La proporción de flores no puede ser 0%.');return;}
  if(cfg.escenario==='banco'&&!BANCO.lista().length){alert('El banco aún no tiene rosas calificadas por el experto.');return;}
  $('resumen').innerHTML=`<b>${cfg.nombre}</b> · ${cfg.modo==='practica'?'Práctica guiada':'Evaluación'}<br>
    Escenario: ${NOMBRE_ESC[cfg.escenario]} · Cama de ${cfg.largo} m · Código <b>${cfg.semilla}</b><br>
    Tiempo: ${cfg.tiempo?cfg.tiempo/60+' min':'sin límite'} · Ayudas: ${[cfg.retro&&'retroalimentación',cfg.guia&&'zona de corte'].filter(Boolean).join(', ')||'ninguna'}<br>
    Corta solo las rosas en <b>${cfg.nombrePunto}</b>, con al menos ${MIN_TALLO*100} cm de tallo.<br>En AR basta un espacio libre de unos 3 × 2,5 m: camina unos pasos y avanza por la cama con la palanca izquierda (gafas) o con el botón ▲ Avanzar (celular o tableta).<br>En VR puedes jugar de pie o sentado: caminas con la palanca izquierda y giras con la derecha.`;
  ir('listo');
};

function arrancar(){
  construirCultivo(cfg,modoAR);
  estado='jugando'; tiempo=0; minZ=0.6; decisiones=[]; resultado=null;
  feedback.splice(0).forEach(f=>scene.remove(f.sp)); cerrarPanelVR();
  document.querySelectorAll('.pantalla').forEach(p=>p.classList.remove('on'));
}

window.iniciarPC=function(){
  modoAR=false; arrancar();
  rig.position.set(0,0,0); rig.rotation.set(0,0,0);
  camera.position.set(0,cfg.ojos,0.6); camera.rotation.set(0.35,0,0); // mirada hacia arriba, como en la cama
  $('hud').style.display='block'; $('mira').style.display='block';
  sonido('snip'); controls.lock();
};

// =====================================================================
// Celular y tableta
// =====================================================================
const esMovil=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||(navigator.maxTouchPoints>1&&/Macintosh/.test(navigator.userAgent));
let modoMovil=null;            // 'xr' (WebXR en Android) · 'camara' (video + giroscopio) · null
let colocando=false, hitSource=null, avanzando=0;
const reticula=new THREE.Mesh(new THREE.RingGeometry(0.12,0.16,32).rotateX(-Math.PI/2),new THREE.MeshBasicMaterial({color:'#F04432'}));
reticula.matrixAutoUpdate=false; reticula.visible=false; scene.add(reticula);
const tmpPos=new THREE.Vector3(), tmpQuat=new THREE.Quaternion(), tmpSc=new THREE.Vector3();

function instruccion(txt){ const el=$('instruccion'); el.textContent=txt||''; el.style.display=txt?'block':'none'; }
function mostrarMovil(on){ $('movil').classList.toggle('on',on); $('mira').style.display=on?'block':'none'; }
function rayoCentro(){ return {o:camera.getWorldPosition(new THREE.Vector3()), d:camera.getWorldDirection(new THREE.Vector3())}; }
// Coloca la cama con el pasillo hacia donde mira el usuario
function orientarCama(pos){
  const cp=camera.getWorldPosition(new THREE.Vector3()), cd=camera.getWorldDirection(new THREE.Vector3());
  mundo.position.set(pos?pos.x:cp.x, pos?pos.y:0, pos?pos.z:cp.z);
  mundo.rotation.set(0,Math.atan2(-cd.x,-cd.z),0); mundo.updateMatrixWorld(true);
}
function salirMovil(){
  mostrarMovil(false); instruccion(''); reticula.visible=false; colocando=false; avanzando=0;
  if(hitSource){ try{hitSource.cancel();}catch(e){} hitSource=null; }
  const v=$('camara'); if(v.srcObject){ v.srcObject.getTracks().forEach(t=>t.stop()); v.srcObject=null; } v.style.display='none';
  window.removeEventListener('deviceorientation',alOrientar); renderer.xr.setReferenceSpaceType('local-floor');
  camera.fov=70; camera.updateProjectionMatrix(); modoMovil=null;
}

// Botones en pantalla (los toques en botones no cuentan como corte en WebXR)
$('movil').addEventListener('beforexrselect',e=>e.preventDefault());
const mantener=(id,val)=>{ const b=$(id);
  b.addEventListener('pointerdown',e=>{e.preventDefault();avanzando=val;b.classList.add('on');});
  ['pointerup','pointercancel','pointerleave'].forEach(ev=>b.addEventListener(ev,()=>{if(avanzando===val)avanzando=0;b.classList.remove('on');}));
};
mantener('mAvanzar',1); mantener('mRetroceder',-1);
$('mCortar').addEventListener('click',()=>{ if(estado==='jugando'&&!colocando){ const {o,d}=rayoCentro(); cortar(apuntar(o,d)); } });
$('mRecolocar').addEventListener('click',()=>{
  if(modoMovil==='xr'){ colocando=true; mundo.visible=false; instruccion('Apunta al piso y toca la pantalla para colocar la cama'); }
  else if(modoMovil==='camara'){ recentrar=true; }
});
$('mFinalizar').addEventListener('click',()=>finalizar());

// --- AR con WebXR: Quest 3 (gafas) y Android con Chrome (cámara + detección del piso) ---
window.iniciarAR=async function(){
  try{
    const movil=esMovil;
    const opciones=movil
      ? {requiredFeatures:['hit-test'],optionalFeatures:['dom-overlay','local-floor'],domOverlay:{root:$('movil')}}
      : {requiredFeatures:['local-floor'],optionalFeatures:['bounded-floor','hand-tracking']};
    const ses=await navigator.xr.requestSession('immersive-ar',opciones);
    modoAR=true; modoXR='ar'; arrancar();
    rig.position.set(0,0,0); rig.rotation.set(0,0,0); camera.position.set(0,0,0); camera.rotation.set(0,0,0);
    if(movil){
      modoMovil='xr'; colocando=true; mundo.visible=false;
      renderer.xr.setReferenceSpaceType('local');           // en celular el piso se encuentra con hit-test
      mostrarMovil(true); instruccion('Mueve el dispositivo apuntando al piso y toca la pantalla para colocar la cama');
      ses.requestReferenceSpace('viewer').then(vs=>ses.requestHitTestSource({space:vs})).then(h=>hitSource=h).catch(()=>{});
    } else colocarPendiente=true;
    await renderer.xr.setSession(ses);
    ses.addEventListener('end',()=>{ salirMovil(); modoXR=null; if(estado==='jugando') finalizar(); else if(resultado) mostrarResultados(); });
  }catch(err){
    alert('No se pudo iniciar AR: '+err.message+(esMovil?'\nPrueba con "Usar la cámara del dispositivo".':''));
    salirMovil(); modoXR=null;
  }
};

// --- VR con WebXR: Quest 3. Se recorre la cama dentro del invernadero virtual ---
window.iniciarVR=async function(){
  try{
    const ses=await navigator.xr.requestSession('immersive-vr',{optionalFeatures:['local-floor','bounded-floor','hand-tracking']});
    modoAR=false; modoXR='vr'; arrancar();
    rig.position.set(0,0,0.6); rig.rotation.set(0,0,0); camera.position.set(0,0,0); camera.rotation.set(0,0,0);
    await renderer.xr.setSession(ses);
    ses.addEventListener('end',()=>{ modoXR=null; rig.position.set(0,0,0); rig.rotation.set(0,0,0); if(estado==='jugando') finalizar(); else if(resultado) mostrarResultados(); });
  }catch(err){ modoXR=null; alert('No se pudo iniciar VR: '+err.message); }
};

// --- Modo cámara: funciona en iPhone, iPad y cualquier celular con navegador moderno ---
const _zee=new THREE.Vector3(0,0,1), _eul=new THREE.Euler(), _q0=new THREE.Quaternion(), _q1=new THREE.Quaternion(-Math.sqrt(0.5),0,0,Math.sqrt(0.5));
const qDisp=new THREE.Quaternion(), qOffset=new THREE.Quaternion(); let orientacion=null, recentrar=true, ultimaOri=0;
function alOrientar(e){ if(e.alpha===null) return; orientacion={a:e.alpha,b:e.beta,g:e.gamma}; ultimaOri=performance.now(); }
function aplicarOrientacion(){
  if(!orientacion) return;
  const DEG=Math.PI/180, scr=((screen.orientation&&screen.orientation.angle)||window.orientation||0)*DEG;
  _eul.set(orientacion.b*DEG,orientacion.a*DEG,-orientacion.g*DEG,'YXZ');
  qDisp.setFromEuler(_eul).multiply(_q1).multiply(_q0.setFromAxisAngle(_zee,-scr));
  if(recentrar){ // el pasillo queda hacia donde apunta el dispositivo
    const f=new THREE.Vector3(0,0,-1).applyQuaternion(qDisp); qOffset.setFromAxisAngle(UP,-Math.atan2(-f.x,-f.z)); recentrar=false;
  }
  camera.quaternion.copy(qOffset).multiply(qDisp);
}
// Sin giroscopio: mirar arrastrando el dedo
let arrastre=null, yaw=0, pitch=0.45;
renderer.domElement.addEventListener('pointerdown',e=>{
  if(modoMovil!=='camara'||estado!=='jugando') return;
  arrastre={x:e.clientX,y:e.clientY,t:performance.now(),mov:0};
});
renderer.domElement.addEventListener('pointermove',e=>{
  if(!arrastre||modoMovil!=='camara') return;
  const dx=e.clientX-arrastre.x, dy=e.clientY-arrastre.y; arrastre.mov+=Math.abs(dx)+Math.abs(dy); arrastre.x=e.clientX; arrastre.y=e.clientY;
  if(!orientacion){ yaw-=dx*0.005; pitch=Math.max(-1.2,Math.min(1.4,pitch-dy*0.005)); }
});
renderer.domElement.addEventListener('pointerup',e=>{
  if(!arrastre||modoMovil!=='camara') return;
  const toque=arrastre.mov<12; arrastre=null;
  if(toque&&estado==='jugando'){ // tocar un tallo en la pantalla = cortar ahí
    const ndc=new THREE.Vector2(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1);
    raycaster.setFromCamera(ndc,camera); raycaster.far=ALCANCE;
    const r=raycaster.intersectObjects(hits,false)[0]; if(r) cortar({flor:r.object.userData.flor,punto:r.point});
  }
});
window.iniciarCamara=async function(){
  try{
    if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function'){
      try{ await DeviceOrientationEvent.requestPermission(); }catch(e){}
    }
    const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});
    const v=$('camara'); v.srcObject=stream; v.style.display='block'; await v.play().catch(()=>{});
    modoAR=true; arrancar(); modoMovil='camara'; orientacion=null; recentrar=true; yaw=0; pitch=0.45;
    window.addEventListener('deviceorientation',alOrientar);
    rig.position.set(0,0,0); rig.rotation.set(0,0,0);
    camera.position.set(0,1.4,0.6); camera.rotation.set(0.45,0,0,'YXZ'); camera.fov=60; camera.updateProjectionMatrix();
    mostrarMovil(true); $('hud').style.display='none';
    instruccion('Levanta el dispositivo y mira hacia arriba: las rosas están por encima de tus ojos');
    setTimeout(()=>{ if(modoMovil==='camara') instruccion(orientacion?'':'Arrastra el dedo para mirar alrededor'); },3500);
    setTimeout(()=>{ if(modoMovil==='camara') instruccion(''); },8000);
  }catch(err){
    alert('No se pudo abrir la cámara: '+err.message+'\nRevisa que la página esté en HTTPS y que el navegador tenga permiso de cámara.');
    salirMovil();
  }
};

window.reanudar=function(){ $('pausa').classList.remove('on'); estado='jugando'; controls.lock(); };
window.repetir=function(){ $('resultados').classList.remove('on'); ir('listo'); };

controls.addEventListener('unlock',()=>{ if(estado==='jugando'&&!renderer.xr.isPresenting){ estado='pausa'; $('pausa').classList.add('on'); } });

// Corte
function apuntar(origen,dir){
  raycaster.set(origen,dir);
  const r=raycaster.intersectObjects(hits,false)[0];
  return r?{flor:r.object.userData.flor,punto:r.point}:null;
}
function largoTallo(f,p){
  mundo.worldToLocal(tmpV.copy(p)); // punto en coordenadas de la cama
  const proj=Math.min(f.len,Math.max(0,tmpV.sub(f.base).dot(f.dir)));
  return {proj, largo:f.len-proj};
}
function cortar(sel){
  if(!sel||estado!=='jugando') return;
  const f=sel.flor; if(f.cortada) return;
  const {proj,largo}=largoTallo(f,sel.punto);
  f.cortada=true;
  // la parte de arriba sale de la planta
  f.grupo.visible=false;
  tmpM.compose(f.base,f.q,new THREE.Vector3(1,Math.max(0.001,proj),1)); instTallos.setMatrixAt(f.iTallo,tmpM); instTallos.instanceMatrix.needsUpdate=true;
  for(const h of f.hojas) if(h.fr*f.len>proj) instHojasTallo.setMatrixAt(h.i,CERO);
  instHojasTallo.instanceMatrix.needsUpdate=true;
  if(f.iGuia!==undefined){ instGuia.setMatrixAt(f.iGuia,CERO); instGuia.instanceMatrix.needsUpdate=true; }
  hits.splice(hits.indexOf(f.hit),1);
  let tipo, txt;
  if(f.estado==='inmadura'){ tipo='prematuro'; txt='Prematuro: cabeza pequeña, rojo oscuro, sépalos pegados'; }
  else if(f.estado==='sobreabierta'){ tipo='tardio'; txt='Sobreabierta: ya pasó el punto de corte'; }
  else if(largo<MIN_TALLO){ tipo='tallo_corto'; txt=`Tallo corto: ${Math.round(largo*100)} cm (mín. ${MIN_TALLO*100})`; }
  else { tipo='correcto'; txt=`Correcto · ${cfg.nombrePunto} · tallo ${Math.round(largo*100)} cm`; }
  if(f.banco) txt+=f.bancoDificil?' · caso difícil según la finca':' · rosa real de la finca';
  decisiones.push({tipo,estado:f.estado,t:+f.t.toFixed(2),largo:Math.round(largo*100),tiempo:Math.round(tiempo),banco:f.banco||null});
  sonido('snip');
  if(cfg.retro&&cfg.modo==='practica'){ mostrarFeedback(sel.punto,(tipo==='correcto'?'✔ ':'✖ ')+txt,tipo==='correcto'); setTimeout(()=>sonido(tipo==='correcto'?'bien':'mal'),90); }
}

document.addEventListener('mousedown',e=>{
  if(controls.isLocked&&estado==='jugando'&&e.button===0){
    cortar(apuntar(camera.getWorldPosition(new THREE.Vector3()),camera.getWorldDirection(new THREE.Vector3())));
  }
});
const teclas={};
addEventListener('keydown',e=>{ teclas[e.code]=true; if(e.code==='KeyF'&&estado==='jugando'&&controls.isLocked){ controls.unlock(); finalizar(); } });
addEventListener('keyup',e=>{ teclas[e.code]=false; });

// Controles VR
const controladores=[];
for(const i of [0,1]){
  const c=renderer.xr.getController(i);
  const linea=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3(0,0,-ALCANCE)]),new THREE.LineBasicMaterial({color:'#ffffff',transparent:true,opacity:0.5}));
  c.add(linea); c.add(crearTijera());
  c.addEventListener('select',()=>{
    if(estado==='jugando'&&modoMovil==='xr'&&colocando){
      if(reticula.visible){ reticula.matrix.decompose(tmpPos,tmpQuat,tmpSc); orientarCama(tmpPos); mundo.visible=true; colocando=false; reticula.visible=false; instruccion(''); }
      return;
    }
    if(estado==='jugando'){ const {o,d}=rayoDe(c); cortar(apuntar(o,d)); }
    else if(estado==='resultados'&&renderer.xr.isPresenting) renderer.xr.getSession().end();
  });
  rig.add(c); controladores.push(c);
}
function rayoDe(c){
  const o=new THREE.Vector3().setFromMatrixPosition(c.matrixWorld);
  const d=new THREE.Vector3(0,0,-1).applyQuaternion(c.getWorldQuaternion(new THREE.Quaternion()));
  return {o,d};
}

// =====================================================================
// HUD
// =====================================================================
const hudVR=etiquetaCanvas(1024,150);
const spHud=new THREE.Sprite(new THREE.SpriteMaterial({map:hudVR.tex,depthTest:false,transparent:true}));
spHud.renderOrder=40; spHud.scale.set(0.34,0.34*150/1024,1); spHud.position.set(0,-0.3,-0.9); spHud.visible=false; camera.add(spHud);
let hudTxt='';
function fmt(s){s=Math.max(0,Math.round(s));return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;}
function actualizarHUD(){
  const restante=cfg.tiempo?cfg.tiempo-tiempo:null;
  const avance=Math.round(Math.min(100,Math.max(0,(0.6-minZ)/(cfg.largo)*100)));
  const txt=`${restante!==null?'⏱ '+fmt(restante):'⏱ '+fmt(tiempo)}   ✂ ${decisiones.length} cortes   ▸ ${avance}% de la cama`;
  if(txt===hudTxt) return; hudTxt=txt;
  $('hud').textContent=txt; $('hudMovil').textContent=txt;
  if(renderer.xr.isPresenting) dibujarEtiqueta(hudVR,txt,'rgba(0,83,51,0.88)');
}

// =====================================================================
// Final y resultados
// =====================================================================
window.finalizar=function(){
  if(estado!=='jugando'&&estado!=='pausa') return;
  estado='resultados'; marcador.visible=false;
  $('pausa').classList.remove('on'); $('hud').style.display='none'; $('mira').style.display='none';
  const recorridas=flores.filter(f=>f.cabeza.z>=minZ-0.3);
  const omitidas=recorridas.filter(f=>f.estado==='punto'&&!f.cortada).length;
  const disponibles=recorridas.filter(f=>f.estado==='punto').length;
  const c=t=>decisiones.filter(d=>d.tipo===t).length;
  const cortes=decisiones.length, correctos=c('correcto');
  resultado={
    fecha:new Date().toLocaleString('es-CO'), nombre:cfg.nombre, modo:cfg.modo, escenario:NOMBRE_ESC[cfg.escenario], semilla:cfg.semilla,
    tiempo:Math.round(tiempo), cortes, correctos, prematuros:c('prematuro'), tardios:c('tardio'), tallo_corto:c('tallo_corto'),
    omitidas, disponibles, recorrido:Math.round(Math.min(100,(0.6-minZ)/cfg.largo*100)),
    conformidad:cortes?Math.round(correctos/cortes*100):0,
    aprovechamiento:disponibles?Math.round(correctos/disponibles*100):0,
    tallosHora:tiempo>0?Math.round(cortes/tiempo*3600):0
  };
  try{ const h=JSON.parse(localStorage.getItem('roselab_historial')||'[]'); h.unshift(resultado); localStorage.setItem('roselab_historial',JSON.stringify(h.slice(0,200))); }catch(err){}
  if(renderer.xr.isPresenting){ if(modoMovil==='xr') renderer.xr.getSession().end(); else panelVR(); }
  else { if(modoMovil==='camara') salirMovil(); if(controls.isLocked) controls.unlock(); mostrarResultados(); }
};

function mostrarResultados(){
  const r=resultado; if(!r) return;
  $('resSub').textContent=`${r.nombre} · ${r.modo==='practica'?'Práctica':'Evaluación'} · ${r.escenario} · Código ${r.semilla} · ${fmt(r.tiempo)} · ${r.recorrido}% de la cama recorrida`;
  $('resMet').innerHTML=[
    ['Correctos',r.correctos,'#008B56'],['Prematuros',r.prematuros,'#F04432'],['Flores omitidas',r.omitidas,'#c98a12'],['Tiempo',fmt(r.tiempo),'#005333']
  ].map(([n,v,c])=>`<div class="met"><b style="color:${c}">${v}</b><small>${n}</small></div>`).join('');
  $('resConf').innerHTML=`
    <div style="display:flex;justify-content:space-between;font-size:14px"><span>Conformidad del corte (meta Meteoro 88%)</span><b>${r.conformidad}%</b></div>
    <div class="barra"><i style="width:${r.conformidad}%;background:${r.conformidad>=88?'#008B56':'#F04432'}"></i><em style="left:88%"></em></div>
    <div style="display:flex;justify-content:space-between;font-size:14px;margin-top:10px"><span>Aprovechamiento: rosas en punto cortadas</span><b>${r.correctos} de ${r.disponibles} (${r.aprovechamiento}%)</b></div>
    <div class="barra"><i style="width:${r.aprovechamiento}%"></i></div>
    <p class="nota">Ritmo: ${r.tallosHora} tallos/hora (meta en campo: 220). En simulación el ritmo es solo una referencia.</p>`;
  const filas=[['Cortes correctos',r.correctos,'Rosa en punto con tallo ≥ 40 cm'],
    ['Cortes prematuros',r.prematuros,'Rosa inmadura: cabeza pequeña, rojo oscuro, sépalos pegados'],
    ['Cortes tardíos',r.tardios,'Rosa sobreabierta'],
    ['Tallo corto',r.tallo_corto,`Rosa en punto cortada con menos de ${MIN_TALLO*100} cm`],
    ['Flores omitidas',r.omitidas,'Rosas en punto que quedaron en la planta'],
    ['Total de cortes',r.cortes,'']];
  $('resTabla').innerHTML='<tr><th>Resultado</th><th>Cantidad</th><th>Qué significa</th></tr>'+filas.map(f=>`<tr><td>${f[0]}</td><td><b>${f[1]}</b></td><td class="nota">${f[2]}</td></tr>`).join('');
  const datosBanco=(cfg&&cfg.escenario==='banco')?flores.filter(f=>f.banco&&(f.cortada||(f.estado==='punto'&&f.cabeza.z>=minZ-0.3)))
    .map(f=>({id:f.banco,cortada:f.cortada,label:f.bancoLabel,dificil:f.bancoDificil})):[];
  $('resBanco').innerHTML=BANCO.htmlResultados(datosBanco);
  let h=[]; try{h=JSON.parse(localStorage.getItem('roselab_historial')||'[]');}catch(err){}
  $('resHist').innerHTML='<tr><th>Fecha</th><th>Aprendiz</th><th>Modo</th><th>Código</th><th>Conf.</th><th>Omit.</th><th>Tiempo</th></tr>'+
    h.slice(0,30).map(x=>`<tr><td>${x.fecha}</td><td>${x.nombre}</td><td>${x.modo==='practica'?'Práctica':'Evaluación'}</td><td>${x.semilla}</td><td>${x.conformidad}%</td><td>${x.omitidas}</td><td>${fmt(x.tiempo)}</td></tr>`).join('');
  ir('resultados');
}

window.descargarCSV=function(){
  let h=[]; try{h=JSON.parse(localStorage.getItem('roselab_historial')||'[]');}catch(err){}
  const cols=['fecha','nombre','modo','escenario','semilla','tiempo','cortes','correctos','prematuros','tardios','tallo_corto','omitidas','disponibles','conformidad','aprovechamiento','tallosHora','recorrido'];
  const csv=[cols.join(',')].concat(h.map(x=>cols.map(c=>`"${String(x[c]??'').replace(/"/g,'""')}"`).join(','))).join('\n');
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob(['﻿'+csv],{type:'text/csv'})); a.download='roselab_historial.csv'; a.click();
};

// Panel de resultados dentro del visor
let panel=null;
const logoPanel=new Image(); logoPanel.src='assets/logo-ght-color.png';
function panelVR(){
  const r=resultado, c=document.createElement('canvas'); c.width=1024; c.height=760; const g=c.getContext('2d');
  g.fillStyle='#ffffff'; g.beginPath(); g.roundRect(0,0,1024,760,44); g.fill();
  const gr=g.createLinearGradient(0,0,1024,0); gr.addColorStop(0,'#005333'); gr.addColorStop(1,'#008B56');
  g.fillStyle=gr; g.beginPath(); g.roundRect(0,0,1024,150,[44,44,0,0]); g.fill();
  g.fillStyle='#fff'; g.font='bold 56px Montserrat,sans-serif'; g.fillText('Evaluación del trabajo',50,95);
  g.font='28px Montserrat,sans-serif'; g.fillStyle='#d7efe2'; g.fillText(`${r.nombre} · ${fmt(r.tiempo)} · ${r.recorrido}% recorrido`,50,132);
  const items=[['Correctos',r.correctos,'#008B56'],['Prematuros',r.prematuros,'#F04432'],['Tardíos',r.tardios,'#F04432'],['Tallo corto',r.tallo_corto,'#c98a12'],['Omitidas',r.omitidas,'#c98a12']];
  items.forEach(([n,v,col],i)=>{ g.fillStyle=col; g.font='bold 52px Montserrat,sans-serif'; g.fillText(String(v),50,240+i*80); g.fillStyle='#16382a'; g.font='34px Montserrat,sans-serif'; g.fillText(n,150,237+i*80); });
  g.fillStyle='#005333'; g.font='bold 120px Montserrat,sans-serif'; g.fillText(r.conformidad+'%',560,330);
  g.font='30px Montserrat,sans-serif'; g.fillStyle='#579966'; g.fillText('conformidad (meta 88%)',560,378);
  g.fillStyle='#e3ece6'; g.fillRect(560,410,400,26);
  g.fillStyle=r.conformidad>=88?'#008B56':'#F04432'; g.fillRect(560,410,Math.max(4,4*r.conformidad),26);
  g.fillStyle='#005333'; g.fillRect(560+352,402,5,42);
  g.font='28px Montserrat,sans-serif'; g.fillStyle='#3d5a4b'; g.fillText('Gatillo: salir y ver el detalle',50,712);
  if(logoPanel.complete) g.drawImage(logoPanel,1024-50-150,672,150,150*logoPanel.height/logoPanel.width);
  const tex=new THREE.CanvasTexture(c); tex.colorSpace=THREE.SRGBColorSpace;
  panel=new THREE.Mesh(new THREE.PlaneGeometry(1.1,1.1*760/1024),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthTest:false}));
  panel.renderOrder=50;
  const cp=camera.getWorldPosition(new THREE.Vector3()), cd=camera.getWorldDirection(new THREE.Vector3()); cd.y=0; cd.normalize();
  panel.position.copy(cp).addScaledVector(cd,1.3); panel.lookAt(cp); scene.add(panel);
}
function cerrarPanelVR(){ if(panel){ scene.remove(panel); panel.material.map.dispose(); panel.material.dispose(); panel.geometry.dispose(); panel=null; } }

// =====================================================================
// Bucle principal
// =====================================================================
const reloj=new THREE.Clock(); let giroEspera=0, hudEspera=0;
const fwd=new THREE.Vector3(), der=new THREE.Vector3();
renderer.setAnimationLoop(()=>{
  const dt=Math.min(0.05,reloj.getDelta());
  const vr=renderer.xr.isPresenting;
  spHud.visible=vr&&!modoMovil&&estado==='jugando';
  controladores.forEach(c=>c.visible=vr&&!modoMovil);

  if(estado==='jugando'){
    tiempo+=dt;
    // movimiento
    if(vr){
      giroEspera-=dt;
      // AR: colocar la cama frente al usuario, alineada con su mirada y sobre el piso real
      if(modoXR==='ar'&&colocarPendiente){
        const cp=camera.getWorldPosition(new THREE.Vector3()), cd=camera.getWorldDirection(new THREE.Vector3());
        if(cp.lengthSq()>0||cd.z!==-1){
          mundo.position.set(cp.x,0,cp.z); mundo.rotation.set(0,Math.atan2(-cd.x,-cd.z),0);
          mundo.updateMatrixWorld(true); colocarPendiente=false;
        }
      }
      if(modoMovil==='xr'){
        // buscar el piso real y mostrar la retícula hasta que el usuario toque
        if(colocando&&hitSource){
          const fr=renderer.xr.getFrame(), res=fr?fr.getHitTestResults(hitSource):[];
          if(res.length){ const pose=res[0].getPose(renderer.xr.getReferenceSpace()); reticula.matrix.fromArray(pose.transform.matrix); reticula.visible=true; }
          else reticula.visible=false;
        }
        if(avanzando&&!colocando){ mundo.translateZ(avanzando*0.9*dt); mundo.updateMatrixWorld(true); }
      }
      const ses=renderer.xr.getSession();
      for(const src of ses.inputSources){
        const gp=src.gamepad; if(!gp) continue;
        const ax=gp.axes[2]||0, ay=gp.axes[3]||0;
        if(modoXR==='vr'){
          // VR: el jugador camina con la palanca izquierda y gira por pasos con la derecha
          if(src.handedness==='left'){
            camera.getWorldDirection(fwd); fwd.y=0; fwd.normalize(); der.crossVectors(fwd,UP);
            rig.position.addScaledVector(fwd,-ay*1.1*dt).addScaledVector(der,ax*1.1*dt);
          } else if(src.handedness==='right'){
            if(Math.abs(ax)>0.7&&giroEspera<=0){ rig.rotation.y-=Math.sign(ax)*Math.PI/6; giroEspera=0.35; }
          }
        } else {
          // En AR no se mueve la cámara (rompería la alineación con el espacio real): se desliza la cama
          if(src.handedness==='left'&&Math.abs(ay)>0.15){ mundo.translateZ(-ay*0.9*dt); mundo.updateMatrixWorld(true); }
          if(gp.buttons[1]&&gp.buttons[1].pressed&&giroEspera<=0){ colocarPendiente=true; giroEspera=0.8; }
        }
        if(gp.buttons[5]&&gp.buttons[5].pressed){ finalizar(); break; }
      }
      if(modoXR==='vr'){
        rig.position.x=Math.max(-0.2,Math.min(0.2,rig.position.x));
        rig.position.z=Math.min(1.2,rig.position.z);
        minZ=Math.min(minZ,camera.getWorldPosition(tmpV).z);
      } else if(!colocarPendiente&&!colocando) minZ=Math.min(minZ,mundo.worldToLocal(camera.getWorldPosition(tmpV)).z);
    } else if(modoMovil==='camara'){
      if(orientacion&&performance.now()-ultimaOri<2000) aplicarOrientacion();
      else { orientacion=null; camera.rotation.set(pitch,yaw,0,'YXZ'); }
      if(avanzando){ mundo.translateZ(avanzando*0.9*dt); mundo.updateMatrixWorld(true); }
      minZ=Math.min(minZ,mundo.worldToLocal(camera.getWorldPosition(tmpV)).z);
    } else if(controls.isLocked){
      const v=(teclas.ShiftLeft||teclas.ShiftRight?1.8:1.0)*dt;
      const f=(teclas.KeyW||teclas.ArrowUp?1:0)-(teclas.KeyS||teclas.ArrowDown?1:0);
      const l=(teclas.KeyD||teclas.ArrowRight?1:0)-(teclas.KeyA||teclas.ArrowLeft?1:0);
      if(f) controls.moveForward(f*v); if(l) controls.moveRight(l*v);
      camera.position.x=Math.max(-(PASILLO/2-0.12),Math.min(PASILLO/2-0.12,camera.position.x));
      camera.position.z=Math.min(1.2,camera.position.z);
      minZ=Math.min(minZ,camera.position.z);
    }
    // marcador de tijera
    let sel=null;
    if(modoMovil){ if(!colocando){ const {o,d}=rayoCentro(); sel=apuntar(o,d); } }
    else if(vr){ for(const c of controladores){ const {o,d}=rayoDe(c); sel=apuntar(o,d)||sel; } }
    else if(controls.isLocked) sel=apuntar(camera.getWorldPosition(new THREE.Vector3()),camera.getWorldDirection(new THREE.Vector3()));
    if(sel){
      marcador.visible=true; marcador.position.copy(sel.punto); marcador.quaternion.copy(mundo.quaternion).multiply(sel.flor.q).multiply(QX);
      const ok=largoTallo(sel.flor,sel.punto).largo>=MIN_TALLO;
      marcador.material.color.set(cfg.guia?(ok?'#00c271':'#F04432'):'#ffffff');
    } else marcador.visible=false;
    // fin de sesión
    if(minZ<-cfg.largo+0.2||(cfg.tiempo&&tiempo>=cfg.tiempo)) finalizar();
    hudEspera-=dt; if(hudEspera<=0){ actualizarHUD(); hudEspera=0.25; }
  }
  for(let i=feedback.length-1;i>=0;i--){
    const f=feedback[i]; f.vida-=dt; f.sp.material.opacity=Math.min(1,f.vida);
    if(f.vida<=0){ scene.remove(f.sp); f.sp.material.map.dispose(); f.sp.material.dispose(); feedback.splice(i,1); }
  }
  renderer.render(scene,camera);
});

window.__rl={camera,get mundo(){return mundo},get flores(){return flores},apuntar,cortar,finalizar:()=>window.finalizar()};
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});

// =====================================================================
// Interfaz del menú
// =====================================================================
function syncMenu(){
  const pers=$('escenario').value==='personalizado';
  if(!pers){
    const p=$('escenario').value==='banco'?BANCO.porcentajes():{estandar:[45,40,15],comun:[55,45,0],dificiles:[40,40,20]}[$('escenario').value];
    $('pInm').value=p[0];$('pOpt').value=p[1];$('pPas').value=p[2];
  }
  $('vInm').textContent=$('pInm').value+'%';$('vOpt').textContent=$('pOpt').value+'%';$('vPas').textContent=$('pPas').value+'%';
  const ev=document.querySelector('input[name=modo]:checked').value==='evaluacion';
  $('retro').disabled=ev; if(ev) $('retro').checked=false;
  $('notaModo').textContent=ev?'Evaluación: sin ayudas; el resultado se ve al final.':'Práctica: el sistema responde después de cada corte.';
  $('notaAyudas').textContent=ev?'En evaluación la retroalimentación está desactivada.':'';
}
// Mover una proporción activa el escenario Personalizado (antes los deslizadores quedaban bloqueados)
['pInm','pOpt','pPas'].forEach(id=>$(id).addEventListener('input',()=>{ $('escenario').value='personalizado'; }));
document.querySelectorAll('#config input,#config select').forEach(el=>el.addEventListener('input',syncMenu));
document.querySelectorAll('input[name=modo]').forEach(el=>el.addEventListener('change',()=>{ if(el.value==='practica'&&el.checked) $('retro').checked=true; syncMenu(); }));
syncMenu();

const hayCamara=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia);
if(esMovil){ $('btnPC').style.display='none'; if(hayCamara) $('btnCam').style.display=''; }
function notaDispositivo(arOK,vrOK){
  if(esMovil) $('notaVR').textContent = arOK
    ? 'Este dispositivo permite AR completo: la cama se apoya en el piso real. Si falla, usa "Usar la cámara del dispositivo".'
    : (hayCamara?'Este dispositivo no tiene AR con WebXR (por ejemplo iPhone o iPad): usa "Usar la cámara del dispositivo".':'Este navegador no permite usar la cámara. Abre la página en HTTPS con Chrome o Safari.');
  else $('notaVR').textContent = arOK&&vrOK ? 'Visor disponible. Elige AR para ver la cama en tu propio espacio, o VR para recorrerla dentro del invernadero virtual.'
    : arOK ? 'Visor AR disponible.' : vrOK ? 'Visor VR disponible.'
    : 'No se detectó visor AR ni VR. En las Quest 3, o en un celular Android con Chrome (AR), abre esta página (requiere HTTPS).';
}
// Cada botón se habilita si el dispositivo permite ese modo. En el celular se ocultan los que no aplican
// (la VR necesita gafas, así que en celular o tableta solo se ofrece AR y la cámara).
const soporta=modo=>navigator.xr?navigator.xr.isSessionSupported(modo).catch(()=>false):Promise.resolve(false);
Promise.all([soporta('immersive-ar'),soporta('immersive-vr')]).then(([arOK,vrOK])=>{
  vrOK=vrOK&&!esMovil;
  $('btnAR').disabled=!arOK; $('btnVR').disabled=!vrOK;
  if(esMovil){ if(!arOK) $('btnAR').style.display='none'; $('btnVR').style.display='none'; }
  notaDispositivo(arOK,vrOK);
});

// Botones del HTML: cada uno declara su acción con data-accion y, si la necesita, un argumento en data-arg.
const ACCIONES={
  ir:window.ir, prepararSesion:window.prepararSesion, iniciarPC:window.iniciarPC, iniciarAR:window.iniciarAR, iniciarVR:window.iniciarVR,
  iniciarCamara:window.iniciarCamara, reanudar:window.reanudar, finalizar:window.finalizar, repetir:window.repetir,
  descargarCSV:window.descargarCSV,
  irRecorrido:RECORRIDO.irRecorrido, alternarRecorrido:RECORRIDO.alternarRecorrido,
  saltarRecorrido:RECORRIDO.saltarRecorrido, reiniciarRecorrido:RECORRIDO.reiniciarRecorrido,
  ...BANCO
};
document.querySelectorAll('[data-accion]').forEach(btn=>{
  const accion=ACCIONES[btn.dataset.accion];
  if(!accion){ console.warn('Acción desconocida:',btn.dataset.accion); return; }
  btn.addEventListener('click',()=>accion(btn.dataset.arg));
});
BANCO.refrescarInicio();
