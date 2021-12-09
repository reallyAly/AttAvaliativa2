const express = require('express');
const storage = require('node-persist');
const nodemailer = require("nodemailer");
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({    
  extended: true
}));

async function inicia()
{
    await storage.init({
        dir: './persist',
        stringify: JSON.stringify,
        parse: JSON.parse,
        encoding: 'utf8',
        logging: false, 
        ttl: false, 
        expiredInterval: 2 * 60 * 1000,
        forgiveParseErrors: false
    });
}

async function adicionaNoticia(noticia)
{
    await storage.setItem(Math.floor(Date.now() * Math.random()).toString(36),{
        titulo: noticia.titulo,
        resumo: noticia.resumo,
        url: noticia.url
    });
}

async function retornaTodasNoticias()
{
   return await storage.values();
}

async function retornaNoticia(id)
{
    return await storage.getItem(id);
}

async function registraEmail(email)
{
    let listaEmails = await storage.getItem("lista_emails");

    if(listaEmails){
        listaEmails.push({email});
        return await storage.updateItem("lista_emails",listaEmails);
    }
    
    return await storage.setItem("lista_emails", [{email}]);
}

async function envioDeEmail(noticiaId)
{
    let noticia = await storage.getItem(noticiaId);

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: "zoe.hoppe34@ethereal.email", 
          pass: "fGFNTxYHVZuGP14YwP"
        }
    });
    
    let listaEmails = await storage.getItem("lista_emails");

    let tamanhoLista = (listaEmails.length) - 1; 
    let counter = 0;
    
    let emailInterval = setInterval(() => {
        enviarEmail(transporter, listaEmails[counter], noticia)
       .then((res) => {
            console.log(res);
        })
       .catch((res) => {
           console.log(res);
        });

        if(counter == tamanhoLista){
            clearInterval(emailInterval);
        }
        counter++;
    },2000);

    return listaEmails;
}

async function enviarEmail(transporter, email, noticia)
{
    return await transporter.sendMail({
        from: 'zoe.hoppe34@ethereal.email',
        to: email.email,
        subject: noticia.titulo, 
        text: noticia.resumo,
        html: noticia.resumo
    });
}

inicia();

app.post('/noticia', (req, res) => {
    adicionaNoticia(req.body);
    res.send("Noticia adicionada com sucesso");
});

app.get('/noticia', (req, res) => {
    retornaTodasNoticias().then((data) => res.send(data));
});

app.get("/noticia/:id", (req, res) => {
    retornaNoticia(req.params.id).then((noticia) => res.send(noticia));
});

app.post("/inscricao", (req, res) => {
    registraEmail(req.body.email);
    res.send("Inscrição realizada com sucesso");
});

app.put("/enviar/:id",(req, res) => {
    envioDeEmail(req.params.id).then((response) => res.send(response));
});

app.listen(3000, () => {});