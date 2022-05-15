import React from "react";

function Heading({level : HeadingLevel, headcopy}){
	return(
		<HeadingLevel>
			{headcopy}
		</HeadingLevel>
	);
};

export default Heading;