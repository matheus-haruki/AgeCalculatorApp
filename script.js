function clique() {
    const day = document.querySelector('.day');
    const month = document.querySelector('.month');
    const year = document.querySelector('.year');
    const resultYear = document.querySelector('.result-year');
    const resultMonth = document.querySelector('.result-month');
    const resultDay = document.querySelector('.result-day');
    const emptyErrors = document.querySelectorAll('.empty-hidden');
    const invalidErrors = document.querySelectorAll('.invalid-hidden');
    const labels = document.querySelectorAll('label');

    const today = new Date();

    const resetPlaceholders = () => {
        day.placeholder = 'DD';
        month.placeholder = 'MM';
        year.placeholder = 'YYYY';
    };

    const resetResults = () => {
        resultYear.innerHTML = '--';
        resultMonth.innerHTML = '--';
        resultDay.innerHTML = '--';
    };

    // Handle empty fields
    if (!day.value || !month.value || !year.value || isNaN(day.value) || isNaN(month.value) || isNaN(year.value)) {
        labels.forEach(label => label.classList.add('label-error'));
        emptyErrors.forEach(error => error.style.display = 'block');
        invalidErrors.forEach(error => error.style.display = 'none');
        [day, month, year].forEach(input => {
            if (!input.value) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = '';
            }
        });
        resetPlaceholders();
        resetResults();
        return;
    } else {
        labels.forEach(label => label.classList.remove('label-error'));
        emptyErrors.forEach(error => error.style.display = 'none');
        [day, month, year].forEach(input => {
            input.style.border = '';
        });
    }

    const birthDate = new Date(year.value, month.value - 1, day.value);

    // Check if the date is valid
    if (
        birthDate.toString() === "Invalid Date" || 
        birthDate.getDate() != day.value || 
        birthDate.getMonth() + 1 != month.value || 
        birthDate.getFullYear() != year.value
    ) {
        labels.forEach(label => label.classList.add('label-error'));
        invalidErrors.forEach(error => error.style.display = 'block');
        emptyErrors.forEach(error => error.style.display = 'none');
        [day, month, year].forEach(input => {
            input.style.border = '1px solid red';
        });
        resetPlaceholders();
        resetResults();
        return;
    } else {
        labels.forEach(label => label.classList.remove('label-error'));
        invalidErrors.forEach(error => error.style.display = 'none');
        [day, month, year].forEach(input => {
            input.style.border = '';
        });
    }

    // Check if the birth date is in the future
    if (birthDate > today) {
        labels.forEach(label => label.classList.add('label-error'));
        invalidErrors.forEach(error => error.style.display = 'block');
        emptyErrors.forEach(error => error.style.display = 'none');
        [day, month, year].forEach(input => input.style.border = '1px solid red');
        resetPlaceholders();
        resetResults();
        return;
    }

    let idade_ano = today.getFullYear() - birthDate.getFullYear();
    let idade_mes = today.getMonth() - birthDate.getMonth();
    let idade_dia = today.getDate() - birthDate.getDate();

    if (idade_dia < 0) {
        idade_mes--;
        idade_dia += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (idade_mes < 0) {
        idade_ano--;
        idade_mes += 12;
    }

    resultYear.innerHTML = idade_ano;
    resultMonth.innerHTML = idade_mes;
    resultDay.innerHTML = idade_dia;
}
