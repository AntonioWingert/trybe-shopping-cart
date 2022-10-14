const getSavedCartItems = () => {
  const returnItem = localStorage.getItem('cartItems');
  if (returnItem) return JSON.parse(returnItem);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
