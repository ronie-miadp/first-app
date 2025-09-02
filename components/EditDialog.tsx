import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import { Button } from "./ui/button";
import { EditIcon, Sprout } from "lucide-react";
import { Input } from "./ui/input";
import { Combobox } from "./ui/combobox";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import toast from "react-hot-toast";
import { createPlant, editPlant, getPlantById } from "@/actions/plant.action";
// import ImageUpload from "./ImageUpload";

type Plant = NonNullable<Awaited<ReturnType<typeof getPlantById>>>;

interface EditDialogProps {
    plant: Plant;
}


export default function EditDialog({ plant } : EditDialogProps) {
  const [formData, setFormData] = React.useState({
    name:  (plant?.name || "").trim(),
    description:  (plant.description || "").trim(),
    stock: plant.stock ||  1,
    price: plant.price ||  1,
    category:  (plant?.category || "").trim(),
    userId:  (plant?.userId || "").trim(),
    imageUrl:  (plant?.imageUrl || "").trim(),
    file: null,
  });

  const handleChange = (field: string, value: string | number | File | null) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (formData.file) {
          const uploadData = new FormData();
          uploadData.append("file", formData.file);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: uploadData,
          });

          const data = await res.json();
          imageUrl = `/uploads/${data.fileName}`; // Save relative path
      }

      const { file, ...currentData } = formData;  // ✅ remove "file"
      const newPlant = await editPlant(plant.id, {...currentData, imageUrl });
      console.log("plant updated: ", newPlant);
      toast.success("Plant updated successfully");
    } catch (error) {
      console.error("error updating plant", error);
      toast.error("Failed to updating plant");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="ml-auto font-bold flex items-center gap-2"
          asChild

        >
          <span>
            <EditIcon className="w-4 h-4" />
            Edit
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a Plant</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form below to add a new plant to your inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Combobox
                value={formData.category}
                onChange={(val: string) => handleChange("category", val)}
              />
            </div>
          </div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Type your message here."
            rows={5}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
          </div>
          
          {/*Image Upload*/}
          <div className="py-5">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              placeholder="Enter image"
              accept="image/*"
              onChange={(e) => handleChange("file", e.target.files?.[0] || null)}
            />
          </div>
          

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}