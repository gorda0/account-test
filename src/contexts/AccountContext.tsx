import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";

import { getData, saveData } from "@utils/storage";
import { Immutable } from "immer";
import { WritableDraft } from "immer/dist/internal";
import { useImmer } from "use-immer";

import { AccountStoreModel, AccountModel } from "@models/account";

const emptyTempMethod = {
  method: () => {
    return;
  },
};

const initialState: Immutable<AccountStoreModel> = {
  accounts: [],
};

const useStateWrapper = () => {
  const [tempMethod, setTempMethod] = useState(emptyTempMethod);

  const [accountState, setAccountState] = useImmer(initialState);

  const updateTempMethod = (method: () => void) => setTempMethod({ method });
  const resetTempMethod = () => setTempMethod(emptyTempMethod);

  const addAccount = (account: AccountModel) =>
    setAccountState(draft => {
      draft.accounts = draft.accounts.filter(previousAccount => previousAccount.code !== account.code);
      draft.accounts.push(account);
    });

  const removeAccount = (code: string) =>
    setAccountState(draft => {
      draft.accounts = draft.accounts.filter(account => account.code !== code && account.parentCode !== code);
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
    tempMethod,
    addAccount,
    removeAccount,
    getAccountData,
    updateTempMethod,
    resetTempMethod,
  };
};

export const AccountContext = createContext(initialState as ReturnType<typeof useStateWrapper>);

export const AccountProvider: FC<PropsWithChildren> = ({ children }) => (
  <AccountContext.Provider value={useStateWrapper()}>{children}</AccountContext.Provider>
);
