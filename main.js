const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const productName = document.querySelector('#p-name');
const productDescription = document.querySelector('#p-description');
const productPrice = document.querySelector('#p-price');
const productAvailability = document.getElementsByName('availability');
const btnRegister = document.querySelector('#btnRegister')

let products;
let id;

//Abre modal de cadastro de produto
function openModal(){
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  }

  //Limpa os campos do formulario quando o modal é fechado
  productName.value = '';
  productDescription.value = '';
  productPrice.value = 0;
  for(let i = 0; i < productAvailability.length; i++){
    productAvailability[i].checked = false;
  };
}

//Registra o produto na listagem
function registerProduct(product, index){
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash' style="color:#FFF"></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

//Salva os valores dos inputs em um objeto e salva no array de produtos
btnRegister.onclick = e => {
  if (productName == '' || productDescription == '' || productPrice.value == 0){
    return;
  }

  e.preventDefault();

  if(id !== undefined){
    products[id].name = productName.value;
    products[id].description = productDescription.value;
    products[id].price = productPrice.value;

    for(let i = 0; i < productAvailability.length; i++){
      if(productAvailability[i].checked == true){
        products[id].availability = productAvailability.value;
      };
    };
  }
  else {
    products.push(
      {
        'name': productName.value,
        'description': productDescription.value,
        'price': productPrice.value,
        'availability': productAvailability.value
      }
    );
  }

  setProducts();

  modal.classList.remove('active');
  loadProducts();
  id = undefined;
};

//Exclui um produto
function deleteItem(index) {
  products.splice(index, 1)
  setProducts()
  loadProducts()
}

//carrega os produtos na página
function loadProducts(){
  products = getProducts();

  products.sort((a, b )=> a.price - b.price);

  tbody.innerHTML = ''
  products.forEach((product, index)=>{
    registerProduct(product, index);
  });
}

//retorna os produtos do localStorage
const getProducts = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];

//salva os produtos em localStorage
const setProducts = () => localStorage.setItem('dbfunc', JSON.stringify(products));

loadProducts();

