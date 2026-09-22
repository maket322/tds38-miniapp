const products=[
{id:"corvus",name:"Corvus Slim Blast",brand:"Corvus",cat:"chew",meta:"20 г",price:490,img:"corvus.jpg"},
{id:"stels",name:"STELS Siberia Red",brand:"STELS",cat:"chew",meta:"12 г",price:490,img:"stels.jpg"},
{id:"odens",name:"Oden's Extreme White Dry",brand:"Oden's",cat:"chew",meta:"20 г",price:590,img:"odens.jpg"},
{id:"vliq",name:"VLIQ Max Flavor",brand:"VLIQ",cat:"aroma",meta:"Grape Aloe Fresh",price:790,img:"vliq.jpg"},
{id:"duall",name:"DUALL Лесные ягоды",brand:"DUALL",cat:"aroma",meta:"30 мл",price:790,img:"duall.jpg"},
{id:"bz",name:"BZ Яблоко и вишня",brand:"BZ",cat:"aroma",meta:"50 мг",price:790,img:"bz.jpg"},
{id:"chakra",name:"CHAKRA Клубника и дыня",brand:"CHAKRA",cat:"aroma",meta:"30 мл",price:790,img:"chakra.jpg"},
{id:"vaporesso",name:"Vaporesso XROS 6 Mini",brand:"Vaporesso",cat:"pods",meta:"Pod-система",price:2190,img:"vaporesso.jpg"},
{id:"geekvape",name:"Geekvape Sonder Q3",brand:"Geekvape",cat:"pods",meta:"Pod-система",price:1990,img:"geekvape.jpg"},
{id:"smoant",name:"Smoant Pasito III",brand:"Smoant",cat:"pods",meta:"8 цветов",price:3490,img:"smoant.jpg"}];
const cats={chew:"Жевательный табак",aroma:"Аромамиксы",pods:"POD-системы",other:"Другое"};
let historyStack=["home"], current=null, qty=1;
let saved=JSON.parse(localStorage.getItem("tds38_saved")||"{}");
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function money(n){return n.toLocaleString("ru-RU")+" ₽"}
function page(id,push=true){$$(".page").forEach(x=>x.classList.remove("active"));$("#"+id).classList.add("active");$$("nav button").forEach(x=>x.classList.toggle("active",x.dataset.nav===id));if(push&&historyStack.at(-1)!==id)historyStack.push(id);scrollTo(0,0)}
function back(){if(historyStack.length>1){historyStack.pop();page(historyStack.at(-1),false)}else page("home",false)}
function toast(t){let x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1500)}
function card(p){return `<button class="tile" data-product="${p.id}"><img src="${p.img}"><div><b>${p.name}</b><small>${money(p.price)}</small></div></button>`}
$("#newGrid").innerHTML=[products[3],products[4],products[7]].map(card).join("");
function row(p){return `<div class="row"><img data-product="${p.id}" src="${p.img}"><div data-product="${p.id}"><h3>${p.name}</h3><p>${p.meta}</p><strong>${money(p.price)}</strong></div><button class="saveBtn" data-save="${p.id}">＋</button></div>`}
function openCategory(cat){$("#catTitle").textContent=cats[cat]||"Каталог";let list=products.filter(p=>cat==="other"?false:p.cat===cat);let brands=["Все",...new Set(list.map(p=>p.brand))];$("#chips").innerHTML=brands.map((b,i)=>`<button class="${i===0?"active":""}" data-chip="${b}">${b}</button>`).join("");$("#productList").innerHTML=list.map(row).join("");$("#chips").onclick=e=>{let b=e.target.dataset.chip;if(!b)return;$("#chips").querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===e.target));$("#productList").innerHTML=list.filter(p=>b==="Все"||p.brand===b).map(row).join("")};page("category")}
function openProduct(id){current=products.find(p=>p.id===id);if(!current)return;qty=1;$("#qty").textContent=qty;$("#prodBrand").textContent=current.brand.toUpperCase();$("#prodImg").src=current.img;$("#prodName").textContent=current.name;$("#prodMeta").textContent=current.meta;$("#prodPrice").textContent=money(current.price);page("product")}
function save(id,count=1){saved[id]=(saved[id]||0)+count;localStorage.setItem("tds38_saved",JSON.stringify(saved));renderSaved();toast("Добавлено в список")}
function renderSaved(){let entries=Object.entries(saved).filter(([,n])=>n>0);$("#badge").textContent=entries.reduce((a,[,n])=>a+n,0);$("#badge").style.display=entries.length?"grid":"none";let total=0;$("#savedList").innerHTML=entries.length?entries.map(([id,n])=>{let p=products.find(x=>x.id===id);if(!p)return"";total+=p.price*n;return `<div class="row"><img src="${p.img}" data-product="${id}"><div><h3>${p.name}</h3><p>${p.meta} • ${n} шт.</p><strong>${money(p.price*n)}</strong></div><button class="saveBtn" data-remove="${id}">×</button></div>`}).join(""):`<div class="notice">Пока ничего не добавлено. Выберите товары в каталоге.</div>`;$("#savedTotal").textContent=money(total)}
document.addEventListener("click",e=>{let p=e.target.closest("[data-product]");if(p)openProduct(p.dataset.product);let s=e.target.closest("[data-save]");if(s){e.stopPropagation();save(s.dataset.save)}let r=e.target.closest("[data-remove]");if(r){delete saved[r.dataset.remove];localStorage.setItem("tds38_saved",JSON.stringify(saved));renderSaved()}let c=e.target.closest("[data-open-category]");if(c)openCategory(c.dataset.openCategory);let n=e.target.closest("[data-nav]");if(n)page(n.dataset.nav);if(e.target.closest("[data-back]"))back()});
$("#minus").onclick=()=>{$("#qty").textContent=qty=Math.max(1,qty-1)};$("#plus").onclick=()=>{$("#qty").textContent=qty+=1};$("#saveItem").onclick=()=>current&&save(current.id,qty);$("#clearSaved").onclick=()=>{saved={};localStorage.setItem("tds38_saved","{}");renderSaved()};
$("#search").oninput=e=>{let q=e.target.value.toLowerCase().trim();$("#searchResults").innerHTML=q?products.filter(p=>(p.name+" "+p.brand+" "+p.meta).toLowerCase().includes(q)).map(row).join(""):""};
$$("[data-profile-action]").forEach(b=>b.onclick=()=>{if(b.dataset.profileAction==="saved")page("saved");else toast("Раздел подготовлен для следующего наполнения")});
try{const tg=window.Telegram?.WebApp;tg?.ready();tg?.expand();const u=tg?.initDataUnsafe?.user;if(u){$("#userName").textContent=[u.first_name,u.last_name].filter(Boolean).join(" ");$("#userSub").textContent=u.username?"@"+u.username:"Telegram"}}catch(e){}
renderSaved();