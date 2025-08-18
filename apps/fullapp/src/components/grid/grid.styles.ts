import { CSSProperties } from "react";

export const gridStyles = {
  wrapper: (isMobile: boolean): CSSProperties => ({
    minHeight: "100vh",
    padding: isMobile ? "16px" : "32px",
  }),
  inner: (isMobile: boolean): CSSProperties => ({
    maxWidth: isMobile ? "100%" : "55%",
    margin: "0 auto",
  }),
  cardCover: (isMobile: boolean): CSSProperties => ({
    height: isMobile ? "150px" : "250px",
    overflow: "hidden",
    position: "relative",
  }),
  cardImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  } as CSSProperties,
  card: {
    height: "100%",
    borderRadius: "12px",
    overflow: "hidden",
  } as CSSProperties,
  cardBody: (isMobile: boolean): CSSProperties => ({
    padding: isMobile ? "12px" : "16px",
  }),
  cardTitle: (isMobile: boolean): CSSProperties => ({
    fontSize: isMobile ? "14px" : "16px",
    fontWeight: 600,
  }),
  cardDescription: (isMobile: boolean): CSSProperties => ({
    fontSize: isMobile ? "12px" : "14px",
    color: "#666",
    lineHeight: "1.4",
  }),
};