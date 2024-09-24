import {format} from 'logform';

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

export class Logger {
  context: string;
  enabled: boolean;
  static logFormat = format.combine(
    format.timestamp(),
    format.align(),
    format.json(),
    format.printf((info) => `${info.timestamp} ${info.level} ${info.message}`)
  );

  constructor({context, enabled}: {context: string; enabled?: boolean}) {
    this.context = context;
    this.enabled = enabled ?? process.env.LOGGER_ENABLED === 'true';
  }

  info(...message: unknown[]) {
    console.info(
      Logger.logFormat.transform({
        level: 'INFO',
        message: `${this.context}: ${message.join(' ')}`,
      })
    );
  }

  warn(...message: unknown[]) {
    console.warn(
      Logger.logFormat.transform({
        level: 'WARN',
        message: `${this.context}: ${message.join(' ')}`,
      })
    );
  }

  error(...message: unknown[]) {
    console.error(
      Logger.logFormat.transform({
        level: 'ERROR',
        message: `${this.context}: ${message.join(' ')}`,
        [Symbol.for('level')]: 'ERROR',
      })
    );
  }

  debug(...message: unknown[]) {
    console.log(
      Logger.logFormat.transform({
        level: 'DEBUG',
        message: `${this.context}: ${message.join(' ')}`,
      })
    );
  }

  dir(obj: unknown, level: LogLevel, ...message: unknown[]) {
    console.log(
      Logger.logFormat.transform({
        level: level,
        message: `${this.context}: ${message?.join(' ')}`,
      })
    );
    console.dir(obj);
  }
}
