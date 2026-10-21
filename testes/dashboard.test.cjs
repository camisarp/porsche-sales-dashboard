const fs=require('fs'),vm=require('vm'),assert=require('assert');
const els={};function el(){return {value:'',checked:false,textContent:'',innerHTML:'',style:{},parentElement:{querySelector:()=>({textContent:''})},options:[{},{}],children:[],append(...a){this.children.push(...a)},appendChild(a){this.children.push(a)},replaceChildren(){this.children=[]}}}const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');for(const m of html.matchAll(/id="([^"]+)"/g))els[m[1]]=el();els.modelMetric.value='count';els.currency.value='BRL';const document={getElementById:id=>els[id],createElement:()=>el(),querySelectorAll:()=>[]};vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],{document,console,Intl,window:{setTimeout:f=>f()}});
assert.equal(els.salesKpi.textContent,93);assert(els.statusScope.textContent.startsWith('100 '));assert(els.yearChart.innerHTML.includes('<svg'));assert(els.stateChart.innerHTML.includes('<svg'));
for(const id of ['modelFilter','yearFilter','cityFilter','payFilter']){els[id].value={modelFilter:'Macan Electric',yearFilter:'2024',cityFilter:'Atlanta',payFilter:'Wire Transfer'}[id];els[id].onchange();assert(+els.salesKpi.textContent>0);els.clearFilters.onclick()}
els.modelMetric.value='value';els.modelMetric.onchange();assert(els.modelChart.children.length>1);
els.cityFilter.value='Atlanta';els.modelFilter.value='718 Cayman';els.cityFilter.onchange();assert.equal(els.salesKpi.textContent,0);assert(els.yearChart.innerHTML.includes('Nenhum'));els.clearFilters.onclick();assert.equal(els.salesKpi.textContent,93);
els.start.value='2024-01-01';els.end.value='2027-12-31';els.start.onchange();assert.equal(els.salesKpi.textContent,70);els.clearFilters.onclick();els.delivered.checked=true;els.delivered.onchange();assert.equal(els.salesKpi.textContent,41);assert(els.statusScope.textContent.startsWith('41 '));els.cityFilter.value='Atlanta';els.cityFilter.onchange();assert(els.revenueKpi.textContent.includes('2.180.087,20'));els.currency.value='USD';els.currency.onchange();assert(els.revenueKpi.textContent.includes('434.800,00'));console.log('Verificado: câmbio BRL e retorno USD; totais, filtros individuais, combinação vazia, período, entregues, limpar e alternância de métrica.');

els.clearFilters.onclick();
const rawRows=JSON.parse(html.match(/var rawRows = (\[[^\n]+\]);/)[1]);
const cities=[...new Set(rawRows.map(r=>r[3]))];let tiedCities=0;
for(const city of ['',...cities]){
  els.clearFilters.onclick();els.cityFilter.value=city;els.cityFilter.onchange();
  const counts={};for(const row of rawRows.filter(r=>r[7]!=='Cancelled'&&(!city||r[3]===city)))counts[row[2]]=(counts[row[2]]||0)+1;
  const max=Math.max(...Object.values(counts)),years=Object.keys(counts).filter(y=>counts[y]===max).sort((a,b)=>Number(a)-Number(b));
  assert.equal(els.yearKpi.textContent,years.length?years.join(' / '):'—');
  if(years.length>1){tiedCities++;assert(els.yearShareKpi.textContent.includes('Empate'));assert(els.yearShareKpi.textContent.includes('cada'))}
}
els.clearFilters.onclick();els.yearFilter.value='2024';els.yearFilter.onchange();assert.equal(els.yearKpi.textContent,'2024');
els.cityFilter.value='Atlanta';els.modelFilter.value='718 Cayman';els.cityFilter.onchange();assert.equal(els.yearKpi.textContent,'—');assert.equal(els.yearShareKpi.textContent,'Sem dados');
assert(tiedCities>0);console.log('Verificado: anos-modelo líderes em todas as cidades, empates, filtro de ano e seleção vazia; cidades com empate: '+tiedCities);
