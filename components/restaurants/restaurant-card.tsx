import Image from "next/image"
import { Star, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RestaurantCardProps {
    name: string,
    image: string | null,
    rating: number,
    reviews: number,
    categories: string[],
    distance: number | string,
    address: string,
    hasStampCard: boolean,
}

export function RestaurantCard({
    name,
    image,
    rating,
    reviews,
    categories,
    distance,
    address,
    hasStampCard,
}: RestaurantCardProps) {
    return (
        <div className="flex gap-6 p-4 rounded-lg border hover:shadow-md transition-shadow">
            <div className="relative w-48 h-32 rounded-lg overflow-hidden">
                <Image
                    src={image as string}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex-1">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">{name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                                <Star className="w-4 h-4 fill-primary text-primary" />
                                <span className="ml-1 font-medium">{rating}</span>
                                <span className="text-muted-foreground ml-1">({reviews})</span>
                            </div>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{categories.join(", ")}</span>
                        </div>
                    </div>
                    {hasStampCard && (
                        <Badge variant="outline" className="text-primary border-primary">
                            StampCard
                        </Badge>
                    )}
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{distance}</span>
                    <span>•</span>
                    <span>{address}</span>
                </div>
            </div>
        </div>
    );
}

