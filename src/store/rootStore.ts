import { accountStore } from "./Account/accountStore";
import { productStore } from "./Product/productStore";

export class RootStore{
    accountStore = accountStore;
    productStore = productStore
}
const rootStore = new RootStore();
export default rootStore;