
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


const survey = new Survey.Model(json);


survey.onComplete.add(function (sender) {
	document.querySelector('#surveyResult').textContent =
		'Result JSON:\n' + JSON.stringify(sender.data, null, 3);
});

survey.render('surveyElement');
