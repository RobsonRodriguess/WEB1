document.addEventListener("DOMContentLoaded", function () {
    function atualizarTotal() {
        let total = 0;
        document.querySelectorAll(".list-group-item").forEach(item => {
            const quantidadeInput = item.querySelector("input");
            if (!quantidadeInput) return;

            const quantidade = parseInt(quantidadeInput.value) || 0;
            const precoTexto = item.querySelector(".preco-produto")?.textContent?.trim();
            
            if (!precoTexto) {
                console.error("Elemento .preco-produto não encontrado no item:", item);
                return;
            }

            const preco = parseFloat(precoTexto.replace("Valor: R$ ", "").replace(",", "."));
            if (isNaN(preco)) {
                console.error("Preço inválido:", precoTexto);
                return;
            }

            const subtotal = quantidade * preco;
            total += subtotal;

            let subtotalElement = item.querySelector(".subtotal");
            if (!subtotalElement) {
                subtotalElement = document.createElement("div");
                subtotalElement.classList.add("text-end", "mt-2", "subtotal");
                item.appendChild(subtotalElement);
            }
            subtotalElement.textContent = `Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}`;
        });

        // Atualiza o valor total
        const totalElement = document.querySelector(".valor-total");
        if (totalElement) {
            totalElement.textContent = `Valor Total: R$ ${total.toFixed(2).replace(".", ",")}`;
        } else {
            console.error("Elemento .valor-total não encontrado!");
        }
    }

    function inicializarEventos() {
        document.querySelectorAll(".btn-outline-dark").forEach(botao => {
            botao.addEventListener("click", function () {
                const input = this.parentElement.querySelector("input");
                let valor = parseInt(input.value) || 0;
                if (this.querySelector(".bi-caret-up")) {
                    if (valor < 10) valor++;
                } else if (this.querySelector(".bi-caret-down") && valor > 1) {
                    valor--;
                }
                input.value = valor;
                atualizarTotal();
            });
        });

        document.querySelectorAll(".btn-outline-danger").forEach(botao => {
            botao.addEventListener("click", function () {
                const itemElement = this.closest(".list-group-item");
                if (!itemElement) return;

                const nomeProduto = itemElement.querySelector(".nome-produto")?.textContent || "Produto desconhecido";
                removerDoCarrinho(nomeProduto);
                itemElement.remove();
                atualizarTotal();
            });
        });
    }

    // Aguarde os produtos serem carregados antes de atualizar o total
    setTimeout(() => {
        atualizarTotal();
        inicializarEventos();
    }, 500);
});


document.addEventListener("DOMContentLoaded", function () {
    // Adicionar produto ao carrinho
    document.querySelectorAll(".btn-adicionar-carrinho").forEach(botao => {
        botao.addEventListener("click", function () {
            adicionarAoCarrinho(this);
        });
    });

    // Atualizar o carrinho na página de carrinho
    if (window.location.pathname.includes("carrinho4.html")) {
        atualizarCarrinho();
    }
});

function adicionarAoCarrinho(botao) {
    const produto = botao.closest(".card");  // Aqui você pega o item que foi clicado
    const nomeProduto = produto.querySelector(".nome-produto").textContent;  // Ajuste conforme a estrutura do seu HTML
    const precoProduto = produto.querySelector(".preco-produto").textContent.replace("Valor c/desconto: R$ ", "").replace(",", ".");  // Ajuste conforme o formato de preço no seu HTML
    const imagemProduto = produto.querySelector("img").src;  // Pega a imagem do produto
    const quantidadeProduto = 1; // Quantidade inicial do produto é 1

    // Criar um objeto para o produto
    const produtoCarrinho = {
        nome: nomeProduto,
        preco: parseFloat(precoProduto),
        quantidade: quantidadeProduto,
        imagem: imagemProduto
    };

    // Adicionar o produto ao carrinho no localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produtoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Exibir o alerta
    alert(`${nomeProduto} foi adicionado ao carrinho!`);
}

function removerDoCarrinho(nomeProduto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(item => item.nome !== nomeProduto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const carrinhoElement = document.querySelector(".carrinho-list");

    // Limpar carrinho
    carrinhoElement.innerHTML = "";

    // Adicionar itens ao carrinho
    if (carrinho.length === 0) {
        carrinhoElement.innerHTML = "<li class='list-group-item'>Seu carrinho está vazio.</li>";
    } else {
        carrinho.forEach(item => {
            const itemElement = document.createElement("li");
            itemElement.classList.add("list-group-item");
            itemElement.innerHTML = `S
                <div class="d-flex align-items-center">
                    <img src="${item.imagem}" alt="${item.nome}" class="img-thumbnail" style="width: 50px; height: 50px; margin-right: 10px;">
                    <span class="nome-produto">${item.nome}</span> - R$ ${item.preco.toFixed(2).replace(".", ",")}
                    <span class="preco-produto" style="display: none;">${item.preco}</span>
                </div>
                <input type="number" value="${item.quantidade}" min="1" max="10" class="quantidade">
                <button class="btn btn-outline-danger">Remover</button>
            `;
            carrinhoElement.appendChild(itemElement);
        });

        // Adicionar evento de clique para os botões de remover
        document.querySelectorAll(".btn-outline-danger").forEach(botao => {
            botao.addEventListener("click", function () {
                const itemElement = this.closest(".list-group-item");
                const nomeProduto = itemElement.querySelector(".nome-produto").textContent;
                removerDoCarrinho(nomeProduto);
                itemElement.remove();
                atualizarTotal();
            });
        });

        // Atualizar o total
        atualizarTotal();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    atualizarCarrinho();
});

document.addEventListener("DOMContentLoaded", function () {
    function atualizarTotal() {
        let total = 0;
        document.querySelectorAll(".list-group-item").forEach(item => {
            const quantidadeInput = item.querySelector("input");
            if (!quantidadeInput) return;
            
            const quantidade = parseInt(quantidadeInput.value);
            const precoTexto = item.querySelector(".text-dark").textContent;
            const preco = parseFloat(precoTexto.replace("Valor c/desconto: R$ ", "").replace(",", "."));
            const subtotal = quantidade * preco;
            total += subtotal;
            
            let subtotalElement = item.querySelector(".subtotal");
            if (!subtotalElement) {
                subtotalElement = document.createElement("div");
                subtotalElement.classList.add("text-end", "mt-2", "subtotal");
                item.querySelector(".text-end").appendChild(subtotalElement);
            }
            subtotalElement.textContent = `Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}`;
        });
        document.querySelector(".valor-total").textContent = `Valor Total: R$ ${total.toFixed(2).replace(".", ",")}`;
    }

    document.querySelectorAll(".btn-outline-dark").forEach(botao => {
        botao.addEventListener("click", function () {
            const input = this.parentElement.querySelector("input");
            let valor = parseInt(input.value);
            if (this.querySelector(".bi-caret-up")) {
                if (valor < 10) valor++;
            } else if (this.querySelector(".bi-caret-down") && valor > 1) {
                valor--;
            }
            input.value = valor;
            atualizarTotal();
        });
    });

    document.querySelectorAll(".btn-outline-danger").forEach(botao => {
        botao.addEventListener("click", function () {
            this.closest(".list-group-item").remove();
            atualizarTotal();
        });
    });

    atualizarTotal();
});
