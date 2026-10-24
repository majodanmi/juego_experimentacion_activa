// =====================================================================
// A · RECORRIDO DEL ROBOT (simulado sobre fotos reales de la cama)
// =====================================================================
import { $ } from '../util/dom.js';
import { DATOS, urlFoto, urlRosa } from './datos-finca.js';

const PARADAS = DATOS.rec.map((n,i)=>({foto:n, pos:2+i*3.5, cajas:DATOS.finca.filter(r=>r.foto===n).map(r=>r.caja)}));
let animando=false, paso=0, temporizador=null;
const XP=150, Y0=40, Y1=390, LARGO=30;
function mapaSVG(){
  return `<svg viewBox="0 0 300 430" class="mapa"><text x="150" y="22" text-anchor="middle" class="mtit">Nave 3 · camas de Freedom</text>
  <rect x="96" y="${Y0}" width="34" height="${Y1-Y0}" rx="4" class="cama" id="camaA"/><rect x="170" y="${Y0}" width="34" height="${Y1-Y0}" rx="4" class="cama" id="camaB"/>
  <line x1="${XP}" y1="${Y0}" x2="${XP}" y2="${Y1}" class="pas"/>
  <text x="113" y="${Y1+18}" text-anchor="middle" class="mlab">Cama 41</text><text x="187" y="${Y1+18}" text-anchor="middle" class="mlab">Cama 42</text>
  <line id="ruta" x1="${XP}" y1="${Y0}" x2="${XP}" y2="${Y0}" class="ruta"/>
  <g id="robot" transform="translate(${XP},${Y0})"><circle r="9" class="rob"/><circle r="15" class="robhalo"/></g></svg>`;
}
const yDe = pos => Y0+(pos/LARGO)*(Y1-Y0);
function moverRobot(pos){ const y=yDe(pos); $('robot').setAttribute('transform',`translate(${XP},${y})`); $('ruta').setAttribute('y2',y); }

function totales(hasta){ const p=PARADAS.slice(0,hasta); return {fotos:p.length, rosas:p.reduce((a,q)=>a+q.cajas.length,0)}; }
function pintarContador(){ const t=totales(paso); $('contador').innerHTML=`Fotos: <b>${t.fotos}</b> · Rosas detectadas: <b>${t.rosas}</b>`; }
export function reiniciarRecorrido(){
  clearTimeout(temporizador); animando=false; paso=0; moverRobot(0);
  document.querySelectorAll('.cama').forEach(c=>c.classList.remove('visitada'));
  $('feedImg').src=urlFoto(PARADAS[0].foto); $('feedImg').style.opacity=0.25;
  $('cajas').innerHTML=''; $('tira').innerHTML=''; $('bitacora').innerHTML='';
  $('feedInfo').textContent='Robot en la entrada del pasillo. Listo para iniciar.'; pintarContador();
  $('btnRec').textContent='Iniciar recorrido'; $('btnRec').disabled=false; $('btnEnviarBanco').style.display='none';
}
const hora = i => `06:${String(12+i*4).padStart(2,'0')}`;
function registrarParada(p,i){
  ['camaA','camaB'].forEach(c=>$(c).classList.add('visitada'));
  DATOS.finca.filter(r=>r.foto===p.foto).forEach(r=>$('tira').insertAdjacentHTML('beforeend',`<figure><img src="${urlRosa(r.id)}"><figcaption>Foto ${p.foto}</figcaption></figure>`));
  $('bitacora').insertAdjacentHTML('afterbegin',`<div><b>${hora(i)}</b> · Foto ${p.foto} · ${p.pos.toFixed(1)} m · ${p.cajas.length} ${p.cajas.length===1?'rosa':'rosas'}</div>`);
}
function siguientePaso(){
  if(paso>=PARADAS.length){ terminarRecorrido(); return; }
  const p=PARADAS[paso]; moverRobot(p.pos);
  $('feedInfo').textContent=`Avanzando por el pasillo… ${p.pos.toFixed(1)} m`; $('cajas').innerHTML=''; $('feedImg').style.opacity=0.25;
  temporizador=setTimeout(()=>{
    $('feedImg').src=urlFoto(p.foto); $('feedImg').style.opacity=1;
    $('feedInfo').textContent=`Foto ${p.foto} · ${p.pos.toFixed(1)} m · buscando rosas…`; $('cajas').innerHTML='<div class="escaneo"></div>';
    temporizador=setTimeout(()=>{
      $('cajas').innerHTML=p.cajas.map(([x,y,w,h])=>`<div class="caja" style="left:${x/12}%;top:${y/16}%;width:${w/12}%;height:${h/16}%"><span>rosa</span></div>`).join('');
      $('feedInfo').textContent=`Foto ${p.foto} · ${p.pos.toFixed(1)} m · ${p.cajas.length} ${p.cajas.length===1?'rosa detectada':'rosas detectadas'}`;
      registrarParada(p,paso); paso++; pintarContador();
      if(animando) temporizador=setTimeout(siguientePaso,1100);
    },900);
  },800);
}
function terminarRecorrido(){
  animando=false; $('btnRec').textContent='Recorrido terminado'; $('btnRec').disabled=true; moverRobot(LARGO);
  $('feedInfo').textContent=`Muestra del recorrido terminada. La cama completa dejó ${new Set(DATOS.finca.map(r=>r.foto)).size} fotos con ${DATOS.finca.length} rosas marcadas.`;
  $('btnEnviarBanco').style.display='inline-block';
}
export function alternarRecorrido(){ if(paso>=PARADAS.length) return; animando=!animando; $('btnRec').textContent=animando?'Pausar':'Continuar'; if(animando) siguientePaso(); else clearTimeout(temporizador); }
export function saltarRecorrido(){
  clearTimeout(temporizador); animando=false;
  while(paso<PARADAS.length){ registrarParada(PARADAS[paso],paso); paso++; }
  const u=PARADAS[PARADAS.length-1]; $('feedImg').src=urlFoto(u.foto); $('feedImg').style.opacity=1;
  $('cajas').innerHTML=u.cajas.map(([x,y,w,h])=>`<div class="caja" style="left:${x/12}%;top:${y/16}%;width:${w/12}%;height:${h/16}%"><span>rosa</span></div>`).join('');
  pintarContador(); terminarRecorrido();
}

export function irRecorrido(){ window.ir('recorrido'); if(paso===0&&!animando) reiniciarRecorrido(); }

$('mapaRobot').innerHTML=mapaSVG();
