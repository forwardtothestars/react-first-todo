import {NotesAPI} from "../API/apiCall";

const SET_COUNTRY_LIST = 'SET_COUNTRY_LIST'
const SET_CITY_LIST = 'SET_CITY_LIST'
const SET_REGION_LIST = 'SET_REGION_LIST'
const SET_SELECTED_COUNTRY = 'SET_SELECTED_COUNTRY'
const SET_SELECTED_CITY = 'SET_SELECTED_CITY'
const SET_SELECTED_REGION = 'SET_SELECTED_REGION'

let initialState = {
    countryList: null,
    cityList: null,
    regionList: null,
    selectedCountry: null,
    selectedCity: null,
    selectedRegion: null
}

export const locationReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_COUNTRY_LIST:
            return {
                ...state,
                countryList: action.countryList
            }

        case SET_CITY_LIST:
            return {
                ...state,
                cityList: action.cityList
            }

        case SET_REGION_LIST:
            return {
                ...state,
                regionList: action.regionList
            }

        case SET_SELECTED_COUNTRY:
            return {
                ...state,
                selectedCountry: action.selectedCountry
            }
        case SET_SELECTED_CITY:
            return {
                ...state,
                selectedCity: action.selectedCity
            }
        case SET_SELECTED_REGION:
            return {
                ...state,
                selectedRegion: action.selectedRegion
            }

        default: return state
    }
}

export const setCountryList = (countryList) => ({type: SET_COUNTRY_LIST, countryList});
export const setCityList = (cityList) => ({type: SET_CITY_LIST, cityList})
export const setRegionList = (regionList) => ({type: SET_REGION_LIST, regionList})
export const setSelectedCountry = (selectedCountry) => ({type: SET_SELECTED_COUNTRY, selectedCountry})
export const setSelectedCity = (selectedCity) => ({type: SET_SELECTED_CITY, selectedCity})
export const setSelectedRegion = (selectedRegion) => ({type: SET_SELECTED_REGION, selectedRegion})

export const getCountries = () => (dispatch) => {
    return (
        NotesAPI.getNotes()
            .then(result => {
                console.log(result);
                dispatch(setCountryList(result.data))
            })
            .catch(err => {

            })
    )
}

