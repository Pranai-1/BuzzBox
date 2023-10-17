import BuzzBox from "../../public/BuzzBox.png"
export default function Profile({name,numberKey}:{name:string,numberKey:number}){
    return(
    <div className="h-max w-[200px] bg-blue-200 flex flex-col items-center relative rounded-full mt-3">
     <span className="font-medium p-2 text-orange-700">User Profile</span>
            <div className="h-[90px] w-[90px] rounded-full bg-yellow-100 flex items-center justify-center">
                <div
                className="w-full h-full bg-center bg-no-repeat bg-contain overflow-hidden rounded-full"
                style={{
                    backgroundImage: `url(${BuzzBox.src})`,
                }}
                ></div>
               
            </div>
            <p className="font-medium">{name}</p>
            <p className="font-normal mb-2">key-{numberKey}</p>
    </div>
    )
}