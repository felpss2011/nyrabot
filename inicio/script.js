// Variáveis globais
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const menu = document.querySelector('.menu');
const faqItems = document.querySelectorAll('.faq-item');
const contactForm = document.getElementById('contactForm');
const header = document.querySelector('header');

// Toggle menu mobile
mobileMenuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    
    // Alterna o ícone do menu
    const icon = mobileMenuBtn.querySelector('i');
    if (menu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// FAQ - toggle das perguntas
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Fecha todas as outras perguntas
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherAnswer.style.maxHeight = 0;
            }
        });
        
        // Toggle da resposta atual
        item.classList.toggle('active');
        const answer = item.querySelector('.faq-answer');
        
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = 0;
        }
    });
});

// Formulário de contato - prevenção de envio e simulação
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validação simples
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            alert('Por favor, preencha todos os campos do formulário.');
            return;
        }
        
        // Simulação de envio
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        // Simulação de delay de envio
        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 1500);
    });
}

// Efeito de scroll na navegação
window.addEventListener('scroll', () => {
    // Adiciona ou remove classe para mudar a aparência do header
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Atualiza item ativo no menu conforme scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animação suave ao clicar nos links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calcula a posição de destino com um pequeno offset
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animações de entrada na página
document.addEventListener('DOMContentLoaded', () => {
    // Função para verificar se elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Elementos para animar
    const animElements = document.querySelectorAll('.feature-card, .commands-category, .docs-card, .fanart-item, .support-item');
    
    // Função para adicionar animações quando elementos estão visíveis
    function checkForVisibility() {
        animElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated', 'fade-in');
            }
        });
    }
    
    // Verificar visibilidade inicial
    checkForVisibility();
    
    // Verificar visibilidade ao rolar a página
    window.addEventListener('scroll', checkForVisibility);
});

// Galeria de Fan Arts - Overlay para imagens (opcional)
document.querySelectorAll('.fanart-item').forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('h4').textContent;
        const author = item.querySelector('p').textContent;
        
        // Criar overlay
        const overlay = document.createElement('div');
        overlay.classList.add('image-overlay');
        
        // Conteúdo do overlay
        overlay.innerHTML = `
            <div class="overlay-content">
                <div class="overlay-close">&times;</div>
                <img src="${imgSrc}" alt="${title}">
                <div class="overlay-info">
                    <h3>${title}</h3>
                    <p>${author}</p>
                </div>
            </div>
        `;
        
        // Adicionar overlay ao body
        document.body.appendChild(overlay);
        
        // Prevenir scroll no body
        document.body.style.overflow = 'hidden';
        
        // Fechar overlay
        overlay.querySelector('.overlay-close').addEventListener('click', () => {
            document.body.removeChild(overlay);
            document.body.style.overflow = '';
        });
        
        // Fechar overlay ao clicar fora da imagem
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
            }
        });
    });
});

// Adicionar estilos CSS para o overlay da galeria
const overlayStyle = document.createElement('style');
overlayStyle.textContent = `
    .image-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    }
    
    .overlay-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .overlay-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
    
    .overlay-content img {
        max-width: 100%;
        max-height: 80vh;
        display: block;
        border-radius: 8px;
    }
    
    .overlay-info {
        background-color: white;
        padding: 15px;
        border-radius: 0 0 8px 8px;
    }
    
    .animated {
        animation-duration: 0.8s;
        animation-fill-mode: both;
    }
    
    .fade-in {
        animation-name: fadeIn;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(overlayStyle);

// Adicione este código ao seu arquivo JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !message) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        // Substitua esta URL pela URL do seu workflow do Pipedream
        const pipeURL = 'https://eohygpr0enacly.m.pipedream.net';
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        fetch(pipeURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            if (data.success) {
                form.reset();
                alert('Sugestão enviada com sucesso!');
            } else {
                alert('Erro ao enviar sugestão. Por favor, tente novamente.');
                console.error('Erro:', data.error);
            }
        })
        .catch(error => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            alert('Erro ao enviar sugestão. Por favor, tente novamente.');
            console.error('Erro:', error);
        });
    });
});