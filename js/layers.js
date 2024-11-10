const ExpantaNumInfinity = ExpantaNum(Number.MAX_VALUE)

const tick = ExpantaNum(20)

function d(EN) {
    return ExpantaNum(EN)
}

addLayer("0layer", {
    name: "sideLayer0",
    position: -4,
    row: 1,
    symbol() {return  '↓ 杂项 ↓'},
    small: true,// Set true to generate a slightly different layer
    nodeStyle: {"font-size": "15px", "height": "30px"},// Change layer button' style
    startData() { return {
        unlocked: true,
        points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return true},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
    update() {
        levelUpdating()
    },
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})

addLayer("statistics", {
    name: "statistics",
    position: -3,
    row: 1,
    symbol() {return  '统计'},// Set true to generate a slightly different layer
    // Change layer button' style
    startData() { return {
        unlocked: true,
        points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return true},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "blank",
        ["display-text", () => `这里可以显示所有已解锁的资源数量`],
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "世界1": {
                unlocked() {return true},
                content: [
                    ["blank", "15px"],
                    ["microtabs", "world1"],                 
                ]
            },
            "制造": {
                unlocked() {return true},
                content: [
                    ["blank", "15px"],
                    ["microtabs", "craft"],                 
                ]
            },
        },
        world1: {
            "木头": {
                unlocked() {return tmp.wood.layerShown},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.wood.layerShown) return `你有${textStyle_h3(formatWhole(player.wood.points), 'b8945e')}木头`}],  
                    "blank",
                    ["display-text", function() {if (hasUpgrade(wood, 23)) return `你有${textStyle_h3(formatWhole(player.wood.oak), 'b8945e')}橡木原木`}],
                    ["display-text", function() {if (hasUpgrade(wood, 31)) return `你有${textStyle_h3(formatWhole(player.wood.spruce), '826038')}云杉原木`}],              
                ],
                buttonStyle() {
                    return {
                        'background-color':'#b8945e'
                    }
                },
            },
            "石头": {
                unlocked() {return tmp.stone.layerShown},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.stone.layerShown) return `你有${textStyle_h3(formatWhole(player.stone.points), '4a4a4a')}石头`}],  
                    "blank", 
                    ["display-text", function() {if (hasUpgrade(stone, 23)) return `你有${textStyle_h3(formatWhole(player.stone.dirt), '5f452f')}泥土`}],           
                ],
                buttonStyle() {
                    return {
                        'background-color':'#4a4a4a'
                    }
                },
            },
        },
        craft: {
            "合成台": {
                unlocked() {return tmp.crafting_table.layerShown},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.crafting_table.layerShown) return `你有${textStyle_h3(formatWhole(player.crafting_table.points), 'b8945e')}合成台`}],  
                    "blank",
                ],
                buttonStyle() {
                    return {
                        'background-color':'#b8945e'
                    }
                },
            },
        },
    },

})

function hasNormalAchievement(id) {
    return hasAchievement('achievements', id)
}

addLayer("achievements", {
    name: "achievements",
    position: -2,
    row: 1,
    symbol() {return  '成就'},// Set true to generate a slightly different layer
    // Change layer button' style
    startData() { return {
        unlocked: true,
        points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    resource: "成就点数",
    color: "#ffe125",
    type: "none",
    tooltip(){return false},
    layerShown(){return true},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	
    doReset() {return undefined},

    achievements: {
        11: {
            name: "第一步",
            tooltip: "获得1木头 <br> 奖励：1成就点数",
            done() {return player.wood.points.gte(1)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1)
            },
        },
        12: {
            name: "手搓合成",
            tooltip: "解锁合成台 <br> 奖励：1成就点数",
            done() {return hasUpgrade(wood, 15)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1)
            },
        },
        13: {
            name: "结束手搓",
            tooltip: "获得1合成台 <br> 奖励：1成就点数<br>现在成就点数可以倍增经验获取",
            done() {return player.crafting_table.points.gte(1)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1)
            },
        },
        14: {
            name: "工具是必要的",
            tooltip: "合成木斧 <br> 奖励：2成就点数<br>",
            done() {return hasCraftingItem(11)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(2)
            },
        },
        15: {
            name: "叮铃铃！",
            tooltip: "到达等级5 <br> 奖励：2成就点数<br>",
            done() {return player.level.gte(5)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(2)
            },
        },
        16: {
            name: "斧头无法胜任的工作",
            tooltip: "解锁石头 <br> 奖励：3成就点数<br>",
            done() {return hasUpgrade(wood, 25)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(3)
            },
        },
        17: {
            name: "击碎岩石",
            tooltip: "合成木镐 <br> 奖励：3成就点数<br>",
            done() {return hasCraftingItem(12)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(3)
            },
        },
        21: {
            name: "获得升级",
            tooltip: "合成石镐 <br> 奖励：4成就点数<br>解锁第3排木头升级",
            done() {return hasCraftingItem(22)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(4)
            },
        },
        22: {
            name: "图纸",
            tooltip: "解锁合成台图纸 <br> 奖励：6成就点数",
            done() {return hasUpgrade(wood, 35)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(6)
            },
        },
        23: {
            name: "终极有序合成",
            tooltip: "获得81合成台 <br> 奖励：1成就点数",
            done() {return player.crafting_table.points.gte(81)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1)
            },
        },
        24: {
            name: "Cu",
            tooltip: "解锁铜层级 <br> 奖励：10成就点数",
            done() {return hasUpgrade(stone, 25)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(10)
            },
        },
    },

    effect() {
        let eff = player.achievements.points.max(1)
        return eff
    },

    effectDescription() {
        if (hasNormalAchievement(13)) return `倍增经验获取${textStyle_h2(format(tmp.achievements.effect)+"x", 'ffe125')}`
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "blank",
        "main-display",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "普通成就": {
                unlocked() {return true},
                content: [
                    ["blank", "15px"],
                    ["achievements", [1,2,3,4,5,6,7,8,9,10]],                 
                ]
            },
            "隐藏成就": {
                unlocked() {return true},
                content: [
                    ["blank", "15px"],
                    ["achievements", [1001,1002,1003,1004,1005,1006,1007,1008,1009,1010]],                 
                ]
            },
        },
    },
})

addLayer("1layer", {
    name: "sideLayer1",
    position: -1,
    row: 1,
    symbol() {return (options.ch || modInfo.languageMod==false) ? '↓ 世界 1 ↓' : '↓ layer 1 ↓'},
    symbolEN() {return (options.ch || modInfo.languageMod==false) ? '↓ 层级 1 ↓' : '↓ layer 1 ↓'},
    small: true,// Set true to generate a slightly different layer
    nodeStyle: {"font-size": "15px", "height": "30px"},// Change layer button' style
    startData() { return {
        unlocked: true,
        points: d(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return `${formatWhole(player.wood.points)}木头`},
    layerShown(){return true},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
    ]
})

const wood = "wood"
const stone = "stone"
const copper = "copper"

const ct = "crafting_table"


//世界1层1：木头
addLayer("wood", { 
    name: "wood", // This is optional, only used in a few places, If absent it just uses the layer id
    symbol() {
        let s = "木头  "
        if (shouldNotify(wood)) s += textStyle_h3("[!]", 'ff0000')
        return s
    }, // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 1,
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
        hardness: d(10),
        progress: d(0),
        speed: d(2),
        rarity: d(1),
        correspondingTool: "axe",
        miningLevel: d(0),
        destroying: false,
        oak: d(0),
        spruce: d(0),
        birch: d(0),
        jungle: d(0),
        acacia: d(0),
        darkOak: d(0),
        cherry: d(0),
        paleOak: d(0),
    }},
    color: "#b8945e",
    requires: new ExpantaNum(10), // Can be a function that takes requirement increases into account
    resource: "木头", // Name of prestige currency
    resourceEN: "prestige points", // The second name of prestige currency ( If you open otherLanguageMod )
    baseResource: "points", // Name of resource prestige is based on
    baseResourceEN: "points", // The second name of resource prestige is based on ( If you open otherLanguageMod )
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        m = d(1)
        if (hasUpgrade(wood, 12)) m = m.times(upgradeEffect(wood, 12))
        if (hasUpgrade(wood, 22)) m = m.times(upgradeEffect(wood, 22))
        if (hasUpgrade(wood, 24)) m = m.times(2)
        if (hasUpgrade(stone, 11)) m = m.times(2)
        if (hasCraftingItem(21)) m = m.times(5)
        if (hasUpgrade(wood, 32)) m = m.times(10)
        if (hasUpgrade(wood, 34)) m = m.times(3)
        if (hasUpgrade(wood, 35)) m = m.times(3)
        return m
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return d(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},

doReset(resettingLayer) {
        if (layers[resettingLayer].name = ct) {
            let kept = ["unlocked", "auto"]
                if(hasMilestone(ct, 0)) {
                kept.push("milestones"),
                kept.push("upgrades")
                }
            layerDataReset(this.layer, kept)
        }
    },

    upgrades: {
        11: {
            title: "游戏开始",
            description: "开始获得1经验每秒",
            cost() {return new ExpantaNum(0)},
            unlocked(){return true},
            effect() {
                let g = d(1)
                if (hasMilestone(wood, 0)) g = g.times(5)
                if (hasUpgrade(wood, 13)) g = g.times(upgradeEffect('wood', 13))
                if (hasUpgrade(wood, 14)) g = g.times(upgradeEffect('wood', 14))
                if (hasMilestone(wood, 1)) g = g.times(11.4514)
                if (hasNormalAchievement(13)) g = g.times(tmp.achievements.effect)
                if (hasUpgrade(wood, 21)) g = g.times(upgradeEffect(wood, 21))
                if (hasUpgrade(wood, 23)) g = g.times(tmp.wood.logEffects.oak)
                if (hasUpgrade(stone, 12)) g = g.times(upgradeEffect(stone, 12))
                if (hasUpgrade(stone, 13)) g = g.times(upgradeEffect(stone, 13))
                if (hasUpgrade(stone, 14)) g = g.times(100)
                if (hasUpgrade(wood, 31)) g = g.times(tmp.wood.logEffects.spruce)
                return g
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}/秒`
            },
        },
        12: {
            title: "连锁挖掘",
            description: "等级加成木头获取",
            cost() {return new ExpantaNum(5)},
            unlocked(){return true},
            effect() {
                let eff = player.level.max(0).add(1).pow(1.35).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        }, 
        13: {
            title: "伐木经验",
            description: "伐木进度加成经验获取",
            cost() {return new ExpantaNum(25)},
            unlocked(){return true},
            effect() {
                let eff = player.wood.progress.max(1)
                if (hasCraftingItem(21)) eff = d(10)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        14: {
            title: "经验自增",
            description: "需求：等级2<br>经验加成自身<br>于1.798e308x到达软上限",
            cost() {return new ExpantaNum(40)},
            unlocked(){return true},
            canAfford() {return player.level.gte(2)},
            effect() {
                let base = player.points.max(1).root(3)
                if (base.lte(ExpantaNumInfinity)) eff = base
                if (base.gt(ExpantaNumInfinity)) eff = base.div(ExpantaNumInfinity).root(10).times(ExpantaNumInfinity)
                return eff
            },
            effectDisplay() {
                let softcap = ""
                if (upgradeEffect(this.layer, this.id).gte(ExpantaNumInfinity)) softcap = "（受软上限限制）"
                return `${format(upgradeEffect(this.layer, this.id))}x ${softcap}`
            },
        },
        15: {
            title: "发展科技",
            description: "需求：等级3<br>解锁新区域：制造，以及新层级：合成台",
            cost() {return new ExpantaNum(125)},
            canAfford() {return player.level.gte(3)},
            unlocked(){return true},
        },
        21: {
            title: "进阶伐木",
            description: "木头加成经验获取",
            cost() {return new ExpantaNum(144)},
            unlocked(){return hasCraftingItem(11)},
            effect() {
                let eff = player.wood.points.max(1).pow(0.3)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        22: {
            title: "成就伐木",
            description: "需求：等级4<br>成就点数加成木头获取",
            cost() {return new ExpantaNum(169)},
            canAfford() {return player.level.gte(4)},
            unlocked(){return hasCraftingItem(11)},
            effect() {
                let eff = player.achievements.points.max(1).root(2).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        23: {
            title: "原木分类",
            description: "解锁新页面，你将有概率获取多种类的原木",
            cost() {return new ExpantaNum(300)},
            unlocked(){return hasCraftingItem(11)},
        },
        24: {
            title: "橡树林",
            description: "需求：等级5<br>双倍木头获取",
            currencyInternalName: "oak",
            currencyDisplayName: "橡木原木",
            currencyLayer: wood,
            cost() {return new ExpantaNum(20)},
            canAfford() {return player.level.gte(5)},
            unlocked(){return hasCraftingItem(11)},
        },
        25: {
            title: "目光向下",
            description: "需求：等级5<br>解锁新层级：石头",
            currencyInternalName: "oak",
            currencyDisplayName: "橡木原木",
            currencyLayer: wood,
            cost() {return new ExpantaNum(40)},
            canAfford() {return player.level.gte(5)},
            unlocked(){return hasCraftingItem(11)},
        },
        31: {
            title: "云杉树",
            description: "需求：等级9<br>允许你获得云杉原木",
            cost() {return new ExpantaNum(50000)},
            canAfford() {return player.level.gte(9)},
            unlocked(){return hasNormalAchievement(21)},
        },
        32: {
            title: "效率I",
            description: "10x木头获取",
            currencyInternalName: "spruce",
            currencyDisplayName: "云杉原木",
            currencyLayer: wood,
            cost() {return new ExpantaNum(40)},
            unlocked(){return hasNormalAchievement(21)},
        },
        33: {
            title: "云杉木手柄部件",
            description: "需求：等级12<br>1.2x挖掘速度，3x石头获取",
            currencyInternalName: "spruce",
            currencyDisplayName: "云杉原木",
            currencyLayer: wood,
            cost() {return new ExpantaNum(125)},
            canAfford() {return player.level.gte(12)},
            unlocked(){return hasNormalAchievement(21)},
        },
        34: {
            title: "石头手柄部件",
            description: "需求：等级12<br>1.2x撸树速度，3x木头获取",
            currencyInternalName: "points",
            currencyDisplayName: "石头",
            currencyLayer: stone,
            cost() {return new ExpantaNum(200)},
            canAfford() {return player.level.gte(12)},
            unlocked(){return hasNormalAchievement(21)},
        },
        35: {
            title: "进一步加强",
            description: "3x木头获取，解锁一排石头升级和合成台图纸",
            cost() {return new ExpantaNum(4567890)},
            unlocked(){return hasNormalAchievement(21)},
        },
    },

    milestones: {
        0: {
            requirementDescription() {return `获得15木头`},
            effectDescription() {return `奖励：5倍经验获取`},
            done() { return player.wood.points.gte(15) },
            unlocked() {return true},
        },
        1: {
            requirementDescription() {return `获得114,514经验`},
            effectDescription() {return `奖励：11.4514倍经验获取`},
            done() { return player.points.gte(114514) },
            unlocked() {return true},
        },
    },
    
    clickables: {
        11: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "点击撸树"
                return d
                },
            canClick() {return !player.wood.destroying},
            onClick() {
                if (!player.wood.destroying) player.wood.destroying = true
            },
            unlocked() {return player.level.gte(1)},
            style() {
                return {
                    'min-height':'50px',
                    'width':'120px',
                    'font-size':'20px'
                }
            },
        },
    },

    bars: {
        woodDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {return `进度: ${format(player.wood.progress)}/${format(hardness('wood'))}`},
            progress() { return player.wood.progress.div(hardness('wood')) },
            unlocked() {return player.level.gte(1)},
            fillStyle() {return {"background-color":"#b8945e"}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
        },
    },

    update() {
        if (player.wood.destroying) player.wood.progress = player.wood.progress.add(player.wood.speed.div(tick))
        if (player.wood.progress.gte(hardness('wood'))) player.wood.progress = d(0),
        player.wood.destroying = false,
        player.wood.points = player.wood.points.add(tmp.wood.gainMult),
        player.wood.oak = player.wood.oak.add(tmp.wood.logGain.oak),
        player.wood.spruce = player.wood.spruce.add(tmp.wood.logGain.spruce)

        if (player.wood.points.gt(player.wood.best)) player.wood.best = player.wood.points

        //撸树速度
        let speed = d(2)
        if (hasCraftingItem(11)) speed = speed.times(2.5)
        if (hasCraftingItem(21)) speed = speed.times(3)
        if (hasUpgrade(wood, 34)) speed = speed.times(1.2)
        player.wood.speed = speed
    },

    logEffects: {
        oak() {
            let eff = player.wood.oak.max(0).times(5).add(1).pow(0.8)
            return eff
        },
        spruce() {
            let eff = player.wood.spruce.max(0).add(10).log10().pow(10)
            return eff
        }
    },

    logGain: {
        oak() {
            let gain = tmp.wood.gainMult.div(15).floor()
            if (!hasUpgrade(wood, 23)) gain = d(0)
            return gain
        },
        spruce() {
            let gain = this.oak().div(105).root(2).floor()
            if (!hasUpgrade(wood, 31)) gain = d(0)
            return gain
        },
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "main-display",
        "blank",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.wood.best)} 木头`],
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "伐木": {
                unlocked() {return true},
                content: [
                    ["blank", "15px"],
                    ["display-text", function() {if (player.level.lt(1)) return `你需要先到等级1解锁伐木！`}],
                    ["bar", "woodDestroying"],
                    "blank",
                    "clickables",
                    "blank",
                    ["display-text", function() {if (player.level.gte(1)) return `挖掘速度：${format(player.wood.speed)}/秒`}],
                    ["display-text", function() {if (player.level.gte(1)) return `破坏一次的木头获取数量：${textStyle_h2(formatWhole(tmp.wood.gainMult), 'b8945e')}`}],
                    ["display-text", function() {if (player.level.gte(1)) return `挖掘等级：0`}],
                ]
            },
            "升级": {
                unlocked() {return true},
                content: [
                    ["blank", "15px"],
                    ["raw-html", () => `<h4 style="opacity:.5">`],
                    ["upgrades", [1,2,3,4,5,6,7,8,9]]
                ]
            },
            "里程碑": {
                unlocked() {return true},
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
            "原木": {
                unlocked() {return hasUpgrade(wood, 23)},
                content: [
                    ["blank", "15px"],
                    ["display-text", function() {if (hasUpgrade(wood, 23)) return `你有 ${textStyle_h2(formatWhole(player.wood.oak), 'b8945e')} 橡木原木，加成经验获取 ${textStyle_h2(format(tmp.wood.logEffects.oak)+"x", 'b8945e')}`}],
                    ["display-text", function() {if (hasUpgrade(wood, 31)) return `你有 ${textStyle_h2(formatWhole(player.wood.spruce), '826038')} 云杉原木，加成经验获取 ${textStyle_h2(format(tmp.wood.logEffects.spruce)+"x", '826038')}`}],
                    ["bar", "woodDestroying"],
                    "blank",
                    "clickables",
                    "blank",
                    ["display-text", function() {if (player.level.gte(1)) return `挖掘速度：${format(player.wood.speed)}/秒`}],
                    ["display-text", function() {if (player.level.gte(1)) return `破坏一次的木头获取数量：${textStyle_h2(formatWhole(tmp.wood.gainMult), 'b8945e')}`}],
                    ["display-text", function() {if (hasUpgrade(wood, 23)) return `破坏一次木头可额外产出 ${textStyle_h2(formatWhole(tmp.wood.logGain.oak), 'b8945e')} 橡木原木 （基于木头获取）`}],
                    ["display-text", function() {if (hasUpgrade(wood, 31)) return `破坏一次木头可额外产出 ${textStyle_h2(formatWhole(tmp.wood.logGain.spruce), '826038')} 云杉原木 （基于橡木原木获取）`}],
                ]               
            },
        },
    },
})

//世界1层2：石头
addLayer("stone", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: d(0),             // "points" is the internal name for the main resource of the layer.
        hardness: d(20),
        miningLevel: d(0),
        progress: d(0),
        speed: d(0),
        destroying: false,
        gravel: d(0),
        dirt: d(0),
        sand: d(0),
    }},

    color: "#4a4a4a",                       // The color for this layer, which affects many elements.
    resource: "石头",                       // The name of this layer's main prestige resource.
    row: 1,
    position: 1,                                 // The row this layer is on (0 is the first row).
    symbol() {
        let s = "石头  "
        if (shouldNotify(stone)) s += textStyle_h3("[!]", 'ff0000')
        return s
    }, // This appears on the layer's node. Default is the id with the first letter capitalized

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "none",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        m = d(1)               // Factor in any bonuses multiplying gain here.
        if (hasUpgrade(stone, 12)) m = m.times(2)
        if (hasCraftingItem(22)) m = m.times(2)
        if (hasUpgrade(wood, 33)) m = m.times(3)
        if (hasUpgrade(stone, 21)) m = m.times(5)
        if (hasUpgrade(stone, 22)) m = m.times(upgradeEffect(stone, 22))
        if (hasUpgrade(stone, 24)) m = m.times(upgradeEffect(stone, 24))
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    layerShown() { return hasNormalAchievement(16) },          // Returns a bool for if this layer's node should be visible in the tree.

    doReset(resettingLayer) {
        if (layers[resettingLayer]==ct) {
            return undefined
        }
    },
    
    upgrades: {
        11: {
            title: "坚硬之物",
            description: "解锁木镐的合成，双倍木头获取",
            cost() {return new ExpantaNum(0)},
            unlocked(){return tmp.stone.layerShown},
        },
        12: {
            title: "粉碎它吧！",
            description: "需求：等级6<br>双倍石头获取，石头加成经验获取",
            cost() {return new ExpantaNum(5)},
            canAfford() {return player.level.gte(6)},
            unlocked(){return tmp.stone.layerShown},
            effect() {
                let eff = player.stone.points.max(0).add(10).log10().pow(5)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        13: {
            title: "合成经验",
            description: "需求：等级6<br>合成台加成经验获取 (硬上限1e100x)",
            cost() {return new ExpantaNum(15)},
            canAfford() {return player.level.gte(6)},
            unlocked(){return tmp.stone.layerShown},
            effect() {
                let eff = player.crafting_table.points.max(0).add(1).pow(2).min(1e100)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        14: {
            title: "经验强化器",
            description: "需求：等级7<br>100x经验获取",
            cost() {return new ExpantaNum(25)},
            canAfford() {return player.level.gte(7)},
            unlocked(){return tmp.stone.layerShown},
        },
        15: {
            title: "获得升级",
            description: "需求：1e20经验<br>解锁石斧和石镐的合成",
            cost() {return new ExpantaNum(25)},
            canAfford() {return player.points.gte(1e20)},
            unlocked(){return tmp.stone.layerShown},
        },
        21: {
            title: "急迫I",
            description: "5x石头获取",
            cost() {return new ExpantaNum(210)},
            unlocked(){return hasNormalAchievement(22)},
        },
        22: {
            title: "合成提升石头",
            description: "合成台加成石头获取",
            cost() {return new ExpantaNum(880)},
            unlocked(){return hasNormalAchievement(22)},
            effect() {
                let eff = player.crafting_table.points.max(0).add(1).pow(0.4)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        23: {
            title: "扩展范围",
            description: "需求：等级14<br>增大挖掘的方块种类，在新页面中显示，允许你挖掘泥土",
            cost() {return new ExpantaNum(2025)},
            canAfford() {return player.level.gte(14)},
            unlocked(){return hasNormalAchievement(22)},
        },
        24: {
            title: "泥土加成",
            description: "泥土少量加成石头获取",
            currencyInternalName: "dirt",
            currencyDisplayName: "泥土",
            currencyLayer: stone,
            cost() {return new ExpantaNum(10)},
            unlocked(){return hasNormalAchievement(22)},
            effect() {
                let eff = player.stone.dirt.max(0).add(3).logBase(3)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        25: {
            title: "岩石之中",
            description: "解锁新层级：铜",
            cost() {return new ExpantaNum(15000)},
            unlocked(){return hasNormalAchievement(22)},
        },
        // Look in the upgrades docs to see what goes here!
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "点击挖掘"
                return d
                },
            canClick() {return !player.stone.destroying && hasCraftingItem(12)},
            onClick() {
                if (!player.stone.destroying) player.stone.destroying = true
            },
            unlocked() {return tmp.stone.layerShown},
            style() {
                return {
                    'min-height':'50px',
                    'width':'120px',
                    'font-size':'20px'
                }
            },
        },
    },

    bars: {
        stoneDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {return `进度: ${format(player.stone.progress)}/${format(hardness(stone))}`},
            progress() { return player.stone.progress.div(hardness(stone)) },
            unlocked() {return tmp.stone.layerShown},
            fillStyle() {return {"background-color":"#4a4a4a"}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
        },
    },

    otherGain: {
        dirt() {
            let gain = tmp.stone.gainMult.max(0).div(360).root(1.1).floor()
            if (!hasUpgrade(stone, 23)) gain = d(0)
            return gain
        }
    },

    update() {
        if (player.stone.destroying) player.stone.progress = player.stone.progress.add(player.stone.speed.div(tick))
        if (player.stone.progress.gte(hardness(stone))) player.stone.progress = d(0),
        player.stone.destroying = false,
        player.stone.points = player.stone.points.add(tmp.stone.gainMult),
        player.stone.dirt = player.stone.dirt.add(tmp.stone.otherGain.dirt)

        if (player.stone.points.gt(player.stone.best)) player.stone.best = player.stone.points

        //挖掘速度
        let speed = d(0)
        if (hasCraftingItem(12)) speed = speed.add(2)
        if (hasCraftingItem(22)) speed = speed.times(3)
        if (hasUpgrade(wood, 33)) speed = speed.times(1.2)
        player.stone.speed = speed
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.stone.best)} 石头`],
        "blank",
        ["display-text", () => `合成合成台不会重置石头相关内容`],
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "挖掘": {
                unlocked() {return tmp.stone.layerShown},
                content: [
                    ["blank", "15px"],
                    ["bar", "stoneDestroying"],
                    "blank",
                    "clickables",
                    "blank",
                    ["display-text", function() {return `挖掘速度：${format(player.stone.speed)}/秒`}],
                    ["display-text", function() {return `破坏一次的石头获取数量：${textStyle_h2(formatWhole(tmp.stone.gainMult), '4a4a4a')}`}],
                    ["display-text", function() {return `挖掘等级：0`}]
                    ["display-text", function() {return `在获取石头之前，你需要一把木镐！`}]
                ]
            },
            "升级": {
                unlocked() {return true},
                content: [
                    ["blank", "15px"],
                    ["raw-html", () => `<h4 style="opacity:.5">`],
                    ["upgrades", [1,2,3,4,5,6,7,8,9]]
                ]
            },
            "里程碑": {
                unlocked() {return true},
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
            "更多挖掘": {
                unlocked() {return hasUpgrade(stone, 23)},
                content: [
                    ["blank", "15px"],
                    ["bar", "stoneDestroying"],
                    "blank",
                    ["display-text", function() {if (hasUpgrade(stone, 23)) return `你有 ${textStyle_h2(formatWhole(player.stone.dirt), '5f452f')} 泥土`}],
                    "blank",
                    "clickables",
                    "blank",
                    ["display-text", function() {return `挖掘速度：${format(player.stone.speed)}/秒`}],
                    ["display-text", function() {return `破坏一次的石头获取数量：${textStyle_h2(formatWhole(tmp.stone.gainMult), '4a4a4a')}`}],
                    ["display-text", function() {if (hasUpgrade(stone, 23)) return `破坏一次石头可额外产出 ${textStyle_h2(formatWhole(tmp.stone.otherGain.dirt), '5f452f')} 泥土 （基于石头获取，开始于360石头/次）`}],
                ]
            },
        },
    },
})

//世界1层3：铜
addLayer("copper", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: d(0),             // "points" is the internal name for the main resource of the layer.
        ore: d(0),
        molten: d(0),
        miningLevel: d(1),
        progress: d(0),
        hardness: d(75),
        destroying: false,
    }},

    color: "#ffb41d",                       // The color for this layer, which affects many elements.
    resource: "铜锭",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 2,
    symbol() {
        let s = "铜  "
        if (shouldNotify(copper)) s += textStyle_h3("[!]", 'ff0000')
        return s
    },

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        m = d(1)                            // 矿物的gainMult是给对应矿石的
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    layerShown() { return hasNormalAchievement(24) },          // Returns a bool for if this layer's node should be visible in the tree.

    doReset(resettingLayer) {
        if (layers[resettingLayer]==ct) {
            return undefined
        }
    },

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        ["display-text", () => `你有 ${textStyle_h2(formatWhole(player.copper.ore), 'ffb41d')} 铜矿石`],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.copper.best)} 铜锭`],
        "blank",
        ["display-text", () => `合成合成台不会重置铜相关内容`],
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "挖掘": {
                unlocked() {return tmp.copper.layerShown},
                content: [
                    ["blank", "15px"],
                ]
            },
            "升级": {
                unlocked() {return tmp.copper.layerShown},
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
        },
    },
    
})

addLayer("2layer", {
    name: "sideLayer2",
    position: 1001,
    row: 101,
    symbol() {return  '↓ 制造 ↓'},
    small: true,// Set true to generate a slightly different layer
    nodeStyle: {"font-size": "15px", "height": "30px"},// Change layer button' style
    startData() { return {
        unlocked: true,
        points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return hasNormalAchievement(12)},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})


function isCraftingItem(id) {
    return player.crafting_table.crafting
}

function hasCraftingItem(id) {
    return player.crafting_table.items[id]
}

function stopCrafting() {
    player.crafting_table.crafting = false,
    player.crafting_table.craftingItem = 0,
    player.crafting_table.progress = d(0)
}

function craftingItemName(id) {
    return tmp.crafting_table.clickables[id].title
}

function craftingItemComp(id) {
    return tmp.crafting_table.clickables[id].complexity
}

function craftingItemID() {
    return player.crafting_table.craftingItem
}

function getCraftingItem(id) {
    player.crafting_table.items[id] = true
}

function craftingItemColor(id) {
    return tmp.crafting_table.clickables[id].style['background-color']
}


//制造层1：合成台
addLayer("crafting_table", { 
    name: "crafting_table",
    position: 1002,
    row: 101,
    symbol() {
        let s = "合成台  "
        if (shouldNotify(ct)) s += textStyle_h3("[!]", 'ff0000')
        return s
    }, // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
        points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
        speed: d(2),
        crafting: false,
        craftingItem: 0,
        progress: d(0),
        items: {
            11: false,
            12: false,
            21: false,
            22: false,
        },
        page: 1,
        maxPage: 1,
    }},
    color: "#b8945e",
    type: "normal",
    layerType: "craft",
    resource: "合成台",
    baseResource() {return "木头"},
    baseAmount() {return player.wood.points},
    exponent: 0.25,
    requires: d(80),
    tooltip(){return false},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        m = d(1)
        return m
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        e = d(1)
        return e
    },
    resetDescription: "重置以合成 ",
    layerShown(){return hasNormalAchievement(12)},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	
    upgrades: {
        11: {
            title: "石质合成台",
            description: "解锁石质合成台的合成",
            currencyInternalName: "points",
            currencyDisplayName: "石头",
            currencyLayer: stone,
            cost() {return new ExpantaNum(10000)},
            unlocked(){return hasNormalAchievement(22)},
        },
    },

    milestones: {
        0: {
            requirementDescription() {return `获得15合成台`},
            effectDescription() {return `奖励：合成合成台时保留木头升级和里程碑`},
            done() { return player.crafting_table.points.gte(15) },
            unlocked() {return true},
        },
    },

    clickables: {
        0: {
            complexity: d(0), //凑数用
            style() {
                return {
                    'background-color':'rgba(0,0,0,0)',
                }
            },
        },
        11: {
            title() {
                let t = "木斧"
                return t},
            display() {
                let d = `
                需要工具：1合成台<br>
                需要材料：120木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：撸树速度x2.5<br>
                解锁新一排木头升级<br>
                挖掘等级：0`
                return d
                },
            complexity: d(25),
            canClick() {return player.crafting_table.points.gte(1) && player.wood.points.gte(120) && !player.crafting_table.crafting && !hasCraftingItem(this.id)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.wood.points = player.wood.points.sub(120)
            },
            unlocked() {return tmp.crafting_table.layerShown},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    'background-color':'#6b511f',
                    'color':'white',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        12: {
            title() {
                let t = "木镐"
                return t},
            display() {
                let d = `
                需要工具：3合成台<br>
                需要材料：500木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：允许你挖掘石头<br>
                挖掘等级：0`
                return d
                },
            complexity: d(40),
            canClick() {return player.crafting_table.points.gte(3) && player.wood.points.gte(500) && !player.crafting_table.crafting && !hasCraftingItem(this.id)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.wood.points = player.wood.points.sub(500)
            },
            unlocked() {return hasUpgrade(stone, 11)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    'background-color':'#6b511f',
                    'color':'white',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        21: {
            title() {
                let t = "石斧"
                return t},
            display() {
                let d = `
                需要工具：9合成台<br>
                需要材料：200木头 + 15石头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：撸树速度x3、木头获取x5、木头升级3效果总是最大值<br>
                挖掘等级：1`
                return d
                },
            complexity: d(60),
            canClick() {return player.crafting_table.points.gte(9) && player.wood.points.gte(200) && player.stone.points.gte(15) && !player.crafting_table.crafting && !hasCraftingItem(this.id)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.wood.points = player.wood.points.sub(200),
                player.stone.points = player.stone.points.sub(15)
            },
            unlocked() {return hasUpgrade(stone, 15)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    'background-color':'#7f7f7f',
                    'color':'white',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        22: {
            title() {
                let t = "石镐"
                return t},
            display() {
                let d = `
                需要工具：9合成台<br>
                需要材料：200木头 + 15石头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：挖掘速度x3、双倍石头获取<br>
                挖掘等级：1`
                return d
                },
            complexity: d(80),
            canClick() {return player.crafting_table.points.gte(9) && player.wood.points.gte(200) && player.stone.points.gte(15) && !player.crafting_table.crafting && !hasCraftingItem(this.id)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.wood.points = player.wood.points.sub(200),
                player.stone.points = player.stone.points.sub(15)
            },
            unlocked() {return hasUpgrade(stone, 15)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    'background-color':'#7f7f7f',
                    'color':'white',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        31: {
            title() {
                let t = "石质合成台"
                return t},
            display() {
                let d = `
                需要工具：120合成台<br>
                需要材料：2000木头 + 21000石头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：合成台合成速度x5<br>`
                return d
                },
            complexity: d(240),
            canClick() {return player.crafting_table.points.gte(120) && player.wood.points.gte(2000) && player.stone.points.gte(21000) && !player.crafting_table.crafting && !hasCraftingItem(this.id)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.wood.points = player.wood.points.sub(2000),
                player.stone.points = player.stone.points.sub(21000)
            },
            unlocked() {return hasUpgrade(ct, 11)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    'background-color':'#7f7f7f',
                    'color':'white',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        1001: {
            display() {
                let d = `取消合成`
                return d
            },
            canClick() {return isCraftingItem()},
            onClick() {
                if (confirm("你确定要取消合成吗？这将不会返还材料，并且会丢失合成进度！")) stopCrafting()
            },
            style() {
                return {
                    'min-height':'50px',
                    'width':'120px',
                    'font-size':'20px'
                }
            },
        },
        1011: {
            display() {
                let d = `<`
                return d
            },
            canClick() {return player.crafting_table.page > 1},
            onClick() {
                player.crafting_table.page -= 1
            },
            style() {
                return {
                    'min-height':'50px',
                    'width':'50px',
                    'font-size':'20px',
                }
            },
        },
        1012: {
            display() {
                let d = `${formatWhole(player.crafting_table.page)}/${formatWhole(player.crafting_table.maxPage)}页`
                return d
            },
            canClick() {return false},
            style() {
                return {
                    'min-height':'50px',
                    'width':'150px',
                    'font-size':'20px',
                    'background-color':'#b8945e',
                }
            },
        },
        1013: {
            display() {
                let d = `>`
                return d
            },
            canClick() {return player.crafting_table.page < player.crafting_table.maxPage},
            onClick() {
                player.crafting_table.page += 1
            },
            style() {
                return {
                    'min-height':'50px',
                    'width':'50px',
                    'font-size':'20px'
                }
            },
        },
    },
  
    bars: {
        craft: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {
                let comp = craftingItemComp(craftingItemID())
                if (!isCraftingItem()) comp = d(0)
                return `进度: ${format(player.crafting_table.progress)}/${format(comp)}`
            },
            progress() {
                let comp = craftingItemComp(craftingItemID())
                let p = player.crafting_table.progress.div(comp) 
                if (!isCraftingItem()) p = d(0)
                return p
                },
            unlocked() {return tmp.crafting_table.layerShown},
            fillStyle() {return {"background-color":craftingItemColor(craftingItemID())}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
        },
    },

    update() {
        if (isCraftingItem()) player.crafting_table.progress = player.crafting_table.progress.add(player.crafting_table.speed.div(tick))
        if (player.crafting_table.progress.gte(craftingItemComp(craftingItemID()))) getCraftingItem(craftingItemID()),
        stopCrafting()

        //合成台合成速度
        let speed = d(2)
        if (hasCraftingItem(31)) speed = speed.times(5)
        player[ct].speed = speed
        
        //更新最大页码
        if (tmp[ct].clickables[31].unlocked) player[ct].maxPage = 2
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "main-display",
        ["row", ["prestige-button", "blank", ["display-text", () => `你同时最多拥有 ${formatWhole(player.crafting_table.best)} 合成台`]]],
        "blank",     
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "合成": {
                unlocked() {return tmp.crafting_table.layerShown},
                content: [
                    ["blank", "15px"],
                    ["raw-html", () => `<h4 style="opacity:.5">不是，哥们！这不就是工作台吗？`],
                    "blank",
                    ["display-text", function() { 
                        let d = `你正在合成 ${craftingItemName(craftingItemID())}`
                        if (!isCraftingItem()) d = `你当前不在合成`
                        return d
                     }],
                    "blank",
                    ["row",[["bar", "craft"], ["clickables", [100]]]],
                    "blank",
                    ["clickables", [101]],
                    "blank",
                    ["clickables", function() {return [player.crafting_table.page*2-1, player.crafting_table.page*2]}],
                    ["display-text", function() { return `合成速度：${format(player.crafting_table.speed)}/秒` }],
                    "blank",
                    ["display-text", function() { return `一般情况下，合成道具时只会消耗材料，不会消耗工具` }],
                    ["display-text", function() { return `而特殊情况下会进行额外标注` }],
                    ["display-text", function() { return `对于已拥有的道具，对应的合成按钮会附上星标` }],
                    ["display-text", function() { return `注意：取消合成不会返还已消耗的材料，并且会丢失合成进度！` }],
                ]
            },
            "图纸": {
                unlocked() {return hasNormalAchievement(22)},
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ],
            },
            "里程碑": {
                unlocked() {return tmp.crafting_table.layerShown},
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
        },
    },
})