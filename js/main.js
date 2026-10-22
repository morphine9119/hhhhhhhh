(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var SIGNS = [
    {
      name: 'Bélier',
      glyph: '\u2648\uFE0E',
      dates: '21 mars – 19 avril',
      element: 'Feu',
      mode: 'Cardinal',
      ruler: 'Mars',
      today: 'Une confiance tranquille revient en ce matin, et elle demandera à être employée. Une décision que vous tournez depuis plusieurs jours est prête pour une réponse claire et simple.',
      love: 'Avancez avec chaleur plutôt qu’avec intensité — un ton plus doux ouvre la porte que l’audace ne saurait franchir.',
      career: 'Dites la phrase ambitieuse à voix haute dans une petite réunion ; quelqu’un l’écoute et peut agir en conséquence.',
      energy: 'Votre vitalité culmine tôt. Offrez à la journée vos meilleures heures, puis laissez la soirée être douce.',
      more: 'Observez les heures qui précèdent midi : la clarté est à son comble et le ciel favorise le mouvement décisif. En fin d’après-midi, échangez l’élan contre la conversation et laissez les autres achever la pensée que vous avez commencée.'
    },
    {
      name: 'Taureau',
      glyph: '\u2649\uFE0E',
      dates: '20 avril – 20 mai',
      element: 'Terre',
      mode: 'Fixe',
      ruler: 'Vénus',
      today: 'Les habitudes familières prennent aujourd’hui une texture nouvelle, et le rythme posé est votre atout, non votre retard. Remarquez ce qui s’est discrètement amélioré autour de vous.',
      love: 'Les petits gestes diront plus que les déclarations — cuisiner, appeler, ou simplement être présent.',
      career: 'Achévez le détail resté en suspens avant de commencer quoi que ce soit de neuf ; les autres sentiront la stabilité que vous créez.',
      energy: 'Ancré et calme. Une belle lumière, les textures, un long repas vous restaureront.',
      more: 'Un fil abandonné il y a quelques semaines se reprend aujourd’hui, et une petite promesse revient avec ses intérêts. Ne renégociez aucun terme ; honorez-les simplement, et observez ce qui se met à bouger autour de vous.'
    },
    {
      name: 'Gémeaux',
      glyph: '\u264A\uFE0E',
      dates: '21 mai – 20 juin',
      element: 'Air',
      mode: 'Mutable',
      ruler: 'Mercure',
      today: 'La curiosité a le premier mot aujourd’hui, et les conversations brèves porteront un poids inhabituel. Votre esprit relie vite deux choses que nul n’avait encore juxtaposées.',
      love: 'Le jeu est l’humeur sincère — flirtez, riez, laissez l’affection passer d’abord par la voie légère.',
      career: 'Formuler avec précision une idée partagée est votre don du jour ; la bonne phrase transforme la conversation en projet.',
      energy: 'L’énergie mentale dépasse le corps. Accordez le mouvement à la pensée — marchez tout en décidant.',
      more: 'Un message de votre boîte mérite une seconde lecture plus lente, et une idée glissée en passant mérite d’être reprise et développée. Gardez tout ce qui fait étinceler en fin de matinée ; sa seconde vie comptera d’ici le week-end.'
    },
    {
      name: 'Cancer',
      glyph: '\u264B\uFE0E',
      dates: '21 juin – 22 juillet',
      element: 'Eau',
      mode: 'Cardinal',
      ruler: 'Lune',
      today: 'Le foyer et l’ambition tirent aujourd’hui dans le même sens, ce qui rend une vieille tension momentanément légère. Commencez là où le sentiment est le plus fort, laissez la logistique suivre.',
      love: 'Une personne proche de vous attendait, en silence, l’invitation. Recevez quelque chose de petit.',
      career: 'Votre instinct des gens est juste en ce moment — faites-lui confiance quand les projets ne peuvent encore être prouvés.',
      energy: 'Sensible et en marée. Protégez votre repos de début de soirée ; l’intuition s’aiguise après la nuit tombée.',
      more: 'Un message venu de la famille porte plus de sens qu’il n’a de mots. Si une vieille inquiétude remonte ce soir, prenez-la pour une météo et non pour une prophétie — elle passera plus vite que prévu.'
    },
    {
      name: 'Lion',
      glyph: '\u264C\uFE0E',
      dates: '23 juillet – 22 août',
      element: 'Feu',
      mode: 'Fixe',
      ruler: 'Soleil',
      today: 'Une assurance naturelle vous permet d’occuper l’espace sans élever la voix. Un encouragement généreux offert aujourd’hui reviendra vers vous par deux fois.',
      love: 'Offrez l’attention entière comme un cadeau — téléphone posé, regard levé, le reste suivra.',
      career: 'Votre nom et votre travail sont visibles ensemble ; choisissez les projets qui racontent l’histoire que vous voulez laisser.',
      energy: 'Rayonnant mais régulier. La lumière de l’après-midi et le plein air garderont l’humeur égale.',
      more: 'Guettez les applaudissements aux endroits inattendus : un vote de confiance discret, un ancien collègue qui reprend votre méthode, un inconnu qui cite votre style. Ce qui s’y reflète mérite qu’on l’édifie dans les semaines qui viennent.'
    },
    {
      name: 'Vierge',
      glyph: '\u264D\uFE0E',
      dates: '23 août – 22 septembre',
      element: 'Terre',
      mode: 'Mutable',
      ruler: 'Mercure',
      today: 'La même tâche devant vous demande aujourd’hui une autre sorte d’attention, et c’est là tout le propos. La précision est un art quand elle est choisie, et non une dette.',
      love: 'Lisez entre les lignes une fois, puis demandez simplement. L’inquiétude grandit dans l’espace sans réponse.',
      career: 'Affinez, ne réinventez pas. La petite retouche qui paraît trop mineure est précisément celle qui compte.',
      energy: 'Une force tranquille. Rangez une petite surface et le sommeil viendra plus tôt ce soir.',
      more: 'Une correction pratique arrive tard dans la journée — acceptez-la sans la polir d’abord. La santé s’améliore par soustraction : laissez volontairement une chose inutile non faite, et observez le reste se poser.'
    },
    {
      name: 'Balance',
      glyph: '\u264E\uFE0E',
      dates: '23 septembre – 22 octobre',
      element: 'Air',
      mode: 'Cardinal',
      ruler: 'Vénus',
      today: 'Une conversation honnête vous revient en orbite aujourd’hui, et l’issue généreuse est plus proche qu’elle n’y paraît. L’équilibre n’est pas choisir le milieu — c’est choisir ce que vous pouvez assumer.',
      love: 'Entre la franchise et le charme, les mots finissent par se poser. Préférez la franchise ; elle vieillit mieux en mémoire.',
      career: 'Un partenariat attend votre signature exacte, et le compliment qui l’accompagne est sincère.',
      energy: 'Socialement éclatant. Une pièce, une belle conversation — épargnez-vous l’après-midi dispersé.',
      more: 'Un thème récurrent remonte : tout ce que vous donnez de vous en échange de bien être considéré. La réponse arrive dans un petit instant. Vers le soir, une douce décision se met à pencher — vous n’êtes pas encore tenu de la rattraper.'
    },
    {
      name: 'Scorpion',
      glyph: '\u264F\uFE0E',
      dates: '23 octobre – 21 novembre',
      element: 'Eau',
      mode: 'Fixe',
      ruler: 'Pluton',
      today: 'La perception est l’instrument du jour, et la profondeur est votre avantage dans une journée en apparence superficielle. Ce qui reste non-dit compte plus que ce qui est dit — lisez cela avec soin.',
      love: 'Un échange privé prend racine. Un regard suffit pour confirmer ce que vous savez tous les deux déjà.',
      career: 'Protégez un projet confidentiel de la foule ; une lumière trop précoce en changerait la température.',
      energy: 'Intense mais contenu. L’eau, sous toutes ses formes, remettra votre équilibre en silence ce soir.',
      more: 'Quelque chose de privé s’approfondit aujourd’hui, et c’est favorable si vous faites confiance au non-dit. Votre meilleur geste vient en écrivant d’abord, en parlant ensuite — un paragraphe honnête, envoyé à exactement la bonne personne.'
    },
    {
      name: 'Sagittaire',
      glyph: '\u2650\uFE0E',
      dates: '22 novembre – 21 décembre',
      element: 'Feu',
      mode: 'Mutable',
      ruler: 'Jupiter',
      today: 'L’horizon s’élargit avec l’aide d’une vieille leçon qui vous avait résisté ; elle devient aujourd’hui votre carte. L’humour est la route la plus courte entre deux points de vue opposés — et l’un des deux sourit déjà.',
      love: 'L’énergie de quelqu’un soulève la vôtre au moment où l’on s’y attend le moins. Dites oui à la soirée non prévue.',
      career: 'Votre vision lointaine est l’actif du jour ; proposez le calendrier, pas le détail.',
      energy: 'Aventurier. Préparez la prochaine évasion, même si elle est à deux semaines d’ici.',
      more: 'Quelque chose appris ailleurs — en voyage, ou de l’autre côté d’une année difficile — devient un conseil utile aujourd’hui. Partagez-le généreusement ; le raconter l’affinera en quelque chose dont vous servirez encore.'
    },
    {
      name: 'Capricorne',
      glyph: '\u2651\uFE0E',
      dates: '22 décembre – 19 janvier',
      element: 'Terre',
      mode: 'Cardinal',
      ruler: 'Saturne',
      today: 'Votre patience est structurellement solide aujourd’hui, et une promotion discrète la suit de près. Ce que vous portez a du poids et du sens — ne l’échangez pas contre ce qui n’est que plus léger.',
      love: 'La dévotion se montre dans le suivi plutôt que dans l’éclat. Tenez la petite promesse donnée.',
      career: 'Une voix éminente vous mesure aujourd’hui — et aime ce qu’elle voit.',
      energy: 'Endurant. Les résultats de fin de journée ont meilleur goût que ceux du matin ; réservez à l’heure difficile sa récompense.',
      more: 'Un schéma persistant se redresse en silence, et quelqu’un plus avancé sur le chemin vous offre deux phrases à porter dans la saison qui vient. Que la croissance vienne de la discipline : c’est exactement ce que prouve aujourd’hui.'
    },
    {
      name: 'Verseau',
      glyph: '\u2652\uFE0E',
      dates: '20 janvier – 18 février',
      element: 'Air',
      mode: 'Fixe',
      ruler: 'Uranus',
      today: 'Les idées arrivent aujourd’hui d’une orbite un peu plus haute, et l’une d’elles est assez pratique pour être gardée. La solution la plus élégante est peut-être la moins conventionnelle sur la table.',
      love: 'Donnez à une amitié précise la place de dire l’inattendu. Le collectif dégage le chemin.',
      career: 'Proposez la version du plan qui fait un peu peur au schéma ; le schéma saura s’adapter à vous.',
      energy: 'Électrique et dispersé. Mettez le courant à la terre dans une tâche achevée avant le coucher du soleil.',
      more: 'Une ancienne amitié revient portant un morceau d’avenir à bâtir. Restez près de votre conviction — l’une des arrivées du jour n’appartient qu’à vous, et elle se tiendra encore quand le bruit se sera tu.'
    },
    {
      name: 'Poissons',
      glyph: '\u2653\uFE0E',
      dates: '19 février – 20 mars',
      element: 'Eau',
      mode: 'Mutable',
      ruler: 'Neptune',
      today: 'L’intuition arrive avant l’information aujourd’hui ; faites confiance au premier signal discret. La musique, l’eau ou le sommeil traduiront ce que l’analyse ne peut pas.',
      love: 'Votre empathie est aimant — écoutez sans réparer. La journée veut une oreille, pas une réponse.',
      career: 'Une synthèse créative s’enclenche entre deux tâches que rien ne prédestinait à se rencontrer.',
      energy: 'Onirique et perméable. Posez une limite après le déjeuner, et tout s’écoulera ensuite plus aisément.',
      more: 'Quelque chose d’artistique venu du mois dernier revient avec un dessein — une chanson, une couleur, un ton de voix, un paragraphe. Remarquez avec précision ce qui revient ce soir ; il essaie de dire quelque chose de précis.'
    }
  ];

  var currentSignIndex = 0;

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  function revealAll() {
    var items = document.querySelectorAll('.reveal');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.add('in');
    }
  }

  function initReveal() {
    try {
      if (!('IntersectionObserver' in window)) {
        revealAll();
        return;
      }
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      );
      var items = document.querySelectorAll('.reveal');
      for (var i = 0; i < items.length; i++) {
        observer.observe(items[i]);
      }
    } catch (err) {
      revealAll();
    }
  }

  function initHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        if (window.scrollY > 8) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initMenu() {
    var btn = document.querySelector('.menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    function setOpen(open) {
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    }

    btn.addEventListener('click', function () {
      setOpen(menu.hidden);
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !menu.hidden) {
        setOpen(false);
        btn.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (!menu.hidden && !event.target.closest('.site-header')) setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 980 && !menu.hidden) setOpen(false);
    });
  }

  function setToggle(collapsed) {
    var toggle = document.getElementById('horo-toggle');
    var extended = document.getElementById('horo-extended');
    if (!toggle || !extended) return;
    extended.classList.toggle('is-open', !collapsed);
    toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    toggle.querySelector('span').textContent = collapsed
      ? toggle.getAttribute('data-open-label')
      : toggle.getAttribute('data-close-label');
  }

  function initToggle() {
    var toggle = document.getElementById('horo-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      var collapsed = toggle.getAttribute('aria-expanded') === 'false';
      setToggle(collapsed ? false : true);
    });
  }

  function findSignIndex(date) {
    var m = date.getMonth() + 1;
    var d = date.getDate();
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 0;
    if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 1;
    if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 2;
    if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 3;
    if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 4;
    if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 5;
    if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 6;
    if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 7;
    if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 8;
    if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 9;
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 10;
    return 11;
  }

  function renderSign(index, animate) {
    var sign = SIGNS[index];
    if (!sign) return;
    currentSignIndex = index;

    var panel = document.getElementById('horoscope-panel');
    var status = document.getElementById('horo-status');
    var buttons = document.querySelectorAll('.sign-btn');

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', Number(buttons[i].dataset.sign) === index ? 'true' : 'false');
    }

    setToggle(true);

    var write = function () {
      document.getElementById('horo-glyph').textContent = sign.glyph;
      document.getElementById('horo-name').textContent = sign.name;
      document.getElementById('horo-dates').textContent = sign.dates;
      document.getElementById('horo-meta').textContent =
        sign.element + ' \u00B7 ' + sign.mode + ' \u00B7 ' + sign.ruler;
      document.getElementById('horo-today').textContent = sign.today;
      document.getElementById('horo-love').textContent = sign.love;
      document.getElementById('horo-career').textContent = sign.career;
      document.getElementById('horo-energy').textContent = sign.energy;
      document.getElementById('horo-more').textContent = sign.more;
      panel.classList.remove('is-switching');
      if (status) status.textContent = 'Horoscope du ' + sign.name + ' chargé.';
    };

    if (animate && !reduceMotion && panel) {
      panel.classList.add('is-switching');
      window.setTimeout(write, 240);
    } else {
      write();
    }
  }

  function initSigns() {
    var grid = document.getElementById('sign-selector');
    if (!grid) return;

    SIGNS.forEach(function (sign, index) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sign-btn';
      btn.dataset.sign = String(index);
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-controls', 'horoscope-panel');
      btn.setAttribute('aria-label', 'Horoscope du ' + sign.name);

      var glyph = document.createElement('span');
      glyph.className = 'glyph';
      glyph.setAttribute('aria-hidden', 'true');
      glyph.textContent = sign.glyph;

      var name = document.createElement('span');
      name.className = 'sign-name';
      name.textContent = sign.name;

      btn.appendChild(glyph);
      btn.appendChild(name);
      btn.addEventListener('click', function () {
        if (index !== currentSignIndex) {
          renderSign(index, true);
        } else {
          btn.setAttribute('aria-pressed', 'true');
        }
      });
      grid.appendChild(btn);
    });

    var today = new Date();
    renderSign(findSignIndex(today), false);
  }

  function initDate() {
    var nodes = document.querySelectorAll('[data-today]');
    if (!nodes.length) return;
    var formatter = new Intl.DateTimeFormat('fr-FR', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    nodes.forEach(function (node) {
      node.textContent = formatter.format(new Date());
    });
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function initNewsletter() {
    var form = document.getElementById('nl-form');
    var input = document.getElementById('nl-email');
    var note = document.getElementById('nl-note');
    if (!form || !input || !note) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var value = input.value.trim();

      if (!validEmail(value)) {
        input.setAttribute('aria-invalid', 'true');
        note.classList.remove('is-success');
        note.classList.add('is-error');
        note.textContent = 'Veuillez saisir une adresse e-mail valide.';
        input.focus();
        return;
      }

      input.removeAttribute('aria-invalid');
      input.value = '';
      note.classList.remove('is-error');
      note.classList.add('is-success');
      note.textContent = 'Bienvenue à bord — une note du ciel est en chemin.';
      note.setAttribute('tabindex', '-1');
      note.focus({ preventScroll: true });
    });

    input.addEventListener('input', function () {
      if (input.getAttribute('aria-invalid') === 'true') {
        input.removeAttribute('aria-invalid');
        note.classList.remove('is-error', 'is-success');
        note.textContent = 'Livraison occasionnelle. Désabonnement en un clic.';
      }
    });
  }

  function init() {
    initDate();
    initHeader();
    initMenu();
    initToggle();
    initSigns();
    initNewsletter();
    initReveal();
  }

  ready(function () {
    try {
      init();
    } catch (err) {
      revealAll();
    }
  });

  var errorHooked = false;

  window.addEventListener('error', function () {
    if (errorHooked) return;
    errorHooked = true;
    revealAll();
  });
})();
