import styles from "./LandingPage.module.css";

import Header from "../Header/header";
import GroceryList from "../GroceryList/groceryList";
import Summery from "../Summery/summery";

export default function LandingPage() {
  return (
    <>
      <Header />
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <GroceryList />
        </div>
        <div className={styles.gridItem}>
          <Summery />
        </div>
      </div>
    </>
  );
}
