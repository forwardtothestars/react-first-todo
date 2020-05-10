import React from "react";
import CountryComboBox from "../Country/CountryComboBox";
import RegionComboBox from "../Region/RegionComboBox";
import CityComboBox from "../City/CityComboBox";


const Weather = (props) => {
    return (
        <div>
            <div>
                <CountryComboBox/>
            </div>
            <div>
                <RegionComboBox/>
            </div>
            <div>
                <CityComboBox/>
            </div>
        </div>
    )
}

export default Weather;