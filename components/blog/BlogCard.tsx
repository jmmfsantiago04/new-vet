import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import * as motion from "motion/react-client"

const cardAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    whileHover: { y: -5 }
}

const imageAnimation = {
    whileHover: { scale: 1.05 }
}

const headerAnimation = {
    initial: { opacity: 0, x: -20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true }
}

const titleAnimation = {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
}

const fadeInAnimation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true }
}

const readMoreAnimation = {
    whileHover: { x: 5 }
}

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
        <Link href={`/blog/${slug}`} className="block w-full">
            <motion.article
                className="h-full"
                {...cardAnimation}
                transition={{ duration: 0.5 }}
            >
                <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg flex flex-col">
                    <motion.div
                        className="relative aspect-[16/9] w-full overflow-hidden"
                        {...imageAnimation}
                        transition={{ duration: 0.3 }}
                    >
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                            priority={false}
                        />
                    </motion.div>
                    <CardHeader className="flex-grow">
                        <motion.div
                            className="flex items-center justify-between mb-2 flex-wrap gap-2"
                            {...headerAnimation}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100 whitespace-nowrap">
                                {category}
                            </Badge>
                            <time className="text-sm text-muted-foreground whitespace-nowrap">
                                {date}
                            </time>
                        </motion.div>
                        <motion.h3
                            className="text-base sm:text-lg md:text-xl font-bold text-[var(--primary)] line-clamp-2"
                            {...titleAnimation}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {title}
                        </motion.h3>
                    </CardHeader>
                    <CardContent>
                        <motion.p
                            className="text-sm sm:text-base text-muted-foreground line-clamp-3"
                            {...fadeInAnimation}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            {summary}
                        </motion.p>
                    </CardContent>
                    <CardFooter>
                        <motion.span
                            className="text-sm font-medium text-[var(--primary)]"
                            {...readMoreAnimation}
                            transition={{ duration: 0.2 }}
                        >
                            Ler mais →
                        </motion.span>
                    </CardFooter>
                </Card>
            </motion.article>
        </Link>
    )
} 