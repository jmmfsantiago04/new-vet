import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
    return (
        <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-blue-50 px-4 py-8 sm:py-12">
            <div className="w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-[var(--primary)] sm:text-3xl">
                        Crie sua conta
                    </h1>
                    <p className="text-base text-[var(--text-secondary)] sm:text-lg">
                        Entre no VetPay para acessar os serviços veterinários
                    </p>
                </div>
                <SignUpForm />
            </div>
        </main>
    );
}
