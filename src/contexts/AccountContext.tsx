import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";

import useAccountStore from "@hooks/useAccountStore";
import { getData, saveData } from "@utils/storage";
import { WritableDraft } from "immer/dist/internal";

import { AccountStoreModel, AccountModel } from "@models/account";

const initialState: AccountStoreModel = {
  accounts: [],
  filterItems: [],
  isSearching: false,
};

const emptyTempMethod = {
  method: () => {
    return;
  },
};

export function suggestNextCode(parentCode: string, accounts: Array<AccountModel>): string | undefined {
  const [parentId, grandParentCode, ...parentTail] = parentCode
    .split(".")
    .reverse()
    .filter(item => item);

  const parentChildren = accounts.filter(account => account.parentCode === parentCode);

  const parentChildrenCount = parentChildren.length;
  const parentGreaterChild =
    Number(parentChildren.sort((a, b) => Number(a.code) - Number(b.code))[parentChildrenCount - 1]?.code) || 0;

  const nextParentCode = Number(parentGreaterChild + 1);

  if (nextParentCode <= 999) {
    return [...parentTail.reverse(), grandParentCode, parentId, nextParentCode].filter(item => item).join(".");
  } else if (parentChildrenCount) {
    return suggestNextCode([...parentTail, grandParentCode].join("."), accounts);
  }
}

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
