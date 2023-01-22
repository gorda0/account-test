import React, { ComponentProps, useState } from "react";
import { Text, TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AccountModel, AccountType } from "@models/account";

const Input = (props: ComponentProps<typeof TextInput>) => {
  return (
    <TextInput
      {...props}
      style={{
        borderWidth: 1,
      }}
    />
  );
};

interface AccountFormProps {
  initialValues?: Partial<AccountModel>;
  onSubmit: (data: AccountModel) => void;
}

const AccountForm = ({ onSubmit, initialValues }: AccountFormProps) => {
  const {
    code: initialCode,
    parentCode: initialParentCode,
    name: initialName,
    isRelease: initialIsRelease,
    type: initialType,
  } = initialValues || {};

  const initialFormState = {
    code: initialCode || "",
    parentCode: initialParentCode || "",
    name: initialName || "",
  };

  const [formState, setFormState] = useState(initialFormState);

  const setFormValue = (key: keyof typeof formState) => (value: string) =>
    setFormState({
      ...formState,
      [key]: value,
    });

  const [accountTypePicker, setAccountTypePicker] = useState(false);
  const [accountType, setAccountType] = useState(initialType || AccountType.Income);

  const [openReleasePicker, setOpenReleasePicker] = useState(false);
  const [isRelease, setIsRelease] = useState(initialIsRelease || false);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => onSubmit({ ...formState, isRelease, type: accountType })}>
        <Text>treste</Text>
      </TouchableOpacity>
      <Text>Conta pai</Text>
      <Input onChangeText={setFormValue("parentCode")} defaultValue={initialFormState.parentCode} />
      <Text>Código</Text>
      <Input onChangeText={setFormValue("code")} defaultValue={initialFormState.code} />
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
