export enum AccountType {
  Income = "INCOME_ACCOUNT",
  Expense = "EXPENSE_ACCOUNT",
}

export interface AccountModel {
  name: string;
  code: string;
  parentCode: string;
  type: AccountType;
  isRelease: boolean;
}

export interface AccountStoreModel {
  accounts: Array<AccountModel>;
}
