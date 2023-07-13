import axios from "axios";
import { REACT_APP_API_URL} from "@env"

export const HTTP = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});