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
  <div className="hidden md:w-full  md:h-[250px] md:flex justify-center gap-5 md:gap-32 mt-8 flex-wrap">
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