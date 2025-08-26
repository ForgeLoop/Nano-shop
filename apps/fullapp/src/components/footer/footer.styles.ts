import { CSSProperties } from "react";

export const footerStyles = {
    wrapper: {
        backgroundColor: "#333",
        color: "white",
        width: "100%",
    } as CSSProperties,
    container: (isMobile: boolean): CSSProperties => ({
        maxWidth: isMobile ? "100%" : "55%",
        margin: "0 auto",
        padding: isMobile ? "32px 4px 12px" : "48px 0px 24px",
    }),
    card: {
        borderRadius: "5px",
        backgroundColor: "#444",
        borderColor: "#555",
        textAlign: "center",
        height: "100%",
    } as CSSProperties,
    cardBody: (isMobile: boolean): CSSProperties => ({
        padding: isMobile ? 2 : undefined,
    }),
    icon: {
        fontSize: "32px",
        color: "#60a5fa",
        marginBottom: "16px",
    } as CSSProperties,
    cardTitle: (isMobile: boolean): CSSProperties => ({
        color: "white",
        marginBottom: "8px",
        fontSize: isMobile ? "14px" : "22px",
    }),
    logoDiv: {
        flex: 1,
        display: "flex",
        height: "100%",
        marginBottom: "16px",
    } as CSSProperties,
    logoImg: {
        objectFit: "contain" as const,
        display: "block",
        height: "auto",
        width: "120px",
    } as CSSProperties,
    description: (isMobile: boolean): CSSProperties => ({
        color: "#d1d5db",
        fontSize: isMobile ? "12px" : "14px",
        lineHeight: "1.6",
    }),
    sectionTitle: (isMobile: boolean, minHeight?: number): CSSProperties => ({
        color: "white",
        marginBottom: "16px",
        minHeight: minHeight || undefined,
        display: "flex",
        alignItems: "flex-end",
        fontSize: isMobile ? "16px" : "22px",
    }),
    link: (isMobile: boolean): CSSProperties => ({
        color: "#d1d5db",
        fontSize: isMobile ? "12px" : "14px",
    }),
    copyright: {
        backgroundColor: "#222",
        borderTop: "1px solid #555",
        textAlign: "center" as const,
        padding: "16px",
        color: "#9ca3af",
        fontSize: "14px",
        width: "100%",
        margin: "0 auto",
    } as CSSProperties,
    mainContentSpace: {
        width: "100%",
        padding: "10px",
    } as CSSProperties,
    mediaIcons: {
        width: "auto",
        marginRight: 8,
        verticalAlign: "middle"
    },
    copyrightText: {
        fontSize: "14px",
        color: "#9ca3af"
    } as CSSProperties,
    modalTitle: (isMobile: boolean): CSSProperties => ({
        color: "white",
        fontSize: isMobile ? "14px" : "22px",
        marginBottom: "12px",
    }),
    modalContent: {
        backgroundColor: "#444",
        borderColor: "#555",
        borderWidth: "2px",
        borderStyle: "solid",
        boxShadow: "none",
        color: "#fff",
        textAlign: "center",
        height: "100%",
        borderRadius: "5px"
    } as CSSProperties,
    modalContainer: (isMobile: boolean): CSSProperties => ({
        width: isMobile ? 200 : 280,
        margin: "0 auto"
    })
};