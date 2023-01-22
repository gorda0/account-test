import { createStorePrefix } from "@utils/prefix";
import { Immutable, produce } from "immer";

import { AccountModel, AccountStoreModel } from "@models/account";

const prefix = createStorePrefix("ACCOUNT");

export const initialState: Immutable<AccountStoreModel> = {
  accounts: [],
};

export const addAccount = (account: AccountModel) =>
  produce<AccountStoreModel>(draft => {
    draft.accounts.push(account);
  });
