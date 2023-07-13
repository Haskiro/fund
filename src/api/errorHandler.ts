import axios from "axios/index";

export const errorHandler = (e: unknown): void => {
    if (axios.isAxiosError(e) && e.response) {
        console.log(e.response.data);
        console.error(e)
    } else {
        console.error(e);
    }
}