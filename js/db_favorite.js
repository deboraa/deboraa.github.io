// membuka akses database
var dbPromised = idb.open('db_favorite', 1, upgradeDb => {
    var objectStore = upgradeDb.createObjectStore('favorite', { keyPath: 'id'});
    objectStore.createIndex('teamName', 'teamName', { unique: false});
});
  
// Fungsi tambah favorite
function addFav(dt) {
    dbPromised.then(function(db) {
        const tx = db.transaction('favorite', 'readwrite');
        const store = tx.objectStore('favorite');
        const item = {  
            id: dt.id,
            name: dt.name,
            position: dt.position
        }; 
        store.add(item);
        tx.objectStore('favorite').put(item);
        return tx.complete;
    }).then(function() {
        console.log('Tim Favorit disimpan.');
        M.toast({ html: 'Tim berhasil disimpan ke favorit!' });
    }).catch(function(e) {
        M.toast({ html: 'Gagal menyimpan ke favorit!' });
        console.log('Error add favorite:', e);
    });
}

//Fungsi delete favorite
function dltFav(dt) {
    dbPromised.then(function(db) {
    var tx = db.transaction('favorite', 'readwrite');
    var store = tx.objectStore('favorite');
    store.delete(dt);
    return tx.complete;
    }).then(function() {
        M.toast({ html: 'Tim berhasil dihapus dari favorit!' });
    }).catch(function(e) {
        console.log('Error delete favorite:', e);
    });
}

// Fungsi mengambil data favorite
function getFav() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction('favorite', "readonly");
                var store = tx.objectStore('favorite');
                return store.getAll();
            })
            .then(function (dt) {
                resolve(dt);
            });
    });
}

//Fungsi mengecek data
function cekFav(id) {
    return new Promise(function (resolve, reject) {
        dbPromised.then(function (db) {
            var tx = db.transaction('favorite', "readonly");
            var store = tx.objectStore('favorite');
            return store.get(id);
        })
        .then(function (dt) {
            if (dt != undefined)
                resolve(true)
            else
                reject(false);
        });
    });
}
