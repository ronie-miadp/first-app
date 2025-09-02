import React from 'react'
import PlantCard from './PlantCard'
import { getPlantById } from '@/actions/plant.action';
import { stackServerApp } from '@/stack';
import { SignIn } from '@stackframe/stack';

type PlantParams = { slug: string };

export const generateMetadata = async({ params } : { params: Promise<PlantParams> }) => {
    const { slug } = await params;  
    const [id] = slug.split("--");   
    const plant = await getPlantById(id);
    return {
        title: plant?.name || "Plant Details",
        description: plant?.description || "Plant details page"
    }
}

const page = async ({ params } : { params: Promise<PlantParams> }) => {
    const user = await stackServerApp.getUser();
    if(!user) return <SignIn />

    const { slug } = await params;  
    const [id] = slug.split("--");   
    const plant = await getPlantById(id);

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-full">
        <PlantCard plant={plant}/>
        </div>
    </div>
  )
}

export default page
