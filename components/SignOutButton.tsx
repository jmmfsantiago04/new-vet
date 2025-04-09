'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';

export default function SignOutButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSignOut = () => {
        startTransition(async () => {
            try {
                await signOut();
                router.push('/login');
            } catch (error) {
                console.error('Error signing out:', error);
            }
        });
    };

    return (
        <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={isPending}
        >
            {isPending ? 'Saindo...' : 'Sair'}
        </Button>
    );
} 