const fields = document.querySelectorAll("[required]")

function ValidateField(field) {
    //lógica para verificar se existem erros
    function verifyErrors(){
        let foundError = false;
            
            for(let error in field.validity){
                // se não for customError
                //então verifica se tem erro
                if (field.validity[error] && !field.validity.valid) {
                    foundError = error
                }
            }

        return foundError

    }

    function customMessage(typeError){
        const messages = {
            text:{
                valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Por favor, preencha este campo ",
                typeMismatch: "Por favor, preencha um email válido"
            },
            number:{
                valueMissing: "Por favor, preencha este campo",
                typeMismatch: "Por favor, preencha um email válido"        
            },
            
            textarea:{
                valueMissing: "Por favor, preencha este campo"
            },
            select:{
                valueMissing: "Por favor, preencha este campo"
            }
         
        }

        return messages[field.type][typeError]
    } 
    
    function setCustomMessge(message){
        const spanError = field.parentNode.querySelector("span.error")
        if(message){
            spanError.classList.add('active')
            spanError.innerHTML = message
        } else{
            spanError.classList.remove('active')
            spanError.innerHTML = ""
        }
        
    } 

    return function(){
        const error = verifyErrors()

        if(error){
            const message = customMessage(error)

            field.style.borderColor = "red"
            setCustomMessge(message)
        
        } else {
            field.style.borderColor = "blue"
            setCustomMessge()
            
        }
    }
}

function customValidation(event) {

    const field = event.target        
    const validation = ValidateField(field)
    
    validation()

}

for( field of fields ){
    field.addEventListener("invalid", event =>{
        //eliminar o buble
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
    
}


