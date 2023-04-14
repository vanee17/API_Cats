//utilizacion de axios para optimizar fetch
const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
});
api.defaults.headers.common['X-API-KEY'] = 'live_ZM2C05tfdjGxR9ixxPhLFwCeJAzkKCNbReh8VbhKndISk1UFAd6kvRwqL9kvKq5P';

//ruta de la API guardada en una constante
// const API_URL= 'https://api.thecatapi.com/v1/images/search?limit=3';
// const API_URL_FAVORITE= 'https://api.thecatapi.com/v1/favourites';
// const API_URL_FAVORITE_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
// const API_URL_UPLOAD= 'https://api.thecatapi.com/v1/images/upload';

//funcion que se acciona con un onclick para ejecutar la llamada a la API
const sectionTest = document.querySelector('#sectionTest');

async function loadRandomProduct(){
    const {data, status} = await api.get('/images/search?limit=3')
    // const res = await fetch(API_URL);
    // const data = await res.json();
    console.log('random', data);
    if (status !== 200) {
        alert('Hubo un error de tipo:' + status)
    } else {
        if(sectionTest.children.length > 1){
            sectionTest.innerHTML = "";
        }
        data.forEach(item => {
            const template = `<div class="card" id="${item.id}">
            <img src="${item.url}" alt="imagen" width="100%" height="350">
            <button id="${item.id}" class="btnFav">añadir a favoritos</button>
            </div>`

            sectionTest.innerHTML += template;
            
            console.log('gatito', item.id);
        })
        const btnFav = document.querySelectorAll('.btnFav');

        Array.from(btnFav).map(btn => {
            btn.addEventListener('click', saveFavoriteProduct)
        })
        console.log('boton', btnFav);
    }
};

async function loadFavoriteProduct(){
    const {data, status} = await api.get('/favourites')
//metodo fetch sin lbreria

    // const res = await fetch(API_URL_FAVORITE, {
    //     headers: {
    //         'X-API-KEY': 'live_ZM2C05tfdjGxR9ixxPhLFwCeJAzkKCNbReh8VbhKndISk1UFAd6kvRwqL9kvKq5P',
    //     }
    // });
    //const data = await res.json();
    console.log('favorite', data);
    if (status !== 200) {
        alert('Hubo un error de tipo:' + status + data.message)
    }else{
        const principal = document.querySelector('.seccion-favoritos');
        principal.innerHTML = "";
        data.forEach(michi => {
            const seccion = document.createElement('div');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const textBtn = document.createTextNode('eliminar de favoritos');

            btn.appendChild(textBtn);
            btn.onclick = () => {deleteFavoriteProduct(michi.id)};
            img.src = michi.image.url;
            seccion.appendChild(img);
            seccion.appendChild(btn);
            principal.appendChild(seccion);
        });
    }
};

async function saveFavoriteProduct(eve){
    const {data, status} = await api.post('/favourites', {
        image_id: eve.target.id,
    })

//metodo fetch sin lbreria

    // const res = await fetch(API_URL_FAVORITE, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-API-KEY': 'live_ZM2C05tfdjGxR9ixxPhLFwCeJAzkKCNbReh8VbhKndISk1UFAd6kvRwqL9kvKq5P',
    //     },
    //     body: JSON.stringify({
    //         image_id: id
    //     }),
    // });
    // const data = await res.json();

    console.log('save', data);
    if (status !== 200) {
        alert('Hubo un error de tipo:' + status + data.message)
    }else{
        console.log('michi guardado en favoritos');
        loadFavoriteProduct();
    }
}

async function deleteFavoriteProduct(id){
    const{data, status} = await api.delete(`/favourites/${id}`);


    // const res = await fetch(API_URL_FAVORITE_DELETE(id), {
    //     method: 'DELETE',
    //     headers: {
    //         'X-API-KEY': 'live_ZM2C05tfdjGxR9ixxPhLFwCeJAzkKCNbReh8VbhKndISk1UFAd6kvRwqL9kvKq5P',
    //     }
    // });
    // const data = await res.json();
    if (status !== 200) {
        alert('Hubo un error de tipo:' + status + data.message)
    }else{
        console.log('michi eliminado');
        loadFavoriteProduct();
    }
}

async function uploadProduct(){
    const form = document.querySelector('#uploadForm');
    const formData = new FormData(form);
    console.log('formdata', formData.get('file'));
    const res = await api.post('/images/upload', {
        body: formData,
    });
    // const res = await fetch(API_URL_UPLOAD, {
    //     method: 'POST',
    //     headers: {
    //         'X-API-KEY': 'live_ZM2C05tfdjGxR9ixxPhLFwCeJAzkKCNbReh8VbhKndISk1UFAd6kvRwqL9kvKq5P',
    //     },
    //     body: formData,
    // })
}

loadRandomProduct();
loadFavoriteProduct();