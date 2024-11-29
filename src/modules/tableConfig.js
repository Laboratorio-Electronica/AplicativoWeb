const columns = [
    {
        name: 'Day',
        selector: row => row.day,
        center: true,
        minWidth: '5.2rem',
        compact: true
    },
    {
        name: 'Hour',
        selector: row => row.hour,
        center: true,
        compact: true,
        minWidth: '6.4rem'

    },
    {
        name: 'Temperature',
        selector: row => `${row.temperature}°C`,
        center: true,
        compact: true,
        minWidth: '10rem'
    },
    {
        name: 'Humidity',
        selector: row => `${row.humidity}%`,
        center: true,
        compact: true,
        minWidth: '8rem'
    },
];

const paginationComponentOptions = {
    noRowsPerPage: false,
    paginationTotalRows: 20
}

const conditionalRowStyles = [
    {
        when: row => row.temperature < 0,
        style: {
            backgroundColor: '#618af2',
            color: 'white',
            '&:hover': {
                cursor: 'pointer',
            },
        },
    },
    {
        when: row => row.temperature >= 50,
        style: {
            backgroundColor: 'rgba(242, 38, 19, 0.9)',
            color: 'white',
            '&:hover': {
                cursor: 'not-allowed',
            },
        },
    },
    {
        when: row => row.humidity > 80,
        style: {
            backgroundColor: 'rgba(242, 38, 19, 0.9)',
            color: 'white',
            '&:hover': {
                cursor: 'not-allowed',
            },
        },
    },
];

const selectData = (data, dataLaboratory, dataWarehouse) => {
    data.map(element => {
        element.id = element.id
        element.hour = element.date.split(' ')[1]
        element.day = element.date.split(' ')[0].split('-')[0]
    })
    
    data.sort((a, b) => a.day - b.day)

    data.map(element => {
        if (element.ubiety === "laboratory") {
            dataLaboratory.push(element)
        }
        if (element.ubiety === "warehouse") {
            dataWarehouse.push(element)
        }
    })
}

export default selectData
export { columns, paginationComponentOptions, conditionalRowStyles }