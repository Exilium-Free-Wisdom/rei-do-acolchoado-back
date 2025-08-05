import { app } from "./app";


const port = Number(process.env.PORT) || 3000;
    
app.listen(PORT => {
    console.log(`Server running on port ${port}`)
})