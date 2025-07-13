import LoginForm from "../components/Account/LoginForm";
import RegisterForm from "../components/Account/RegisterForm";
import { useState } from "react";

function AuthPage() {

    const [showLogin, setShowLogin] = useState(true);
    const toggleForm = () => setShowLogin(!showLogin);


    return (
        <div className="w-full h-screen">
            {showLogin ? (
                <LoginForm onSwitchForm={toggleForm} />
            ) : (
                <RegisterForm onSwitchForm={toggleForm} />
            )}
        </div>
    )
}

export default AuthPage;