import image1 from "../../public/image1.jpg";
import image2 from "../../public/image2.jpg";
import image3 from "../../public/image3.jpg";
import image4 from "../../public/image4.jpg";
import image5 from "../../public/image5.jpg";
 
 
 const Images=()=>{
    return(
 <>
    <div className="w-full h-[600px] md:h-[250px] flex justify-center  gap-5 md:gap-32 mt-3 flex-wrap p-5">
    <img
      src={image1.src}
      alt="Image Description"
      className="md:mt-4 w-3/4 md:w-max h-1/3 md:h-full "
    />
    <img
      src={image3.src}
      alt="Image Description"
      className="md:mt-4 w-3/4 md:w-max h-1/3 md:h-full "
    />
    <img
        src={image2.src}
        alt="Image Description"
        className="md:mt-4 w-3/4 md:w-max h-1/4 md:h-full"
    />

  </div>
  <div className="flex justify-center flex-wrap mt-4">
  <div  className="h-max w-max bg-black  rounded-lg flex flex-col items-center gap-2 m-2 font-medium justify-center"
               style={{
                background: 'linear-gradient(135deg, #6CB2E8, #3A9CC7)',
                padding: '20px',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
            }}>
  <p className="italic">"Texting bridges the gaps between us, no matter the distance."</p>
  <p className="italic">"The most valuable messages are the ones that touch the heart."</p>
  <p className="italic">"A well-crafted message can brighten someone's day."</p>
  </div>
  </div>
  <div className="hidden md:w-full  md:h-[250px] md:flex justify-center gap-5 md:gap-32 mt-4 flex-wrap">
    <img
      src={image4.src}
      alt="Image Description"
      className="md:mt-4 w-max h-full"
    />
    <img
      src={image5.src}
      alt="Image Description"
      className="md:mt-4 w-max h-full"
    />
  </div>
</>
    )
}

export default Images