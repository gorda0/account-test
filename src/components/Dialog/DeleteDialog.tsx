import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Feather";

import colors from "@constants/colors";
import testIds from "@constants/testIds";

import {
  ModalContainer,
  Box,
  CenteredContainer,
  TextContainer,
  BoldLabel,
  ButtonRow,
  CancelContainer,
  CancelText,
  ConfirmContainer,
  ConfirmText,
  MessageText,
} from "./styles";

interface DeleteModalProps {
  label: string;
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteModal = ({ label, isVisible, onCancel, onConfirm }: DeleteModalProps) => {
  return (
    <Modal testID={testIds.deleteDialog.modalId} isVisible={isVisible} onBackdropPress={onCancel}>
      <ModalContainer>
        <Box>
          <CenteredContainer>
            <Icon color={colors.magenta} size={40} name="trash" />
          </CenteredContainer>
          <TextContainer>
            <MessageText>Deseja excluir a conta</MessageText>
            <BoldLabel testID={testIds.deleteDialog.accountLabel}>{label}?</BoldLabel>
          </TextContainer>

          <ButtonRow>
            <CancelContainer>
              <TouchableOpacity testID={testIds.deleteDialog.cancelButton} onPress={onCancel}>
                <CancelText>Não!</CancelText>
              </TouchableOpacity>
            </CancelContainer>
            <ConfirmContainer>
              <TouchableOpacity testID={testIds.deleteDialog.confirmButton} onPress={onConfirm}>
                <ConfirmText>Com certeza</ConfirmText>
              </TouchableOpacity>
            </ConfirmContainer>
          </ButtonRow>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default DeleteModal;
