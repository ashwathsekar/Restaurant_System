import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import { connectDB } from "./utils/db.js";
import { Order } from "./models/order.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
 
config({
  path: "./config.env",
});

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);
  
  
 


  // Handle orderData event when a user sends an order to order board
  socket.on('new-order', (orderData) => {
    console.log("Server side : ");
    console.log(orderData);
    socket.broadcast.emit("place-order", orderData)
    console.log(`Order Sent to order-board`);
  });


  // Handle disconnection event when a client disconnects
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});  


// app.listen(7000, ()=>{
//   console.log("Server is running on port 7000");
// });

connectDB(); 