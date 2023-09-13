import firebaseAdm from '../../drivers/index'
import notification_schema from '../../external/database/schema';
import schedule from 'node-schedule';
import { DateTime } from 'luxon';
const { getOffsetDate } = require('tz-offset');



// Função para enviar notificações
function enviarNotificacao(notificacao) {
  const { recipient, title, body, id } = notificacao;

  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: recipient,
  };
  firebaseAdm.messaging().send(message)
    .then(async () => {
      await notification_schema.deleteOne({ _id: id });
    });
}


function getFormattedDate() {
 // Obtém a data e hora atual no servidor em Washington, D.C.
 const washingtonDateTime = DateTime.now();

 // Define o fuso horário desejado (Brasília)
 const brasiliaTimeZone = 'America/Sao_Paulo';

 // Converte a data e hora para o fuso horário de Brasília
 const brasiliaDateTime = washingtonDateTime.setZone(brasiliaTimeZone);

 // Formata a data atual no fuso horário de Brasília
 const formattedDate = brasiliaDateTime.toISODate();

 return formattedDate;
}

// Atualizar ou agendar notificações após alterações no banco de dados
async function atualizarAgendamentos() {
  try {
    console.log("getFormattedDate()", getFormattedDate())
    const notifications = await notification_schema.find({
      $and: [
        { sentNotification: false },
        { date: getFormattedDate() },
        { timeNotificationServerPush: { $ne: null } },
        { timeNotificationServerPush: { $ne: "" } }
      ]
    }).populate(['userId']);
    console.log(notifications);
    // Cancelar todos os agendamentos existentes
    // @ts-ignore
    schedule.cancelJob();

    // Agendar novamente todas as notificações com base nos novos dados
    for (const notification of notifications) {
      agendarNotificacao(notification);
    }
  } catch (error) {
    console.error('Erro ao atualizar agendamentos:', error);
  }
}

// Agendar uma notificação
function agendarNotificacao(notification) {
  try {
    const { title, body, date, timeNotificationServerPush, userId, _id } = notification;

    // Combine a data e a hora em uma única string
    const localDateTimeString = `${date}T${timeNotificationServerPush}`;
    
    // Crie um objeto DateTime usando o fuso horário local (Brasília)
    const brasiliaDateTime = DateTime.fromISO(localDateTimeString, { zone: 'America/Sao_Paulo' });
    
    // Formate a data e hora final no formato desejado (yyyy-MM-dd'T'HH:mm:ss)
    const formattedDateTime = brasiliaDateTime.toFormat('yyyy-MM-dd\'T\'HH:mm:ss');
    
    console.log("scheduledDateTime SEND", formattedDateTime);

    // Agendar o envio da notificação com base na data e horário salvos pelo usuário
    schedule.scheduleJob(brasiliaDateTime.toJSDate(), () => {
      enviarNotificacao({ recipient: userId.recipient, title, body, id: _id });
    });
  } catch (error) {
    console.log(error);
  }
}

// Função para configurar o change stream e iniciar o processo
export default async function iniciarAgendamentoENotificacoes() {
  // Inicializar o agendamento das notificações
  await atualizarAgendamentos();
  // Configurar o change stream para ouvir mudanças na coleção de notificações
  // @ts-ignore
  const changeStream = notification_schema.watch({ fullDocument: 'updateLookup' });

  changeStream.on('change', (change) => {
    // Verificar se as informações relevantes foram alteradas
    if (
      change.operationType === 'insert' || // Novo dado inserido
      (change.operationType === 'update' && (
        change.updateDescription.updatedFields.date || // date foi atualizado
        change.updateDescription.updatedFields.timeNotificationServerPush // timeNotification foi atualizado
      ))
    ) {
      // Atualizar os agendamentos após uma mudança
      atualizarAgendamentos();
    }
  });
}