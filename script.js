let callsData = [];

async function loadCalls() {

    const response = await fetch('calls.json');

    callsData = await response.json();

    populateAgencyFilter();

    renderTable(callsData);
}

function renderTable(data) {

    const tableBody = document.getElementById('tableBody');

    tableBody.innerHTML = '';

    data.forEach(call => {

        const row = `
            <tr>
                <td>${call.agency}</td>
                <td>${call.title}</td>
                <td>${call.deadline}</td>
                <td>
                    <a href="${call.link}" target="_blank"
                       class="btn btn-sm btn-success">
                       Open
                    </a>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });
}

function populateAgencyFilter() {

    const agencies = [...new Set(callsData.map(item => item.agency))];

    const filter = document.getElementById('agencyFilter');

    agencies.forEach(agency => {

        const option = document.createElement('option');

        option.value = agency;

        option.textContent = agency;

        filter.appendChild(option);
    });
}

function sortByDeadline() {

    callsData.sort((a, b) =>
        new Date(a.deadline) - new Date(b.deadline)
    );

    renderTable(callsData);
}

function applyFilters() {

    const searchText =
        document.getElementById('searchInput')
        .value
        .toLowerCase();

    const agency =
        document.getElementById('agencyFilter').value;

    const filtered = callsData.filter(call => {

        const matchesSearch =
            call.title.toLowerCase().includes(searchText) ||
            call.agency.toLowerCase().includes(searchText);

        const matchesAgency =
            agency === '' || call.agency === agency;

        return matchesSearch && matchesAgency;
    });

    renderTable(filtered);
}

document.getElementById('searchInput')
    .addEventListener('keyup', applyFilters);

document.getElementById('agencyFilter')
    .addEventListener('change', applyFilters);

loadCalls();
