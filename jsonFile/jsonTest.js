export const jsonTest = {
    "checkErrorsMode": "onValueChanged",
    "elements": [
        {
            "type": "html",
            "name": "requesting",
            "html": "The data is requesting",
            "visibleIf": "{country_request_processing} = true"
        },
        {
            "type": "text",
            "name": "country",
            "title": "Please enter the country name:",
            "placeHolder": "Estonia",
            "validators": [
                {
                    "type": "expression",
                    "expression": "isCountryExist({country}) = true",
                    "text": "We could not find country with this name."
                }
            ]
        },
        {
            "type": "expression",
            "name": "officialName",
            "title": "Oficial name {country} is:",
            "expression": "getCountryOfficialName({country})",
            "visibleIf": "{officialName} notempty"
        },
        {
            "type": "expression",
            "name": "region",
            "title": "{country} is located in region:",
            "expression": "getCountryRegion({country})",
            "visibleIf": "{region} notempty"
        }
    ]
}