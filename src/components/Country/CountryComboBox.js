import React from 'react';
import {connect} from "react-redux";
import {getCountries} from "../../Redux/location-reducer";
import ComboBox from "../common/ComboBox";


class CountryComboBox extends React.Component {

    componentDidMount() {
        this.props.getCountries();
    }

    render() {
        debugger
        return (
            <ComboBox items={this.props.locationData.countryList}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        locationData: state.locationData
    }
}

export default connect(mapStateToProps,{getCountries})(CountryComboBox)


