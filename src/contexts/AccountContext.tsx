import { createContext, FC, PropsWithChildren, useEffect } from "react";

import { getData, saveData } from "@utils/storage";
import { Immutable } from "immer";
import { WritableDraft } from "immer/dist/internal";
import { useImmer } from "use-immer";

import { AccountStoreModel, AccountModel } from "@models/account";

const initialState: Immutable<AccountStoreModel> = {
  accounts: [],
};

const useDispatchWrapper = () => {
  const [accountState, setAccountState] = useImmer(initialState);

  const addAccount = (account: AccountModel) =>
    setAccountState(draft => {
      draft.accounts = draft.accounts.filter(previousAccount => previousAccount.code !== account.code);
      draft.accounts.push(account);
    });

  const removeAccount = (code: string) =>
    setAccountState(draft => {
      draft.accounts = draft.accounts.filter(account => account.code !== code);
    });

  const getAccountData = (code: string) => accountState.accounts.find(account => account.code === code);

  const bootStorage = async () => {
    const storedState = await getData<WritableDraft<typeof initialState>>();

    if (storedState?.accounts.length) {
      setAccountState(draft => {
        draft.accounts = storedState.accounts;
      });
    }
  };

  useEffect(() => {
    saveData(accountState);
  }, [accountState]);

  useEffect(() => {
    bootStorage();
  }, []);

  return {
    ...accountState,
    addAccount,
    removeAccount,
    getAccountData,
  };
};

export const AccountContext = createContext(initialState as ReturnType<typeof useDispatchWrapper>);

export const AccountProvider: FC<PropsWithChildren> = ({ children }) => (
  <AccountContext.Provider value={useDispatchWrapper()}>{children}</AccountContext.Provider>
);
