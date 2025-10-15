import { accountStore } from "./Account/accountStore";

export class RootStore{
    accountStore = accountStore
}
const rootStore = new RootStore();
export default rootStore;