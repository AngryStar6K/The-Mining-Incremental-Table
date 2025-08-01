function getActiveClass(layer) {
	if (layer == 'info-tab') { layer = 'Information' }
	if (layer == 'options-tab') { layer = 'Setting' }
	if (layer == 'changelog-tab') { layer = 'Changelog' }
	$("button").removeClass("active");
	$('#' + layer).addClass('active')
}

function geti18n() {
	return options.ch || modInfo.languageMod == false
}

var systemComponents = {
	'tab-buttons': {
		props: ['layer', 'data', 'name'],
		template: `
			<div class="upgRow">
				<div v-for="tab in Object.keys(data)">
					<button v-if="data[tab].unlocked == undefined || data[tab].unlocked"
					style="font-family: cursive;"
					v-bind:class="{
						tabButton: true,
						notify: subtabShouldNotify(layer, name, tab),
						resetNotify: subtabResetNotify(layer, name, tab),
						AcSub: tab==player.subtabs[layer][name],
						[tab]: tab==player.subtabs[layer][name]
					}"
					:class=""
					v-bind:id="[tab]"
					v-bind:style="[(data[tab].glowColor && subtabShouldNotify(layer, name, tab) ? {'box-shadow': 'var(--hqProperty2a), 0 0 20px '  + data[tab].glowColor} : {}), tmp[layer].componentStyles['tab-button'], data[tab].buttonStyle]"
					v-on:click="function(){
						player.subtabs[layer][name] = tab
						updateTabFormats()
						needCanvasUpdate = true
					}">{{(geti18n()?data[tab].name:data[tab].nameI18N) ?? tab}}</button>
			</div>
		`
	},

	'tree-node': {
		props: ['layer', 'abb', 'size', 'prev'],
		template: `
		<button v-if="nodeShown(layer) && ((options.ch!==undefined && modInfo.otherLanguageMod==true) || modInfo.otherLanguageMod==false)"
			v-on:mouseover="player.hoverTab = layer"
			v-on:mouseleave="player.hoverTab = 'none'"
			v-bind:id="layer"
			v-on:click="function() {
				if(layer=='Information'){
					showTab('info-tab')
					getActiveClass('Information')
					return
				}
				if(layer=='Setting'){
					showTab('options-tab')
					getActiveClass('Setting')
					return
				}
				if(layer=='Changelog'){
					showTab('changelog-tab')
					getActiveClass('Changelog')
					return
				}
				if (shiftDown) player[layer].forceTooltip = !player[layer].forceTooltip
				else if(tmp[layer].isLayer) {
					if (tmp[layer].leftTab) {
						showNavTab(layer, prev)
						showTab('none')
					}
					else
						showTab(layer, prev)
				}
				else {run(layers[layer].onClick, layers[layer])}

				getActiveClass(layer)

				updateNews()
			}"


			v-bind:class="{
				treeNode: tmp[layer].isLayer,
				treeButton: !tmp[layer].isLayer,
				smallNode: size == 'small',
				[layer]: true,
				tooltipBox: false,
				forceTooltip: player[layer].forceTooltip,
				ghost: tmp[layer].layerShown == 'ghost',
				hidden: !tmp[layer].layerShown,
				locked: tmp[layer].isLayer ? !(player[layer].unlocked || tmp[layer].canReset) : !(tmp[layer].canClick),
				notify: tmp[layer].notify && player[layer].unlocked,
				resetNotify: tmp[layer].prestigeNotify,
				can: ((player[layer].unlocked || tmp[layer].canReset) && tmp[layer].isLayer) || (!tmp[layer].isLayer && tmp[layer].canClick),
				front: !tmp.scrolled,
				active: player.tab==layer,
				small: tmp[layer].small
			}"
			v-bind:style="constructNodeStyle(layer)">
			<span style="font-family: cursive;" v-html="(abb !== '' && tmp[layer].image === undefined) ? (abb+(tmp[layer].notify && player[layer].unlocked?'<notifyMark>!</notifyMark>':'')) : '&nbsp;'"></span>
			<node-mark :layer='layer' :data='tmp[layer].marked'></node-mark>
		</button>
		`
	},

	'layer-tab': {
		props: ['layer', 'back', 'spacing', 'embedded'],
		template: `<div v-bind:style="[tmp[layer].style ? tmp[layer].style : {}, (tmp[layer].tabFormat && !Array.isArray(tmp[layer].tabFormat)) ? tmp[layer].tabFormat[player.subtabs[layer].mainTabs].style : {}]">
		<div v-if="!tmp[layer].tabFormat">
            <div v-html="getPointsDisplay()"></div>
			<infobox v-if="tmp[layer].infoboxes" :layer="layer" :data="Object.keys(tmp[layer].infoboxes)[0]":key="this.$vnode.key + '-info'"></infobox>
			<main-display v-bind:style="tmp[layer].componentStyles['main-display']" :layer="layer"></main-display>
			<div v-if="tmp[layer].type !== 'none'">
				<prestige-button v-bind:style="tmp[layer].componentStyles['prestige-button']" :layer="layer"></prestige-button>
			</div>
			<resource-display v-bind:style="tmp[layer].componentStyles['resource-display']" :layer="layer"></resource-display>
			<milestones v-bind:style="tmp[layer].componentStyles.milestones" :layer="layer"></milestones>
			<div v-if="Array.isArray(tmp[layer].midsection)">
				<column :layer="layer" :data="tmp[layer].midsection" :key="this.$vnode.key + '-mid'"></column>
			</div>
			<clickables v-bind:style="tmp[layer].componentStyles['clickables']" :layer="layer"></clickables>
			<buyables v-bind:style="tmp[layer].componentStyles.buyables" :layer="layer"></buyables>
			<upgrades v-bind:style="tmp[layer].componentStyles['upgrades']" :layer="layer"></upgrades>
			<challenges v-bind:style="tmp[layer].componentStyles['challenges']" :layer="layer"></challenges>
			<achievements v-bind:style="tmp[layer].componentStyles.achievements" :layer="layer"></achievements>
			<br><br>
		</div>
		<div v-if="tmp[layer].tabFormat">
			<column :layer="layer" :data="tmp[layer].tabFormat" :key="this.$vnode.key + '-col'"></column>
			<div v-else>
				<div class="upgTable" v-bind:style="{'padding-top': (embedded ? '0' : '25px'), 'margin-top': (embedded ? '-10px' : '0'), 'margin-bottom': '24px'}">
					<tab-buttons v-bind:style="tmp[layer].componentStyles['tab-buttons']" :layer="layer" :data="tmp[layer].tabFormat" :name="'mainTabs'"></tab-buttons>
				</div>
				<layer-tab v-if="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].embedLayer" :layer="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].embedLayer" :embedded="true" :key="this.$vnode.key + '-' + layer"></layer-tab>
				<column v-else :layer="layer" :data="tmp[layer].tabFormat[player.subtabs[layer].mainTabs].content" :key="this.$vnode.key + '-col'"></column>
			</div>
		</div></div>
			`
	},

	'overlay-head': {
		template: `
		`
	},

	'info-tab': {
		template: `
        <div><br><br><br>
        <h1>{{geti18n()?modInfo.name:modInfo.nameI18N}}</h1>
        <br><br><br>

        <h2>{{ geti18n()?"参与人员":"Authors" }}:</h2><br><br>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ geti18n()?"本模组作者":"Mod Author" }}:</h3><br>
			{{ modInfo.author }}<br><br>
			<h6 style="color:#aaa">({{ geti18n()?"本Mod基于Shinwmyste的The Modding Table制作":"Based On Shinwmyste\'s The Modding Table" }})</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ geti18n()?"模组页作者":"The Modding Table Author" }}:</h3><br>
			Shinwmyste<br><br><h6 style="color:#aaa">({{ geti18n()?"制作":"Developed" }} The Modding Tree <a v-bind:href="'https://github.com/shenmi124/The-Modding-Table/blob/main/changelog.md'" target="_blank" class="link" v-bind:style = "{'font-size': '10px', 'display': 'inline'}">{{TMT_VERSION.newtmtNum}}</a>)</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ geti18n()?"模组页帮助者":"The Modding Table Helper" }}:</h3><br>
			QwQe308<br><br>
			<h6 style="color:#aaa">({{ geti18n()?"一些零碎的改动":"Made Some Minor Changes" }})</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ geti18n()?"模板支持":"Original TMT Author" }}:</h3><br>
			Acamaeda<br><br>
			<h6 style="color:#aaa">(The Modding Tree <a v-bind:href="'https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md'" target="_blank" class="link" v-bind:style = "{'font-size': '10px', 'display': 'inline'}">{{TMT_VERSION.tmtNum}}</a>)</h6>
		</div>
		<br><br><br><br>

        <h2>{{ geti18n()?"统计数据":"Statistics" }}:</h2><br><br>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ geti18n()?"游戏时长":"Game Time" }}:</h3><br>
			{{ formatTime(player.timePlayed*1000) }}<br><br>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ modInfo.pointsName }}:</h3><br>
			{{ format(player.points) }}<br><br>
		</div>

		<br><br><br><br>
		
        <h2>{{ geti18n()?"其他页面":"Other Pages" }}:</h2><br><br>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ geti18n()?"更新日志":"Changelog" }}:</h3><br>
			<a class="link" onclick="showTab('changelog-tab');getActiveClass('Changelog')">{{ geti18n()?"点击跳转":"Click Here" }}</a><br>
			<h6 style="color:#aaa">({{ geti18n()?"其实也可以点右上角的版本号":"The Top-Right Version Button Matters" }})</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ geti18n()?"Shinwmyste的Discord":"Shinwmyste's Discord" }}:</h3><br>
			<a class="link" href="https://discord.gg/DTJYvatRQA" target="_blank">{{ geti18n()?"点击跳转":"Click Here" }}</a><br>
			<h6 style="color:#aaa">({{ geti18n()?"加入DC群":"Join Discord" }})</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{geti18n()?"QQ群":"QQ Group"}}:</h3><br>
			<a class="link" href="https://qm.qq.com/q/axo4Pc8xvG" target="_blank">{{ geti18n()?"点击跳转":"Click Here" }}</a><br>
			<h6 style="color:#aaa"><s>({{geti18n()?"快点来,非常好玩(确信)":"I know you dont use this"}})</s></h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ geti18n()?"捐助页面":"Donate Page" }}:</h3><br>
			<a class="link" href="https://afdian.net/@Mysterious124" target="_blank">{{ geti18n()?"点击跳转":"Click Here" }}</a><br>
			<h6 style="color:#aaa">($_$)</h6>
		</div>
		
		<div style="border: 3px solid #888; width:300px; height:30px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ geti18n()?"模组树Discord":"The Modding Tree Discord" }}:</h3><br>
			<a class="link" href="https://discord.gg/F3xveHV" target="_blank">{{ geti18n()?"点击跳转":"Click Here" }}</a><br>
			<h6 style="color:#aaa">({{ geti18n()?"就是这些":"That\'s all" }})</h6>
		</div>

		<br><br><br><br>
		
        <h2>{{ geti18n()?"关于作者":"About Mod Author" }}:</h2><br><br>
		<div style="border: 3px solid #888; width:300px; height:145px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ geti18n()?"马造2树（英语）":"Mario Maker 2 Tree" }}:</h3><br>
			<a class="link" href="https://angrystar6k.github.io/The-Mario-Maker-2-Tree" target="_blank">{{ geti18n()?"点击跳转":"Click Here" }}</a><br>
			<h6 style="color:#aaa">({{ geti18n()?"这是作者的第一个TMT作品":"Aurhor's First TMT Game" }})</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:145px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ geti18n()?"在galaxy.click上玩马造2树（英语）":"Play MM2T on galaxy.click" }}:</h3><br>
			<a class="link" href="https://galaxy.click/play/318" target="_blank">{{ geti18n()?"点击跳转":"Click Here" }}</a><br>
			<h6 style="color:#aaa">(截止2025/7/21，马造2树版本为v0.12)</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:145px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ geti18n()?"挖矿增量页（中文）":"TMIT" }}:</h3><br>
			<a class="link" href="https://angrystar6k.github.io/The-Mining-Incremental-Table" target="_blank">{{ geti18n()?"点击跳转":"Click Here" }}</a><br>
			<h6 style="color:#aaa">(就是你现在在玩的)</h6>
		</div>
		<div style="border: 3px solid #888; width:300px; height:145px; margin-top: 8px; padding:15px; border-radius: 5px; display: inline-table">
			<h3>{{ geti18n()?"挖矿增量页（中文）锅巴备用地址":"TMIT" }}:</h3><br>
			<a class="link" href="https://the-mining-incremental-table.g8hh.com.cn/" target="_blank">{{ geti18n()?"点击跳转":"Click Here" }}</a><br>
			<h6 style="color:#aaa">(或者在这)</h6>
		</div>

		<br><br><br><br>
		
		<h2>快捷键：</h2><br>
        <span v-for="key in hotkeys" v-if="player[key.layer].unlocked && tmp[key.layer].hotkeys[key.id].unlocked"><br>{{key.description}}</span>

		<br><br><br><br>
		
		<h2>特别感谢：</h2><br><br>

		<span>Phigr1301: 提供许多建议并协助修复bug<br>
		BeautyFallenCat: 故事层级剧情的显示窗口样式Modal原作者<br>
		MC_Edwin、TCreopargh：挖矿增量部分层级资源设计（美术设计，颜色等）原型整合包作者<br>
		</span>
		
		<br><br><br><br></div>
    `
	},

	'options-tab': {
		template: ` 
        <table><br><br><br><br><br><br>
            <tr>
				<td><h1>{{geti18n()?'存档':'Save'}}&nbsp;&nbsp;&nbsp;</h1></td>
				<td><button class="opt" onclick="save()">{{geti18n()?'本地存档':'Save'}}</button></td>
                <td><button class="opt" onclick="toggleOpt('autosave')">{{geti18n()?'自动存档':'AutoSave'}}: {{ options.autosave?(geti18n()?"已开启":"ON"):(geti18n()?"已关闭":"OFF") }}</button></td>
                <td><button class="opt" onclick="hardReset()">{{geti18n()?'硬重置(删除存档)':'HardReset'}}</button></td>
				<td><button class="opt" onclick="exportSave()">{{geti18n()?'导出存档(复制到黏贴板)':'Export'}}</button></td>
				<td><button class="opt" onclick="importSave()">{{geti18n()?'导入存档':'Import'}}</button></td>
			</tr><br>
			<tr>
                <td><h1>{{geti18n()?'优化':'Qol'}}&nbsp;&nbsp;&nbsp;</h1></td>
                <td><button class="opt" onclick="toggleOpt('offlineProd')">{{geti18n()?'离线进度':'Offline Prod'}}: {{ options.offlineProd?(geti18n()?"已开启":"ON"):(geti18n()?"已关闭":"OFF") }}</button></td>
                <td><button class="opt" onclick="toggleOpt('mouse')">{{geti18n()?'优化鼠标操作':'Optimized mouse operation'}}: {{ options.mouse ? (geti18n()?"已开启":"ON"):(geti18n()?"已关闭":"OFF")}}</button></td>
			</tr><br>
			<tr>
                <td><h1>{{geti18n()?'显示':'Display'}}&nbsp;&nbsp;&nbsp;</h1></td>
				<td><button class="opt" onclick="toggleOpt('hideChallenges')">{{geti18n()?'已完成挑战':'Completed Challenges'}}: {{ options.hideChallenges?(geti18n()?"隐藏":"HIDDI18N"):(geti18n()?"显示":"SHOWN") }}</button></td>
                <td><button class="opt" onclick="adjustMSDisp()">{{geti18n()?'显示里程碑':'Show Milestones'}}: {{geti18n()? MS_DISPLAYS[MS_SETTINGS.indexOf(options.msDisplay)] : MS_DISPLAYS_I18N[MS_SETTINGS.indexOf(options.msDisplay)]}}</button></td>
			    <td><button class="opt" onclick="toggleOpt('cursive')">{{geti18n()?'全页面草书字体':'Cursive Font'}}: {{ options.cursive?(geti18n()?"已开启":"ON"):(geti18n()?"已关闭":"OFF") }}<br><h6>{{geti18n()?"(注: 字体会根据你的浏览器的默认字体而改变, 对于不同浏览器可能会有不同效果, 对于部分浏览器可能无效)":"(Note: The font will change according to your browser's default font. Effects may vary across different browsers, and may not work in some browsers)"}}</h6></button></td>
				<td><button class="opt" onclick="switchTextShadowShown()">{{geti18n()?'显示文本阴影':'Show Text Shadow'}}: {{options.textShadowShown?(geti18n()?"是":"ON"):(geti18n()?"否":"OFF")}}</button></td>
				<td><button class="opt" onclick="switchDefaultUpgSize();upgSizeSetting()">{{geti18n()?'升级按钮默认大小':'Default Upgrade Size'}}: {{options.biggerUpgs?"150px":"120px"}}<br><h6>{{geti18n()?"(注: 原版TMT升级大小为120px，为了显示不突兀，提供150px的选项。但部分升级不适用)":"(Placeholder)"}}</h6></button></td>
			</tr><br>
			<tr>
				<td><h1>{{''}}&nbsp;&nbsp;&nbsp;</h1></td>
				<td><button class="opt" onclick="changeNotation()">{{geti18n()?'记数法(暂时不可用)':'Notation'}}: {{notationsZH[notations.indexOf(options.notation)]}}</button></td>
				<td><button class="opt" onclick="switchTheme()">主题: {{ getThemeName() }}<br><h6>(注：部分主题可能会导致一些资源文字难以看清)</br></button></td>
				<td><button class="opt" onclick="setUpdatingRate()">更新频率: {{ options.updatingRate }}ms<br><h6></br></button></td>
				<td><button class="opt" onclick="newsSetting()">滚动新闻: {{ options.newsShown ? "显示" : "隐藏" }}<br><h6></br></button></td>
				</tr><br>
			<tr>
				<td><button class="opt" v-if="modInfo.otherLanguageMod==true" onclick="
                options.ch=!options.ch;
                needsCanvasUpdate = true; document.title = (geti18n()? modInfo.name : modInfo.nameI18N);
                VERSION.withName = VERSION.withoutName + (VERSION.name ? ': ' + (geti18n()? VERSION.name :VERSION.nameI18N) : '');
				setupModInfo();
                ">{{geti18n()?'语言':'Language'}}: {{ geti18n()?"中文(Chinese)":"英文(English)" }}</button></td>
			</tr>
        </table>`
	},

	'back-button': {
		template: `
        <button v-bind:class="back" onclick="goBack()">←</button>
        `
	},


	'tooltip': {
		props: ['text'],
		template: `<div class="tooltip" v-html="text"></div>
		`
	},

	'node-mark': {
		props: { 'layer': {}, data: {}, offset: { default: 0 }, scale: { default: 1 } },
		template: `<div v-if='data'>
			<div v-if='data === true' class='star' v-bind:style='{position: "absolute", left: (offset-10) + "px", top: (offset-10) + "px", transform: "scale( " + scale||1 + ", " + scale||1 + ")"}'></div>
			<img v-else class='mark' v-bind:style='{position: "absolute", left: (offset-22) + "px", top: (offset-15) + "px", transform: "scale( " + scale||1 + ", " + scale||1 + ")"}' v-bind:src="data"></div>
		</div>
		`
	},

	'particle': {
		props: ['data', 'index'],
		template: `<div><div class='particle instant' v-bind:style="[constructParticleStyle(data), data.style]" 
			v-on:click="run(data.onClick, data)"  v-on:mouseenter="run(data.onMouseOver, data)" v-on:mouseleave="run(data.onMouseLeave, data)" ><span v-html="data.text"></span>
		</div>
		<svg version="2" v-if="data.color">
		<mask v-bind:id="'pmask' + data.id">
        <image id="img" v-bind:href="data.image" x="0" y="0" :height="data.width" :width="data.height" />
    	</mask>
    	</svg>
		</div>
		`
	},

	'bg': {
		props: ['layer'],
		template: `<div class ="bg" v-bind:style="[tmp[layer].style ? tmp[layer].style : {}, (tmp[layer].tabFormat && !Array.isArray(tmp[layer].tabFormat)) ? tmp[layer].tabFormat[player.subtabs[layer].mainTabs].style : {}]"></div>
		`
	}

}
