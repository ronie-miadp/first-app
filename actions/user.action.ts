"use server"

import { stackServerApp } from "@/stack";
import { neon } from "@neondatabase/serverless"

export const getUserDetails = async (id: string | undefined) => {
    if(!process.env.DATABASE_URL) throw new Error("Database URL is not set!");

    if(!id) return null;

    const sql = neon(process.env.DATABASE_URL!);
    const [user] = await sql`SELECT * FROM neon_auth.users_sync WHERE id=${id}`;
    return user;
}

export const getUserId = async () => {
    const user = await stackServerApp.getUser();
    return user?.id;
}
