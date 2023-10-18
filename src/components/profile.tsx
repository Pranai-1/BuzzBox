import BuzzBox from "../../public/BuzzBox-3.png";

export default function Profile({
  name,
  numberKey,
}: {
  name: string;
  numberKey: number;
}) {
  return (
    <div className="h-max w-[350px] bg-white flex  items-center relative p-2">
      <div className="h-40 w-1/2   flex items-center justify-center mt-2">
      <div
          className="w-full h-full bg-center bg-no-repeat bg-contain overflow-hidden"
          style={{
            backgroundImage: `url(${BuzzBox.src})`,
          }}
        ></div>
      </div>
      <div className="flex flex-col h-40 w-1/2">
      <span className="font-medium text-xl p-2 text-orange-600">User Profile</span>
      
      <p className="font-medium mt-2">Name-{name}</p>
      <p className="font-normal mt-1">Key: {numberKey}</p>
      </div>
    </div>
  );
}
