interface CheckServiceUseCase {
    execute (url: string): Promise<boolean>
}

type succesCallback = () => void
type errorCallback = ( error: string ) => void

export class CheckService implements CheckServiceUseCase {

    constructor(
    private readonly succesCallback: succesCallback,
    private readonly errorCallback: errorCallback
    ){

    }

 public async execute( url: string ): Promise<boolean>{

    try{
        const reques = await fetch(url)
        if(!reques.ok) throw new Error(`Error uncheck service ${ url }`)

        console.log(`${ url } is ok`)
        this.succesCallback()
        return true
    }catch(error){

        console.error(`${ error }`)
        this.errorCallback( `${ error }` )
        return false
    }

    }
}