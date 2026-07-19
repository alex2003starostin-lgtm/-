import {
  Laptop2,
  Repeat,
  Users,
  Building2,
  ShieldCheck,
  Landmark,
  PackageSearch,
  Tags,
  SearchCheck,
  BarChart3,
  Scale,
  HelpCircle,
  Settings2,
  Video,
  KanbanSquare,
  Armchair,
  KeyRound,
  AlertTriangle,
  LogOut,
  Download,
  MessageCircleQuestion,
  Copy,
  Bug,
  ClipboardList,
  FileSignature,
  FileQuestion,
  FileX,
  FileCheck2,
  Cloud,
  Database,
  Activity,
  Server,
  Network,
  Layers,
  Plug,
  MailPlus,
  UserPlus,
  HeartPulse,
  TrendingUp,
  FileText,
  Receipt,
  IdCard,
  UserCheck,
  Truck,
  Smartphone,
  PenTool,
  Wrench,
  BellRing,
  Plane,
  Stamp,
  Languages,
  Mic,
  Route,
  FileWarning,
  Usb,
  Globe,
  PlayCircle,
  MailX,
  MailQuestion,
  Paperclip,
  PlugZap,
  Send,
  FileBarChart,
  Barcode,
  UserCog,
  Hash,
  RefreshCw,
  Store,
  Edit3,
  FilePlus2,
  UploadCloud,
  GraduationCap,
  UserSearch,
  Handshake,
  Ship,
  MessageSquarePlus,
} from 'lucide-react'
import type { Department } from './types'

export const departments: Department[] = [
  {
    id: 'it',
    title: 'ИТ',
    description: 'Техподдержка, доступы, 1С, ЭЦП/ЭДО и ИТ-инфраструктура',
    icon: Laptop2,
    color: '#0071e3',
    directForms: [
      {
        id: 'it-change-request',
        title: 'Заявка на изменение',
        description: 'Запрос на изменение существующего функционала ИТ-систем',
        icon: Settings2,
      },
      {
        id: 'it-video',
        title: 'Видеонаблюдение',
        description: 'Доступ к архиву, настройка камер и другие вопросы по видеонаблюдению',
        icon: Video,
      },
      {
        id: 'it-yandex-tracker',
        title: 'Доработка Yandex Tracker',
        description: 'Доработка и настройка Yandex Tracker',
        icon: KanbanSquare,
        disabled: true,
        disabledNote: 'Раздел временно не используется',
      },
    ],
    categories: [
      {
        id: 'it-support',
        title: 'Техническая поддержка',
        forms: [
          {
            id: 'it-workplace',
            title: 'Организация рабочего места',
            description: 'Подготовка рабочего места для нового сотрудника или переезда: техника, доступы, ПО',
            icon: Armchair,
          },
          {
            id: 'it-access',
            title: 'Предоставление доступов',
            description: 'Запрос, расширение или отзыв доступа к информационным системам и ресурсам',
            icon: KeyRound,
          },
          {
            id: 'it-incident',
            title: 'Решение технических проблем',
            description: 'Не работает техника, программа или сеть — сообщите о проблеме, и мы её устраним',
            icon: AlertTriangle,
          },
          {
            id: 'it-offboarding',
            title: 'Сдача техники при увольнении',
            description: 'Возврат корпоративной техники и оборудования при увольнении сотрудника',
            icon: LogOut,
          },
          {
            id: 'it-software',
            title: 'Установить программное обеспечение',
            description: 'Установка или обновление программного обеспечения на рабочий компьютер',
            icon: Download,
          },
          {
            id: 'it-consult',
            title: 'Консультация',
            description: 'Получить консультацию специалиста техподдержки по любому ИТ-вопросу',
            icon: MessageCircleQuestion,
          },
        ],
      },
      {
        id: 'it-1c',
        title: 'Техническая поддержка 1С',
        forms: [
          {
            id: 'it-1c-access',
            title: 'Получить или скорректировать доступ',
            description: 'Запрос или изменение прав доступа в системах 1С',
            icon: KeyRound,
          },
          {
            id: 'it-1c-consult',
            title: 'Получить консультацию (1С)',
            description: 'Консультация по работе с 1С',
            icon: MessageCircleQuestion,
          },
          {
            id: 'it-1c-copies',
            title: 'Работа с копиями баз 1С',
            description: 'Создание, обновление или предоставление копии базы 1С',
            icon: Copy,
          },
          {
            id: 'it-1c-errors',
            title: 'Устранить ошибки (1С)',
            description: 'Сообщить об ошибке в работе 1С для её устранения',
            icon: Bug,
          },
          {
            id: 'it-1c-registration',
            title: 'Регистрация проблемы',
            description: 'Зарегистрировать проблему в 1С для передачи в обработку',
            icon: ClipboardList,
          },
          {
            id: 'it-1c-dopp',
            title: 'Ошибка ДОПП',
            description: 'Сообщить об ошибке в модуле ДОПП',
            icon: Bug,
          },
        ],
      },
      {
        id: 'it-edo',
        title: 'ЭЦП и ЭДО',
        forms: [
          {
            id: 'it-edo-issue',
            title: 'Выпуск ЭЦП / подключение ЭДО',
            description: 'Получение электронной подписи или подключение к электронному документообороту',
            icon: FileSignature,
          },
          {
            id: 'it-edo-rights',
            title: 'Изменение прав доступа к сервису ЭДО',
            description: 'Изменение прав пользователя в сервисе ЭДО',
            icon: KeyRound,
          },
          {
            id: 'it-edo-other',
            title: 'Иное ЭЦП/ЭДО',
            description: 'Другие вопросы, связанные с ЭЦП или ЭДО',
            icon: FileQuestion,
          },
          {
            id: 'it-edo-revoke',
            title: 'Отзыв электронной подписи',
            description: 'Отзыв (аннулирование) действующей электронной подписи',
            icon: FileX,
          },
          {
            id: 'it-edo-problem',
            title: 'Проблемы в работе ключа ЭЦП или сервиса ЭДО',
            description: 'Не работает ключ ЭЦП или сервис ЭДО — сообщите о проблеме',
            icon: AlertTriangle,
          },
          {
            id: 'it-edo-mchd',
            title: 'Консультация при создании МЧД доверенности',
            description: 'Помощь при оформлении машиночитаемой доверенности (МЧД)',
            icon: FileCheck2,
          },
        ],
      },
      {
        id: 'it-rc',
        title: 'Техническая поддержка РЦ',
        forms: [
          {
            id: 'it-rc-consult',
            title: 'Консультация РЦ',
            description: 'Консультация по вопросам работы распределительного центра',
            icon: MessageCircleQuestion,
          },
          {
            id: 'it-rc-problem',
            title: 'Решение проблем РЦ',
            description: 'Сообщить о технической проблеме в распределительном центре',
            icon: AlertTriangle,
          },
        ],
      },
      {
        id: 'it-logos',
        title: 'ИС ЛОГОС',
        forms: [
          {
            id: 'it-logos-consult',
            title: 'Консультация по работе в ИС',
            description: 'Консультация по работе в информационной системе ЛОГОС',
            icon: MessageCircleQuestion,
          },
          {
            id: 'it-logos-access',
            title: 'Получить/скорректировать доступ',
            description: 'Запрос или изменение доступа в ИС ЛОГОС',
            icon: KeyRound,
          },
          {
            id: 'it-logos-error',
            title: 'Устранить ошибку',
            description: 'Сообщить об ошибке в работе ИС ЛОГОС',
            icon: Bug,
          },
        ],
      },
      {
        id: 'it-infra',
        title: 'ИТ Инфраструктура',
        forms: [
          {
            id: 'it-infra-s3',
            title: 'Новый S3 bucket',
            description: 'Запрос на создание нового хранилища S3',
            icon: Cloud,
          },
          {
            id: 'it-infra-db',
            title: 'Новая база данных',
            description: 'Запрос на создание новой базы данных',
            icon: Database,
          },
          {
            id: 'it-infra-change',
            title: 'Запрос на изменение',
            description: 'Изменение существующей ИТ-инфраструктуры',
            icon: Settings2,
          },
          {
            id: 'it-infra-monitoring',
            title: 'Мониторинг',
            description: 'Настройка мониторинга сервиса или инфраструктуры',
            icon: Activity,
          },
          {
            id: 'it-infra-vm',
            title: 'Новая виртуальная машина',
            description: 'Запрос на создание новой виртуальной машины',
            icon: Server,
          },
          {
            id: 'it-infra-network',
            title: 'Предоставление сетевых доступов',
            description: 'Запрос на доступ к сетевым ресурсам',
            icon: Network,
          },
          {
            id: 'it-infra-business-service',
            title: 'Новый бизнес-сервис',
            description: 'Запрос на разворачивание нового бизнес-сервиса',
            icon: Layers,
          },
        ],
      },
      {
        id: 'it-aps',
        title: 'APS. Управление закупками',
        forms: [
          {
            id: 'it-aps-consult',
            title: 'Консультация по работе в APS',
            description: 'Консультация по работе в системе управления закупками APS',
            icon: MessageCircleQuestion,
            disabled: true,
            disabledNote: 'Раздел временно не используется',
          },
          {
            id: 'it-aps-errors',
            title: 'Устранить ошибки',
            description: 'Сообщить об ошибке в системе APS',
            icon: Bug,
            disabled: true,
            disabledNote: 'Раздел временно не используется',
          },
        ],
      },
    ],
  },
  {
    id: 'edi',
    title: 'EDI/ЭДО',
    description: 'Электронный обмен документами с контрагентами (EDI) и Диадок',
    icon: Repeat,
    color: '#ff9500',
    categories: [],
    directForms: [
      {
        id: 'edi-consult',
        title: 'Консультация EDI / Диадок',
        description: 'Консультация по работе с EDI или Диадок',
        icon: MessageCircleQuestion,
      },
      {
        id: 'edi-connect',
        title: 'Подключить EDI / эУПД на новую ТС',
        description: 'Подключение EDI или электронной УПД для новой торговой точки',
        icon: Plug,
      },
      {
        id: 'edi-invite',
        title: 'Принять / отправить приглашение в Диадок',
        description: 'Обработка приглашений в системе электронного документооборота Диадок',
        icon: MailPlus,
      },
    ],
  },
  {
    id: 'hr',
    title: 'HR',
    description: 'Кадровые вопросы, льготы и подбор персонала',
    icon: Users,
    color: '#ff2d55',
    categories: [],
    directForms: [
      {
        id: 'hr-referral',
        title: 'Приведи друга',
        description: 'Порекомендовать кандидата на открытую вакансию',
        icon: UserPlus,
      },
      {
        id: 'hr-dms',
        title: 'ДМС',
        description: 'Вопросы по полису добровольного медицинского страхования',
        icon: HeartPulse,
      },
      {
        id: 'hr-recruitment',
        title: 'Заявка на подбор',
        description: 'Запрос на подбор нового сотрудника',
        icon: Users,
      },
      {
        id: 'hr-motivation',
        title: 'Изменение мотивации',
        description: 'Запрос на изменение системы мотивации сотрудника',
        icon: TrendingUp,
      },
      {
        id: 'hr-docs',
        title: 'Получение копий кадровых документов',
        description: 'Заказать копии трудовых и кадровых документов',
        icon: FileText,
      },
      {
        id: 'hr-income',
        title: 'Получение справки о доходах',
        description: 'Заказать справку о доходах (2-НДФЛ и другие)',
        icon: Receipt,
      },
    ],
  },
  {
    id: 'axo',
    title: 'АХО',
    description: 'Административно-хозяйственное обеспечение: офис, транспорт, тревел',
    icon: Building2,
    color: '#34c759',
    directForms: [
      {
        id: 'axo-cards',
        title: 'Заказ визиток',
        description: 'Заказ визитных карточек сотрудника',
        icon: IdCard,
      },
      {
        id: 'axo-guest-pass',
        title: 'Заказ гостевого пропуска',
        description: 'Оформление пропуска для гостя или посетителя',
        icon: UserCheck,
      },
      {
        id: 'axo-courier',
        title: 'Курьерская доставка',
        description: 'Заказ курьерской доставки документов или посылки',
        icon: Truck,
      },
      {
        id: 'axo-mobile',
        title: 'Мобильная связь',
        description: 'Вопросы по корпоративной мобильной связи',
        icon: Smartphone,
      },
      {
        id: 'axo-stationery',
        title: 'Получение канцелярии',
        description: 'Заказ канцелярских принадлежностей',
        icon: PenTool,
      },
      {
        id: 'axo-office',
        title: 'Эксплуатация офиса',
        description: 'Вопросы по эксплуатации офисного помещения: ремонт, мебель, климат',
        icon: Wrench,
      },
      {
        id: 'axo-concierge',
        title: 'Консьерж-Сервис',
        description: 'Персональные бытовые поручения через консьерж-сервис',
        icon: BellRing,
      },
    ],
    categories: [
      {
        id: 'axo-travel',
        title: 'Тревел поддержка',
        forms: [
          {
            id: 'axo-travel-kmr',
            title: 'Доступ к платформе КМР',
            description: 'Получить доступ к платформе для бронирования командировок КМР',
            icon: Plane,
          },
          {
            id: 'axo-travel-visa',
            title: 'Запрос на визу',
            description: 'Оформление визы для командировки',
            icon: Stamp,
          },
        ],
      },
      {
        id: 'axo-translation',
        title: 'Переводчики',
        forms: [
          {
            id: 'axo-translation-written',
            title: 'Письменный перевод',
            description: 'Заказ письменного перевода документов',
            icon: Languages,
          },
          {
            id: 'axo-translation-oral',
            title: 'Устный перевод',
            description: 'Заказ устного перевода (переговоры, встречи)',
            icon: Mic,
          },
        ],
      },
    ],
  },
  {
    id: 'ib',
    title: 'ИБ',
    description: 'Информационная безопасность: устройства, почта, веб-ресурсы',
    icon: ShieldCheck,
    color: '#ff3b30',
    directForms: [
      {
        id: 'ib-consult',
        title: 'Консультация',
        description: 'Консультация по вопросам информационной безопасности',
        icon: MessageCircleQuestion,
      },
    ],
    categories: [
      {
        id: 'ib-endpoint',
        title: 'Защита конечных устройств',
        forms: [
          {
            id: 'ib-endpoint-proxy',
            title: 'Добавить исключение на прокси',
            description: 'Добавить сайт в исключения прокси-сервера',
            icon: Route,
          },
          {
            id: 'ib-endpoint-blocked-file',
            title: 'Заблокирован файл',
            description: 'Разблокировать файл, ошибочно заблокированный антивирусом',
            icon: FileWarning,
          },
          {
            id: 'ib-endpoint-usb',
            title: 'Открыть доступ к USB накопителю',
            description: 'Разрешить использование USB-накопителя на рабочем компьютере',
            icon: Usb,
          },
          {
            id: 'ib-endpoint-web',
            title: 'Открыть доступ к веб-ресурсу',
            description: 'Разблокировать доступ к заблокированному веб-сайту',
            icon: Globe,
          },
          {
            id: 'ib-endpoint-software',
            title: 'Разрешить запуск ПО',
            description: 'Разрешить запуск программы, заблокированной политикой безопасности',
            icon: PlayCircle,
          },
        ],
      },
      {
        id: 'ib-spam',
        title: 'Защита от спама',
        forms: [
          {
            id: 'ib-spam-allow',
            title: 'Добавить в исключение',
            description: 'Добавить отправителя в белый список',
            icon: ShieldCheck,
          },
          {
            id: 'ib-spam-block',
            title: 'Заблокировать нежелательное письмо',
            description: 'Заблокировать нежелательного отправителя или рассылку',
            icon: MailX,
          },
          {
            id: 'ib-spam-other',
            title: 'Иные вопросы',
            description: 'Другие вопросы по защите от спама',
            icon: MailQuestion,
          },
          {
            id: 'ib-spam-missing-attachment',
            title: 'Отсутствует вложение',
            description: 'Сообщить, что вложение письма было удалено фильтром безопасности',
            icon: Paperclip,
          },
        ],
      },
      {
        id: 'ib-web',
        title: 'Защита веб-ресурса',
        forms: [
          {
            id: 'ib-web-exceptions',
            title: 'Настройка исключений',
            description: 'Настройка исключений для защиты веб-ресурса компании',
            icon: ShieldCheck,
          },
          {
            id: 'ib-web-connect',
            title: 'Подключение нового ресурса',
            description: 'Подключить новый веб-ресурс под защиту',
            icon: PlugZap,
          },
        ],
      },
    ],
  },
  {
    id: 'treasury',
    title: 'Казначейство',
    description: 'Банковские операции, платежи и валютный контроль',
    icon: Landmark,
    color: '#ffcc00',
    directForms: [],
    categories: [
      {
        id: 'treasury-banks',
        title: 'Банки',
        forms: [
          {
            id: 'treasury-swift-rub',
            title: 'Рубли | Получение СВИФТ',
            description: 'Получить СВИФТ-сообщение по рублёвому платежу',
            icon: Send,
          },
          {
            id: 'treasury-payment-rub',
            title: 'Рубли | Получить платежку',
            description: 'Получить копию платёжного поручения в рублях',
            icon: Receipt,
          },
          {
            id: 'treasury-swift-fx',
            title: 'Валюта | Получение СВИФТ',
            description: 'Получить СВИФТ-сообщение по валютному платежу',
            icon: Send,
          },
          {
            id: 'treasury-payment-fx',
            title: 'Валюта | Получить платежку',
            description: 'Получить копию платёжного поручения в валюте',
            icon: Receipt,
          },
          {
            id: 'treasury-vbk',
            title: 'Запрос ВБК',
            description: 'Запрос ведомости банковского контроля',
            icon: FileBarChart,
          },
          {
            id: 'treasury-contract',
            title: 'Консультация | Заключение контракта',
            description: 'Консультация по заключению банковского контракта',
            icon: FileSignature,
          },
          {
            id: 'treasury-new-bank',
            title: 'Создание банков',
            description: 'Запрос на открытие счёта в новом банке',
            icon: Landmark,
          },
        ],
      },
    ],
  },
  {
    id: 'tnved',
    title: 'ТН ВЭД',
    description: 'Определение кодов товарной номенклатуры внешнеэкономической деятельности',
    icon: PackageSearch,
    color: '#5856d6',
    categories: [],
    directForms: [
      {
        id: 'tnved-codes',
        title: 'Определение кодов',
        description: 'Определение кода ТН ВЭД для товара',
        icon: Barcode,
      },
    ],
  },
  {
    id: 'okus',
    title: 'ОКУС',
    description: 'Кодировка и согласование договоров, контрагентов и товаров',
    icon: Tags,
    color: '#30b0c7',
    directForms: [],
    categories: [
      {
        id: 'okus-contracts',
        title: 'Кодировка договоров и контрагентов',
        forms: [
          {
            id: 'okus-contracts-managers',
            title: 'Изменение руководителей/менеджеров по продажам',
            description: 'Изменение ответственных менеджеров в договоре или контрагенте',
            icon: UserCog,
          },
          {
            id: 'okus-contracts-coding',
            title: 'Кодировка',
            description: 'Кодировка нового договора или контрагента',
            icon: Hash,
          },
          {
            id: 'okus-contracts-consult',
            title: 'Консультация',
            description: 'Консультация по кодировке договоров и контрагентов',
            icon: MessageCircleQuestion,
          },
          {
            id: 'okus-contracts-dms',
            title: 'Первичное/Повторное согласование в DMS',
            description: 'Согласование договора в системе DMS',
            icon: FileCheck2,
          },
          {
            id: 'okus-contracts-do-repeat',
            title: 'Повторное согласование в ДО',
            description: 'Повторное согласование договора в ДО',
            icon: RefreshCw,
          },
          {
            id: 'okus-contracts-eg',
            title: 'Только для ЭГ: Согласование в ДО Первичное/Повторное',
            description: 'Согласование в ДО для сотрудников ЭГ',
            icon: FileCheck2,
          },
          {
            id: 'okus-contracts-outlet',
            title: 'Создание, изменение торговой точки или склада',
            description: 'Создание или изменение торговой точки/склада в системе',
            icon: Store,
          },
        ],
      },
      {
        id: 'okus-goods',
        title: 'Кодировка и корректировка товара',
        forms: [
          {
            id: 'okus-goods-coding',
            title: 'Кодировка',
            description: 'Кодировка нового товара',
            icon: Hash,
          },
          {
            id: 'okus-goods-consult',
            title: 'Консультация',
            description: 'Консультация по кодировке товара',
            icon: MessageCircleQuestion,
          },
          {
            id: 'okus-goods-correction',
            title: 'Корректировка',
            description: 'Корректировка данных по товару',
            icon: Edit3,
          },
        ],
      },
    ],
  },
  {
    id: 'tm-check',
    title: 'Проверка ТМ',
    description: 'Проверка товарных знаков перед использованием',
    icon: SearchCheck,
    color: '#af52de',
    categories: [],
    directForms: [
      {
        id: 'tm-check-form',
        title: 'Проверка товарного знака',
        description: 'Проверить товарный знак перед использованием',
        icon: SearchCheck,
      },
    ],
  },
  {
    id: 'dwh-bi',
    title: 'DWH\\BI',
    description: 'Хранилище данных, отчётность и бизнес-аналитика',
    icon: BarChart3,
    color: '#00c7be',
    categories: [],
    directForms: [
      {
        id: 'dwh-access',
        title: 'Предоставление доступа',
        description: 'Запрос доступа к DWH или BI-инструментам',
        icon: KeyRound,
      },
      {
        id: 'dwh-new-report',
        title: 'Разработка нового отчета',
        description: 'Заказ разработки нового отчёта',
        icon: FilePlus2,
      },
      {
        id: 'dwh-load',
        title: 'Загрузка данных в DWH',
        description: 'Загрузка новых данных в хранилище',
        icon: UploadCloud,
      },
      {
        id: 'dwh-refine',
        title: 'Доработка отчета',
        description: 'Доработка существующего отчёта',
        icon: Edit3,
      },
      {
        id: 'dwh-consult',
        title: 'Консультация по BI',
        description: 'Консультация по инструментам бизнес-аналитики',
        icon: MessageCircleQuestion,
      },
      {
        id: 'dwh-integration',
        title: 'Настройка интеграции',
        description: 'Настройка интеграции с DWH/BI',
        icon: Plug,
      },
      {
        id: 'dwh-training',
        title: 'Обучение пользователей',
        description: 'Обучение работе с отчётами и BI-инструментами',
        icon: GraduationCap,
      },
      {
        id: 'dwh-bug',
        title: 'Сообщить об ошибке',
        description: 'Сообщить об ошибке в отчёте или данных',
        icon: Bug,
      },
      {
        id: 'dwh-replication',
        title: 'Заказ на репликацию данных',
        description: 'Заказ репликации данных между системами',
        icon: RefreshCw,
      },
      {
        id: 'dwh-other',
        title: 'Другой запрос',
        description: 'Другой запрос, не подходящий под остальные категории',
        icon: HelpCircle,
      },
    ],
  },
  {
    id: 'legal',
    title: 'Юристы и комплаенс',
    description: 'Юридическое сопровождение и санкционный комплаенс',
    icon: Scale,
    color: '#a2845e',
    directForms: [
      {
        id: 'legal-service',
        title: 'Юридический сервис',
        description: 'Получить юридическую консультацию или поддержку',
        icon: Scale,
      },
    ],
    categories: [
      {
        id: 'legal-sanctions',
        title: 'Санкционный комплаенс',
        forms: [
          {
            id: 'legal-sanctions-db',
            title: 'Согласование СК в базе данных',
            description: 'Согласование санкционного комплаенса в базе данных',
            icon: Database,
          },
          {
            id: 'legal-sanctions-nkz',
            title: 'Согласование СК по НКЗ',
            description: 'Согласование санкционного комплаенса по НКЗ',
            icon: FileCheck2,
          },
          {
            id: 'legal-sanctions-kyc-ka',
            title: 'Заполнение KYC анкеты по запросу КА',
            description: 'Заполнение анкеты KYC по запросу контрагента',
            icon: UserSearch,
          },
          {
            id: 'legal-sanctions-agent',
            title: 'Согласование платежного агента',
            description: 'Согласование платёжного агента на предмет санкций',
            icon: Handshake,
          },
          {
            id: 'legal-sanctions-goods',
            title: 'Проверка товара на санкции',
            description: 'Проверить товар на предмет санкционных ограничений',
            icon: PackageSearch,
          },
          {
            id: 'legal-sanctions-vessel',
            title: 'Проверка перевозки на судне',
            description: 'Проверить судно и маршрут перевозки на санкции',
            icon: Ship,
          },
          {
            id: 'legal-sanctions-kyc-group',
            title: 'Заполнение KYC анкеты для обеспечения деятельности группы компаний',
            description: 'Заполнение анкеты KYC для группы компаний',
            icon: Users,
          },
          {
            id: 'legal-sanctions-ubo',
            title: 'Запрос по предоставлению ПД по UBO / ГД',
            description: 'Запрос персональных данных по UBO или генеральному директору',
            icon: UserSearch,
          },
        ],
      },
    ],
  },
  {
    id: 'other',
    title: 'Прочие услуги',
    description: 'Не нашли подходящую категорию? Опишите ваш запрос в свободной форме',
    icon: HelpCircle,
    color: '#8e8e93',
    categories: [],
    directForms: [
      {
        id: 'other-freeform',
        title: 'Свободная форма',
        description: 'Свободная форма для запросов, не подходящих под другие категории',
        icon: MessageSquarePlus,
      },
    ],
  },
]

export function findFormLocation(formId: string) {
  for (const department of departments) {
    for (const form of department.directForms) {
      if (form.id === formId) return { department, category: undefined, form }
    }
    for (const category of department.categories) {
      for (const form of category.forms) {
        if (form.id === formId) return { department, category, form }
      }
    }
  }
  return null
}

export function allSearchableForms() {
  const result: { form: (typeof departments)[number]['directForms'][number]; department: Department; category?: Department['categories'][number] }[] = []
  for (const department of departments) {
    for (const form of department.directForms) {
      result.push({ form, department })
    }
    for (const category of department.categories) {
      for (const form of category.forms) {
        result.push({ form, department, category })
      }
    }
  }
  return result
}

export function totalFormsCount() {
  return allSearchableForms().length
}
