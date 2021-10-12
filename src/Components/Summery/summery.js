import { useSelector } from "react-redux";
import styles from "./Summery.module.css";
export default function Summery() {
  const groceryItems = useSelector((state) => state);
  const totalItem = groceryItems.length;
  const totalItemBought = groceryItems.filter((item) => item.isBought).length;
  return (
    <div className={styles.flexContainer}>
      <div className={styles.card}>
        <p>
          <strong>Total Items:</strong> {totalItem}
        </p>
        <p>
          <strong>Total number of item bought:</strong> {totalItemBought}
        </p>
        <p>
          <strong>Total number of item not bought:</strong>{" "}
          {totalItem - totalItemBought}
        </p>
      </div>
    </div>
  );
}
