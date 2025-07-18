import AuthForm from '@/components/auth/AuthForm';
import { login } from '../actions/auth';

export default function LoginPage() {
  return <AuthForm mode="login" step={login} />;
};