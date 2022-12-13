import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

import Header from '../components/Header'

import '../styles/Records.css'

const API = "https://60fqd2g261.execute-api.us-east-1.amazonaws.com/records/";

const columns = [
    {
        name: 'Day',
        selector: row => row.day,
        // sortable: true,
        // sortFunction: caseInsensitiveSort
    },
    {
        name: 'Hour',
        selector: row => row.hour,
        // sortable: true
    },
    {
        name: 'Ubiety',
        selector: row => row.ubiety,
        // sortable: true
    },
    {
        name: 'Temperature',
        selector: row => `${row.temperature}°C`,
        // sortable: true
    },
    {
        name: 'Humidity',
        selector: row => `${row.humidity}%`,
        // sortable: true
    },
];

const paginationComponentOptions = {
    noRowsPerPage: false,
    paginationTotalRows: 20
}

const Records = () => {
    const [data, setData] = useState([])
    const [month, setMonth] = useState('Aug')
    const [year, setYear] = useState(22)

    useEffect(() => {
        fetch(API + month + year)
            .then(res => res.json())
            .then(data => setData(data.Items))
    }, [month, year])

    data.map(element => {
        element.id = element.time
        element.hour = element.date.split(' ')[1]
        element.day = element.date.split(' ')[0].split('-')[0]
    })
    
    data.sort((a, b) => a.day - b.day)

    const conditionalRowStyles = [
        {
            when: row => row.temperature < 15,
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row.temperature >= 15 && row.temperature < 25,
            style: {
                backgroundColor: 'rgba(248, 148, 6, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row.temperature >= 25,
            style: {
                backgroundColor: 'rgba(242, 38, 19, 0.9)',
                color: 'white',
                '&:hover': {
                    cursor: 'not-allowed',
                },
            },
        },
    ];

    return (
        <div>
            <Header />
            {/* <h1>Ingenico Colombia</h1> */}
            {/* <h2>Registro de temperatura y humedad</h2> */}
            <div>
                <select name="month" id="month" onChange={e => setMonth(e.target.value)}>
                    <option value={"Aug"}>Agosto</option>
                    <option value={"Sep"}>Septiembre</option>
                    <option value={"Oct"}>Octubre</option>
                    <option value={"Nov"}>Noviembre</option>
                    <option value={"Dec"}>Diciembre</option>
                </select>
                <select name="year" id="year" onChange={e => setYear(e.target.value)}>
                    <option value={22}>2022</option>
                    <option value={23}>2023</option>
                </select>
            </div>
            <div className="container-table" id="table-data">
                <div className="table-title">
                    <DataTable
                        title = "Registro de temperatura ambiental y humedad relativa"
                        theme='default'
                        columns={columns}
                        data={data}
                        // selectableRows
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        // conditionalRowStyles={conditionalRowStyles}
                    />
                </div>
            </div>
        </div>
    )
}

export default Records
