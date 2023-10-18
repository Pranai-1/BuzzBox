import { ContactType } from "@/pages/api/types";

export default function Handler({
  id,
  name,
  numberKey,
}: {
  id: number;
  name: string;
  numberKey: number;
}) {
  return (
    <div className="h-[50px]  bg-white w-full cursor-pointer rounded-lg">
      <p className="p-2">{name}</p>
    </div>
  );
}
