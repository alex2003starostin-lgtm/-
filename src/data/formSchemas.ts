import type { FormField } from './types'

const PRIORITY_FIELD: FormField = {
  id: 'priority',
  label: 'Приоритет',
  type: 'radio',
  required: true,
  options: [
    { value: 'low', label: 'Низкий' },
    { value: 'medium', label: 'Средний' },
    { value: 'high', label: 'Высокий' },
    { value: 'critical', label: 'Критичный' },
  ],
}

const ATTACHMENTS_FIELD: FormField = {
  id: 'attachments',
  label: 'Вложения',
  type: 'file',
  multiple: true,
  helpText: 'Скриншоты, документы или другие файлы, помогающие понять задачу',
}

const YES_NO_OPTIONS = [
  { value: 'yes', label: 'Да' },
  { value: 'no', label: 'Нет' },
]

const OFFICE_OPTIONS = [
  { value: 'krasnodar', label: 'г. Краснодар (ул. Московская 5/1)' },
  { value: 'moscow-lesnoy-4', label: 'г. Москва (4-й Лесной пер. 4, 10 этаж)' },
  { value: 'moscow-lesnoy-13', label: 'г. Москва (4-й Лесной пер. 13, 3 этаж)' },
  { value: 'moscow-tolstogo', label: 'г. Москва (ул. Льва Толстого, д. 5, стр. 1, 6 этаж)' },
  { value: 'novorossiysk-rc', label: 'г. Новороссийск РЦ (ул. Борисовская 6)' },
  { value: 'novorossiysk', label: 'г. Новороссийск (ул. Мира ЗК)' },
  { value: 'spb', label: 'г. Санкт-Петербург (просп. Невский, д. 55, этаж 4)' },
  { value: 'other', label: 'Другой' },
]

const CONFIG_1C_OPTIONS = [
  { value: 'accounting', label: 'Бухгалтерия предприятия' },
  { value: 'edo', label: 'Документооборот' },
  { value: 'payroll', label: 'Зарплата и управление персоналом' },
  { value: 'trade', label: 'Управление торговлей' },
]

const RC_OPTIONS = [
  { value: 'novorossiysk', label: 'РЦ Новороссийск' },
  { value: 'shushary', label: 'РЦ Шушары' },
  { value: 'stupino', label: 'РЦ Ступино' },
  { value: 'tula', label: 'РЦ Тула' },
]

const RC_WORK_DIRECTION_OPTIONS = [
  { value: '1c', label: '1С' },
  { value: 'logos', label: 'LogOS' },
  { value: 'internet', label: 'Интернет' },
  { value: 'other', label: 'Другое' },
]

const EDI_ORG_OPTIONS = [
  { value: 'grand-trade', label: 'АО Гранд Трейд' },
  { value: 'trade-company', label: 'АО Торговая компания' },
  { value: 'itt', label: 'ООО ИТТ' },
  { value: 'r-com', label: 'АО Р-Ком' },
]

function themeField(label: string): FormField {
  return { id: 'theme', label, type: 'text', required: true }
}

const ADDITIONAL_INFO_FIELD: FormField = { id: 'additionalInfo', label: 'Дополнительная информация', type: 'textarea' }

/** Детальные схемы для форм — по документам от кураторов процессов. Остальные используют универсальный движок. */
export const formSchemas: Record<string, FormField[]> = {
  // ─── ИТ · Техническая поддержка ───────────────────────────────
  'it-workplace': [
    themeField('Тема организации рабочего места'),
    {
      id: 'requirements',
      label: 'Необходимая организация рабочего места',
      type: 'multiselect',
      required: true,
      options: [
        { value: 'account', label: 'Требуется создать учётную запись' },
        { value: 'prowtc-account', label: 'Требуется создать учётную запись PROWTC.com (бывш. D43)' },
        { value: 'equipment', label: 'Требуется выдача оборудования, ноутбука' },
        { value: '1c-access', label: 'Требуется доступ к базам 1С' },
        { value: 'mtt-telephony', label: 'Требуется доступ в телефонию МТТ' },
      ],
    },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-access': [
    themeField('Тема предоставления доступов'),
    { id: 'employeeName', label: 'Введите ФИО сотрудника', type: 'text', required: true },
    {
      id: 'requiredAccess',
      label: 'Необходимые доступы',
      type: 'multiselect',
      required: true,
      options: [
        { value: 'file-storage', label: 'Корпоративное файловое хранилище' },
        { value: 'group-mailbox', label: 'Групповой почтовый ящик' },
        { value: 'disk-z', label: 'Диск Z' },
        { value: 'mailing-group', label: 'Группа почтовой рассылки' },
        { value: 'consultant-plus', label: 'Требуется доступ Консультант Плюс' },
        { value: 'magnit', label: 'Требуется УЗ и доступ в системы Магнита' },
        { value: 'aps', label: 'Система автоматизации закупок (APS)' },
        { value: 'rpa', label: 'Доступ RPA' },
        { value: 'ai-tools', label: 'ИИ-инструменты' },
        { value: 'dts', label: 'Каталог Данных DTS' },
        { value: 'other', label: 'Другое' },
      ],
    },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-incident': [
    themeField('Тема решения технических проблем'),
    {
      id: 'system',
      label: 'Системы и приложения',
      type: 'select',
      required: true,
      options: [
        { value: 'reset-password', label: 'Сбросить пароль от учётной записи' },
        { value: 'yandex-tracker', label: 'Яндекс Трекер' },
        { value: 'yandex-wiki', label: 'YandexWIKI' },
        { value: 'prowtc', label: 'PROWTC учетная запись' },
        { value: 'mail', label: 'Почта и почтовое приложение' },
        { value: 'srm', label: 'SRM система' },
        { value: 'office-apps', label: 'Офисные приложения' },
        { value: 'outlook', label: 'Outlook приложение' },
        { value: 'onedrive', label: 'OneDrive приложение' },
        { value: 'mtt', label: 'МТТ телефония' },
        { value: 'vpn', label: 'VPN приложение' },
        { value: 'dwh-bi', label: 'DWH BI' },
        { value: 'fine-bi', label: 'FineBI' },
        { value: 'network-disks', label: 'Сетевые диски' },
        { value: 'hrbox', label: 'HRBox портал' },
        { value: 'hr-link', label: 'HR-link портал' },
        { value: 'start-link', label: 'Start-link' },
        { value: 'doczilla', label: 'DocZilla' },
        { value: 'getgrist', label: 'GetGrist' },
        { value: 'aps', label: 'Система автоматизации закупок (APS)' },
        { value: 'rpa', label: 'RPA' },
        { value: 'mobile-app', label: 'Мобильное приложение' },
        { value: 'other', label: 'Другое' },
      ],
    },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-offboarding': [
    themeField('Тема сдачи техники при увольнении'),
    { id: 'employeeName', label: 'ФИО сотрудника', type: 'text', required: true },
    { id: 'login', label: 'Логин сотрудника', type: 'text', required: true },
    { id: 'lastDay', label: 'Дата увольнения', type: 'date', required: true },
    { id: 'office', label: 'Адрес увольнения', type: 'select', required: true, options: OFFICE_OPTIONS },
    { id: 'shippingAddress', label: 'Адрес отправки оборудования', type: 'text' },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-software': [
    themeField('Тема установки программного обеспечения'),
    { id: 'softwareName', label: 'Укажите название программного обеспечения', type: 'text', required: true },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-consult': [
    themeField('Тема консультации'),
    {
      id: 'service',
      label: 'По какому сервису необходимо предоставить консультацию?',
      type: 'select',
      required: true,
      options: [
        { value: '1c', label: '1С' },
        { value: 'logos', label: 'Logos' },
        { value: 'yandex-tracker', label: 'Яндекс трекер' },
        { value: 'yandex-wiki', label: 'Яндекс Wiki' },
        { value: 'mail', label: 'Почта и почтовое приложение' },
        { value: 'srm', label: 'SRM система' },
        { value: 'office-apps', label: 'Офисные приложения' },
        { value: 'outlook', label: 'Outlook' },
        { value: 'onedrive', label: 'OneDrive' },
        { value: 'mtt', label: 'МТТ телефония' },
        { value: 'vpn', label: 'VPN' },
        { value: 'dwh-bi', label: 'DWH BI' },
        { value: 'fine-bi', label: 'FINE BI' },
        { value: 'network-disks', label: 'Сетевые диски' },
        { value: 'hr-link', label: 'HR-link' },
        { value: 'start-link', label: 'Start-link' },
        { value: 'doczilla', label: 'Doczilla' },
        { value: 'getgrist', label: 'GetGrist' },
        { value: 'aps', label: 'Cистема автоматизации закупок (APS)' },
        { value: 'rpa', label: 'Робот ЧЗ (RPA)' },
        { value: 'mobile-app', label: 'Мобильное приложение' },
        { value: 'indaspace', label: 'Indaspace' },
        { value: 'other', label: 'Другой сервис' },
      ],
    },
    { id: 'description', label: 'Описание консультации', type: 'textarea', required: true },
    ADDITIONAL_INFO_FIELD,
  ],

  // ─── ИТ · Техническая поддержка 1С ─────────────────────────────
  'it-1c-access': [
    themeField('Тема получения или корректировки доступа в 1С'),
    { id: 'config', label: 'Конфигурация базы', type: 'select', required: true, options: CONFIG_1C_OPTIONS },
    { id: 'role', label: 'Роль или пользователь с аналогичными ролями', type: 'text' },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-1c-consult': [
    themeField('Тема консультации 1С'),
    { id: 'config', label: 'Конфигурация базы', type: 'select', required: true, options: CONFIG_1C_OPTIONS },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-1c-copies': [
    themeField('Тема работы с копиями баз 1С'),
    {
      id: 'config',
      label: 'Конфигурация базы',
      type: 'select',
      required: true,
      options: [...CONFIG_1C_OPTIONS, { value: 'other', label: 'Другая' }],
    },
    {
      id: 'category',
      label: 'Категория работ с копиями 1С',
      type: 'select',
      required: true,
      options: [
        { value: 'backup', label: 'Сделать бэкап базы' },
        { value: 'new-copy', label: 'Создать новую копию' },
        { value: 'extend', label: 'Продлить срок годности копии' },
        { value: 'update', label: 'Обновить базу' },
        { value: 'publish', label: 'Публикация на веб сервере' },
      ],
    },
  ],

  'it-1c-errors': [
    themeField('Тема устранения ошибки 1С'),
    { id: 'config', label: 'Конфигурация базы', type: 'select', required: true, options: CONFIG_1C_OPTIONS },
    {
      id: 'errorType',
      label: 'Тип ошибки',
      type: 'select',
      required: true,
      options: [
        { value: 'freezes', label: 'База зависает или принудительно закрывается' },
        { value: 'no-access', label: 'Ошибка «недостаточно прав», или неактивны поля/кнопка/ссылка' },
        { value: 'db-access', label: 'Ошибка доступа к базе' },
        { value: 'processing', label: 'Ошибка при проведении/формировании/изменении' },
        { value: 'wrong-data', label: 'Неверные данные в документе/отчёте' },
        { value: 'slow', label: 'Увеличилось время процесса проведения/формирования' },
      ],
    },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-1c-registration': [
    {
      id: 'category',
      label: 'Категория',
      type: 'select',
      required: true,
      options: [
        { value: 'migration', label: 'Проблема с миграцией' },
        { value: 'coding', label: 'Проблема с кодированием' },
        { value: 'system', label: 'Проблема с системой' },
      ],
    },
    {
      id: 'entity',
      label: 'С какой сущностью проблема?',
      type: 'select',
      required: true,
      options: [
        { value: 'counterparties', label: 'Контрагенты' },
        { value: 'partners', label: 'Партнеры' },
        { value: 'nomenclature', label: 'Номенклатура' },
        { value: 'freeform', label: 'Напишу в свободной форме' },
      ],
    },
    {
      id: 'system',
      label: 'В какой системе проблема?',
      type: 'select',
      required: true,
      options: [
        { value: '1c-ut', label: '1С УТ' },
        { value: 'msd', label: 'MSD' },
        { value: 'logos', label: 'Logos' },
        { value: 'bpm', label: 'BPM' },
        { value: 'lk', label: 'LK' },
        { value: 'pricing', label: 'Модуль ценообразования' },
        { value: 'mdm', label: 'MDM' },
      ],
    },
    { id: 'occurredAt', label: 'Укажите дату и время (по возможности) возникновения проблемы', type: 'text' },
    { id: 'details', label: 'Детали обращения', type: 'textarea', required: true },
  ],

  'it-1c-dopp': [
    { id: 'doppNumber', label: 'Номер ДОПП в 1С / номер груза / номер поставки', type: 'text', required: true },
    { id: 'description', label: 'Описание проблемы', type: 'textarea', required: true },
  ],

  // ─── ИТ · Заявка на доработку (ЗНД) ─────────────────────────────
  'it-change-request': [
    themeField('Тема заявки на изменение'),
    {
      id: 'direction',
      label: 'Выберите направление',
      type: 'select',
      required: true,
      options: [
        { value: 'purchasing', label: 'Закупки' },
        { value: 'logistics', label: 'Логистика' },
        { value: 'warehouse', label: 'Складская (внутренняя логистика)' },
        { value: 'finance', label: 'Финансы' },
        { value: 'sales', label: 'Продажи' },
        { value: 'legal', label: 'Юристы' },
        { value: 'hr', label: 'HR' },
        { value: 'quality', label: 'Качество' },
      ],
    },
    {
      id: 'priority',
      label: 'Приоритет',
      type: 'select',
      required: true,
      options: [
        { value: 'blocker', label: 'Блокер' },
        { value: 'critical', label: 'Критичный' },
        { value: 'medium', label: 'Средний' },
        { value: 'low', label: 'Низкий' },
      ],
    },
    {
      id: 'impact',
      label: 'Влияние задачи',
      type: 'select',
      required: true,
      options: [
        { value: 'action', label: 'Действие' },
        { value: 'department-process', label: 'Процесс подразделения' },
        { value: 'multi-department-process', label: 'Процесс нескольких подразделений' },
      ],
    },
    { id: 'businessGoal', label: 'Бизнес-цель', type: 'textarea', required: true },
    { id: 'currentProcess', label: 'Текущий процесс или функция, требующие изменения', type: 'textarea', required: true },
    { id: 'currentDrawbacks', label: 'Недостатки текущего процесса', type: 'textarea', required: true },
    { id: 'targetProcess', label: 'Целевой процесс', type: 'textarea', required: true },
    { id: 'risks', label: 'Риски не реализации', type: 'textarea', required: true },
  ],

  // ─── ИТ · ЭЦП и ЭДО ─────────────────────────────────────────────
  'it-edo-issue': [
    themeField('Тема выпуска ЭЦП / подключения ЭДО'),
    { id: 'serviceName', label: 'Название сервиса', type: 'text', required: true },
    {
      id: 'workType',
      label: 'Выберите тип работ',
      type: 'select',
      required: true,
      options: [
        { value: 'connect-no-signature', label: 'Подключение к сервису ЭДО без ЭЦП' },
        { value: 'change-owner', label: 'Смена владельца ключа ЭП' },
        { value: 'issue-existing', label: 'Выпуск ЭЦП к уже подключенному сервису' },
      ],
    },
    { id: 'loginAndName', label: 'Укажите логин учетной записи и ФИО пользователя', type: 'text', required: true },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-edo-rights': [
    themeField('Тема изменения прав доступа к сервису ЭДО'),
    { id: 'description', label: 'Описание запроса', type: 'textarea', required: true },
  ],

  'it-edo-other': [
    themeField('Тема иное ЭЦП или ЭДО'),
    { id: 'description', label: 'Описание запроса', type: 'textarea', required: true },
  ],

  'it-edo-revoke': [
    themeField('Тема отзыва электронной подписи'),
    { id: 'description', label: 'Описание запроса', type: 'textarea', required: true },
  ],

  'it-edo-problem': [
    themeField('Тема проблемы в работе ключа ЭЦП или сервиса'),
    { id: 'description', label: 'Описание запроса', type: 'textarea', required: true },
  ],

  'it-edo-mchd': [
    themeField('Тема консультации МЧД'),
    { id: 'description', label: 'Описание', type: 'textarea', required: true },
    {
      id: 'instructionNotice',
      label: '',
      type: 'info',
      content: '⚠️ Перед формированием заявки просмотрите инструкцию по созданию МЧД в 1С ДО!',
    },
    ADDITIONAL_INFO_FIELD,
    {
      id: 'instructionRead',
      label: '',
      type: 'checkbox',
      required: true,
      helpText: 'Подтверждаю: инструкция изучена',
    },
  ],

  // ─── ИТ · Техническая поддержка РЦ ─────────────────────────────
  'it-rc-consult': [
    themeField('Тема консультации РЦ'),
    { id: 'rc', label: 'Распределительный центр', type: 'select', required: true, options: RC_OPTIONS },
    { id: 'direction', label: 'Направление работ', type: 'select', required: true, options: RC_WORK_DIRECTION_OPTIONS },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-rc-problem': [
    themeField('Тема решение проблем РЦ'),
    { id: 'rc', label: 'Распределительный центр', type: 'select', required: true, options: RC_OPTIONS },
    { id: 'direction', label: 'Направление работ', type: 'select', required: true, options: RC_WORK_DIRECTION_OPTIONS },
    ADDITIONAL_INFO_FIELD,
  ],

  // ─── ИТ · Видеонаблюдение ───────────────────────────────────────
  'it-video': [
    themeField('Тема видеонаблюдения'),
    {
      id: 'direction',
      label: 'Направление работ',
      type: 'select',
      required: true,
      options: [
        { value: 'access', label: 'Предоставление доступов' },
        { value: 'system-work', label: 'Работа с системой' },
        { value: 'incident', label: 'Решение технических проблем' },
      ],
    },
    ADDITIONAL_INFO_FIELD,
  ],

  // ─── ИТ · ИС ЛОГОС ──────────────────────────────────────────────
  'it-logos-consult': [
    themeField('Тема консультации по работе ИС Логос'),
    { id: 'description', label: 'Описание запроса', type: 'textarea', required: true },
  ],

  'it-logos-access': [
    themeField('Тема получения доступа ИС Логос'),
    {
      id: 'accessType',
      label: 'Тип доступа',
      type: 'select',
      required: true,
      options: [
        { value: 'internal', label: 'Доступ для внутреннего сотрудника ГТ' },
        { value: 'external', label: 'Доступ для внешнего пользователя' },
      ],
    },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-logos-error': [
    themeField('Тема ошибки ИС Логос'),
    {
      id: 'errorType',
      label: 'Тип ошибки',
      type: 'select',
      required: true,
      options: [
        { value: 'migration-1c', label: 'Ошибка при миграции в 1С УТ' },
        { value: 'migration-dynamics', label: 'Ошибка при миграции в Dynamics 365' },
        { value: 'other', label: 'Другая ошибка' },
      ],
    },
    { id: 'description', label: 'Подробное описание проблемы', type: 'textarea', required: true },
  ],

  // ─── ИТ · ИТ Инфраструктура ─────────────────────────────────────
  'it-infra-s3': [
    {
      id: 'environment',
      label: 'Окружение',
      type: 'multiselect',
      required: true,
      options: [
        { value: 'prod', label: 'PROD' },
        { value: 'tir', label: 'TIR' },
      ],
    },
    { id: 'bucketName', label: 'Имя бакета', type: 'text', required: true },
    {
      id: 'storageClass',
      label: 'Класс хранилища',
      type: 'multiselect',
      required: true,
      helpText:
        'Standard — частый доступ к данным. Cold — редкий доступ, примерно раз в месяц. Ice — очень редкий доступ, раз в год или реже.',
      options: [
        { value: 'standard', label: 'Standard – Стандартное' },
        { value: 'cold', label: 'Cold – Холодное' },
        { value: 'ice', label: 'Ice – Ледяное' },
      ],
    },
    {
      id: 'keysNotice',
      label: '',
      type: 'info',
      content: 'Создаются две пары ключей — одна RW, вторая RO — и выдаются заявителю.',
    },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-infra-db': [
    {
      id: 'serverConfirmed',
      label: '',
      type: 'checkbox',
      required: true,
      helpText: 'Сервер или кластер для базы данных уже подготовлен',
    },
    { id: 'serverName', label: 'Имя сервера/кластера, на котором необходимо создать базу данных', type: 'text', required: true },
    { id: 'dbName', label: 'Имя новой базы данных', type: 'text', required: true },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-infra-change': [
    themeField('Тема изменения информационной системы/сервиса'),
    { id: 'systemName', label: 'Название информационной системы/сервиса, требующего изменения', type: 'text', required: true },
    { id: 'description', label: 'Описание запроса', type: 'textarea', required: true },
  ],

  'it-infra-monitoring': [
    themeField('Тема мониторинга'),
    { id: 'description', label: 'Детальное описание задачи', type: 'textarea', required: true },
  ],

  'it-infra-vm': [
    { id: 'businessService', label: 'К какому бизнес-сервису относится новая ВМ', type: 'text', required: true },
    {
      id: 'environment',
      label: 'В каком окружении создать новую ВМ',
      type: 'select',
      required: true,
      options: [
        { value: 'prod', label: 'PROD' },
        { value: 'stage-test-dev-lab', label: 'STAGE / TEST / DEV / LAB' },
      ],
    },
    {
      id: 'multiVmNotice',
      label: '',
      type: 'info',
      content: 'Ниже опишите одну виртуальную машину. Если нужно несколько ВМ, перечислите остальные в дополнительной информации или оформите отдельные заявки.',
    },
    { id: 'vmRole', label: 'Роль ВМ', type: 'text', required: true },
    {
      id: 'os',
      label: 'Операционная система',
      type: 'select',
      required: true,
      options: [
        { value: 'windows', label: 'Windows' },
        { value: 'linux', label: 'Linux' },
        { value: 'other', label: 'Другое' },
      ],
    },
    { id: 'cpu', label: 'Количество CPU', type: 'number', required: true },
    { id: 'ram', label: 'Количество RAM', type: 'number', required: true },
    {
      id: 'vmOptions',
      label: 'Дополнительные параметры',
      type: 'multiselect',
      options: [
        { value: 'extra-disk', label: 'Дополнительный диск' },
        { value: 'white-ip', label: 'Необходим внешний «белый» IP-адрес' },
      ],
    },
    { id: 'software', label: 'Укажите какое дополнительное ПО необходимо установить', type: 'text' },
    { id: 'accessFor', label: 'Укажите кому и какие доступы необходимо предоставить', type: 'text' },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-infra-network': [
    { id: 'from', label: 'Откуда', type: 'text', required: true },
    { id: 'to', label: 'Куда', type: 'text', required: true },
    { id: 'accessFor', label: 'Кому необходимо предоставить доступ', type: 'text', required: true },
    ADDITIONAL_INFO_FIELD,
  ],

  'it-infra-business-service': [
    { id: 'serviceName', label: 'Наименование нового бизнес-сервиса', type: 'text', required: true },
    { id: 'shortName', label: 'Краткое имя бизнес-сервиса (для тегов)', type: 'text', required: true },
    {
      id: 'criticalityNotice',
      label: '',
      type: 'info',
      content:
        'BC (Business critical) — без сервиса невозможна работа компании, простой ведёт к финансовым убыткам, доступность 99.8%. BO (Business operational) — простой в среднесрочном периоде повлечёт финансовые и репутационные потери, доступность 99.0%. AS (Administrative service) — простой создаёт неудобства пользователям, но не влияет на другие системы, доступность 98.0%.',
    },
    {
      id: 'criticality',
      label: 'Критичность нового сервиса',
      type: 'multiselect',
      required: true,
      options: [
        { value: 'bc', label: 'BC – Business critical' },
        { value: 'bo', label: 'BO – Business operational' },
        { value: 'as', label: 'AS – Administrative service' },
      ],
    },
    ADDITIONAL_INFO_FIELD,
  ],

  // ─── EDI/ЭДО ─────────────────────────────────────────────────────
  'edi-consult': [
    themeField('Тема консультации EDI / Диадок'),
    { id: 'organization', label: 'Консультация от какой организации', type: 'select', required: true, options: EDI_ORG_OPTIONS },
    {
      id: 'consultType',
      label: 'Тип консультации',
      type: 'select',
      required: true,
      options: [
        { value: 'no-order', label: 'Нет заказа от ТС' },
        { value: 'send-error', label: 'Ошибка при отправке УПД/УКД/иУКД' },
        { value: 'feature-request', label: 'Доработка функционала для пользователя' },
        { value: 'other', label: 'Другое' },
      ],
    },
    { id: 'description', label: 'Описание проблемы', type: 'textarea', required: true },
  ],

  'edi-connect': [
    themeField('Тема подключения EDI/эУПД'),
    { id: 'inn', label: 'ИНН контрагента', type: 'text', required: true },
    { id: 'kpp', label: 'КПП контрагента', type: 'text', required: true },
    { id: 'tradingNetwork', label: 'Название Торговой Сети / Юр.лицо', type: 'text', required: true },
    { id: 'contractLink', label: 'Ссылка на подписанный договор 1С', type: 'text' },
    { id: 'organization', label: 'Подключение от организации', type: 'select', required: true, options: EDI_ORG_OPTIONS },
    { id: 'description', label: 'Описание запроса', type: 'textarea', required: true },
  ],

  'edi-invite': [
    themeField('Тема принять / отправить приглашение в Диадок'),
    { id: 'inn', label: 'ИНН контрагента', type: 'text', required: true },
    { id: 'kpp', label: 'КПП контрагента', type: 'text', required: true },
    { id: 'counterpartyName', label: 'Название контрагента', type: 'text', required: true },
    {
      id: 'provider',
      label: 'Провайдер контрагента',
      type: 'select',
      required: true,
      options: [
        { value: 'kontur', label: 'СКБ Контур (Контур.Диадок)' },
        { value: 'astral', label: 'Калуга Астрал (Астрал Отчет)' },
        { value: 'taxcom', label: 'Такском (Файлер)' },
        { value: 'sbercorus', label: 'СберКорус (Сферакурьер)' },
        { value: 'ediweb', label: 'Эдивеб (Ediweb)' },
        { value: 'tensor', label: 'Тензор (СБИС)' },
        { value: 'cislink', label: 'CISLink (DOCLINK)' },
        { value: 'other', label: 'Другое' },
      ],
    },
    { id: 'description', label: 'Описание запроса', type: 'textarea', required: true },
  ],

  // ─── HR ──────────────────────────────────────────────────────────
  'hr-referral': [
    themeField('Тема приведи друга'),
    { id: 'vacancy', label: 'Название вакансий, на которые кандидат претендует', type: 'text', required: true },
    {
      id: 'openToOtherVacancies',
      label: 'Готов ли кандидат рассмотреть другие вакансии компании?',
      type: 'radio',
      required: true,
      options: YES_NO_OPTIONS,
    },
    { id: 'fitAssessment', label: 'Считаешь ли ты, что кандидат впишется в нашу команду?', type: 'textarea', required: true },
    { id: 'comment', label: 'Дополнительный комментарий', type: 'textarea' },
  ],

  'hr-dms': [
    themeField('Тема ДМС'),
    { id: 'employeeName', label: 'Введите имя сотрудника', type: 'text', required: true },
    {
      id: 'requestType',
      label: 'Выберите тип запроса',
      type: 'select',
      required: true,
      options: [
        { value: 'connect', label: 'Подключение к программе ДМС' },
        { value: 'disconnect', label: 'Отключение от программы ДМС' },
        { value: 'update-data', label: 'Изменение персональных данных' },
        { value: 'other', label: 'Другое' },
      ],
    },
    { id: 'birthDate', label: 'Дата рождения', type: 'date', required: true },
    {
      id: 'gender',
      label: 'Пол',
      type: 'radio',
      required: true,
      options: [
        { value: 'male', label: 'Мужской' },
        { value: 'female', label: 'Женский' },
      ],
    },
    { id: 'address', label: 'Адрес проживания', type: 'text', required: true },
    { id: 'phone', label: 'Номер мобильного телефона', type: 'text', required: true },
    { id: 'email', label: 'Контактный e-mail', type: 'text', required: true },
    ADDITIONAL_INFO_FIELD,
  ],

  'hr-recruitment': [
    themeField('Тема заявки на подбор'),
    { id: 'vacancy', label: 'Наименование вакансии', type: 'text', required: true },
    {
      id: 'budgeted',
      label: 'Вакансия (повышение или перевод) забюджетирована?',
      type: 'radio',
      required: true,
      options: YES_NO_OPTIONS,
    },
    {
      id: 'openReason',
      label: 'Причина открытия вакансии',
      type: 'select',
      required: true,
      options: [
        { value: 'promotion-transfer', label: 'Повышение/Перевод' },
        { value: 'dismissal-replacement', label: 'Увольнение/Замена' },
        { value: 'maternity', label: 'Декретная' },
        { value: 'new-headcount', label: 'Новая (ввод ШЕ)' },
      ],
    },
    {
      id: 'hasInternalCandidate',
      label: 'Есть ли внутренний кандидат на вакансию?',
      type: 'radio',
      required: true,
      options: YES_NO_OPTIONS,
    },
    ADDITIONAL_INFO_FIELD,
  ],

  'hr-motivation': [
    themeField('Тема изменения мотивации'),
    { id: 'employeeName', label: 'Введите имя сотрудника', type: 'text', required: true },
    { id: 'justification', label: 'Обоснование пересмотра ЗП', type: 'textarea', required: true },
  ],

  'hr-docs': [
    themeField('Тема получения копий кадровых документов'),
    {
      id: 'documentType',
      label: 'Тип документа',
      type: 'select',
      required: true,
      options: [
        { value: 'work-record-copy', label: 'Копия трудовой книжки' },
        { value: 'employment-certificate', label: 'Справка с места работы' },
      ],
    },
    { id: 'period', label: 'Период справки', type: 'text' },
    {
      id: 'deliveryMethod',
      label: 'Способ получения',
      type: 'select',
      required: true,
      options: [
        { value: 'moscow-office', label: 'Заберу в офисе Москвы' },
        { value: 'krasnodar-office', label: 'Заберу в офисе Краснодара' },
        { value: 'courier', label: 'Отправить курьерской службой' },
      ],
    },
    ADDITIONAL_INFO_FIELD,
  ],

  'hr-income': [
    themeField('Тема получения справки о доходах'),
    {
      id: 'documentType',
      label: 'Тип документа',
      type: 'select',
      required: true,
      options: [
        { value: '2-ndfl', label: '2-НДФЛ' },
        { value: 'no-benefits', label: 'О неполучении пособия' },
        { value: 'employment-service', label: 'Для службы занятости' },
      ],
    },
    { id: 'period', label: 'Период справки', type: 'text' },
    {
      id: 'deliveryMethod',
      label: 'Способ получения',
      type: 'select',
      required: true,
      options: [
        { value: 'moscow-office', label: 'Заберу в офисе Москвы' },
        { value: 'krasnodar-office', label: 'Заберу в офисе Краснодара' },
        { value: 'courier', label: 'Отправить курьерской службой' },
      ],
    },
    ADDITIONAL_INFO_FIELD,
  ],

  // ─── АХО ─────────────────────────────────────────────────────────
  'axo-cards': [
    {
      id: 'cardType',
      label: 'Тип визиток',
      type: 'select',
      required: true,
      options: [
        { value: 'ru-no-qr', label: 'Русские без QR-code' },
        { value: 'ru-qr', label: 'Русские с QR-code' },
        { value: 'en-no-qr', label: 'Английские без QR-code' },
        { value: 'en-qr', label: 'Английские с QR-code' },
      ],
    },
    { id: 'quantity', label: 'Кол-во штук', type: 'number', required: true, helpText: 'Минимальное количество 50 шт.' },
    { id: 'office', label: 'Офис получения визиток', type: 'select', required: true, options: OFFICE_OPTIONS },
    { id: 'email', label: 'Контактный e-mail', type: 'text', required: true },
    { id: 'phone', label: 'Номер сотового телефона сотрудника', type: 'text', required: true },
    ADDITIONAL_INFO_FIELD,
  ],

  'axo-guest-pass': [
    themeField('Тема гостевого пропуска'),
    { id: 'office', label: 'Адрес офиса гостевого пропуска', type: 'select', required: true, options: OFFICE_OPTIONS },
    {
      id: 'passType',
      label: 'Тип пропуска',
      type: 'select',
      required: true,
      options: [
        { value: 'visitor', label: 'Пропуск для посетителя' },
        { value: 'parking', label: 'Въезд на парковку' },
      ],
    },
    { id: 'phone', label: 'Контактный телефон', type: 'text', required: true },
    ADDITIONAL_INFO_FIELD,
  ],

  'axo-courier': [
    themeField('Тема курьерской доставки'),
    { id: 'office', label: 'Выберите ваш офис', type: 'select', required: true, options: OFFICE_OPTIONS },
    {
      id: 'direction',
      label: 'Направление отправления',
      type: 'select',
      required: true,
      options: [
        { value: 'domestic', label: 'По России' },
        { value: 'international', label: 'Международная' },
      ],
    },
    {
      id: 'shipmentType',
      label: 'Вид отправки',
      type: 'select',
      required: true,
      options: [
        { value: 'documents', label: 'Документы' },
        { value: 'cargo', label: 'Груз' },
      ],
    },
    { id: 'insurance', label: 'Страховка отправления', type: 'radio', required: true, options: YES_NO_OPTIONS },
    { id: 'senderAddress', label: 'Адрес отправителя', type: 'text', required: true },
    { id: 'senderOrg', label: 'Наименование организации отправителя', type: 'text' },
    { id: 'senderName', label: 'ФИО отправителя', type: 'text', required: true },
    { id: 'senderPhone', label: 'Номер телефона отправителя', type: 'text', required: true },
    { id: 'recipientAddress', label: 'Адрес получателя', type: 'text', required: true },
    { id: 'recipientOrg', label: 'Наименование организации получателя', type: 'text' },
    { id: 'recipientName', label: 'ФИО получателя', type: 'text', required: true },
    { id: 'recipientPhone', label: 'Номер телефона получателя', type: 'text', required: true },
    ADDITIONAL_INFO_FIELD,
  ],

  'axo-mobile': [
    themeField('Тема мобильной связи'),
    { id: 'office', label: 'Адрес офиса', type: 'select', required: true, options: OFFICE_OPTIONS },
    { id: 'employeeName', label: 'ФИО сотрудника', type: 'text', required: true },
    {
      id: 'workType',
      label: 'Тип работ',
      type: 'select',
      required: true,
      options: [
        { value: 'new-sim', label: 'Получение сим-карты' },
        { value: 'services', label: 'Подключение/отключение доп. услуг' },
        { value: 'technical', label: 'Технические проблемы' },
        { value: 'other', label: 'Другое' },
      ],
    },
    ADDITIONAL_INFO_FIELD,
  ],

  'axo-stationery': [
    themeField('Тема получения канцелярии и других товаров'),
    { id: 'office', label: 'Адрес офиса', type: 'select', required: true, options: OFFICE_OPTIONS },
    {
      id: 'itemType',
      label: 'Вид ТМЦ',
      type: 'select',
      required: true,
      options: [
        { value: 'stationery', label: 'Канцелярия' },
        { value: 'furniture', label: 'Мебель' },
        { value: 'other', label: 'Прочее' },
      ],
    },
    { id: 'employeeName', label: 'ФИО сотрудника', type: 'text', required: true },
    { id: 'description', label: 'Описание запроса', type: 'textarea', required: true },
  ],

  'axo-office': [
    themeField('Тема эксплуатации офиса'),
    { id: 'office', label: 'Адрес эксплуатации офиса', type: 'select', required: true, options: OFFICE_OPTIONS },
    { id: 'employeeName', label: 'ФИО сотрудника', type: 'text', required: true },
    {
      id: 'workType',
      label: 'Тип работ',
      type: 'select',
      required: true,
      options: [
        { value: 'cleaning', label: 'Уборка' },
        { value: 'ventilation', label: 'Вентиляция' },
        { value: 'air-conditioning', label: 'Кондиционирование' },
        { value: 'minor-repair', label: 'Мелкий ремонт' },
        { value: 'improvement', label: 'Благоустройство' },
        { value: 'other', label: 'Прочее' },
      ],
    },
    ADDITIONAL_INFO_FIELD,
  ],

  'axo-travel-kmr': [
    themeField('Тема доступа к платформе КМР'),
    { id: 'description', label: 'Описание запроса', type: 'textarea', required: true },
    {
      id: 'templateNotice',
      label: '',
      type: 'info',
      content: '⚠️ Приложите к заявке заполненный шаблон для создания ЛК КМР. Шаблон доступен для скачивания на портале HRBox.',
    },
  ],

  'axo-travel-visa': [
    themeField('Тема запроса на визу'),
    {
      id: 'country',
      label: 'Место (страна) командирования',
      type: 'text',
      required: true,
      placeholder: 'Например, Германия, США, Бразилия…',
    },
    { id: 'duration', label: 'Сроки пребывания в месте (стране) командирования', type: 'text', required: true },
    {
      id: 'documentsNotice',
      label: '',
      type: 'info',
      content:
        '⚠️ Приложите к заявке необходимые документы: копию действующего общегражданского заграничного паспорта (страница с персональными данными) и приглашение от зарубежного партнёра.',
    },
    ADDITIONAL_INFO_FIELD,
  ],

  'axo-translation-written': [
    themeField('Тема письменного перевода'),
    { id: 'sourceLanguage', label: 'Язык оригинала', type: 'text', required: true },
    { id: 'targetLanguage', label: 'Язык перевода', type: 'text', required: true },
    {
      id: 'certification',
      label: 'Требуется заверение',
      type: 'multiselect',
      options: [
        { value: 'translator', label: 'Заверение подписью переводчика' },
        { value: 'notary', label: 'Заверение нотариусом' },
      ],
    },
    ADDITIONAL_INFO_FIELD,
  ],

  'axo-translation-oral': [
    themeField('Тема устного перевода'),
    { id: 'taskDate', label: 'Дата задачи', type: 'date', required: true },
    { id: 'taskTime', label: 'Время задачи', type: 'text', required: true },
    { id: 'taskNature', label: 'Характер задачи', type: 'text', required: true },
    ADDITIONAL_INFO_FIELD,
  ],

  'axo-concierge': [
    themeField('Тема консьерж сервис'),
    { id: 'description', label: 'Описание запроса', type: 'textarea', required: true },
  ],

  // ─── Прочее ─────────────────────────────────────────────────────
  'ib-endpoint-web': [
    { id: 'url', label: 'URL ресурса', type: 'text', required: true, placeholder: 'https://' },
    { id: 'justification', label: 'Обоснование', type: 'textarea', required: true },
    {
      id: 'duration',
      label: 'Срок доступа',
      type: 'radio',
      required: true,
      options: [
        { value: 'temporary', label: 'Временный' },
        { value: 'permanent', label: 'Постоянный' },
      ],
    },
    { id: 'managerApproval', label: 'Согласовано с руководителем', type: 'checkbox' },
  ],

  'ib-spam-block': [
    { id: 'senderAddress', label: 'Адрес отправителя', type: 'text', required: true },
    { id: 'subject', label: 'Тема письма', type: 'text' },
    { id: 'emlFile', label: 'Приложить письмо (.eml)', type: 'file', accept: '.eml,.msg' },
    { id: 'description', label: 'Описание проблемы', type: 'textarea', required: true },
  ],

  'treasury-payment-rub': [
    { id: 'counterparty', label: 'Контрагент', type: 'text', required: true },
    { id: 'amount', label: 'Сумма', type: 'number', required: true },
    { id: 'contractNumber', label: 'Номер договора', type: 'text', required: true },
    { id: 'purpose', label: 'Назначение платежа', type: 'textarea', required: true },
    { id: 'bank', label: 'Банк', type: 'text', required: true },
    { id: 'paymentDate', label: 'Дата платежа', type: 'date', required: true },
    { id: 'invoice', label: 'Приложить счёт', type: 'file' },
  ],

  'other-freeform': [
    { id: 'subject', label: 'Тема обращения', type: 'text', required: true },
    { id: 'description', label: 'Подробное описание', type: 'textarea', required: true },
    PRIORITY_FIELD,
    ATTACHMENTS_FIELD,
    { id: 'cc', label: 'Кого поставить в копию', type: 'text', placeholder: 'Email через запятую' },
  ],
}

/** Универсальная схема для форм без специфичных полей. */
export function genericSchema(formTitle: string, categoryTitle?: string): FormField[] {
  return [
    {
      id: 'notice',
      label: '',
      type: 'info',
      content: `Опишите ваш запрос «${formTitle}» как можно подробнее${
        categoryTitle ? ` — заявка будет направлена в раздел «${categoryTitle}»` : ''
      }. Это ускорит обработку.`,
    },
    {
      id: 'description',
      label: 'Описание запроса',
      type: 'textarea',
      required: true,
      placeholder: 'Что нужно сделать и почему это важно',
    },
    PRIORITY_FIELD,
    {
      id: 'dueDate',
      label: 'Желаемый срок выполнения',
      type: 'date',
    },
    ATTACHMENTS_FIELD,
    {
      id: 'comment',
      label: 'Дополнительный комментарий',
      type: 'textarea',
    },
  ]
}

export function getFormFields(formId: string, formTitle: string, categoryTitle?: string): FormField[] {
  return formSchemas[formId] ?? genericSchema(formTitle, categoryTitle)
}
