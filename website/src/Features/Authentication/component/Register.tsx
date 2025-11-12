// style
import { colors } from '../../../style';

// components
import SubmitButton from './SubmitButton';

//ICON
import { KeyOutlined, MailOutlined  } from '@ant-design/icons';

//hook
import { useRegisterForm } from '../hook/useRegisterForm';

interface RegisterProps {
    onSuccess?: () => void; // 可选回调：登录成功后的自定义行为
}

const Register: React.FC<RegisterProps> = ({ onSuccess }) => {

    
    const { values, btnState, errorMess, onChanges, onSubmit } = useRegisterForm({
        onSuccess,
        validate: (v) => {
        if (!v.email) return "Email is required.";
        if (!v.password) return "Password is required.";
        if ((v.confirmPassword ?? "") !== v.password) return "Passwords do not match.";
        // 还可以加强：密码长度/强度、邮箱格式等
        return undefined;
        },
    });

    const inputStyle = `${colors.text.primary} flex-1 bg-transparent py-4 text-white placeholder-gray-400 focus:outline-none`;
    

    return (
        <form onSubmit={onSubmit} className={`select-none ${colors.text.primary} flex flex-col items-center gap-6 w-full md:w-96 px-5`}>
            <div className="w-full flex items-center gap-3 border-b border-gray-500 focus-within:border-blue-500 transition">
                <MailOutlined className='text-gray-400 text-lg' />
                <input
                    type="email"
                    name="email"
                    onChange={onChanges}
                    value={values.email}
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
                    value={values.password}
                    placeholder="Password"
                    className={inputStyle}
                />
            </div>

            <div className="w-full flex items-center gap-3 border-b border-gray-500 focus-within:border-blue-500 transition">
                <KeyOutlined className='text-gray-400 text-lg' />
                <input
                    type="password"
                    name="confirmPassword"
                    onChange={onChanges}
                    value={values.confirmPassword}
                    placeholder="Confirm Password"
                    className={inputStyle}
                />
            </div>
            <p className="text-red-500 min-h-[1.5rem] self-start">{errorMess || '\u00A0'}</p>

            <SubmitButton btnState={btnState} />
        </form>
    );
}


export default Register;
