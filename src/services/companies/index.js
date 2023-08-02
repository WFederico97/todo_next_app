import { COMPANY_URL } from "@/config";
import axios from "axios";

let token = null;

if (typeof window !== "undefined") {
  token = JSON.parse(localStorage.getItem('accessToken'));
}

export const fetchCompanies = async (params) => {

    const response = await axios.get(COMPANY_URL, {params: {page: params.page, limit: params.limit}, headers: {Authorization: 'Bearer' + token}})

    return {todos: response.data, params}
    
}