import { TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Feather";

import colors from "@constants/colors";
import testIds from "@constants/testIds";

import {
  ModalContainer,
  Box,
  CenteredContainer,
  TextContainer,
  ButtonRow,
  ConfirmContainer,
  ConfirmText,
  MessageText,
} from "./styles";

interface DeleteModalProps {
  message: string;
  isVisible: boolean;
  onConfirm: () => void;
}

const MessageDialog = ({ message, isVisible, onConfirm }: DeleteModalProps) => {
  return (
    <Modal testID={testIds.messageDialog.modalId} isVisible={isVisible} onBackdropPress={onConfirm}>
      <ModalContainer>
        <Box>
          <CenteredContainer>
            <Icon color={colors.magenta} size={40} name="alert-triangle" />
          </CenteredContainer>
          <TextContainer>
            <MessageText testID={testIds.messageDialog.messageLabel}>{message}</MessageText>
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
