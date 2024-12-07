let modInfo = {
	name: "挖矿增量页",
	nameEN: "The Mining Incremental Table",// When you open the otherLanguageMod, this is the second language
	id: "AS6K's TMT Game #2",
	author: "AngryStar6K",
	pointsName: "经验",
	modFiles: ["layers.js", "tree.js"],

	otherLanguageMod: false,// When on, it will ask the player to choose a language at the beginning of the game
	languageMod: false,// Use when otherLanguageMod is off, default are true -> English, false -> Chinese
	//It offers a portable way to translate, but it is not recommended

	forceOneTab: false,// Enable Single-Tab Mode ( This feature doen't work fluently as you'd imagine, it's made for expert )
	showTab: 'tree-node',// if you open forceOneTab, it will show this page everytime you refresh the page

	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

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
}

// Set your version in num and name
let VERSION = {
	num: "0.3",
	name: "",
}

function changelog(){
	return (options.ch || modInfo.languageMod==false)?`
		<br><br><br><h1>更新日志:</h1><br>(不存在<span style='color: red'><s>剧透警告</s></span>)<br><br>
		<span style="font-size: 17px;">
			<h3>v0.3 - 来点硬货</h3><br>
				- 版本终点：完成全部普通成就，约1e3225经验<br>
				- 成就总数：44 + 1<br>
				- 添加世界1层级：铁、镍、铝、铅<br>
				- 添加了1个隐藏成就，隐藏成就只有完成了才会显示<br>
				- 现在经验数量可以在统计内查看数字参照<br>
				- 添加了滚动新闻<br>
				- 不同的滚动新闻数量：30<br>
			<br><br>
			<h3>v0.2 - 初期熔炼与锻造</h3><br>
				- 版本终点：完成全部普通成就，约1e116经验<br>
				- 成就总数：22<br>
				- 添加世界1层级：锡、青铜<br>
				- 添加制造层级：熔炉、合金炉<br>
				- 添加能源层级：红石通量<br>
			<br><br>
			<h3>v0.1 - 冒险的开始</h3><br>
				- 版本终点：完成全部普通成就，约1e28经验<br>
				- 添加杂项层级：统计、成就<br>
				- 成就总数：11<br>
				- 添加世界1层级：木头、石头、铜<br>
				- 添加制造层级：合成台<br>
				- 使用的数字库是ExpantaNum.js<br>
			<br><br>
		`:`
		<br><br><br><h1>ChangeLog:</h1><br>(No<span style='color: red'><s> Spoiler Warning!</s></span>)<br><br>
		<span style="font-size: 17px;">
			<h3><s>NO, YOU SHOULD WRITE THIS YOURSELF</s></h3><br><br>
			<h3>v3.0 - Unprecedented changes</h3><br>
				- Developed The Modding Table, Which, you could say, is another form of TMT<br>
			<br><br>
	`
} 

function winText(){
	return (options.ch || modInfo.languageMod==false)?`你暂时完成了游戏!`:`Congratulations! You have reached the end and beaten this game, but for now...`
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return hasUpgrade('wood', 11)
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new ExpantaNum(0)

	let gain = new ExpantaNum(1)
	gain = gain.times(upgradeEffect('wood', 11))
	return gain
}

function levelUpdating() {
	player.level = player.points.max(1).logBase(25).root(1.25).floor()
}

function nextLevelReq() {
	return ExpantaNum.pow(25, player.level.max(0).add(1).pow(1.25))
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	level: d(0),
	news: true,
}}

// Display extra things at the top of the page
var displayThings = [
	function() {
		if(options.ch==undefined && modInfo.otherLanguageMod==true){return '<big><br>You should choose your language first<br>你需要先选择语言</big>'}
		return displayThingsRes()+'<br><div class="vl2"></div></span>'
		//<div class="res">'+displayThingsRes()+'</div>
	}
]

// You can write stuff here to display them on top-left corner easily
function displayThingsRes(){
	return `<div id="news" class="news" v-if="player.news"><span id="newsText" class="newsContent" style="left: ${ntl}px;">${nt}</span></div>`
}

// Determines when the game "ends"
function isEndgame() {
	return hasNormalAchievement(72)
}

// 
function getPointsDisplay(){
	let a = ''
	if(player.devSpeed && player.devSpeed!=1){
		a += options.ch ? '<br>时间加速: '+format(player.devSpeed)+'x' : '<br>Dev Speed: '+format(player.devSpeed)+'x'
	}
	if(player.offTime!==undefined){
		a += options.ch ? '<br>离线加速剩余时间: '+formatTime(player.offTime.remain) : '<br>Offline Time: '+formatTime(player.offTime.remain)
	}
	a += '<br>'
	if(!(options.ch==undefined && modInfo.otherLanguageMod==true)){
		a += `<span class="overlayThing">${((options.ch || modInfo.languageMod==false)?"你有":"You have")} <h2  class="overlayThing" id="points"> ${format(player.points)}</h2> ${modInfo.pointsName}</span>`
		if(canGenPoints()){
			a += `<br><span class="overlayThing">(`+(tmp.other.oompsMag != 0 ? format(tmp.other.oomps) + " OoM" + (tmp.other.oompsMag < 0 ? "^^2" : tmp.other.oompsMag > 1 ? "^" + tmp.other.oompsMag : "") + "s" : formatSmall(getPointGen()))+`/sec)</span>`
		}
		a += `<br><span class="overlayThing">等级<h2  class="overlayThing" id="points"> ${formatWhole(player.level)}</h2></span>`
		a += `<br><span class="overlayThing">${format(player.points)}/${format(nextLevelReq())}</span>`
		a += `<div style="margin-top: 3px"></div>`
	}
	a += tmp.displayThings
	a += '<br><br>'
	return a
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

ExpantaNum.prototype.hexate = function(x) {
	return this.arrow(4)(x)
}


