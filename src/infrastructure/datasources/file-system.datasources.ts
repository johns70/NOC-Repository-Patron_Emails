import  fs  from "fs";
import { LogDatasorces } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log-entitys";


export class FileSystemDatasorces implements LogDatasorces {

    private readonly logPath = 'logs/'
    private readonly allPath = 'logs/logs-all.log'
    private readonly mediumPath = 'logs/logs-medium.log'
    private readonly highPath = 'logs/logs-high.log'

    constructor() {
        this.createLogsFile()
    }


    private createLogsFile = () => {
        if( !fs.existsSync(this.logPath) ) {
            fs.mkdirSync(this.logPath)
        }

        [
            this.allPath,
            this.mediumPath,
            this.highPath
        ].forEach(path => {
            if( fs.existsSync(path) ) return
                fs.writeFileSync(path, "")
            
        } )
    }

   async saveLog( newLog: LogEntity ): Promise<void> {
        const logAsJson = `${JSON.stringify(newLog)}\n`

        fs.appendFileSync(this.allPath, logAsJson)

        if(newLog.level === LogSeverityLevel.low) return
        if(newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumPath, logAsJson)
        } else {
            fs.appendFileSync(this.highPath, logAsJson)
        }

    }

    private getLogsFromFile = (path: string):LogEntity[] => {
        const contain = fs.readFileSync(path, "utf-8")
        const logs = contain.split('\n').map(log => LogEntity.fromJson(log))

        return logs
    }


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch(severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allPath)
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumPath)
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highPath)
            default:
                throw new Error(`${ severityLevel } not implemented`)
        }
    }

}