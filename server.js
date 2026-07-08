const express = require('express');
const app = express();
const path = require('path'); 

// 1. ดึงโมดูล HTTP และ Socket.io เข้ามาเชื่อมกับ Express
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: { origin: "*" } // อนุญาตให้อุปกรณ์อื่น (มือถือ/แท็บเล็ต) เชื่อมต่อได้
});

// ใช้พอร์ตของ Render หรือ 3000 สำหรับการเทสบนเครื่องตัวเอง
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 2. สร้างท่อรอรับส่งข้อมูลแบบ Real-time
io.on('connection', (socket) => {
    console.log('มีผู้ใช้งานเชื่อมต่อเข้ามา:', socket.id);

    // เมื่อได้รับออเดอร์จากฝั่งลูกค้า (Customer.html)
    socket.on('new_order', (orderData) => {
        console.log('ได้รับออเดอร์ใหม่:', orderData);
        // ส่งต่อออเดอร์นั้นไปให้หน้าจอครัว (Kitchen.html) ทันที
        io.emit('kitchen_receive', orderData);
    });

    socket.on('disconnect', () => {
        console.log('ผู้ใช้งานตัดการเชื่อมต่อ');
    });
});

// Route สำหรับเปิดไฟล์ต่างๆ (เหมือนเดิม)
app.get('/', (req, res) => res.json({ message: "Welcome to your Shabu server!" }));
app.get('/customer.html', (req, res) => res.sendFile(path.join(__dirname, 'Customer.html')));
app.get('/Customer.html', (req, res) => res.sendFile(path.join(__dirname, 'Customer.html')));
app.get('/kitchen.html', (req, res) => res.sendFile(path.join(__dirname, 'Kitchen.html')));
app.get('/Kitchen.html', (req, res) => res.sendFile(path.join(__dirname, 'Kitchen.html')));

// 3. สำคัญมาก: เปลี่ยนจาก app.listen เป็น server.listen เพื่อให้ระบบท่อ Socket ทำงานได้
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
