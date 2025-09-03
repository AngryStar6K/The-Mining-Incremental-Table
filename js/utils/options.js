
// ************ Options ************

let options = {}

function getStartOptions() {
	return {
		autosave: true,
		msDisplay: "always",
		theme: "default",
		hqTree: false,
		offlineProd: true,
		hideChallenges: false,
		showStory: true,
		forceOneTab: false,
		oldStyle: false,
		tooltipForcing: true,
		ch: undefined,
		mouse: true,
		textShadowShown: true,
		cursive: false,
		biggerUpgs: false,
		notation: 'Scientific',
		updatingRate: 50,
		newsShown: true,
	}
}

function toggleOpt(name) {
	if (name == "offlineProd") {
		alert("离线进度功能现已锁定开启，你可以选择不去开游戏加速")
		options.offlineProd = true
		return;
	}
	if (name == "oldStyle" && styleCooldown > 0)
		return;

	options[name] = !options[name];
	if (name == 'mouse') {
		mouseSetting()
	}
	if (name == 'cursive') {
		cursiveSetting()
	}
	if (name == "hqTree")
		changeTreeQuality();
	if (name == "oldStyle")
		updateStyle();
	if (name == "biggerUpgs")
		upgSizeSetting();
}
var styleCooldown = 0;
function updateStyle() {
	styleCooldown = 1;
	let css = document.getElementById("styleStuff");
	css.href = options.oldStyle ? "oldStyle.css" : "style.css";
	needCanvasUpdate = true;
}
function cursiveSetting() {
	let on = options.cursive
	document.body.style.setProperty('--font', on ? 'cursive, "bahnschrift", "Inconsolata", monospace' : '"bahnschrift", "Inconsolata", monospace');
}
function upgSizeSetting() {
	let on = options.biggerUpgs
	document.body.style.setProperty('--upgheight', on ? '150px' : '120px');
	document.body.style.setProperty('--upgwidth', on ? '150px' : '120px');
}
function changeTreeQuality() {
	var on = options.hqTree;
	document.body.style.setProperty('--hqProperty1', on ? "2px solid" : "4px solid");
	document.body.style.setProperty('--hqProperty2a', on ? "-4px -4px 4px rgba(0, 0, 0, 0.25) inset" : "-4px -4px 4px rgba(0, 0, 0, 0) inset");
	document.body.style.setProperty('--hqProperty2b', on ? "0px 0px 20px var(--background)" : "");
	document.body.style.setProperty('--hqProperty3', on ? "2px 2px 4px rgba(0, 0, 0, 0.25)" : "none");
}
function toggleAuto(toggle) {
	Vue.set(player[toggle[0]], [toggle[1]], !player[toggle[0]][toggle[1]]);
	needCanvasUpdate = true
}

const MS_DISPLAYS = ["所有", "最后一个, 自动化, 未完成", "自动化, 未完成", "未完成", "无"];
const MS_DISPLAYS_I18N = ["ALL", "LAST, AUTO, INCOMPLETE", "AUTOMATION, INCOMPLETE", "INCOMPLETE", "NONE"];

const MS_SETTINGS = ["always", "last", "automation", "incomplete", "never"];

function adjustMSDisp() {
	options.msDisplay = MS_SETTINGS[(MS_SETTINGS.indexOf(options.msDisplay) + 1) % 5];
}
function milestoneShown(layer, id) {
	complete = player[layer].milestones.includes(id);
	auto = layers[layer].milestones[id].toggles;

	switch (options.msDisplay) {
		case "always":
			return true;
			break;
		case "last":
			return (auto) || !complete || player[layer].lastMilestone === id;
			break;
		case "automation":
			return (auto) || !complete;
			break;
		case "incomplete":
			return !complete;
			break;
		case "never":
			return false;
			break;
	}
	return false;
}

function mouseSetting() {
	if (options.mouse == true) {
		document.oncontextmenu = function (event) {
			event.preventDefault()
		}

		if (document.all) {
			document.onselectstart = function () {
				return false
			}
		} else {
			document.onmousedown = function () {
				return false
			}
			document.onmouseup = function () {
				return true
			}
		}
	} else {
		document.oncontextmenu = function (event) {
		}

		if (document.all) {
			document.onselectstart = function () {
				return true
			}
		} else {
			document.onmousedown = function () {
				return true
			}
			document.onmouseup = function () {
				return false
			}
		}
	}
}

function switchTextShadowShown() {
	options.textShadowShown = !options.textShadowShown
}

function switchDefaultUpgSize() {
	options.biggerUpgs = !options.biggerUpgs
}

var notations = ['Scientific', 'Hyper-E', 'Letter', 'Emoji', 'Chinese', 'Standard', 'Blind', 'Fixed Infinity'] //想在ExpantaNum.js里搓记数法还是很吃力的（
var notationsZH = ['科学(FGH-JK)', '超-E', '字母', 'Emoji', '中文', '标准', '失明', '修复无限']
function changeNotation() {//记数法没有修好 -- 25w34a进入测试状态
	options.notation = notations[(notations.indexOf(options.notation) + 1) % notations.length]
}

function setUpdatingRate() {
	let rate = prompt("请输入更新频率（下限50 上限1000 单位毫秒）")
	rate = Number(rate)
	if (!isNaN(rate)) options.updatingRate = Math.max(50, Math.min(1000, Math.round(rate)))
	startInterval()
}

function newsSetting() {
	options.newsShown = !options.newsShown
}
