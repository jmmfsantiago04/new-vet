import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--primary)]">
                        Bem-vindo de volta
                    </h1>
                    <p className="mt-2 text-lg text-[var(--text-secondary)]">
                        Entre para acessar os serviços veterinários
                    </p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
} 