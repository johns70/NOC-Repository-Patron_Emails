import { CheckService } from "../domain/use-cases/checks/check-service"
import { FileSystemDatasorces } from "../infrastructure/datasources/file-system.datasources"
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl"
import { CronService } from "./cron/cron-service"

const fileSystemLogRepository = new LogRepositoryImpl(
     new FileSystemDatasorces()
    // new PostGressDatasources
    // new MongoDB
    // new OracleDbSources
)

export class Server {
    public static start() {
        console.log("Init Server app...")
        CronService.createJob(
            '*/5 * * * * * ',
            () => {
                const url = `http://localhost:3000`
                new CheckService(
                    fileSystemLogRepository,
                    () => console.log("Succes Task"),
                    (error) => console.log(error)
                ).execute(url)
            }
            
        )

        
    }
}