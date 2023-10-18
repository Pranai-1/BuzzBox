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
  const char=name.charAt(0).toLocaleUpperCase()
  return (
    <div className="h-[50px] bg-white w-full cursor-pointer rounded-lg flex items-center p-2">
      <div className="w-10 h-10 bg-gray-200 rounded-full mr-2 flex justify-center items-center">
        <p className="font-normal text-xl">{char}</p>
      </div>
      <p className="p-2">{name}</p>
    </div>
  );
}
