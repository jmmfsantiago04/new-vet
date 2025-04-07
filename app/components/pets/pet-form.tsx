'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTransition } from 'react';
import { addPet } from '@/app/pets/actions';
import { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function PetForm() {
    const [isPending, startTransition] = useTransition();
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await addPet(formData);
            if (result.error) {
                setError(result.error);
            } else {
                formRef.current?.reset();
            }
        });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Add New Pet</CardTitle>
                <CardDescription>Enter the pet and owner information below</CardDescription>
            </CardHeader>
            <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">Pet Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter pet name"
                                    className="w-full"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="species" className="text-sm font-medium">Species</Label>
                                <Select name="species" required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select species" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dog">Dog</SelectItem>
                                        <SelectItem value="cat">Cat</SelectItem>
                                        <SelectItem value="bird">Bird</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="breed" className="text-sm font-medium">Breed</Label>
                                <Input
                                    id="breed"
                                    name="breed"
                                    placeholder="Enter breed"
                                    className="w-full"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="age" className="text-sm font-medium">Age</Label>
                                    <Input
                                        id="age"
                                        name="age"
                                        type="number"
                                        placeholder="Age"
                                        min="0"
                                        max="50"
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="weight" className="text-sm font-medium">Weight (kg)</Label>
                                    <Input
                                        id="weight"
                                        name="weight"
                                        type="number"
                                        placeholder="Weight"
                                        min="0"
                                        max="200"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <h3 className="text-sm font-medium text-muted-foreground mb-4">Owner Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="ownerName" className="text-sm font-medium">Owner Name</Label>
                                    <Input
                                        id="ownerName"
                                        name="ownerName"
                                        placeholder="Enter owner name"
                                        className="w-full"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ownerPhone" className="text-sm font-medium">Owner Phone</Label>
                                    <Input
                                        id="ownerPhone"
                                        name="ownerPhone"
                                        placeholder="+1234567890"
                                        pattern="^\+?[1-9]\d{1,14}$"
                                        title="Please enter a valid phone number starting with + followed by country code and number"
                                        className="w-full"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">Format: +CountryCodeNumber (e.g., +1234567890)</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="medicalHistory" className="text-sm font-medium">Medical History</Label>
                            <Textarea
                                id="medicalHistory"
                                name="medicalHistory"
                                placeholder="Enter medical history"
                                className="min-h-[120px] resize-y"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                type="submit"
                                className="w-full sm:w-auto min-w-[200px]"
                                disabled={isPending}
                                size="lg"
                            >
                                {isPending ? 'Saving...' : 'Add Pet'}
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
} 