"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Prop {
  image: string;
  header: string;
  description: string;
  id: string;
}

export const BookCard = ({ image, header, description, id }: Prop) => {
  const router = useRouter();
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
      <Image
        src={`/uploads/${image}` || ""}
        alt="Book Image"
        className="w-full h-48 object-cover"
        width={100}
        height={500}
      />
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800">{header}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <Button
          onClick={() => {
            router.push(`/books/${id}`);
          }}
          className="mt-4 w-full bg-purple-600 text-white hover:bg-purple-700"
        >
          Check
        </Button>
      </div>
    </div>
  );
};
