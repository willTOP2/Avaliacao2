const express = require('express'); 
const app = express();
const storage = require('node-persist')
const bodyParser = require('body-parser')

const pp = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*  Commit #1
No servidor:
* post /noticia { titulo: "", resumo: "", url: "" } - adiciona uma notícia, gerando um identificador (id) único
* get /noticia - retorna todas as notícias salvas
* get /noticia/{id} - retorna somente a notícia identificada pelo id
* post /inscricao { email: ..} - registra o email em uma lista


Commit #3
No servidor:
* put /noticia/{id} - enviar a notícia com o id para todos os e-mails registrados. O título do e-mail é o mesmo título da notícia, e o corpo é o resumo da notícia e a url da fonte original. Antes de enviar o próximo e-mail, aguarde 2 segundos. Ao final, retorne a lista de todos os e-mails para os quais as notícias foram enviadas.

*/


const nodemailer = require('nodemailer'); 


async function main(titulo, resumo ,url, id, email) {
    const transporter = await nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'judah.luettgen@ethereal.email',
            pass: 'BDn1pZCugfgmzKZ6SN'
        }
    });
    const info = await  transporter.sendMail({

      from: '"judah" <judah.luettgen@ethereal.email>', 
      to: email,
      subject: 'Id da  noticia: '+ id +        '  Titulo:  '  + titulo,
      text: 'Resumo da noticia :' + resumo +   ' url: ' + url

  })
  
  console.log(' Enviado email: ' + nodemailer.getTestMessageUrl(info) + ' para ' + email)
  console.log('\n')
}



app.post('/noticia', async(req, res) => {
   
   await storage.init() 
    const noticiaReq = await req.body    
    if(noticiaReq != undefined){

   const save = await storage.setItem('noticia', noticiaReq)
    res.status(200).json({save: save}) 
    } else {

        res.status(400).send('dados invalidos')
    }
   
})




app.get('/noticia', async(req, res) => {

    
    await storage.init() 
    const get = await storage.getItem('noticia') 
    res.send(get)
    

})

app.get('/noticia/:id', async(req, res) => {

    const noticiaID = await parseInt(req.params.id); 

    await storage.init() 
    const get = await storage.getItem('noticia') 
   

    const noticiaGet = await get.find(b => b.ID === noticiaID); 

    if (isNaN(noticiaID)) {
      return  res.status(400).send('Non integer')
    
    }

    if (!noticiaGet) {
        return res.status(400).send('Invalid  ID');
       
    }

    
    res.send(noticiaGet)
    

})


app.post('/inscricao', async(req, res) => {

    const inscricaoReq = await req.body; 

    if(inscricaoReq != undefined){
 
    await storage.init() 
   
   const save =  await storage.setItem('Email', inscricaoReq) 
   
   res.status(200).json({save: save}) 
    } else {
        res.status(400).send('dados invalidos')
    }

    

})



app.put('/noticia/:id', async(req, res) => {

    const noticiaID = await parseInt(req.params.id); 

    await storage.init() 

    const get = await storage.getItem('noticia') 
    const get1 = await storage.getItem('Email') 
     if(isNaN(noticiaID)){

        res.sendStatus(400)
     } 
   
     const noticiaPut = await get.find(b => b.ID === noticiaID); 

    
         const{titulo, resumo, url, ID} =  noticiaPut 

    

        
            let myGreeting = setTimeout(function sayHi() {
               main(titulo, resumo, url ,ID, get1[0]) 
           
            
              }, 2000) 
            

            let myGreeting1 = setTimeout(function sayHi1() {
                main(titulo, resumo, url ,ID, get1[1]) 
              
               
              }, 2000) 
            
              let myGreeting2 = setTimeout(function sayHi2() {
                main(titulo, resumo, url ,ID, get1[2]) 
           
              
              }, 2000) 
             
              return res.send(' Email enviado para : ' + get1.toString() + ' ' )

})
       



app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
}) 

