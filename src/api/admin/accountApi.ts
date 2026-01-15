import { baseApi, type DataResponse, type Query } from "../baseApi";

export interface AccountItem {
  userId: number;
  username: string;
  email: string;
  totalOrder: number;
  totalSpending: number;
  createdAt: number;
}

export interface AccountPage {
  content: AccountItem[];
  pageNo: number;
  pageSize: number;
  totalElement: number;
  totalPages: number;
  last: boolean;
}

const accountApi = {
  list: (params: Query) =>
    baseApi
      .get<DataResponse<AccountPage>>("/admin/account", { params })
      .then((res) => res.data),
  detail: (userId: number) =>
    baseApi
      .get<DataResponse<AccountItem>>(`/admin/account/${userId}`)
      .then((res) => res.data),
};

export default accountApi;

