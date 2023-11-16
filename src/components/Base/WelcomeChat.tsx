export default function WelcomeChat({name}:{name:string}){
    return(
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-teal-600 to-purple-800 text-white">
        <p className="text-4xl font-bold my-4 text-black">Welcome, {name}!</p>
        <p className="text-2xl text-gray-100 mb-8">
          Get started with your chat journey.
        </p>
        <p className="text-xl text-orange-500 font-medium my-6">
          Click the "New Chat" button to initiate a conversation and add contacts.
        </p>
        <p className="text-lg text-gray-200">
          Explore the rich features of our platform and connect with friends and family effortlessly.
        </p>
      </div>
      
    )
}