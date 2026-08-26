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

