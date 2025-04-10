'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SignOutButtonProps {
    className?: string;
}

export default function SignOutButton({ className }: SignOutButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSignOut = () => {
        startTransition(async () => {
            try {
                await signOut();
                toast.success('Sessão encerrada com sucesso');
                router.push('/login');
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
            className={cn(className)}
        >
            {isPending ? 'Saindo...' : 'Sair'}
        </Button>
    );
} 