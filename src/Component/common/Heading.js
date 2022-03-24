import React from "react";

function Heading({level : Heading_level, headcopy}){
	return(
		<Heading_level>
			{headcopy}
		</Heading_level>
	);
};

export default Heading;