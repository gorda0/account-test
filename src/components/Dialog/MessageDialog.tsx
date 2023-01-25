import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Feather";

import testIds from "@constants/testIds";

import {
  ModalContainer,
  Box,
  CenteredContainer,
  TextContainer,
  BoldLabel,
  ButtonRow,
  ConfirmContainer,
  ConfirmText,
  MessageText,
} from "./styles";

interface DeleteModalProps {
  label: string;
  message: string;
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const MessageDialog = ({ label, message, isVisible, onConfirm }: DeleteModalProps) => {
  return (
    <Modal testID={testIds.messageDialog.modalId} isVisible={isVisible} onBackdropPress={onConfirm}>
      <ModalContainer>
        <Box>
          <CenteredContainer>
            <Icon color="yellow" size={40} name="warning" />
          </CenteredContainer>
          <TextContainer>
            <MessageText>{message}</MessageText>
            <BoldLabel testID={testIds.deleteDialog.accountLabel}>{label}?</BoldLabel>
          </TextContainer>

          <ButtonRow>
            <ConfirmContainer>
              <TouchableOpacity testID={testIds.messageDialog.confirmButton} onPress={onConfirm}>
                <ConfirmText>Ok!</ConfirmText>
              </TouchableOpacity>
            </ConfirmContainer>
          </ButtonRow>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default MessageDialog;
