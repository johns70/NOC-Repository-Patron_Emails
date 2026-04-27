import { LogDatasorces } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log-entitys";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {

    constructor(
        private readonly logDatasorce: LogDatasorces
    ){

    }

    savelog(log: LogEntity): Promise<void> {
        return this.logDatasorce.saveLog(log)
    }

    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasorce.getLogs(severityLevel)
    }
    
}