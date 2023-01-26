import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";

import useAccountStore from "@hooks/useAccountStore";
import { getData, saveData } from "@utils/storage";
import { WritableDraft } from "immer/dist/internal";

import { AccountStoreModel } from "@models/account";

const initialState: AccountStoreModel = {
  accounts: [],
  filterItems: [],
  isSearching: false,
  errors: [],
};

const emptyTempMethod = {
  method: () => {
    return;
  },
};

const useStateWrapper = () => {
  const [hasBooted, setHasBooted] = useState(false);
  const [tempMethod, setTempMethod] = useState(emptyTempMethod);

  const { setAccountState, ...accountState } = useAccountStore(initialState);

  const updateTempMethod = (method: () => void | undefined) => setTempMethod({ method });
  const resetTempMethod = () => setTempMethod(emptyTempMethod);

  const bootStorage = async () => {
    const storedState = await getData<WritableDraft<typeof initialState>>();

    if (storedState?.accounts?.length)
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
