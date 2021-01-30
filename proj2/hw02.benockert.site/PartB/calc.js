(function() {
	"use strict";
	
	var currentView = '';
	var equation = ''; 
	var hasDecimal = false; //if a decimal point is already part of the number
	var recentFunc = false; //if a function key was the last key pressred

	/*
	 * Limits the display length of numbers by converting currentView to exponential notation
	 *
	 * Taken in part from Mozilla MDN Web Docs
	 */
	function convert_to_expo() {
		currentView = Number.parseFloat(currentView).toExponential(7);
	}

	/*
	 * Updates the calculator "screen"
	 */
	function update_view() {
		var view = document.getElementById('calc_view');
		if (String(currentView).length > 11) {
			convert_to_expo();
		}
		view.innerText = currentView;
	} 
	
	/*
	 * Handles operator button presses; If operator keys are pressed in succession, the most recent operator
	 * is used in the equation 
	 */
	function handle_operator(id) {
		if (recentFunc) {
			equation = equation.substring(0, equation.length - 3);
		} 
		if (id === "func+=") {
			currentView = eval(equation);
			equation = currentView;
			update_view();
		} 
		equation += ' ' + id.substring(4,5) + ' ';
		currentView = '';
		hasDecimal = false;
		recentFunc = true;
	}

	/*
	 * Handle calculator button presses
	 */
	function button_clicked() {
		if (this.id.startsWith("num")) {
			if (currentView === '0') {
				//avoids 0 prepending another number
				currentView = '';
				equation = equation.substring(0, equation.length - 3);
			} 
			if (currentView.length <= 10) {
				equation += this.innerText;
				currentView += this.innerText;
				update_view();
				recentFunc = false;
			} else {
				//display maximum number input alert
				alert("You have the number input limit. Please select an operator key or " +
					"or press C and restart");
			}
		} else if (this.id === "dec" && !hasDecimal) {
			equation += this.innerText;
			currentView += this.innerText;
			update_view();
			hasDecimal = true;
			recentFunc = false;
		} else if (this.id === "clear") {
			equation = '';
			currentView = '';
			update_view();
			hasDecimal = false;
			recentFunc = false;
		} else if (this.id.startsWith("func") && equation !== '') {
			//handles function button clicks as long as a number or decimal has already been entered
			handle_operator(this.id);
		}
		console.log(equation);
	}

	/*
	 * Sets up click action listeners on all calculator buttons
	 */
	function activate_buttons() {
		var btnIds = document.querySelectorAll("button[type='button']");
		/*
		 * forEach learned from Nat Tuck's 03-javascript/page/code2.js lecture notes
		*/
		btnIds.forEach(function(btn) {
			btn.addEventListener('click', button_clicked, false);
		});
	}

	/*
	 * Wait to load learned from Nat Tuck's 03-javascript/page/code2.js lecture notes
	 */
	window.addEventListener('load', activate_buttons, false);

})();
