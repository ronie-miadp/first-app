import React from 'react'
import PlantCard from './PlantCard'
import { getPlantById } from '@/actions/plant.action';

const page = async ({ params } : { params: { slug: string } }) => {

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
