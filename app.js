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
    id: "loaded-pizza-toast",
    title: "Loaded Pizza",
    accent: "Toast",
    description:
      "Crispy sourdough toast loaded with melted mozzarella, pepperoni, sausage, mushrooms and green pepper, finished with fresh basil.",
    time: "12 min",
    difficulty: "Easy",
    calories: "490 kcal",
    thumb: "pizza-tost.webp",
    image: "pizza-tost.webp",
    alt: "Two slices of loaded pizza toast with pepperoni, sausage, mushrooms and basil",
    meta: "bread + cheese + pepperoni / 12 min / easy",
    tags: [
      "bread",
      "bread",
      "toast",
      "toast",
      "cheese",
      "cheese",
      "mozzarella",
      "pepperoni",
      "pepperoni",
      "sausage",
      "mushroom",
      "mushrooms",
      "pepper",
      "pizza",
      "pizza",
      "basil",
      "tomato",
    ],
    ingredients: [
      "2 thick slices of sourdough bread",
      "4 tbsp tomato sauce",
      "1 cup shredded mozzarella",
      "8 slices pepperoni",
      "60g cooked Italian sausage, crumbled",
      "4 mushrooms, sliced",
      "½ green bell pepper, diced",
      "Fresh basil, oregano, chili flakes",
    ],
    instructions: [
      "Preheat the oven to 220°C (425°F) and line a tray with parchment.",
      "Spread tomato sauce evenly across both slices of bread.",
      "Layer mozzarella, pepperoni, sausage, mushrooms and green pepper on top.",
      "Bake for 8-10 minutes until cheese is bubbly and edges are golden.",
      "Finish with fresh basil, a pinch of oregano and chili flakes before serving.",
    ],
  },
  {
    id: "salmon-poke-bowl",
    title: "Salmon Poke",
    accent: "Bowl",
    description:
      "A vibrant, nourishing bowl with marinated salmon, sushi rice, creamy avocado, and fresh vegetables.",
    time: "20 min",
    difficulty: "Easy",
    calories: "580 kcal",
    thumb: "poke_bowl.png",
    image: "poke_bowl.png",
    alt: "Salmon poke bowl with rice, avocado, edamame and sesame seeds",
    meta: "salmon + rice + avocado / 20 min / easy",
    tags: [
      "salmon",
      "salmon",
      "rice",
      "rice",
      "avocado",
      "avocado",
      "cucumber",
      "soy",
      "sesame",
      "poke",
      "fish",
      "bowl",
    ],
    ingredients: [
      "200g fresh salmon, diced",
      "1 cup sushi rice, cooked",
      "1 ripe avocado, sliced",
      "½ cucumber, thinly sliced",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "Sesame seeds (optional)",
      "Nori strips (optional)",
    ],
    instructions: [
      "Cook sushi rice and let cool slightly.",
      "Marinate salmon in soy sauce and sesame oil for 5 minutes.",
      "Arrange rice in a bowl as the base.",
      "Top with salmon, avocado, cucumber and garnish.",
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
const photoPreview = document.querySelector("#photoPreview");
const photoPreviewImage = document.querySelector("#photoPreviewImage");
const photoPreviewRemove = document.querySelector("#photoPreviewRemove");

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
        <button class="recipe-card" type="button" data-recipe="${recipe.id}">
          <span class="recipe-card-image">
            <img src="${recipe.image}" alt="${recipe.title} ${recipe.accent}" loading="lazy" />
          </span>
          <span class="recipe-card-body">
            <span class="recipe-card-title">
              <h3>${recipe.title} <em>${recipe.accent}</em></h3>
              ${iconArrow}
            </span>
            <span class="recipe-card-meta">
              <span class="recipe-card-meta-item">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M12 7v6l4 2"></path>
                </svg>
                ${recipe.time}
              </span>
              <span class="recipe-card-meta-item">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 22c4.2-1.7 7-4.7 7-8.5 0-2.7-1.4-5.1-4.1-7.1.2 2.4-.6 4.1-2.4 5.1.2-3.9-1.4-6.7-4.8-8.5.4 3-.2 5.1-1.8 6.5C4.6 10.7 4 12.1 4 14c0 3.8 2.8 6.8 8 8Z"></path>
                </svg>
                ${recipe.calories}
              </span>
              <span class="recipe-card-meta-item">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 19V9a2 2 0 1 1 4 0v10"></path>
                  <path d="M10 19V5a2 2 0 1 1 4 0v14"></path>
                  <path d="M15 19v-7a2 2 0 1 1 4 0v7"></path>
                </svg>
                ${recipe.difficulty}
              </span>
            </span>
          </span>
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
    cueHint.textContent = `${value} → ${recipe.accent.toLowerCase()}`;
    return;
  }

  cueHint.textContent = "eggs + tomato → omelette";
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
    : `${value || "eggs + tomato"} → ${recipe.accent.toLowerCase()}`;

  window.setTimeout(() => {
    setGenerating(false);
    openRecipe(recipe);
  }, 720);
});

ingredientInput.addEventListener("input", updateCueHint);

uploadButton.addEventListener("click", () => {
  photoInput.click();
});

let lastPhotoUrl = "";

function setPhotoPreview(file) {
  if (!file || !file.type || !file.type.startsWith("image/")) {
    clearPhotoPreview();
    return;
  }

  if (lastPhotoUrl) URL.revokeObjectURL(lastPhotoUrl);
  lastPhotoUrl = URL.createObjectURL(file);
  photoPreviewImage.src = lastPhotoUrl;
  photoPreview.hidden = false;

  const rawName = file.name || "pasted-image";
  lastPhotoName = rawName.length > 28 ? `${rawName.slice(0, 25)}...` : rawName;
  uploadButton.classList.add("is-loaded");
  ingredientInput.classList.add("has-photo");
  updateCueHint();
}

function clearPhotoPreview() {
  if (lastPhotoUrl) {
    URL.revokeObjectURL(lastPhotoUrl);
    lastPhotoUrl = "";
  }
  photoPreviewImage.removeAttribute("src");
  photoPreview.hidden = true;
  ingredientInput.classList.remove("has-photo");

  lastPhotoName = "";
  photoInput.value = "";
  uploadButton.classList.remove("is-loaded");
  updateCueHint();
}

photoInput.addEventListener("change", () => {
  const file = photoInput.files && photoInput.files[0];
  if (!file) {
    clearPhotoPreview();
    return;
  }
  setPhotoPreview(file);
});

photoPreviewRemove.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  clearPhotoPreview();
});

function handlePastedItems(items) {
  if (!items) return false;
  for (const item of items) {
    if (item && item.kind === "file") {
      const file = item.getAsFile();
      if (file && file.type && file.type.startsWith("image/")) {
        setPhotoPreview(file);
        return true;
      }
    }
  }
  return false;
}

ingredientInput.addEventListener("paste", (event) => {
  const items = event.clipboardData && event.clipboardData.items;
  if (handlePastedItems(items)) {
    event.preventDefault();
  }
});

document.addEventListener("paste", (event) => {
  if (event.defaultPrevented) return;
  const target = event.target;
  const isFormField =
    target instanceof HTMLElement &&
    (target.tagName === "INPUT" || target.tagName === "TEXTAREA" ||
      target.isContentEditable);
  if (isFormField && target !== ingredientInput) return;

  const items = event.clipboardData && event.clipboardData.items;
  if (handlePastedItems(items)) {
    event.preventDefault();
  }
});

document.addEventListener("click", (event) => {
  const suggestionTarget = event.target.closest("[data-suggestion]");
  if (suggestionTarget) {
    event.preventDefault();
    const value = suggestionTarget.dataset.suggestion || "";
    ingredientInput.value = value;
    ingredientInput.focus();
    updateCueHint();
    if (typeof form.requestSubmit === "function") {
      form.requestSubmit();
    } else {
      form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    }
    return;
  }

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
