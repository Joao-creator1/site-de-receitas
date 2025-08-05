// A lista de receitas que vamos usar no nosso site
const recipes = [
    {
        title: "Torta de Frango Cremosa",
        image: "https://via.placeholder.com/600/FF5733",
        text: "Uma deliciosa torta com recheio cremoso de frango. Perfeita para qualquer ocasião! Ingredientes: 1 peito de frango, 1 lata de creme de leite, 1 massa de torta. Modo de preparo: Cozinhe e desfie o frango, misture com o creme de leite e recheie a massa. Asse por 30 minutos."
    },
    {
        title: "Salada Colorida de Verão",
        image: "https://via.placeholder.com/600/33FF57",
        text: "Refrescante e saudável, ideal para dias quentes. Ingredientes: Alface, tomate cereja, pepino, queijo branco, azeite e limão. Modo de preparo: Misture todos os ingredientes em uma tigela grande e tempere a gosto."
    },
    {
        title: "Bolo de Cenoura com Cobertura de Chocolate",
        image: "https://via.placeholder.com/600/5733FF",
        text: "O clássico bolo da vovó, macio e com uma cobertura de dar água na boca. Ingredientes: 3 cenouras, 4 ovos, 2 xícaras de farinha de trigo, 1 xícara de chocolate em pó. Modo de preparo: Bata as cenouras com os ovos e o óleo no liquidificador. Misture com a farinha e asse. Faça a cobertura com o chocolate e derrame sobre o bolo."
    }
];

// Pegamos os elementos HTML para a lógica das receitas
const recipeTitle = document.getElementById('recipe-title');
const recipeImage = document.getElementById('recipe-image');
const recipeText = document.getElementById('recipe-text');
const changeRecipeBtn = document.getElementById('change-recipe-btn');
const newRecipeTitleInput = document.getElementById('new-recipe-title');
const newRecipeImageInput = document.getElementById('new-recipe-image');
const newRecipeTextInput = document.getElementById('new-recipe-text');
const addRecipeForm = document.getElementById('add-recipe-form');

// Variável para saber qual receita está sendo exibida no momento
let currentRecipeIndex = 0;

// Função para atualizar a receita na tela
function updateRecipe() {
    const currentRecipe = recipes[currentRecipeIndex];
    recipeTitle.textContent = currentRecipe.title;
    recipeImage.src = currentRecipe.image;
    recipeText.textContent = currentRecipe.text;
}

// Função para mudar a receita
function changeRecipe() {
    currentRecipeIndex = (currentRecipeIndex + 1) % recipes.length;
    updateRecipe();
}

// Adiciona "ouvinte de evento" ao botão de mudar receita
changeRecipeBtn.addEventListener('click', changeRecipe);

// Adiciona "ouvinte de evento" ao formulário de adicionar receita
addRecipeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const newRecipe = {
        title: newRecipeTitleInput.value,
        image: newRecipeImageInput.value,
        text: newRecipeTextInput.value
    };

    recipes.push(newRecipe);
    currentRecipeIndex = recipes.length - 1;
    updateRecipe();
    addRecipeForm.reset();
});

// Pegamos os elementos HTML para a lógica de login e cadastro
const authSection = document.getElementById('auth-section');
// Pegamos os elementos HTML para a lógica de login e cadastro
const appContent = document.getElementById('app-content');
// ...resto do código...
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterFormBtn = document.getElementById('show-register-form-btn');
const loginUsernameInput = document.getElementById('login-username');
const loginPasswordInput = document.getElementById('login-password');
const registerUsernameInput = document.getElementById('register-username');
const registerPasswordInput = document.getElementById('register-password');

// Exibe o formulário de cadastro quando o botão é clicado
showRegisterFormBtn.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

// Lida com o evento de submissão do formulário de login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = loginUsernameInput.value;
    const password = loginPasswordInput.value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('Login bem-sucedido!');
            authSection.style.display = 'none';
            appContent.style.display = 'block';
        } else {
            const error = await response.text();
            alert(`Erro no login: ${error}`);
        }
    } catch (error) {
        alert('Erro ao tentar conectar com o servidor.');
        console.error(error);
    }
});

// Lida com o evento de submissão do formulário de cadastro
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = registerUsernameInput.value;
    const password = registerPasswordInput.value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('Cadastro bem-sucedido! Faça login para continuar.');
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        } else {
            const error = await response.text();
            alert(`Erro no cadastro: ${error}`);
        }
    } catch (error) {
        alert('Erro ao tentar conectar com o servidor.');
        console.error(error);
    }
});


// Chama a função pela primeira vez para exibir a primeira receita quando a página carregar
updateRecipe();