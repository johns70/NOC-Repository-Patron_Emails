import { envs } from "./config/plugins/envs.plugins"
import { Server } from "./presentation/server"

(async() => {
    await main()
})()


function main(){
    // Server.start()
    console.log(envs.PORT)
}

// email: process.env.PORT "3000" 
// email: process.env.PROD "true" 
// .env tods los datos los pasa en string, esto es un problema por que no veriifca si la variable es la correcta
// ya sea que un correo este bien escrito, tipado, etc solo lee dontenv sin más, para ellos usamos el paquete de env-var
// para establecer tipo, requerimiento de si es un email que sea valido, etc