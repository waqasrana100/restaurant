"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getMainMenuCategories } from "@/services/api";

interface Category {
    id: number;
    name: string;
    image: string;
}

export function CategoryBar() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    async function fetchCategories() {
        try {
            const response = await getMainMenuCategories();
            if (response.data.lenght === 0) {
                setError("No categories found");
            }
            setCategories(response.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to load categories");
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchCategories();
    }, []);

    if (loading) {
        return <div className="text-center">Loading categories...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="flex gap-4 overflow-x-auto pb-4">
            {categories.map((category) => (
                <button
                    key={category.id}
                    className={cn(
                        "flex flex-col items-center min-w-[100px] p-2 rounded-lg transition-colors hover:bg-accent"
                    )}
                >
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                        <Image
                            src={category.image}
                            alt={category.name}
                            width={64}
                            height={64}
                            className="object-cover"
                        />
                    </div>
                    <span className="text-sm text-center">{category.name}</span>
                </button>
            ))}
        </div>
    );
}
