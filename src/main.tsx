import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";

import { RootStoreContext } from "./contexts/RootStoreContext.ts";
import rootStore from "./store/rootStore.ts";

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <RootStoreContext.Provider value={rootStore}>
      <App />
    </RootStoreContext.Provider>
  </CartProvider>
);
