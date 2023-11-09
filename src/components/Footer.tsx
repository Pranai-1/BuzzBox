function Footer() {
  return (
    <div className="h-max w-full bg-gray-800 text-white py-8 p-3 absolute top-[710px]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0 ml-2">
            <h2 className="text-3xl font-bold">BuzzBox</h2>
            <p className="text-sm text-gray-400">text your loved ones</p>
          </div>
          <div>
          <ul className="hidden md:pr-5 md:grid md:justify-between md:gap-3 ">
            <li>
              <a href="#" className="text-gray-400 hover:text-white mb-2">Home</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white mb-2">About</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white mb-2">Contact</a>
            </li>
          </ul>
          </div>
          <div>
          <ul className="pr-5 grid justify-between gap-3">
            <li>
              <a href="#" className="text-gray-400 hover:text-white mb-2">Careers</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white mb-2">Blog</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white mb-2">Affiliate</a>
            </li>
          </ul>
          </div>
          <div>
          <ul className="pr-5 grid justify-between gap-3">
            <li>
              <a href="#" className="text-gray-400 hover:text-white ">Help and Support</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white ">Terms and conditions</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white ">Expert Suggestions</a>
            </li>
          </ul>
          </div>
        </div>
        <div className="mt-6 text-center md:text-left">
          <p className="text-gray-400 text-sm pl-2">
            Join us on social media:
            <a href="#" className="ml-2 text-blue-400 hover:text-blue-300">Facebook</a>
            <a href="#" className="ml-2 text-blue-400 hover:text-blue-300">Twitter</a>
            <a href="#" className="ml-2 text-blue-400 hover:text-blue-300">LinkedIn</a>
          </p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} BuzzBox. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
