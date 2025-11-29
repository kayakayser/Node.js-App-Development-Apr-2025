import cron from "node-cron"

const main = () => {
    cron.schedule("30,55,57 21 14 29 Nov 6", () => console.log(`Hello:${new Date()}`))
}

main()