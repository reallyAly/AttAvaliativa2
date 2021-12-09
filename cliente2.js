const axios = require("axios");
const url = "http://127.0.0.1:3000";

/* Exibindo noticias */
axios.get(url+"/noticia")
.then((res) => console.log(res.data))
.catch((err) => console.log(err));


axios.get(url+"/noticia")
.then((res) => {
    let noticiaId = res.data[0].noticia_id;

    axios.get(url+"/noticia/"+noticiaId)
    .then((noticia) => {
        axios.put(url+"/enviar/"+noticia.data.noticia_id)
        .then((emails) => {
            console.log(emails.data);
        });
    });
})
.catch((err) => console.log(err));