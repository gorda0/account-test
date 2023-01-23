import { View, Text, Button } from "react-native";
import Modal from "react-native-modal";

import colors from "@constants/colors";
import { Container } from "@screens/Account/styles";

interface DeleteModalProps {
  label: string;
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteModal = ({ label, isVisible, onCancel, onConfirm }: DeleteModalProps) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ backgroundColor: "white", borderRadius: 12 }}>
          <View>
            <Text>Deseja excluir a conta</Text>
            <Text>{label}</Text>
          </View>

          <Container style={{ marginBottom: 0, marginVertical: 0 }}>
            <Button title="Não!" onPress={onCancel} color={colors.magenta} />
            <View style={{ backgroundColor: colors.magenta, padding: 0 }}>
              <Button title="Com certeza" color="white" onPress={onConfirm} />
            </View>
          </Container>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
