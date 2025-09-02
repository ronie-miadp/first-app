"use server"

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";

export async function getPlants(searchTerm?: string){
    try {
        const currentUserId = await getUserId();

        const whereCluase: any = {
            userId: currentUserId
        };

        if(searchTerm){
            whereCluase.name = {
                contains: searchTerm,
                mode: "insensitive"
            }
        }

        const userPlants = await prisma.plants.findMany({ where: whereCluase });
        // revalidatePath("/");
        return { success: true, userPlants };
    } catch (error) {
        console.info(`Error in getPlants`, error);
    }
}

export async function getPlantById(id: string){
    try {
        const result = await prisma.plants.findUnique({ where: { id } });
        return result;
    } catch (error) {
        console.info(`Error in getPlantById`, error);
    }
}