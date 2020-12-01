
const divpregunta=document.getElementById("divpregunta")
const inputpregunta=document.getElementById("inputpregunta")
const boton=document.getElementById("boton")
const divhistorico=document.getElementById("divhistorico")
const db= firebase.database()
let pregunta;


db.ref("preguntaactual").on("value",function(data){
    divpregunta.innerHTML=""
    data.forEach(p=>{
        let valor=p.val()
        let preguntatemporal=new Pregunta(valor)
        divpregunta.appendChild(preguntatemporal.renderactual())
    })
})

db.ref("historico").on("value",function(data){
    divpregunta.innerHTML=""
    data.forEach(p=>{
        let valor=p.val()
        let preguntatemporal=new Pregunta(valor)
        divhistorico.appendChild(preguntatemporal.renderhistorico())
    })
})


boton.addEventListener("click",()=>{

    let referencia=db.ref("preguntaactual").push()
    divhistorico.innerHTML=""
    if(inputpregunta.value!==""){
       db.ref("preguntaactual").once("value",function(data){
           if(data.hasChildren()){

            db.ref("preguntaactual/"+pregunta.id).set(null)
            db.ref("historico/"+pregunta.id).set(pregunta)
            let preguntaT={
                id: referencia.key,
                texto:inputpregunta.value
        
                } 
                referencia.set(preguntaT)
                pregunta=preguntaT
           }else{
            let preguntaT={
                id: referencia.key,
                texto:inputpregunta.value
        
                } 
                referencia.set(preguntaT)
                pregunta=preguntaT
           }
       })

        
    }
})