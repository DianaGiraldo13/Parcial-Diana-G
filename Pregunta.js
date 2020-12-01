class Pregunta{

    constructor(pregunta){
        this.pregunta=pregunta
        
    }

    
    renderactual=()=>{
        let database=firebase.database()
        let component = document.createElement("div")
        component.className="divactual"
        let texto=document.createElement("p")
        texto.innerHTML=this.pregunta.texto;
        let promedio=document.createElement("p")
        database.ref("votos").orderByChild("idpregunta").equalTo(this.pregunta.id).on("value",function (data){
            let total= data.numChildren()
            let puntos=0;
            console.log(data.numChildren())
            data.forEach(function(p){
                let valor=p.val()
                puntos+=valor.puntaje
                promedio.innerHTML= puntos/total
            })
        })
      
      
        component.appendChild(texto)
        component.appendChild (promedio)
        return component

    }
    renderhistorico=()=>{
        let database=firebase.database()
        let component = document.createElement("div")
        component.className="divhistorico"
        let texto=document.createElement("p")
        texto.innerHTML=this.pregunta.texto;
        let promedio=document.createElement("p")
        database.ref("votos").orderByChild("idpregunta").equalTo(this.pregunta.id).on("value",function (data){
            let total= data.numChildren()
            let puntos;

            data.forEach(function(p){
                let valor=p.val()
                puntos+=valor.puntaje
                promedio.innerHTML= puntos/total
            })
        })
     

        component.appendChild(texto)
        component.appendChild (promedio)
        return component
    }







}