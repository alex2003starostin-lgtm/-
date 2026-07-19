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
      },
      {
        id: 'it-video',
        title: 'Видеонаблюдение',
        description: 'Доступ к архиву, настройка камер и другие вопросы по видеонаблюдению',
      },
      {
        id: 'it-yandex-tracker',
        title: 'Доработка Yandex Tracker',
        description: 'Доработка и настройка Yandex Tracker',
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
          },
          {
            id: 'it-access',
            title: 'Предоставление доступов',
            description: 'Запрос, расширение или отзыв доступа к информационным системам и ресурсам',
          },
          {
            id: 'it-incident',
            title: 'Решение технических проблем',
            description: 'Не работает техника, программа или сеть — сообщите о проблеме, и мы её устраним',
          },
          {
            id: 'it-offboarding',
            title: 'Сдача техники при увольнении',
            description: 'Возврат корпоративной техники и оборудования при увольнении сотрудника',
          },
          {
            id: 'it-software',
            title: 'Установить программное обеспечение',
            description: 'Установка или обновление программного обеспечения на рабочий компьютер',
          },
          {
            id: 'it-consult',
            title: 'Консультация',
            description: 'Получить консультацию специалиста техподдержки по любому ИТ-вопросу',
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
          },
          {
            id: 'it-1c-consult',
            title: 'Получить консультацию (1С)',
            description: 'Консультация по работе с 1С',
          },
          {
            id: 'it-1c-copies',
            title: 'Работа с копиями баз 1С',
            description: 'Создание, обновление или предоставление копии базы 1С',
          },
          {
            id: 'it-1c-errors',
            title: 'Устранить ошибки (1С)',
            description: 'Сообщить об ошибке в работе 1С для её устранения',
          },
          {
            id: 'it-1c-registration',
            title: 'Регистрация проблемы',
            description: 'Зарегистрировать проблему в 1С для передачи в обработку',
          },
          {
            id: 'it-1c-dopp',
            title: 'Ошибка ДОПП',
            description: 'Сообщить об ошибке в модуле ДОПП',
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
          },
          {
            id: 'it-edo-rights',
            title: 'Изменение прав доступа к сервису ЭДО',
            description: 'Изменение прав пользователя в сервисе ЭДО',
          },
          {
            id: 'it-edo-other',
            title: 'Иное ЭЦП/ЭДО',
            description: 'Другие вопросы, связанные с ЭЦП или ЭДО',
          },
          {
            id: 'it-edo-revoke',
            title: 'Отзыв электронной подписи',
            description: 'Отзыв (аннулирование) действующей электронной подписи',
          },
          {
            id: 'it-edo-problem',
            title: 'Проблемы в работе ключа ЭЦП или сервиса ЭДО',
            description: 'Не работает ключ ЭЦП или сервис ЭДО — сообщите о проблеме',
          },
          {
            id: 'it-edo-mchd',
            title: 'Консультация при создании МЧД доверенности',
            description: 'Помощь при оформлении машиночитаемой доверенности (МЧД)',
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
          },
          {
            id: 'it-rc-problem',
            title: 'Решение проблем РЦ',
            description: 'Сообщить о технической проблеме в распределительном центре',
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
          },
          {
            id: 'it-logos-access',
            title: 'Получить/скорректировать доступ',
            description: 'Запрос или изменение доступа в ИС ЛОГОС',
          },
          {
            id: 'it-logos-error',
            title: 'Устранить ошибку',
            description: 'Сообщить об ошибке в работе ИС ЛОГОС',
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
          },
          {
            id: 'it-infra-db',
            title: 'Новая база данных',
            description: 'Запрос на создание новой базы данных',
          },
          {
            id: 'it-infra-change',
            title: 'Запрос на изменение',
            description: 'Изменение существующей ИТ-инфраструктуры',
          },
          {
            id: 'it-infra-monitoring',
            title: 'Мониторинг',
            description: 'Настройка мониторинга сервиса или инфраструктуры',
          },
          {
            id: 'it-infra-vm',
            title: 'Новая виртуальная машина',
            description: 'Запрос на создание новой виртуальной машины',
          },
          {
            id: 'it-infra-network',
            title: 'Предоставление сетевых доступов',
            description: 'Запрос на доступ к сетевым ресурсам',
          },
          {
            id: 'it-infra-business-service',
            title: 'Новый бизнес-сервис',
            description: 'Запрос на разворачивание нового бизнес-сервиса',
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
            disabled: true,
            disabledNote: 'Раздел временно не используется',
          },
          {
            id: 'it-aps-errors',
            title: 'Устранить ошибки',
            description: 'Сообщить об ошибке в системе APS',
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
      },
      {
        id: 'edi-connect',
        title: 'Подключить EDI / эУПД на новую ТС',
        description: 'Подключение EDI или электронной УПД для новой торговой точки',
      },
      {
        id: 'edi-invite',
        title: 'Принять / отправить приглашение в Диадок',
        description: 'Обработка приглашений в системе электронного документооборота Диадок',
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
      },
      {
        id: 'hr-dms',
        title: 'ДМС',
        description: 'Вопросы по полису добровольного медицинского страхования',
      },
      {
        id: 'hr-recruitment',
        title: 'Заявка на подбор',
        description: 'Запрос на подбор нового сотрудника',
      },
      {
        id: 'hr-motivation',
        title: 'Изменение мотивации',
        description: 'Запрос на изменение системы мотивации сотрудника',
      },
      {
        id: 'hr-docs',
        title: 'Получение копий кадровых документов',
        description: 'Заказать копии трудовых и кадровых документов',
      },
      {
        id: 'hr-income',
        title: 'Получение справки о доходах',
        description: 'Заказать справку о доходах (2-НДФЛ и другие)',
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
      },
      {
        id: 'axo-guest-pass',
        title: 'Заказ гостевого пропуска',
        description: 'Оформление пропуска для гостя или посетителя',
      },
      {
        id: 'axo-courier',
        title: 'Курьерская доставка',
        description: 'Заказ курьерской доставки документов или посылки',
      },
      {
        id: 'axo-mobile',
        title: 'Мобильная связь',
        description: 'Вопросы по корпоративной мобильной связи',
      },
      {
        id: 'axo-stationery',
        title: 'Получение канцелярии',
        description: 'Заказ канцелярских принадлежностей',
      },
      {
        id: 'axo-office',
        title: 'Эксплуатация офиса',
        description: 'Вопросы по эксплуатации офисного помещения: ремонт, мебель, климат',
      },
      {
        id: 'axo-concierge',
        title: 'Консьерж-Сервис',
        description: 'Персональные бытовые поручения через консьерж-сервис',
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
          },
          {
            id: 'axo-travel-visa',
            title: 'Запрос на визу',
            description: 'Оформление визы для командировки',
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
          },
          {
            id: 'axo-translation-oral',
            title: 'Устный перевод',
            description: 'Заказ устного перевода (переговоры, встречи)',
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
          },
          {
            id: 'ib-endpoint-blocked-file',
            title: 'Заблокирован файл',
            description: 'Разблокировать файл, ошибочно заблокированный антивирусом',
          },
          {
            id: 'ib-endpoint-usb',
            title: 'Открыть доступ к USB накопителю',
            description: 'Разрешить использование USB-накопителя на рабочем компьютере',
          },
          {
            id: 'ib-endpoint-web',
            title: 'Открыть доступ к веб-ресурсу',
            description: 'Разблокировать доступ к заблокированному веб-сайту',
          },
          {
            id: 'ib-endpoint-software',
            title: 'Разрешить запуск ПО',
            description: 'Разрешить запуск программы, заблокированной политикой безопасности',
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
          },
          {
            id: 'ib-spam-block',
            title: 'Заблокировать нежелательное письмо',
            description: 'Заблокировать нежелательного отправителя или рассылку',
          },
          {
            id: 'ib-spam-other',
            title: 'Иные вопросы',
            description: 'Другие вопросы по защите от спама',
          },
          {
            id: 'ib-spam-missing-attachment',
            title: 'Отсутствует вложение',
            description: 'Сообщить, что вложение письма было удалено фильтром безопасности',
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
          },
          {
            id: 'ib-web-connect',
            title: 'Подключение нового ресурса',
            description: 'Подключить новый веб-ресурс под защиту',
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
          },
          {
            id: 'treasury-payment-rub',
            title: 'Рубли | Получить платежку',
            description: 'Получить копию платёжного поручения в рублях',
          },
          {
            id: 'treasury-swift-fx',
            title: 'Валюта | Получение СВИФТ',
            description: 'Получить СВИФТ-сообщение по валютному платежу',
          },
          {
            id: 'treasury-payment-fx',
            title: 'Валюта | Получить платежку',
            description: 'Получить копию платёжного поручения в валюте',
          },
          {
            id: 'treasury-vbk',
            title: 'Запрос ВБК',
            description: 'Запрос ведомости банковского контроля',
          },
          {
            id: 'treasury-contract',
            title: 'Консультация | Заключение контракта',
            description: 'Консультация по заключению банковского контракта',
          },
          {
            id: 'treasury-new-bank',
            title: 'Создание банков',
            description: 'Запрос на открытие счёта в новом банке',
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
          },
          {
            id: 'okus-contracts-coding',
            title: 'Кодировка',
            description: 'Кодировка нового договора или контрагента',
          },
          {
            id: 'okus-contracts-consult',
            title: 'Консультация',
            description: 'Консультация по кодировке договоров и контрагентов',
          },
          {
            id: 'okus-contracts-dms',
            title: 'Первичное/Повторное согласование в DMS',
            description: 'Согласование договора в системе DMS',
          },
          {
            id: 'okus-contracts-do-repeat',
            title: 'Повторное согласование в ДО',
            description: 'Повторное согласование договора в ДО',
          },
          {
            id: 'okus-contracts-eg',
            title: 'Только для ЭГ: Согласование в ДО Первичное/Повторное',
            description: 'Согласование в ДО для сотрудников ЭГ',
          },
          {
            id: 'okus-contracts-outlet',
            title: 'Создание, изменение торговой точки или склада',
            description: 'Создание или изменение торговой точки/склада в системе',
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
          },
          {
            id: 'okus-goods-consult',
            title: 'Консультация',
            description: 'Консультация по кодировке товара',
          },
          {
            id: 'okus-goods-correction',
            title: 'Корректировка',
            description: 'Корректировка данных по товару',
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
      },
      {
        id: 'dwh-new-report',
        title: 'Разработка нового отчета',
        description: 'Заказ разработки нового отчёта',
      },
      {
        id: 'dwh-load',
        title: 'Загрузка данных в DWH',
        description: 'Загрузка новых данных в хранилище',
      },
      {
        id: 'dwh-refine',
        title: 'Доработка отчета',
        description: 'Доработка существующего отчёта',
      },
      {
        id: 'dwh-consult',
        title: 'Консультация по BI',
        description: 'Консультация по инструментам бизнес-аналитики',
      },
      {
        id: 'dwh-integration',
        title: 'Настройка интеграции',
        description: 'Настройка интеграции с DWH/BI',
      },
      {
        id: 'dwh-training',
        title: 'Обучение пользователей',
        description: 'Обучение работе с отчётами и BI-инструментами',
      },
      {
        id: 'dwh-bug',
        title: 'Сообщить об ошибке',
        description: 'Сообщить об ошибке в отчёте или данных',
      },
      {
        id: 'dwh-replication',
        title: 'Заказ на репликацию данных',
        description: 'Заказ репликации данных между системами',
      },
      {
        id: 'dwh-other',
        title: 'Другой запрос',
        description: 'Другой запрос, не подходящий под остальные категории',
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
          },
          {
            id: 'legal-sanctions-nkz',
            title: 'Согласование СК по НКЗ',
            description: 'Согласование санкционного комплаенса по НКЗ',
          },
          {
            id: 'legal-sanctions-kyc-ka',
            title: 'Заполнение KYC анкеты по запросу КА',
            description: 'Заполнение анкеты KYC по запросу контрагента',
          },
          {
            id: 'legal-sanctions-agent',
            title: 'Согласование платежного агента',
            description: 'Согласование платёжного агента на предмет санкций',
          },
          {
            id: 'legal-sanctions-goods',
            title: 'Проверка товара на санкции',
            description: 'Проверить товар на предмет санкционных ограничений',
          },
          {
            id: 'legal-sanctions-vessel',
            title: 'Проверка перевозки на судне',
            description: 'Проверить судно и маршрут перевозки на санкции',
          },
          {
            id: 'legal-sanctions-kyc-group',
            title: 'Заполнение KYC анкеты для обеспечения деятельности группы компаний',
            description: 'Заполнение анкеты KYC для группы компаний',
          },
          {
            id: 'legal-sanctions-ubo',
            title: 'Запрос по предоставлению ПД по UBO / ГД',
            description: 'Запрос персональных данных по UBO или генеральному директору',
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
