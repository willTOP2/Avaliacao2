const axios = require('axios').default 



const noticias =[
    {
        ID: 1,
        resumo: 'Filmes em 2022',
        titulo: 'Dan Brown',
        url: 'www.filmescom.com.br'
    },
    {
        ID: 2,
        resumo: 'Filmes em 2021',
        titulo: 'A regra',
        url: 'www.filmescom.com.br'
    }
    
]

const email = ['willian.rodrygues146@gmail.com', 'joao@uol.com', 'jose@gmail.com', 'lu@hotmail.com']

//Commit #2
//Implemente um cliente que adicione 3 notícias e 4 e-mails, usando a API.
 


axios.post('http://localhost:3000/noticia', noticias
    
)
    .then((res) => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err.response.data);
    });

   

    axios.post('http://localhost:3000/inscricao', 
    email
  
)
    .then((res) => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err.data);
    });







 
    axios.get('http://localhost:3000/noticia')
    .then((response) => {
        console.log(response.data);
    }).then((res)=>{
        axios.get('http://localhost:3000/noticia/1')
        .then((res)=>{
            console.log(res.data);
        })
      
            .then((res)=>{
                axios.put('http://localhost:3000/noticia/1', noticias)
                .then((res)=>{
                    console.log(res.data);
                })
    })})