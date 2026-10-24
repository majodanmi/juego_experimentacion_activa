const $=id=>document.getElementById(id);
const f1=x=>(+x).toFixed(1).replace('.',','), f0=x=>Math.round(x).toLocaleString('es-CO'), f3=x=>x.toFixed(3).replace('.',',');
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;}}
let rnd=mulberry32(7);
const gauss=()=>{ let u=0,v=0; while(!u)u=rnd(); while(!v)v=rnd(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v); };
function Phi(x){ const t=1/(1+0.2316419*Math.abs(x)), d=0.3989423*Math.exp(-x*x/2); const p=d*t*(0.3193815+t*(-0.3565638+t*(1.781478+t*(-1.821256+t*1.330274)))); return x>0?1-p:p; }

// ---------- Supuestos (minutos) ----------
const BONO_SEG=8;               // revisar una cama pendiente de seguridad vale como 8 rosas
const VENTANA=3, PESO=1.5, MIN_CAMA=6, MIN_TALLO=16/60, LAT=0.5, ENTRADA=2, DIAS_SIM=21;
const DIAS=['Hoy','Mañana','En 2 días','En 3 días','En 4 días','En 5 días','En 6 días'];
const capMin=()=>+$('cap').value*60, sigma=()=>+$('sigma').value, cambioNave=()=>+$('cnave').value;

// ---------- Finca simulada ----------
let finca=[], semilla=7, cachePred='';
function generarFinca(sem){
  semilla=sem; cachePred=''; rnd=mulberry32(sem); finca=[];
  [[3,[38,39,40,41,42,43]],[4,[51,52,53,54,55,56]]].forEach(([nave,camas],ni)=>camas.forEach((cama,ci)=>{
    const pico=Math.floor(rnd()*12)-1, disp=1+rnd()*2.5, n=70+Math.floor(rnd()*110), rosas=[];
    for(let i=0;i<n;i++) rosas.push({ini:Math.round(pico+gauss()*disp), ruido:gauss()});
    finca.push({cama,nave,ni,ci,rosas});
  }));
}
// ---------- Predicción (con ajuste por cama opcional) ----------
function prepararPred(){
  const sig=sigma(), aj=$('ajuste').checked, clave=sig+'|'+aj+'|'+semilla; if(clave===cachePred) return; cachePred=clave;
  finca.forEach(c=>{
    const mus=c.rosas.map(r=>r.ini+r.ruido*sig), m=mus.reduce((a,b)=>a+b,0)/mus.length;
    const v=Math.max(mus.reduce((a,b)=>a+(b-m)**2,0)/(mus.length-1)-sig*sig,0.09), vp=1/(1/(sig*sig)+1/v);
    c.m=m; c.v=v;
    c.rosas.forEach((r,i)=>{ r.mu=mus[i]; if(aj){ r.mp=vp*(mus[i]/(sig*sig)+m/v); r.sp=Math.sqrt(vp+1/12); } else { r.mp=mus[i]; r.sp=sig; } });
  });
}
const pOptima=(r,d,hoy=0)=>Phi((d+0.5-(r.mp-hoy))/r.sp)-Phi((d-2.5-(r.mp-hoy))/r.sp);
const pUltimo=(r,d,hoy=0)=>Phi((d+0.5-(r.mp-hoy)-2)/r.sp)-Phi((d-0.5-(r.mp-hoy)-2)/r.sp);
const optimaReal=(r,d)=>d>=r.ini&&d<r.ini+VENTANA;

// Valor esperado de cada cama para el día d (contando desde 'hoy'), sin las rosas ya cortadas
function prever(d,cortadas,hoy=0){
  prepararPred();
  return finca.map(c=>{
    const vivas=c.rosas.filter((r,i)=>!(cortadas&&cortadas[c.cama].has(i)));
    const E=k=>vivas.reduce((a,r)=>a+pOptima(r,d+k,hoy),0), ult=vivas.reduce((a,r)=>a+pUltimo(r,d,hoy),0), e0=E(0);
    return {c, cama:c.cama, ni:c.ni, ci:c.ci, e0, e1:E(1), e2:E(2), ult, valor:e0+PESO*ult, servicio:MIN_CAMA+e0*MIN_TALLO};
  });
}
// ---------- Tiempos de caminar ----------
const tEntrada=x=>ENTRADA+(x.ni===1?cambioNave():0)+LAT*x.ci;
const tViaje=(a,b)=>a.ni===b.ni?LAT*Math.abs(a.ci-b.ci):LAT*a.ci+cambioNave()+LAT*b.ci;

// ---------- Ruta simple: urgentes primero (agrupadas por nave) y luego barrido; elige camas sin contar el caminar ----------
function rutaSimple(p,cap,quiere){
  let libre=cap; const el=[];
  p.slice().sort((a,b)=>b.valor-a.valor).forEach(x=>{ if(quiere(x)&&libre>=x.servicio){ libre-=x.servicio; el.push(x); } });
  const urg=el.filter(x=>x.ult>=1), resto=el.filter(x=>x.ult<1), pu={}, pn={};
  urg.forEach(x=>pu[x.ni]=(pu[x.ni]||0)+x.ult); resto.forEach(x=>pn[x.ni]=(pn[x.ni]||0)+x.valor);
  urg.sort((a,b)=>a.ni!==b.ni?pu[b.ni]-pu[a.ni]:b.ult-a.ult);
  resto.sort((a,b)=>a.ni!==b.ni?pn[b.ni]-pn[a.ni]:a.ci-b.ci);
  return [...urg,...resto];
}
// ---------- Ruta óptima: problema de orientación resuelto exacto con programación dinámica (Held-Karp) ----------
function rutaOptima(p,cap,quiere,obligatoria){
  const C=p.filter(quiere), n=C.length; if(!n) return [];
  const val=C.map(x=>x.valor+(obligatoria&&obligatoria(x)?BONO_SEG:0));
  const N=1<<n, INF=1e9, best=new Float64Array(N*n).fill(INF), prev=new Int8Array(N*n).fill(-1);
  for(let i=0;i<n;i++){ const t=tEntrada(C[i])+C[i].servicio; if(t<=cap) best[(1<<i)*n+i]=t; }
  for(let m=1;m<N;m++) for(let i=0;i<n;i++){ const b=best[m*n+i]; if(b>=INF) continue;
    for(let j=0;j<n;j++){ if(m&(1<<j)) continue; const nb=b+tViaje(C[i],C[j])+C[j].servicio; if(nb>cap) continue;
      const k=(m|(1<<j))*n+j; if(nb<best[k]){ best[k]=nb; prev[k]=i; } } }
  let mejor=-1, bv=-1, bt=INF;
  for(let m=1;m<N;m++){ let v=0; for(let i=0;i<n;i++) if(m&(1<<i)) v+=val[i];
    for(let i=0;i<n;i++){ const t=best[m*n+i]; if(t<INF&&(v>bv+1e-9||(Math.abs(v-bv)<1e-9&&t<bt))){ bv=v; bt=t; mejor=m*n+i; } } }
  if(mejor<0) return [];
  const orden=[]; let k=mejor;
  while(k>=0){ const m=Math.floor(k/n), i=k%n; orden.unshift(C[i]); const pi=prev[k]; k=pi<0?-1:(m&~(1<<i))*n+pi; }
  return orden;
}
// ---------- Recorrer una ruta (esperado o real) ----------
function recorrer(orden,cap,cortaFn){   // cortaFn(x, maxTallos) -> tallos cortados
  let t=0, caminar=0, cortes=0, ant=null; const visitadas=[];
  for(const x of orden){
    const tv=ant?tViaje(ant,x):tEntrada(x);
    if(t+tv+MIN_CAMA>cap) break;
    t+=tv; caminar+=tv;
    const n=cortaFn(x,Math.max(0,Math.floor((cap-t-MIN_CAMA)/MIN_TALLO)));
    t+=MIN_CAMA+n*MIN_TALLO; cortes+=n; visitadas.push(x); ant=x;
  }
  return {t,caminar,cortes,visitadas};
}

// ---------- Vista del plan ----------
let diaSel=0, rutaVista='opt';
function pintar(){
  $('oCap').textContent=f1($('cap').value).replace(',0','')+' h'; $('oSig').textContent='±'+f1(sigma())+' días'; $('oCN').textContent=cambioNave()+' min';
  $('dias').innerHTML=DIAS.map((d,i)=>`<button class="sec ${i===diaSel?'on':''}" data-d="${i}">${d}</button>`).join('');
  document.querySelectorAll('#dias button').forEach(b=>b.onclick=()=>{ diaSel=+b.dataset.d; pintar(); });
  const cap=capMin(), p=prever(diaSel), quiere=x=>x.e0>=1;
  const opt=rutaOptima(p,cap,quiere), sim=rutaSimple(p,cap,quiere);
  const ro=recorrer(opt,cap,(x,max)=>Math.min(Math.round(x.e0),max)), rs=recorrer(sim,cap,(x,max)=>Math.min(Math.round(x.e0),max));
  const riesgo=r=>r.visitadas.reduce((a,x)=>a+x.ult,0);
  const conTrabajo=p.filter(quiere), necesario=conTrabajo.reduce((a,x)=>a+x.servicio,0);
  $('alcance').innerHTML=`Trabajo de cortar estimado: <b>${f1(necesario/60)} h</b> en ${conTrabajo.length} camas · Horas del equipo: <b>${f1(cap/60)} h</b> · `+
    (necesario<=cap?'<span class="ok">alcanza para todas (sin contar el caminar)</span>':'<span class="urg">no alcanza: hay que elegir camas</span>');
  const ruta=rutaVista==='opt'?ro.visitadas:rs.visitadas, pos={}; ruta.forEach((x,i)=>pos[x.cama]=i+1);
  $('tabla').innerHTML='<tr><th>Cama</th><th>Rosas listas</th><th>Próximos días</th><th>En su último día</th><th>Visita</th></tr>'+
    p.slice().sort((a,b)=>(pos[a.cama]||99)-(pos[b.cama]||99)||b.valor-a.valor).map(x=>{ const mx=Math.max(1,...p.map(y=>Math.max(y.e0,y.e1,y.e2)));
      return `<tr><td><b>Cama ${x.cama}</b><br><span class="nota">Nave ${x.c.nave}</span></td><td><span class="num">${f0(x.e0)}</span></td>
      <td><div class="mini"><i style="height:${Math.max(2,x.e0/mx*30)}px"></i><i class="m" style="height:${Math.max(2,x.e1/mx*30)}px"></i><i class="p" style="height:${Math.max(2,x.e2/mx*30)}px"></i></div></td>
      <td>${x.ult>=1?`<span class="urg">${f0(x.ult)} rosas</span>`:'<span class="ok">ninguna</span>'}</td>
      <td>${pos[x.cama]?`<span class="vis">${pos[x.cama]}</span>`:(x.e0>=1?'<span class="nota">no alcanza</span>':'<span class="nota">sin trabajo</span>')}</td></tr>`; }).join('');
  pintarMapa(p,ruta);
  const caja=(tit,r,gana)=>`<div class="${gana?'gana':''}"><h4>${tit}</h4><p>Caminando: <b>${f0(r.caminar)} min</b></p><p>Rosas que alcanza a cortar: <b>${f0(r.cortes)}</b></p><p>Rosas en riesgo atendidas: <b>${f0(riesgo(r))}</b></p></div>`;
  $('compRutas').innerHTML=caja('Ruta óptima',ro,true)+caja('Ruta simple',rs,false);
  pintarEjemplo();
}
function pintarMapa(p,ruta){
  const W=460,H=310,an=22,gap=14, pos={};
  let s=`<svg viewBox="0 0 ${W} ${H}" class="mapa">`;
  [0,1].forEach(ni=>{ const x0=26+ni*226; s+=`<text x="${x0+95}" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#005333">Nave ${ni?4:3}</text><rect x="${x0-6}" y="32" width="202" height="240" rx="14" fill="#fff" stroke="#d9e6dd"/>`; });
  p.forEach(x=>{ const cx=26+x.ni*226+x.ci*(an+gap)+4; pos[x.cama]=[cx+an/2,150];
    const col=x.e0>=1?`rgba(0,139,86,${0.2+0.8*Math.min(1,x.e0/60)})`:'#e3ece6';
    s+=`<rect x="${cx}" y="44" width="${an}" height="210" rx="6" fill="${col}" stroke="#a9cbb3"/><text x="${cx+an/2}" y="268" text-anchor="middle" font-size="10" fill="#3d5a4b">${x.cama}</text>`;
    if(x.ult>=1) s+=`<circle cx="${cx+an/2}" cy="244" r="5" fill="#F04432"/>`; });
  const E=[12,290]; s+=`<rect x="2" y="280" width="44" height="22" rx="6" fill="#005333"/><text x="24" y="295" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Entrada</text>`;
  if(ruta.length){ const pts=[E,...ruta.map(x=>pos[x.cama])]; s+=`<polyline points="${pts.map(q=>q.join(',')).join(' ')}" fill="none" stroke="#F04432" stroke-width="2.5" stroke-dasharray="6 5"/>`;
    ruta.forEach((x,i)=>{ const [cx,cy]=pos[x.cama]; s+=`<circle cx="${cx}" cy="${cy}" r="12" fill="#F04432" stroke="#fff" stroke-width="2"/><text x="${cx}" y="${cy+4.5}" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">${i+1}</text>`; }); }
  $('mapa').innerHTML=s+'</svg>';
}
$('rOpt').onclick=()=>{ rutaVista='opt'; $('rOpt').classList.add('on'); $('rSim').classList.remove('on'); pintar(); };
$('rSim').onclick=()=>{ rutaVista='sim'; $('rSim').classList.add('on'); $('rOpt').classList.remove('on'); pintar(); };

// ---------- Simulación de 21 días ----------
function simular(estr){
  const cap=capMin(), seg=$('seguridad').checked, cortadas={}, ultima={}; finca.forEach(c=>{ cortadas[c.cama]=new Set(); ultima[c.cama]=-1; });
  let cortes=0, perdidas=0, caminar=0, horas=0, cursor=0, diasCortos=0;
  for(let dia=0; dia<DIAS_SIM; dia++){
    let orden;
    if(estr==='fijo'){ orden=[]; for(let k=0;k<finca.length;k++){ const c=finca[(cursor+k)%finca.length]; orden.push({c,cama:c.cama,ni:c.ni,ci:c.ci}); } }
    else { const p=prever(0,cortadas,dia), quiere=x=>x.e0>=0.5||(seg&&dia-ultima[x.cama]>=2);
      if(p.filter(quiere).reduce((a,x)=>a+x.servicio,0)>cap) diasCortos++;
      orden=estr==='opt'?rutaOptima(p,cap,quiere,x=>seg&&dia-ultima[x.cama]>=2):rutaSimple(p,cap,quiere); }
    const r=recorrer(orden,cap,(x,max)=>{ const listas=x.c.rosas.map((q,i)=>i).filter(i=>!cortadas[x.cama].has(i)&&optimaReal(x.c.rosas[i],dia)); const n=Math.min(listas.length,max); listas.slice(0,n).forEach(i=>cortadas[x.cama].add(i)); return n; });
    r.visitadas.forEach(x=>ultima[x.cama]=dia); if(estr==='fijo') cursor=(cursor+r.visitadas.length)%finca.length;
    cortes+=r.cortes; caminar+=r.caminar; horas+=r.t/60;
    finca.forEach(c=>c.rosas.forEach((q,i)=>{ if(!cortadas[c.cama].has(i)&&q.ini+VENTANA-1===dia) perdidas++; }));
  }
  return {cortes,perdidas,caminar,horas,tph:horas?cortes/horas:0,diasCortos};
}
function comparar(){
  const R={fijo:simular('fijo'),sim:simular('sim'),opt:simular('opt')};
  const col=(k,tit,desc)=>{ const r=R[k]; return `<div class="${k==='opt'?'gana':''}"><h4>${tit}</h4><p class="desc">${desc}</p>
    <div class="fila"><span>Tallos cortados</span><b>${f0(r.cortes)}</b></div><div class="fila"><span>Rosas perdidas</span><b>${f0(r.perdidas)}</b></div>
    <div class="fila"><span>Tallos por hora</span><b>${f0(r.tph)}</b></div><div class="fila"><span>Horas caminando</span><b>${f1(r.caminar/60)}</b></div></div>`; };
  const pct=(a,b)=>b?Math.round((a-b)/b*100):0, o=R.opt, f=R.fijo, s=R.sim;
  $('resSim').innerHTML=`<div class="estr">${col('fijo','Orden fijo','Cama tras cama, retomando al día siguiente donde quedó.')}${col('sim','Plan simple','Urgentes primero y luego barrido por nave.')}${col('opt','Plan con ruta óptima','La mejor combinación de camas y orden cada día.')}</div>
    <div class="conclusion">Frente al orden fijo, la ruta óptima corta <b>${pct(o.cortes,f.cortes)>=0?'+':''}${pct(o.cortes,f.cortes)} %</b> tallos, pierde <b>${pct(o.perdidas,f.perdidas)} %</b> rosas por sobreapertura y camina <b>${f1((f.caminar-o.caminar)/60)} h menos</b> en tres semanas. Frente al plan simple: <b>${pct(o.perdidas,s.perdidas)} %</b> de rosas perdidas y <b>${f1((s.caminar-o.caminar)/60)} h</b> menos caminando.
    ${o.diasCortos?`<br>En <b>${o.diasCortos} de 21 días</b> el tiempo no alcanzó para todas las camas con trabajo: ahí es donde el plan hace más diferencia.`:'<br>Con estas horas, el tiempo alcanzó todos los días: reduce las horas del equipo para ver qué pasa cuando no da abasto.'}</div>
    <p class="nota">Finca simulada con supuestos ilustrativos: muestra la lógica, no promete resultados. En la finca real se compararían camas con plan y sin plan.</p>`;
}

// ---------- Verificación: ejemplo, calibración y CSV ----------
let camaEj=null;
function pintarEjemplo(){
  prepararPred(); const d=diaSel; if(camaEj==null) camaEj=finca[0].cama;
  $('selCama').innerHTML=finca.map(c=>`<option value="${c.cama}" ${c.cama===camaEj?'selected':''}>Cama ${c.cama}</option>`).join('');
  $('ejInfo').textContent=`${DIAS[d]} · σ = ${f1(sigma())} días · ajuste por cama ${$('ajuste').checked?'activado':'desactivado'}`;
  const c=finca.find(x=>x.cama===camaEj), F=c.rosas.map((r,i)=>({i,r,po:pOptima(r,d),pu:pUltimo(r,d)})).sort((a,b)=>a.r.mp-b.r.mp);
  const muestra=[...new Set([0,1,2,3,4,5,6].map(k=>Math.round(k*(F.length-1)/6)))].map(k=>F[k]);
  $('ejTabla').innerHTML='<tr><th class="sin-mayus">Rosa</th><th class="sin-mayus">μ\' · σ\'</th><th class="sin-mayus">P(óptima)</th><th class="sin-mayus">P(último)</th><th class="sin-mayus">Real</th></tr>'+
    muestra.map(x=>`<tr><td>#${x.i+1}</td><td>${f1(x.r.mp)} · ${f3(x.r.sp)}</td><td><b>${f3(x.po)}</b></td><td>${f3(x.pu)}</td><td>${optimaReal(x.r,d)?'<span class="ok">óptima</span>':'<span class="nota">no</span>'}</td></tr>`).join('');
  const E=F.reduce((a,x)=>a+x.po,0), U=F.reduce((a,x)=>a+x.pu,0), rE=c.rosas.filter(r=>optimaReal(r,d)).length;
  $('ejSuma').innerHTML=`<p>Rosas en la cama: <b>${c.rosas.length}</b> · patrón de la cama: m = día ${f1(c.m)}, v = ${f3(c.v)}</p>
    <p>Σ P(óptima) = <b class="num-grande">${f1(E)}</b> rosas listas esperadas</p><p>Σ P(último día) = <b>${f1(U)}</b> en riesgo</p>
    <p>Valor = ${f1(E)} + 1,5 × ${f1(U)} = <b>${f1(E+PESO*U)}</b></p><p>Tiempo = 6 + ${f1(E)} × 16/60 = <b>${f1(MIN_CAMA+E*MIN_TALLO)} min</b></p>
    <p class="nota">Lo que realmente pasó: <b>${rE}</b> rosas óptimas.</p>`;
}
$('selCama').onchange=e=>{ camaEj=+e.target.value; pintarEjemplo(); };
function calibrar(){
  prepararPred(); let sE=0,sR=0,err=0,n=0; const pd=[];
  for(let d=0;d<7;d++){ let e=0,r=0; finca.forEach(c=>{ const ec=c.rosas.reduce((a,x)=>a+pOptima(x,d),0), rc=c.rosas.filter(x=>optimaReal(x,d)).length; e+=ec; r+=rc; err+=Math.abs(ec-rc); n++; }); pd.push([d,e,r]); sE+=e; sR+=r; }
  const mx=Math.max(...pd.map(x=>Math.max(x[1],x[2])));
  $('resCal').innerHTML=`<div class="formula">Esperadas: <b>${f0(sE)}</b> · Reales: <b>${f0(sR)}</b> · Diferencia: <b>${f1((sE-sR)/sR*100)} %</b> · Error promedio por cama y día: <b>${f1(err/n)} rosas</b></div>
    <div class="caja">${pd.map(([d,e,r])=>`<div class="bar2"><span>${DIAS[d]}</span><div class="t"><i style="width:${e/mx*100}%;background:#008B56"></i></div><b>${f0(e)}</b></div><div class="bar2 mb-8"><span class="nota">real</span><div class="t"><i style="width:${r/mx*100}%;background:#b9cfc1"></i></div><b>${r}</b></div>`).join('')}</div>`;
}
$('btnCal').onclick=calibrar;
$('btnCSV').onclick=()=>{
  prepararPred(); const d=diaSel, sig=sigma(), dec=(x,n)=>x.toFixed(n).replace('.',','), filas=[['nave','cama','rosa','inicio_real','mu','sigma','mu_ajustado','sigma_ajustado','dia','p_optima','p_ultimo_dia','optima_real']];
  finca.forEach(c=>c.rosas.forEach((r,i)=>filas.push([c.nave,c.cama,i+1,r.ini,dec(r.mu,4),dec(sig,1),dec(r.mp,4),dec(r.sp,4),d,dec(pOptima(r,d),5),dec(pUltimo(r,d),5),optimaReal(r,d)?1:0])));
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob(['\ufeff'+filas.map(f=>f.join(';')).join('\n')],{type:'text/csv'})); a.download='finca_simulada_plan_de_corte.csv'; a.click();
};

// ---------- Eventos ----------
['cap','sigma','cnave','ajuste','seguridad'].forEach(id=>$(id).addEventListener('input',()=>{ pintar(); if($('resSim').innerHTML) comparar(); if($('resCal').innerHTML) calibrar(); }));
$('btnNueva').onclick=()=>{ generarFinca(Math.floor(Math.random()*1e6)); camaEj=null; pintar(); if($('resSim').innerHTML) comparar(); if($('resCal').innerHTML) calibrar(); };
$('btnSim').onclick=comparar;
generarFinca(semilla); pintar();
window.__plan={simular,generarFinca,rutaOptima,prever,recorrer,tViaje,tEntrada,calibrar};
