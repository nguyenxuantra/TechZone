import React from "react";
import rootStore from "../store/rootStore";




export const RootStoreContext = React.createContext(rootStore);
export const useRootStore = () => React.useContext(RootStoreContext);