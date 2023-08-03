import { COUNTRY_URL } from "@/config";
import axios from "axios";
export const fetchCountries = async (params) => {
    const response = await axios.get(COUNTRY_URL)
    return {countries: response.data, params}
}