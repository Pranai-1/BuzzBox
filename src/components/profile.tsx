import logo from "../../public/l.png";

export default function Profile({
  name,
  numberKey,
}: {
  name: string;
  numberKey: number;
}) {
  return (
    <div className="w-[300px] bg-gray-800 p-4 mt-5 rounded-xl text-white flex items-center relative shadow-lg">
    <div className="w-1/2 h-20 flex items-center justify-center mt-2">
      <div className="w-16 h-16 bg-center bg-no-repeat bg-cover rounded-full" style={{ backgroundImage: `url(${logo.src})` }}></div>
    </div>
    <div className="w-1/2 h-20 flex flex-col">
      <span className="text-2xl font-semibold text-orange-500 mt-2 capitalize">{name}</span>
      {numberKey>0 &&(
          <p className="mt-1 font-normal text-gray-300">Key: {numberKey}</p>
      )}
     
    </div>
  </div>
  
  
  );
}
