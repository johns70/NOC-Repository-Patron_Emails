import { LogRepository } from "../domain/repository/log.repository"
import { CheckService } from "../domain/use-cases/checks/check-service"
import { SendEmailLogs } from "../domain/use-cases/checks/email/send-email-logs"
import { FileSystemDatasorces } from "../infrastructure/datasources/file-system.datasources"
import { LogRepositoryImpl } from "../infrastructure/repository/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service"

const fileSystemLogRepository = new LogRepositoryImpl(
     new FileSystemDatasorces()
    // new PostGressDatasources
    // new MongoDB
    // new OracleDbSources
)

const emailService = new EmailService()

export class Server {
    public static async start() {
        console.log("Init Server app...")
        // CronService.createJob(
        //     '*/5 * * * * * ',
        //     () => {
        //         const url = `http://localhost:3000`
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log("Succes Task"),
        //             (error) => console.log(error)
        //         ).execute(url)
        //     }
            
        // )

       new SendEmailLogs(
           emailService,
           fileSystemLogRepository
       ).execute(
        ['amadorbenitezgabriela@gmail.com']
       )
        // console.log("hollaaa")
        // const result = await email.sendEmail({
        //     to: "amadorbenitezgabriela@gmail.com",
        //     subject: "Prueba de Envio de Correo Electronico",
        //     htmlBody: `
        //     <div>Este correo es de prueba </div>
        //     <p>Lorem Ipsum se deriva de un texto en latín de Cicerón, escrito en el año 45 a.C., específicamente de su obra De finibus bonorum et malorum (Sobre los límites del bien y del mal),. El texto original fue modificado para que no tenga sentido coherente, eliminando sílabas o letras, lo que permite que el lector se concentre en el diseño visual y no en la lectura. Su uso se popularizó en el siglo XVI cuando un impresor desconocido mezcló fragmentos de textos para crear libros de muestra. En los años 60, se difundió aún más con las hojas de Letraset y posteriormente con software de autoedición como Aldus PageMaker. 
        //     Wikipedia
        //     +1
        //     Propósito y Uso
        //     El principal objetivo de Lorem Ipsum es llenar espacios de texto en maquetas o diseños sin distraer al lector con contenido real. Esto permite a diseñadores y editores evaluar la tipografía, el espaciado y la distribución visual antes de que el contenido final esté disponible. Se le conoce también como texto de relleno, texto ficticio o marcador de posición. 
        //     Lorem Ipsum
        //     +2
           
        //     </p>
        //     `
        // })
        // console.log("Email result:", result)
    }
}

// 

