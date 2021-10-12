import style from "./GroceryList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";

export default function GroceryList() {
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const input1 = useRef("");
  const [updatedItem, setUpdatedItem] = useState([]);
  const [isSort, setIsSort] = useState(false);
  const groceryItems = useSelector((state) => state);

  const dispatch = useDispatch();

  //useEffect for filter
  useEffect(() => {
    function updateData() {
      setUpdatedItem(
        groceryItems
          .slice()
          .filter((item) =>
            item.itemName.toLowerCase().includes(query.toLocaleLowerCase())
          )
      );
    }
    const timeout = setTimeout(updateData, 500);

    return function () {
      clearTimeout(timeout);
    };
  }, [query, groceryItems]);

  // useEffect for sorting
  useEffect(() => {
    function sortData() {
      setUpdatedItem(
        isSort
          ? groceryItems.slice().sort((a, b) => {
              if (a.itemName < b.itemName) {
                return -1;
              }
              if (a.itemName > b.itemName) {
                return 1;
              }
              return 0;
            })
          : groceryItems
      );
    }
    const timeout = setTimeout(sortData, 500);

    return function () {
      clearTimeout(timeout);
    };
  }, [isSort]);

  function addValue(e) {
    setValue(e.target.value);
  }

  // Add item button
  function addItemBtnClick() {
    dispatch({
      type: "ADD_GROCERY",
      item: {
        itemID: groceryItems.length + 1,
        itemName: value,
        qty: 1,
        isBought: false,
      },
    });
    setValue("");
    input1.current.focus();
  }

  // Toggle buy function
  function toggleBuy(itemID) {
    dispatch({
      type: "TOGGLE_BUY",
      id: itemID,
    });
  }

  // Clear Item function
  function clearAllItem() {
    dispatch({
      type: "CLEAR_ALL_ITEMS",
    });
  }

  // Sorting function
  function sortItems() {
    setIsSort(!isSort);
  }

  // filtering function
  function filterItem(e) {
    setQuery(e.target.value);
  }
  // return

  return (
    <div className={style.flexContainer}>
      <div>
        <label>Add items: </label>
        <input
          ref={input1}
          type="text"
          placeholder="Add items"
          value={value}
          onChange={addValue}
        />{" "}
        <button
          type="button"
          style={{ backgroundColor: "green" }}
          onClick={addItemBtnClick}
        >
          Add Item
        </button>
      </div>
      <div style={{ textAlign: "right" }}>
        <input
          type="text"
          value={query}
          placeholder="Enter item name to search"
          onChange={filterItem}
        />
      </div>
      <div className={style.tableFixHead}>
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Items</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {updatedItem.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={item.isBought ? style.bought : ""}
                  onClick={() => toggleBuy(item.itemID)}
                >
                  <td>{index + 1}</td>
                  <td>{item.itemName}</td>
                  <td>{item.qty}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <button
          type="button"
          style={{ background: "red" }}
          onClick={clearAllItem}
        >
          Clear All
        </button>{" "}
        <button
          type="button"
          style={{ background: "blue" }}
          onClick={sortItems}
        >
          Sort Items Alphabatically
        </button>
      </div>
    </div>
  );
}
