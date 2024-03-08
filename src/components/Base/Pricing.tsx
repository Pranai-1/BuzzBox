import PriceBox from "@/components/Base/PriceBox"
import Footer from "./Footer"

export default function Pricing(){
    let starter={
        name:"Starter",
        text:"Best option for personal use & for your next project.",
        storage :6,
        size:2,
        support:3,
        price:15
    }
    let advanced={
        name:"Advanced",
        text:"Relevant for multiple users, extended & premium support.",
        storage :12,
        size:15,
        support:6,
        price:25
    }
    let premium={
        name:"Premium",
        text:"Best for large scale uses and extended redistribution rights.",
        storage :24,
        size:50,
        support:12,
        price:40
    }
    let arr=[]
    arr.push(starter)
    arr.push(advanced)
    arr.push(premium)
    return(
        <div className="bg-gray-900 ">
         <span className="md:text-4xl text-2xl w-[300px] md:w-full ml-5 md:ml-0 p-2 font-bold text-white mb-2 flex justify-center">Designed for business teams like yours</span>
         <span className="hidden md:flex text-xl text-white font-medium mb-2 p-2  flex-col justify-center w-full items-center">At BuzzBox, we specialize in markets where groundbreaking technology, 
            <p>innovation, and strategic investment converge to unleash lasting value and spur economic advancement.</p></span>
        <div id="pricing" className="h-full w-full p-5 flex flex-col md:flex-row flex-wrap gap-5 ">
           
         {arr.map((obj)=>(
            <PriceBox Details={obj}/>
         ))}
           <Footer/>
        </div>
      
        </div>
        
    )
}