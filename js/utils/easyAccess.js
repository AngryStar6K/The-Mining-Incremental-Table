function hasUpgrade(layer, id) {
	return ((player[layer].upgrades.includes(toNumber(id)) || player[layer].upgrades.includes(id.toString())) && !tmp[layer].deactivated)
}

function hasMilestone(layer, id) {
	return ((player[layer].milestones.includes(toNumber(id)) || player[layer].milestones.includes(id.toString())) && !tmp[layer].deactivated)
}

function hasAchievement(layer, id) {
	return ((player[layer].achievements.includes(toNumber(id)) || player[layer].achievements.includes(id.toString())) && !tmp[layer].deactivated)
}

function hasChallenge(layer, id) {
	return ((player[layer].challenges[id]) && !tmp[layer].deactivated)
}

function maxedChallenge(layer, id) {
	return ((player[layer].challenges[id] >= tmp[layer].challenges[id].completionLimit) && !tmp[layer].deactivated)
}

function challengeCompletions(layer, id) {
	return (player[layer].challenges[id])
}

function challengeGoal(layer, id) {
	return (tmp[layer].challenges[id].goal)
}

function getBuyableAmount(layer, id) {
	return (player[layer].buyables[id])
}

function setBuyableAmount(layer, id, amt) {
	player[layer].buyables[id] = amt
}

function addBuyables(layer, id, amt) {
	player[layer].buyables[id] = player[layer].buyables[id].add(amt)
}

function getClickableState(layer, id) {
	return (player[layer].clickables[id])
}

function setClickableState(layer, id, state) {
	player[layer].clickables[id] = state
}

function getGridData(layer, id) {
	return (player[layer].grid[id])
}

function setGridData(layer, id, data) {
	player[layer].grid[id] = data
}

function upgradeEffect(layer, id) {
	return (tmp[layer].upgrades[id].effect)
}

function upgradeEffect2(layer, id) {
	return (tmp[layer].upgrades[id].effect2)
}

function challengeEffect(layer, id) {
	return (tmp[layer].challenges[id].rewardEffect)
}

function buyableEffect(layer, id) {
	return (tmp[layer].buyables[id].effect)
}

function buyableEffect2(layer, id) {
	return (tmp[layer].buyables[id].effect2)
}

function clickableEffect(layer, id) {
	return (tmp[layer].clickables[id].effect)
}

function achievementEffect(layer, id) {
	return (tmp[layer].achievements[id].effect)
}

function gridEffect(layer, id) {
	return (gridRun(layer, 'getEffect', player[layer].grid[id], id))
}

function milestoneEffect(layer, id) {
	return (tmp[layer].milestones[id].effect)
}

function hardness(layer) {
	return player[layer].hardness
}

function rarity(layer) {
	return player[layer].rarity
}

function singularity(layer) {
	return player[layer].singularity
}

//文本动态颜色渐变
function rgbToHex(red, green, blue) {
	const toHex = (colorValue) => {
		const hex = colorValue.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	};
	return /*"#" + */toHex(red) + toHex(green) + toHex(blue);
}

function hexToRgb(hex) {
	hex = hex.replace(/^\s*#|\s*$/g, "");
	let red = parseInt(hex.substr(0, 2), 16);
	let green = parseInt(hex.substr(2, 2), 16);
	let blue = parseInt(hex.substr(4, 2), 16);

	return [red, green, blue];
}

function getColorBetweenTwoColors(colorA_str, colorB_str, ratio) {
	const colorA = hexToRgb(colorA_str);
	const colorB = hexToRgb(colorB_str);
	const r = Math.round((colorB[0] - colorA[0]) * ratio + colorA[0]);
	const g = Math.round((colorB[1] - colorA[1]) * ratio + colorA[1]);
	const b = Math.round((colorB[2] - colorA[2]) * ratio + colorA[2]);

	return rgbToHex(r, g, b);
}

const animationTextColors = {
	fiery: {
		color1: '191313',
		color2: '662d09',
		shadow1: 'ffd83a',
		shadow2: 'ffffff',
		loopTime: 4,
		nodes: 2,
	},
  blazing_pyrotheum: {
    color1: 'e2c941',
    color2: 'e19252',
    shadow1: 'e2c941',
    shadow2: 'e19252',
    loopTime: 4,
		nodes: 2,
  },
}

function getAnimatedTextColor(style) { //暂时只支持平滑渐变，TMT变色字体函数
	const colors = animationTextColors[style]
	if (!colors) return 'ffffff'
	const time_in_period = gameruntime % colors.loopTime
	const states = (colors.nodes - 1) * 2
	const which_state = Math.floor(time_in_period / (colors.loopTime / states)) + 1
	const which_half = (time_in_period / colors.loopTime) > 0.5 ? 2 : 1
	let ratio = 0
	if (which_half == 1) ratio = (time_in_period / (colors.loopTime / states)) - (which_state - 1)
	else ratio = 1 - ((time_in_period / (colors.loopTime / states)) - (which_state - 1))
	const resultcolor = getColorBetweenTwoColors(colors.color1, colors.color2, ratio)
	const resultshadow = getColorBetweenTwoColors(colors.shadow1, colors.shadow2, ratio)
	return {
		color: resultcolor,
		shadow: resultshadow,
	}
}

function textStyle_h2(text, color='ffffff', shadowcolor=color) {
	let shadow = `0 0 10px #${shadowcolor}`
	if (!options.textShadowShown) shadow = "none"
	return `<h2 style='color: #${color}; text-shadow: ${shadow}'>${text}</h2>`
}

function textStyle_h3(text, color='ffffff', shadowcolor=color) {
	let shadow = `0 0 10px #${shadowcolor}`
	if (!options.textShadowShown) shadow = "none"
	return `<h3 style='color: #${color}; text-shadow: ${shadow}'>${text}</h3>`
}

function textStyle_h4(text, color='ffffff', shadowcolor=color) {
	let shadow = `0 0 10px #${shadowcolor}`
	if (!options.textShadowShown) shadow = "none"
	return `<h4 style='color: #${color}; text-shadow: ${shadow}'>${text}</h4>`
}

function textStyle_b(text, color='ffffff', shadowcolor=color) {
	let shadow = `0 0 10px #${shadowcolor}`
	if (!options.textShadowShown) shadow = "none"
	return `<b style='color: #${color}; text-shadow: ${shadow}'>${text}</b>`
}


function textColor(text, color='ffffff') {
	return `<span style='color: #${color}'>${text}</span>`
}

function textResourceStyle(text, style = 'overlayThing', type = 'h2') { //调用components.css
	let shadow = ""
	if (!options.textShadowShown) shadow = "style='text-shadow: none'"
	return `<${type} class = "${style}" ${shadow} >${text}</${type}>`
}

function textAnimatedStyle(text, style = 'fiery', type = 'h2') {
	let colors = getAnimatedTextColor(style)
	return `<${type} style='color: #${colors.color}; text-shadow: 0 0 10px #${colors.shadow}'>${text}</${type}>`
}

function textStyle_story(text, color='ffffff', shadowcolor=color) {
	let shadow = `0 0 10px #${shadowcolor}`
	if (!options.textShadowShown) shadow = "none"
	return `<h3 style='color: #${color}; text-shadow: ${shadow}; font-family: "Lucida Console", "Courier New", monospace'>${text}</h3>`
}

function sortExpantaNumArray(arr, order = "desc") {
    // 确保输入是数组
    if (!Array.isArray(arr)) {
        throw new Error("输入必须是一个数组");
    }

    // 将数组中的元素统一转换为 ExpantaNum 类型
    const expantaNumArray = arr.map(item => {
        if (item instanceof ExpantaNum) {
            return item;
        } else if (typeof item === "number") {
            return new ExpantaNum(item);
        } else {
            throw new Error("数组中的元素必须是 Number 或 ExpantaNum 类型");
        }
    });

    // 根据排序顺序进行排序
    return expantaNumArray.sort((a, b) => {
        if (order === "asc") {
            return a.cmp(b); // 升序：a 小于 b 返回负值
        } else if (order === "desc") {
            return b.cmp(a); // 降序：b 小于 a 返回负值
        } else {
            throw new Error("排序顺序必须是 'asc' 或 'desc'");
        }
    });
}


//以下的pentation log以及更高级的log来自于hamster624
//pentation log and higher level logarithm functions made by hamster624
//https://hamster624.github.io/ExpantaNum-Calculator/
function plog(num) {
    if (!(num instanceof ExpantaNum)) num = new ExpantaNum(num);
    let pol = polarize(num.array, true);
    if (ExpantaNum.eq(pol.height, 1)) {
        return num.slog().slog().add(1).toString();
    }
    if (ExpantaNum.eq(pol.height, 3)) {
        return ExpantaNum.hexate(ExpantaNum.pent(10,pol.bottom), ExpantaNum(pol.top).sub(1)).toString();
    }
    if (ExpantaNum.gte(pol.height, 4)) {
        return num.toString();
    }
    return ExpantaNum(pol.top).add(ExpantaNum.log10(pol.bottom)).toString(); 
}
// this one was easier
function hlog(num) {
    if (!(num instanceof ExpantaNum)) num = new ExpantaNum(num);
    let pol = polarize(num.array, true);
    if (ExpantaNum.lte(num, "10^^^10")) {
        return ExpantaNum(plog(plog(num))).add(1).toString();
    }
    if (ExpantaNum.gt(num, "10^^^10") && ExpantaNum.lt(num, "10^^^^10")) {
        return ExpantaNum.log10(pol.bottom).add(pol.top).toString();
    }
    if (ExpantaNum.eq(pol.height, 4)) {
        return ExpantaNum.heptate(ExpantaNum.hexate(10,pol.bottom), ExpantaNum(pol.top).sub(1)).toString();
    }
    if (ExpantaNum.gte(pol.height, 5)) {
      return num.toString();
    }
}
// i think i have too much logs
function heplog(num) {
    if (!(num instanceof ExpantaNum)) num = new ExpantaNum(num);
    let pol = polarize(num.array, true);
    if (ExpantaNum.lte(num, "10^^^^10")) {
        return ExpantaNum(hlog(num)).log10().add(1).toString();
    }
    if (ExpantaNum.lt(num, "10^^^^^10") && ExpantaNum.gte(num, "10^^^^10")) {
        return ExpantaNum.log10(pol.bottom).add(pol.top).toString();
    }
    if (ExpantaNum.eq(pol.height, 5)) {
      return ExpantaNum.octate(ExpantaNum.heptate(10,pol.bottom), ExpantaNum(pol.top).sub(1)).toString();
    }
    if (ExpantaNum.gt(pol.height, 5)) {
      return num.toString();
    }
}
// 1 more cant hurt
function olog(num) {
    if (!(num instanceof ExpantaNum)) num = new ExpantaNum(num);
    let pol = polarize(num.array, true);
    if (ExpantaNum.lte(num, "10^^^^^10")) {
        return ExpantaNum(heplog(num)).log10().add(1).toString();
    }
    if (ExpantaNum.lt(num, "10^^^^^^10") && ExpantaNum.gte(num, "10^^^^^10")) {
        return ExpantaNum.log10(pol.bottom).add(pol.top).toString();
    }
    if (ExpantaNum.eq(pol.height, 6)) {
      return ExpantaNum.arrow(ExpantaNum.arrow(10,6,pol.bottom), 7, ExpantaNum(pol.top).sub(1)).toString();
    }
    if (ExpantaNum.gt(pol.height, 6)) {
      return num.toString();
    }
}
// yeah okay i wont be rewriting the code each time so uhh here is ultra log
// also i would recommend not going over 8 if you are making a game because holy it lags a lot so use maybe plog or hlog because those wont lag that bad
function ultralog(num, arrows) {
    if (!(num instanceof ExpantaNum)) num = new ExpantaNum(num);
    let pol = polarize(num.array, true);
    num = num.array;
    if (ExpantaNum.eq(arrows, 1)){
      return ExpantaNum.log10(num).toString();
    }
    if (ExpantaNum.eq(arrows, 2)){
      return ExpantaNum.slog(num).toString();
    }
    if (ExpantaNum.eq(arrows, 3)){
      return plog(num);
    }
    if (ExpantaNum.eq(arrows, 4)){
      return hlog(num);
    }
    if (ExpantaNum.eq(arrows, 5)){
      return heplog(num);
    }
    if (ExpantaNum.eq(arrows, 6)){
      return olog(num);
    }
    if (ExpantaNum.gt(arrows, 6) && ExpantaNum.lte(arrows,20)){
      if (ExpantaNum.lte(num, ExpantaNum.arrow(10, ExpantaNum(arrows).sub(1), 10))) {
        return ExpantaNum(ultralog(ExpantaNum(num), ExpantaNum(arrows).sub(1))).log10().add(1).toString();
      }
      if (ExpantaNum.lt(num, ExpantaNum.arrow(10, ExpantaNum(arrows), 10)) && ExpantaNum.gte(num, ExpantaNum.arrow(10, ExpantaNum(arrows).sub(1), 10))) {
        return ExpantaNum.log10(pol.bottom).add(pol.top).toString();
      }
      if (ExpantaNum.eq(arrows, pol.height)) {
        return ExpantaNum.arrow(ExpantaNum.arrow(10,ExpantaNum(arrows),pol.bottom), ExpantaNum(arrows).add(1), ExpantaNum(pol.top).sub(1)).toString();
      }
      if (ExpantaNum.gt(pol.height, arrows)) {
        return ExpantaNum(num).toString();
      }
    }
    if (ExpantaNum.gt(arrows, 20)){
      throw Error("Max 20 arrows due to precision");
    }
}