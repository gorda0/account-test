import { View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Feather";

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
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            maxWidth: "80%",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingVertical: 40,
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Icon color={colors.magenta} size={40} name="trash" />
          </View>
          <View style={{ alignItems: "center", justifyContent: "center", marginVertical: 20 }}>
            <Text>Deseja excluir a conta</Text>
            <Text style={{ fontWeight: "600" }}>{label}?</Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 0, marginVertical: 0, justifyContent: "space-between" }}>
            <View style={{ flex: 1, padding: 0 }}>
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center", minHeight: 50 }}
                onPress={onCancel}
              >
                <Text style={{ color: colors.magenta }}>Não!</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2, backgroundColor: colors.magenta, padding: 0, borderRadius: 80 }}>
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center", minHeight: 50 }}
                onPress={onConfirm}
              >
                <Text style={{ color: "white" }}>Com certeza</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
