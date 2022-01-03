var productos =[
    {
      "producto": "Gran Reserva",
      "precio": 403.65,
      "img": "../img/catalogLamps/lampara1.jpg"
    },
    {
      "producto": "Chardonnay",
      "precio": 465,
      "img": "../img/catalogLamps/lampara1.jpg"
    },
    {
      "producto": "Especial",
      "precio": 499,
      "img": "../img/catalogLamps/lampara1.jpg"
    },
    {
      "producto": "Tradicional",
      "precio": 400,
      "img": "../img/catalogLamps/lampara1.jpg"
    },
    {
      "producto": "Centenario Plata",
      "precio": 320,
      "img": "../img/catalogLamps/lampara1.jpg"
    },
    {
      "producto": "Paloma",
      "precio": 300,
      "img": "../img/catalogLamps/lampara1.jpg"
    },
  ]
  var cards = document.getElementById('cards')
    
  for(i=0; i<productos.length; i++){
  var products = productos[i]
    cards.innerHTML += `
    <div class="card" style="width: 12rem; margin-top: 1.5rem">
      <img src="${products.img}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${products.producto}</h5>
        <p class="card-text">$ ${products.precio}</p>
        <a class="btn btn-primary" id="${i}">Añadir al carrito</a>
      </div>
    </div>`
  }
  
  var addCar = document.querySelectorAll('.btn-primary');
  addCar.forEach((addToCarB) =>{ /*-- Añade un onclick a cada botón de las cards --*/
    addToCarB.addEventListener('click', forBuyClick)
  })
  
  var infoCar = document.querySelector('.column');
  function forBuyClick(event){
    const boton = event.target
    const item = boton.closest('.card')
    var proname = item.querySelector('.card-title').textContent
    var protitle = infoCar.getElementsByClassName('protitle')
    for (let i = 0; i < protitle.length; i++) {
      if (protitle[i].innerText === proname) {
        let elementQuantity = protitle[i].parentElement.querySelector('.input-quantity')
        elementQuantity.value++
        updateTotalVal()
        return;
      }
    }
    // const boton = event.target
    const elemento = boton.closest('.card')
    const idBoton = elemento.querySelector('.btn').id
    infoCar.innerHTML +=`
    <tr class="padreproduct">
      <td class="protitle">${productos[idBoton].producto}</td>
      <td class="precioProducto" id="${idBoton}" type="number">${productos[idBoton].precio}</td>
      <td><input class="input-quantity" type="number" value="1" onchange="quantityPr()"></td>
      <td><button class="btn btn-danger" type="button" onclick="remove()">X</button></td>
    </tr>`
    updateTotalVal();
  }
  
  const quantityPr = () =>{ /*-- Debería agregar o actualizar la el TOTAL cuando la cantidad de un producto del carrito cambia. Debería --*/
  var cant = event.target
  var elemento = cant.closest('.padreproduct')
  var input = elemento.querySelector('.input-quantity')
  input.value <= 0 ? (input.value = 1): null
  updateTotalVal()
  }
  /*--------UPADTE TOTAL--------*/
  const updateTotalVal = () =>{ 
  var total = 0
  let showTotal = document.getElementById('total')
  var cartItems = document.querySelectorAll('.padreproduct');
  cartItems.forEach((cartItem) => {
    var cartItemPrice = parseFloat(cartItem.querySelector('.precioProducto').textContent)
    var cartItemQuantityE = parseFloat(cartItem.querySelector('.input-quantity').value);
    total += cartItemPrice * cartItemQuantityE;
  });
  showTotal.innerHTML = `${total}`;
  }
  
  const remove = () =>{
    const buttonClicked = event.target
    buttonClicked.closest('tr').remove()
    updateTotalVal()
    }
  const comprar = () =>{
    infoCar.innerHTML = `Gracias por su compra!`;
    updateTotalVal()
  }