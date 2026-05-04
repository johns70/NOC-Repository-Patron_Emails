import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log-entitys';

interface sendEmailOption {
    to: string| string[],
    subject: string,
    htmlBody: string
    attachment?: Attachment[]
    // Todo...
}


interface Attachment {
    filename: string,
    path: string
}

export class EmailService {
    private transport = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRETE_KEY
        }
    })

    constructor(
    ){}


    async sendEmail(option:sendEmailOption):Promise<boolean>{
        const { to, subject, htmlBody, attachment = [] } = option

       
        try{
            const sendInformation = await this.transport.sendMail({
                to,
                subject: subject,
                html:htmlBody,
                attachments:attachment
            })

                console.log(sendInformation)
            return true;
        }catch(error) {           
            return false;
        }
    }

     async SendEmailWithSystemLogs( to: string | string[] ) {
        const subject = `Info Logs del Servidor`
        const htmlBody = `
            <h2>Logs del Sistema - NOC</h2>
        `

        const attachment:Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
        ]

        return this.sendEmail({
            to, subject, htmlBody, attachment
        })
    }
}