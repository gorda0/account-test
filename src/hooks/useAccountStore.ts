import { useState } from "react";

import { useImmer } from "use-immer";

import { AccountStoreModel, AccountModel, AccountError } from "@models/account";

const useAccountStore = (accounts: AccountStoreModel) => {
  const [accountState, setAccountState] = useImmer(accounts);
  const [errors, setErrors] = useState<Array<AccountError>>([]);

  const pushError = (error: AccountError) => setErrors([...errors, error]);
  const popErrors = () => {
    if (errors.length) setErrors(errors.slice(0, -1));
  };
  const cleanErrors = () => setErrors([]);

  const addAccount = (account: AccountModel) => {
    setAccountState(draft => {
      let hasErrors = false;
      const matchedAccounts = draft.accounts.find(
        previousAccount =>
          previousAccount.code === (account.parentCode !== "" ? account.parentCode + "." + account.code : account.code),
      );

      if (matchedAccounts) {
        hasErrors = true;
        pushError({ message: "Conta já existente" });
      }

      if (!hasErrors) {
        draft.accounts.push(account);
      }
    });
  };

  const editAccount = (account: AccountModel) =>
    setAccountState(draft => {
      draft.accounts = draft.accounts.filter(previousAccount => previousAccount.fullLabel !== account.fullLabel);
      draft.accounts.push(account);
    });

  const removeAccount = (account: AccountModel) => {
    setAccountState(draft => {
      draft.accounts = draft.accounts.filter(previousAccount => previousAccount.fullLabel !== account.fullLabel);
    });
  };

  const getAccountData = (code: string) => accountState.accounts.find(account => account.fullLabel === code);
  const setFilterItems = (filteredAccounts: Array<AccountModel>, searchString: string) =>
    setAccountState(draft => {
      draft.filterItems = filteredAccounts;
      draft.isSearching = searchString !== "";
    });
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
    setFilterItems,
  };
};

export default useAccountStore;
