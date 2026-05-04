import { LogEntity, LogSeverityLevel } from "../../entities/log-entitys"
import { LogRepository } from "../../repository/log.repository"

interface CheckServiceUseCase {
    execute (url: string): Promise<boolean>
}

type succesCallback = () => void
type errorCallback = ( error: string ) => void

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly succesCallback: succesCallback,
        private readonly errorCallback: errorCallback
    ){

    }

 public async execute( url: string ): Promise<boolean>{

    try{
        const reques = await fetch(url)
        if(!reques.ok) throw new Error(`Error uncheck service ${ url }`)

        console.log(`${ url } is ok`)
        const log = new LogEntity({
            message:`Service ${url} working`,
            level: LogSeverityLevel.low,
            origin: 'check-service.ts'
        })

        this.logRepository.savelog(log)
        this.succesCallback()
        return true
    }catch(error){
        const errorMessage = `${error}`
        const log = new LogEntity({ 
            message: errorMessage,
            level: LogSeverityLevel.high,
            origin: "check-service.ts"
        })
        this.logRepository.savelog(log)
        this.errorCallback( `${ error }` )
        return false
    }

    }
}