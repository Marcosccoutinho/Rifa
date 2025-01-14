const totalNumbers = 100;
let selectedNumbers = new Set();
let soldNumbers = new Set();

function createNumbers() {
    const grid = document.getElementById('numbersGrid');

    for (let i = 1; i <= totalNumbers; i++) {
        const numberBtn = document.createElement('button');
        numberBtn.className = 'number';
        numberBtn.textContent = i.toString().padStart(2, '0');

        if (soldNumbers.has(i)) {
            numberBtn.classList.add('sold');
        } else {
            numberBtn.addEventListener('click', () => toggleNumber(i, numberBtn));
        }

        grid.appendChild(numberBtn);
    }
}

function toggleNumber(num, btn) {
    if (soldNumbers.has(num)) return;

    if (selectedNumbers.has(num)) {
        selectedNumbers.delete(num);
        btn.classList.remove('selected');
    } else {
        selectedNumbers.add(num);
        btn.classList.add('selected');
    }

    updateSelectedNumbersDisplay();
}

function updateSelectedNumbersDisplay() {
    const display = document.getElementById('selectedNumbersDisplay');
    display.textContent = Array.from(selectedNumbers).sort((a, b) => a - b).join(', ');
}

// Preview do comprovante
const pixProofInput = document.getElementById('pixProof');
pixProofInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById('previewImage');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

const form = document.getElementById('rifaForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (selectedNumbers.size === 0) {
        alert('Por favor, selecione pelo menos um número!');
        return;
    }

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const pixProof = pixProofInput.value;

    if (!pixProof) {
        alert('Por favor, anexe o comprovante do PIX!');
        return;
    }

    selectedNumbers.forEach(num => {
        soldNumbers.add(num);
        const btn = document.querySelector(`.number:nth-child(${num})`);
        btn.classList.remove('selected');
        btn.classList.add('sold');
    });

    alert(`Reserva realizada com sucesso!\n\nNome: ${name}\nTelefone: ${phone}\nNúmeros: ${Array.from(selectedNumbers).join(', ')}\n\nComprovante recebido. Sua reserva será confirmada após a validação do pagamento.`);

    form.reset();
    document.getElementById('previewImage').style.display = 'none';
    selectedNumbers.clear();
    updateSelectedNumbersDisplay();
});

// Inicializar a grade de números
createNumbers();
