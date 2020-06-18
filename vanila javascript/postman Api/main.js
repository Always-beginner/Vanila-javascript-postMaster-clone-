// creation postman clone api 

let paraBox = document.getElementById('parametersBox')
paraBox.style.display = 'none';

let parametersBox = document.getElementById('paramsRadio');
let jsonBox = document.getElementById('jsonRadio')

parametersBox.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none'
    document.getElementById('parametersBox').style.display = 'block'
})

jsonBox.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block'
    document.getElementById('parametersBox').style.display = 'none'
})

let addParam = document.getElementById('addParam')

function getDivElement(string) {
    let div = document.createElement('div')
    div.innerHTML = string;
    return div.firstElementChild;
}
let paramCount = 0;
addParam.addEventListener('click', () => {
    let param = document.getElementById('params')
    let paraString = `<div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter${paramCount + 2}</label>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterKey${paramCount + 2}" placeholder="Key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterValue${paramCount + 2}" placeholder="Value">
                        </div>
                        <button id="delParam${paramCount + 1}"  class="btn btn-primary delParam"> - </button>
                      </div>`
    paramCount++;
    let paramElement = getDivElement(paraString);
    param.appendChild(paramElement);

    let delParam = document.getElementById(`delParam${paramCount}`)
    // console.log(delParam);

    // for(item in delParam){

    delParam.addEventListener('click', (e) => {
        delParam.parentElement.remove();
        paramCount--;
    })
    // }
})

let submit = document.getElementById('submit');
    
    submit.addEventListener('click',()=>{
            
        let response = document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";
        Prism.highlightAll();
        let url = document.getElementById('url').value;
        let requestType = document.querySelector("input[name='requestType']:checked").value;
        let contentType = document.querySelector("input[name='contentType']:checked").value;

        console.log(url);
        console.log(requestType);
        console.log(contentType);
        
        
        
        if(contentType == 'params'){
            data = {}
            for (let i = 0; i< paramCount +1;i++){
                if(document.getElementById('parameterKey' + (i+1)) != undefined){
                let Key = document.getElementById('parameterKey' + (i+1)).value;
                let value = document.getElementById('parameterValue' + (i+1)).value;
                data[Key]= value;
            }
        }
        data = JSON.stringify(data)
    }
    else{
        data = document.getElementById('requestJsonText').value;
    }
    console.log(data);
    
        if(requestType == 'GET'){
            fetch(url,{
                method : 'GET'
            }).then(res => res.text()).then((text)=>{
                document.getElementById('responsePrism').innerHTML = text
                Prism.highlightAll();
            })
        }
        else{
            fetch(url,{
                method : 'POST',
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
            }).then(res => res.text()).then((text)=>{
                document.getElementById('responsePrism').innerHTML = text
                Prism.highlightAll();
            })
        }



    })