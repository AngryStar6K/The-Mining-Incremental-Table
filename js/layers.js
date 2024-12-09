const ENMSI = ExpantaNum(Number.MAX_SAFE_INTEGER)
const ExpantaNumInfinity = ExpantaNum(Number.MAX_VALUE)

const tick = ExpantaNum(20)

function d(EN) {
    return ExpantaNum(EN)
}

function f(num, precision) {
    return format(num, precision)
}

function fw(num) {
    return formatWhole(num)
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

function EN_compare(num) {
    num = ExpantaNum(num)
    if (num.gte(0) && num.lt(1)) return format(num)
    if (num.gte(1) && num.lt("1e3003")) return `Googol<sup>${format(num.log10().div(100), 4)}</sup>`
    if (num.gte("1e3003") && num.lt("1e3000003")) return `Millillion<sup>${format(num.log10().div(3003), 4)}</sup>`
    if (num.gte("1e3000003") && num.lt("e1e10")) return `Micrillion<sup>${format(num.log10().div(3000003), 4)}</sup>`
    if (num.gte("e1e10") && num.lt("e1e100")) return `Trialogue<sup>${format(num.log10().div(1e10), 3)}</sup>`
    if (num.gte("e1e100") && num.lt("e3e3000")) return `Googolplex<sup>${format(num.log10().div(1e100), 3)}</sup>`
    if (num.gte("e3e3000") && num.lt("e3e3000000")) return `Killillion<sup>${format(num.log10().div("3e3000"), 3)}</sup>`
    if (num.gte("e3e3000000") && num.lt("ee1e10")) return `Megillion<sup>${format(num.log10().div("3e3000000"), 3)}</sup>`
    if (num.gte("ee1e10") && num.lt("ee1e100")) return `Tetralogue<sup>10<sup>${format(num.log10().log10().div("1e10"), 3)}</sup></sup>`
    if (num.gte("ee1e100") && num.lt("eee1e10")) return `Googolduplex<sup>10<sup>${format(num.log10().log10().div("1e100"), 3)}</sup></sup>`
    if (num.gte("eee1e10") && num.lt("10^^6")) return `Pentalogue<sup>10<sup>10<sup>${format(num.log10().log10().log10().div("1e10"), 3)}</sup></sup></sup>`
    if (num.gte("10^^6") && num.lt("10^^10")) return `Hexalogue<sup>10<sup>10<sup>10<sup>${format(num.log10().log10().log10().log10().div("1e10"), 3)}</sup></sup></sup></sup>`
    if (num.gte("10^^10") && num.lt("10^^100")) return `Decker^^${format(num.slog(10).div(10), 4)}`
    if (num.gte("10^^100") && num.lt("10^^1e10")) return `Giggol^^${format(num.slog(10).div(100), 4)}`
    if (num.gte("10^^1e10") && num.lt("10^^1e100")) return `Dialogialogue^^${format(num.slog(10).div(1e10), 3)}`
    if (num.gte("10^^1e100") && num.lt("10^^e1e10")) return `Googologue^^${format(num.slog(10).div(1e100), 3)}`
    if (num.gte("10^^e1e10") && num.lt("10^^ee1e10")) return `Trialogialogue^^10^${format(num.slog(10).log(10).div(1e10), 3)}`
    if (num.gte("10^^ee1e10") && num.lt("10^^10^^10")) return `Tetralogialogue^^10^10^${format(num.slog(10).log10().log10().div(1e10), 3)}`
    if (num.gte("10^^10^^10") && num.lt("10^^10^^10^^10")) return `Tria-taxis^^10^^${format(num.slog(10).slog(10).div(10), 4)}`
    if (num.gte("10^^10^^10^^10") && num.lt("10^^^5")) return `Tetra-taxis^^10^^10^^${format(num.slog(10).slog(10).slog(10).div(10), 4)}`
    if (num.gte("10^^10^^10^^10") && num.lt("10^^^10")) return `Penta-taxis^^10^^10^^10^^${format(num.slog(10).slog(10).slog(10).slog(10).div(10), 4)}`
    if (num.gte("10^^^10") && num.lt("10^^^100")) return `Deka-taxis^^^${format(d(polarize(num.array).bottom).log10().add(d(polarize(num.array).top)).div(10), 4)}`
    if (num.gte("10^^^100") && num.lt("10^^^10^^^10")) { 
        if (num.lt(d(10).pentate(ENMSI))) return `Gaggol^^^${format(d(polarize(num.array).bottom).log10().add(d(polarize(num.array).top)).div(100), 4)}`
        let pentlog = num
        if (num.array.length == 3 && num.gte(d(10).pentate(ENMSI))) pentlog.array = [num.array[0], num.array[1]]
        if (num.array.length == 4) pentlog.array = [num.array[0], num.array[1], num.array[2]]
        return `Gaggol^^^${format(pentlog.div(100), 4)}`
    }
    if (num.gte("10^^^10^^^10") && num.lt("10^^^^10")) {     
        if (num.lt(d(10).pentate(d(10).pentate(ENMSI)))) {
            let pentlog = num
            if (num.array.length == 3) pentlog.array = [pentlog.array[0], pentlog.array[1]]
            if (num.array.length == 4) pentlog.array = [pentlog.array[0], pentlog.array[1], pentlog.array[2]];
            return `Tria-petaxis^^^10^^^${format(d(polarize(pentlog.array).bottom).log10().add(d(polarize(pentlog.array).top)).div(10), 4)}`
        }
        if (num.lt(d(10).pentate(d(10).pentate(d(10).pentate(ENMSI))))) {
            let pentlog = num
            if (num.array.length == 3) pentlog.array = [pentlog.array[0], pentlog.array[1]]
            if (num.array.length == 4) pentlog.array = [pentlog.array[0], pentlog.array[1], pentlog.array[2]];
            return `Tria-petaxis^^^10^^^${format(pentlog.div(100), 4)}`
        }
        if (num.lt(d("10^^^^10"))) {
            let pentlog = num
            if (num.array.length == 3) pentlog.array[2][1]-=2
            if (num.array.length == 4) pentlog.array[3][1]-=2;
            return `Tria-petaxis^^^10^^^${format(pentlog.div(100), 4)}`
        }
    }
    if (num.gte("10^^^^10") && num.lt("10{10}10")) {
        if (num.lt("10^^^^9e15")) {
            return `Deka-petaxis^^^^${format(d(polarize(num.array).bottom).log10().add(d(polarize(num.array).top)).div(10), 4)}`
        }
        let pol = polarize(num.array, true)
        let Jx = d(pol.height).add(d(pol.bottom).log10().add(d(pol.top).sub(1)).logBase(9))
        if (num.lt("10{5}10")) {
            return `{10, 10, ${format(Jx, 5)}} (Deka-exaxis>x>Deka-petaxis)`
        }
        if (num.lt("10{6}10")) {
            return `{10, 10, ${format(Jx, 5)}} (Deka-eptaxis>x>Deka-exaxis)`
        }
        if (num.lt("10{7}10")) {
            return `{10, 10, ${format(Jx, 5)}} (Deka-octaxis>x>Deka-eptaxis)`
        }
        if (num.lt("10{8}10")) {
            return `{10, 10, ${format(Jx, 5)}} (Deka-ennaxis>x>Deka-octaxis)`
        }
        if (num.lt("10{9}10")) {
            return `{10, 10, ${format(Jx, 5)}} (Deka-dekaxis>x>Deka-ennaxis)`
        }
        if (num.lt("10{10}10")) {
            return `{10, 10, ${format(Jx, 5)}} (Tridecal>x>Deka-dekaxis)`
        }
    }
    if (num.gte("10{10}10") && num.lt("10{100}10")) {
        let pol = polarize(num.array, true)
        let Jx = d(pol.height).add(d(pol.bottom).log10().add(d(pol.top).sub(1)).logBase(9))
        return `Tridecal↑<sup>ω</sup>${format(Jx.div(10), 5)}`
    }
    if (num.gte("10{100}10") && num.lt(ExpantaNum.GRAHAMS_NUMBER)) {
        if (num.lt("10{9007199254740991}10")) {
            let pol = polarize(num.array, true)
            let Jx = d(pol.height).add(d(pol.bottom).log10().add(d(pol.top).sub(1)).logBase(9))
            return `Boogol↑<sup>ω</sup>${format(Jx.div(100), 5)}`
        }
        if (num.lt(ExpantaNum.GRAHAMS_NUMBER)) {
            let expand = num
            expand.layer = num.layer-1
            return `Boogol↑<sup>ω</sup>${format(expand.div(100), 4)}`
        }
    }
    if (num.gte(ExpantaNum.GRAHAMS_NUMBER)) {
        let pol = polarize(num.array, true)
        let Jx = d(pol.height).add(d(pol.bottom).log10().add(d(pol.top).sub(1)).logBase(9))
        let Kx = Jx.log10().add(d(num.layer+1))
        return `Graham's Number{{1}}${format(Kx.div(64.49189761102771),5)}`
    }
    //...
}

//杂项层1：统计
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
            "xp": {
                unlocked() {return true},
                name() {return '经验'},
                content: [
                    ["blank", "15px"],
                    ["display-text", function() {return `你有${textStyle_h3(format(player.points), 'ffffff')}经验`}], 
                    ["display-text", function() {return `等级${textStyle_h3(formatWhole(player.level), 'ffffff')}`}],
                    ["display-text", function() {return `等级${textStyle_h3(formatWhole(player.level.add(1)), 'ffffff')}需要${textStyle_h3(format(nextLevelReq()), 'ffffff')}经验`}],
                    "blank",
                    "blank",                     
                    "blank",
                    "blank",
                    "blank",
                    ["display-text", function() {return `你的经验相当于${textStyle_h3(EN_compare(player.points), 'ffffff')}`}], 
                ]
            },
            "world1": {
                unlocked() {return true},
                name() {return '世界1'},
                content: [
                    ["blank", "15px"],
                    ["microtabs", "world1"],                 
                ]
            },
            "craft": {
                unlocked() {return hasNormalAchievement(12)},
                name() {return '制造'},
                content: [
                    ["blank", "15px"],
                    ["microtabs", "craft"],                 
                ]
            },
            "energy": {
                unlocked() {return hasNormalAchievement(33)},
                name() {return '能源'},
                content: [
                    ["blank", "15px"],
                    ["microtabs", "energy"],                 
                ]
            },
        },
        world1: {
            "wood": {
                unlocked() {return tmp.wood.layerShown},
                name() {return '木头'},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.wood.layerShown) return `你有${textStyle_h3(formatWhole(player.wood.points), 'b8945e')}木头`}],  
                    "blank",
                    ["display-text", function() {if (hasUpgrade(wood, 23)) return `你有${textStyle_h3(formatWhole(player.wood.oak), 'b8945e')}橡木原木`}],
                    ["display-text", function() {if (hasUpgrade(wood, 31)) return `你有${textStyle_h3(formatWhole(player.wood.spruce), '826038')}云杉原木`}],              
                    ["display-text", function() {if (hasMilestone(wood, 2)) return `你有${textStyle_h3(formatWhole(player.wood.birch), 'ceb77c')}白桦原木`}],  
                    ["display-text", function() {if (hasUpgrade(bronze, 23)) return `你有${textStyle_h3(formatWhole(player.wood.jungle), '9f844d')}丛林原木`}],
                    ["display-text", function() {if (hasCraftingItem(152)) return `你有${textStyle_h3(formatWhole(player.wood.acacia), 'ba5d3b')}金合欢原木`}],
                ],
                buttonStyle() {
                    return {
                        'background-color':'#b8945e'
                    }
                },
            },
            "stone": {
                unlocked() {return tmp.stone.layerShown},
                name() {return '石头'},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.stone.layerShown) return `你有${textStyle_h3(formatWhole(player.stone.points), '4a4a4a')}石头`}],  
                    "blank", 
                    ["display-text", function() {if (hasUpgrade(stone, 23)) return `你有${textStyle_h3(formatWhole(player.stone.dirt), '5f452f')}泥土`}],           
                    ["display-text", function() {if (hasUpgrade(stone, 23) && hasMilestone(stone, 0)) return `你有${textStyle_h3(formatWhole(player.stone.sand), 'd6cf97')}沙子`}],           
                    ["display-text", function() {if (hasUpgrade(stone, 35) && hasUpgrade(stone, 23)) return `你有 ${textStyle_h3(formatWhole(player.stone.coal), '2e2e2e', 'ffffff')} 煤炭`}],
                    "blank",
                    ["display-text", function() {if (hasNormalAchievement(63)) return `你有${textStyle_h3(fw(player.stone.singularity), '4a4a4a')}石头奇点`}],
                ],
                buttonStyle() {
                    return {
                        'background-color':'#4a4a4a'
                    }
                },
            },
            "copper": {
                unlocked() {return tmp.copper.layerShown},
                name() {return '铜'},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.copper.layerShown) return `你有${textStyle_h3(formatWhole(player.copper.ore), 'ffb41d')}铜矿石`}],  
                    ["display-text", function() {if (tmp.copper.layerShown) return `你有${textStyle_h3(formatWhole(player.copper.points), 'ffb41d')}铜锭`}],  
                    "blank",          
                ],
                buttonStyle() {
                    return {
                        'background-color':'#ffb41d'
                    }
                },
            },
            "tin": {
                unlocked() {return tmp.tin.layerShown},
                name() {return '锡'},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.tin.layerShown) return `你有${textStyle_h3(formatWhole(player.tin.ore), 'c4dce1')}锡矿石`}],  
                    ["display-text", function() {if (tmp.tin.layerShown) return `你有${textStyle_h3(formatWhole(player.tin.points), 'c4dce1')}锡锭`}],  
                    "blank",          
                ],
                buttonStyle() {
                    return {
                        'background-color':'#c4dce1'
                    }
                },
            },
            "bronze": {
                unlocked() {return tmp.bronze.layerShown},
                name() {return '青铜'},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.bronze.layerShown) return `你有${textStyle_h3(formatWhole(player.bronze.points), 'ffd7a1')}青铜锭`}],  
                    "blank",  
                    ["display-text", function() {if (hasCraftingItem(92)) return `你有${textStyle_h3(format(player.bronze.power), 'ffd7a1')}青铜力量`}],        
                ],
                buttonStyle() {
                    return {
                        'background-color':'#ffd7a1'
                    }
                },
            },
            "iron": {
                unlocked() {return tmp.iron.layerShown},
                name() {return '铁'},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.iron.layerShown) return `你有${textStyle_h3(formatWhole(player.iron.ore), 'd8d8d8')}铁矿石`}],  
                    ["display-text", function() {if (tmp.iron.layerShown) return `你有${textStyle_h3(formatWhole(player.iron.points), 'd8d8d8')}铁锭`}],  
                    "blank",      
                    ["display-text", function() {return `你有${textStyle_h3(formatWhole(player.iron.water)+" mB", '2b3cf4')}水`}],
                    ["display-text", function() {return `你有${textStyle_h3(formatWhole(player.iron.lava)+" mB", 'd76013')}熔岩`}],    
                ],
                buttonStyle() {
                    return {
                        'background-color':'#d8d8d8',
                        'color':'#5e5e5e'
                    }
                },
            },
            "nickel": {
                unlocked() {return tmp.nickel.layerShown},
                name() {return '镍'},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.nickel.layerShown) return `你有${textStyle_h3(formatWhole(player.nickel.ore), 'fffcc0')}镍矿石`}],  
                    ["display-text", function() {if (tmp.nickel.layerShown) return `你有${textStyle_h3(formatWhole(player.nickel.points), 'fffcc0')}镍锭`}],  
                    "blank",          
                ],
                buttonStyle() {
                    return {
                        'background-color':'#fffcc0',
                        'color':'#8b8566'
                    }
                },
            },
            "aluminum": {
                unlocked() {return tmp.aluminum.layerShown},
                name() {return '铝'},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.aluminum.layerShown) return `你有${textStyle_h3(formatWhole(player.aluminum.ore), 'e2e3ee')}铝矿石`}],  
                    ["display-text", function() {if (tmp.aluminum.layerShown) return `你有${textStyle_h3(formatWhole(player.aluminum.points), 'e2e3ee')}铝锭`}],  
                    "blank",          
                ],
                buttonStyle() {
                    return {
                        'background-color':'#e2e3ee',
                        'color':'#8b8566'
                    }
                },
            },
            "lead": {
                unlocked() {return tmp.lead.layerShown},
                name() {return '铅'},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.lead.layerShown) return `你有${textStyle_h3(formatWhole(player.lead.ore), '97a9e0')}铅矿石`}],  
                    ["display-text", function() {if (tmp.lead.layerShown) return `你有${textStyle_h3(formatWhole(player.lead.points), '97a9e0')}铅锭`}],  
                    "blank",          
                ],
                buttonStyle() {
                    return {
                        'background-color':'#97a9e0',
                        'color':'#8b8566'
                    }
                },
            },
            "more1": {
                unlocked() {return tmp.lead.layerShown},
                name() {return '更多'},
                content: [
                    ["blank", "15px"], 
                    ["microtabs", "world1more1"],        
                ],
            },
        },
        world1more1: {
            "silver": {
                unlocked() {return false /*tmp.silver.layerShown*/},
                name() {return '银'},
                buttonStyle() {
                    return {
                        'background-color':'#97a9e0',
                        'color':'#8b8566'
                    }
                },
            }
        },
        craft: {
            "crafting_table": {
                unlocked() {return tmp.crafting_table.layerShown},
                name() {return '合成台'},
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
            "furnace": {
                unlocked() {return tmp.furnace.layerShown},
                name() {return '熔炉'},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.furnace.layerShown) return `你有${textStyle_h3(formatWhole(player.furnace.points), '4a4a4a')}熔炉`}],  
                    "blank",
                    ["display-text", function() {if (hasUpgrade(furnace, 11)) return `你有${textStyle_h3(formatWhole(player.furnace.glass), 'a2cfd6')}玻璃`}],  
                    ["display-text", function() {if (hasUpgrade(furnace, 13)) return `你有 ${textStyle_h3(formatWhole(player.furnace.charcoal), '2b261d', 'ffffff')} 木炭`}], 
                ],
                buttonStyle() {
                    return {
                        'background-color':'#4a4a4a'
                    }
                },
            },
            "alloy_s": {
                unlocked() {return tmp.alloy_s.layerShown},
                name() {return '合金炉'},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.alloy_s.layerShown) return `你有${textStyle_h3(formatWhole(player.alloy_s.points), '40464d')}合金炉`}],  
                    "blank",
                ],
                buttonStyle() {
                    return {
                        'background-color':'#40464d'
                    }
                },
            },
        },
        energy: {
            "rf": {
                unlocked() {return tmp.rf.layerShown},
                name() {return '红石通量'},
                content: [
                    ["blank", "15px"], 
                    ["display-text", function() {if (tmp.rf.layerShown) return `你有${textStyle_h3(formatWhole(player.rf.points), 'fc0000')}RF`}],  
                    "blank",
                ],
                buttonStyle() {
                    return {
                        'background-color':'#fc0000'
                    }
                },
            },
        },
    },

})

function hasNormalAchievement(id) {
    return hasAchievement('achievements', id)
}


//杂项层2：成就
addLayer("achievements", {
    name: "achievements",
    position: -2,
    row: 1,
    symbol() {return  '成就'},// Set true to generate a slightly different layer
    // Change layer button' style
    startData() { return {
        unlocked: true,
        points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
        secret: d(0),
        normal: [],
    }},
    resource: "成就点数",
    color: "#ffe125",
    type: "none",
    tooltip(){return false},
    layerShown(){return true},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	
    doReset() {return undefined},

    update() {
        if (!(!player.news || player.tab == 'info-tab' || player.tab == 'changelog-tab' || player.tab == 'options-tab'))nil = newsText.innerText.length
        if (isNaN(l)) l = 0
    },

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
        25: {
            name: "高温熔炼",
            tooltip: "解锁熔炉 <br> 奖励：12成就点数",
            done() {return hasUpgrade(ct, 12)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(12)
            },
        },
        26: {
            name: "取其精华",
            tooltip: "获得1铜锭 <br> 奖励：14成就点数",
            done() {return player.copper.points.gte(1)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(14)
            },
        },
        27: {
            name: "获得升级^2",
            tooltip: "合成铜镐 <br> 奖励：20成就点数",
            done() {return hasCraftingItem(41)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(20)
            },
        },
        31: {
            name: "SiO<sub>2</sub>",
            tooltip: "熔炼得到1玻璃 <br> 奖励：30成就点数",
            done() {return player.furnace.glass.gte(1)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(30)
            },
        },
        32: {
            name: "不用再像无头苍蝇一样乱找了！",
            tooltip: "合成铜制探矿杖 <br> 奖励：40成就点数",
            done() {return hasCraftingItem(42)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(40)
            },
        },
        33: {
            name: "开始发电！",
            tooltip: "解锁红石通量<br> 奖励：90成就点数",
            done() {return hasCraftingItem(61)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(90)
            },
        },
        34: {
            name: "Sn",
            tooltip: "解锁锡层级 <br> 奖励：160成就点数",
            done() {return hasUpgrade(copper, 25)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(160)
            },
        },
        35: {
            name: "Googol",
            tooltip: "获得1.0000e100经验 <br> 奖励：320成就点数",
            done() {return player.points.gte(1e100)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(320)
            },
        },
        36: {
            name: "N合一",
            tooltip: "解锁合金炉 <br> 奖励：600成就点数",
            done() {return hasUpgrade(tin, 15)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(600)
            },
        },
        37: {
            name: "初级合金",
            tooltip: "解锁青铜 <br> 奖励：1,280成就点数<br>解锁石头层级前3种资源获取自动化，允许你通过RF升级倍增RF获取",
            done() {return hasUpgrade(alloy_s, 11)},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1280)
            },
        },
        41: {
            name: "储能的用处",
            tooltip: "使得RF净增长为负数 <br> 奖励：2,025成就点数<br>解锁青铜升级",
            done() {return tmp.rf.netGrowth.lt(0) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(2025)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        42: {
            name: "GTNH?",
            tooltip: "制作青铜外壳 <br> 奖励：5,000成就点数<br>解锁青铜升级",
            done() {return hasCraftingItem(91) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(2000)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        43: {
            name: "这才是增量游戏独有的东西",
            tooltip: "获得1青铜力量 <br> 奖励：25,000成就点数<br>解锁青铜升级",
            done() {return player.bronze.power.gte(1) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(25000)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        44: {
            name: "增量特有的爆炸性增长",
            tooltip: "获得1.1111e111青铜力量 <br> 奖励：67,000成就点数",
            done() {return player.bronze.power.gte(1.1111e111) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(67000)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        45: {
            name: "叮铃铃x10",
            tooltip: "到达等级50 <br> 奖励：202,411成就点数",
            done() {return player.level.gte(50) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(202411)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        46: {
            name: "Fe",
            tooltip: "解锁铁层级 <br> 奖励：1,241,317成就点数<br>解锁一个RF强化和自动化",
            done() {return hasUpgrade(bronze, 25) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1241317)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        47: {
            name: "前往无限！",
            tooltip: "获得1.7976e308经验 <br> 奖励：9,402,011成就点数",
            done() {return player.points.gte(d(Number.MAX_VALUE)) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(9402011)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        51: {
            name: "相煎何太急",
            tooltip: "获得1个木炭 <br> 奖励：20,190,628成就点数",
            done() {return player.furnace.charcoal.gte(1) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(20190628)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        52: {
            name: "来硬的",
            tooltip: "获得1个铁锭 <br> 奖励：123,456,789成就点数",
            done() {return player.iron.points.gte(1) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(123456789)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        53: {
            name: "这不是铁镐吗？",
            tooltip: "合成铁镐 <br> 奖励：1,000,000,000成就点数",
            done() {return hasCraftingItem(111) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e9)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        54: {
            name: "比经验还多？",
            tooltip: "获得1.0000e400青铜力量 <br> 奖励：7,777,777,777成就点数",
            done() {return player.bronze.power.gte('1e400') && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(7777777777)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        55: {
            name: "木炭自由！",
            tooltip: "开启木炭熔炼自动化 <br> 奖励：77,777,777,777成就点数",
            done() {return RFAutobuyerActivated(10003) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(77777777777)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        56: {
            name: "热腾腾的",
            tooltip: "用铁桶捞起第一桶熔岩(1000mB) <br> 奖励：1.0000e12成就点数<br>mB就是毫桶(millibucket)，玩整合包玩的",
            done() {return player.iron.lava.gte(1000) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e12)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        57: {
            name: "Ni",
            tooltip: "挖掘获得1个镍矿石 <br> 奖励：1.0000e13成就点数",
            done() {return player.nickel.ore.gte(1) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e13)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        61: {
            name: "机械部件",
            tooltip: "合成1个镍齿轮 <br> 奖励：1.0000e14成就点数",
            done() {return player.crafting_table.items[141].gte(1) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e14)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        62: {
            name: "挑战者",
            tooltip: "完成镍-挑战：力量削弱1次 <br> 奖励：3.0000e15成就点数",
            done() {return player.nickel.challenges[11] >= 1 && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(3e15)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        63: {
            name: "奇点",
            tooltip: "获得1.7976e308石头 <br> 奖励：9.0000e16成就点数<br>解锁凝聚奇点-石头",
            done() {return player.stone.points.gte(Number.MAX_VALUE) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(9e16)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        64: {
            name: "Al",
            tooltip: "获得1铝矿石 <br> 奖励：1.0000e20成就点数",
            done() {return player.aluminum.ore.gte(1) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e20)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        65: {
            name: "不用再来一遍了！……吗？",
            tooltip: "完成10次镍层级挑战 <br> 奖励：1.0000e25成就点数",
            done() {return d(player.nickel.challenges[11]+player.nickel.challenges[12]).gte(10) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e25)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        66: {
            name: "不用再来一遍了！",
            tooltip: "在所有青铜力量强化器总等级不超过50（免费等级不计入）的情况下，获得1.0000e299青铜力量<br> 奖励：1.0000e40成就点数",
            done() {return ((getBuyableAmount(bronze, 11).add(getBuyableAmount(bronze, 12)).add(getBuyableAmount(bronze, 13)).add(getBuyableAmount(bronze, 21)).lte(50)) && player.bronze.power.gte(1e299)) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e40)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        67: {
            name: "比铁斧更轻",
            tooltip: "合成铝斧<br> 奖励：1.0000e50成就点数",
            done() {return hasCraftingItem(152) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e50)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(21)
            },
        },
        71: {
            name: "Millillion",
            tooltip: "获得1.000e3,003经验<br> 奖励：1.0000e60成就点数",
            done() {return player.points.gte('1e3003') && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e60)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        72: {
            name: "Pb",
            tooltip: "获得1铅矿石<br> 奖励：1.0000e70成就点数",
            done() {return player.lead.ore.gte(1) && this.unlocked()},
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e70)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        //隐藏成就
        100011: {
            name: "刷那么多干啥？",
            tooltip: "同时持有超过1000个青铜外壳 <br> 这个游戏真用不到那么多，又不是什么高肝度科技整合包",
            done() {return player.crafting_table.items[91].gte(1000)},
            onComplete() {
                return player.achievements.secret = player.achievements.secret.add(1)
            },
            unlocked() {return hasAchievement('achievements', this.id)},
        }
    },

    effect() {
        let eff = player.achievements.points.max(1)
        if (hasUpgrade(aluminum, 24)) eff = eff.pow(upgradeEffect(aluminum, 24))
        return eff
    },

    effectDescription() {
        if (hasNormalAchievement(13)) return `倍增经验获取 ${textStyle_h2(format(tmp.achievements.effect)+"x", 'ffe125')}`
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
            "normal achievement": {
                unlocked() {return true},
                name() {return '普通成就'},
                content: [
                    ["blank", "15px"],
                    ["display-text", function() { return "成就每次解锁3行，完成1~3行成就解锁4~6行成就，完成1~6行成就解锁7~9行成就，以此类推" }],
                    "blank",
                    ["achievements", [1,2,3,4,5,6,7,8,9,10]],                 
                ]
            },
            "secret achievement": {
                unlocked() {return true},
                name() {return '隐藏成就'},
                content: [
                    ["blank", "15px"],
                    ["display-text", function() { return `你完成了${textStyle_h2(fw(player.achievements.secret),'a080ff')}个隐藏成就` }],
                    "blank",
                    ["achievements", [10001,10002,10003,10004,10005,10006,10007,10008,10009,10010]],                 
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
//世界1 （原型：主世界）材料解锁顺序（暂定）
const wood = "wood" //木头 1
const stone = "stone" //石头 2
const copper = "copper" //铜 3
const tin = "tin" //锡 4
const bronze = "bronze" //青铜 5
const iron = "iron" //铁 6
const nickel = "nickel" //镍 7
const aluminum = "aluminum" //铝 8
const lead = "lead" //铅 9
const constantan = "constantan" //康铜 10
const invar = "invar" //殷钢 11
const alumbrass = "alumbrass" //铝黄铜 12
const zinc = "zinc" //锌 13
const brass = "brass" //黄铜 14
const steel = "steel" //钢 15
const silver = "silver" //银 16
const gold = "gold" //金 17
const electrum = "electrum" //琥珀金 18
const redstone = "redstone" //红石 19
const red_ele = "red_ele" //红石琥珀金 20 → 接下来前往魔法世界
const singularium = "singularium" //信素
const platinum = "platinum" //铂 22
const diamond = "diamond" //钻石 23
const emerald = "emerald" //绿宝石 24
const experience = "experience" //知识精华 25
const obsidian = "obsidian" //黑曜石 26 → 再次到魔法世界
const chromium = "chromium" //铬
const manganese = "manganese" //锰
const mn_steel = "mn_steel" //锰钢
const stainless_steel = "stainless_steel" //不锈钢
const iridium = "iridium" //铱
const osmium = "osmium" //锇
const osmiridium = "osmiridium" //铱锇合金

//世界2 （魔法世界（缝了一些魔法mod））
const manasteel = "manasteel" //魔力钢 21 → 回到主世界
const terrasteel = "terrasteel" //泰拉钢 27
const twillight_g = "twillight_g" //暮光宝石 28 （按理来说看到这个就知道我在以什么为原型）→ 前往暮色森林
const elementium = "elementium" //源质钢 34
const gaiasoul = "gaiasoul" //盖亚魂 36
const elfsteel = "elfsteel" //精灵钢
const orichacos = "orichacos" //奥利哈刚
const star_m = "star_m" //星辉 35
const astral_m = "astral_m" //星辰

//世界3 （暮色森林等冒险世界）
const naga_scale = "naga_scale" //娜迦鳞片 29
const ironwood = "ironwood" //铁树 30
const steeleaf = "steeleaf" //钢叶 31
const knight_metal = "knight_metal" //骑士金属 32
const fiery = "fiery" //炽热金属 33 

//世界4 （原型：下界）
const glowstone = "glowstone" //荧石
const quartz = "quartz" //下界石英
const lumium = "lumium" //流明
const glow_sin = "glow_sin" //荧光信素
const soularium = "soularium" //魂金
const cobalt = "cobalt" //钴
const ardite = "ardite" //阿迪特
const manyullyn = "manyullyn" //玛玉灵
const anc_deb = "anc_deb" //远古残骸
const netherite = "netherite" //下界合金

//世界5 （原型：末地）
const ender_p = "ender_p" //末影珍珠
const enderium = "enderium" //末影
const dark_steel = "dark_steel" //玄钢
const end_steel = "end_steel" //末影钢


//制造
const ct = "crafting_table" //合成台
const furnace = "furnace" //熔炉
const alloy_s = "alloy_s" //合金炉
const mana_p = "mana_p" //魔力池
const astral_ct = "astral_ct" //星辉合成台

//能源
const rf = "rf" //红石通量 Redstone Flux
const mana = "mana" //魔力
const astral_p = "astral_p" //星能
const lp = "lp" //生命源质

//要是你能无聊翻源代码翻到了这里那好家伙，你找到了未来更新的层级名称（计划）(画饼）如果你想要更新，别急，我还有马造2树没更新完呢。我自己也要拿大量时间玩马造，更新频率真很低的。
//此留言写于2024.11.11

//世界1层1：木头
addLayer("wood", { 
    name: "wood", // This is optional, only used in a few places, If absent it just uses the layer id
    symbol: '木头', // This appears on the layer's node. Default is the id with the first letter capitalized
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
        if (hasCraftingItem(32)) m = m.times(20)
        if (hasUpgrade(stone, 32)) m = m.times(buyableEffect(stone, 11))
        if (hasUpgrade(copper, 23)) m = m.times(upgradeEffect(copper, 23))
        if (hasCraftingItem(62)) m = m.times(300)
        if (hasCraftingItem(81)) m = m.times(1241)
        return m
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return d(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},

    doReset(resettingLayer) {
        if (layers[resettingLayer].name == ct && !hasMilestone(furnace, 0)) {
            let kept = ["unlocked", "auto"]
                if(hasMilestone(ct, 0)) {
                kept.push("milestones"),
                kept.push("upgrades")
                }
            layerDataReset(this.layer, kept)
        }
        if (layers[resettingLayer].name == furnace) {
            return undefined
        }
        if (hasMilestone(furnace, 0)) return undefined
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
                if (hasUpgrade(copper, 12)) g = g.times(upgradeEffect(copper, 12))
                if (hasUpgrade(stone, 34)) g = g.times(upgradeEffect(stone, 34))
                if (hasUpgrade(iron, 11)) g = g.times(1e10)
                if (hasMilestone(bronze, 5)) g = g.times(1000000)
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
        2: {
            requirementDescription() {return `木头倍增器等级2`},
            effectDescription() {return `奖励：允许你撸树时获得白桦原木`},
            done() { return getBuyableAmount(stone, 11).gte(2) },
            unlocked() {return hasCraftingItem(41)},
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
        player.wood.spruce = player.wood.spruce.add(tmp.wood.logGain.spruce),
        player.wood.birch = player.wood.birch.add(tmp.wood.logGain.birch),
        player.wood.jungle = player.wood.jungle.add(tmp.wood.logGain.jungle),
        player.wood.acacia = player.wood.acacia.add(tmp.wood.logGain.acacia)

        if (player.wood.points.gt(player.wood.best)) player.wood.best = player.wood.points

        //撸树速度
        let speed = d(2)
        if (hasCraftingItem(11)) speed = speed.times(2.5)
        if (hasCraftingItem(21)) speed = speed.times(3)
        if (hasUpgrade(wood, 34)) speed = speed.times(1.2)
        if (hasCraftingItem(32)) speed = speed.times(3)
        if (hasCraftingItem(102)) speed = speed.times(3)
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
        },
        birch() {
            let eff = player.wood.birch.max(0).add(10).log10().pow(4)
            return eff
        },
        jungle() {
            let eff = player.wood.jungle.max(0).add(10).log10().pow(1.25).sub(1)
            if (hasUpgrade(aluminum, 13)) eff = eff.pow(3)
            return eff
        },
        acacia() {
            let eff = player.wood.acacia.max(0).root(10).times(200)
            return eff
        },
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
        birch() {
            let gain = this.spruce().div(320).root(5).floor()
            if (!hasMilestone(wood, 2)) gain = d(0)
            return gain
        },
        jungle() {
            let gain = this.birch().max(1).div(1860000).logBase(2).add(1).max(0).floor()
            if (hasUpgrade(bronze, 24)) gain = gain.times(upgradeEffect(bronze, 24))
            if (!hasUpgrade(bronze, 23)) gain = d(0)
            if (hasUpgrade(aluminum, 13)) gain = gain.pow(3)
            return gain
        },
        acacia() {
            let gain = this.jungle().max(1).div(1.82e15).root(2).floor()
            if (!hasCraftingItem(152)) gain = d(0)
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
            "wood": {
                unlocked() {return true},
                name() {return '伐木'},
                content: [
                    ["blank", "15px"],
                    ["display-text", function() {if (player.level.lt(1)) return `你需要先到等级1解锁伐木！`}],
                    ["row", [["bar", "woodDestroying"], "blank", "clickables",]],
                    "blank",
                    "blank",
                    ["display-text", function() {if (player.level.gte(1)) return `挖掘速度：${format(player.wood.speed)}/秒`}],
                    ["display-text", function() {if (player.level.gte(1)) return `破坏一次的木头获取数量：${textStyle_h2(formatWhole(tmp.wood.gainMult), 'b8945e')}`}],
                    ["display-text", function() {return `硬度：${formatWhole(hardness(wood))}`}],
                    ["display-text", function() {if (player.level.gte(1)) return `挖掘等级：0`}],
                ]
            },
            "upgrades": {
                unlocked() {return true},
                name() {return '升级'},
                content: [
                    ["blank", "15px"],
                    ["raw-html", () => `<h4 style="opacity:.5">`],
                    ["upgrades", [1,2,3,4,5,6,7,8,9]]
                ]
            },
            "milestones": {
                unlocked() {return true},
                name() {return '里程碑'},
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
            "log": {
                unlocked() {return hasUpgrade(wood, 23)},
                name() {return '原木'},
                content: [
                    ["blank", "15px"],
                    ["display-text", function() {if (hasUpgrade(wood, 23)) return `你有 ${textStyle_h2(formatWhole(player.wood.oak), 'b8945e')} 橡木原木，加成经验获取 ${textStyle_h2(format(tmp.wood.logEffects.oak)+"x", 'b8945e')}`}],
                    ["display-text", function() {if (hasUpgrade(wood, 31)) return `你有 ${textStyle_h2(formatWhole(player.wood.spruce), '826038')} 云杉原木，加成经验获取 ${textStyle_h2(format(tmp.wood.logEffects.spruce)+"x", '826038')}`}],
                    ["display-text", function() {if (hasMilestone(wood, 2)) return `你有 ${textStyle_h2(formatWhole(player.wood.birch), 'ceb77c')} 白桦原木，加成石头获取 ${textStyle_h2(format(tmp.wood.logEffects.birch)+"x", 'ceb77c')}`}],
                    ["display-text", function() {if (hasUpgrade(bronze, 23)) return `你有 ${textStyle_h2(formatWhole(player.wood.jungle), '9f844d')} 丛林原木，令木头倍增器的底数 ${textStyle_h2("+"+format(tmp.wood.logEffects.jungle), '9f844d')}`}],
                    ["display-text", function() {if (hasCraftingItem(152)) return `你有 ${textStyle_h2(formatWhole(player.wood.acacia), 'ba5d3b')} 金合欢原木，令青铜力量强化器MK.2的底数 ${textStyle_h2("+"+format(tmp.wood.logEffects.acacia), 'ba5d3b')}`}],
                    ["row", [["bar", "woodDestroying"], "blank", "clickables",]],
                    "blank",
                    ["display-text", function() {if (player.level.gte(1)) return `挖掘速度：${format(player.wood.speed)}/秒`}],
                    ["display-text", function() {if (player.level.gte(1)) return `破坏一次的木头获取数量：${textStyle_h2(formatWhole(tmp.wood.gainMult), 'b8945e')}`}],
                    ["display-text", function() {if (hasUpgrade(wood, 23)) return `破坏一次木头可额外产出 ${textStyle_h2(formatWhole(tmp.wood.logGain.oak), 'b8945e')} 橡木原木 （基于木头获取，开始于15木头/次）`}],
                    ["display-text", function() {if (hasUpgrade(wood, 31)) return `破坏一次木头可额外产出 ${textStyle_h2(formatWhole(tmp.wood.logGain.spruce), '826038')} 云杉原木 （基于橡木原木获取，开始于105橡木原木/次）`}],
                    ["display-text", function() {if (hasMilestone(wood, 2)) return `破坏一次木头可额外产出 ${textStyle_h2(formatWhole(tmp.wood.logGain.birch), 'ceb77c')} 白桦原木 （基于云杉原木获取，开始于320云杉原木/次）`}],
                    ["display-text", function() {if (hasUpgrade(bronze, 23)) return `破坏一次木头可额外产出 ${textStyle_h2(formatWhole(tmp.wood.logGain.jungle), '9f844d')} 丛林原木 （基于白桦原木获取，开始于1,860,000白桦原木/次）`}],
                    ["display-text", function() {if (hasCraftingItem(152)) return `破坏一次木头可额外产出 ${textStyle_h2(formatWhole(tmp.wood.logGain.acacia), 'ba5d3b')} 金合欢原木 （基于丛林原木获取，开始于1.8200e15丛林原木/次）`}],
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
        singularity: d(0),
        gravel: d(0),
        dirt: d(0),
        sand: d(0),
        coal: d(0),
        marble: d(0),
        netherrack: d(0),
        basalt: d(0),
        aether_stone: d(0),
        abyssal_stone: d(0),
    }},

    color: "#4a4a4a",                       // The color for this layer, which affects many elements.
    resource: "石头",                       // The name of this layer's main prestige resource.
    row: 1,
    position: 1,                                 // The row this layer is on (0 is the first row).
    symbol: '石头', // This appears on the layer's node. Default is the id with the first letter capitalized

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
        if (hasUpgrade(copper, 14)) m = m.times(upgradeEffect(copper, 14))
        if (hasCraftingItem(41)) m = m.times(5)
        if (hasUpgrade(stone, 31)) m = m.times(upgradeEffect(stone, 31))
        if (hasMilestone(wood, 2)) m = m.times(tmp.wood.logEffects.birch)
        if (hasCraftingItem(71)) m = m.times(150)
        if (hasUpgrade(tin, 12)) m = m.times(upgradeEffect(tin, 12))
        if (hasUpgrade(iron, 23)) m = m.times(upgradeEffect(iron, 23))
        if (hasNormalAchievement(63)) m = m.times(buyableEffect(stone, 21))
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    layerShown() { return hasNormalAchievement(16) },          // Returns a bool for if this layer's node should be visible in the tree.

    doReset(resettingLayer) {
        if (layers[resettingLayer].name == ct) {
            return undefined
        }
        if (layers[resettingLayer].name == furnace && !hasMilestone(furnace, 0)) {
            let kept = ["unlocked", "auto"]
                if(hasMilestone(furnace, 0)) {
                kept.push("milestones"),
                kept.push("upgrades")
                }
            layerDataReset(this.layer, kept)
        }
        if (hasMilestone(furnace, 0)) return undefined
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
        31: {
            title: "焦黑石头",
            description: "需求：等级21<br>熔炉加成石头获取",
            cost() {return new ExpantaNum(50000000)},
            canAfford() {return player.level.gte(21)},
            unlocked(){return hasCraftingItem(41)},
            effect() {
                let eff = player.furnace.points.max(0).add(1).pow(0.4)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        32: {
            title: "伐木场",
            description: "解锁一个购买项，加成木头获取",
            cost() {return new ExpantaNum(500000000)},
            unlocked(){return hasCraftingItem(41)},
        },
        33: {
            title: "熔炼配方",
            description: "在熔炉界面中允许你解锁更多熔炼配方",
            cost() {return new ExpantaNum(5e9)},
            unlocked(){return hasCraftingItem(41)},
        },
        34: {
            title: "能源加成",
            description: "RF加成经验获取<br>同时查看合成台里程碑2吧",
            cost() {return new ExpantaNum(12500)},
            unlocked(){return hasCraftingItem(41)},
            currencyInternalName: "points",
            currencyDisplayName: "RF",
            currencyLayer: rf,
            effect() {
                let eff = player.rf.points.max(0).add(1).pow(1.2)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        35: {
            title: "意外收获",
            description: "允许你挖掘石头时获得煤炭<br>同时允许以煤炭作为燃料",
            currencyInternalName: "points",
            currencyDisplayName: "木头",
            currencyLayer: wood,
            cost() {return new ExpantaNum(7.7777e19)},
            unlocked(){return hasCraftingItem(41)},
        },
        // Look in the upgrades docs to see what goes here!
    },

    buyables: {
        11: {
            title: "木头倍增器",
            cost(x) { return d(5).pow(x.max(0).pow(1.5)).times(10000000) },
            free() {
                let f = d(0)
                if (hasCraftingItem(102)) f = f.add(10)
                return f
            },
            display() { 
                let freedis = ""
                if (this.free().gte(1)) freedis = ` + ${formatWhole(this.free())}`
                let display = `加成木头获取<br>
                效果公式：${format(this.effBase())}<sup>x</sup><br>
                等级：${formatWhole(player[this.layer].buyables[this.id])}${freedis}<br>
                当前效果：${format(this.effect())}x<br>
                价格：${format(this.cost())} 石头`
                return display}, 
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buyMax() {return setBuyableAmount(stone, 11, player.stone.points.div(10000000).max(1).logBase(5).root(1.5).floor().add(1))},
            canBuyMax() { return false},
            buy() {
                if (!this.canBuyMax()) player[this.layer].points = player[this.layer].points.sub(this.cost()),
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effBase() {
                let b = d(2)
                if (hasUpgrade(tin, 11)) b = b.times(2)
                if (hasCraftingItem(81)) b = b.times(2)
                if (hasUpgrade(bronze, 23)) b = b.add(tmp.wood.logEffects.jungle)
                return b
                },
            effect(x) {
                let effect = ExpantaNum.pow(this.effBase(), x.add(this.free()).max(0))
                return effect},
            unlocked() {return hasUpgrade(stone, 32)},           
        },
        21: {
            title: "聚合奇点-石头",
            cost(x) { return d(Number.MAX_VALUE).pow(x.max(0).pow(5)).times(Number.MAX_VALUE) },
            display() { 
                let display = `加成石头获取<br>
                效果公式：${format(this.effBase())}<sup>x</sup><br>
                购买数量：${formatWhole(player[this.layer].buyables[this.id])}<br>
                凝聚需求量：${format(this.cost())} 石头`
                return display}, 
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buyMax() {return setBuyableAmount(stone, 12, player.stone.points.div(Number.MAX_VALUE).max(1).logBase(Number.MAX_VALUE).root(5).floor().add(1))},
            canBuyMax() { return false},
            buy() {
                if (!this.canBuyMax()) player[this.layer].points = player[this.layer].points.sub(this.cost()),
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effBase() {
                let b = d(1e20)
                return b
                },
            effect(x) {
                let effect = ExpantaNum.pow(this.effBase(), x.max(0))
                return effect},
            unlocked() {return hasNormalAchievement(63)},           
        },
    },

    milestones: {
        0: {
            requirementDescription() {return `获得1,000,000石头和1,000合成台`},
            effectDescription() {return `奖励：在购买石头升级8后，允许你在破坏石头时获得沙子`},
            done() { return player.stone.points.gte(1000000) && player[ct].points.gte(1000) },
            unlocked() {return true},
        },
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
        },
        sand() {
            let gain = this.dirt().max(0).div(180).root(1.25).floor()
            if (!hasUpgrade(stone, 23) || !hasMilestone(stone, 0)) gain = d(0)
            return gain
        },
        coal() {
            let gain = this.sand().max(0).div(144000000).root(2).floor().times(100)
            if (!hasUpgrade(stone, 35) || !hasUpgrade(stone, 23)) gain = d(0)
            return gain
        },
        gravel() {

        },
        marble() {

        },
    },

    update() {
        if (player.stone.destroying) player.stone.progress = player.stone.progress.add(player.stone.speed.div(tick))
        if (player.stone.progress.gte(hardness(stone))) player.stone.progress = d(0),
        player.stone.destroying = false,
        player.stone.points = player.stone.points.add(tmp.stone.gainMult),
        player.stone.dirt = player.stone.dirt.add(tmp.stone.otherGain.dirt),
        player.stone.sand = player.stone.sand.add(tmp.stone.otherGain.sand),
        player.stone.coal = player.stone.coal.add(tmp.stone.otherGain.coal)

        if (player.stone.points.gt(player.stone.best)) player.stone.best = player.stone.points

        //挖掘速度
        let speed = d(0)
        if (hasCraftingItem(12)) speed = speed.add(2)
        if (hasCraftingItem(22)) speed = speed.times(3)
        if (hasUpgrade(wood, 33)) speed = speed.times(1.2)
        if (hasCraftingItem(41)) speed = speed.times(5)
        if (hasCraftingItem(71)) speed = speed.times(3)
        if (hasCraftingItem(82)) speed = speed.times(5)
        if (hasCraftingItem(111)) speed = speed.times(3)
        player.stone.speed = speed

        //奇点
        player.stone.singularity = player.stone.buyables[21]
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
            "dig": {
                unlocked() {return tmp.stone.layerShown},
                name() {return '挖掘'},
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "stoneDestroying"], "blank", "clickables",]],
                    "blank",
                    ["display-text", function() {return `挖掘速度：${format(player.stone.speed)}/秒`}],
                    ["display-text", function() {return `破坏一次的石头获取数量：${textStyle_h2(formatWhole(tmp.stone.gainMult), '4a4a4a')}`}],
                    ["display-text", function() {return `硬度：${formatWhole(hardness(stone))}`}],
                    ["display-text", function() {return `挖掘等级：0`}],
                    "blank",
                    ["display-text", function() {return `在获取石头之前，你需要一把木镐！`}],
                ]
            },
            "upgrades": {
                unlocked() {return true},
                name() {return '升级'},
                content: [
                    ["blank", "15px"],
                    ["raw-html", () => `<h4 style="opacity:.5">`],
                    ["upgrades", [1,2,3,4,5,6,7,8,9]]
                ]
            },
            "milestones": {
                unlocked() {return true},
                name() {return '里程碑'},
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
            "buyables": {
                unlocked() {return hasUpgrade(stone, 32)},
                name() {return '购买项'},
                content: [
                    ["blank", "15px"],
                    ["buyables",[1]]
                ]
            },
            "more dig": {
                unlocked() {return hasUpgrade(stone, 23)},
                name() {return '更多挖掘'},
                content: [
                    ["blank", "15px"],
                    "blank",
                    ["display-text", function() {if (hasUpgrade(stone, 23)) return `你有 ${textStyle_h2(formatWhole(player.stone.dirt), '5f452f')} 泥土`}],
                    ["display-text", function() {if (hasUpgrade(stone, 23) && hasMilestone(stone, 0)) return `你有 ${textStyle_h2(formatWhole(player.stone.sand), 'd6cf97')} 沙子`}],
                    ["display-text", function() {if (hasUpgrade(stone, 35) && hasUpgrade(stone, 23)) return `你有 ${textStyle_h2(formatWhole(player.stone.coal), '2e2e2e', 'ffffff')} 煤炭`}],
                    ["row", [["bar", "stoneDestroying"], "blank", "clickables",]],
                    "blank",
                    ["display-text", function() {return `挖掘速度：${format(player.stone.speed)}/秒`}],
                    ["display-text", function() {return `破坏一次的石头获取数量：${textStyle_h2(formatWhole(tmp.stone.gainMult), '4a4a4a')}`}],
                    ["display-text", function() {if (hasUpgrade(stone, 23)) return `破坏一次石头可额外产出 ${textStyle_h2(formatWhole(tmp.stone.otherGain.dirt), '5f452f')} 泥土 （基于石头获取，开始于360石头/次）`}],
                    ["display-text", function() {if (hasUpgrade(stone, 23) && hasMilestone(stone, 0)) return `破坏一次石头可额外产出 ${textStyle_h2(formatWhole(tmp.stone.otherGain.sand), 'd6cf97')} 沙子 （基于石头获取，开始于180泥土/次）`}],
                    ["display-text", function() {if (hasUpgrade(stone, 35) && hasUpgrade(stone, 23)) return `破坏一次石头可额外产出 ${textStyle_h2(formatWhole(tmp.stone.otherGain.coal), '2e2e2e', 'ffffff')} 煤炭 （基于沙子获取，开始于144,000,000沙子/次）`}],
                ]
            },
            "singularity": {
                unlocked() {return hasNormalAchievement(63)},
                name() {return '奇点'},
                content: [
                    ["blank", "15px"],
                    ["display-text", function() {if (hasNormalAchievement(63)) return `你有 ${textStyle_h2(fw(player.stone.singularity), '4a4a4a')} 石头奇点，加成石头获取 ${textStyle_h2(fw(buyableEffect(stone, 21))+"x", '4a4a4a')}`}],
                    "blank",
                    ["buyables",[2]]
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
        rarity: d(3),
        progress: d(0),
        findingProgress: d(0),
        hardness: d(75),
        destroying: false,
        finding: false,
        found: false,
        speed: d(1), //找矿速度
    }},

    color: "#ffb41d",                       // The color for this layer, which affects many elements.
    nodeStyle: {
        "background": "linear-gradient(90deg, #ea8601 0%, #ffb53c 100%)",   
    },
    resource: "铜锭",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 2,
    symbol: '铜',

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        m = d(1)                            // 矿物的gainMult是给对应矿石的
        if (hasUpgrade(copper, 13)) m = m.times(3)
        if (hasUpgrade(copper, 15)) m = m.times(2)
        if (hasUpgrade(copper, 21)) m = m.times(upgradeEffect(copper, 21))
        if (hasUpgrade(tin, 14)) m = m.times(upgradeEffect(tin, 14))
        if (hasUpgrade(bronze, 11)) m = m.times(upgradeEffect(bronze, 11))
        if (hasUpgrade(iron, 13)) m = m.times(upgradeEffect(iron, 13))
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
        if (layers[resettingLayer]==furnace) {
            return undefined
        }
        if (hasMilestone(furnace, 0)) return undefined
    },

    upgrades: {
        11: {
            title: "跨越数十亿年",
            description: "5x合成台获取",
            currencyInternalName: "ore",
            currencyDisplayName: "铜矿石",
            currencyLayer: copper,
            cost() {return new ExpantaNum(1)},
            unlocked(){return tmp.copper.layerShown},
        },
        12: {
            title: "铜矿石强化",
            description: "需求：等级15<br>从等级14开始，每升1级，经验获取x10，直到等级24",
            currencyInternalName: "ore",
            currencyDisplayName: "铜矿石",
            currencyLayer: copper,
            cost() {return new ExpantaNum(3)},
            canAfford() {return player.level.gte(15)},
            unlocked(){return tmp.copper.layerShown},
            effect() {
                let lv = player.level
                let eff = ExpantaNum.pow(10, lv.max(14).min(24).sub(14))
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        13: {
            title: "铜矿矿脉",
            description: "3x铜矿石获取",
            currencyInternalName: "ore",
            currencyDisplayName: "铜矿石",
            currencyLayer: copper,
            cost() {return new ExpantaNum(5)},
            unlocked(){return tmp.copper.layerShown},
        },
        14: {
            title: "深板岩",
            description: "需求：等级17<br>等级加成石头获取",
            currencyInternalName: "ore",
            currencyDisplayName: "铜矿石",
            currencyLayer: copper,
            cost() {return new ExpantaNum(12)},
            canAfford() {return player.level.gte(17)},
            unlocked(){return tmp.copper.layerShown},
            effect() {
                let eff = player.level.max(0).times(2).pow(0.8).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        15: {
            title: "深层铜矿石",
            description: "双倍铜矿石获取",
            cost() {return new ExpantaNum(10)},
            unlocked(){return tmp.copper.layerShown},
        },
        21: {
            title: "大型铜矿矿脉",
            description: "等级加成铜矿石获取",
            cost() {return new ExpantaNum(50)},
            unlocked(){return hasMilestone(ct, 1)},
            effect() {
                let eff = player.level.max(0).div(3).floor().add(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        22: {
            title: "更大的熔炉",
            description: "等级加成熔炼铜锭的倍率",
            currencyInternalName: "ore",
            currencyDisplayName: "铜矿石",
            currencyLayer: copper,
            cost() {return new ExpantaNum(500)},
            unlocked(){return hasMilestone(ct, 1)},
            effect() {
                let eff = player.level.max(0).div(6).floor().add(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        23: {
            title: "铜块",
            description: "每有9个铜锭，此升级对木头获取的倍率+1",
            cost() {return new ExpantaNum(360)},
            unlocked(){return hasMilestone(ct, 1)},
            effect() {
                let eff = player.copper.points.max(0).div(9).floor().add(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        24: {
            title: "熔炼工艺",
            description: "等级加成熔炼玻璃的倍率",
            currencyInternalName: "points",
            currencyDisplayName: "木头",
            currencyLayer: wood,
            cost() {return new ExpantaNum(5e12)},
            unlocked(){return hasMilestone(ct, 1)},
            effect() {
                let eff = player.level.max(0).div(6).floor().add(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        25: {
            title: "同级矿石",
            description: "解锁新层级：锡<br>同时允许你前往熔炉配方界面解锁锡锭的熔炼",
            currencyInternalName: "glass",
            currencyDisplayName: "玻璃",
            currencyLayer: furnace,
            cost() {return new ExpantaNum(1333)},
            unlocked(){return hasMilestone(ct, 1)},
        },
        // Look in the upgrades docs to see what goes here!
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "点击寻找"
                return d
                },
            canClick() {return !player.copper.finding && !player.copper.destroying && !player.copper.found},
            onClick() {
                if (!player.copper.finding) player.copper.finding = true
            },
            unlocked() {return tmp.copper.layerShown},
            style() {
                return {
                    'min-height':'50px',
                    'width':'120px',
                    'font-size':'20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "点击挖掘"
                return d
                },
            canClick() {return !player.copper.destroying && player.copper.found},
            onClick() {
                if (!player.copper.destroying) player.copper.destroying = true
            },
            unlocked() {return tmp.copper.layerShown},
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
        copperFinding: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {return `找矿进度: ${format(player.copper.findingProgress)}/${format(rarity(copper))}`},
            progress() { let p = player.copper.findingProgress.div(rarity(copper)); if (player.copper.found) p = d(1); return p },
            unlocked() {return tmp.copper.layerShown},
            fillStyle() {return {"background-color":"#ffb41d"}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
        },
        copperDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {return `进度: ${format(player.copper.progress)}/${format(hardness(copper))}`},
            progress() { return player.copper.progress.div(hardness(copper)) },
            unlocked() {return tmp.copper.layerShown},
            fillStyle() {return {"background-color":"#ffb41d"}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
        },
    },

    update() {
        if (player.copper.finding) player.copper.findingProgress = player.copper.findingProgress.add(player.copper.speed.div(tick))
        if (player.copper.findingProgress.gte(rarity(copper))) player.copper.findingProgress = d(0),
        player.copper.finding = false,
        player.copper.found = true

        if (player.copper.destroying) player.copper.progress = player.copper.progress.add(player.stone.speed.div(tick))
        if (player.copper.progress.gte(hardness(copper))) player.copper.progress = d(0),
        player.copper.found = false,
        player.copper.destroying = false,
        player.copper.ore = player.copper.ore.add(tmp.copper.gainMult)

        if (player.copper.points.gt(player.copper.best)) player.copper.best = player.copper.points

        //寻找速度
        let speed = d(1)
        if (hasCraftingItem(42)) speed = speed.times(3)
        if (hasCraftingItem(131)) speed = speed.times(3)
        player.copper.speed = speed
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
            "dig": {
                unlocked() {return tmp.copper.layerShown},
                name() {return '挖掘'},
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "copperFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "copperDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function() {return player.copper.found ? `你找到了一处铜矿石`:`你尚未找到铜矿石`}],
                    "blank",
                    ["display-text", function() {return `挖掘速度：${format(player.stone.speed)}/秒`}],
                    ["display-text", function() {return `找矿速度：${format(player.copper.speed)}/秒`}],
                    ["display-text", function() {return `破坏一次的铜矿石获取数量：${textStyle_h2(formatWhole(tmp.copper.gainMult), 'ffb41e')}`}],
                    ["display-text", function() {return `稀有度：${formatWhole(rarity(copper))}`}],
                    ["display-text", function() {return `硬度：${formatWhole(hardness(copper))}`}],
                    ["display-text", function() {return `挖掘等级：1`}],
                    "blank",
                    ["display-text", function() {return `对于矿石，你需要先找到才能挖掘！`}],
                ]
            },
            "upgrades": {
                unlocked() {return tmp.copper.layerShown},
                name() {return '升级'},
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
        },
    },
    
})

//世界1层4：锡
addLayer("tin", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: d(0),             // "points" is the internal name for the main resource of the layer.
        ore: d(0),
        molten: d(0),
        miningLevel: d(1),
        rarity: d(6),
        progress: d(0),
        findingProgress: d(0),
        hardness: d(90),
        destroying: false,
        finding: false,
        found: false,
    }},

    color: "#c4dce1",                       // The color for this layer, which affects many elements.
    nodeStyle: {"background": "linear-gradient(90deg, #c4dce1 0%, #d3e4e4 100%)"},
    resource: "锡锭",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 3,
    symbol: '锡',

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        m = d(1)                            // 矿物的gainMult是给对应矿石的
        if (hasUpgrade(tin, 13)) m = m.times(upgradeEffect(tin, 13))
        if (hasUpgrade(bronze, 12)) m = m.times(upgradeEffect(bronze, 12))
        if (hasCraftingItem(92)) m = m.times(tmp.bronze.bronzePower.effect)
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    layerShown() { return hasNormalAchievement(34) },          // Returns a bool for if this layer's node should be visible in the tree.

    doReset(resettingLayer) {
        return undefined
    },

    upgrades: {
        11: {
            title: "倍增强化",
            description: "木头倍增器的基数x2",
            cost() {return new ExpantaNum(6)},
            unlocked(){return hasCraftingItem(71)},
        },
        12: {
            title: "资源绑定",
            description: "铜锭加成石头获取",
            cost() {return new ExpantaNum(7)},
            unlocked(){return hasCraftingItem(71)},
            effect() {
                let eff = player.copper.points.max(1).pow(0.75)
                if (hasCraftingItem(82)) eff = eff.pow(2)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        13: {
            title: "锡矿脉",
            description: "等级加成锡矿石获取",
            cost() {return new ExpantaNum(8)},
            unlocked(){return hasCraftingItem(71)},
            effect() {
                let eff = player.level.max(0).div(5).floor().add(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        14: {
            title: "铜矿石加速",
            description: "锡锭加成铜矿石获取以及铜锭熔炼倍率",
            cost() {return new ExpantaNum(24)},
            unlocked(){return hasCraftingItem(71)},
            effect() {
                let eff = player.tin.points.max(1).pow(0.77).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        15: {
            title: "二合一",
            description: "解锁合金炉（制造区域层级，无重置）",
            cost() {return new ExpantaNum(50)},
            unlocked(){return hasCraftingItem(71)},
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "点击寻找"
                return d
                },
            canClick() {return !player.tin.finding && !player.tin.destroying && !player.tin.found},
            onClick() {
                if (!player.tin.finding) player.tin.finding = true
            },
            unlocked() {return tmp.tin.layerShown},
            style() {
                return {
                    'min-height':'50px',
                    'width':'120px',
                    'font-size':'20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "点击挖掘"
                return d
                },
            canClick() {return !player.tin.destroying && player.tin.found},
            onClick() {
                if (!player.tin.destroying) player.tin.destroying = true
            },
            unlocked() {return tmp.tin.layerShown},
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
        tinFinding: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {return `找矿进度: ${format(player.tin.findingProgress)}/${format(rarity(tin))}`},
            progress() { let p = player.tin.findingProgress.div(rarity(tin)); if (player.tin.found) p = d(1); return p },
            unlocked() {return tmp.tin.layerShown},
            fillStyle() {return {"background-color":"#c4dce1"}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
            textStyle() {return {"color":"#647a8e"}},
        },
        tinDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {return `进度: ${format(player.tin.progress)}/${format(hardness(tin))}`},
            progress() { return player.tin.progress.div(hardness(tin)) },
            unlocked() {return tmp.tin.layerShown},
            fillStyle() {return {"background-color":"#c4dce1"}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
            textStyle() {return {"color":"#647a8e"}},
        },
    },

    update() {
        if (player.tin.finding) player.tin.findingProgress = player.tin.findingProgress.add(player.copper.speed.div(tick))
        if (player.tin.findingProgress.gte(rarity(tin))) player.tin.findingProgress = d(0),
        player.tin.finding = false,
        player.tin.found = true

        if (player.tin.destroying) player.tin.progress = player.tin.progress.add(player.stone.speed.div(tick))
        if (player.tin.progress.gte(hardness(tin))) player.tin.progress = d(0),
        player.tin.found = false,
        player.tin.destroying = false,
        player.tin.ore = player.tin.ore.add(tmp.tin.gainMult)

        if (player.tin.points.gt(player.tin.best)) player.tin.best = player.tin.points
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        ["display-text", () => `你有 ${textStyle_h2(formatWhole(player.tin.ore), 'c4dce1')} 锡矿石`],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.tin.best)} 锡锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "dig": {
                unlocked() {return tmp.tin.layerShown},
                name() {return '挖掘'},
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "tinFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "tinDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function() {return player.tin.found ? `你找到了一处锡矿石`:`你尚未找到锡矿石`}],
                    "blank",
                    ["display-text", function() {return `挖掘速度：${format(player.stone.speed)}/秒`}],
                    ["display-text", function() {return `找矿速度：${format(player.copper.speed)}/秒`}],
                    ["display-text", function() {return `破坏一次的锡矿石获取数量：${textStyle_h2(formatWhole(tmp.tin.gainMult), 'c4dce1')}`}],
                    ["display-text", function() {return `稀有度：${formatWhole(rarity(tin))}`}],
                    ["display-text", function() {return `硬度：${formatWhole(hardness(tin))}`}],
                    ["display-text", function() {return `挖掘等级：1`}],
                    "blank",
                    ["display-text", function() {return `对于矿石，你需要先找到才能挖掘！`}],
                ]
            },
            "upgrades": {
                unlocked() {return tmp.tin.layerShown},
                name() {return '升级'},
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
        },
    },
    
})

//世界1层5：青铜

addLayer("bronze", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: d(0),             // "points" is the internal name for the main resource of the layer.
        ore: d(0),
        molten: d(0),
        power: d(0),
    }},

    color: "#ffd7a1",                       // The color for this layer, which affects many elements.
    nodeStyle: {"background": "linear-gradient(90deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
    },
    resource: "青铜锭",            // The name of this layer's main prestige resource.
    symbol: "青铜",
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 4,
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    layerShown() {return hasNormalAchievement(37)},

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        m = d(1)                            // 合金的gainMult是给对应合金倍率的？
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    doReset() {
        return undefined
    },

    upgrades: {
        11: {
            title: "青铜原材料强化I",
            description: "青铜锭加成铜矿石获取",
            cost() {return new ExpantaNum(45)},
            unlocked(){return hasNormalAchievement(41)},
            effect() {
                let eff = player.bronze.points.max(1).pow(0.55).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        12: {
            title: "青铜原材料强化II",
            description: "青铜锭加成锡矿石获取",
            cost() {return new ExpantaNum(90)},
            unlocked(){return hasNormalAchievement(41)},
            effect() {
                let eff = player.bronze.points.max(1).pow(0.45).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        13: {
            title: "青铜原材料强化III",
            description: "青铜锭加成铜锭熔炼倍率",
            cost() {return new ExpantaNum(120)},
            unlocked(){return hasNormalAchievement(41)},
            effect() {
                let eff = player.bronze.points.max(1).pow(0.55).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        14: {
            title: "青铜原材料强化IV",
            description: "青铜锭加成锡锭熔炼倍率",
            cost() {return new ExpantaNum(140)},
            unlocked(){return hasNormalAchievement(41)},
            effect() {
                let eff = player.bronze.points.max(1).pow(0.45).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        15: {
            title: "青铜原材料强化V",
            description: "青铜锭加成自己的合金倍率<br>你现在可以前往合成台界面获取青铜工具图纸",
            cost() {return new ExpantaNum(160)},
            unlocked(){return hasNormalAchievement(41)},
            effect() {
                let eff = player.bronze.points.max(1).pow(0.3).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        21: {
            title: "超级强化",
            description: "解锁下一个青铜力量强化器",
            currencyInternalName: "power",
            currencyDisplayName: "青铜力量",
            currencyLayer: bronze,
            cost() {return new ExpantaNum(1e18)},
            unlocked(){return hasMilestone(bronze, 2)},
        },
        22: {
            title: "绑定合金倍率",
            description: "青铜锭合金倍率固定为铜锭的1/30和锡锭的1/10的最小值（向上取整）",
            currencyInternalName: "power",
            currencyDisplayName: "青铜力量",
            currencyLayer: bronze,
            cost() {return new ExpantaNum(1e122)},
            unlocked(){return hasMilestone(bronze, 2)},
        },
        23: {
            title: "青铜齿轮",
            description: "允许你撸树时获得丛林原木",
            cost() {return new ExpantaNum(1e28)},
            unlocked(){return hasMilestone(bronze, 2)},
        },
        24: {
            title: "丛林可可豆",
            description: "等级加成丛林原木获取",
            currencyInternalName: "jungle",
            currencyDisplayName: "丛林原木",
            currencyLayer: wood,
            cost() {return new ExpantaNum(275)},
            unlocked(){return hasMilestone(bronze, 2)},
            effect() {
                let eff = player.level.max(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        25: {
            title: "二级矿石",
            description: "需求：等级70<br>解锁两种新矿物（挖掘需要一定条件）",
            canAfford() {return player.level.gte(70)},
            currencyInternalName: "jungle",
            currencyDisplayName: "丛林原木",
            currencyLayer: wood,
            cost() {return new ExpantaNum(16384)},
            unlocked(){return hasMilestone(bronze, 2)},
        },
    },

    buyables: {
        11: {
            title: "青铜力量强化器MK.1",
            cost(x) { return d(5).pow(x.max(0).pow(1.35)).times(2) },
            free() {
                let f = d(0)
                if (hasMilestone(bronze, 4)) f = f.add(getBuyableAmount(bronze, 13))
                return f
            },
            display() { 
                let freedis = ""
                if (this.free().gte(1)) freedis = ` + ${formatWhole(this.free())}`
                let display = `加成青铜力量获取<br>
                效果公式：${format(this.effBase())}<sup>x</sup><br>
                等级：${formatWhole(player[this.layer].buyables[this.id])}${freedis}<br>
                当前效果：${format(this.effect())}x<br>
                价格：${format(this.cost())} 青铜力量`
                return display}, 
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            buyMax() {return setBuyableAmount(bronze, 11, player.bronze.power.div(2).max(1).logBase(5).root(1.35).floor().add(1))},
            canBuyMax() { return false},
            buy() {
                if (!this.canBuyMax()) player[this.layer].power = player[this.layer].power.sub(this.cost()),
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effBase() {
                let b = player.bronze.power.max(10).log10()
                return b
                },
            effect(x) {
                let effect = ExpantaNum.pow(this.effBase(), x.add(this.free()).max(0))
                return effect},
            unlocked() {return hasCraftingItem(92)}, 
            style() {if (this.canAfford()) return {"background":"linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)"}},
            tooltip: "效果公式的底数为lg(青铜力量)",
        },
        12: {
            title: "青铜力量强化器MK.2",
            cost(x) { return d(10).pow(x.max(0).pow(1.5)).times(1e19) },
            free() {
                let f = d(0)
                return f
            },
            display() { 
                let freedis = ""
                if (this.free().gte(1)) freedis = ` + ${formatWhole(this.free())}`
                let display = `加成青铜力量获取<br>
                效果公式：${format(this.effBase())}<sup>x</sup><br>
                等级：${formatWhole(player[this.layer].buyables[this.id])}${freedis}<br>
                当前效果：${format(this.effect())}x<br>
                价格：${format(this.cost())} 青铜力量`
                return display}, 
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            buyMax() {return setBuyableAmount(bronze, 12, player.bronze.power.div(1e19).max(1).logBase(10).root(1.5).floor().add(1))},
            canBuyMax() { return false},
            buy() {
                if (!this.canBuyMax()) player[this.layer].power = player[this.layer].power.sub(this.cost()),
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effBase() {
                let b = d(10)
                if (hasUpgrade(aluminum, 14)) b = b.times(10)
                if (hasCraftingItem(152)) b = b.add(tmp.wood.logEffects.acacia)
                return b
                },
            effect(x) {
                let effect = ExpantaNum.pow(this.effBase(), x.add(this.free()).max(0))
                return effect},
            unlocked() {return hasUpgrade(bronze, 21)}, 
            style() {if (this.canAfford()) return {"background":"linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)"}}
        },
        13: {
            title: "青铜力量强化器MK.3",
            cost(x) { return d(100).pow(x.max(0).pow(2)).times(1e214) },
            free() {
                let f = d(0)
                return f
            },
            display() { 
                let freedis = ""
                if (this.free().gte(1)) freedis = ` + ${formatWhole(this.free())}`
                let display = `加成青铜力量获取<br>
                效果公式：${format(this.effBase())}<sup>x</sup><br>
                等级：${formatWhole(player[this.layer].buyables[this.id])}${freedis}<br>
                当前效果：${format(this.effect())}x<br>
                价格：${format(this.cost())} 青铜力量`
                return display}, 
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            buyMax() {return setBuyableAmount(bronze, 13, player.bronze.power.div(1e214).max(1).logBase(100).root(2).floor().add(1))},
            canBuyMax() { return false},
            buy() {
                if (!this.canBuyMax()) player[this.layer].power = player[this.layer].power.sub(this.cost()),
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effBase() {
                let b = player.level.max(1)
                return b
                },
            effect(x) {
                let effect = ExpantaNum.pow(this.effBase(), x.add(this.free()).max(0))
                return effect},
            unlocked() {return hasCraftingItem(111)}, 
            style() {if (this.canAfford()) return {"background":"linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)"}},
            tooltip: "效果公式的底数为经验等级",
        },
        21: {
            title: "青铜力量强化器MK.4",
            cost(x) { return d(10000).pow(x.max(0).pow(2)).times('1e640') },
            free() {
                let f = d(0)
                return f
            },
            display() { 
                let freedis = ""
                if (this.free().gte(1)) freedis = ` + ${formatWhole(this.free())}`
                let display = `加成青铜力量获取<br>
                效果公式：lg(Ni+10)<sup>10x</sup> = ${format(this.effBase())}<sup>x</sup><br>
                等级：${formatWhole(player[this.layer].buyables[this.id])}${freedis}<br>
                当前效果：${format(this.effect())}x<br>
                价格：${format(this.cost())} 青铜力量`
                return display}, 
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            buyMax() {return setBuyableAmount(bronze, 21, player.bronze.power.div('1e640').max(1).logBase(10000).root(2).floor().add(1))},
            canBuyMax() { return false},
            buy() {
                if (!this.canBuyMax()) player[this.layer].power = player[this.layer].power.sub(this.cost()),
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effBase() {
                let b = player.nickel.points.max(0).add(10).log10().pow(10)
                return b
                },
            effect(x) {
                let effect = ExpantaNum.pow(this.effBase(), x.add(this.free()).max(0))
                return effect},
            unlocked() {return hasUpgrade(nickel, 21)}, 
            style() {if (this.canAfford()) return {"background":"linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)"}},
            tooltip: "Ni为镍锭数量",
        },          
    },

    bronzePower: {
        gain() {
            let g = d(0)
            if (hasCraftingItem(92)) g = g.add(1),
            g = g.times(buyableEffect(bronze, 11)),
            g = g.times(buyableEffect(bronze, 12)),
            g = g.times(buyableEffect(bronze, 13)),
            g = g.times(buyableEffect(bronze, 21))
            if (hasMilestone(bronze, 0)) g = g.times(milestoneEffect(bronze, 0))
            
            if (inChallenge(nickel, 11)) g = g.pow(0.5)
            if (inChallenge(nickel, 12)) g = g.pow(player.nickel.chal2nerf)
            return g
        },
        production() {
            player.bronze.power = player.bronze.power.add(this.gain().div(tick))
        },
        effect() {
            let eff = d(10).pow(player.bronze.power.add(1).log10().root(2))
            if (hasCraftingItem(132)) eff = eff.pow(1.5)
            if (hasCraftingItem(142)) eff = eff.pow(challengeEffect(nickel, 11))
            if (hasCraftingItem(161)) eff = eff.pow(1.5)
            return eff
        }
    },

    milestones: {
        0: {
            requirementDescription() {return `获得3000青铜力量`},
            effectDescription() {return `青铜锭加成青铜力量获取<br>当前效果：${f(this.effect())}x`},
            done() { return player.bronze.power.gte(3000) },
            effect() { return player.bronze.points.max(0).add(1).root(2) },
            unlocked() {return hasCraftingItem(92)},
        },
        1: {
            requirementDescription() {return `获得1.0000e15青铜力量`},
            effectDescription() {return `你的锡锭熔炼倍率被锁定为锡矿石的10%（向上取整）`},
            done() { return player.bronze.power.gte(1e15) },
            unlocked() {return hasCraftingItem(92)},
        },
        2: {
            requirementDescription() {return `到达等级46`},
            effectDescription() {return `解锁新的青铜升级`},
            done() { return player.level.gte(46) },
            unlocked() {return hasCraftingItem(92)},
        },
        3: {
            requirementDescription() {return `获得1.0000e121青铜力量`},
            effectDescription() {return `你的铜锭熔炼倍率被锁定为铜矿石的10%（向上取整）`},
            done() { return player.bronze.power.gte(1e121) },
            unlocked() {return hasCraftingItem(92)},
        },
        4: {
            requirementDescription() {return `获得1.0000e260青铜力量`},
            effectDescription() {return `青铜力量强化器MK.3提供免费等级到青铜力量强化器MK.1`},
            done() { return player.bronze.power.gte(1e260) },
            unlocked() {return hasCraftingItem(92)},
        },
        5: {
            requirementDescription() {return `获得1.0000e473青铜力量`},
            effectDescription() {return `1000000x经验获取`},
            done() { return player.bronze.power.gte('1e473') },
            unlocked() {return hasCraftingItem(92)},
        },
        6: {
            requirementDescription() {return `获得1.0000e632青铜力量`},
            effectDescription() {return `解锁新的镍升级`},
            done() { return player.bronze.power.gte('1e632') },
            unlocked() {return hasCraftingItem(142)},
        },
    },

    update() {
        if (player.bronze.points.gt(player.bronze.best)) player.bronze.best = player.bronze.points
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.bronze.best)} 青铜锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "upgrades": {
                unlocked() {return tmp.bronze.layerShown},
                name() {return '升级'},
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
            "milestones": {
                unlocked() {return hasCraftingItem(92)},
                name() {return '里程碑'},
                content: [
                    ["blank", "15px"],
                    "milestones",
                ]
            },
            "power": {
                unlocked() {return hasCraftingItem(92)},
                name() {return '青铜力量'},
                content: [
                    ["blank", "15px"],
                    ["display-text", function() {if (inChallenge(nickel, 12)) return `你当前在挑战“时间削弱”中，青铜力量获取速度变为^${f(player.nickel.chal2nerf, 4)}`}],
                    ["display-text", function() { return `你有 ${textStyle_h2(f(player.bronze.power), 'ffd7a1')} 青铜力量，加成锡矿石获取 ${textStyle_h2(f(tmp.bronze.bronzePower.effect)+"x", 'ffd7a1')}` }],
                    ["display-text", function() { return `(+${textStyle_h2(f(tmp.bronze.bronzePower.gain), 'ffd7a1')}/秒)`}],
                    "blank",
                    "buyables",
                ]
            },
        },
    },    
})

//世界1层6：铁
addLayer("iron", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: d(0),             // "points" is the internal name for the main resource of the layer.
        ore: d(0),
        molten: d(0),
        miningLevel: d(2),
        rarity: d(18),
        progress: d(0),
        findingProgress: d(0),
        hardness: d(240),
        destroying: false,
        finding: false,
        found: false,
        water: d(0),
        lava: d(0),
    }},

    color: "#d8d8d8",                       // The color for this layer, which affects many elements.
    nodeStyle: {"background": "linear-gradient(90deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)"},
    resource: "铁锭",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 5,
    symbol: '铁',

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        m = d(1)                            // 矿物的gainMult是给对应矿石的
        if (hasUpgrade(iron, 12)) m = m.times(3)
        if (hasMilestone(iron, 0)) m = m.times(5)
        if (hasUpgrade(iron, 22)) m = m.times(upgradeEffect(iron, 22))
        if (hasUpgrade(nickel, 12)) m = m.times(upgradeEffect(nickel, 12))
        if (hasUpgrade(nickel, 22)) m = m.times(challengeEffect(nickel, 12))
        if (hasUpgrade(nickel, 24)) m = m.times(upgradeEffect(nickel, 24))
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    layerShown() { return hasNormalAchievement(46) },          // Returns a bool for if this layer's node should be visible in the tree.

    doReset(resettingLayer) {
        return undefined
    },

    upgrades: {
        11: {
            title: "标准发展路线",
            description: "1e10x经验获取",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() {return new ExpantaNum(3)},
            unlocked(){return tmp.iron.layerShown},
        },
        12: {
            title: "铁矿矿脉",
            description: "需求：等级75<br>3x铁矿石获取",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            canAfford() {return player.level.gte(75)},
            cost() {return new ExpantaNum(5)},
            unlocked(){return tmp.iron.layerShown},
        },
        13: {
            title: "青铜力量转换器",
            description: "需求：等级75<br>青铜力量现在可以加成铜矿石获取，但是效果倍率降低",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            canAfford() {return player.level.gte(75)},
            cost() {return new ExpantaNum(15)},
            unlocked(){return tmp.iron.layerShown},
            effect() {
                let eff = tmp.bronze.bronzePower.effect.max(1).root(2)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        14: {
            title: "烧至金黄（指高温发光）",
            description: "需求：等级80<br>在熔炉界面解锁两种新配方",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            canAfford() {return player.level.gte(80)},
            cost() {return new ExpantaNum(5)},
            unlocked(){return tmp.iron.layerShown},
        },
        15: {
            title: "铁器时代",
            description: "现在可以解锁一系列新合成配方",
            cost() {return new ExpantaNum(1)},
            unlocked(){return tmp.iron.layerShown},
        },
        21: {
            title: "超高温",
            description: "3x升温速度",
            currencyInternalName: "lava",
            currencyDisplayName: "mB 熔岩",
            currencyLayer: iron,
            cost() {return new ExpantaNum(500000)},
            unlocked(){return hasMilestone(iron, 1)},
        },
        22: {
            title: "用水赶路",
            description: "水微弱加成铁矿石获取和铁锭熔炼倍率",
            cost() {return new ExpantaNum(60)},
            unlocked(){return hasMilestone(iron, 1)},
            effect() {
                let eff = player.iron.water.max(2).logBase(2).floor().max(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        23: {
            title: "真·刷石机",
            description: "熔岩加成石头获取",
            cost() {return new ExpantaNum(780)},
            unlocked(){return hasMilestone(iron, 1)},
            effect() {
                let eff = d(10).pow(player.iron.lava.max(1).log10().times(20).pow(0.85))
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        24: {
            title: "铁桶扩容",
            description: "需求：等级115<br>铁桶数量加成流体获取",
            currencyInternalName: "lava",
            currencyDisplayName: "mB 熔岩",
            currencyLayer: iron,
            cost() {return new ExpantaNum(1250000)},
            canAfford() {return player.level.gte(115)},
            unlocked(){return hasMilestone(iron, 1)},
            effect() {
                let eff = player.crafting_table.items[122].add(1).max(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        25: {
            title: "铁的工艺",
            description: "需求：等级115<br>能够查看更多合成配方",
            currencyInternalName: "lava",
            currencyDisplayName: "mB 熔岩",
            currencyLayer: iron,
            cost() {return new ExpantaNum(20000000)},
            canAfford() {return player.level.gte(115)},
            unlocked(){return hasMilestone(iron, 1)},
        },
    },

    milestones: {
        0: {
            requirementDescription() {return `获得2000 mB水`},
            effectDescription() {return `5x铁矿石获取`},
            done() { return player.iron.water.gte(2000) },
            unlocked() {return hasUpgrade(ct, 51)},
        },
        1: {
            requirementDescription() {return `获得5铁桶`},
            effectDescription() {return `解锁更多铁升级`},
            done() { return player.crafting_table.items[122].gte(5) },
            unlocked() {return hasUpgrade(ct, 51)},
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "点击寻找"
                return d
                },
            canClick() {return !player.iron.finding && !player.iron.destroying && !player.iron.found},
            onClick() {
                if (!player.iron.finding) player.iron.finding = true
            },
            unlocked() {return tmp.iron.layerShown},
            style() {
                return {
                    'min-height':'50px',
                    'width':'120px',
                    'font-size':'20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "点击挖掘"
                return d
                },
            canClick() {return !player.iron.destroying && player.iron.found},
            onClick() {
                if (!player.iron.destroying) player.iron.destroying = true
            },
            unlocked() {return tmp.iron.layerShown},
            style() {
                return {
                    'min-height':'50px',
                    'width':'120px',
                    'font-size':'20px'
                }
            },
        },
        21: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "收集水"
                return d
                },
            canClick() {return true},
            onClick() {
                player.iron.water = player.iron.water.add(tmp.iron.fluidPerBucket.times(player.crafting_table.items[122]))
            },
            unlocked() {return hasUpgrade(ct, 51)},
            style() {
                return {
                    'min-height':'80px',
                    'width':'120px',
                    'font-size':'20px',
                    'background-color':'#2b3cf4'
                }
            },
        },
        22: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "收集熔岩"
                return d
                },
            canClick() {return true},
            onClick() {
                player.iron.lava = player.iron.lava.add(tmp.iron.fluidPerBucket.times(player.crafting_table.items[122]))
            },
            unlocked() {return hasUpgrade(ct, 51)},
            style() {
                return {
                    'min-height':'80px',
                    'width':'120px',
                    'font-size':'20px',
                    'background-color':'#d76013'
                }
            },
        },
    },

    fluidPerBucket() {
        let f = d(1000)
        if (hasUpgrade(iron, 24)) f = f.times(upgradeEffect(iron, 24))
        return f
    },

    update() {
        if (player.iron.finding) player.iron.findingProgress = player.iron.findingProgress.add(player.copper.speed.div(tick))
            if (player.iron.findingProgress.gte(rarity(iron))) player.iron.findingProgress = d(0),
            player.iron.finding = false,
            player.iron.found = true
    
            if (player.iron.destroying) player.iron.progress = player.iron.progress.add(player.stone.speed.div(tick))
            if (player.iron.progress.gte(hardness(iron))) player.iron.progress = d(0),
            player.iron.found = false,
            player.iron.destroying = false,
            player.iron.ore = player.iron.ore.add(tmp.iron.gainMult)

        if (player.iron.points.gt(player.iron.best)) player.iron.best = player.iron.points
    },

    bars: {
        ironFinding: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {return `找矿进度: ${format(player.iron.findingProgress)}/${format(rarity(iron))}`},
            progress() { let p = player.iron.findingProgress.div(rarity(iron)); if (player.iron.found) p = d(1); return p },
            unlocked() {return tmp.iron.layerShown},
            fillStyle() {return {"background-color":"#d8d8d8"}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
            textStyle() {return {"color":"#5e5e5e"}},
        },
        ironDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {return `进度: ${format(player.iron.progress)}/${format(hardness(iron))}`},
            progress() { return player.iron.progress.div(hardness(iron)) },
            unlocked() {return tmp.iron.layerShown},
            fillStyle() {return {"background-color":"#d8d8d8"}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
            textStyle() {return {"color":"#5e5e5e"}},
        },
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        ["display-text", () => `你有 ${textStyle_h2(formatWhole(player.iron.ore), 'd8d8d8')} 铁矿石`],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.iron.best)} 铁锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "dig": {
                unlocked() {return tmp.iron.layerShown},
                name() {return '挖掘'},
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "ironFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "ironDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function() {return player.iron.found ? `你找到了一处铁矿石`:`你尚未找到铁矿石`}],
                    "blank",
                    ["display-text", function() {return `挖掘速度：${format(player.stone.speed)}/秒`}],
                    ["display-text", function() {return `找矿速度：${format(player.copper.speed)}/秒`}],
                    ["display-text", function() {return `破坏一次的铁矿石获取数量：${textStyle_h2(formatWhole(tmp.iron.gainMult), 'd8d8d8')}`}],
                    ["display-text", function() {return `稀有度：${formatWhole(rarity(iron))}`}],
                    ["display-text", function() {return `硬度：${formatWhole(hardness(iron))}`}],
                    ["display-text", function() {return `挖掘等级：2`}],
                    "blank",
                    ["display-text", function() {return `对于矿石，你需要先找到才能挖掘！`}],
                ]
            },
            "upgrades": {
                unlocked() {return tmp.iron.layerShown},
                name() {return '升级'},
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
            "milestones": {
                unlocked() {return tmp.iron.layerShown},
                name() {return '里程碑'},
                content: [
                    ["blank", "15px"],
                    "milestones",
                ]
            },
            "fluid": {
                unlocked() {return hasUpgrade(ct, 51)},
                name() {return '流体'},
                content: [
                    ["blank", "15px"],
                    ["display-text", function() {return `你有 ${textStyle_h2(formatWhole(player.crafting_table.items[122])+"/27", 'd8d8d8')} 铁桶`}],
                    ["display-text", function() {return `每个铁桶可以收集 ${textStyle_h2(formatWhole(tmp.iron.fluidPerBucket)+" mB", 'd8d8d8')} 流体`}],
                    "blank",
                    ["display-text", function() {return `你有 ${textStyle_h2(formatWhole(player.iron.water)+" mB", '2b3cf4')} 水`}],
                    ["display-text", function() {return `你有 ${textStyle_h2(formatWhole(player.iron.lava)+" mB", 'd76013')} 熔岩`}],
                    "blank",
                    ["clickables", [2]],
                
                ]
            },
        },
    },    
})

function resetBronzePowerAndBuyables() {
    let BPBs = [11, 12, 13, 21]
    for (i=0; i<BPBs.length; i++) {
        if (player.bronze.buyables[BPBs[i]].gt(0)) player.bronze.buyables[BPBs[i]] = d(0)
    }
    player.bronze.power = d(0)
}

//世界1层7：镍
addLayer("nickel", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: d(0),             // "points" is the internal name for the main resource of the layer.
        ore: d(0),
        molten: d(0),
        miningLevel: d(2),
        rarity: d(36),
        progress: d(0),
        findingProgress: d(0),
        hardness: d(500),
        destroying: false,
        finding: false,
        found: false,
        chal2nerf: d(1),
    }},

    color: "#fffcc0",                       // The color for this layer, which affects many elements.
    nodeStyle: {"background": "linear-gradient(90deg, #fffcc0 0%, #f5f5d7 25%, #fffcc0 50%, #e3df94 75%, #8b8566 100%)"},
    resource: "镍锭",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 6,
    symbol: '镍',

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        m = d(1)                            // 矿物的gainMult是给对应矿石的
        if (hasUpgrade(nickel, 11)) m = m.times(3)
        if (hasUpgrade(nickel, 13)) m = m.times(upgradeEffect(nickel, 13))
        if (hasUpgrade(nickel, 22)) m = m.times(challengeEffect(nickel, 12))
        if (hasUpgrade(aluminum, 23)) m = m.times(upgradeEffect(aluminum, 23))
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    layerShown() { return hasNormalAchievement(46) },          // Returns a bool for if this layer's node should be visible in the tree.

    doReset(resettingLayer) {
        return undefined
    },

    upgrades: {
        11: {
            title: "28号元素",
            description: "3x镍矿石获取",
            currencyInternalName: "ore",
            currencyDisplayName: "镍矿石",
            currencyLayer: nickel,
            cost() {return new ExpantaNum(5)},
            unlocked(){return hasCraftingItem(131)},
        },
        12: {
            title: "Ni→Fe",
            description: "镍矿石较微弱地加成铁矿石获取",
            currencyInternalName: "ore",
            currencyDisplayName: "镍矿石",
            currencyLayer: nickel,
            cost() {return new ExpantaNum(25)},
            unlocked(){return hasCraftingItem(131)},
            effect() {
                let eff = player.nickel.ore.max(0).add(2).logBase(2).pow(2).floor().max(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        13: {
            title: "Fe→Ni",
            description: "铁矿石极微弱地加成镍矿石获取",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() {return new ExpantaNum(114514)},
            unlocked(){return hasCraftingItem(131)},
            effect() {
                let eff = player.iron.ore.max(0).add(2).ssrt().floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        14: {
            title: "高温的用途",
            description: "允许使用熔岩作为燃料，但是熔岩温度过高，同时需要消耗水来冷却。解锁新的熔炼配方",
            currencyInternalName: "ore",
            currencyDisplayName: "镍矿石",
            currencyLayer: nickel,
            cost() {return new ExpantaNum(255)},
            unlocked(){return hasCraftingItem(131)},
        },
        15: {
            title: '造"镍"啊',
            description: "解锁更多合成配方",
            cost() {return new ExpantaNum(1)},
            unlocked(){return hasCraftingItem(131)},
        },
        21: {
            title: "究级强化",
            description: "解锁下一个青铜力量强化器",
            currencyInternalName: "power",
            currencyDisplayName: "青铜力量",
            currencyLayer: bronze,
            cost() {return new ExpantaNum('1e640')},
            unlocked(){return hasMilestone(bronze, 6)},
        },
        22: {
            title: "挑战2",
            description: "需求：等级186<br>解锁下一个挑战",
            currencyInternalName: "power",
            currencyDisplayName: "青铜力量",
            currencyLayer: bronze,
            cost() {return new ExpantaNum('1e910')},
            canAfford() {return player.level.gte(186)},
            unlocked(){return hasMilestone(bronze, 6)},
        },
        23: {
            title: "镍挑战强化",
            description: "需求：等级190<br>力量削弱的奖励基数+0.1",
            currencyInternalName: "power",
            currencyDisplayName: "青铜力量",
            currencyLayer: bronze,
            cost() {return new ExpantaNum('1e990')},
            canAfford() {return player.level.gte(190)},
            unlocked(){return hasMilestone(bronze, 6)},
        },
        24: {
            title: "铁矿矿脉",
            description: "需求：等级210<br>镍锭加成铁矿石以及铁锭熔炼倍率",
            currencyInternalName: "power",
            currencyDisplayName: "青铜力量",
            currencyLayer: bronze,
            cost() {return new ExpantaNum('1e1166')},
            canAfford() {return player.level.gte(210)},
            unlocked(){return hasMilestone(bronze, 6)},
            effect() {
                let eff = player.nickel.points.max(0).add(1).root(3)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        25: {
            title: "种类丰富的矿脉",
            description: "需求：等级210<br>解锁2种新的矿物（挖掘需要一定条件）",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() {return new ExpantaNum(2400000)},
            canAfford() {return player.level.gte(210)},
            unlocked(){return hasMilestone(bronze, 6)},
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "点击寻找"
                return d
                },
            canClick() {return !player.nickel.finding && !player.nickel.destroying && !player.nickel.found && hasCraftingItem(131)},
            onClick() {
                if (!player.nickel.finding) player.nickel.finding = true
            },
            unlocked() {return tmp.nickel.layerShown},
            style() {
                return {
                    'min-height':'50px',
                    'width':'120px',
                    'font-size':'20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "点击挖掘"
                return d
                },
            canClick() {return !player.nickel.destroying && player.nickel.found},
            onClick() {
                if (!player.nickel.destroying) player.nickel.destroying = true
            },
            unlocked() {return tmp.nickel.layerShown},
            style() {
                return {
                    'min-height':'50px',
                    'width':'120px',
                    'font-size':'20px'
                }
            },
        },
    },

    challenges: {
        11: {
            name: "力量削弱",
            challengeDescription() {
                return `青铜力量的获取变为原来的^0.5，进入挑战会重置青铜力量和与其相关的购买项`
            },
            goal() {
                let comps = d(player.nickel.challenges[11])
                return ExpantaNum.pow(1e8, comps).times(1e40)
            },
            goalDescription() {return `${format(challengeGoal(nickel, 11))} 青铜力量<br>目标公式: 1e8<sup>x</sup>·1e40
            <br>完成次数: ${formatWhole(challengeCompletions(nickel, 11))}/${formatWhole(this.completionLimit())}`},
            completionLimit() {
                let l = d(5)
                return l
            },
            canComplete: function() {
                return player.bronze.power.gte(challengeGoal(nickel, 11))
            },
            rewardDescription() {
                return `每完成一次都能使青铜力量的效果^(+${f(this.rewardBase(), 1)})`
            },
            rewardBase() {
                let base = d(0.2)
                if (hasUpgrade(nickel, 23)) base = base.add(0.1)
                return base
            },
            rewardEffect() {
                let comps = d(player.nickel.challenges[11])
                let eff = this.rewardBase().times(comps).add(1)
                return eff
            },
            rewardDisplay() { 
                return `^${format(challengeEffect(this.layer, 11))}`
            },
            onEnter() {     
                resetBronzePowerAndBuyables()  
            },
            unlocked() {return hasCraftingItem(142)},
            style() {return {'border-radius':'5%'}},
        },
        12: {
            name: "时间削弱",
            challengeDescription() {
                let s = d(30)
                if (hasUpgrade(aluminum, 12)) s = d(66)
                return `青铜力量的获取随着时间缓缓降低，到${fw(s)}秒时降低为1。进入挑战会重置青铜力量和与其相关的购买项`
            },
            goal() {
                let comps = d(player.nickel.challenges[12])
                return ExpantaNum.pow(1e90, comps).times('1e270')
            },
            goalDescription() {return `${format(challengeGoal(nickel, 12))} 青铜力量<br>目标公式: 1e90<sup>x</sup>·1e270
            <br>完成次数: ${formatWhole(challengeCompletions(nickel, 12))}/${formatWhole(this.completionLimit())}`},
            completionLimit() {
                let l = d(5)
                return l
            },
            canComplete: function() {
                return player.bronze.power.gte(challengeGoal(this.layer, this.id))
            },
            rewardDescription() {
                return `每完成一次都能使铁矿石，镍矿石获取以及对应锭的熔炼倍率x10`
            },
            rewardEffect() {
                let base = d(10)
                let comps = d(player.nickel.challenges[12])
                let eff = base.pow(comps)
                return eff
            },
            rewardDisplay() { 
                return `${format(challengeEffect(this.layer, 12))}x`
            },
            onEnter() {     
                resetBronzePowerAndBuyables()  
            },
            unlocked() {return hasUpgrade(nickel, 22)},
            nerf() {
                if (inChallenge(this.layer, this.id)) {
                    if (!hasUpgrade(aluminum, 12)) {
                        if (player.nickel.chal2nerf.gte(1/600)) player.nickel.chal2nerf = player.nickel.chal2nerf.sub(1/600)
                        if (player.nickel.chal2nerf.lte(1/600)) player.nickel.chal2nerf = d(0)
                    }
                else if (hasUpgrade(aluminum, 12)) {
                    if (player.nickel.chal2nerf.gte(1/1320)) player.nickel.chal2nerf = player.nickel.chal2nerf.sub(1/1320)
                    if (player.nickel.chal2nerf.lte(1/1320)) player.nickel.chal2nerf = d(0)
                    }
                }
                else player.nickel.chal2nerf = d(1)
            },
            style() {return {'border-radius':'5%'}},
        },
    },

    bars: {
        nickelFinding: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {return `找矿进度: ${format(player.nickel.findingProgress)}/${format(rarity(nickel))}`},
            progress() { let p = player.nickel.findingProgress.div(rarity(nickel)); if (player.nickel.found) p = d(1); return p },
            unlocked() {return tmp.nickel.layerShown},
            fillStyle() {return {"background-color":"#fffcc0"}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
            textStyle() {return {"color":"#8b8556"}},
        },
        nickelDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {return `进度: ${format(player.nickel.progress)}/${format(hardness(nickel))}`},
            progress() { return player.nickel.progress.div(hardness(nickel)) },
            unlocked() {return tmp.nickel.layerShown},
            fillStyle() {return {"background-color":"#fffcc0"}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
            textStyle() {return {"color":"#8b8556"}},
        },
    },

    update() {
        if (player.nickel.finding) player.nickel.findingProgress = player.nickel.findingProgress.add(player.copper.speed.div(tick))
            if (player.nickel.findingProgress.gte(rarity(nickel))) player.nickel.findingProgress = d(0),
            player.nickel.finding = false,
            player.nickel.found = true
    
            if (player.nickel.destroying) player.nickel.progress = player.nickel.progress.add(player.stone.speed.div(tick))
            if (player.nickel.progress.gte(hardness(nickel))) player.nickel.progress = d(0),
            player.nickel.found = false,
            player.nickel.destroying = false,
            player.nickel.ore = player.nickel.ore.add(tmp.nickel.gainMult)

        if (player.nickel.points.gt(player.nickel.best)) player.nickel.best = player.nickel.points
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        ["display-text", () => `你有 ${textStyle_h2(formatWhole(player.nickel.ore), 'fffcc0')} 镍矿石`],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.nickel.best)} 镍锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "dig": {
                unlocked() {return tmp.nickel.layerShown},
                name() {return '挖掘'},
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "nickelFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "nickelDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function() {return player.nickel.found ? `你找到了一处镍矿石`:`你尚未找到镍矿石`}],
                    "blank",
                    ["display-text", function() {return `挖掘速度：${format(player.stone.speed)}/秒`}],
                    ["display-text", function() {return `找矿速度：${format(player.copper.speed)}/秒`}],
                    ["display-text", function() {return `破坏一次的镍矿石获取数量：${textStyle_h2(formatWhole(tmp.nickel.gainMult), 'fffcc0')}`}],
                    ["display-text", function() {return `稀有度：${formatWhole(rarity(nickel))}`}],
                    ["display-text", function() {return `硬度：${formatWhole(hardness(nickel))}`}],
                    ["display-text", function() {return `挖掘等级：2`}],
                    "blank",
                    ["display-text", function() {return `你只有合成铁质探矿杖（合成界面第7页第1个）后才能找到镍矿石！`}],
                ]
            },
            "upgrades": {
                unlocked() {return tmp.nickel.layerShown},
                name() {return '升级'},
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
            "milestones": {
                unlocked() {return tmp.nickel.layerShown},
                name() {return '里程碑'},
                content: [
                    ["blank", "15px"],
                    "milestones",
                ]
            },
            "challenges": {
                unlocked() {return hasCraftingItem(142)},
                name() {return '挑战'},
                content: [
                    ["blank", "15px"],
                    "challenges",
                ]
            },
        },
    },    
})

//世界1层8：铝
addLayer("aluminum", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: d(0),             // "points" is the internal name for the main resource of the layer.
        ore: d(0),
        molten: d(0),
        miningLevel: d(2),
        rarity: d(54),
        progress: d(0),
        findingProgress: d(0),
        hardness: d(1150),
        destroying: false,
        finding: false,
        found: false,
    }},

    color: "#e2e3ee",                       // The color for this layer, which affects many elements.
    nodeStyle: {"background": "linear-gradient(90deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)"},
    resource: "铝锭",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 7,
    symbol: '铝',

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        m = d(1)                            // 矿物的gainMult是给对应矿石的
        if (hasUpgrade(aluminum, 11)) m = m.times(upgradeEffect(aluminum, 11))
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    layerShown() { return hasNormalAchievement(64) || hasUpgrade(nickel, 25)},          // Returns a bool for if this layer's node should be visible in the tree.

    doReset(resettingLayer) {
        return undefined
    },

    upgrades: {
        11: {
            title: "AlAlAl",
            description: "青铜力量加成铝矿石获取",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            cost() {return new ExpantaNum(5)},
            unlocked(){return tmp.aluminum.layerShown},
            effect() {
                let eff = player.bronze.power.max(1e100).logBase(1e100).sub(9.8).max(1).pow(2).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
        },
        12: {
            title: "缓速削弱",
            description: "时间削弱挑战现在需要66秒才会将青铜力量获取降低到1",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            cost() {return new ExpantaNum(25)},
            unlocked(){return tmp.aluminum.layerShown},
        },
        13: {
            title: "大片丛林",
            description: "需求：1e1280青铜力量<br>丛林原木的获取^3，效果^3",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            cost() {return new ExpantaNum(45)},
            canAfford() {return player.bronze.power.gte('1e1280')},
            unlocked(){return tmp.aluminum.layerShown},
        },
        14: {
            title: "青铜力量强化器MK^2",
            description: "需求：等级286<br>青铜力量强化器MK.2的效果底数变为10x",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            cost() {return new ExpantaNum(60)},
            canAfford() {return player.level.gte(286)},
            unlocked(){return tmp.aluminum.layerShown},
        },
        15: {
            title: "铝工艺品",
            description: "需求：等级315<br>解锁铝锭熔炼，和一些合成配方",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            cost() {return new ExpantaNum(1000)},
            canAfford() {return player.level.gte(315)},
            unlocked(){return tmp.aluminum.layerShown},
        },
        21: {
            title: "铝锭生产线",
            description: "铝锭熔炼倍率x50",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            cost() {return new ExpantaNum(1200)},
            unlocked(){return hasCraftingItem(162)},
        },
        22: {
            title: "铝热剂",
            description: "升温速度变为1.5x",
            cost() {return new ExpantaNum(700)},
            unlocked(){return hasCraftingItem(162)},
        },
        23: {
            title: "超级加速",
            description: "铝锭加成镍矿石获取以及镍锭熔炼倍率",
            cost() {return new ExpantaNum(1050)},
            unlocked(){return hasCraftingItem(162)},
            effect() {
                let eff = player.aluminum.points.max(1).root(1.25)
                return eff
            },
            effectDisplay() {
                return `${f(upgradeEffect(this.layer, this.id))}x`
            },
        },
        24: {
            title: "超级冲刺",
            description: "铁锭以指数加成成就点数的效果",
            cost() {return new ExpantaNum(1650)},
            unlocked(){return hasCraftingItem(162)},
            effect() {
                let eff = player.iron.points.max(0).add(10).log10().root(1.33)
                return eff
            },
            effectDisplay() {
                return `^${f(upgradeEffect(this.layer, this.id))}`
            },
        },
        25: {
            title: "抵抗辐射",
            description: "需求：等级478<br>允许挖掘铅矿石",
            canAfford() {return player.level.gte(478)},
            cost() {return new ExpantaNum(2200)},
            unlocked(){return hasCraftingItem(162)},
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "点击寻找"
                return d
                },
            canClick() {return !player.aluminum.finding && !player.aluminum.destroying && !player.aluminum.found},
            onClick() {
                if (!player.aluminum.finding) player.aluminum.finding = true
            },
            unlocked() {return tmp.aluminum.layerShown},
            style() {
                return {
                    'min-height':'50px',
                    'width':'120px',
                    'font-size':'20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "点击挖掘"
                return d
                },
            canClick() {return !player.aluminum.destroying && player.aluminum.found},
            onClick() {
                if (!player.aluminum.destroying) player.aluminum.destroying = true
            },
            unlocked() {return tmp.aluminum.layerShown},
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
        aluminumFinding: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {return `找矿进度: ${format(player.aluminum.findingProgress)}/${format(rarity(aluminum))}`},
            progress() { let p = player.aluminum.findingProgress.div(rarity(aluminum)); if (player.aluminum.found) p = d(1); return p },
            unlocked() {return tmp.aluminum.layerShown},
            fillStyle() {return {"background-color":"#e2e3ee"}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
            textStyle() {return {"color":"#45464b"}},
        },
        aluminumDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {return `进度: ${format(player.aluminum.progress)}/${format(hardness(aluminum))}`},
            progress() { return player.aluminum.progress.div(hardness(aluminum)) },
            unlocked() {return tmp.aluminum.layerShown},
            fillStyle() {return {"background-color":"#e2e3ee"}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
            textStyle() {return {"color":"#45464b"}},
        },
    },

    update() {
        if (player.aluminum.finding) player.aluminum.findingProgress = player.aluminum.findingProgress.add(player.copper.speed.div(tick))
            if (player.aluminum.findingProgress.gte(rarity(aluminum))) player.aluminum.findingProgress = d(0),
            player.aluminum.finding = false,
            player.aluminum.found = true
    
            if (player.aluminum.destroying) player.aluminum.progress = player.aluminum.progress.add(player.stone.speed.div(tick))
            if (player.aluminum.progress.gte(hardness(aluminum))) player.aluminum.progress = d(0),
            player.aluminum.found = false,
            player.aluminum.destroying = false,
            player.aluminum.ore = player.aluminum.ore.add(tmp.aluminum.gainMult)

        if (player.aluminum.points.gt(player.aluminum.best)) player.aluminum.best = player.aluminum.points
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        ["display-text", () => `你有 ${textStyle_h2(formatWhole(player.aluminum.ore), 'e2e3ee')} 铝矿石`],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.aluminum.best)} 铝锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "dig": {
                unlocked() {return tmp.aluminum.layerShown},
                name() {return '挖掘'},
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "aluminumFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "aluminumDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function() {return player.aluminum.found ? `你找到了一处铝矿石`:`你尚未找到铝矿石`}],
                    "blank",
                    ["display-text", function() {return `挖掘速度：${format(player.stone.speed)}/秒`}],
                    ["display-text", function() {return `找矿速度：${format(player.copper.speed)}/秒`}],
                    ["display-text", function() {return `破坏一次的铝矿石获取数量：${textStyle_h2(formatWhole(tmp.aluminum.gainMult), 'e2e3ee')}`}],
                    ["display-text", function() {return `稀有度：${formatWhole(rarity(aluminum))}`}],
                    ["display-text", function() {return `硬度：${formatWhole(hardness(aluminum))}`}],
                    ["display-text", function() {return `挖掘等级：2`}],
                ]
            },
            "upgrades": {
                unlocked() {return tmp.aluminum.layerShown},
                name() {return '升级'},
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
            "milestones": {
                unlocked() {return tmp.aluminum.layerShown},
                name() {return '里程碑'},
                content: [
                    ["blank", "15px"],
                    "milestones",
                ]
            },

        },
    },    
})

//世界1层9：铅
addLayer("lead", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: d(0),             // "points" is the internal name for the main resource of the layer.
        ore: d(0),
        molten: d(0),
        miningLevel: d(2),
        rarity: d(72),
        progress: d(0),
        findingProgress: d(0),
        hardness: d(2160),
        destroying: false,
        finding: false,
        found: false,
    }},

    color: "#97a9e0",                       // The color for this layer, which affects many elements.
    nodeStyle: {"background": "linear-gradient(90deg, #667397 0%, #acc0ff 20%, #97a9e0 50%, #6a7392 80%, #333848 100%)"},
    resource: "铅锭",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 8,
    symbol: '铅',

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

    layerShown() { return hasNormalAchievement(64) || hasUpgrade(nickel, 25)},          // Returns a bool for if this layer's node should be visible in the tree.

    doReset(resettingLayer) {
        return undefined
    },

    upgrades: {
        11: {
            title: "重量级金属",
            description: "敬请期待 v0.4",
            currencyInternalName: "ore",
            currencyDisplayName: "铅矿石",
            currencyLayer: lead,
            cost() {return new ExpantaNum(1e100)},
            unlocked(){return tmp.lead.layerShown},
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "点击寻找"
                return d
                },
            canClick() {return !player.lead.finding && !player.lead.destroying && !player.lead.found && hasUpgrade(aluminum, 25)},
            onClick() {
                if (!player.lead.finding) player.lead.finding = true
            },
            unlocked() {return tmp.lead.layerShown},
            style() {
                return {
                    'min-height':'50px',
                    'width':'120px',
                    'font-size':'20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t},
            display() {
                let d = "点击挖掘"
                return d
                },
            canClick() {return !player.lead.destroying && player.lead.found},
            onClick() {
                if (!player.lead.destroying) player.lead.destroying = true
            },
            unlocked() {return tmp.lead.layerShown},
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
        leadFinding: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {return `找矿进度: ${format(player.lead.findingProgress)}/${format(rarity(lead))}`},
            progress() { let p = player.lead.findingProgress.div(rarity(lead)); if (player.lead.found) p = d(1); return p },
            unlocked() {return tmp.lead.layerShown},
            fillStyle() {return {"background-color":"#97a9e0"}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
            textStyle() {return {"color":"#667397"}},
        },
        leadDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {return `进度: ${format(player.lead.progress)}/${format(hardness(lead))}`},
            progress() { return player.lead.progress.div(hardness(lead)) },
            unlocked() {return tmp.lead.layerShown},
            fillStyle() {return {"background-color":"#97a9e0"}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
            textStyle() {return {"color":"#667397"}},
        },
    },

    update() {
        if (player.lead.finding) player.lead.findingProgress = player.lead.findingProgress.add(player.copper.speed.div(tick))
            if (player.lead.findingProgress.gte(rarity(lead))) player.lead.findingProgress = d(0),
            player.lead.finding = false,
            player.lead.found = true
    
            if (player.lead.destroying) player.lead.progress = player.lead.progress.add(player.stone.speed.div(tick))
            if (player.lead.progress.gte(hardness(lead))) player.lead.progress = d(0),
            player.lead.found = false,
            player.lead.destroying = false,
            player.lead.ore = player.lead.ore.add(tmp.lead.gainMult)

        if (player.lead.points.gt(player.lead.best)) player.lead.best = player.lead.points
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        ["display-text", () => `你有 ${textStyle_h2(formatWhole(player.lead.ore), '97a9e0')} 铅矿石`],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.lead.best)} 铅锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "dig": {
                unlocked() {return tmp.lead.layerShown},
                name() {return '挖掘'},
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "leadFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "leadDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function() {return player.lead.found ? `你找到了一处铅矿石`:`你尚未找到铅矿石`}],
                    "blank",
                    ["display-text", function() {return `挖掘速度：${format(player.stone.speed)}/秒`}],
                    ["display-text", function() {return `找矿速度：${format(player.copper.speed)}/秒`}],
                    ["display-text", function() {return `破坏一次的铅矿石获取数量：${textStyle_h2(formatWhole(tmp.lead.gainMult), '97a9e0')}`}],
                    ["display-text", function() {return `稀有度：${formatWhole(rarity(lead))}`}],
                    ["display-text", function() {return `硬度：${formatWhole(hardness(lead))}`}],
                    ["display-text", function() {return `挖掘等级：2`}],
                    "blank",
                    ["display-text", function() {return `在购买第10个铝升级之后可以挖掘铅矿石`}],
                ]
            },
            "upgrades": {
                unlocked() {return tmp.lead.layerShown},
                name() {return '升级'},
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
            "milestones": {
                unlocked() {return tmp.lead.layerShown},
                name() {return '里程碑'},
                content: [
                    ["blank", "15px"],
                    "milestones",
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


function isCraftingItem() {
    return player.crafting_table.crafting
}

function hasCraftingItem(id) {
    if (canCraftMultiple(id)) return player.crafting_table.items[id].gte(1)
    else return player.crafting_table.items[id]
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
    if (canCraftMultiple(id)) player.crafting_table.items[id] = player.crafting_table.items[id].add(1)
    if (!canCraftMultiple(id)) player.crafting_table.items[id] = true
}

function craftingItemColor(id) {
    return tmp.crafting_table.clickables[id].style['background-color']
}

function canCraftMultiple(id) {
    if (id == 91 || id == 122 || id == 141) return true
    else return false
}


//制造层1：合成台
addLayer("crafting_table", { 
    name: "crafting_table",
    position: 1002,
    row: 101,
    symbol: '合成台', // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
        points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
        cooldown: d(0),
        speed: d(2),
        crafting: false,
        craftingItem: 0,
        progress: d(0),
        items: {
            11: false, 12: false, 21: false, 22: false, 31: false, 32: false, 41: false, 42: false, 51: false, 52: false,
            61: false, 62: false, 71: false, 72: false, 81: false, 82: false, 91: d(0), 92: false, 101: false, 102: false,
            111: false, 112: false, 121: false, 122: d(0), 131: false, 132: false, 141: d(0), 142: false, 151: false, 152: false,
            161: false, 162: false, 

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
        if (hasUpgrade(copper, 11)) m = m.times(5)
        return m
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        e = d(1)
        return e
    },
    resetDescription: "重置以合成 ",
    layerShown(){return hasNormalAchievement(12)},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	
    onPrestige() {
        return player.crafting_table.cooldown = d(1)
    },

    canReset() {
        return player.crafting_table.cooldown.lte(0) && player.wood.points.gte(80)
    },

    doReset(resettingLayer) {
        if (hasMilestone(furnace, 0)) return undefined
    },

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
        12: {
            title: "熔炉",
            description: "解锁熔炉的合成（制造区域层级）",
            currencyInternalName: "sand",
            currencyDisplayName: "沙子",
            currencyLayer: stone,
            cost() {return new ExpantaNum(12)},
            unlocked(){return hasNormalAchievement(24)},
        },
        13: {
            title: "铜斧",
            description: "解锁铜斧的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铜锭",
            currencyLayer: copper,
            cost() {return new ExpantaNum(2)},
            unlocked(){return hasNormalAchievement(24)},
        },
        14: {
            title: "铜镐",
            description: "解锁铜镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铜锭",
            currencyLayer: copper,
            cost() {return new ExpantaNum(5)},
            unlocked(){return hasNormalAchievement(24)},
        },
        15: {
            title: "铜制探矿杖",
            description: "解锁铜制探矿杖的合成",
            currencyInternalName: "glass",
            currencyDisplayName: "玻璃",
            currencyLayer: furnace,
            cost() {return new ExpantaNum(10)},
            unlocked(){return hasNormalAchievement(24)},
        },
        21: {
            title: "铜质合成台",
            description: "解锁铜质合成台的合成",
            currencyInternalName: "glass",
            currencyDisplayName: "玻璃",
            currencyLayer: furnace,
            cost() {return new ExpantaNum(30)},
            unlocked(){return hasCraftingItem(42)},
        },
        22: {
            title: "铜质熔炉",
            description: "解锁铜质熔炉的合成",
            currencyInternalName: "glass",
            currencyDisplayName: "玻璃",
            currencyLayer: furnace,
            cost() {return new ExpantaNum(40)},
            unlocked(){return hasCraftingItem(42)},
        },
        23: {
            title: "1阶太阳能板",
            description: "解锁1阶太阳能板的合成",
            currencyInternalName: "glass",
            currencyDisplayName: "玻璃",
            currencyLayer: furnace,
            cost() {return new ExpantaNum(50)},
            unlocked(){return hasCraftingItem(42)},
        },
        24: {
            title: "锡斧",
            description: "解锁锡斧的合成",
            currencyInternalName: "points",
            currencyDisplayName: "锡锭",
            currencyLayer: tin,
            cost() {return new ExpantaNum(10)},
            unlocked(){return hasCraftingItem(42)},
        },
        25: {
            title: "锡镐",
            description: "解锁锡镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "锡锭",
            currencyLayer: tin,
            cost() {return new ExpantaNum(10)},
            unlocked(){return hasCraftingItem(42)},
        },
        31: {
            title: "青铜合成台",
            description: "需求：等级36<br>解锁青铜合成台的合成",
            currencyInternalName: "points",
            currencyDisplayName: "青铜锭",
            currencyLayer: bronze,
            cost() {return new ExpantaNum(222)},
            canAfford() {return player.level.gte(36)},
            unlocked(){return hasUpgrade(bronze, 15)},
        },
        32: {
            title: "青铜斧",
            description: "需求：等级36<br>解锁青铜斧的合成",
            currencyInternalName: "points",
            currencyDisplayName: "青铜锭",
            currencyLayer: bronze,
            cost() {return new ExpantaNum(333)},
            canAfford() {return player.level.gte(36)},
            unlocked(){return hasUpgrade(bronze, 15)},
        },
        33: {
            title: "青铜镐",
            description: "需求：等级40<br>解锁青铜镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "青铜锭",
            currencyLayer: bronze,
            cost() {return new ExpantaNum(444)},
            canAfford() {return player.level.gte(40)},
            unlocked(){return hasUpgrade(bronze, 15)},
        },
        34: {
            title: "青铜外壳",
            description: "需求：等级42<br>解锁青铜外壳的合成",
            currencyInternalName: "points",
            currencyDisplayName: "青铜锭",
            currencyLayer: bronze,
            cost() {return new ExpantaNum(555)},
            canAfford() {return player.level.gte(42)},
            unlocked(){return hasUpgrade(bronze, 15)},
        },
        35: {
            title: "2阶太阳能板",
            description: "需求：等级42<br>解锁2阶太阳能板的合成",
            currencyInternalName: "points",
            currencyDisplayName: "青铜锭",
            currencyLayer: bronze,
            cost() {return new ExpantaNum(1111)},
            canAfford() {return player.level.gte(42)},
            unlocked(){return hasUpgrade(bronze, 15)},
        },
        41: {
            title: "铁质合成台",
            description: "需求：等级81<br>解锁铁质合成台的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() {return new ExpantaNum(3)},
            canAfford() {return player.level.gte(81)},
            unlocked(){return hasUpgrade(iron, 15)},
        },
        42: {
            title: "铁斧",
            description: "需求：等级81<br>解锁铁斧的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() {return new ExpantaNum(3)},
            canAfford() {return player.level.gte(81)},
            unlocked(){return hasUpgrade(iron, 15)},
        },
        43: {
            title: "铁镐",
            description: "需求：等级88<br>解锁铁镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() {return new ExpantaNum(3)},
            canAfford() {return player.level.gte(88)},
            unlocked(){return hasUpgrade(iron, 15)},
        },
        44: {
            title: "虚空电炉MK.1",
            description: "需求：等级103<br>解锁虚空电炉MK.1的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() {return new ExpantaNum(3)},
            canAfford() {return player.level.gte(103)},
            unlocked(){return hasUpgrade(iron, 15)},
        },
        45: {
            title: "3阶太阳能板",
            description: "需求：完成33个普通成就<br>解锁3阶太阳能板的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() {return new ExpantaNum(3)},
            canAfford() {return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(33)},
            unlocked(){return hasUpgrade(iron, 15)},
        },
        51: {
            title: "铁桶",
            description: "解锁铁桶的合成<br>解锁铁层级新页面",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() {return new ExpantaNum(25)},
            unlocked(){return hasCraftingItem(121)},
        },
        52: {
            title: "铁制探矿杖",
            description: "解锁铁制探矿杖的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() {return new ExpantaNum(200)},
            unlocked(){return hasUpgrade(iron, 25)},
        },
        53: {
            title: "镍镐",
            description: "解锁镍镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "镍锭",
            currencyLayer: nickel,
            cost() {return new ExpantaNum(5)},
            unlocked(){return hasUpgrade(nickel, 15)},
        },
        54: {
            title: "镍齿轮",
            description: "需求：等级133<br>解锁镍齿轮的合成",
            currencyInternalName: "points",
            currencyDisplayName: "镍锭",
            currencyLayer: nickel,
            canAfford() {return player.level.gte(133)},
            cost() {return new ExpantaNum(10)},
            unlocked(){return hasUpgrade(nickel, 15)},
        },
        55: {
            title: "镍机械挑战器",
            description: "需求：等级133<br>解锁镍机械挑战器的合成",
            currencyInternalName: "points",
            currencyDisplayName: "镍锭",
            currencyLayer: nickel,
            canAfford() {return player.level.gte(133)},
            cost() {return new ExpantaNum(15)},
            unlocked(){return hasUpgrade(nickel, 15)},
        },
        61: {
            title: "铝质合成台",
            description: "需求：等级316<br>解锁铝质合成台的合成",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            canAfford() {return player.level.gte(316)},
            cost() {return new ExpantaNum(575)},
            unlocked(){return hasUpgrade(aluminum, 15)},
        },
        62: {
            title: "铝斧",
            description: "需求：等级316<br>解锁铝斧的合成",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            canAfford() {return player.level.gte(316)},
            cost() {return new ExpantaNum(825)},
            unlocked(){return hasUpgrade(aluminum, 15)},
        },
        63: {
            title: "铝镐",
            description: "需求：等级335<br>解锁铝镐的合成",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            canAfford() {return player.level.gte(335)},
            cost() {return new ExpantaNum(1000)},
            unlocked(){return hasUpgrade(aluminum, 15)},
        },
        64: {
            title: "铝机械臂",
            description: "需求：等级386<br>解锁铝机械臂的合成",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            canAfford() {return player.level.gte(386)},
            cost() {return new ExpantaNum(1000)},
            unlocked(){return hasUpgrade(aluminum, 15)},
        },
    },

    milestones: {
        0: {
            requirementDescription() {return `获得15合成台`},
            effectDescription() {return `奖励：合成合成台时保留木头升级和里程碑`},
            done() { return player.crafting_table.points.gte(15) },
            unlocked() {return true},
        },
        1: {
            requirementDescription() {return `到达等级27`},
            effectDescription() {return `奖励：解锁新一排铜升级`},
            done() { return player.level.gte(27) },
            unlocked() {return hasUpgrade(stone, 34)},
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
                需要工具：120合成台（消耗）<br>
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
                player.stone.points = player.stone.points.sub(21000),
                player.crafting_table.points = player.crafting_table.points.sub(120)
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
        32: {
            title() {
                let t = "铜斧"
                return t},
            display() {
                let d = `
                需要工具：石质合成台<br>
                需要材料：200木头 + 5铜锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：撸树速度x3，木头获取x20<br>
                挖掘等级：1`
                return d
                },
            complexity: d(300),
            canClick() {return player.crafting_table.points.gte(1) && player.wood.points.gte(200) && player.copper.points.gte(5) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(31)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.wood.points = player.wood.points.sub(200),
                player.copper.points = player.copper.points.sub(5)
            },
            unlocked() {return hasUpgrade(ct, 13)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                    'background-color': '#ffb41d',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        41: {
            title() {
                let t = "铜镐"
                return t},
            display() {
                let d = `
                需要工具：石质合成台<br>
                需要材料：200木头 + 15铜锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：挖掘速度x5，石头获取x5，解锁第3排石头升级<br>
                挖掘等级：1`
                return d
                },
            complexity: d(450),
            canClick() {return player.crafting_table.points.gte(1) && player.wood.points.gte(200) && player.copper.points.gte(15) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(31)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.wood.points = player.wood.points.sub(200),
                player.copper.points = player.copper.points.sub(15)
            },
            unlocked() {return hasUpgrade(ct, 14)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                    'background-color': '#ffb41d',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        42: {
            title() {
                let t = "铜制探矿杖"
                return t},
            display() {
                let d = `
                需要工具：石质合成台<br>
                需要材料：200木头 + 25铜锭 + 50玻璃<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：找矿速度x3<br>
                解锁新一排合成台图纸`
                return d
                },
            complexity: d(450),
            canClick() {return player.crafting_table.points.gte(1) && player.wood.points.gte(200) && player.copper.points.gte(25) && player.furnace.glass.gte(50) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(31)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.wood.points = player.wood.points.sub(200),
                player.copper.points = player.copper.points.sub(25),
                player.furnace.glass = player.furnace.glass.sub(50)
            },
            unlocked() {return hasUpgrade(ct, 15)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                    'background-color': '#ffb41d',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        51: {
            title() {
                let t = "铜质合成台"
                return t},
            display() {
                let d = `
                需要工具：石质合成台 + 10000合成台（消耗）<br>
                需要材料：2000木头 + 25铜锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：合成的速度x10<br>`
                return d
                },
            complexity: d(750),
            canClick() {return player.crafting_table.points.gte(10000) && player.wood.points.gte(2000) && player.copper.points.gte(25) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(31)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.wood.points = player.wood.points.sub(2000),
                player.copper.points = player.copper.points.sub(25),
                player.crafting_table.points = player.crafting_table.points.sub(10000)
            },
            unlocked() {return hasUpgrade(ct, 21)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                    'background-color': '#ffb41d',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        52: {
            title() {
                let t = "铜质熔炉"
                return t},
            display() {
                let d = `
                需要工具：石质合成台 + 30熔炉（消耗）<br>
                需要材料：2000石头 + 25铜锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：熔炼的速度x10<br>`
                return d
                },
            complexity: d(1600),
            canClick() {return player.crafting_table.points.gte(1) && player.furnace.points.gte(30) && player.stone.points.gte(2000) && player.copper.points.gte(25) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(31)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.stone.points = player.stone.points.sub(2000),
                player.copper.points = player.copper.points.sub(25),
                player.furnace.points = player.furnace.points.sub(30)
            },
            unlocked() {return hasUpgrade(ct, 22)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                    'background-color': '#ffb41d',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        61: {
            title() {
                let t = "1阶太阳能板"
                return t},
            display() {
                let d = `
                需要工具：铜质合成台<br>
                需要材料：10000石头 + 120铜锭 + 320玻璃<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：解锁新区域：能源<br>
                你可以开始生产红石通量（RF）并且解锁一些自动化<br>
                速度为15RF/t`
                return d
                },
            complexity: d(3600),
            canClick() {return player.crafting_table.points.gte(1) && player.copper.points.gte(120) && player.stone.points.gte(10000) && player.furnace.glass.gte(320) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(51)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.stone.points = player.stone.points.sub(10000),
                player.copper.points = player.copper.points.sub(120),
                player.furnace.glass = player.furnace.glass.sub(320)
            },
            unlocked() {return hasUpgrade(ct, 23)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(90deg, #ea8601 0%, #ffb53c 100%)",
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        62: {
            title() {
                let t = "锡斧"
                return t},
            display() {
                let d = `
                需要工具：铜质合成台<br>
                需要材料：200木头 + 8锡锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：木头获取x300<br>
                挖掘等级：1`
                return d
                },
            complexity: d(4200),
            canClick() {return player.crafting_table.points.gte(1) && player.wood.points.gte(200) && player.tin.points.gte(8) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(51)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.wood.points = player.wood.points.sub(200),
                player.tin.points = player.tin.points.sub(8)
            },
            unlocked() {return hasUpgrade(ct, 24)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #c4dce1 0%, #d3e4e4 100%)",
                    'background-color': '#c4dce1',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        71: {
            title() {
                let t = "锡镐"
                return t},
            display() {
                let d = `
                需要工具：铜质合成台<br>
                需要材料：200木头 + 21锡锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：挖掘速度x3，石头获取x150，解锁第1排锡升级<br>
                挖掘等级：1`
                return d
                },
            complexity: d(4800),
            canClick() {return player.crafting_table.points.gte(1) && player.wood.points.gte(200) && player.tin.points.gte(21) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(51)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.wood.points = player.wood.points.sub(200),
                player.tin.points = player.tin.points.sub(21)
            },
            unlocked() {return hasUpgrade(ct, 25)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #c4dce1 0%, #d3e4e4 100%)",
                    'background-color': '#c4dce1',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        72: {
            title() {
                let t = "青铜合成台"
                return t},
            display() {
                let d = `
                需要工具：铜质合成台 + 10,000,000合成台（消耗）<br>
                需要材料：1e23木头 + 125青铜锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：合成的速度x25`
                return d
                },
            complexity: d(6400),
            canClick() {return player.crafting_table.points.gte(10000000) && player.wood.points.gte(1e23) && player.bronze.points.gte(125) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(51)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.wood.points = player.wood.points.sub(1e23),
                player.bronze.points = player.bronze.points.sub(125),
                player.crafting_table.points = player.crafting_table.points.sub(2000000)
            },
            unlocked() {return hasUpgrade(ct, 31)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
                    'background-color': '#ffd7a1',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        81: {
            title() {
                let t = "青铜斧"
                return t},
            display() {
                let d = `
                需要工具：青铜合成台<br>
                需要材料：64木头 + 125青铜锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：木头倍增器的底数x2，另外1241x木头获取<br>
                挖掘等级：2`
                return d
                },
            complexity: d(18000),
            canClick() {return player.crafting_table.points.gte(1) && player.wood.points.gte(64) && player.bronze.points.gte(125) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(72)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.wood.points = player.wood.points.sub(64),
                player.bronze.points = player.bronze.points.sub(125)
            },
            unlocked() {return hasUpgrade(ct, 32)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
                    'background-color': '#ffd7a1',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        82: {
            title() {
                let t = "青铜镐"
                return t},
            display() {
                let d = `
                需要工具：青铜合成台<br>
                需要材料：64木头 + 250青铜锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：挖掘速度x5，锡升级2的效果^2<br>
                挖掘等级：2`
                return d
                },
            complexity: d(25000),
            canClick() {return player.crafting_table.points.gte(1) && player.wood.points.gte(64) && player.bronze.points.gte(250) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(72)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.wood.points = player.wood.points.sub(64),
                player.bronze.points = player.bronze.points.sub(250)
            },
            unlocked() {return hasUpgrade(ct, 33)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
                    'background-color': '#ffd7a1',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        91: {
            title() {
                let t = "青铜外壳"
                return t},
            display() {
                let d = `
                需要工具：青铜合成台<br>
                需要材料：2000青铜锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                数量：${fw(player[ct].items[91])}<br>
                注意：此道具会因为合成而消耗`
                return d
                },
            complexity: d(36000),
            canClick() {return player.crafting_table.points.gte(1) && player.bronze.points.gte(2000) && !player.crafting_table.crafting && hasCraftingItem(72)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.bronze.points = player.bronze.points.sub(2000)
            },
            unlocked() {return hasUpgrade(ct, 34)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
                    'background-color': '#ffd7a1',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        92: {
            title() {
                let t = "2阶太阳能板"
                return t},
            display() {
                let d = `
                需要工具：青铜合成台<br>
                需要材料：200青铜锭 + 1青铜外壳 + 1080玻璃<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：RF发电速度x4，解锁更多自动化升级。以及，青铜力量`
                return d
                },
            complexity: d(72000),
            canClick() {return player.crafting_table.points.gte(1) && player.bronze.points.gte(200) && hasCraftingItem(91) && player.furnace.glass.gte(1080) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(72)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.bronze.points = player.bronze.points.sub(200),
                player.furnace.glass = player.furnace.glass.sub(1080),
                player.crafting_table.items[91] = player.crafting_table.items[91].sub(1)
            },
            unlocked() {return hasUpgrade(ct, 35)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        101: {
            title() {
                let t = "铁质合成台"
                return t},
            display() {
                let d = `
                需要工具：青铜合成台<br>
                需要材料：2e25木头 + 5铁锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：合成的速度x60`
                return d
                },
            complexity: d(144000),
            canClick() {return player.crafting_table.points.gte(2e25) && player.iron.points.gte(5) && !hasCraftingItem(this.id) && !player.crafting_table.crafting && hasCraftingItem(72)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.iron.points = player.iron.points.sub(5),
                player.crafting_table.points = player.crafting_table.points.sub(2e25)
            },
            unlocked() {return hasUpgrade(ct, 41)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        102: {
            title() {
                let t = "铁斧"
                return t},
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：64木头 + 5铁锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：3x撸树速度，获得10个“木头倍增器”的免费等级<br>
                挖掘等级：2`
                return d
                },
            complexity: d(720000),
            canClick() {return player.crafting_table.points.gte(1) && player.iron.points.gte(5) && player.wood.points.gte(64) && !hasCraftingItem(this.id) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.iron.points = player.iron.points.sub(5),
                player.wood.points = player.wood.points.sub(64)
            },
            unlocked() {return hasUpgrade(ct, 42)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        111: {
            title() {
                let t = "铁镐"
                return t},
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：64木头 + 6铁锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：3x挖掘速度，解锁新一个青铜力量生成器<br>
                挖掘等级：2`
                return d
                },
            complexity: d(2160000),
            canClick() {return player.crafting_table.points.gte(1) && player.iron.points.gte(6) && player.wood.points.gte(64) && !hasCraftingItem(this.id) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.iron.points = player.iron.points.sub(6),
                player.wood.points = player.wood.points.sub(64)
            },
            unlocked() {return hasUpgrade(ct, 43)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        112: {
            title() {
                let t = "虚空电炉MK.1"
                return t},
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：10铁锭 + 1青铜外壳 + 1080玻璃<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：虚空电炉，顾名思义，凭空产生熔炼物品。配方在红石通量页面解锁`
                return d
                },
            complexity: d(3240000),
            canClick() {return player.crafting_table.points.gte(1) && player.iron.points.gte(10) && hasCraftingItem(91) && player.furnace.glass.gte(1080) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.iron.points = player.iron.points.sub(10),
                player.furnace.glass = player.furnace.glass.sub(1080),
                player.crafting_table.items[91] = player.crafting_table.items[91].sub(1)
            },
            unlocked() {return hasUpgrade(ct, 44)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        121: {
            title() {
                let t = "3阶太阳能板"
                return t},
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：12铁锭 + 1青铜外壳 + 1080玻璃<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：RF发电速度x10，解锁更多自动化升级。可以查看第5行部分配方`
                return d
                },
            complexity: d(4000000),
            canClick() {return player.crafting_table.points.gte(1) && player.iron.points.gte(12) && hasCraftingItem(91) && player.furnace.glass.gte(1080) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.iron.points = player.iron.points.sub(12),
                player.furnace.glass = player.furnace.glass.sub(1080),
                player.crafting_table.items[91] = player.crafting_table.items[91].sub(1)
            },
            unlocked() {return hasUpgrade(ct, 45)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        122: {
            title() {
                let t = "铁桶"
                return t},
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：3铁锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：请前往铁层级新页面<br>
                数量：${fw(player[ct].items[122])}/27<br>`
                return d
                },
            complexity: d(5000000),
            canClick() {return player.crafting_table.points.gte(1) && player.iron.points.gte(3) && !player.crafting_table.crafting && player[ct].items[122].lt(27) && hasCraftingItem(101)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.iron.points = player.iron.points.sub(3)
            },
            unlocked() {return hasUpgrade(ct, 51)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        131: {
            title() {
                let t = "铁制探矿杖"
                return t},
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：450铁锭 + 250青铜锭 + 2160玻璃<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：找矿速度x3，允许你挖掘镍矿石，解锁镍升级`
                return d
                },
            complexity: d(8000000),
            canClick() {return player.crafting_table.points.gte(1) && player.iron.points.gte(450) && player.bronze.points.gte(250) && player.furnace.glass.gte(2160) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.iron.points = player.iron.points.sub(450),
                player.bronze.points = player.bronze.points.sub(250),
                player.furnace.glass = player.furnace.glass.sub(2160)
            },
            unlocked() {return hasUpgrade(ct, 52)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        132: {
            title() {
                let t = "镍镐"
                return t},
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：10镍锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：青铜力量的效果变为原来的^1.5`
                return d
                },
            complexity: d(10000000),
            canClick() {return player.crafting_table.points.gte(1) && player.nickel.points.gte(10) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.nickel.points = player.nickel.points.sub(10)
            },
            unlocked() {return hasUpgrade(ct, 53)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #fffcc0 0%, #f5f5d7 25%, #fffcc0 50%, #e3df94 75%, #8b8566 100%)",
                    'background-color': '#fffcc0',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        141: {
            title() {
                let t = "镍齿轮"
                return t},
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：4镍锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                数量：${fw(player[ct].items[141])}<br>`
                return d
                },
            complexity: d(5000000),
            canClick() {return player.crafting_table.points.gte(1) && player.nickel.points.gte(4) && !player.crafting_table.crafting && hasCraftingItem(101)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.nickel.points = player.nickel.points.sub(4)
            },
            unlocked() {return hasUpgrade(ct, 54)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #fffcc0 0%, #f5f5d7 25%, #fffcc0 50%, #e3df94 75%, #8b8566 100%)",
                    'background-color': '#fffcc0',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        142: {
            title() {
                let t = "镍机械挑战器"
                return t},
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：4镍齿轮 + 20镍锭 + 600玻璃 <br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：解锁镍层级的挑战`
                return d
                },
            complexity: d(15000000),
            canClick() {return player.crafting_table.points.gte(1) && player.nickel.points.gte(20) && player.crafting_table.items[141].gte(4) && player.furnace.glass.gte(600) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.nickel.points = player.nickel.points.sub(20),
                player.crafting_table.items[141] = player.crafting_table.items[141].sub(4),
                player.furnace.glass = player.furnace.glass.sub(600)
            },
            unlocked() {return hasUpgrade(ct, 55)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #fffcc0 0%, #f5f5d7 25%, #fffcc0 50%, #e3df94 75%, #8b8566 100%)",
                    'background-color': '#fffcc0',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        151: {
            title() {
                let t = "铝质合成台"
                return t},
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：33铝锭 + 1e295合成台（消耗） <br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：合成的速度x50`
                return d
                },
            complexity: d(25000000),
            canClick() {return player.crafting_table.points.gte(1e295) && player.aluminum.points.gte(33) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.aluminum.points = player.aluminum.points.sub(33),
                player.crafting_table.points = player.crafting_table.points.sub(1e295)
            },
            unlocked() {return hasUpgrade(ct, 61)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)",
                    'background-color': '#e2e3ee',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        152: {
            title() {
                let t = "铝斧"
                return t},
            display() {
                let d = `
                需要工具：铝质合成台<br>
                需要材料：25铝锭 + 300木头 <br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：允许在撸树时获得金合欢原木`
                return d
                },
            complexity: d(50000000),
            canClick() {return player.crafting_table.points.gte(1) && player.aluminum.points.gte(25) && player.wood.points.gte(300) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(151)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.aluminum.points = player.aluminum.points.sub(25),
                player.wood.points = player.wood.points.sub(300)
            },
            unlocked() {return hasUpgrade(ct, 62)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)",
                    'background-color': '#e2e3ee',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        161: {
            title() {
                let t = "铝镐"
                return t},
            display() {
                let d = `
                需要工具：铝质合成台<br>
                需要材料：32铝锭 + 300木头 <br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：青铜力量效果再次^1.5，铁锭熔炼倍率锁定为铁矿石数量的10%`
                return d
                },
            complexity: d(80000000),
            canClick() {return player.crafting_table.points.gte(1) && player.aluminum.points.gte(32) && player.wood.points.gte(300) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(151)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.aluminum.points = player.aluminum.points.sub(32),
                player.wood.points = player.wood.points.sub(300)
            },
            unlocked() {return hasUpgrade(ct, 63)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)",
                    'background-color': '#e2e3ee',
                }
            },
            marked() {return hasCraftingItem(this.id)},
        },
        162: {
            title() {
                let t = "铝机械臂"
                return t},
            display() {
                let d = `
                需要工具：铝质合成台<br>
                需要材料：48铝锭 + 16铁锭 <br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：解锁更多自动化和新的铝升级`
                return d
                },
            complexity: d(80000000),
            canClick() {return player.crafting_table.points.gte(1) && player.aluminum.points.gte(48) && player.iron.points.gte(16) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(151)},
            onClick() {
                player.crafting_table.crafting = true,
                player.crafting_table.craftingItem = this.id,
                player.aluminum.points = player.aluminum.points.sub(48),
                player.iron.points = player.iron.points.sub(16)
            },
            unlocked() {return hasUpgrade(ct, 64)},
            style() {
                return {
                    'min-height':'210px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)",
                    'background-color': '#e2e3ee',
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
        if (hasCraftingItem(51)) speed = speed.times(10)
        if (hasCraftingItem(72)) speed = speed.times(25)
        if (hasCraftingItem(101)) speed = speed.times(60)
        if (hasCraftingItem(151)) speed = speed.times(50)
        player[ct].speed = speed
        
        //更新最大页码
        if (tmp[ct].clickables[31].unlocked) player[ct].maxPage = 2
        if (tmp[ct].clickables[51].unlocked || tmp[ct].clickables[52].unlocked || tmp[ct].clickables[61].unlocked) player[ct].maxPage = 3
        if (tmp[ct].clickables[71].unlocked) player[ct].maxPage = 4
        if (tmp[ct].clickables[91].unlocked || tmp[ct].clickables[92].unlocked) player[ct].maxPage = 5
        if (tmp[ct].clickables[111].unlocked || tmp[ct].clickables[112].unlocked || tmp[ct].clickables[121].unlocked) player[ct].maxPage = 6
        if (tmp[ct].clickables[131].unlocked) player[ct].maxPage = 7
        if (tmp[ct].clickables[151].unlocked || tmp[ct].clickables[152].unlocked)  player[ct].maxPage = 8
        //
        if (player[ct].cooldown.gt(0)) player[ct].cooldown = player[ct].cooldown.sub(0.05)
        if (player[ct].cooldown.lte(0.05)) player[ct].cooldown = d(0)
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "main-display",
        ["row", ["prestige-button", "blank", ["display-text", () => `你同时最多拥有 ${formatWhole(player.crafting_table.best)} 合成台<br><br>合成有1秒冷却：${format(player.crafting_table.cooldown)}/1.00`]]],
        "blank",     
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "craft": {
                unlocked() {return tmp.crafting_table.layerShown},
                name() {return '合成'},
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
            "recipe": {
                unlocked() {return hasNormalAchievement(22)},
                name() {return '图纸'},
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ],
            },
            "milestones": {
                unlocked() {return tmp.crafting_table.layerShown},
                name() {return '里程碑'},
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
        },
    },
})

function isSmeltingItem() {
    return player.furnace.smelting
}

function stopSmelting() {
    player.furnace.smelting = false,
    player.furnace.smeltingItem = 0,
    player.furnace.temperature = d(20)
}

function smeltingItemName(id) {
    return tmp.furnace.clickables[id].title
}

function smeltingItemTemp(id) {
    return tmp.furnace.clickables[id].temperature
}

function smeltingItemID() {
    return player.furnace.smeltingItem
}

function smeltingItemColor(id) {
    return tmp.furnace.clickables[id].style['background-color']
}

function smeltResult(id) {
    return tmp.furnace.clickables[id].result
}

function isBurningFuel() {
    return player.furnace.burning
}

function hasEnoughFuel(id) {
    return tmp.furnace.clickables[id].correspondingFuel.gte(tmp.furnace.clickables[id].burnSpeed.div(20))
}

function stopBurning() {
    player.furnace.burning = false,
    player.furnace.fuel = 10000
}

function fuelMaxTemp(id) {
    return tmp.furnace.clickables[id].temperature
}

function fuelID() {
    return player.furnace.fuel
}

function fuelName(id) {
    return tmp.furnace.clickables[id].title
}
//制造层2：熔炉

addLayer("furnace", { 
    name: "furnace",
    position: 1003,
    row: 101,
    symbol: '熔炉', // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
        points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
        glass: d(0),
        charcoal: d(0),
        cooldown: d(0),
        speed: d(40),
        smelting: false,
        smeltingItem: 0, //0为凑数id
        burning: false,
        fuel: 10000, //10000为凑数id
        temperature: d(20),
        page: 1,
        maxPage: 1,
    }},
    color: "#4a4a4a",
    type: "normal",
    layerType: "craft",
    resource: "熔炉",
    baseResource() {return "石头"},
    baseAmount() {return player.stone.points},
    exponent: 0.05,
    requires: d(1414213),
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
    layerShown(){return hasNormalAchievement(25)},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.

    onPrestige() {
        return player.furnace.cooldown = d(1)
    },

    canReset() {
        return player.furnace.cooldown.lte(0) && player.stone.points.gte(1414213)
    },

    doReset(resettingLayer) {
        if (hasMilestone(furnace, 0)) return undefined
    },

    upgrades: {
        11: {
            title: "玻璃",
            description: "解锁玻璃的熔炼配方",
            currencyInternalName: "sand",
            currencyDisplayName: "沙子",
            currencyLayer: stone,
            cost() {return new ExpantaNum(9999)},
            unlocked(){return hasUpgrade(stone, 33)},
        },
        12: {
            title: "锡锭",
            description: "解锁锡锭的熔炼配方",
            currencyInternalName: "ore",
            currencyDisplayName: "锡矿石",
            currencyLayer: tin,
            cost() {return new ExpantaNum(5)},
            unlocked(){return hasUpgrade(copper, 25)},
        },
        13: {
            title: "木炭",
            description: "解锁木炭的熔炼配方以及现在可以木炭作为燃料",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() {return new ExpantaNum(15)},
            unlocked(){return hasUpgrade(iron, 14)},
        },
        14: {
            title: "铁锭",
            description: "解锁铁锭的熔炼配方",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() {return new ExpantaNum(15)},
            unlocked(){return hasUpgrade(iron, 14)},
        },
        15: {
            title: "镍锭",
            fullDisplay() {
                return `<h3>${this.title}</h3><br>解锁镍锭的熔炼配方<br><br>正在以熔岩作为燃料时，直接免费解锁`
            },
            cost() {return new ExpantaNum(0)},
            canAfford() {return fuelID() == 10004},
            unlocked(){return hasUpgrade(nickel, 14)},
        },
        21: {
            title: "铝锭",
            fullDisplay() {
                return `<h3>${this.title}</h3><br>解锁铝锭的熔炼配方<br><br>购买第5个铝升级后免费解锁`
            },
            cost() {return new ExpantaNum(0)},
            unlocked(){return hasUpgrade(aluminum, 15)},
        },
        22: {
            title: "铅锭",
            fullDisplay() {
                return `<h3>${this.title}</h3><br>解锁铅锭的熔炼配方<br><br>购买第5个铅升级后免费解锁`
            },
            cost() {return new ExpantaNum(0)},
            unlocked(){return hasUpgrade(lead, 15)},
        },
    },

    milestones: {
        0: {
            requirementDescription() {return `获得2熔炉`},
            effectDescription() {return `奖励：合成熔炉和合成台什么都不重置<br>重置过于繁琐，如果未来层级重置合成工具那会血压爆炸`},
            done() { return player.furnace.points.gte(2) },
            unlocked() {return true},
        },
    },

    clickables: {
        0: {
            temperature: d(20),
            style() {
                return {
                    'background-color':'rgba(0,0,0,0)',
                }
            },
            result() {return undefined},
        },
        11: {
            title() {
                let t = "铜锭"
                return t},
            display() {
                let d = `
                需要工具：1熔炉<br>
                需要材料：1铜矿石<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：1铜锭<br>
                倍率：${formatWhole(this.mult())}x`
                return d
                },
            temperature: d(800),
            mult() {
                let m = d(1)
                if (hasUpgrade(copper, 22)) m = m.times(upgradeEffect(copper, 22))
                if (hasUpgrade(tin, 14)) m = m.times(upgradeEffect(tin, 14))
                if (hasUpgrade(bronze, 13)) m = m.times(upgradeEffect(bronze, 13))
                if (hasMilestone(bronze, 3)) m = player.copper.ore.div(10).ceil().max(0)
                return m
            },
            result() {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                return player.copper.points = player.copper.points.add(this.mult().min(player.copper.ore)),
                player.copper.ore = player.copper.ore.sub(this.mult().min(player.copper.ore)),
                player.furnace.temperature = d(20)
                if (player.copper.ore.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() {return player.copper.ore.gte(1) && player.furnace.burning && !player.furnace.smelting},
            onClick() {
                player.furnace.smelting = true,
                player.furnace.smeltingItem = this.id
            },
            unlocked() {return tmp.furnace.layerShown},
            style() {
                return {
                    'min-height':'180px',
                    'width':'180px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                    'background-color': '#ffb41d',
                }
            },
        },
        12: {
            title() {
                let t = "玻璃"
                return t},
            display() {
                let d = `
                需要工具：20熔炉<br>
                需要材料：1沙子<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：1玻璃<br>
                倍率：${formatWhole(this.mult())}x`
                return d
                },
            temperature: d(150),
            mult() {
                let m = d(1)
                if (hasUpgrade(copper, 24)) m = m.times(upgradeEffect(copper, 24))
                return m
            },
            result() {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                return player.furnace.glass = player.furnace.glass.add(this.mult().min(player.stone.sand)),
                player.stone.sand = player.stone.sand.sub(this.mult().min(player.stone.sand)),
                player.furnace.temperature = d(20)
                if (player.stone.sand.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() {return player.stone.sand.gte(1) && player.furnace.burning && !player.furnace.smelting},
            onClick() {
                player.furnace.smelting = true,
                player.furnace.smeltingItem = this.id
            },
            unlocked() {return hasUpgrade(furnace, 11)},
            style() {
                return {
                    'min-height':'180px',
                    'width':'180px',
                    'background-color':'#a2cfd6',
                }
            },
        },
        13: {
            title() {
                let t = "锡锭"
                return t},
            display() {
                let d = `
                需要工具：1熔炉<br>
                需要材料：1锡矿石<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：1锡锭<br>
                倍率：${formatWhole(this.mult())}x`
                return d
                },
            temperature: d(960),
            mult() {
                let m = d(1)
                if (hasUpgrade(bronze, 14)) m = m.times(upgradeEffect(bronze, 14))
                if (hasMilestone(bronze, 1)) m = player.tin.ore.div(10).ceil().max(0)
                return m
            },
            result() {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                return player.tin.points = player.tin.points.add(this.mult().min(player.tin.ore)),
                player.tin.ore = player.tin.ore.sub(this.mult().min(player.tin.ore)),
                player.furnace.temperature = d(20)
                if (player.tin.ore.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() {return player.tin.ore.gte(1) && player.furnace.burning && !player.furnace.smelting},
            onClick() {
                player.furnace.smelting = true,
                player.furnace.smeltingItem = this.id
            },
            unlocked() {return hasUpgrade(furnace, 12)},
            style() {
                return {
                    'min-height':'180px',
                    'width':'180px',
                    "background": "linear-gradient(45deg, #c4dce1 0%, #d3e4e4 100%)",
                    'background-color': '#c4dce1'
                }
            },
        },
        14: {
            title() {
                let t = "木炭"
                return t},
            display() {
                let d = `
                需要工具：1熔炉<br>
                需要材料：1木头<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：1木炭<br>
                倍率：${formatWhole(this.mult())}x`
                return d
                },
            temperature: d(800),
            mult() {
                let m = d(100)
                return m
            },
            result() {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                return player.furnace.charcoal = player.furnace.charcoal.add(this.mult().min(player.wood.points)),
                player.wood.points = player.wood.points.sub(this.mult().min(player.wood.points)),
                player.furnace.temperature = d(20)
                if (player.wood.points.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() {return player.wood.points.gte(1) && player.furnace.burning && !player.furnace.smelting},
            onClick() {
                player.furnace.smelting = true,
                player.furnace.smeltingItem = this.id
            },
            unlocked() {return hasUpgrade(furnace, 13)},
            style() {
                return {
                    'min-height':'180px',
                    'width':'180px',
                    'background-color':'#2b261d',
                    'color':'white'
                }
            },
        },
        15: {
            title() {
                let t = "铁锭"
                return t},
            display() {
                let d = `
                需要工具：1熔炉<br>
                需要材料：1铁矿石<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：1铁锭<br>
                倍率：${formatWhole(this.mult())}x`
                return d
                },
            temperature: d(1930),
            mult() {
                let m = d(1)
                if (hasUpgrade(iron, 22)) m = m.times(upgradeEffect(iron, 22))
                if (hasUpgrade(nickel, 22)) m = m.times(challengeEffect(nickel, 12))
                if (hasUpgrade(nickel, 24)) m = m.times(upgradeEffect(nickel, 24))
                if (hasCraftingItem(161)) m = player.iron.ore.max(0).div(10)
                return m
            },
            result() {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                return player.iron.points = player.iron.points.add(this.mult().min(player.iron.ore)),
                player.iron.ore = player.iron.ore.sub(this.mult().min(player.iron.ore)),
                player.furnace.temperature = d(20)
                if (player.iron.ore.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() {return player.iron.ore.gte(1) && player.furnace.burning && !player.furnace.smelting},
            onClick() {
                player.furnace.smelting = true,
                player.furnace.smeltingItem = this.id
            },
            unlocked() {return hasUpgrade(furnace, 14)},
            style() {
                return {
                    'min-height':'180px',
                    'width':'180px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
        },
        21: {
            title() {
                let t = "镍锭"
                return t},
            display() {
                let d = `
                需要工具：1熔炉<br>
                需要材料：1镍矿石<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：1镍锭<br>
                倍率：${formatWhole(this.mult())}x`
                return d
                },
            temperature: d(2160),
            mult() {
                let m = d(1)
                if (hasUpgrade(nickel, 22)) m = m.times(challengeEffect(nickel, 12))
                if (hasUpgrade(aluminum, 23)) m = m.times(upgradeEffect(aluminum, 23))
                return m
            },
            result() {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                return player.nickel.points = player.nickel.points.add(this.mult().min(player.nickel.ore)),
                player.nickel.ore = player.nickel.ore.sub(this.mult().min(player.nickel.ore)),
                player.furnace.temperature = d(20)
                if (player.nickel.ore.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() {return player.nickel.ore.gte(1) && player.furnace.burning && !player.furnace.smelting},
            onClick() {
                player.furnace.smelting = true,
                player.furnace.smeltingItem = this.id
            },
            unlocked() {return hasUpgrade(furnace, 15)},
            style() {
                return {
                    'min-height':'180px',
                    'width':'180px',
                    "background": "linear-gradient(45deg, #fffcc0 0%, #f5f5d7 25%, #fffcc0 50%, #e3df94 75%, #8b8566 100%)",
                    'background-color': '#fffcc0',
                }
            },
        },
        22: {
            title() {
                let t = "铝锭"
                return t},
            display() {
                let d = `
                需要工具：1熔炉<br>
                需要材料：1铝矿石<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：1铝锭<br>
                倍率：${formatWhole(this.mult())}x`
                return d
                },
            temperature: d(2340),
            mult() {
                let m = d(1)
                if (hasUpgrade(aluminum, 21)) m = m.times(50)
                return m
            },
            result() {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                return player.aluminum.points = player.aluminum.points.add(this.mult().min(player.aluminum.ore)),
                player.aluminum.ore = player.aluminum.ore.sub(this.mult().min(player.aluminum.ore)),
                player.furnace.temperature = d(20)
                if (player.aluminum.ore.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() {return player.aluminum.ore.gte(1) && player.furnace.burning && !player.furnace.smelting},
            onClick() {
                player.furnace.smelting = true,
                player.furnace.smeltingItem = this.id
            },
            unlocked() {return hasUpgrade(furnace, 21)},
            style() {
                return {
                    'min-height':'180px',
                    'width':'180px',
                    "background": "linear-gradient(45deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)",
                    'background-color': '#e2e3ee',
                }
            },
        },
        23: {
            title() {
                let t = "铅锭"
                return t},
            display() {
                let d = `
                需要工具：1熔炉<br>
                需要材料：1铅矿石<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：1铅锭<br>
                倍率：${formatWhole(this.mult())}x`
                return d
                },
            temperature: d(2700),
            mult() {
                let m = d(1)
                
                return m
            },
            result() {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                return player.lead.points = player.lead.points.add(this.mult().min(player.lead.ore)),
                player.lead.ore = player.lead.ore.sub(this.mult().min(player.lead.ore)),
                player.furnace.temperature = d(20)
                if (player.lead.ore.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() {return player.lead.ore.gte(1) && player.furnace.burning && !player.furnace.smelting},
            onClick() {
                player.furnace.smelting = true,
                player.furnace.smeltingItem = this.id
            },
            unlocked() {return hasUpgrade(furnace, 22)},
            style() {
                return {
                    'min-height':'180px',
                    'width':'180px',
                    "background": "linear-gradient(45deg, #667397 0%, #acc0ff 20%, #97a9e0 50%, #6a7392 80%, #333848 100%)",
                    'background-color': '#97a9e0',
                }
            },
        },
        //燃料
        10000: {
            temperature: d(20),
            burnSpeed: d(0),
            correspondingFuel() {return player.points},
        },
        10001: {
            title() {
                let t = "木头"
                return t},
            display() {
                let d = `
                消耗速度：${formatWhole(this.burnSpeed)}/秒<br>
                温度上限：${formatWhole(this.temperature)}<br>`
                return d
                },
            burnSpeed: d(100),
            temperature: d(1000),
            correspondingFuel() {return player.wood.points},
            canClick() {return player.wood.points.gte(100) && player.furnace.points.gte(1) && !player.furnace.burning},
            onClick() {
                player.furnace.burning = true,
                player.furnace.fuel = this.id
            },
            unlocked() {return tmp.furnace.layerShown},
            style() {
                return {
                    'min-height':'120px',
                    'width':'120px',
                    'background-color':'#b8945e',
                }
            },
        },
        10002: {
            title() {
                let t = "煤炭"
                return t},
            display() {
                let d = `
                消耗速度：${formatWhole(this.burnSpeed)}/秒<br>
                温度上限：${formatWhole(this.temperature)}<br>`
                return d
                },
            burnSpeed: d(50),
            temperature: d(1800),
            correspondingFuel() {return player.stone.coal},
            canClick() {return player.stone.coal.gte(50) && player.furnace.points.gte(1) && !player.furnace.burning},
            onClick() {
                player.furnace.burning = true,
                player.furnace.fuel = this.id
            },
            unlocked() {return hasUpgrade(stone, 35)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'120px',
                    'background-color':'#2e2e2e',
                    'color':'#ffffff',
                }
            },
        },
        10003: {
            title() {
                let t = "木炭"
                return t},
            display() {
                let d = `
                消耗速度：${formatWhole(this.burnSpeed)}/秒<br>
                温度上限：${formatWhole(this.temperature)}<br>`
                return d
                },
            burnSpeed: d(50),
            temperature: d(2100),
            correspondingFuel() {return player.furnace.charcoal},
            canClick() {return player.furnace.charcoal.gte(50) && player.furnace.points.gte(1) && !player.furnace.burning},
            onClick() {
                player.furnace.burning = true,
                player.furnace.fuel = this.id
            },
            unlocked() {return hasUpgrade(furnace, 13)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'120px',
                    'background-color':'#2b261d',
                    'color':'#ffffff',
                }
            },
        },
        10004: {
            title() {
                let t = "熔岩"
                return t},
            display() {
                let d = `
                消耗速度：${formatWhole(this.burnSpeed)}mB/秒<br>
                冷却消耗：${fw(5000)}mB水/秒<br>
                温度上限：${formatWhole(this.temperature)}`
                return d
                },
            burnSpeed: d(500),
            temperature: d(3200),
            correspondingFuel() {return player.iron.lava},
            canClick() {return player.iron.lava.gte(500) && player.iron.water.gte(5000) && player.furnace.points.gte(1) && !player.furnace.burning},
            onClick() {
                player.furnace.burning = true,
                player.furnace.fuel = this.id
            },
            unlocked() {return hasUpgrade(nickel, 14)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'120px',
                    'background-color':'#d76013',
                }
            },
        },
        20001:{
            display() {
                let d = `取消熔炼`
                return d
            },
            canClick() {return isSmeltingItem()},
            onClick() {
                stopSmelting()
            },
            style() {
                return {
                    'min-height':'50px',
                    'width':'120px',
                    'font-size':'20px'
                }
            },  
        },
        20011:{
            display() {
                let d = `取出燃料`
                return d
            },
            canClick() {return isBurningFuel()},
            onClick() {
                stopSmelting(),
                stopBurning(),
                stopAlloying()
            },
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
        smelt: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {
                let temp = smeltingItemTemp(smeltingItemID())
                if (!isSmeltingItem()) temp = d(20)
                return `进度: ${format(player.furnace.temperature)}/${format(temp)}`
            },
            progress() {
                let temp = smeltingItemTemp(smeltingItemID())
                let p = player.furnace.temperature.sub(20).div(temp.sub(20)) 
                if (!isSmeltingItem()) p = d(0)
                return p
                },
            unlocked() {return tmp.furnace.layerShown},
            fillStyle() {return {"background-color":smeltingItemColor(smeltingItemID())}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
        },
    },

    update() {
        if (isSmeltingItem() && player.furnace.temperature.lt(fuelMaxTemp(fuelID()).sub(player.furnace.speed.div(tick)))) player.furnace.temperature = player.furnace.temperature.add(player.furnace.speed.div(tick))
        if (player.furnace.temperature.gte(fuelMaxTemp(fuelID()).sub(player.furnace.speed.div(tick)))) player.furnace.temperature = fuelMaxTemp(fuelID())

        if (!hasEnoughFuel(fuelID())) stopSmelting(), stopBurning(), stopAlloying()
            
        //熔炼速度
        let speed = d(40)
        if (hasCraftingItem(52)) speed = speed.times(10)
        if (hasUpgrade(aluminum, 22)) speed = speed.times(1.5)
        player.furnace.speed = speed
            
        //燃料消耗

        if (player.furnace.fuel == 10001) player.wood.points = player.wood.points.sub(tmp.furnace.clickables[10001].burnSpeed.div(tick))
        if (player.furnace.fuel == 10002) player.stone.coal = player.stone.coal.sub(tmp.furnace.clickables[10002].burnSpeed.div(tick))
        if (player.furnace.fuel == 10003) player.furnace.charcoal = player.furnace.charcoal.sub(tmp.furnace.clickables[10003].burnSpeed.div(tick))
        if (player.furnace.fuel == 10004) player.iron.lava = player.iron.lava.sub(tmp.furnace.clickables[10004].burnSpeed.div(tick)),
        player.iron.water = player.iron.water.sub(d(5000).div(tick))

        //更新最大页码
        // if (tmp[ct].clickables[31].unlocked) player[ct].maxPage = 2

        //最多有
        if (player.furnace.points.gte(player.furnace.best)) player.furnace.best = player.furnace.points
        if (player.furnace.cooldown.gt(0)) player.furnace.cooldown = player.furnace.cooldown.sub(0.05)
        if (player.furnace.cooldown.lte(0.05)) player.furnace.cooldown = d(0)
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "main-display",
        ["row", ["prestige-button", "blank", ["display-text", () => `你同时最多拥有 ${formatWhole(player.furnace.best)} 熔炉<br><br>合成有1秒冷却：${format(player.furnace.cooldown)}/1.00`]]],
        "blank",     
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "smelt": {
                unlocked() {return tmp.furnace.layerShown},
                name() {return '熔炼'},
                content: [
                    ["blank", "15px"],
                    "blank",
                    ["display-text", function() { 
                        let d = `你正在熔炼 ${smeltingItemName(smeltingItemID())}`
                        if (!isSmeltingItem()) d = `你当前不在熔炼`
                        return d
                     }],
                    "blank",
                    ["row",[["bar", "smelt"], ["clickables", [2000]]]],
                    "blank",
                    ["clickables", function() {return [1, 2]}],
                    ["display-text", function() { return `熔炼（升温）速度：${format(player.furnace.speed)}/秒` }],
                    "blank",
                    ["display-text", function() { return `一般情况下，熔炼时只会消耗材料，不会消耗工具` }],
                    ["display-text", function() { return `而特殊情况下会进行额外标注` }],
                    ["display-text", function() { return `熔炼完成会自动开始下一次熔炼，直到材料用完` }],
                    ["display-text", function() { return `你需要消耗燃料才能开始熔炼，请注意对应燃料的温度上限，如果温度上限不足以熔炼对应材料是无法完成熔炼的` }],
                    ["display-text", function() { return `熔炼倍率如果过大以至于材料不足会一次性消耗所有材料，直到不足以熔炼1份的量` }],
                ]
            },
            "fuel": {
                unlocked() {return tmp.furnace.layerShown},
                name() {return '燃料'},
                content: [
                    ["blank", "15px"],
                    ["display-text", function() { 
                        let d = `当前正在消耗 ${fuelName(fuelID())} 作为燃料`
                        if (!isBurningFuel()) d = `当前不在消耗燃料`
                        return d
                     }],
                    "blank",
                    ["clickables", [2001]],
                    "blank",
                    ["clickables", function() {return [1000, 1001]}],
                    ["display-text", function() { return `熔炼（升温）速度：${format(player.furnace.speed)}/秒` }],
                    "blank",
                    ["display-text", function() { return `只有正在熔炼时才会提升温度` }],
                    ["display-text", function() { return `你必须放入至少能支持消耗1秒的燃料` }],
                    ["display-text", function() { return `如果不手动取出燃料将会一直消耗直到只剩下1秒的消耗量为止` }],
                ]
            },
            "milestones": {
                unlocked() {return tmp.furnace.layerShown},
                name() {return '里程碑'},
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
            "recipe": {
                unlocked() {return hasUpgrade(stone, 33)},
                name() {return '配方'},
                content: [
                    ["blank", "15px"],
                    ["display-text", function() {if (hasUpgrade(furnace, 11)) return `你有 ${textStyle_h2(formatWhole(player.furnace.glass), 'a2cfd6')} 玻璃`}], 
                    ["display-text", function() {if (hasUpgrade(furnace, 13)) return `你有 ${textStyle_h2(formatWhole(player.furnace.charcoal), '2b261d', 'ffffff')} 木炭`}], 
                    "upgrades",
                ],
            },
        },
    },
})

function isAlloyingItem() {
    return player.alloy_s.alloying
}

function stopAlloying() {
    player.alloy_s.alloying = false,
    player.alloy_s.alloyingItem = 0,
    player.alloy_s.temperature = d(20)
}

function alloyingItemName(id) {
    return tmp.alloy_s.clickables[id].title
}

function alloyingItemTemp(id) {
    return tmp.alloy_s.clickables[id].temperature
}

function alloyingItemID() {
    return player.alloy_s.alloyingItem
}

function alloyingItemColor(id) {
    return tmp.alloy_s.clickables[id].style['background-color']
}

function alloyResult(id) {
    return tmp.alloy_s.clickables[id].result
}


//制造层3：合金炉
addLayer("alloy_s", { 
    name: "alloy_s",
    position: 1004,
    row: 101,
    symbol: '合金炉', // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
        points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
        cooldown: d(0),
        speed: d(40),
        alloying: false,
        alloyingItem: 0, //0为凑数id
        temperature: d(20),
        page: 1,
        maxPage: 1,
    }},
    color: "#40464d",
    type: "normal",
    layerType: "craft",
    resource: "合金炉",
    baseResource() {return "锡锭"},
    baseAmount() {return player.tin.points},
    exponent: 0.3,
    requires: d(30),
    tooltip(){return false},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        m = d(1)
        return m
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        e = d(1)
        return e
    },
    resetDescription: "合成获得 ",
    layerShown(){return hasNormalAchievement(36)},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.

    onPrestige() {
        return player.alloy_s.cooldown = d(1)
    },

    canReset() {
        return player.alloy_s.cooldown.lte(0) && player.tin.points.gte(30)
    },

    doReset(resettingLayer) {
        return undefined
    },

    upgrades: {
        11: {
            title: "青铜",
            description: "解锁青铜锭的合金配方及其层级页面",
            cost() {return new ExpantaNum(1)},
            unlocked(){return tmp.alloy_s.layerShown},
        },
    },

    clickables: {
        0: {
            temperature: d(20),
            style() {
                return {
                    'background-color':'rgba(0,0,0,0)',
                }
            },
            result() {return undefined},
        },
        11: {
            title() {
                let t = "青铜锭"
                return t},
            display() {
                let d = `
                需要工具：1合金炉<br>
                需要材料：3铜锭 + 1锡锭<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：4青铜锭<br>
                倍率：${formatWhole(this.mult())}x`
                return d
                },
            temperature: d(1250),
            mult() {
                let m = d(1)
                if (hasUpgrade(bronze, 15)) m = m.times(upgradeEffect(bronze, 15))
                if (hasUpgrade(bronze, 22)) m = player.copper.points.max(0).div(30).min(player.tin.points.max(0).div(10)).ceil()
                return m
            },
            result() {
                if (player.alloy_s.temperature.gte(alloyingItemTemp(alloyingItemID())) && isAlloyingItem() && alloyingItemID() == this.id)
                player.bronze.points = player.bronze.points.add(this.mult().min(player.tin.points.times(4)).times(4)),
                player.copper.points = player.copper.points.sub(this.mult().times(3).min(player.copper.ore)),
                player.tin.points = player.tin.points.sub(this.mult().min(player.copper.ore)),
                player.alloy_s.temperature = d(20)
                if ((player.copper.points.lt(d(3).times(this.mult())) || player.tin.points.lt(d(1).times(this.mult()))) && alloyingItemID() == this.id) stopAlloying()
            },
            canClick() {return player.copper.points.gte(3) && player.tin.points.gte(1) && player.furnace.burning && !player.alloy_s.alloying},
            onClick() {
                player.alloy_s.alloying = true,
                player.alloy_s.alloyingItem = this.id
            },
            unlocked() {return hasUpgrade(alloy_s, 11)},
            style() {
                return {
                    'min-height':'180px',
                    'width':'180px',
                    "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
                    'background-color': '#ffd7a1',
                }
            },
        },
        20001:{
            display() {
                let d = `取消合金`
                return d
            },
            canClick() {return isAlloyingItem()},
            onClick() {
                stopAlloying()
            },
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
        alloy: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() {
                let temp = alloyingItemTemp(alloyingItemID())
                if (!isAlloyingItem()) temp = d(20)
                return `进度: ${format(player.alloy_s.temperature)}/${format(temp)}`
            },
            progress() {
                let temp = alloyingItemTemp(alloyingItemID())
                let p = player.alloy_s.temperature.sub(20).div(temp.sub(20)) 
                if (!isAlloyingItem()) p = d(0)
                return p
                },
            unlocked() {return tmp.alloy_s.layerShown},
            fillStyle() {return {"background-color":alloyingItemColor(alloyingItemID())}},
            baseStyle() {return {"background-color":"rgba(0,0,0,0)"}},
        },
    },

    update() {
        if (isAlloyingItem() && player.alloy_s.temperature.lt(fuelMaxTemp(fuelID()).sub(player.furnace.speed.div(tick)))) player.alloy_s.temperature = player.alloy_s.temperature.add(player.furnace.speed.div(tick))
        if (player.alloy_s.temperature.gte(fuelMaxTemp(fuelID()).sub(player.furnace.speed.div(tick)))) player.alloy_s.temperature = fuelMaxTemp(fuelID())
            
        //更新最大页码
        // if (tmp[ct].clickables[31].unlocked) player[ct].maxPage = 2

        //最多有
        if (player.alloy_s.points.gte(player.alloy_s.best)) player.alloy_s.best = player.alloy_s.points
        if (player.alloy_s.cooldown.gt(0)) player.alloy_s.cooldown = player.alloy_s.cooldown.sub(0.05)
        if (player.alloy_s.cooldown.lte(0.05)) player.alloy_s.cooldown = d(0)
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "main-display",
        ["row", ["prestige-button", "blank", ["display-text", () => `你同时最多拥有 ${formatWhole(player.alloy_s.best)} 合金炉<br><br>合成有1秒冷却：${format(player.alloy_s.cooldown)}/1.00`]]],
        "blank",     
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "smelt": {
                unlocked() {return tmp.alloy_s.layerShown},
                name() {return '合金'},
                content: [
                    ["blank", "15px"],
                    "blank",
                    ["display-text", function() { 
                        let d = `你正在合金 ${alloyingItemName(alloyingItemID())}`
                        if (!isAlloyingItem()) d = `你当前不在合金`
                        return d
                     }],
                    "blank",
                    ["row",[["bar", "alloy"], ["clickables", [2000]]]],
                    "blank",
                    ["clickables", function() {return [1, 2]}],
                    ["display-text", function() { return `合金（升温）速度：${format(player.furnace.speed)}/秒 （和熔炼页面一致）` }],
                    "blank",
                    ["display-text", function() { return `合金完成会自动开始下一次合金，直到材料用完` }],
                    ["display-text", function() { return `你需要消耗燃料才能开始合金，请注意对应燃料的温度上限，如果温度上限不足以熔炼对应材料是无法完成合金的` }],                ]
            },
            "milestones": {
                unlocked() {return tmp.alloy_s.layerShown},
                name() {return '里程碑'},
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
            "recipe": {
                unlocked() {return tmp.alloy_s.layerShown},
                name() {return '配方'},
                content: [
                    ["blank", "15px"], 
                    "upgrades",
                ],
            },
        },
    },
})

addLayer("energy", {
    name: "energy",
    position: 2001,
    row: 201,
    symbol() {return  '↓ 能源 ↓'},
    small: true,// Set true to generate a slightly different layer
    nodeStyle: {"font-size": "15px", "height": "30px"},// Change layer button' style
    startData() { return {
        unlocked: true,
        points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
    }},
    color: "#fefefe",
    type: "none",
    tooltip(){return false},
    layerShown(){return hasNormalAchievement(33)},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
	tabFormat: [
        ["display-text", function() { return getPointsDisplay() }]
    ],
})

function RFAutobuyerActivated(id) {
    return player.rf.autobuyer[id]
}

//能源层1：红石通量
addLayer("rf", { 
    name: "rf",
    position: 2002,
    row: 201,
    symbol: '红石通量', // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
        points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
        autobuyer: {
            
        },
    
    }},
    color: "#fc0000",
    type: "none",
    layerType: "energy",
    resource: "RF",
    baseResource() {return "石头"},
    baseAmount() {return player.stone.points},
    exponent: 0.05,
    requires: d(1414213),
    tooltip(){return false},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        m = d(0)
        if (hasCraftingItem(61)) m = m.add(15)
        if (hasUpgrade(rf, 11)) m = m.times(3)
        if (hasCraftingItem(92)) m = m.times(4)
        if (hasUpgrade(rf, 13)) m = m.times(3)
        if (hasCraftingItem(121)) m = m.times(10)
        return m
    },
    netGrowth() {
        let g = tmp.rf.gainMult
        if (RFAutobuyerActivated(11)) g = g.sub(3)
        if (RFAutobuyerActivated(12)) g = g.sub(3)
        if (RFAutobuyerActivated(13)) g = g.sub(3)
        if (RFAutobuyerActivated(14)) g = g.sub(3)
        if (RFAutobuyerActivated(15)) g = g.sub(300)
        if (RFAutobuyerActivated(21)) g = g.sub(8)
        if (RFAutobuyerActivated(22)) g = g.sub(8)
        if (RFAutobuyerActivated(23)) g = g.sub(8)
        if (RFAutobuyerActivated(24)) g = g.sub(16)
        if (RFAutobuyerActivated(31)) g = g.sub(128)
        if (RFAutobuyerActivated(32)) g = g.sub(192)
        if (RFAutobuyerActivated(33)) g = g.sub(768)

        if (RFAutobuyerActivated(10001)) g = g.sub(66)
        if (RFAutobuyerActivated(10002)) g = g.sub(66)
        if (RFAutobuyerActivated(10003)) g = g.sub(66)
        if (RFAutobuyerActivated(10004)) g = g.sub(1440)
        return g
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        e = d(1)
        return e
    },
    layerShown(){return hasNormalAchievement(33)},// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.


    doReset(resettingLayer) {
        return undefined
    },

    upgrades: {
        11: {
            title: "太阳能板：青铜改良",
            description: "RF发电速度x3",
            currencyInternalName: "points",
            currencyDisplayName: "青铜锭",
            currencyLayer: bronze,
            cost() {return new ExpantaNum(4)},
            unlocked(){return hasNormalAchievement(37)},
        },
        12: {
            title: "煤炭矿机",
            description: "解锁自动挖掘煤炭",
            currencyInternalName: "points",
            currencyDisplayName: "青铜锭",
            currencyLayer: bronze,
            cost() {return new ExpantaNum(12)},
            unlocked(){return hasNormalAchievement(37)},
        },
        13: {
            title: "太阳能板：铁矿石改良",
            description: "RF发电速度x3",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() {return new ExpantaNum(3)},
            unlocked(){return hasNormalAchievement(46)},
        },
        14: {
            title: "锡矿石矿机",
            description: "解锁自动挖掘锡矿石",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() {return new ExpantaNum(5)},
            unlocked(){return hasNormalAchievement(46)},
        },
        15: {
            title: "丛林树场",
            description: "解锁自动砍伐丛林原木",
            cost() {return new ExpantaNum(1e8)},
            unlocked(){return hasCraftingItem(121)},
        },
        21: {
            title: "虚空熔炼铜锭",
            description: "解锁自动熔炼铜矿石",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() {return new ExpantaNum(20)},
            unlocked(){return hasCraftingItem(112)},
        },
        22: {
            title: "虚空熔炼锡锭",
            description: "解锁自动熔炼锡矿石",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() {return new ExpantaNum(20)},
            unlocked(){return hasCraftingItem(112)},
        },
        23: {
            title: "虚空熔炼木炭",
            description: "解锁自动熔炼木炭",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() {return new ExpantaNum(20)},
            unlocked(){return hasCraftingItem(112)},
        },
        31: {
            title: "铁矿石矿机",
            description: "解锁自动挖掘铁矿石",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            cost() {return new ExpantaNum(999)},
            unlocked(){return hasCraftingItem(162)},
        },
        32: {
            title: "虚空合金青铜锭",
            description: "解锁自动合金青铜锭",
            currencyInternalName: "ore",
            currencyDisplayName: "铅矿石",
            currencyLayer: lead,
            cost() {return new ExpantaNum(1)},
            unlocked(){return hasCraftingItem(162)},
        },
    },

    clickables: {
        11: {
            title() {
                let t = "自动树场-木头"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：3 RF/t<br>
                效果：每秒自动获取一次撸树的木头的100%<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(3)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.wood.points = player.wood.points.add(tmp.wood.gainMult.div(tick))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return tmp.rf.layerShown},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    'background-color':'#b8945e',
                }
            },
        },
        12: {
            title() {
                let t = "自动树场-橡木原木"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：3 RF/t<br>
                效果：每秒自动获取一次撸树的橡木原木的100%<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(3)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.wood.oak = player.wood.oak.add(tmp.wood.logGain.oak.div(tick))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return tmp.rf.layerShown},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    'background-color':'#b8945e',
                }
            },
        },
        13: {
            title() {
                let t = "自动树场-云杉原木"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：3 RF/t<br>
                效果：每秒自动获取一次撸树的云杉原木的100%<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(3)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.wood.spruce = player.wood.spruce.add(tmp.wood.logGain.spruce.div(tick))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return tmp.rf.layerShown},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    'background-color':'#826038',
                }
            },
        },
        14: {
            title() {
                let t = "自动树场-白桦原木"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：3 RF/t<br>
                效果：每秒自动获取一次撸树的白桦原木的100%<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(3)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.wood.birch = player.wood.birch.add(tmp.wood.logGain.birch.div(tick))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return tmp.rf.layerShown},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    'background-color':'#ceb77c',
                }
            },
        },
        15: {
            title() {
                let t = "自动树场-丛林原木"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：300 RF/t<br>
                效果：每秒自动获取一次撸树的丛林原木的100%<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(300)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.wood.jungle = player.wood.jungle.add(tmp.wood.logGain.jungle.div(tick))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return hasUpgrade(rf, 15)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    'background-color':'#9f844d',
                }
            },
        },
        21: {
            title() {
                let t = "刷石机"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：8 RF/t<br>
                效果：每秒自动获取一次挖掘石头的100%<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(8)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.stone.points = player.stone.points.add(tmp.stone.gainMult.div(tick))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return hasNormalAchievement(37)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    'background-color':'#4a4a4a',
                    'color':'white',
                }
            },
        },
        22: {
            title() {
                let t = "自动矿机-泥土"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：8 RF/t<br>
                效果：每秒自动获取一次挖掘石头的泥土的100%<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(8)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.stone.dirt = player.stone.dirt.add(tmp.stone.otherGain.dirt.div(tick))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return hasNormalAchievement(37)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    'background-color':'#5f452f',
                    'color':'white',
                }
            },
        },
        23: {
            title() {
                let t = "自动矿机-沙子"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：8 RF/t<br>
                效果：每秒自动获取一次挖掘石头的沙子的100%<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(8)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.stone.sand = player.stone.sand.add(tmp.stone.otherGain.sand.div(tick))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return hasNormalAchievement(37)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    'background-color':'#d6cf97',
                }
            },
        },
        24: {
            title() {
                let t = "自动矿机-煤炭"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：16 RF/t<br>
                效果：每秒自动获取一次挖掘石头的煤炭的100%<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(16)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.stone.coal = player.stone.coal.add(tmp.stone.otherGain.coal.div(tick))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return hasUpgrade(rf, 12)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    'background-color':'#1e1e1e',
                    'color':'white',
                }
            },
        },
        31: {
            title() {
                let t = "自动矿机-铜矿石"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：128 RF/t<br>
                效果：每秒自动获取一次挖掘铜矿石的10%<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(128)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.copper.ore = player.copper.ore.add(tmp.copper.gainMult.div(10).div(tick))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return hasCraftingItem(92)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                }
            },
        },
        32: {
            title() {
                let t = "自动矿机-锡矿石"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：192 RF/t<br>
                效果：每秒自动获取一次挖掘锡矿石的10%<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(192)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.tin.ore = player.tin.ore.add(tmp.tin.gainMult.div(10).div(tick))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return hasUpgrade(rf, 14)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #c4dce1 0%, #d3e4e4 100%)",
                }
            },
        },
        33: {
            title() {
                let t = "自动矿机-铁矿石"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：768 RF/t<br>
                效果：每秒自动获取一次挖掘铁矿石的100%<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(768)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.iron.ore = player.iron.ore.add(tmp.iron.gainMult.div(tick))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return hasUpgrade(rf, 31)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                }
            },
        },
        //自动熔炼
        10001: {
            title() {
                let t = "虚空熔炼-铜锭"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：66 RF/t<br>
                效果：每个游戏刻（tick）自动熔炼一次当前拥有的铜矿石的0.5%，且不消耗铜矿石，但不能超过当前铜矿石总量<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(66)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id) && player.copper.points.lt(player.copper.ore)) return player.copper.points = player.copper.points.add(player.copper.ore.div(200))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return hasUpgrade(rf, 21)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                }
            },
        },
        10002: {
            title() {
                let t = "虚空熔炼-锡锭"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：66 RF/t<br>
                效果：每个游戏刻（tick）自动熔炼一次当前拥有的锡矿石的0.5%，且不消耗锡矿石，但不能超过当前锡矿石总量<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(66)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id) && player.tin.points.lt(player.tin.ore)) return player.tin.points = player.tin.points.add(player.tin.ore.div(200))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return hasUpgrade(rf, 22)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #c4dce1 0%, #d3e4e4 100%)",
                }
            },
        },
        10003: {
            title() {
                let t = "虚空熔炼-木炭"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：66 RF/t<br>
                效果：每个游戏刻（tick）自动熔炼获得100木炭（即2000每秒），且不消耗木头<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(66)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.furnace.charcoal = player.furnace.charcoal.add(100)           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return hasUpgrade(rf, 23)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    'background-color':'#2b261d',
                    'color':'white',
                }
            },
        },
        10004: {
            title() {
                let t = "虚空合金-青铜锭"
                return t},
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开":"关"
                let d = `
                需要耗能：1440 RF/t<br>
                效果：每个游戏刻（tick）自动合金能够合金数量的0.5%的青铜锭，且不消耗原材料，但不能超过锡锭的4倍，铜锭的4/3倍<br><br>
                状态：${onoff}`
                return d
                },
            cost() {
                return d(1440)
            },
            auto() {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                let alloyPsec = player.copper.points.max(0).div(3).floor().min(player.tin.points).times(4).div(10)
                let alloyCap = player.copper.points.max(0).times(4/3).min(player.tin.points.times(4))
                if (player.bronze.points.gte(alloyCap)) alloyPsec = d(0)
                if (RFAutobuyerActivated(this.id)) return player.bronze.points = player.bronze.points.add(alloyPsec.div(tick))           
            },
            canClick() {return player.rf.points.gte(this.cost().times(20))},
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() {return hasUpgrade(rf, 32)},
            style() {
                return {
                    'min-height':'120px',
                    'width':'210px',
                    "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
                }
            },
        },
    },

    update() {
        if (hasCraftingItem(61)) player.rf.points = player.rf.points.add(tmp.rf.netGrowth) //每tick计算
        if (player.rf.points.lte(tmp.rf.netGrowth.neg())) player.rf.autobuyer = {}
        //最多有
        if (player.rf.points.gte(player.rf.best)) player.rf.best = player.rf.points
    },

    tabFormat: [
        ["display-text", function() { return getPointsDisplay() }],
        "main-display",
        ["display-text", () => `发电速度 ${textStyle_h2(formatWhole(tmp.rf.gainMult), 'fc0000')} RF/t`],
        ["display-text", () => `净增长 ${textStyle_h2(formatWhole(tmp.rf.netGrowth), 'fc0000')} RF/t`],
        "blank",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.rf.best)} RF`],
        "blank",     
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "auto_currency": {
                unlocked() {return tmp.rf.layerShown},
                name() {return '自动资源'},
                content: [
                    ["blank", "15px"],
                    "blank",
                    ["clickables", [1, 2, 3, 4]],
                    "blank",
                    ["display-text", () => `请注意自己的RF发电速度`],
                    ["display-text", () => `若RF能源不足以保持自动化，将强制关闭所有自动化！`],
                ]
            },
            "auto_smelt": {
                unlocked() {return hasCraftingItem(112)},
                name() {return '自动熔炼'},
                content: [
                    ["blank", "15px"],
                    "blank",
                    ["clickables", [1000, 1001, 1002, 1003]],
                    "blank",
                    ["display-text", () => `请注意自己的RF发电速度`],
                    ["display-text", () => `若RF能源不足以保持自动化，将强制关闭所有自动化！`],
                ]
            },
            "unlocks": {
                unlocked() {return tmp.rf.layerShown},
                name() {return '解锁'},
                content: [
                    ["blank", "15px"],
                    "blank",
                    "upgrades",
                    "blank",
                ]
            },
        },
    },
})
