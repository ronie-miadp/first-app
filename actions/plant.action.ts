"use server"

import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

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

export async function createPlant(data: Prisma.PlantsCreateInput){
    console.info(data);
    try {
        const currentUserId = await getUserId();
        if(!currentUserId) return;

        const newPlant = await prisma.plants.create({
            data: {...data, userId: currentUserId }
        });
        revalidatePath("/plants");
        return newPlant;
    } catch (error) {
        console.error("Error Creating Plant:", error);
        throw error;
    }
}

export async function editPlant(id: string, data: Prisma.PlantsUpdateInput){
    try {
        const currentUserId = await getUserId();
        if(!currentUserId) return;

        const updatedPlant = await prisma.plants.update({ 
            where: { id }, data: { ...data, userId: currentUserId } 
        });
        revalidatePath("/plants");
        return updatedPlant;
    } catch (error) {
        console.error("Error updating Plant:", error);
        throw error;
    }
}

export async function deletePlant(id: string){
    try {    
        const currentUserId = await getUserId();
        if(!currentUserId) return; 

        const deletedPlant = await prisma.plants.delete({ where: { id } });
        revalidatePath("/plants");
        return deletedPlant;
    } catch (error) {
        console.error("Error deleting Plant:", error);
        throw error;
    }
}