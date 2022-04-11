# keep_clone

## code convention
- 컴포넌트 함수는 arrow 함수로 작성하지 않음.
function name(){}

- folder tree
component
	controller
	view
		styled		
ui
	feature
		memo
		label
		support
data


feature
	[feature name...] ex. navigation, memo, memoContents, label...
		index.js <controller component>
		reducer.js <reducer>
		view
			*.js <presentation component>
			styled <styled-component>
		support
			ui.js <event logic>
data