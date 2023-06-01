Survey.StylesManager.applyTheme('modern');


function canShowDynamicChoice(params) {
    if (!params || params.length != 4) return true;
    console.log("params:", params);

    const panelValue = params[0] || [];
    const questionName = params[1];
    const index = params[2] - 1;
    const choiceValue = params[3];

    for (let i = 0; i < panelValue.length; i++) {
        if (i == index) { console.log("dentro continue", i, index); continue; }
        if (panelValue[i][questionName] == choiceValue) {
            console.log("dentro false", panelValue[i][questionName], choiceValue, panelValue, i, questionName); return false;
        }
    }
    return true;
}
Survey.FunctionFactory.Instance.register(
    'canShowDynamicChoice',
    canShowDynamicChoice
);

const json = {
    "questions": [
        {
            "type": 'paneldynamic',
            "name": 'panel1',
            "panelCount": 2,
            "templateElements": [
                {
                    "name": 'question1',
                    "type": 'dropdown',
                    "choicesVisibleIf":
                        "canShowDynamicChoice({panel1}, 'question1', {panelindex}, {item})",
                    "choices": [
                        'Item 1',
                        'Item 2',
                        'Item 3',
                        'Item 4',
                        'Item 5',
                        'Item 6',
                        'Item 7',
                    ],
                },
                {
                    "name": 'comment',
                    "title": 'Please comment',
                    "type": 'comment',
                },
            ],
        },
    ],
};

const jsonConPages = {
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "paneldynamic",
                    "name": "panel1",
                    "templateElements": [
                        {
                            "type": "dropdown",
                            "name": "question1",
                            "choicesVisibleIf": "canShowDynamicChoice({panel1}, 'tipo', {panelindex}, {item})",
                            "choices": [
                                "Item 1",
                                "Item 2",
                                "Item 3",
                                "Item 4",
                                "Item 5",
                                "Item 6",
                                "Item 7"
                            ]
                        },
                        {
                            "type": "comment",
                            "name": "comment",
                            "title": "Please comment"
                        }
                    ],
                    "panelCount": 2
                }
            ]
        },
        {
            "name": "page2",
            "elements": [
                {
                    "type": "text",
                    "name": "question2"
                }
            ]
        }
    ]
}

const jsonReale = {
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "matrixdynamic",
                    "name": "tipocertificato",
                    "title": "tipocertificato",
                    "columns": [
                        {
                            "name": "tipo",
                            "cellType": "dropdown",
                            "isUnique": true,
                            "choicesVisibleIf": "canShowDynamicChoice({tipocertificato}, 'tipo', {rowindex}, {item})",
                            "choices": [
                                "cumulativo",
                                "portatore",
                                "nominativo"
                            ]
                        },
                        {
                            "name": "titoloAf",
                            "cellType": "text"
                        }
                    ],
                    "rowCount": 1,
                    "maxRowCount": 2
                },
                {
                    "type": "text",
                    "name": "question1",
                    "inputType": "number",
                    "max": 10
                },
                {
                    "type": "text",
                    "name": "question2"
                }
            ]
        }
    ],
    "checkErrorsMode": "onValueChanged",
    "widthMode": "static"
}

const jsonTest = {
    "pages": [
        {
            "name": "page1",
            "questions": [
                {
                    "type": 'paneldynamic',
                    "name": 'panel1',
                    "panelCount": 2,
                    "templateElements": [
                        {
                            "name": 'question1',
                            "type": 'dropdown',
                            "choicesVisibleIf":
                                "canShowDynamicChoice({panel1}, 'question1', {panelindex}, {item})",
                            "choices": [
                                'Item 1',
                                'Item 2',
                                'Item 3',
                                'Item 4',
                                'Item 5',
                                'Item 6',
                                'Item 7',
                            ],
                        },
                        {
                            "name": 'comment',
                            "title": 'Please comment',
                            "type": 'comment',
                        },
                    ],
                },
            ],
            "elements": [
                {
                    "type": "matrixdynamic",
                    "name": "tipocertificato",
                    "title": "tipocertificato",
                    "columns": [
                        {
                            "name": "tipo",
                            "cellType": "dropdown",
                            "isUnique": true,
                            "choicesVisibleIf": "canShowDynamicChoice({tipocertificato}, 'tipo', {rowindex}, {item})",
                            "choices": [
                                "cumulativo",
                                "portatore",
                                "nominativo"
                            ]
                        },
                        {
                            "name": "titoloAf",
                            "cellType": "text"
                        }
                    ],
                    "rowCount": 1,
                    "maxRowCount": 2
                },
                {
                    "type": "text",
                    "name": "question1",
                    "inputType": "number",
                    "max": 10
                },
                {
                    "type": "text",
                    "name": "question2"
                }
            ]
        }
    ],
    "checkErrorsMode": "onValueChanged",
    "widthMode": "static"
}

const survey = new Survey.Model(jsonReale);


survey.onComplete.add(function (sender) {
    document.querySelector('#surveyResult').textContent =
        'Result JSON:\n' + JSON.stringify(sender.data, null, 3);
});

survey.render('surveyElement');



