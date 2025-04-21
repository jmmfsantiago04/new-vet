'use client';

import { useTransition } from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SignOutButtonProps {
    className?: string;
}

export default function SignOutButton({ className }: SignOutButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleSignOut = () => {
        startTransition(async () => {
            try {
                await signOut({
                    redirect: true,
                    callbackUrl: '/login'
                });
                toast.success('Sessão encerrada com sucesso');
            } catch (error) {
                console.error('Error signing out:', error);
                toast.error('Erro ao encerrar sessão');
            }
        });
    };

    return (
        <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={isPending}
            className={cn(
                "text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5 min-w-[80px] sm:min-w-[100px]",
                className
            )}
        >
            {isPending ? 'Saindo...' : 'Sair'}
        </Button>
    );
} 