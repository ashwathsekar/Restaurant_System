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
  
  // Order.find(function(err, orders) {
  //   socket.emit('orders', { orders: orders });
  // });

  // Send existing messages to the connected client
  Order.find().then((orders) => {
    console.log(orders)
    socket.emit('get-orders', orders);
  });
  

  // Handle joinTradeRoom event when a client wants to join a trade room
  socket.on('joinOrderRoom', (data) => {
    if (!data) {
      console.error('Data is null');
      return;
    }
  
    console.log(data)
    const { roomId, userId } = data; // Extract tradeId and userId from data
    socket.join(roomId); // Join the trade room corresponding to the tradeId
    console.log(`User ${userId} joined trade room: ${roomId}`);
  });

  // Handle sendOffer event when a user sends an offer for a trade
  socket.on('sendOffer', (offerData) => {
    console.log(offerData);
    const { tradeId, offer, receiverId } = offerData; // Extract tradeId, offer, and receiverId from offerData
    socket.broadcast.to(tradeId).emit("viewOffer",offerData)
    // io.to(receiverId).emit('newOffer', offer); // Emit the newOffer event only to the receiver specified by receiverId
    console.log(`Offer sent to user ${receiverId} in trade room: ${tradeId}`);
  });

  // Handle acceptOffer event when a trade owner accepts an offer
  socket.on('acceptOffer', (data) => {
    const { tradeId, offerId } = data; // Extract tradeId and offerId from data
    io.to(tradeId).emit('offerAccepted', offerId); // Broadcast the offerAccepted event to all clients in the trade room
    console.log(`Offer accepted in trade room: ${tradeId}`);
  });

  // Handle rejectOffer event when a trade owner rejects an offer
  socket.on('rejectOffer', (data) => {
    const { tradeId, offerId } = data; // Extract tradeId and offerId from data
    io.to(tradeId).emit('offerRejected', offerId); // Broadcast the offerRejected event to all clients in the trade room
    console.log(`Offer rejected in trade room: ${tradeId}`);

    // Close the trade for all clients
    io.to(tradeId).emit('tradeClosed');
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