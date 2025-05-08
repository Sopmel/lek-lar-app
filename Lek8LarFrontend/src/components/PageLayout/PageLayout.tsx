import React from "react";

type PageLayoutProps = {
    children: React.ReactNode;
};

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                overflowY: "auto",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 960,

                }}
            >
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/images/leklarlogo.png"
                        alt="Lek & Lär logga"
                        style={{
                            width: "420px",
                            maxWidth: "80vw",
                            height: "auto",
                            opacity: 0.95,
                        }}
                    />
                    <img
                        src="/images/maskot-vink.png"
                        alt="Maskot"
                        style={{
                            width: "300px",
                            maxWidth: "20vw",
                            height: "auto",
                            marginLeft: "8px",
                        }}
                    />
                </div>
                {children}
            </div>
        </div>
    );
};
