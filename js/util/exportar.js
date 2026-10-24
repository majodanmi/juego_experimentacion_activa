// Exportación sin librerías externas: CSV, ZIP (sin compresión) y Excel (.xlsx)

// ---- CSV ----
export function aCSV(filas){
  if(!filas.length) return '';
  const cols=Object.keys(filas[0]);
  const v=x=> x==null?'':(typeof x==='number'?String(x):`"${String(x).replace(/"/g,'""')}"`);
  return [cols.join(','), ...filas.map(f=>cols.map(c=>v(f[c])).join(','))].join('\n');
}

// ---- ZIP mínimo (sin compresión) ----
const CRC=(()=>{ const t=new Uint32Array(256); for(let n=0;n<256;n++){ let c=n; for(let k=0;k<8;k++) c=c&1?0xEDB88320^(c>>>1):c>>>1; t[n]=c>>>0; } return t; })();
function crc32(u){ let c=0xFFFFFFFF; for(let i=0;i<u.length;i++) c=CRC[(c^u[i])&255]^(c>>>8); return (c^0xFFFFFFFF)>>>0; }
export function crearZip(archivos){   // archivos: [{nombre, datos: Uint8Array | string}]
  const enc=new TextEncoder(), partes=[], central=[]; let off=0;
  const ahora=new Date(), dt=((ahora.getHours()<<11)|(ahora.getMinutes()<<5)|(ahora.getSeconds()>>1)), dd=(((ahora.getFullYear()-1980)<<9)|((ahora.getMonth()+1)<<5)|ahora.getDate());
  for(const a of archivos){
    const nom=enc.encode(a.nombre), dat=typeof a.datos==='string'?enc.encode(a.datos):a.datos, crc=crc32(dat);
    const h=new DataView(new ArrayBuffer(30));
    h.setUint32(0,0x04034b50,true); h.setUint16(4,20,true); h.setUint16(6,0x0800,true); h.setUint16(8,0,true);
    h.setUint16(10,dt,true); h.setUint16(12,dd,true); h.setUint32(14,crc,true); h.setUint32(18,dat.length,true); h.setUint32(22,dat.length,true);
    h.setUint16(26,nom.length,true); h.setUint16(28,0,true);
    partes.push(new Uint8Array(h.buffer),nom,dat);
    const c=new DataView(new ArrayBuffer(46));
    c.setUint32(0,0x02014b50,true); c.setUint16(4,20,true); c.setUint16(6,20,true); c.setUint16(8,0x0800,true); c.setUint16(10,0,true);
    c.setUint16(12,dt,true); c.setUint16(14,dd,true); c.setUint32(16,crc,true); c.setUint32(20,dat.length,true); c.setUint32(24,dat.length,true);
    c.setUint16(28,nom.length,true); c.setUint32(42,off,true);
    central.push(new Uint8Array(c.buffer),nom);
    off+=30+nom.length+dat.length;
  }
  const tamC=central.reduce((a,b)=>a+b.length,0), fin=new DataView(new ArrayBuffer(22));
  fin.setUint32(0,0x06054b50,true); fin.setUint16(8,archivos.length,true); fin.setUint16(10,archivos.length,true);
  fin.setUint32(12,tamC,true); fin.setUint32(16,off,true);
  return new Blob([...partes,...central,new Uint8Array(fin.buffer)]);
}
// ---- Excel (.xlsx) sin librerías externas ----
const xmlEsc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g,'');
function colLetra(i){ let s=''; i++; while(i){ const m=(i-1)%26; s=String.fromCharCode(65+m)+s; i=(i-m-1)/26; } return s; }
function hojaXML(filas){
  const cols=filas.length?Object.keys(filas[0]):['sin_datos'];
  const celda=(v,r,c,est)=>{ const ref=colLetra(c)+r;
    if(v==null||v==='') return '';
    if(typeof v==='number'&&isFinite(v)) return `<c r="${ref}"${est?` s="${est}"`:''}><v>${v}</v></c>`;
    return `<c r="${ref}" t="inlineStr"${est?` s="${est}"`:''}><is><t xml:space="preserve">${xmlEsc(v)}</t></is></c>`; };
  let x=`<row r="1">${cols.map((c,i)=>celda(c,1,i,1)).join('')}</row>`;
  filas.forEach((f,j)=>{ x+=`<row r="${j+2}">${cols.map((c,i)=>celda(f[c],j+2,i,0)).join('')}</row>`; });
  const anchos=cols.map(c=>Math.min(45,Math.max(10,c.length+2,...filas.slice(0,50).map(f=>String(f[c]??'').length+2))));
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><cols>${anchos.map((w,i)=>`<col min="${i+1}" max="${i+1}" width="${w}" customWidth="1"/>`).join('')}</cols><sheetData>${x}</sheetData>${filas.length?`<autoFilter ref="A1:${colLetra(cols.length-1)}${filas.length+1}"/>`:''}</worksheet>`;
}
export function crearXLSX(hojas){   // hojas: [{nombre, filas}]
  const ns='http://schemas.openxmlformats.org';
  const arch=[
    {nombre:'[Content_Types].xml', datos:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="${ns}/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${hojas.map((h,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>`},
    {nombre:'_rels/.rels', datos:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${ns}/package/2006/relationships"><Relationship Id="rId1" Type="${ns}/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`},
    {nombre:'xl/workbook.xml', datos:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="${ns}/spreadsheetml/2006/main" xmlns:r="${ns}/officeDocument/2006/relationships"><sheets>${hojas.map((h,i)=>`<sheet name="${xmlEsc(h.nombre)}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('')}</sheets>${hojas.map((h,i)=>h.filas.length?`<definedNames><definedName name="_xlnm._FilterDatabase" localSheetId="${i}" hidden="1">'${xmlEsc(h.nombre)}'!$A$1:$${colLetra(Object.keys(h.filas[0]).length-1)}$${h.filas.length+1}</definedName></definedNames>`:'').join('').replace(/<\/definedNames><definedNames>/g,'')}</workbook>`},
    {nombre:'xl/_rels/workbook.xml.rels', datos:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${ns}/package/2006/relationships">${hojas.map((h,i)=>`<Relationship Id="rId${i+1}" Type="${ns}/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('')}<Relationship Id="rId${hojas.length+1}" Type="${ns}/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`},
    {nombre:'xl/styles.xml', datos:`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="${ns}/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF1F4D2B"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`},
    ...hojas.map((h,i)=>({nombre:`xl/worksheets/sheet${i+1}.xml`, datos:hojaXML(h.filas)}))
  ];
  return crearZip(arch);
}
export function descargar(blob,nombre){ const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=nombre; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),4000); }

export const fechaArchivo=()=>{ const d=new Date(), p=x=>String(x).padStart(2,'0'); return `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}`; };

// Bytes de una imagen, sea un archivo del sitio o una data URL (fotos agregadas con el celular)
export async function bytesDeURL(url){ return new Uint8Array(await (await fetch(url)).arrayBuffer()); }
