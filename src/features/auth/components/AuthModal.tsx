import { Modal } from "@/shared/components/ui/Modal";
import { LoginForm } from "@/features/auth/components/LoginForm";
import ModalIcon from "@/shared/components/ui/assets/modal-icon.svg";

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <img
        src={ModalIcon}
        alt="modal icon"
        className="mb-[32px] h-[52px] w-[52px] justify-self-center"
        style={{
          filter: "drop-shadow(0px 12px 6px rgba(0, 0, 0, 0.03))",
        }}
      />
      <div className="text-center mb-[32px]">
        <span className="text-[40px] font-semibold text-gray-60 leading-[110%] mb-3">
          Добро пожаловать
        </span>
        <p className="font-medium text-[18px] text-gray-20 leading-[150%] inner-shadow-text">
          Пожалуйста, авторизуйтесь
        </p>
      </div>

      <LoginForm />
    </Modal>
  );
}
