const recipes = [
  {
    id: "avocado-tomato-omelette",
    title: "Avocado & Tomato",
    accent: "Omelette",
    description:
      "A fluffy, protein-packed omelette with creamy avocado, juicy tomatoes, and a hint of herbs.",
    time: "15 min",
    difficulty: "Easy",
    calories: "420 kcal",
    thumb: "assets/thumb-omelette.png",
    image: "assets/omelette.png",
    alt: "Avocado and tomato omelette on a dark plate",
    meta: "eggs + tomato + avocado / 15 min / easy",
    tags: [
      "egg",
      "eggs",
      "tomato",
      "tomato",
      "avocado",
      "avocado",
      "cheese",
      "greens",
      "spinach",
    ],
    ingredients: [
      "3 large eggs",
      "1 ripe avocado, diced",
      "1 medium tomato, chopped",
      "1 tbsp olive oil",
      "1 tbsp fresh chives, chopped",
      "Salt, to taste",
      "Black pepper, to taste",
      "A handful of greens",
    ],
    instructions: [
      "Whisk eggs in a bowl with salt and pepper.",
      "Heat olive oil in a non-stick pan over medium heat.",
      "Pour eggs into the pan and cook until the edges set.",
      "Add avocado and tomato on one half, fold the omelette, and cook for 1-2 more minutes.",
    ],
  },
  {
    id: "soft-egg-greens-fold",
    title: "Soft Egg & Greens",
    accent: "Fold",
    description:
      "A quick folded egg dish with leafy greens, cheese and a clean peppery finish.",
    time: "12 min",
    difficulty: "Easy",
    calories: "390 kcal",
    thumb: "assets/thumb-avocado.png",
    image: "assets/omelette.png",
    alt: "Folded omelette with greens and cheese",
    meta: "eggs + greens + cheese / 12 min / easy",
    tags: [
      "egg",
      "eggs",
      "greens",
      "greens",
      "spinach",
      "spinach",
      "cheese",
      "cheese",
      "herbs",
    ],
    ingredients: [
      "2 large eggs",
      "1 cup spinach or greens",
      "2 tbsp grated cheese",
      "1 tsp olive oil",
      "1 tbsp chopped herbs",
      "Salt, to taste",
      "Black pepper, to taste",
      "Lemon zest, optional",
    ],
    instructions: [
      "Beat eggs with salt, pepper and chopped herbs.",
      "Wilt greens in olive oil for 30 seconds.",
      "Add eggs and cook on low heat until softly set.",
      "Sprinkle cheese, fold once and rest for a minute before serving.",
    ],
  },
  {
    id: "tomato-cheese-breakfast",
    title: "Tomato Cheese",
    accent: "Breakfast",
    description:
      "A warm tomato and cheese breakfast plate built from everyday fridge staples.",
    time: "18 min",
    difficulty: "Easy",
    calories: "450 kcal",
    thumb: "assets/thumb-tomato.png",
    image: "assets/omelette.png",
    alt: "Tomato and cheese breakfast omelette",
    meta: "tomato + cheese + eggs / 18 min / easy",
    tags: [
      "tomato",
      "tomato",
      "cheese",
      "cheese",
      "egg",
      "eggs",
      "breakfast",
      "breakfast",
      "herbs",
    ],
    ingredients: [
      "3 large eggs",
      "1 medium tomato, sliced",
      "3 tbsp diced cheese",
      "1 tbsp olive oil",
      "1 tbsp chives",
      "Salt, to taste",
      "Black pepper, to taste",
      "Chili flakes, optional",
    ],
    instructions: [
      "Season tomatoes with a pinch of salt and pepper.",
      "Whisk eggs and cook them in olive oil over medium-low heat.",
      "Add tomato and cheese while the top is still glossy.",
      "Fold, cover for one minute, then finish with chives.",
    ],
  },
];

const pages = {
  landing: document.querySelector('[data-page="landing"]'),
  recipe: document.querySelector('[data-page="recipe"]'),
};

const form = document.querySelector("#generateForm");
const ingredientInput = document.querySelector("#ingredientInput");
const photoInput = document.querySelector("#photoInput");
const uploadButton = document.querySelector("#uploadButton");
const cueHint = document.querySelector("#cueHint");
const recipeList = document.querySelector("#recipeList");

const recipeTitle = document.querySelector("#recipeTitle");
const recipeDescription = document.querySelector("#recipeDescription");
const recipeTime = document.querySelector("#recipeTime");
const recipeDifficulty = document.querySelector("#recipeDifficulty");
const recipeCalories = document.querySelector("#recipeCalories");
const recipeImage = document.querySelector("#recipeImage");
const ingredientsList = document.querySelector("#ingredientsList");
const instructionsList = document.querySelector("#instructionsList");

let lastPhotoName = "";

const iconArrow = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14"></path>
    <path d="m13 6 6 6-6 6"></path>
  </svg>
`;

function renderRecipeList() {
  recipeList.innerHTML = recipes
    .map(
      (recipe) => `
        <button class="recipe-row" type="button" data-recipe="${recipe.id}">
          <img src="${recipe.thumb}" alt="${recipe.title} ${recipe.accent}" />
          <span>
            <h3>${recipe.title} ${recipe.accent}</h3>
            <p>${recipe.meta}</p>
          </span>
          ${iconArrow}
        </button>
      `,
    )
    .join("");
}

function chooseRecipe(query) {
  const normalized = query.toLowerCase();
  const scored = recipes.map((recipe) => {
    const score = recipe.tags.reduce((sum, tag) => {
      return normalized.includes(tag) ? sum + 1 : sum;
    }, 0);

    return { recipe, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored[0].score > 0 ? scored[0].recipe : recipes[0];
}

function showPage(name, options = {}) {
  const { scrollTop = true } = options;

  Object.entries(pages).forEach(([key, page]) => {
    page.classList.toggle("is-active", key === name);
  });

  if (scrollTop) {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

function goToLandingSection(hash = "#home") {
  history.replaceState(null, "", hash);
  showPage("landing", { scrollTop: hash === "#home" });

  if (hash !== "#home") {
    window.requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "auto" });
    });
  }
}

function renderRecipe(recipe) {
  recipeTitle.innerHTML = `${recipe.title} <span>${recipe.accent}</span>`;
  recipeDescription.textContent = recipe.description;
  recipeTime.textContent = recipe.time;
  recipeDifficulty.textContent = recipe.difficulty;
  recipeCalories.textContent = recipe.calories;
  recipeImage.src = recipe.image;
  recipeImage.alt = recipe.alt;

  ingredientsList.innerHTML = recipe.ingredients
    .map((ingredient) => `<li>${ingredient}</li>`)
    .join("");

  instructionsList.innerHTML = recipe.instructions
    .map((step) => `<li>${step}</li>`)
    .join("");
}

function openRecipe(recipe) {
  renderRecipe(recipe);
  history.replaceState(null, "", `#${recipe.id}`);
  showPage("recipe");
}

function setGenerating(isGenerating) {
  const button = form.querySelector(".generate-button");
  button.disabled = isGenerating;
  button.querySelector("span").textContent = isGenerating ? "Analyzing" : "Generate";
}

function updateCueHint() {
  const value = ingredientInput.value.trim();

  if (lastPhotoName) {
    cueHint.textContent = `photo ready: ${lastPhotoName}`;
    return;
  }

  if (value) {
    const recipe = chooseRecipe(value);
    cueHint.textContent = `${value} -> ${recipe.accent.toLowerCase()}`;
    return;
  }

  cueHint.textContent = "eggs + tomato -> omelette";
}

renderRecipeList();
renderRecipe(recipes[0]);

recipeList.addEventListener("click", (event) => {
  const row = event.target.closest("[data-recipe]");
  if (!row) return;

  const recipe = recipes.find((item) => item.id === row.dataset.recipe);
  if (recipe) openRecipe(recipe);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = ingredientInput.value.trim();
  const photoSignal = lastPhotoName ? " eggs tomato avocado cheese greens " : "";
  const recipe = chooseRecipe(`${value} ${photoSignal}`);

  setGenerating(true);
  cueHint.textContent = lastPhotoName
    ? "detecting eggs + tomato + avocado"
    : `${value || "eggs + tomato"} -> ${recipe.accent.toLowerCase()}`;

  window.setTimeout(() => {
    setGenerating(false);
    openRecipe(recipe);
  }, 720);
});

ingredientInput.addEventListener("input", updateCueHint);

uploadButton.addEventListener("click", () => {
  photoInput.click();
});

photoInput.addEventListener("change", () => {
  const file = photoInput.files && photoInput.files[0];

  if (!file) {
    lastPhotoName = "";
    uploadButton.classList.remove("is-loaded");
    updateCueHint();
    return;
  }

  lastPhotoName = file.name.length > 28 ? `${file.name.slice(0, 25)}...` : file.name;
  uploadButton.classList.add("is-loaded");
  updateCueHint();
});

document.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) return;

  const action = actionTarget.dataset.action;

  if (action === "home") {
    event.preventDefault();
    goToLandingSection("#home");
    return;
  }

  if (action === "focus-input") {
    history.replaceState(null, "", "#home");
    showPage("landing", { scrollTop: true });
    window.setTimeout(() => ingredientInput.focus(), 180);
  }
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-action]")) return;

  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const hash = link.getAttribute("href");
  if (!["#home", "#how", "#recipes"].includes(hash)) return;

  event.preventDefault();
  goToLandingSection(hash);
});

window.addEventListener("load", () => {
  const recipe = recipes.find((item) => `#${item.id}` === window.location.hash);
  if (recipe) {
    renderRecipe(recipe);
    showPage("recipe");
  }
});
