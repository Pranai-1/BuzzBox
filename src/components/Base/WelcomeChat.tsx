export default function WelcomeChat({name}:{name:string}){
    return(
        <div className="w-max flex flex-col items-center justify-center  text-white p-2">
        <p className="md:text-4xl text-xl font-bold my-4 text-green-600">Welcome, {name}!</p>
        <p className="md:text-2xl text-sm text-gray-100 mb-8">
          Get started with your journey.
        </p>
        <p className="text-sm md:text-xl text-orange-500 font-medium my-6 ml-4">
          Click the "New Chat" button to initiate a conversation and add contacts.
        </p>
        <p className="hidden md:block text-lg text-gray-200">
          Explore the rich features of our platform and connect with friends and family effortlessly.
        </p>
      </div>
      
    )
}