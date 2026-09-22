const data=[
{name:"CORVUS",sub:"Slim Blast",cat:"chew",img:"assets/corvus.jpg"},
{name:"STELS",sub:"Siberia Red",cat:"chew",img:"assets/stels.jpg"},
{name:"ODEN'S",sub:"Extreme White Dry",cat:"chew",img:"assets/odens.jpg"},
{name:"KASTA",sub:"Ассортимент",cat:"chew",img:null},
{name:"ICEBERG",sub:"Ассортимент",cat:"chew",img:null},
{name:"VLIQ",sub:"Max Flavor",cat:"aroma",img:"assets/vliq.jpg"},
{name:"DUALL",sub:"Лесные ягоды",cat:"aroma",img:"assets/duall.jpg"},
{name:"BZ",sub:"Яблоко • вишня",cat:"aroma",img:"assets/bz.jpg"},
{name:"CHAKRA",sub:"Клубника • дыня",cat:"aroma",img:"assets/chakra.jpg"},
{name:"МОНАШКА",sub:"Ассортимент",cat:"aroma",img:null},
{name:"VAPORESSO",sub:"XROS 6 Mini",cat:"pods",img:"assets/vaporesso.jpg"},
{name:"GEEKVAPE",sub:"Sonder Q3",cat:"pods",img:"assets/geekvape.jpg"},
{name:"SMOANT",sub:"Pasito III",cat:"pods",img:"assets/smoant.jpg"}];
const labels={chew:"Жевательный табак",aroma:"Аромамиксы",pods:"POD-системы"};
function card(x){let pic=x.img?`<img src="${x.img}" alt="${x.name}">`:`<div style="height:100%;display:grid;place-items:center;font-size:26px;font-weight:900;color:#777">${x.name}</div>`;
return `<article class="card"><span class="tag">18+</span><div class="pic">${pic}</div><div class="copy"><h3>${x.name}</h3><p>${x.sub}</p><button class="view" data-name="${x.name}">ПОСМОТРЕТЬ →</button></div></article>`}
document.querySelector("#featured").innerHTML=[data[0],data[5],data[10]].map(card).join("");
["chew","aroma","pods"].forEach(c=>document.querySelector("#"+c+"Grid").innerHTML=data.filter(x=>x.cat===c).map(card).join(""));
function bind(){document.querySelectorAll(".view").forEach(b=>b.onclick=()=>openItem(data.find(x=>x.name===b.dataset.name)))}
function openItem(x){document.querySelector("#modalBody").innerHTML=`<div class="detailHero"><div>${x.img?`<img src="${x.img}">`:""}</div><div><small>${labels[x.cat]} • 18+</small><h2>${x.name}</h2><h3>${x.sub}</h3><p>Карточка ассортимента TDS38. В следующем наполнении здесь будут отдельные варианты, вкусы и фотографии продукции.</p><p><b>Наличие:</b> уточняйте непосредственно в магазине.</p></div></div><div class="notice">Информационная витрина. Онлайн-покупка регулируемой продукции через Mini App не осуществляется.</div>`;document.querySelector("#modal").classList.remove("hidden")}
bind();
document.querySelector("#close").onclick=()=>document.querySelector("#modal").classList.add("hidden");
document.querySelector("#modal").onclick=e=>{if(e.target.id==="modal")e.currentTarget.classList.add("hidden")};
document.querySelectorAll("[data-jump]").forEach(b=>b.onclick=()=>document.querySelector("#"+b.dataset.jump)?.scrollIntoView({behavior:"smooth"}));
document.querySelector("#goCatalog").onclick=()=>document.querySelector("#catalog").scrollIntoView({behavior:"smooth"});
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>{document.querySelectorAll("nav button").forEach(x=>x.classList.remove("active"));b.classList.add("active");if(b.dataset.nav==="top")scrollTo({top:0,behavior:"smooth"});if(b.dataset.nav==="catalog")document.querySelector("#catalog").scrollIntoView({behavior:"smooth"});if(b.dataset.nav==="info"){document.querySelector("#modalBody").innerHTML="<h2>TDS38</h2><p>Каталог продукции и информация о наличии в магазинах.</p><div class='notice'>18+ • Информационная витрина.</div>";document.querySelector("#modal").classList.remove("hidden")}if(b.dataset.nav==="profile"){document.querySelector("#modalBody").innerHTML="<h2>Профиль</h2><p>Раздел будет добавлен в следующем обновлении.</p>";document.querySelector("#modal").classList.remove("hidden")}});
document.querySelector("#menu").onclick=()=>document.querySelector("#catalog").scrollIntoView({behavior:"smooth"});