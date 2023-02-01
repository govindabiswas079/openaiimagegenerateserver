import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import MoveitoemojiRoutes from './routes/MoveitoemojiRoutes.js';
import path from 'path';

const __dirname = path.resolve();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/moveitoemoji', MoveitoemojiRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});


const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'security', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'security', 'cert.pem')),
}

// const startServer = async () => {
//   try {
//     connectDB(process.env.MONGODB_URL)
//     // app.listen(4040, () => console.log('Server started on port 8080'));
//     https.createServer(httpsOptions, app)
//       .listen(4040, () => {
//         console.log(`Server connected to https://localhost:${4040}`)
//       })
//   } catch (error) {
//     console.log(error);
//   }
// };
// 
// startServer();

connectDB(process.env.MONGODB_URL).then(() => {
  try {
    https.createServer(httpsOptions, app)
      .listen(4040, () => {
        console.log(`Server connected to https://localhost:${4040}`)
      })
  } catch (error) {
    console.log('Cannot connect to the server', error)
  }
}).catch(error => {
  console.log("Invalid database connection...!");
})
