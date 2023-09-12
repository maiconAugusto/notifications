import admin from 'firebase-admin';

export default admin.initializeApp({ 
  credential: admin.credential.cert(
    {
      "type": "service_account",
      "project_id": "taskapp-54179",
      "private_key_id": "bd3a614d6a48ebaeb8eb9595966db03c4441b9e4",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCli95E3ZBJOcKv\nIrrqkKWnhN+m5cLOkXs6hQ2suvztVyq3Lae/HasNQbd4XfTh8u8+2OeVfw1RUrm2\nWrYePPHJuO7iUePbZMzainJFj1zmvNmbEBceEPRLCamJimLNXZSTlAix5dEkCFV8\nJWrNXTUOkKkd6etZbiRYcSqdT6cOpp6NXaR1t//2fkNd7x51iM5uAOhPC99Fs3g4\nIaVjhG/dpj7qVhWDA9gtHYPK6ZvBHOIwGMB2aCV4O04kJwasM+g7w/WzGTelZW0/\nCbiO/f1CDPeLjTj8q3hYeCCLvbMylrDyqzXnpi5UnKKsGTq3cZ52G3kJsToJYY34\n3BeS1qxTAgMBAAECggEACVVkd7+CNg6yoksz/KuhG1vLfE5x+FGNgBQmXDnCruL+\nPoutbIIQtdOhs4CgoOiggouaKvyZ1J70Z4qfv/6xpyztEweI8EKzphKuNKvLkhrN\nrgdvNjvAekaWL3IE9g0zpkpvXxBVBVIO98voRKHfru2LC2u34DfshqwCuhHWmmXF\nMzzx084ggnwRg4TeNyPNOlDSphh9VZWS9fl7XzEd1vXIUmk9RwryE3OzvHHun9G9\nVgSSfel6CrXdUSXrCRBSnomNH8VgfM9NdH531uM7R334KIF2qjHdmhk332wqbpNF\n/gSvtDe7TtXDNTFZrj/imReIIcHuuge8Y7bsmWpPMQKBgQDiWbumdBzHtWWFyAI1\nRZTh4O04C4plaFKbyKIqUBSK4zdaivqfT+mLCJ4tMT5JRZdDd8cZoKIBz425aooI\narm+Qg0VGfyfn6QwcMLaPitOfMJJ5JpX+7OIgo7DPt/KrvSKnxovaJ8E59orWdfe\nmUX1Xi1WTz0iherjvz//N2s8CQKBgQC7OyyxHqOUxhRgOJM1QmGBBBntKz9H+dwl\nj2gbw++UmtlcN+V+ofCVuTGXBel2zc4CgQmhrLEC4AqgOaGxE3LXieFNR87o7o9E\nKfF9KBRrp58WymDjYhD2SAhnt7LBUWx8SUQAi2ZALfwJgtpqEkizWVL+9Vbj5oGD\nZTx2juc0ewKBgDE4SAjTGOsIc/IaYviIj+5qRcs5Hzgb7lK31yOSVFU7QW8r54G7\nE9LK5fJ30c6HFnRyWFYnSvNP2cam9ysLYiaQIF4lT3y6by6lZomkmTAxCuKclj9p\nmUmm8jpcsrdVQhHetQf4HRQpApUIrVtXQxIvD3bENkwKiOBLVzQ9LdFZAoGBALqZ\niz0rMBUCJSSQvgYClnKix8QbqgHt/35fon6plIkimybRfqPqeYB/BfFiLv/8tSjB\nufurxO78oxp01bVJkNdHz4fZ3VlBCQACXW9DFrcEZAWuxUlZX1ZVDCtyZXFN2TU1\nP9TbGZk1O0+vXkcA2fwFNjZsBaE1BjcSGmR+n+cpAoGBAMHy6Sz+9ePXVBdKGtlP\nICaZ8He0urL91Pg7Iogpxls18xJuizoddj/gfqfQp+CzmGwLyJTh7zhPa/ne1IkG\nW51Nm2++K8g0ZyIHEb2ORbEgpgkJIvJG7FCyH6PhtvDjnlGL1O4L0iHhsDQMHgYl\nbg5PTMToBhYYQI4QPTdbj1YD\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-1bdpy@taskapp-54179.iam.gserviceaccount.com",
      "client_id": "111649254484643109070",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1bdpy%40taskapp-54179.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    }
  ),
});