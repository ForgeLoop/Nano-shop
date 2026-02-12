import { CSSProperties } from "react"

export const pageStyles = {
    container : {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: "#f5f5f5",
        minHeight: "150vh"
    } as CSSProperties ,
    filterSidebar : {
        minHeight: "80vh",
        width: "100%",
        maxWidth: 1400,
        display: "flex",
        gap: 24,
        padding: "40px 20px"
    } as CSSProperties,
    tags: {
        textTransform: "capitalize",
        fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
        fontWeight: "500"
    } as CSSProperties
}

export const filterSidebar = {
    container: {
        width: 240,
        background: "#fff",
        borderRadius: 12,
        padding: 20,
        height: "fit-content"
    } as CSSProperties,
    titulo: {
        marginBottom: 12
    } as CSSProperties,
    catTags: (active: boolean, clickable: boolean) => ({
        textTransform: "capitalize",
        fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
        padding: "8px 10px",
        borderRadius: 8,
        cursor: clickable ? "pointer" : "default",
        marginBottom: 6,
        background: active ? "#EAEAEA" : "transparent",
        fontWeight: active ? 600 : 400,
    }) as CSSProperties
}

export const filtrosActivos = {
    container: {
        marginBottom: 20, 
        display: "flex", 
        gap: 10, 
        flexWrap: "wrap",
    } as CSSProperties,
    tags: {
        textTransform: "capitalize",
        fontWeight: 600
    }
}

export const productosGrid = {
    motionContainer : {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
        gap: 20,
        minHeight: "80vh"
    } as CSSProperties,
    card: {
        cover : {
            divContainer: {
                overflow: "hidden"
            } as CSSProperties,
            img : {
                height: 220,
                width: "100%",
                objectFit: "contain",
                transition: "0.4s",
            } as CSSProperties
        } 
    } 
}

export const productosSkeleton = {
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
        gap: 20,
    } as CSSProperties,

    skeletonImg: {
        width: "100%", 
        height: 260 
    } as CSSProperties
}