import ReactProps from "./ReactProps";

export interface ModalProps extends ReactProps {
  isOpen: boolean;
  closeModal: () => void;
}
