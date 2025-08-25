import { wrap } from 'module';
import { CSSProperties } from 'react';

export const nosotrosStyles = {
    wrapper: (isMobile: boolean): CSSProperties => ({
        minHeight: "100vh",
        background: isMobile ? `linear-gradient(to bottom, #333 0%, #333 21%, #eeeeeeff 21%, #eeeeeeff 100%)` : `linear-gradient(to bottom, #333 0%, #333 35%, #eeeeeeff 35%, #eeeeeeff 100%)`,
        display: "flex",
        justifyContent: "center",
        padding: "0px 24px 50px",
    }),
    contactoWraper: (isMobile: boolean): CSSProperties => ({
        minHeight: "100%",
        background: isMobile ? `linear-gradient(to bottom, #333 0%, #333 55%, #eeeeeeff 55%, #eeeeeeff 100%)` : `linear-gradient(to bottom, #333 0%, #333 55%, #eeeeeeff 55%, #eeeeeeff 100%)`,
        display: "flex",
        justifyContent: "center",
        padding: "32px 24px 120px",
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