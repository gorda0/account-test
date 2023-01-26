export enum AccountType {
  Income = "INCOME_ACCOUNT",
  Expense = "EXPENSE_ACCOUNT",
  Ghost = "GHOST_ACCOUNT",
}

export type AccountError = {
  message: string;
};

export interface AccountModel {
  name: string;
  code: string;
  parentCode: string;
  type: AccountType;
  isRelease: boolean;
  codeLabel: string;
  fullLabel: string;
  isGhost?: boolean;
}

export interface AccountStoreModel {
  accounts: Array<AccountModel>;
  errors: Array<AccountError>;
  filterItems: Array<AccountModel>;
  isSearching: boolean;
}
