import { COMPANY_URL } from "@/config";
import axios from "axios";



export const fetchCompanies = async (params) => {

    const response = await axios.get(COMPANY_URL)


    return {companies: response.data, params}
    
}