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
    BarElement
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
//   } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const API = "http://192.168.1.100:9090/thermohygrometer/";

const Records = () => {
    const dataWarehouse = []
    const dataLaboratory = []

    const [data, setData] = useState([])
    const [month, setMonth] = useState('Feb')
    const [year, setYear] = useState(25)

    useEffect(() => {
        fetch(API + month + year)
            .then(res => res.json())
            .then(data => setData(data.content))
    }, [month, year])

    selectData(data, dataLaboratory, dataWarehouse)

    // console.log(dataLaboratory)


    function dataForGraphic(data) {
        const temperatureValue = [];
        const humidityValue = [];
        const ID = [];
        data.forEach(element => {
            ID.push(element.date)
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

    const dataGraphicTemperature = {
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
    const dataGraphicHumidity = {
        // labels: ['USA', 'Mexico', 'Italia', 'Colombia', 'Espana'],
        labels: dataIDWarehouse,
        datasets: [{
            label: 'Laboratory',
            backgroundColor: "blue",
            borderColor: 'black',
            borderWidth: 1,
            hoverBackgroundColor: "black",
            hoverBorderColor: 'white',
            data: dataHumidityLaboratory
        },
        {
            label: 'Warehouse',
            backgroundColor: "gray",
            borderColor: 'black',
            borderWidth: 1,
            hoverBackgroundColor: "white",
            hoverBorderColor: 'white',
            // data: [327.4, 23.7, 54.7, 32, 76]
            data: dataHumidityWarehouse
        }]
    };
    const optionsGraphicTemperature = {
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
                text: "Grafica de temperatura"
            },
            annotation: {
                annotations: {
                    line: {
                        // Indicates the type of annotation
                        type: "box",
                        //   xMin: 1,
                        //   xMax: 2,
                        yMin: 25,
                        //   yMax: 40,
                        backgroundColor: "rgba(255, 99, 132, 0.25)"
                    }
                }
            }
        }
    }
    const optionsGraphicHumidity = {
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
                text: "Grafica de humedad"
            },
            annotation: {
                annotations: {
                    line: {
                        // Indicates the type of annotation
                        type: "box",
                        //   xMin: 1,
                        //   xMax: 2,
                        yMin: 58,
                        //   yMax: 40,
                        backgroundColor: "rgba(255, 99, 132, 0.25)"
                    }
                }
            }
        }
    }
    const plugins = {
        
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      };

      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

      const dataBar = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
          //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            data: [100, 875, 231, 345, 345, 565, 323],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
          //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          data: [10, 375, 631, 325, 145, 535, 623],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    return (
        <div>
            <Header />

            <div className='records-container'>
                <select name="month" id="month" onChange={e => setMonth(e.target.value)}>
                    <option value={"Jan"}>Enero</option>
                    <option value={"Feb"} selected>Febrero</option>
                    <option value={"Mar"}>Marzo</option>
                    <option value={"Apr"}>Abril</option>
                    <option value={"May"}>Mayo</option>
                    <option value={"Jun"}>Junio</option>
                    <option value={"Jul"}>Julio</option>
                    <option value={"Aug"}>Agosto</option>
                    <option value={"Sep"} >Septiembre</option>
                    <option value={"Oct"}>Octubre</option>
                    <option value={"Nov"}>Noviembre</option>
                    <option value={"Dec"}>Diciembre</option>

                </select>
                <select name="year" id="year" onChange={e => setYear(e.target.value)}>
                    <option value={25}>2025</option>
                    {/* <option value={22}>2022</option> */}
                </select>
            </div>
            <div className="container-table" id="table-data">
                <div className="table-title">
                    {/* <div className='table'>
                        <DataTable
                            title = "Laboratory"
                            theme='default'
                            columns={columns}
                            data={dataLaboratory}
                            pagination
                            paginationComponentOptions={paginationComponentOptions}
                            conditionalRowStyles={conditionalRowStyles}
                        />
                    </div> */}
                        {/* <div className='table'>
                            <DataTable
                                title = "Warehouse"
                                theme='default'
                                columns={columns}
                                data={dataWarehouse}
                                pagination
                                paginationComponentOptions={paginationComponentOptions}
                                conditionalRowStyles={conditionalRowStyles}
                            />
                        </div> */}
                    <div style={{width: "50%", height: "50rem", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Line data={dataGraphicTemperature} options={optionsGraphicTemperature} />
                        <Line data={dataGraphicHumidity} options={optionsGraphicHumidity} />
                        {/* <Bar options={optionsGraphic} data={dataGraphic} />; */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Records
