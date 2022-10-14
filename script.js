// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
const cartSection = document.querySelector('.cart__items');
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

const cartItemClickListener = (event) => {
  const fatherElement = event.target.parentElement;
  fatherElement.removeChild(event.target);
};
/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const createElementsPage = async () => {
  const allPcs = await fetchProducts('computador');
  const mainSection = document.querySelector('.items');
  allPcs.results.forEach((item) => {
    const section = createProductItemElement(item);
    mainSection.appendChild(section);
  });
};

const saveLocalStorage = () => {
  const sectionMain = document.querySelectorAll('.cart__item');
  const arrObjects = [];
  sectionMain.forEach((li) => {
    const infosSection = li.innerText.split(' | ');
    const infos = infosSection.map((section) => section.replace(/(ID: | TITLE: |PRICE: \$)/, ''));
    arrObjects.push({
      id: infos[0],
      title: infos[1],
      price: infos[2],
    });
  });
  saveCartItems(JSON.stringify(arrObjects));
};

const addInCart = async (event) => {
  const itemSection = event.target.parentElement;
  const clickedItemID = itemSection.children[0].innerText;
  const infoComputer = await fetchItem(clickedItemID);
  const infosAddComputerInCart = createCartItemElement(infoComputer);
  cartSection.appendChild(infosAddComputerInCart);
  saveLocalStorage();
};

const getLocalStorage = () => {
  if (!localStorage.getItem('cartItems')) return;  
  const arrObjects = getSavedCartItems();
    arrObjects.forEach((infos) => {
    const infoComputers = createCartItemElement(infos);
    cartSection.appendChild(infoComputers);
  });
};

const clearCart = () => {
  const itemsInCart = Object.values(cartSection.children);
  itemsInCart.forEach((item) => {
    cartSection.removeChild(item);
  });
};

cartButton = document.querySelector('.empty-cart');
cartButton.addEventListener('click', clearCart);
window.onload = async () => { 
  getLocalStorage();
  await createElementsPage();
  const fullSections = document.querySelectorAll('.item');
  fullSections.forEach((item) => {
    item.addEventListener('click', addInCart);
  });
};
