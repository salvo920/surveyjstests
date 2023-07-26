export const json = {
    "title": "questionario",
    "pages": [
        {
            "name": "page1",
            "elements": [
                {
                    "type": "paneldynamic",
                    "name": "elemento1",
                    "title": "elemento di test",
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