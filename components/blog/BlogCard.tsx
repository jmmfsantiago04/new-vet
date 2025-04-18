import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import * as motion from "motion/react-client"

interface BlogCardProps {
    slug: string
    title: string
    summary: string
    date: string
    imageUrl: string
    category: string
}

export function BlogCardSkeleton() {
    return (
        <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg">
            <div className="relative aspect-[16/9]">
                <Skeleton className="absolute inset-0" />
            </div>
            <CardHeader>
                <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-4/5" />
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            </CardContent>
            <CardFooter>
                <Skeleton className="h-4 w-16" />
            </CardFooter>
        </Card>
    )
}

export function BlogCard({ slug, title, summary, date, imageUrl, category }: BlogCardProps) {
    return (
        <Link href={`/blog/${slug}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
            >
                <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg">
                    <motion.div
                        className="relative aspect-[16/9]"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                    <CardHeader>
                        <motion.div
                            className="flex items-center justify-between mb-2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                {category}
                            </Badge>
                            <time className="text-sm text-muted-foreground">
                                {date}
                            </time>
                        </motion.div>
                        <motion.h3
                            className="text-xl font-bold text-[var(--primary)] line-clamp-2"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {title}
                        </motion.h3>
                    </CardHeader>
                    <CardContent>
                        <motion.p
                            className="text-muted-foreground line-clamp-3"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            {summary}
                        </motion.p>
                    </CardContent>
                    <CardFooter>
                        <motion.span
                            className="text-sm font-medium text-[var(--primary)]"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                        >
                            Ler mais →
                        </motion.span>
                    </CardFooter>
                </Card>
            </motion.div>
        </Link>
    )
} 