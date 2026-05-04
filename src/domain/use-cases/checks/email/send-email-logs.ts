import { EmailService } from "../../../../presentation/email/email-service"
import { LogEntity, LogSeverityLevel } from "../../../entities/log-entitys"
import { LogRepository } from "../../../repository/log.repository"

export interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}


export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly LogRepository: LogRepository
    ) {}

    async execute(to: string | string[]) {
        try {
            const email = await this.emailService.SendEmailWithSystemLogs(to)
            if(!email) {
                throw new Error("Email not send")
            } 

            const log = new LogEntity({ message: 'Send Email', level: LogSeverityLevel.low, origin:'send-email-logs' })
            this.LogRepository.savelog(log)
            return true
        } catch(error){

            const log = new LogEntity({ message:`${error}`, level: LogSeverityLevel.high, origin:'send-email-logs' })
            this.LogRepository.savelog(log)
            return false
        }
    }
}

