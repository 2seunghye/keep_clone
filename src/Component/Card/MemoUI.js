import React, { Fragment, useRef } from "react";
// data
import { color_palette } from "../../data/color";
// component:called
import BackgroundColorPicker from "./BackgroundColorPicker";
import UIButton from "../common/UIButton";
// component
function MemoUI({ floorList, moreList }) {
	return (
		<Fragment>
			{/* floor list */}
			<div
				style={{
					display: "flex",
				}}
			>
				{floorList.map(({ name, interaction }) => {
					if(name === "배경 옵션") return(
						<Fragment key={name}>
							<BackgroundColorPicker colorPalette={color_palette} dispatchColor={interaction}/>
							<UIButton name={name} interaction={interaction} />
						</Fragment>
					);
					return <UIButton key={name} name={name} interaction={interaction} />
				})}
			</div>
			<UIButton name={"더보기"} interaction={null}/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				{/* more list */}
				{moreList.map(({ name, interaction }) => (
					<UIButton key={name} name={name} interaction={interaction} />
				))}
			</div>
			<UIButton name={"닫기"}/>
		</Fragment>
	);
}

export default MemoUI;
