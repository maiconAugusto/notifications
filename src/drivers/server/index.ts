import express from 'express';
import 'dotenv/config';
import database from "../../external/database";
import iniciarAgendamentoENotificacoes from "../../service";

class InitService {
    public express: express.Application;
    constructor() {
        this.express = express();
        this.initDatabase();
        this.init();
    }
    private async initDatabase() {
        await database.databaseConnection();
        this.initScript();
    }

    private async initScript() {
        console.log("THIS")
        await iniciarAgendamentoENotificacoes();
    }

    private init() {
        this.express.listen(3000, () => {
            console.log("application listening.....");
          });
    }
}
export default InitService;