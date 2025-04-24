// ************ Themes ************
var themes = ["default", "aqua", "emerald", "castle", "galaxy", "athletic", "wonderful", "ocean"];
var themesZH = ["默认", "水蓝", "绿宝石", "城堡", "星辰", "天空", "惊奇", "海洋"];

var colors = {
	button: {
		width: '253px',//UI Button
		height: '40px',//UI Button
		font: '25px',//UI Button
		border: '3px'//UI Button
	},
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
	},
	aqua: {
		1: "#bfdfff",
		2: "#8fa7bf",
		3: "#5f6f7f",
		color: "#bfdfff",
		points: "#dfefff",
		locked: "#c4a7b3",
		background: "#001f3f",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
	},
	emerald: {
		1: "#bfffb3",
		2: "#ffffff",
		3: "#7f7f7f",
		color: "#bfffb3",
		points: "#bfffd3",
		locked: "#c4a7b3",
		background: "#0f2400",
		background_tooltip: "rgba(0, 31, 0, 0.75)",
	},
	castle: {
		1: "#ffffff",
		2: "#ffffff",
		3: "#7f7f7f",
		color: "#ffffff",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#1e1506",
		background_tooltip: "rgba(31, 26, 0, 0.75)",
	},
	galaxy: {
		1: "#d8cfff",
		2: "#ffffff",
		3: "#7f7f7f",
		color: "#d8cfff",
		points: "#ffffff",
		locked: "#bf8f8f",
		background: "#120024",
		background_tooltip: "rgba(15, 0, 31, 0.75)",
	},
	athletic: {
		1: "#202020",
		2: "#202020",
		3: "#404040",
		color: "#202020",
		points: "#202020",
		locked: "#bf8f8f",
		background: "#007eff",
		background_tooltip: "rgba(220, 235, 255, 0.75)",
	},
	wonderful: {
		1: "#50004b",
		2: "#50004b",
		3: "#404040",
		color: "#50004b",
		points: "#50004b",
		locked: "#bf8f8f",
		background: "#ff8bf5",
		background_tooltip: "rgba(220, 235, 255, 0.75)",
	},
	ocean: {
		1: "#bfdfff",
		2: "#8fa7bf",
		3: "#5f6f7f",
		color: "#bfdfff",
		points: "#dfefff",
		locked: "#c4a7b3",
		background: "linear-gradient(to bottom, #1a6fc9 0%, #0d47a1 50%, #002171 100%)",
		background_tooltip: "rgba(220, 235, 255, 0.75)",
	},
}

function changeTheme() {
	colors_theme = colors[options.theme || "default"];
	document.body.style.setProperty('--background', colors_theme["background"]);
	document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
	document.body.style.setProperty('--color', colors_theme["color"]);
	document.body.style.setProperty('--points', colors_theme["points"]);
	document.body.style.setProperty("--locked", colors_theme["locked"]);
}
function getThemeName() {
	let name = options.theme ? options.theme : "default";
	let index = themes.indexOf(options.theme)
	return themesZH[index] || name;
}

function switchTheme() {
	let index = themes.indexOf(options.theme)
	if (options.theme === null || index >= themes.length-1 || index < 0) {
		options.theme = themes[0];
	}
	else {
		index ++;
		index = index % themes.length;
		options.theme = themes[index];
	}
	changeTheme();
	resizeCanvas();
}
