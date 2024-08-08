import cron from "node-cron"

cron.schedule("0 * * * * ", ()=>{
    try {
        console.log("Log secondo")
    } catch (error) {
        console.log(error)
    }
})