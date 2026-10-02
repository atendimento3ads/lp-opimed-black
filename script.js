/* =========================================================
   BLACK OPIMED 2026
   1. Fases da campanha (faixa do topo muda por data)
   2. Unidades (seleção por estado, rotas, WhatsApp, formulário)
   3. Formulário
   ========================================================= */

var WHATS = 'https://api.whatsapp.com/send?phone=5508001001989&text=';
var WHATS_MSG = 'Olá! Quero agendar minha avaliação na Black Opimed.';

/* ---------- 1. Fases da campanha ----------
   Para testar uma fase, abra a página com ?fase=outubro | novembro | semana-black | dezembro */
var FASES = [
  { id: 'outubro',      ate: '2026-10-31', texto: '<strong>A Black Opimed 2026 começou.</strong> Compre 1 aparelho auditivo e ganhe outro.' },
  { id: 'novembro',     ate: '2026-11-22', texto: '<strong>Black Opimed 2026.</strong> Tire suas dúvidas e agende sua avaliação.' },
  { id: 'semana-black', ate: '2026-11-30', texto: '<strong>Semana Black Opimed.</strong> Compre 1 aparelho auditivo e ganhe outro.' },
  { id: 'dezembro',     ate: '2026-12-31', texto: '<strong>Último mês da Black Opimed.</strong> Oferta válida até 31/12/2026.', contagem: true }
];

(function () {
  var bar = document.getElementById('phaseBar');
  var hoje = new Date();
  var forcada = new URLSearchParams(location.search).get('fase');
  var fase = null;

  for (var i = 0; i < FASES.length; i++) {
    var fim = new Date(FASES[i].ate + 'T23:59:59');
    if (forcada ? FASES[i].id === forcada : hoje <= fim) { fase = FASES[i]; break; }
  }
  if (!fase) return; // campanha encerrada: a faixa não aparece

  document.getElementById('phaseText').innerHTML = fase.texto;
  if (fase.contagem) {
    var dias = Math.ceil((new Date('2026-12-31T23:59:59') - hoje) / 86400000);
    if (forcada && (dias > 31 || dias < 1)) dias = 0;
    if (dias === 1) document.getElementById('phaseCount').textContent = ' Último dia.';
    else if (dias > 1) document.getElementById('phaseCount').textContent = ' Faltam ' + dias + ' dias.';
  }
  bar.hidden = false;
})();

/* ---------- 2. Unidades (fonte: aparelhosauditivos.opimed.com.br/unidades) ---------- */
var UNIDADES = [
  { uf: 'GO', estado: 'Goiás', cidade: 'Goiânia', nome: 'Goiânia (Setor Oeste)', end: 'Av. República do Líbano, 1775, St. Oeste (em frente ao INGOH)', hor: 'Seg. a sex.: 08:00 às 18:00 · Sáb.: 08:00 às 12:00', tel: '(62) 3996-7700' },
  { uf: 'GO', estado: 'Goiás', cidade: 'Goiânia', nome: 'Goiânia (Setor Marista)', end: 'Av. Mutirão, 2653, St. Marista, Piso Térreo do Órion Business & Health Complex', hor: 'Seg. a sex.: 09:00 às 19:00 · Sáb.: 09:00 às 13:00', tel: '(62) 3996-7789' },
  { uf: 'GO', estado: 'Goiás', cidade: 'Anápolis', nome: 'Anápolis', end: 'Av. Desembargador Jaime esq. c/ Rua Barão de Rio Branco, nº 73, St. Central (em frente à Igreja Sant\'Ana)', hor: 'Seg. a sex.: 08:00 às 12:00 e 14:00 às 18:00', tel: '(62) 3943-0110' },
  { uf: 'GO', estado: 'Goiás', cidade: 'Rio Verde', nome: 'Rio Verde', end: 'Rua Pedro Rattes esq. c/ Rua Rafael Nascimento, nº 99, Centro (próximo à Praça dos Coqueiros)', hor: 'Seg. a sex.: 08:00 às 12:00 e 13:15 às 18:00', tel: '(64) 3621-7062' },
  { uf: 'GO', estado: 'Goiás', cidade: 'Itumbiara', nome: 'Itumbiara', end: 'Rua Rui de Almeida esq. c/ Guimarães Natal, nº 582, Centro (em frente ao Restaurante Sabor Goiano)', hor: 'Seg. a sex.: 08:00 às 12:00 e 13:15 às 18:00', tel: '(64) 3404-5976' },
  { uf: 'GO', estado: 'Goiás', cidade: 'Catalão', nome: 'Catalão', end: 'Av. Farid Miguel Safatle, nº 18, qd. 59, lt. 08, sala 01, Centro (ao lado da Concessionária Umuarama)', hor: 'Seg. a sex.: 08:00 às 12:00 e 13:15 às 18:00', tel: '(64) 3441-2105' },
  { uf: 'DF', estado: 'Distrito Federal', cidade: 'Brasília', nome: 'Brasília (Asa Norte)', end: 'SMHN, Qd. 2, Bl. C, Lj. 09/10, Térreo, Ed. Dr. Crispim, Asa Norte (em frente ao HRAN)', hor: 'Seg. a sex.: 08:00 às 12:00 e 13:15 às 18:00 · Sáb.: 08:00 às 12:00', tel: '(61) 3548-8006' },
  { uf: 'DF', estado: 'Distrito Federal', cidade: 'Brasília', nome: 'Brasília (Asa Sul)', end: 'Edifício Via Brasil, SEPS 710/910, Asa Sul', hor: 'Seg. a sex.: 08:00 às 12:00 e 13:15 às 18:00', tel: '(61) 3028-7474' },
  { uf: 'DF', estado: 'Distrito Federal', cidade: 'Águas Claras', nome: 'Águas Claras', end: 'Edifício Pátio Capital, Sala 24, Térreo, QS 03, EPCT, Lotes 03, 05, 07 e 09', hor: 'Seg. a sex.: 08:00 às 12:00 e 13:15 às 18:00', tel: '(61) 3550-7326' },
  { uf: 'TO', estado: 'Tocantins', cidade: 'Palmas', nome: 'Palmas', end: 'Av. Teotônio Segurado, 501 Sul, Conj. 01, Lt. 22, Loja 03, Térreo, Plano Diretor Sul (ao lado das Óticas Carol)', hor: 'Seg. a sex.: 08:00 às 11:00 e 12:00 às 18:00', tel: '(63) 3215-4088' },
  { uf: 'TO', estado: 'Tocantins', cidade: 'Araguaína', nome: 'Araguaína', end: 'Av. Tocantins, nº 1650, Espaço Saúde, Ed. João Coragem, Sala Externa, Centro (em frente à Drogaria Pague Menos)', hor: 'Seg. a sex.: 08:00 às 12:30 e 13:45 às 18:00', tel: '(63) 3413-1130' },
  { uf: 'PE', estado: 'Pernambuco', cidade: 'Recife', nome: 'Recife (Ilha do Leite)', end: 'Rua Minas Gerais, 116, Ilha do Leite (ao lado da Otorrinos Recife, Unidade Pediatria)', hor: 'Seg. a qui.: 07:30 às 12:00 e 13:15 às 17:30 · Sex.: 07:30 às 12:00 e 13:15 às 17:00', tel: '(81) 3771-0062' },
  { uf: 'PE', estado: 'Pernambuco', cidade: 'Recife', nome: 'Recife (Boa Viagem)', end: 'Galeria Centro Sul, Rua Jornalista Adeth Leite, 009, Boa Viagem', hor: 'Seg. a sex.: 08:00 às 12:00 e 13:15 às 18:00', tel: '0800 100 1989' },
  { uf: 'CE', estado: 'Ceará', cidade: 'Fortaleza', nome: 'Fortaleza', end: 'Av. Senador Virgílio Távora, 1837, Loja B, Aldeota (ao lado da Hapvida)', hor: 'Seg. a sex.: 08:00 às 12:00 e 13:15 às 18:00', tel: '(85) 4012-3305' },
  { uf: 'PA', estado: 'Pará', cidade: 'Belém', nome: 'Belém', end: 'Travessa Dom Romualdo de Seixas esq. c/ Rua Domingos Marreiros, nº 1560, Ed. Connext, Loja 10, Térreo, Umarizal', hor: 'Seg. a sex.: 08:00 às 12:00 e 13:30 às 18:00', tel: '(91) 3249-7174' },
  { uf: 'AM', estado: 'Amazonas', cidade: 'Manaus', nome: 'Manaus', end: 'Av. Djalma Batista, nº 1718, Cond. Atlantic Tower, Torre Medical, 8º andar, Sala 802, Chapada (ao lado do Shopping Millennium)', hor: 'Seg. a sex.: 08:00 às 12:00 e 13:30 às 18:00', tel: '(92) 3584-4099' },
  { uf: 'AP', estado: 'Amapá', cidade: 'Macapá', nome: 'Macapá', end: 'Av. FAB, 1833, Loja A, Setor Central (ao lado da Clínica Promed)', hor: 'Seg. a sex.: 09:00 às 12:00 e 13:30 às 19:00', tel: '(96) 3082-2110' },
  { uf: 'RO', estado: 'Rondônia', cidade: 'Porto Velho', nome: 'Porto Velho', end: 'Rua Tenreiro Aranha, nº 3108, sala 01 B, Olaria (próximo ao Hospital 9 de Julho)', hor: 'Seg. a sex.: 08:00 às 12:00 e 14:00 às 18:00 · Sáb.: 08:00 às 12:00', tel: '(69) 3224-1386' }
];

function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function waLink(unidade) {
  var msg = WHATS_MSG + (unidade ? ' Unidade: ' + unidade.nome + ', ' + unidade.uf + '.' : '');
  return WHATS + encodeURIComponent(msg);
}
function rotaLink(u) {
  return 'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent('Opimed Aparelhos Auditivos, ' + u.end.replace(/\s*\(.*\)\s*$/, '') + ', ' + u.cidade + ' - ' + u.uf);
}

(function () {
  var chips = document.getElementById('ufChips');
  var grid = document.getElementById('unitsGrid');
  var select = document.getElementById('unidade');
  var estados = [];

  UNIDADES.forEach(function (u, i) {
    u.id = i;
    if (estados.indexOf(u.estado) === -1) estados.push(u.estado);
  });

  // Links de WhatsApp gerais (cabeçalho, hero, formulário, flutuante)
  document.querySelectorAll('.js-wa').forEach(function (a) { a.href = waLink(); });

  // Select do formulário, agrupado por estado
  estados.forEach(function (estado) {
    var group = document.createElement('optgroup');
    group.label = estado;
    UNIDADES.filter(function (u) { return u.estado === estado; }).forEach(function (u) {
      var o = document.createElement('option');
      o.value = u.nome + ' - ' + u.uf;
      o.textContent = u.nome;
      o.dataset.id = u.id;
      group.appendChild(o);
    });
    select.appendChild(group);
  });

  function render(estado) {
    chips.querySelectorAll('.chip').forEach(function (c) {
      c.setAttribute('aria-pressed', c.dataset.estado === estado ? 'true' : 'false');
    });
    grid.innerHTML = UNIDADES.filter(function (u) { return u.estado === estado; }).map(function (u) {
      var tel = u.tel.replace(/\D/g, '');
      return '' +
        '<article class="unit">' +
          '<p class="unit__uf">' + esc(u.estado) + '</p>' +
          '<h3 class="unit__name">' + esc(u.nome) + '</h3>' +
          '<ul class="unit__info">' +
            '<li><svg aria-hidden="true"><use href="#i-pin"/></svg><span>' + esc(u.end) + '</span></li>' +
            '<li><svg aria-hidden="true"><use href="#i-clock"/></svg><span>' + esc(u.hor) + '</span></li>' +
            '<li><svg aria-hidden="true"><use href="#i-phone"/></svg><a href="tel:' + tel + '">' + esc(u.tel) + '</a></li>' +
          '</ul>' +
          '<div class="unit__actions">' +
            '<a class="btn btn--sm js-agendar" href="#formulario" data-id="' + u.id + '">Agendar nesta unidade</a>' +
            '<div class="unit__links">' +
              '<a href="' + rotaLink(u) + '" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-route"/></svg>Como chegar</a>' +
              '<a class="is-wa" href="' + waLink(u) + '" target="_blank" rel="noopener"><svg aria-hidden="true"><use href="#i-whats"/></svg>WhatsApp</a>' +
            '</div>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  estados.forEach(function (estado) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.dataset.estado = estado;
    b.textContent = estado;
    b.addEventListener('click', function () { render(estado); });
    chips.appendChild(b);
  });
  render(estados[0]);

  // "Agendar nesta unidade" já deixa a unidade escolhida no formulário
  grid.addEventListener('click', function (e) {
    var a = e.target.closest('.js-agendar');
    if (!a) return;
    var opt = select.querySelector('option[data-id="' + a.dataset.id + '"]');
    if (opt) select.value = opt.value;
  });
})();

/* ---------- 3. Formulário ---------- */
(function () {
  var form = document.getElementById('leadForm');
  var card = document.getElementById('formCard');

  document.getElementById('telefone').addEventListener('input', function (e) {
    var d = e.target.value.replace(/\D/g, '').slice(0, 11);
    var out = d;
    if (d.length > 2) out = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length > 7) out = '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(-4);
    e.target.value = out;
  });

  // Protótipo: valida e mostra a mensagem de sucesso. Falta ligar ao CRM,
  // enviando o campo "unidade" para o lead ir à equipe correta.
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    form.querySelectorAll('[required]').forEach(function (i) {
      var bad = !i.value.trim() || (i.type === 'tel' && i.value.replace(/\D/g, '').length < 10);
      i.classList.toggle('is-invalid', bad);
      if (bad) ok = false;
    });
    if (ok) card.classList.add('is-sent');
  });
})();

/* ---------- Animação de entrada e barra fixa do celular ---------- */
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });

  // No celular, a barra fixa some enquanto o formulário está na tela
  var bar = document.getElementById('mobileBar');
  new IntersectionObserver(function (entries) {
    bar.classList.toggle('is-hidden', entries[0].isIntersecting);
  }, { threshold: 0.15 }).observe(document.getElementById('formCard'));
})();
