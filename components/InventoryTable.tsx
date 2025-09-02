
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


const plants = [
  {
    id: "23232",
    name: "Snake Plant",
    category: "Indoor",
    price: 200,
    stock: 5,
  },
];

const InventoryTable = () => {
  const [category, setCategory] = React.useState("");
  return (
    <div className="w-full">
        <div className="flex item-center gap-2 py-4">
            <div className="relative max-w--sm w-full">
                <Input className="pl-10" placeholder="Filter plants..." />
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
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {plants.map((plant) => (
                <TableRow key={plant.id}>
                    <TableCell className="font-medium">{plant.name}</TableCell>
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
                ))}
            </TableBody>
        </Table>
    </div>
  );
}

export default InventoryTable