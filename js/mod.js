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
	num: "0.9",
	name: "",
}

function changelog() {
	return (options.ch || modInfo.languageMod == false) ? `
		<br><br><br><h1>更新日志:</h1><br>(含有<span style='color: red'>剧透</span>，请谨慎查看)<br><br>
		<span style="font-size: 17px;">
				<br><br>
			<h3>v0.9 - 下界、魔力、增幅</h3><br>
				- 版本终点：获得1炽炎矿石，1.000000F5经验<br>
				- 成就总数：149 + 12<br>
				- 添加世界1层级：信素<br>
				- 添加世界2层级：源质钢、精灵钢<br>
				- 添加世界4层级：下界石英、荧石、流明、荧光信素、炽炎<br>
				- 层级选择现在可用！<br>
				- 机械手现在可以寻找和挖掘矿物（需要实验性内容密码）<br>
				- 不同的滚动新闻数量：167<br>
				<br><br>
			<h3>v0.8fix - 25w37a</h3><br>
				- 版本终点：获得1魂金锭，约e1.00e3,460,000经验<br>
				- 修复一些已知bug<br>
				- 修复第1钢叶购买项的自动购买bug，重新平衡了1e12暮色森林征服点数里程碑后的数值<br>
				- 此快照更新前的存档会重置钢叶购买项<br>
				<br><br>
			<h3>v0.8 - 暮色森林</h3><br>
				- 版本终点：获得1魂金锭，约e1.00e3,120,000经验<br>
				- 成就总数：134 + 11<br>
				- 添加世界2层级：魔力水晶<br>
				- 添加世界3层级：暮光宝石、铁树、娜迦鳞片、钢叶、骑士金属、结构金属、炽铁、砷铅铁矿石<br>
				- 添加世界4层级：魂金<br>
				- 添加杂项层级：层级选择（没做）<br>
				- 在时间跃迁层级中可以激活机械手，以离线时间为代价来模拟玩家点击事件（目前只支持撸树和挖掘石头）<br>
				- 在时间跃迁层级中可以输入兑换码<br>
				- 优化、更正游戏文本<br>
				- 添加3种记数法：标准、失明、修复无限（共8种）<br>
				- 不同的滚动新闻数量：147<br>
				<br><br>
			<h3>v0.8pre - 25w34a</h3><br>
				- 记数法设置项解禁！当前有科学、超-E、字母、Emoji、中文共5种记数法。如果你遇到了记数法的bug请在github提issue<br>
				- 成就总数：113 + 9<br>
				- 提前准备了部分v0.8需要使用的代码<br>
				- 此更新除了增加一个隐藏成就外没有新增游戏内容<br>
				<br><br>
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
	else if (tier.eq(2)) player.tiers[t - 1] = player.tiers[t - 2].max(1).logBase(100000).floor() //三阶等级增长简化为后续高阶等级做准备
}

function omegaTierUpdating() { //1e500,000 3阶=100,000 4阶=1 5阶
	if (player.tiers[0].lt(1e5)) return
	let t2lv = player.tiers[0]
	let tier_raw = t2lv.slog(1e5)
	let tier = tier_raw.floor()
	let top = tier_raw.sub(tier)
	tier = tier.add(2)
	let count = d(1e5).tetrate(top)
	let countInt = count.floor()
	let highest = [[countInt, tier]]
	if (tier.gte(4) && tier.lt(1001)) {
		let tier2 = tier.sub(1)
		let count2 = d(100000).pow(count)
		let highest2 = [count2, tier2]
		highest.push(highest2)
	}
	player.omegaTier = highest[0][1]
	player.highestTierAmount = highest[0][0]
	if (highest.length >= 2) player.secondHTA = highest[1][0]
	return highest
}

function nextLevelReq() {
	return ExpantaNum.pow(25, player.level.max(0).add(1).pow(1.25))
}

function nextTiersReq(tier) {
	tier = new ExpantaNum(tier)
	t = tier.toNumber()
	if (t == 1) return ExpantaNum.pow(20, player.tiers[0].max(0).add(1).pow(1.35)).times(50000).ceil()
	if (t == 2) return d(100000).pow(player.tiers[1].add(1))
}

function omegaTiersReq() {
	return d(100000).pow(player.highestTierAmount.add(1))
}


// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
	return {
		devSpeed: 1, //锁定为1，转而使用离线时间调整游戏倍率
		offTime: { remain: 0 },
		lastTimePlayed: Date.now(),
		gameSpeed: 1,
		level: d(0),
		tiers: [d(0), d(0)],
		omegaTier: d(0),
		highestTierAmount: d(0),
		secondHTA: d(0),
		news: true,
		devmode: false,
		NaNpause: d(0),
		notationTest: d(0),
		homo: false,
		console: false,
		StevesLavaChicken: d(0),
		random: -1, //每秒刷新随机数0~10000. //熔岩烤鸡使用0~30 概率0.3%
		redeemedCodes: {
		},
		TPSwarn: false,
		resourcePinned: []
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
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	return Y + M + D + h + m + s;
}

// You can write stuff here to display them on top-left corner easily
function displayThingsRes() {
	let r = `<div id="news" class="news" v-if="player.news"><span id="newsText" class="newsContent" style="left: ${ntl}px;">${nt}</span></div>`
	let d = ""
	d = d + `经验: ${format(player.points)}`
	for (let i = 0; i < player.resourcePinned.length; i++) {
		d = d + `<br>${tmp[player.resourcePinned[i]].resource}：${f(player[player.resourcePinned[i]].points)}`
	}
	d = d + `<br>离线时间: ${textColor(formatTime(player.offTime.remain * 1000) + "/" + formatTime(tmp.offline_progress.offlineLimit * 3600000), 'b2ff59')}`
	d = d + "<br>当前位置：" + locationName(player.map.location, true)
	if (tmp[ct].layerShown) {
		d += '<br>'
		if (isCraftingItem()) d += `你正在合成 ${craftingItemName(craftingItemID())}`
		else d += `你当前不在合成`
	}
	if (tmp.furnace.layerShown) {
		d += '<br>'
		if (!isBurningFuel()) d += `当前不在消耗燃料 ${textColor('[!]', 'cc0000')}`
		else d += `当前正在消耗 ${fuelName(fuelID())} 作为燃料`
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
	d = '<div class="res">' + d + '</div>'
	r += d

	return options.newsShown ? r : d
}

// Determines when the game "ends"
function isEndgame() {
	return player.torridite.ore.gte(1) && player.points.gte('10^^5')
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
		player.TPSwarn = true
	}
	else player.TPSwarn = false

	let display = "TPS: " + p1 + f(tps) + p2 + ", " + "MSPT: " + p1 + f(mspt) + p2 + warn
	return display
}


function getLevelDisplay() {
	let a = ''
	let noShadow = options.textShadowShown ? "" : `style="text-shadow: none"`
	//Lv
	if (player.tiers[1].lt(100000)) {
		a += `<br><span class="overlayThing">等级<h2  class="overlayThing" id="points" ${noShadow}> ${formatWhole(player.level)}</h2></span>`
		//Next Lv Req
		if (player.points.lt('ee12') && !tmp.experience.layerShown) a += `<br><span class="overlayThing">${format(player.points)}/${format(nextLevelReq())}</span>`
		//T2Lv
		if (hasAchievement('achievements', 123)) a += `<br><span class="overlayThing">二阶等级<h2  class="overlayThing" id="points" ${noShadow}> ${formatWhole(player.tiers[0])}</h2></span>`
		//Next T2Lv Req
		if (player.tiers[0].lt(1e5)) a += `<br><span class="overlayThing">${format(player.level)}/${format(nextTiersReq(1))}</span>`
		//T3+Lv
		if (hasAchievement('achievements', 202)) a += `<br><span class="overlayThing">三阶等级<h2  class="overlayThing" id="points" ${noShadow}> ${formatWhole(player.tiers[1])}</h2></span>`,
			//Next T3Lv Req
			a += `<br><span class="overlayThing">${format(player.tiers[0])}/${format(nextTiersReq(2))}</span>`
	}
	else {
		a += `<br><span class="overlayThing">${tiersNameChinese(player.omegaTier.sub(1))}阶等级<h2  class="overlayThing" id="points" ${noShadow}> ${formatWhole(player.secondHTA)}</h2></span>`
		a += `<br><span class="overlayThing">${tiersNameChinese(player.omegaTier)}阶等级<h2  class="overlayThing" id="points" ${noShadow}> ${formatWhole(player.highestTierAmount)}</h2></span>`
		a += `<br><span class="overlayThing">${formatWhole(player.secondHTA)}/${formatWhole(omegaTiersReq())}</span>`
	}
	//hardcaps display
	if (player.points.gte('e1.7976e308') && player.experience.crystal.lte(0)) a += `<br><br><span class="overlayThing">我不会让你走得更远了</span>`
	return a
}
// 
function getPointsDisplay() {
	let a = ''
	a += tmp.displayThings
	if (options.paused) a += '游戏暂停'
	if (player.gameSpeed && player.gameSpeed != 1) {
		a += '<br>游戏速度: ' + format(player.gameSpeed) + 'x'
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
		a += getLevelDisplay()
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

ExpantaNum.prototype.heptate = function (x) { //7、8级运算感觉可能没啥用了
	return this.arrow(5)(x)
}

ExpantaNum.prototype.octate = function (x) {
	return this.arrow(6)(x)
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
const redeemCodes = { //不是哥们你觉得我会让你看到兑换码吗
	"fad951e60f794da2e323911c1906a8451dfef80d067aa6e6f169990b9133fa06": {
		reward: 1
	},
	"89b0ee43d311d5f5f39015ed71b348a9011fc55cde50d101e70e3a28c94265ad": {
		reward: 1
	},
	"808119fbfa5b01436a97d50cb9511cef42c5db3ef59e808a636bc80327183c10": {
		reward: 1
	},
}

Object.freeze(redeemCodes)

/**
 * 同步 SHA-256 哈希函数
 * 基于 JavaScript 的纯同步实现
 * @param {string} message - 要哈希的消息
 * @returns {string} - 十六进制格式的 SHA-256 哈希值
 */
function sha256(message) {
	// 初始化常量
	const K = [
		0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
		0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
		0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
		0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
		0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
		0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
		0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
		0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
		0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
		0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
		0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
		0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
		0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
		0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
		0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
		0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
	];

	// 初始哈希值
	let H = [
		0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
		0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
	];

	// 预处理消息
	function preprocess(message) {
		// 将消息转换为UTF-8编码的字节数组
		const msgBytes = [];
		for (let i = 0; i < message.length; i++) {
			let code = message.charCodeAt(i);
			if (code < 0x80) {
				msgBytes.push(code);
			} else if (code < 0x800) {
				msgBytes.push(0xc0 | (code >> 6));
				msgBytes.push(0x80 | (code & 0x3f));
			} else if (code < 0xd800 || code >= 0xe000) {
				msgBytes.push(0xe0 | (code >> 12));
				msgBytes.push(0x80 | ((code >> 6) & 0x3f));
				msgBytes.push(0x80 | (code & 0x3f));
			} else {
				// 代理对处理
				i++;
				code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(i) & 0x3ff));
				msgBytes.push(0xf0 | (code >> 18));
				msgBytes.push(0x80 | ((code >> 12) & 0x3f));
				msgBytes.push(0x80 | ((code >> 6) & 0x3f));
				msgBytes.push(0x80 | (code & 0x3f));
			}
		}

		// 添加填充位
		const len = msgBytes.length;
		const bitLen = len * 8;

		// 添加1位
		msgBytes.push(0x80);

		// 填充0直到长度 ≡ 448 (mod 512)
		while ((msgBytes.length * 8) % 512 !== 448) {
			msgBytes.push(0x00);
		}

		// 添加64位长度信息（大端序）
		for (let i = 7; i >= 0; i--) {
			msgBytes.push((bitLen >>> (i * 8)) & 0xff);
		}

		return msgBytes;
	}

	// 循环左移函数
	function rotl(x, n) {
		return (x << n) | (x >>> (32 - n));
	}

	// 右移函数
	function rotr(x, n) {
		return (x >>> n) | (x << (32 - n));
	}

	// 主函数
	const bytes = preprocess(message);
	const chunks = [];

	// 将字节数组分割为512位块
	for (let i = 0; i < bytes.length; i += 64) {
		const chunk = [];
		for (let j = 0; j < 64; j += 4) {
			chunk.push(
				(bytes[i + j] << 24) |
				(bytes[i + j + 1] << 16) |
				(bytes[i + j + 2] << 8) |
				(bytes[i + j + 3])
			);
		}
		chunks.push(chunk);
	}

	// 处理每个块
	for (const chunk of chunks) {
		const w = new Array(64);

		// 将块复制到前16个字
		for (let i = 0; i < 16; i++) {
			w[i] = chunk[i];
		}

		// 扩展消息
		for (let i = 16; i < 64; i++) {
			const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
			const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
			w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0; // >>> 0 确保为32位无符号整数
		}

		// 初始化工作变量
		let [a, b, c, d, e, f, g, h] = H;

		// 主循环
		for (let i = 0; i < 64; i++) {
			const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
			const ch = (e & f) ^ (~e & g);
			const temp1 = (h + S1 + ch + K[i] + w[i]) >>> 0;
			const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
			const maj = (a & b) ^ (a & c) ^ (b & c);
			const temp2 = (S0 + maj) >>> 0;

			h = g;
			g = f;
			f = e;
			e = (d + temp1) >>> 0;
			d = c;
			c = b;
			b = a;
			a = (temp1 + temp2) >>> 0;
		}

		// 更新哈希值
		H[0] = (H[0] + a) >>> 0;
		H[1] = (H[1] + b) >>> 0;
		H[2] = (H[2] + c) >>> 0;
		H[3] = (H[3] + d) >>> 0;
		H[4] = (H[4] + e) >>> 0;
		H[5] = (H[5] + f) >>> 0;
		H[6] = (H[6] + g) >>> 0;
		H[7] = (H[7] + h) >>> 0;
	}

	// 将哈希值转换为十六进制字符串
	let result = '';
	for (let i = 0; i < H.length; i++) {
		let hex = H[i].toString(16);
		// 确保每个部分都是8位十六进制
		while (hex.length < 8) {
			hex = '0' + hex;
		}
		result += hex;
	}

	return result;
}

Object.defineProperty(window, 'sha256', {
	value: sha256,
	writable: false,
	configurable: false,
	enumerable: true
})

function redeemCode() {
	const salt = '9KeVd0LqsTNo35'
	const input = prompt("请在此输入你的兑换码")
	const code = salt.slice(0, 7) + input.trim().toUpperCase() + salt.slice(7)
	const hash = sha256(code);
	console.log(hash)

	if (player.redeemedCodes[hash]) {
		alert("此兑换码已被使用")
	}
	else if (redeemCodes[hash]) {
		const reward = redeemCodes[hash];
		// 给予奖励
		player.offTime.remain = player.offTime.remain + (reward.reward * 3600)

		// 标记为已使用（存储在游戏存档中）
		if (!player.redeemedCodes) player.redeemedCodes = {};
		player.redeemedCodes[hash] = true;

		alert(`兑换成功！获得 ${reward.reward * 3600} 秒离线时间`);
	}
	else alert("无效的兑换码");
}

var tmpres = {}

function updateTmpRes(diff) {
	if (hasCraftingItem(92)) {
		if (!tmpres.bronze) tmpres.bronze = { power: player.bronze.power }
		updateResourceOoMps(bronze, 'power', diff)
	}
	if (hasCraftingItem(202)) {
		if (!tmpres.constantan) tmpres.constantan = { essence: player.constantan.essence }
		updateResourceOoMps(constantan, 'essence', diff)
	}
	if (hasNormalAchievement(85)) {
		if (!tmpres.invar) tmpres.invar = { energy: player.invar.energy }
		updateResourceOoMps(invar, 'energy', diff)
	}
	if (hasCraftingItem(682)) {
		if (!tmpres.lumium) tmpres.lumium = {
			laser0: player.lumium.laser0,
			laser1: player.lumium.laser1,
			laser2: player.lumium.laser2,
		}
		updateResourceOoMps(lumium, 'laser0', diff)
		updateResourceOoMps(lumium, 'laser1', diff)
		updateResourceOoMps(lumium, 'laser2', diff)
	}
}

function updateResourceOoMps(layer, res, diff) {
	tmpres[layer + ' ' + res + ' mag'] = 0
	if (!tmpres[layer]) return;
	else if (!tmpres[layer][res]) return;
	else {
		var lp = tmpres[layer][res] || new ExpantaNum(0)
		var pp = player[layer][res]
		if (pp.gt(lp)) {
			if (pp.gte("10^^20")) {
				pp = pp.slog(1e10)
				lp = lp.slog(1e10)
				tmpres[layer + ' ' + res] = pp.sub(lp).div(diff)
				tmpres[layer + ' ' + res + ' mag'] = -1;
			} else {
				while (pp.div(lp).logBase(10).div(diff).gte("10") && tmpres[layer + ' ' + res + ' mag'] <= 5 && lp.gt(0)) {
					pp = pp.logBase(10)
					lp = lp.logBase(10)
					tmpres[layer + ' ' + res] = pp.sub(lp).div(diff)
					tmpres[layer + ' ' + res + ' mag']++;
				}
			}
		}
		tmpres[layer][res] = player[layer][res]
	}
}

function getOoMpsText(layer, res) {
	if (!tmpres[layer]) return;
	let resOomps = tmpres[layer + ' ' + res] || new ExpantaNum(0)
	let resOompsMag = tmpres[layer + ' ' + res + ' mag'] || 0
	if (tmpres[layer][res] == 0) return
	t = (format(resOomps) + " OoM" + (resOompsMag < 0 ? "^^2" : resOompsMag > 1 ? "^" + resOompsMag : "") + "s")
	return t
}

const Decimal = ExpantaNum
const OmegaNum = ExpantaNum
const PowiainaNum = ExpantaNum //有机会吗？


