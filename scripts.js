// Validação de Login
function validarLogin() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
  
    if (email === "nome-do-aluno1@fatec.com" && senha === "nome-do-aluno2") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "produtos.html";
    } else {
      alert("Email ou senha inválidos.");
    }
  }
  
  // Logout
  function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
  }

  

  // Clicar em Conta
  function Conta() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  }

  // Mensagem flutuante para o formulário de contato
function exibirMensagemSucesso() {
    const mensagem = document.createElement("div");
    mensagem.className = "mensagem-sucesso";
    mensagem.textContent = "Mensagem enviada com sucesso!";
    document.body.appendChild(mensagem);
  
    setTimeout(() => {
      mensagem.remove();
    }, 4000);
  }

  // Carrinho de Compras
let carrinho = [];

function adicionarCarrinho(nomeProduto, precoProduto) {
  // Verifica se o produto já existe no carrinho
  let itemExistente = carrinho.find(item => item.nome === nomeProduto);

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome: nomeProduto, preco: precoProduto, quantidade: 1 });
  }
  
  atualizarCarrinho();
}

function removerItemCarrinho(nomeProduto) {
  carrinho = carrinho.filter(item => item.nome !== nomeProduto);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  let carrinhoItens = document.getElementById('carrinho-itens');
  carrinhoItens.innerHTML = ''; // Limpa a lista de itens

  if (carrinho.length > 0) {
    carrinho.forEach(item => {
      let li = document.createElement('li');
      li.classList.add('list-group-item');
      li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} (x${item.quantidade}) 
        <button class="btn btn-danger btn-sm float-end" onclick="removerItemCarrinho('${item.nome}')">Remover</button>`;
      carrinhoItens.appendChild(li);
    });

    document.getElementById('finalizar-compra').style.display = 'block';
  } else {
    carrinhoItens.innerHTML = '<li class="list-group-item">Carrinho vazio</li>';
    document.getElementById('finalizar-compra').style.display = 'none';
  }
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert('O carrinho está vazio.');
    return;
  }
  
  // Redireciona para a página de checkout com os dados do carrinho
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  window.location.href = 'checkout.html';
}