import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import selectData, { columns, paginationComponentOptions, conditionalRowStyles } from '../modules/tableConfig'

import Header from '../components/Header'

import '../styles/pages/Records.css'

const API = "https://60fqd2g261.execute-api.us-east-1.amazonaws.com/records/";

const Records = () => {
    var dataWarehouse = []
    var dataLaboratory = []

    const [data, setData] = useState([])
    const [month, setMonth] = useState('Jan')
    const [year, setYear] = useState(23)

    useEffect(() => {
        fetch(API + month + year)
            .then(res => res.json())
            .then(data => setData(data.Items))
    }, [month, year])

    selectData(data, dataLaboratory, dataWarehouse)

    return (
        <div>
            <Header />
            <div className='records-container'>
                <select name="month" id="month" onChange={e => setMonth(e.target.value)}>
                    <option value={"Jan"}>Enero</option>
                    <option value={"Feb"}>Febrero</option>
                    <option value={"Mar"}>Marzo</option>
                    <option value={"Apr"}>Abril</option>
                    <option value={"May"}>Mayo</option>
                    <option value={"Jun"}>Junio</option>
                    <option value={"Jul"}>Julio</option>
                    <option value={"Aug"}>Agosto</option>
                    <option value={"Sep"}>Septiembre</option>
                    <option value={"Oct"}>Octubre</option>
                    <option value={"Nov"}>Noviembre</option>
                    <option value={"Dec"}>Diciembre</option>

                </select>
                <select name="year" id="year" onChange={e => setYear(e.target.value)}>
                    <option value={23}>2023</option>
                    <option value={22}>2022</option>
                </select>
            </div>
            <div className="container-table" id="table-data">
                <div className="table-title">
                    <div className='table'>
                        <DataTable
                            title = "Laboratory"
                            theme='default'
                            columns={columns}
                            data={dataLaboratory}
                            pagination
                            paginationComponentOptions={paginationComponentOptions}
                            conditionalRowStyles={conditionalRowStyles}
                        />
                    </div>
                    <div className='table'>
                        <DataTable
                            title = "Warehouse"
                            theme='default'
                            columns={columns}
                            data={dataWarehouse}
                            pagination
                            paginationComponentOptions={paginationComponentOptions}
                            conditionalRowStyles={conditionalRowStyles}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Records
