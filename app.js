const STORAGE_KEY = "reinadoSantaIsabelDataV1";
const ACCESSIBILITY_KEY = "reinadoSantaIsabelAccessibilityV1";

const seedData = {
  editions: [
    {
      id: crypto.randomUUID(),
      year: 2026,
      title: "Reinado de Nossa Senhora do Rosario da Colonia Santa Isabel",
      startDate: "2026-05-01",
      endDate: "2026-05-03",
      status: "Realizada",
      notes: "Celebracao com novenas, procissoes, rituais, chegada da imagem pelo Rio Paraopeba, cortejos e Missa Conga.",
      schedule: [
        {
          date: "2026-05-01",
          time: "19h",
          name: "Reza do Terco e documentario Entre o Mito e a Tradicao",
          place: "Sede da Irmandade"
        },
        {
          date: "2026-05-02",
          time: "19h",
          name: "Hasteamento da Bandeira de Nossa Senhora do Rosario",
          place: "Sede da Irmandade"
        },
        {
          date: "2026-05-03",
          time: "5h",
          name: "Matina e queima de fogos",
          place: "Colonia Santa Isabel"
        },
        {
          date: "2026-05-03",
          time: "8h",
          name: "Recepcao das guardas de congado",
          place: "Colonia Santa Isabel"
        },
        {
          date: "2026-05-03",
          time: "10h",
          name: "Retirada da imagem de Nossa Senhora do Rosario do Rio Paraopeba",
          place: "Barca da Colonia Santa Isabel"
        },
        {
          date: "2026-05-03",
          time: "15h30",
          name: "Cortejo de Sao Benedito, Santa Efigenia, Sao Jorge e Nossa Senhora do Rosario",
          place: "Trajeto da festa"
        },
        {
          date: "2026-05-03",
          time: "16h",
          name: "Missa Conga e encerramento",
          place: "Sede da Irmandade"
        }
      ]
    }
  ],
  participants: [
    {
      id: crypto.randomUUID(),
      name: "Irmandade de Nossa Senhora do Rosario da Colonia Santa Isabel",
      role: "Organizacao comunitaria",
      editionYear: 2026,
      contact: "",
      notes: "Responsavel pela celebracao e pela preservacao da tradicao local."
    },
    {
      id: crypto.randomUUID(),
      name: "Guardas de Congado",
      role: "Participacao cultural e religiosa",
      editionYear: 2026,
      contact: "",
      notes: "Recebem a imagem e participam dos cortejos e da Missa Conga."
    },
    {
      id: crypto.randomUUID(),
      name: "Andre Bueno",
      role: "Capitao-Mor e superintendente de Patrimonio Cultural",
      editionYear: 2026,
      contact: "",
      notes: "Fonte citada na noticia sobre fe, resistencia cultural e memoria da festa."
    }
  ],
  places: [
    {
      id: crypto.randomUUID(),
      name: "Sede da Irmandade, intitulada Senzala",
      type: "Sede",
      address: "Rua dos Esportes, n. 306, Colonia Santa Isabel, Betim-MG",
      usage: "Reza do Terco, exibicao do documentario, hasteamento da bandeira, acolhida da procissao e atividades de encerramento."
    },
    {
      id: crypto.randomUUID(),
      name: "Rio Paraopeba",
      type: "Rio",
      address: "Referencia territorial da Colonia Santa Isabel",
      usage: "Chegada tradicional da imagem de Nossa Senhora do Rosario em barca."
    },
    {
      id: crypto.randomUUID(),
      name: "Barca da Colonia Santa Isabel",
      type: "Ponto ritual",
      address: "Colonia Santa Isabel, Betim-MG",
      usage: "Retirada da imagem de Nossa Senhora do Rosario antes da procissao."
    }
  ],
  culture: [
    {
      id: crypto.randomUUID(),
      title: "Patrimonio imaterial municipal",
      category: "Patrimonio",
      description: "O Reinado de Nossa Senhora do Rosario e reconhecido oficialmente como patrimonio imaterial de Betim desde 2020."
    },
    {
      id: crypto.randomUUID(),
      title: "Raizes congadeiras",
      category: "Historia",
      description: "A manifestacao preserva raizes congadeiras de familias da Colonia Santa Isabel, unindo religiosidade catolica, memoria ancestral e identidade comunitaria."
    },
    {
      id: crypto.randomUUID(),
      title: "Chegada da imagem pelo rio",
      category: "Rito",
      description: "O ponto alto da festa e a chegada da imagem de Nossa Senhora do Rosario pelo Rio Paraopeba, seguida pela recepcao das guardas e pela procissao."
    },
    {
      id: crypto.randomUUID(),
      title: "Irmandade criada em 2010",
      category: "Historia",
      description: "A historia recente da festa se fortaleceu com a criacao da Irmandade em 2010 e a primeira Missa Conga em 2011."
    },
    {
      id: crypto.randomUUID(),
      title: "Terno de Congo",
      category: "Rito",
      description: "Guarda marcada por cantos, dancas, cores vibrantes e movimentos que anunciam a alegria do cortejo."
    },
    {
      id: crypto.randomUUID(),
      title: "Terno de Mocambique",
      category: "Rito",
      description: "Tradicao de ritmo cadenciado, gungas e papel de guarda da coroa, dos altares e da memoria ancestral."
    },
    {
      id: crypto.randomUUID(),
      title: "Terno de Catupe",
      category: "Rito",
      description: "Expressao musical que enriquece a harmonia sonora da celebracao com instrumentos e batidas proprias."
    },
    {
      id: crypto.randomUUID(),
      title: "Marujada",
      category: "Historia",
      description: "Registro cultural associado a cantos de jornada, aguas e chegada simbolica da imagem protetora pelo rio."
    }
  ]
};

let data = loadData();

const views = document.querySelectorAll(".view");
const tabButtons = document.querySelectorAll(".tab-button");
const searchInput = document.querySelector("#searchInput");
const yearFilter = document.querySelector("#yearFilter");
const participantYearSelect = document.querySelector("#participantForm select[name='editionYear']");
const contrastToggle = document.querySelector("#contrastToggle");
const fontToggle = document.querySelector("#fontToggle");

const formatDate = (value) =>
  new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));

function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return structuredClone(seedData);

  try {
    return JSON.parse(stored);
  } catch {
    return structuredClone(seedData);
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function ensureDefaultRecords() {
  const cultureByTitle = new Set(data.culture.map((record) => normalize(record.title)));
  seedData.culture.forEach((record) => {
    if (!cultureByTitle.has(normalize(record.title))) {
      data.culture.push({ ...record, id: crypto.randomUUID() });
    }
  });
  saveData();
}

function loadAccessibility() {
  try {
    return JSON.parse(localStorage.getItem(ACCESSIBILITY_KEY)) || {};
  } catch {
    return {};
  }
}

function saveAccessibility(settings) {
  localStorage.setItem(ACCESSIBILITY_KEY, JSON.stringify(settings));
}

function applyAccessibility(settings = loadAccessibility()) {
  document.body.classList.toggle("high-contrast", Boolean(settings.highContrast));
  document.body.classList.toggle("font-large", Boolean(settings.fontLarge));
  contrastToggle.setAttribute("aria-pressed", String(Boolean(settings.highContrast)));
  fontToggle.setAttribute("aria-pressed", String(Boolean(settings.fontLarge)));
}

function normalize(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function matchesSearch(record) {
  const query = normalize(searchInput.value);
  if (!query) return true;
  return normalize(JSON.stringify(record)).includes(query);
}

function matchesYear(record) {
  const year = yearFilter.value;
  if (!year || year === "todos") return true;
  return String(record.year ?? record.editionYear ?? "") === year;
}

function refreshAll() {
  hydrateYearFilters();
  renderMetrics();
  renderFeaturedSchedule();
  renderQuickResults();
  renderEditions();
  renderParticipants();
  renderPlaces();
  renderCulture();
}

function hydrateYearFilters() {
  const currentFilter = yearFilter.value || "todos";
  const years = [...new Set(data.editions.map((edition) => edition.year))].sort((a, b) => b - a);

  yearFilter.innerHTML = `<option value="todos">Todos</option>${years
    .map((year) => `<option value="${year}">${year}</option>`)
    .join("")}`;
  yearFilter.value = years.includes(Number(currentFilter)) ? currentFilter : "todos";

  participantYearSelect.innerHTML = years
    .map((year) => `<option value="${year}">${year}</option>`)
    .join("");
}

function renderMetrics() {
  document.querySelector("#metricEditions").textContent = data.editions.length;
  document.querySelector("#metricParticipants").textContent = data.participants.length;
  document.querySelector("#metricPlaces").textContent = data.places.length;
  document.querySelector("#metricCulture").textContent = data.culture.length;
}

function renderFeaturedSchedule() {
  const edition =
    data.editions.find((item) => item.year === 2026) ||
    [...data.editions].sort((a, b) => b.year - a.year)[0];
  const container = document.querySelector("#featuredSchedule");

  if (!edition?.schedule?.length) {
    container.innerHTML = emptyState();
    return;
  }

  container.innerHTML = edition.schedule
    .map(
      (item) => `
        <article>
          <div>
            <strong>${item.time}</strong>
            <span>${formatDate(item.date)}</span>
          </div>
          <div>
            <strong>${item.name}</strong>
            <span>${item.place}</span>
          </div>
        </article>`
    )
    .join("");
}

function renderQuickResults() {
  const records = [
    ...data.editions.map((item) => ({ type: "Edicao", title: `${item.year} - ${item.title}`, detail: item.status, raw: item })),
    ...data.participants.map((item) => ({ type: "Participante", title: item.name, detail: `${item.role} - ${item.editionYear}`, raw: item })),
    ...data.places.map((item) => ({ type: "Local", title: item.name, detail: item.address, raw: item })),
    ...data.culture.map((item) => ({ type: "Cultura", title: item.title, detail: item.category, raw: item }))
  ]
    .filter((item) => matchesSearch(item.raw))
    .filter((item) => matchesYear(item.raw))
    .slice(0, 8);

  document.querySelector("#quickResults").innerHTML = records.length
    ? records
        .map(
          (item) => `
            <article>
              <span>${item.type}</span>
              <strong>${item.title}</strong>
              <span>${item.detail}</span>
            </article>`
        )
        .join("")
    : emptyState();
}

function renderEditions() {
  const editions = data.editions
    .filter(matchesSearch)
    .filter(matchesYear)
    .sort((a, b) => b.year - a.year);

  document.querySelector("#editionList").innerHTML = editions.length
    ? editions
        .map(
          (edition) => `
            <article class="data-card">
              <header>
                <div>
                  <span>${formatDate(edition.startDate)} a ${formatDate(edition.endDate)}</span>
                  <strong>${edition.year} - ${edition.title}</strong>
                </div>
                <em class="tag">${edition.status}</em>
              </header>
              <p>${edition.notes || "Sem observacoes."}</p>
              <div class="card-actions">
                <button type="button" data-edit-edition="${edition.id}">Editar</button>
                <button class="ghost" type="button" data-delete-edition="${edition.id}">Excluir</button>
              </div>
            </article>`
        )
        .join("")
    : emptyState();
}

function renderParticipants() {
  const participants = data.participants
    .filter(matchesSearch)
    .filter(matchesYear)
    .sort((a, b) => b.editionYear - a.editionYear || a.name.localeCompare(b.name));

  document.querySelector("#participantList").innerHTML = participants.length
    ? `
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Funcao</th>
            <th>Ano</th>
            <th>Contato</th>
            <th>Observacoes</th>
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          ${participants
            .map(
              (participant) => `
                <tr>
                  <td><strong>${participant.name}</strong></td>
                  <td>${participant.role}</td>
                  <td>${participant.editionYear}</td>
                  <td>${participant.contact || "-"}</td>
                  <td>${participant.notes || "-"}</td>
                  <td class="card-actions">
                    <button type="button" data-edit-participant="${participant.id}">Editar</button>
                    <button class="ghost" type="button" data-delete-participant="${participant.id}">Excluir</button>
                  </td>
                </tr>`
            )
            .join("")}
        </tbody>
      </table>`
    : emptyState();
}

function renderPlaces() {
  const places = data.places.filter(matchesSearch);

  document.querySelector("#placeList").innerHTML = places.length
    ? places
        .map(
          (place) => `
            <article class="data-card">
              <header>
                <div>
                  <span>${place.type}</span>
                  <strong>${place.name}</strong>
                </div>
              </header>
              <p>${place.address}</p>
              <p>${place.usage || "Sem uso registrado."}</p>
              <div class="card-actions">
                <button type="button" data-edit-place="${place.id}">Editar</button>
                <button class="ghost" type="button" data-delete-place="${place.id}">Excluir</button>
              </div>
            </article>`
        )
        .join("")
    : emptyState();
}

function renderCulture() {
  const records = data.culture.filter(matchesSearch);

  document.querySelector("#cultureList").innerHTML = records.length
    ? records
        .map(
          (record) => `
            <article class="data-card">
              <header>
                <div>
                  <span>${record.category}</span>
                  <strong>${record.title}</strong>
                </div>
              </header>
              <p>${record.description}</p>
              <div class="card-actions">
                <button type="button" data-edit-culture="${record.id}">Editar</button>
                <button class="ghost" type="button" data-delete-culture="${record.id}">Excluir</button>
              </div>
            </article>`
        )
        .join("")
    : emptyState();
}

function emptyState() {
  return document.querySelector("#emptyState").innerHTML;
}

function switchView(viewId) {
  views.forEach((view) => view.classList.toggle("active-view", view.id === viewId));
  tabButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
}

function formToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function fillForm(form, record) {
  Object.entries(record).forEach(([key, value]) => {
    const field = form.elements[key];
    if (field && typeof value !== "object") field.value = value;
  });
}

function resetForm(form) {
  form.reset();
  form.elements.id.value = "";
}

function upsert(collection, record) {
  if (record.id) {
    data[collection] = data[collection].map((item) => (item.id === record.id ? { ...item, ...record } : item));
  } else {
    data[collection].push({ ...record, id: crypto.randomUUID() });
  }
  saveData();
  refreshAll();
}

function deleteRecord(collection, id) {
  data[collection] = data[collection].filter((item) => item.id !== id);
  saveData();
  refreshAll();
}

function firstSundayOfMay(year) {
  const date = new Date(Date.UTC(year, 4, 1));
  const offset = (7 - date.getUTCDay()) % 7;
  date.setUTCDate(1 + offset);
  return date;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function addNextEdition() {
  const nextYear = Math.max(...data.editions.map((edition) => edition.year)) + 1;
  const sunday = firstSundayOfMay(nextYear);
  const friday = new Date(sunday);
  friday.setUTCDate(sunday.getUTCDate() - 2);
  const saturday = new Date(sunday);
  saturday.setUTCDate(sunday.getUTCDate() - 1);

  data.editions.push({
    id: crypto.randomUUID(),
    year: nextYear,
    title: "Reinado de Nossa Senhora do Rosario da Colonia Santa Isabel",
    startDate: isoDate(friday),
    endDate: isoDate(sunday),
    status: "Planejada",
    notes: "Edicao futura criada para planejamento comunitario, cadastro de participantes e organizacao da programacao.",
    schedule: [
      { date: isoDate(friday), time: "19h", name: "Reza do Terco e atividade cultural", place: "Sede da Irmandade" },
      { date: isoDate(saturday), time: "19h", name: "Hasteamento da Bandeira", place: "Sede da Irmandade" },
      { date: isoDate(sunday), time: "10h", name: "Chegada da imagem pelo Rio Paraopeba", place: "Barca da Colonia Santa Isabel" },
      { date: isoDate(sunday), time: "16h", name: "Missa Conga e encerramento", place: "Sede da Irmandade" }
    ]
  });

  saveData();
  refreshAll();
  yearFilter.value = String(nextYear);
  switchView("edicoes");
  renderEditions();
}

document.querySelector("#editionForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const record = formToObject(form);
  upsert("editions", {
    ...record,
    year: Number(record.year),
    schedule: data.editions.find((edition) => edition.id === record.id)?.schedule || []
  });
  resetForm(form);
});

document.querySelector("#participantForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const record = formToObject(form);
  upsert("participants", { ...record, editionYear: Number(record.editionYear) });
  resetForm(form);
});

document.querySelector("#placeForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  upsert("places", formToObject(form));
  resetForm(form);
});

document.querySelector("#cultureForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  upsert("culture", formToObject(form));
  resetForm(form);
});

document.body.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.view) switchView(button.dataset.view);

  const actions = [
    ["editEdition", "editions", "#editionForm"],
    ["editParticipant", "participants", "#participantForm"],
    ["editPlace", "places", "#placeForm"],
    ["editCulture", "culture", "#cultureForm"]
  ];

  actions.forEach(([datasetKey, collection, formSelector]) => {
    const id = button.dataset[datasetKey];
    if (!id) return;
    const record = data[collection].find((item) => item.id === id);
    if (record) fillForm(document.querySelector(formSelector), record);
  });

  const deleteActions = [
    ["deleteEdition", "editions"],
    ["deleteParticipant", "participants"],
    ["deletePlace", "places"],
    ["deleteCulture", "culture"]
  ];

  deleteActions.forEach(([datasetKey, collection]) => {
    const id = button.dataset[datasetKey];
    if (id && confirm("Excluir este registro?")) deleteRecord(collection, id);
  });
});

document.querySelector("#addNextEdition").addEventListener("click", addNextEdition);

document.querySelector("#exportData").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "dados-reinado-santa-isabel.json";
  link.click();
  URL.revokeObjectURL(url);
});

document.querySelector("#resetData").addEventListener("click", () => {
  if (!confirm("Restaurar a base inicial e remover cadastros feitos neste navegador?")) return;
  data = structuredClone(seedData);
  saveData();
  refreshAll();
});

contrastToggle.addEventListener("click", () => {
  const settings = loadAccessibility();
  settings.highContrast = !settings.highContrast;
  saveAccessibility(settings);
  applyAccessibility(settings);
});

fontToggle.addEventListener("click", () => {
  const settings = loadAccessibility();
  settings.fontLarge = !settings.fontLarge;
  saveAccessibility(settings);
  applyAccessibility(settings);
});

searchInput.addEventListener("input", refreshAll);
yearFilter.addEventListener("change", refreshAll);

tabButtons.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));

ensureDefaultRecords();
applyAccessibility();
refreshAll();
