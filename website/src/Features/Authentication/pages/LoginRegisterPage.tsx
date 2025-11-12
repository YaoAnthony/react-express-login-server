// state
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// component
import { Login, Register, GoogleLoginButton } from '../component';
import Navbar from '../../../Component/Navigation/Navbar';
import { colors } from '../../../style';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';



export default function LoginRegisterPage() {

    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const accessToken = useSelector((state: RootState) => state.user.accessToken);

    const params = useMemo(() => {
        const q: Record<string, string> = {};
        for (const [k, v] of searchParams.entries()) q[k] = v;
        return q;
    }, [searchParams]);

    // 因为这里一般是 OAuth2 登录回调，所以需要处理 redirect_uri 和 state 参数
    const onSuccess = () => {
        const redirectUri = params?.redirect_uri;
        const state = params?.state;

        if (typeof redirectUri === "string" && accessToken) {
            console.log("OAuth redirect:", { redirectUri, state });
            // 优先把 refreshToken 作为 code 回传给 application（契约一致）
            if (redirectUri.startsWith("vscode://")) {
                // 回跳到 VS Code
                window.location.href = `${redirectUri}?code=${encodeURIComponent(accessToken)}&state=${encodeURIComponent(state ?? "")}`;
            } else if (redirectUri.startsWith("http://localhost:4000/callback")) {
                // 回跳到你的本地回调（例如 Google OAuth 中转）
                window.location.href = `${redirectUri}?code=${encodeURIComponent(accessToken)}&state=${encodeURIComponent(state ?? "")}`;
            }
        }
        navigate('/');
    }

    const OauthLogin = () => {
        return (
            <div className='w-64'>
                <GoogleLoginButton onSuccess={onSuccess} />
            </div>
        )
    }

    const LoginAction = () => {
        return (
            <div className='w-full flex justify-center items-center flex-col gap-12'>
                <div className='w-full flex justify-center flex-col items-center gap-12'>
                    <p className={`text-3xl ${colors.text.primary}`}>Sign to Blue Mll</p>
                    <Login onSuccess={onSuccess}/>
                </div>
                <div className='flex justify-center gap-4'>
                    <p className='select-none'>Don't have an account?</p>
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => setIsLogin(false)}
                    >
                        Create your now.
                    </button>
                </div>

                <OauthLogin />
            </div>
        )
    }

    const RegisterAction = () => {
        return (
            <div className='w-full flex justify-center flex-col gap-12'>

                <div className='w-full flex justify-center flex-col items-center gap-12'>
                    <p className='text-3xl'>Register to Blue Mll</p>
                    <Register onSuccess={onSuccess}/>
                </div>

                <div className='flex justify-center gap-4'>
                    <p className='select-none'>Already has account?</p>
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => setIsLogin(true)}
                    >
                        Login.
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={`  ${colors.bg.primary}`}>
            <Navbar />

            <main className={`flex h-screen flex-col items-start py-24 gap-12 screen-max-width  ${colors.text.primary}`}>

                <p className='text-4xl font-bold py-12 whitespace-nowrap hidden md:block'>Sign in for manage your code.</p>

                {isLogin ? <LoginAction /> : <RegisterAction />}
       
            </main>

        </div>
  );
}
