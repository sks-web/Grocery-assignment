const initialValue = [];
function groceryReducer(state = initialValue, action) {
  console.log(action);
  switch (action.type) {
    case "ADD_GROCERY":
      const isItem = state.find(
        (item) =>
          item.itemName.toLocaleLowerCase() ===
          action.item.itemName.toLocaleLowerCase()
      );
      if (isItem) {
        return state.map((item) => {
          if (
            item.itemName.toLocaleLowerCase() ===
            action.item.itemName.toLocaleLowerCase()
          ) {
            item.qty = item.qty + 1;
          }
          return item;
        });
      } else {
        return [...state, action.item];
      }
    case "TOGGLE_BUY":
      return state.map((item) => {
        if (item.itemID === action.id) item.isBought = !item.isBought;
        return item;
      });
    case "CLEAR_ALL_ITEMS":
      return [];
    default:
      return state;
  }
}

export default groceryReducer;
