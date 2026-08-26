/*   ================================== IIFE =================================== */
(function () {
  "use strict";

/* ======================= 1. CONSTANTS & I18N ========================== */

  const STORAGE_KEY = "taskflow.v1";
  const PRIORITIES = ["urgent", "high", "medium", "low"];
  const PRIORITY_WEIGHT = { urgent: 0, high: 1, medium: 2, low: 3 };
  const STATUSES = ["todo", "doing", "done"];

  const I18N = {
    en: {
      "nav.label": "Main navigation",
      "nav.views": "Views",
      "nav.today": "Today",
      "nav.all": "All tasks",
      "nav.upcoming": "Upcoming",
      "nav.projects": "Projects",
      "nav.tags": "Tags",
      "tags.hint": "Tags you add to tasks appear here.",
      "project.new": "New project…",
      "search.placeholder": "Search tasks…",
      "search.label": "Search tasks",
      "theme.toggle": "Toggle dark mode",
      "lang.label": "Language",
      "view.label": "View mode",
      "view.list": "List",
      "view.kanban": "Board",
      "filters.label": "Filters and sorting",
      "filter.status": "Status",
      "filter.priority": "Priority",
      "filter.project": "Project",
      "filter.tag": "Tag",
      "filter.due": "Due",
      "filter.any": "Any",
      "filter.reset": "Reset filters",
      "sort.label": "Sort",
      "sort.priority": "Priority",
      "sort.due": "Due date",
      "sort.created": "Newest",
      "sort.title": "Title",
      "status.todo": "To Do",
      "status.doing": "In Progress",
      "status.done": "Done",
      "priority.urgent": "Urgent",
      "priority.high": "High",
      "priority.medium": "Medium",
      "priority.low": "Low",
      "due.today": "Today",
      "due.tomorrow": "Tomorrow",
      "due.week": "This week",
      "due.overdue": "Overdue",
      "due.none": "No date",
      "task.new": "New task",
      "task.edit": "Edit task",
      "task.title": "Title",
      "task.titleRequired": "Please enter a title.",
      "task.desc": "Description",
      "task.due": "Due date",
      "task.tags": "Tags",
      "task.tagsPlaceholder": "work, design (comma separated)",
      "task.subtasks": "Subtasks",
      "task.subtaskAdd": "Add a subtask…",
      "task.delete": "Delete task",
      "task.noProject": "No project",
      "common.add": "Add",
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.clear": "Clear",
      "common.close": "Close",
      "common.remove": "Remove",
      "common.undo": "Undo",
      "common.all": "All",
      "quickadd.placeholder": "Quick add: Finish portfolio tomorrow #work !high",
      "quickadd.label": "Quick add a task",
      "quickadd.help":
        "Tip: use today / tomorrow for the due date, #tag for a tag and !urgent !high !medium !low for priority.",
      "greeting.morning": "Good morning",
      "greeting.afternoon": "Good afternoon",
      "greeting.evening": "Good evening",
      "dash.eyebrow": "Today dashboard",
      "dash.subtitle": "Here is your focus for today.",
      "dash.progress": "Today's completion",
      "stat.today": "Tasks today",
      "stat.completed": "Completed",
      "stat.remaining": "Remaining",
      "stat.overdue": "Overdue",
      "dash.todayTasks": "Today's tasks",
      "dash.otherTasks": "Everything else",
      "empty.title": "No tasks yet",
      "empty.body": "Create your first task with the quick add field above or press N.",
      "empty.todayTitle": "Nothing due today",
      "empty.todayBody": "Enjoy the clear slate, or plan something new for today.",
      "noresults.title": "No matching tasks",
      "noresults.body": "Try a different search term or reset the filters.",
      "projects.empty": "No projects yet",
      "projects.emptyBody": "Create a project in the sidebar to group related tasks.",
      "projects.tasks": "tasks",
      "projects.done": "done",
      "projects.remaining": "remaining",
      "error.title": "Something went wrong",
      "error.storage": "Your browser blocked local storage, so changes won't be saved.",
      "toast.created": "Task created",
      "toast.updated": "Task updated",
      "toast.completed": "Task completed",
      "toast.reopened": "Task reopened",
      "toast.deleted": "Task deleted",
      "toast.restored": "Task restored",
      "toast.projectCreated": "Project created",
      "toast.projectDeleted": "Project deleted",
      "toast.themeChanged": "Theme changed",
      "toast.noTaskSelected": "Select a task first",
      "cmd.open": "Commands",
      "cmd.short": "Cmd",
      "cmd.placeholder": "Type a command or search…",
      "cmd.createTask": "Create task",
      "cmd.searchTasks": "Search tasks",
      "cmd.goToday": "Go to Today",
      "cmd.goAll": "Go to All tasks",
      "cmd.goProjects": "Go to Projects",
      "cmd.toggleTheme": "Toggle dark mode",
      "cmd.toggleView": "Toggle list / board view",
      "cmd.toggleLang": "Switch language (EN/DE)",
      "cmd.empty": "No commands found",
      "cmd.section": "Actions",
      "a11y.complete": "Toggle complete",
      "a11y.edit": "Edit",
      "a11y.delete": "Delete",
      "subtasks.progress": "{done}/{total} subtasks",
      "count.tasks": "{n} tasks",
    },
    de: {
      "nav.label": "Hauptnavigation",
      "nav.views": "Ansichten",
      "nav.today": "Heute",
      "nav.all": "Alle Aufgaben",
      "nav.upcoming": "Demnächst",
      "nav.projects": "Projekte",
      "nav.tags": "Tags",
      "tags.hint": "Tags aus deinen Aufgaben erscheinen hier.",
      "project.new": "Neues Projekt…",
      "search.placeholder": "Aufgaben suchen…",
      "search.label": "Aufgaben suchen",
      "theme.toggle": "Dunkelmodus umschalten",
      "lang.label": "Sprache",
      "view.label": "Ansichtsmodus",
      "view.list": "Liste",
      "view.kanban": "Board",
      "filters.label": "Filter und Sortierung",
      "filter.status": "Status",
      "filter.priority": "Priorität",
      "filter.project": "Projekt",
      "filter.tag": "Tag",
      "filter.due": "Fällig",
      "filter.any": "Alle",
      "filter.reset": "Filter zurücksetzen",
      "sort.label": "Sortieren",
      "sort.priority": "Priorität",
      "sort.due": "Fälligkeit",
      "sort.created": "Neueste",
      "sort.title": "Titel",
      "status.todo": "Zu erledigen",
      "status.doing": "In Arbeit",
      "status.done": "Erledigt",
      "priority.urgent": "Dringend",
      "priority.high": "Hoch",
      "priority.medium": "Mittel",
      "priority.low": "Niedrig",
      "due.today": "Heute",
      "due.tomorrow": "Morgen",
      "due.week": "Diese Woche",
      "due.overdue": "Überfällig",
      "due.none": "Kein Datum",
      "task.new": "Neue Aufgabe",
      "task.edit": "Aufgabe bearbeiten",
      "task.title": "Titel",
      "task.titleRequired": "Bitte gib einen Titel ein.",
      "task.desc": "Beschreibung",
      "task.due": "Fälligkeitsdatum",
      "task.tags": "Tags",
      "task.tagsPlaceholder": "arbeit, design (mit Komma getrennt)",
      "task.subtasks": "Teilaufgaben",
      "task.subtaskAdd": "Teilaufgabe hinzufügen…",
      "task.delete": "Aufgabe löschen",
      "task.noProject": "Kein Projekt",
      "common.add": "Hinzufügen",
      "common.save": "Speichern",
      "common.cancel": "Abbrechen",
      "common.clear": "Leeren",
      "common.close": "Schließen",
      "common.remove": "Entfernen",
      "common.undo": "Rückgängig",
      "common.all": "Alle",
      "quickadd.placeholder": "Schnell erfassen: Portfolio morgen #arbeit !hoch",
      "quickadd.label": "Aufgabe schnell erfassen",
      "quickadd.help":
        "Tipp: heute / morgen für das Datum, #tag für ein Tag und !dringend !hoch !mittel !niedrig für die Priorität.",
      "greeting.morning": "Guten Morgen",
      "greeting.afternoon": "Guten Tag",
      "greeting.evening": "Guten Abend",
      "dash.eyebrow": "Heute-Übersicht",
      "dash.subtitle": "Das ist dein Fokus für heute.",
      "dash.progress": "Fortschritt heute",
      "stat.today": "Aufgaben heute",
      "stat.completed": "Erledigt",
      "stat.remaining": "Offen",
      "stat.overdue": "Überfällig",
      "dash.todayTasks": "Heutige Aufgaben",
      "dash.otherTasks": "Alles Weitere",
      "empty.title": "Noch keine Aufgaben",
      "empty.body": "Erstelle deine erste Aufgabe im Schnellfeld oben oder drücke N.",
      "empty.todayTitle": "Heute steht nichts an",
      "empty.todayBody": "Genieße den freien Tag oder plane etwas Neues.",
      "noresults.title": "Keine passenden Aufgaben",
      "noresults.body": "Versuche einen anderen Suchbegriff oder setze die Filter zurück.",
      "projects.empty": "Noch keine Projekte",
      "projects.emptyBody": "Lege in der Seitenleiste ein Projekt an, um Aufgaben zu bündeln.",
      "projects.tasks": "Aufgaben",
      "projects.done": "erledigt",
      "projects.remaining": "offen",
      "error.title": "Etwas ist schiefgelaufen",
      "error.storage": "Dein Browser blockiert den lokalen Speicher — Änderungen werden nicht gesichert.",
      "toast.created": "Aufgabe erstellt",
      "toast.updated": "Aufgabe aktualisiert",
      "toast.completed": "Aufgabe erledigt",
      "toast.reopened": "Aufgabe wieder geöffnet",
      "toast.deleted": "Aufgabe gelöscht",
      "toast.restored": "Aufgabe wiederhergestellt",
      "toast.projectCreated": "Projekt erstellt",
      "toast.projectDeleted": "Projekt gelöscht",
      "toast.themeChanged": "Design geändert",
      "toast.noTaskSelected": "Wähle zuerst eine Aufgabe",
      "cmd.open": "Befehle",
      "cmd.short": "Befehle",
      "cmd.placeholder": "Befehl eingeben oder suchen…",
      "cmd.createTask": "Aufgabe erstellen",
      "cmd.searchTasks": "Aufgaben suchen",
      "cmd.goToday": "Zu Heute",
      "cmd.goAll": "Zu allen Aufgaben",
      "cmd.goProjects": "Zu Projekten",
      "cmd.toggleTheme": "Dunkelmodus umschalten",
      "cmd.toggleView": "Listen-/Board-Ansicht wechseln",
      "cmd.toggleLang": "Sprache wechseln (EN/DE)",
      "cmd.empty": "Keine Befehle gefunden",
      "cmd.section": "Aktionen",
      "a11y.complete": "Erledigt umschalten",
      "a11y.edit": "Bearbeiten",
      "a11y.delete": "Löschen",
      "subtasks.progress": "{done}/{total} Teilaufgaben",
      "count.tasks": "{n} Aufgaben",
    },
  };

  /** Translate a key with optional {placeholders}. */
  function t(key, vars) {
    const dict = I18N[state.settings.lang] || I18N.en;
    let str = dict[key] != null ? dict[key] : I18N.en[key] != null ? I18N.en[key] : key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        str = str.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
      });
    }
    return str;
  }

  /* ============================ 2. UTILITIES ============================ */

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  /** Escape user content before injecting into innerHTML. */
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[c]);
  }

  /* --- Date helpers: all dates are stored as local "YYYY-MM-DD" strings --- */
  function toISODate(date) {
    const d = new Date(date);
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }
  const todayISO = () => toISODate(new Date());
  function addDaysISO(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return toISODate(d);
  }
  const isToday = (iso) => iso === todayISO();
  const isTomorrow = (iso) => iso === addDaysISO(1);
  const isOverdue = (task) => !!task.due && task.due < todayISO() && task.status !== "done";
  function withinWeek(iso) {
    return !!iso && iso >= todayISO() && iso <= addDaysISO(7);
  }
  /** Human-friendly due label ("Today", "Tomorrow" or a localized date). */
  function formatDue(iso) {
    if (!iso) return "";
    if (isToday(iso)) return t("due.today");
    if (isTomorrow(iso)) return t("due.tomorrow");
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(state.settings.lang === "de" ? "de-DE" : "en-GB", {
      day: "2-digit",
      month: "short",
    });
  }

  /* Small inline SVG snippets reused in rendered markup. */
  const ICON = {
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
    edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4l10-10-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>',
    trash: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/></svg>',
    inbox: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5 5h14l2 8v6H3v-6z"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    alert: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8v5M12 16.5v.5"/><circle cx="12" cy="12" r="9"/></svg>',
    folder: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7a2 2 0 012-2h3l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2z"/></svg>',
  };

    /* ========================== 3. STORAGE LAYER ========================== */

  const defaultState = () => ({
    tasks: [],
    projects: [],
    settings: {
      theme: prefersDark() ? "dark" : "light",
      lang: (navigator.language || "en").toLowerCase().startsWith("de") ? "de" : "en",
      view: "list",
      route: "today",
      filters: { status: "all", priority: "all", project: "all", tag: "all", due: "all" },
      sort: "priority",
    },
  });

  function prefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  const Storage = {
    available: true,
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultState();
        const parsed = JSON.parse(raw);
        const base = defaultState();
        return {
          tasks: Array.isArray(parsed.tasks) ? parsed.tasks.map(normalizeTask) : [],
          projects: Array.isArray(parsed.projects) ? parsed.projects : [],
          settings: Object.assign(base.settings, parsed.settings || {}, {
            filters: Object.assign(base.settings.filters, (parsed.settings || {}).filters || {}),
          }),
        };
      } catch (err) {
        console.error("TaskFlow: failed to read storage", err);
        Storage.available = false;
        return defaultState();
      }
    },
    save(data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (err) {
        console.error("TaskFlow: failed to write storage", err);
        if (Storage.available) {
          Storage.available = false;
          toast(t("error.storage"), { type: "error", duration: 6000 });
        }
      }
    },
  };

  /** Guarantee every persisted task has the full shape the UI expects. */
  function normalizeTask(task) {
    return {
      id: task.id || uid(),
      title: String(task.title || "Untitled"),
      description: String(task.description || ""),
      priority: PRIORITIES.indexOf(task.priority) > -1 ? task.priority : "medium",
      status: STATUSES.indexOf(task.status) > -1 ? task.status : "todo",
      due: task.due || null,
      projectId: task.projectId || null,
      tags: Array.isArray(task.tags) ? task.tags : [],
      subtasks: Array.isArray(task.subtasks) ? task.subtasks : [],
      createdAt: task.createdAt || Date.now(),
    };
  }

  /* ========================= 4. STATE & SELECTORS ======================= */

  let state = defaultState();
  let search = "";
  let selectedId = null;
  const els = {};

  const persist = () => Storage.save(state);

  const getTask = (id) => state.tasks.find((task) => task.id === id) || null;
  const getProject = (id) => state.projects.find((p) => p.id === id) || null;

  /** All tags currently in use, alphabetically sorted. */
  function allTags() {
    const set = new Set();
    state.tasks.forEach((task) => task.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).sort();
  }

  /** Apply search + every active filter to the task collection. */
  function filterTasks(tasks) {
    const f = state.settings.filters;
    const q = search.trim().toLowerCase();
    return tasks.filter((task) => {
      if (q && (task.title + " " + task.description).toLowerCase().indexOf(q) === -1) return false;
      if (f.status !== "all" && task.status !== f.status) return false;
      if (f.priority !== "all" && task.priority !== f.priority) return false;
      if (f.project !== "all" && (task.projectId || "none") !== f.project) return false;
      if (f.tag !== "all" && task.tags.indexOf(f.tag) === -1) return false;
      if (f.due !== "all") {
        if (f.due === "today" && !isToday(task.due)) return false;
        if (f.due === "tomorrow" && !isTomorrow(task.due)) return false;
        if (f.due === "week" && !withinWeek(task.due)) return false;
        if (f.due === "overdue" && !isOverdue(task)) return false;
        if (f.due === "none" && task.due) return false;
      }
      return true;
    });
  }

  /** Sort a list of tasks according to the active sort option. */
  function sortTasks(tasks) {
    const mode = state.settings.sort;
    return tasks.slice().sort((a, b) => {
      if (mode === "priority") {
        const diff = PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
        if (diff) return diff;
        return (a.due || "9999") < (b.due || "9999") ? -1 : 1;
      }
      if (mode === "due") {
        return (a.due || "9999-99-99").localeCompare(b.due || "9999-99-99");
      }
      if (mode === "title") return a.title.localeCompare(b.title);
      return b.createdAt - a.createdAt;
    });
  }

  const visibleTasks = (tasks) => sortTasks(filterTasks(tasks || state.tasks));

  /** Aggregate numbers powering the Today dashboard. */
  function todayStats() {
    const todays = state.tasks.filter((task) => isToday(task.due));
    const completed = todays.filter((task) => task.status === "done").length;
    const overdue = state.tasks.filter(isOverdue).length;
    return {
      total: todays.length,
      completed,
      remaining: todays.length - completed,
      overdue,
      percent: todays.length ? Math.round((completed / todays.length) * 100) : 0,
    };
  }

   /* ============================= 5. TOASTS ============================== */

  function toast(message, options) {
    const opts = options || {};
    const node = document.createElement("div");
    node.className = "toast " + (opts.type || "");
    node.setAttribute("role", "status");
    node.innerHTML =
      '<span class="dot"></span><span class="msg">' +
      esc(message) +
      "</span>" +
      (opts.actionLabel ? '<button type="button" class="undo">' + esc(opts.actionLabel) + "</button>" : "");

    if (opts.actionLabel) {
      $(".undo", node).addEventListener("click", () => {
        opts.onAction && opts.onAction();
        dismiss();
      });
    }
    els.toasts.appendChild(node);

    const timer = setTimeout(dismiss, opts.duration || 3600);
    function dismiss() {
      clearTimeout(timer);
      if (!node.isConnected) return;
      node.classList.add("leaving");
      setTimeout(() => node.remove(), 200);
    }
    return dismiss;
  }

  /* ============================ 6. RENDERING ============================ */

  /** Full re-render: chrome (sidebar, toolbar, nav) + the active route view. */
  function render() {
    document.documentElement.setAttribute("data-theme", state.settings.theme);
    document.documentElement.lang = state.settings.lang;
    applyTranslations();
    renderSidebar();
    renderToolbar();
    renderNavState();
    renderRoute();
  }

  /** Replace every [data-i18n*] node's text with the current language. */
  function applyTranslations() {
    $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    $$("[data-i18n-placeholder]").forEach((el) => (el.placeholder = t(el.dataset.i18nPlaceholder)));
    $$("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    $$("[data-lang]").forEach((btn) =>
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === state.settings.lang)),
    );
    $$("[data-view]").forEach((btn) =>
      btn.setAttribute("aria-pressed", String(btn.dataset.view === state.settings.view)),
    );
    document.title = "TaskFlow — " + t("nav." + (state.settings.route === "upcoming" ? "upcoming" : state.settings.route));
  }

  function renderNavState() {
    $$("[data-route]").forEach((el) => {
      if (el.dataset.route === state.settings.route) el.setAttribute("aria-current", "page");
      else el.removeAttribute("aria-current");
    });
    els.countAll.textContent = state.tasks.length;
  }

  function renderSidebar() {
    // Projects as filter chips (with delete)
    els.projectList.innerHTML = state.projects.length
      ? state.projects
          .map((p) => {
            const active = state.settings.filters.project === p.id;
            return (
              '<span class="chip" role="group"><button type="button" class="chip-label" data-project-filter="' +
              esc(p.id) +
              '" aria-pressed="' +
              active +
              '" style="all:unset;cursor:pointer">' +
              esc(p.name) +
              '</button><span class="x" role="button" tabindex="0" data-project-delete="' +
              esc(p.id) +
              '" aria-label="' +
              esc(t("common.remove") + " " + p.name) +
              '">' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></span></span>'
            );
          })
          .join("")
      : '<p class="nav-hint">' + esc(t("projects.empty")) + "</p>";

    // Tag chips
    const tags = allTags();
    els.tagList.innerHTML = tags
      .map(
        (tag) =>
          '<button type="button" class="chip" data-tag-filter="' +
          esc(tag) +
          '" aria-pressed="' +
          (state.settings.filters.tag === tag) +
          '">#' +
          esc(tag) +
          "</button>",
      )
      .join("");
    els.tagEmptyHint.hidden = tags.length > 0;
  }

  /** Keep selects in sync with state (options + current values). */
  function renderToolbar() {
    const f = state.settings.filters;
    const projectOptions =
      '<option value="all">' +
      esc(t("filter.any")) +
      "</option>" +
      '<option value="none">' +
      esc(t("task.noProject")) +
      "</option>" +
      state.projects.map((p) => '<option value="' + esc(p.id) + '">' + esc(p.name) + "</option>").join("");
    els.filterProject.innerHTML = projectOptions;
    els.filterProject.value = f.project;

    els.filterTag.innerHTML =
      '<option value="all">' +
      esc(t("filter.any")) +
      "</option>" +
      allTags().map((tag) => '<option value="' + esc(tag) + '">#' + esc(tag) + "</option>").join("");
    els.filterTag.value = f.tag;

    els.filterStatus.value = f.status;
    els.filterPriority.value = f.priority;
    els.filterDue.value = f.due;
    els.sortBy.value = state.settings.sort;
    els.searchInput.value = search;
  }

  /** Route dispatcher for the main content area. */
  function renderRoute() {
    const root = els.viewRoot;
    root.innerHTML = "";
    const route = state.settings.route;

    if (route === "projects") return root.appendChild(renderProjectsView());
    if (route === "today") return root.appendChild(renderTodayView());

    const pool =
      route === "upcoming"
        ? state.tasks.filter((task) => task.due && task.due >= todayISO())
        : state.tasks;
    const tasks = visibleTasks(pool);
    const frag = document.createDocumentFragment();
    const head = document.createElement("div");
    head.className = "section-head";
    head.innerHTML =
      "<h2>" + esc(t("nav." + route)) + '</h2><span class="muted">' + esc(t("count.tasks", { n: tasks.length })) + "</span>";
    frag.appendChild(head);
    frag.appendChild(renderTaskCollection(tasks, pool.length));
    root.appendChild(frag);
  }

  /** Today dashboard: greeting, progress, stats, today's list. */
  function renderTodayView() {
    const stats = todayStats();
    const hour = new Date().getHours();
    const greeting = hour < 12 ? t("greeting.morning") : hour < 18 ? t("greeting.afternoon") : t("greeting.evening");
    const wrap = document.createElement("div");
    wrap.className = "dash";
    wrap.innerHTML =
      '<section class="hero">' +
      '<p class="eyebrow">' + esc(t("dash.eyebrow")) + "</p>" +
      "<h1>" + esc(greeting) + "</h1>" +
      "<p>" + esc(t("dash.subtitle")) + "</p>" +
      '<div class="progress"><div class="progress-top"><span>' +
      esc(t("dash.progress")) +
      "</span><span>" + stats.percent + "%</span></div>" +
      '<div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' +
      stats.percent + '"><div class="progress-bar" id="progressBar"></div></div></div>' +
      "</section>" +
      '<div class="stats">' +
      statCard("stat.today", stats.total, "") +
      statCard("stat.completed", stats.completed, "is-done") +
      statCard("stat.remaining", stats.remaining, "") +
      statCard("stat.overdue", stats.overdue, "is-overdue") +
      "</div>";

    const todays = visibleTasks(state.tasks.filter((task) => isToday(task.due) || isOverdue(task)));
    const head = document.createElement("div");
    head.className = "section-head";
    head.innerHTML =
      "<h2>" + esc(t("dash.todayTasks")) + '</h2><span class="muted">' +
      esc(t("count.tasks", { n: todays.length })) + "</span>";
    wrap.appendChild(head);
    wrap.appendChild(
      renderTaskCollection(todays, state.tasks.filter((task) => isToday(task.due) || isOverdue(task)).length, {
        emptyTitle: "empty.todayTitle",
        emptyBody: "empty.todayBody",
      }),
    );

    // Animate the bar after paint so the CSS transition runs.
    requestAnimationFrame(() => {
      const bar = $("#progressBar", wrap);
      if (bar) bar.style.width = stats.percent + "%";
    });
    return wrap;
  }

  function statCard(key, value, modifier) {
    return (
      '<div class="stat ' + modifier + '"><p class="k">' + esc(t(key)) + '</p><p class="v">' + value + "</p></div>"
    );
  }

  /**
   * Render either the list or the kanban board, plus the correct
   * empty / no-results state.
   */
  function renderTaskCollection(tasks, poolLength, labels) {
    const opts = labels || {};
    if (!tasks.length) {
      if (!poolLength && !search && !hasActiveFilters()) {
        return emptyState(ICON.inbox, t(opts.emptyTitle || "empty.title"), t(opts.emptyBody || "empty.body"));
      }
      return emptyState(ICON.search, t("noresults.title"), t("noresults.body"));
    }
    return state.settings.view === "kanban" ? renderBoard(tasks) : renderList(tasks);
  }

  function hasActiveFilters() {
    const f = state.settings.filters;
    return Object.keys(f).some((k) => f[k] !== "all");
  }

  function emptyState(icon, title, body) {
    const el = document.createElement("div");
    el.className = "state";
    el.innerHTML = icon + "<h3>" + esc(title) + "</h3><p>" + esc(body) + "</p>";
    return el;
  }

  function renderList(tasks) {
    const ul = document.createElement("ul");
    ul.className = "tasks";
    tasks.forEach((task) => ul.appendChild(renderTaskCard(task, false)));
    return ul;
  }

  function renderBoard(tasks) {
    const board = document.createElement("div");
    board.className = "board";
    STATUSES.forEach((status) => {
      const col = document.createElement("section");
      col.className = "column";
      col.dataset.column = status;
      const items = tasks.filter((task) => task.status === status);
      col.innerHTML =
        '<header class="column-head"><span>' + esc(t("status." + status)) + "</span><span>" + items.length + "</span></header>";
      const body = document.createElement("div");
      body.className = "column-body";
      items.forEach((task) => body.appendChild(renderTaskCard(task, true)));
      col.appendChild(body);
      board.appendChild(col);
    });
    return board;
  }

  /** One task card — used by both list and board views. */
  function renderTaskCard(task, draggable) {
    const li = document.createElement(draggable ? "article" : "li");
    li.className =
      "task" + (task.status === "done" ? " is-done" : "") + (task.id === selectedId ? " is-selected" : "");
    li.dataset.id = task.id;
    li.tabIndex = 0;
    if (draggable) li.draggable = true;

    const doneSubs = task.subtasks.filter((s) => s.done).length;
    const meta = [];
    meta.push('<span class="badge p-' + task.priority + '">' + esc(t("priority." + task.priority)) + "</span>");
    if (task.due) {
      meta.push(
        '<span class="badge ' + (isOverdue(task) ? "overdue" : "neutral") + '">' +
          (isOverdue(task) ? esc(t("due.overdue")) + " · " : "") +
          esc(formatDue(task.due)) +
          "</span>",
      );
    }
    if (task.projectId && getProject(task.projectId)) {
      meta.push('<span class="badge neutral">' + esc(getProject(task.projectId).name) + "</span>");
    }
    if (state.settings.view === "kanban" || task.status === "doing") {
      meta.push('<span class="badge neutral">' + esc(t("status." + task.status)) + "</span>");
    }
    task.tags.forEach((tag) => meta.push('<span class="badge neutral">#' + esc(tag) + "</span>"));

    li.innerHTML =
      '<button type="button" class="check" data-action="toggle" aria-pressed="' +
      (task.status === "done") +
      '" aria-label="' + esc(t("a11y.complete")) + '">' + ICON.check + "</button>" +
      '<div class="task-main">' +
      '<p class="task-title">' + esc(task.title) + "</p>" +
      (task.description ? '<p class="task-desc">' + esc(task.description) + "</p>" : "") +
      '<div class="task-meta">' + meta.join("") + "</div>" +
      (task.subtasks.length
        ? '<div class="subprogress"><span class="field-label">' +
          esc(t("subtasks.progress", { done: doneSubs, total: task.subtasks.length })) +
          '</span><div class="track"><div class="fill" style="width:' +
          Math.round((doneSubs / task.subtasks.length) * 100) +
          '%"></div></div></div>' +
          '<ul class="subtasks">' +
          task.subtasks
            .map(
              (sub) =>
                '<li class="subtask' + (sub.done ? " done" : "") + '"><button type="button" data-action="subtask" data-sub="' +
                esc(sub.id) +
                '" aria-pressed="' + !!sub.done + '"><span class="box">' + ICON.check +
                '</span><span class="label">' + esc(sub.title) + "</span></button></li>",
            )
            .join("") +
          "</ul>"
        : "") +
      "</div>" +
      '<div class="task-actions">' +
      '<button type="button" class="icon-btn" data-action="edit" aria-label="' + esc(t("a11y.edit")) + '">' + ICON.edit + "</button>" +
      '<button type="button" class="icon-btn" data-action="delete" aria-label="' + esc(t("a11y.delete")) + '">' + ICON.trash + "</button>" +
      "</div>";
    return li;
  }

  function renderProjectsView() {
    const wrap = document.createElement("div");
    const head = document.createElement("div");
    head.className = "section-head";
    head.innerHTML = "<h2>" + esc(t("nav.projects")) + "</h2>";
    wrap.appendChild(head);

    if (!state.projects.length) {
      wrap.appendChild(emptyState(ICON.folder, t("projects.empty"), t("projects.emptyBody")));
      return wrap;
    }

    const grid = document.createElement("div");
    grid.className = "projects";
    state.projects.forEach((project) => {
      const tasks = state.tasks.filter((task) => task.projectId === project.id);
      const done = tasks.filter((task) => task.status === "done").length;
      const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
      const card = document.createElement("article");
      card.className = "card project-card";
      card.innerHTML =
        "<h3>" + esc(project.name) + "</h3>" +
        '<p class="meta">' + tasks.length + " " + esc(t("projects.tasks")) + " · " + done + " " +
        esc(t("projects.done")) + " · " + (tasks.length - done) + " " + esc(t("projects.remaining")) + "</p>" +
        '<div class="progress-track"><div class="progress-bar" style="width:' + percent + '%"></div></div>' +
        '<button type="button" class="btn btn-soft" data-project-open="' + esc(project.id) + '">' +
        esc(t("nav.all")) + "</button>";
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    return wrap;
  }

  /* ========================= 7. TASK OPERATIONS ========================= */

  function createTask(data) {
    const task = normalizeTask(Object.assign({ id: uid(), createdAt: Date.now() }, data));
    state.tasks.unshift(task);
    persist();
    render();
    toast(t("toast.created"), { type: "success" });
    return task;
  }

  function updateTask(id, patch) {
    const task = getTask(id);
    if (!task) return;
    Object.assign(task, patch);
    persist();
    render();
  }

  function deleteTask(id) {
    const index = state.tasks.findIndex((task) => task.id === id);
    if (index === -1) return;
    const [removed] = state.tasks.splice(index, 1);
    if (selectedId === id) selectedId = null;
    persist();
    render();
    toast(t("toast.deleted"), {
      actionLabel: t("common.undo"),
      duration: 6000,
      onAction() {
        state.tasks.splice(index, 0, removed);
        persist();
        render();
        toast(t("toast.restored"), { type: "success" });
      },
    });
  }

  function toggleComplete(id) {
    const task = getTask(id);
    if (!task) return;
    const nowDone = task.status !== "done";
    task.status = nowDone ? "done" : "todo";
    persist();
    render();
    const card = $('.task[data-id="' + CSS.escape(id) + '"]');
    if (card && nowDone) card.classList.add("just-done");
    toast(nowDone ? t("toast.completed") : t("toast.reopened"), { type: nowDone ? "success" : "" });
  }

  function toggleSubtask(taskId, subId) {
    const task = getTask(taskId);
    if (!task) return;
    const sub = task.subtasks.find((s) => s.id === subId);
    if (!sub) return;
    sub.done = !sub.done;
    persist();
    render();
  }

  function createProject(name) {
    const clean = name.trim();
    if (!clean) return null;
    const existing = state.projects.find((p) => p.name.toLowerCase() === clean.toLowerCase());
    if (existing) return existing;
    const project = { id: uid(), name: clean };
    state.projects.push(project);
    persist();
    render();
    toast(t("toast.projectCreated"), { type: "success" });
    return project;
  }

  function deleteProject(id) {
    state.projects = state.projects.filter((p) => p.id !== id);
    state.tasks.forEach((task) => {
      if (task.projectId === id) task.projectId = null;
    });
    if (state.settings.filters.project === id) state.settings.filters.project = "all";
    persist();
    render();
    toast(t("toast.projectDeleted"));
  }

  /**
   * Quick-add parser: extracts #tags, !priority and today/tomorrow keywords
   * (EN + DE) from a single line of text.
   */
  function parseQuickAdd(input) {
    let text = " " + input.trim() + " ";
    const tags = [];
    let priority = "medium";
    let due = null;

    text = text.replace(/#([\p{L}\p{N}_-]+)/gu, (_, tag) => {
      tags.push(tag.toLowerCase());
      return " ";
    });

    const priorityMap = {
      urgent: "urgent", dringend: "urgent",
      high: "high", hoch: "high",
      medium: "medium", mittel: "medium",
      low: "low", niedrig: "low",
    };
    text = text.replace(/!([\p{L}]+)/giu, (match, word) => {
      const key = priorityMap[word.toLowerCase()];
      if (key) { priority = key; return " "; }
      return match;
    });

    const dueMap = [
      [/\b(today|heute)\b/i, 0],
      [/\b(tomorrow|morgen)\b/i, 1],
      [/\b(next week|nächste woche|naechste woche)\b/i, 7],
    ];
    dueMap.forEach(([re, offset]) => {
      if (due === null && re.test(text)) {
        due = addDaysISO(offset);
        text = text.replace(re, " ");
      }
    });

    const title = text.replace(/\s+/g, " ").trim();
    return { title, tags, priority, due };
  }
 
