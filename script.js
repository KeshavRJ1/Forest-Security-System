const reportSection = document.getElementById('reportSection');
const alertSection = document.getElementById('alertSection');
const statsSection = document.getElementById('statsSection');
const alertList = document.getElementById('alertList');

let reports = [];

function showReport() {
    reportSection.classList.remove('hidden');
    alertSection.classList.add('hidden');
    statsSection.classList.add('hidden');
}

function showAlerts() {
    reportSection.classList.add('hidden');
    alertSection.classList.remove('hidden');
    statsSection.classList.add('hidden');
}

function showStats() {
    reportSection.classList.add('hidden');
    alertSection.classList.add('hidden');
    statsSection.classList.remove('hidden');

    document.getElementById('totalReports').textContent = reports.length;

    if(reports.length>0){
        let freq = {};
        reports.forEach(r=> freq[r.animal] = (freq[r.animal]||0)+1);
        let maxAnimal = Object.keys(freq).reduce((a,b)=> freq[a]>freq[b]?a:b);
        document.getElementById('mostAnimal').textContent = maxAnimal;
    } else {
        document.getElementById('mostAnimal').textContent = "N/A";
    }
}

function submitReport() {
    const animal = document.getElementById('animal').value.trim();
    const location = document.getElementById('location').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const number = document.getElementById('number').value.trim();

    if(animal && location && date && time && number){
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${animal}</strong> at <em>${location}</em><br>
            📅 ${date} ⏰ ${time} 📞 ${number}<br>
            <img src="images/alert.png" alt="alert">
        `;
        alertList.appendChild(li);

        reports.push({animal, location, date, time, number});

        document.getElementById('animal').value='';
        document.getElementById('location').value='';
        document.getElementById('date').value='';
        document.getElementById('time').value='';
        document.getElementById('number').value='';

        showAlerts();
    } else {
        alert("Please fill in all fields!");
    }
}
