self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open('cache01').then(function(cache){
            return cache.addAll([
                '/',
                'index.html',
                'main.css',
                '1.jpg',
                '2.jpg'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                if(response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    )
});

self.addEventListener('activate', function(event) {
    var cacheWhitelist = ['cache01'];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheNames){
                    if (cacheWhitelist.indexOf(cacheNames) === -1){
                        return caches.delite(cacheNames);
                    }
                })
            );
        })
    );
})