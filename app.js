const categories = [
  {id:"chew", title:"Жевательный табак", icon:"◉", subtitle:"5 брендов"},
  {id:"aroma", title:"Аромамиксы", icon:"♨", subtitle:"5 брендов"},
  {id:"pods", title:"POD-системы", icon:"▯", subtitle:"3 бренда"}
];
const products = [
  ["Corvus","chew"],["STELS","chew"],["KASTA","chew"],["Odens","chew"],["ICEBERG","chew"],
  ["VLIQ","aroma"],["DUALL","aroma"],["МОНАШКА","aroma"],["BRYZGI","aroma"],["CHAKRA","aroma"],
  ["VAPORESSO","pods"],["GEEKVAPE","pods"],["SMOANT","pods"]
];
const labels={chew:"Жевательный табак",aroma:"Аромамиксы",pods:"POD-системы"};
const grid=document.querySelector("#categoryGrid"), sections=document.querySelector("#sections"), search=document.querySelector("#search");
const sheet=document.querySelector("#sheet"), sheetContent=document.querySelector("#sheetContent");
function productCard([name,type]){
  const shape=type==="chew"?"tin":type==="aroma"?"bottle":"pod";
  return `<article class="product" data-name="${name.toLowerCase()}" data-type="${type}">
    <span class="badge">18+</span><div class="visual"><div class="${shape}">${name}</div></div>
    <h3>${name}</h3><p>${labels[type]}</p><span class="stock">⌖ Наличие уточняйте в магазине</span>
    <button class="detail" data-product="${name}" data-type="${type}">${type==="pods"?"Подробнее":"Посмотреть ассортимент"}</button>
  </article>`;
}
function render(filter=""){
  const q=filter.trim().toLowerCase();
  sections.innerHTML="";
  categories.forEach(c=>{
    const list=products.filter(p=>p[1]===c.id && p[0].toLowerCase().includes(q));
    if(!list.length)return;
    sections.insertAdjacentHTML("beforeend",`<section class="section" id="${c.id}">
      <div class="section-head"><h2>${c.title}</h2><button data-scroll="${c.id}">Все →</button></div>
      <div class="products">${list.map(productCard).join("")}</div></section>`);
  });
  if(!sections.innerHTML) sections.innerHTML='<div class="empty">Ничего не найдено</div>';
  bindDetails();
}
grid.innerHTML=categories.map(c=>`<button class="cat" data-target="${c.id}"><span class="emoji">${c.icon}</span><b>${c.title}</b><small>${c.subtitle}</small><i>→</i></button>`).join("");
function scrollToId(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"})}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-target]");if(b)scrollToId(b.dataset.target)});
search.addEventListener("input",()=>render(search.value));
document.querySelector("#searchBtn").addEventListener("click",()=>{document.querySelector("#searchWrap").scrollIntoView({behavior:"smooth"});search.focus()});
document.querySelector("#catalogBtn").addEventListener("click",()=>scrollToId("categoryGrid"));
function bindDetails(){
  document.querySelectorAll(".detail").forEach(btn=>btn.addEventListener("click",()=>{
    const name=btn.dataset.product, type=btn.dataset.type;
    sheetContent.innerHTML=`<h2>${name}</h2><p>${labels[type]}</p><p>Карточка бренда в витрине TDS38. Здесь можно разместить описание, доступные варианты и актуальное наличие по торговым точкам.</p><p><b>18+</b> · Продажа через Mini App не осуществляется.</p>`;
    sheet.classList.remove("hidden");
  }));
}
document.querySelector("#closeSheet").addEventListener("click",()=>sheet.classList.add("hidden"));
sheet.addEventListener("click",e=>{if(e.target===sheet)sheet.classList.add("hidden")});
document.querySelectorAll(".bottom button").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".bottom button").forEach(x=>x.classList.remove("active"));b.classList.add("active");
  if(b.dataset.nav==="home")window.scrollTo({top:0,behavior:"smooth"});
  if(b.dataset.nav==="catalog")scrollToId("categoryGrid");
  if(b.dataset.nav==="info"){sheetContent.innerHTML="<h2>Информация</h2><p>TDS38 — витрина ассортимента магазина. Актуальное наличие уточняйте непосредственно в торговой точке.</p>";sheet.classList.remove("hidden")}
  if(b.dataset.nav==="profile"){sheetContent.innerHTML="<h2>Профиль</h2><p>Раздел профиля подготовлен для следующей версии Mini App.</p>";sheet.classList.remove("hidden")}
}));
render();