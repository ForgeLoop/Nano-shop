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