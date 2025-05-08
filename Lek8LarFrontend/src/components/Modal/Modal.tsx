import React, { useEffect } from "react";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (open) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            onClick={onClose}
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999,
                padding: 16,
            }}
        >
            <section
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: "#fff",
                    borderRadius: 16,
                    padding: 24,
                    width: "100%",
                    maxWidth: 480,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                }}
            >
                {title && <h2 id="modal-title">{title}</h2>}
                {children}
            </section>
        </div>
    );
};
