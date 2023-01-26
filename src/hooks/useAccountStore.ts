import { useImmer } from "use-immer";

import { AccountStoreModel, AccountModel } from "@models/account";

const useAccountStore = (accounts: AccountStoreModel) => {
  const [accountState, setAccountState] = useImmer(accounts);

  const popErrors = () =>
    setAccountState(draft => {
      if (draft.errors.length) draft.errors = draft.errors.slice(0, -1);
    });
  const cleanErrors = () =>
    setAccountState(draft => {
      draft.errors = [];
    });

  const addAccount = (account: AccountModel) => {
    setAccountState(draft => {
      const matchedAccounts = draft.accounts.find(previousAccount => previousAccount.codeLabel === account.codeLabel);

      if (matchedAccounts) {
        draft.errors.push({ message: "Conta já existente" });
      } else {
        draft.accounts.push({
          ...account,
          parentCode:
            account.parentCode !== "" ? account.parentCode : account.codeLabel.split(".").splice(0, -1).join("."),
        });

        draft.accounts.sort((a, b) =>
          a.codeLabel.localeCompare(b.codeLabel, undefined, { numeric: true, sensitivity: "base" }),
        );
      }
    });
  };

  const editAccount = (account: AccountModel) =>
    setAccountState(draft => {
      draft.accounts = draft.accounts.map(draftAccount =>
        draftAccount.codeLabel === account.codeLabel ? account : draftAccount,
      );
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
