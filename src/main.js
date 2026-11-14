
import './style.css';

const asset = (name) => `/images/${encodeURIComponent(name)}`;

const el = (tag, className, content) => {
  const node = document.createElement(tag);

  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;

  return node;
};

// SVG-иконки мобильного меню
const icon = (name, className = '') => {
  const paths = {
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>'
  };

  const svg = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );

  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('class', className);
  svg.innerHTML = paths[name] || '';

  return svg;
};

// Кнопки первого экрана
const linkButton = (label, href, variant = 'primary') => {
  const link = el('a', `button button--${variant}`);
  link.href = href;

  const text = el('span', 'button__text', label);
  const iconWrap = el('span', 'button__icon');
  const arrow = el('img', 'button__arrow');

  arrow.src = asset(
    variant === 'ghost'
      ? 'arrow_white.svg'
      : 'arrow_blue.svg'
  );

  arrow.alt = '';
  arrow.setAttribute('aria-hidden', 'true');

  iconWrap.append(arrow);
  link.append(text, iconWrap);

  return link;
};

// Шапка сайта
const header = () => {
  const root = el('header', 'site-header');
  const inner = el('div', 'site-header__inner container');

  const brand = el('a', 'brand');
  brand.href = '#home';
  brand.setAttribute('aria-label', 'AI-Sana — на главную');

  const logo = el('img', 'brand__logo');
  logo.src = asset('logo.svg');
  logo.alt = 'AI-Sana';

  brand.append(logo);

  const links = [
    ['Об AI-Sana', '#about'],
    ['Направления', '#directions'],
    ['Все проекты', '#projects'],
    ['Этапы', '#stages'],
    ['Контакты', '#contacts']
  ];

  const nav = el('nav', 'nav');
  nav.id = 'site-nav';
  nav.setAttribute('aria-label', 'Основная навигация');

  links.forEach(([label, href]) => {
    const link = el('a', 'nav__link', label);
    link.href = href;
    nav.append(link);
  });

  const headerButton = el(
    'a',
    'button button--header',
    'Смотреть проекты'
  );

  headerButton.href = '#projects';
  nav.append(headerButton);

  const toggle = el('button', 'menu-toggle');
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'site-nav');
  toggle.setAttribute('aria-label', 'Открыть меню');
  toggle.append(icon('menu'));

  inner.append(brand, nav, toggle);
  root.append(inner);

  return root;
};

// Первый экран
const hero = () => {
  const section = el('section', 'hero');
  section.id = 'home';

  const content = el(
    'div',
    'hero__content container reveal'
  );

  const title = el('h1', 'hero__title');

  title.innerHTML =
    'AI-Sana технологии,<br>меняющие будущее<br>образования';

  const text = el(
    'p',
    'hero__text',
    'Стратегический проект по внедрению искусственного интеллекта в высшее образование и науку Казахстана.'
  );

  const text2 = el(
    'p',
    'hero__text hero__text--second',
    'Цель — подготовка специалистов для создания и внедрения ИИ-решений в энергетике, агропромышленности, водном хозяйстве и цифровом управлении.'
  );

  const actions = el('div', 'hero__actions');

  actions.append(
    linkButton('Узнать об AI-Sana', '#about'),
    linkButton('Смотреть проекты', '#projects', 'ghost')
  );

  content.append(title, text, text2, actions);
  section.append(content);

  return section;
};

// Направления программы
const directions = [
  [
    'базовыенавыки.svg',
    'Базовые навыки ИИ',
    'Базовые навыки искусственного интеллекта для широкой аудитории.'
  ],
  [
    'углубленноеобучениеъ.svg',
    'Углубленное обучение',
    'Углублённое обучение и предпринимательство на основе искусственного интеллекта.'
  ],
  [
    'бизнесаккелация.svg',
    'Бизнес-акселерация',
    'Акселерация и масштабирование перспективных ИИ-проектов.'
  ]
];

// Блок «О программе»
const about = () => {
  const section = el('section', 'about section');
  section.id = 'about';

  const root = el('div', 'container about__container');

  const left = el('div', 'about__left');
  const eyebrow = el('p', 'eyebrow reveal', 'О программе');
  const heading = el('div', 'about__head reveal');

  heading.append(
    el('h2', 'section-title', 'Что такое AI-Sana'),
    el(
      'h3',
      'section-title section-title--right',
      'Основные направления AI-Sana'
    )
  );

  const aboutIntro = el(
    'p',
    'about__intro reveal',
    'Программа AI-Sana направлена на развитие компетенций в области искусственного интеллекта, подготовку специалистов и поддержку инновационных проектов.'
  );

  const list = el('div', 'directions');
  list.id = 'directions';

  directions.forEach(([iconName, title, text], index) => {
    const card = el('article', 'direction reveal');

    card.style.setProperty(
      '--delay',
      `${index * 90}ms`
    );

    const imageWrap = el('div', 'direction__icon');
    const image = el('img');

    image.src = asset(iconName);
    image.alt = '';

    imageWrap.append(image);

    const copy = el('div', 'direction__copy');

    copy.append(
      el('h3', 'direction__title', title),
      el('p', 'direction__text', text)
    );

    card.append(imageWrap, copy);
    list.append(card);
  });

  left.append(eyebrow, heading, list);

  const right = el('div', 'about__right');

  const description = el(
    'p',
    'about__description reveal',
    'AI-Sana объединяет науку, образование и технологии, вдохновляя на новые открытия. Платформа открывает возможности для инноваций и создания будущего.'
  );

  const visual = el('div', 'about__visual');
  const image = el('img');

  image.src = asset('aisanaprogram.jpg');
  image.alt = 'Программа AI-Sana';

  visual.append(image);
  right.append(description, visual);

  root.append(left, right);
  section.append(root);

  return section;
};

// Цитата Касым-Жомарта Токаева
const quote = () => {
  const section = el('section', 'quote-section');
  section.id = 'projects';

  const card = el('div', 'quote-card reveal');

  // SVG-кавычки
  const mark = el('div', 'quote-card__mark');
  mark.setAttribute('aria-hidden', 'true');

  const quoteIcon = el('img', 'quote-card__icon');
  quoteIcon.src = asset('тырнакша.svg');
  quoteIcon.alt = '';

  mark.append(quoteIcon);

  const text = el(
    'blockquote',
    'quote-card__text',
    'Отечественные и международные образовательные программы в сфере ИИ-технологий могут внести вклад в укрепление кадрового потенциала нашей страны. Поручаю Правительству проработать вопрос поэтапной реализации программы AI-Sana для подготовки специалистов в области искусственного интеллекта. Программа должна способствовать формированию динамичной экосистемы, объединяющей обучение, исследования и разработку стартапов. Необходимо использовать опыт акселерации ведущих мировых университетов. Предстоит донести до каждого жителя Казахстана пользу искусственного интеллекта, объяснить, для чего он нужен и как его правильно применять.'
  );

  const footer = el('div', 'quote-card__footer');
  const author = el('div', 'quote-card__author');

  author.append(
    el(
      'strong',
      'quote-card__name',
      'Касым-Жомарт Токаев'
    ),
    el(
      'span',
      'quote-card__role',
      'Президент Республики Казахстан'
    )
  );

  // Круглая фотография с увеличением лица
  const portraitWrap = el(
    'div',
    'quote-card__portrait-wrap'
  );

  const portrait = el('img', 'quote-card__portrait');
  portrait.src = asset('Токаев.jpg');
  portrait.alt = 'Касым-Жомарт Токаев';

  portraitWrap.append(portrait);
  footer.append(author, portraitWrap);

  card.append(mark, text, footer);
  section.append(card);

  return section;
};

// Данные статистики
const statsData = [
  ['12', 'ИИ-проектов КазНМУ'],
  ['5000+', 'студентов старших курсов охвачено'],
  ['до 50%', 'меньше времени на выбор темы'],
  ['30%', 'меньше время ожидания ответа'],
  ['30%', 'меньше времени на перевод'],
  ['20%', 'выше доступность зарубежных источников']
];

// Новый блок статистики по Figma
const stats = () => {
  const section = el('section', 'stats');

  const container = el(
    'div',
    'stats__container container'
  );

  // Заголовок слева
  const intro = el('div', 'stats__intro');

  intro.append(
    el(
      'h2',
      'stats__title',
      'AI-Sana в цифрах'
    ),
    el(
      'p',
      'stats__description',
      'Первые результаты внедрения искусственного интеллекта в образование и науку КазНМУ.'
    )
  );

  // Шесть показателей справа
  const grid = el('div', 'stats__grid');

  statsData.forEach(([value, label], index) => {
    const card = el('article', 'stat reveal');

    card.style.setProperty(
      '--delay',
      `${(index % 3) * 80}ms`
    );

    const number = el('strong', 'stat__number', '0');
    number.dataset.value = value;

    const description = el('p', 'stat__label', label);

    card.append(number, description);
    grid.append(card);
  });

  container.append(intro, grid);
  section.append(container);

  return section;
};

// Собираем страницу

/* =========================================
   КАТАЛОГ ПРОЕКТОВ — GROUNDWORKS
========================================= */

const projectsData = [
  {
    number: '01',
    category: 'Администрирование',
    title: 'ANaMED Info',
    description:
      'Многоязычный веб-ассистент по учебным и рабочим процессам КазНМУ. Отвечает только на основе официальных документов и указывает источник.',
    image: 'project-1.jpg',
    status: 'Готов',
    url: ''
  },
  {
    number: '02',
    category: 'Экзамены и апелляции',
    title: 'ANaMED CARES',
    description:
      'ИИ-агент для независимой оценки результатов вступительных экзаменов и апелляций.',
    image: 'project-2.jpg',
    status: 'В разработке',
    url: ''
  },
  {
    number: '03',
    category: 'Образование',
    title: 'OlympiadPro',
    description:
      'Платформа для проведения онлайн-олимпиад, регистрации участников и автоматизированной оценки результатов.',
    image: 'project-3.jpg',
    status: 'Готов',
    url: ''
  },
  {
    number: '04',
    category: 'Образование',
    title: 'Virtual Microbiology Lab',
    description:
      'Виртуальная лаборатория для практико-ориентированного обучения микробиологии.',
    image: 'project-4.jpg',
    status: 'В разработке',
    url: ''
  }
];

const projects = () => {
  const section = el('section', 'projects-section');
  section.id = 'all-projects';

  const container = el('div', 'projects-container container');

  const heading = el(
    'h2',
    'projects-heading',
    'Все проекты КазНМУ'
  );

  const grid = el('div', 'projects-grid');

  const activateCard = (selectedCard) => {
    grid.querySelectorAll('.project-card').forEach((card) => {
      const active = card === selectedCard;

      card.classList.toggle('is-active', active);

      card.setAttribute(
        'aria-expanded',
        String(active)
      );
    });
  };

  projectsData.forEach((project, index) => {
    const card = el('article', 'project-card');

    card.tabIndex = 0;
    card.setAttribute('aria-expanded', 'false');

    const image = el('img', 'project-card__image');
    image.src = asset(project.image);
    image.alt = '';
    image.loading = 'lazy';

    const number = el(
      'span',
      'project-card__number',
      project.number
    );

    const content = el('div', 'project-card__content');

    const category = el(
      'span',
      'project-card__category',
      project.category
    );

    const title = el(
      'h3',
      'project-card__title',
      project.title
    );

    const description = el(
      'p',
      'project-card__description',
      project.description
    );

    const footer = el('div', 'project-card__footer');

    if (project.url) {
      const button = el(
        'a',
        'project-card__button',
        'Подробнее'
      );

      button.href = project.url;
      footer.append(button);
    } else {
      footer.append(
        el(
          'span',
          'project-card__status',
          project.status
        )
      );
    }

    content.append(
      category,
      title,
      description,
      footer
    );

    card.append(image, number, content);

    card.addEventListener('mouseenter', () => {
      activateCard(card);
    });

    card.addEventListener('focusin', () => {
      activateCard(card);
    });

    card.addEventListener('click', (event) => {
      if (!event.target.closest('a')) {
        activateCard(card);
      }
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        if (event.target !== card) return;
        event.preventDefault();
        activateCard(card);
      }
    });

    grid.append(card);

    // Третья карточка открыта по умолчанию
    if (index === 2) {
      activateCard(card);
    }
  });

  container.append(heading, grid);
  section.append(container);

  return section;
};


/* =========================================
   ЭТАПЫ AI-SANA
========================================= */

const stagesData = [
  {
    number: '01',
    title: 'Обучение',
    description:
      'Базовые навыки искусственного интеллекта для широкой аудитории — студентов, преподавателей и сотрудников.'
  },
  {
    number: '02',
    title: 'Углублённое обучение и предпринимательство',
    description:
      'Продвинутые треки по ИИ и подготовка команд к созданию собственных технологических решений.'
  },
  {
    number: '03',
    title: 'Акселерация',
    description:
      'Поддержка и масштабирование перспективных ИИ-проектов, использование опыта акселерации ведущих университетов.'
  }
];


const stages = () => {
  const section = el('section', 'stages-section');
  section.id = 'stages';

  const container = el('div', 'stages-container container');

  const eyebrow = el('p', 'stages-eyebrow', 'ЭТАПЫ');

  const title = el(
    'h2',
    'stages-title',
    'ПОЭТАПНАЯ РЕАЛИЗАЦИЯ ПРОГРАММЫ'
  );

  const timeline = el('div', 'stages-timeline');

  // Горизонтальная линия
  const line = el('div', 'stages-line');

  // Фиолетовый импульс
  const impulse = el('div', 'stages-impulse');



  timeline.append(line, impulse);

  stagesData.forEach((stage, index) => {
    const item = el('article', 'stage-item');

    item.style.setProperty('--stage-index', index);

    const number = el(
      'span',
      'stage-number',
      stage.number
    );

    const dot = el('span', 'stage-dot');
    dot.setAttribute('aria-hidden', 'true');

    const heading = el(
      'h3',
      'stage-heading',
      stage.title
    );

    const description = el(
      'p',
      'stage-text',
      stage.description
    );

   item.append(dot, number, heading, description);
    timeline.append(item);
  });

  container.append(eyebrow, title, timeline);
  section.append(container);

  return section;
};



/* ==========================================
   КОНТАКТЫ — URBAN STYLE
========================================== */

const contacts = () => {
  const section = el('section', 'contacts-section');
  section.id = 'contacts';

  const container = el('div', 'contacts-container container');

  // Верхняя часть с заголовком
  const heading = el('div', 'contacts-heading');

  const eyebrow = el(
    'p',
    'contacts-eyebrow',
    'КОНТАКТЫ'
  );

  const title = el('h2', 'contacts-title');

  title.innerHTML =
    'ТЕХНОЛОГИИ, КОТОРЫЕ<br>' +
    'ПОМОГАЮТ УЧИТЬСЯ,<br>' +
    'ПРЕПОДАВАТЬ И РАЗВИВАТЬСЯ';

  const description = el(
    'p',
    'contacts-description',
    'Казахский национальный медицинский университет имени С. Д. Асфендиярова'
  );

  const button = el(
    'a',
    'contacts-button',
    'Связаться с нами'
  );

  button.href = 'mailto:it.dep@kaznmu.kz';

  heading.append(
    eyebrow,
    title,
    description,
    button
  );

  // Изометрическая карта
// ==========================================
// КАРТА КАЗНМУ — ПЛАВНАЯ ПОДСВЕТКА КАМПУСА
// ==========================================

const map = el('div', 'contacts-map');

// Оригинальная белая карта
const mapImage = el('img', 'contacts-map__image');

mapImage.src = asset('kaznmu-map.png');
mapImage.alt =
  'Изометрическая карта Казахского национального медицинского университета';

mapImage.loading = 'lazy';

// Вторая карта с фиолетовой подсветкой
const mapGlow = el(
  'img',
  'contacts-map__image contacts-map__glow'
);

mapGlow.src = asset('kaznmu-map-glow.png');
mapGlow.alt = '';
mapGlow.setAttribute('aria-hidden', 'true');
mapGlow.loading = 'lazy';

// Обе карты накладываются друг на друга
// Третья карта — усиленная подсветка
const mapHigh = el(
  'img',
  'contacts-map__image contacts-map__high'
);

mapHigh.src = asset('kaznmu-high.png');
mapHigh.alt = '';
mapHigh.setAttribute('aria-hidden', 'true');
mapHigh.loading = 'lazy';

// Три слоя карты
map.append(mapImage, mapGlow, mapHigh);

  // Контактная информация
  const details = el('div', 'contacts-details');

  const contactItems = [
    {
      label: 'Адрес',
      value: 'г. Алматы, ул. Толе би, 94',
      href: 'https://www.google.com/maps/search/?api=1&query=KazNMU+Almaty'
    },
    {
      label: 'Телефон',
      value: '+7 727 338 70 90',
      href: 'tel:+77273387090'
    },
    {
      label: 'Сайт',
      value: 'www.kaznmu.kz',
      href: 'https://kaznmu.kz'
    },
    {
      label: 'Электронная почта',
      value: 'it.dep@kaznmu.kz',
      href: 'mailto:it.dep@kaznmu.kz'
    }
  ];

  contactItems.forEach((item) => {
    const contact = el('div', 'contacts-detail');

    const label = el(
      'span',
      'contacts-detail__label',
      item.label
    );

    const link = el(
      'a',
      'contacts-detail__value',
      item.value
    );

    link.href = item.href;

    if (item.href.startsWith('https://')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }

    contact.append(label, link);
    details.append(contact);
  });

  container.append(heading, map, details);
  section.append(container);

  return section;
};


/* ==========================================
   AI-SANA — PREMIUM FOOTER
========================================== */

const footer = () => {
  const section = el('footer', 'footer-section');

  const container = el('div', 'footer-container container');
  const panel = el('div', 'footer-panel');

  // Верхняя часть
  const top = el('div', 'footer-top');

  const brand = el('div', 'footer-brand');

  const logo = el('img', 'footer-logo');
  logo.src = asset('logo.svg');
  logo.alt = 'КазНМУ';

  const brandText = el('div', 'footer-brand__text');

  brandText.append(
    el('strong', '', 'КазНМУ'),
    el(
      'p',
      '',
      'Казахский национальный медицинский университет имени С. Д. Асфендиярова'
    )
  );

  brand.append(logo, brandText);

  // Навигация
  const navigation = el('div', 'footer-navigation');

  navigation.append(
    el('span', 'footer-label', 'НАВИГАЦИЯ')
  );

  const links = [
    ['Об AI-Sana', '#about'],
    ['Направления', '#directions'],
    ['Все проекты', '#all-projects'],
    ['Этапы', '#stages'],
    ['Контакты', '#contacts']
  ];

  links.forEach(([name, href]) => {
    const link = el('a', 'footer-link', name);
    link.href = href;
    navigation.append(link);
  });

  // Контакты
  const contacts = el('div', 'footer-contacts');

  contacts.append(
    el('span', 'footer-label', 'КОНТАКТЫ')
  );

  const contactLinks = [
    ['Алматы, ул. Толе би, 94', 'https://www.google.com/maps/search/?api=1&query=KazNMU+Almaty'],
    ['+7 727 338 70 90', 'tel:+77273387090'],
    ['www.kaznmu.kz', 'https://kaznmu.kz'],
    ['it.dep@kaznmu.kz', 'mailto:it.dep@kaznmu.kz']
  ];

  contactLinks.forEach(([name, href]) => {
    const link = el('a', 'footer-link', name);
    link.href = href;

    if (href.startsWith('https://')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }

    contacts.append(link);
  });

  top.append(brand, navigation, contacts);

  // Огромная надпись


  // Нижняя часть
  const bottom = el('div', 'footer-bottom');

  bottom.append(
    el(
      'span',
      '',
      `© ${new Date().getFullYear()} КазНМУ. Все права защищены.`
    ),
    el(
      'span',
      '',
      'AI-Sana · ИИ-проекты КазНМУ'
    )
  );

  panel.append(top, bottom);
  container.append(panel);
  section.append(container);

  return section;
};

const app = el('div', 'app');

app.append(
  header(),
  hero(),
  about(),
  quote(),
  stats(),
  projects(),
  stages(),
  contacts(),
  footer()
);

document.body.append(app);

// Staggered, section-level entrances. Project cards are intentionally excluded.
const revealGroups = [
  ['.hero__title, .hero__text, .hero__actions', 90],
  ['.quote-card', 0],
  ['.stats__intro, .stat', 80],
  ['.stages-eyebrow, .stages-title, .stage-item', 80],
  ['.contacts-eyebrow, .contacts-title, .contacts-description, .contacts-button, .contacts-map, .contacts-details', 75],
  ['.footer-brand, .footer-navigation, .footer-contacts, .footer-bottom', 70]
];

revealGroups.forEach(([selector, step]) => {
  document.querySelectorAll(selector).forEach((node, index) => {
    node.classList.add('reveal');
    node.style.setProperty('--delay', `${index * step}ms`);
  });
});

document.querySelector('.hero__content')?.classList.remove('reveal');

// Мобильное меню
const siteHeader = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');

  menuToggle.setAttribute('aria-expanded', String(open));

  menuToggle.setAttribute(
    'aria-label',
    open ? 'Закрыть меню' : 'Открыть меню'
  );

  menuToggle.replaceChildren(
    icon(open ? 'close' : 'menu')
  );
});

nav.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return;

  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Открыть меню');
  menuToggle.replaceChildren(icon('menu'));
});

// Шапка при прокрутке
window.addEventListener(
  'scroll',
  () => {
    siteHeader.classList.toggle(
      'site-header--scrolled',
      window.scrollY > 32
    );
  },
  { passive: true }
);

// Анимация появления элементов
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((node) => {
  revealObserver.observe(node);
});

// Анимация чисел статистики
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const node = entry.target;
      const target = node.dataset.value;

      const end = Number.parseInt(
        target.replace(/\D/g, ''),
        10
      );

      const prefix = target.match(/^\D+/)?.[0] ?? '';
      const suffix = target.match(/\D+$/)?.[0] ?? '';

      const started = performance.now();

      const tick = (now) => {
        const progress = Math.min(
          (now - started) / 1200,
          1
        );

        const eased = 1 - (1 - progress) ** 3;

        node.textContent =
          `${prefix}${Math.round(end * eased)}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          node.textContent = target;
        }
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(node);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat__number').forEach(
  (counter) => {
    counterObserver.observe(counter);
  }
);

// Coordinate-driven stages impulse. It only runs while the timeline is visible,
// and dot hits are calculated from their real viewport positions after resizing.
const stagesTimeline = document.querySelector('.stages-timeline');
const stagesImpulse = document.querySelector('.stages-impulse');
const stageDots = [...document.querySelectorAll('.stage-dot')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (stagesTimeline && stagesImpulse && stageDots.length) {
  const duration = 5600;
  const trailLength = 160;
  let active = false;
  let frameId = 0;
  let cycleStart = 0;
  let previousHead = -trailLength;
  let hitDots = new Set();

  const pulseDot = (dot) => {
    dot.classList.remove('is-hit');
    void dot.offsetWidth;
    dot.classList.add('is-hit');
    window.setTimeout(() => dot.classList.remove('is-hit'), 720);
  };

  const animateStages = (now) => {
    if (!active || reduceMotion.matches) return;

    if (!cycleStart) cycleStart = now;
    let progress = (now - cycleStart) / duration;

    if (progress >= 1) {
      cycleStart = now;
      progress = 0;
      previousHead = -trailLength;
      hitDots = new Set();
    }

    const timelineRect = stagesTimeline.getBoundingClientRect();
    const head = -trailLength + progress * (window.innerWidth + trailLength);
    const localX = head - timelineRect.left - trailLength;

    stagesImpulse.style.transform = `translate3d(${localX}px, 0, 0)`;
    stagesImpulse.style.opacity = progress < 0.03 || progress > 0.98 ? '0' : '1';

    stageDots.forEach((dot) => {
      const center = dot.getBoundingClientRect().left + dot.offsetWidth / 2;
      if (!hitDots.has(dot) && previousHead < center && head >= center) {
        hitDots.add(dot);
        pulseDot(dot);
      }
    });

    previousHead = head;
    frameId = requestAnimationFrame(animateStages);
  };

  const stagesVisibility = new IntersectionObserver(([entry]) => {
    active = entry.isIntersecting;
    cancelAnimationFrame(frameId);

    if (active && !reduceMotion.matches && window.innerWidth > 640) {
      cycleStart = 0;
      previousHead = -trailLength;
      hitDots = new Set();
      frameId = requestAnimationFrame(animateStages);
    }
  }, { rootMargin: '15% 0px', threshold: 0.01 });

  stagesVisibility.observe(stagesTimeline);

  reduceMotion.addEventListener('change', () => {
    cancelAnimationFrame(frameId);
    stagesImpulse.removeAttribute('style');
    if (active && !reduceMotion.matches && window.innerWidth > 640) {
      cycleStart = 0;
      frameId = requestAnimationFrame(animateStages);
    }
  });
}
