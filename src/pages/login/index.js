import LoginForm from "@/components/login/LoginForm"

function Login() {
    return (
        <div>
        <LoginForm />
        </div>

    )
}

Login.guestGuard = true

export default Login