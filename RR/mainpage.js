async function loadTable() {
    const res = await fetch('/cars')
    const data = await res.json();

    if (!data.length) return;

    const headerRow = document.getElementById('headerRow');
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });

    const tbody = document.getElementById('tableBody');
    data.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);


    });

}
loadTable();
