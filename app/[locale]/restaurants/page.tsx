"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Search, MapPin, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CategoryBar } from "@/components/restaurants/category-bar"
import { RestaurantCard } from "@/components/restaurants/restaurant-card"
import { Switch } from "@/components/ui/switch"
import { getRestaurants } from "@/services/api"

export default function RestaurantsPage() {
    const t = useTranslations("restaurants");
    const [isOpenOnly, setIsOpenOnly] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // State for restaurant data
    const [sortOption, setSortOption] = useState("distance");

    // Fetch restaurants on component mount
    useEffect(() => {
        async function fetchRestaurants() {
            try {
                const response = await getRestaurants();
                setRestaurants(response.data);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        }
        fetchRestaurants();
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <div className="container py-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <MapPin className="text-primary" />
                        <span className="text-lg">53539 Rheinland-Pfalz</span>
                        <Button variant="outline" size="sm">
                            Change
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline">
                            <Clock className="w-4 h-4 mr-2" />
                            Delivery
                        </Button>
                        <Button variant="outline">Pickup</Button>
                    </div>
                </div>

                <CategoryBar />

                <div className="my-8">
                    <h1 className="text-2xl font-bold mb-2">
                        {restaurants.length} restaurants
                    </h1>
                    <div className="flex items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Restaurants and Dishes"
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={isOpenOnly}
                                    onCheckedChange={setIsOpenOnly}
                                />
                                <span>Open now</span>
                            </div>
                            <Select
                                defaultValue="distance"
                                onValueChange={(value) => setSortOption(value)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="distance">Distance</SelectItem>
                                    <SelectItem value="rating">Rating</SelectItem>
                                    <SelectItem value="delivery-time">Delivery Time</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6">
                    {restaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            name={restaurant.name}
                            image={
                                restaurant.image
                                    ? `${process.env.NEXT_PUBLIC_API_URL}${restaurant.image}`
                                    : "/placeholderRestaurant.webp"
                            }
                            rating={4.0} // Placeholder value
                            reviews={200} // Placeholder value
                            categories={[restaurant.category]} // Assuming category is a string
                            distance="10.81 km" // Placeholder value
                            address={restaurant.address}
                            hasStampCard={restaurant.is_featured}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
