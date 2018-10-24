var app = new Vue({
  el: '#app',
  data: {
    ds:{
      'name': 'raiz'
     },
     titles: [
       {
         "name":"proyecto"
       }
     ]
  }
});


var oc = $('#chart-container').orgchart({
  'data' : app.ds,
  'depth': 2,
  'nodeContent': 'title'
});

console.log(app.ds);

function createConnection(){
  var varName = document.getElementById("varNombre").value;
  var valor = document.getElementById("valor").value;
  var selectVar = document.getElementById("selectVar").value;
  console.log(selectVar);

  var newNodo = {
    "name": varName,
    "title": valor
  };
  //SE APLICA RECURSIVIDAD PARA INSERTAR NODOS
  insertNode(app.ds,selectVar,newNodo);

  $('#chart-container').remove();

  $('#app').append("<div id='chart-container'></div>");

  var oc = $('#chart-container').orgchart({
    'data' : app.ds,
    'depth': 2,
    'nodeContent': 'title'
  });

  console.log(app.ds);
}

function insertNode(raiz,name,nodo){
  if(raiz.name == name){
    console.warn("se encontro a un nodo padre");
    if(!raiz.children){
      raiz.children = [];
      raiz.children.push(nodo);
      app.titles.push({"name": nodo.name});
    }else{
      raiz.children.push(nodo);
      app.titles.push({"name": nodo.name});
    }
  }else{
    if(raiz.children){
      raiz.children.forEach((item) =>{
        insertNode(item,name,nodo);
      });
    }
  }
}
