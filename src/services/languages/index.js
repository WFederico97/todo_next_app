import { LANG_URL } from "@/config";
import axios from "axios";

export const fetchLanguages = async (params) => {
    const response = await axios.get(LANG_URL)
    return { languages: response.data, params }
}