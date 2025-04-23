import { Header } from "../components/layout/Header";
import { AuthForm } from "../components/authpage/AuthForm";
function AuthPage() {
    return (
      <div className="AuthPage">
          <>
            <Header/>
            <AuthForm/>
        </>
      </div>
    );
  }
  
  export {AuthPage};
  