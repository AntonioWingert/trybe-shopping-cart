const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('se ao executar getSavedCartItems o método localStorage.getItem é chamado', async () => {
    const testCall = await getSavedCartItems(item);
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  test('se ao executar getSavedCartItems, o método localStorage.getItem é chamado com o \'cartItems\' como parâmetro.', async () => {
    const testCall = await saveCartItems(test);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems');
  });
});
