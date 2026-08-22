import express from "express";
import { prisma } from "db/client";

const app = express();

app.use(express.json());


app.post('/signup', async (req, res) => {
    const {username, password} = req.body;

    console.log('Signup request received:', { username, password });
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password
            }
        });

        console.log('User created successfully:', user);
        res.json({
            message: "Signup Successfull",
            user: { id: user.id, username: user.username }
        });
    } catch (error) {
        console.error('Signup error:', error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({
            message: "Signup failed",
            error: errorMessage
        });
    }
});

app.listen('3000', ()=>{
    console.log("Server running on port 3000");
})