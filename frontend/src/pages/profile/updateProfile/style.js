import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
    },

    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    fileInput: {
        width: "97%",
        margin: "10px 0",
        display: "flex",
        alignItems: "center",
    },
    avatar: {
        margin: "0 1rem 0 0",
    },
}));