class loadData {
    constructor(data) {
        this.data = data;
    }

    load(){
        return fetch(this.data)  
        .then(  
            function(response) {  
              if (response.status !== 200) {  
                console.log('Looks like there was a problem. Status Code: ' +  
                  response.status);  
                return;  
            }

            return response.json(); 
        }  
        )  
        .catch(function(err) {  
            console.log('Fetch Error :-S', err);  
        });

    }
}


class ViewController extends loadData {
    constructor(data, container) {
        super(data);
        this.container = container;
    }

    render(dataProduct){
        this.container.innerHTML = dataProduct.map(item=>{
          let goodsForm = `<div class="product-wrapper">
          <div class="product-name">${item.title}</div>
          <div class="product-size">${item.size}</div>
          <img class="product-image" src="${item.img}">
          </div>`;
          return goodsForm;
      }).join('');
    }
}

let container = document.querySelector('.products-container');
let goods = new ViewController('/data.json', container);

let productLoad = goods.load();

productLoad.then(function(value) {
    goods.render(value);
}, function(error) {
    console.log(error);
});
