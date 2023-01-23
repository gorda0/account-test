import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";

import { getData, saveData } from "@utils/storage";
import { WritableDraft } from "immer/dist/internal";
import { useImmer } from "use-immer";

import { AccountStoreModel, AccountModel } from "@models/account";

type AccountError = {
  message: string;
};

const emptyTempMethod = {
  method: () => {
    return;
  },
};

const initialState: AccountStoreModel = {
  accounts: [],
};

const useAccountStore = (accounts: AccountStoreModel) => {
  const [accountState, setAccountState] = useImmer(accounts);
  const [errors, setErrors] = useState<Array<AccountError>>([]);

  const pushError = (error: AccountError) => setErrors([...errors, error]);
  const popErrors = () => {
    if (errors.length) setErrors(errors.slice(0, -1));
  };
  const cleanErrors = () => setErrors([]);

  const addAccount = (account: AccountModel) =>
    setAccountState(draft => {
      let hasErrors = false;
      const matchedAccounts = draft.accounts.find(previousAccount => previousAccount.code === account.code);

      if (matchedAccounts) {
        hasErrors = true;
        pushError({ message: "Conta já existente" });
      }

      if (!hasErrors) {
        draft.accounts.push(account);
      }
    });

  const editAccount = (account: AccountModel) =>
    setAccountState(draft => {
      draft.accounts = draft.accounts.filter(previousAccount => previousAccount.code !== account.code);
      draft.accounts.push(account);
    });

  const removeAccount = (code: string) =>
    setAccountState(draft => {
      draft.accounts = draft.accounts.filter(account => account.code !== code && account.parentCode !== code);
    });

  const getAccountData = (code: string) => accountState.accounts.find(account => account.code === code);

  return {
    ...accountState,
    errors,
    addAccount,
    editAccount,
    removeAccount,
    getAccountData,
    setAccountState,
    popErrors,
    cleanErrors,
  };
};

const useStateWrapper = () => {
  const [hasBooted, setHasBooted] = useState(false);
  const [tempMethod, setTempMethod] = useState(emptyTempMethod);

  const { setAccountState, ...accountState } = useAccountStore(initialState);

  const updateTempMethod = (method: () => void) => setTempMethod({ method });
  const resetTempMethod = () => setTempMethod(emptyTempMethod);

  const bootStorage = async () => {
    const storedState = await getData<WritableDraft<typeof initialState>>();

    if (storedState?.accounts.length)
      setAccountState(draft => {
        draft.accounts = storedState.accounts;
      });

    setHasBooted(true);
  };

  useEffect(() => {
    if (hasBooted) saveData({ accounts: accountState.accounts });
  }, [accountState.accounts]);

  useEffect(() => {
    bootStorage();
  }, []);

  return {
    ...accountState,
    tempMethod,
    updateTempMethod,
    resetTempMethod,
  };
};

export const AccountContext = createContext(initialState as ReturnType<typeof useStateWrapper>);

export const AccountProvider: FC<PropsWithChildren> = ({ children }) => (
  <AccountContext.Provider value={useStateWrapper()}>{children}</AccountContext.Provider>
);
