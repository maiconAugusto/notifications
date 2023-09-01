import firebaseAdm from '../drivers/index'
import notification_schema from '../external/database/schema';
import user_schema from '../external/database/schema/user_schema';


import schedule from 'node-schedule';


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
  console.log("sends")
  firebaseAdm.messaging().send(message)
    .then(async (e) => {
      console.log("succ", e)
      await notification_schema.updateOne({ _id: id }, { sentNotification: true });
    })
    .catch((error) => {
      console.log(error);
    });
}

// Converter a data e a string de horário em um objeto Date
function parseDateTimeStrings(dateString, timeString) {
  const [year, month, day] = dateString.split('-').map(Number);
  const [hour, minute] = timeString.split(':').map(Number);

  // Criar um objeto Date com o fuso horário de Brasília (GMT-3)

  // Se atentar nesse fuso horario, dependendo de onde for hospedado, pode ficar ruim.
  const dateTimeBrasilia = new Date(year, month - 1, day, hour, minute);
  dateTimeBrasilia.setUTCHours(dateTimeBrasilia.getUTCHours() - 4);

  return dateTimeBrasilia;
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
    console.log("noti", notifications)
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
    const scheduledDateTime = parseDateTimeStrings(date, timeNotificationServerPush);

    console.log("schedule", scheduledDateTime);
    console.log("currentDate", getFormattedDate())
    // Agendar o envio da notificação com base na data e horário salvos pelo usuário
    schedule.scheduleJob(scheduledDateTime, () => {
      console.log("scheduledDateTime SEND", scheduledDateTime)
      enviarNotificacao({ recipient: userId.recipient, title, body, id: _id });
    });
  } catch (error) {
    console.log(error)
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