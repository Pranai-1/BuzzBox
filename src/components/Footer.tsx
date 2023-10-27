

export default function Footer(){
    return(
        <footer className="bg-slate-300 text-black p-6 text-center mt-10 flex flex-col gap-3">
    <div className="flex justify-around">
    <div className=" items-center mb-4 w-[400px]">
      <p className="font-bold text-xl">BuzzBox</p>
      <p className="mb-4">&copy; 2023 BuzzBox. All rights reserved.</p>
    <p className="text-blue-600">Contact us: info@buzzbox.com</p>
  </div>
    <div className="mt-6">
      <p>Connect with us on social media:</p>
      <div className="flex justify-center mt-4">
        <a href="#" className="text-blue-600 hover:underline mx-2">Facebook
          <i className="fab fa-facebook"></i>
        </a>
        <a href="#" className="text-blue-600 hover:underline mx-2">Twitter
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="text-blue-600 hover:underline mx-2">Instagram
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>


    </div>
   

  <div>
 
  </div>
  <div>
    <div className="mt-6">
      <p className="text-blue-600 text-lg font-bold">Copyright Infringement Notice</p>
      <p className="text-sm">
        If you believe that any content or images used on this website infringe your copyright,
        please contact us immediately at{' '}
        <a href="mailto:copyright@buzzbox.com" className="text-blue-600 hover:underline">copyright@buzzbox.com</a>.
      </p>
    </div>
  </div>
</footer>
    )
}