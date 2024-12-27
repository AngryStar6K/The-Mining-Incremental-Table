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
	return `<h2 style='color: #${color}; text-shadow: 0 0 10px #${shadowcolor}'>${text}</h2>`
}

function textStyle_h3(text, color='ffffff', shadowcolor=color) {
	return `<h3 style='color: #${color}; text-shadow: 0 0 10px #${shadowcolor}'>${text}</h3>`
}

function textStyle_h4(text, color='ffffff', shadowcolor=color) {
	return `<h4 style='color: #${color}; text-shadow: 0 0 10px #${shadowcolor}'>${text}</h4>`
}

function textStyle_b(text, color='ffffff', shadowcolor=color) {
	return `<b style='color: #${color}; text-shadow: 0 0 10px #${shadowcolor}'>${text}</b>`
}
