const express = require('express');
const app = express();
const path = require('path'); 

// 1. เพิ่มโมดูล HTTP และ Socket.io เข้ามา
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: { origin: "*" } // อนุญาตให้อุปกรณ์อื่นเชื่อมต่อได้
});

const PORT = process.env.PORT || 3000;

app.use(express.json());

// จัดการเชื่อมต่อของ Socket.io
io.on('connection', (socket) => {
    console.log('มีผู้ใช้งานเชื่อมต่อเข้ามา:', socket.id);

    // เมื่อได้รับออเดอร์จากฝั่งลูกค้า (Customer)
    socket.on('new_order', (orderData) => {
        console.log('ได้รับออเดอร์ใหม่:', orderData);
        // ส่งออเดอร์นั้นต่อไปให้ทุกๆ เครื่องที่เปิดหน้าจออยู่ (ซึ่งก็คือห้องครัว)
        io.emit('kitchen_receive', orderData);
    });

    socket.on('disconnect', () => {
        console.log('ผู้ใช้งานตัดการเชื่อมต่อ');
    });
});

// เส้นทางเปิดไฟล์คงเดิม
app.get('/', (req, res) => res.json({ message: "Welcome to your server!" }));
app.get('/customer.html', (req, res) => res.sendFile(path.join(__dirname, 'Customer.html')));
app.get('/Customer.html', (req, res) => res.sendFile(path.join(__dirname, 'Customer.html')));
app.get('/kitchen.html', (req, res) => res.sendFile(path.join(__dirname, 'Kitchen.html')));
app.get('/Kitchen.html', (req, res) => res.sendFile(path.join(__dirname, 'Kitchen.html')));

// 2. สำคัญมาก: เปลี่ยนจาก app.listen เป็น server.listen เพื่อให้ Socket ทำงานได้
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
