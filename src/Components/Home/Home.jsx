import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Home.css"

let Home = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");


    // async function fetchData(){
    //     let data = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?ManufacturerType=Intermediate&format=json`)
    //     // console.log(data);
    //     let dataj = data.json()
    //     console.log(dataj);
    //     let result=dataj.Results
    //     setSearchQuery(result)
    // }
    // useEffect(()=>{
    //     fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?ManufacturerType=Intermediate&format=json`)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data);
    //         // setOutput=data
    //     })

    // },[])

    function SearchData() {
        let Data = data.filter((el) => {
            return search === el.Mfr_CommonName;
        });

         setData(Data)
        console.log(Data);
    }
    useEffect(() => {
        fetch(
            "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=2"
        )
            .then((res) => {
                return res.json();
            })
            .then((vehicleData) => {
                setData(vehicleData.Results);
                console.log(vehicleData);
            })
           
    }, []);
    

    return (
        <div className="All-content">
            <div>
            <header >VEHICLE MANUFACTURERS</header>
            </div>
            

            <div className="search-bar">
                <div >
                    <label htmlFor="search" className="s1">Search:</label>
                    <input type="text" id="search" value={search} onChange={(e) => { setSearch(e.target.value); SearchData() }} />
                </div>

                <div >
                    <label  className="s1">Filter By Vehicle Type:</label>
                    <select name="filterList" id="filterList">
                        <option value="all">All</option>
                        <option value="passenger_car">Passenger Car</option>
                        <option value="truck">Truck</option>
                        <option value="motercycle">Motercycle</option>
                        <option value="trailer">Trailer</option>
                        <option value="lsv">Low speed vehicle(LSV)</option>
                        <option value="offRoad">Off Road Vehicle</option>
                        <option value="mpv">Multipurpose Passenger Vehicle(MPV)</option>
                        <option value="bus">Bus</option>
                        <option value="incomplete">Incomplete Vehicle</option>

                    </select>
                </div>
            </div>

            <div className="vehicle-data">
                <table>
                    <thead>
                        <tr className="tr1">


                            <th>Name</th>
                            <th>Country</th>
                            <th>Type</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((Key, index) => {

                            return (

                                <tr key={index}>
                                    <td>{Key.Mfr_CommonName}</td>
                                    <td>{Key.Country}</td>
                                    <td>{Key.VehicleTypes.length > 0 && Key.VehicleTypes[0].Name}</td>
                                </tr>
                            )
                        }
                        )}

                    </tbody>

                </table>
            </div>


        </div>
    );
};

export default Home;