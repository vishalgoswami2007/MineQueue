import app from './app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 3000

connectDB();

const server = app.listen(PORT, () => {
   console.log(`Server Running At ${PORT}`);
});

server.on('error', (err) => {
   console.log('SERVER ERROR:', err);
});