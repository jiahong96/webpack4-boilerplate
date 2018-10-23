// learning css and style loader
//require('./main.css')

// learning sass loader
// requiring it in webpack entry point
//require('./main.scss')    

// learning import export es2015
import * as notification from './notification'

notification.notify('Notify')
notification.log('Log')

// learning babel loader
class Form {
	constructor(){
		let numbers = [5, 10, 15].map(number => number * 2)	
		console.log(numbers)
	}
}

new Form();