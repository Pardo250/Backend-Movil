import 'dotenv/config.js';
import app from "./app.js";
import { sequelize } from "./models/index.js";
import { seedDatabase } from "./seeders/seed.js";

async function init(){
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");
        
        await sequelize.sync({ alter: true });
        console.log("Database synchronized");
        
        await seedDatabase();
        
        app.listen(3000, () => {
            console.log("Server on port 3000");
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}

init(); 