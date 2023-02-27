import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import selectData, {
    columns,
    paginationComponentOptions,
    conditionalRowStyles
} from '../modules/tableConfig'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

import Header from '../components/Header'

import '../styles/pages/Records.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin
);

const API = "https://60fqd2g261.execute-api.us-east-1.amazonaws.com/records/";

const Records = () => {
    const dataWarehouse = []
    const dataLaboratory = []

    const [data, setData] = useState([])
    const [month, setMonth] = useState('Jan')
    const [year, setYear] = useState(23)

    useEffect(() => {
        fetch(API + month + year)
            .then(res => res.json())
            .then(data => setData(data.Items))
    }, [month, year])

    selectData(data, dataLaboratory, dataWarehouse)

    // console.log(dataLaboratory)


    function dataForGraphic(data) {
        const temperatureValue = [];
        const humidityValue = [];
        const ID = [];
        data.forEach(element => {
            ID.push(element.day)
            temperatureValue.push(parseInt(element.temperature))
            humidityValue.push(parseInt(element.humidity))
        })
    return [temperatureValue, humidityValue, ID]
    }

    let dataIDLaboratory;
    let dataTemperatureLaboratory
    let dataHumidityLaboratory
    [dataTemperatureLaboratory, dataHumidityLaboratory, dataIDLaboratory] = dataForGraphic(dataLaboratory)
    
    let dataIDWarehouse;
    let dataTemperatureWarehouse
    let dataHumidityWarehouse
    [dataTemperatureWarehouse, dataHumidityWarehouse, dataIDWarehouse] = dataForGraphic(dataWarehouse)
    // dataIDWarehouse = dataIDLaboratory

    // console.log(dataForGraphic(dataWarehouse))
    // console.log(dataForGraphic(dataLaboratory))

    // console.log('data temperatura' + dataTemperatureValue)
    // console.log('id' + dataID)

    // console.log('Laboratorio' + dataIDLaboratory)
    // console.log('Bodega' + dataIDWarehouse)

    const dataGraphic = {
        // labels: ['USA', 'Mexico', 'Italia', 'Colombia', 'Espana'],
        labels: dataIDWarehouse,
        datasets: [{
            label: 'Laboratory',
            backgroundColor: "blue",
            borderColor: 'black',
            borderWidth: 1,
            hoverBackgroundColor: "black",
            hoverBorderColor: 'white',
            data: dataTemperatureLaboratory
        },
        {
            label: 'Warehouse',
            backgroundColor: "gray",
            borderColor: 'black',
            borderWidth: 1,
            hoverBackgroundColor: "white",
            hoverBorderColor: 'white',
            // data: [327.4, 23.7, 54.7, 32, 76]
            data: dataTemperatureWarehouse
        }]
    };
    const optionsGraphic = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                min: 0
            },
        },
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: "Chart.js Line Chart"
            },
            annotation: {
                annotations: {
                    line: {
                        // Indicates the type of annotation
                        type: "box",
                        //   xMin: 1,
                        //   xMax: 2,
                        yMin: 20,
                        //   yMax: 40,
                        backgroundColor: "rgba(255, 99, 132, 0.25)"
                    }
                }
            }
        }
    }
    const plugins = {
        
    }

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
                    <div style={{width: "100%", height: "50rem"}}>
                        <Line data={dataGraphic} options={optionsGraphic} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Records
