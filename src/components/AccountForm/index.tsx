import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

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
  const [isRelease, setIsRelease] = useState(initialIsRelease || true);

  const initialFormState = {
    code: initialCode || "",
    name: initialName || "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const parentOptions = previousAccounts
    .filter(account => (initialCode ? account.code !== formState.code : true))
    .map(account => ({
      label: `${account.code} - ${account.name}`,
      value: account.code,
    }));

  const setFormValue = (key: keyof typeof formState) => (value: string) =>
    setFormState({
      ...formState,
      [key]: value,
    });

  useEffect(() => {
    updateTempMethod(() => {
      onSubmit({ ...formState, isRelease, type: accountType, parentCode });
    });
  }, [formState]);

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

          setParentCode(state);
          setFormValue("code")(state + ".");
        }}
      />
      <Text>Código</Text>
      <Input onChangeText={setFormValue("code")} defaultValue={initialFormState.code} value={formState.code} />
      <Text>Nome</Text>
      <Input onChangeText={setFormValue("name")} defaultValue={initialFormState.name} />
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
