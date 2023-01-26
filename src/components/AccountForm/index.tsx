import React, { useEffect, useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import colors from "@constants/colors";
import testIds from "@constants/testIds";
import { mountParentTree, suggestNextCode } from "@utils/account";

import { AccountModel, AccountType } from "@models/account";

import { Input, Label } from "./styles";

interface AccountFormProps {
  initialValues?: Partial<AccountModel>;
  previousAccounts: Array<AccountModel>;
  updateTempMethod: (method: () => void) => void;
  onSubmit: (data: AccountModel) => void;
}
const AccountForm = ({ onSubmit, initialValues, previousAccounts, updateTempMethod }: AccountFormProps) => {
  const {
    codeLabel: initialCode,
    parentCode: initialParentCode,
    name: initialName,
    isRelease: initialIsRelease,
    type: initialType,
  } = initialValues || {};

  const [openParentCodePicker, setOpenParentCodePicker] = useState(false);
  const [parentCode, setParentCode] = useState(initialParentCode || "");

  const [accountTypePicker, setAccountTypePicker] = useState(false);
  const [accountType, setAccountType] = useState(
    initialType ||
      (parentCode !== "" && previousAccounts.find(prevAccount => prevAccount.code === parentCode)?.type) ||
      AccountType.Income,
  );

  const [openReleasePicker, setOpenReleasePicker] = useState(false);
  const [isRelease, setIsRelease] = useState(!!initialIsRelease);

  const initialFormState = {
    code: initialCode || "",
    name: initialName || "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const parentOptions = previousAccounts.map(account => ({
    label: account.fullLabel,
    value: account.codeLabel,
    disabled: !account.isRelease,
    key: account.fullLabel,
    parent: account.parentCode || undefined,
    testID: account.fullLabel,
  }));

  const setFormValue = (key: keyof typeof formState) => (value: string) =>
    setFormState({
      ...formState,
      [key]: value,
    });

  const codeLabel = `${parentCode !== "" ? formState.code : formState.code}`;

  useEffect(() => {
    updateTempMethod(() => {
      onSubmit({
        ...formState,
        isRelease,
        type: accountType,
        parentCode,
        code: formState.code.split(".").reverse()[0],
        codeLabel,
        fullLabel: `${codeLabel} - ${formState.name}`,
      });
    });
  }, [formState, accountType, parentCode, isRelease]);

  return (
    <View>
      <Label>Conta pai</Label>
      <View style={{ zIndex: 1000 }}>
        <DropDownPicker
          open={openParentCodePicker}
          value={parentCode}
          items={parentOptions}
          setOpen={setOpenParentCodePicker}
          setValue={value => {
            const state = value((_: string) => null);
            const selected = previousAccounts.find(account => account.codeLabel === state);

            setParentCode(state);
            setFormValue("code")(
              suggestNextCode(selected?.codeLabel || state, mountParentTree(previousAccounts)) || "",
            );
            if (selected) setAccountType(selected.type);
          }}
          style={{ borderWidth: 0 }}
          labelStyle={{ fontSize: 18, color: colors.grayBold }}
          searchable
          searchPlaceholder="Pesquisar contas"
          placeholder="Selecionar uma conta"
          placeholderStyle={{ fontSize: 18, color: colors.grayBold }}
          dropDownContainerStyle={{ borderWidth: 0.5 }}
          closeOnBackPressed
          zIndex={3000}
          zIndexInverse={1000}
          disabledItemLabelStyle={{ color: colors.grayLight }}
          translation={{
            NOTHING_TO_SHOW: "Nenhuma conta registrada",
          }}
          itemSeparator
          testID={testIds.account.parentCodePicker}
        />
      </View>
      <Label>Código</Label>
      <Input
        testID={testIds.account.accountCodeInput}
        onChangeText={value => {
          const [_, ...tail] = value.split(".").reverse();

          if (tail && tail.length) {
            setParentCode(tail.reverse().join("."));
          }

          setFormValue("code")(value);
        }}
        defaultValue={initialFormState.code}
        value={formState.code}
      />
      <Label>Nome</Label>
      <Input
        testID={testIds.account.accountNameInput}
        onChangeText={setFormValue("name")}
        defaultValue={initialFormState.name}
      />
      <Label>Tipo</Label>
      <View style={{ zIndex: 1005 }}>
        <DropDownPicker
          open={accountTypePicker}
          value={accountType}
          items={[
            { label: "Receita", value: AccountType.Income },
            { label: "Despesa", value: AccountType.Expense },
          ]}
          setOpen={setAccountTypePicker}
          setValue={setAccountType}
          disabled={parentCode !== ""}
          disabledStyle={{ backgroundColor: colors.grayLight }}
          style={{ borderWidth: 0 }}
          labelStyle={{ fontSize: 18, color: colors.grayBold }}
          closeOnBackPressed
          placeholderStyle={{ fontSize: 18, color: colors.grayBold }}
          dropDownContainerStyle={{ borderWidth: 0.5 }}
          zIndex={2000}
          zIndexInverse={2000}
          testID={testIds.account.accountTypePicker}
        />
      </View>
      <Label>Aceita lançamentos</Label>
      <View style={{ zIndex: 1001 }}>
        <DropDownPicker
          open={openReleasePicker}
          value={isRelease}
          items={[
            { label: "Sim", value: true },
            { label: "Não", value: false },
          ]}
          setOpen={setOpenReleasePicker}
          setValue={setIsRelease}
          style={{ borderWidth: 0 }}
          labelStyle={{ fontSize: 18, color: colors.grayBold }}
          closeOnBackPressed
          placeholderStyle={{ fontSize: 18, color: colors.grayBold }}
          dropDownContainerStyle={{ borderWidth: 0.5 }}
          zIndex={1000}
          zIndexInverse={3000}
          testID={testIds.account.isReleasePicker}
        />
      </View>
    </View>
  );
};

export default AccountForm;
