function prestigeButtonText(layer) {
	if (layers[layer].prestigeButtonText !== undefined)
		return run(layers[layer].prestigeButtonText(), layers[layer])
	if (tmp[layer].type == "normal")
		return `${player[layer].points.lt(1e3) ? (tmp[layer].resetDescription !== undefined ? tmp[layer].resetDescription : (geti18n() ? "重置以获得 " : 'Reset for ' )) : ""}+<b>${formatWhole(tmp[layer].resetGain)}</b> ${tmp[layer].resource} ${tmp[layer].resetGain.lt(100) && player[layer].points.lt(1e3) ? `<br><br>`+(geti18n() ? "下一个在:" : "Neat at:")+` ${(tmp[layer].roundUpCost ? formatWhole(tmp[layer].nextAt) : format(tmp[layer].nextAt))} ${tmp[layer].baseResource}` : ""}`
	if (tmp[layer].type == "static")
		return `${tmp[layer].resetDescription !== undefined ? tmp[layer].resetDescription : (geti18n() ? "重置以获得 " : 'Reset for ' )}+<b>${formatWhole(tmp[layer].resetGain)}</b> ${tmp[layer].resource}<br><br>${player[layer].points.lt(30) ? (tmp[layer].baseAmount.gte(tmp[layer].nextAt) && (tmp[layer].canBuyMax !== undefined) && tmp[layer].canBuyMax ? (geti18n() ? "下一个:" : "Next:") : (geti18n() ? "需求:" : "Req:")) : ""} ${formatWhole(tmp[layer].baseAmount)} / ${(tmp[layer].roundUpCost ? formatWhole(tmp[layer].nextAtDisp) : format(tmp[layer].nextAtDisp))} ${tmp[layer].baseResource}		
		`
	if (tmp[layer].type == "none")
		return ""
    
        return geti18n() ? "你需要为声望按钮写一段文字" : 'You need prestige button text'
}

function constructNodeStyle(layer){
	let style = []
	if ((tmp[layer].isLayer && layerunlocked(layer)) || (!tmp[layer].isLayer && tmp[layer].canClick))
		style.push({'background-color': tmp[layer].color})
	if (tmp[layer].image !== undefined)
		style.push({'background-image': 'url("' + tmp[layer].image + '")'})
	if(tmp[layer].notify && player[layer].unlocked)
		style.push({'box-shadow': 'var(--hqProperty2a), 0 0 20px ' + tmp[layer].trueGlowColor})
	style.push(tmp[layer].nodeStyle)
	if(player.tab==layer){
		style.push(tmp[layer].activeStyle)
	}else if(player.hoverTab==layer){
		style.push(tmp[layer].hoverStyle)
	}
    return style
}


function challengeStyle(layer, id) {
	if (player[layer].activeChallenge == id && canCompleteChallenge(layer, id)) return "canComplete"
	else if (hasChallenge(layer, id)) return "done"
    return "locked"
}

function challengeButtonText(layer, id) {
    return (player[layer].activeChallenge==(id)?(canCompleteChallenge(layer, id)?"完成挑战":"提前退出"):(hasChallenge(layer, id)?"已完成":"开始"))

}

function achievementStyle(layer, id){
    ach = tmp[layer].achievements[id]
    let style = []
    if (ach.image){ 
        style.push({'background-image': 'url("' + ach.image + '")'})
    } 
    if (!ach.unlocked) style.push({'visibility': 'hidden'})
    style.push(ach.style)
    return style
}



function updateWidth() {
	let screenWidth = window.innerWidth
	let splitScreen = true
	if (player.navTab == "none") splitScreen = true
	tmp.other.screenWidth = screenWidth
	tmp.other.screenHeight = window.innerHeight

	if(splitScreen==false) document.body.style.setProperty('--tabWidth', '0px');
	else{
		document.body.style.setProperty('--tabWidth', colors.button.width)
		document.body.style.setProperty('--tabHeight', colors.button.height)
		document.body.style.setProperty('--tabFont', colors.button.font)
		document.body.style.setProperty('--tabBorder', colors.button.border)
	}

	tmp.other.splitScreen = splitScreen
	tmp.other.lastPoints = player.points
}

function updateOomps(diff)
{
	tmp.other.oompsMag = 0
	if (player.points.lte(new ExpantaNum(1e100)) || diff == 0) return

	var pp = new ExpantaNum(player.points);
	var lp = tmp.other.lastPoints || new ExpantaNum(0);
	if (pp.gt(lp)) {
		if (pp.gte("10^^20")) {
			pp = pp.slog(1e10)
			lp = lp.slog(1e10)
			tmp.other.oomps = pp.sub(lp).div(diff)
			tmp.other.oompsMag = -1;
		} else {
			while (pp.div(lp).logBase(10).div(diff).gte("10") && tmp.other.oompsMag <= 5 && lp.gt(0)) {
				pp = pp.logBase(10)
				lp = lp.logBase(10)
				tmp.other.oomps = pp.sub(lp).div(diff)
				tmp.other.oompsMag++;
			}
		}
	}

}

function constructBarStyle(layer, id) {
	let bar = tmp[layer].bars[id]
	let style = {}
	if (bar.progress instanceof ExpantaNum)
		bar.progress = bar.progress.toNumber()
	bar.progress = (1 -Math.min(Math.max(bar.progress, 0), 1)) * 100

	style.dims = {'width': bar.width + "px", 'height': bar.height + "px"}
	let dir = bar.direction
	style.fillDims = {'width': (bar.width + 0.5) + "px", 'height': (bar.height + 0.5)  + "px"}

	switch(bar.direction) {
		case UP:
			style.fillDims['clip-path'] = 'inset(' + bar.progress + '% 0% 0% 0%)'
			style.fillDims.width = bar.width + 1 + 'px'
			break;
		case DOWN:
			style.fillDims['clip-path'] = 'inset(0% 0% ' + bar.progress + '% 0%)'
			style.fillDims.width = bar.width + 1 + 'px'

			break;
		case RIGHT:
			style.fillDims['clip-path'] = 'inset(0% ' + bar.progress + '% 0% 0%)'
			break;
		case LEFT:
			style.fillDims['clip-path'] = 'inset(0% 0% 0% ' + bar.progress + '%)'
			break;
		case DEFAULT:
			style.fillDims['clip-path'] = 'inset(0% 50% 0% 0%)'
	}

	if (bar.instant) {
		style.fillDims['transition-duration'] = '0s'
	}
	return style
}

function constructTabFormat(layer, id, family){
	let tabTemp, tabLayer, tabFunc, location, key
	if (id === undefined){
		tabTemp = tmp[layer].tabFormat
		tabLayer = layers[layer].tabFormat
		tabFunc = funcs[layer].tabFormat
		location = tmp[layer]
		key = "tabFormat"
	}
	else if (family === undefined) {
		tabTemp = tmp[layer].tabFormat[id].content
		tabLayer = layers[layer].tabFormat[id].content
		tabFunc = funcs[layer].tabFormat[id].content
		location = tmp[layer].tabFormat[id]
		key = "content"

	}
	else {
		tabTemp = tmp[layer].microtabs[family][id].content
		tabLayer = layers[layer].microtabs[family][id].content
		tabFunc = funcs[layer].microtabs[family][id].content
		location = tmp[layer].microtabs[family][id]
		key = "tabFormat"

	}
	if (isFunction(tabLayer)) {
		return tabLayer.bind(location)()
	}
	updateTempData(tabLayer, tabTemp, tabFunc, {layer, id, family})
	return tabTemp
}

function updateTabFormats() {
	updateTabFormat(player.tab)
	updateTabFormat(player.navTab)
}

function updateTabFormat(layer) {
	if (layers[layer]?.tabFormat === undefined) return

	let tab = player.subtabs[layer]?.mainTabs
	if (isFunction(layers[layer].tabFormat)) {
		Vue.set(temp[layer], 'tabFormat', layers[layer].tabFormat())
	}
	else if (Array.isArray(layers[layer].tabFormat)) {
		Vue.set(temp[layer], 'tabFormat', constructTabFormat(layer))
	}
	else if (isPlainObject(layers[layer].tabFormat)) {
		if (layers[layer].tabFormat[tab].embedLayer === undefined)
		Vue.set(temp[layer].tabFormat[tab], 'content', constructTabFormat(layer, tab))
	}

	// Check for embedded layer
	if (isPlainObject(tmp[layer].tabFormat) && tmp[layer].tabFormat[tab].embedLayer !== undefined) { 
		updateTabFormat(tmp[layer].tabFormat[tab].embedLayer)
	}

	// Update microtabs
	for (family in layers[layer].microtabs) {
		tab = player.subtabs[layer][family]

		if (tmp[layer].microtabs[family][tab]) {

			if (tmp[layer].microtabs[family][tab].embedLayer)
				updateTabFormat(tmp[layer].microtabs[family][tab].embedLayer)
			else
				Vue.set(temp[layer].microtabs[family][tab], 'content', constructTabFormat(layer, tab, family))
		}
	}
}