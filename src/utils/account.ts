import { AccountModel, AccountType } from "@models/account";

const ghostProps: AccountModel = {
  name: "",
  type: AccountType.Ghost,
  isRelease: false,
  fullLabel: "",
  isGhost: true,
  code: "",
  parentCode: "",
  codeLabel: "",
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

  if (nextParentCode <= 999)
    return [...parentTail.reverse(), grandParentCode, parentId, nextParentCode].filter(item => item).join(".");
  else if (parentChildrenCount) return suggestNextCode([...parentTail.reverse(), grandParentCode].join("."), accounts);
}

export function getParentTree(codeLabel: string, accounts: Array<AccountModel> = []): Array<AccountModel> {
  const [parentCode, grandParentCode, ...parentTail] = codeLabel.split(".").reverse();
  const grandParentCodeLabel = [...parentTail.reverse(), grandParentCode].join(".");
  const currentLabel = grandParentCodeLabel ? [grandParentCodeLabel, parentCode].join(".") : parentCode;

  const hasCurrentLabel = accounts.some(account => account.codeLabel === currentLabel);
  if (grandParentCode)
    return getParentTree(
      grandParentCodeLabel,
      !hasCurrentLabel
        ? [...accounts, { ...ghostProps, code: parentCode, parentCode: grandParentCodeLabel, codeLabel }]
        : accounts,
    );

  return !hasCurrentLabel ? [...accounts, { ...ghostProps, code: parentCode, codeLabel: parentCode }] : accounts;
}

export function mountParentTree(accounts: Array<AccountModel>) {
  return accounts.reduce<Array<AccountModel>>(
    (prevAccounts, currAccount) => getParentTree(currAccount.parentCode, prevAccounts),
    accounts,
  );
}
