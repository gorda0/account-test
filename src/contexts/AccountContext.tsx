import { createContext, FC, PropsWithChildren } from "react";

import { Immutable } from "immer";
import { useImmer } from "use-immer";

import { AccountStoreModel, AccountModel } from "@models/account";

const initialState: Immutable<AccountStoreModel> = {
  accounts: [],
};

const useDispatchWrapper = () => {
  const [accountState, setAccountState] = useImmer(initialState);

  const addAccount = (account: AccountModel) =>
    setAccountState(draft => {
      draft.accounts.push(account);
    });

  return {
    ...accountState,
    addAccount,
  };
};

export const AccountContext = createContext(initialState as ReturnType<typeof useDispatchWrapper>);

export const AccountProvider: FC<PropsWithChildren> = ({ children }) => (
  <AccountContext.Provider value={useDispatchWrapper()}>{children}</AccountContext.Provider>
);
