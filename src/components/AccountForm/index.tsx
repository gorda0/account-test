import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { suggestNextCode } from "@contexts/AccountContext";

import { AccountModel, AccountType } from "@models/account";

import { Input } from "./styles";

interface AccountFormProps {
  initialValues?: Partial<AccountModel>;
  previousAccounts: Array<AccountModel>;
  updateTempMethod: (method: () => void) => void;
  onSubmit: (data: AccountModel) => void;
}

const AccountForm = ({ onSubmit, initialValues, previousAccounts, updateTempMethod }: AccountFormProps) => {
  const {
    code: initialCode,
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
    value: account.code,
    disabled: !account.isRelease,
    key: account.fullLabel,
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
      <Text>Conta pai</Text>
      <DropDownPicker
        open={openParentCodePicker}
        value={parentCode}
        items={parentOptions}
        setOpen={setOpenParentCodePicker}
        setValue={value => {
          const state = value((_: string) => null);
          const selected = previousAccounts.find(account => account.code === state);

          setParentCode(state);
          setFormValue("code")(suggestNextCode(state, previousAccounts) || "");
          if (selected) setAccountType(selected.type);
        }}
      />
      <Text>Código</Text>
      <Input
        testID="input-code"
        onChangeText={setFormValue("code")}
        defaultValue={initialFormState.code}
        value={formState.code}
      />
      <Text>Nome</Text>
      <Input testID="input-name" onChangeText={setFormValue("name")} defaultValue={initialFormState.name} />
      <Text>Tipo</Text>
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
      />
      <Text>Aceita lançamentos</Text>
      <DropDownPicker
        open={openReleasePicker}
        value={isRelease}
        items={[
          { label: "Sim", value: true },
          { label: "Não", value: false },
        ]}
        setOpen={setOpenReleasePicker}
        setValue={setIsRelease}
      />
    </View>
  );
};

export default AccountForm;
