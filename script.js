/* ============================================================
   PENGATURAN: GANTI BAGIAN INI
   ============================================================ */
var CONFIG = {
  ADMIN_WA: "6282268539315",              // <-- GANTI dengan nomor WA admin, format 62 tanpa + dan tanpa 0 di depan
  TIKTOK:   "https://www.tiktok.com/@joki.pro52?_r=1&_t=ZS-9BOfxqhj6nN",
  INSTAGRAM:"https://www.instagram.com/joki_pro_id?rpxt=MTBscWpxdzh3N3F1Mg==",
  DISCORD:  ""
};

/* Data game, paket, dan jenis login (harga contoh, silakan ubah) */
var GAMES = {
 "Mobile Legends": {
  logins:["Moonton","VK","Facebook","Google"],
  pkgs:[
   {n:"Mythic Honor -> Mythic Glory",p:350000,hot:1,d:["Estimasi 1\u20133 hari","Joki rank tinggi","Garansi kompensasi"]},
   {n:"Legend -> Mythic",p:200000,hot:1,d:["Estimasi 1\u20132 hari","Garansi kompensasi"]},
   {n:"Mythic Placement (10 match)",p:120000,hot:1,d:["Estimasi 8\u201312 jam","Garansi kompensasi"]},
   {n:"Epic -> Legend",p:125000,hot:0,d:["Estimasi 12\u201324 jam","Garansi kompensasi"]},
   {n:"Mythic Grading -> Mythic Honor",p:250000,hot:0,d:["Estimasi 1\u20132 hari","Joki rank tinggi","Garansi kompensasi"]},
   {n:"Epic/star",p:6000,hot:0,d:[ "harga per-bintang", "3-5 bintang 1 setengah jam", "5-10 bintang 2 setengah jam"]},
   {n:"Legend/star",p:7000,hot:0,d:[ "harga per-bintang", "3-5 bintang 1 setengah jam", "5-10 bintang 2 setengah jam"]},
   {n:"Mythic/star",p:12000,hot:0,d:[ "harga per-bintang", "3-5 bintang 2 jam", "5-10 bintang 3 setengah jam"]},
   {n:"Mythic Honor/star",p:15000,hot:0,d:[ "harga per-bintang", "3-5 bintang 2 jam", "5-10 bintang 4 jam"]},
   {n:"Mythic Glory/star",p:21000,hot:0,d:[ "harga per-bintang", "3-5 bintang 2 jam", "5-10 bintang 4 setengah jam"]},
   {n:"Mythic Imortal/star",p:6000,hot:0,d:["harga per-bintang"]}
  ]},
 "Genshin Impact": {
  logins:["HoYoverse","Google","Facebook"],
  pkgs:[
   {n:"Daily + Konten Endgame + Resin(1 Bulan)",p:175000,hot:1,d:["Quest harian dan resin","Konten Endgame", "Resin"]},
   {n:"Event Utama",p:55000,hot:1,d:["Sesuai target pengerjaan","Garansi kompensasi"]},
   {n:"Event Biasa",p:30000,hot:1,d:["Sesuai target pengerjaan","Garansi kompensasi"]},
   {n:"Eksplorasi Map Kecil / Map Event",p:250000,hot:0,d:["Sesuai target pengerjaan","Garansi kompensasi"]},
   {n:"Eksplorasi Map Besar",p:400000,hot:0,d:["Sesuai target pengerjaan","Garansi kompensasi"]},
   {n:"Archon Quest",p:20000,hot:0,d:["harga per-Quest","Sesuai target pengerjaan","Garansi kompensasi"]},
   {n:"Story Quest",p:20000,hot:0,d:["harga per-Quest", "Sesuai target pengerjaan","Garansi kompensasi"]},
   {n:"World Quest panjang",p:15000,hot:0,d:["harga per-Quest", "Sesuai target pengerjaan","Garansi kompensasi"]},
   {n:"World Quest pendek",p:5000,hot:0,d:["harga per-Quest", "Sesuai target pengerjaan","Garansi kompensasi"]},
  ]},
 "Free Fire": {
  logins:["Facebook","Google","VK"],
  pkgs:[
   {n:"Bronze -> Gold",p:60000,hot:0,d:["Estimasi 1\u20132 hari","Garansi kompensasi"]},
   {n:"Gold -> Heroic",p:100000,hot:0,d:["Estimasi 3\u20135 hari","Garansi kompensasi"]}
  ]},
};

/* ============================================================
   LOGIKA WEBSITE
   ============================================================ */
var $ = function(id){ return document.getElementById(id); };
var rupiah = function(n){ return "Rp" + n.toLocaleString("id-ID"); };
var gameSel = $("game"), paketSel = $("paket"), loginSel = $("login");
var activeTab = Object.keys(GAMES)[0];

/* Tautan sosial & WA */
var waHello = "https://wa.me/" + CONFIG.ADMIN_WA + "?text=" + encodeURIComponent("Halo Admin JokiPro, saya ingin konsultasi soal jasa joki game.");
["waKonsul","fab","lWa"].forEach(function(i){ $(i).href = waHello; });
$("lTiktok").href = CONFIG.TIKTOK; $("lIg").href = CONFIG.INSTAGRAM; $("lDc").href = CONFIG.DISCORD;
$("yr").textContent = new Date().getFullYear();

/* Menu mobile */
$("burger").onclick = function(){
  var open = $("nav").classList.toggle("open");
  this.setAttribute("aria-expanded", open);
};
$("nav").addEventListener("click", function(e){ if(e.target.tagName === "A") $("nav").classList.remove("open"); });

function renderTabs(){
  var t = $("tabs"); t.innerHTML = "";
  Object.keys(GAMES).forEach(function(g){
    var b = document.createElement("button");
    b.type = "button"; b.className = "tab"; b.textContent = g;
    b.setAttribute("role","tab"); b.setAttribute("aria-selected", g === activeTab);
    b.onclick = function(){ activeTab = g; renderTabs(); renderPrices(); };
    t.appendChild(b);
  });
}
function renderPrices(){
  var box = $("prices"); box.innerHTML = "";
  GAMES[activeTab].pkgs.forEach(function(pk, idx){
    var c = document.createElement("div"); c.className = "pc" + (pk.hot ? " hot" : "");
    var h = (pk.hot ? '<span class="badge">Terlaris</span>' : "") +
      "<h3></h3><div class=\"price\">" + rupiah(pk.p) + "</div><ul>" +
      pk.d.map(function(x){ return "<li>" + x + "</li>"; }).join("") + "</ul>";
    c.innerHTML = h;
    c.querySelector("h3").textContent = pk.n;
    var b = document.createElement("button"); b.type = "button"; b.className = "btn btn-gold"; b.textContent = "Pilih Paket";
    b.onclick = function(){
      gameSel.value = activeTab; fillGame(); paketSel.value = idx; updateSum();
      $("order").scrollIntoView({behavior:"smooth"});
    };
    c.appendChild(b); box.appendChild(c);
  });
}

/* Form dinamis */
function fillGame(){
  var g = GAMES[gameSel.value];
  paketSel.innerHTML = ""; loginSel.innerHTML = "";
  g.pkgs.forEach(function(pk, i){
    var o = document.createElement("option"); o.value = i;
    o.textContent = pk.n.replace("->", "\u2192") + " (" + rupiah(pk.p) + ")"; paketSel.appendChild(o);
  });
  g.logins.forEach(function(l){
    var o = document.createElement("option"); o.value = o.textContent = l; loginSel.appendChild(o);
  });
  updateSum();
}
function updateSum(){
  $("harga-sum").textContent = rupiah(GAMES[gameSel.value].pkgs[paketSel.value || 0].p);
}
Object.keys(GAMES).forEach(function(g){
  var o = document.createElement("option"); o.value = o.textContent = g; gameSel.appendChild(o);
});
gameSel.onchange = fillGame; paketSel.onchange = updateSum;

/* Normalisasi nomor WA pemesan: 08xx -> 628xx */
function normWA(v){
  var d = v.replace(/\D/g, "");
  if(d.indexOf("0") === 0) d = "62" + d.slice(1);
  return d;
}

/* Validasi + kirim ke WhatsApp */
$("kirim").onclick = function(){
  var f = { nama:$("nama"), wa:$("wa"), uid:$("uid"), game:gameSel, paket:paketSel, login:loginSel };
  var bad = [];
  Object.keys(f).forEach(function(k){ f[k].classList.remove("bad"); });
  if(!f.nama.value.trim()) bad.push(f.nama);
  if(!f.uid.value.trim()) bad.push(f.uid);
  var wa = normWA(f.wa.value);
  if(wa.length < 10 || wa.length > 15) bad.push(f.wa);
  if(!f.game.value || !f.paket.value || !f.login.value) bad.push(f.game);
  if(bad.length){
    bad.forEach(function(el){ el.classList.add("bad"); });
    $("err").textContent = "Lengkapi kolom bertanda merah. Pastikan nomor WhatsApp valid (contoh: 081234567890).";
    bad[0].focus(); return;
  }
  $("err").textContent = "";
  var pk = GAMES[f.game.value].pkgs[f.paket.value];
  var catatan = $("catatan").value.trim() || "-";
  var pesan =
    "Halo Admin JokiPro, saya ingin pesan joki game dengan detail berikut:\n\n" +
    "- Nama: " + f.nama.value.trim() + "\n" +
    "- Game: " + f.game.value + "\n" +
    "- Paket/Rank: " + pk.n + "\n" +
    "- User ID/Server: " + f.uid.value.trim() + "\n" +
    "- Login Via: " + f.login.value + "\n" +
    "- Catatan: " + catatan + "\n" +
    "- No. WA: " + wa + "\n\n" +
    "Mohon info total pembayaran dan nomor rekeningnya. Terima kasih!";
  window.location.href = "https://wa.me/" + CONFIG.ADMIN_WA + "?text=" + encodeURIComponent(pesan);
};

renderTabs(); renderPrices(); fillGame();
