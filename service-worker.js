importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox){
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    { url: "/", revision: '1' },
    { url: "/nav.html", revision: '1' },
    { url: "/index.html", revision: '1' },
    { url: "/team.html", revision: '1' },
    { url: "/pages/home.html", revision: '1' },
    { url: "/pages/jerman.html", revision: '1' },
    { url: "/pages/favorite.html", revision: '1' },
    { url: "/images/jerman.png", revision: '1' },
    { url: "/images/iconbola.png", revision: '1' },
    { url: "/icon.png", revision: '1' },
    { url: "/css/materialize.min.css", revision: '1' },
    { url: "/manifest.json", revision: '1' },
    { url: "/js/materialize.min.js", revision: '1' },
    { url: "/js/idb.js", revision: '1' },
    { url: "/js/materialize.js", revision: '1' },
    { url: "/js/nav.js", revision: '1' },
    { url: "/js/api.js", revision: '1' },
    { url: "/js/db_favorite.js", revision: '1' },
  ]);

  workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.staleWhileRevalidate()
  );

  workbox.routing.registerRoute(
     new RegExp('https://api.football-data.org/v2/'),
     workbox.strategies.staleWhileRevalidate()
  );
}

else {
  console.log(`Workbox gagal dimuat`);
}

//notifikasi
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'images/iconbola.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
