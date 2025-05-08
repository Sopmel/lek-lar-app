type CardProps = {
    children: React.ReactNode;
    title?: React.ReactNode;
    headStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    headerBgColor?: string;
};

export const Card: React.FC<CardProps> = ({
    children,
    title,
    headStyle,
    style,
    headerBgColor = "#ffc0cb",
}) => {
    return (
        <section
            style={{
                backgroundColor: "#fff",
                padding: 24,
                borderRadius: 24,
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                overflowY: "auto",
                ...style,
            }}
        >
            {title && (
                <header
                    style={{
                        backgroundColor: headerBgColor,
                        textAlign: "center",
                        borderRadius: "12px 12px 0 0",
                        padding: "12px 0",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        ...headStyle,
                    }}
                >
                    {title}
                </header>
            )}
            <div style={{ marginTop: title ? 24 : 0 }}>{children}</div>
        </section>
    );
};
