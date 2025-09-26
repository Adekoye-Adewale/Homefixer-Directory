import { z } from "zod";
import { customBusinessLocationType } from "@/sanity/lib/customTypes/businessLocation";

export const createSearchSchema = (locations: customBusinessLocationType[]) => {
        return z.object({
                businessName: z
                        .string()
                        .trim()
                        .max(100, "Business name too long")
                        .regex(/^[a-zA-Z0-9\s\-']*$/, "Invalid characters")
                        .optional()
                        .or(z.literal("")),

                location: z
                        .enum(["", ...locations.map((loc) => loc.slug as string)])
                        .optional(),
        });
};
