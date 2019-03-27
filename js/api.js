var base_url = "https://api.football-data.org/v2/";
var Apitoken = '5139069d2d0444c4afdb6a1c5925f788';
var liga_jerman = `${base_url}competitions/2002/standings`;
var teams = `${base_url}teams/`;
var getId = id => document.getElementById(id);
var fetchAPI = url => {
  return fetch(url,{
    headers:{ 'X-Auth-Token' : Apitoken } 
  })
}
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(err) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + err);
}
// Blok kode untuk leagues
function getLeagues(leagues){
  console.log('getLeague')
  if ('caches' in window) {
    caches.match(leagues).then(function (response) {
      if (response) {
        response.json().then(function (dt) {
          showLeagues(dt);
        });
      }
    });
    //fetch data
    fetchAPI(leagues)
    .then(status)
    .then(json)
    .then(function(dt){ showLeagues(dt);
      console.log(dt)
    })
    .catch(error);
  }
  // Fungsi untuk menampilkan data liga
  function showLeagues(dt){
    var standingsHTML = '';
    dt.standings[0].table.forEach(function(dt) {
      standingsHTML += `
          <td>${dt.position}</td>
          <td><a href="team.html?id=${dt.team.id}">${dt.team.name}</a></td>
          <td>${dt.playedGames}</td>
          <td>${dt.won}</td>
          <td>${dt.lost}</td>
          <td>${dt.points}</td>
        </tr>
      `;
    });
    document.getElementById("leagues").innerHTML = standingsHTML;
  }
}

// Blok kode untuk teams
function getTeams(team){
  console.log('getTeams')
  if ('caches' in window){
    caches.match(team).then(function (response){
      if (response){
        response.json().then(function (dt){
          showTeams(dt);
        });
      }
    });

    fetchAPI(team)
    .then(status)
    .then(json)
    .then(function(dt) { showTeams(dt);
    
    var save = document.getElementById("save");
    var dlt = document.getElementById("dlt");

    cekFav(dt.id).then((msg)=>{
      save.style.display = "Tidak Ada";
      dlt.style.display = "Blokir";
    })
    .catch((msg)=>{
      save.style.display = "Blokir";
      dlt.style.display = "Tidak Ada";
    });
    save.onclick= function(){
      addFav(dt);
      save.style.display = "Tidak Ada";
      dlt.style.display = "Blokir";
    };
    dlt.onclick= function(){
      dltFav(dt.id);
      save.style.display = "Blokir";
      dlt.style.display = "Tidak Ada";
    }
  })
  .catch(error);
  }

  //Fungsi untuk menampilkan data team
  function showTeams(dt){
    const { address, area, name, venue, website } = dt;
    team = dt;
    getId('name').innerText = name;
    getId('area').innerText = area.name;
    getId('address').innerText = address;
    getId('venue').innerText = venue;
    getId('website').innerText = website;

    var teamHTML = '';
    teamHTML += 
    ` 
      <button class="btn red waves-effect waves-light" id="dlt">
        Delete
      </button>
      <button class="btn indigo waves-effect waves-light" id="save">
        Add
      </button>
      <br> 
    `;
                
    dt.squad.forEach(function(dt) {
      const { name, position, countryOfBirth, dateOfBirth, nationality, shirtNumber } = dt;
      const date = new Intl.DateTimeFormat(['ban', 'id'], {
        // Mengubah format tanggal
        day: '2-digit', month: 'short', year: 'numeric'
      }).format(new Date(dateOfBirth));

      teamHTML += `<li class="collection-item">
        <b>${name} - ${(shirtNumber || '')}</b>
        <p>
          Position: ${position} || Nationality: ${nationality} <br>
          ${countryOfBirth}, ${date}
        </p>
      </li>`;
    });
    document.getElementById("teams").innerHTML = teamHTML;
  }
}

function getFavorites() {
  var dbData = getFav();
  dbData.then(function (dt) { 
    var teamBodyHtml = '';
    dt.forEach(function(team) {
      teamBodyHtml +=`
        <div>
          <a href="team.html?id=${team.id}"><b>${team.name}</b></a>
        </div><br><br>`;
    });
  document.getElementById("fav-body").innerHTML = teamBodyHtml;                  
  }); 
}
