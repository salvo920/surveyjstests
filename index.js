Survey.StylesManager.applyTheme('modern');


function ValidateSumFields(params) {
    console.log("params:", params);
    if (!params || params.includes(undefined)) return true;

    const panelValue = params[0] || [];
    const questionName = params[1];
    // const index = params[2] - 1;
    // const choiceValue = params[3];

    const initialValue = 0;
    const totVal = panelValue.reduce(
        (accumulator, currentValue) => accumulator + currentValue[questionName],
        initialValue);

    console.log("totVal : ", totVal)

    return (totVal == 100) ? true : false;

    // for (let i = 0; i < panelValue.length; i++) {
    // if (i == index) { console.log("dentro continue", i, index); continue; }
    // if (panelValue[i][questionName] == choiceValue) {
    //     console.log("dentro false", panelValue[i][questionName], choiceValue, panelValue, i, questionName); return false;
    // }
    // }
    // return true;
}
Survey.FunctionFactory.Instance.register(
    'ValidateSumFields',
    ValidateSumFields
);

const json = {
    "title": "questionario",
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "paneldynamic",
                    "name": "elemento1",
                    "title": "elemento1",
                    "templateElements": [
                        {
                            "type": "text",
                            "name": "question1",
                            "isRequired": true,
                            "validators": [
                                {
                                    "type": "expression",
                                    "text": "Tutti i campi question 1 deveno avere una somma = 100",
                                    "expression": "ValidateSumFields({elemento1},'question1')"
                                }
                            ],
                            "inputType": "number"
                        }
                    ],
                    "panelCount": 1,
                    "minPanelCount": 1
                }
            ]
        }
    ],
    "showQuestionNumbers": "off",
    "checkErrorsMode": "onComplete"
}

const jsonTest = {
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

const survey = new Survey.Model(json);


survey.onComplete.add(function (sender) {
    document.querySelector('#surveyResult').textContent =
        'Result JSON:\n' + JSON.stringify(sender.data, null, 3);
});

survey.render('surveyElement');


// task
// creare un panel dynamic che fa la somma dei campi  e tramite una custom function ,
// la somma deve essere uguale a 100 , la validazione deve segnare un errore 