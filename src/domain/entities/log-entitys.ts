export enum LogSeverityLevel {
    low = "low",
    medium = "medium",
    high = "high"
}

export interface LogEntityOptions {
   level: LogSeverityLevel
   message: string
   createdAt?: Date
   origin: string
}

export class LogEntity {
  public level: LogSeverityLevel
  public message: string
  public createdAt: Date
  public origin: string

  constructor( options:LogEntityOptions) {
    const { level, message, origin, createdAt = new Date() } = options

    this.level = level
    this.message = message
    this.origin = origin
    this.createdAt = createdAt
  }
// { "level":"medium", "message": "scscs", "createdAt": "4466ZAH" }

//esto es para  delegar el  parseo JSON.parse y asi dividir responsabilidades
  static fromJson = (json: string): LogEntity => {
    const { level, message, createdAt, origin } = JSON.parse(json)

    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
     })
    return log
  }
}