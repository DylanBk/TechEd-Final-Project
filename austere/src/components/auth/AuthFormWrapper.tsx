import { signup } from '@/app/actions/auth';
import AuthForm from './AuthForm';

export default function AuthFormWrapper({ mode }: { mode: 'login' | 'signup' }) {
    return <AuthForm mode={mode} step={signup} />;
};