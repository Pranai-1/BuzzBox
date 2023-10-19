const http=require("http")
const express=require("express")
const cors=require("cors")
const socketIO=require("socket.io")

const app=express()
const port=4000
const server=http.createServer(app)  
const io=socketIO(server)
app.use(cors())


io.on("connection",()=>{
    console.log("connection established")
})




app.get("/",(req,res)=>{
    res.send("Starting")
})




server.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
})


// Read about the diff between http and express servers with code

//    - `http`: This is a built-in Node.js module used to create an HTTP server.
//    - `express`: Express.js is a popular Node.js web application framework for building web applications and APIs.
//    - `cors`: CORS (Cross-Origin Resource Sharing) is middleware used to handle cross-origin requests and is commonly used in web
//     applications.
//    - `socketIO`: This is the Socket.IO library, which allows real-time, bidirectional communication between the server 
//    and clients using WebSockets.


// 3. **Create an HTTP Server and Attach Express:**

//    ```javascript
//    const server = http.createServer(app);
//    ```

//    - An HTTP server is created using the `http.createServer()` method. The Express application (`app`) is attached to this server, 
//    allowing it to handle incoming HTTP requests.

// 4. **Initialize Socket.IO with the Server:**

//    ```javascript
//    const io = socketIO(server);
//    ```

//    - The Socket.IO server is created and attached to the HTTP server (`server`). This allows real-time communication between clients 
//    and the server using WebSockets.

