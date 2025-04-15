import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface BlogCardProps {
    slug: string
    title: string
    summary: string
    date: string
    imageUrl: string
    category: string
}

export function BlogCard({ slug, title, summary, date, imageUrl, category }: BlogCardProps) {
    return (
        <Link href={`/blog/${slug}`}>
            <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg">
                <div className="relative aspect-[16/9]">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>
                <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            {category}
                        </Badge>
                        <time className="text-sm text-muted-foreground">
                            {date}
                        </time>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--primary)] line-clamp-2">
                        {title}
                    </h3>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                        {summary}
                    </p>
                </CardContent>
                <CardFooter>
                    <span className="text-sm font-medium text-[var(--primary)]">
                        Ler mais →
                    </span>
                </CardFooter>
            </Card>
        </Link>
    )
} 