import { makeStyles } from "@material-ui/core";

const style = makeStyles((theme) => ({
    container: {
        width: "100%",
        height: "100vh",
        // margin: "4rem 0 0 0",
        backgroundColor: "#F8FAFC",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    header_text: {
        margin: "0 0 0 1.2rem",
    },
    mySwiper: {
        width: "100%",
    },
    productHeadline: {
        textAlign: "center",
        margin: "1rem 0 2rem 0",
        position: "relative",
        "&::before": {
            content: '""',
            position: "absolute",
            bottom: "0%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "15%",
            height: "2px",
            margin: "3rem 0 0 0",
            backgroundColor: "#000",
        },
    },
}));
export default style;