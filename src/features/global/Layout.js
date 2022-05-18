import React from "react";
import { Link, Outlet } from "react-router-dom";
// toolkit
import Navigation from "features/global/Navigation";
import Popup from "features/popup/Popup";
import EditLabel from "features/label/component/EditLabel";
function Layout(){
	return(
		<>
			{/* header */}
			<header>
				{/* navigation handler */}
				<button type="button">
					toggle Navigation status - full | compact
				</button>
				{/* home button */}
				<Link to="/">
					<strong>Keep</strong>
				</Link>
				{/* search area */}
				<div>
					{/* location to "/search" by useLocation */}
					<label htmlFor="search_input">
						<input type="text" id="search_input" placeholder="Search" />
					</label>
					<button type="button">Search</button>
				</div>
				{/* refresh lsit */}
				<button type="button">
					Refresh memo list
				</button>
				<button type="button" aria-controls="config_group">
					Configuration
				</button>
				<ul id="config_group">
					<li>Configuration</li>
					<li>Use dark mode theme</li>
					{/* <li>의견보내기</li>
					<li>고객센터</li>
					<li>앱 다운로드</li>
					<li>단축키</li> */}
				</ul>
			</header>
			{/* navigation */}
			<Navigation />
			
			
			{/* app main contents */}
			<div className="main">
				<Outlet/>
			</div>

			{/* 메모 선택시 플로팅 */}
			<div className="hidden-menu">
				<div>
					<button type="button">
						close
					</button>
					<span>{`${1}개 선택됨`}</span>
				</div>
				<div>
					{"menu ui component!"}
				</div>
			</div>

			{/* popup */}
			<Popup keyname={"라벨 수정"} contents={<EditLabel/>} />
			{/* 
			<Popup keyname={"더보기"} contents={<MemoUI keyname={"더보기"} uiList={ui_list_on_tooltip} />}/>
			<Popup keyname={"배경 옵션"} contents={<BackgroundColorPicker />}/> */}
		</>
	)
}

export default Layout;