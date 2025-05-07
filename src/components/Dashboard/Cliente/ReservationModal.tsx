import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{ zIndex: 1000 }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative" }}
      >
        <button
          className="modal-close-button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Close reservation modal"
          type="button"
        >
          <CloseIcon fontSize="large" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ReservationModal;
