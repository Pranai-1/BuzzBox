import image1 from "../../public/image1.jpg";
import image2 from "../../public/image2.jpg";
import image3 from "../../public/image3.jpg";
import image4 from "../../public/image4.jpg";
import image5 from "../../public/image5.jpg";
 
 
 const Images=()=>{
    return(
 <>
    <div className="w-full h-[250px] flex justify-center  gap-32 mt-3">
    <img
      src={image1.src}
      alt="Image Description"
      className="mt-4 w-max h-full"
    />
    <img
      src={image3.src}
      alt="Image Description"
      className="mt-4 w-max h-full"
    />
     <img
      src={image2.src}
      alt="Image Description"
      className="mt-4 w-max h-full"
    />
  </div>
  <div className="w-full h-[250px] flex justify-center  gap-32 mt-10">
    <img
      src={image4.src}
      alt="Image Description"
      className="mt-4 w-max h-full mr-10 ml-10"
    />
    <img
      src={image5.src}
      alt="Image Description"
      className="mt-4 w-max h-full"
    />
  </div>
</>
    )
}

export default Images