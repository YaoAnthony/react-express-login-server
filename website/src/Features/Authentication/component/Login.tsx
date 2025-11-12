// colors
import { colors } from '../../../style';

//ICON
import { KeyOutlined, MailOutlined } from '@ant-design/icons';

// components
import SubmitButton from './SubmitButton';

// hook
import { useLoginForm } from '../hook/useLoginForm';


interface LoginProps {
    onSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
    const { 
        loginInfo, 
        btnState, 
        errorMess, 
        onChanges, 
        onSubmit 
    } = useLoginForm({ onSuccess });

    const inputStyle = `${colors.text.primary} flex-1 bg-transparent py-4 text-white placeholder-gray-400 focus:outline-none`;

    return (
        <form onSubmit={onSubmit} className={`select-none ${colors.text.primary} flex flex-col items-center gap-6 w-full md:w-96 px-5`}>
            <div className="w-full flex items-center gap-3 border-b border-gray-500 focus-within:border-blue-500 transition">
                <MailOutlined className='text-gray-400 text-lg' />
                <input
                    type="email"
                    name="email"
                    onChange={onChanges}
                    value={loginInfo.email}
                    placeholder="Email"
                    className={inputStyle}
                />
            </div>

            <div className="w-full flex items-center gap-3 border-b border-gray-500 focus-within:border-blue-500 transition">
                <KeyOutlined className='text-gray-400 text-lg' />
                <input
                    type="password"
                    name="password"
                    onChange={onChanges}
                    value={loginInfo.password}
                    placeholder="Password"
                    className={inputStyle}
                />
            </div>

            <p className="text-red-500 min-h-[1.5rem]">{errorMess || '\u00A0'}</p>

            <div className='w-full'>
                <SubmitButton btnState={btnState} />
            </div>
        </form>
    );
};

export default Login;
