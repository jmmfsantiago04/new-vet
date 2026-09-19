import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-blue-50 px-4 py-8 sm:py-12">
            <div className="w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-[var(--primary)] sm:text-3xl">
                        Bem-vindo de volta
                    </h1>
                    <p className="text-base text-[var(--text-secondary)] sm:text-lg">
                        Entre para acessar os serviços veterinários
                    </p>
                </div>
                <LoginForm />
            </div>
        </main>
    );
}
