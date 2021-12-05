const express = require('express');
const storage = require('node-persist');
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
        nome: noticia.nome,
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

app.listen(3000, () => {});