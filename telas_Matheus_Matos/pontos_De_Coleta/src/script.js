var mapa = L.map('mapa').setView([-23.596673736782243, -46.69205642585286], 12);
var marker1 = L.marker([-23.588906003235447, -46.67805022462451]).addTo(mapa);
var marker2 = L.marker([-23.589514238987, -46.687388420504455]).addTo(mapa);
var marker3 = L.marker([-23.602835415535573, -46.6611106540014]).addTo(mapa);

marker1.bindPopup("<b>Nome do local:</b><br><center>Proa</center>");
marker2.bindPopup("<b>Nome do local:</b><br><center>Serasa</center>");
marker3.bindPopup("<b>Nome do local:</b><br><center>Igreja Moema</center>");


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);
