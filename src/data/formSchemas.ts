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

/** Детальные схемы для пилотных форм — остальные используют универсальный движок. */
export const formSchemas: Record<string, FormField[]> = {
  'it-workplace': [
    {
      id: 'reason',
      label: 'Повод',
      type: 'select',
      required: true,
      options: [
        { value: 'new-hire', label: 'Новый сотрудник' },
        { value: 'relocation', label: 'Переезд / смена места' },
        { value: 'extra-equipment', label: 'Дополнительное оборудование' },
      ],
    },
    { id: 'employeeName', label: 'ФИО сотрудника', type: 'text', required: true },
    { id: 'employeeDepartment', label: 'Отдел сотрудника', type: 'text', required: true },
    { id: 'neededByDate', label: 'Нужно подготовить к', type: 'date', required: true },
    {
      id: 'office',
      label: 'Офис / локация',
      type: 'select',
      required: true,
      options: [
        { value: 'hq', label: 'Головной офис' },
        { value: 'warehouse', label: 'Склад / РЦ' },
        { value: 'remote', label: 'Удалённо' },
      ],
    },
    {
      id: 'equipment',
      label: 'Необходимое оборудование',
      type: 'multiselect',
      options: [
        { value: 'laptop', label: 'Ноутбук' },
        { value: 'monitor', label: 'Монитор' },
        { value: 'headset', label: 'Гарнитура' },
        { value: 'ip-phone', label: 'IP-телефон' },
        { value: 'dock', label: 'Док-станция' },
      ],
    },
    { id: 'comment', label: 'Комментарий', type: 'textarea', placeholder: 'Дополнительные пожелания' },
    PRIORITY_FIELD,
  ],

  'it-access': [
    { id: 'system', label: 'Система или ресурс', type: 'text', required: true, placeholder: 'Например, 1С, CRM, файловый сервер' },
    {
      id: 'accessType',
      label: 'Тип запроса',
      type: 'radio',
      required: true,
      options: [
        { value: 'new', label: 'Новый доступ' },
        { value: 'extend', label: 'Расширение прав' },
        { value: 'revoke', label: 'Отзыв доступа' },
      ],
    },
    { id: 'justification', label: 'Обоснование', type: 'textarea', required: true },
    { id: 'expiryDate', label: 'Срок действия доступа', type: 'date', helpText: 'Оставьте пустым, если доступ бессрочный' },
    { id: 'managerApproval', label: 'Согласовано с руководителем', type: 'checkbox' },
    PRIORITY_FIELD,
  ],

  'it-incident': [
    {
      id: 'affected',
      label: 'Что не работает',
      type: 'select',
      required: true,
      options: [
        { value: 'hardware', label: 'Техника' },
        { value: 'software', label: 'Программа' },
        { value: 'network', label: 'Сеть / интернет' },
        { value: 'other', label: 'Другое' },
      ],
    },
    { id: 'description', label: 'Описание проблемы', type: 'textarea', required: true, placeholder: 'Что именно происходит, когда началось' },
    { id: 'startedAt', label: 'Когда началось', type: 'date' },
    {
      id: 'severity',
      label: 'Критичность',
      type: 'radio',
      required: true,
      options: [
        { value: 'blocking', label: 'Критично — не могу работать' },
        { value: 'medium', label: 'Средне — мешает, но работать можно' },
        { value: 'low', label: 'Низко — не срочно' },
      ],
    },
    ATTACHMENTS_FIELD,
  ],

  'it-offboarding': [
    { id: 'employeeName', label: 'ФИО сотрудника', type: 'text', required: true },
    { id: 'lastDay', label: 'Дата увольнения', type: 'date', required: true },
    {
      id: 'equipment',
      label: 'Техника к сдаче',
      type: 'multiselect',
      required: true,
      options: [
        { value: 'laptop', label: 'Ноутбук' },
        { value: 'monitor', label: 'Монитор' },
        { value: 'phone', label: 'Телефон' },
        { value: 'dock', label: 'Док-станция' },
        { value: 'headset', label: 'Гарнитура' },
        { value: 'token', label: 'Токен ЭЦП' },
      ],
    },
    { id: 'condition', label: 'Состояние техники', type: 'textarea', helpText: 'Укажите видимые повреждения, если есть' },
    { id: 'recipient', label: 'Кому передаётся техника', type: 'text' },
    {
      id: 'notice',
      label: '',
      type: 'info',
      content: 'Технику необходимо сдать в течение 1 рабочего дня после увольнения.',
    },
  ],

  'it-software': [
    { id: 'softwareName', label: 'Название ПО', type: 'text', required: true },
    { id: 'version', label: 'Версия', type: 'text' },
    { id: 'downloadLink', label: 'Ссылка на дистрибутив', type: 'text' },
    { id: 'justification', label: 'Обоснование необходимости', type: 'textarea', required: true },
    { id: 'hasLicense', label: 'Лицензия уже есть', type: 'checkbox' },
    { id: 'assetTag', label: 'Компьютер / инвентарный номер', type: 'text' },
  ],

  'it-consult': [
    { id: 'topic', label: 'Тема вопроса', type: 'text', required: true },
    { id: 'description', label: 'Описание', type: 'textarea', required: true },
    {
      id: 'contactMethod',
      label: 'Как удобнее связаться',
      type: 'radio',
      required: true,
      options: [
        { value: 'call', label: 'Звонок' },
        { value: 'chat', label: 'Чат' },
        { value: 'meeting', label: 'Личная встреча' },
      ],
    },
    { id: 'preferredTime', label: 'Удобное время', type: 'text', placeholder: 'Например, сегодня после 15:00' },
  ],

  'it-edo-issue': [
    {
      id: 'type',
      label: 'Тип запроса',
      type: 'select',
      required: true,
      options: [
        { value: 'kep-individual', label: 'КЭП физического лица' },
        { value: 'kep-legal', label: 'КЭП юридического лица' },
        { value: 'edo', label: 'Подключение ЭДО' },
      ],
    },
    { id: 'employeeName', label: 'ФИО', type: 'text', required: true },
    { id: 'position', label: 'Должность', type: 'text', required: true },
    { id: 'legalEntity', label: 'Юридическое лицо', type: 'text', required: true },
    { id: 'needToken', label: 'Нужен токен Рутокен', type: 'checkbox' },
    PRIORITY_FIELD,
  ],

  'hr-dms': [
    {
      id: 'requestType',
      label: 'Тип обращения',
      type: 'select',
      required: true,
      options: [
        { value: 'connect', label: 'Подключение к ДМС' },
        { value: 'policy-question', label: 'Вопрос по полису' },
        { value: 'add-relative', label: 'Добавление родственника' },
        { value: 'clinic', label: 'Прикрепление к клинике' },
      ],
    },
    { id: 'insuredName', label: 'ФИО застрахованного', type: 'text', required: true },
    { id: 'birthDate', label: 'Дата рождения', type: 'date', required: true },
    { id: 'city', label: 'Город', type: 'text', required: true },
    { id: 'details', label: 'Детали запроса', type: 'textarea' },
  ],

  'hr-recruitment': [
    { id: 'position', label: 'Вакансия / должность', type: 'text', required: true },
    { id: 'department', label: 'Отдел', type: 'text', required: true },
    { id: 'count', label: 'Количество вакансий', type: 'number', required: true },
    {
      id: 'openReason',
      label: 'Причина открытия',
      type: 'radio',
      required: true,
      options: [
        { value: 'new', label: 'Новая позиция' },
        { value: 'replacement', label: 'Замена' },
      ],
    },
    { id: 'grade', label: 'Грейд / уровень', type: 'text' },
    { id: 'salaryRange', label: 'Зарплатная вилка', type: 'text' },
    { id: 'dueDate', label: 'Желаемый срок закрытия', type: 'date' },
    { id: 'requirements', label: 'Требования к кандидату', type: 'textarea', required: true },
  ],

  'axo-cards': [
    { id: 'fullName', label: 'ФИО', type: 'text', required: true },
    { id: 'position', label: 'Должность', type: 'text', required: true },
    { id: 'company', label: 'Компания', type: 'text', required: true },
    { id: 'email', label: 'Email', type: 'text', required: true },
    { id: 'phone', label: 'Телефон', type: 'text' },
    { id: 'quantity', label: 'Тираж, шт', type: 'number', required: true },
    { id: 'hasLayout', label: 'Макет уже есть', type: 'checkbox' },
  ],

  'axo-courier': [
    { id: 'from', label: 'Откуда забрать', type: 'text', required: true },
    { id: 'to', label: 'Куда доставить', type: 'text', required: true },
    { id: 'contents', label: 'Что нужно доставить', type: 'textarea', required: true },
    { id: 'dateTime', label: 'Дата и время', type: 'date', required: true },
    { id: 'urgent', label: 'Срочная доставка', type: 'checkbox' },
    { id: 'contactPhone', label: 'Контактный телефон', type: 'text', required: true },
  ],

  'axo-mobile': [
    {
      id: 'requestType',
      label: 'Тип обращения',
      type: 'select',
      required: true,
      options: [
        { value: 'new-sim', label: 'Новая SIM-карта' },
        { value: 'replace', label: 'Замена SIM-карты' },
        { value: 'limit', label: 'Изменение лимита' },
        { value: 'block', label: 'Блокировка номера' },
      ],
    },
    { id: 'phoneNumber', label: 'Номер телефона', type: 'text' },
    { id: 'justification', label: 'Обоснование', type: 'textarea', required: true },
  ],

  'axo-travel-visa': [
    { id: 'country', label: 'Страна назначения', type: 'text', required: true },
    {
      id: 'purpose',
      label: 'Цель поездки',
      type: 'radio',
      required: true,
      options: [
        { value: 'business', label: 'Командировка' },
        { value: 'personal', label: 'Личная поездка' },
      ],
    },
    { id: 'startDate', label: 'Дата начала поездки', type: 'date', required: true },
    { id: 'endDate', label: 'Дата окончания поездки', type: 'date', required: true },
    { id: 'visaType', label: 'Тип визы', type: 'text' },
    { id: 'passportScan', label: 'Скан паспорта', type: 'file', required: true },
    { id: 'needInvitation', label: 'Нужно пригласительное письмо', type: 'checkbox' },
  ],

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
