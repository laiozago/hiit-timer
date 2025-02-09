// no click do botao pega os valores do form e guarda no localstorage e
// redireciona para a pagina de treino
document
    .getElementById("meuForm")
    .addEventListener("submit", function (event) {
        event.preventDefault(); // Evita recarregar a página

        const tempos = [
            document
                .getElementById("hiitTime")
                .value,
            document
                .getElementById("restTime")
                .value
        ];
        localStorage.setItem("tempos", tempos); // Salva no localStorage

        window.location.href = "hiit.html";
    });
