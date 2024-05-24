import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const showNotification = (message, type) => {
    toast(message, { 
        type : type,
        position: "top-right",
        autoclose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    });
};