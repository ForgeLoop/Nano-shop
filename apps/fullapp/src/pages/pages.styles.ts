import { CSSProperties } from 'react';

export const nosotrosStyles = {
    wrapper: (isMobile: boolean): CSSProperties => ({
        minHeight: "100vh",
        background: isMobile ? `linear-gradient(to bottom, #333 0%, #333 29%, #eeeeeeff 29%, #eeeeeeff 100%)` : `linear-gradient(to bottom, #333 0%, #333 40%, #eeeeeeff 40%, #eeeeeeff 100%)`,
        display: "flex",
        justifyContent: "center",
        padding: "0px 24px 50px",
    }),
    contactoWraper: (isMobile: boolean): CSSProperties => ({
        minHeight: "100%",
        background: isMobile ? `linear-gradient(to bottom, #333 0%, #333 62%, #eeeeeeff 62%, #eeeeeeff 100%)` : `linear-gradient(to bottom, #333 0%, #333 68%, #eeeeeeff 68%, #eeeeeeff 100%)`,
        display: "flex",
        justifyContent: "center",
        padding: "0px 24px 120px",
    }),
    contactoDescription: (isMobile: boolean): CSSProperties => ({
        fontSize: isMobile ? "14px" : "18px",
        lineHeight: "1.7",
        color: "#ffffff",
        maxWidth: "600px",
    }),
    logoImage: (isMobile: boolean): CSSProperties => ({
        width: isMobile ? "40%" : "50%",
    }),
    image: {
        maxHeight: "400px",
        maxWidth: "100%",
        borderRadius: "5px",
        marginBottom: "48px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
    },
    description: (isMobile: boolean): CSSProperties => ({
        fontSize: isMobile ? "14px" : "18px",
        lineHeight: "1.7",
        color: "#2c3e50",
        maxWidth: "600px",
        margin: "0 auto",
    })
}

export const contactoStyles = {

}

export const adminStyles = {
    menuTitle: {
        textAlign: "center",
        marginBottom: "24px"
    } as CSSProperties,
    menuContentContainerMobile: {
        padding: "16px",
    } as CSSProperties,
    menuContentContainer: {
        padding: "32px",
    } as CSSProperties,
    cardItem: {
        borderRadius: "5px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    } as CSSProperties,
    cardItemContent: {
        display: "flex",
        alignItems: "center",
        gap: "12px"
    } as CSSProperties,
    imgItem: {
        width: "60px",
        height: "60px",
        objectFit: "cover",
        borderRadius: "5px",
        flexShrink: 0,
    } as CSSProperties,
    noImgItem: {
        width: "60px",
        height: "60px",
        backgroundColor: "#f0f0f0",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    } as CSSProperties,
    iconItem: {
        fontSize: "24px",
        color: "#999"
    } as CSSProperties,
    itemTitle: {
        fontSize: "16px",
        display: "block"
    } as CSSProperties,
    itemDescription: {
        fontSize: "14px",
        color: "#666"
    } as CSSProperties,
    itemPrice: {
        fontSize: "16px",
        color: "#52c41a",
        fontWeight: "600"
    } as CSSProperties,
    createItemButton: {
        marginTop: 16,
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#555",
        boxShadow: "0 2px 8px rgba(85,85,85,0.25)",
        border: "none",
        color: "#fff",
    } as CSSProperties,
    container: {
        minHeight: "100vh",
        background: "#444"
    } as CSSProperties,
    layout: (isMobile: boolean): CSSProperties => ({
        minHeight: "100vh",
        width: isMobile ? "100%" : "60%",
        margin: "0 auto"
    }),
    menuSidebar: {
        height: "100%",
        borderRight: 0,
        fontSize: 16,
        backgroundColor: "#333",
        color: "#fff",
        paddingTop: 20,
    } as CSSProperties,
    contentContainer: (isMobile: boolean): CSSProperties => ({
        background: "#f4f4f4",
        maxWidth: isMobile ? "100vw" : "100%",
        overflowX: isMobile ? "hidden" : "visible",
        paddingBottom: isMobile ? "80px" : "0",
    }),
    createItemFloatButton: {
        right: 24,
        bottom: 24,
        width: 56,
        height: 56,
    } as CSSProperties,
    formAddImage: {
        width: 80,
        height: 80,
        objectFit: "cover",
        borderRadius: 8
    } as CSSProperties,
}