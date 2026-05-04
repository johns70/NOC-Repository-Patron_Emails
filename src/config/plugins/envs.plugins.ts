// nos traemos el dontenv para cargar las variable del archivo .env
// usamos env-var para parametrisar de la manera en que nosotrod queremos dichas variables
import 'dotenv/config'
import * as env from 'env-var'


export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRETE_KEY: env.get('MAILER_SECRETE_KEY').required().asString(),
    MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
    PROD: env.get('PROD').required().asBool()
}