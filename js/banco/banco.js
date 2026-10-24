// =====================================================================
// B · BANCO DE ROSAS: calificación de fotos reales y consenso con el experto de la finca
// Etiquetas de la empresa: INM = inmadura (no cortar) · OPT = óptima (cortar) · PAS = sobreabierta
// =====================================================================
import { $, esc } from '../util/dom.js';
import { aCSV, crearZip, crearXLSX, descargar, fechaArchivo, bytesDeURL } from '../util/exportar.js';
import { DATOS, urlRosa } from './datos-finca.js';

const FINCA = 'Experto de la finca';
const NOMBRE = {INM:'Inmadura · no cortar', OPT:'Óptima · cortar', PAS:'Sobreabierta · pasada', X:'Descartada'};
const CORTO  = {INM:'INM', OPT:'ÓPT', PAS:'PAS', X:'—'};
const CLAVE  = 'roselab_banco_v3';
function hashTxt(t){ let h=2166136261; for(const c of String(t)){ h^=c.charCodeAt(0); h=Math.imul(h,16777619); } return h>>>0; }

// ---------------- Estado ----------------------------------------------
// items: rosas · perfiles: quién califica · registros: historial completo · cal: última etiqueta por persona
const nuevaSesion = () => 'S'+new Date().toISOString().slice(0,10).replace(/-/g,'')+'-'+Math.random().toString(36).slice(2,6).toUpperCase();
const nuevoBanco = () => ({version:3, items:[], calificadores:[], perfiles:{}, cal:{}, registros:[], sesion:nuevaSesion()});
let B = nuevoBanco();
function cargar(){ try{ const d=JSON.parse(localStorage.getItem(CLAVE)||'null'); if(d&&d.items){ B=Object.assign(nuevoBanco(),d); B.sesion=nuevaSesion(); } }catch(e){} }
function guardar(){ try{ localStorage.setItem(CLAVE, JSON.stringify(B)); }catch(e){} }
cargar();
const img = it => it.img || urlRosa(it.id);

function cargarDatasetFinca(){
  const ya=new Set(B.items.map(i=>i.id));
  if(!B.calificadores.includes(FINCA)) B.calificadores.unshift(FINCA);
  B.perfiles[FINCA]=B.perfiles[FINCA]||{id:'C00', rol:'Experto de la finca (dataset de la empresa)', experiencia:null};
  for(const r of DATOS.finca){
    if(ya.has(r.id)) continue;
    B.items.push({id:r.id, foto:r.foto, origen:'Dataset de la finca', variedad:'Freedom', vista:'Desde abajo, en la cama', dif_finca:r.dif});
    if(r.et){ (B.cal[r.id]=B.cal[r.id]||{})[FINCA]=r.et;
      B.registros.push({id:'K'+String(B.registros.length+1).padStart(4,'0'), rosa:r.id, cal:FINCA, etiqueta:r.et, confianza:r.dif?'baja':'alta', fecha:null, t_resp_s:null, sesion:'dataset_finca'}); }
  }
  guardar();
}

// ---------------- Consenso ---------------------------------------------
function etiquetasDe(it){ return B.calificadores.map(n=>(B.cal[it.id]||{})[n]).filter(Boolean); }
function consenso(it){
  const et=etiquetasDe(it).filter(e=>e!=='X'); if(!et.length) return null;
  const finca=(B.cal[it.id]||{})[FINCA];
  const label=(finca&&finca!=='X')?finca:et[0];
  const acuerdo=et.every(e=>e===et[0]);
  return {label, dificil: !!it.dif_finca || !acuerdo, n:et.length};
}
function lista(){ return B.items.map(it=>{ const c=consenso(it); return c?{id:it.id,label:c.label,dificil:c.dificil}:null; }).filter(Boolean); }
function conteos(){ const l=lista(); return ['INM','OPT','PAS'].map(k=>l.filter(x=>x.label===k).length); }
function porcentajes(){ const c=conteos(), s=c[0]+c[1]+c[2]; return s?c.map(x=>Math.round(x/s*100)):[0,0,0]; }
function kappa(a,b){
  const pares=B.items.map(it=>[(B.cal[it.id]||{})[a],(B.cal[it.id]||{})[b]]).filter(([x,y])=>x&&y&&x!=='X'&&y!=='X');
  const n=pares.length; if(n<5) return null;
  const po=pares.filter(([x,y])=>x===y).length/n; let pe=0;
  for(const k of ['INM','OPT','PAS']) pe+=(pares.filter(p=>p[0]===k).length/n)*(pares.filter(p=>p[1]===k).length/n);
  return {k:pe<1?(po-pe)/(1-pe):1, po, n};
}
function coincideFinca(nombre){
  const ev=B.items.filter(it=>{ const f=(B.cal[it.id]||{})[FINCA], m=(B.cal[it.id]||{})[nombre]; return f&&m&&f!=='X'&&m!=='X'; });
  return {ok:ev.filter(it=>B.cal[it.id][FINCA]===B.cal[it.id][nombre]).length, n:ev.length};
}

// =====================================================================
// BANCO DE ROSAS
// =====================================================================
let calificadorActual=null, cola=[], idxCola=0, inicioTarjeta=0, esperando=false;
function irBanco(){ window.ir('banco'); vistaResumen(); }
function enviarAlBanco(){ cargarDatasetFinca(); irBanco(); }
function pendientes(n){ return B.items.filter(it=>!(B.cal[it.id]||{})[n]); }
function muestra(lst, cuantos, semilla){
  if(cuantos==='todas'||lst.length<=+cuantos) return lst;
  const ord=a=>a.slice().sort((x,y)=>hashTxt(semilla+x.id)-hashTxt(semilla+y.id));
  const grupos={INM:[],OPT:[],PAS:[],DIF:[]};
  lst.forEach(it=>{ const f=(B.cal[it.id]||{})[FINCA]; grupos[f&&!it.dif_finca?f:'DIF'].push(it); });
  const n=+cuantos, cuota={PAS:Math.min(grupos.PAS.length,2), DIF:Math.min(grupos.DIF.length,Math.round(n*0.13))};
  cuota.OPT=Math.min(grupos.OPT.length,Math.round((n-cuota.PAS-cuota.DIF)/2)); cuota.INM=n-cuota.PAS-cuota.DIF-cuota.OPT;
  const sel=[]; for(const k of ['INM','OPT','PAS','DIF']) sel.push(...ord(grupos[k]).slice(0,cuota[k]));
  return ord(sel);
}
function iniciarCalificacion(nombre, rol, experiencia, cuantos){
  nombre=(nombre||'').trim(); if(!nombre){ alert('Escribe el nombre de quien califica.'); return; }
  if(nombre===FINCA){ alert('Ese nombre está reservado para las etiquetas de la empresa.'); return; }
  if(!B.calificadores.includes(nombre)) B.calificadores.push(nombre);
  if(!B.perfiles[nombre]) B.perfiles[nombre]={id:'C'+String(Object.keys(B.perfiles).length).padStart(2,'0'), rol:rol||'Sin dato', experiencia:(experiencia===''||experiencia==null)?null:+experiencia};
  guardar(); calificadorActual=nombre; cola=muestra(pendientes(nombre), cuantos||'todas', nombre); idxCola=0;
  if(!cola.length){ vistaResumen(); return; }
  $('bancoResumen').style.display='none'; $('bancoCalificar').style.display='block'; mostrarTarjeta();
}
function mostrarTarjeta(){
  esperando=false; $('calResp').style.display='none';
  if(idxCola>=cola.length){ $('bancoCalificar').style.display='none'; vistaResumen(); return; }
  const it=cola[idxCola];
  $('calImg').src=img(it);
  $('calMeta').innerHTML=`<b>${it.foto?'Foto '+it.foto:esc(it.origen)}</b> · ${esc(it.variedad)} · ${esc(it.vista)}`;
  $('calQuien').textContent=`Califica: ${calificadorActual}`; $('calProg').textContent=`Rosa ${idxCola+1} de ${cola.length}`;
  $('calBarra').style.width=(idxCola/cola.length*100)+'%'; $('calDuda').checked=false; inicioTarjeta=performance.now();
}
function calificar(label){
  if($('bancoCalificar').style.display!=='block'||esperando) return;
  const it=cola[idxCola]; (B.cal[it.id]=B.cal[it.id]||{})[calificadorActual]=label;
  B.registros.push({id:'K'+String(B.registros.length+1).padStart(4,'0'), rosa:it.id, cal:calificadorActual, etiqueta:label,
    confianza:$('calDuda').checked?'baja':'alta', fecha:new Date().toISOString(), t_resp_s:Math.round((performance.now()-inicioTarjeta)/100)/10, sesion:B.sesion});
  guardar(); idxCola++;
  const f=(B.cal[it.id]||{})[FINCA];
  if($('modoEntreno').checked && f && label!=='X'){
    esperando=true; const ok=f===label;
    $('calResp').className='calresp '+(ok?'bien':'mal');
    $('calResp').innerHTML=ok?`✔ Coincides con la finca: ${NOMBRE[f]}`:`✖ La finca la calificó como <b>${NOMBRE[f]}</b>`+(it.dif_finca?'<br><small>La empresa la marcó como caso difícil</small>':'');
    $('calResp').style.display='block'; setTimeout(mostrarTarjeta, ok?900:1900);
  } else mostrarTarjeta();
}
document.addEventListener('keydown', e=>{
  if(!$('banco')||!$('banco').classList.contains('on')||$('bancoCalificar').style.display!=='block') return;
  if(e.target&&e.target.tagName==='INPUT'&&e.target.type!=='checkbox') return;
  if(e.code==='KeyD'){ $('calDuda').checked=!$('calDuda').checked; return; }
  const m={Digit1:'INM',Digit2:'OPT',Digit3:'PAS',Digit0:'X',Numpad1:'INM',Numpad2:'OPT',Numpad3:'PAS',Numpad0:'X'}[e.code];
  if(m) calificar(m);
});
function vistaResumen(){
  $('bancoCalificar').style.display='none'; $('bancoResumen').style.display='block';
  const vacio=!B.items.length; $('bancoVacio').style.display=vacio?'block':'none'; $('bancoLleno').style.display=vacio?'none':'block';
  if(vacio) return;
  const cal=B.calificadores, c=conteos(), l=lista(), otros=cal.filter(n=>n!==FINCA);
  $('bancoMet').innerHTML=[['Rosas en el banco',B.items.length,''],['Inmaduras / Óptimas / Sobreabiertas',c.join(' / '),'bien'],
    ['Personas que han calificado',otros.length,'aviso'],['Casos difíciles',l.filter(x=>x.dificil).length,'mal']]
    .map(([n,v,cls])=>`<div class="met"><b class="${cls}">${v}</b><small>${n}</small></div>`).join('');
  const lineas=otros.map(n=>{ const r=coincideFinca(n), k=kappa(FINCA,n);
    return r.n?`<b>${esc(n)}</b>: coincide con la finca en ${r.ok} de ${r.n} rosas (${Math.round(r.ok/r.n*100)} %)${k?` · κ = ${k.k.toFixed(2)}`:''}`:null; }).filter(Boolean);
  $('bancoAcuerdo').innerHTML = lineas.length ? `<b>Coincidencia con el experto de la finca</b><br>${lineas.join('<br>')}` :
    'Las etiquetas del <b>experto de la finca</b> ya están cargadas. Cuando alguien califique, aquí verás cuánto coincide con la empresa.';
  $('bancoCal').innerHTML = cal.map(n=>{ const pf=B.perfiles[n]||{}, pend=pendientes(n).length;
    return `<span class="chip"><b>${esc(n)}</b> · ${esc(pf.rol||'')}${pf.experiencia!=null?` · ${pf.experiencia} años`:''} · ${B.items.length-pend}/${B.items.length}`+
      (n!==FINCA&&pend?` <button class="mini" data-calificador="${esc(n)}">Continuar</button>`:'')+`</span>`; }).join('');
  $('bancoGrid').innerHTML=B.items.map(it=>{ const co=consenso(it);
    const etiq=cal.map(n=>{ const v=(B.cal[it.id]||{})[n]; return v?`<i class="et-${v}" title="${esc(n)}">${CORTO[v]}</i>`:''; }).join('');
    const estado=!co?'<em class="pend">Sin etiqueta</em>':co.dificil?`<em class="dif">Difícil · ${NOMBRE[co.label]}</em>`:`<em class="ok">${NOMBRE[co.label]}</em>`;
    return `<div class="rosa"><img src="${img(it)}" loading="lazy"><div class="et">${etiq}</div><div class="rinfo">${it.foto?'Foto '+it.foto:esc(it.origen)}<br>${estado}</div></div>`; }).join('');
}
function calificarComo(n){ iniciarCalificacion(n, null, null, $('cantCalif').value); }
function calificarDesdeCampo(){
  const c=$('nuevoCalif'), n=c.value; if(!n.trim()){ alert('Escribe el nombre de quien califica.'); c.focus(); return; }
  const rol=$('rolCalif').value, exp=$('expCalif').value; c.value=''; $('expCalif').value='';
  iniciarCalificacion(n, rol, exp, $('cantCalif').value);
}
function agregarFoto(input){
  const f=input.files&&input.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=()=>{ const im=new Image(); im.onload=()=>{
    const s=Math.min(1,400/Math.max(im.width,im.height)), cv=document.createElement('canvas');
    cv.width=Math.round(im.width*s); cv.height=Math.round(im.height*s); cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);
    const n=B.items.filter(x=>x.origen==='Foto nueva').length+1;
    B.items.push({id:'N'+String(n).padStart(2,'0')+'_'+Date.now().toString(36), img:cv.toDataURL('image/jpeg',0.8), foto:null, origen:'Foto nueva', variedad:'Por definir', vista:'Foto con celular', dif_finca:0});
    guardar(); input.value='';
    const ult=B.calificadores.filter(x=>x!==FINCA).slice(-1)[0];
    if(ult) iniciarCalificacion(ult,null,null,'todas'); else vistaResumen();
  }; im.src=r.result; };
  r.readAsDataURL(f);
}
function enviarARoseLab(){
  if(!lista().length){ alert('Primero carga o califica rosas.'); return; }
  window.ir('config'); const sel=$('escenario'); refrescarOpcion(); sel.value='banco'; sel.dispatchEvent(new Event('input',{bubbles:true}));
}
function refrescarOpcion(){ const o=$('optBanco'); if(!o) return; const n=lista().length;
  o.textContent=n?`Banco de la finca (${n} rosas reales calificadas)`:'Banco de la finca (aún vacío)'; o.disabled=!n; }
function refrescarInicio(){ const e=$('estadoBanco'); if(e) e.textContent=B.items.length?`${B.items.length} rosas en el banco`:'Banco vacío'; }
function reiniciarBanco(){ if(!confirm('¿Borrar el banco y todas las calificaciones?')) return; B=nuevoBanco(); guardar(); vistaResumen(); }
function htmlResultados(datos){
  if(!datos.length) return '';
  const filas=datos.slice(0,12).map(d=>{ const it=B.items.find(x=>x.id===d.id); if(!it) return '';
    const ok=d.cortada?d.label==='OPT':d.label!=='OPT';
    return `<div class="rosa"><img src="${img(it)}"><div class="rinfo"><b class="${ok?'bien':'mal'}">${ok?'✔':'✖'} ${d.cortada?'La cortaste':'La dejaste'}</b><br>Finca: ${NOMBRE[d.label]}${d.dificil?' · <em class="dif">difícil</em>':''}</div></div>`; }).join('');
  return `<h3>Así se veían en la finca las rosas de esta sesión</h3><div class="grid-rosas">${filas}</div>`;
}

function tablas(){
  const perfil=n=>B.perfiles[n]||{id:'?',rol:'Sin dato',experiencia:null};
  const rosas=B.items.map(it=>{
    const et=etiquetasDe(it), v={INM:0,OPT:0,PAS:0}; et.forEach(e=>{ if(v[e]!=null) v[e]++; });
    const val=v.INM+v.OPT+v.PAS, co=consenso(it), grupo=it.foto?('foto'+it.foto):it.id;
    return {rosa_id:it.id, imagen:`imagenes/${it.id}.jpg`, foto_original:it.foto??'', origen:it.origen,
      etiqueta_finca:(B.cal[it.id]||{})[FINCA]||'', votos_INM:v.INM, votos_OPT:v.OPT, votos_PAS:v.PAS,
      etiqueta_final:co?co.label:'', cortar:co?(co.label==='OPT'?1:0):'',
      acuerdo:val?+(Math.max(v.INM,v.OPT,v.PAS)/val).toFixed(2):'', caso_dificil:co?(co.dificil?1:0):'',
      particion:(hashTxt(grupo)%5===0)?'prueba':'entrenamiento'};
  });
  const calif=B.registros.filter(r=>r.cal!==FINCA).map(r=>{ const f=(B.cal[r.rosa]||{})[FINCA];
    return {rosa_id:r.rosa, calificador:perfil(r.cal).id, rol:perfil(r.cal).rol, experiencia_anios:perfil(r.cal).experiencia??'',
      etiqueta:r.etiqueta, coincide_con_finca:(f&&r.etiqueta!=='X')?(f===r.etiqueta?1:0):'', dudas:r.confianza==='baja'?'sí':'no',
      segundos:r.t_resp_s??'', fecha_hora:r.fecha?new Date(r.fecha).toLocaleString('es-CO'):''}; });
  return {rosas, calif};
}
function resumen(t){
  const otros=B.calificadores.filter(n=>n!==FINCA), c=conteos();
  return [
    {dato:'Exportado', valor:new Date().toLocaleString('es-CO')},
    {dato:'Rosas', valor:t.rosas.length},
    {dato:'Inmaduras / Óptimas / Sobreabiertas (etiqueta final)', valor:c.join(' / ')},
    {dato:'Casos difíciles', valor:t.rosas.filter(r=>r.caso_dificil===1).length},
    {dato:'Personas que calificaron (además de la finca)', valor:otros.length},
    ...otros.map(n=>{ const r=coincideFinca(n); return {dato:`Coincidencia con la finca · ${(B.perfiles[n]||{}).id} (${(B.perfiles[n]||{}).rol})`, valor:r.n?`${r.ok} de ${r.n} (${Math.round(r.ok/r.n*100)} %)`:'—'}; }),
    {dato:'', valor:''},
    {dato:'CÓMO LEER LAS TABLAS', valor:''},
    {dato:'etiqueta_finca', valor:'Etiqueta de la empresa: INM inmadura, OPT óptima (cortar), PAS sobreabierta. Vacía en los casos difíciles sin etiqueta.'},
    {dato:'etiqueta_final', valor:'Etiqueta para entrenar modelos: la de la finca; si no existe, la de quienes calificaron.'},
    {dato:'cortar', valor:'1 si la etiqueta final es OPT. Variable objetivo binaria.'},
    {dato:'acuerdo', valor:'Proporción de votos de la etiqueta más votada (1 = todos coinciden).'},
    {dato:'particion', valor:'División fija entrenamiento / prueba (80 / 20). Las rosas de una misma foto quedan siempre juntas.'},
    {dato:'calificador', valor:'Código anónimo de quien calificó (los nombres no se exportan).'}
  ];
}
function exportarExcel(){
  if(!B.items.length){ alert('El banco está vacío.'); return; }
  const t=tablas();
  descargar(crearXLSX([{nombre:'rosas',filas:t.rosas},{nombre:'calificaciones',filas:t.calif.length?t.calif:[{rosa_id:'(nadie ha calificado aún)'}]},{nombre:'resumen',filas:resumen(t)}]),
    `roselab_banco_${fechaArchivo()}.xlsx`);
}
async function exportarDataset(){
  if(!B.items.length){ alert('El banco está vacío.'); return; }
  const t=tablas();
  const leeme=`DATASET ROSE LAB · Punto de corte de rosas Freedom (Sabana Hack 2026)
rosas.csv           una fila por rosa; la columna "imagen" apunta a la foto en imagenes/
calificaciones.csv  una fila por cada calificación hecha en Rose Lab (sin nombres)
Variables objetivo: etiqueta_final (INM / OPT / PAS) o cortar (1 = óptima).
Use "particion" para separar entrenamiento y prueba: las rosas de una misma foto quedan juntas.

Ejemplo (Python):
  import pandas as pd
  df = pd.read_csv("rosas.csv")
  ent = df[(df.particion == "entrenamiento") & (df.etiqueta_final != "")]
  # cargar ent.imagen y entrenar un clasificador de imágenes (p. ej., MobileNet con transferencia)
`;
  const imagenes=await Promise.all(B.items.map(async it=>({nombre:`imagenes/${it.id}.jpg`,datos:await bytesDeURL(img(it))})));
  descargar(crearZip([{nombre:'rosas.csv',datos:'\ufeff'+aCSV(t.rosas)},{nombre:'calificaciones.csv',datos:'\ufeff'+aCSV(t.calif)},{nombre:'LEEME.txt',datos:leeme},
    ...imagenes]), `roselab_dataset_${fechaArchivo()}.zip`);
}

// Botones "Continuar" de cada calificador (se generan en vistaResumen)
$('bancoCal').addEventListener('click', e=>{ const b=e.target.closest('[data-calificador]'); if(b) calificarComo(b.dataset.calificador); });
// Fotos nuevas tomadas con el celular o subidas por el jurado
document.querySelectorAll('input.fotoRosa').forEach(inp=>inp.addEventListener('change',()=>agregarFoto(inp)));

// API que usan main.js (escenario "Banco de la finca") y los botones del HTML
export const BANCO={lista,conteos,porcentajes,refrescarOpcion,refrescarInicio,htmlResultados,irBanco,enviarAlBanco,
  calificarDesdeCampo,calificar,vistaResumen,exportarExcel,exportarDataset,reiniciarBanco,enviarARoseLab};
