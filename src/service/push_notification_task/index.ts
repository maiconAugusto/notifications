import firebaseAdm from '../../drivers/index'
import notification_schema from '../../external/database/schema';
import schedule from 'node-schedule';
import { DateTime } from 'luxon';


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
      console.log("delete")
      await notification_schema.deleteOne({ _id: id });
    });
}


function getFormattedDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês começa de 0
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
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
    // Cancelar todos os agendamentos existentes
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

    // Combine a data e a hora em uma única string no fuso horário local
    const localDateTimeString = `${date}T${timeNotificationServerPush}`;
    
    // Crie um objeto DateTime usando o fuso horário local
    const localDateTime = DateTime.fromISO(localDateTimeString);
    
    // Defina o fuso horário para Brasília (GMT-3)
    const brasiliaDateTime = localDateTime.setZone('America/Sao_Paulo');
    
    // Formate a data e hora final no formato desejado (yyyy-MM-ddTHH:mm:ss)
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