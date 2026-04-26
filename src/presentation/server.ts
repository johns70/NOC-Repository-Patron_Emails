import { CheckService } from "../domain/use-cases/checks/check-service"
import { CronService } from "./cron/cron-service"


export class Server {
    public static start() {
        console.log("Init Server app...")
        CronService.createJob(
            '*/5 * * * * * ',
            () => {
                const url = `https://google.com`
                new CheckService(
                    () => console.log("Succes Task"),
                    (error) => console.log(error)
                ).execute(url)
            }
            
        )

        
    }
}