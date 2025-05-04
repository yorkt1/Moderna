const servicos = [
    {
        id: 1,
        title: 'Banco acoplado com floreira',
        category: 'Comercial',
        description: 'Bancos com design rusticos feito com marmores.',
        image: 'https://res.cloudinary.com/dqewxdbfx/image/upload/v1746400146/17_jstqqz.jpg',
        year: '2022'
    },
    {
        id: 2,
        title: 'Caixotes de floreiras',
        category: 'Residencial',
        description: 'Caixotes de floreiras em deck itaúba.',
        image: 'https://res.cloudinary.com/dqewxdbfx/image/upload/v1746399367/Caixotes_de_floreiras_em_deck_ita%C3%BAba_1_kfqe1c.jpg',
        year: '2023'
    },
  
    {
        id: 3,
        title: 'Expositores',
        category: 'Infraestrutura',
        description: 'Expositores de folhas de portas com medidas diversas.',
        image: 'https://res.cloudinary.com/dqewxdbfx/image/upload/v1746400464/Expositores_de_folhas_de_portas_com_medidas_diversas_jsy0bp.jpg',
        year: '2021'
    },
    {
        id: 4,
        title: 'Reforma de embarcação',
        category: 'Renovação',
        description: 'Restauração cuidadosa de um deck com adições modernas.',
        image: 'https://res.cloudinary.com/dqewxdbfx/image/upload/v1746400543/119_motvwu.jpg',
        year: '2022'
    },
    {
        id: 5,
        title: 'Carrinho sob medida',
        category: 'Infraestrutura',
        description: 'Carrinho feito sob encomenda para transporte de bancadas de pedra.',
        image: 'https://res.cloudinary.com/dqewxdbfx/image/upload/v1746400683/9_oellvf.jpg',
        year: '2020'
    },
    {
        id: 6,
        title: 'Placa cimenticia',
        category: 'Comercial',
        description: 'Fechamento de tubulações com placa cimenticia.',
        image: 'https://res.cloudinary.com/dqewxdbfx/image/upload/v1746400874/27_h9igph.jpg',
        year: '2023'
    }
];

const servicosCategories = ['Todos', 'Commercial', 'Residencial', 'Infraestrutura', 'Renovação'];

// Variáveis globais
let servicosActiveCategory = 'Todos';
const servicosGrid = document.getElementById('servicosGrid');
const servicosFilterButtons = document.querySelectorAll('.servicos-filter-btn');
const servicosModal = document.getElementById('servicosModal');
const servicosModalCloseBtn = document.getElementById('servicosModalCloseBtn');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderServicos(servicos);
    setupServicosEventListeners();
});

// Função para renderizar os serviços
function renderServicos(servicosToRender) {
    servicosGrid.innerHTML = '';
    
    servicosToRender.forEach(servico => {
        const servicoCard = document.createElement('div');
        servicoCard.className = 'servicos-card';
        servicoCard.dataset.id = servico.id;
        
        servicoCard.innerHTML = `
            <div class="servicos-image-container">
                <img src="${servico.image}" alt="${servico.title}" class="servicos-image">
                <div class="servicos-overlay">
                    <div class="servicos-overlay-content">
                        <span class="servicos-overlay-category">${servico.category}</span>
                        <h3 class="servicos-overlay-title">${servico.title}</h3>
                    </div>
                </div>
            </div>
            <div class="servicos-content">
                <div class="servicos-card-header">
                    <h3 class="servicos-card-title">${servico.title}</h3>
                    <span class="servicos-card-year">${servico.year}</span>
                </div>
                <p class="servicos-card-description">${servico.description}</p>
                <button class="servicos-card-link">Ver detalhes</button>
            </div>
        `;
        
        servicosGrid.appendChild(servicoCard);
    });
    
    // Adiciona event listeners para os cards de serviço
    document.querySelectorAll('.servicos-card').forEach(card => {
        card.addEventListener('click', () => openServicoModal(card.dataset.id));
    });
}

// Função para abrir o modal do serviço
function openServicoModal(servicoId) {
    const servico = servicos.find(s => s.id === parseInt(servicoId));
    if (!servico) return;
    
    document.getElementById('servicosModalImage').src = servico.image;
    document.getElementById('servicosModalImage').alt = servico.title;
    document.getElementById('servicosModalTitle').textContent = servico.title;
    document.getElementById('servicosModalCategory').textContent = servico.category;
    document.getElementById('servicosModalDescription').textContent = servico.description;
    document.getElementById('servicosModalYear').textContent = servico.year;
    
    servicosModal.classList.add('active');
}

// Função para fechar o modal
function closeServicoModal() {
    servicosModal.classList.remove('active');
}

// Função para filtrar serviços
function filterServicos(category) {
    servicosActiveCategory = category;
    
    // Atualiza os botões de filtro
    servicosFilterButtons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Filtra os serviços
    const filteredServicos = category === 'Todos' 
        ? servicos 
        : servicos.filter(servico => servico.category === category);
    
    renderServicos(filteredServicos);
}

// Configura os event listeners
function setupServicosEventListeners() {
    // Filtros
    servicosFilterButtons.forEach(btn => {
        btn.addEventListener('click', () => filterServicos(btn.dataset.category));
    });
    
    // Modal
    servicosModalCloseBtn.addEventListener('click', closeServicoModal);
    
    // Fechar modal ao clicar fora do conteúdo
    servicosModal.addEventListener('click', (e) => {
        if (e.target === servicosModal) {
            closeServicoModal();
        }
    });
}