const campoTarefa = document.getElementById("campoTarefa");
const botaoAdicionar = document.getElementById("botaoAdicionar");
const listaTarefas = document.getElementById("listaTarefas");

const carregarTarefas = () => {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  listaTarefas.innerHTML = "";
  tarefas.forEach((tarefa, indice) => createTaskElement(tarefa, indice));
};

const createTaskElement = (tarefa, indice) => {
  const item = document.createElement("li");
  item.className = "list-group-item d-flex justify-content-between align-items-center";

  const textoTarefa = document.createElement("span");
  textoTarefa.textContent = tarefa.texto;
  textoTarefa.className = `flex-grow-1 ${tarefa.concluida ? "text-decoration-line-through text-muted" : ""}`;
  textoTarefa.style.cursor = "pointer";
  textoTarefa.addEventListener("click", () => alternarConcluida(indice));

  const botoes = document.createElement("div");
  botoes.className = "btn-group";

  const botaoEditar = document.createElement("button");
  botaoEditar.textContent = "Editar";
  botaoEditar.className = "btn btn-sm btn-outline-primary";
  botaoEditar.addEventListener("click", () => editarTarefa(indice));

  const botaoExcluir = document.createElement("button");
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.className = "btn btn-sm btn-outline-danger";
  botaoExcluir.addEventListener("click", () => excluirTarefa(indice));

  botoes.appendChild(botaoEditar);
  botoes.appendChild(botaoExcluir);

  item.appendChild(textoTarefa);
  item.appendChild(botoes);
  listaTarefas.appendChild(item);
};

const adicionarTarefa = () => {
  const texto = campoTarefa.value.trim();
  if (texto === "") return alert("O campo de tarefa está vazio!");

  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.push({ texto: texto, concluida: false });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  campoTarefa.value = "";
  carregarTarefas();
};

const editarTarefa = (indice) => {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  const novoTexto = prompt("Editar tarefa:", tarefas[indice].texto);
  if (novoTexto !== null) {
    tarefas[indice].texto = novoTexto.trim();
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    carregarTarefas();
  }
};

const alternarConcluida = (indice) => {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas[indice].concluida = !tarefas[indice].concluida;
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  carregarTarefas();
};

const excluirTarefa = (indice) => {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.splice(indice, 1);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  carregarTarefas();
};

botaoAdicionar.addEventListener("click", adicionarTarefa);
campoTarefa.addEventListener("keypress", (e) => {
  if (e.key === "Enter") adicionarTarefa();
});

document.addEventListener("DOMContentLoaded", carregarTarefas);