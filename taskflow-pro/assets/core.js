(function(){
  'use strict';
  const TASK_KEY='taskflow.pro.shared.tasks.v1';
  const defaults=[
    {id:'t1',title:'Preparar apresentação SPA × MPA',description:'Organizar roteiro e demonstração',project:'Web III',priority:'alta',due:'2026-11-06',status:'fazendo'},
    {id:'t2',title:'Revisar conteúdo da aula',description:'Conferir conceitos principais',project:'Web III',priority:'media',due:'2026-11-05',status:'feito'},
    {id:'t3',title:'Finalizar layout responsivo',description:'Testar em celular e desktop',project:'TaskFlow',priority:'media',due:'2026-11-07',status:'fazer'},
    {id:'t4',title:'Enviar arquivos da atividade',description:'Compactar projeto e documentação',project:'FATEC',priority:'alta',due:'2026-11-08',status:'fazer'},
    {id:'t5',title:'Documentar decisões técnicas',description:'Explicar localStorage e navegação',project:'TaskFlow',priority:'baixa',due:'2026-11-09',status:'fazendo'}
  ];
  function loadTasks(){try{const value=JSON.parse(localStorage.getItem(TASK_KEY));if(Array.isArray(value))return value}catch(e){}localStorage.setItem(TASK_KEY,JSON.stringify(defaults));return defaults.map(x=>({...x}))}
  function saveTasks(tasks){localStorage.setItem(TASK_KEY,JSON.stringify(tasks))}
  function esc(value){const node=document.createElement('span');node.textContent=value||'';return node.innerHTML}
  window.TaskFlowCore={TASK_KEY,loadTasks,saveTasks,esc};
}());
