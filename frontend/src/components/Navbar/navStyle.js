import { alpha, makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#6366F1",
        // backgroundColor: "#2b2b2b",
        paddingtop: "0px",
        "& > *": {
            outline: "none",
            border: "none",
        },
    },
    logo: {
        fontSize: "1.4em",
        flexGrow: 1,
    },
    navLinks: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // flexGrow: 1,
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    navLinkItem: {
        margin: "0 1em",
        fontSize: "1.2em",
        color: "#fff",
        [theme.breakpoints.down("sm")]: {
            color: "red",
            display: "none",
        },
    },
    nav_action: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    profile: {
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            justifyContent: "center",
            padding: "1em 0 1.5rem 0",
        },
    },
    common: {
        margin: "0 1em",
    },
    mobileView: {
        display: "none",
        color: "#fefefe",
        marginLeft: "auto",
        "&:focus": {
            outline: "none",
        },
        [theme.breakpoints.down("sm")]: {
            display: "block",
        },
    },
    mobileViewText: {
        color: "#000",
    },
    icon: {
        color: "#fff",
    },
    search: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        [theme.breakpoints.down("sm")]: {
            margin: "0 0 0 .4rem",
        },
    },
    searchInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(0.25)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        height: "20px",
        padding: "1rem 0",
        fontFamily: "cursive",
        borderRadius: "4px",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
    submitBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20px",
        padding: "1rem .2rem",
        borderRadius: "4px",
        "&:hover": {
            cursor: "pointer",
        },
    },
}));

export default styles;