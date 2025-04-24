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

function challengeEffect(layer, id) {
	return (tmp[layer].challenges[id].rewardEffect)
}

function buyableEffect(layer, id) {
	return (tmp[layer].buyables[id].effect)
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