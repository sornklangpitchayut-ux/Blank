const express = require('express');
const app = express();
const path = require('path'); // ดึงโมดูล path มาช่วยจัดการตำแหน่งไฟล์

// Use Render's dynamic port environment variable, fallback to 3000 for local development
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON request bodies
app.use(express.json());

// Basic GET route (หน้าแรก)
app.get('/', (req, res) => {
    res.json({ message: "Welcome to your local server!" });
});

// 1. Route สำหรับเปิดไฟล์ Customer.html
app.get('/Customer.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Customer.html'));
});

// รองรับกรณีพิมพ์ตัวเล็กด้วยเพื่อความปลอดภัย (สำหรับ Linux บน Render)
app.get('/customer.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Customer.html'));
});

// 2. Route สำหรับเปิดไฟล์ Kitchen.html
app.get('/Kitchen.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Kitchen.html'));
});

// รองรับกรณีพิมพ์ตัวเล็กสำหรับหน้า Kitchen
app.get('/kitchen.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Kitchen.html'));
});

// Basic POST route
app.post('/api/data', (req, res) => {
    const receivedData = req.body;
    res.status(201).json({
        status: "success",
        received: receivedData
    });
});

// Start the server (binding to '0.0.0.0' is required for cloud hosting)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
