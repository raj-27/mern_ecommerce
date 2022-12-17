import { makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
    paper: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1em 2em",
        transition: "all .25s",
        "&:hover": {
            transform: "scale(.95)",
        },
    },
    productImg: {
        width: "100%",
        height: "100%",
        margin: "1rem 0",
    },
}));
export default styles;