import { CSSProperties } from "react";


export const iphoneStyles = {

    sectionStyle: {
      padding: "60px 40px",
      maxWidth: 1200,
      justifyContent: "center",
      margin: "0 auto",
    } as CSSProperties,
    
    bannerStyle: {
      background: "linear-gradient(135deg, #1f2a44, #2e3a59)",
      padding: "60px",
      borderRadius: 24,
      marginBottom: 50,
      textAlign: "center",
    } as CSSProperties,
    
    categoryStyle: {
      letterSpacing: 4,
      color: "#aaa",
      fontSize: 12,
    } as CSSProperties,
    
    titleStyle: {
      color: "white",
      fontSize: 48,
      margin: 0,
    } as CSSProperties,
    
    exploreRowStyle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 30,
    } as CSSProperties,
    
    exploreLabelStyle: {
      fontSize: 12,
      letterSpacing: 3,
      color: "#999",
    } as CSSProperties,
    
    arrowsStyle: {
      display: "flex",
      gap: 10,
    } as CSSProperties,
    
    cardStyle: {
      borderRadius: 20,
      minHeight: 350,
      overflow: "hidden",
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    } as CSSProperties,
    
    imageContainerStyle: {
      height: 220,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f5f5",
    } as CSSProperties,
    
    imageStyle: {
      maxHeight: 160,
      objectFit: "contain",
    } as CSSProperties,
    
    conditionStyle: {
      fontSize: 12,
      color: "#888",
      display: "block",
      marginBottom: 6,
    } as CSSProperties,
    
    priceContainerStyle: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    } as CSSProperties,
    
    priceStyle: {
      margin: 0,
    } as CSSProperties,
    
    oldPriceStyle: {
      color: "#999",
    } as CSSProperties,

    containerPriceWithDiscount: {
      display: "flex",
      flexDirection: "row",
      gap: 8, 
      alignItems: "center",
    } as CSSProperties,

    divWithoutDiscount: {
      height: 24, 
    } as CSSProperties,
}
