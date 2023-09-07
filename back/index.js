import app from "./app.js";
import { Dbs } from "./Database.js/DB.js";
const port= process.env.PORT || 7000

Dbs()




app.listen(port,()=>{
    console.log(`listening at port  ${port}`)
})