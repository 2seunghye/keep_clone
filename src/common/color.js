export const color_palette = [
	"#ffffff",
	"#f3e5f5",
	"#ede7f6",
	"#e8eaf6",
	"#e3f2fd",
	"#e1f5fe",
	"#e0f7fa",
	"#e0f2f1",
	"#e8f5e9",
	"#f1f8e9",
	"#f9fbe7",
	"#efebe9",
	"#eceff1",
];

const convertColorByHSL = function(_color, _level){};
// Theme 
class Theme {
	constructor(spec){
		this.name = spec.name;
		this.interface = `theme/${spec.name}`;
		this.color = {
			default : spec.font,
			level : spec.level
		}
		this.base = color_palette;
		// this.color = {
		// 	font : spec.font,
		// 	background : spec.background 
		// };
	}
	makePalette(
		_default = this.color.default,
		_base = this.base
	){
		const convert = (()=>(this.base.map(color => convertColorByHSL(color, this.color.level))))();
		this.palette = [
			_default,
			...convert
		];
		return this;
	}
	monitor(){
		// console.log(`theme:${this.name} monitor`,  this);
		return this;
	}
};
// theme instance
const dark = new Theme({
	name : "dark",
	font : "#fff",
	level : "40%"
});
const light = new Theme({
	name : "light",
	font : "#333",
	level : "0%"
});
dark.makePalette().monitor();
light.makePalette().monitor();
// grouping n export
export const theme_mode = {
	[light.name] : light,
	[dark.name] : dark,
};