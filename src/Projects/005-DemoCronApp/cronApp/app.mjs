import {CronJob, CronTime} from "cron"

const main = () => {
    /*
    const job = new CronJob("* * * * * *", () => console.log(`Hello:${new Date()}`), () => console.log("Completed"), false, null)

    job.start()

     */

    const job = CronJob.from({cronTime: "* * * * * * ",
        onTick: () => console.log(`Hello:${new Date()}`),
        start: true,
        timeZone: "America/Los_Angeles"
    })
}

main()