const axios = require("axios");
const url = "http://127.0.0.1:3000";


/* Registrando noticias */
axios.post(url+"/noticia", {
    nome: 'Risco de contrair Covid-19 com máscara PFF2 é mínimo, aponta estudo',
    resumo: 'Se usada corretamente, proteção facial oferece quase 100% de proteção contra infecção pelo coronavírus, concluem pesquisadores da Alemanha. Sem máscara, probabilidade de se infectar é de 90%, mesmo com distanciamento.',
    url: 'https://g1.globo.com/saude/coronavirus/noticia/2021/12/05/risco-de-contrair-covid-19-com-mascara-pff2-e-minimo-aponta-estudo.ghtml'
})
.then((res) => console.log(res.data))
.catch((err) => console.log(err));

axios.post(url+"/noticia", {
    nome: 'Auxílio Brasil: com revisões cadastrais contínuas, famílias poderão ter benefício suspenso ou cancelado',
    resumo: 'Beneficiários passarão por verificação periódica das informações registradas no Cadastro Único; auxílio pode ser cancelado caso as informações checadas não atendam aos requisitos do programa.',
    url: 'https://g1.globo.com/economia/noticia/2021/12/05/auxilio-brasil-com-revisoes-cadastrais-continuas-familias-poderao-ter-beneficio-suspenso-ou-cancelado-entenda.ghtml'
})
.then((res) => console.log(res.data))
.catch((err) => console.log(err));

axios.post(url+"/noticia", {
    nome: 'Réveillon 2022: cidades descartam festas, eventos ou shows',
    resumo: 'Aracaju, Belém, Brasília, Campo Grande, Cuiabá, Florianópolis, Fortaleza, Goiânia, João Pessoa, Maceió, Manaus, Natal, Palmas, Porto Alegre, Recife, Rio de Janeiro, Salvador, São Paulo, São Luís e Vitória anunciaram cancelamento total ou parcial de eventos.',
    url: 'https://g1.globo.com/saude/coronavirus/noticia/2021/11/29/reveillon-2022-cidades-que-cancelaram-festas-eventos-ou-shows.ghtml'
})
.then((res) => console.log(res.data))
.catch((err) => console.log(err));

axios.post(url+"/noticia", {
  nome: 'Criminosos vendem dados pessoais pela internet utilizando cadastros de órgãos oficiais',
  resumo: 'https://g1.globo.com/jornal-nacional/noticia/2021/12/04/criminosos-vendem-dados-pessoais-pela-internet-utilizando-cadastros-de-orgaos-oficiais.ghtml',
  url: 'Reportagem do jornal Folha de S. Paulo revela que os criminosos vendem as informações reunidas em painéis através de um login e senha por valores de até R$ 50 por semana.'
})
.then((res) => console.log(res.data))
.catch((err) => console.log(err));

axios.post(url+"/noticia", {
    nome: 'Sem recursos para construção, mulher cria hotel de barracas na zona rural de Areia, PB, durante a pandemia',
    resumo: 'Empreendimento oferece uma experiência completa de vivência na zona rural, além de opções de hospedagens mais convencionais, para atender diferentes públicos.',
    url: 'https://g1.globo.com/pb/paraiba/noticia/2021/12/05/sem-recursos-para-construcao-mulher-cria-hotel-de-barracas-na-zona-rural-de-areia-pb-durante-a-pandemia.ghtml'
})
.then((res) => console.log(res.data))
.catch((err) => console.log(err));

/* Registrando noticias */

/* Registrando os 7 e-mails */

let counter = 1;
let sendEmailsInterval = setInterval(() => {
    axios.post(url+"/inscricao", {
        email: "teste"+counter+"@muvilo.net"
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
    if(counter == 7){
        clearInterval(sendEmailsInterval)
    }
    counter++
},2000);

/* Registrando os 7 e-mails  */


