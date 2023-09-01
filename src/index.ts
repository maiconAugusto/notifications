import 'dotenv/config';
import database from "./external/database";
import iniciarAgendamentoENotificacoes from "./service";
const schedule = require('node-schedule');
const { exec } = require('child_process');

class InitService {
  constructor() {
    this.initDatabase();
  }
  private async initDatabase() {
    await database.databaseConnection();
    this.initScript();
  }

  private async initScript() {
    iniciarAgendamentoENotificacoes()

    const rule = new schedule.RecurrenceRule();
    rule.tz = 'America/Sao_Paulo'; // Horário de Brasília
    rule.hour = 0;
    rule.minute = 0;

    schedule.scheduleJob(rule, iniciarAgendamentoENotificacoes);
  }
}
new InitService();