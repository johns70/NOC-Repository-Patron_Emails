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
        const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low)
        this.logRepository.savelog(log)
        this.succesCallback()
        return true
    }catch(error){
        const errorMessage = `${error}`
        const log = new LogEntity(errorMessage, LogSeverityLevel.high)
        this.logRepository.savelog(log)
        this.errorCallback( `${ error }` )
        return false
    }

    }
}