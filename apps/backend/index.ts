import express from "express";
import organizationRoutes from './routes/organization.route'

const app = express();

app.use(express.json());

app.use("/organizations", organizationRoutes)

app.listen('3000', ()=>{
    console.log("Server running on port 3000");
})