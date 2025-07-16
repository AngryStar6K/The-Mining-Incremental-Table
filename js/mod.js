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

	initialStartPoints: new ExpantaNum(0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours 为了动态设置离线时间上限，此项已失效
}


// Set your version in num and name
let VERSION = {
	num: "0.7",
	name: "",
}

function changelog() {
	return (options.ch || modInfo.languageMod == false) ? `
		<br><br><br><h1>更新日志:</h1><br>(含有<span style='color: red'>剧透</span>，请谨慎查看)<br><br>
		<span style="font-size: 17px;">
			<h3>v0.7 - 珍贵的宝石、知识的迸发</h3><br>
				- 版本终点：获得1泰拉钢锭，约e1.000e7,800经验<br>
				- 成就总数：113 + 8<br>
				- 添加世界1层级：铂、钻石、黑曜石、绿宝石、知识精华<br>
				- 添加世界2层级：泰拉钢<br>
				- 添加杂项层级：故事<br>
				- 添加2个显示设置项：更新频率、滚动新闻（可显示或隐藏）<br>
				- 优化、更正游戏文本<br>
				- 低TPS在进行限时挑战时会基于TPS进行批量购买平衡，以保证一秒能够升50级<br>
				- 修复因为数字库改为ExpantaNum.js而导致经验下方(xxx OoM/s, xxx OoM^2/s... etc)显示有差距的问题，并且现在10OoM/s就能变为显示数量级<br>
				- 不同的滚动新闻数量：73<br>
				<br><br>
			<h3>v0.6 - 能源与魔法</h3><br>
				- 版本终点：获得1魔力钢锭，约e5.8000e21经验<br>
				- 成就总数：96 + 6<br>
				- 添加世界1层级：琥珀金、红石、红石琥珀金<br>
				- 添加世界2层级：魔力钢<br>
				- 添加能源层级：魔力<br>
				- 添加制造层级：植物魔法<br>
				- 添加杂项层级：时间跃迁<br>
				- 添加1个显示设置项：主题（TMTa被砍的TMT功能打赢复活赛了）<br>
				- 新闻栏上移到界面顶部<br>
				- 优化游戏文本，修复高炉搭建的检测错误<br>
				- 主游戏界面左上角显示合成、熔炼、合金、奇点的状态（未来新制造层级也会加入），快捷查看有什么状态中断，及时发现<br>
				- 增加游戏TPS显示，支持diff确保游戏资源获取速度正常<br>
				- 更有用的离线时间，你可以消耗离线时间加速游戏，而非原版TMT的离线时间/10倍率自动加速。但是使用时光机回到过去会受到惩罚<br>
				- 不同的滚动新闻数量：70<br>
				<br><br>
			<h3>v0.5 - 闪亮亮的！</h3><br>
				- 版本终点：获得第4金升级，约1e3,500,000经验<br>
				- 成就总数：75 + 1<br>
				- 添加世界1层级：黄铜、钢、银、金<br>
				- 添加3个显示设置项（1个是模板更新，另外2个是自己魔改的）<br>
				- 不同的滚动新闻数量：57<br>
				<br><br>
			<h3>v0.4 - 多合金储备</h3><br>
				- 版本终点：获得第3锌升级，约1e62000经验<br>
				- 成就总数：61 + 1<br>
				- 添加世界1层级：康铜、殷钢、铝黄铜、锌<br>
				- 添加杂项层级：地图<br>
				- 完善之前矿物层级的位置要求（目前不对游戏过程产生影响）<br>
				- 不同的滚动新闻数量：50<br>
			<br><br>
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
		`: `
		<br><br><br><h1>ChangeLog:</h1><br>(No<span style='color: red'><s> Spoiler Warning!</s></span>)<br><br>
		<span style="font-size: 17px;">
			<h3><s>NO, YOU SHOULD WRITE THIS YOURSELF</s></h3><br><br>
			<h3>v3.0 - Unprecedented changes</h3><br>
				- Developed The Modding Table, Which, you could say, is another form of TMT<br>
			<br><br>
	`
}

function winText() {
	return (options.ch || modInfo.languageMod == false) ? `你暂时完成了游戏!` : `Congratulations! You have reached the end and beaten this game, but for now...`
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints() {
	return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints() {
	return hasUpgrade('wood', 11)
}

// Calculate points/sec!
function getPointGen() {
	if (!canGenPoints())
		return new ExpantaNum(0)

	let gain = new ExpantaNum(1)
	gain = gain.times(upgradeEffect('wood', 11))
	return gain
}

function levelUpdating() {
	player.level = player.points.max(1).logBase(25).root(1.25).floor()
}

function tiersUpdating(tier) {
	tier = new ExpantaNum(tier)
	t = tier.toNumber()
	player.tiers[t - 1] = d(player.tiers[t - 1])
	if (tier.eq(1)) player.tiers[t - 1] = player.level.max(1).div(50000).logBase(20).max(0).root(1.35).floor()
}

function nextLevelReq() {
	return ExpantaNum.pow(25, player.level.max(0).add(1).pow(1.25))
}

function nextTiersReq(tier) {
	tier = new ExpantaNum(tier)
	t = tier.toNumber()
	return ExpantaNum.pow(20, player.tiers[t - 1].max(0).add(1).pow(1.35)).times(50000).ceil()
}


// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
	return {
		devSpeed: 1, //锁定为1，转而使用离线时间调整游戏倍率
		offTime: {remain: 0},
		lastTimePlayed: Date.now(),
		gameSpeed: 1,
		level: d(0),
		tiers: [d(0), d(0), d(0), d(0), d(0)],
		news: true,
		devmode: false,
		NaNpause: d(0),
		notationTest: d(0),
		homo: false,
		console: false,
		StevesLavaChicken: d(0),
		random: -1, //每秒刷新随机数0~10000. //熔岩烤鸡使用0~30 概率0.3%
		}
}

// Display extra things at the top of the page
var displayThings = [
	function () {
		if (options.ch == undefined && modInfo.otherLanguageMod == true) { return '<big><br>You should choose your language first<br>你需要先选择语言</big>' }
		return displayThingsRes()
		//<div class="res">'+displayThingsRes()+'</div>
	}
]

function timestampToTime(timestamp) {
	var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '/';
	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '/';
	var D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
	var h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
	var m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
	var s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
	return Y+M+D+h+m+s;
}

// You can write stuff here to display them on top-left corner easily
function displayThingsRes() {
	let r = `<div id="news" class="news" v-if="player.news"><span id="newsText" class="newsContent" style="left: ${ntl}px;">${nt}</span></div>`
	let d = ""
	d = d + `离线时间: ${textColor(formatTime(player.offTime.remain * 1000) + "/" + formatTime(tmp.offline_progress.offlineLimit * 3600000), 'b2ff59')}`
	d = d + "<br>当前位置：" + locationName(player.map.location, true)
	if (tmp[ct].layerShown) {
		d += '<br>'
		if (isCraftingItem()) d += `你正在合成 ${craftingItemName(craftingItemID())}`
		else d += `你当前不在合成`
	}
	if (tmp.furnace.layerShown) {
		d += '<br>'
		if (isSmeltingItem()) d += `你正在熔炼 ${smeltingItemName(smeltingItemID())}`
        else d += `你当前不在熔炼 ${textColor('[!]', 'cc0000')}`
	}
	if (tmp.alloy_s.layerShown) {
		d += '<br>'
		if (isAlloyingItem()) d += `你正在合金 ${alloyingItemName(alloyingItemID())}`
        else d += `你当前不在合金 ${textColor('[!]', 'cc0000')}`
	}
	if (tmp.sing_fus.layerShown) {
		d += '<br>'
		d += player.sing_fus.availableSingularityText
	}
	d += '<br>' + getTpsDisplay()
	if (player.offTime.remain < 0) d += `<br>警告：玩家貌似使用了时光机回到了过去，因此游戏速度强制为0x。请关闭游戏并等待到${timestampToTime(Date.now() - player.offTime.remain * 1000)}。`
	d = '<div class="res">'+ d +'</div>'
	r += d

	return options.newsShown ? r : d
}

// Determines when the game "ends"
function isEndgame() {
	return player.terrasteel.points.gte(1)
}

var date = {
	isDuringDate: function (beginDateStr, endDateStr) {
		var curDate = new Date(),
			beginDate = new Date(beginDateStr),
			endDate = new Date(endDateStr);
		if (curDate >= beginDate && curDate <= endDate) {
			return true;
		}
		return false;
	}
}

function holidays() {
	if (date.isDuringDate('2025/01/01', '2025/01/02')) return '2025元旦快乐！'
	if (date.isDuringDate('2025/01/28', '2025/01/29')) return '2025除夕快乐！'
	if (date.isDuringDate('2025/01/29', '2025/01/30')) return '2025春节快乐！'
	if (date.isDuringDate('2025/02/12', '2025/02/13')) return '2025元宵快乐！'
}

function getTpsDisplay() {
	let len = pastTickTimes.length
	if (len <= 3) return " "
	let a = 0
	for (i = 0; i < len; i++) {
		a += pastTickTimes[i]
	}
	let mspt = a / len
	let tps = 1000 / mspt
	let p1 = ""
	let p2 = ""
	let warn = ""
	if (mspt > options.updatingRate) {
		let slow = mspt / options.updatingRate - 1
		p1 = "<bdi style='color: #cc0000'>"
		p2 = "</bdi> "
		warn = `<br>提醒：你的过去的10游戏刻相比于设定的帧刷新率平均偏长了${fp(slow)}！`
	}

	let display = "TPS: " + p1 + f(tps) + p2 + ", " + "MSPT: " + p1 + f(mspt) + p2 + warn
	return display
}

// 
function getPointsDisplay() {
	let a = ''
	a += tmp.displayThings
	if (options.paused) a += '游戏暂停'
	if (player.gameSpeed && player.gameSpeed != 1) {
		a += '<br>游戏速度: ' + formatWhole(player.gameSpeed) + 'x'
	}
	/*if (player.offTime !== undefined) {
		a += '<br>离线加速剩余时间: ' + formatTime(player.offTime.remain * 1000)
	}*/
	a += '<br>'
	if (!(options.ch == undefined && modInfo.otherLanguageMod == true)) {
		let noShadow = options.textShadowShown ? "" : `style="text-shadow: none"`

		a += `<span class="overlayThing">${((options.ch || modInfo.languageMod == false) ? "你有" : "You have")} <h2  class="overlayThing" id="points" ${noShadow}> ${format(player.points)}</h2> ${modInfo.pointsName}</span>`
		if (canGenPoints()) {
			a += `<br><span class="overlayThing">(` + (tmp.other.oompsMag != 0 ? format(tmp.other.oomps) + " OoM" + (tmp.other.oompsMag < 0 ? "^^2" : tmp.other.oompsMag > 1 ? "^" + tmp.other.oompsMag : "") + "s" : formatSmall(getPointGen())) + `/sec)</span>`
		}
		a += `<br><span class="overlayThing">等级<h2  class="overlayThing" id="points" ${noShadow}> ${formatWhole(player.level)}</h2></span>`
		if (player.points.lt('ee12') && !tmp.experience.layerShown) a += `<br><span class="overlayThing">${format(player.points)}/${format(nextLevelReq())}</span>`
		if (hasAchievement('achievements', 123)) a += `<br><span class="overlayThing">二阶等级<h2  class="overlayThing" id="points" ${noShadow}> ${formatWhole(player.tiers[0])}</h2></span>`,
			a += `<br><span class="overlayThing">${format(player.level)}/${format(nextTiersReq(1))}</span>`
			if (player.points.gte('e1.7976e308') && player.experience.crystal.lte(0)) a += `<br><br><span class="overlayThing">我不会让你走得更远了</span>`
		a += `<div style="margin-top: 3px"></div>`
	}
	a += '<br><div class="vl2"></div>'
	a += '<br><br>'
	return a
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return (60) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {
}

//6级运算
ExpantaNum.prototype.hexate = function (x) {
	return this.arrow(4)(x)
}

//检测shift和ctrl
var controlDown = false
var shiftDown = false

window.addEventListener('keydown', function (event) {
	if (player.toggleKeys) {
		if (event.keyCode == 16) shiftDown = !shiftDown;
		if (event.keyCode == 17) controlDown = !controlDown;
	} else {
		if (event.keyCode == 16) shiftDown = true;
		if (event.keyCode == 17) controlDown = true;
	}
}, false);

window.addEventListener('keyup', function (event) {
	if (player.toggleKeys) return
	if (event.keyCode == 16) shiftDown = false;
	if (event.keyCode == 17) controlDown = false;
}, false);

//获取升级element
function getUpgradeElement(layer, id) {
	let elementName = "#upgrade-" + layer + "-" + id.toString()
	return document.querySelector(elementName)
}

//检测升级是否被鼠标覆盖
function isUpgradeCovered(layer, id) {
	let upgElement = getUpgradeElement(layer, id)
	if (upgElement == null) return false
	else {
		let rect = upgElement.getBoundingClientRect()
		return (mouseX > rect.left && mouseX < rect.right && mouseY > rect.top && mouseY < rect.bottom)
	}
}



// from QwQe308，并做ExpantaNum适配，并移除已有的同样功能function
//快捷调用+提高运算速度
var zero = new ExpantaNum(0)
var one = new ExpantaNum(1)
var two = new ExpantaNum(2)
var three = new ExpantaNum(3)
var four = new ExpantaNum(4)
var five = new ExpantaNum(5)
var six = new ExpantaNum(6)
var seven = new ExpantaNum(7)
var eight = new ExpantaNum(8)
var nine = new ExpantaNum(9)
var ten = new ExpantaNum(10)
//检测旁边的升级是否被购买
function checkAroundUpg(UPGlayer, place) {
	place = Number(place)
	return hasUpgrade(UPGlayer, place - 1) || hasUpgrade(UPGlayer, place + 1) || hasUpgrade(UPGlayer, place - 10) || hasUpgrade(UPGlayer, place + 10)
}
//指数软上限
function powsoftcap(num, start, power) {
	if (num.gt(start)) {
		num = num.root(power).mul(start.pow(one.sub(one.div(power))))
	}
	return num
}
//e后数字开根
function expRoot(num, root) {
	return ten.pow(num.log10().root(root))
}
//e后数字乘方
function expPow(num, pow) {
	return ten.pow(num.log10().pow(pow))
}
//e后数字指数软上限
function expRootSoftcap(num, start, power) {
	if (num.lte(start)) return num;
	num = num.log10(); start = start.log10()
	return ten.pow(num.root(power).mul(start.pow(one.sub(one.div(power)))))
}
//修改class属性
function setClass(id, toClass = []) {
	var classes = ""
	for (i in toClass) classes += " " + toClass[i]
	if (classes != "") classes = classes.substr(1)
	document.getElementById(id).className = classes
}
//快速创建sub元素
function quickSUB(str) {
	return `<sub>${str}</sub>`
}
//快速创建sup元素
function quickSUP(str) {
	return `<sup>${str}</sup>`
}
//快速给文字上色
function quickBackgColor(str, color) {
	return `<text style='background-color:${color};color:white'>${str}</text>`
}
function quickBackgColor2(str, color) {
	return `<text style='background-color:${color};color:black'>${str}</text>`
}
function quickColor(str, color) {
	return `<text style='color:${color}'>${str}</text>`
}
function quickBigColor(str, color) {
	return `<text style='color:${color}; font-size: 25px; text-shadow: 0px 0px 10px ${color}'>${str}</text>`
}
function quickDoubleColor(str, colora, colorb) {
	return `<text style='background-image:linear-gradient(to right, ${colora}, ${colorb}); -webkit-background-clip:text; color: transparent; font-size: 30px; text-shadow: 0px 0px 10px ${colorb}'>${str}</text>`
}

//test
