require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const { sequelize } = require('./models');
const { errorHandler } = require('./middlewares/errorHandler');
const { setIO } = require('./socket');

const app = express();
const server = http.createServer(app);

// CORS config
// app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(cors({
  origin: [
    "http://localhost:5173",            
    "https://inventoryhubit.netlify.app" 
  ],
  credentials: true,
}));
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/inventories', require('./routes/inventory'));
app.use('/api/items', require('./routes/item'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/tags', require('./routes/tag'));
app.use('/api/search', require('./routes/search'));
app.use('/api/comments', require('./routes/comment'));

app.use("/api/user", require("./routes/user"));      
app.use("/api/aggregate", require("./routes/aggregate")); 


app.use(errorHandler);

const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || '*', credentials: true }
});
setIO(io);

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('joinRoom', (inventoryId) => {
    socket.join(inventoryId);
  });

});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Inventory DB connected');
    await sequelize.sync();
    console.log('✅ Models synced');
  } catch (err) {
    console.error(err);
  }
});
