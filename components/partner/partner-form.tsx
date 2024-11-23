"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const formSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    email: z.string().email("Invalid email address"),
    businessName: z.string().min(2, "Business name must be at least 2 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    partnerType: z.string().min(1, "Please select a partner type"),
    deliveryType: z.string().min(1, "Please select a delivery type"),
});

const partnerTypes = [
    { value: "restaurant", label: "Restaurant" },
    { value: "grocery", label: "Grocery Store" },
    { value: "convenience", label: "Convenience Store" },
];

const deliveryTypes = [
    { value: "own", label: "Own Delivery" },
    { value: "platform", label: "Platform Delivery" },
    { value: "both", label: "Both" },
];

export function PartnerForm() {
    // const { t } = useTranslations();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            businessName: "",
            address: "",
            partnerType: "",
            deliveryType: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 -mt-20 relative z-10"
        >
            <h2 className="text-2xl font-bold mb-6">Join us today</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your first name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your last name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact number</FormLabel>
                                <FormControl>
                                    <Input placeholder="eg. +49427926736" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email address</FormLabel>
                                <FormControl>
                                    <Input placeholder="eg. email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your business name</FormLabel>
                                <FormControl>
                                    <Input placeholder="eg. Your business name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business street address</FormLabel>
                                <FormControl>
                                    <Input placeholder="eg. Pottendorfer Strasse 7" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="partnerType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Partner type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose one" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {partnerTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="deliveryType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>How does your business do delivery?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select One" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {deliveryTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Become a partner now
                    </Button>

                    <p className="text-sm text-gray-500 mt-4">
                        By clicking on <b>Become a partner now</b>, you agree to our{" "}
                        <a href="#" className="text-primary hover:underline">
                            Terms & Conditions
                        </a>{" "}
                        and indicate that you have read our{" "}
                        <a href="#" className="text-primary hover:underline">
                            Privacy Statement
                        </a>
                        .
                    </p>
                </form>
            </Form>
        </motion.div>
    );
}