const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');
const btnNew = document.getElementById('btn-new-message');

const campos = {
  nome: document.getElementById('nome'),
  email: document.getElementById('email'),
  assunto: document.getElementById('assunto'),
  mensagem: document.getElementById('mensagem')
};

const erros = {
  nome: document.getElementById('error-nome'),
  email: document.getElementById('error-email'),
  assunto: document.getElementById('error-assunto'),
  mensagem: document.getElementById('error-mensagem')
};

function limparErros() {
  Object.keys(campos).forEach(chave => {
    campos[chave].classList.remove('error');
    erros[chave].textContent = '';
  });
}

function mostrarErro(campo, mensagem) {
  campos[campo].classList.add('error');
  erros[campo].textContent = mensagem;
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarFormulario() {
  limparErros();
  let valido = true;

  if (!campos.nome.value.trim()) {
    mostrarErro('nome', 'Por favor, informe seu nome.');
    valido = false;
  }

  if (!campos.email.value.trim()) {
    mostrarErro('email', 'Por favor, informe seu e-mail.');
    valido = false;
  } else if (!validarEmail(campos.email.value.trim())) {
    mostrarErro('email', 'Informe um e-mail válido.');
    valido = false;
  }

  if (!campos.assunto.value.trim()) {
    mostrarErro('assunto', 'Por favor, informe o assunto.');
    valido = false;
  }

  if (!campos.mensagem.value.trim()) {
    mostrarErro('mensagem', 'Por favor, escreva uma mensagem.');
    valido = false;
  }

  return valido;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validarFormulario()) return;

  form.style.display = 'none';
  success.classList.add('show');
  form.reset();
});

btnNew.addEventListener('click', () => {
  success.classList.remove('show');
  form.style.display = 'block';
  limparErros();
  campos.nome.focus();
});

document.addEventListener('DOMContentLoaded', () => {
  renderizarHeader();
  renderizarFooter();
});
