/* Supabase UMD (index.html ішінде алдымен қосылады) — file:// және Chrome үшін модульсіз жүктеледі */
const _supabaseUmd = globalThis.supabase;
const createClient =
  _supabaseUmd && typeof _supabaseUmd.createClient === "function"
    ? _supabaseUmd.createClient.bind(_supabaseUmd)
    : null;

const _URL = "https://gsqbinxeecrtkhazbels.supabase.co";
const _KEY = "sb_publishable_AxrDKmh2Np6DDcKfJitu4g_mHZPG48x";

const LS_DEVICE = "contest_device_id";
const LS_UPLOAD = "contest_upload_done";
const LS_VOTE = "contest_vote_photo_id";
const LS_LANG = "contest_lang";
const META_PREFIX = "[meta]";

/** Галереяда дауысты растау үшін аты */
const galleryNameById = new Map();
let currentDuelGender = "male";
let duelRows = [];
let duelChampion = null;
let duelOpponent = null;
let duelQueue = [];
let duelStarted = false;
let duelFinalChoice = null;
let duelIntroActive = false;
let myCardExpanded = false;
let currentLang = "kk";

const I18N = {
  kk: {
    show: "Көрсету",
    hide: "Жасыру",
    voteOpen: "Дауыс ашық",
    submitOpen: "Өтініш ашық",
    paused: "Аралық",
    votePhase: "Дауыс",
    submitPhase: "Сурет қабылдаймыз",
    until: "Мерекеге дейін",
    duelEmpty: "Бұл санатта VS жасау үшін кемі 2 қатысушы керек",
    duelCategory: "Санат",
    girls: "Қыз",
    boys: "Ұл",
    finalist: "Финал кандидат",
    noCaption: "Сипаттама жоқ",
    submit: "Жіберу",
    saveNewPhoto: "Жаңа суретті сақтау",
    loading: "Жүктелуде…",
    submitErrName: "Аты-жөніңізді толық жазыңыз.",
    submitErrGender: "Санатты таңдаңыз (ұл/қыз).",
    submitErrFile: "Суретті таңдаңыз немесе сүйреп әкеліңіз.",
    submitErrFileReplace: "Жаңа суретті таңдаңыз (JPG, PNG, WEBP).",
    cropFirst: "Алдымен кесу аймағын реттеп, «Кесіп қолдану» батырмасын басыңыз.",
    sentOk: "Өтініш қабылданды. Рақмет!",
    replacedOk: "Сурет сәтті жаңартылды.",
    sentFail: "Жіберілмеді",
    noticeTitle: "Ескерту",
    impossible: "Мүмкін емес",
    ownFinal: "Өз суретіңізді финал таңдауға қоя алмайсыз.",
    cancel: "Бас тарту",
    voteBtn: "Дауыс беру",
    voteChange: "Дауысты ауыстыру",
    yourChoice: "Сіздің таңдауыңыз",
    ownPhoto: "Өз суретіңіз",
    myPhotoBadge: "Сіздің сурет",
    voteCountHint: "Дауыс кезеңінде дауыс саны көрінеді",
    pickFile: "Таңдау немесе сүйреп әкелу",
    voteChangeTitle: "Дауысты ауыстыру",
    startVote: "Дауыс беруді бастау",
    restartVote: "Қайта бастау",
    duelPick: "Екі карточканың бірін таңдаңыз",
    duelDone: "Таңдау сақталды",
    finalChoiceTitle: "Сіздің таңдауыңыз",
    ok: "Жақсы",
    chooseBtn: "Таңдау",
    duelReady: "Дауыс беруге бәрі дайын",
    duelHint: "Төмендегі батырманы басып, салыстыруды бастаңыз.",
    duelStartedIntro: "Дауыс беру басталды",
  },
  ru: {
    show: "Показать",
    hide: "Скрыть",
    voteOpen: "Голосование открыто",
    submitOpen: "Прием заявок открыт",
    paused: "Пауза",
    votePhase: "Голосование",
    submitPhase: "Прием фото",
    until: "До дедлайна",
    duelEmpty: "В этой категории нужно минимум 2 участника для VS",
    duelCategory: "Категория",
    girls: "Девушки",
    boys: "Парни",
    finalist: "Финальный кандидат",
    noCaption: "Без описания",
    submit: "Отправить",
    saveNewPhoto: "Сохранить новое фото",
    loading: "Загрузка…",
    submitErrName: "Введите полное имя.",
    submitErrGender: "Выберите категорию (парни/девушки).",
    submitErrFile: "Выберите фото или перетащите его.",
    submitErrFileReplace: "Выберите новое фото (JPG, PNG, WEBP).",
    cropFirst: "Сначала настройте кадрирование и нажмите «Применить обрезку».",
    sentOk: "Заявка принята. Спасибо!",
    replacedOk: "Фото успешно обновлено.",
    sentFail: "Не отправлено",
    noticeTitle: "Уведомление",
    impossible: "Невозможно",
    ownFinal: "Нельзя выбрать свое фото в финал.",
    cancel: "Отмена",
    voteBtn: "Голосовать",
    voteChange: "Сменить голос",
    yourChoice: "Ваш выбор",
    ownPhoto: "Свое фото",
    myPhotoBadge: "Ваше фото",
    voteCountHint: "Счет голосов отображается в этапе голосования",
    pickFile: "Выбрать или перетащить",
    voteChangeTitle: "Смена голоса",
    startVote: "Начать голосование",
    restartVote: "Начать заново",
    duelPick: "Выберите одну из двух карточек",
    duelDone: "Выбор сохранен",
    finalChoiceTitle: "Ваш выбор",
    ok: "Ок",
    chooseBtn: "Выбрать",
    duelReady: "Голосование готово",
    duelHint: "Нажмите кнопку снизу и начните сравнение.",
    duelStartedIntro: "Голосование началось",
  },
};

function t(key) {
  return I18N[currentLang]?.[key] || I18N.kk[key] || key;
}

function parseCaptionMeta(rawCaption) {
  const raw = String(rawCaption || "");
  if (!raw.startsWith(META_PREFIX)) {
    return { gender: "unknown", caption: raw.trim() };
  }
  const after = raw.slice(META_PREFIX.length);
  const splitAt = after.indexOf("[/meta]");
  if (splitAt < 0) return { gender: "unknown", caption: raw.trim() };
  const metaPart = after.slice(0, splitAt);
  const captionPart = after.slice(splitAt + "[/meta]".length).trim();
  const gMatch = /gender=(male|female)/.exec(metaPart);
  return { gender: gMatch ? gMatch[1] : "unknown", caption: captionPart };
}

function packCaptionMeta(gender, caption) {
  const cleanGender = gender === "female" ? "female" : "male";
  const cleanCaption = String(caption || "").trim();
  return `${META_PREFIX}gender=${cleanGender}[/meta]${cleanCaption ? ` ${cleanCaption}` : ""}`;
}

function setGenderError(text) {
  const ge = $("gender-err");
  const gi = $("gender-input");
  if (ge) {
    ge.textContent = text;
    ge.hidden = !text;
  }
  gi?.classList.toggle("field--invalid", !!text);
}

function syncMyCardCollapse(animate = true) {
  const body = $("my-card-collapsible");
  const btn = $("btn-my-card-toggle");
  if (!body || !btn) return;
  btn.setAttribute("aria-expanded", myCardExpanded ? "true" : "false");
  btn.textContent = myCardExpanded ? t("hide") : t("show");

  if (myCardExpanded) {
    body.hidden = false;
    body.classList.add("is-open");
    const h = body.scrollHeight;
    body.style.maxHeight = `${h}px`;
    return;
  }

  const collapse = () => {
    body.classList.remove("is-open");
    body.style.maxHeight = "0px";
    window.setTimeout(() => {
      if (!myCardExpanded) body.hidden = true;
    }, animate ? 420 : 0);
  };

  if (!body.hidden) {
    body.style.maxHeight = `${body.scrollHeight}px`;
    requestAnimationFrame(collapse);
  } else {
    body.style.maxHeight = "0px";
    body.classList.remove("is-open");
    body.hidden = true;
  }
}

function applyLanguageStaticUi() {
  const isRu = currentLang === "ru";
  const setText = (id, text) => {
    const el = $(id);
    if (el) el.textContent = text;
  };
  setText("hero-title", isRu ? "Селфи-конкурс с масками" : "Маскалармен селфи жарысы");
  setText("hero-tagline", isRu ? "2016 vibe · яркие маски · участвуй" : "2016 vibes · түрлі-түсті маскалар · суретке түсіңіз");
  setText("voting-title", isRu ? "Голосование (VS формат)" : "Дауыс беру (VS формат)");
  setText(
    "voting-desc",
    isRu
      ? "Сначала выберите категорию, затем нажмите «Начать голосование». Выбирайте из двух карточек, можно в любой момент начать заново."
      : "Алдымен санатты таңдаңыз, кейін «Дауыс беруді бастау» басыңыз. Екі карточкадан таңдайсыз, қажет болса қайта бастауға болады."
  );
  setText("submit-title", isRu ? "Отправка заявки" : "Өтініш жіберу");
  setText("duel-tab-boys", t("boys"));
  setText("duel-tab-girls", t("girls"));
  const startBtn = $("duel-start");
  if (startBtn) startBtn.textContent = duelStarted ? t("restartVote") : t("startVote");
  setText("btn-my-card-preview", isRu ? "Предпросмотр" : "Алдын ала қарау");
  setText("btn-my-card-edit", isRu ? "Редактировать" : "Өңдеу");
  setText("footer-main", isRu ? "Конкурс организует Enactus IITU." : "Жарысты Enactus IITU ұйымдастырады.");
  setText("footer-sub", isRu ? "Сайт подготовлен Enactus IITU." : "Сайтты Enactus IITU дайындады.");
  setText("duel-result-title", t("finalChoiceTitle"));
  setText("duel-result-ok", t("ok"));
  const uploadLabel = $("btn-upload")?.querySelector(".btn__label");
  if (uploadLabel) uploadLabel.textContent = getUploadIdleLabel();
  const kzBtn = $("lang-kz");
  const ruBtn = $("lang-ru");
  kzBtn?.classList.toggle("lang-chip--active", currentLang === "kk");
  ruBtn?.classList.toggle("lang-chip--active", currentLang === "ru");
}

function setLanguage(lang) {
  currentLang = lang === "ru" ? "ru" : "kk";
  document.documentElement.lang = currentLang;
  try {
    localStorage.setItem(LS_LANG, currentLang);
  } catch {
    /* ignore */
  }
  applyLanguageStaticUi();
  refreshLucideIcons();
  syncMyCardCollapse(false);
  void refreshUI({ silent: true });
}

function wireLanguage() {
  try {
    const saved = localStorage.getItem(LS_LANG);
    if (saved === "ru" || saved === "kk") currentLang = saved;
  } catch {
    /* ignore */
  }
  $("lang-kz")?.addEventListener("click", () => setLanguage("kk"));
  $("lang-ru")?.addEventListener("click", () => setLanguage("ru"));
  applyLanguageStaticUi();
}

function closeDuelResult() {
  const root = $("duel-result");
  if (root) root.hidden = true;
}

function openDuelResultCard(row) {
  const root = $("duel-result");
  const img = $("duel-result-img");
  const name = $("duel-result-name");
  const cap = $("duel-result-caption");
  const title = $("duel-result-title");
  const okBtn = $("duel-result-ok");
  if (!root || !img || !name || !cap || !title || !okBtn) return;
  title.textContent = t("finalChoiceTitle");
  okBtn.textContent = t("ok");
  img.src = publicFileUrl(row.storage_path);
  img.alt = String(row.full_name || "winner");
  name.textContent = String(row.full_name || "");
  cap.textContent = String(row.caption_plain || "");
  cap.hidden = !cap.textContent.trim();
  root.hidden = false;
  refreshLucideIcons();
}

function wireDuelResult() {
  $("duel-result-close")?.addEventListener("click", closeDuelResult);
  $("duel-result-ok")?.addEventListener("click", closeDuelResult);
  $("duel-result")?.addEventListener("click", (ev) => {
    if (ev.target instanceof HTMLElement && ev.target.classList.contains("duel-result__backdrop")) {
      closeDuelResult();
    }
  });
}

function refreshLucideIcons() {
  const lib = globalThis.lucide;
  if (lib && typeof lib.createIcons === "function") {
    lib.createIcons();
  }
}

/** Карточка 4:5, жүктеу өлшемі */
const CARD_CROP_W = 1080;
const CARD_CROP_H = 1350;

/** Фото-қабат: алдын ала қарауда дауыс жоқ */
let sheetPreviewOnly = false;
let sheetChooseHandler = null;

/** Кесуден кейін жіберілетін файл */
let preparedUploadFile = null;

/** @type {string | null} */
let cropObjectUrl = null;

/** @type {HTMLImageElement | null} */
let cropImageEl = null;

/**
 * @type {{
 *   iw: number;
 *   ih: number;
 *   cx: number;
 *   cy: number;
 *   cw: number;
 *   ch: number;
 *   cvW: number;
 *   cvH: number;
 * } | null}
 */
let cropRectState = null;

/** Менің карточкам түймелері үшін */
let lastMySubmissionRow = null;

/** Әкімші суретті жойғанда көрсетілетін хабар */
const MSG_ADMIN_REMOVED =
  "Сіздің суретіңіз әкімші арқылы жойылды. Төменнен жаңа сурет жүктеңіз.";

const SHEET_MS = 380;

let replaceMode = false;
/** @type {Record<string, unknown> | null} */
let sheetRow = null;
let sheetZoomed = false;
/** Сәтті жүктеуден кейін success панелінде бір рет көрсетілетін хабар (форманы жасырғанда жоғалмас үшін) */
let pendingSubmitSuccessMsg = "";
/** reconcile немесе фондық тексеруден кейін формада бір рет көрсетіледі */
let pendingAdminRemovedMsg = "";

let previewObjectUrl = null;

const supabase = createClient ? createClient(_URL, _KEY) : null;

const $ = (id) => document.getElementById(id);

/** @type {((v: boolean) => void) | null} */
let dialogResolver = null;

function closeAppDialog(result) {
  const root = $("app-dialog");
  if (root) root.hidden = true;
  document.body.classList.remove("dialog-open");
  const r = dialogResolver;
  dialogResolver = null;
  if (r) r(result);
}

function wireAppDialog() {
  const root = $("app-dialog");
  $("app-dialog-ok")?.addEventListener("click", () => closeAppDialog(true));
  $("app-dialog-cancel")?.addEventListener("click", () => closeAppDialog(false));
  root?.querySelector(".app-dialog__backdrop")?.addEventListener("click", () => closeAppDialog(false));
  document.addEventListener("keydown", (ev) => {
    if (ev.key !== "Escape") return;
    if (root && !root.hidden) {
      ev.preventDefault();
      closeAppDialog(false);
    }
  });
}

function openAppDialog(opts) {
  return new Promise((resolve) => {
    dialogResolver = resolve;
    const t = $("app-dialog-title");
    const m = $("app-dialog-msg");
    const ok = $("app-dialog-ok");
    const cancel = $("app-dialog-cancel");
    if (t) t.textContent = opts.title || "";
    if (m) m.textContent = opts.message || "";
    if (ok) {
      ok.textContent = opts.okText || "Жақсы";
      ok.className = "btn btn--primary" + (opts.dangerOk ? " btn--ok-danger" : "");
    }
    if (cancel) {
      cancel.hidden = !opts.showCancel;
      cancel.textContent = opts.cancelText || "Бас тарту";
    }
    const box = $("app-dialog");
    if (box) box.hidden = false;
    document.body.classList.add("dialog-open");
    window.setTimeout(() => (opts.showCancel ? cancel : ok)?.focus(), 60);
  });
}

function showNotice(title, message) {
  return openAppDialog({ title, message, showCancel: false, okText: "Түсіндім" });
}

function showConfirm(title, message, okText, cancelText, dangerOk = true) {
  return openAppDialog({
    title,
    message,
    showCancel: true,
    okText: okText || (currentLang === "ru" ? "Да" : "Иә"),
    cancelText: cancelText || t("cancel"),
    dangerOk,
  });
}

function clearUploadFieldErrors() {
  const ne = $("name-err");
  const fe = $("file-err");
  const ge = $("gender-err");
  const ni = $("name-input");
  const gi = $("gender-input");
  const z = document.querySelector(".file-drop");
  if (ne) {
    ne.textContent = "";
    ne.hidden = true;
  }
  if (fe) {
    fe.textContent = "";
    fe.hidden = true;
  }
  if (ge) {
    ge.textContent = "";
    ge.hidden = true;
  }
  ni?.classList.remove("field--invalid");
  gi?.classList.remove("field--invalid");
  z?.classList.remove("file-drop--invalid");
}

function setNameError(text) {
  const ne = $("name-err");
  const ni = $("name-input");
  if (ne) {
    ne.textContent = text;
    ne.hidden = !text;
  }
  ni?.classList.toggle("field--invalid", !!text);
}

function setFileError(text) {
  const fe = $("file-err");
  const z = document.querySelector(".file-drop");
  if (fe) {
    fe.textContent = text;
    fe.hidden = !text;
  }
  z?.classList.toggle("file-drop--invalid", !!text);
}

function getUploadIdleLabel() {
  return replaceMode ? t("saveNewPhoto") : t("submit");
}

function setUploadLoading(btn, loading) {
  if (!btn) return;
  btn.classList.toggle("btn--loading", loading);
  btn.disabled = loading;
  btn.setAttribute("aria-busy", loading ? "true" : "false");
  const lab = btn.querySelector(".btn__label");
  if (lab) lab.textContent = loading ? t("loading") : getUploadIdleLabel();
}

function wireFormClearErrors() {
  $("name-input")?.addEventListener("input", () => {
    setNameError("");
    const msg = $("upload-msg");
    if (msg) {
      msg.textContent = "";
      msg.className = "form-msg";
    }
  });
  $("file-input")?.addEventListener("change", () => {
    setFileError("");
    const msg = $("upload-msg");
    if (msg) {
      msg.textContent = "";
      msg.className = "form-msg";
    }
    const f = $("file-input")?.files?.[0];
    handleUploadFileSelected(f ?? null);
  });
  $("gender-input")?.addEventListener("change", () => setGenderError(""));
}

function getOrCreateDeviceId() {
  try {
    let id = localStorage.getItem(LS_DEVICE);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(LS_DEVICE, id);
    }
    return id;
  } catch {
    return `ephemeral-${crypto.randomUUID()}`;
  }
}

function canvasFp() {
  try {
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    if (!ctx) return "no-canvas";
    c.width = 220;
    c.height = 50;
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(0, 0, 80, 50);
    ctx.fillStyle = "#f472b6";
    ctx.fillText("fp", 10, 20);
    return c.toDataURL();
  } catch {
    return "canvas-blocked";
  }
}

async function sha256Hex(s) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function participantKey() {
  const device = getOrCreateDeviceId();
  const raw = [
    device,
    navigator.userAgent,
    navigator.language,
    String(screen.width),
    String(screen.height),
    String(screen.colorDepth),
    Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    canvasFp(),
  ].join("|");
  return sha256Hex(raw);
}

function publicFileUrl(path) {
  const base = _URL.replace(/\/$/, "");
  return `${base}/storage/v1/object/public/photos/${path}`;
}

/** @param {unknown} data */
function normalizeRpcJson(data) {
  if (data == null) return null;
  if (Array.isArray(data)) {
    if (data.length === 0) return null;
    return normalizeRpcJson(data[0]);
  }
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  if (typeof data === "object") return /** @type {Record<string, unknown>} */ (data);
  return null;
}

/**
 * get_my_submission нәтижесін бөлшектеу (jsonb / string / массив түрлері үшін).
 * @returns {Promise<
 *   | { kind: "ok"; row: Record<string, unknown> }
 *   | { kind: "app_error"; code: string }
 *   | { kind: "rpc_error"; error: unknown }
 *   | { kind: "bad_data" }
 * >}
 */
async function fetchMySubmissionRow() {
  const key = await participantKey();
  const { data, error } = await supabase.rpc("get_my_submission", { p_submitter_key: key });
  if (error) return { kind: "rpc_error", error };

  const row = normalizeRpcJson(data);
  if (!row || typeof row !== "object") return { kind: "bad_data" };

  if ("error" in row && row.error != null && String(row.error) !== "") {
    return { kind: "app_error", code: String(row.error) };
  }
  if ("full_name" in row) {
    return { kind: "ok", row };
  }
  return { kind: "bad_data" };
}

/** localStorage «жіберілді» белгісі бар, бірақ серверде жол жоқ (әкімші жойған) */
async function reconcileLocalUploadWithServer(contest) {
  if (!submissionOpen(contest)) return;
  let marked = false;
  try {
    marked = localStorage.getItem(LS_UPLOAD) === "1";
  } catch {
    return;
  }
  if (!marked) return;

  const res = await fetchMySubmissionRow();
  if (res.kind === "rpc_error" || res.kind === "bad_data") return;

  if (res.kind === "app_error" && res.code === "not_found") {
    try {
      localStorage.removeItem(LS_UPLOAD);
    } catch {
      /* ignore */
    }
    replaceMode = false;
    pendingAdminRemovedMsg = MSG_ADMIN_REMOVED;
  }
}

function rpcClientError(code) {
  const map = {
    submission_closed: "Сурет жіберу уақыты өтті — ауыстыру мүмкін емес.",
    no_submission: "Бұл құрылғыда өтініш жоқ.",
    name_required: "Аты-жөніңізді жазыңыз.",
    bad_key: "Қате сұрау.",
    bad_path: "Файл жолы қате.",
  };
  return map[code] || String(code);
}

function setPhotoSheetOpen(open) {
  const root = $("photo-sheet");
  const wrap = $("photo-sheet-img-wrap");
  if (!root) return;
  if (open) {
    sheetZoomed = false;
    wrap?.classList.remove("is-zoomed");
    root.hidden = false;
    if (!root.classList.contains("photo-sheet--open")) {
      root.classList.remove("photo-sheet--open");
      void root.offsetWidth;
      requestAnimationFrame(() => root.classList.add("photo-sheet--open"));
    }
    document.body.classList.add("photo-sheet-open");
  } else {
    root.classList.remove("photo-sheet--open");
    window.setTimeout(() => {
      root.hidden = true;
      document.body.classList.remove("photo-sheet-open");
      sheetRow = null;
      sheetPreviewOnly = false;
      sheetChooseHandler = null;
      sheetZoomed = false;
      wrap?.classList.remove("is-zoomed");
    }, SHEET_MS);
  }
}

function togglePhotoSheetZoom() {
  const wrap = $("photo-sheet-img-wrap");
  if (!wrap) return;
  sheetZoomed = !sheetZoomed;
  wrap.classList.toggle("is-zoomed", sheetZoomed);
}

function syncPhotoSheetVoteUi() {
  const btn = $("photo-sheet-vote");
  const votes = $("photo-sheet-votes");
  if (!btn || !sheetRow) return;

  if (sheetChooseHandler) {
    btn.hidden = false;
    btn.disabled = false;
    btn.textContent = t("chooseBtn");
    if (votes) votes.hidden = true;
    return;
  }

  if (sheetPreviewOnly) {
    btn.hidden = true;
    if (votes) votes.hidden = true;
    return;
  }
  btn.hidden = false;
  if (votes) votes.hidden = false;

  let voted = null;
  try {
    voted = localStorage.getItem(LS_VOTE);
  } catch {
    /* ignore */
  }
  const id = String(sheetRow.photo_id);
  const isMine = !!sheetRow.is_mine;

  if (isMine) {
    btn.disabled = true;
    btn.textContent = t("ownPhoto");
    return;
  }

  if (voted === id) {
    btn.disabled = true;
    btn.textContent = t("yourChoice");
    return;
  }

  if (voted) {
    btn.disabled = false;
    btn.textContent = t("voteChange");
    return;
  }

  btn.disabled = false;
  btn.textContent = t("voteBtn");
}

/**
 * @param {Record<string, unknown>} row
 * @param {{ previewOnly?: boolean; onChoose?: (() => void) | null }} [opts]
 */
function openPhotoSheet(row, opts = {}) {
  sheetRow = { ...row };
  sheetPreviewOnly = !!opts.previewOnly;
  sheetChooseHandler = typeof opts.onChoose === "function" ? opts.onChoose : null;
  const img = $("photo-sheet-img");
  const name = $("photo-sheet-name");
  const cap = $("photo-sheet-caption");
  const votes = $("photo-sheet-votes");
  if (!img || !name || !votes) return;

  img.src = publicFileUrl(row.storage_path);
  img.alt = row.full_name || "Сурет";
  name.textContent = row.full_name || "Қатысушы";
  const c = row.caption_plain != null ? String(row.caption_plain) : parseCaptionMeta(row.caption).caption;
  if (cap) {
    cap.textContent = c;
    cap.hidden = !c;
  }
  const vc = typeof row.vote_count === "string" ? Number(row.vote_count) : Number(row.vote_count) || 0;
  votes.textContent = `${vc} дауыс`;
  syncPhotoSheetVoteUi();
  setPhotoSheetOpen(true);
}

function closePhotoSheet() {
  setPhotoSheetOpen(false);
}

async function fetchContest() {
  if (!supabase) throw new Error("Supabase жүктелмеді.");
  const { data, error } = await supabase.from("contest_settings").select("phase, submission_deadline").eq("id", 1).single();
  if (error) throw error;
  return data;
}

function submissionOpen(row) {
  if (!row || row.phase !== "submission") return false;
  if (!row.submission_deadline) return true;
  return new Date(row.submission_deadline).getTime() > Date.now();
}

function votingOpen(row) {
  return row?.phase === "voting";
}

function formatDeadlineShort(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString(currentLang === "ru" ? "ru-RU" : "kk-KZ", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return "";
  }
}

function setPhaseBadge(row) {
  const el = $("phase-badge");
  if (!el) return;
  if (votingOpen(row)) {
    el.textContent = t("voteOpen");
    el.className = "status-pill status-pill--vote";
  } else if (submissionOpen(row)) {
    el.textContent = t("submitOpen");
    el.className = "status-pill status-pill--sub";
  } else {
    el.textContent = t("paused");
    el.className = "status-pill status-pill--closed";
  }
}

/** @type {ReturnType<typeof setInterval> | null} */
let countdownTimer = null;

function clearCountdownTimer() {
  if (countdownTimer != null) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
}

function pad2(n) {
  return String(Math.max(0, Math.floor(n))).padStart(2, "0");
}

function syncCountdownFromContest(row) {
  clearCountdownTimer();
  const block = $("hero-countdown-block");
  const hint = $("stat-deadline-hint");
  const title = $("countdown-title");
  if (!block) return;

  const iso = row?.submission_deadline;
  if (!iso) {
    block.hidden = true;
    if (hint) hint.textContent = "";
    return;
  }
  block.hidden = false;
  if (title) {
    title.textContent = t("until");
  }
  if (hint) {
    const line = formatDeadlineShort(iso);
    hint.textContent = line;
    hint.hidden = !line;
  }

  const dEl = $("cd-d");
  const hEl = $("cd-h");
  const mEl = $("cd-m");
  const sEl = $("cd-s");
  const tick = () => {
    const end = new Date(iso).getTime();
    const t = end - Date.now();
    if (t <= 0) {
      if (dEl) dEl.textContent = "0";
      if (hEl) hEl.textContent = "00";
      if (mEl) mEl.textContent = "00";
      if (sEl) sEl.textContent = "00";
      clearCountdownTimer();
      void refreshUI({ silent: true });
      return;
    }
    const total = Math.floor(t / 1000);
    const days = Math.floor(total / 86400);
    const h = Math.floor((total % 86400) / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    if (dEl) dEl.textContent = String(Math.min(9999, days));
    if (hEl) hEl.textContent = pad2(h);
    if (mEl) mEl.textContent = pad2(m);
    if (sEl) sEl.textContent = pad2(s);
  };
  tick();
  countdownTimer = setInterval(tick, 1000);
}

function updateHeroStats(row) {
  const ph = $("stat-phase");
  if (ph) {
    if (votingOpen(row)) ph.textContent = t("votePhase");
    else if (submissionOpen(row)) ph.textContent = t("submitPhase");
    else ph.textContent = t("paused");
  }
  syncCountdownFromContest(row);
}

/**
 * @param {{ silent?: boolean }} [opts] silent — желілік қатеде попап шығармайды (polling т.б.)
 */
async function renderGallery(opts = {}) {
  if (!supabase) return;
  const sec = $("section-voting");
  const list = $("gallery");
  const board = $("duel-board");
  const emptyEl = $("gallery-empty");
  const stateEl = $("duel-state");
  const startBtn = $("duel-start");
  if (!sec || !list || !board || !emptyEl || !startBtn) return;

  const viewerKey = await participantKey();
  const { data, error } = await supabase.rpc("list_gallery_with_counts", { p_viewer_key: viewerKey });
  if (error) {
    if (!opts.silent) {
      sec.hidden = false;
      list.innerHTML = "";
      void showNotice(I18N[currentLang].noticeTitle, error.message);
    }
    return;
  }

  const rows = (data ?? []).map((r) => {
    const meta = parseCaptionMeta(r.caption);
    return { ...r, gender: meta.gender, caption_plain: meta.caption };
  });
  galleryNameById.clear();
  for (const r of rows) {
    galleryNameById.set(String(r.photo_id), String(r.full_name || "Қатысушы"));
  }
  duelRows = rows.filter((r) => r.gender === currentDuelGender && !r.is_mine);
  if (!duelFinalChoice) {
    let voted = null;
    try {
      voted = localStorage.getItem(LS_VOTE);
    } catch {
      /* ignore */
    }
    if (voted) {
      const found = rows.find((r) => String(r.photo_id) === String(voted) && r.gender === currentDuelGender);
      if (found) duelFinalChoice = found;
    }
  }
  startBtn.textContent = duelStarted ? t("restartVote") : t("startVote");
  startBtn.hidden = duelStarted;

  if (duelRows.length < 2) {
    board.classList.remove("duel-board--winner");
    board.innerHTML = "";
    emptyEl.hidden = false;
    startBtn.disabled = true;
    startBtn.hidden = false;
    if (stateEl) stateEl.textContent = t("duelEmpty");
    duelStarted = false;
    duelQueue = [];
    duelChampion = null;
    duelOpponent = null;
    return;
  }

  startBtn.disabled = false;
  emptyEl.hidden = true;
  if (duelFinalChoice && !duelStarted) {
    board.classList.add("duel-board--winner");
    board.innerHTML = "";
    const finalCard = document.createElement("article");
    finalCard.className = "duel-card duel-card--winner";
    const img = document.createElement("img");
    img.className = "duel-card__img";
    img.src = publicFileUrl(duelFinalChoice.storage_path);
    img.alt = String(duelFinalChoice.full_name || "winner");
    const body = document.createElement("div");
    body.className = "duel-card__body";
    const title = document.createElement("h3");
    title.className = "duel-card__name";
    title.textContent = String(duelFinalChoice.full_name || "");
    const cap = document.createElement("p");
    cap.className = "duel-card__caption";
    cap.textContent = String(duelFinalChoice.caption_plain || t("noCaption"));
    body.appendChild(title);
    body.appendChild(cap);
    finalCard.appendChild(img);
    finalCard.appendChild(body);
    board.appendChild(finalCard);
    if (stateEl) stateEl.textContent = t("finalChoiceTitle");
    startBtn.textContent = t("restartVote");
    startBtn.hidden = false;
    return;
  }
  board.classList.remove("duel-board--winner");

  if (duelIntroActive) {
    board.innerHTML = `<div class="duel-intro"><p class="duel-intro__text">${t("duelStartedIntro")}</p></div>`;
    if (stateEl) stateEl.textContent = t("duelStartedIntro");
    return;
  }

  if (!duelStarted) {
    board.innerHTML = `<div class="duel-placeholder"><p class="duel-placeholder__title">${t("duelReady")}</p><p class="duel-placeholder__hint">${t(
      "duelHint"
    )}</p></div>`;
    if (stateEl) stateEl.textContent = t("duelPick");
    return;
  }
  const idSet = new Set(duelRows.map((r) => String(r.photo_id)));
  if (!duelChampion || !idSet.has(String(duelChampion.photo_id)) || !duelOpponent || !idSet.has(String(duelOpponent.photo_id))) {
    duelStarted = false;
    duelQueue = [];
    board.innerHTML = "";
    if (stateEl) stateEl.textContent = t("duelPick");
    startBtn.textContent = t("startVote");
    return;
  }

  const renderDuelCard = (r) => {
    const card = document.createElement("article");
    card.className = "duel-card";
    const chooseBtn = document.createElement("button");
    chooseBtn.type = "button";
    chooseBtn.className = "duel-card__preview";
    chooseBtn.textContent = t("chooseBtn");
    const img = document.createElement("img");
    img.className = "duel-card__img";
    img.src = publicFileUrl(r.storage_path);
    img.alt = String(r.full_name || "Қатысушы");
    const body = document.createElement("div");
    body.className = "duel-card__body";
    const title = document.createElement("h3");
    title.className = "duel-card__name";
    title.textContent = String(r.full_name || "Қатысушы");
    const cap = document.createElement("p");
    cap.className = "duel-card__caption";
    cap.textContent = String(r.caption_plain || t("noCaption"));
    body.appendChild(title);
    body.appendChild(cap);
    card.appendChild(chooseBtn);
    card.appendChild(img);
    card.appendChild(body);
    return { card, chooseBtn };
  };

  board.innerHTML = "";
  const left = renderDuelCard(duelChampion);
  const right = renderDuelCard(duelOpponent);
  const vs = document.createElement("div");
  vs.className = "duel-vs";
  vs.textContent = "VS";

  const pickWinner = async (winner) => {
    if (duelQueue.length === 0) {
      const ok = await castVote(String(winner.photo_id), startBtn);
      if (!ok) return;
      duelFinalChoice = winner;
      openDuelResultCard(winner);
      duelStarted = false;
      duelChampion = null;
      duelOpponent = null;
      if (stateEl) stateEl.textContent = t("duelDone");
      await renderGallery({ silent: true });
      return;
    }
    duelChampion = winner;
    duelOpponent = duelQueue.shift() || null;
    await renderGallery({ silent: true });
  };
  left.card.addEventListener("click", () =>
    openPhotoSheet(duelChampion, { previewOnly: true, onChoose: () => void pickWinner(duelChampion) })
  );
  right.card.addEventListener("click", () =>
    openPhotoSheet(duelOpponent, { previewOnly: true, onChoose: () => void pickWinner(duelOpponent) })
  );
  left.chooseBtn.addEventListener("click", (ev) => {
    ev.stopPropagation();
    void pickWinner(duelChampion);
  });
  right.chooseBtn.addEventListener("click", (ev) => {
    ev.stopPropagation();
    void pickWinner(duelOpponent);
  });

  board.appendChild(left.card);
  board.appendChild(vs);
  board.appendChild(right.card);
  if (stateEl) {
    stateEl.textContent = `${t("duelCategory")}: ${currentDuelGender === "female" ? t("girls") : t("boys")} · ${t("duelPick")}`;
  }
}

async function castVote(photoId, btn) {
  let prev = null;
  try {
    prev = localStorage.getItem(LS_VOTE);
  } catch {
    /* ignore */
  }
  const toName = galleryNameById.get(photoId) || "жаңа қатысушы";
  if (prev && prev !== photoId) {
    const fromName = galleryNameById.get(prev) || "алдыңғы қатысушы";
    const ok = await showConfirm(
      t("voteChangeTitle"),
      `Дауысыңызды «${fromName}» қатысушысынан алып, «${toName}» қатысушысына бергіңіз келе ме?`,
      "Иә",
      "Бас тарту",
      true
    );
    if (!ok) return;
  }

  try {
    btn.disabled = true;
    const voterKey = await participantKey();
    const { data, error } = await supabase.rpc("submit_vote", {
      p_voter_key: voterKey,
      p_photo_id: photoId,
    });
    if (error) throw error;
    if (data && typeof data === "object" && "error" in data && data.error) {
      const code = String(data.error);
      const map = {
        own_photo: "Өз суретіңізге дауыс бере алмайсыз.",
        voting_closed: "Дауыс беру қазір жабық.",
        bad_key: "Қате сұрау.",
        bad_photo: "Фото таңдалмаған.",
        not_found: "Сурет табылмады.",
      };
      throw new Error(map[code] || code);
    }
    try {
      localStorage.setItem(LS_VOTE, photoId);
    } catch {
      /* ignore */
    }
    if (sheetRow && !sheetPreviewOnly) {
      const sid = String(sheetRow.photo_id);
      let vc = Number(sheetRow.vote_count) || 0;
      if (prev && prev !== photoId) {
        if (sid === prev) vc -= 1;
        if (sid === photoId) vc += 1;
      } else if (!prev) {
        if (sid === photoId) vc += 1;
      }
      sheetRow = { ...sheetRow, vote_count: vc };
      const ve = $("photo-sheet-votes");
      if (ve) ve.textContent = `${vc} дауыс`;
    }
    syncPhotoSheetVoteUi();
    await renderGallery({ silent: true });
    return true;
  } catch (e) {
    void showNotice(currentLang === "ru" ? "Голос не отправлен" : "Дауыс берілмеді", e instanceof Error ? e.message : "Ошибка");
    syncPhotoSheetVoteUi();
    btn.disabled = false;
    return false;
  }
}

/**
 * @param {{ phase: string; submission_deadline?: string | null }} contest
 */
async function updateMyCardSection(contest) {
  const sec = $("section-my-card");
  const slot = $("my-card-slot");
  const btnEdit = $("btn-my-card-edit");
  const collapsible = $("my-card-collapsible");
  if (!sec || !slot || !supabase || !collapsible) return;

  const res = await fetchMySubmissionRow();
  if (res.kind !== "ok" || res.row.photo_id == null) {
    lastMySubmissionRow = null;
    sec.hidden = true;
    slot.innerHTML = "";
    myCardExpanded = false;
    syncMyCardCollapse(false);
    return;
  }

  lastMySubmissionRow = res.row;
  sec.hidden = false;
  const row = res.row;
  const pid = String(row.photo_id);
  const dispName = String(row.full_name || "Қатысушы");
  const meta = parseCaptionMeta(row.caption);
  const cap = String(meta.caption || "").trim();
  const gi = $("gender-input");
  if (gi && !gi.value) gi.value = meta.gender === "female" ? "female" : "male";
  const vcRaw = row.vote_count;
  const vc = typeof vcRaw === "string" ? Number(vcRaw) : Number(vcRaw) || 0;

  slot.innerHTML = "";
  const li = document.createElement("article");
  li.className = "gallery__item gallery__item--mine";
  li.setAttribute("role", "presentation");

  const wrap = document.createElement("div");
  wrap.className = "gallery__img-wrap";
  const badge = document.createElement("span");
  badge.className = "gallery__mine-badge";
  badge.textContent = t("myPhotoBadge");
  const img = document.createElement("img");
  img.className = "gallery__img";
  img.src = publicFileUrl(String(row.storage_path));
  img.alt = dispName;
  wrap.appendChild(badge);
  wrap.appendChild(img);

  const body = document.createElement("div");
  body.className = "gallery__body";
  const h3 = document.createElement("h3");
  h3.className = "gallery__name";
  h3.textContent = dispName;
  body.appendChild(h3);
  if (cap) {
    const p = document.createElement("p");
    p.className = "gallery__caption";
    p.textContent = cap;
    body.appendChild(p);
  }
  const rowEl = document.createElement("div");
  rowEl.className = "gallery__row";
  const votes = document.createElement("span");
  votes.className = "gallery__votes";
  votes.textContent = votingOpen(contest) ? `${vc} дауыс` : t("voteCountHint");
  rowEl.appendChild(votes);
  body.appendChild(rowEl);

  li.appendChild(wrap);
  li.appendChild(body);
  slot.appendChild(li);

  if (btnEdit) {
    btnEdit.hidden = !submissionOpen(contest);
  }
  syncMyCardCollapse(false);
}

function wireMyCardActions() {
  window.addEventListener("resize", () => {
    if (myCardExpanded) syncMyCardCollapse(false);
  });

  $("btn-my-card-toggle")?.addEventListener("click", () => {
    myCardExpanded = !myCardExpanded;
    syncMyCardCollapse(true);
  });

  $("btn-my-card-preview")?.addEventListener("click", () => {
    const row = lastMySubmissionRow;
    if (!row || row.photo_id == null) return;
    const vcRaw = row.vote_count;
    const vc = typeof vcRaw === "string" ? Number(vcRaw) : Number(vcRaw) || 0;
    openPhotoSheet(
      {
        photo_id: row.photo_id,
        storage_path: row.storage_path,
        full_name: row.full_name,
        caption: row.caption,
        vote_count: vc,
        is_mine: true,
      },
      { previewOnly: true }
    );
  });
  $("btn-my-card-edit")?.addEventListener("click", () => {
    if (!myCardExpanded) {
      myCardExpanded = true;
      syncMyCardCollapse(true);
    }
    $("section-submit")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      $("btn-replace-photo")?.click();
    }, 400);
  });
}

async function renderSubmit(contest) {
  const sec = $("section-submit");
  const form = $("form-upload");
  const closed = $("submit-closed");
  const success = $("submit-success");
  const cancelWrap = $("replace-cancel-wrap");
  const submitBtn = $("btn-upload");
  const submitLab = submitBtn?.querySelector(".btn__label");

  if (!sec || !form || !closed) return;

  const open = submissionOpen(contest);
  const voting = votingOpen(contest);
  if (voting) {
    sec.hidden = true;
    if (cancelWrap) cancelWrap.hidden = true;
    return;
  }
  sec.hidden = false;

  const uploaded = (() => {
    try {
      return localStorage.getItem(LS_UPLOAD) === "1";
    } catch {
      return false;
    }
  })();

  closed.hidden = true;

  if (!open) {
    if (success) success.hidden = true;
    form.hidden = true;
    closed.hidden = false;
    if (cancelWrap) cancelWrap.hidden = true;
    replaceMode = false;
    return;
  }

  if (uploaded && !replaceMode) {
    if (success) success.hidden = false;
    form.hidden = true;
    if (cancelWrap) cancelWrap.hidden = true;
    if (submitLab) submitLab.textContent = t("submit");
    const det = $("submit-success-detail");
    if (det) {
      if (pendingSubmitSuccessMsg) {
        det.textContent = pendingSubmitSuccessMsg;
        det.hidden = false;
        pendingSubmitSuccessMsg = "";
      } else {
        det.textContent = "";
        det.hidden = true;
      }
    }
  } else {
    if (success) success.hidden = true;
    form.hidden = false;
    if (cancelWrap) cancelWrap.hidden = !replaceMode;
    if (submitLab) submitLab.textContent = getUploadIdleLabel();
  }

  const ban = $("form-revoked-banner");
  const formShown = !form.hidden;
  if (ban) {
    if (formShown && pendingAdminRemovedMsg) {
      ban.textContent = pendingAdminRemovedMsg;
      ban.hidden = false;
      pendingAdminRemovedMsg = "";
    } else {
      ban.hidden = true;
      ban.textContent = "";
    }
  }
}

/**
 * @param {{ skipGallery?: boolean; silent?: boolean; contest?: { phase: string; submission_deadline: string | null } }} [opts]
 */
async function refreshUI(opts = {}) {
  if (!supabase) return;
  let contest = opts.contest;
  if (!contest) {
    try {
      contest = await fetchContest();
    } catch (e) {
      if (!opts.silent) {
        void showNotice(
          currentLang === "ru" ? "Ошибка связи" : "Байланыс қатесі",
          (e instanceof Error ? e.message : currentLang === "ru" ? "Не удается подключиться к серверу." : "Серверге қосылу мүмкін емес.") +
            (currentLang === "ru" ? " Проверьте API ключ." : " API кілтін тексеріңіз.")
        );
      }
      const ph = $("stat-phase");
      if (ph) {
        ph.textContent = "—";
        const badge = $("phase-badge");
        if (badge) badge.className = "status-pill status-pill--wait";
      }
      clearCountdownTimer();
      const block = $("hero-countdown-block");
      if (block) block.hidden = true;
      return;
    }
  }

  setPhaseBadge(contest);
  updateHeroStats(contest);

  const voting = votingOpen(contest);
  $("section-voting").hidden = !voting;
  document.body.classList.toggle("vote-focus", voting);
  if (voting && !opts.skipGallery) {
    await renderGallery({ silent: opts.silent });
  }

  await reconcileLocalUploadWithServer(contest);
  await renderSubmit(contest);
  await updateMyCardSection(contest);
}

/** Админ */
function adminPin() {
  return ($("admin-pin")?.value || "").trim();
}

async function adminRpc(action, payload = {}) {
  const pin = adminPin();
  const { data, error } = await supabase.rpc("admin_rpc", {
    p_pin: pin,
    p_action: action,
    p_payload: payload,
  });
  if (error) throw error;
  if (data?.error === "invalid_pin") throw new Error("Неверный PIN");
  if (data?.error === "pin_required") throw new Error("Введите PIN и нажмите «Войти».");
  if (data?.error) throw new Error(String(data.error));
  return data;
}

function setAdminMsg(t, ok) {
  const el = $("admin-msg");
  if (!el) return;
  el.textContent = t || "";
  el.className = "form-msg " + (ok ? "form-msg--ok" : "form-msg--err");
}

function buildAdminEntry(p) {
  const parsed = parseCaptionMeta(p.caption);
  const article = document.createElement("article");
  article.className = "admin-entry";
  article.dataset.id = p.id;

  const thumb = document.createElement("img");
  thumb.className = "admin-entry__thumb";
  thumb.src = publicFileUrl(p.storage_path);
  thumb.alt = "";

  const fields = document.createElement("div");
  fields.className = "admin-entry__fields";

  const lblName = document.createElement("label");
  lblName.className = "field";
  const ln = document.createElement("span");
  ln.className = "field__label";
  ln.textContent = "ФИО";
  const inName = document.createElement("input");
  inName.type = "text";
  inName.className = "field__input admin-in-name";
  inName.value = p.full_name || "";
  inName.maxLength = 120;
  lblName.appendChild(ln);
  lblName.appendChild(inName);

  const lblCap = document.createElement("label");
  lblCap.className = "field";
  const lc = document.createElement("span");
  lc.className = "field__label";
  lc.textContent = "Описание";
  const inCap = document.createElement("input");
  inCap.type = "text";
  inCap.className = "field__input admin-in-caption";
  inCap.value = parsed.caption || "";
  inCap.maxLength = 160;
  lblCap.appendChild(lc);
  lblCap.appendChild(inCap);
  const capDetails = document.createElement("details");
  capDetails.className = "admin-cap-details";
  const capSummary = document.createElement("summary");
  capSummary.className = "admin-cap-summary";
  capSummary.textContent = "Описание";
  capDetails.appendChild(capSummary);
  capDetails.appendChild(lblCap);

  const lblGender = document.createElement("label");
  lblGender.className = "field";
  const lg = document.createElement("span");
  lg.className = "field__label";
  lg.textContent = "Категория";
  const inGender = document.createElement("select");
  inGender.className = "field__input admin-in-gender";
  inGender.innerHTML =
    '<option value="male">Парни</option><option value="female">Девушки</option>';
  inGender.value = parsed.gender === "female" ? "female" : "male";
  lblGender.appendChild(lg);
  lblGender.appendChild(inGender);

  const actions = document.createElement("div");
  actions.className = "admin-entry__actions";

  const btnSave = document.createElement("button");
  btnSave.type = "button";
  btnSave.className = "btn btn--secondary";
  btnSave.textContent = "Сохранить";

  const btnDel = document.createElement("button");
  btnDel.type = "button";
  btnDel.className = "btn btn--danger";
  btnDel.textContent = "Удалить";

  btnSave.addEventListener("click", () => void adminSaveOne(p.id, article, btnSave));
  btnDel.addEventListener("click", () => void adminDeleteOne(p.id, article));

  actions.appendChild(btnSave);
  actions.appendChild(btnDel);

  fields.appendChild(lblName);
  fields.appendChild(lblGender);
  fields.appendChild(capDetails);
  fields.appendChild(actions);

  article.appendChild(thumb);
  article.appendChild(fields);
  return article;
}

async function adminSaveOne(id, article, btn) {
  const nameIn = article.querySelector(".admin-in-name");
  const capIn = article.querySelector(".admin-in-caption");
  const genderIn = article.querySelector(".admin-in-gender");
  const full_name = (nameIn?.value || "").trim();
  if (!full_name) {
    void showNotice("Поле не заполнено", "Введите ФИО.");
    return;
  }
  setAdminMsg("", true);
  btn.disabled = true;
  try {
    await adminRpc("update_photo", {
      id,
      full_name,
      caption: packCaptionMeta(genderIn?.value, capIn?.value ?? ""),
    });
    setAdminMsg("Сохранено.", true);
  } catch (e) {
    setAdminMsg(e instanceof Error ? e.message : "Ошибка", false);
  } finally {
    btn.disabled = false;
  }
}

async function adminDeleteOne(id, article) {
  const ok = await showConfirm("Удаление", "Эта заявка и голоса по ней будут удалены. Подтвердить?", "Удалить", "Отмена", true);
  if (!ok) return;
  setAdminMsg("", true);
  try {
    await adminRpc("delete_photo", { id });
    article.remove();
    setAdminMsg("Удалено.", true);
    await refreshUI();
  } catch (e) {
    setAdminMsg(e instanceof Error ? e.message : "Ошибка", false);
  }
}

async function adminLoad() {
  setAdminMsg("", true);
  try {
    const rawPhotos = await adminRpc("list_photos", {});
    const photos = Array.isArray(rawPhotos) ? rawPhotos : [];
    const box = $("admin-photos");
    if (!box) return;
    box.innerHTML = "";
    for (const p of photos) {
      box.appendChild(buildAdminEntry(p));
    }
    await syncAdminPhaseRadios();
    await syncAdminDeadlineField();
    setAdminMsg(photos.length ? `Загружено: ${photos.length} заявок` : "Список пуст.", true);
  } catch (e) {
    setAdminMsg(e instanceof Error ? e.message : "Ошибка", false);
  }
}

function isoToDatetimeLocalValue(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  } catch {
    return "";
  }
}

async function syncAdminDeadlineField() {
  const input = $("admin-deadline");
  if (!input || !supabase) return;
  try {
    const row = await fetchContest();
    input.value = isoToDatetimeLocalValue(row.submission_deadline);
  } catch {
    input.value = "";
  }
}

async function adminSaveDeadline() {
  setAdminMsg("", true);
  try {
    const input = $("admin-deadline");
    const raw = (input?.value || "").trim();
    const iso = raw ? new Date(raw).toISOString() : "";
    await adminRpc("set_deadline", { iso });
    const row = await fetchContest();
    setAdminPhaseRadios(row.phase);
    if (input) input.value = isoToDatetimeLocalValue(row.submission_deadline);
    await refreshUI({ contest: row, skipGallery: !votingOpen(row) });
    setAdminMsg("Дедлайн сохранен.", true);
  } catch (e) {
    setAdminMsg(e instanceof Error ? e.message : "Ошибка", false);
  }
}

let adminPhaseProgrammatic = false;
let adminPhaseSaving = false;

function setAdminPhaseRadios(phase) {
  const sub = $("admin-phase-sub");
  const vote = $("admin-phase-vote");
  if (!sub || !vote) return;
  adminPhaseProgrammatic = true;
  if (phase === "voting") {
    vote.checked = true;
  } else {
    sub.checked = true;
  }
  adminPhaseProgrammatic = false;
}

async function syncAdminPhaseRadios() {
  try {
    const row = await fetchContest();
    setAdminPhaseRadios(row.phase);
  } catch {
    /* ignore */
  }
}

async function adminSetPhase(phase) {
  if (adminPhaseSaving) return;
  adminPhaseSaving = true;
  setAdminMsg("", true);
  try {
    const prev = await fetchContest();
    await adminRpc("set_phase", { phase });
    if (prev.phase === "submission" && phase === "voting") {
      try {
        await adminRpc("reset_votes", {});
      } catch {
        // Fallback: some backends reset votes inside set_phase
      }
      try {
        localStorage.removeItem(LS_VOTE);
      } catch {
        /* ignore */
      }
    }
    const row = await fetchContest();
    setAdminPhaseRadios(row.phase);
    await refreshUI({ contest: row, skipGallery: !votingOpen(row) });
    setAdminMsg("Этап сохранен.", true);
  } catch (e) {
    setAdminMsg(e instanceof Error ? e.message : "Ошибка", false);
    await syncAdminPhaseRadios();
  } finally {
    adminPhaseSaving = false;
  }
}

async function adminReset() {
  if (!adminPin()) {
    setAdminMsg("Введите PIN и нажмите «Войти».", false);
    return;
  }
  const ok = await showConfirm(
    "Полная очистка",
    "Все голоса, фото и заявки будут удалены. Подтвердить?",
    "Да, очистить",
    "Нет",
    true
  );
  if (!ok) return;
  try {
    await adminRpc("reset", {});
    try {
      localStorage.removeItem(LS_UPLOAD);
      localStorage.removeItem(LS_VOTE);
    } catch {
      /* ignore */
    }
    await adminLoad();
    await refreshUI();
    setAdminMsg("Очищено.", true);
  } catch (e) {
    setAdminMsg(e instanceof Error ? e.message : "Ошибка", false);
  }
}

function wireAdmin() {
  const overlay = $("admin-overlay");
  const trigger = $("admin-trigger");
  const close = $("admin-close");

  trigger?.addEventListener("click", () => {
    overlay.hidden = false;
    document.body.classList.add("admin-sheet-open");
    void syncAdminPhaseRadios();
    void syncAdminDeadlineField();
  });
  close?.addEventListener("click", () => {
    overlay.hidden = true;
    document.body.classList.remove("admin-sheet-open");
  });
  overlay?.addEventListener("click", (ev) => {
    if (ev.target === overlay || ev.target.classList?.contains("overlay__backdrop")) {
      overlay.hidden = true;
      document.body.classList.remove("admin-sheet-open");
    }
  });

  $("admin-load")?.addEventListener("click", () => void adminLoad());
  document.querySelectorAll('input[name="admin-phase"]').forEach((input) => {
    input.addEventListener("change", () => {
      if (adminPhaseProgrammatic) return;
      const el = input;
      if (el instanceof HTMLInputElement && el.checked) {
        void adminSetPhase(el.value);
      }
    });
  });
  $("admin-save-deadline")?.addEventListener("click", () => void adminSaveDeadline());
  $("admin-reset")?.addEventListener("click", () => void adminReset());
}

function disposeCropSource() {
  if (cropObjectUrl) {
    URL.revokeObjectURL(cropObjectUrl);
    cropObjectUrl = null;
  }
  cropImageEl = null;
  cropRectState = null;
}

function clearFilePreview() {
  const wrap = $("file-preview-wrap");
  const img = $("file-preview-img");
  const cropPanel = $("crop-panel");
  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = null;
  }
  if (img) img.removeAttribute("src");
  if (wrap) wrap.hidden = true;
  if (cropPanel) cropPanel.hidden = true;
  preparedUploadFile = null;
  disposeCropSource();
}

function initCropRect(iw, ih) {
  const ar = CARD_CROP_W / CARD_CROP_H;
  let cw;
  let ch;
  if (iw / ih > ar) {
    ch = ih;
    cw = Math.round(ch * ar);
  } else {
    cw = iw;
    ch = Math.round(cw / ar);
  }
  const cx = (iw - cw) / 2;
  const cy = (ih - ch) / 2;
  return { iw, ih, cx, cy, cw, ch, cvW: 320, cvH: 400 };
}

function clampCropRect(s) {
  s.cx = Math.max(0, Math.min(s.cx, s.iw - s.cw));
  s.cy = Math.max(0, Math.min(s.cy, s.ih - s.ch));
}

function drawCropCanvas() {
  const canvas = /** @type {HTMLCanvasElement | null} */ ($("crop-canvas"));
  if (!canvas || !cropImageEl || !cropRectState) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const s = cropRectState;
  s.cvW = canvas.width;
  s.cvH = canvas.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(cropImageEl, s.cx, s.cy, s.cw, s.ch, 0, 0, canvas.width, canvas.height);
}

/**
 * @param {File | null | undefined} file
 */
function handleUploadFileSelected(file) {
  preparedUploadFile = null;
  disposeCropSource();
  const cropPanel = $("crop-panel");
  const wrap = $("file-preview-wrap");
  if (!file || !file.type.startsWith("image/")) {
    clearFilePreview();
    if (cropPanel) cropPanel.hidden = true;
    return;
  }
  if (wrap) wrap.hidden = true;
  if (cropPanel) cropPanel.hidden = false;
  cropObjectUrl = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    cropImageEl = img;
    const canvas = /** @type {HTMLCanvasElement | null} */ ($("crop-canvas"));
    if (!canvas) return;
    cropRectState = initCropRect(img.naturalWidth, img.naturalHeight);
    cropRectState.cvW = canvas.width;
    cropRectState.cvH = canvas.height;
    drawCropCanvas();
  };
  img.src = cropObjectUrl;
}

function wireCropControls() {
  const canvas = /** @type {HTMLCanvasElement | null} */ ($("crop-canvas"));
  const apply = $("btn-crop-apply");
  if (!canvas) return;

  /** @type {{ x: number; y: number } | null} */
  let drag = null;

  canvas.addEventListener("pointerdown", (e) => {
    if (!cropRectState) return;
    canvas.setPointerCapture(e.pointerId);
    drag = { x: e.clientX, y: e.clientY };
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!drag || !cropRectState) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    drag = { x: e.clientX, y: e.clientY };
    const s = cropRectState;
    const scaleX = s.cw / s.cvW;
    const scaleY = s.ch / s.cvH;
    s.cx -= dx * scaleX;
    s.cy -= dy * scaleY;
    clampCropRect(s);
    drawCropCanvas();
  });
  const endDrag = () => {
    drag = null;
  };
  canvas.addEventListener("pointerup", endDrag);
  canvas.addEventListener("pointercancel", endDrag);

  apply?.addEventListener("click", () => {
    if (!cropImageEl || !cropRectState) return;
    const out = document.createElement("canvas");
    out.width = CARD_CROP_W;
    out.height = CARD_CROP_H;
    const ctx = out.getContext("2d");
    if (!ctx) return;
    const s = cropRectState;
    ctx.drawImage(cropImageEl, s.cx, s.cy, s.cw, s.ch, 0, 0, CARD_CROP_W, CARD_CROP_H);
    out.toBlob(
      (blob) => {
        if (!blob) return;
        preparedUploadFile = new File([blob], "card.jpg", { type: "image/jpeg" });
        disposeCropSource();
        const panel = $("crop-panel");
        if (panel) panel.hidden = true;
        if (previewObjectUrl) {
          URL.revokeObjectURL(previewObjectUrl);
          previewObjectUrl = null;
        }
        previewObjectUrl = URL.createObjectURL(blob);
        const imgEl = $("file-preview-img");
        const w = $("file-preview-wrap");
        if (imgEl) imgEl.src = previewObjectUrl;
        if (w) w.hidden = false;
        setFileError("");
      },
      "image/jpeg",
      0.88
    );
  });
}

/** Файл UI */
function wireFileDrop() {
  const input = $("file-input");
  const label = $("file-label");
  const zone = document.querySelector(".file-drop");
  if (!input || !zone) return;

  const setName = () => {
    const f = input.files?.[0];
    if (label) label.textContent = f ? f.name : t("pickFile");
    handleUploadFileSelected(f ?? null);
  };
  input.addEventListener("change", setName);

  ["dragenter", "dragover"].forEach((ev) => {
    zone.addEventListener(ev, (e) => {
      e.preventDefault();
      zone.classList.add("file-drop--active");
    });
  });
  ["dragleave", "drop"].forEach((ev) => {
    zone.addEventListener(ev, (e) => {
      e.preventDefault();
      if (ev !== "drop") zone.classList.remove("file-drop--active");
    });
  });
  zone.addEventListener("drop", (e) => {
    zone.classList.remove("file-drop--active");
    const dt = e.dataTransfer?.files?.[0];
    if (dt && dt.type.startsWith("image/")) {
      input.files = e.dataTransfer.files;
      setName();
    }
  });
}

/** Жіберу / суретті ауыстыру */
function wireUpload() {
  const form = $("form-upload");
  form?.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const msg = $("upload-msg");
    const btn = $("btn-upload");
    const fileInput = $("file-input");
    const nameInput = $("name-input");
    const genderInput = $("gender-input");
    const raw = fileInput?.files?.[0];
    const file = preparedUploadFile ?? raw;
    const fullName = (nameInput?.value || "").trim();
    const gender = (genderInput?.value || "").trim();

    clearUploadFieldErrors();
    if (msg) {
      msg.textContent = "";
      msg.className = "form-msg";
    }

    if (!fullName) {
      setNameError(t("submitErrName"));
      return;
    }
    if (gender !== "male" && gender !== "female") {
      setGenderError(t("submitErrGender"));
      return;
    }
    if (!file) {
      setFileError(replaceMode ? t("submitErrFileReplace") : t("submitErrFile"));
      return;
    }
    if (raw && raw.type.startsWith("image/") && !preparedUploadFile) {
      setFileError(t("cropFirst"));
      return;
    }

    setUploadLoading(btn, true);
    let uploadOk = false;
    try {
      const contest = await fetchContest();
      if (!submissionOpen(contest)) {
        throw new Error("Сурет жіберу қазір жабық.");
      }
      const submitterKey = await participantKey();
      const ext =
        preparedUploadFile && file === preparedUploadFile
          ? "jpg"
          : ((file.name.split(".").pop() || "jpg").toLowerCase());
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("photos").upload(path, file, { upsert: false });
      if (upErr) throw upErr;
      const cap = ($("caption-input")?.value || "").trim();
      const packedCaption = packCaptionMeta(gender, cap);

      if (replaceMode) {
        const { data: rpcData, error: rpcErr } = await supabase.rpc("replace_my_submission", {
          p_submitter_key: submitterKey,
          p_storage_path: path,
          p_full_name: fullName,
          p_caption: packedCaption,
        });
        if (rpcErr) {
          await supabase.storage.from("photos").remove([path]);
          throw rpcErr;
        }
        if (rpcData && typeof rpcData === "object" && rpcData.error) {
          await supabase.storage.from("photos").remove([path]);
          throw new Error(rpcClientError(String(rpcData.error)));
        }
        replaceMode = false;
        if (msg) {
          msg.textContent = t("replacedOk");
          msg.className = "form-msg form-msg--ok";
        }
      } else {
        const { error: rowErr } = await supabase.from("photos").insert({
          storage_path: path,
          full_name: fullName,
          caption: packedCaption || null,
          submitter_key: submitterKey,
        });
        if (rowErr) {
          await supabase.storage.from("photos").remove([path]);
          if (String(rowErr.message).includes("photos_submitter_key_unique")) {
            throw new Error("Бұл құрылғыдан өтініш қабылданған.");
          }
          throw rowErr;
        }
        try {
          localStorage.setItem(LS_UPLOAD, "1");
        } catch {
          /* ignore */
        }
        if (msg) {
          msg.textContent = t("sentOk");
          msg.className = "form-msg form-msg--ok";
        }
      }

      fileInput.value = "";
      if ($("file-label")) $("file-label").textContent = t("pickFile");
      clearFilePreview();
      uploadOk = true;
      if (msg?.textContent) pendingSubmitSuccessMsg = msg.textContent;
    } catch (e) {
      const t = e instanceof Error ? e.message : "Ошибка.";
      void showNotice(I18N[currentLang].sentFail, t);
      if (msg) {
        msg.textContent = "";
        msg.className = "form-msg";
      }
    } finally {
      setUploadLoading(btn, false);
    }

    if (uploadOk) {
      try {
        const row = await fetchContest();
        await refreshUI({ contest: row, skipGallery: !votingOpen(row) });
      } catch {
        await refreshUI();
      }
    }
  });
}

function wireReplaceFlow() {
  $("btn-replace-photo")?.addEventListener("click", async () => {
    const btnRep = $("btn-replace-photo");
    const idleRep = "Суретті қайта жүктеу";
    if (btnRep) btnRep.disabled = true;
    if (btnRep) btnRep.textContent = t("loading");
    replaceMode = true;
    const cancelWrap = $("replace-cancel-wrap");
    if (cancelWrap) cancelWrap.hidden = false;
    let contest;
    /** @type {Parameters<typeof refreshUI>[0] | undefined} */
    let refreshOpts;
    try {
      const [c, subRes] = await Promise.all([fetchContest(), fetchMySubmissionRow()]);
      contest = c;
      if (subRes.kind === "rpc_error") throw subRes.error;

      if (subRes.kind === "app_error") {
        const code = subRes.code;
        if (code === "not_found") {
          try {
            localStorage.removeItem(LS_UPLOAD);
          } catch {
            /* ignore */
          }
          replaceMode = false;
          if (cancelWrap) cancelWrap.hidden = true;
          void showNotice("Ескерту", MSG_ADMIN_REMOVED);
          refreshOpts = { contest, skipGallery: !votingOpen(contest) };
        } else if (code === "bad_key") {
          replaceMode = false;
          if (cancelWrap) cancelWrap.hidden = true;
          refreshOpts = { contest, skipGallery: !votingOpen(contest) };
        } else {
          contest = contest ?? (await fetchContest());
          refreshOpts = { contest, skipGallery: !votingOpen(contest) };
        }
      } else if (subRes.kind === "ok") {
        const row = subRes.row;
        const ni = $("name-input");
        if (ni) ni.value = String(row.full_name ?? "");
        const ci = $("caption-input");
        const meta = parseCaptionMeta(row.caption);
        if (ci) ci.value = String(meta.caption ?? "");
        const gi = $("gender-input");
        if (gi) gi.value = meta.gender === "female" ? "female" : "male";
        contest = contest ?? (await fetchContest());
        refreshOpts = { contest, skipGallery: !votingOpen(contest) };
      } else {
        contest = contest ?? (await fetchContest());
        refreshOpts = { contest, skipGallery: !votingOpen(contest) };
      }
    } catch {
      try {
        const row = await fetchContest();
        refreshOpts = { contest: row, skipGallery: !votingOpen(row) };
      } catch {
        refreshOpts = {};
      }
    } finally {
      if (btnRep) {
        btnRep.disabled = false;
        btnRep.textContent = idleRep;
      }
    }
    if (refreshOpts !== undefined) {
      await refreshUI(refreshOpts);
    }
  });

  $("btn-cancel-replace")?.addEventListener("click", async () => {
    replaceMode = false;
    const cancelWrap = $("replace-cancel-wrap");
    if (cancelWrap) cancelWrap.hidden = true;
    try {
      const row = await fetchContest();
      await refreshUI({ contest: row, skipGallery: !votingOpen(row) });
    } catch {
      await refreshUI();
    }
  });
}

function wirePhotoSheet() {
  $("photo-sheet-close")?.addEventListener("click", () => closePhotoSheet());
  $("photo-sheet-fullscreen")?.addEventListener("click", (ev) => {
    ev.stopPropagation();
    togglePhotoSheetZoom();
  });
  $("photo-sheet-img")?.addEventListener("click", () => togglePhotoSheetZoom());
  $("photo-sheet")?.addEventListener("click", (ev) => {
    if (ev.target instanceof HTMLElement && ev.target.classList.contains("photo-sheet__backdrop")) {
      closePhotoSheet();
    }
  });
  $("photo-sheet-vote")?.addEventListener("click", (ev) => {
    ev.stopPropagation();
    const btn = $("photo-sheet-vote");
    if (!sheetRow || !btn) return;
    if (sheetChooseHandler) {
      const pick = sheetChooseHandler;
      closePhotoSheet();
      pick();
      return;
    }
    if (sheetPreviewOnly) return;
    void castVote(String(sheetRow.photo_id), btn);
  });

  document.addEventListener("keydown", (ev) => {
    if (ev.key !== "Escape") return;
    const dlg = $("app-dialog");
    if (dlg && !dlg.hidden) return;
    const sh = $("photo-sheet");
    if (sh && !sh.hidden) {
      ev.preventDefault();
      closePhotoSheet();
    }
  });
}

function wireZoomBlock() {
  document.addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey) e.preventDefault();
    },
    { passive: false }
  );
  document.addEventListener("gesturestart", (e) => e.preventDefault(), { passive: false });
}

function wireInstallPwa() {
  let deferredPrompt = null;
  const btn = $("btn-install-pwa");
  const text = $("install-hint-text");
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = /** @type {any} */ (e);
    if (btn) btn.hidden = false;
  });
  btn?.addEventListener("click", async () => {
    const p = deferredPrompt;
    if (!p || typeof p.prompt !== "function") return;
    p.prompt();
    try {
      await p.userChoice;
    } catch {
      /* ignore */
    }
    deferredPrompt = null;
    if (btn) btn.hidden = true;
  });
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (isIOS && text) {
    text.textContent =
      "iPhone / iPad: Safari арқылы сайтты ашыңыз → төменгі ортадағы бөлісу батырмасы → «Негізгі экранға қосу».";
  }
}

function wirePoll() {
  setInterval(() => {
    if (!supabase) return;
    const dlg = $("app-dialog");
    if (dlg && !dlg.hidden) return;
    if (document.body.classList.contains("admin-sheet-open")) return;
    if (document.body.classList.contains("photo-sheet-open")) return;
    void refreshUI({ silent: true });
  }, 20000);
}

function wireDuelControls() {
  const tabs = [$("duel-tab-boys"), $("duel-tab-girls")].filter(Boolean);
  for (const tab of tabs) {
    tab.addEventListener("click", () => {
      const gender = tab.dataset.gender === "female" ? "female" : "male";
      currentDuelGender = gender;
      duelChampion = null;
      duelOpponent = null;
      duelQueue = [];
      duelStarted = false;
      duelFinalChoice = null;
      tabs.forEach((x) => x.classList.toggle("duel-tab--active", x === tab));
      void renderGallery({ silent: true });
    });
  }

  $("duel-start")?.addEventListener("click", () => {
    duelFinalChoice = null;
    const candidates = duelRows.slice().sort(() => Math.random() - 0.5);
    if (candidates.length < 2) return;
    duelIntroActive = true;
    duelStarted = true;
    duelChampion = candidates.shift() || null;
    duelOpponent = candidates.shift() || null;
    duelQueue = candidates;
    void renderGallery({ silent: true });
    window.setTimeout(() => {
      duelIntroActive = false;
      void renderGallery({ silent: true });
    }, 700);
  });
}

function boot() {
  if (!supabase) {
    const f = $("fatal-no-sdk");
    if (f) f.hidden = false;
    return;
  }
  wireAppDialog();
  wireLanguage();
  refreshLucideIcons();
  wireFormClearErrors();
  wireAdmin();
  wireFileDrop();
  wireUpload();
  wireReplaceFlow();
  wirePhotoSheet();
  wireZoomBlock();
  wireInstallPwa();
  wireDuelControls();
  wireDuelResult();
  wirePoll();
  wireCropControls();
  wireMyCardActions();
  void refreshUI();
}

boot();
