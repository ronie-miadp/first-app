
"use client" 

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Combobox } from "./ui/combobox";
import React from "react";
import { getPlants } from "@/actions/plant.action";
import { useRouter } from "next/navigation";

type Plant = Awaited<ReturnType<typeof getPlants>>;

interface InventoryTableProps {
    plants: Plant
}

const InventoryTable = ({ plants } : InventoryTableProps ) => {
    const router = useRouter();

    const [category, setCategory] = React.useState("");
    const [searchTerm, setSearchTerm] = React.useState("");

    const filteredPlants = plants?.userPlants?.filter((plant) => 
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) && (category === "" || plant.category === category)
    );

  return (
    <div className="w-full">
        <div className="flex item-center gap-2 py-4">
            <div className="relative max-w--sm w-full">
                <Input className="pl-10" placeholder="Filter plants..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <Combobox value={category} onChange={(val) => setCategory(val)} />
        </div>
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Plant ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredPlants?.map((plant) => {
                    const slugName = plant.name.toLowerCase().replace(/\s+/g, "-");
                    const slug = `${plant.id}--${slugName}`;
                    const plantUrl = `/plants/${slug}`;
                    return (
                        <TableRow key={plant.id} onClick={() => router.push(plantUrl)}>
                            <TableCell>{plant.id}</TableCell>
                            <TableCell>{plant.name}</TableCell>
                            <TableCell>{plant.category}</TableCell>
                            <TableCell>{plant.price}</TableCell>
                            <TableCell className="font-bold">{plant.stock}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end space-x-4">
                                    <h1>Edit</h1>
                                    <h1>Delete</h1>
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    </div>
  );
}

export default InventoryTable