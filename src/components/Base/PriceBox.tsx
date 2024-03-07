export default function PriceBox({Details}:{Details:any}){
    return(
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center  rounded-lg border  shadow border-gray-700 xl:p-8 bg-blue-600 text-white">
        <p className="mb-4 text-2xl font-semibold">{Details.name}</p>
            <p className="font-light  sm:text-lg text-gray-100">{Details.text}</p>
        <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-5xl font-extrabold">${Details.price}</span>
            <span className=" text-gray-100">/month</span>
        </div>
        <ul>
            <div className="flex flex-col justify-center items-center">
            <li>
                <span className=" flex w-[400px] h-max p-2 items-start justify-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-6 h-6 text-green-300 font-bold text-xl">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
               </svg>
               <span>24/7 customer support</span>
                </span>
            </li>
            <li>
                <span className=" flex w-[400px] h-max p-2 items-start justify-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-6 h-6 text-green-300 font-bold text-xl">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
               </svg>
               <span>Storage access :{Details.storage}</span>
                </span>
            </li>
            <li>
                <span className=" flex w-[400px] h-max p-2 items-start justify-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-6 h-6 text-green-300 font-bold text-xl">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
               </svg>
               <span>Team size : {Details.size}</span>
                </span>
            </li>
            <li>
                <span className=" flex w-[400px] h-max p-2 items-start justify-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="w-6 h-6 text-green-300 font-bold text-xl">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
               </svg>
               <span>premium support : {Details.support} months</span>
                </span>
            </li>
            </div>
        </ul>
            <a href="#" className="text-black bg-orange-500    font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2  
            ">Get started</a>
        </div>
    )
}