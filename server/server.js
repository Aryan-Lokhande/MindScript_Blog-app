import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();

await connectDB();

const port = process.env.PORT || 3030;
app.listen(port, ()=> 
    console.log(`Server is runing on ${port}\n Get directed to http://localhost:${port}`)
);
//Middleware
app.use(cors());
app.use(express.json());

//Route
app.get('/', (req,res)=>{
    res.send("API is working");
});
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);


export default app;