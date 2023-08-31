import 'dotenv/config';
import database from "./external/database";
import iniciarAgendamentoENotificacoes from "./service";

class InitService {
  constructor() {
    this.initDatabase();
  }
  private async initDatabase() {
    await database.databaseConnection();
    this.initScript();
  }

  private async initScript() {
    console.log("THIS")
    await iniciarAgendamentoENotificacoes();
  }
}
new InitService();