import { LogEntity, LogSeverityLevel } from "../entities/log-entitys";

export abstract class LogDatasorces {
    abstract saveLog( log: LogEntity ): Promise<void>
    abstract getLogs( severityLogs: LogSeverityLevel ): Promise<LogEntity[]>
}