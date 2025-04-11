'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateUser, deleteUser } from "@/app/actions/users";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    createdAt: Date;
}

interface AdminUserTableProps {
    users: User[];
    isLoading?: boolean;
}

export function AdminUserTable({ users, isLoading = false }: AdminUserTableProps) {
    const router = useRouter();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setEditForm({
            name: user.name,
            email: user.email,
            phone: user.phone,
        });
        setIsEditing(true);
    };

    const handleDelete = async (userId: number) => {
        try {
            setIsDeleting(true);
            const result = await deleteUser(userId);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Usuário excluído com sucesso');
                router.refresh();
                setSelectedUser(null);
            }
        } catch (error) {
            toast.error('Erro ao excluir usuário');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleUpdate = async () => {
        if (!selectedUser) return;

        try {
            setIsEditing(true);
            const result = await updateUser(selectedUser.id, editForm);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Usuário atualizado com sucesso');
                router.refresh();
                setSelectedUser(null);
                setIsEditing(false);
            }
        } catch (error) {
            toast.error('Erro ao atualizar usuário');
        } finally {
            setIsEditing(false);
        }
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle><Skeleton className="h-8 w-[100px]" /></CardTitle>
                    <CardDescription>
                        <Skeleton className="h-4 w-[250px]" />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead><Skeleton className="h-4 w-[100px]" /></TableHead>
                                    <TableHead><Skeleton className="h-4 w-[150px]" /></TableHead>
                                    <TableHead className="hidden md:table-cell"><Skeleton className="h-4 w-[120px]" /></TableHead>
                                    <TableHead className="hidden md:table-cell"><Skeleton className="h-4 w-[100px]" /></TableHead>
                                    <TableHead className="hidden lg:table-cell"><Skeleton className="h-4 w-[120px]" /></TableHead>
                                    <TableHead className="text-right"><Skeleton className="h-4 w-[80px]" /></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array(5).fill(0).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-[180px]" /></TableCell>
                                        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-[120px]" /></TableCell>
                                        <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-[100px]" /></TableCell>
                                        <TableCell className="hidden lg:table-cell"><Skeleton className="h-4 w-[120px]" /></TableCell>
                                        <TableCell className="text-right">
                                            <Skeleton className="h-8 w-[60px] ml-auto" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Usuários</CardTitle>
                    <CardDescription>
                        Gerenciar usuários do sistema
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead className="hidden sm:table-cell">Email</TableHead>
                                    <TableHead className="hidden md:table-cell">Telefone</TableHead>
                                    <TableHead className="hidden md:table-cell">Tipo</TableHead>
                                    <TableHead className="hidden lg:table-cell">Cadastro</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            {user.name}
                                            <div className="sm:hidden">
                                                <span className="text-sm text-muted-foreground block">
                                                    {user.email}
                                                </span>
                                            </div>
                                            <div className="md:hidden mt-1">
                                                <span className="text-sm text-muted-foreground block">
                                                    {user.phone}
                                                </span>
                                                <span className="text-sm text-muted-foreground block">
                                                    {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                                        <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            {format(new Date(user.createdAt), "d 'de' MMM 'de' yyyy", { locale: ptBR })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEdit(user)}
                                            >
                                                Editar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedUser?.name}
                        </DialogTitle>
                        <DialogDescription>
                            Gerenciar informações do usuário
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input
                                id="phone"
                                value={editForm.phone}
                                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <DialogFooter className="flex gap-2">
                        <Button
                            variant="destructive"
                            onClick={() => selectedUser && handleDelete(selectedUser.id)}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Excluindo...' : 'Excluir'}
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            disabled={isEditing}
                        >
                            {isEditing ? 'Salvando...' : 'Salvar'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
} 