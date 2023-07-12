const { createContext, useState } = require("react")
import { postRegister, postLogin } from "@/services/auth"
import { useRouter } from "next/router"

const defaultProviderValue = {
    login: () => { },
    loading: false,
    error: false,
    show: false,
    token: null,
    tokenExpirationDate: null,
    isAuth: false,
    register: () => { },
    logout: () => { }

}



export const  AuthContext = createContext(defaultProviderValue)

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(defaultProviderValue.loading)
    const [error, setError] = useState(defaultProviderValue.error)
    const [token, setToken] = useState(defaultProviderValue.token)
    const [tokenExpirationDate, setTokenExpirationDate] = useState(defaultProviderValue.tokenExpirationDate)
    const [show, setShow] = useState(defaultProviderValue.show)


    const register = async (data) => {
        try {
            setLoading(true)
            await postRegister(data)
            

        } catch(err) {
            setLoading(false)
            setError(err.response?.data?.detail || "Internal server error")
        } finally {
            setLoading(false)
        }
    }

    const login = async (loginParams) => {
        try {
            setLoading(true)
            const response = await postLogin(loginParams)
            setToken(response.data.access_token)
            localStorage.setItem('accessToken', JSON.stringify(response.data.access_token))
            const expirationDate = new Date(new Date.getTime() + (1000 * 60 * 15))
            setTokenExpirationDate(expirationDate)
            localStorage.setItem('expirationDate', JSON.stringify(expirationDate.toISOString()))
            setShow(true)
        }
        catch (err) {
            setLoading(false)
            setError(err.response?.data?.detail || "Internal server error")
        } finally {
            setLoading(false)
            
        }
    }

    const logOut = () => {
        setToken(null)
        setTokenExpirationDate(null)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('expirationDate')
        setShow(false)
    }

    const values = {
        login ,
        loading,
        error,
        token,
        tokenExpirationDate,
        register,
        logOut,
    }
    return (
        <AuthContext.Provider value={ values} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider