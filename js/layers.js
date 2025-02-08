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

function autobuyBuyables1perTick(layer, id) {
    if (tmp[layer].buyables[id].canAfford) setBuyableAmount(layer, id, getBuyableAmount(layer, id).add(1))
}

function getEveryGridIDArray(row, col) {
    if (col > 100) col = 100
    if (row > 100) row = 100
    let arr = []
    let r = 0
    for (r = 0; r < row; r++) {
        for (c = 0; c < col; c++) {
            arr.splice(arr.length, 0, 1 + c + (100 * (r + 1)))
        }
    }
    return arr
}

addLayer("0layer", {
    name: "sideLayer0",
    position: -5,
    row: 1,
    symbol() { return '↓ 杂项 ↓' },
    small: true,// Set true to generate a slightly different layer
    nodeStyle: { "font-size": "15px", "height": "30px" },// Change layer button' style
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
        }
    },
    color: "#fefefe",
    type: "none",
    tooltip() { return false },
    layerShown() { return true },// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
    update() {
        levelUpdating()
    },
    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }]
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
            if (num.array.length == 3) pentlog.array[2][1] -= 2
            if (num.array.length == 4) pentlog.array[3][1] -= 2;
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
            expand.layer = num.layer - 1
            return `Boogol↑<sup>ω</sup>${format(expand.div(100), 4)}`
        }
    }
    if (num.gte(ExpantaNum.GRAHAMS_NUMBER)) {
        let pol = polarize(num.array, true)
        let Jx = d(pol.height).add(d(pol.bottom).log10().add(d(pol.top).sub(1)).logBase(9))
        let Kx = Jx.log10().add(d(num.layer + 1))
        return `Graham's Number{{1}}${format(Kx.div(64.49189761102771), 5)}`
    }
    //...
}

//杂项层1：统计
addLayer("statistics", {
    name: "statistics",
    position: -4,
    row: 1,
    symbol() { return '统计' },// Set true to generate a slightly different layer
    // Change layer button' style
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
        }
    },
    color: "#fefefe",
    type: "none",
    tooltip() { return false },
    layerShown() { return true },// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        "blank",
        ["display-text", () => `这里可以显示所有已解锁的资源数量`],
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "xp": {
                unlocked() { return true },
                name() { return '经验' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { return `你有${textStyle_h3(format(player.points), 'ffffff')}经验` }],
                    ["display-text", function () { return `等级${textStyle_h3(formatWhole(player.level), 'ffffff')}` }],
                    ["display-text", function () { return `等级${textStyle_h3(formatWhole(player.level.add(1)), 'ffffff')}需要${textStyle_h3(format(nextLevelReq()), 'ffffff')}经验` }],
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    "blank",
                    ["display-text", function () { return `你的经验相当于${textStyle_h3(EN_compare(player.points), 'ffffff')}` }],
                    ["display-text", function () { return `如果你每秒写3个数字，那么你需要${textStyle_h3(ftl(player.points.max(1).log10().add(1).div(3)), 'ffffff')}来写完你的经验数量` }],
                ]
            },
            "world1": {
                unlocked() { return true },
                name() { return '世界1' },
                content: [
                    ["blank", "15px"],
                    ["microtabs", "world1"],
                ]
            },
            "craft": {
                unlocked() { return hasNormalAchievement(12) },
                name() { return '制造' },
                content: [
                    ["blank", "15px"],
                    ["microtabs", "craft"],
                ]
            },
            "energy": {
                unlocked() { return hasNormalAchievement(33) },
                name() { return '能源' },
                content: [
                    ["blank", "15px"],
                    ["microtabs", "energy"],
                ]
            },
        },
        world1: {
            "wood": {
                unlocked() { return tmp.wood.layerShown },
                name() { return '木头' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.wood.layerShown) return `你有${textStyle_h3(formatWhole(player.wood.points), 'b8945e')}木头` }],
                    "blank",
                    ["display-text", function () { if (hasUpgrade(wood, 23)) return `你有${textStyle_h3(formatWhole(player.wood.oak), 'b8945e')}橡木原木` }],
                    ["display-text", function () { if (hasUpgrade(wood, 31)) return `你有${textStyle_h3(formatWhole(player.wood.spruce), '826038')}云杉原木` }],
                    ["display-text", function () { if (hasMilestone(wood, 2)) return `你有${textStyle_h3(formatWhole(player.wood.birch), 'ceb77c')}白桦原木` }],
                    ["display-text", function () { if (hasUpgrade(bronze, 23)) return `你有${textStyle_h3(formatWhole(player.wood.jungle), '9f844d')}丛林原木` }],
                    ["display-text", function () { if (hasCraftingItem(152)) return `你有${textStyle_h3(formatWhole(player.wood.acacia), 'ba5d3b')}金合欢原木` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#b8945e'
                    }
                },
            },
            "stone": {
                unlocked() { return tmp.stone.layerShown },
                name() { return '石头' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.stone.layerShown) return `你有${textStyle_h3(formatWhole(player.stone.points), '4a4a4a')}石头` }],
                    "blank",
                    ["display-text", function () { if (hasUpgrade(stone, 23)) return `你有${textStyle_h3(formatWhole(player.stone.dirt), '5f452f')}泥土` }],
                    ["display-text", function () { if (hasUpgrade(stone, 23) && hasMilestone(stone, 0)) return `你有${textStyle_h3(formatWhole(player.stone.sand), 'd6cf97')}沙子` }],
                    ["display-text", function () { if (hasUpgrade(stone, 35) && hasUpgrade(stone, 23)) return `你有 ${textStyle_h3(formatWhole(player.stone.coal), '2e2e2e', 'ffffff')} 煤炭` }],
                    ["display-text", function () { if (hasMilestone(brass, 1)) return `你有${textStyle_h3(formatWhole(player.stone.clay), '8890a9')}粘土球` }],
                    "blank",
                    ["display-text", function () { if (hasNormalAchievement(63)) return `你有${textStyle_h3(fw(player.stone.singularity), '4a4a4a')}石头奇点` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#4a4a4a'
                    }
                },
            },
            "copper": {
                unlocked() { return tmp.copper.layerShown },
                name() { return '铜' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.copper.layerShown) return `你有${textStyle_h3(formatWhole(player.copper.ore), 'ffb41d')}铜矿石` }],
                    ["display-text", function () { if (tmp.copper.layerShown) return `你有${textStyle_h3(formatWhole(player.copper.points), 'ffb41d')}铜锭` }],
                    "blank",
                    ["display-text", function () { if (hasNormalAchievement(73)) return `你有${textStyle_h3(fw(singularity(copper)), 'ffb41d')}铜奇点` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#ffb41d',
                        'color': '#cd7602',
                    }
                },
            },
            "tin": {
                unlocked() { return tmp.tin.layerShown },
                name() { return '锡' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.tin.layerShown) return `你有${textStyle_h3(formatWhole(player.tin.ore), 'c4dce1')}锡矿石` }],
                    ["display-text", function () { if (tmp.tin.layerShown) return `你有${textStyle_h3(formatWhole(player.tin.points), 'c4dce1')}锡锭` }],
                    "blank",
                    ["display-text", function () { if (hasMilestone(sing_fus, 1)) return `你有${textStyle_h3(fw(singularity(tin)), 'c4dce1')}锡奇点` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#c4dce1',
                        'color': '#647a8e',
                    }
                },
            },
            "bronze": {
                unlocked() { return tmp.bronze.layerShown },
                name() { return '青铜' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.bronze.layerShown) return `你有${textStyle_h3(formatWhole(player.bronze.points), 'ffd7a1')}青铜锭` }],
                    "blank",
                    ["display-text", function () { if (hasCraftingItem(92)) return `你有${textStyle_h3(format(player.bronze.power), 'ffd7a1')}青铜力量` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#ffd7a1',
                        'color': '#b77b2f',
                    }
                },
            },
            "iron": {
                unlocked() { return tmp.iron.layerShown },
                name() { return '铁' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.iron.layerShown) return `你有${textStyle_h3(formatWhole(player.iron.ore), 'd8d8d8')}铁矿石` }],
                    ["display-text", function () { if (tmp.iron.layerShown) return `你有${textStyle_h3(formatWhole(player.iron.points), 'd8d8d8')}铁锭` }],
                    "blank",
                    ["display-text", function () { return `你有${textStyle_h3(formatWhole(player.iron.water) + " mB", '2b3cf4')}水` }],
                    ["display-text", function () { return `你有${textStyle_h3(formatWhole(player.iron.lava) + " mB", 'd76013')}熔岩` }],
                    "blank",
                    ["display-text", function () { if (hasMilestone(sing_fus, 2)) return `你有${textStyle_h3(fw(singularity(iron)), 'd8d8d8')}铁奇点` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#d8d8d8',
                        'color': '#5e5e5e'
                    }
                },
            },
            "nickel": {
                unlocked() { return tmp.nickel.layerShown },
                name() { return '镍' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.nickel.layerShown) return `你有${textStyle_h3(formatWhole(player.nickel.ore), 'fffcc0')}镍矿石` }],
                    ["display-text", function () { if (tmp.nickel.layerShown) return `你有${textStyle_h3(formatWhole(player.nickel.points), 'fffcc0')}镍锭` }],
                    "blank",
                    ["display-text", function () { if (hasMilestone(sing_fus, 3)) return `你有${textStyle_h3(fw(singularity(nickel)), 'fffcc0')}镍奇点` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#fffcc0',
                        'color': '#8b8566'
                    }
                },
            },
            "aluminum": {
                unlocked() { return tmp.aluminum.layerShown },
                name() { return '铝' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.aluminum.layerShown) return `你有${textStyle_h3(formatWhole(player.aluminum.ore), 'e2e3ee')}铝矿石` }],
                    ["display-text", function () { if (tmp.aluminum.layerShown) return `你有${textStyle_h3(formatWhole(player.aluminum.points), 'e2e3ee')}铝锭` }],
                    "blank",
                    ["display-text", function () { if (hasMilestone(sing_fus, 4)) return `你有${textStyle_h3(fw(singularity(aluminum)), 'e2e3ee')}铝奇点` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#e2e3ee',
                        'color': '#45464b'
                    }
                },
            },
            "lead": {
                unlocked() { return tmp.lead.layerShown },
                name() { return '铅' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.lead.layerShown) return `你有${textStyle_h3(formatWhole(player.lead.ore), '97a9e0')}铅矿石` }],
                    ["display-text", function () { if (tmp.lead.layerShown) return `你有${textStyle_h3(formatWhole(player.lead.points), '97a9e0')}铅锭` }],
                    "blank",
                    ["display-text", function () { if (hasMilestone(sing_fus, 5)) return `你有${textStyle_h3(fw(singularity(lead)), '97a9e0')}铅奇点` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#97a9e0',
                        'color': '#667397'
                    }
                },
            },
            "more1": {
                unlocked() { return tmp.lead.layerShown },
                name() { return '更多' },
                content: [
                    ["blank", "15px"],
                    ["microtabs", "world1more1"],
                ],
            },
        },
        world1more1: {
            "constantan": {
                unlocked() { return tmp.constantan.layerShown },
                name() { return '康铜' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.constantan.layerShown) return `你有${textStyle_h3(formatWhole(player.constantan.points), 'eeba4f')}康铜锭` }],
                    "blank",
                    ["display-text", function () { if (hasCraftingItem(202)) return `你有${textStyle_h3(f(player.constantan.essence), 'eeba4f')}康铜精华` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#eeba4f',
                        'color': '#7d6233',
                    }
                },
            },
            "invar": {
                unlocked() { return tmp.invar.layerShown },
                name() { return '殷钢' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.invar.layerShown) return `你有${textStyle_h3(formatWhole(player.invar.points), '95a7a1')}殷钢锭` }],
                    "blank",
                    ["display-text", function () { if (hasNormalAchievement(85)) return `你有${textStyle_h3(f(player.invar.energy), '95a7a1')}殷钢能量` }]
                ],
                buttonStyle() {
                    return {
                        'background-color': '#95a7a1',
                        'color': '#697672',
                    }
                },
            },
            "alumbrass": {
                unlocked() { return tmp.alumbrass.layerShown },
                name() { return '铝黄铜' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.alumbrass.layerShown) return `你有${textStyle_h3(formatWhole(player.alumbrass.points), 'f0d467')}铝黄铜锭` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#f0d467',
                        'color': '#ab7d1b',
                    }
                },
            },
            "zinc": {
                unlocked() { return tmp.zinc.layerShown },
                name() { return '锌' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.zinc.layerShown) return `你有${textStyle_h3(formatWhole(player.zinc.ore), 'b7e6bf')}锌矿石` }],
                    ["display-text", function () { if (tmp.zinc.layerShown) return `你有${textStyle_h3(formatWhole(player.zinc.points), 'b7e6bf')}锌锭` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#b7e6bf',
                        'color': '#4f6c62',
                    }
                },
            },
            "brass": {
                unlocked() { return tmp.brass.layerShown },
                name() { return '黄铜' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.brass.layerShown) return `你有${textStyle_h3(formatWhole(player.brass.points), 'f8ac67')}黄铜锭` }],
                    "blank",
                    ["display-text", function () { if (hasNormalAchievement(103)) return `你有${textStyle_h3(f(tmp.brass.suCur) + "/" + f(tmp.brass.suGain.max(player.brass.max_su)), 'f8ac67')}应力` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#f8ac67',
                        'color': '#75452c',
                    }
                },
            },
            "steel": {
                unlocked() { return tmp.steel.layerShown },
                name() { return '钢' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.steel.layerShown) return `你有${textStyle_h3(formatWhole(player.steel.molten) + ' mB', 'a4a4a4')}熔融钢` }],
                    ["display-text", function () { if (tmp.steel.layerShown) return `你有${textStyle_h3(formatWhole(player.steel.points), 'a4a4a4')}钢锭` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#a4a4a4',
                        'color': '#414141',
                    }
                },
            },
            "silver": {
                unlocked() { return tmp.silver.layerShown },
                name() { return '银' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.silver.layerShown) return `你有${textStyle_h3(formatWhole(player.silver.ore), 'ddf2f5')}银矿石` }],
                    ["display-text", function () { if (tmp.silver.layerShown) return `你有${textStyle_h3(formatWhole(player.silver.points), 'ddf2f5')}银锭` }],
                    "blank",
                    ["display-text", function () { if (hasCraftingItem(312)) return `你挖掘了${textStyle_h3(formatWhole(player.silver.vein), 'ddf2f5')}个银矿脉` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#ddf2f5',
                        'color': '#5f6465'
                    }
                },
            },
            "gold": {
                unlocked() { return tmp.gold.layerShown },
                name() { return '金' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.gold.layerShown) return `你有${textStyle_h3(formatWhole(player.gold.ore), 'fdf55f')}金矿石` }],
                    ["display-text", function () { if (tmp.gold.layerShown) return `你有${textStyle_h3(formatWhole(player.gold.points), 'fdf55f')}金锭` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#fdf55f',
                        'color': '#b26411'
                    }
                },
            },
            "more2": {
                unlocked() { return tmp.gold.layerShown },
                name() { return '更多' },
                content: [
                    ["blank", "15px"],
                    ["microtabs", "world1more2"],
                ],
            },
        },
        world1more2: {/*
            "electrum": {
                unlocked() { return tmp.electrum.layerShown },
                name() { return '琥珀金' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.electrum.layerShown) return `你有${textStyle_h3(formatWhole(player.electrum.points), 'fdf55f')}琥珀金锭` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#fdf55f',
                        'color': '#b26411'
                    }
                },
            },*/
        },
        craft: {
            "crafting_table": {
                unlocked() { return tmp.crafting_table.layerShown },
                name() { return '合成台' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.crafting_table.layerShown) return `你有${textStyle_h3(formatWhole(player.crafting_table.points), 'b8945e')}合成台` }],
                    "blank",
                ],
                buttonStyle() {
                    return {
                        'background-color': '#b8945e'
                    }
                },
            },
            "furnace": {
                unlocked() { return tmp.furnace.layerShown },
                name() { return '熔炉' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.furnace.layerShown) return `你有${textStyle_h3(formatWhole(player.furnace.points), '4a4a4a')}熔炉` }],
                    "blank",
                    ["display-text", function () { if (hasUpgrade(furnace, 11)) return `你有${textStyle_h3(formatWhole(player.furnace.glass), 'a2cfd6')}玻璃` }],
                    ["display-text", function () { if (hasUpgrade(furnace, 13)) return `你有${textStyle_h3(formatWhole(player.furnace.charcoal), '2b261d', 'ffffff')}木炭` }],
                    ["display-text", function () { if (hasUpgrade(furnace, 24)) return `你有${textStyle_h3(formatWhole(player.furnace.brick), 'c2664f')}红砖` }],
                    ["display-text", function () { if (hasUpgrade(furnace, 25)) return `你有${textStyle_h3(formatWhole(player.furnace.scorched_brick), '3a2f18')}高炉砖` }],
                ],
                buttonStyle() {
                    return {
                        'background-color': '#4a4a4a'
                    }
                },
            },
            "alloy_s": {
                unlocked() { return tmp.alloy_s.layerShown },
                name() { return '合金炉' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.alloy_s.layerShown) return `你有${textStyle_h3(formatWhole(player.alloy_s.points), '40464d')}合金炉` }],
                    "blank",
                ],
                buttonStyle() {
                    return {
                        'background-color': '#40464d'
                    }
                },
            },
            "blast_furnace": {
                unlocked() { return tmp.blast_furnace.layerShown },
                name() { return '高炉' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.blast_furnace.layerShown) return `高炉建造${textStyle_h3(player.blast_furnace.built ? "已完成" : "未完成", '3a2f18')}` }],
                    "blank",
                ],
                buttonStyle() {
                    return {
                        'background-color': '#3a2f18'
                    }
                },
            },
        },
        energy: {
            "rf": {
                unlocked() { return tmp.rf.layerShown },
                name() { return '红石通量' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (tmp.rf.layerShown) return `你有${textStyle_h3(formatWhole(player.rf.points), 'fc0000')}RF` }],
                    "blank",
                ],
                buttonStyle() {
                    return {
                        'background-color': '#fc0000'
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
    position: -3,
    row: 1,
    symbol() { return '成就' },// Set true to generate a slightly different layer
    // Change layer button' style
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
            secret: d(0),
            normal: [],
        }
    },
    resource: "成就点数",
    color: "#ffe125",
    type: "none",
    tooltip() { return false },
    layerShown() { return true },// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.

    doReset() { return undefined },

    achievements: {
        11: {
            name: "第一步",
            tooltip: "获得1木头 <br> 奖励：1成就点数",
            done() { return player.wood.points.gte(1) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1)
            },
        },
        12: {
            name: "手搓合成",
            tooltip: "解锁合成台 <br> 奖励：1成就点数",
            done() { return hasUpgrade(wood, 15) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1)
            },
        },
        13: {
            name: "结束手搓",
            tooltip: "获得1合成台 <br> 奖励：1成就点数<br>现在成就点数可以倍增经验获取",
            done() { return player.crafting_table.points.gte(1) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1)
            },
        },
        14: {
            name: "工具是必要的",
            tooltip: "合成木斧 <br> 奖励：2成就点数<br>",
            done() { return hasCraftingItem(11) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(2)
            },
        },
        15: {
            name: "叮铃铃！",
            tooltip: "到达等级5 <br> 奖励：2成就点数<br>",
            done() { return player.level.gte(5) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(2)
            },
        },
        16: {
            name: "斧头无法胜任的工作",
            tooltip: "解锁石头 <br> 奖励：3成就点数<br>",
            done() { return hasUpgrade(wood, 25) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(3)
            },
        },
        17: {
            name: "击碎岩石",
            tooltip: "合成木镐 <br> 奖励：3成就点数<br>",
            done() { return hasCraftingItem(12) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(3)
            },
        },
        21: {
            name: "获得升级",
            tooltip: "合成石镐 <br> 奖励：4成就点数<br>解锁第3排木头升级",
            done() { return hasCraftingItem(22) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(4)
            },
        },
        22: {
            name: "图纸",
            tooltip: "解锁合成台图纸 <br> 奖励：6成就点数",
            done() { return hasUpgrade(wood, 35) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(6)
            },
        },
        23: {
            name: "终极有序合成",
            tooltip: "获得81合成台 <br> 奖励：1成就点数",
            done() { return player.crafting_table.points.gte(81) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1)
            },
        },
        24: {
            name: "Cu",
            tooltip: "解锁铜层级 <br> 奖励：10成就点数",
            done() { return hasUpgrade(stone, 25) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(10)
            },
        },
        25: {
            name: "高温熔炼",
            tooltip: "解锁熔炉 <br> 奖励：12成就点数",
            done() { return hasUpgrade(ct, 12) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(12)
            },
        },
        26: {
            name: "取其精华",
            tooltip: "获得1铜锭 <br> 奖励：14成就点数",
            done() { return player.copper.points.gte(1) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(14)
            },
        },
        27: {
            name: "获得升级^2",
            tooltip: "合成铜镐 <br> 奖励：20成就点数",
            done() { return hasCraftingItem(41) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(20)
            },
        },
        31: {
            name: "SiO<sub>2</sub>",
            tooltip: "熔炼得到1玻璃 <br> 奖励：30成就点数",
            done() { return player.furnace.glass.gte(1) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(30)
            },
        },
        32: {
            name: "不用再像无头苍蝇一样乱找了！",
            tooltip: "合成铜制探矿杖 <br> 奖励：40成就点数",
            done() { return hasCraftingItem(42) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(40)
            },
        },
        33: {
            name: "开始发电！",
            tooltip: "解锁红石通量<br> 奖励：90成就点数",
            done() { return hasCraftingItem(61) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(90)
            },
        },
        34: {
            name: "Sn",
            tooltip: "解锁锡层级 <br> 奖励：160成就点数",
            done() { return hasUpgrade(copper, 25) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(160)
            },
        },
        35: {
            name: "Googol",
            tooltip: "获得1.0000e100经验 <br> 奖励：320成就点数",
            done() { return player.points.gte(1e100) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(320)
            },
        },
        36: {
            name: "N合一",
            tooltip: "解锁合金炉 <br> 奖励：600成就点数",
            done() { return hasUpgrade(tin, 15) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(600)
            },
        },
        37: {
            name: "初级合金",
            tooltip: "解锁青铜 <br> 奖励：1,280成就点数<br>解锁石头层级前3种资源获取自动化，允许你通过RF升级倍增RF获取",
            done() { return hasUpgrade(alloy_s, 11) },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1280)
            },
        },
        41: {
            name: "储能的用处",
            tooltip: "使得RF净增长为负数 <br> 奖励：2,025成就点数<br>解锁青铜升级",
            done() { return tmp.rf.netGrowth.lt(0) && this.unlocked() },
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
            done() { return hasCraftingItem(91) && this.unlocked() },
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
            done() { return player.bronze.power.gte(1) && this.unlocked() },
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
            done() { return player.bronze.power.gte(1.1111e111) && this.unlocked() },
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
            done() { return player.level.gte(50) && this.unlocked() },
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
            done() { return hasUpgrade(bronze, 25) && this.unlocked() },
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
            done() { return player.points.gte(d(Number.MAX_VALUE)) && this.unlocked() },
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
            done() { return player.furnace.charcoal.gte(1) && this.unlocked() },
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
            done() { return player.iron.points.gte(1) && this.unlocked() },
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
            done() { return hasCraftingItem(111) && this.unlocked() },
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
            done() { return player.bronze.power.gte('1e400') && this.unlocked() },
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
            done() { return RFAutobuyerActivated(10003) && this.unlocked() },
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
            done() { return player.iron.lava.gte(1000) && this.unlocked() },
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
            done() { return player.nickel.ore.gte(1) && this.unlocked() },
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
            done() { return player.crafting_table.items[141].gte(1) && this.unlocked() },
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
            done() { return player.nickel.challenges[11] >= 1 && this.unlocked() },
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
            done() { return player.stone.points.gte(Number.MAX_VALUE) && this.unlocked() },
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
            done() { return player.aluminum.ore.gte(1) && this.unlocked() },
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
            done() { return d(player.nickel.challenges[11] + player.nickel.challenges[12]).gte(10) && this.unlocked() },
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
            done() { return ((getBuyableAmount(bronze, 11).add(getBuyableAmount(bronze, 12)).add(getBuyableAmount(bronze, 13)).add(getBuyableAmount(bronze, 21)).lte(50)) && player.bronze.power.gte(1e299)) && this.unlocked() },
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
            done() { return hasCraftingItem(152) && this.unlocked() },
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
            done() { return player.points.gte('1e3003') && this.unlocked() },
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
            done() { return player.lead.ore.gte(1) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e70)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        73: {
            name: "“中子态素压缩机”",
            tooltip: "解锁奇点凝聚器层级<br> 奖励：1.0000e80成就点数",
            done() { return hasCraftingItem(172) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e80)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        74: {
            name: "工具2合1",
            tooltip: "合成铅锤<br> 奖励：1.0000e90成就点数",
            done() { return hasCraftingItem(181) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e90)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        75: {
            name: "另一种铜合金",
            tooltip: "解锁康铜层级<br> 奖励：1.0000e100成就点数",
            done() { return hasUpgrade(lead, 31) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e100)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        76: {
            name: "成就点数的加成占比是不是有点太多了？",
            tooltip: "到达等级725<br> 奖励：1.0000e115成就点数",
            done() { return player.level.gte(725) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e115)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        77: {
            name: "OoM暴涨？",
            tooltip: "获得第9康铜升级<br> 奖励：1.0000e125成就点数",
            done() { return hasUpgrade(constantan, 24) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e125)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        81: {
            name: "这样下去资源会无限暴涨的！",
            tooltip: "获得1.0000e214康铜精华<br> 奖励：1.0000e140成就点数",
            done() { return player.constantan.essence.gte(1e214) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e140)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        82: {
            name: "我早就设定了购买上限",
            tooltip: "取得Lv.2000的康铜精华倍增<br> 奖励：1.0000e150成就点数",
            done() { return player.constantan.buyables[11].gte(2000) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e150)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        83: {
            name: "曾经叫做……因瓦合金",
            tooltip: "获得1殷钢锭<br> 奖励：1.0000e155成就点数",
            done() { return player.invar.points.gte(1) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e155)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        84: {
            name: "熔岩之源",
            tooltip: "开启熔岩炉<br> 奖励：1.0000e160成就点数",
            done() { return RFAutobuyerActivated(62) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e160)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        85: {
            name: "维度，启动！",
            tooltip: "合成殷钢维度启动器<br> 奖励：1.0000e170成就点数",
            done() { return hasCraftingItem(251) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e170)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        86: {
            name: "维度提升都搬？",
            tooltip: "殷钢维度提升1次<br> 奖励：1.0000e180成就点数",
            done() { return getBuyableAmount(invar, 51).gte(1) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e180)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        87: {
            name: "第9维度，仍然是个谎言",
            tooltip: "殷钢维度提升5次<br> 奖励：1.0000e190成就点数",
            done() { return getBuyableAmount(invar, 51).gte(5) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e190)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        91: {
            name: "无限，意味着价格疯涨",
            tooltip: "获得1.7976e308殷钢能量<br> 奖励：1.0000e200成就点数",
            done() { return player.invar.energy.gte(Number.MAX_VALUE) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e200)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        92: {
            name: "这也是一种黄铜",
            tooltip: "解锁铝黄铜层级<br> 奖励：1.0000e205成就点数",
            done() { return hasUpgrade(invar, 42) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e205)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        93: {
            name: "匠魂浇铸",
            tooltip: "获得锭铸模<br> 奖励：1.0000e210成就点数",
            done() { return player.alumbrass.cast.ingot && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e210)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        94: {
            name: "之前的金属镐头都是硬核手搓的吗？",
            tooltip: "获得镐头铸模<br> 奖励：1.0000e215成就点数",
            done() { return player.alumbrass.cast.pickaxe_head && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e215)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        95: {
            name: "Zn",
            tooltip: "解锁锌层级<br> 奖励：1.0000e220成就点数",
            done() { return hasUpgrade(alumbrass, 31) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e220)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        96: {
            name: "增长还是不够夸张",
            tooltip: "购买第10锌升级<br> 奖励：1.0000e225成就点数",
            done() { return hasUpgrade(zinc, 25) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e225)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        97: {
            name: "机械动力常客",
            tooltip: "解锁黄铜层级<br> 奖励：1.0000e230成就点数",
            done() { return hasUpgrade(zinc, 31) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e230)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(42)
            },
        },
        101: {
            name: "机械化生产",
            tooltip: "合成黄铜合成站<br> 奖励：1.0000e236成就点数",
            done() { return hasCraftingItem(271) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e235)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(63)
            },
        },
        102: {
            name: "传递力量",
            tooltip: "合成黄铜齿轮<br> 奖励：1.0000e240成就点数<br>5倍黄铜锭合金倍率",
            done() { return hasCraftingItem(281) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e240)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(63)
            },
        },
        103: {
            name: "储存力量",
            tooltip: "合成应力表<br> 奖励：1.0000e243成就点数",
            done() { return hasCraftingItem(291) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e243)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(63)
            },
        },
        104: {
            name: "等级套娃",
            tooltip: "获得应力升级[a1]<br> 奖励：1.0000e246成就点数",
            done() { return hasUpgrade(brass, 'a1') && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e246)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(63)
            },
        },
        105: {
            name: "一劳永逸",
            tooltip: "获得第2黄铜里程碑<br> 奖励：1.0000e250成就点数",
            done() { return hasMilestone(brass, 1) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e250)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(63)
            },
        },
        106: {
            name: "并非原版高炉",
            tooltip: "解锁高炉层级<br> 奖励：1.0000e260成就点数",
            done() { return hasUpgrade(furnace, 25) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e260)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(63)
            },
        },
        107: {
            name: "钢铁洪流",
            tooltip: "获得1钢锭<br> 奖励：1.0000e270成就点数",
            done() { return player.steel.points.gte(1) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e270)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(63)
            },
        },
        111: {
            name: "真正的木炭自由",
            tooltip: "合成钢熔炉<br> 奖励：1.0000e280成就点数",
            done() { return hasCraftingItem(302) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e280)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(63)
            },
        },
        112: {
            name: "Maximus-million",
            tooltip: "获得1.00e1,000,000经验<br> 奖励：1.0000e290成就点数",
            done() { return player.points.gte('1e1000000') && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e290)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(63)
            },
        },
        113: {
            name: "Ag",
            tooltip: "解锁银层级<br> 奖励：1.0000e300成就点数",
            done() { return hasUpgrade(steel, 25) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add(1e300)
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(63)
            },
        },
        114: {
            name: "挖矿，此刻具象化了",
            tooltip: "挖掘1个银矿脉<br> 奖励：1.0000e320成就点数",
            done() { return player.silver.vein.gte(1) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add('1e320')
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(63)
            },
        },
        115: {
            name: "Au",
            tooltip: "获得1金矿石<br> 奖励：1.0000e350成就点数",
            done() { return player.gold.ore.gte(1) && this.unlocked() },
            onComplete() {
                return player.achievements.points = player.achievements.points.add('1e350')
            },
            unlocked() {
                return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(63)
            },
        },
        //隐藏成就
        100011: {
            name: "刷那么多干啥？",
            tooltip: "同时持有超过1000个青铜外壳 <br> 这个游戏真用不到那么多，又不是什么高肝度科技整合包",
            done() { return player.crafting_table.items[91].gte(1000) },
            onComplete() {
                return player.achievements.secret = player.achievements.secret.add(1)
            },
            unlocked() { return hasAchievement('achievements', this.id) },
        }
    },

    effect() {
        let eff = player.achievements.points.max(1)
        if (hasUpgrade(aluminum, 24)) eff = eff.pow(upgradeEffect(aluminum, 24))
        if (eff.gte('1e120000')) eff = eff.div('1e120000').pow(0.25).times('1e120000') //软上限1
        return eff
    },

    effectDescription() {
        if (hasNormalAchievement(13)) return `倍增经验获取 ${textStyle_h2(format(tmp.achievements.effect) + "x", 'ffe125')}`
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        "blank",
        "main-display",
        ["display-text", function () { if (tmp.achievements.effect.gte('1e120000')) return `由于成就点数的效果超过了1.00e120,000，因此受软上限限制！` }],
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "normal achievement": {
                unlocked() { return true },
                name() { return '普通成就' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { return "成就每次解锁3行，完成1~3行成就解锁4~6行成就，完成1~6行成就解锁7~9行成就，以此类推" }],
                    "blank",
                    ["achievements", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]],
                ]
            },
            "secret achievement": {
                unlocked() { return true },
                name() { return '隐藏成就' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { return `你完成了 ${textStyle_h2(fw(player.achievements.secret), 'a080ff')} 个隐藏成就` }],
                    "blank",
                    ["achievements", [10001, 10002, 10003, 10004, 10005, 10006, 10007, 10008, 10009, 10010]],
                ]
            },
        },
    },
})

function locationName(name) {
    let namesEN = ['overworld', 'nether', 'end', 'twilight_forest', 'aether', 'abyssal_wasteland', 'dreadlands']
    let namesZH = ['主世界', '下界', '末地', '暮色森林', '天境', '深渊荒原', '恐惧之地']
    for (i = 0; i < namesEN.length; i++) {
        if (name == namesEN[i]) return namesZH[i]
    }
}

function locationName_h3(name) {
    let namesEN = ['overworld', 'nether', 'end', 'twilight_forest', 'aether', 'abyssal_wasteland', 'dreadlands']
    let namesZH = ['主世界', '下界', '末地', '暮色森林', '天境', '深渊荒原', '恐惧之地']
    let colors = ['548049', '', '', '', '', '', '']
    for (i = 0; i < namesEN.length; i++) {
        if (name == namesEN[i]) return textStyle_h3(namesZH[i], colors[i])
    }
}

function isAtLocation(location) {
    return location == player.map.location ? true : false
}

//杂项层3：地图
addLayer("map", {
    name: "map",
    position: -2,
    row: 1,
    symbol() { return '地图' },// Set true to generate a slightly different layer
    // Change layer button' style
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
            location: 'overworld',
        }
    },
    resource: "地图",
    color: "#548049",
    type: "none",
    tooltip() { return false },
    layerShown() { return true },// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.

    doReset() { return undefined },

    clickables: {
        overworld: {

            title() {
                let t = ""
                return t
            },
            display() {
                let d = "主世界"
                return d
            },
            canClick() { return player.map.location != 'overworld' },
            onClick() {
                player.map.location = 'overworld'
            },
            unlocked() { return true },
            style() {
                return {
                    'min-height': '120px',
                    'width': '180px',
                    'font-size': '20px',
                    'background': 'linear-gradient(180deg, #548049 0%, #548049 10%, #5f452f 10%, #5f452f 20%, #4a4a4a 20%, #4a4a4a 100%)',
                    'border': 'none'
                }
            },
        },
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        ["display-text", function () { return `当前位置：${locationName_h3(player.map.location)}` }],
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "map": {
                unlocked() { return true },
                name() { return '地图' },
                content: [
                    ["blank", "15px"],
                    ["clickable", 'overworld']
                ]
            },
        },
    },
})

function quickJump(layer, tab, group = 'stuff') {
    if (player[layer].points.gte(-1)) player.tab = layer
    if (typeof player.subtabs[layer][group] == 'string') player.subtabs[layer][group] = tab
}

function getLayerNodeStyle(layer) {
    if (tmp[layer].position >= 2 && tmp[layer].position <= 1002) return tmp[layer].nodeStyle
    else return { "background-color": tmp[layer].color }
}
addLayer("1layer", {
    name: "sideLayer1",
    position: -1,
    row: 1,
    symbol() { return (options.ch || modInfo.languageMod == false) ? '↓ 世界 1 ↓' : '↓ layer 1 ↓' },
    symbolEN() { return (options.ch || modInfo.languageMod == false) ? '↓ 层级 1 ↓' : '↓ layer 1 ↓' },
    small: true,// Set true to generate a slightly different layer
    nodeStyle: { "font-size": "15px", "height": "30px" },// Change layer button' style
    startData() {
        return {
            unlocked: true,
            points: d(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)

        }
    },
    color: "#fefefe",
    type: "none",
    tooltip() { return `${formatWhole(player.wood.points)}木头` },
    layerShown() { return true },// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
    clickables: {
        11: {
            display() {
                let d = "硬核暂停"
                return d
            },
            canClick() { return player.devmode },
            onClick() {
                player.NaNpause = d(NaN)
            },
            unlocked() { return player.devmode },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
    },
    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        ["clickables", [1]],
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "quick jump": {
                unlocked() { return true },
                name() { return '快速跳转' },
                content: [
                    ["blank", "15px"],
                    ["clickables", [2]],
                    ["display-text", function () { return "快速跳转功能施工中" }],
                ]
            },
        },
    },
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
const sing_fus = "sing_fus" //奇点凝聚器
const blast_furnace = "blast_furnace" //高炉
const mana_p = "mana_p" //魔力池
const astral_ct = "astral_ct" //星辉合成台

//能源
const rf = "rf" //红石通量 Redstone Flux
const mana = "mana" //魔力
const astral_p = "astral_p" //星能
const lp = "lp" //生命源质

//其他
const map = "map" //地图

//要是你能无聊翻源代码翻到了这里那好家伙，你找到了未来更新的层级名称（计划）(画饼）如果你想要更新，别急，我还有马造2树没更新完呢。我自己也要拿大量时间玩马造，更新频率真很低的。
//此留言写于2024.11.11

//世界1层1：木头
addLayer("wood", {
    name: "wood", // This is optional, only used in a few places, If absent it just uses the layer id
    symbol: '木头', // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 1,
    startData() {
        return {
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
        }
    },
    color: "#b8945e",
    requires: new ExpantaNum(10), // Can be a function that takes requirement increases into account
    resource: "木头", // Name of prestige currency
    resourceEN: "prestige points", // The second name of prestige currency ( If you open otherLanguageMod )
    baseResource: "points", // Name of resource prestige is based on
    baseResourceEN: "points", // The second name of resource prestige is based on ( If you open otherLanguageMod )
    baseAmount() { return player.points }, // Get the current amount of baseResource
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
        if (hasCraftingItem(212)) m = m.times('1e2000')
        if (hasUpgrade(steel, 23)) m = m.times(upgradeEffect(steel, 23))
        if (hasCraftingItem(311)) m = m.times('1e100000')
        return m
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return d(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown() { return true },

    doReset(resettingLayer) {
        if (layers[resettingLayer].name == ct && !hasMilestone(furnace, 0)) {
            let kept = ["unlocked", "auto"]
            if (hasMilestone(ct, 0)) {
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
            cost() { return new ExpantaNum(0) },
            unlocked() { return true },
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
            cost() { return new ExpantaNum(5) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.level.max(0).add(1).pow(1.35).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊(等级+1)<sup>1.35</sup>⌋`
                return t
            },
        },
        13: {
            title: "伐木经验",
            description: "伐木进度加成经验获取",
            cost() { return new ExpantaNum(15) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.wood.progress.max(1)
                if (hasCraftingItem(21)) eff = d(10)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：max(伐木进度, 1)`
                if (hasCraftingItem(21)) t = `公式：10`
                return t
            },
        },
        14: {
            title: "经验自增",
            description: "需求：等级2<br>经验加成自身<br>于1.798e308x到达软上限",
            cost() { return new ExpantaNum(40) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            canAfford() { return player.level.gte(2) },
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
            tooltip() {
                let t = `公式：<br>
                软上限前：<sup>3</sup>√经验<br>
                软上限后：(<sup>3</sup>√经验/1.7976e308)<sup>0.1</sup>·1.7976e308`
                return t
            },
        },
        15: {
            title: "发展科技",
            description: "需求：等级3<br>解锁新区域：制造，以及新层级：合成台",
            cost() { return new ExpantaNum(90) },
            canAfford() { return player.level.gte(3) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        21: {
            title: "进阶伐木",
            description: "木头加成经验获取",
            cost() { return new ExpantaNum(144) },
            unlocked() { return hasCraftingItem(11) },
            effect() {
                let eff = player.wood.points.max(1).pow(0.3)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：木头<sup>0.3</sup>`
                return t
            },
        },
        22: {
            title: "成就伐木",
            description: "需求：等级4<br>成就点数加成木头获取",
            cost() { return new ExpantaNum(169) },
            canAfford() { return player.level.gte(4) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.achievements.points.max(1).root(2).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊(成就点数)<sup>0.5</sup>⌋`
                return t
            },
        },
        23: {
            title: "原木分类",
            description: "解锁新页面，你将有概率获取多种类的原木",
            cost() { return new ExpantaNum(300) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        24: {
            title: "橡树林",
            description: "需求：等级5<br>双倍木头获取",
            currencyInternalName: "oak",
            currencyDisplayName: "橡木原木",
            currencyLayer: wood,
            cost() { return new ExpantaNum(20) },
            canAfford() { return player.level.gte(5) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        25: {
            title: "目光向下",
            description: "需求：等级5<br>解锁新层级：石头",
            currencyInternalName: "oak",
            currencyDisplayName: "橡木原木",
            currencyLayer: wood,
            cost() { return new ExpantaNum(40) },
            canAfford() { return player.level.gte(5) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        31: {
            title: "云杉树",
            description: "需求：等级9<br>允许你获得云杉原木",
            cost() { return new ExpantaNum(50000) },
            canAfford() { return player.level.gte(9) },
            unlocked() { return hasNormalAchievement(21) },
        },
        32: {
            title: "效率I",
            description: "10x木头获取",
            currencyInternalName: "spruce",
            currencyDisplayName: "云杉原木",
            currencyLayer: wood,
            cost() { return new ExpantaNum(40) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        33: {
            title: "云杉木手柄部件",
            description: "需求：等级12<br>1.2x挖掘速度，3x石头获取",
            currencyInternalName: "spruce",
            currencyDisplayName: "云杉原木",
            currencyLayer: wood,
            cost() { return new ExpantaNum(125) },
            canAfford() { return player.level.gte(12) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        34: {
            title: "石头手柄部件",
            description: "需求：等级12<br>1.2x撸树速度，3x木头获取",
            currencyInternalName: "points",
            currencyDisplayName: "石头",
            currencyLayer: stone,
            cost() { return new ExpantaNum(200) },
            canAfford() { return player.level.gte(12) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        35: {
            title: "进一步加强",
            description: "3x木头获取，解锁新的石头升级和合成台图纸",
            cost() { return new ExpantaNum(4567890) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
    },

    milestones: {
        0: {
            requirementDescription() { return `获得15木头` },
            effectDescription() { return `5倍经验获取` },
            done() { return player.wood.points.gte(15) },
            unlocked() { return true },
        },
        1: {
            requirementDescription() { return `获得114,514经验` },
            effectDescription() { return `11.4514倍经验获取` },
            done() { return player.points.gte(114514) },
            unlocked() { return true },
        },
        2: {
            requirementDescription() { return `木头倍增器等级2` },
            effectDescription() { return `允许你撸树时获得白桦原木` },
            done() { return getBuyableAmount(stone, 11).gte(2) },
            unlocked() { return hasCraftingItem(41) },
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击撸树"
                return d
            },
            canClick() { return !player.wood.destroying },
            onClick() {
                if (!player.wood.destroying) player.wood.destroying = true
            },
            unlocked() { return player.level.gte(1) },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
    },

    bars: {
        woodDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `进度: ${format(player.wood.progress)}/${format(hardness('wood'))}` },
            progress() { return player.wood.progress.div(hardness('wood')) },
            unlocked() { return player.level.gte(1) },
            fillStyle() { return { "background-color": "#b8945e" } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
        },
    },

    update(diff) {
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
            if (hasUpgrade(brass, "main1")) eff = eff.pow(2.25)
            return eff
        },
        spruce() {
            let eff = player.wood.spruce.max(0).add(10).log10().pow(10)
            return eff
        },
        birch() {
            let eff = player.wood.birch.max(0).add(10).log10().pow(4)
            if (hasCraftingItem(252)) eff = d(10).pow(player.wood.birch.max(1).log10().times(35).pow(0.75))
            return eff
        },
        jungle() {
            let eff = player.wood.jungle.max(0).add(10).log10().pow(1.25).sub(1)
            if (hasUpgrade(aluminum, 13)) eff = eff.pow(3)
            if (hasUpgrade(brass, "main2")) eff = eff.times(upgradeEffect(brass, "main2"))
            return eff
        },
        acacia() {
            let eff = player.wood.acacia.max(0).root(10).times(200)
            if (hasUpgrade(brass, "main3")) eff = eff.pow(2.25)
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
            if (hasCraftingItem(292)) gain = gain.pow(1.5)
            return gain
        },
        acacia() {
            let gain = this.jungle().max(1).div(1.82e15).root(2).floor()
            if (hasCraftingItem(292)) gain = gain.pow(1.5)
            if (!hasCraftingItem(152)) gain = d(0)
            return gain
        },
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        "main-display",
        "blank",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.wood.best)} 木头`],
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "wood": {
                unlocked() { return true },
                name() { return '伐木' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (player.level.lt(1)) return `你需要先到等级1解锁伐木！` }],
                    ["row", [["bar", "woodDestroying"], "blank", "clickables",]],
                    "blank",
                    "blank",
                    ["display-text", function () { if (player.level.gte(1)) return `挖掘速度：${format(player.wood.speed)}/秒` }],
                    ["display-text", function () { if (player.level.gte(1)) return `破坏一次的木头获取数量：${textStyle_h2(formatWhole(tmp.wood.gainMult), 'b8945e')}` }],
                    ["display-text", function () { return `硬度：${formatWhole(hardness(wood))}` }],
                    ["display-text", function () { if (player.level.gte(1)) return `挖掘等级：0` }],
                ]
            },
            "upgrades": {
                unlocked() { return true },
                name() { return '升级' },
                content: [
                    ["blank", "15px"],
                    ["raw-html", () => `<h4 style="opacity:.5">`],
                    ["upgrades", [1, 2, 3, 4, 5, 6, 7, 8, 9]]
                ]
            },
            "milestones": {
                unlocked() { return true },
                name() { return '里程碑' },
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
            "log": {
                unlocked() { return hasUpgrade(wood, 23) },
                name() { return '原木' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { return `按下shift查看相关获取以及效果公式，获取默认向下取整` }],
                    "blank",
                    ["display-text", function () { if (hasUpgrade(wood, 23)) return `你有 ${textStyle_h2(formatWhole(player.wood.oak), 'b8945e')} 橡木原木，加成经验获取 ${textStyle_h2(format(tmp.wood.logEffects.oak) + "x", 'b8945e')}` }],
                    ["display-text", function () {
                        let power = "0.8"
                        if (hasUpgrade(brass, "main1")) power = "1.8"
                        if (hasUpgrade(wood, 23)) return shiftDown ? `橡木原木获取公式：木头每次/15    效果公式：(橡木原木·5+1)<sup>${power}</sup>` : ""
                    }],
                    ["display-text", function () { if (hasUpgrade(wood, 31)) return `你有 ${textStyle_h2(formatWhole(player.wood.spruce), '826038')} 云杉原木，加成经验获取 ${textStyle_h2(format(tmp.wood.logEffects.spruce) + "x", '826038')}` }],
                    ["display-text", function () {
                        if (hasUpgrade(wood, 31)) return shiftDown ? `云杉原木获取公式：√(橡木原木每次/105)   效果公式：lg(云杉原木+10)<sup>10</sup>` : ""
                    }],
                    ["display-text", function () { if (hasMilestone(wood, 2)) return `你有 ${textStyle_h2(formatWhole(player.wood.birch), 'ceb77c')} 白桦原木，加成石头获取 ${textStyle_h2(format(tmp.wood.logEffects.birch) + "x", 'ceb77c')}` }],
                    ["display-text", function () {
                        let f = "lg(白桦原木+10)<sup>0.4</sup>"
                        if (hasCraftingItem(252)) f = "10<sup>35lg(白桦原木)<sup>0.75</sup></sup>"
                        if (hasMilestone(wood, 2)) return shiftDown ? `白桦原木获取公式：(云杉原木每次/320)<sup>5</sup>   效果公式：${f}` : ""
                    }],
                    ["display-text", function () { if (hasUpgrade(bronze, 23)) return `你有 ${textStyle_h2(formatWhole(player.wood.jungle), '9f844d')} 丛林原木，令木头倍增器的底数 ${textStyle_h2("+" + format(tmp.wood.logEffects.jungle), '9f844d')}` }],
                    ["display-text", function () {
                        let gf = "log<sub>2</sub>(白桦原木每次/1,860,000)+1"
                        let gp = d(1)
                        if (hasUpgrade(aluminum, 13)) gp = gp.times(3)
                        if (hasCraftingItem(292)) gp = gp.times(1.5)
                        if (hasUpgrade(bronze, 24)) gf = "(" + gf + ")·upgeff(青铜, 9)"
                        if (hasUpgrade(aluminum, 13) || hasCraftingItem(292)) gf = "(" + gf + ")" + `<sup>${f(gp)}</sup>`

                        let ef = "lg(丛林原木+10)<sup>1.25</sup>-1"
                        if (hasUpgrade(aluminum, 13)) ef = "(" + ef + ")<sup>3</sup>"
                        if (hasUpgrade(brass, "main2")) ef += "·upgeff(黄铜, main2)"
                        if (hasUpgrade(bronze, 23)) return shiftDown ? `丛林原木获取公式：${gf}  效果公式：${ef}` : ""
                    }],
                    ["display-text", function () { if (hasCraftingItem(152)) return `你有 ${textStyle_h2(formatWhole(player.wood.acacia), 'ba5d3b')} 金合欢原木，令青铜力量强化器MK.2的底数 ${textStyle_h2("+" + format(tmp.wood.logEffects.acacia), 'ba5d3b')}` }],
                    ["display-text", function () {
                        let gf = "√(丛林原木每次/1.82e15)"
                        if (hasCraftingItem(292)) gf += "<sup>1.5</sup>"

                        let ef = "金合欢原木<sup>0.1</sup>·200"
                        if (hasUpgrade(brass, "main3")) ef = "(" + ef + ")<sup>2.25</sup>"
                        if (hasCraftingItem(152)) return shiftDown ? `金合欢原木获取公式：：${gf}  效果公式：${ef}` : ""
                    }],
                    ["row", [["bar", "woodDestroying"], "blank", "clickables",]],
                    "blank",
                    ["display-text", function () { if (player.level.gte(1)) return `挖掘速度：${format(player.wood.speed)}/秒` }],
                    ["display-text", function () { if (player.level.gte(1)) return `破坏一次的木头获取数量：${textStyle_h2(formatWhole(tmp.wood.gainMult), 'b8945e')}` }],
                    ["display-text", function () { if (hasUpgrade(wood, 23)) return `破坏一次木头可额外产出 ${textStyle_h2(formatWhole(tmp.wood.logGain.oak), 'b8945e')} 橡木原木 （基于木头获取，开始于15木头/次）` }],
                    ["display-text", function () { if (hasUpgrade(wood, 31)) return `破坏一次木头可额外产出 ${textStyle_h2(formatWhole(tmp.wood.logGain.spruce), '826038')} 云杉原木 （基于橡木原木获取，开始于105橡木原木/次）` }],
                    ["display-text", function () { if (hasMilestone(wood, 2)) return `破坏一次木头可额外产出 ${textStyle_h2(formatWhole(tmp.wood.logGain.birch), 'ceb77c')} 白桦原木 （基于云杉原木获取，开始于320云杉原木/次）` }],
                    ["display-text", function () { if (hasUpgrade(bronze, 23)) return `破坏一次木头可额外产出 ${textStyle_h2(formatWhole(tmp.wood.logGain.jungle), '9f844d')} 丛林原木 （基于白桦原木获取，开始于1,860,000白桦原木/次）` }],
                    ["display-text", function () { if (hasCraftingItem(152)) return `破坏一次木头可额外产出 ${textStyle_h2(formatWhole(tmp.wood.logGain.acacia), 'ba5d3b')} 金合欢原木 （基于丛林原木获取，开始于1.8200e15丛林原木/次）` }],
                ]
            },
        },
    },
})

//世界1层2：石头
addLayer("stone", {
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
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
            clay: d(0), //#8890a9
            marble: d(0),
            netherrack: d(0),
            basalt: d(0),
            aether_stone: d(0),
            abyssal_stone: d(0),
        }
    },

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
        if (hasCraftingItem(221)) m = m.times('1e2000')
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
            if (hasMilestone(furnace, 0)) {
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
            cost() { return new ExpantaNum(0) },
            unlocked() { return tmp.stone.layerShown },
        },
        12: {
            title: "粉碎它吧！",
            description: "需求：等级6<br>双倍石头获取，石头加成经验获取",
            cost() { return new ExpantaNum(5) },
            canAfford() { return player.level.gte(6) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.stone.points.max(0).add(10).log10().pow(5)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：lg(石头+10)<sup>5</sup>`
                return t
            },
        },
        13: {
            title: "合成经验",
            description: "需求：等级6<br>合成台加成经验获取 (硬上限1e100x)",
            cost() { return new ExpantaNum(15) },
            canAfford() { return player.level.gte(6) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.crafting_table.points.max(0).add(1).pow(2).min(1e100)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：min((合成台+1)<sup>2</sup>, 1e100)`
                return t
            },
        },
        14: {
            title: "经验强化器",
            description: "需求：等级7<br>100x经验获取",
            cost() { return new ExpantaNum(25) },
            canAfford() { return player.level.gte(7) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        15: {
            title: "获得升级",
            description: "需求：1e20经验<br>解锁石斧和石镐的合成",
            cost() { return new ExpantaNum(25) },
            canAfford() { return player.points.gte(1e20) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        21: {
            title: "急迫I",
            description: "5x石头获取",
            cost() { return new ExpantaNum(210) },
            unlocked() { return hasNormalAchievement(22) },
        },
        22: {
            title: "合成提升石头",
            description: "合成台加成石头获取",
            cost() { return new ExpantaNum(880) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.crafting_table.points.max(0).add(1).pow(0.4)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：(合成台+1)<sup>0.4</sup>`
                return t
            },
        },
        23: {
            title: "扩展范围",
            description: "需求：等级14<br>增大挖掘的方块种类，在新页面中显示，允许你挖掘泥土",
            cost() { return new ExpantaNum(2025) },
            canAfford() { return player.level.gte(14) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        24: {
            title: "泥土加成",
            description: "泥土少量加成石头获取",
            currencyInternalName: "dirt",
            currencyDisplayName: "泥土",
            currencyLayer: stone,
            cost() { return new ExpantaNum(10) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
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
            cost() { return new ExpantaNum(15000) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        31: {
            title: "焦黑石头",
            description: "需求：等级21<br>熔炉加成石头获取",
            cost() { return new ExpantaNum(50000000) },
            canAfford() { return player.level.gte(21) },
            unlocked() { return hasCraftingItem(41) },
            effect() {
                let eff = player.furnace.points.max(0).add(1).pow(0.4)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：(熔炉+1)<sup>0.4</sup>`
                return t
            },
        },
        32: {
            title: "伐木场",
            description: "解锁一个购买项，加成木头获取",
            cost() { return new ExpantaNum(500000000) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        33: {
            title: "熔炼配方",
            description: "在熔炉界面中允许你解锁更多熔炼配方",
            cost() { return new ExpantaNum(5e9) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        34: {
            title: "能源加成",
            description: "RF加成经验获取<br>同时查看合成台里程碑2吧",
            cost() { return new ExpantaNum(12500) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
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
            tooltip() {
                let t = `公式：(RF+1)<sup>1.2</sup>`
                return t
            },
        },
        35: {
            title: "意外收获",
            description: "允许你挖掘石头时获得煤炭<br>同时允许以煤炭作为燃料",
            currencyInternalName: "points",
            currencyDisplayName: "木头",
            currencyLayer: wood,
            cost() { return new ExpantaNum(7.7777e19) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
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
                return display
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buyMax() {
                if (this.canAfford())
                    return setBuyableAmount(stone, 11, player.stone.points.div(10000000).max(1).logBase(5).root(1.5).floor().add(1))
            },
            canBuyMax() { return hasMilestone(sing_fus, 1) },
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
                return effect
            },
            unlocked() { return hasUpgrade(stone, 32) },
            canAuto() { return hasUpgrade(constantan, 35) },
            auto() {
                if (this.canAuto())
                    this.buyMax()
            },
        },
        21: {
            title: "聚合奇点-石头",
            cost(x) { return d(Number.MAX_VALUE).pow(x.max(0).pow(5)).times(Number.MAX_VALUE) },
            display() {
                let display = `加成石头获取<br>
                效果公式：${format(this.effBase())}<sup>x</sup><br>
                购买数量：${formatWhole(player[this.layer].buyables[this.id])}<br>
                凝聚需求量：${format(this.cost())} 石头`
                return display
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buyMax() {
                if (this.canAfford())
                    return setBuyableAmount(stone, 21, player.stone.points.div(Number.MAX_VALUE).max(1).logBase(Number.MAX_VALUE).root(5).floor().add(1))
            },
            canBuyMax() { return hasMilestone(sing_fus, 0) },
            buy() {
                if (!this.canBuyMax()) player[this.layer].points = player[this.layer].points.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effBase() {
                let b = d(1e20)
                if (hasCraftingItem(192)) b = b.pow(5)
                return b
            },
            effect(x) {
                let effect = ExpantaNum.pow(this.effBase(), x.max(0))
                return effect
            },
            unlocked() { return hasNormalAchievement(63) },
            canAuto() { return hasMilestone(sing_fus, 0) },
            auto() {
                if (this.canAuto())
                    this.buyMax()
            },
            style() {
                return {
                    'height': '120px',
                    'box-shadow': '0 0 20px #4a4a4a',
                }
            }
        },
    },

    milestones: {
        0: {
            requirementDescription() { return `获得1,000,000石头和1,000合成台` },
            effectDescription() { return `在购买石头升级8后，允许你在破坏石头时获得沙子` },
            done() { return player.stone.points.gte(1000000) && player[ct].points.gte(1000) },
            unlocked() { return true },
        },
        1: {
            requirementDescription() { return `获得150粘土球` },
            effectDescription() { return `解锁更多熔炼配方` },
            done() { return player.stone.clay.gte(150) },
            unlocked() { return hasMilestone(brass, 0) },
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击挖掘"
                return d
            },
            canClick() { return !player.stone.destroying && hasCraftingItem(12) },
            onClick() {
                if (!player.stone.destroying) player.stone.destroying = true
            },
            unlocked() { return tmp.stone.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
    },

    bars: {
        stoneDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `进度: ${format(player.stone.progress)}/${format(hardness(stone))}` },
            progress() { return player.stone.progress.div(hardness(stone)) },
            unlocked() { return tmp.stone.layerShown },
            fillStyle() { return { "background-color": "#4a4a4a" } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
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
        clay() {
            let gain = this.coal().max(0).div('1e15000').max(1).logBase(1e100).pow(2).floor()
            if (!hasMilestone(brass, 1)) gain = d(0)
            return gain
        },
        gravel() {

        },
        marble() {

        },
    },

    update(diff) {
        if (player.stone.destroying) player.stone.progress = player.stone.progress.add(player.stone.speed.div(tick))
        if (player.stone.progress.gte(hardness(stone))) player.stone.progress = d(0),
            player.stone.destroying = false,
            player.stone.points = player.stone.points.add(tmp.stone.gainMult),
            player.stone.dirt = player.stone.dirt.add(tmp.stone.otherGain.dirt),
            player.stone.sand = player.stone.sand.add(tmp.stone.otherGain.sand),
            player.stone.coal = player.stone.coal.add(tmp.stone.otherGain.coal),
            player.stone.clay = player.stone.clay.add(tmp.stone.otherGain.clay)

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
        if (hasCraftingItem(262)) speed = speed.times(2.25)
        player.stone.speed = speed

        //奇点
        player.stone.singularity = player.stone.buyables[21]
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
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
                unlocked() { return tmp.stone.layerShown },
                name() { return '挖掘' },
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "stoneDestroying"], "blank", "clickables",]],
                    "blank",
                    ["display-text", function () { return `挖掘速度：${format(player.stone.speed)}/秒` }],
                    ["display-text", function () { return `破坏一次的石头获取数量：${textStyle_h2(formatWhole(tmp.stone.gainMult), '4a4a4a')}` }],
                    ["display-text", function () { return `硬度：${formatWhole(hardness(stone))}` }],
                    ["display-text", function () { return `挖掘等级：0` }],
                    "blank",
                    ["display-text", function () { return `在获取石头之前，你需要一把木镐！` }],
                ]
            },
            "upgrades": {
                unlocked() { return true },
                name() { return '升级' },
                content: [
                    ["blank", "15px"],
                    ["raw-html", () => `<h4 style="opacity:.5">`],
                    ["upgrades", [1, 2, 3, 4, 5, 6, 7, 8, 9]]
                ]
            },
            "milestones": {
                unlocked() { return true },
                name() { return '里程碑' },
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
            "buyables": {
                unlocked() { return hasUpgrade(stone, 32) },
                name() { return '购买项' },
                content: [
                    ["blank", "15px"],
                    ["buyables", [1]]
                ]
            },
            "more dig": {
                unlocked() { return hasUpgrade(stone, 23) },
                name() { return '更多挖掘' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { return `按下shift查看相关获取公式，获取默认向下取整` }],
                    "blank",
                    ["display-text", function () { if (hasUpgrade(stone, 23)) return `你有 ${textStyle_h2(formatWhole(player.stone.dirt), '5f452f')} 泥土` }],
                    ["display-text", function () {
                        if (hasUpgrade(stone, 23)) return shiftDown ? `泥土获取公式：<sup>1.1</sup>√(石头每次/360)` : ""
                    }],
                    ["display-text", function () { if (hasUpgrade(stone, 23) && hasMilestone(stone, 0)) return `你有 ${textStyle_h2(formatWhole(player.stone.sand), 'd6cf97')} 沙子` }],
                    ["display-text", function () {
                        if (hasUpgrade(stone, 23) && hasMilestone(stone, 0)) return shiftDown ? `沙子获取公式：(泥土每次/180)<sup>0.8</sup>` : ""
                    }],
                    ["display-text", function () { if (hasUpgrade(stone, 35) && hasUpgrade(stone, 23)) return `你有 ${textStyle_h2(formatWhole(player.stone.coal), '2e2e2e', 'ffffff')} 煤炭` }],
                    ["display-text", function () {
                        if (hasUpgrade(stone, 23) && hasUpgrade(stone, 35)) return shiftDown ? `煤炭获取公式：(沙子每次/144,000,000)<sup>0.5</sup>` : ""
                    }],
                    ["display-text", function () { if (hasMilestone(brass, 1)) return `你有 ${textStyle_h2(formatWhole(player.stone.clay), '8890a9')} 粘土球` }],
                    ["display-text", function () {
                        if (hasMilestone(brass, 1)) return shiftDown ? `粘土球获取公式：(log<sub>1e100</sub>(煤炭每次/1e15,000))<sup>2</sup>` : ""
                    }],
                    ["row", [["bar", "stoneDestroying"], "blank", "clickables",]],
                    "blank",
                    ["display-text", function () { return `挖掘速度：${format(player.stone.speed)}/秒` }],
                    ["display-text", function () { return `破坏一次的石头获取数量：${textStyle_h2(formatWhole(tmp.stone.gainMult), '4a4a4a')}` }],
                    ["display-text", function () { if (hasUpgrade(stone, 23)) return `破坏一次石头可额外产出 ${textStyle_h2(formatWhole(tmp.stone.otherGain.dirt), '5f452f')} 泥土 （基于石头获取，开始于360石头/次）` }],
                    ["display-text", function () { if (hasUpgrade(stone, 23) && hasMilestone(stone, 0)) return `破坏一次石头可额外产出 ${textStyle_h2(formatWhole(tmp.stone.otherGain.sand), 'd6cf97')} 沙子 （基于泥土获取，开始于180泥土/次）` }],
                    ["display-text", function () { if (hasUpgrade(stone, 35) && hasUpgrade(stone, 23)) return `破坏一次石头可额外产出 ${textStyle_h2(formatWhole(tmp.stone.otherGain.coal), '2e2e2e', 'ffffff')} 煤炭 （基于沙子获取，开始于144,000,000沙子/次）` }],
                    ["display-text", function () { if (hasMilestone(brass, 1)) return `破坏一次石头可额外产出 ${textStyle_h2(formatWhole(tmp.stone.otherGain.clay), '8890a9')} 粘土球 （基于煤炭获取，开始于1.000e15,100煤炭/次）` }],
                ]
            },
            "singularity": {
                unlocked() { return hasNormalAchievement(63) },
                name() { return '奇点' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (hasNormalAchievement(63)) return `你有 ${textStyle_h2(fw(player.stone.singularity), '4a4a4a')} 石头奇点，加成石头获取 ${textStyle_h2(fw(buyableEffect(stone, 21)) + "x", '4a4a4a')}` }],
                    "blank",
                    ["buyables", [2]]
                ]
            },
        },
    },
})

//世界1层3：铜
addLayer("copper", {
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
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
            singularity: d(0),
        }
    },

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
        if (hasNormalAchievement(73)) m = m.times(buyableEffect(sing_fus, 11))
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    layerShown() { return hasNormalAchievement(24) },          // Returns a bool for if this layer's node should be visible in the tree.

    doReset(resettingLayer) {
        if (layers[resettingLayer] == ct) {
            return undefined
        }
        if (layers[resettingLayer] == furnace) {
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
            cost() { return new ExpantaNum(1) },
            unlocked() { return tmp.copper.layerShown },
        },
        12: {
            title: "铜矿石强化",
            description: "需求：等级15<br>从等级14开始，每升1级，经验获取x10，直到等级24",
            currencyInternalName: "ore",
            currencyDisplayName: "铜矿石",
            currencyLayer: copper,
            cost() { return new ExpantaNum(3) },
            canAfford() { return player.level.gte(15) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let lv = player.level
                let eff = ExpantaNum.pow(10, lv.max(14).min(24).sub(14))
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：10<sup>min(max(等级, 14)-24</sup>`
                return t
            },
        },
        13: {
            title: "铜矿矿脉",
            description: "3x铜矿石获取",
            currencyInternalName: "ore",
            currencyDisplayName: "铜矿石",
            currencyLayer: copper,
            cost() { return new ExpantaNum(5) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        14: {
            title: "深板岩",
            description: "需求：等级17<br>等级加成石头获取",
            currencyInternalName: "ore",
            currencyDisplayName: "铜矿石",
            currencyLayer: copper,
            cost() { return new ExpantaNum(12) },
            canAfford() { return player.level.gte(17) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.level.max(0).times(2).pow(0.8).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊(2·等级)<sup>0.8</sup>⌋`
                return t
            },
        },
        15: {
            title: "深层铜矿石",
            description: "双倍铜矿石获取",
            cost() { return new ExpantaNum(10) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        21: {
            title: "大型铜矿矿脉",
            description: "等级加成铜矿石获取",
            cost() { return new ExpantaNum(50) },
            unlocked() { return hasMilestone(ct, 1) },
            effect() {
                let eff = player.level.max(0).div(3).floor().add(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊(等级/3)⌋+1`
                return t
            },
        },
        22: {
            title: "更大的熔炉",
            description: "等级加成熔炼铜锭的倍率",
            currencyInternalName: "ore",
            currencyDisplayName: "铜矿石",
            currencyLayer: copper,
            cost() { return new ExpantaNum(500) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.level.max(0).div(6).floor().add(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊(等级/6)⌋+1`
                return t
            },
        },
        23: {
            title: "铜块",
            description: "每有9个铜锭，此升级对木头获取的倍率+1",
            cost() { return new ExpantaNum(360) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.copper.points.max(0).div(9).floor().add(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊(铜锭/9)⌋+1`
                return t
            },
        },
        24: {
            title: "熔炼工艺",
            description: "等级加成熔炼玻璃的倍率",
            currencyInternalName: "points",
            currencyDisplayName: "木头",
            currencyLayer: wood,
            cost() { return new ExpantaNum(5e12) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.level.max(0).div(6).floor().add(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊(等级/6)⌋+1`
                return t
            },
        },
        25: {
            title: "同级矿石",
            description: "解锁新层级：锡<br>同时允许你前往熔炉配方界面解锁锡锭的熔炼",
            currencyInternalName: "glass",
            currencyDisplayName: "玻璃",
            currencyLayer: furnace,
            cost() { return new ExpantaNum(1333) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        // Look in the upgrades docs to see what goes here!
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击寻找"
                return d
            },
            canClick() { return !player.copper.finding && !player.copper.destroying && !player.copper.found && isAtLocation('overworld') },
            onClick() {
                if (!player.copper.finding) player.copper.finding = true
            },
            unlocked() { return tmp.copper.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击挖掘"
                return d
            },
            canClick() { return !player.copper.destroying && player.copper.found },
            onClick() {
                if (!player.copper.destroying) player.copper.destroying = true
            },
            unlocked() { return tmp.copper.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
    },

    bars: {
        copperFinding: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `找矿进度: ${format(player.copper.findingProgress)}/${format(rarity(copper))}` },
            progress() { let p = player.copper.findingProgress.div(rarity(copper)); if (player.copper.found) p = d(1); return p },
            unlocked() { return tmp.copper.layerShown },
            fillStyle() { return { "background-color": "#ffb41d" } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
        },
        copperDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `进度: ${format(player.copper.progress)}/${format(hardness(copper))}` },
            progress() { return player.copper.progress.div(hardness(copper)) },
            unlocked() { return tmp.copper.layerShown },
            fillStyle() { return { "background-color": "#ffb41d" } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
        },
    },

    update(diff) {
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
        if (hasCraftingItem(261)) speed = speed.times(10)
        player.copper.speed = speed
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
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
                unlocked() { return tmp.copper.layerShown },
                name() { return '挖掘' },
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "copperFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "copperDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function () { return player.copper.found ? `你找到了一处铜矿石` : `你尚未找到铜矿石` }],
                    "blank",
                    ["display-text", function () { return `找矿速度：${format(player.copper.speed)}/秒` }],
                    ["display-text", function () { return `挖掘速度：${format(player.stone.speed)}/秒` }],
                    ["display-text", function () { return `破坏一次的铜矿石获取数量：${textStyle_h2(formatWhole(tmp.copper.gainMult), 'ffb41e')}` }],
                    ["display-text", function () { return `稀有度：${formatWhole(rarity(copper))}` }],
                    ["display-text", function () { return `硬度：${formatWhole(hardness(copper))}` }],
                    ["display-text", function () { return `挖掘等级：1` }],
                    ["display-text", function () { return `需要在主世界挖掘` }],
                    "blank",
                    ["display-text", function () { return `对于矿石，你需要先找到才能挖掘！` }],
                ]
            },
            "upgrades": {
                unlocked() { return tmp.copper.layerShown },
                name() { return '升级' },
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
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
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
            singularity: d(0),
        }
    },

    color: "#c4dce1",                       // The color for this layer, which affects many elements.
    nodeStyle: { "background": "linear-gradient(90deg, #c4dce1 0%, #d3e4e4 100%)" },
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
        if (hasMilestone(sing_fus, 1)) m = m.times(buyableEffect(sing_fus, 12))
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
            cost() { return new ExpantaNum(6) },
            unlocked() { return hasCraftingItem(71) },
        },
        12: {
            title: "资源绑定",
            description: "铜锭加成石头获取",
            cost() { return new ExpantaNum(7) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.copper.points.max(1).pow(0.75)
                if (hasCraftingItem(82)) eff = eff.pow(2)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：铜锭<sup>0.75</sup>`
                if (hasCraftingItem(82)) t = `公式：铜锭<sup>1.5</sup>`
                return t
            },
        },
        13: {
            title: "锡矿脉",
            description: "等级加成锡矿石获取",
            cost() { return new ExpantaNum(8) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.level.max(0).div(5).floor().add(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊(等级/5)⌋+1`
                return t
            },
        },
        14: {
            title: "铜矿石加速",
            description: "锡锭加成铜矿石获取以及铜锭熔炼倍率",
            cost() { return new ExpantaNum(24) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.tin.points.max(1).pow(0.77).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊锡锭<sup>0.77</sup>⌋`
                return t
            },
        },
        15: {
            title: "二合一",
            description: "解锁合金炉（制造区域层级，无重置）",
            cost() { return new ExpantaNum(50) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击寻找"
                return d
            },
            canClick() { return !player.tin.finding && !player.tin.destroying && !player.tin.found && isAtLocation('overworld') },
            onClick() {
                if (!player.tin.finding) player.tin.finding = true
            },
            unlocked() { return tmp.tin.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击挖掘"
                return d
            },
            canClick() { return !player.tin.destroying && player.tin.found },
            onClick() {
                if (!player.tin.destroying) player.tin.destroying = true
            },
            unlocked() { return tmp.tin.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
    },

    bars: {
        tinFinding: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `找矿进度: ${format(player.tin.findingProgress)}/${format(rarity(tin))}` },
            progress() { let p = player.tin.findingProgress.div(rarity(tin)); if (player.tin.found) p = d(1); return p },
            unlocked() { return tmp.tin.layerShown },
            fillStyle() { return { "background-color": "#c4dce1" } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#647a8e" } },
        },
        tinDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `进度: ${format(player.tin.progress)}/${format(hardness(tin))}` },
            progress() { return player.tin.progress.div(hardness(tin)) },
            unlocked() { return tmp.tin.layerShown },
            fillStyle() { return { "background-color": "#c4dce1" } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#647a8e" } },
        },
    },

    update(diff) {
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
        ["display-text", function () { return getPointsDisplay() }],
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
                unlocked() { return tmp.tin.layerShown },
                name() { return '挖掘' },
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "tinFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "tinDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function () { return player.tin.found ? `你找到了一处锡矿石` : `你尚未找到锡矿石` }],
                    "blank",
                    ["display-text", function () { return `找矿速度：${format(player.copper.speed)}/秒` }],
                    ["display-text", function () { return `挖掘速度：${format(player.stone.speed)}/秒` }],
                    ["display-text", function () { return `破坏一次的锡矿石获取数量：${textStyle_h2(formatWhole(tmp.tin.gainMult), 'c4dce1')}` }],
                    ["display-text", function () { return `稀有度：${formatWhole(rarity(tin))}` }],
                    ["display-text", function () { return `硬度：${formatWhole(hardness(tin))}` }],
                    ["display-text", function () { return `挖掘等级：1` }],
                    ["display-text", function () { return `需要在主世界挖掘` }],
                    "blank",
                    ["display-text", function () { return `对于矿石，你需要先找到才能挖掘！` }],
                ]
            },
            "upgrades": {
                unlocked() { return tmp.tin.layerShown },
                name() { return '升级' },
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
    componentStyles: {
        "buyable"() {
            return {
                'margin-left': '-7px',
                'margin-right': '-7px',
            }
        }
    },
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: d(0),             // "points" is the internal name for the main resource of the layer.
            ore: d(0),
            molten: d(0),
            power: d(0),
        }
    },

    color: "#ffd7a1",                       // The color for this layer, which affects many elements.
    nodeStyle: {
        "background": "linear-gradient(90deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
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
    layerShown() { return hasNormalAchievement(37) },

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
            cost() { return new ExpantaNum(45) },
            unlocked() { return hasNormalAchievement(41) },
            effect() {
                let eff = player.bronze.points.max(1).pow(0.55).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊青铜锭<sup>0.55</sup>⌋`
                return t
            },
        },
        12: {
            title: "青铜原材料强化II",
            description: "青铜锭加成锡矿石获取",
            cost() { return new ExpantaNum(90) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.bronze.points.max(1).pow(0.45).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊青铜锭<sup>0.45</sup>⌋`
                return t
            },
        },
        13: {
            title: "青铜原材料强化III",
            description: "青铜锭加成铜锭熔炼倍率",
            cost() { return new ExpantaNum(120) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.bronze.points.max(1).pow(0.55).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊青铜锭<sup>0.55</sup>⌋`
                return t
            },
        },
        14: {
            title: "青铜原材料强化IV",
            description: "青铜锭加成锡锭熔炼倍率",
            cost() { return new ExpantaNum(140) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.bronze.points.max(1).pow(0.45).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊青铜锭<sup>0.45</sup>⌋`
                return t
            },
        },
        15: {
            title: "青铜原材料强化V",
            description: "青铜锭加成自己的合金倍率<br>你现在可以前往合成台界面获取青铜工具图纸",
            cost() { return new ExpantaNum(160) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.bronze.points.max(1).pow(0.3).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊青铜锭<sup>0.3</sup>⌋`
                return t
            },
        },
        21: {
            title: "超级强化",
            description: "解锁下一个青铜力量强化器",
            currencyInternalName: "power",
            currencyDisplayName: "青铜力量",
            currencyLayer: bronze,
            cost() { return new ExpantaNum(1e18) },
            unlocked() { return hasMilestone(bronze, 2) },
        },
        22: {
            title: "绑定合金倍率",
            description: "青铜锭合金倍率固定为铜锭的1/30和锡锭的1/10的最小值（向上取整）",
            currencyInternalName: "power",
            currencyDisplayName: "青铜力量",
            currencyLayer: bronze,
            cost() { return new ExpantaNum(1e122) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        23: {
            title: "青铜齿轮",
            description: "允许你撸树时获得丛林原木",
            cost() { return new ExpantaNum(1e28) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        24: {
            title: "丛林可可豆",
            description: "等级加成丛林原木获取",
            currencyInternalName: "jungle",
            currencyDisplayName: "丛林原木",
            currencyLayer: wood,
            cost() { return new ExpantaNum(275) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.level.max(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：等级`
                return t
            },
        },
        25: {
            title: "二级矿石",
            description: "需求：等级70<br>解锁两种新矿物（挖掘需要一定条件）",
            canAfford() { return player.level.gte(70) },
            currencyInternalName: "jungle",
            currencyDisplayName: "丛林原木",
            currencyLayer: wood,
            cost() { return new ExpantaNum(16384) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
    },

    buyables: {
        11: {
            title: "青铜力量强化器MK.1",
            cost(x) { return d(5).pow(x.max(0).pow(1.35)).times(2) },
            free() {
                let f = d(0)
                if (hasMilestone(bronze, 4)) f = f.add(getBuyableAmount(bronze, 13))
                if (hasUpgrade(lead, 25)) f = f.add(getBuyableAmount(bronze, 21))
                if (hasUpgrade(invar, 14)) f = f.add(getBuyableAmount(bronze, 12))
                if (hasNormalAchievement(104)) f = f.add(buyableEffect(bronze, 22))
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
                return display
            },
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            buyMax() {
                if (this.canAfford())
                    return setBuyableAmount(bronze, 11, player.bronze.power.div(2).max(1).logBase(5).root(1.35).floor().add(1))
            },
            canBuyMax() { return false },
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
                return effect
            },
            unlocked() { return hasCraftingItem(92) },
            canAuto() { return hasUpgrade(constantan, 35) },
            auto() {
                if (this.canAuto())
                    this.buyMax()
            },
            style() { if (this.canAfford()) return { "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)" } },
            tooltip: "效果公式的底数为lg(青铜力量)",
        },
        12: {
            title: "青铜力量强化器MK.2",
            cost(x) { return d(10).pow(x.max(0).pow(1.5)).times(1e19) },
            free() {
                let f = d(0)
                if (hasUpgrade(lead, 23)) f = f.add(getBuyableAmount(bronze, 13))
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
                return display
            },
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            buyMax() {
                if (this.canAfford())
                    return setBuyableAmount(bronze, 12, player.bronze.power.div(1e19).max(1).logBase(10).root(1.5).floor().add(1))
            },
            canBuyMax() { return false },
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
                return effect
            },
            unlocked() { return hasUpgrade(bronze, 21) },
            canAuto() { return hasUpgrade(constantan, 35) },
            auto() {
                if (this.canAuto())
                    this.buyMax()
            },
            style() { if (this.canAfford()) return { "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)" } }
        },
        13: {
            title: "青铜力量强化器MK.3",
            cost(x) { return d(100).pow(x.max(0).pow(2)).times(1e214) },
            free() {
                let f = d(0)
                if (hasUpgrade(lead, 24)) f = f.add(getBuyableAmount(bronze, 21))
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
                return display
            },
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            buyMax() {
                if (this.canAfford())
                    return setBuyableAmount(bronze, 13, player.bronze.power.div(1e214).max(1).logBase(100).root(2).floor().add(1))
            },
            canBuyMax() { return false },
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
                return effect
            },
            unlocked() { return hasCraftingItem(111) },
            canAuto() { return hasUpgrade(constantan, 35) },
            auto() {
                if (this.canAuto())
                    this.buyMax()
            },
            style() { if (this.canAfford()) return { "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)" } },
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
                效果公式：lg(Ni+10)<sup>${fw(this.effPowerFactor())}x</sup> = ${format(this.effBase())}<sup>x</sup><br>
                等级：${formatWhole(player[this.layer].buyables[this.id])}${freedis}<br>
                当前效果：${format(this.effect())}x<br>
                价格：${format(this.cost())} 青铜力量`
                return display
            },
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            buyMax() {
                if (this.canAfford())
                    return setBuyableAmount(bronze, 21, player.bronze.power.div('1e640').max(1).logBase(10000).root(2).floor().add(1))
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player[this.layer].power = player[this.layer].power.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effPowerFactor() {
                let f = d(10)
                if (hasCraftingItem(262)) f = f.add(5)
                return f
            },
            effBase() {
                let b = player.nickel.points.max(0).add(10).log10().pow(this.effPowerFactor())
                return b
            },
            effect(x) {
                let effect = ExpantaNum.pow(this.effBase(), x.add(this.free()).max(0))
                return effect
            },
            unlocked() { return hasUpgrade(nickel, 21) },
            canAuto() { return hasUpgrade(constantan, 35) },
            auto() {
                if (this.canAuto())
                    this.buyMax()
            },
            style() { if (this.canAfford()) return { "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)" } },
            tooltip: "Ni为镍锭数量",
        },
        22: {
            title: "青铜力量强化器MK.5",
            cost(x) { return d(10).pow(x.pow(1.5).times(1000).add(44550)) },
            free() {
                let f = d(0)
                return f
            },
            display() {
                let freedis = ""
                if (this.free().gte(1)) freedis = ` + ${formatWhole(this.free())}`
                let display = `提供更多的青铜力量强化器MK.1的免费等级<br>
                效果公式：${fw(this.effBase())}x<br>
                等级：${fw(player[this.layer].buyables[this.id])}${freedis}<br>
                当前效果：+${fw(this.effect())}<br>
                价格：${f(this.cost())} 青铜力量`
                return display
            },
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            buyMax() {
                if (this.canAfford())
                    return setBuyableAmount(bronze, 22, player.bronze.power.max(1).log10().sub(44550).div(1000).max(0).root(1.5).floor().add(1))
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player[this.layer].power = player[this.layer].power.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effBase() {
                let b = player.brass.max_su.max(0).logBase(2).pow(1.35).times(3).floor()
                return b
            },
            effect(x) {
                let effect = this.effBase().times(x).max(0)
                return effect
            },
            unlocked() { return hasUpgrade(brass, 'a1') },
            canAuto() { return hasMilestone(brass, 1) },
            auto() {
                if (this.canAuto())
                    this.buyMax()
            },
            style() { if (this.canAfford()) return { "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)" } },
            tooltip: "效果公式的另一个因数为⌊3log<sub>2</sub>(应力)<sup>1.35</sup>⌋",
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
            if (hasUpgrade(constantan, 24)) eff = eff.pow(upgradeEffect(constantan, 24))
            if (hasUpgrade(zinc, 24)) eff = eff.pow(upgradeEffect(zinc, 24))
            return eff
        }
    },

    milestones: {
        0: {
            requirementDescription() { return `获得3000青铜力量` },
            effectDescription() { return `青铜锭加成青铜力量获取<br>当前效果：${f(this.effect())}x` },
            done() { return player.bronze.power.gte(3000) },
            effect() { return player.bronze.points.max(0).add(1).root(2) },
            unlocked() { return hasCraftingItem(92) },
        },
        1: {
            requirementDescription() { return `获得1.0000e15青铜力量` },
            effectDescription() { return `你的锡锭熔炼倍率被锁定为锡矿石的10%（向上取整）` },
            done() { return player.bronze.power.gte(1e15) },
            unlocked() { return hasCraftingItem(92) },
        },
        2: {
            requirementDescription() { return `到达等级46` },
            effectDescription() { return `解锁新的青铜升级` },
            done() { return player.level.gte(46) },
            unlocked() { return hasCraftingItem(92) },
        },
        3: {
            requirementDescription() { return `获得1.0000e121青铜力量` },
            effectDescription() { return `你的铜锭熔炼倍率被锁定为铜矿石的10%（向上取整）` },
            done() { return player.bronze.power.gte(1e121) },
            unlocked() { return hasCraftingItem(92) },
        },
        4: {
            requirementDescription() { return `获得1.0000e260青铜力量` },
            effectDescription() { return `青铜力量强化器MK.3提供免费等级到青铜力量强化器MK.1` },
            done() { return player.bronze.power.gte(1e260) },
            unlocked() { return hasCraftingItem(92) },
        },
        5: {
            requirementDescription() { return `获得1.0000e473青铜力量` },
            effectDescription() { return `1000000x经验获取` },
            done() { return player.bronze.power.gte('1e473') },
            unlocked() { return hasCraftingItem(92) },
        },
        6: {
            requirementDescription() { return `获得1.0000e632青铜力量` },
            effectDescription() { return `解锁新的镍升级` },
            done() { return player.bronze.power.gte('1e632') },
            unlocked() { return hasCraftingItem(142) },
        },
    },

    update(diff) {
        if (player.bronze.points.gt(player.bronze.best)) player.bronze.best = player.bronze.points
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.bronze.best)} 青铜锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "upgrades": {
                unlocked() { return tmp.bronze.layerShown },
                name() { return '升级' },
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
            "milestones": {
                unlocked() { return hasCraftingItem(92) },
                name() { return '里程碑' },
                content: [
                    ["blank", "15px"],
                    "milestones",
                ]
            },
            "power": {
                unlocked() { return hasCraftingItem(92) },
                name() { return '青铜力量' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (inChallenge(nickel, 12)) return `你当前在挑战“时间削弱”中，青铜力量获取速度变为^${f(player.nickel.chal2nerf, 4)}` }],
                    ["display-text", function () { return `你有 ${textStyle_h2(f(player.bronze.power), 'ffd7a1')} 青铜力量，加成锡矿石获取 ${textStyle_h2(f(tmp.bronze.bronzePower.effect) + "x", 'ffd7a1')}` }],
                    ["display-text", function () { return `(+${textStyle_h2(f(tmp.bronze.bronzePower.gain), 'ffd7a1')}/秒)` }],
                    ["display-text", function () {
                        let p = d(1)
                        if (hasCraftingItem(132)) p = p.times(1.5)
                        if (hasCraftingItem(142)) p = p.times(challengeEffect(nickel, 11))
                        if (hasCraftingItem(161)) p = p.times(1.5)
                        if (hasUpgrade(constantan, 24)) p = p.times(upgradeEffect(constantan, 24))
                        if (hasUpgrade(zinc, 24)) p = p.times(upgradeEffect(zinc, 24))
                        let pt = p.gt(1) ? f(p) : ""
                        return shiftDown ? `青铜力量效果公式：10<sup>${pt}lg(x+1)<sup>0.5</sup></sup>` : ""
                    }],
                    "blank",
                    "buyables",
                ]
            },
        },
    },
})

//世界1层6：铁
addLayer("iron", {
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
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
            singularity: d(0),
        }
    },

    color: "#d8d8d8",                       // The color for this layer, which affects many elements.
    nodeStyle: { "background": "linear-gradient(90deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)" },
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
        if (hasCraftingItem(171)) m = m.times(100000)
        if (hasNormalAchievement(85)) m = m.times(tmp.invar.energy.effect1)
        if (hasMilestone(sing_fus, 2)) m = m.times(buyableEffect(sing_fus, 13))
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
            cost() { return new ExpantaNum(3) },
            unlocked() { return tmp.iron.layerShown },
        },
        12: {
            title: "铁矿矿脉",
            description: "需求：等级75<br>3x铁矿石获取",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            canAfford() { return player.level.gte(75) },
            cost() { return new ExpantaNum(5) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        13: {
            title: "青铜力量转换器",
            description: "需求：等级75<br>青铜力量现在可以加成铜矿石获取，但是效果倍率降低",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            canAfford() { return player.level.gte(75) },
            cost() { return new ExpantaNum(15) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = tmp.bronze.bronzePower.effect.max(1).root(2)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：青铜力量效果<sup>0.5</sup>`
                return t
            },
        },
        14: {
            title: "烧至金黄（指高温发光）",
            description: "需求：等级80<br>在熔炉界面解锁两种新配方",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            canAfford() { return player.level.gte(80) },
            cost() { return new ExpantaNum(5) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        15: {
            title: "铁器时代",
            description: "现在可以解锁一系列新合成配方",
            cost() { return new ExpantaNum(1) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        21: {
            title: "超高温",
            description: "3x升温速度",
            currencyInternalName: "lava",
            currencyDisplayName: "mB 熔岩",
            currencyLayer: iron,
            cost() { return new ExpantaNum(500000) },
            unlocked() { return hasMilestone(iron, 1) },
        },
        22: {
            title: "用水赶路",
            description: "水微弱加成铁矿石获取和铁锭熔炼倍率",
            cost() { return new ExpantaNum(60) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.iron.water.max(2).logBase(2).floor().max(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊log<sub>2</sub>(max(水, 2))⌋`
                return t
            },
        },
        23: {
            title: "真·刷石机",
            description: "熔岩加成石头获取",
            cost() { return new ExpantaNum(780) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = d(10).pow(player.iron.lava.max(1).log10().times(20).pow(0.85))
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：(20lg(熔岩))<sup>0.85</sup>`
                return t
            },
        },
        24: {
            title: "铁桶扩容",
            description: "需求：等级115<br>铁桶数量加成流体获取",
            currencyInternalName: "lava",
            currencyDisplayName: "mB 熔岩",
            currencyLayer: iron,
            cost() { return new ExpantaNum(1250000) },
            canAfford() { return player.level.gte(115) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.crafting_table.items[122].add(1).max(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：铁桶+1`
                return t
            },
        },
        25: {
            title: "铁的工艺",
            description: "需求：等级115<br>能够查看更多合成配方",
            currencyInternalName: "lava",
            currencyDisplayName: "mB 熔岩",
            currencyLayer: iron,
            cost() { return new ExpantaNum(20000000) },
            canAfford() { return player.level.gte(115) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
    },

    milestones: {
        0: {
            requirementDescription() { return `获得2000 mB水` },
            effectDescription() { return `5x铁矿石获取` },
            done() { return player.iron.water.gte(2000) },
            unlocked() { return hasUpgrade(ct, 51) },
        },
        1: {
            requirementDescription() { return `获得5铁桶` },
            effectDescription() { return `解锁更多铁升级` },
            done() { return player.crafting_table.items[122].gte(5) },
            unlocked() { return hasUpgrade(ct, 51) },
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击寻找"
                return d
            },
            canClick() { return !player.iron.finding && !player.iron.destroying && !player.iron.found && isAtLocation('overworld') },
            onClick() {
                if (!player.iron.finding) player.iron.finding = true
            },
            unlocked() { return tmp.iron.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击挖掘"
                return d
            },
            canClick() { return !player.iron.destroying && player.iron.found },
            onClick() {
                if (!player.iron.destroying) player.iron.destroying = true
            },
            unlocked() { return tmp.iron.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
        21: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "收集水"
                return d
            },
            canClick() { return true },
            onClick() {
                player.iron.water = player.iron.water.add(tmp.iron.fluidPerBucket.times(player.crafting_table.items[122]))
            },
            unlocked() { return hasUpgrade(ct, 51) },
            style() {
                return {
                    'min-height': '80px',
                    'width': '120px',
                    'font-size': '20px',
                    'background-color': '#2b3cf4'
                }
            },
        },
        22: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "收集熔岩"
                return d
            },
            canClick() { return true },
            onClick() {
                player.iron.lava = player.iron.lava.add(tmp.iron.fluidPerBucket.times(player.crafting_table.items[122]))
            },
            unlocked() { return hasUpgrade(ct, 51) },
            style() {
                return {
                    'min-height': '80px',
                    'width': '120px',
                    'font-size': '20px',
                    'background-color': '#d76013'
                }
            },
        },
    },

    fluidPerBucket() {
        let f = d(1000)
        if (hasUpgrade(iron, 24)) f = f.times(upgradeEffect(iron, 24))
        return f
    },

    update(diff) {
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
            display() { return `找矿进度: ${format(player.iron.findingProgress)}/${format(rarity(iron))}` },
            progress() { let p = player.iron.findingProgress.div(rarity(iron)); if (player.iron.found) p = d(1); return p },
            unlocked() { return tmp.iron.layerShown },
            fillStyle() { return { "background-color": "#d8d8d8" } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#5e5e5e" } },
        },
        ironDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `进度: ${format(player.iron.progress)}/${format(hardness(iron))}` },
            progress() { return player.iron.progress.div(hardness(iron)) },
            unlocked() { return tmp.iron.layerShown },
            fillStyle() { return { "background-color": "#d8d8d8" } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#5e5e5e" } },
        },
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
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
                unlocked() { return tmp.iron.layerShown },
                name() { return '挖掘' },
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "ironFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "ironDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function () { return player.iron.found ? `你找到了一处铁矿石` : `你尚未找到铁矿石` }],
                    "blank",
                    ["display-text", function () { return `找矿速度：${format(player.copper.speed)}/秒` }],
                    ["display-text", function () { return `挖掘速度：${format(player.stone.speed)}/秒` }],
                    ["display-text", function () { return `破坏一次的铁矿石获取数量：${textStyle_h2(formatWhole(tmp.iron.gainMult), 'd8d8d8')}` }],
                    ["display-text", function () { return `稀有度：${formatWhole(rarity(iron))}` }],
                    ["display-text", function () { return `硬度：${formatWhole(hardness(iron))}` }],
                    ["display-text", function () { return `挖掘等级：2` }],
                    ["display-text", function () { return `需要在主世界挖掘` }],
                    "blank",
                    ["display-text", function () { return `对于矿石，你需要先找到才能挖掘！` }],
                ]
            },
            "upgrades": {
                unlocked() { return tmp.iron.layerShown },
                name() { return '升级' },
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
            "milestones": {
                unlocked() { return tmp.iron.layerShown },
                name() { return '里程碑' },
                content: [
                    ["blank", "15px"],
                    "milestones",
                ]
            },
            "fluid": {
                unlocked() { return hasUpgrade(ct, 51) },
                name() { return '流体' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { return `你有 ${textStyle_h2(formatWhole(player.crafting_table.items[122]) + "/27", 'd8d8d8')} 铁桶` }],
                    ["display-text", function () { return `每个铁桶可以收集 ${textStyle_h2(formatWhole(tmp.iron.fluidPerBucket) + " mB", 'd8d8d8')} 流体` }],
                    "blank",
                    ["display-text", function () { return `你有 ${textStyle_h2(formatWhole(player.iron.water) + " mB", '2b3cf4')} 水` }],
                    ["display-text", function () { return `你有 ${textStyle_h2(formatWhole(player.iron.lava) + " mB", 'd76013')} 熔岩` }],
                    "blank",
                    ["clickables", [2]],

                ]
            },
        },
    },
})

function resetBronzePowerAndBuyables() {
    let BPBs = [11, 12, 13, 21, 22]
    for (i = 0; i < BPBs.length; i++) {
        if (player.bronze.buyables[BPBs[i]].gt(0)) player.bronze.buyables[BPBs[i]] = d(0)
    }
    player.bronze.power = d(0)
}

//世界1层7：镍
addLayer("nickel", {
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
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
            singularity: d(0),
        }
    },

    color: "#fffcc0",                       // The color for this layer, which affects many elements.
    nodeStyle: { "background": "linear-gradient(90deg, #fffcc0 0%, #f5f5d7 25%, #fffcc0 50%, #e3df94 75%, #8b8566 100%)" },
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
        if (hasCraftingItem(171)) m = m.times(10000)
        if (hasCraftingItem(202)) m = m.times(tmp.constantan.essence.effect)
        if (hasMilestone(sing_fus, 3)) m = m.times(buyableEffect(sing_fus, 14))
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    layerShown() { return hasNormalAchievement(46) },          // Returns a bool for if this layer's node should be visible in the tree.

    doReset(resettingLayer) {
        return undefined
    },

    milestones: {
        0: {
            requirementDescription() { return `获得5.0000e15镍矿石` },
            effectDescription() { return `镍锭熔炼倍率锁定为镍矿石的10%` },
            done() { return player.nickel.ore.gte(5e15) },
            unlocked() { return tmp.nickel.layerShown },
        },
    },

    upgrades: {
        11: {
            title: "28号元素",
            description: "3x镍矿石获取",
            currencyInternalName: "ore",
            currencyDisplayName: "镍矿石",
            currencyLayer: nickel,
            cost() { return new ExpantaNum(5) },
            unlocked() { return hasCraftingItem(131) },
        },
        12: {
            title: "Ni→Fe",
            description: "镍矿石较微弱地加成铁矿石获取",
            currencyInternalName: "ore",
            currencyDisplayName: "镍矿石",
            currencyLayer: nickel,
            cost() { return new ExpantaNum(25) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.nickel.ore.max(0).add(2).logBase(2).pow(2).floor().max(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊log<sub>2</sub>(镍矿石+2)<sup>2</sup>⌋`
                return t
            },
        },
        13: {
            title: "Fe→Ni",
            description: "铁矿石极微弱地加成镍矿石获取",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() { return new ExpantaNum(114514) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.iron.ore.max(0).add(2).ssrt().floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊ssrt(铁矿石+2)⌋`
                return t
            },
        },
        14: {
            title: "高温的用途",
            description: "允许使用熔岩作为燃料，但是熔岩温度过高，同时需要消耗水来冷却。解锁新的熔炼配方",
            currencyInternalName: "ore",
            currencyDisplayName: "镍矿石",
            currencyLayer: nickel,
            cost() { return new ExpantaNum(255) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        15: {
            title: '造"镍"啊',
            description: "解锁更多合成配方",
            cost() { return new ExpantaNum(1) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        21: {
            title: "究级强化",
            description: "解锁下一个青铜力量强化器",
            currencyInternalName: "power",
            currencyDisplayName: "青铜力量",
            currencyLayer: bronze,
            cost() { return new ExpantaNum('1e640') },
            unlocked() { return hasMilestone(bronze, 6) },
        },
        22: {
            title: "挑战2",
            description: "需求：等级186<br>解锁下一个挑战",
            currencyInternalName: "power",
            currencyDisplayName: "青铜力量",
            currencyLayer: bronze,
            cost() { return new ExpantaNum('1e910') },
            canAfford() { return player.level.gte(186) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        23: {
            title: "镍挑战强化",
            description: "需求：等级190<br>力量削弱的奖励基数+0.1",
            currencyInternalName: "power",
            currencyDisplayName: "青铜力量",
            currencyLayer: bronze,
            cost() { return new ExpantaNum('1e990') },
            canAfford() { return player.level.gte(190) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        24: {
            title: "铁矿矿脉",
            description: "需求：等级210<br>镍锭加成铁矿石以及铁锭熔炼倍率",
            currencyInternalName: "power",
            currencyDisplayName: "青铜力量",
            currencyLayer: bronze,
            cost() { return new ExpantaNum('1e1166') },
            canAfford() { return player.level.gte(210) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.nickel.points.max(0).add(1).root(3)
                if (hasUpgrade(lead, 11)) eff = eff.pow(2)
                if (hasCraftingItem(201)) eff = eff.pow(1.5)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let power = "1/3"
                if (hasUpgrade(lead, 11)) power = "2/3"
                let t = `公式：(镍锭+1)<sup>${power}</sup>`
                if (hasCraftingItem(201)) t = `公式：镍锭+1`
                return t
            },
        },
        25: {
            title: "种类丰富的矿脉",
            description: "需求：等级210<br>解锁2种新的矿物（挖掘需要一定条件）",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() { return new ExpantaNum(2400000) },
            canAfford() { return player.level.gte(210) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击寻找"
                return d
            },
            canClick() { return !player.nickel.finding && !player.nickel.destroying && !player.nickel.found && hasCraftingItem(131) && isAtLocation('overworld') },
            onClick() {
                if (!player.nickel.finding) player.nickel.finding = true
            },
            unlocked() { return tmp.nickel.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击挖掘"
                return d
            },
            canClick() { return !player.nickel.destroying && player.nickel.found },
            onClick() {
                if (!player.nickel.destroying) player.nickel.destroying = true
            },
            unlocked() { return tmp.nickel.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
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
            goalDescription() {
                return `${format(challengeGoal(nickel, 11))} 青铜力量<br>目标公式: 1e8<sup>x</sup>·1e40
            <br>完成次数: ${formatWhole(challengeCompletions(nickel, 11))}/${formatWhole(this.completionLimit())}`
            },
            completionLimit() {
                let l = d(5)
                return l
            },
            canComplete: function () {
                return player.bronze.power.gte(challengeGoal(nickel, 11))
            },
            rewardDescription() {
                return `每完成一次都能使青铜力量的效果^(+${f(this.rewardBase())})`
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
            unlocked() { return hasCraftingItem(142) },
            style() { return { 'border-radius': '5%' } },
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
            goalDescription() {
                return `${format(challengeGoal(nickel, 12))} 青铜力量<br>目标公式: 1e90<sup>x</sup>·1e270
            <br>完成次数: ${formatWhole(challengeCompletions(nickel, 12))}/${formatWhole(this.completionLimit())}`
            },
            completionLimit() {
                let l = d(5)
                return l
            },
            canComplete: function () {
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
            unlocked() { return hasUpgrade(nickel, 22) },
            nerf() {
                if (inChallenge(this.layer, this.id)) {
                    if (!hasUpgrade(aluminum, 12)) {
                        if (player.nickel.chal2nerf.gte(1 / 600)) player.nickel.chal2nerf = player.nickel.chal2nerf.sub(1 / 600)
                        if (player.nickel.chal2nerf.lte(1 / 600)) player.nickel.chal2nerf = d(0)
                    }
                    else if (hasUpgrade(aluminum, 12)) {
                        if (player.nickel.chal2nerf.gte(1 / 1320)) player.nickel.chal2nerf = player.nickel.chal2nerf.sub(1 / 1320)
                        if (player.nickel.chal2nerf.lte(1 / 1320)) player.nickel.chal2nerf = d(0)
                    }
                }
                else player.nickel.chal2nerf = d(1)
            },
            style() { return { 'border-radius': '5%' } },
        },
    },

    bars: {
        nickelFinding: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `找矿进度: ${format(player.nickel.findingProgress)}/${format(rarity(nickel))}` },
            progress() { let p = player.nickel.findingProgress.div(rarity(nickel)); if (player.nickel.found) p = d(1); return p },
            unlocked() { return tmp.nickel.layerShown },
            fillStyle() { return { "background-color": "#fffcc0" } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#8b8556" } },
        },
        nickelDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `进度: ${format(player.nickel.progress)}/${format(hardness(nickel))}` },
            progress() { return player.nickel.progress.div(hardness(nickel)) },
            unlocked() { return tmp.nickel.layerShown },
            fillStyle() { return { "background-color": "#fffcc0" } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#8b8556" } },
        },
    },

    update(diff) {
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
        ["display-text", function () { return getPointsDisplay() }],
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
                unlocked() { return tmp.nickel.layerShown },
                name() { return '挖掘' },
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "nickelFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "nickelDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function () { return player.nickel.found ? `你找到了一处镍矿石` : `你尚未找到镍矿石` }],
                    "blank",
                    ["display-text", function () { return `找矿速度：${format(player.copper.speed)}/秒` }],
                    ["display-text", function () { return `挖掘速度：${format(player.stone.speed)}/秒` }],
                    ["display-text", function () { return `破坏一次的镍矿石获取数量：${textStyle_h2(formatWhole(tmp.nickel.gainMult), 'fffcc0')}` }],
                    ["display-text", function () { return `稀有度：${formatWhole(rarity(nickel))}` }],
                    ["display-text", function () { return `硬度：${formatWhole(hardness(nickel))}` }],
                    ["display-text", function () { return `挖掘等级：2` }],
                    ["display-text", function () { return `需要在主世界挖掘` }],
                    "blank",
                    ["display-text", function () { return `你只有合成铁质探矿杖（合成界面第7页第1个）后才能找到镍矿石！` }],
                ]
            },
            "upgrades": {
                unlocked() { return tmp.nickel.layerShown },
                name() { return '升级' },
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
            "milestones": {
                unlocked() { return tmp.nickel.layerShown },
                name() { return '里程碑' },
                content: [
                    ["blank", "15px"],
                    "milestones",
                ]
            },
            "challenges": {
                unlocked() { return hasCraftingItem(142) },
                name() { return '挑战' },
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
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
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
            singularity: d(0),
        }
    },

    color: "#e2e3ee",                       // The color for this layer, which affects many elements.
    nodeStyle: { "background": "linear-gradient(90deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)" },
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
        if (hasCraftingItem(171)) m = m.times(25)
        if (hasCraftingItem(181)) m = m.times(25)
        if (hasUpgrade(lead, 21)) m = m.times(upgradeEffect(lead, 21))
        if (hasMilestone(sing_fus, 4)) m = m.times(buyableEffect(sing_fus, 21))
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    layerShown() { return hasNormalAchievement(64) || hasUpgrade(nickel, 25) },          // Returns a bool for if this layer's node should be visible in the tree.

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
            cost() { return new ExpantaNum(5) },
            unlocked() { return tmp.aluminum.layerShown },
            effect() {
                let eff = player.bronze.power.max(1e100).logBase(1e100).sub(9.8).max(1).pow(2).floor()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：⌊log<sub>1e100</sub>(max(青铜力量, 1e1080))<sup>2</sup>⌋`
                return t
            },
        },
        12: {
            title: "缓速削弱",
            description: "时间削弱挑战现在需要66秒才会将青铜力量获取降低到1",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            cost() { return new ExpantaNum(25) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        13: {
            title: "大片丛林",
            description: "需求：1e1280青铜力量<br>丛林原木的获取^3，效果^3",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            cost() { return new ExpantaNum(45) },
            canAfford() { return player.bronze.power.gte('1e1280') },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        14: {
            title: "青铜力量强化器MK^2",
            description: "需求：等级286<br>青铜力量强化器MK.2的效果底数变为10x",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            cost() { return new ExpantaNum(60) },
            canAfford() { return player.level.gte(286) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        15: {
            title: "铝工艺品",
            description: "需求：等级315<br>解锁铝锭熔炼，和一些合成配方",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            cost() { return new ExpantaNum(1000) },
            canAfford() { return player.level.gte(315) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        21: {
            title: "铝锭生产线",
            description: "铝锭熔炼倍率x50",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            cost() { return new ExpantaNum(1200) },
            unlocked() { return hasCraftingItem(162) },
        },
        22: {
            title: "铝热剂",
            description: "升温速度变为1.5x",
            cost() { return new ExpantaNum(700) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        23: {
            title: "超级加速",
            description: "铝锭加成镍矿石获取以及镍锭熔炼倍率",
            cost() { return new ExpantaNum(1050) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.aluminum.points.max(1).pow(0.8)
                if (hasCraftingItem(201)) eff = eff.pow(1.35)
                return eff
            },
            effectDisplay() {
                return `${f(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let power = d(0.8)
                if (hasCraftingItem(201)) power = power.times(1.35)
                let t = `公式：铝锭<sup>${f(power)}</sup>`
                return t
            },
        },
        24: {
            title: "超级冲刺",
            description: "铁锭以指数加成成就点数的效果",
            cost() { return new ExpantaNum(1650) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.iron.points.max(0).add(10).log10().root(1.33)
                return eff
            },
            effectDisplay() {
                return `^${f(upgradeEffect(this.layer, this.id))}`
            },
            tooltip() {
                let t = `公式：<sup>1.33</sup>√lg(铁锭+10)`
                return t
            },
        },
        25: {
            title: "抵抗辐射",
            description: "需求：等级478<br>允许挖掘铅矿石",
            canAfford() { return player.level.gte(478) },
            cost() { return new ExpantaNum(2200) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击寻找"
                return d
            },
            canClick() { return !player.aluminum.finding && !player.aluminum.destroying && !player.aluminum.found && isAtLocation('overworld') },
            onClick() {
                if (!player.aluminum.finding) player.aluminum.finding = true
            },
            unlocked() { return tmp.aluminum.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击挖掘"
                return d
            },
            canClick() { return !player.aluminum.destroying && player.aluminum.found },
            onClick() {
                if (!player.aluminum.destroying) player.aluminum.destroying = true
            },
            unlocked() { return tmp.aluminum.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
    },

    bars: {
        aluminumFinding: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `找矿进度: ${format(player.aluminum.findingProgress)}/${format(rarity(aluminum))}` },
            progress() { let p = player.aluminum.findingProgress.div(rarity(aluminum)); if (player.aluminum.found) p = d(1); return p },
            unlocked() { return tmp.aluminum.layerShown },
            fillStyle() { return { "background-color": "#e2e3ee" } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#45464b" } },
        },
        aluminumDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `进度: ${format(player.aluminum.progress)}/${format(hardness(aluminum))}` },
            progress() { return player.aluminum.progress.div(hardness(aluminum)) },
            unlocked() { return tmp.aluminum.layerShown },
            fillStyle() { return { "background-color": "#e2e3ee" } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#45464b" } },
        },
    },

    update(diff) {
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
        ["display-text", function () { return getPointsDisplay() }],
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
                unlocked() { return tmp.aluminum.layerShown },
                name() { return '挖掘' },
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "aluminumFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "aluminumDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function () { return player.aluminum.found ? `你找到了一处铝矿石` : `你尚未找到铝矿石` }],
                    "blank",
                    ["display-text", function () { return `找矿速度：${format(player.copper.speed)}/秒` }],
                    ["display-text", function () { return `挖掘速度：${format(player.stone.speed)}/秒` }],
                    ["display-text", function () { return `破坏一次的铝矿石获取数量：${textStyle_h2(formatWhole(tmp.aluminum.gainMult), 'e2e3ee')}` }],
                    ["display-text", function () { return `稀有度：${formatWhole(rarity(aluminum))}` }],
                    ["display-text", function () { return `硬度：${formatWhole(hardness(aluminum))}` }],
                    ["display-text", function () { return `挖掘等级：2` }],
                    ["display-text", function () { return `需要在主世界挖掘` }],
                ]
            },
            "upgrades": {
                unlocked() { return tmp.aluminum.layerShown },
                name() { return '升级' },
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
        },
    },
})

//世界1层9：铅
addLayer("lead", {
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
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
            singularity: d(0),
        }
    },

    color: "#97a9e0",                       // The color for this layer, which affects many elements.
    nodeStyle: { "background": "linear-gradient(90deg, #667397 0%, #acc0ff 20%, #97a9e0 50%, #6a7392 80%, #333848 100%)" },
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
        if (hasUpgrade(lead, 12)) m = m.times(4)
        if (hasUpgrade(lead, 13)) m = m.times(upgradeEffect(lead, 13))
        if (hasUpgrade(lead, 14)) m = m.times(upgradeEffect(lead, 14))
        if (hasCraftingItem(171)) m = m.times(3)
        if (hasUpgrade(constantan, 12)) m = m.times(upgradeEffect(constantan, 12))
        m = m.floor()
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    layerShown() { return hasNormalAchievement(64) || hasUpgrade(nickel, 25) },          // Returns a bool for if this layer's node should be visible in the tree.

    doReset(resettingLayer) {
        return undefined
    },

    upgrades: {
        11: {
            title: "重量级金属",
            description: "需求：等级490<br>第9镍升级的效果变为原来的平方",
            currencyInternalName: "ore",
            currencyDisplayName: "铅矿石",
            currencyLayer: lead,
            canAfford() { return player.level.gte(490) },
            cost() { return new ExpantaNum(3) },
            unlocked() { return tmp.lead.layerShown },
        },
        12: {
            title: "铅矿矿脉",
            description: "需求：等级502<br>4x铅矿石获取",
            currencyInternalName: "ore",
            currencyDisplayName: "铅矿石",
            currencyLayer: lead,
            canAfford() { return player.level.gte(502) },
            cost() { return new ExpantaNum(5) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        13: {
            title: "铅矿自增",
            description: "需求：等级502<br>铅矿石较微弱地加成自身获取",
            currencyInternalName: "ore",
            currencyDisplayName: "铅矿石",
            currencyLayer: lead,
            canAfford() { return player.level.gte(502) },
            cost() { return new ExpantaNum(25) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.lead.ore.max(0).add(1).root(7)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：<sup>7</sup>√(铅矿石+1)`
                return t
            },
        },
        14: {
            title: "铅矿超强化",
            description: "需求：等级502<br>加成铅矿石获取",
            currencyInternalName: "ore",
            currencyDisplayName: "铅矿石",
            currencyLayer: lead,
            canAfford() { return player.level.gte(502) },
            cost() { return new ExpantaNum(40) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = d(3)
                if (hasUpgrade(lead, 22)) eff = eff.pow(upgradeEffect(lead, 22))
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let formula = "3"
                if (hasUpgrade(lead, 22)) formula = "3<sup>upgeff(铅, 7)"
                let t = `公式：${formula}`
                return t
            },
        },
        15: {
            title: "144mB熔融铅",
            description: "需求：等级502<br>解锁新的熔炼配方和合成配方",
            currencyInternalName: "ore",
            currencyDisplayName: "铅矿石",
            currencyLayer: lead,
            canAfford() { return player.level.gte(502) },
            cost() { return new ExpantaNum(140) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        21: {
            title: "铅锭加成",
            description: "需求：等级612<br>铅锭加成铝矿石获取以及铝锭熔炼倍率",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            canAfford() { return player.level.gte(612) },
            cost() { return new ExpantaNum(3200000) },
            unlocked() { return hasCraftingItem(192) },
            effect() {
                let eff = player.lead.points.max(1).pow(1.15)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：铅锭<sup>1.15</sup>`
                return t
            },
        },
        22: {
            title: "超级数量级",
            description: "需求：等级615<br>经验OoM^2以指数加成第4铅升级的效果，并且其现在可以加成铅锭熔炼倍率",
            currencyInternalName: "points",
            currencyDisplayName: "铝锭",
            currencyLayer: aluminum,
            canAfford() { return player.level.gte(615) },
            cost() { return new ExpantaNum(125000000) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.points.max(1e10).log10().log10()
                return eff
            },
            effectDisplay() {
                return `^${format(upgradeEffect(this.layer, this.id))}`
            },
            tooltip() {
                let t = `公式：lg(lg(经验))`
                return t
            },
        },
        23: {
            title: "铅手柄",
            description: "需求：等级617<br>青铜力量强化器MK.3提供免费等级到青铜力量强化器MK.2",
            canAfford() { return player.level.gte(617) },
            cost() { return new ExpantaNum(4000) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        24: {
            title: "铅宽护手",
            description: "需求：等级630<br>青铜力量强化器MK.4提供免费等级到青铜力量强化器MK.3",
            canAfford() { return player.level.gte(630) },
            cost() { return new ExpantaNum(6000) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        25: {
            title: "铅绑定结",
            description: "需求：等级635<br>青铜力量强化器MK.4提供免费等级到青铜力量强化器MK.1",
            canAfford() { return player.level.gte(635) },
            cost() { return new ExpantaNum(8000) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        31: {
            title: "全新合金！",
            description: "需求：等级648<br>解锁两种新的合金：康铜和殷钢<br>现在可以解锁康铜锭的合金",
            canAfford() { return player.level.gte(648) },
            cost() { return new ExpantaNum(12500) },
            unlocked() { return hasUpgrade(this.layer, 25) },
            style() {
                return {
                    'clip-path': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    'width': '200px',
                    'min-height': '173.205px'
                }
            }
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击寻找"
                return d
            },
            canClick() { return !player.lead.finding && !player.lead.destroying && !player.lead.found && hasUpgrade(aluminum, 25) && isAtLocation('overworld') },
            onClick() {
                if (!player.lead.finding) player.lead.finding = true
            },
            unlocked() { return tmp.lead.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击挖掘"
                return d
            },
            canClick() { return !player.lead.destroying && player.lead.found },
            onClick() {
                if (!player.lead.destroying) player.lead.destroying = true
            },
            unlocked() { return tmp.lead.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
    },

    bars: {
        leadFinding: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `找矿进度: ${format(player.lead.findingProgress)}/${format(rarity(lead))}` },
            progress() { let p = player.lead.findingProgress.div(rarity(lead)); if (player.lead.found) p = d(1); return p },
            unlocked() { return tmp.lead.layerShown },
            fillStyle() { return { "background-color": "#97a9e0" } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#667397" } },
        },
        leadDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `进度: ${format(player.lead.progress)}/${format(hardness(lead))}` },
            progress() { return player.lead.progress.div(hardness(lead)) },
            unlocked() { return tmp.lead.layerShown },
            fillStyle() { return { "background-color": "#97a9e0" } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#667397" } },
        },
    },

    update(diff) {
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
        ["display-text", function () { return getPointsDisplay() }],
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
                unlocked() { return tmp.lead.layerShown },
                name() { return '挖掘' },
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "leadFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "leadDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function () { return player.lead.found ? `你找到了一处铅矿石` : `你尚未找到铅矿石` }],
                    "blank",
                    ["display-text", function () { return `找矿速度：${format(player.copper.speed)}/秒` }],
                    ["display-text", function () { return `挖掘速度：${format(player.stone.speed)}/秒` }],
                    ["display-text", function () { return `破坏一次的铅矿石获取数量：${textStyle_h2(formatWhole(tmp.lead.gainMult), '97a9e0')}` }],
                    ["display-text", function () { return `稀有度：${formatWhole(rarity(lead))}` }],
                    ["display-text", function () { return `硬度：${formatWhole(hardness(lead))}` }],
                    ["display-text", function () { return `挖掘等级：2` }],
                    ["display-text", function () { return `需要在主世界挖掘` }],
                    "blank",
                    ["display-text", function () { return `在购买第10个铝升级之后可以挖掘铅矿石` }],
                ]
            },
            "upgrades": {
                unlocked() { return tmp.lead.layerShown },
                name() { return '升级' },
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
        },
    },
})

//世界1层10：康铜
addLayer("constantan", {
    componentStyles: {
        "buyable"() {
            return {
                'margin-left': '-7px',
                'margin-right': '-7px',
            }
        }
    },
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: d(0),             // "points" is the internal name for the main resource of the layer.
            ore: d(0),
            molten: d(0),
            essence: d(0),
        }
    },

    color: "#eeba4f",                       // The color for this layer, which affects many elements.
    nodeStyle: {
        "background": "linear-gradient(90deg, #d39f49 0%, #ffd37c 30%, #eeba4f 80%, #7d6233 100%)",
    },
    resource: "康铜锭",            // The name of this layer's main prestige resource.
    symbol: "康铜",
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 9,
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
    // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    layerShown() { return hasNormalAchievement(75) },

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
            title: "二号合金",
            description: "3倍康铜锭合金倍率",
            cost() { return new ExpantaNum(40) },
            unlocked() { return tmp.constantan.layerShown },
        },
        12: {
            title: "康铜加成铅",
            description: "康铜加成铅矿石获取以及铅锭熔炼倍率",
            cost() { return new ExpantaNum(160) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.constantan.points.max(0).add(1).pow(1.08)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：(康铜锭+1)<sup>1.08</sup>`
                return t
            },
        },
        13: {
            title: "康铜生产线",
            description: "10x康铜锭合金倍率",
            cost() { return new ExpantaNum(800) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        14: {
            title: "自动制造工具",
            description: "需求：等级677<br>被动获得重置获得的100%的合成台、熔炉和合金炉",
            canAfford() { return player.level.gte(677) },
            cost() { return new ExpantaNum(8000) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        15: {
            title: "康铜制造",
            description: "需求：等级677<br>解锁康铜相关制作图纸",
            canAfford() { return player.level.gte(677) },
            cost() { return new ExpantaNum(12000) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        21: {
            title: "康铜：精华还原",
            description: "需求：等级773<br>康铜锭加成康铜精华获取",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(773) },
            cost() { return new ExpantaNum(1234) },
            unlocked() { return tmp.constantan.layerShown },
            effect() {
                let eff = player.constantan.points.max(0).add(1).pow(0.66)
                if (hasUpgrade(constantan, 32)) eff = eff.pow(2)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let power = "0.66"
                if (hasUpgrade(constantan, 32)) power = "1.32"
                let t = `公式：(康铜锭+1)<sup>${power}</sup>`
                return t
            },
        },
        22: {
            title: "康铜：精华凝聚",
            description: "需求：等级777<br>康铜精华也能加成康铜锭合金倍率，但是效果倍率降低",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(777) },
            cost() { return new ExpantaNum(10000000) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = tmp.constantan.essence.effect.max(1).root(2.2025)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：<sup>2.2025</sup>√康铜精华效果`
                return t
            },
        },
        23: {
            title: "康铜种子",
            description: "需求：等级790<br>青铜力量的OoM加成康铜精华获取",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(790) },
            cost() { return new ExpantaNum(1e9) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.bronze.power.max(10).log10()
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：lg(青铜力量)`
                return t
            },
        },
        24: {
            title: "更快的生长",
            description: "需求：等级809<br>康铜精华以指数加强青铜力量的效果",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(809) },
            cost() { return new ExpantaNum(1e28) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.constantan.essence.max(10).logBase(10).logBase(10).root(1.6).div(3.2).add(1)
                return eff
            },
            effectDisplay() {
                return `^${format(upgradeEffect(this.layer, this.id))}`
            },
            tooltip() {
                let t = `公式：lg(lg(康铜精华))<sup>0.625</sup>/3.2+1`
                return t
            },
        },
        25: {
            title: "精华膨胀",
            description: "需求：等级960<br>1,000,000x康铜精华获取，解锁更多升级",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(960) },
            cost() { return new ExpantaNum(5e28) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        31: {
            title: "精华肥料",
            description: "需求：等级989<br>每升一级 康铜精华倍增：底数加强 康铜精华获取就变为10x",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(989) },
            cost() { return new ExpantaNum(5e58) },
            unlocked() { return hasUpgrade(constantan, 25) },
            effect() {
                let eff = d(10).pow(getBuyableAmount(constantan, 12).max(0))
                if (hasUpgrade(constantan, 33)) eff = eff.pow(3)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：10<sup>buyamt(康铜, 2)</sup>`
                if (hasUpgrade(constantan, 33)) t = `公式：1,000<sup>buyamt(康铜, 2)</sup>`
                return t
            },
        },
        32: {
            title: "精华改良",
            description: "需求：等级1,033<br>康铜升级6的效果变为原来的^2",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(1033) },
            cost() { return new ExpantaNum(1e117) },
            unlocked() { return hasUpgrade(constantan, 31) },
        },
        33: {
            title: "充满康铜的世界",
            description: "需求：等级1,175<br>康铜升级11的效果变为原来的^3，其底数因此变为1000x",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(1175) },
            cost() { return new ExpantaNum(1e222) },
            unlocked() { return hasUpgrade(constantan, 32) },
        },
        34: {
            title: "极限压缩的成本",
            description: "需求：等级1,256<br>康铜精华倍增：底数加强的购买价格变为原来的^0.07",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(1256) },
            cost() { return new ExpantaNum('1e420') },
            unlocked() { return hasUpgrade(constantan, 33) },
        },
        35: {
            title: "康铜倍增的终幕",
            description: "需求：等级1,540<br>现在可以解锁更多的自动化，自动购买最大木头倍增器和4个青铜力量购买项",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(1540) },
            cost() { return new ExpantaNum('1e2100') },
            unlocked() { return hasUpgrade(constantan, 34) },
        },
        41: {
            title: "强强联手",
            description: "需求：等级1,552<br>1e20x合金炉获取",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(1552) },
            cost() { return new ExpantaNum('5e2100') },
            unlocked() { return hasUpgrade(constantan, 35) },
            style() {
                return {
                    'width': '750px',
                    'border-radius': '3.75px',
                }
            },
        },
    },

    buyables: {
        11: {
            title: "康铜精华倍增",
            cost(x) { return d(10).pow(x) },
            free() {
                let f = d(0)
                return f
            },
            purchaseLimit() {
                let l = d(2000)
                if (hasUpgrade(invar, 13)) l = l.add(200)
                if (hasNormalAchievement(85)) l = l.add(tmp.invar.energy.effect2)
                return l
            },
            display() {
                let freedis = ""
                if (this.free().gte(1)) freedis = ` + ${formatWhole(this.free())}`
                let display = `加成康铜精华获取<br>
                效果公式：${format(this.effBase())}<sup>x</sup><br>
                等级：${formatWhole(player[this.layer].buyables[this.id])}${freedis} / ${fw(this.purchaseLimit())}<br>
                当前效果：${format(this.effect())}x<br>
                价格：${format(this.cost())} 康铜精华`
                return display
            },
            canAfford() { return player[this.layer].essence.gte(this.cost()) },
            buyMax() {
                if (this.canAfford())
                    return setBuyableAmount(constantan, 11, player.constantan.essence.max(1).log10().floor().add(1).min(this.purchaseLimit()))
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player[this.layer].essence = player[this.layer].essence.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            auto() {
                if (hasMilestone(constantan, 3)) this.buyMax()
            },
            effBase() {
                let b = d(2)
                if (hasMilestone(constantan, 0)) b = b.add(buyableEffect(constantan, 12))
                return b
            },
            effect(x) {
                let effect = ExpantaNum.pow(this.effBase(), x.add(this.free()).max(0))
                return effect
            },
            unlocked() { return hasCraftingItem(202) },
            style() {
                if (this.canAfford()) return {
                    "background": "linear-gradient(45deg, #d39f49 0%, #ffd37c 30%, #eeba4f 80%, #7d6233 100%)", 'background-color': '#ffd7a1',
                }
            },
        },
        12: {
            title: "康铜精华倍增：底数加强",
            cost(x) {
                let c = d(10).pow(d(2).pow(x)).times(1e14)
                if (hasUpgrade(constantan, 34)) c = c.pow(0.07)
                return c
            },
            free() {
                let f = d(0)
                return f
            },
            purchaseLimit() {
                let l = d(16)
                if (hasUpgrade(alumbrass, 13)) l = l.add(2)
                if (hasUpgrade(brass, 'a3')) l = d(Infinity)
                return l
            },
            display() {
                let freedis = ""
                if (this.free().gte(1)) freedis = ` + ${formatWhole(this.free())}`
                let limitdis = "/ " + fw(this.purchaseLimit())
                if (hasUpgrade(brass, 'a3')) limitdis = ""
                let display = `提升康铜精华倍增的底数<br>
                效果公式：${format(this.effBase())}x<br>
                等级：${formatWhole(player[this.layer].buyables[this.id])}${freedis} ${limitdis}<br>
                当前效果：+${format(this.effect())}<br>
                价格：${format(this.cost())} 康铜精华`
                return display
            },
            canAfford() { return player[this.layer].essence.gte(this.cost()) },
            buyMax() {
                let e = d(1)
                if (this.canAfford()) {
                    if (hasUpgrade(constantan, 34)) e = d(0.07)
                    return setBuyableAmount(constantan, 12, player.constantan.essence.root(e).max(1).div(1e14).logBase(10).max(0.1).logBase(2).floor().add(1).min(this.purchaseLimit()))
                }
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player[this.layer].essence = player[this.layer].essence.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effBase() {
                let b = d(0.5)
                if (hasUpgrade(brass, 'a3')) b = b.add(0.1)
                return b
            },
            effect(x) {
                let effect = x.times(this.effBase())
                return effect
            },
            unlocked() { return hasMilestone(constantan, 0) },
            canAuto() { return hasMilestone(brass, 1) },
            auto() {
                if (this.canAuto())
                    this.buyMax()
            },
            style() {
                if (this.canAfford()) return {
                    "background": "linear-gradient(45deg, #d39f49 0%, #ffd37c 30%, #eeba4f 80%, #7d6233 100%)", 'background-color': '#ffd7a1',
                }
            },
        },
        13: {
            title: "康铜精华自然倍增",
            cost(x) { return d(2).pow(x.pow(2)).times(1e100) },
            free() {
                let f = d(0)
                return f
            },
            display() {
                let freedis = ""
                if (this.free().gte(1)) freedis = ` + ${formatWhole(this.free())}`
                let display = `加成康铜精华获取<br>
                效果公式：e<sup>x</sup><br>
                等级：${formatWhole(player[this.layer].buyables[this.id])}${freedis}<br>
                当前效果：${format(this.effect())}x<br>
                价格：${format(this.cost())} 康铜精华`
                return display
            },
            canAfford() { return player[this.layer].essence.gte(this.cost()) },
            buyMax() {
                if (this.canAfford())
                    return setBuyableAmount(constantan, 13, player.constantan.essence.max(1).div(1e100).logBase(2).max(0).root(2).floor().add(1))
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player[this.layer].essence = player[this.layer].essence.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            auto() {
                if (hasMilestone(constantan, 3)) this.buyMax()
            },
            effBase() {
                let b = ExpantaNum.E
                return b
            },
            effect(x) {
                let effect = this.effBase().pow(x.max(0))
                return effect
            },
            unlocked() { return hasMilestone(constantan, 2) },
            style() {
                if (this.canAfford()) return {
                    "background": "linear-gradient(45deg, #d39f49 0%, #ffd37c 30%, #eeba4f 80%, #7d6233 100%)", 'background-color': '#ffd7a1',
                }
            },
        },
    },

    milestones: {
        0: {
            requirementDescription() { return `获得1000康铜精华` },
            effectDescription() { return `解锁新的康铜升级` },
            done() { return player.constantan.essence.gte(1000) },
            unlocked() { return hasCraftingItem(202) },
        },
        1: {
            requirementDescription() { return `获得1.0000e15康铜精华` },
            effectDescription() { return `解锁第2个康铜精华购买项` },
            done() { return player.constantan.essence.gte(1e15) },
            unlocked() { return hasCraftingItem(202) },
        },
        2: {
            requirementDescription() { return `获得1.0000e100康铜精华 + 到达等级1,025` },
            effectDescription() { return `解锁第3个康铜精华购买项` },
            done() { return player.constantan.essence.gte(1e100) && player.level.gte(1025) },
            unlocked() { return hasCraftingItem(202) },
        },
        3: {
            requirementDescription() { return `获得1.000e10,000康铜精华` },
            effectDescription() { return `自动购买最大康铜精华倍增和康铜精华自然倍增` },
            done() { return player.constantan.essence.gte('1e10000') },
            unlocked() { return hasCraftingItem(202) },
        },
    },

    essence: {
        gain() {
            let g = d(0)
            if (hasCraftingItem(202)) g = g.add(1),
                g = g.times(buyableEffect(constantan, 11))
            if (hasUpgrade(constantan, 21)) g = g.times(upgradeEffect(constantan, 21))
            if (hasUpgrade(constantan, 23)) g = g.times(upgradeEffect(constantan, 23))
            if (hasUpgrade(constantan, 25)) g = g.times(1000000)
            if (hasUpgrade(constantan, 31)) g = g.times(upgradeEffect(constantan, 31))
            if (hasMilestone(constantan, 2)) g = g.times(buyableEffect(constantan, 13))
            return g
        },
        effect() {
            let eff = d(10).pow(player.constantan.essence.max(0).add(1).log10().times(3).pow(0.5))
            if (hasUpgrade(zinc, 25)) eff = eff.pow(upgradeEffect(zinc, 25))
            return eff
        },
    },

    update(diff) {
        if (player.constantan.points.gt(player.constantan.best)) player.constantan.best = player.constantan.points

        if (hasCraftingItem(202)) player.constantan.essence = player.constantan.essence.add(tmp.constantan.essence.gain.div(tick))
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.constantan.best)} 康铜锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "upgrades": {
                unlocked() { return tmp.constantan.layerShown },
                name() { return '升级' },
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
            "milestones": {
                unlocked() { return hasCraftingItem(202) },
                name() { return '里程碑' },
                content: [
                    ["blank", "15px"],
                    "milestones",
                ]
            },
            "essence": {
                unlocked() { return hasCraftingItem(202) },
                name() { return '康铜精华' },
                content: [
                    ["blank", "15px"],
                    ["raw-html", () => `<h4 style="opacity:.5">神秘农业：抢我活是吧！`],
                    ["display-text", function () { return `你有 ${textStyle_h2(f(player.constantan.essence), 'eeba4f')} 康铜精华，加成镍矿石获取 ${textStyle_h2(f(tmp.constantan.essence.effect) + "x", 'eeba4f')}` }],
                    ["display-text", function () { return `(+${textStyle_h2(f(tmp.constantan.essence.gain), 'eeba4f')}/秒)` }],
                    ["display-text", function () {
                        let p = d(1)
                        if (hasUpgrade(zinc, 25)) p = p.times(upgradeEffect(zinc, 25))
                        let pt = p.gt(1) ? "·" + f(p) : ""
                        return shiftDown ? `康铜精华效果公式：10<sup>(3lg(x+1))<sup>0.5</sup>${pt}</sup>` : ""
                    }],
                    "blank",
                    "buyables",
                ]
            },
        },
    },
})

function resetInvarDimEnergy() {
    let dimIntervalID = [11, 12, 21, 22, 31, 32, 41, 42]
    for (i = 0; i < dimIntervalID.length; i++) {
        setBuyableAmount(invar, dimIntervalID[i], d(0))
    }
    player.invar.energy = d(0)
    player.invar.dimensions = [d(0), d(0), d(0), d(0), d(0), d(0), d(0), d(0)]
    player.invar.dimensions_inc = [d(0), d(0), d(0), d(0), d(0), d(0), d(0), d(0)]
    player.invar.resetDelay = 1
}

function resetInvarDEandDB() {
    resetInvarDimEnergy()
    player.invar.buyables[51] = d(0)
}

//世界1层11：殷钢
addLayer("invar", {
    componentStyles: {
        "buyable"() {
            return {
                'margin-left': '-7px',
                'margin-right': '-7px',
                'line-height': '80%'
            }
        }
    },
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: d(0),             // "points" is the internal name for the main resource of the layer.
            ore: d(0),
            molten: d(0),
            energy: d(0),
            dimensions: [d(0), d(0), d(0), d(0), d(0), d(0), d(0), d(0)],
            dimensions_inc: [d(0), d(0), d(0), d(0), d(0), d(0), d(0), d(0)],
            resetDelay: 0,
        }
    },

    color: "#95a7a1",                       // The color for this layer, which affects many elements.
    nodeStyle: {
        "background": "linear-gradient(90deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
    },
    resource: "殷钢锭",            // The name of this layer's main prestige resource.
    symbol: "殷钢",
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 10,
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
    // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    layerShown() { return hasNormalAchievement(75) },

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
            title: "实用合金",
            description: "5倍殷钢锭合金倍率",
            cost() { return new ExpantaNum(40) },
            unlocked() { return tmp.invar.layerShown },
        },
        12: {
            title: "康铜锁定",
            description: "康铜锭的合金倍率被锁定为铜锭、镍锭最小值的^0.5",
            cost() { return new ExpantaNum(200) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        13: {
            title: "突破等级",
            description: "需求：等级1,842<br>康铜精华倍增的等级上限+200",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(1842) },
            cost() { return new ExpantaNum('8.888e2188') },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        14: {
            title: "殷钢大板",
            description: "需求：等级1,858<br>青铜力量强化器MK.2提供免费等级到青铜力量强化器MK.1",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(1842) },
            cost() { return new ExpantaNum('8.888e2438') },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        15: {
            title: "殷钢的实用性",
            description: "需求：等级2,160<br>现在可以解锁更多关于殷钢的合成图纸",
            currencyInternalName: "power",
            currencyDisplayName: "青铜力量",
            currencyLayer: bronze,
            canAfford() { return player.level.gte(2160) },
            cost() { return new ExpantaNum('1e15000') },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        21: {
            title: "维度提升",
            description: "解锁殷钢维度提升",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            cost() { return new ExpantaNum(1e10) },
            unlocked() { return hasNormalAchievement(85) },
        },
        22: {
            title: "殷钢提升维度",
            description: "殷钢锭加成第1殷钢维度的倍数",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            cost() { return new ExpantaNum(1e16) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.invar.points.max(0).add(1).root(1.4)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：<sup>1.4</sup>√殷钢锭`
                return t
            },
        },
        23: {
            title: "殷钢锭生产线",
            description: "10x殷钢锭合金倍率",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            cost() { return new ExpantaNum(1e30) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        24: {
            title: "维度献祭青春版",
            description: "需求：等级2,721<br>第1殷钢维度的数量加成第8殷钢维度的倍数",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            canAfford() { return player.level.gte(2721) },
            cost() { return new ExpantaNum(1e38) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.invar.dimensions_inc[0].max(1).log10().pow(2.5).add(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：lg(第1殷钢维度)<sup>2.5</sup>+1`
                return t
            },
        },
        25: {
            title: "维度提升^2",
            description: "需求：等级2,820<br>维度提升的基数+1",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            canAfford() { return player.level.gte(2820) },
            cost() { return new ExpantaNum(1e47) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        31: {
            title: "星系",
            description: "需求：等级2,840<br>解锁殷钢星系",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            canAfford() { return player.level.gte(2840) },
            cost() { return new ExpantaNum(1e58) },
            unlocked() { return hasUpgrade(invar, 25) },
        },
        32: {
            title: "熔炼提升",
            description: "需求：等级2,880<br>殷钢能量加成殷钢锭合金倍率",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            canAfford() { return player.level.gte(2880) },
            cost() { return new ExpantaNum(1e81) },
            unlocked() { return hasUpgrade(invar, 31) },
            effect() {
                let eff = d(10).pow(player.invar.energy.max(1).log10().pow(0.75).div(5))
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：10<sup>lg(殷钢能量)<sup>0.75</sup>/5</sup>`
                return t
            },
        },
        33: {
            title: "半自动维度1~2",
            description: "需求：等级3,550<br>每时刻购买1次第1~2殷钢维度",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            canAfford() { return player.level.gte(3550) },
            cost() { return new ExpantaNum(1e153) },
            unlocked() { return hasUpgrade(invar, 32) },
        },
        34: {
            title: "半自动维度3~4",
            description: "需求：等级3,620<br>每时刻购买1次第3~4殷钢维度",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            canAfford() { return player.level.gte(3620) },
            cost() { return new ExpantaNum(1e180) },
            unlocked() { return hasUpgrade(invar, 33) },
        },
        35: {
            title: "半自动维度5~6",
            description: "需求：等级3,660<br>每时刻购买1次第5~6殷钢维度",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            canAfford() { return player.level.gte(3660) },
            cost() { return new ExpantaNum(1e210) },
            unlocked() { return hasUpgrade(invar, 34) },
        },
        41: {
            title: "半自动维度7~8",
            description: "需求：等级3,720<br>每时刻购买1次第7~8殷钢维度",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            canAfford() { return player.level.gte(3720) },
            cost() { return new ExpantaNum(1e280) },
            unlocked() { return hasUpgrade(invar, 35) },
        },
        42: {
            title: "铸模的最佳材料",
            description: "需求：等级4,040<br>解锁一个新的合金层级：铝黄铜<br>同时现在可以解锁铝黄铜锭的合金",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            canAfford() { return player.level.gte(4040) },
            cost() { return new ExpantaNum('1e410') },
            unlocked() { return hasUpgrade(invar, 41) },
        },
    },

    buyables: {
        11: {
            title: "",
            cost(x) {
                let c = d(0)
                if (x.lt(103)) c = d(1000).pow(x)
                if (x.gte(103)) c = d(1000).pow(x.sub(101).pow(1.3)).times(1e303)
                return c
            },
            display() {
                let display = `第1殷钢维度 | ${f(this.mult())}x<br>
                数量：${f(player.invar.dimensions_inc[0])}(${fw(player[this.layer].buyables[this.id])})<br>
                价格：${f(this.cost())} 殷钢能量`
                return display
            },
            mult() {
                let m = d(1)
                m = m.times(tmp.invar.allDimMulti)
                m = m.times(tmp.invar.multPer1DimBuy.pow(getBuyableAmount(this.layer, this.id).max(0)))
                m = m.times(tmp.invar.buyables[51].base.pow(getBuyableAmount(invar, 51).max(0)))
                if (hasUpgrade(invar, 22)) m = m.times(upgradeEffect(invar, 22))
                return m
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buyMax() {
                let x = player.invar.energy
                if (this.canAfford()) {
                    if (x.lt(Number.MAX_VALUE)) return setBuyableAmount(this.layer, this.id, x.max(0.1).logBase(1000).floor().add(1).max(0))
                    if (x.gte(Number.MAX_VALUE)) return setBuyableAmount(this.layer, this.id, x.div(1e303).max(1).logBase(1000).root(1.3).add(101).floor().add(1))
                }
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player[this.layer].energy = player[this.layer].energy.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            dim() {
                if (player.invar.dimensions_inc[1].gt(0) || getBuyableAmount(invar, 11).gt(0))
                    player.invar.energy = player.invar.energy.add(tmp.invar.energy.gain.div(tick)),
                        player.invar.dimensions_inc[0] = player.invar.dimensions[0].add(getBuyableAmount(this.layer, this.id))
            },
            auto() {
                if (hasUpgrade(invar, 33)) autobuyBuyables1perTick(this.layer, this.id)
                if (hasUpgrade(brass, 25)) this.buyMax()
            },
            unlocked() { return hasNormalAchievement(85) },
            style() {
                if (this.canAfford()) return {
                    "background": "linear-gradient(90deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'left': '15px',
                }
                else return {
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'left': '15px',
                }
            },
        },
        12: {
            title: "",
            cost(x) {
                let c = d(0)
                if (x.lt(77)) c = d(10000).pow(x).times(100)
                if (x.gte(77)) c = d(10000).pow(x.sub(75).pow(1.3)).times(1e302)
                return c
            },
            display() {
                let display = `第2殷钢维度 | ${f(this.mult())}x<br>
                数量：${f(player.invar.dimensions_inc[1])}(${fw(player[this.layer].buyables[this.id])})<br>
                价格：${f(this.cost())} 殷钢能量`
                return display
            },
            mult() {
                let m = d(1)
                m = m.times(tmp.invar.allDimMulti)
                m = m.times(tmp.invar.multPer1DimBuy.pow(getBuyableAmount(this.layer, this.id).max(0)))
                m = m.times(tmp.invar.buyables[51].base.pow(getBuyableAmount(invar, 51).max(0)))
                return m
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buyMax() {
                let x = player.invar.energy
                if (this.canAfford()) {
                    if (x.lt(Number.MAX_VALUE)) return setBuyableAmount(this.layer, this.id, x.div(100).max(0.1).logBase(10000).floor().add(1).max(0))
                    if (x.gte(Number.MAX_VALUE)) return setBuyableAmount(this.layer, this.id, x.div(1e302).max(1).logBase(10000).root(1.3).add(75).floor().add(1))
                }
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player[this.layer].energy = player[this.layer].energy.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            dim() {
                if (player.invar.dimensions_inc[1].gt(0))
                    player.invar.dimensions[0] = player.invar.dimensions[0].add(tmp.invar.dimGain.d1.div(tick))
                player.invar.dimensions_inc[1] = player.invar.dimensions[1].add(getBuyableAmount(this.layer, this.id))
            },
            auto() {
                if (hasUpgrade(invar, 33)) autobuyBuyables1perTick(this.layer, this.id)
                if (hasUpgrade(brass, 25)) this.buyMax()
            },
            unlocked() { return hasNormalAchievement(85) },
            style() {
                if (this.canAfford()) return {
                    "background": "linear-gradient(90deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'right': '15px',
                    'top': '30px',
                }
                else return {
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'right': '15px',
                    'top': '30px',
                }
            },
        },
        21: {
            title: "",
            cost(x) {
                let c = d(0)
                if (x.lt(52)) c = d(100000).pow(x).times(100000)
                if (x.gte(52)) c = d(100000).pow(x.sub(50).pow(1.3)).times(1e300)
                return c
            },
            display() {
                let display = `第3殷钢维度 | ${f(this.mult())}x<br>
                数量：${f(player.invar.dimensions_inc[2])}(${fw(player[this.layer].buyables[this.id])})<br>
                价格：${f(this.cost())} 殷钢能量`
                return display
            },
            mult() {
                let m = d(1)
                m = m.times(tmp.invar.allDimMulti)
                m = m.times(tmp.invar.multPer1DimBuy.pow(getBuyableAmount(this.layer, this.id).max(0)))
                m = m.times(tmp.invar.buyables[51].base.pow(getBuyableAmount(invar, 51).max(0)))
                return m
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buyMax() {
                let x = player.invar.energy
                if (this.canAfford()) {
                    if (x.lt(Number.MAX_VALUE)) return setBuyableAmount(this.layer, this.id, x.div(100000).max(0.1).logBase(100000).floor().add(1).max(0))
                    if (x.gte(Number.MAX_VALUE)) return setBuyableAmount(this.layer, this.id, x.div(1e300).max(1).logBase(100000).root(1.3).add(50).floor().add(1))
                }
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player[this.layer].energy = player[this.layer].energy.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            dim() {
                if (player.invar.dimensions_inc[2].gt(0))
                    player.invar.dimensions[1] = player.invar.dimensions[1].add(tmp.invar.dimGain.d2.div(tick))
                player.invar.dimensions_inc[2] = player.invar.dimensions[2].add(getBuyableAmount(this.layer, this.id))
            },
            auto() {
                if (hasUpgrade(invar, 34)) autobuyBuyables1perTick(this.layer, this.id)
                if (hasUpgrade(brass, 25)) this.buyMax()
            },
            unlocked() { return hasNormalAchievement(85) },
            style() {
                if (this.canAfford()) return {
                    "background": "linear-gradient(90deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'left': '15px',
                }
                else return {
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'left': '15px',
                }
            },
        },
        22: {
            title: "",
            cost(x) {
                let c = d(0)
                if (x.lt(43)) c = d(10000000).pow(x).times(30000000)
                if (x.gte(43)) c = d(10000000).pow(x.sub(41).pow(1.3)).times(3e300)
                return c
            },
            display() {
                let display = `第4殷钢维度 | ${f(this.mult())}x<br>
                数量：${f(player.invar.dimensions_inc[3])}(${fw(player[this.layer].buyables[this.id])})<br>
                价格：${f(this.cost())} 殷钢能量`
                return display
            },
            mult() {
                let m = d(1)
                m = m.times(tmp.invar.allDimMulti)
                m = m.times(tmp.invar.multPer1DimBuy.pow(getBuyableAmount(this.layer, this.id).max(0)))
                m = m.times(tmp.invar.buyables[51].base.pow(getBuyableAmount(invar, 51).max(0)))
                return m
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buyMax() {
                let x = player.invar.energy
                if (this.canAfford()) {
                    if (x.lt(Number.MAX_VALUE)) return setBuyableAmount(this.layer, this.id, x.div(30000000).max(0.1).logBase(10000000).floor().add(1).max(0))
                    if (x.gte(Number.MAX_VALUE)) return setBuyableAmount(this.layer, this.id, x.div(3e300).max(1).logBase(10000000).root(1.3).add(41).floor().add(1))
                }
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player[this.layer].energy = player[this.layer].energy.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            dim() {
                if (player.invar.dimensions_inc[3].gt(0))
                    player.invar.dimensions[2] = player.invar.dimensions[2].add(tmp.invar.dimGain.d3.div(tick))
                player.invar.dimensions_inc[3] = player.invar.dimensions[3].add(getBuyableAmount(this.layer, this.id))
            },
            auto() {
                if (hasUpgrade(invar, 34)) autobuyBuyables1perTick(this.layer, this.id)
                if (hasUpgrade(brass, 25)) this.buyMax()
            },
            unlocked() { return hasNormalAchievement(85) },
            style() {
                if (this.canAfford()) return {
                    "background": "linear-gradient(90deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'right': '15px',
                    'top': '30px',
                }
                else return {
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'right': '15px',
                    'top': '30px',
                }
            },
        },
        31: {
            title: "",
            cost(x) {
                let c = d(0)
                if (x.lt(34)) c = d(1e9).pow(x).times(1e9)
                if (x.gte(34)) c = d(1e9).pow(x.sub(32).pow(1.3)).times(1e297)
                return c
            },
            display() {
                let display = `第5殷钢维度 | ${f(this.mult())}x<br>
                数量：${f(player.invar.dimensions_inc[4])}(${fw(player[this.layer].buyables[this.id])})<br>
                价格：${f(this.cost())} 殷钢能量`
                return display
            },
            mult() {
                let m = d(1)
                m = m.times(tmp.invar.allDimMulti)
                m = m.times(tmp.invar.multPer1DimBuy.pow(getBuyableAmount(this.layer, this.id).max(0)))
                m = m.times(tmp.invar.buyables[51].base.pow(getBuyableAmount(invar, 51).sub(1).max(0)))
                return m
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buyMax() {
                let x = player.invar.energy
                if (this.canAfford()) {
                    if (x.lt(Number.MAX_VALUE)) return setBuyableAmount(this.layer, this.id, x.div(1e9).max(0.1).logBase(1e9).floor().add(1).max(0))
                    if (x.gte(Number.MAX_VALUE)) return setBuyableAmount(this.layer, this.id, x.div(1e297).max(1).logBase(1e9).root(1.3).add(32).floor().add(1))
                }
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player[this.layer].energy = player[this.layer].energy.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            dim() {
                if (player.invar.dimensions_inc[4].gt(0))
                    player.invar.dimensions[3] = player.invar.dimensions[3].add(tmp.invar.dimGain.d4.div(tick))
                player.invar.dimensions_inc[4] = player.invar.dimensions[4].add(getBuyableAmount(this.layer, this.id))
            },
            auto() {
                if (hasUpgrade(invar, 35)) autobuyBuyables1perTick(this.layer, this.id)
                if (hasUpgrade(brass, 25)) this.buyMax()
            },
            unlocked() { return player.invar.buyables[51].gte(1) },
            style() {
                let leftshift = d(15)
                if (!tmp.invar.buyables[32].unlocked) leftshift = d(-225)
                if (this.canAfford()) return {
                    "background": "linear-gradient(90deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'left': `${fw(leftshift)}px`,
                }
                else return {
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'left': `${fw(leftshift)}px`,
                }
            },
        },
        32: {
            title: "",
            cost(x) {
                let c = d(0)
                if (x.lt(29)) c = d(1e10).pow(x).times(1e19)
                if (x.gte(29)) c = d(1e10).pow(x.sub(27).pow(1.3)).times(1e289)
                return c
            },
            display() {
                let display = `第6殷钢维度 | ${f(this.mult())}x<br>
                数量：${f(player.invar.dimensions_inc[5])}(${fw(player[this.layer].buyables[this.id])})<br>
                价格：${f(this.cost())} 殷钢能量`
                return display
            },
            mult() {
                let m = d(1)
                m = m.times(tmp.invar.allDimMulti)
                m = m.times(tmp.invar.multPer1DimBuy.pow(getBuyableAmount(this.layer, this.id).max(0)))
                m = m.times(tmp.invar.buyables[51].base.pow(getBuyableAmount(invar, 51).sub(2).max(0)))
                return m
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buyMax() {
                let x = player.invar.energy
                if (this.canAfford()) {
                    if (x.lt(Number.MAX_VALUE)) return setBuyableAmount(this.layer, this.id, x.div(1e19).max(0.1).logBase(1e10).floor().add(1).max(0))
                    if (x.gte(Number.MAX_VALUE)) return setBuyableAmount(this.layer, this.id, x.div(1e289).max(1).logBase(1e10).root(1.3).add(27).floor().add(1))
                }
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player[this.layer].energy = player[this.layer].energy.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            dim() {
                if (player.invar.dimensions_inc[5].gt(0))
                    player.invar.dimensions[4] = player.invar.dimensions[4].add(tmp.invar.dimGain.d5.div(tick))
                player.invar.dimensions_inc[5] = player.invar.dimensions[5].add(getBuyableAmount(this.layer, this.id))
            },
            auto() {
                if (hasUpgrade(invar, 35)) autobuyBuyables1perTick(this.layer, this.id)
                if (hasUpgrade(brass, 25)) this.buyMax()
            },
            unlocked() { return getBuyableAmount(invar, 51).gte(2) },
            style() {
                if (this.canAfford()) return {
                    "background": "linear-gradient(90deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'right': '15px',
                    'top': '30px',
                }
                else return {
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'right': '15px',
                    'top': '30px',
                }
            },
        },
        41: {
            title: "",
            cost(x) {
                let c = d(0)
                if (x.lt(24)) c = d(1e12).pow(x).times(1e25)
                if (x.gte(24)) c = d(1e12).pow(x.sub(22).pow(1.3)).times(1e289)
                return c
            },
            display() {
                let display = `第7殷钢维度 | ${f(this.mult())}x<br>
                数量：${f(player.invar.dimensions_inc[6])}(${fw(player[this.layer].buyables[this.id])})<br>
                价格：${f(this.cost())} 殷钢能量`
                return display
            },
            mult() {
                let m = d(1)
                m = m.times(tmp.invar.allDimMulti)
                m = m.times(tmp.invar.multPer1DimBuy.pow(getBuyableAmount(this.layer, this.id).max(0)))
                m = m.times(tmp.invar.buyables[51].base.pow(getBuyableAmount(invar, 51).sub(3).max(0)))
                return m
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buyMax() {
                let x = player.invar.energy
                if (this.canAfford()) {
                    if (x.lt(Number.MAX_VALUE)) return setBuyableAmount(this.layer, this.id, x.div(1e25).max(0.1).logBase(1e12).floor().add(1).max(0))
                    if (x.gte(Number.MAX_VALUE)) return setBuyableAmount(this.layer, this.id, x.div(1e289).max(1).logBase(1e12).root(1.3).add(22).floor().add(1))
                }
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player[this.layer].energy = player[this.layer].energy.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            dim() {
                if (player.invar.dimensions_inc[6].gt(0))
                    player.invar.dimensions[5] = player.invar.dimensions[5].add(tmp.invar.dimGain.d6.div(tick))
                player.invar.dimensions_inc[6] = player.invar.dimensions[6].add(getBuyableAmount(this.layer, this.id))
            },
            auto() {
                if (hasUpgrade(invar, 41)) autobuyBuyables1perTick(this.layer, this.id)
                if (hasUpgrade(brass, 25)) this.buyMax()
            },
            unlocked() { return player.invar.buyables[51].gte(3) },
            style() {
                let leftshift = d(15)
                if (!tmp.invar.buyables[42].unlocked) leftshift = d(-225)
                if (this.canAfford()) return {
                    "background": "linear-gradient(90deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'left': `${fw(leftshift)}px`,
                }
                else return {
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'left': `${fw(leftshift)}px`,
                }
            },
        },
        42: {
            title: "",
            cost(x) {
                let c = d(0)
                if (x.lt(21)) c = d(1e15).pow(x).times(1e36)
                if (x.gte(21)) c = d(1e15).pow(x.sub(19).pow(1.3)).times(1e276)
                return c
            },
            display() {
                let display = `第8殷钢维度 | ${f(this.mult())}x<br>
                数量：${f(player.invar.dimensions_inc[7])}(${fw(player[this.layer].buyables[this.id])})<br>
                价格：${f(this.cost())} 殷钢能量`
                return display
            },
            mult() {
                let m = d(1)
                m = m.times(tmp.invar.allDimMulti)
                m = m.times(tmp.invar.multPer1DimBuy.pow(getBuyableAmount(this.layer, this.id).max(0)))
                m = m.times(tmp.invar.buyables[51].base.pow(getBuyableAmount(invar, 51).sub(4).max(0)))
                if (hasUpgrade(invar, 24)) m = m.times(upgradeEffect(invar, 24))
                return m
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buyMax() {
                let x = player.invar.energy
                if (this.canAfford()) {
                    if (x.lt(Number.MAX_VALUE)) setBuyableAmount(this.layer, this.id, x.div(1e36).max(0.1).logBase(1e15).floor().add(1).max(0))
                    if (x.gte(Number.MAX_VALUE)) setBuyableAmount(this.layer, this.id, x.div(1e276).max(1).logBase(1e15).root(1.3).add(19).floor().add(1))
                }
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player[this.layer].energy = player[this.layer].energy.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            dim() {
                if (player.invar.dimensions_inc[7].gt(0))
                    player.invar.dimensions[6] = player.invar.dimensions[6].add(tmp.invar.dimGain.d7.div(tick))
                player.invar.dimensions_inc[7] = player.invar.dimensions[7].add(getBuyableAmount(this.layer, this.id))
            },
            auto() {
                if (hasUpgrade(invar, 41)) autobuyBuyables1perTick(this.layer, this.id)
                if (hasUpgrade(brass, 25)) this.buyMax()
            },
            unlocked() { return getBuyableAmount(invar, 51).gte(4) },
            style() {
                if (this.canAfford()) return {
                    "background": "linear-gradient(90deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'right': '15px',
                    'top': '30px',
                }
                else return {
                    'height': '60px',
                    'width': '480px',
                    'clip-path': 'polygon(6.25% 0, 0 50%, 6.25% 100%, 93.75% 100%, 100% 50%, 93.75% 0)',
                    'right': '15px',
                    'top': '30px',
                }
            },
        },
        51: {
            title: "殷钢维度提升",
            cost(x) {
                let c = d(0)
                c = d(100000).pow(x.pow(1.4)).times(1e10)
                return c
            },
            display() {
                let display = `重置殷钢能量和殷钢维度，提升1~${fw(getBuyableAmount(this.layer, this.id).add(4).min(8))}殷钢维度的倍数
                效果基数：${f(this.base())}<br>
                数量：${fw(player[this.layer].buyables[this.id])}<br>
                价格：${f(this.cost())} 殷钢能量`
                return display
            },
            base() {
                let m = d(2)
                if (hasUpgrade(invar, 25)) m = m.add(1)
                if (hasMilestone(brass, 0)) m = m.add(1)
                if (hasUpgrade(brass, 25)) m = m.add(1)
                return m
            },
            canAfford() { return player[this.layer].energy.gte(this.cost()) },
            buyMax() {
                let x = player.invar.energy
                if (this.canAfford())
                    setBuyableAmount(invar, 51, x.div(1e10).max(1).logBase(100000).root(1.4).floor().add(1).max(0))
            },
            canBuyMax() { return hasMilestone(invar, 5) },
            buy() {
                if (!this.canBuyMax()) player[this.layer].energy = player[this.layer].energy.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)),
                    resetInvarDimEnergy()
                if (this.canBuyMax()) this.buyMax(),
                    resetInvarDimEnergy()
            },
            unlocked() { return hasUpgrade(invar, 21) },
            canAuto() { return hasMilestone(brass, 1) },
            auto() {
                if (this.canAuto())
                    this.buyMax()
            },
            style() {
                if (this.canAfford()) return {
                    "background": "linear-gradient(45deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'height': '120px',
                    'width': '180px',
                    'line-height': '120%'
                }
                else return {
                    'height': '120px',
                    'width': '180px',
                    'line-height': '120%'
                }
            },
        },
        52: {
            title() {
                let t = "殷钢星系"
                let scaling = ""
                if (getBuyableAmount(invar, 52).gte(10)) scaling = "遥远的"
                return scaling + t
            },
            cost(x) {
                let c = d(0)
                c = d(3).times(x).add(6).max(6)
                if (x.gte(5)) c = d(10).times(x.sub(5)).add(28)
                if (x.gte(10)) c = d(20).times(x.sub(10).pow(2)).add(88)
                return c
            },
            display() {
                let display = `重置殷钢能量、殷钢维度和殷钢维度提升，提升购买单个维度的基数
                效果基数：${f(this.base())}<br>
                数量：${fw(player[this.layer].buyables[this.id])}<br>
                价格：${fw(this.cost())} 殷钢维度提升`
                return display
            },
            base() {
                let b = d(0.5)
                if (hasUpgrade(brass, "a2")) b = b.add(0.1)
                return b
            },
            effect(x) {
                let eff = this.base().times(x.max(0))
                return eff
            },
            canAfford() { return player[this.layer].buyables[51].gte(this.cost()) },
            buyMax() {
                let x = getBuyableAmount(invar, 51)
                if (this.canAfford()) {
                    if (x.lte(18)) return setBuyableAmount(this.layer, this.id, x.sub(6).div(3).max(0).floor().add(1))
                    if (x.gt(18) && x.lte(68)) return setBuyableAmount(this.layer, this.id, x.sub(18).div(10).max(0).floor().add(5))
                    if (x.gt(68) && x.lt(88)) return setBuyableAmount(this.layer, this.id, d(10))
                    if (x.gte(88)) return setBuyableAmount(this.layer, this.id, x.sub(88).max(0).div(20).root(2).max(0).floor().add(11))
                }
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player[this.layer].energy = player[this.layer].energy.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1)),
                    resetInvarDEandDB()
                if (this.canBuyMax()) this.buyMax()
            },
            unlocked() { return hasUpgrade(invar, 31) },
            canAuto() { return hasMilestone(brass, 1) },
            auto() {
                if (this.canAuto())
                    this.buyMax()
            },
            style() {
                if (this.canAfford()) return {
                    "background": "linear-gradient(45deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'height': '120px',
                    'width': '180px',
                    'line-height': '120%'
                }
                else return {
                    'height': '120px',
                    'width': '180px',
                    'line-height': '120%'
                }
            },
        },
    },


    milestones: {
        0: {
            requirementDescription() { return `完成1次殷钢维度提升` },
            effectDescription() { return `奖励：解锁第5殷钢维度` },
            done() { return getBuyableAmount(invar, 51).gte(1) },
            unlocked() { return hasNormalAchievement(85) },
        },
        1: {
            requirementDescription() { return `完成2次殷钢维度提升` },
            effectDescription() { return `奖励：解锁第6殷钢维度` },
            done() { return getBuyableAmount(invar, 51).gte(2) },
            unlocked() { return hasNormalAchievement(85) },
        },
        2: {
            requirementDescription() { return `完成3次殷钢维度提升` },
            effectDescription() { return `奖励：解锁第7殷钢维度` },
            done() { return getBuyableAmount(invar, 51).gte(3) },
            unlocked() { return hasNormalAchievement(85) },
        },
        3: {
            requirementDescription() { return `完成4次殷钢维度提升` },
            effectDescription() { return `奖励：解锁第8殷钢维度` },
            done() { return getBuyableAmount(invar, 51).gte(4) },
            unlocked() { return hasNormalAchievement(85) },
        },
        4: {
            requirementDescription() { return `获得1.0000e120殷钢能量` },
            effectDescription() { return `现在可以解锁一些自动化` },
            done() { return player.invar.energy.gte(1e120) },
            unlocked() { return hasNormalAchievement(85) },
        },
        5: {
            requirementDescription() { return `获得9殷钢星系` },
            effectDescription() { return `现在可以购买最大殷钢维度提升而只重置一次` },
            done() { return getBuyableAmount(invar, 52).gte(9) },
            unlocked() { return hasNormalAchievement(85) },
        },
    },

    multPer1DimBuy() {
        let m = d(2)
        if (hasUpgrade(invar, 31)) m = m.add(buyableEffect(invar, 52))
        return m
    },

    allDimMulti() {
        let m = d(1)
        if (hasUpgrade(alumbrass, 12)) m = m.times(upgradeEffect(alumbrass, 12))
        return m
    },

    energy: {
        gain() {
            let g = d(0)
            if (hasNormalAchievement(85))
                g = g.add(player.invar.dimensions_inc[0]).times(tmp.invar.buyables[11].mult)
            return g
        },
        effect1() { //铁矿石
            let eff = d(0)
            if (hasNormalAchievement(85)) eff = d(10).pow(player.invar.energy.max(1).log10().pow(0.8))
            return eff
        },
        effect2() { //康铜精华
            let eff = d(0)
            if (hasNormalAchievement(85)) eff = player.invar.energy.max(1).log10().times(50).root(1.25).floor()
            return eff
        },
    },

    dimGain: {
        d1() {
            let g = d(0)
            if (hasNormalAchievement(85))
                g = player.invar.dimensions_inc[1].times(tmp.invar.buyables[12].mult)
            return g
        },
        d2() {
            let g = d(0)
            if (hasNormalAchievement(85))
                g = player.invar.dimensions_inc[2].times(tmp.invar.buyables[21].mult)
            return g
        },
        d3() {
            let g = d(0)
            if (hasNormalAchievement(85))
                g = player.invar.dimensions_inc[3].times(tmp.invar.buyables[22].mult)
            return g
        },
        d4() {
            let g = d(0)
            if (player.invar.buyables[51].gte(1))
                g = player.invar.dimensions_inc[4].times(tmp.invar.buyables[31].mult)
            return g
        },
        d5() {
            let g = d(0)
            if (player.invar.buyables[51].gte(2))
                g = player.invar.dimensions_inc[5].times(tmp.invar.buyables[32].mult)
            return g
        },
        d6() {
            let g = d(0)
            if (player.invar.buyables[51].gte(3))
                g = player.invar.dimensions_inc[6].times(tmp.invar.buyables[41].mult)
            return g
        },
        d7() {
            let g = d(0)
            if (player.invar.buyables[51].gte(4))
                g = player.invar.dimensions_inc[7].times(tmp.invar.buyables[42].mult)
            return g
        },
        d8() {

        },
    },

    update(diff) {
        if (player.invar.points.gt(player.invar.best)) player.invar.best = player.invar.points

        if (player.invar.energy.lt(1)) player.invar.energy = d(1)

        if (player.invar.resetDelay >= 1) player.invar.energy = d(0),
            player.invar.resetDelay = 0
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.invar.best)} 殷钢锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "upgrades": {
                unlocked() { return tmp.invar.layerShown },
                name() { return '升级' },
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
            "milestones": {
                unlocked() { return hasNormalAchievement(85) },
                name() { return '里程碑' },
                content: [
                    ["blank", "15px"],
                    "milestones",
                ]
            },
            "dimension": {
                unlocked() { return hasNormalAchievement(85) },
                name() { return '殷钢维度' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () {
                        return `你有 ${textStyle_h2(f(player.invar.energy), '95a7a1')} 殷钢能量
                        <br>加成铁矿石获取 ${textStyle_h2(f(tmp.invar.energy.effect1) + "x", '95a7a1')}
                        <br>提升康铜精华倍增等级上限 ${textStyle_h2("+" + fw(tmp.invar.energy.effect2), '95a7a1')}`
                    }],
                    ["display-text", function () { return `(+${textStyle_h2(f(tmp.invar.energy.gain), '95a7a1')}/秒)` }],
                    "blank",
                    ["display-text", function () { return `购买单个维度的乘数：${textStyle_h2(f(tmp.invar.multPer1DimBuy) + "x", '95a7a1')}` }],
                    "blank",
                    ["buyables", [1, 2, 3, 4]],
                    ["blank", '60px'],
                    ["buyables", [5]],
                ]
            },
        },
    },
})


//世界1层12：铝黄铜
addLayer("alumbrass", {
    componentStyles: {
        "clickable"() {
            return {
                'border-radius': '0',
                'line-height': '100%',
            }
        }
    },
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: d(0),             // "points" is the internal name for the main resource of the layer.
            ore: d(0),
            molten: d(0),
            cast: {
                ingot: false,
                nugget: false,
                plate: false,
                gear: false,
                axe_head: false,
                pickaxe_head: false,
                sword_blade: false,
                wide_guard: false,
                shovel_head: false,
                binding: false,
                tool_rod: false,
            },
        }
    },

    color: "#f0d467",                       // The color for this layer, which affects many elements.
    nodeStyle: {
        "background": "linear-gradient(90deg, #e6c34b 0%, #f0d467 30%, #e6c34b 75%, #ab7d1b 100%)",
    },
    resource: "铝黄铜锭",            // The name of this layer's main prestige resource.
    symbol: "铝黄铜",
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 11,
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
    // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    layerShown() { return hasNormalAchievement(92) },

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
            title: "像青铜一样的配比",
            description: "3倍铝黄铜锭合金倍率",
            cost() { return new ExpantaNum(240) },
            unlocked() { return tmp.alumbrass.layerShown },
        },
        12: {
            title: "“无限力量”",
            description: "铝黄铜锭加成所有殷钢维度的倍数",
            cost() { return new ExpantaNum(1000) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.alumbrass.points.max(0).add(1).pow(3.5)
                if (hasUpgrade(zinc, 12)) eff = player.alumbrass.points.min(tmp.alloy_s.clickables[14].mult.times(300)).max(0).add(1).pow(4.2)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：(铝黄铜锭+1)<sup>3.5</sup>`
                if (hasUpgrade(zinc, 12))`公式：(生效的铝黄铜锭+1)<sup>4.2</sup><br>
                生效的铝黄铜锭：min(铝黄铜锭, 铝黄铜锭合金倍率·300)`
                return t
            },
        },
        13: {
            title: "底数再次加强",
            description: "康铜精华倍增：底数加强 的等级上限+2",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            cost() { return new ExpantaNum('6.666e6666') },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        14: {
            title: "不是单纯的一个新材料",
            description: "需求：等级4,340<br>殷钢星系的数量加成铝黄铜锭熔炼倍率",
            currencyInternalName: "essence",
            currencyDisplayName: "康铜精华",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(4340) },
            cost() { return new ExpantaNum('6.888e6888') },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = getBuyableAmount(invar, 52)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：殷钢星系`
                return t
            },
        },
        15: {
            title: "浇铸的开始",
            description: "需求：等级4,400<br>解锁本层级铸模界面，以及现在可以解锁新自动化",
            canAfford() { return player.level.gte(4400) },
            cost() { return new ExpantaNum(5000) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        21: {
            title: "熔融铝黄铜",
            description: "需求：等级4,525<br>解锁下一个铸模",
            canAfford() { return player.level.gte(4525) },
            cost() { return new ExpantaNum(150000) },
            unlocked() { return hasUpgrade(alumbrass, 15) },
            style() {
                return { 'width': '187.5px' }
            },
        },
        22: {
            title: "重新凝固",
            description: "需求：等级4,580<br>继续解锁下一个铸模",
            canAfford() { return player.level.gte(4580) },
            cost() { return new ExpantaNum(2000000) },
            unlocked() { return hasUpgrade(alumbrass, 21) },
            style() {
                return { 'width': '187.5px' }
            },
        },
        23: {
            title: "铝黄铜反复倍增",
            description: "需求：等级4,666<br>铝黄铜合金倍率变为10x",
            canAfford() { return player.level.gte(4666) },
            cost() { return new ExpantaNum(4000000) },
            unlocked() { return hasUpgrade(alumbrass, 22) },
            style() {
                return { 'width': '187.5px' }
            },
        },
        24: {
            title: "殷钢绑定-加强",
            description: "需求：等级5,050<br>殷钢锭的熔炼倍率被锁定为铁锭、镍锭最小值的^系数<br>系数取决于铝黄铜锭，硬上限为^0.4",
            canAfford() { return player.level.gte(5050) },
            cost() { return new ExpantaNum(50000000) },
            unlocked() { return hasUpgrade(alumbrass, 23) },
            effect() {
                let eff = player.alumbrass.points.max(1).log10().root(2).div(33.33)
                return eff
            },
            effectDisplay() {
                return `^${format(upgradeEffect(this.layer, this.id), 4)}`
            },
            style() {
                return { 'width': '187.5px' }
            },
            tooltip() {
                let t = `公式：min(lg(铝黄铜锭)<sup>0.5</sup>/33.33, 0.4)`
                return t
            },
        },
        31: {
            title: "继续丰富矿石种类",
            description: "需求：等级5,080<br>解锁新的矿石层级：锌",
            canAfford() { return player.level.gte(5080) },
            cost() { return new ExpantaNum(30000000) },
            unlocked() { return hasUpgrade(alumbrass, 24) },
        },
        32: {
            title: "都需要浇铸",
            description: "需求：等级8,590<br>继续解锁下一个铸模",
            canAfford() { return player.level.gte(8590) },
            cost() { return new ExpantaNum(1.5e20) },
            unlocked() { return hasUpgrade(alumbrass, 31) },
        },
    },

    clickables: {
        11: {
            canClick() { return },
            onClick() {
            },
            unlocked() { return hasUpgrade(alumbrass, 15) },
            style() {
                return {
                    'min-height': '128px',
                    'width': '128px',
                    "background": "linear-gradient(90deg, #e6c34b 0%, #f0d467 30%, #e6c34b 75%, #ab7d1b 100%)",
                    "clip-path": 'polygon(0 0, 8px 0, 8px 96px, 16px 96px, 16px 104px, 24px 104px, 24px 112px, 48px 112px, 48px 104px, 72px 104px, 72px 96px, 96px 96px, 96px 88px, 120px 88px, 120px 40px, 112px 40px, 112px 32px, 104px 32px, 104px 24px, 96px 24px, 96px 16px, 80px 16px, 80px 24px, 56px 24px, 56px 32px, 32px 32px, 32px 40px, 8px 40px, 8px 0, 128px 0, 128px 128px, 0 128px)',
                }
            },
        },
        21: {
            title() {
                let t = "锭铸模"
                return t
            },
            display() {
                let has = player.alumbrass.cast[this.corresponding] ? "是" : "否"
                let d = `消耗：10,000铝黄铜锭
                <br>效果：铝黄铜的熔炼倍率变为10x
                <br>是否获得：${has}`
                return d
            },
            corresponding: "ingot",
            canClick() { return player.alumbrass.points.gte(10000) && !player.alumbrass.cast[this.corresponding] },
            onClick() {
                player.alumbrass.points = player.alumbrass.points.sub(10000),
                    player.alumbrass.cast[this.corresponding] = true
            },
            unlocked() { return hasUpgrade(alumbrass, 15) },
            style() {
                return {
                    'min-height': '96px',
                    'width': '128px',
                    "background": "linear-gradient(90deg, #e6c34b 0%, #f0d467 30%, #e6c34b 75%, #ab7d1b 100%)",
                }
            },
        },
        12: {
            canClick() { return },
            onClick() {
            },
            unlocked() { return hasUpgrade(alumbrass, 21) },
            style() {
                return {
                    'min-height': '128px',
                    'width': '128px',
                    "background": "linear-gradient(90deg, #e6c34b 0%, #f0d467 30%, #e6c34b 75%, #ab7d1b 100%)",
                    "clip-path": 'polygon(0 0, 40px 0, 40px 64px, 48px 64px, 48px 88px, 56px 88px, 56px 96px, 72px 96px, 72px 88px, 80px 88px, 80px 64px, 88px 64px, 88px 48px, 80px 48px, 80px 40px, 72px 40px, 72px 32px, 48px 32px, 48px 40px, 40px 40px, 40px 0, 128px 0, 128px 128px, 0 128px)',
                }
            },
        },
        22: {
            title() {
                let t = "粒铸模"
                return t
            },
            display() {
                let has = player.alumbrass.cast[this.corresponding] ? "是" : "否"
                let d = `消耗：200,000铝黄铜锭
                <br>效果：铝黄铜的熔炼倍率变为25x
                <br>是否获得：${has}`
                return d
            },
            corresponding: "nugget",
            canClick() { return player.alumbrass.points.gte(200000) && !player.alumbrass.cast[this.corresponding] },
            onClick() {
                player.alumbrass.points = player.alumbrass.points.sub(200000),
                    player.alumbrass.cast[this.corresponding] = true
            },
            unlocked() { return hasUpgrade(alumbrass, 21) },
            style() {
                return {
                    'min-height': '96px',
                    'width': '128px',
                    "background": "linear-gradient(90deg, #e6c34b 0%, #f0d467 30%, #e6c34b 75%, #ab7d1b 100%)",
                }
            },
        },
        13: {
            canClick() { return },
            onClick() {
            },
            unlocked() { return hasUpgrade(alumbrass, 22) },
            style() {
                return {
                    'min-height': '128px',
                    'width': '128px',
                    "background": "linear-gradient(90deg, #e6c34b 0%, #f0d467 30%, #e6c34b 75%, #ab7d1b 100%)",
                    "clip-path": 'polygon(0 0, 24px 0, 24px 40px, 32px 40px, 32px 48px, 40px 48px, 40px 56px, 64px 56px, 64px 64px, 72px 64px, 72px 72px, 80px 72px, 80px 96px, 88px 96px, 88px 104px, 96px 104px, 96px 112px, 104px 112px, 104px 64px, 96px 64px, 96px 48px, 88px 48px, 88px 40px, 72px 40px, 72px 32px, 24px 32px, 24px 0, 128px 0, 128px 128px, 0 128px)',
                }
            },
        },
        23: {
            title() {
                let t = "镐头铸模"
                return t
            },
            display() {
                let has = player.alumbrass.cast[this.corresponding] ? "是" : "否"
                let d = `消耗：3,000,000铝黄铜锭
                <br>效果：现在可以获得新合成配方
                <br>是否获得：${has}`
                return d
            },
            corresponding: "pickaxe_head",
            canClick() { return player.alumbrass.points.gte(3000000) && !player.alumbrass.cast[this.corresponding] },
            onClick() {
                player.alumbrass.points = player.alumbrass.points.sub(3000000),
                    player.alumbrass.cast[this.corresponding] = true
            },
            unlocked() { return hasUpgrade(alumbrass, 22) },
            style() {
                return {
                    'min-height': '96px',
                    'width': '128px',
                    "background": "linear-gradient(90deg, #e6c34b 0%, #f0d467 30%, #e6c34b 75%, #ab7d1b 100%)",
                }
            },
        },
        14: {
            canClick() { return },
            onClick() {
            },
            unlocked() { return hasUpgrade(alumbrass, 32) },
            style() {
                return {
                    'min-height': '128px',
                    'width': '128px',
                    "background": "linear-gradient(90deg, #e6c34b 0%, #f0d467 30%, #e6c34b 75%, #ab7d1b 100%)",
                    "clip-path": 'polygon(0 0, 24px 0, 24px 48px, 32px 48px, 32px 56px, 24px 56px, 24px 64px, 16px 64px, 16px 72px, 24px 72px, 24px 80px, 40px 80px, 40px 88px, 32px 88px, 32px 104px, 48px 104px, 48px 96px, 56px 96px, 56px 104px, 64px 104px, 64px 112px, 72px 112px, 72px 104px, 80px 104px, 80px 88px, 88px 88px, 88px 96px, 104px 96px, 104px 80px, 96px 80px, 96px 72px, 104px 72px, 104px 64px, 112px 64px, 112px 56px, 104px 56px, 104px 48px, 88px 48px, 88px 40px, 96px 40px, 96px 24px, 80px 24px, 80px 32px, 72px 32px, 72px 24px, 64px 24px, 64px 16px, 56px 16px, 56px 24px, 48px 24px, 48px 40px, 40px 40px, 40px 32px, 24px 32px, 24px 0, 128px 0, 128px 128px, 0 128px)',
                }
            },
        },
        24: {
            title() {
                let t = "齿轮铸模"
                return t
            },
            display() {
                let has = player.alumbrass.cast[this.corresponding] ? "是" : "否"
                let d = `消耗：1.5000e20铝黄铜锭
                <br>效果：现在可以获得新合成配方
                <br>是否获得：${has}`
                return d
            },
            corresponding: "gear",
            canClick() { return player.alumbrass.points.gte(1.5e20) && !player.alumbrass.cast[this.corresponding] },
            onClick() {
                player.alumbrass.points = player.alumbrass.points.sub(1.5e20),
                    player.alumbrass.cast[this.corresponding] = true
            },
            unlocked() { return hasUpgrade(alumbrass, 32) },
            style() {
                return {
                    'min-height': '96px',
                    'width': '128px',
                    "background": "linear-gradient(90deg, #e6c34b 0%, #f0d467 30%, #e6c34b 75%, #ab7d1b 100%)",
                }
            },
        },
    },

    update(diff) {
        if (player.alumbrass.points.gt(player.alumbrass.best)) player.alumbrass.best = player.alumbrass.points
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.alumbrass.best)} 铝黄铜锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "upgrades": {
                unlocked() { return tmp.alumbrass.layerShown },
                name() { return '升级' },
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
            "milestones": {
                unlocked() { return false },
                name() { return '里程碑' },
                content: [
                    ["blank", "15px"],
                    "milestones",
                ]
            },
            "casts": {
                unlocked() { return hasUpgrade(alumbrass, 15) },
                name() { return '铸模' },
                content: [
                    ["blank", "15px"],
                    ["raw-html", () => `<h4 style="opacity:.5">不是金锭用不起，而是铝黄铜锭更有性价比！`],
                    "blank",
                    "clickables",
                ]
            },
        },
    },
})


//世界1层13：锌
addLayer("zinc", {
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: d(0),             // "points" is the internal name for the main resource of the layer.
            ore: d(0),
            molten: d(0),
            miningLevel: d(3),
            rarity: d(108),
            progress: d(0),
            findingProgress: d(0),
            hardness: d(2880),
            destroying: false,
            finding: false,
            found: false,
            singularity: d(0),
        }
    },

    color: "#b7e6bf",                       // The color for this layer, which affects many elements.
    nodeStyle: { "background": "linear-gradient(90deg, #a3be9e 0%, #fcfcfc 10%, #b7e6bf 40%, #b7e6bf 60%, #d3fcd9 80%, #4f6c62 100%)" },
    resource: "锌锭",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 12,
    symbol: '锌',

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
    // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let m = d(1)                            // 矿物的gainMult是给对应矿石的
        if (hasUpgrade(zinc, 11)) m = m.times(2)
        if (hasUpgrade(zinc, 21)) m = m.times(upgradeEffect(zinc, 21))
        if (hasUpgrade(brass, 13)) m = m.times(upgradeEffect(brass, 13))
        if (hasCraftingItem(272)) m = m.times(100)
        if (hasMilestone(brass, 0)) m = m.times(10)
        if (hasUpgrade(steel, 12)) m = m.times(tmp.steel.effect1)
        m = m.floor()
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    layerShown() { return hasNormalAchievement(95) },          // Returns a bool for if this layer's node should be visible in the tree.

    doReset(resettingLayer) {
        return undefined
    },

    chainChance() {
        let c = d(0.05)
        if (hasUpgrade(zinc, 14)) c = c.add(upgradeEffect(zinc, 14))
        if (hasUpgrade(brass, 11)) c = c.add(0.2)
        return c
    },

    chainMult() {
        let m = d(1)
        if (hasUpgrade(zinc, 13)) m = m.times(20)
        if (hasUpgrade(brass, 13)) m = m.times(upgradeEffect(brass, 13))
        if (hasUpgrade(steel, 12) && hasCraftingItem(301)) m = m.times(tmp.steel.effect1)
        m = m.floor()
        return m
    },

    chainExpectation() {
        let e = d(0)
        let m = tmp.zinc.gainMult
        let cm = tmp.zinc.chainMult
        let c = tmp.zinc.chainChance.max(1e-10)
        e = m.times(cm).add(m.times(d(1).div(c).sub(1))).times(c)
        return e
    },

    upgrades: {
        11: {
            title: "30号元素",
            description: "双倍锌矿石获取",
            currencyInternalName: "ore",
            currencyDisplayName: "锌矿石",
            currencyLayer: zinc,
            cost() { return new ExpantaNum(3) },
            unlocked() { return tmp.zinc.layerShown },
        },
        12: {
            title: "“第1无限维度”",
            description: "第2铝黄铜升级的效果^1.2，但是生效的铝黄铜锭最多为对应合金倍率的300x",
            currencyInternalName: "ore",
            currencyDisplayName: "锌矿石",
            currencyLayer: zinc,
            cost() { return new ExpantaNum(9) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        13: {
            title: "真·连锁挖掘",
            description: "需求：等级5,210<br>解锁锌矿石的连锁挖掘",
            currencyInternalName: "ore",
            currencyDisplayName: "锌矿石",
            currencyLayer: zinc,
            canAfford() { return player.level.gte(5210) },
            cost() { return new ExpantaNum(12) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        14: {
            title: "连锁组件",
            description: "需求：等级5,215<br>锌矿石提升锌矿石自身的连锁概率（最多提升75%）",
            currencyInternalName: "ore",
            currencyDisplayName: "锌矿石",
            currencyLayer: zinc,
            canAfford() { return player.level.gte(5215) },
            cost() { return new ExpantaNum(24) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.zinc.ore.max(1).log10().root(2).div(20).min(0.75)
                return eff
            },
            effectDisplay() {
                return `+${formatPercent(upgradeEffect(this.layer, this.id))}`
            },
            tooltip() {
                let t = `公式：min(lg(锌矿石)<sup>0.5</sup>/20, 0.75)`
                return t
            },
        },
        15: {
            title: "“锌”苦了",
            description: "需求：等级5,210<br>解锁新的熔炼配方",
            currencyInternalName: "ore",
            currencyDisplayName: "锌矿石",
            currencyLayer: zinc,
            canAfford() { return player.level.gte(5210) },
            cost() { return new ExpantaNum(48) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        21: {
            title: "锌强化",
            description: "需求：等级5,215<br>铝黄铜锭加成锌矿石获取",
            canAfford() { return player.level.gte(5215) },
            cost() { return new ExpantaNum(36) },
            unlocked() { return hasUpgrade(zinc, 15) },
            effect() {
                let eff = player.alumbrass.points.max(1).root(18)
                return eff
            },
            effectDisplay() {
                return `${f(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：铝黄铜锭<sup>1/18</sup>`
                return t
            },
        },
        22: {
            title: "铝黄铜强化",
            description: "需求：等级5,218<br>锌锭加成铝黄铜锭合金倍率",
            canAfford() { return player.level.gte(5218) },
            cost() { return new ExpantaNum(48) },
            unlocked() { return hasUpgrade(zinc, 21) },
            effect() {
                let eff = player.zinc.points.max(1).pow(1.12)
                return eff
            },
            effectDisplay() {
                return `${f(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：锌锭<sup>1.12</sup>`
                return t
            },
        },
        23: {
            title: "“锌”出的道具",
            description: "需求：等级5,300<br>解锁更多合成配方",
            canAfford() { return player.level.gte(5300) },
            cost() { return new ExpantaNum(72) },
            unlocked() { return hasUpgrade(zinc, 22) },
        },
        24: {
            title: "青铜力量的余晖",
            description: "需求：等级5,412<br>青铜力量的OoM^2数量以一定幅度指数加成其自身效果",
            canAfford() { return player.level.gte(5412) },
            cost() { return new ExpantaNum(145) },
            unlocked() { return hasUpgrade(zinc, 23) },
            effect() {
                let eff = player.bronze.power.max(1e10).log10().log10().div(2).max(1)
                return eff
            },
            effectDisplay() {
                return `^${f(upgradeEffect(this.layer, this.id))}`
            },
            tooltip() {
                let t = `公式：lg(lg(青铜力量))/2`
                return t
            },
        },
        25: {
            title: "康铜精华力量释放",
            description: "需求：等级6,037<br>康铜精华的OoM^2以一定幅度指数加成其自身效果，解锁第11锌升级",
            canAfford() { return player.level.gte(6037) },
            cost() { return new ExpantaNum(288) },
            unlocked() { return hasUpgrade(zinc, 24) },
            effect() {
                let eff = player.constantan.essence.max(1e10).log10().log10().div(2).max(1)
                return eff
            },
            effectDisplay() {
                return `^${f(upgradeEffect(this.layer, this.id))}`
            },
            tooltip() {
                let t = `公式：lg(lg(康铜精华))/2`
                return t
            },
        },
        31: {
            title: "正统老机械黄铜",
            description: "需求：等级7,818<br>解锁新的合金：黄铜<br>现在可以解锁黄铜锭的合金",
            canAfford() { return player.level.gte(7818) },
            cost() { return new ExpantaNum(360) },
            unlocked() { return hasUpgrade(zinc, 25) },
            style() {
                return {
                    'clip-path': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                    'width': '200px',
                    'min-height': '173.205px'
                }
            }
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击寻找"
                return d
            },
            canClick() { return !player.zinc.finding && !player.zinc.destroying && !player.zinc.found && isAtLocation('overworld') },
            onClick() {
                if (!player.zinc.finding) player.zinc.finding = true
            },
            unlocked() { return tmp.zinc.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击挖掘"
                return d
            },
            canClick() { return !player.zinc.destroying && player.zinc.found },
            onClick() {
                if (!player.zinc.destroying) player.zinc.destroying = true
            },
            unlocked() { return tmp.zinc.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
    },

    bars: {
        zincFinding: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `找矿进度: ${format(player.zinc.findingProgress)}/${format(rarity(zinc))}` },
            progress() { let p = player.zinc.findingProgress.div(rarity(zinc)); if (player.zinc.found) p = d(1); return p },
            unlocked() { return tmp.zinc.layerShown },
            fillStyle() { return { "background-color": `${tmp[this.layer].color}` } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#4f6c62" } },
        },
        zincDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `进度: ${format(player.zinc.progress)}/${format(hardness(zinc))}` },
            progress() { return player.zinc.progress.div(hardness(zinc)) },
            unlocked() { return tmp.zinc.layerShown },
            fillStyle() { return { "background-color": `${tmp[this.layer].color}` } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#4f6c62" } },
        },
    },

    update(diff) {
        if (player.zinc.finding) player.zinc.findingProgress = player.zinc.findingProgress.add(player.copper.speed.div(tick))
        if (player.zinc.findingProgress.gte(rarity(zinc))) player.zinc.findingProgress = d(0),
            player.zinc.finding = false,
            player.zinc.found = true

        if (player.zinc.destroying) player.zinc.progress = player.zinc.progress.add(player.stone.speed.div(tick))
        if (player.zinc.progress.gte(hardness(zinc))) player.zinc.progress = d(0),
            player.zinc.found = false,
            player.zinc.destroying = false,
            player.zinc.ore = player.zinc.ore.add(tmp.zinc.gainMult.times(d(Math.random()).lte(tmp.zinc.chainChance) ? tmp.zinc.chainMult : d(1)))

        if (player.zinc.points.gt(player.zinc.best)) player.zinc.best = player.zinc.points
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        ["display-text", () => `你有 ${textStyle_h2(formatWhole(player.zinc.ore), 'b7e6bf')} 锌矿石`],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.zinc.best)} 锌锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "dig": {
                unlocked() { return tmp.zinc.layerShown },
                name() { return '挖掘' },
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "zincFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "zincDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function () { return player.zinc.found ? `你找到了一处锌矿石` : `你尚未找到锌矿石` }],
                    "blank",
                    ["display-text", function () { return `找矿速度：${format(player.copper.speed)}/秒` }],
                    ["display-text", function () { return `挖掘速度：${format(player.stone.speed)}/秒` }],
                    ["display-text", function () { return `破坏一次的锌矿石获取数量：${textStyle_h2(formatWhole(tmp.zinc.gainMult), 'b7e6bf')}` }],
                    ["display-text", function () { if (hasUpgrade(zinc, 13)) return `连锁挖掘率：${textStyle_h2(formatPercent(tmp.zinc.chainChance), 'b7e6bf')}` }],
                    ["display-text", function () { if (hasUpgrade(zinc, 13)) return `连锁倍数：${textStyle_h2(f(tmp.zinc.chainMult) + "x", 'b7e6bf')}` }],
                    ["display-text", function () {
                        if (hasUpgrade(zinc, 13)) {
                            if (!shiftDown)
                                return `连锁成功后的锌矿石获取数量：${textStyle_h2(fw(tmp.zinc.gainMult.times(tmp.zinc.chainMult)), 'b7e6bf')}（按shift查看期望值）`
                            if (shiftDown)
                                return `锌矿石获取期望：${textStyle_h2(f(tmp.zinc.chainExpectation), 'b7e6bf')}`
                        }
                    }
                    ],
                    ["display-text", function () { return `稀有度：${formatWhole(rarity(zinc))}` }],
                    ["display-text", function () { return `硬度：${formatWhole(hardness(zinc))}` }],
                    ["display-text", function () { return `挖掘等级：3` }],
                    ["display-text", function () { return `需要在主世界挖掘` }],
                ]
            },
            "upgrades": {
                unlocked() { return tmp.zinc.layerShown },
                name() { return '升级' },
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
        },
    },
})

const su_upg_text = {
    main1() {
        return `${textColor('[main1]', 'f8ac67')}主线路1<br>
        橡木原木的效果变为原来的^2.25<br>
        需要：5应力`
    },
    main2() {
        return `${textColor('[main2]', 'f8ac67')}主线路2<br>
            总应力加成丛林原木的效果<br>
            需要：7应力<br>
            当前效果：${f(upgradeEffect(brass, 'main2'))}x
            ${shiftDown ? "<br>公式：总应力<sup>3.5</sup>" : ""}`
    },
    main3() {
        return `${textColor('[main3]', 'f8ac67')}主线路3<br>
        金合欢原木的效果变为原来的^2.25<br>
        需要：135应力`
    },
    a1() {
        return `${textColor('[a1]', 'f8ac67')}合金1<br>
        解锁青铜力量强化器MK.5<br>
        需要：650应力`
    },
    a2() {
        return `${textColor('[a2]', 'f8ac67')}合金2<br>
        殷钢星系效果的基数+0.1<br>
        需要：12,750应力`
    },
    a3() {
        return `${textColor('[a3]', 'f8ac67')}合金3<br>
        移除康铜精华倍增：底数加强的等级上限，且其基数+0.1<br>
        需要：4,000应力`
    },
}

var su_upg_text_current


//世界1层14：黄铜
addLayer("brass", {
    componentStyles: {
        "clickable"() {
            return {
                'margin-left': '-7px',
                'margin-right': '-7px',
                'border-radius': '0',
            }
        }
    },
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: d(0),             // "points" is the internal name for the main resource of the layer.
            ore: d(0),
            molten: d(0),
            max_su: d(0),
        }
    },

    color: "#f8ac67",                       // The color for this layer, which affects many elements.
    nodeStyle: {
        "background": "linear-gradient(90deg, #fce892 0%, #fce892 30%, #f8ac67 60%, #f8ac67 80%, #75452c 100%)",
    },
    resource: "黄铜锭",            // The name of this layer's main prestige resource.
    symbol: "黄铜",
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 13,
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
    // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    layerShown() { return hasNormalAchievement(97) },

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
            title: "高爆率",
            description: "锌矿石连锁率+20%",
            cost() { return new ExpantaNum(30) },
            unlocked() { return tmp.brass.layerShown },
        },
        12: {
            title: "殷钢-铝黄铜",
            description: "殷钢锭加成铝黄铜锭合金倍率",
            cost() { return new ExpantaNum(50) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = d(10).pow(player.invar.points.max(1).root(60).log(10).add(1).pow(0.9))
                return eff
            },
            effectDisplay() {
                return `${f(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：10<sup>(lg(殷钢锭)/60+1)<sup>0.9</sup></sup>`
                return t
            },
        },
        13: {
            title: "铝黄铜-锌",
            description: "需求：等级8,525<br>铝黄铜锭加成锌矿石获取和锌矿石连锁倍率",
            canAfford() { return player.level.gte(8525) }, //1.00e114,514经验（喜）
            cost() { return new ExpantaNum(150) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.alumbrass.points.max(1).root(18)
                return eff
            },
            effectDisplay() {
                return `${f(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：铝黄铜锭<sup>1/18</sup>`
                return t
            },
        },
        14: {
            title: "应力对机械化的提升",
            description: "需求：等级11,011<br>合成的速度基于总应力而提升，上限为20x",
            canAfford() { return player.level.gte(11011) },
            cost() { return new ExpantaNum(450) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.brass.max_su.max(0).add(1).root(1.2).sub(5).max(1).min(20)
                return eff
            },
            effectDisplay() {
                return `${f(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：min(<sup>1.2</sup>√(总应力+1)-5, 20)`
                return t
            },
        },
        15: {
            title: "应力效率",
            description: "需求：等级11,200<br>等级在11,200之后加成应力获取",
            canAfford() { return player.level.gte(11200) },
            cost() { return new ExpantaNum(750) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.level.max(11200).sub(11199).pow(0.25)
                return eff
            },
            effectDisplay() {
                return `${f(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：(等级-11,199)<sup>0.25</sup>`
                return t
            },
        },
        21: {
            title: "黄铜应力",
            description: "需求：等级12,345<br>黄铜锭加成应力获取，但是生效的黄铜锭不能超过对应合金倍率的400x",
            canAfford() { return player.level.gte(12345) },
            cost() { return new ExpantaNum(1250) },
            unlocked() { return hasUpgrade(brass, 15) },
            effect() {
                let eff = player.brass.points.max(1).min(tmp.alloy_s.clickables[15].mult.times(400)).logBase(8).max(1)
                return eff
            },
            effectDisplay() {
                return `${f(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：log<sub>8</sub>(生效的黄铜锭)<br>
                生效的黄铜锭：min(黄铜锭合金倍率·400, 黄铜锭)`
                return t
            },
        },
        22: {
            title: "黄铜倍率",
            description: "需求：等级12,950<br>黄铜锭合金倍率被锁定为锌锭的^0.6",
            canAfford() { return player.level.gte(12950) },
            cost() { return new ExpantaNum(1250) },
            unlocked() { return hasUpgrade(brass, 21) },
        },
        23: {
            title: "锌锁定",
            description: "锌锭熔炼倍率锁定为锌矿石的10%",
            canAfford() { return player.level.gte(12950) },
            cost() { return new ExpantaNum(777777) },
            unlocked() { return hasUpgrade(brass, 22) },
        },
        24: {
            title: "量产水车",
            description: "需求：等级13,575<br>水车合成倍率变为黄铜锭数量的^0.3",
            canAfford() { return player.level.gte(13575) },
            cost() { return new ExpantaNum(777777777) },
            unlocked() { return hasUpgrade(brass, 23) },
        },
        25: {
            title: "全自动维度",
            description: "需求：等级14,325<br>殷钢维度现在自动购买最大，殷钢维度提升的基数再次+1",
            canAfford() { return player.level.gte(14325) },
            cost() { return new ExpantaNum(1077777777) },
            unlocked() { return hasUpgrade(brass, 24) },
        },
        main1: {
            fullDisplay() { return "main1" },
            canAfford() { return tmp.brass.suCur.gte(5) },
            cost() { return new ExpantaNum(0) },
            need_su() { return d(5) },
            unlocked() { return hasNormalAchievement(103) },
            hoverShowText() {
                if (isUpgradeCovered(this.layer, this.id)) su_upg_text_current = su_upg_text.main1()
            },
            style() {
                let color = '#000000'
                if (hasUpgrade(this.layer, this.id)) color = '#f8ac67'
                let s = {
                    'border-radius': '0%',
                    'border-color': '#ffffff',
                    'background-color': color,
                    'font-size': '20px',
                    'color': '#ffffff',
                    'min-height': '60px',
                    'width': '60px',
                }
                return s
            },
        },
        main2: {
            fullDisplay() { return "main2" },
            canAfford() { return tmp.brass.suCur.gte(7) },
            cost() { return new ExpantaNum(0) },
            need_su() { return d(7) },
            unlocked() { return hasUpgrade(brass, 'main1') },
            hoverShowText() {
                if (isUpgradeCovered(this.layer, this.id)) su_upg_text_current = su_upg_text.main2()
            },
            effect() {
                let eff = player.brass.max_su.max(1).pow(3.5)
                return eff
            },
            style() {
                let color = '#000000'
                if (hasUpgrade(this.layer, this.id)) color = '#f8ac67'
                let s = {
                    'border-radius': '0%',
                    'border-color': '#ffffff',
                    'background-color': color,
                    'font-size': '20px',
                    'color': '#ffffff',
                    'min-height': '60px',
                    'width': '60px',
                }
                return s
            },
        },
        main3: {
            fullDisplay() { return "main3" },
            canAfford() { return tmp.brass.suCur.gte(135) },
            cost() { return new ExpantaNum(0) },
            need_su() { return d(135) },
            unlocked() { return hasUpgrade(brass, 'main2') },
            hoverShowText() {
                if (isUpgradeCovered(this.layer, this.id)) su_upg_text_current = su_upg_text.main3()
            },
            style() {
                let color = '#000000'
                if (hasUpgrade(this.layer, this.id)) color = '#f8ac67'
                let s = {
                    'border-radius': '0%',
                    'border-color': '#ffffff',
                    'background-color': color,
                    'font-size': '20px',
                    'color': '#ffffff',
                    'min-height': '60px',
                    'width': '60px',
                }
                return s
            },
        },
        a1: {
            fullDisplay() { return "a1" },
            canAfford() { return tmp.brass.suCur.gte(650) },
            cost() { return new ExpantaNum(0) },
            need_su() { return d(650) },
            unlocked() { return hasUpgrade(brass, 'main3') },
            hoverShowText() {
                if (isUpgradeCovered(this.layer, this.id)) su_upg_text_current = su_upg_text.a1()
            },
            style() {
                let color = '#000000'
                if (hasUpgrade(this.layer, this.id)) color = '#f8ac67'
                let s = {
                    'border-radius': '0%',
                    'border-color': '#ffffff',
                    'background-color': color,
                    'font-size': '20px',
                    'color': '#ffffff',
                    'min-height': '60px',
                    'width': '60px',
                }
                return s
            },
        },
        a2: {
            fullDisplay() { return "a2" },
            canAfford() { return tmp.brass.suCur.gte(12750) },
            cost() { return new ExpantaNum(0) },
            need_su() { return d(12750) },
            unlocked() { return hasUpgrade(brass, 'a1') },
            hoverShowText() {
                if (isUpgradeCovered(this.layer, this.id)) su_upg_text_current = su_upg_text.a2()
            },
            style() {
                let color = '#000000'
                if (hasUpgrade(this.layer, this.id)) color = '#f8ac67'
                let s = {
                    'border-radius': '0%',
                    'border-color': '#ffffff',
                    'background-color': color,
                    'font-size': '20px',
                    'color': '#ffffff',
                    'min-height': '60px',
                    'width': '60px',
                }
                return s
            },
        },
        a3: {
            fullDisplay() { return "a3" },
            canAfford() { return tmp.brass.suCur.gte(4000) },
            cost() { return new ExpantaNum(0) },
            need_su() { return d(4000) },
            unlocked() { return hasUpgrade(brass, 'a2') },
            hoverShowText() {
                if (isUpgradeCovered(this.layer, this.id)) su_upg_text_current = su_upg_text.a3()
            },
            style() {
                let color = '#000000'
                if (hasUpgrade(this.layer, this.id)) color = '#f8ac67'
                let s = {
                    'border-radius': '0%',
                    'border-color': '#ffffff',
                    'background-color': color,
                    'font-size': '20px',
                    'color': '#ffffff',
                    'min-height': '60px',
                    'width': '60px',
                }
                return s
            },
        },
    },

    clickables: {
        11: {
            display() { return su_upg_text_current },
            unlocked() { return hasNormalAchievement(103) },
            style() {
                let s = {
                    'border-radius': '0%',
                    'border-color': '#ffffff',
                    'background-color': '#000000',
                    'color': '#ffffff',
                    'min-height': '120px',
                    'width': '320px',
                }
                return s
            },
        },
    },

    milestones: {
        0: {
            requirementDescription() { return `到达等级10,277` },
            effectDescription() { return `解锁新的自动化，并且使 殷钢维度提升 的基数+1，100x铝黄铜锭合金倍率，10x锌矿石获取以及锌锭熔炼倍率` },
            done() { return player.level.gte(10277) },
            unlocked() { return hasNormalAchievement(103) },
        },
        1: {
            requirementDescription() { return `到达等级14,700` },
            effectDescription() { return `自动购买最大青铜力量强化器MK.5、康铜精华倍增：底数加强、殷钢维度提升和星系，解锁当前进度对应所有的资源、熔炼自动化，1.5x RF发电速度，允许你在破坏石头时获得粘土。另外请注意接下来会新出现的里程碑（在石头、熔炉层）` },
            done() { return player.level.gte(14700) },
            unlocked() { return hasNormalAchievement(103) },
        },
    },

    suGain() {
        let g = d(0)
        let item282 = player.crafting_table.items[282]
        if (hasNormalAchievement(103)) g = g.add(item282.max(0).times(256)).root(3)
        if (hasUpgrade(brass, 15)) g = g.times(upgradeEffect(brass, 15))
        if (hasUpgrade(brass, 21)) g = g.times(upgradeEffect(brass, 21))
        if (hasMilestone(furnace, 1)) g = g.times(10)
        if (hasUpgrade(steel, 12)) g = g.times(tmp.steel.effect2)
        return g
    },

    suSpent() {
        let s = d(0)
        if (hasUpgrade(brass, "main1")) s = s.add(tmp.brass.upgrades.main1.need_su)
        if (hasUpgrade(brass, "main2")) s = s.add(tmp.brass.upgrades.main2.need_su)
        if (hasUpgrade(brass, "main3")) s = s.add(tmp.brass.upgrades.main3.need_su)
        if (hasUpgrade(brass, "a1")) s = s.add(tmp.brass.upgrades.a1.need_su)
        if (hasUpgrade(brass, "a2")) s = s.add(tmp.brass.upgrades.a2.need_su)
        if (hasUpgrade(brass, "a3")) s = s.add(tmp.brass.upgrades.a3.need_su)
        return s
    },

    suCur() {
        let g = tmp.brass.suGain
        let s = tmp.brass.suSpent
        let c = g.sub(s)
        return c
    },



    update(diff) {
        if (player.brass.points.gt(player.brass.best)) player.brass.best = player.brass.points
        if (tmp.brass.suGain.gt(player.brass.max_su)) player.brass.max_su = tmp.brass.suGain
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.brass.best)} 黄铜锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "upgrades": {
                unlocked() { return tmp.brass.layerShown },
                name() { return '升级' },
                content: [
                    ["blank", "15px"],
                    ["raw-html", () => `<h4 style="opacity:.5">本层级没有烈焰人受伤`],
                    ["upgrades", [1, 2]],
                ]
            },
            "milestones": {
                unlocked() { return hasNormalAchievement(103) },
                name() { return '里程碑' },
                content: [
                    ["blank", "15px"],
                    "milestones",
                ]
            },
            "su": {
                unlocked() { return hasNormalAchievement(103) },
                name() { return '应力' },
                content: [
                    ["blank", "15px"],
                    "blank",
                    ["display-text", function () { return `你有 ${textStyle_h2(fw(player[ct].items[282]), 'f8ac67')} 水车` }],
                    ["display-text", function () { return `你有 ${textStyle_h2(f(tmp.brass.suCur) + "/" + f(tmp.brass.suGain.max(player.brass.max_su)), 'f8ac67')} 应力（基于水车数量）` }],
                    ["display-text", function () {
                        return shiftDown ? `基础应力获取公式：<sup>3</sup>√(水车·256)` : ""
                    }],
                    "blank",
                    "clickables",
                    "blank",
                    ["row", [["upgrade", "main1"], ["upgrade", "main2"], ["upgrade", "main3"]]],
                    ["row", [["upgrade", "a1"], ["upgrade", "a2"], ["upgrade", "a3"]]],
                    "blank",
                    ["display-text", function () { return `鼠标悬停查看升级详情` }],
                ]
            },
        },
    },
})

//世界1层15：钢
addLayer("steel", {
    componentStyles: {
    },
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: d(0),             // "points" is the internal name for the main resource of the layer.
            molten: d(0),
            cooling: false,
            filled: d(0),
            stored: d(0),
            cooltime: d(10),
            coolingProgress: d(0),
        }
    },

    color: "#adadad",                       // The color for this layer, which affects many elements.
    nodeStyle: {
        "background": "linear-gradient(90deg, #7a7a7a 0%, #adadad 30%, #adadad 80%, #989898 90%, #414141 100%)",
    },
    resource: "钢锭",            // The name of this layer's main prestige resource.
    symbol: "钢",
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 14,
    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
    // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).
    layerShown() { return hasMilestone(blast_furnace, 0) },

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        m = d(1)                            // 合金的gainMult是给对应合金倍率的？
        if (hasUpgrade(steel, 13)) m = m.times(3)
        if (hasUpgrade(steel, 14)) m = m.times(upgradeEffect(steel, 14))
        if (hasMilestone(steel, 0)) m = m.times(3)
        if (hasUpgrade(steel, 21)) m = m.times(upgradeEffect(steel, 21))
        if (hasUpgrade(steel, 22)) m = m.times(upgradeEffect(steel, 22))
        if (hasUpgrade(steel, 24)) m = m.times(upgradeEffect(steel, 24))
        if (hasUpgrade(silver, 13)) m = m.times(upgradeEffect(silver, 13))
        if (hasUpgrade(silver, 21)) m = m.times(upgradeEffect(silver, 21))
        m = m.floor()
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    doReset() {
        return undefined
    },

    effect1() {
        let eff1 = player.steel.best.max(0).add(1).pow(3.25)
        return eff1
    },

    effect2() {
        let eff2 = player.steel.best.max(0).add(1).pow(0.7)
        return eff2
    },

    effectDescription() {
        let d = `<br>锌矿石的基础获取${hasCraftingItem(301) ? "和连锁倍率" : ""}变为 ${textStyle_h2(f(tmp.steel.effect1) + "x", 'a4a4a4')}<br>应力获取变为原来的 ${textStyle_h2(f(tmp.steel.effect2) + "x", 'a4a4a4')}`
        return d
    },

    upgrades: {
        11: {
            title: "144mB=1锭",
            description: "3倍高炉熔炼钢倍率，被动获取合成倍率100%的水车",
            currencyInternalName: "molten",
            currencyDisplayName: "mB 熔融钢",
            currencyLayer: steel,
            cost() { return new ExpantaNum(288) },
            unlocked() { return tmp.steel.layerShown },
        },
        12: {
            title: "1296mB=1块",
            description: "解锁熔融钢浇铸钢锭",
            currencyInternalName: "molten",
            currencyDisplayName: "mB 熔融钢",
            currencyLayer: steel,
            cost() { return new ExpantaNum(1296) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        13: {
            title: "16mB=1粒",
            description: "需求：等级17,577<br>3倍钢锭浇铸倍率和高炉炼钢倍率",
            canAfford() { return player.level.gte(17577) },
            cost() { return new ExpantaNum(10) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        14: {
            title: "钢锭自增I",
            description: "需求：等级18,450<br>钢锭加成自身浇铸倍率和高炉炼钢倍率",
            canAfford() { return player.level.gte(18450) },
            cost() { return new ExpantaNum(30) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = d(10).pow(player.steel.points.add(1).log10().div(3).pow(0.9))
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：10<sup>(lg(钢锭+1)/3)<sup>0.9</sup></sup>`
                return t
            },
        },
        15: {
            title: "钢铁制造",
            description: "现在可以解锁更多制造配方",
            cost() { return new ExpantaNum(144) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        21: {
            title: "叠乘效应",
            description: "需求：等级25,400<br>每个已购买的钢升级都能使钢锭浇铸倍率和高炉炼钢倍率变为2x",
            canAfford() { return player.level.gte(25400) },
            cost() { return new ExpantaNum(500) },
            unlocked() { return hasCraftingItem(302) },
            effect() {
                let eff = d(2).pow(player.steel.upgrades.length)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：2<sup>购买的钢升级数量</sup>`
                return t
            },
        },
        22: {
            title: "钢铁：等级加成",
            description: "需求：等级30,303<br>等级在30,303之后加成钢锭浇铸倍率和高炉炼钢倍率",
            canAfford() { return player.level.gte(30303) },
            cost() { return new ExpantaNum(130000) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.level.max(30303).sub(30302).pow(0.18)
                return eff
            },
            effectDisplay() {
                return `${f(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：(等级-30,302)<sup>0.18</sup>`
                return t
            },
        },
        23: {
            title: "经验等级膨胀器",
            description: "每升1级，经验获取变为10x",
            cost() { return new ExpantaNum(2400000) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = d(10).pow(player.level.max(0))
                return eff
            },
            effectDisplay() {
                return `${f(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：10<sup>等级</sup>`
                return t
            },
        },
        24: {
            title: "钢锭自增II",
            description: "需求：等级45,678<br>钢锭继续加成自身浇铸倍率和高炉炼钢倍率",
            canAfford() { return player.level.gte(45678) },
            cost() { return new ExpantaNum(30000000) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = d(10).pow(player.steel.points.add(1).log10().div(5).pow(0.8))
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：10<sup>(lg(钢锭+1)/5)<sup>0.8</sup></sup>`
                return t
            },
        },
        25: {
            title: "谁不喜欢呢？",
            description: "需求：等级57,800<br>解锁2种新的矿物（挖掘随进度解锁）",
            canAfford() { return player.level.gte(57800) },
            cost() { return new ExpantaNum(1.2e10) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
    },

    milestones: {
        0: {
            requirementDescription() { return `到达等级21,000` },
            effectDescription() { return `钢锭浇铸倍率再次变为3x` },
            done() { return player.level.gte(21000) },
            unlocked() { return tmp.steel.layerShown },
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击填充"
                return d
            },
            canClick() { return !player.steel.cooling && player.steel.stored.eq(0) && player.steel.filled.eq(0) && player.steel.molten.gte(144) },
            onClick() {
                if (!player.steel.cooling) player.steel.cooling = true,
                    player.steel.filled = player.steel.filled.add(tmp.steel.gainMult.min(player.steel.molten.div(144).floor()).times(144)),
                    player.steel.molten = player.steel.molten.sub(tmp.steel.gainMult.min(player.steel.molten.div(144).floor()).times(144))
            },
            unlocked() { return hasUpgrade(steel, 12) },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击拾取"
                return d
            },
            canClick() { return player.steel.stored.gt(0) },
            onClick() {
                player.steel.points = player.steel.points.add(player.steel.stored),
                    player.steel.stored = d(0)
            },
            unlocked() { return hasUpgrade(steel, 12) },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
    },

    bars: {
        drain: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `浇铸进度: ${ftl(player.steel.coolingProgress)}/${ftl(player.steel.cooltime)}` },
            progress() { let p = player.steel.coolingProgress.div(player.steel.cooltime); if (player.steel.stored.gt(0)) p = d(1); return p },
            unlocked() { return hasUpgrade(steel, 12) },
            fillStyle() { return { "background-color": `${tmp[this.layer].color}` } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "white" } },
        },
    },

    update(diff) {
        if (player.steel.cooling) player.steel.coolingProgress = player.steel.coolingProgress.add(d(1).div(tick))
        if (player.steel.coolingProgress.gte(player.steel.cooltime)) player.steel.coolingProgress = d(0),
            player.steel.cooling = false,
            player.steel.stored = player.steel.stored.add(player.steel.filled.div(144).round()),
            player.steel.filled = d(0)

        if (player.steel.points.gt(player.steel.best)) player.steel.best = player.steel.points
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        ["display-text", () => `你有 ${textStyle_h2(formatWhole(player.steel.molten) + ' mB', 'a4a4a4')} 熔融钢`],
        "main-display",
        ["display-text", function () {
            return shiftDown ? `效果公式：(x+1)<sup>3.25</sup>，(x+1)<sup>0.7</sup>` : ""
        }],
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.steel.best)} 钢锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "drain": {
                unlocked() { return hasUpgrade(steel, 12) },
                name() { return '浇铸' },
                content: [
                    ["blank", "15px"],
                    ["row", [
                        ["clickable", 11],
                        "blank",
                        ["bar", "drain"],
                        "blank",
                        ["clickable", 12],
                    ]],
                    "blank",
                    ["display-text", function () {
                        return `填入的熔融钢：${fw(player.steel.filled)} mB | 储存的钢锭：${fw(player.steel.stored)}`
                    }],
                    ["display-text", function () { return `钢锭浇铸倍率：${textStyle_h2(fw(tmp.steel.gainMult) + "x", 'a4a4a4')}` }]
                ]
            },
            "upgrades": {
                unlocked() { return tmp.steel.layerShown },
                name() { return '升级' },
                content: [
                    ["blank", "15px"],
                    ["upgrades", [1, 2]],
                ]
            },
            "milestones": {
                unlocked() { return tmp.steel.layerShown },
                name() { return '里程碑' },
                content: [
                    ["blank", "15px"],
                    "milestones",
                ]
            },
        },
    },
})

//世界1层16：银
addLayer("silver", {
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: d(0),             // "points" is the internal name for the main resource of the layer.
            ore: d(0),
            molten: d(0),
            miningLevel: d(3),
            rarity: d(120),
            progress: d(0),
            findingProgress: d(0),
            hardness: d(3330),
            destroying: false,
            finding: false,
            found: false,
            vein: d(0),
            veinCooldown: d(0),
            singularity: d(0),
        }
    },

    color: "#ddf2f5",                       // The color for this layer, which affects many elements.
    nodeStyle: { "background": "linear-gradient(90deg, #65696b 0%, #bbc7ce 20%, #ddf2f5 40%, #9cc1ca 70%, #5ca0a6 100%)" },
    resource: "银锭",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 15,
    symbol: '银',

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
    // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let m = d(1)                            // 矿物的gainMult是给对应矿石的
        if (hasUpgrade(silver, 11)) m = m.times(3)
        if (hasUpgrade(silver, 12)) m = m.times(upgradeEffect(silver, 12))
        if (hasUpgrade(silver, 22)) m = m.times(5)
        if (hasCraftingItem(312)) m = m.times(clickableEffect(ct, 312))
        if (hasUpgrade(silver, 32)) m = m.times(124.1)
        m = m.floor()
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    layerShown() { return hasNormalAchievement(113) },          // Returns a bool for if this layer's node should be visible in the tree.

    doReset(resettingLayer) {
        return undefined
    },

    upgrades: {
        11: {
            title: "更深处",
            description: "3x银矿石挖掘倍率",
            currencyInternalName: "ore",
            currencyDisplayName: "银矿石",
            currencyLayer: silver,
            cost() { return new ExpantaNum(6) },
            unlocked() { return tmp.silver.layerShown },
        },
        12: {
            title: "来自钢锭的提升",
            description: "钢锭加成银矿石挖掘倍率",
            currencyInternalName: "ore",
            currencyDisplayName: "银矿石",
            currencyLayer: silver,
            cost() { return new ExpantaNum(20) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.steel.points.div(5e9).pow(0.35).max(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：(钢锭/5e9)<sup>0.35</sup>`
                return t
            },
        },
        13: {
            title: "银矿加成",
            description: "银矿石加成钢锭浇铸倍率和高炉炼钢倍率",
            currencyInternalName: "ore",
            currencyDisplayName: "银矿石",
            currencyLayer: silver,
            cost() { return new ExpantaNum(35) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = player.silver.ore.max(1).pow(0.2)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：银矿石<sup>0.2</sup>`
                return t
            },
        },
        14: {
            title: "连锁到银矿石了",
            description: "需求：等级64,000<br>解锁银矿石的连锁挖掘",
            currencyInternalName: "ore",
            currencyDisplayName: "银矿石",
            currencyLayer: silver,
            canAfford() { return player.level.gte(64000) },
            cost() { return new ExpantaNum(108) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        15: {
            title: "常规流程",
            description: "需求：等级66,000<br>解锁新的熔炼配方",
            currencyInternalName: "ore",
            currencyDisplayName: "银矿石",
            currencyLayer: silver,
            canAfford() { return player.level.gte(66000) },
            cost() { return new ExpantaNum(216) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        21: {
            title: "熔融银",
            description: "现在银锭也可以加成钢锭浇铸倍率和高炉炼钢倍率",
            cost() { return new ExpantaNum(25) },
            unlocked() { return hasUpgrade(this.layer, 15) },
            effect() {
                let eff = player.silver.points.max(1).pow(0.3)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：银锭<sup>0.3</sup>`
                return t
            },
        },
        22: {
            title: "银牌板",
            description: "需求：等级70,000<br>5x基础银矿石以及银锭熔炼倍率",
            canAfford() { return player.level.gte(70000) },
            cost() { return new ExpantaNum(60) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        23: {
            title: "银制造",
            description: "需求：等级75,000<br>解锁更多合成图纸",
            canAfford() { return player.level.gte(75000) },
            cost() { return new ExpantaNum(450) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        24: {
            title: "连锁熔炼",
            description: "需求：等级90,000<br>银矿石连锁倍率现在同时加成银锭熔炼倍率",
            canAfford() { return player.level.gte(90000) },
            currencyInternalName: "vein",
            currencyDisplayName: "银矿脉",
            currencyLayer: silver,
            cost() { return new ExpantaNum(49) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
            effect() {
                let eff = tmp.silver.chainMult
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：银矿石连锁倍率`
                return t
            },
        },
        25: {
            title: "加大银矿脉",
            description: "需求：等级95,000<br>4x银矿脉获取",
            canAfford() { return player.level.gte(95000) },
            cost() { return new ExpantaNum(142857) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        31: {
            title: "集合银矿脉",
            description: "需求：等级100,000<br>银矿脉的发现数量加成银矿脉获取",
            canAfford() { return player.level.gte(100000) },
            currencyInternalName: "vein",
            currencyDisplayName: "银矿脉",
            currencyLayer: silver,
            cost() { return new ExpantaNum(244) },
            unlocked() { return hasUpgrade(this.layer, 25) },
            effect() {
                let v = 0
                for (i = 0; i < 49; i++) {
                    if (getGridData(silver, getEveryGridIDArray(7, 7)[i]) == 1)
                        v++
                }
                v = d(v)
                if (hasUpgrade(silver, 33)) v = v.pow(2)
                return v.max(1)
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：银矿脉的发现数量`
                let silverUpg13 = ""
                if (hasUpgrade(silver, 33)) silverUpg13 = "<sup>2</sup>"
                return t + silverUpg13
            },
        },
        32: {
            title: "银矿，更多，更强",
            description: "124.1x银矿石获取以及银锭熔炼倍率（别问我为什么是这个数）",
            currencyInternalName: "vein",
            currencyDisplayName: "银矿脉",
            currencyLayer: silver,
            cost() { return new ExpantaNum(999) },
            unlocked() { return hasUpgrade(this.layer, this.id-1) },
        },
        33: {
            title: "孤注一掷",
            description: "需求：等级111,111<br>第11银升级的效果变为原来的平方",
            canAfford() { return player.level.gte(111111) },
            currencyInternalName: "ore",
            currencyDisplayName: "银矿石",
            currencyLayer: silver,
            cost() { return new ExpantaNum(3.6e10) },
            unlocked() { return hasUpgrade(this.layer, this.id-1) },
        },
        34: {
            title: "银白色的",
            description: "银矿脉对银矿石连锁倍率的效果变为^2",
            currencyInternalName: "vein",
            currencyDisplayName: "银矿脉",
            currencyLayer: silver,
            cost() { return new ExpantaNum(12300) },
            unlocked() { return hasUpgrade(this.layer, this.id-1) },
        },
        35: {
            title: "更加珍贵的",
            description: "需求：等级125,000<br>现在可以挖掘金矿石",
            currencyInternalName: "ore",
            currencyDisplayName: "银矿石",
            currencyLayer: silver,
            cost() { return new ExpantaNum(1e14) },
            unlocked() { return hasUpgrade(this.layer, this.id-1) },
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击寻找"
                return d
            },
            canClick() { return !player.silver.finding && !player.silver.destroying && !player.silver.found && isAtLocation('overworld') },
            onClick() {
                if (!player.silver.finding) player.silver.finding = true
            },
            unlocked() { return tmp.silver.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击挖掘"
                return d
            },
            canClick() { return !player.silver.destroying && player.silver.found },
            onClick() {
                if (!player.silver.destroying) player.silver.destroying = true
            },
            unlocked() { return tmp.silver.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
        21: {
            title() {
                let t = "刷新矿场"
                return t
            },
            display() {
                let d = `发现${fw(tmp.silver.vein_in_mine)}个银矿脉${tmp.silver.vein_in_mine.lte(0) ? "。" : "！"}<br>
                冷却：${ftl(player.silver.veinCooldown)}/${ftl(30)}`
                return d
            },
            canClick() { return tmp.silver.vein_in_mine.round().eq(0) && player.silver.veinCooldown.lte(0) },
            onClick() {
                for (i = 0; i < 49; i++) {
                    player.silver.grid[getEveryGridIDArray(7, 7)[i]] = d(Math.random()).lte(tmp.silver.chainChance) ? 1 : 2,
                        player.silver.veinCooldown = d(30)
                }
            },
            unlocked() { return hasCraftingItem(312) },
            style() {
                return {
                    'min-height': '80px',
                    'width': '180px',
                }
            },
        },
    },

    bars: {
        silverFinding: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `找矿进度: ${format(player.silver.findingProgress)}/${format(rarity(silver))}` },
            progress() { let p = player.silver.findingProgress.div(rarity(silver)); if (player.silver.found) p = d(1); return p },
            unlocked() { return tmp.silver.layerShown },
            fillStyle() { return { "background-color": `${tmp[this.layer].color}` } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#5f6465" } },
        },
        silverDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `进度: ${format(player.silver.progress)}/${format(hardness(silver))}` },
            progress() { return player.silver.progress.div(hardness(silver)) },
            unlocked() { return tmp.silver.layerShown },
            fillStyle() { return { "background-color": `${tmp[this.layer].color}` } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#5f6465" } },
        },
    },

    chainChance() {
        let c = d(0.05)
        if (hasCraftingItem(312)) c = c.add(tmp.silver.veinEff.toCC)
        return c
    },

    chainMult() {
        let m = d(1)
        if (hasUpgrade(silver, 14)) m = m.times(20)
        if (hasCraftingItem(312)) m = m.times(tmp.silver.veinEff.toCM)
        m = m.floor()
        return m
    },

    chainExpectation() {
        let e = d(0)
        let m = tmp.silver.gainMult
        let cm = tmp.silver.chainMult
        let c = tmp.silver.chainChance.max(1e-10)
        e = m.times(cm).add(m.times(d(1).div(c).sub(1))).times(c)
        return e
    },

    veinEff: {
        toCM() {
            let v = player.silver.vein
            let eff = d(10).pow(v.max(0).add(1).log10().pow(0.9)).pow(0.6)
            if (hasUpgrade(silver, 34)) eff = eff.pow(2)
            return eff
        },
        toCC() {
            let v = player.silver.vein
            let eff = v.max(0).add(1).logBase(2).times(5).pow(0.66).div(100).min(0.95)
            return eff
        },
    },

    veinMult() {
        let m = d(1)
        if (hasUpgrade(silver, 25)) m = m.times(4)
        if (hasUpgrade(silver, 31)) m = m.times(upgradeEffect(silver, 31))
        return m
    },

    vein_in_mine() {
        let v = 0
        for (i = 0; i < 49; i++) {
            if (getGridData(silver, getEveryGridIDArray(7, 7)[i]) == 1)
                v++
        }
        return d(v)
    },

    grid: {
        rows: 7, // If these are dynamic make sure to have a max value as well!
        cols: 7,
        getStartData(id) {
            return 0
        },
        getUnlocked(id) { // Default
            return hasCraftingItem(231)
        },
        getCanClick(data, id) {
            return data == 1
        },
        onClick(data, id) {
            player[this.layer].grid[id] = 0,
                player.silver.vein = player.silver.vein.add(tmp.silver.veinMult)
        },
        getTitle(data, id) {
            if (data == 0) return '空'
            if (data == 1) return '矿'
            if (data == 2) return '石'
        },
        getStyle(data, id) {
            if (data == 0) return {
                'background-color': 'rgba(0,0,0,0)',
                'border-color': 'white',
                'color': 'white',
                'height': '50px',
                'width': '50px',
            }
            else if (data == 1) return {
                'border-color': 'white',
                'background': "linear-gradient(45deg, #65696b 0%, #bbc7ce 20%, #ddf2f5 40%, #9cc1ca 70%, #5ca0a6 100%)",
                'height': '50px',
                'width': '50px',
            }
            else return {
                'background-color': '#4a4a4a',
                'border-color': 'white',
                'color': 'white',
                'height': '50px',
                'width': '50px',
            }
        },

    },

    update(diff) {
        if (player.silver.finding) player.silver.findingProgress = player.silver.findingProgress.add(player.copper.speed.div(tick))
        if (player.silver.findingProgress.gte(rarity(silver))) player.silver.findingProgress = d(0),
            player.silver.finding = false,
            player.silver.found = true

        if (player.silver.destroying) player.silver.progress = player.silver.progress.add(player.stone.speed.div(tick))
        if (player.silver.progress.gte(hardness(silver))) player.silver.progress = d(0),
            player.silver.found = false,
            player.silver.destroying = false,
            player.silver.ore = player.silver.ore.add(tmp.silver.gainMult.times(d(Math.random()).lte(tmp.silver.chainChance) ? tmp.silver.chainMult : d(1)))

        if (player.silver.points.gt(player.silver.best)) player.silver.best = player.silver.points

        if (player.silver.veinCooldown.gt(0.06)) player.silver.veinCooldown = player.silver.veinCooldown.sub(0.05)
        else player.silver.veinCooldown = d(0)
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        ["display-text", () => `你有 ${textStyle_h2(formatWhole(player.silver.ore), 'ddf2f5')} 银矿石`],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.silver.best)} 银锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "dig": {
                unlocked() { return tmp.silver.layerShown },
                name() { return '挖掘' },
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "silverFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "silverDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function () { return player.silver.found ? `你找到了一处银矿石` : `你尚未找到银矿石` }],
                    "blank",
                    ["display-text", function () { return `找矿速度：${format(player.copper.speed)}/秒` }],
                    ["display-text", function () { return `挖掘速度：${format(player.stone.speed)}/秒` }],
                    ["display-text", function () { return `破坏一次的银矿石获取数量：${textStyle_h2(formatWhole(tmp.silver.gainMult), 'ddf2f5')}` }],
                    ["display-text", function () { if (hasUpgrade(silver, 14)) return `连锁挖掘率：${textStyle_h2(formatPercent(tmp.silver.chainChance), 'ddf2f5')}` }],
                    ["display-text", function () { if (hasUpgrade(silver, 14)) return `连锁倍数：${textStyle_h2(f(tmp.silver.chainMult) + "x", 'ddf2f5')}` }],
                    ["display-text", function () {
                        if (hasUpgrade(silver, 14)) {
                            if (!shiftDown)
                                return `连锁成功后的银矿石获取数量：${textStyle_h2(fw(tmp.silver.gainMult.times(tmp.silver.chainMult)), 'ddf2f5')}（按shift查看期望值）`
                            if (shiftDown)
                                return `银矿石获取期望：${textStyle_h2(f(tmp.silver.chainExpectation), 'ddf2f5')}`
                        }
                    }
                    ],
                    ["display-text", function () { return `稀有度：${formatWhole(rarity(silver))}` }],
                    ["display-text", function () { return `硬度：${formatWhole(hardness(silver))}` }],
                    ["display-text", function () { return `挖掘等级：3` }],
                    ["display-text", function () { return `需要在主世界挖掘` }],
                ]
            },
            "upgrades": {
                unlocked() { return tmp.silver.layerShown },
                name() { return '升级' },
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ]
            },
            "mine": {
                unlocked() { return hasCraftingItem(312) },
                name() { return '矿场' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (hasCraftingItem(312)) return `你挖掘了 ${textStyle_h2(formatWhole(player.silver.vein), 'ddf2f5')} 个银矿脉 （${textStyle_h2(formatWhole(tmp.silver.veinMult), 'ddf2f5')}/次）` }],
                    ["display-text", function () { return `银矿石连锁率增加 ${textStyle_h2(fp(tmp.silver.veinEff.toCC), 'ddf2f5')}` }],
                    ["display-text", function () { return `银矿石连锁倍率变为 ${textStyle_h2(f(tmp.silver.veinEff.toCM) + "x", 'ddf2f5')}` }],
                    ["display-text", function () { 
                        let toCMpow = d(0.6)
                        if (hasUpgrade(silver, 34)) toCMpow = toCMpow.times(2)
                        if (shiftDown) return `银矿脉效果公式：min((5log<sub>2</sub>(x+1))<sup>0.66</sup>/100, 0.95)，10<sup>${f(toCMpow)}lg(x+1)<sup>0.9</sup></sup>` 
                    }],
                    "blank",
                    "grid",
                    "blank",
                    ["clickable", 21],
                    "blank",
                    ["display-text", () => `在7x7的区域中寻找对应的矿脉，每次刷新每个格子有一定概率刷新对应矿脉，概率等同于对应矿石连锁率`],
                    ["display-text", () => `点击写着“矿”字的格子挖掘矿脉，每次获得一定数量的矿脉，挖掘后格子清空`],
                    ["display-text", () => `挖掘完所有的矿脉且冷却时间已过30秒可刷新矿脉`],
                ]
            },
        },
    },
})

//世界1层17：金
addLayer("gold", {
    startData() {
        return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                     // You can add more variables here to add them to your layer.
            points: d(0),             // "points" is the internal name for the main resource of the layer.
            ore: d(0),
            molten: d(0),
            miningLevel: d(3),
            rarity: d(140),
            progress: d(0),
            findingProgress: d(0),
            hardness: d(3600),
            destroying: false,
            finding: false,
            found: false,
            singularity: d(0),
            stored_time: d(0),
        }
    },

    color: "#fdf55f",                       // The color for this layer, which affects many elements.
    nodeStyle: { "background": "linear-gradient(90deg, #b26411 0%, #fdf55f 10%, #fffde0 20%, #fdf55f 30%, #fdf55f 80%, #752802 100%)" },
    resource: "金锭",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
    position: 16,
    symbol: '金',

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: d(10),              // The amount of the base needed to  gain 1 of the prestige currency.
    // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let m = d(1)                            // 矿物的gainMult是给对应矿石的
        if (hasUpgrade(gold, 11)) m = m.times(3)
            if (hasUpgrade(gold, 12)) m = m.times(upgradeEffect(gold, 12))
        m = m.floor()
        return m
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return d(1)
    },

    layerShown() { return hasNormalAchievement(113) },          // Returns a bool for if this layer's node should be visible in the tree.

    doReset(resettingLayer) {
        return undefined
    },

    upgrades: {
        11: {
            title: "来源于超新星的爆发",
            description: "3x金矿石挖掘倍率",
            currencyInternalName: "ore",
            currencyDisplayName: "金矿石",
            currencyLayer: gold,
            cost() { return new ExpantaNum(6) },
            unlocked() { return tmp.gold.layerShown },
        },
        12: {
            title: "银提升金",
            description: "银锭加成金矿石挖掘倍率",
            currencyInternalName: "ore",
            currencyDisplayName: "金矿石",
            currencyLayer: gold,
            cost() { return new ExpantaNum(24) },
            unlocked() { return hasUpgrade(this.layer, this.id-1) },
            effect() {
                let eff = player.silver.points.div(1e10).pow(0.3).max(1)
                return eff
            },
            effectDisplay() {
                return `${format(upgradeEffect(this.layer, this.id))}x`
            },
            tooltip() {
                let t = `公式：(银锭/1e10)<sup>0.3</sup>`
                return t
            },
        },
        13: {
            title: "连锁金",
            description: "解锁金矿石的连锁挖掘",
            currencyInternalName: "ore",
            currencyDisplayName: "金矿石",
            currencyLayer: gold,
            cost() { return new ExpantaNum(88) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
        14: {
            title: "金光闪闪",
            description: "解锁金锭熔炼配方（敬请期待）",
            currencyInternalName: "ore",
            currencyDisplayName: "金矿石",
            currencyLayer: gold,
            cost() { return new ExpantaNum(150) },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) },
        },
    },

    clickables: {
        11: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击寻找"
                return d
            },
            canClick() { return !player.gold.finding && !player.gold.destroying && !player.gold.found && hasUpgrade(silver, 35) && isAtLocation('overworld') },
            onClick() {
                if (!player.gold.finding) player.gold.finding = true
            },
            unlocked() { return tmp.gold.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
        12: {
            title() {
                let t = ""
                return t
            },
            display() {
                let d = "点击挖掘"
                return d
            },
            canClick() { return !player.gold.destroying && player.gold.found && hasUpgrade(silver, 35)},
            onClick() {
                if (!player.gold.destroying) player.gold.destroying = true
            },
            unlocked() { return tmp.gold.layerShown },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
    },

    bars: {
        goldFinding: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `找矿进度: ${format(player.gold.findingProgress)}/${format(rarity(gold))}` },
            progress() { let p = player.gold.findingProgress.div(rarity(gold)); if (player.gold.found) p = d(1); return p },
            unlocked() { return tmp.gold.layerShown },
            fillStyle() { return { "background-color": `${tmp[this.layer].color}` } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#b26411" } },
        },
        goldDestroying: {
            direction: RIGHT,
            width: 360,
            height: 60,
            display() { return `进度: ${format(player.gold.progress)}/${format(hardness(gold))}` },
            progress() { return player.gold.progress.div(hardness(gold)) },
            unlocked() { return tmp.gold.layerShown },
            fillStyle() { return { "background-color": `${tmp[this.layer].color}` } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
            textStyle() { return { "color": "#b26411" } },
        },
    },

    chainChance() {
        let c = d(0.05)
        return c
    },

    chainMult() {
        let m = d(1)
        if (hasUpgrade(gold, 13)) m = d(10)
        m = m.floor()
        return m
    },

    chainExpectation() {
        let e = d(0)
        let m = tmp.gold.gainMult
        let cm = tmp.gold.chainMult
        let c = tmp.gold.chainChance.max(1e-10)
        e = m.times(cm).add(m.times(d(1).div(c).sub(1))).times(c)
        return e
    },

    update(diff) {
        if (player.gold.finding) player.gold.findingProgress = player.gold.findingProgress.add(player.copper.speed.div(tick))
        if (player.gold.findingProgress.gte(rarity(gold))) player.gold.findingProgress = d(0),
            player.gold.finding = false,
            player.gold.found = true

        if (player.gold.destroying) player.gold.progress = player.gold.progress.add(player.stone.speed.div(tick))
        if (player.gold.progress.gte(hardness(gold))) player.gold.progress = d(0),
            player.gold.found = false,
            player.gold.destroying = false,
            player.gold.ore = player.gold.ore.add(tmp.gold.gainMult.times(d(Math.random()).lte(tmp.gold.chainChance) ? tmp.gold.chainMult : d(1)))

        if (player.gold.points.gt(player.gold.best)) player.gold.best = player.gold.points
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        ["display-text", () => `你有 ${textStyle_h2(formatWhole(player.gold.ore), 'fdf55f')} 金矿石`],
        "main-display",
        ["display-text", () => `你同时最多拥有 ${formatWhole(player.gold.best)} 金锭`],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "dig": {
                unlocked() { return tmp.gold.layerShown },
                name() { return '挖掘' },
                content: [
                    ["blank", "15px"],
                    ["row", [["bar", "goldFinding"], "blank", ["clickable", 11],]],
                    "blank",
                    ["row", [["bar", "goldDestroying"], "blank", ["clickable", 12],]],
                    "blank",
                    ["display-text", function () { return player.gold.found ? `你找到了一处金矿石` : `你尚未找到金矿石` }],
                    "blank",
                    ["display-text", function () { return `找矿速度：${format(player.copper.speed)}/秒` }],
                    ["display-text", function () { return `挖掘速度：${format(player.stone.speed)}/秒` }],
                    ["display-text", function () { return `破坏一次的金矿石获取数量：${textStyle_h2(formatWhole(tmp.gold.gainMult), 'fdf55f')}` }],
                    ["display-text", function () { if (hasUpgrade(gold, 13)) return `连锁挖掘率：${textStyle_h2(formatPercent(tmp.gold.chainChance), 'fdf55f')}` }],
                    ["display-text", function () { if (hasUpgrade(gold, 13)) return `连锁倍数：${textStyle_h2(f(tmp.gold.chainMult) + "x", 'fdf55f')}` }],
                    ["display-text", function () {
                        if (hasUpgrade(gold, 13)) {
                            if (!shiftDown)
                                return `连锁成功后的金矿石获取数量：${textStyle_h2(fw(tmp.gold.gainMult.times(tmp.gold.chainMult)), 'fdf55f')}（按shift查看期望值）`
                            if (shiftDown)
                                return `金矿石获取期望：${textStyle_h2(f(tmp.gold.chainExpectation), 'fdf55f')}`
                        }
                    }
                    ],
                    ["display-text", function () { return `稀有度：${formatWhole(rarity(gold))}` }],
                    ["display-text", function () { return `硬度：${formatWhole(hardness(gold))}` }],
                    ["display-text", function () { return `挖掘等级：3` }],
                    ["display-text", function () { return `获得第15银升级后可寻找并挖掘金矿石` }],
                    ["display-text", function () { return `需要在主世界挖掘` }],
                ]
            },
            "upgrades": {
                unlocked() { return tmp.gold.layerShown },
                name() { return '升级' },
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
    symbol() { return '↓ 制造 ↓' },
    small: true,// Set true to generate a slightly different layer
    nodeStyle: { "font-size": "15px", "height": "30px" },// Change layer button' style
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
        }
    },
    color: "#fefefe",
    type: "none",
    tooltip() { return false },
    layerShown() { return hasNormalAchievement(12) },// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }]
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
    if (canCraftMultiple(id)) {
        if (id != 281 && id != 282) player.crafting_table.items[id] = player.crafting_table.items[id].add(1)
        else if (id == 281 || id == 282) player.crafting_table.items[id] = player.crafting_table.items[id].add(tmp[ct].clickables[id].mult)
    }
    if (!canCraftMultiple(id)) player.crafting_table.items[id] = true
}

function craftingItemColor(id) {
    return tmp.crafting_table.clickables[id].style['background-color']
}

function canCraftMultiple(id) {
    let CCMID = [91, 122, 141, 182, 191, 231, 242, 281, 282]
    let CCM = false
    for (i = 0; i < CCMID.length; i++) {
        if (id == CCMID[i]) CCM = true
    }
    return CCM
}

//制造层1：合成台
addLayer("crafting_table", {
    name: "crafting_table",
    position: 1002,
    row: 101,
    symbol: '合成台', // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
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
                161: false, 162: false, 171: false, 172: false, 181: false, 182: d(0), 191: d(0), 192: false, 201: false, 202: false,
                211: false, 212: false, 221: false, 222: false, 231: d(0), 232: false, 241: false, 242: d(0), 251: false, 252: false,
                261: false, 262: false, 271: false, 272: false, 281: d(0), 282: d(0), 291: false, 292: false, 301: false, 302: false,
                311: false, 312: false,
            },
            page: 1,
            maxPage: 1,
        }
    },
    color: "#b8945e",
    type: "normal",
    layerType: "craft",
    resource: "合成台",
    baseResource() { return "木头" },
    baseAmount() { return player.wood.points },
    exponent: 0.25,
    requires: d(80),
    tooltip() { return false },
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
    layerShown() { return hasNormalAchievement(12) },// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.

    onPrestige() {
        return player.crafting_table.cooldown = d(1)
    },

    canReset() {
        return player.crafting_table.cooldown.lte(0) && player.wood.points.gte(80)
    },

    doReset(resettingLayer) {
        if (hasMilestone(furnace, 0)) return undefined
    },

    passiveGeneration() { return hasUpgrade(constantan, 14) },

    upgrades: {
        11: {
            title: "石质合成台",
            description: "解锁石质合成台的合成",
            currencyInternalName: "points",
            currencyDisplayName: "石头",
            currencyLayer: stone,
            cost() { return new ExpantaNum(10000) },
            unlocked() { return hasNormalAchievement(22) },
        },
        12: {
            title: "熔炉",
            description: "解锁熔炉的合成（制造区域层级）",
            currencyInternalName: "sand",
            currencyDisplayName: "沙子",
            currencyLayer: stone,
            cost() { return new ExpantaNum(12) },
            unlocked() { return hasNormalAchievement(24) },
        },
        13: {
            title: "铜斧",
            description: "解锁铜斧的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铜锭",
            currencyLayer: copper,
            cost() { return new ExpantaNum(2) },
            unlocked() { return hasNormalAchievement(24) },
        },
        14: {
            title: "铜镐",
            description: "解锁铜镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铜锭",
            currencyLayer: copper,
            cost() { return new ExpantaNum(5) },
            unlocked() { return hasNormalAchievement(24) },
        },
        15: {
            title: "铜制探矿杖",
            description: "解锁铜制探矿杖的合成",
            currencyInternalName: "glass",
            currencyDisplayName: "玻璃",
            currencyLayer: furnace,
            cost() { return new ExpantaNum(10) },
            unlocked() { return hasNormalAchievement(24) },
        },
        21: {
            title: "铜质合成台",
            description: "解锁铜质合成台的合成",
            currencyInternalName: "glass",
            currencyDisplayName: "玻璃",
            currencyLayer: furnace,
            cost() { return new ExpantaNum(30) },
            unlocked() { return hasCraftingItem(42) },
        },
        22: {
            title: "铜质熔炉",
            description: "解锁铜质熔炉的合成",
            currencyInternalName: "glass",
            currencyDisplayName: "玻璃",
            currencyLayer: furnace,
            cost() { return new ExpantaNum(40) },
            unlocked() { return hasCraftingItem(42) },
        },
        23: {
            title: "1阶太阳能板",
            description: "解锁1阶太阳能板的合成",
            currencyInternalName: "glass",
            currencyDisplayName: "玻璃",
            currencyLayer: furnace,
            cost() { return new ExpantaNum(50) },
            unlocked() { return hasCraftingItem(42) },
        },
        24: {
            title: "锡斧",
            description: "解锁锡斧的合成",
            currencyInternalName: "points",
            currencyDisplayName: "锡锭",
            currencyLayer: tin,
            cost() { return new ExpantaNum(10) },
            unlocked() { return hasCraftingItem(42) },
        },
        25: {
            title: "锡镐",
            description: "解锁锡镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "锡锭",
            currencyLayer: tin,
            cost() { return new ExpantaNum(10) },
            unlocked() { return hasCraftingItem(42) },
        },
        31: {
            title: "青铜合成台",
            description: "需求：等级36<br>解锁青铜合成台的合成",
            currencyInternalName: "points",
            currencyDisplayName: "青铜锭",
            currencyLayer: bronze,
            cost() { return new ExpantaNum(222) },
            canAfford() { return player.level.gte(36) },
            unlocked() { return hasUpgrade(bronze, 15) },
        },
        32: {
            title: "青铜斧",
            description: "需求：等级36<br>解锁青铜斧的合成",
            currencyInternalName: "points",
            currencyDisplayName: "青铜锭",
            currencyLayer: bronze,
            cost() { return new ExpantaNum(333) },
            canAfford() { return player.level.gte(36) },
            unlocked() { return hasUpgrade(bronze, 15) },
        },
        33: {
            title: "青铜镐",
            description: "需求：等级40<br>解锁青铜镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "青铜锭",
            currencyLayer: bronze,
            cost() { return new ExpantaNum(444) },
            canAfford() { return player.level.gte(40) },
            unlocked() { return hasUpgrade(bronze, 15) },
        },
        34: {
            title: "青铜外壳",
            description: "需求：等级42<br>解锁青铜外壳的合成",
            currencyInternalName: "points",
            currencyDisplayName: "青铜锭",
            currencyLayer: bronze,
            cost() { return new ExpantaNum(555) },
            canAfford() { return player.level.gte(42) },
            unlocked() { return hasUpgrade(bronze, 15) },
        },
        35: {
            title: "2阶太阳能板",
            description: "需求：等级42<br>解锁2阶太阳能板的合成",
            currencyInternalName: "points",
            currencyDisplayName: "青铜锭",
            currencyLayer: bronze,
            cost() { return new ExpantaNum(1111) },
            canAfford() { return player.level.gte(42) },
            unlocked() { return hasUpgrade(bronze, 15) },
        },
        41: {
            title: "铁质合成台",
            description: "需求：等级81<br>解锁铁质合成台的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() { return new ExpantaNum(3) },
            canAfford() { return player.level.gte(81) },
            unlocked() { return hasUpgrade(iron, 15) },
        },
        42: {
            title: "铁斧",
            description: "需求：等级81<br>解锁铁斧的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() { return new ExpantaNum(3) },
            canAfford() { return player.level.gte(81) },
            unlocked() { return hasUpgrade(iron, 15) },
        },
        43: {
            title: "铁镐",
            description: "需求：等级88<br>解锁铁镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() { return new ExpantaNum(3) },
            canAfford() { return player.level.gte(88) },
            unlocked() { return hasUpgrade(iron, 15) },
        },
        44: {
            title: "虚空电炉MK.1",
            description: "需求：等级103<br>解锁虚空电炉MK.1的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() { return new ExpantaNum(3) },
            canAfford() { return player.level.gte(103) },
            unlocked() { return hasUpgrade(iron, 15) },
        },
        45: {
            title: "3阶太阳能板",
            description: "需求：完成33个普通成就<br>解锁3阶太阳能板的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() { return new ExpantaNum(3) },
            canAfford() { return d(player.achievements.achievements.length).sub(player.achievements.secret).gte(33) },
            unlocked() { return hasUpgrade(iron, 15) },
        },
        51: {
            title: "铁桶",
            description: "解锁铁桶的合成<br>解锁铁层级新页面",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() { return new ExpantaNum(25) },
            unlocked() { return hasCraftingItem(121) },
        },
        52: {
            title: "铁制探矿杖",
            description: "解锁铁制探矿杖的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铁锭",
            currencyLayer: iron,
            cost() { return new ExpantaNum(200) },
            unlocked() { return hasUpgrade(iron, 25) },
        },
        53: {
            title: "镍镐",
            description: "解锁镍镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "镍锭",
            currencyLayer: nickel,
            cost() { return new ExpantaNum(5) },
            unlocked() { return hasUpgrade(nickel, 15) },
        },
        54: {
            title: "镍齿轮",
            description: "需求：等级133<br>解锁镍齿轮的合成",
            currencyInternalName: "points",
            currencyDisplayName: "镍锭",
            currencyLayer: nickel,
            canAfford() { return player.level.gte(133) },
            cost() { return new ExpantaNum(10) },
            unlocked() { return hasUpgrade(nickel, 15) },
        },
        55: {
            title: "镍机械挑战器",
            description: "需求：等级133<br>解锁镍机械挑战器的合成",
            currencyInternalName: "points",
            currencyDisplayName: "镍锭",
            currencyLayer: nickel,
            canAfford() { return player.level.gte(133) },
            cost() { return new ExpantaNum(15) },
            unlocked() { return hasUpgrade(nickel, 15) },
        },
        61: {
            title: "铝质合成台",
            description: "需求：等级316<br>解锁铝质合成台的合成",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            canAfford() { return player.level.gte(316) },
            cost() { return new ExpantaNum(575) },
            unlocked() { return hasUpgrade(aluminum, 15) },
        },
        62: {
            title: "铝斧",
            description: "需求：等级316<br>解锁铝斧的合成",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            canAfford() { return player.level.gte(316) },
            cost() { return new ExpantaNum(825) },
            unlocked() { return hasUpgrade(aluminum, 15) },
        },
        63: {
            title: "铝镐",
            description: "需求：等级335<br>解锁铝镐的合成",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            canAfford() { return player.level.gte(335) },
            cost() { return new ExpantaNum(1000) },
            unlocked() { return hasUpgrade(aluminum, 15) },
        },
        64: {
            title: "铝机械臂",
            description: "需求：等级386<br>解锁铝机械臂的合成",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            canAfford() { return player.level.gte(386) },
            cost() { return new ExpantaNum(1000) },
            unlocked() { return hasUpgrade(aluminum, 15) },
        },
        65: {
            title: "铅镐",
            description: "解锁铅镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铅锭",
            currencyLayer: lead,
            cost() { return new ExpantaNum(15) },
            unlocked() { return hasUpgrade(lead, 15) },
        },
        71: {
            title: "奇点凝聚器",
            description: "需求：等级524<br>解锁奇点凝聚器的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铅锭",
            currencyLayer: lead,
            canAfford() { return player.level.gte(524) },
            cost() { return new ExpantaNum(35) },
            unlocked() { return hasUpgrade(lead, 15) },
        },
        72: {
            title: "铅锤",
            description: "需求：等级564<br>解锁铅锤的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铅锭",
            currencyLayer: lead,
            canAfford() { return player.level.gte(564) },
            cost() { return new ExpantaNum(65) },
            unlocked() { return hasUpgrade(lead, 15) },
        },
        73: {
            title: "铅板",
            description: "需求：等级586<br>解锁铅板的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铅锭",
            currencyLayer: lead,
            canAfford() { return player.level.gte(586) },
            cost() { return new ExpantaNum(75) },
            unlocked() { return hasUpgrade(lead, 15) },
        },
        74: {
            title: "铅外壳",
            description: "需求：等级586<br>解锁铅外壳的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铅锭",
            currencyLayer: lead,
            canAfford() { return player.level.gte(586) },
            cost() { return new ExpantaNum(85) },
            unlocked() { return hasUpgrade(lead, 15) },
        },
        75: {
            title: "辐射防护器",
            description: "需求：等级587<br>解锁辐射防护器的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铅锭",
            currencyLayer: lead,
            canAfford() { return player.level.gte(587) },
            cost() { return new ExpantaNum(99) },
            unlocked() { return hasUpgrade(lead, 15) },
        },
        81: {
            title: "康铜镐",
            description: "需求：等级678<br>解锁康铜镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "康铜锭",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(678) },
            cost() { return new ExpantaNum(3000) },
            unlocked() { return hasUpgrade(constantan, 15) },
        },
        82: {
            title: "康铜精华转化器",
            description: "需求：等级758<br>解锁康铜精华转化器的合成",
            currencyInternalName: "points",
            currencyDisplayName: "康铜锭",
            currencyLayer: constantan,
            canAfford() { return player.level.gte(758) },
            cost() { return new ExpantaNum(4000) },
            unlocked() { return hasUpgrade(constantan, 15) },
        },
        83: {
            title: "殷钢合成台",
            description: "解锁殷钢合成台的合成",
            currencyInternalName: "points",
            currencyDisplayName: "殷钢锭",
            currencyLayer: invar,
            cost() { return new ExpantaNum(300) },
            unlocked() { return hasUpgrade(invar, 15) },
        },
        84: {
            title: "殷钢斧",
            description: "解锁殷钢斧的合成",
            currencyInternalName: "points",
            currencyDisplayName: "殷钢锭",
            currencyLayer: invar,
            cost() { return new ExpantaNum(300) },
            unlocked() { return hasUpgrade(invar, 15) },
        },
        85: {
            title: "殷钢镐",
            description: "需求：等级2,380<br>解锁殷钢镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "殷钢锭",
            currencyLayer: invar,
            canAfford() { return player.level.gte(2380) },
            cost() { return new ExpantaNum(300) },
            unlocked() { return hasUpgrade(invar, 15) },
        },
        91: {
            title: "4阶太阳能板",
            description: "需求：等级2,440<br>解锁4阶太阳能板的合成",
            currencyInternalName: "points",
            currencyDisplayName: "殷钢锭",
            currencyLayer: invar,
            canAfford() { return player.level.gte(2440) },
            cost() { return new ExpantaNum(300) },
            unlocked() { return hasUpgrade(invar, 15) },
        },
        92: {
            title: "热力机械外壳",
            description: "需求：等级2,441<br>解锁热力机械外壳的合成",
            currencyInternalName: "points",
            currencyDisplayName: "殷钢锭",
            currencyLayer: invar,
            canAfford() { return player.level.gte(2441) },
            cost() { return new ExpantaNum(300) },
            unlocked() { return hasUpgrade(invar, 15) },
        },
        93: {
            title: "蓄水器",
            description: "需求：等级2,442<br>解锁蓄水器的合成",
            currencyInternalName: "points",
            currencyDisplayName: "殷钢锭",
            currencyLayer: invar,
            canAfford() { return player.level.gte(2442) },
            cost() { return new ExpantaNum(300) },
            unlocked() { return hasUpgrade(invar, 15) },
        },
        94: {
            title: "熔岩炉",
            description: "需求：等级2,444<br>解锁熔岩炉的合成",
            currencyInternalName: "points",
            currencyDisplayName: "殷钢锭",
            currencyLayer: invar,
            canAfford() { return player.level.gte(2444) },
            cost() { return new ExpantaNum(300) },
            unlocked() { return hasUpgrade(invar, 15) },
        },
        95: {
            title: "硬化转换套件",
            description: "需求：等级2,485<br>解锁硬化转换套件的合成",
            currencyInternalName: "points",
            currencyDisplayName: "殷钢锭",
            currencyLayer: invar,
            canAfford() { return player.level.gte(2485) },
            cost() { return new ExpantaNum(300) },
            unlocked() { return hasUpgrade(invar, 15) },
        },
        101: {
            title: "殷钢维度启动器",
            description: "需求：等级2,488<br>解锁殷钢维度启动器的合成",
            currencyInternalName: "points",
            currencyDisplayName: "殷钢锭",
            currencyLayer: invar,
            canAfford() { return player.level.gte(2488) },
            cost() { return new ExpantaNum(300) },
            unlocked() { return hasUpgrade(invar, 15) },
        },
        102: {
            title: "铝黄铜镐",
            description: "需求：等级4,600<br>解锁铝黄铜镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "铝黄铜锭",
            currencyLayer: alumbrass,
            canAfford() { return player.level.gte(4600) },
            cost() { return new ExpantaNum(1000000) },
            unlocked() { return player.alumbrass.cast.pickaxe_head },
        },
        103: {
            title: "锌质探矿杖",
            description: "解锁锌质探矿杖的合成",
            currencyInternalName: "points",
            currencyDisplayName: "锌锭",
            currencyLayer: zinc,
            cost() { return new ExpantaNum(16) },
            unlocked() { return hasUpgrade(zinc, 23) },
        },
        104: {
            title: "锌镐",
            description: "需求：等级5,355<br>解锁锌镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "锌锭",
            currencyLayer: zinc,
            canAfford() { return player.level.gte(5355) },
            cost() { return new ExpantaNum(24) },
            unlocked() { return hasUpgrade(zinc, 23) },
        },
        105: {
            title: "黄铜合成站",
            description: "解锁黄铜合成站的合成",
            currencyInternalName: "points",
            currencyDisplayName: "黄铜锭",
            currencyLayer: brass,
            cost() { return new ExpantaNum(144) },
            unlocked() { return player.alumbrass.cast.gear },
        },
        111: {
            title: "黄铜镐",
            description: "解锁黄铜镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "黄铜锭",
            currencyLayer: brass,
            cost() { return new ExpantaNum(144) },
            unlocked() { return player.alumbrass.cast.gear },
        },
        112: {
            title: "黄铜齿轮",
            description: "需求：等级8,825<br>解锁黄铜齿轮的合成",
            currencyInternalName: "points",
            currencyDisplayName: "黄铜锭",
            currencyLayer: brass,
            canAfford() { return player.level.gte(8825) },
            cost() { return new ExpantaNum(144) },
            unlocked() { return player.alumbrass.cast.gear },
        },
        113: {
            title: "水车",
            description: "需求：等级8,955<br>解锁水车的合成",
            currencyInternalName: "points",
            currencyDisplayName: "黄铜锭",
            currencyLayer: brass,
            canAfford() { return player.level.gte(8955) },
            cost() { return new ExpantaNum(288) },
            unlocked() { return player.alumbrass.cast.gear },
        },
        114: {
            title: "应力表",
            description: "需求：等级8,990<br>解锁应力表的合成",
            currencyInternalName: "points",
            currencyDisplayName: "黄铜锭",
            currencyLayer: brass,
            canAfford() { return player.level.gte(8990) },
            cost() { return new ExpantaNum(576) },
            unlocked() { return player.alumbrass.cast.gear },
        },
        115: {
            title: "钢斧",
            description: "解锁钢斧的合成",
            currencyInternalName: "points",
            currencyDisplayName: "钢锭",
            currencyLayer: steel,
            cost() { return new ExpantaNum(10) },
            unlocked() { return hasUpgrade(steel, 15) },
        },
        121: {
            title: "钢镐",
            description: "解锁钢镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "钢锭",
            currencyLayer: steel,
            cost() { return new ExpantaNum(10) },
            unlocked() { return hasUpgrade(steel, 15) },
        },
        122: {
            title: "钢熔炉",
            description: "需求：等级24,500<br>解锁钢熔炉的合成",
            currencyInternalName: "points",
            currencyDisplayName: "钢锭",
            currencyLayer: steel,
            canAfford() { return player.level.gte(24500) },
            cost() { return new ExpantaNum(10) },
            unlocked() { return hasUpgrade(steel, 15) },
        },
        123: {
            title: "银斧",
            description: "需求：等级75,100<br>解锁银斧的合成",
            currencyInternalName: "points",
            currencyDisplayName: "银锭",
            currencyLayer: silver,
            canAfford() { return player.level.gte(75100) },
            cost() { return new ExpantaNum(100) },
            unlocked() { return hasUpgrade(silver, 23) },
        },
        124: {
            title: "银镐",
            description: "需求：等级85,400<br>解锁银镐的合成",
            currencyInternalName: "points",
            currencyDisplayName: "银锭",
            currencyLayer: silver,
            canAfford() { return player.level.gte(85400) },
            cost() { return new ExpantaNum(200) },
            unlocked() { return hasUpgrade(silver, 23) },
        },
    },

    milestones: {
        0: {
            requirementDescription() { return `获得15合成台` },
            effectDescription() { return `奖励：合成合成台时保留木头升级和里程碑` },
            done() { return player.crafting_table.points.gte(15) },
            unlocked() { return true },
        },
        1: {
            requirementDescription() { return `到达等级27` },
            effectDescription() { return `奖励：解锁新的铜升级` },
            done() { return player.level.gte(27) },
            unlocked() { return hasUpgrade(stone, 34) },
        },
    },

    clickables: {
        0: {
            complexity: d(0), //凑数用
            style() {
                return {
                    'background-color': 'rgba(0,0,0,0)',
                }
            },
        },
        11: {
            title() {
                let t = "木斧"
                return t
            },
            display() {
                let d = `
                需要工具：1合成台<br>
                需要材料：120木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：撸树速度x2.5<br>
                解锁新的木头升级<br>
                挖掘等级：0`
                return d
            },
            complexity: d(25),
            canClick() { return player.crafting_table.points.gte(1) && player.wood.points.gte(120) && !player.crafting_table.crafting && !hasCraftingItem(this.id) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(120)
            },
            unlocked() { return tmp.crafting_table.layerShown },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    'background-color': '#6b511f',
                    'color': 'white',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        12: {
            title() {
                let t = "木镐"
                return t
            },
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
            canClick() { return player.crafting_table.points.gte(3) && player.wood.points.gte(500) && !player.crafting_table.crafting && !hasCraftingItem(this.id) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(500)
            },
            unlocked() { return hasUpgrade(stone, 11) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    'background-color': '#6b511f',
                    'color': 'white',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        21: {
            title() {
                let t = "石斧"
                return t
            },
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
            canClick() { return player.crafting_table.points.gte(9) && player.wood.points.gte(200) && player.stone.points.gte(15) && !player.crafting_table.crafting && !hasCraftingItem(this.id) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.stone.points = player.stone.points.sub(15)
            },
            unlocked() { return hasUpgrade(stone, 15) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    'background-color': '#7f7f7f',
                    'color': 'white',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        22: {
            title() {
                let t = "石镐"
                return t
            },
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
            canClick() { return player.crafting_table.points.gte(9) && player.wood.points.gte(200) && player.stone.points.gte(15) && !player.crafting_table.crafting && !hasCraftingItem(this.id) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.stone.points = player.stone.points.sub(15)
            },
            unlocked() { return hasUpgrade(stone, 15) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    'background-color': '#7f7f7f',
                    'color': 'white',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        31: {
            title() {
                let t = "石质合成台"
                return t
            },
            display() {
                let d = `
                需要工具：120合成台（消耗）<br>
                需要材料：2000木头 + 21000石头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：合成台合成速度x5<br>`
                return d
            },
            complexity: d(240),
            canClick() { return player.crafting_table.points.gte(120) && player.wood.points.gte(2000) && player.stone.points.gte(21000) && !player.crafting_table.crafting && !hasCraftingItem(this.id) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(2000),
                    player.stone.points = player.stone.points.sub(21000),
                    player.crafting_table.points = player.crafting_table.points.sub(120)
            },
            unlocked() { return hasUpgrade(ct, 11) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    'background-color': '#7f7f7f',
                    'color': 'white',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        32: {
            title() {
                let t = "铜斧"
                return t
            },
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
            canClick() { return player.crafting_table.points.gte(1) && player.wood.points.gte(200) && player.copper.points.gte(5) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(31) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.copper.points = player.copper.points.sub(5)
            },
            unlocked() { return hasUpgrade(ct, 13) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                    'background-color': '#ffb41d',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        41: {
            title() {
                let t = "铜镐"
                return t
            },
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
            canClick() { return player.crafting_table.points.gte(1) && player.wood.points.gte(200) && player.copper.points.gte(15) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(31) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.copper.points = player.copper.points.sub(15)
            },
            unlocked() { return hasUpgrade(ct, 14) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                    'background-color': '#ffb41d',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        42: {
            title() {
                let t = "铜制探矿杖"
                return t
            },
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
            canClick() { return player.crafting_table.points.gte(1) && player.wood.points.gte(200) && player.copper.points.gte(25) && player.furnace.glass.gte(50) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(31) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.copper.points = player.copper.points.sub(25),
                    player.furnace.glass = player.furnace.glass.sub(50)
            },
            unlocked() { return hasUpgrade(ct, 15) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                    'background-color': '#ffb41d',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        51: {
            title() {
                let t = "铜质合成台"
                return t
            },
            display() {
                let d = `
                需要工具：石质合成台 + 10000合成台（消耗）<br>
                需要材料：2000木头 + 25铜锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：合成的速度x10<br>`
                return d
            },
            complexity: d(750),
            canClick() { return player.crafting_table.points.gte(10000) && player.wood.points.gte(2000) && player.copper.points.gte(25) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(31) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(2000),
                    player.copper.points = player.copper.points.sub(25),
                    player.crafting_table.points = player.crafting_table.points.sub(10000)
            },
            unlocked() { return hasUpgrade(ct, 21) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                    'background-color': '#ffb41d',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        52: {
            title() {
                let t = "铜质熔炉"
                return t
            },
            display() {
                let d = `
                需要工具：石质合成台 + 30熔炉（消耗）<br>
                需要材料：2000石头 + 25铜锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：熔炼的速度x10<br>`
                return d
            },
            complexity: d(1600),
            canClick() { return player.crafting_table.points.gte(1) && player.furnace.points.gte(30) && player.stone.points.gte(2000) && player.copper.points.gte(25) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(31) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.stone.points = player.stone.points.sub(2000),
                    player.copper.points = player.copper.points.sub(25),
                    player.furnace.points = player.furnace.points.sub(30)
            },
            unlocked() { return hasUpgrade(ct, 22) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                    'background-color': '#ffb41d',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        61: {
            title() {
                let t = "1阶太阳能板"
                return t
            },
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
            canClick() { return player.crafting_table.points.gte(1) && player.copper.points.gte(120) && player.stone.points.gte(10000) && player.furnace.glass.gte(320) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(51) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.stone.points = player.stone.points.sub(10000),
                    player.copper.points = player.copper.points.sub(120),
                    player.furnace.glass = player.furnace.glass.sub(320)
            },
            unlocked() { return hasUpgrade(ct, 23) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(90deg, #ea8601 0%, #ffb53c 100%)",
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        62: {
            title() {
                let t = "锡斧"
                return t
            },
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
            canClick() { return player.crafting_table.points.gte(1) && player.wood.points.gte(200) && player.tin.points.gte(8) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(51) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.tin.points = player.tin.points.sub(8)
            },
            unlocked() { return hasUpgrade(ct, 24) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #c4dce1 0%, #d3e4e4 100%)",
                    'background-color': '#c4dce1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        71: {
            title() {
                let t = "锡镐"
                return t
            },
            display() {
                let d = `
                需要工具：铜质合成台<br>
                需要材料：200木头 + 21锡锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：挖掘速度x3，石头获取x150，解锁锡升级<br>
                挖掘等级：1`
                return d
            },
            complexity: d(4800),
            canClick() { return player.crafting_table.points.gte(1) && player.wood.points.gte(200) && player.tin.points.gte(21) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(51) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.tin.points = player.tin.points.sub(21)
            },
            unlocked() { return hasUpgrade(ct, 25) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #c4dce1 0%, #d3e4e4 100%)",
                    'background-color': '#c4dce1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        72: {
            title() {
                let t = "青铜合成台"
                return t
            },
            display() {
                let d = `
                需要工具：铜质合成台 + 10,000,000合成台（消耗）<br>
                需要材料：1e23木头 + 125青铜锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：合成的速度x25`
                return d
            },
            complexity: d(6400),
            canClick() { return player.crafting_table.points.gte(10000000) && player.wood.points.gte(1e23) && player.bronze.points.gte(125) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(51) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(1e23),
                    player.bronze.points = player.bronze.points.sub(125),
                    player.crafting_table.points = player.crafting_table.points.sub(2000000)
            },
            unlocked() { return hasUpgrade(ct, 31) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
                    'background-color': '#ffd7a1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        81: {
            title() {
                let t = "青铜斧"
                return t
            },
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
            canClick() { return player.crafting_table.points.gte(1) && player.wood.points.gte(64) && player.bronze.points.gte(125) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(72) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(64),
                    player.bronze.points = player.bronze.points.sub(125)
            },
            unlocked() { return hasUpgrade(ct, 32) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
                    'background-color': '#ffd7a1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        82: {
            title() {
                let t = "青铜镐"
                return t
            },
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
            canClick() { return player.crafting_table.points.gte(1) && player.wood.points.gte(64) && player.bronze.points.gte(250) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(72) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(64),
                    player.bronze.points = player.bronze.points.sub(250)
            },
            unlocked() { return hasUpgrade(ct, 33) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
                    'background-color': '#ffd7a1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        91: {
            title() {
                let t = "青铜外壳"
                return t
            },
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
            canClick() { return player.crafting_table.points.gte(1) && player.bronze.points.gte(2000) && !player.crafting_table.crafting && hasCraftingItem(72) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.bronze.points = player.bronze.points.sub(2000)
            },
            unlocked() { return hasUpgrade(ct, 34) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
                    'background-color': '#ffd7a1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        92: {
            title() {
                let t = "2阶太阳能板"
                return t
            },
            display() {
                let d = `
                需要工具：青铜合成台<br>
                需要材料：200青铜锭 + 1青铜外壳 + 1080玻璃<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：RF发电速度x4，解锁更多自动化升级。以及，青铜力量`
                return d
            },
            complexity: d(72000),
            canClick() { return player.crafting_table.points.gte(1) && player.bronze.points.gte(200) && hasCraftingItem(91) && player.furnace.glass.gte(1080) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(72) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.bronze.points = player.bronze.points.sub(200),
                    player.furnace.glass = player.furnace.glass.sub(1080),
                    player.crafting_table.items[91] = player.crafting_table.items[91].sub(1)
            },
            unlocked() { return hasUpgrade(ct, 35) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        101: {
            title() {
                let t = "铁质合成台"
                return t
            },
            display() {
                let d = `
                需要工具：青铜合成台 + 2e25合成台（消耗）<br>
                需要材料：5铁锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：合成的速度x60`
                return d
            },
            complexity: d(144000),
            canClick() { return player.crafting_table.points.gte(2e25) && player.iron.points.gte(5) && !hasCraftingItem(this.id) && !player.crafting_table.crafting && hasCraftingItem(72) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.iron.points = player.iron.points.sub(5),
                    player.crafting_table.points = player.crafting_table.points.sub(2e25)
            },
            unlocked() { return hasUpgrade(ct, 41) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        102: {
            title() {
                let t = "铁斧"
                return t
            },
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
            canClick() { return player.crafting_table.points.gte(1) && player.iron.points.gte(5) && player.wood.points.gte(64) && !hasCraftingItem(this.id) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.iron.points = player.iron.points.sub(5),
                    player.wood.points = player.wood.points.sub(64)
            },
            unlocked() { return hasUpgrade(ct, 42) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        111: {
            title() {
                let t = "铁镐"
                return t
            },
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
            canClick() { return player.crafting_table.points.gte(1) && player.iron.points.gte(6) && player.wood.points.gte(64) && !hasCraftingItem(this.id) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.iron.points = player.iron.points.sub(6),
                    player.wood.points = player.wood.points.sub(64)
            },
            unlocked() { return hasUpgrade(ct, 43) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        112: {
            title() {
                let t = "虚空电炉MK.1"
                return t
            },
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：10铁锭 + 1青铜外壳 + 1080玻璃<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：虚空电炉，顾名思义，凭空产生熔炼物品。配方在红石通量页面解锁`
                return d
            },
            complexity: d(3240000),
            canClick() { return player.crafting_table.points.gte(1) && player.iron.points.gte(10) && hasCraftingItem(91) && player.furnace.glass.gte(1080) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.iron.points = player.iron.points.sub(10),
                    player.furnace.glass = player.furnace.glass.sub(1080),
                    player.crafting_table.items[91] = player.crafting_table.items[91].sub(1)
            },
            unlocked() { return hasUpgrade(ct, 44) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        121: {
            title() {
                let t = "3阶太阳能板"
                return t
            },
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：12铁锭 + 1青铜外壳 + 1080玻璃<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：RF发电速度x10，解锁更多自动化升级。可以查看第5行部分配方`
                return d
            },
            complexity: d(4000000),
            canClick() { return player.crafting_table.points.gte(1) && player.iron.points.gte(12) && hasCraftingItem(91) && player.furnace.glass.gte(1080) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.iron.points = player.iron.points.sub(12),
                    player.furnace.glass = player.furnace.glass.sub(1080),
                    player.crafting_table.items[91] = player.crafting_table.items[91].sub(1)
            },
            unlocked() { return hasUpgrade(ct, 45) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        122: {
            title() {
                let t = "铁桶"
                return t
            },
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
            canClick() { return player.crafting_table.points.gte(1) && player.iron.points.gte(3) && !player.crafting_table.crafting && player[ct].items[122].lt(27) && hasCraftingItem(101) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.iron.points = player.iron.points.sub(3)
            },
            unlocked() { return hasUpgrade(ct, 51) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        131: {
            title() {
                let t = "铁制探矿杖"
                return t
            },
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：450铁锭 + 250青铜锭 + 2160玻璃<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：找矿速度x3，允许你挖掘镍矿石，解锁镍升级`
                return d
            },
            complexity: d(8000000),
            canClick() { return player.crafting_table.points.gte(1) && player.iron.points.gte(450) && player.bronze.points.gte(250) && player.furnace.glass.gte(2160) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.iron.points = player.iron.points.sub(450),
                    player.bronze.points = player.bronze.points.sub(250),
                    player.furnace.glass = player.furnace.glass.sub(2160)
            },
            unlocked() { return hasUpgrade(ct, 52) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        132: {
            title() {
                let t = "镍镐"
                return t
            },
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：10镍锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：青铜力量的效果变为原来的^1.5<br>
                挖掘等级：2`
                return d
            },
            complexity: d(10000000),
            canClick() { return player.crafting_table.points.gte(1) && player.nickel.points.gte(10) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.nickel.points = player.nickel.points.sub(10)
            },
            unlocked() { return hasUpgrade(ct, 53) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #fffcc0 0%, #f5f5d7 25%, #fffcc0 50%, #e3df94 75%, #8b8566 100%)",
                    'background-color': '#fffcc0',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        141: {
            title() {
                let t = "镍齿轮"
                return t
            },
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：4镍锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                数量：${fw(player[ct].items[141])}<br>`
                return d
            },
            complexity: d(5000000),
            canClick() { return player.crafting_table.points.gte(1) && player.nickel.points.gte(4) && !player.crafting_table.crafting && hasCraftingItem(101) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.nickel.points = player.nickel.points.sub(4)
            },
            unlocked() { return hasUpgrade(ct, 54) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #fffcc0 0%, #f5f5d7 25%, #fffcc0 50%, #e3df94 75%, #8b8566 100%)",
                    'background-color': '#fffcc0',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        142: {
            title() {
                let t = "镍机械挑战器"
                return t
            },
            display() {
                let d = `
                需要工具：铁质合成台<br>
                需要材料：4镍齿轮 + 20镍锭 + 600玻璃 <br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：解锁镍层级的挑战`
                return d
            },
            complexity: d(15000000),
            canClick() { return player.crafting_table.points.gte(1) && player.nickel.points.gte(20) && player.crafting_table.items[141].gte(4) && player.furnace.glass.gte(600) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.nickel.points = player.nickel.points.sub(20),
                    player.crafting_table.items[141] = player.crafting_table.items[141].sub(4),
                    player.furnace.glass = player.furnace.glass.sub(600)
            },
            unlocked() { return hasUpgrade(ct, 55) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #fffcc0 0%, #f5f5d7 25%, #fffcc0 50%, #e3df94 75%, #8b8566 100%)",
                    'background-color': '#fffcc0',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        151: {
            title() {
                let t = "铝质合成台"
                return t
            },
            display() {
                let d = `
                需要工具：铁质合成台 + 1e295合成台（消耗）<br>
                需要材料：33铝锭 <br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：合成的速度x50`
                return d
            },
            complexity: d(25000000),
            canClick() { return player.crafting_table.points.gte(1e295) && player.aluminum.points.gte(33) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(101) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.aluminum.points = player.aluminum.points.sub(33),
                    player.crafting_table.points = player.crafting_table.points.sub(1e295)
            },
            unlocked() { return hasUpgrade(ct, 61) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)",
                    'background-color': '#e2e3ee',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        152: {
            title() {
                let t = "铝斧"
                return t
            },
            display() {
                let d = `
                需要工具：铝质合成台<br>
                需要材料：25铝锭 + 300木头 <br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：允许在撸树时获得金合欢原木<br>
                挖掘等级：2`
                return d
            },
            complexity: d(50000000),
            canClick() { return player.crafting_table.points.gte(1) && player.aluminum.points.gte(25) && player.wood.points.gte(300) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(151) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.aluminum.points = player.aluminum.points.sub(25),
                    player.wood.points = player.wood.points.sub(300)
            },
            unlocked() { return hasUpgrade(ct, 62) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)",
                    'background-color': '#e2e3ee',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        161: {
            title() {
                let t = "铝镐"
                return t
            },
            display() {
                let d = `
                需要工具：铝质合成台<br>
                需要材料：32铝锭 + 300木头 <br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：青铜力量效果再次^1.5，铁锭熔炼倍率锁定为铁矿石数量的10%<br>
                挖掘等级：2`
                return d
            },
            complexity: d(80000000),
            canClick() { return player.crafting_table.points.gte(1) && player.aluminum.points.gte(32) && player.wood.points.gte(300) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(151) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.aluminum.points = player.aluminum.points.sub(32),
                    player.wood.points = player.wood.points.sub(300)
            },
            unlocked() { return hasUpgrade(ct, 63) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)",
                    'background-color': '#e2e3ee',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        162: {
            title() {
                let t = "铝机械臂"
                return t
            },
            display() {
                let d = `
                需要工具：铝质合成台<br>
                需要材料：48铝锭 + 16铁锭 <br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：解锁更多自动化和新的铝升级`
                return d
            },
            complexity: d(120000000),
            canClick() { return player.crafting_table.points.gte(1) && player.aluminum.points.gte(48) && player.iron.points.gte(16) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(151) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.aluminum.points = player.aluminum.points.sub(48),
                    player.iron.points = player.iron.points.sub(16)
            },
            unlocked() { return hasUpgrade(ct, 64) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)",
                    'background-color': '#e2e3ee',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        171: {
            title() {
                let t = "铅镐"
                return t
            },
            display() {
                let d = `
                需要工具：铝质合成台<br>
                需要材料：32铅锭 + 300木头 <br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：铁矿石获取变为100,000x；镍矿石获取变为10,000x；铝矿石获取变为25x；铅矿石获取变为3x。镍矿石现在可以自动化<br>
                挖掘等级：2`
                return d
            },
            complexity: d(160000000),
            canClick() { return player.crafting_table.points.gte(1) && player.lead.points.gte(32) && player.wood.points.gte(300) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(151) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.lead.points = player.lead.points.sub(32),
                    player.wood.points = player.wood.points.sub(300)
            },
            unlocked() { return hasUpgrade(ct, 65) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #667397 0%, #acc0ff 20%, #97a9e0 50%, #6a7392 80%, #333848 100%)",
                    'background-color': '#97a9e0',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        172: {
            title() {
                let t = "奇点凝聚器"
                return t
            },
            display() {
                let d = `
                需要工具：铝质合成台<br>
                需要材料：64铅锭 + 64镍齿轮 + 1024铁锭 + 2石头奇点（不消耗） <br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：解锁制造区域新层级：奇点凝聚器`
                return d
            },
            complexity: d(320000000),
            canClick() { return player.crafting_table.points.gte(1) && player.lead.points.gte(64) && player.iron.points.gte(1024) && player.crafting_table.items[141].gte(64) && singularity(stone).gte(2) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(151) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.lead.points = player.lead.points.sub(64),
                    player.iron.points = player.iron.points.sub(1024),
                    player.crafting_table.items[141] = player.crafting_table.items[141].sub(64)
            },
            unlocked() { return hasUpgrade(ct, 71) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #667397 0%, #acc0ff 20%, #97a9e0 50%, #6a7392 80%, #333848 100%)",
                    'background-color': '#97a9e0',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        181: {
            title() {
                let t = "铅锤"
                return t
            },
            display() {
                let d = `
                需要工具：铝质合成台<br>
                需要材料：72铅锭 + 200木头 <br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：可挖掘可锻造，合成的速度x15；25x铝矿石获取和铝锭熔炼倍率<br>
                挖掘等级：2`
                return d
            },
            complexity: d(640000000),
            canClick() { return player.crafting_table.points.gte(1) && player.lead.points.gte(72) && player.wood.points.gte(200) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(151) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.lead.points = player.lead.points.sub(72),
                    player.wood.points = player.wood.points.sub(200)
            },
            unlocked() { return hasUpgrade(ct, 72) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #667397 0%, #acc0ff 20%, #97a9e0 50%, #6a7392 80%, #333848 100%)",
                    'background-color': '#97a9e0',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        182: {
            title() {
                let t = "铅板"
                return t
            },
            display() {
                let d = `
                需要工具：铝质合成台 + 铅锤<br>
                需要材料：10铅锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                数量：${fw(player[ct].items[182])}<br>`
                return d
            },
            complexity: d(1.28e9),
            canClick() { return player.crafting_table.points.gte(1) && player.lead.points.gte(10) && !player.crafting_table.crafting && hasCraftingItem(151) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.lead.points = player.lead.points.sub(10)
            },
            unlocked() { return hasUpgrade(ct, 73) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #667397 0%, #acc0ff 20%, #97a9e0 50%, #6a7392 80%, #333848 100%)",
                    'background-color': '#97a9e0',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        191: {
            title() {
                let t = "铅外壳"
                return t
            },
            display() {
                let d = `
                需要工具：铝质合成台 + 铅锤<br>
                需要材料：6铅板<br>
                复杂度：${formatWhole(this.complexity)}<br>
                数量：${fw(player[ct].items[191])}<br>`
                return d
            },
            complexity: d(1.69e9),
            canClick() { return player.crafting_table.points.gte(1) && player.crafting_table.items[182].gte(6) && !player.crafting_table.crafting && hasCraftingItem(151) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.crafting_table.items[182] = player.crafting_table.items[182].sub(6)
            },
            unlocked() { return hasUpgrade(ct, 74) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #667397 0%, #acc0ff 20%, #97a9e0 50%, #6a7392 80%, #333848 100%)",
                    'background-color': '#97a9e0',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        192: {
            title() {
                let t = "辐射防护器"
                return t
            },
            display() {
                let d = `
                需要工具：铝质合成台 + 铅锤<br>
                需要材料：3铅外壳 + 32镍齿轮<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：石头奇点的效果变为原来的^5，铜奇点的效果变为原来的^2.5，解锁新的铅升级<br>`
                return d
            },
            complexity: d(3.25e9),
            canClick() { return player.crafting_table.points.gte(1) && player.crafting_table.items[191].gte(3) && player.crafting_table.items[141].gte(32) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(151) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.crafting_table.items[191] = player.crafting_table.items[191].sub(3),
                    player.crafting_table.items[141] = player.crafting_table.items[141].sub(32)
            },
            unlocked() { return hasUpgrade(ct, 75) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #667397 0%, #acc0ff 20%, #97a9e0 50%, #6a7392 80%, #333848 100%)",
                    'background-color': '#97a9e0',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        201: {
            title() {
                let t = "康铜镐"
                return t
            },
            display() {
                let d = `
                需要工具：铝质合成台 + 铅锤<br>
                需要材料：2000康铜锭 + 200木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：第9镍升级的效果变为^1.5，第8铝升级的效果变为^1.35<br>`
                return d
            },
            complexity: d(4e9),
            canClick() { return player.crafting_table.points.gte(1) && player.constantan.points.gte(2000) && player.wood.points.gte(200) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(151) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.constantan.points = player.constantan.points.sub(2000),
                    player.wood.points = player.wood.points.sub(200)
            },
            unlocked() { return hasUpgrade(ct, 81) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #d39f49 0%, #ffd37c 30%, #eeba4f 80%, #7d6233 100%)",
                    'background-color': '#eeba4f',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        202: {
            title() {
                let t = "康铜精华转化器"
                return t
            },
            display() {
                let d = `
                需要工具：铝质合成台 + 铅锤<br>
                需要材料：15000康铜锭 + 2e9铅锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：解锁康铜精华（康铜层级新页面）<br>`
                return d
            },
            complexity: d(7.7e9),
            canClick() { return player.crafting_table.points.gte(1) && player.constantan.points.gte(2000) && player.lead.points.gte(2e9) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(151) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.constantan.points = player.constantan.points.sub(15000),
                    player.lead.points = player.lead.points.sub(2e9)
            },
            unlocked() { return hasUpgrade(ct, 82) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #d39f49 0%, #ffd37c 30%, #eeba4f 80%, #7d6233 100%)",
                    'background-color': '#eeba4f',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        211: {
            title() {
                let t = "殷钢合成台"
                return t
            },
            display() {
                let d = `
                需要工具：铝质合成台 + 铅锤 + 1e1590合成台（消耗）<br>
                需要材料：100殷钢锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：合成的速度变为77x<br>`
                return d
            },
            complexity: d(1e10),
            canClick() { return player.crafting_table.points.gte('1e1590') && player.invar.points.gte(100) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(151) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.crafting_table.points = player.crafting_table.points.sub('1e1590'),
                    player.invar.points = player.invar.points.sub(100)
            },
            unlocked() { return hasUpgrade(ct, 83) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'background-color': '#95a7a1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        212: {
            title() {
                let t = "殷钢斧"
                return t
            },
            display() {
                let d = `
                需要工具：殷钢合成台 + 铅锤<br>
                需要材料：100殷钢锭 + 200木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：1e2000x木头获取，解锁一些自动化升级<br>
                挖掘等级：3`
                return d
            },
            complexity: d(1.8e10),
            canClick() { return player.crafting_table.points.gte(1) && player.invar.points.gte(100) && player.wood.points.gte(200) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(211) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.invar.points = player.invar.points.sub(100)
            },
            unlocked() { return hasUpgrade(ct, 84) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'background-color': '#95a7a1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        221: {
            title() {
                let t = "殷钢镐"
                return t
            },
            display() {
                let d = `
                需要工具：殷钢合成台 + 铅锤<br>
                需要材料：120殷钢锭 + 200木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：1e2000x石头获取<br>
                挖掘等级：3`
                return d
            },
            complexity: d(2.8e10),
            canClick() { return player.crafting_table.points.gte(1) && player.invar.points.gte(120) && player.wood.points.gte(200) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(211) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.invar.points = player.invar.points.sub(120)
            },
            unlocked() { return hasUpgrade(ct, 85) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'background-color': '#95a7a1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        222: {
            title() {
                let t = "4阶太阳能板"
                return t
            },
            display() {
                let d = `
                需要工具：殷钢合成台 + 铅锤<br>
                需要材料：120殷钢锭 + 300000玻璃<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：RF发电速度x15<br>`
                return d
            },
            complexity: d(5.6e10),
            canClick() { return player.crafting_table.points.gte(1) && player.invar.points.gte(120) && player.furnace.glass.gte(300000) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(211) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.furnace.glass = player.furnace.glass.sub(300000),
                    player.invar.points = player.invar.points.sub(120)
            },
            unlocked() { return hasUpgrade(ct, 91) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'background-color': '#95a7a1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        231: {
            title() {
                let t = "热力机械外壳"
                return t
            },
            display() {
                let d = `
                需要工具：殷钢合成台 + 铅锤<br>
                需要材料：240殷钢锭 + 32镍齿轮 + 40铅板 + 500,000玻璃<br>
                复杂度：${formatWhole(this.complexity)}<br>
                数量：${fw(player[ct].items[231])}<br>`
                return d
            },
            complexity: d(1.12e11),
            canClick() { return player.crafting_table.points.gte(1) && player.invar.points.gte(240) && player[ct].items[141].gte(32) && player[ct].items[182].gte(40) && player.furnace.glass.gte(500000) && !player.crafting_table.crafting && hasCraftingItem(211) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player[ct].items[141] = player[ct].items[141].sub(32),
                    player[ct].items[182] = player[ct].items[182].sub(40),
                    player.furnace.glass = player.furnace.glass.sub(500000),
                    player.invar.points = player.invar.points.sub(240)
            },
            unlocked() { return hasUpgrade(ct, 92) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'background-color': '#95a7a1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        232: {
            title() {
                let t = "蓄水器"
                return t
            },
            display() {
                let d = `
                需要工具：殷钢合成台 + 铅锤<br>
                需要材料：1热力机械外壳 + 100铝锭<br>
                复杂度：${formatWhole(this.complexity)}<br>`
                return d
            },
            complexity: d(1.68e11),
            canClick() { return player.crafting_table.points.gte(1) && player.aluminum.points.gte(100) && player[ct].items[231].gte(1) && !hasCraftingItem(this.id) && !player.crafting_table.crafting && hasCraftingItem(211) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player[ct].items[231] = player[ct].items[231].sub(1),
                    player.aluminum.points = player.aluminum.points.sub(100)
            },
            unlocked() { return hasUpgrade(ct, 93) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'background-color': '#95a7a1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        241: {
            title() {
                let t = "熔岩炉"
                return t
            },
            display() {
                let d = `
                需要工具：殷钢合成台 + 铅锤<br>
                需要材料：1热力机械外壳 + 100铁锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：熔炼的速度x1.8`
                return d
            },
            complexity: d(2.16e11),
            canClick() { return player.crafting_table.points.gte(1) && player.iron.points.gte(100) && player[ct].items[231].gte(1) && !hasCraftingItem(this.id) && !player.crafting_table.crafting && hasCraftingItem(211) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player[ct].items[231] = player[ct].items[231].sub(1),
                    player.iron.points = player.iron.points.sub(100)
            },
            unlocked() { return hasUpgrade(ct, 94) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'background-color': '#95a7a1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        242: {
            title() {
                let t = "硬化转换套件"
                return t
            },
            display() {
                let d = `
                需要工具：殷钢合成台 + 铅锤<br>
                需要材料：1镍齿轮 + 4殷钢锭 + 1,000,000,000RF<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：1个使蓄水器效率变为10x、3个使熔岩炉效率变为10x、5个解锁熔岩炉熔炼金属<br>
                数量：${fw(player[ct].items[242])}/5<br>`
                return d
            },
            complexity: d(4.42e11),
            canClick() { return player.crafting_table.points.gte(1) && player.invar.points.gte(4) && player.rf.points.gte(1e9) && player[ct].items[141].gte(1) && player[ct].items[242].lt(5) && !player.crafting_table.crafting && hasCraftingItem(211) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player[ct].items[141] = player[ct].items[141].sub(1),
                    player.invar.points = player.invar.points.sub(4),
                    player.rf.points = player.rf.points.sub(1e9)
            },
            unlocked() { return hasUpgrade(ct, 95) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'background-color': '#95a7a1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        251: {
            title() {
                let t = "殷钢维度启动器"
                return t
            },
            display() {
                let d = `
                需要工具：殷钢合成台 + 铅锤<br>
                需要材料：3000殷钢锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：解锁殷钢维度<br>`
                return d
            },
            complexity: d(1e12),
            canClick() { return player.crafting_table.points.gte(1) && player.invar.points.gte(3000) && !hasCraftingItem(this.id) && !player.crafting_table.crafting && hasCraftingItem(211) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.invar.points = player.invar.points.sub(3000)
            },
            unlocked() { return hasUpgrade(ct, 101) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'background-color': '#95a7a1',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        252: {
            title() {
                let t = "铝黄铜镐"
                return t
            },
            display() {
                let d = `
                需要工具：殷钢合成台 + 铅锤<br>
                需要材料：150铝黄铜锭 + 200木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：白桦原木的效果变得更强，非常强<br>
                挖掘等级：3`
                return d
            },
            complexity: d(1.125e12),
            canClick() { return player.crafting_table.points.gte(1) && player.alumbrass.points.gte(150) && player.wood.points.gte(200) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(211) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.alumbrass.points = player.alumbrass.points.sub(150)
            },
            unlocked() { return hasUpgrade(ct, 102) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #e6c34b 0%, #f0d467 30%, #e6c34b 75%, #ab7d1b 100%)",
                    'background-color': '#f0d467',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        261: {
            title() {
                let t = "锌制探矿杖"
                return t
            },
            display() {
                let d = `
                需要工具：殷钢合成台 + 铅锤<br>
                需要材料：45锌锭 + 1,000,000玻璃<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：找矿的速度变为10x（你一定很需要这样的提升，久等了！）`
                return d
            },
            complexity: d(1.250e12),
            canClick() { return player.crafting_table.points.gte(1) && player.zinc.points.gte(45) && player.furnace.glass.gte(1000000) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(211) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.furnace.glass = player.furnace.glass.sub(1000000),
                    player.zinc.points = player.zinc.points.sub(45)
            },
            unlocked() { return hasUpgrade(ct, 103) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #a3be9e 0%, #fcfcfc 10%, #b7e6bf 40%, #b7e6bf 60%, #d3fcd9 80%, #4f6c62 100%)",
                    'background-color': '#b7e6bf',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        262: {
            title() {
                let t = "锌镐"
                return t
            },
            display() {
                let d = `
                需要工具：殷钢合成台 + 铅锤<br>
                需要材料：300锌锭 + 200木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：挖掘速度变为2.25x，青铜力量强化器MK.4的指数上的系数+5<br>
                挖掘等级：3`
                return d
            },
            complexity: d(1.5e12),
            canClick() { return player.crafting_table.points.gte(1) && player.zinc.points.gte(300) && player.wood.points.gte(200) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(211) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.zinc.points = player.zinc.points.sub(300)
            },
            unlocked() { return hasUpgrade(ct, 104) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #a3be9e 0%, #fcfcfc 10%, #b7e6bf 40%, #b7e6bf 60%, #d3fcd9 80%, #4f6c62 100%)",
                    'background-color': '#b7e6bf',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        271: {
            title() {
                let t = "黄铜合成站"
                return t
            },
            display() {
                let d = `
                需要工具：殷钢合成台 + 铅锤<br>
                需要材料：300黄铜锭 + 5000石头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：合成的速度变为100x`
                return d
            },
            complexity: d(2.5e12),
            canClick() { return player.crafting_table.points.gte(1) && player.brass.points.gte(300) && player.stone.points.gte(5000) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(211) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.stone.points = player.stone.points.sub(5000),
                    player.brass.points = player.brass.points.sub(300)
            },
            unlocked() { return hasUpgrade(ct, 105) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #fce892 0%, #fce892 30%,  #f8ac67 60%, #f8ac67 80%, #75452c 100%)",
                    'background-color': '#f8ac67',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        272: {
            title() {
                let t = "黄铜镐"
                return t
            },
            display() {
                let d = `
                需要工具：黄铜合成站 + 铅锤<br>
                需要材料：300黄铜锭 + 200木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：100x锌矿石获取以及锌锭熔炼倍率<br>
                挖掘等级：3`
                return d
            },
            complexity: d(5e12),
            canClick() { return player.crafting_table.points.gte(1) && player.brass.points.gte(300) && player.wood.points.gte(200) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(271) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.brass.points = player.brass.points.sub(300)
            },
            unlocked() { return hasUpgrade(ct, 111) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #fce892 0%, #fce892 30%,  #f8ac67 60%, #f8ac67 80%, #75452c 100%)",
                    'background-color': '#f8ac67',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        281: {
            title() {
                let t = "黄铜齿轮"
                return t
            },
            display() {
                let d = `
                需要工具：黄铜合成站 + 铅锤<br>
                需要材料：4黄铜锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                倍率：${fw(this.mult())}<br>
                数量：${fw(player[ct].items[281])}<br>`
                return d
            },
            complexity: d(6e12),
            mult() {
                let m = d(1)
                if (hasUpgrade(brass, 24)) m = player.brass.points.max(1).pow(0.3).floor()
                return m
            },
            canClick() { return player.crafting_table.points.gte(1) && player.brass.points.gte(d(4).times(this.mult())) && !player.crafting_table.crafting && hasCraftingItem(271) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.brass.points = player.brass.points.sub(d(4).times(this.mult()))
            },
            unlocked() { return hasUpgrade(ct, 112) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #fce892 0%, #fce892 30%,  #f8ac67 60%, #f8ac67 80%, #75452c 100%)",
                    'background-color': '#f8ac67',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        282: {
            title() {
                let t = "水车"
                return t
            },
            display() {
                let d = `
                需要工具：黄铜合成站 + 铅锤<br>
                需要材料：1黄铜齿轮 + 200石头 + 200木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                倍率：${fw(this.mult())}<br>
                数量：${fw(player[ct].items[282])} ${hasUpgrade(steel, 11) ? `(${fw(this.mult())}/s)` : ""}<br>
                效果：需要合成应力表后才可发挥用途`
                return d
            },
            complexity: d(8e12),
            mult() {
                let m = d(1)
                if (hasUpgrade(brass, 24)) m = player.brass.points.max(1).pow(0.3).floor()
                return m
            },
            autoCraft(diff) {
                if (hasUpgrade(steel, 11)) player.crafting_table.items[282] = player.crafting_table.items[282].add(this.mult().div(tick))
            },
            canClick() { return player.crafting_table.points.gte(1) && player.crafting_table.items[281].gte(this.mult()) && player.wood.points.gte(d(200).times(this.mult())) && player.stone.points.gte(d(200).times(this.mult())) && !player.crafting_table.crafting && hasCraftingItem(271) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(d(200).times(this.mult())),
                    player.stone.points = player.stone.points.sub(d(200).times(this.mult())),
                    player.crafting_table.items[281] = player.crafting_table.items[281].sub(this.mult())
            },
            unlocked() { return hasUpgrade(ct, 113) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #fce892 0%, #fce892 30%,  #f8ac67 60%, #f8ac67 80%, #75452c 100%)",
                    'background-color': '#f8ac67',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        291: {
            title() {
                let t = "应力表"
                return t
            },
            display() {
                let d = `
                需要工具：黄铜合成站 + 铅锤<br>
                需要材料：300黄铜锭 + 200石头 + 200木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：解锁黄铜层级应力界面`
                return d
            },
            complexity: d(1e13),
            canClick() { return player.crafting_table.points.gte(1) && player.brass.points.gte(300) && player.wood.points.gte(200) && player.stone.points.gte(200) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(271) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.stone.points = player.stone.points.sub(200),
                    player.brass.points = player.brass.points.sub(300)
            },
            unlocked() { return hasUpgrade(ct, 114) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #fce892 0%, #fce892 30%,  #f8ac67 60%, #f8ac67 80%, #75452c 100%)",
                    'background-color': '#f8ac67',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        292: {
            title() {
                let t = "钢斧"
                return t
            },
            display() {
                let d = `
                需要工具：黄铜合成站 + 铅锤<br>
                需要材料：96钢锭 + 200木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：丛林、金合欢原木的获取公式变得更好<br>
                挖掘等级：3`
                return d
            },
            complexity: d(1.96e13),
            canClick() { return player.crafting_table.points.gte(1) && player.steel.points.gte(96) && player.wood.points.gte(200) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(271) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.steel.points = player.steel.points.sub(96)
            },
            unlocked() { return hasUpgrade(ct, 115) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #7a7a7a 0%, #adadad 30%, #adadad 80%, #989898 90%, #414141 100%)",
                    'background-color': '#adadad',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        301: {
            title() {
                let t = "钢镐"
                return t
            },
            display() {
                let d = `
                需要工具：黄铜合成站 + 铅锤<br>
                需要材料：575钢锭 + 200木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：钢锭效果现在也能加成锌矿石连锁倍数<br>
                挖掘等级：3`
                return d
            },
            complexity: d(2.94e13),
            canClick() { return player.crafting_table.points.gte(1) && player.steel.points.gte(575) && player.wood.points.gte(200) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(271) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.steel.points = player.steel.points.sub(575)
            },
            unlocked() { return hasUpgrade(ct, 121) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #7a7a7a 0%, #adadad 30%, #adadad 80%, #989898 90%, #414141 100%)",
                    'background-color': '#adadad',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        302: {
            title() {
                let t = "钢熔炉"
                return t
            },
            display() {
                let d = `
                需要工具：黄铜合成站 + 铅锤 + 1e4330熔炉（消耗）<br>
                需要材料：700钢锭<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：钢锭加成自动熔炼木炭的数量，解锁更多钢升级<br>
                当前：${f(clickableEffect(ct, 302))}x`
                return d
            },
            complexity: d(3.92e13),
            effect() {
                let eff = player.steel.points.max(1)
                return eff
            },
            canClick() { return player.crafting_table.points.gte(1) && player.steel.points.gte(700) && player.furnace.points.gte("1e4330") && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(271) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.furnace.points = player.furnace.points.sub("1e4330"),
                    player.steel.points = player.steel.points.sub(700)
            },
            unlocked() { return hasUpgrade(ct, 122) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #7a7a7a 0%, #adadad 30%, #adadad 80%, #989898 90%, #414141 100%)",
                    'background-color': '#adadad',
                }
            },
            marked() { return hasCraftingItem(this.id) },
            tooltip() {
                let t = `公式：钢锭`
                return t
            },
        },
        311: {
            title() {
                let t = "银斧"
                return t
            },
            display() {
                let d = `
                需要工具：黄铜合成站 + 铅锤<br>
                需要材料：360银锭 + 200木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：木头获取变为原来的1.00e100,000x<br>
                挖掘等级：3`
                return d
            },
            complexity: d(5.5e13),
            canClick() { return player.crafting_table.points.gte(1) && player.silver.points.gte(360) && player.wood.points.gte(200) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(271) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.silver.points = player.silver.points.sub(360)
            },
            unlocked() { return hasUpgrade(ct, 123) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #65696b 0%, #bbc7ce 20%, #ddf2f5 40%, #9cc1ca 70%, #5ca0a6 100%)",
                    'background-color': '#ddf2f5',
                }
            },
            marked() { return hasCraftingItem(this.id) },
        },
        312: {
            title() {
                let t = "银镐"
                return t
            },
            display() {
                let d = `
                需要工具：黄铜合成站 + 铅锤<br>
                需要材料：720银锭 + 200木头<br>
                复杂度：${formatWhole(this.complexity)}<br>
                效果：等级在85,600之后加成银矿石获取，解锁银矿场<br>
                当前：${f(clickableEffect(ct, 312))}x
                挖掘等级：3`
                return d
            },
            complexity: d(7.5e13),
            effect() {
                let eff = player.level.max(85600).sub(85600).div(8000).add(1).pow(2)
                return eff
            },
            canClick() { return player.crafting_table.points.gte(1) && player.silver.points.gte(720) && player.wood.points.gte(200) && !player.crafting_table.crafting && !hasCraftingItem(this.id) && hasCraftingItem(271) && hasCraftingItem(181) },
            onClick() {
                player.crafting_table.crafting = true,
                    player.crafting_table.craftingItem = this.id,
                    player.wood.points = player.wood.points.sub(200),
                    player.silver.points = player.silver.points.sub(720)
            },
            unlocked() { return hasUpgrade(ct, 124) },
            style() {
                return {
                    'min-height': '210px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #65696b 0%, #bbc7ce 20%, #ddf2f5 40%, #9cc1ca 70%, #5ca0a6 100%)",
                    'background-color': '#ddf2f5',
                }
            },
            marked() { return hasCraftingItem(this.id) },
            tooltip() {
                let t = `公式：((等级-85,600)/8,000+1)<sup>2</sup>`
                return t
            },
        },
        1001: {
            display() {
                let d = `取消合成`
                return d
            },
            canClick() { return isCraftingItem() },
            onClick() {
                if (confirm("你确定要取消合成吗？这将不会返还材料，并且会丢失合成进度！")) stopCrafting()
            },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
        1011: {
            display() {
                let d = `<<`
                return d
            },
            tooltip: "向前翻5页",
            canClick() { return player.crafting_table.page > 1 },
            onClick() {
                player.crafting_table.page = Math.max(player.crafting_table.page - 5, 1)
            },
            style() {
                return {
                    'min-height': '50px',
                    'width': '50px',
                    'font-size': '20px',
                    'margin-left': '-7px',
                    'margin-right': '-7px',
                }
            },
        },
        1012: {
            display() {
                let d = `<`
                return d
            },
            canClick() { return player.crafting_table.page > 1 },
            onClick() {
                player.crafting_table.page -= 1
            },
            style() {
                return {
                    'min-height': '50px',
                    'width': '50px',
                    'font-size': '20px',
                    'margin-left': '-7px',
                    'margin-right': '-7px',
                }
            },
        },
        1013: {
            display() {
                let d = `${formatWhole(player.crafting_table.page)}/${formatWhole(player.crafting_table.maxPage)}页`
                return d
            },
            canClick() { return false },
            style() {
                return {
                    'min-height': '50px',
                    'width': '150px',
                    'font-size': '20px',
                    'background-color': '#b8945e',
                    'margin-left': '-7px',
                    'margin-right': '-7px',
                    'border-radius': '2.5px',
                }
            },
        },
        1014: {
            display() {
                let d = `>`
                return d
            },
            canClick() { return player.crafting_table.page < player.crafting_table.maxPage },
            onClick() {
                player.crafting_table.page += 1
            },
            style() {
                return {
                    'min-height': '50px',
                    'width': '50px',
                    'font-size': '20px',
                    'margin-left': '-7px',
                    'margin-right': '-7px',
                }
            },
        },
        1015: {
            display() {
                let d = `>>`
                return d
            },
            tooltip: "向后翻5页",
            canClick() { return player.crafting_table.page < player.crafting_table.maxPage },
            onClick() {
                player.crafting_table.page = Math.min(player.crafting_table.page + 5, player.crafting_table.maxPage)
            },
            style() {
                return {
                    'min-height': '50px',
                    'width': '50px',
                    'font-size': '20px',
                    'margin-left': '-7px',
                    'margin-right': '-7px',
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
            unlocked() { return tmp.crafting_table.layerShown },
            fillStyle() { return { "background-color": craftingItemColor(craftingItemID()) } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
        },
    },

    update(diff) {
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
        if (hasCraftingItem(181)) speed = speed.times(15)
        if (hasCraftingItem(211)) speed = speed.times(77)
        if (hasCraftingItem(271)) speed = speed.times(100)
        if (hasUpgrade(brass, 14)) speed = speed.times(upgradeEffect(brass, 14))
        player[ct].speed = speed

        //更新最大页码
        if (tmp[ct].clickables[31].unlocked) player[ct].maxPage = 2
        if (tmp[ct].clickables[51].unlocked || tmp[ct].clickables[52].unlocked || tmp[ct].clickables[61].unlocked) player[ct].maxPage = 3
        if (tmp[ct].clickables[71].unlocked) player[ct].maxPage = 4
        if (tmp[ct].clickables[91].unlocked || tmp[ct].clickables[92].unlocked) player[ct].maxPage = 5
        if (tmp[ct].clickables[111].unlocked || tmp[ct].clickables[112].unlocked || tmp[ct].clickables[121].unlocked) player[ct].maxPage = 6
        if (tmp[ct].clickables[131].unlocked) player[ct].maxPage = 7
        if (tmp[ct].clickables[151].unlocked || tmp[ct].clickables[152].unlocked) player[ct].maxPage = 8
        if (tmp[ct].clickables[171].unlocked) player[ct].maxPage = 9
        if (tmp[ct].clickables[191].unlocked || tmp[ct].clickables[192].unlocked) player[ct].maxPage = 10
        if (tmp[ct].clickables[211].unlocked || tmp[ct].clickables[212].unlocked) player[ct].maxPage = 11
        if (tmp[ct].clickables[231].unlocked || tmp[ct].clickables[232].unlocked || tmp[ct].clickables[241].unlocked) player[ct].maxPage = 12
        if (tmp[ct].clickables[251].unlocked) player[ct].maxPage = 13
        if (tmp[ct].clickables[271].unlocked || tmp[ct].clickables[272].unlocked) player[ct].maxPage = 14
        if (tmp[ct].clickables[291].unlocked) player[ct].maxPage = 15
        if (tmp[ct].clickables[311].unlocked || tmp[ct].clickables[312].unlocked) player[ct].maxPage = 16

        //
        if (player[ct].cooldown.gt(0)) player[ct].cooldown = player[ct].cooldown.sub(0.05)
        if (player[ct].cooldown.lte(0.05)) player[ct].cooldown = d(0)
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        "main-display",
        ["row", ["prestige-button", "blank", ["display-text", () => `你同时最多拥有 ${formatWhole(player.crafting_table.best)} 合成台<br><br>合成有1秒冷却：${format(player.crafting_table.cooldown)}/1.00`]]],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "craft": {
                unlocked() { return tmp.crafting_table.layerShown },
                name() { return '合成' },
                content: [
                    ["blank", "15px"],
                    ["raw-html", () => `<h4 style="opacity:.5">不是，哥们！这不就是工作台吗？`],
                    "blank",
                    ["display-text", function () {
                        let d = `你正在合成 ${craftingItemName(craftingItemID())}`
                        if (!isCraftingItem()) d = `你当前不在合成`
                        return d
                    }],
                    "blank",
                    ["row", [["bar", "craft"], ["clickables", [100]]]],
                    "blank",
                    ["clickables", [101]],
                    "blank",
                    ["clickables", function () { return [player.crafting_table.page * 2 - 1] }],
                    "blank",
                    ["clickables", function () { return [player.crafting_table.page * 2] }],
                    ["display-text", function () { return `合成速度：${format(player.crafting_table.speed)}/秒` }],
                    "blank",
                    ["display-text", function () { return `一般情况下，合成道具时只会消耗材料，不会消耗工具` }],
                    ["display-text", function () { return `而特殊情况下会进行额外标注` }],
                    ["display-text", function () { return `对于已拥有的道具，对应的合成按钮会附上星标` }],
                    ["display-text", function () { return `注意：取消合成不会返还已消耗的材料，并且会丢失合成进度！` }],
                ]
            },
            "recipe": {
                unlocked() { return hasNormalAchievement(22) },
                name() { return '图纸' },
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ],
            },
            "milestones": {
                unlocked() { return tmp.crafting_table.layerShown },
                name() { return '里程碑' },
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
    componentStyles: {
        "clickable"() {
            return {
                'margin-left': '-7px',
                'margin-right': '-7px',
            }
        }
    },
    name: "furnace",
    position: 1003,
    row: 101,
    symbol: '熔炉', // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
            glass: d(0),
            charcoal: d(0),
            brick: d(0),
            scorched_brick: d(0),
            cooldown: d(0),
            speed: d(40),
            smelting: false,
            smeltingItem: 0, //0为凑数id
            burning: false,
            fuel: 10000, //10000为凑数id
            temperature: d(20),
            page: 1,
            maxPage: 1,
        }
    },
    color: "#4a4a4a",
    type: "normal",
    layerType: "craft",
    resource: "熔炉",
    baseResource() { return "石头" },
    baseAmount() { return player.stone.points },
    exponent: 0.05,
    requires: d(1414213),
    tooltip() { return false },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        m = d(1)
        return m
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        e = d(1)
        return e
    },
    resetDescription: "重置以合成 ",
    layerShown() { return hasNormalAchievement(25) },// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.

    onPrestige() {
        return player.furnace.cooldown = d(1)
    },

    canReset() {
        return player.furnace.cooldown.lte(0) && player.stone.points.gte(1414213)
    },

    doReset(resettingLayer) {
        if (hasMilestone(furnace, 0)) return undefined
    },

    passiveGeneration() { return hasUpgrade(constantan, 14) },

    upgrades: {
        11: {
            title: "玻璃",
            description: "解锁玻璃的熔炼配方",
            currencyInternalName: "sand",
            currencyDisplayName: "沙子",
            currencyLayer: stone,
            cost() { return new ExpantaNum(9999) },
            unlocked() { return hasUpgrade(stone, 33) },
        },
        12: {
            title: "锡锭",
            description: "解锁锡锭的熔炼配方",
            currencyInternalName: "ore",
            currencyDisplayName: "锡矿石",
            currencyLayer: tin,
            cost() { return new ExpantaNum(5) },
            unlocked() { return hasUpgrade(copper, 25) },
        },
        13: {
            title: "木炭",
            description: "解锁木炭的熔炼配方以及现在可以木炭作为燃料",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() { return new ExpantaNum(15) },
            unlocked() { return hasUpgrade(iron, 14) },
        },
        14: {
            title: "铁锭",
            description: "解锁铁锭的熔炼配方",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() { return new ExpantaNum(15) },
            unlocked() { return hasUpgrade(iron, 14) },
        },
        15: {
            title: "镍锭",
            fullDisplay() {
                return `<h3>${this.title}</h3><br>解锁镍锭的熔炼配方<br><br>正在以熔岩作为燃料时，直接免费解锁`
            },
            cost() { return new ExpantaNum(0) },
            canAfford() { return fuelID() == 10004 },
            unlocked() { return hasUpgrade(nickel, 14) },
        },
        21: {
            title: "铝锭",
            fullDisplay() {
                return `<h3>${this.title}</h3><br>解锁铝锭的熔炼配方<br><br>购买第5个铝升级后免费解锁`
            },
            cost() { return new ExpantaNum(0) },
            unlocked() { return hasUpgrade(aluminum, 15) },
        },
        22: {
            title: "铅锭",
            fullDisplay() {
                return `<h3>${this.title}</h3><br>解锁铅锭的熔炼配方<br><br>购买第5个铅升级后免费解锁`
            },
            cost() { return new ExpantaNum(0) },
            unlocked() { return hasUpgrade(lead, 15) },
        },
        23: {
            title: "锌锭",
            fullDisplay() {
                return `<h3>${this.title}</h3><br>解锁锌锭的熔炼配方<br><br>购买第5个锌升级后免费解锁`
            },
            cost() { return new ExpantaNum(0) },
            unlocked() { return hasUpgrade(zinc, 15) },
        },
        24: {
            title: "红砖",
            fullDisplay() {
                return `<h3>${this.title}</h3><br>解锁红砖的熔炼配方<br><br>获得第2石头里程碑后免费解锁`
            },
            cost() { return new ExpantaNum(0) },
            unlocked() { return hasMilestone(stone, 1) },
        },
        25: {
            title: "高炉砖",
            description: "解锁高炉砖的熔炼配方，并且解锁新的制造层级：高炉",
            currencyInternalName: "clay",
            currencyDisplayName: "粘土球",
            currencyLayer: stone,
            cost() { return new ExpantaNum(22500) },
            unlocked() { return hasMilestone(stone, 1) },
        },
        31: {
            title: "银锭",
            fullDisplay() {
                return `<h3>${this.title}</h3><br>解锁银锭的熔炼配方<br><br>购买第5个银升级后免费解锁`
            },
            cost() { return new ExpantaNum(0) },
            unlocked() { return hasUpgrade(silver, 15) },
        },
    },

    milestones: {
        0: {
            requirementDescription() { return `获得2熔炉` },
            effectDescription() { return `合成熔炉和合成台什么都不重置（除了经验，等级绑定经验）<br>重置过于繁琐，如果未来层级重置合成工具那会血压爆炸` },
            done() { return player.furnace.points.gte(2) },
            unlocked() { return true },
        },
        1: {
            requirementDescription() { return `获得320红砖` },
            effectDescription() { return `10x应力获取` },
            done() { return player.furnace.brick.gte(320) },
            unlocked() { return hasUpgrade(furnace, 24) },
        },
    },

    clickables: {
        0: {
            temperature: d(20),
            style() {
                return {
                    'background-color': 'rgba(0,0,0,0)',
                }
            },
            result(diff) { return undefined },
        },
        11: {
            title() {
                let t = "铜锭"
                return t
            },
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
            result(diff) {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                    return player.copper.points = player.copper.points.add(this.mult().min(player.copper.ore)),
                        player.copper.ore = player.copper.ore.sub(this.mult().min(player.copper.ore)),
                        player.furnace.temperature = d(20)
                if (player.copper.ore.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() { return player.copper.ore.gte(1) && player.furnace.burning && !player.furnace.smelting },
            onClick() {
                player.furnace.smelting = true,
                    player.furnace.smeltingItem = this.id
            },
            unlocked() { return tmp.furnace.layerShown },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                    'background-color': '#ffb41d',
                }
            },
        },
        12: {
            title() {
                let t = "玻璃"
                return t
            },
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
            result(diff) {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                    return player.furnace.glass = player.furnace.glass.add(this.mult().min(player.stone.sand)),
                        player.stone.sand = player.stone.sand.sub(this.mult().min(player.stone.sand)),
                        player.furnace.temperature = d(20)
                if (player.stone.sand.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() { return player.stone.sand.gte(1) && player.furnace.burning && !player.furnace.smelting },
            onClick() {
                player.furnace.smelting = true,
                    player.furnace.smeltingItem = this.id
            },
            unlocked() { return hasUpgrade(furnace, 11) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    'background-color': '#a2cfd6',
                }
            },
        },
        13: {
            title() {
                let t = "锡锭"
                return t
            },
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
            result(diff) {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                    return player.tin.points = player.tin.points.add(this.mult().min(player.tin.ore)),
                        player.tin.ore = player.tin.ore.sub(this.mult().min(player.tin.ore)),
                        player.furnace.temperature = d(20)
                if (player.tin.ore.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() { return player.tin.ore.gte(1) && player.furnace.burning && !player.furnace.smelting },
            onClick() {
                player.furnace.smelting = true,
                    player.furnace.smeltingItem = this.id
            },
            unlocked() { return hasUpgrade(furnace, 12) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "linear-gradient(45deg, #c4dce1 0%, #d3e4e4 100%)",
                    'background-color': '#c4dce1'
                }
            },
        },
        14: {
            title() {
                let t = "木炭"
                return t
            },
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
            result(diff) {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                    return player.furnace.charcoal = player.furnace.charcoal.add(this.mult().min(player.wood.points)),
                        player.wood.points = player.wood.points.sub(this.mult().min(player.wood.points)),
                        player.furnace.temperature = d(20)
                if (player.wood.points.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() { return player.wood.points.gte(1) && player.furnace.burning && !player.furnace.smelting },
            onClick() {
                player.furnace.smelting = true,
                    player.furnace.smeltingItem = this.id
            },
            unlocked() { return hasUpgrade(furnace, 13) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    'background-color': '#2b261d',
                    'color': 'white'
                }
            },
        },
        15: {
            title() {
                let t = "铁锭"
                return t
            },
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
            result(diff) {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                    return player.iron.points = player.iron.points.add(this.mult().min(player.iron.ore)),
                        player.iron.ore = player.iron.ore.sub(this.mult().min(player.iron.ore)),
                        player.furnace.temperature = d(20)
                if (player.iron.ore.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() { return player.iron.ore.gte(1) && player.furnace.burning && !player.furnace.smelting },
            onClick() {
                player.furnace.smelting = true,
                    player.furnace.smeltingItem = this.id
            },
            unlocked() { return hasUpgrade(furnace, 14) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                    'background-color': '#d8d8d8',
                }
            },
        },
        21: {
            title() {
                let t = "镍锭"
                return t
            },
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
                if (hasMilestone(nickel, 0)) m = player.nickel.ore.max(0).div(10)
                return m
            },
            result(diff) {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                    return player.nickel.points = player.nickel.points.add(this.mult().min(player.nickel.ore)),
                        player.nickel.ore = player.nickel.ore.sub(this.mult().min(player.nickel.ore)),
                        player.furnace.temperature = d(20)
                if (player.nickel.ore.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() { return player.nickel.ore.gte(1) && player.furnace.burning && !player.furnace.smelting },
            onClick() {
                player.furnace.smelting = true,
                    player.furnace.smeltingItem = this.id
            },
            unlocked() { return hasUpgrade(furnace, 15) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "linear-gradient(45deg, #fffcc0 0%, #f5f5d7 25%, #fffcc0 50%, #e3df94 75%, #8b8566 100%)",
                    'background-color': '#fffcc0',
                }
            },
        },
        22: {
            title() {
                let t = "铝锭"
                return t
            },
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
                if (hasCraftingItem(181)) m = m.times(25)
                if (hasUpgrade(lead, 21)) m = m.times(upgradeEffect(lead, 21))
                return m
            },
            result(diff) {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                    return player.aluminum.points = player.aluminum.points.add(this.mult().min(player.aluminum.ore)),
                        player.aluminum.ore = player.aluminum.ore.sub(this.mult().min(player.aluminum.ore)),
                        player.furnace.temperature = d(20)
                if (player.aluminum.ore.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() { return player.aluminum.ore.gte(1) && player.furnace.burning && !player.furnace.smelting },
            onClick() {
                player.furnace.smelting = true,
                    player.furnace.smeltingItem = this.id
            },
            unlocked() { return hasUpgrade(furnace, 21) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "linear-gradient(45deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)",
                    'background-color': '#e2e3ee',
                }
            },
        },
        23: {
            title() {
                let t = "铅锭"
                return t
            },
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
                if (hasUpgrade(lead, 22)) m = m.times(upgradeEffect(lead, 14))
                if (hasUpgrade(constantan, 12)) m = m.times(upgradeEffect(constantan, 12))
                return m
            },
            result(diff) {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                    return player.lead.points = player.lead.points.add(this.mult().min(player.lead.ore)),
                        player.lead.ore = player.lead.ore.sub(this.mult().min(player.lead.ore)),
                        player.furnace.temperature = d(20)
                if (player.lead.ore.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() { return player.lead.ore.gte(1) && player.furnace.burning && !player.furnace.smelting },
            onClick() {
                player.furnace.smelting = true,
                    player.furnace.smeltingItem = this.id
            },
            unlocked() { return hasUpgrade(furnace, 22) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "linear-gradient(45deg, #667397 0%, #acc0ff 20%, #97a9e0 50%, #6a7392 80%, #333848 100%)",
                    'background-color': '#97a9e0',
                }
            },
        },
        24: {
            title() {
                let t = "锌锭"
                return t
            },
            display() {
                let d = `
                需要工具：1熔炉<br>
                需要材料：1锌矿石<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：1锌锭<br>
                倍率：${formatWhole(this.mult())}x`
                return d
            },
            temperature: d(3520),
            mult() {
                let m = d(1)
                if (hasCraftingItem(272)) m = m.times(100)
                if (hasMilestone(brass, 0)) m = m.times(10)
                if (hasUpgrade(brass, 23)) m = player.zinc.ore.div(10).max(1)
                return m
            },
            result(diff) {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                    return player.zinc.points = player.zinc.points.add(this.mult().min(player.zinc.ore)),
                        player.zinc.ore = player.zinc.ore.sub(this.mult().min(player.zinc.ore)),
                        player.furnace.temperature = d(20)
                if (player.zinc.ore.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() { return player.zinc.ore.gte(1) && player.furnace.burning && !player.furnace.smelting },
            onClick() {
                player.furnace.smelting = true,
                    player.furnace.smeltingItem = this.id
            },
            unlocked() { return hasUpgrade(furnace, 23) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "linear-gradient(45deg, #a3be9e 0%, #fcfcfc 10%, #b7e6bf 40%, #b7e6bf 60%, #d3fcd9 80%, #4f6c62 100%)",
                    'background-color': '#b7e6bf',
                }
            },
        },
        25: {
            title() {
                let t = "红砖"
                return t
            },
            display() {
                let d = `
                需要工具：1熔炉<br>
                需要材料：1粘土球<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：1红砖<br>
                倍率：${formatWhole(this.mult())}x`
                return d
            },
            temperature: d(880),
            mult() {
                let m = d(1)
                return m
            },
            result(diff) {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                    return player.furnace.brick = player.furnace.brick.add(this.mult().min(player.stone.clay)),
                        player.stone.clay = player.stone.clay.sub(this.mult().min(player.stone.clay)),
                        player.furnace.temperature = d(20)
                if (player.stone.clay.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() { return player.stone.clay.gte(1) && player.furnace.burning && !player.furnace.smelting },
            onClick() {
                player.furnace.smelting = true,
                    player.furnace.smeltingItem = this.id
            },
            unlocked() { return hasUpgrade(furnace, 24) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "repeating-linear-gradient(to bottom, #c2664f 0%, #c2664f 3.125%, #bc6955 3.125%, #bc6955 6.25%, #7a4435 6.25%, #7a4435 9.375%, #886c65 9.375%, #886c65 12.5%, #c2664f 12.5%)",
                    'background-color': '#c2664f',
                }
            },
        },
        31: {
            title() {
                let t = "高炉砖"
                return t
            },
            display() {
                let d = `
                需要工具：1熔炉<br>
                需要材料：1红砖 + 1石头<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：1高炉砖<br>
                倍率：${formatWhole(this.mult())}x`
                return d
            },
            temperature: d(930),
            mult() {
                let m = d(1)
                return m
            },
            result(diff) {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                    return player.furnace.scorched_brick = player.furnace.scorched_brick.add(this.mult().min(player.furnace.brick).min(player.stone.points)),
                        player.furnace.brick = player.furnace.brick.sub(this.mult().min(player.furnace.brick).min(player.stone.points)),
                        player.stone.points = player.stone.points.sub(this.mult().min(player.furnace.brick).min(player.stone.points)),
                        player.furnace.temperature = d(20)
                if ((player.furnace.brick.lt(1) || player.stone.points.lt(1)) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() { return player.furnace.brick.gte(1) && player.stone.points.gte(1) && player.furnace.burning && !player.furnace.smelting },
            onClick() {
                player.furnace.smelting = true,
                    player.furnace.smeltingItem = this.id
            },
            unlocked() { return hasUpgrade(furnace, 25) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    'background-color': '#3a2f18',
                    'color': 'white',
                }
            },
        },
        31: {
            title() {
                let t = "银锭"
                return t
            },
            display() {
                let d = `
                需要工具：1熔炉<br>
                需要材料：1银矿石<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：1银锭<br>
                倍率：${formatWhole(this.mult())}x`
                return d
            },
            temperature: d(3700),
            mult() {
                let m = d(1)
                if (hasUpgrade(silver, 22)) m = m.times(5)
                if (hasUpgrade(silver, 24)) m = m.times(upgradeEffect(silver, 24))
                if (hasUpgrade(silver, 32)) m = m.times(124.1)
                return m
            },
            result(diff) {
                if (player.furnace.temperature.gte(smeltingItemTemp(smeltingItemID())) && isSmeltingItem() && smeltingItemID() == this.id)
                    return player.silver.points = player.silver.points.add(this.mult().min(player.silver.ore)),
                        player.silver.ore = player.silver.ore.sub(this.mult().min(player.silver.ore)),
                        player.furnace.temperature = d(20)
                if (player.silver.ore.lt(1) && smeltingItemID() == this.id) stopSmelting()
            },
            canClick() { return player.silver.ore.gte(1) && player.furnace.burning && !player.furnace.smelting },
            onClick() {
                player.furnace.smelting = true,
                    player.furnace.smeltingItem = this.id
            },
            unlocked() { return hasUpgrade(furnace, 31) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "linear-gradient(45deg, #65696b 0%, #bbc7ce 20%, #ddf2f5 40%, #9cc1ca 70%, #5ca0a6 100%)",
                    'background-color': '#ddf2f5',
                }
            },
        },
        //燃料
        10000: {
            temperature: d(20),
            burnSpeed: d(0),
            correspondingFuel() { return player.points },
        },
        10001: {
            title() {
                let t = "木头"
                return t
            },
            display() {
                let d = `
                消耗速度：${formatWhole(this.burnSpeed)}/秒<br>
                温度上限：${formatWhole(this.temperature)}<br>`
                return d
            },
            burnSpeed: d(100),
            temperature: d(1000),
            correspondingFuel() { return player.wood.points },
            canClick() { return player.wood.points.gte(100) && player.furnace.points.gte(1) && !player.furnace.burning },
            onClick() {
                player.furnace.burning = true,
                    player.furnace.fuel = this.id
            },
            unlocked() { return tmp.furnace.layerShown },
            style() {
                return {
                    'min-height': '120px',
                    'width': '120px',
                    'background-color': '#b8945e',
                }
            },
        },
        10002: {
            title() {
                let t = "煤炭"
                return t
            },
            display() {
                let d = `
                消耗速度：${formatWhole(this.burnSpeed)}/秒<br>
                温度上限：${formatWhole(this.temperature)}<br>`
                return d
            },
            burnSpeed: d(50),
            temperature: d(1800),
            correspondingFuel() { return player.stone.coal },
            canClick() { return player.stone.coal.gte(50) && player.furnace.points.gte(1) && !player.furnace.burning },
            onClick() {
                player.furnace.burning = true,
                    player.furnace.fuel = this.id
            },
            unlocked() { return hasUpgrade(stone, 35) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '120px',
                    'background-color': '#2e2e2e',
                    'color': '#ffffff',
                }
            },
        },
        10003: {
            title() {
                let t = "木炭"
                return t
            },
            display() {
                let d = `
                消耗速度：${formatWhole(this.burnSpeed)}/秒<br>
                温度上限：${formatWhole(this.temperature)}<br>`
                return d
            },
            burnSpeed: d(50),
            temperature: d(2100),
            correspondingFuel() { return player.furnace.charcoal },
            canClick() { return player.furnace.charcoal.gte(50) && player.furnace.points.gte(1) && !player.furnace.burning },
            onClick() {
                player.furnace.burning = true,
                    player.furnace.fuel = this.id
            },
            unlocked() { return hasUpgrade(furnace, 13) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '120px',
                    'background-color': '#2b261d',
                    'color': '#ffffff',
                }
            },
        },
        10004: {
            title() {
                let t = "熔岩"
                return t
            },
            display() {
                let d = `
                消耗速度：${formatWhole(this.burnSpeed)}mB/秒<br>
                冷却消耗：${fw(5000)}mB水/秒<br>
                温度上限：${formatWhole(this.temperature)}`
                return d
            },
            burnSpeed: d(500),
            temperature: d(3200),
            correspondingFuel() { return player.iron.lava },
            canClick() { return player.iron.lava.gte(500) && player.iron.water.gte(5000) && player.furnace.points.gte(1) && !player.furnace.burning },
            onClick() {
                player.furnace.burning = true,
                    player.furnace.fuel = this.id
            },
            unlocked() { return hasUpgrade(nickel, 14) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '120px',
                    'background-color': '#d76013',
                }
            },
        },
        10005: {
            title() {
                let t = "熔岩炉-RF"
                return t
            },
            display() {
                let d = `
                消耗速度：${formatWhole(this.burnSpeed)}RF/秒<br>
                冷却消耗：${fw(50000)}mB水/秒<br>
                温度上限：${formatWhole(this.temperature)}`
                return d
            },
            burnSpeed: d(1024000),
            temperature: d(5040),
            correspondingFuel() { return player.rf.points },
            canClick() { return player.rf.points.gte(51200) && player.iron.water.gte(50000) && player.furnace.points.gte(1) && !player.furnace.burning },
            onClick() {
                player.furnace.burning = true,
                    player.furnace.fuel = this.id
            },
            unlocked() { return player[ct].items[242].gte(5) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '120px',
                    'background-color': '#d8d8d8',
                }
            },
        },
        20001: {
            display() {
                let d = `取消熔炼`
                return d
            },
            canClick() { return isSmeltingItem() },
            onClick() {
                stopSmelting()
            },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
                }
            },
        },
        20011: {
            display() {
                let d = `取出燃料`
                return d
            },
            canClick() { return isBurningFuel() },
            onClick() {
                stopSmelting(),
                    stopBurning(),
                    stopAlloying()
            },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
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
            unlocked() { return tmp.furnace.layerShown },
            fillStyle() { return { "background-color": smeltingItemColor(smeltingItemID()) } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
        },
    },

    update(diff) {
        if (isSmeltingItem() && player.furnace.temperature.lt(fuelMaxTemp(fuelID()).sub(player.furnace.speed.div(tick)))) player.furnace.temperature = player.furnace.temperature.add(player.furnace.speed.div(tick))
        if (player.furnace.temperature.gte(fuelMaxTemp(fuelID()).sub(player.furnace.speed.div(tick)))) player.furnace.temperature = fuelMaxTemp(fuelID())

        if (!hasEnoughFuel(fuelID())) stopSmelting(), stopBurning(), stopAlloying()

        //熔炼速度
        let speed = d(40)
        if (hasCraftingItem(52)) speed = speed.times(10)
        if (hasUpgrade(iron, 21)) speed = speed.times(3)
        if (hasUpgrade(aluminum, 22)) speed = speed.times(1.5)
        if (hasCraftingItem(241)) speed = speed.times(1.8)
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
        ["display-text", function () { return getPointsDisplay() }],
        "main-display",
        ["row", ["prestige-button", "blank", ["display-text", () => `你同时最多拥有 ${formatWhole(player.furnace.best)} 熔炉<br><br>合成有1秒冷却：${format(player.furnace.cooldown)}/1.00`]]],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "smelt": {
                unlocked() { return tmp.furnace.layerShown },
                name() { return '熔炼' },
                content: [
                    ["blank", "15px"],
                    "blank",
                    ["display-text", function () {
                        let d = `你正在熔炼 ${smeltingItemName(smeltingItemID())}`
                        if (!isSmeltingItem()) d = `你当前不在熔炼`
                        return d
                    }],
                    "blank",
                    ["row", [["bar", "smelt"], ["clickables", [2000]]]],
                    "blank",
                    ["clickables", function () { return [1, 2, 3] }],
                    ["display-text", function () { return `熔炼（升温）速度：${format(player.furnace.speed)}/秒` }],
                    "blank",
                    ["display-text", function () { return `一般情况下，熔炼时只会消耗材料，不会消耗工具` }],
                    ["display-text", function () { return `而特殊情况下会进行额外标注` }],
                    ["display-text", function () { return `熔炼完成会自动开始下一次熔炼，直到材料用完` }],
                    ["display-text", function () { return `你需要消耗燃料才能开始熔炼，请注意对应燃料的温度上限，如果温度上限不足以熔炼对应材料是无法完成熔炼的` }],
                    ["display-text", function () { return `熔炼倍率如果过大以至于材料不足会一次性消耗所有材料，直到不足以熔炼1份的量` }],
                ]
            },
            "fuel": {
                unlocked() { return tmp.furnace.layerShown },
                name() { return '燃料' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () {
                        let d = `当前正在消耗 ${fuelName(fuelID())} 作为燃料`
                        if (!isBurningFuel()) d = `当前不在消耗燃料`
                        return d
                    }],
                    "blank",
                    ["clickables", [2001]],
                    "blank",
                    ["clickables", function () { return [1000, 1001] }],
                    ["display-text", function () { return `熔炼（升温）速度：${format(player.furnace.speed)}/秒` }],
                    "blank",
                    ["display-text", function () { return `只有正在熔炼时才会提升温度` }],
                    ["display-text", function () { return `你必须放入至少能支持消耗1秒的燃料` }],
                    ["display-text", function () { return `如果不手动取出燃料将会一直消耗直到只剩下1秒的消耗量为止` }],
                ]
            },
            "milestones": {
                unlocked() { return tmp.furnace.layerShown },
                name() { return '里程碑' },
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
            "recipe": {
                unlocked() { return hasUpgrade(stone, 33) },
                name() { return '配方' },
                content: [
                    ["blank", "15px"],
                    ["display-text", function () { if (hasUpgrade(furnace, 11)) return `你有 ${textStyle_h2(formatWhole(player.furnace.glass), 'a2cfd6')} 玻璃` }],
                    ["display-text", function () { if (hasUpgrade(furnace, 13)) return `你有 ${textStyle_h2(formatWhole(player.furnace.charcoal), '2b261d', 'ffffff')} 木炭` }],
                    ["display-text", function () { if (hasUpgrade(furnace, 24)) return `你有 ${textStyle_h2(formatWhole(player.furnace.brick), 'c2664f')} 红砖` }],
                    ["display-text", function () { if (hasUpgrade(furnace, 25)) return `你有 ${textStyle_h2(formatWhole(player.furnace.scorched_brick), '3a2f18')} 高炉砖` }],
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
    componentStyles: {
        "clickable"() {
            return {
                'margin-left': '-7px',
                'margin-right': '-7px',
            }
        }
    },
    name: "alloy_s",
    position: 1004,
    row: 101,
    symbol: '合金炉', // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
            cooldown: d(0),
            speed: d(40),
            alloying: false,
            alloyingItem: 0, //0为凑数id
            temperature: d(20),
            page: 1,
            maxPage: 1,
        }
    },
    color: "#40464d",
    type: "normal",
    layerType: "craft",
    resource: "合金炉",
    baseResource() { return "锡锭" },
    baseAmount() { return player.tin.points },
    exponent: 0.3,
    requires: d(30),
    tooltip() { return false },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        m = d(1)
        if (hasUpgrade(constantan, 41)) m = m.times(1e20)
        return m
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        e = d(1)
        return e
    },
    resetDescription: "合成获得 ",
    layerShown() { return hasNormalAchievement(36) },// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.

    onPrestige() {
        return player.alloy_s.cooldown = d(1)
    },

    canReset() {
        return player.alloy_s.cooldown.lte(0) && player.tin.points.gte(30)
    },

    doReset(resettingLayer) {
        return undefined
    },

    passiveGeneration() { return hasUpgrade(constantan, 14) },

    upgrades: {
        11: {
            title: "青铜",
            description: "解锁青铜锭的合金配方及其层级页面",
            cost() { return new ExpantaNum(1) },
            unlocked() { return tmp.alloy_s.layerShown },
        },
        12: {
            title: "康铜",
            description: "需求：等级664<br>解锁康铜锭的合金配方",
            canAfford() { return player.level.gte(664) },
            cost() { return new ExpantaNum(1e213) },
            unlocked() { return hasUpgrade(lead, 31) },
        },
        13: {
            title: "殷钢",
            description: "需求：等级1,553<br>解锁殷钢锭的合金配方",
            canAfford() { return player.level.gte(1553) },
            cost() { return new ExpantaNum('1e520') },
            unlocked() { return hasUpgrade(lead, 31) },
        },
        14: {
            title: "铝黄铜",
            description: "需求：等级4,040<br>解锁铝黄铜锭的合金配方",
            canAfford() { return player.level.gte(4040) },
            cost() { return new ExpantaNum('1e820') },
            unlocked() { return hasNormalAchievement(92) },
        },
        15: {
            title: "黄铜",
            description: "需求：等级7,985<br>解锁黄铜锭的合金配方",
            canAfford() { return player.level.gte(7985) },
            cost() { return new ExpantaNum('1e2131') },
            unlocked() { return hasNormalAchievement(97) },
        },
    },

    clickables: {
        0: {
            temperature: d(20),
            style() {
                return {
                    'background-color': 'rgba(0, 0, 0, 0)',
                }
            },
            result(diff) { return undefined },
        },
        11: {
            title() {
                let t = "青铜锭"
                return t
            },
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
            result(diff) {
                if (player.alloy_s.temperature.gte(alloyingItemTemp(alloyingItemID())) && isAlloyingItem() && alloyingItemID() == this.id)
                    player.bronze.points = player.bronze.points.add(this.mult().min(player.tin.points.times(4)).times(4)),
                        player.copper.points = player.copper.points.sub(this.mult().times(3).min(player.copper.ore)),
                        player.tin.points = player.tin.points.sub(this.mult().min(player.copper.ore)),
                        player.alloy_s.temperature = d(20)
                if ((player.copper.points.lt(d(3).times(this.mult())) || player.tin.points.lt(d(1).times(this.mult()))) && alloyingItemID() == this.id) stopAlloying()
            },
            canClick() { return player.copper.points.gte(3) && player.tin.points.gte(1) && player.furnace.burning && !player.alloy_s.alloying },
            onClick() {
                player.alloy_s.alloying = true,
                    player.alloy_s.alloyingItem = this.id
            },
            unlocked() { return hasUpgrade(alloy_s, 11) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
                    'background-color': '#ffd7a1',
                }
            },
        },
        12: {
            title() {
                let t = "康铜锭"
                return t
            },
            display() {
                let d = `
                需要工具：1合金炉<br>
                需要材料：1铜锭 + 1镍锭<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：2康铜锭<br>
                倍率：${formatWhole(this.mult())}x`
                return d
            },
            temperature: d(2940),
            mult() {
                let m = d(1)
                if (hasUpgrade(constantan, 11)) m = m.times(3)
                if (hasUpgrade(constantan, 13)) m = m.times(10)
                if (hasUpgrade(constantan, 22)) m = m.times(upgradeEffect(constantan, 22))
                if (hasUpgrade(invar, 12)) m = player.copper.points.min(player.nickel.points).max(1).pow(0.5).floor()
                return m
            },
            result(diff) {
                if (player.alloy_s.temperature.gte(alloyingItemTemp(alloyingItemID())) && isAlloyingItem() && alloyingItemID() == this.id)
                    player.constantan.points = player.constantan.points.add(this.mult().min(player.nickel.points.min(player.copper.points)).times(2)),
                        player.copper.points = player.copper.points.sub(this.mult().min(player.copper.ore)),
                        player.nickel.points = player.nickel.points.sub(this.mult().min(player.nickel.ore)),
                        player.alloy_s.temperature = d(20)
                if ((player.nickel.points.lt(this.mult()) || player.copper.points.lt(this.mult())) && alloyingItemID() == this.id) stopAlloying()
            },
            canClick() { return player.copper.points.gte(1) && player.nickel.points.gte(1) && player.furnace.burning && !player.alloy_s.alloying },
            onClick() {
                player.alloy_s.alloying = true,
                    player.alloy_s.alloyingItem = this.id
            },
            unlocked() { return hasUpgrade(alloy_s, 12) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "linear-gradient(45deg, #d39f49 0%, #ffd37c 30%, #eeba4f 80%, #7d6233 100%)", 'background-color': '#ffd7a1',
                    'background-color': '#eeba4f',
                }
            },
        },
        13: {
            title() {
                let t = "殷钢锭"
                return t
            },
            display() {
                let d = `
                需要工具：1合金炉<br>
                需要材料：1铁锭 + 1镍锭<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：2殷钢锭<br>
                倍率：${formatWhole(this.mult())}x`
                return d
            },
            temperature: d(3180),
            mult() {
                let m = d(1)
                if (hasUpgrade(invar, 11)) m = m.times(5)
                if (hasUpgrade(invar, 23)) m = m.times(10)
                if (hasUpgrade(invar, 32)) m = m.times(upgradeEffect(invar, 32))
                if (hasUpgrade(alumbrass, 24)) m = player.iron.points.min(player.nickel.points).max(1).pow(upgradeEffect(alumbrass, 24)).floor()
                return m
            },
            result(diff) {
                if (player.alloy_s.temperature.gte(alloyingItemTemp(alloyingItemID())) && isAlloyingItem() && alloyingItemID() == this.id)
                    player.invar.points = player.invar.points.add(this.mult().min(player.nickel.points.min(player.iron.points)).times(2)),
                        player.iron.points = player.iron.points.sub(this.mult().min(player.iron.ore)),
                        player.nickel.points = player.nickel.points.sub(this.mult().min(player.nickel.ore)),
                        player.alloy_s.temperature = d(20)
                if ((player.nickel.points.lt(this.mult()) || player.copper.points.lt(this.mult())) && alloyingItemID() == this.id) stopAlloying()
            },
            canClick() { return player.iron.points.gte(1) && player.nickel.points.gte(1) && player.furnace.burning && !player.alloy_s.alloying },
            onClick() {
                player.alloy_s.alloying = true,
                    player.alloy_s.alloyingItem = this.id
            },
            unlocked() { return hasUpgrade(alloy_s, 13) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "linear-gradient(45deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                    'background-color': '#95a7a1',
                }
            },
        },
        14: {
            title() {
                let t = "铝黄铜锭"
                return t
            },
            display() {
                let d = `
                需要工具：1合金炉<br>
                需要材料：3铜锭 + 1铝锭<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：4铝黄铜锭<br>
                倍率：${formatWhole(this.mult())}x`
                return d
            },
            temperature: d(3300),
            mult() {
                let m = d(1)
                if (hasUpgrade(alumbrass, 11)) m = m.times(3)
                if (hasUpgrade(alumbrass, 14)) m = m.times(upgradeEffect(alumbrass, 14))
                if (player.alumbrass.cast.ingot) m = m.times(10)
                if (player.alumbrass.cast.nugget) m = m.times(25)
                if (hasUpgrade(alumbrass, 23)) m = m.times(10)
                if (hasUpgrade(zinc, 22)) m = m.times(upgradeEffect(zinc, 22))
                if (hasUpgrade(brass, 12)) m = m.times(upgradeEffect(brass, 12))
                return m
            },
            result(diff) {
                if (player.alloy_s.temperature.gte(alloyingItemTemp(alloyingItemID())) && isAlloyingItem() && alloyingItemID() == this.id)
                    player.alumbrass.points = player.alumbrass.points.add(this.mult().min(player.aluminum.points.times(4)).times(4)),
                        player.copper.points = player.copper.points.sub(this.mult().times(3).min(player.copper.ore)),
                        player.aluminum.points = player.aluminum.points.sub(this.mult().min(player.copper.ore)),
                        player.alloy_s.temperature = d(20)
                if ((player.copper.points.lt(d(3).times(this.mult())) || player.aluminum.points.lt(d(1).times(this.mult()))) && alloyingItemID() == this.id) stopAlloying()
            },
            canClick() { return player.copper.points.gte(3) && player.aluminum.points.gte(1) && player.furnace.burning && !player.alloy_s.alloying },
            onClick() {
                player.alloy_s.alloying = true,
                    player.alloy_s.alloyingItem = this.id
            },
            unlocked() { return hasUpgrade(alloy_s, 14) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "linear-gradient(45deg, #e6c34b 0%, #f0d467 30%, #e6c34b 75%, #ab7d1b 100%)",
                    'background-color': '#f0d467',
                }
            },
        },
        15: {
            title() {
                let t = "黄铜锭"
                return t
            },
            display() {
                let d = `
                需要工具：1合金炉<br>
                需要材料：1铜锭 + 1锌锭<br>
                需求温度：${formatWhole(this.temperature)}<br>
                产出：2黄铜锭<br>
                倍率：${formatWhole(this.mult())}x`
                return d
            },
            temperature: d(3702),
            mult() {
                let m = d(1)
                if (hasNormalAchievement(102)) m = m.times(5)
                if (hasUpgrade(brass, 22)) m = player.zinc.points.max(1).pow(0.6).floor()
                return m
            },
            result(diff) {
                if (player.alloy_s.temperature.gte(alloyingItemTemp(alloyingItemID())) && isAlloyingItem() && alloyingItemID() == this.id)
                    player.brass.points = player.brass.points.add(this.mult().min(player.zinc.points.min(player.copper.points)).times(2)),
                        player.copper.points = player.copper.points.sub(this.mult().min(player.copper.ore)),
                        player.zinc.points = player.zinc.points.sub(this.mult().min(player.zinc.ore)),
                        player.alloy_s.temperature = d(20)
                if ((player.zinc.points.lt(this.mult()) || player.copper.points.lt(this.mult())) && alloyingItemID() == this.id) stopAlloying()
            },
            canClick() { return player.zinc.points.gte(1) && player.copper.points.gte(1) && player.furnace.burning && !player.alloy_s.alloying },
            onClick() {
                player.alloy_s.alloying = true,
                    player.alloy_s.alloyingItem = this.id
            },
            unlocked() { return hasUpgrade(alloy_s, 15) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "linear-gradient(45deg, #fce892 0%, #fce892 30%,  #f8ac67 60%, #f8ac67 80%, #75452c 100%)",
                    'background-color': '#f8ac67',
                }
            },
        },
        20001: {
            display() {
                let d = `取消合金`
                return d
            },
            canClick() { return isAlloyingItem() },
            onClick() {
                stopAlloying()
            },
            style() {
                return {
                    'min-height': '50px',
                    'width': '120px',
                    'font-size': '20px'
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
            unlocked() { return tmp.alloy_s.layerShown },
            fillStyle() { return { "background-color": alloyingItemColor(alloyingItemID()) } },
            baseStyle() { return { "background-color": "rgba(0,0,0,0)" } },
        },
    },

    update(diff) {
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
        ["display-text", function () { return getPointsDisplay() }],
        "main-display",
        ["row", ["prestige-button", "blank", ["display-text", () => `你同时最多拥有 ${formatWhole(player.alloy_s.best)} 合金炉<br><br>合成有1秒冷却：${format(player.alloy_s.cooldown)}/1.00`]]],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "smelt": {
                unlocked() { return tmp.alloy_s.layerShown },
                name() { return '合金' },
                content: [
                    ["blank", "15px"],
                    "blank",
                    ["display-text", function () {
                        let d = `你正在合金 ${alloyingItemName(alloyingItemID())}`
                        if (!isAlloyingItem()) d = `你当前不在合金`
                        return d
                    }],
                    "blank",
                    ["row", [["bar", "alloy"], ["clickables", [2000]]]],
                    "blank",
                    ["clickables", function () { return [1, 2] }],
                    ["display-text", function () { return `合金（升温）速度：${format(player.furnace.speed)}/秒 （和熔炼页面一致）` }],
                    "blank",
                    ["display-text", function () { return `合金完成会自动开始下一次合金，直到材料用完` }],
                    ["display-text", function () { return `你需要消耗燃料才能开始合金，请注意对应燃料的温度上限，如果温度上限不足以熔炼对应材料是无法完成合金的` }],]
            },
            "milestones": {
                unlocked() { return tmp.alloy_s.layerShown },
                name() { return '里程碑' },
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
            "recipe": {
                unlocked() { return tmp.alloy_s.layerShown },
                name() { return '配方' },
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ],
            },
        },
    },
})

//制造层4：奇点凝聚器
addLayer("sing_fus", {
    name: "sing_fus",
    position: 1005,
    row: 101,
    symbol: '奇点凝聚器', // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
            cooldown: d(0),
            speed: d(40),
            alloying: false,
            alloyingItem: 0, //0为凑数id
            temperature: d(20),
            page: 1,
            maxPage: 1,
        }
    },
    color: "#438e8b",
    type: "none",
    layerType: "craft",
    resource: "奇点凝聚器",
    baseResource() { return "锡锭" },
    baseAmount() { return player.tin.points },
    exponent: 0.3,
    requires: d(30),
    tooltip() { return false },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        m = d(1)
        return m
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        e = d(1)
        return e
    },
    layerShown() { return hasNormalAchievement(73) },// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.

    doReset(resettingLayer) {
        return undefined
    },

    buyables: {
        11: {
            title: "聚合奇点-铜",
            cost(x) { return d('1e800').pow(x.max(0).pow(3)).times('1e800') },
            display() {
                let display = `加成铜矿石获取<br>
                效果公式：${format(this.effBase())}<sup>x</sup><br>
                凝聚需求量：${format(this.cost())} 铜锭`
                return display
            },
            canAfford() { return player.copper.points.gte(this.cost()) },
            buyMax() {
                if (this.canAfford())
                    return setBuyableAmount(sing_fus, 11, player.copper.points.div('1e800').max(1).logBase('1e800').root(3).floor().add(1))
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player.copper.points = player.copper.points.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effBase() {
                let b = d(1e50)
                if (hasCraftingItem(192)) b = b.pow(2.5)
                return b
            },
            effect(x) {
                let effect = ExpantaNum.pow(this.effBase(), x.max(0))
                return effect
            },
            unlocked() { return tmp.sing_fus.layerShown },
            canAuto() { return hasMilestone(sing_fus, 2) },
            auto() {
                if (this.canAuto())
                    this.buyMax()

                player.copper.singularity = getBuyableAmount(this.layer, this.id)
            },
            style() {
                s = {
                    'height': '120px',
                    'box-shadow': '0 0 20px #ffb41d',
                }
                if (this.canAfford())
                    s = {
                        'height': '120px',
                        "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                        'box-shadow': '0 0 20px #ffb41d',
                    }
                return s
            }
        },
        12: {
            title: "聚合奇点-锡",
            cost(x) { return d('1e1200').pow(x.max(0).pow(3.1)).times('1e1200') },
            display() {
                let display = `加成锡矿石获取<br>
                效果公式：${format(this.effBase())}<sup>x</sup><br>
                凝聚需求量：${format(this.cost())} 锡锭`
                return display
            },
            canAfford() { return player.tin.points.gte(this.cost()) },
            buyMax() {
                if (this.canAfford())
                    return setBuyableAmount(sing_fus, 12, player.tin.points.div('1e1200').max(1).logBase('1e1200').root(3.1).floor().add(1))
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player.tin.points = player.tin.points.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effBase() {
                let b = d(1e108)
                return b
            },
            effect(x) {
                let effect = ExpantaNum.pow(this.effBase(), x.max(0))
                return effect
            },
            unlocked() { return hasMilestone(sing_fus, 1) },
            canAuto() { return hasMilestone(sing_fus, 3) },
            auto() {
                if (this.canAuto())
                    this.buyMax()

                player.tin.singularity = getBuyableAmount(this.layer, this.id)
            },
            style() {
                s = {
                    'height': '120px',
                    'box-shadow': '0 0 20px #c4dce1',
                }
                if (this.canAfford())
                    s = {
                        'height': '120px',
                        "background": "linear-gradient(45deg, #c4dce1 0%, #d3e4e4 100%)",
                        'box-shadow': '0 0 20px #c4dce1',
                    }
                return s
            }
        },
        13: {
            title: "聚合奇点-铁",
            cost(x) { return d('1e1111').pow(x.max(0).pow(3.25)).times('1e1111') },
            display() {
                let display = `加成铁矿石获取<br>
                效果公式：${format(this.effBase())}<sup>x</sup><br>
                凝聚需求量：${format(this.cost())} 铁锭`
                return display
            },
            canAfford() { return player.iron.points.gte(this.cost()) },
            buyMax() {
                if (this.canAfford())
                    return setBuyableAmount(sing_fus, 13, player.iron.points.div('1e1111').max(1).logBase('1e1111').root(3.25).floor().add(1))
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player.iron.points = player.iron.points.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effBase() {
                let b = d(1e125)
                return b
            },
            effect(x) {
                let effect = ExpantaNum.pow(this.effBase(), x.max(0))
                return effect
            },
            unlocked() { return hasMilestone(sing_fus, 2) },
            canAuto() { return hasMilestone(sing_fus, 4) },
            auto() {
                if (this.canAuto())
                    this.buyMax()

                player.iron.singularity = getBuyableAmount(this.layer, this.id)
            },
            style() {
                s = {
                    'height': '120px',
                    'box-shadow': '0 0 20px #d8d8d8',
                }
                if (this.canAfford())
                    s = {
                        'height': '120px',
                        "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                        'box-shadow': '0 0 20px #d8d8d8',
                    }
                return s
            }
        },
        14: {
            title: "聚合奇点-镍",
            cost(x) { return d('3e3000').pow(x.max(0).pow(3.25)).times('3e3000') },
            display() {
                let display = `加成镍矿石获取<br>
                效果公式：${format(this.effBase())}<sup>x</sup><br>
                凝聚需求量：${format(this.cost())} 镍锭`
                return display
            },
            canAfford() { return player.nickel.points.gte(this.cost()) },
            buyMax() {
                if (this.canAfford())
                    return setBuyableAmount(sing_fus, 14, player.nickel.points.div('3e3000').max(1).logBase('3e3000').root(3.25).floor().add(1))
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player.nickel.points = player.nickel.points.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effBase() {
                let b = d('1e400')
                return b
            },
            effect(x) {
                let effect = ExpantaNum.pow(this.effBase(), x.max(0))
                return effect
            },
            unlocked() { return hasMilestone(sing_fus, 3) },
            canAuto() { return hasMilestone(sing_fus, 5) },
            auto() {
                if (this.canAuto())
                    this.buyMax()

                player.nickel.singularity = getBuyableAmount(this.layer, this.id)
            },
            style() {
                s = {
                    'height': '120px',
                    'box-shadow': '0 0 20px #fffcc0',
                }
                if (this.canAfford())
                    s = {
                        'height': '120px',
                        "background": "linear-gradient(45deg, #fffcc0 0%, #f5f5d7 25%, #fffcc0 50%, #e3df94 75%, #8b8566 100%)",
                        'box-shadow': '0 0 20px #fffcc0',
                    }
                return s
            }
        },
        21: {
            title: "聚合奇点-铝",
            cost(x) { return d('3e6000').pow(x.max(0).pow(3.25)).times('3e6000') },
            display() {
                let display = `加成铝矿石获取<br>
                效果公式：${format(this.effBase())}<sup>x</sup><br>
                凝聚需求量：${format(this.cost())} 铝锭`
                return display
            },
            canAfford() { return player.aluminum.points.gte(this.cost()) },
            buyMax() {
                if (this.canAfford())
                    return setBuyableAmount(sing_fus, 21, player.aluminum.points.div('3e6000').max(1).logBase('3e6000').root(3.25).floor().add(1))
            },
            canBuyMax() { return false },
            buy() {
                if (!this.canBuyMax()) player.aluminum.points = player.aluminum.points.sub(this.cost()),
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                if (this.canBuyMax()) this.buyMax()
            },
            effBase() {
                let b = d('1e300')
                return b
            },
            effect(x) {
                let effect = ExpantaNum.pow(this.effBase(), x.max(0))
                return effect
            },
            unlocked() { return hasMilestone(sing_fus, 4) },
            canAuto() { return hasMilestone(sing_fus, 6) },
            auto() {
                if (this.canAuto())
                    this.buyMax()

                player.aluminum.singularity = getBuyableAmount(this.layer, this.id)
            },
            style() {
                s = {
                    'height': '120px',
                    'box-shadow': '0 0 20px #e2e3ee',
                }
                if (this.canAfford())
                    s = {
                        'height': '120px',
                        "background": "linear-gradient(45deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)",
                        'box-shadow': '0 0 20px #e2e3ee',
                    }
                return s
            }
        },
    },

    milestones: {
        0: {
            requirementDescription() { return `获得1铜奇点` },
            effectDescription() { return `自动凝聚石头奇点（虽然刚解锁这个还没什么用，第3石头奇点要1e10000多石头）` },
            done() { return singularity(copper).gte(1) },
            unlocked() { return tmp.sing_fus.layerShown },
        },
        1: {
            requirementDescription() { return `获得1.0000e900锡锭` },
            effectDescription() { return `解锁锡奇点，木头倍增器现在可以一键购买最大且不消耗` },
            done() { return player.tin.points.gte('1e900') },
            unlocked() { return tmp.sing_fus.layerShown },
        },
        2: {
            requirementDescription() { return `获得1.000e1,000铁锭` },
            effectDescription() { return `解锁铁奇点，自动购买铜奇点` },
            done() { return player.iron.points.gte('1e1000') },
            unlocked() { return tmp.iron.layerShown },
        },
        3: {
            requirementDescription() { return `获得1.000e3,000镍锭` },
            effectDescription() { return `解锁镍奇点，自动购买锡奇点` },
            done() { return player.nickel.points.gte('1e3000') },
            unlocked() { return tmp.nickel.layerShown },
        },
        4: {
            requirementDescription() { return `获得1.000e6,000铝锭` },
            effectDescription() { return `解锁铝奇点，自动购买铁奇点` },
            done() { return player.aluminum.points.gte('1e6000') },
            unlocked() { return tmp.aluminum.layerShown },
        },
        5: {
            requirementDescription() { return `获得1.000e12,000铅锭` },
            effectDescription() { return `解锁铅奇点，自动购买镍奇点` },
            done() { return player.lead.points.gte('1e12000') },
            unlocked() { return tmp.lead.layerShown },
        },
    },

    update(diff) {
        if (hasCraftingItem(172)) player.sing_fus.points = d(1)
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        "main-display",
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "singularity": {
                unlocked() { return tmp.sing_fus.layerShown },
                name() { return '奇点' },
                content: [
                    ["blank", "15px"],
                    "blank",
                    ["display-text", function () { if (hasNormalAchievement(63)) return `你有 ${textStyle_h2(fw(singularity(stone)), '4a4a4a')} 石头奇点，加成石头获取 ${textStyle_h2(f(buyableEffect(stone, 21)) + "x", '4a4a4a')}` }],
                    ["display-text", function () { if (hasNormalAchievement(73)) return `你有 ${textStyle_h2(fw(singularity(copper)), 'ffb41d')} 铜奇点，加成铜矿石获取 ${textStyle_h2(f(buyableEffect(sing_fus, 11)) + "x", 'ffb41d')}` }],
                    ["display-text", function () { if (hasMilestone(sing_fus, 1)) return `你有 ${textStyle_h2(fw(singularity(tin)), 'c4dce1')} 锡奇点，加成锡矿石获取 ${textStyle_h2(f(buyableEffect(sing_fus, 12)) + "x", 'c4dce1')}` }],
                    ["display-text", function () { if (hasMilestone(sing_fus, 2)) return `你有 ${textStyle_h2(fw(singularity(iron)), 'd8d8d8')} 铁奇点，加成铁矿石获取 ${textStyle_h2(f(buyableEffect(sing_fus, 13)) + "x", 'd8d8d8')}` }],
                    ["display-text", function () { if (hasMilestone(sing_fus, 3)) return `你有 ${textStyle_h2(fw(singularity(nickel)), 'fffcc0')} 镍奇点，加成镍矿石获取 ${textStyle_h2(f(buyableEffect(sing_fus, 14)) + "x", 'fffcc0')}` }],
                    ["display-text", function () { if (hasMilestone(sing_fus, 4)) return `你有 ${textStyle_h2(fw(singularity(aluminum)), 'e2e3ee')} 铝奇点，加成铝矿石获取 ${textStyle_h2(f(buyableEffect(sing_fus, 21)) + "x", 'e2e3ee')}` }],
                    "buyables",
                ],
            },
            "milestones": {
                unlocked() { return tmp.sing_fus.layerShown },
                name() { return '里程碑' },
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
            "recipe": {
                unlocked() { return tmp.sing_fus.layerShown },
                name() { return '配方' },
                content: [
                    ["blank", "15px"],
                    "upgrades",
                ],
            },
        },
    },
})

function BF_top_bottom_structure() {
    let scorched_block_position = [202, 203, 204, 302, 303, 304, 402, 403, 404, 1202, 1203, 1204, 1302, 1303, 1304, 1402, 1403, 1404]
    let b = 0
    for (i = 0; i < scorched_block_position.length; i++) {
        if (player.blast_furnace.grid[scorched_block_position[i]] == 'block') b += 1
    }
    return b >= 18
}

function BF_Y2_structure() {
    let Y2_center = [702, 703, 704, 802, 804, 902, 903, 904]
    let c = 0
    let d = 0
    for (i = 0; i < Y2_center.length; i++) {
        if (player.blast_furnace.grid[Y2_center[i]] == 'controller') c += 1
        if (player.blast_furnace.grid[Y2_center[i]] == 'drain') d += 1
    }
    return (c == 1 && d == 1)
}

function faucet_table_binding(id) {
    return player.blast_furnace.grid[id] == 'faucet' && player.blast_furnace.grid[id - 500] == 'casting_table'
}

function BF_faucet_and_table() {
    if (BF_Y2_structure()) {
        let d_pos
        let Y2_center = [702, 703, 704, 802, 804, 902, 903, 904]
        for (i = 0; i < Y2_center.length; i++) {
            if (player.blast_furnace.grid[Y2_center[i]] == 'drain') d_pos = Y2_center[i]
        }
        if (d_pos == 702) {
            return faucet_table_binding(602) || faucet_table_binding(701)
        }
        if (d_pos == 703) {
            return faucet_table_binding(603)
        }
        if (d_pos == 704) {
            return faucet_table_binding(604) || faucet_table_binding(705)
        }
        if (d_pos == 802) {
            return faucet_table_binding(801)
        }
        if (d_pos == 804) {
            return faucet_table_binding(805)
        }
        if (d_pos == 902) {
            return faucet_table_binding(1002) || faucet_table_binding(901)
        }
        if (d_pos == 903) {
            return faucet_table_binding(1003)
        }
        if (d_pos == 904) {
            return faucet_table_binding(1004) || faucet_table_binding(905)
        }
    }
}

function BF_structure_complete() {
    return (BF_top_bottom_structure() && BF_Y2_structure() && BF_faucet_and_table() && player.blast_furnace.grid[803] == "")
}

//制造层5：高炉
addLayer("blast_furnace", {
    componentStyles: {
        "clickable"() {
            return {
                'margin-left': '-7px',
                'margin-right': '-7px',
            }
        }
    },
    name: "blast_furnace",
    position: 1006,
    row: 101,
    symbol: '高炉', // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
            built: false,
            struText: "",
            actived: {
                31: false, 32: false, 33: false, 34: false, 35: false
            },
            time: {
                31: d(0), 32: d(0), 33: d(0), 34: d(0), 35: d(0)
            },
            time_multi: d(1),
            page: 1,
            maxPage: 1,
            chosenID: 0,
            placeBlock: "remove",
            posY: 1,
        }
    },
    color: "#3a2f18",
    type: "none",
    layerType: "craft",
    resource: "高炉",
    baseResource() { return "石头" },
    baseAmount() { return player.stone.points },
    exponent: 0.05,
    requires: d(1414213),
    tooltip() { return false },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        m = d(1)
        return m
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        e = d(1)
        return e
    },
    resetDescription: "重置以合成 ",
    layerShown() { return hasNormalAchievement(106) },// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.


    canReset() {
        return player.furnace.cooldown.lte(0) && player.stone.points.gte(1414213)
    },

    doReset(resettingLayer) {
        return undefined
    },

    grid: {
        rows: 15, // If these are dynamic make sure to have a max value as well!
        cols: 5,
        getStartData(id) {
            return ""
        },
        getUnlocked(id) { // Default
            return true
        },
        getCanClick(data, id) {
            if (player.blast_furnace.built) return false
            if (data == player.blast_furnace.placeBlock || (player.blast_furnace.placeBlock == "remove" && data == "")) return false
            else {
                if (player.blast_furnace.placeBlock == "remove") return true
                let blocks = [11, 12, 13, 14, 15]
                for (i = 0; i < blocks.length; i++) {
                    if (player.blast_furnace.placeBlock == tmp.blast_furnace.clickables[blocks[i]].corItem)
                        return player.furnace.scorched_brick.gte(tmp.blast_furnace.clickables[blocks[i]].cost)
                }
            }
        },
        onClick(data, id) {
            if (player.blast_furnace.placeBlock != 'remove') {
                let blocks = [11, 12, 13, 14, 15]
                for (i = 0; i < blocks.length; i++) {
                    if (player.blast_furnace.placeBlock == tmp.blast_furnace.clickables[blocks[i]].corItem)
                        return player.furnace.scorched_brick = player.furnace.scorched_brick.sub(tmp.blast_furnace.clickables[blocks[i]].cost),
                            player[this.layer].grid[id] = player.blast_furnace.placeBlock
                }
            }
            else player[this.layer].grid[id] = ""
        },
        getTitle(data, id) {
            if (data == 'controller') return 'c'
            if (data == 'casting_table') return 't'
            if (data == 'drain') return 'd'
            if (data == 'block') return 'b'
            if (data == 'faucet') return 'f'
            if (data == '') return ''
        },
        getStyle(data, id) {
            if (data == "") return {
                'background-color': 'rgba(0,0,0,0)',
                'border-color': 'white',
                'font-size': '25px',
                'color': 'white',
            }
            else return {
                'border-color': 'white',
                'background-color': '#3a2f18',
                'font-size': '25px',
                'color': 'white',
            }
        },

    },

    clickables: {
        11: {
            title() {
                let t = "高炉控制器(c)"
                return t
            },
            display() {
                let d = `需要8高炉砖`
                return d
            },
            corItem: "controller",
            cost: d(8),
            canClick() { return player.blast_furnace.placeBlock != this.corItem },
            onClick() {
                player.blast_furnace.placeBlock = this.corItem
            },
            unlocked() { return tmp.blast_furnace.layerShown },
            style() {
                return {
                    'min-height': '96px',
                    'width': '128px',
                    'background-color': '#3a2f18',
                    'color': 'white',
                    'border-color': `${player.blast_furnace.placeBlock == this.corItem ? 'white' : 'rgba(0, 0, 0, 0.15)'}`
                }
            },
        },
        12: {
            title() {
                let t = "高炉浇铸台(t)"
                return t
            },
            display() {
                let d = `需要7高炉砖`
                return d
            },
            corItem: "casting_table",
            cost: d(7),
            canClick() { return player.blast_furnace.placeBlock != this.corItem },
            onClick() {
                player.blast_furnace.placeBlock = this.corItem
            },
            unlocked() { return tmp.blast_furnace.layerShown },
            style() {
                return {
                    'min-height': '96px',
                    'width': '128px',
                    'background-color': '#3a2f18',
                    'color': 'white',
                    'border-color': `${player.blast_furnace.placeBlock == this.corItem ? 'white' : 'rgba(0, 0, 0, 0.15)'}`
                }
            },
        },
        13: {
            title() {
                let t = "高炉排液口(d)"
                return t
            },
            display() {
                let d = `需要6高炉砖`
                return d
            },
            corItem: "drain",
            cost: d(6),
            canClick() { return player.blast_furnace.placeBlock != this.corItem },
            onClick() {
                player.blast_furnace.placeBlock = this.corItem
            },
            unlocked() { return tmp.blast_furnace.layerShown },
            style() {
                return {
                    'min-height': '96px',
                    'width': '128px',
                    'background-color': '#3a2f18',
                    'color': 'white',
                    'border-color': `${player.blast_furnace.placeBlock == this.corItem ? 'white' : 'rgba(0, 0, 0, 0.15)'}`
                }
            },
        },
        14: {
            title() {
                let t = "高炉方块(b)"
                return t
            },
            display() {
                let d = `需要4高炉砖`
                return d
            },
            corItem: "block",
            cost: d(4),
            canClick() { return player.blast_furnace.placeBlock != this.corItem },
            onClick() {
                player.blast_furnace.placeBlock = this.corItem
            },
            unlocked() { return tmp.blast_furnace.layerShown },
            style() {
                return {
                    'min-height': '96px',
                    'width': '128px',
                    'background-color': '#3a2f18',
                    'color': 'white',
                    'border-color': `${player.blast_furnace.placeBlock == this.corItem ? 'white' : 'rgba(0, 0, 0, 0.15)'}`
                }
            },
        },
        15: {
            title() {
                let t = "高炉浇注口(f)"
                return t
            },
            display() {
                let d = `需要3高炉砖`
                return d
            },
            corItem: "faucet",
            cost: d(3),
            canClick() { return player.blast_furnace.placeBlock != this.corItem },
            onClick() {
                player.blast_furnace.placeBlock = this.corItem
            },
            unlocked() { return tmp.blast_furnace.layerShown },
            style() {
                return {
                    'min-height': '96px',
                    'width': '128px',
                    'background-color': '#3a2f18',
                    'color': 'white',
                    'border-color': `${player.blast_furnace.placeBlock == this.corItem ? 'white' : 'rgba(0, 0, 0, 0.15)'}`
                }
            },
        },
        16: {
            title() {
                let t = "移除模式"
                return t
            },
            display() {
                let d = `不会返还高炉砖`
                return d
            },
            corItem: "remove",
            canClick() { return player.blast_furnace.placeBlock != this.corItem },
            onClick() {
                player.blast_furnace.placeBlock = this.corItem
            },
            unlocked() { return tmp.blast_furnace.layerShown },
            style() {
                return {
                    'min-height': '96px',
                    'width': '128px',
                    'background-color': 'rgba(0,0,0,0)',
                    'color': 'white',
                    'border-color': `${player.blast_furnace.placeBlock == this.corItem ? 'white' : 'rgba(0, 0, 0, 0.15)'}`
                }
            },
        },
        21: {
            title() {
                let t = "检测结构完整性"
                return t
            },
            canClick() { return !player.blast_furnace.built },
            onClick() {
                if (BF_structure_complete()) player.blast_furnace.built = true,
                    player.blast_furnace.struText = "结构搭建正确！现在可以使用高炉！"
                else player.blast_furnace.struText = "结构不完整或者有不该填充的位置被填充"
            },
            unlocked() { return tmp.blast_furnace.layerShown },
            style() {
                return {
                    'min-height': '96px',
                    'width': '128px',
                    'background-color': '#3a2f18',
                    'color': 'white',
                    'border-color': `${player.blast_furnace.placeBlock == this.corItem ? 'white' : 'rgba(0, 0, 0, 0.15)'}`
                }
            },
        },
        31: {
            title() {
                let t = "钢"
                return t
            },
            display() {
                let d = `
                需要材料：1铁矿石 + 1木炭<br>
                产出：144mB 熔融钢 （相当于1锭）<br>
                ${player.blast_furnace.actived[this.id] ? `进度：${ftl(player.blast_furnace.time[this.id])}/${ftl(tmp.blast_furnace.clickables[this.id].time)}` : "此配方未激活或者材料不足"}
                倍率：${formatWhole(this.mult())}x`
                return d
            },
            time: d(10),
            mult() {
                let m = d(1)
                if (hasUpgrade(steel, 11)) m = m.times(3)
                if (hasUpgrade(steel, 13)) m = m.times(3)
                if (hasUpgrade(steel, 14)) m = m.times(upgradeEffect(steel, 14))
                if (hasUpgrade(steel, 21)) m = m.times(upgradeEffect(steel, 21))
                if (hasUpgrade(steel, 22)) m = m.times(upgradeEffect(steel, 22))
                if (hasUpgrade(steel, 24)) m = m.times(upgradeEffect(steel, 24))
                if (hasUpgrade(silver, 13)) m = m.times(upgradeEffect(silver, 13))
                if (hasUpgrade(silver, 21)) m = m.times(upgradeEffect(silver, 21))

                return m
            },
            result(diff) {
                if (player.blast_furnace.actived[this.id]) {
                    if (!(player.iron.ore.gte(1) && player.furnace.charcoal.gte(1))) player.blast_furnace.actived[this.id] = false
                    player.blast_furnace.time[this.id] = player.blast_furnace.time[this.id].add(player.blast_furnace.time_multi.div(tick))
                }
                if (player.blast_furnace.time[this.id].gte(tmp.blast_furnace.clickables[this.id].time.sub(d(1).div(tick)))) {
                    player.blast_furnace.time[this.id] = d(0)
                    player.iron.ore = player.iron.ore.sub(this.mult().min(player.iron.ore).min(player.furnace.charcoal))
                    player.furnace.charcoal = player.furnace.charcoal.sub(this.mult().min(player.iron.ore).min(player.furnace.charcoal))
                    player.steel.molten = player.steel.molten.add(d(144).times(this.mult().min(player.iron.ore).min(player.furnace.charcoal)))
                }
            },
            canClick() {
                if (!player.blast_furnace.actived[this.id]) return player.iron.ore.gte(1) && player.furnace.charcoal.gte(1)
                else return true
            },
            onClick() {
                player.blast_furnace.actived[this.id] = !player.blast_furnace.actived[this.id],
                    player.blast_furnace.time[this.id] = d(0)
            },
            unlocked() { return hasMilestone(blast_furnace, 0) },
            style() {
                return {
                    'min-height': '180px',
                    'width': '180px',
                    "background": "linear-gradient(45deg, #7a7a7a 0%, #adadad 30%, #adadad 80%, #989898 90%, #414141 100%)",
                    'background-color': '#a4a4a4',
                }
            },
        },
        1001: {
            display() {
                let d = `<`
                return d
            },
            canClick() { return player.blast_furnace.posY > 1 },
            onClick() {
                player.blast_furnace.posY -= 1
            },
            style() {
                return {
                    'min-height': '50px',
                    'width': '50px',
                    'font-size': '20px',
                    'color': 'white',
                }
            },
        },
        1002: {
            display() {
                let d = `Y = ${fw(player.blast_furnace.posY)}`
                return d
            },
            canClick() { return false },
            style() {
                return {
                    'min-height': '50px',
                    'width': '150px',
                    'font-size': '20px',
                    'background-color': '#3a2f18',
                    'border-radius': '2.5px',
                    'color': 'white',
                }
            },
        },
        1003: {
            display() {
                let d = `>`
                return d
            },
            canClick() { return player.blast_furnace.posY < 3 },
            onClick() {
                player.blast_furnace.posY += 1
            },
            style() {
                return {
                    'min-height': '50px',
                    'width': '50px',
                    'font-size': '20px',
                    'color': 'white',
                }
            },
        },
    },

    milestones: {
        0: {
            requirementDescription() { return `完成搭建高炉` },
            effectDescription() { return `解锁钢层级和钢的高炉熔炼配方` },
            done() { return player.blast_furnace.built },
            unlocked() { return tmp.blast_furnace.layerShown },
        },
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
        ["display-text", function () { if (tmp.blast_furnace.layerShown) return `高炉建造${textStyle_h2(player.blast_furnace.built ? "已完成" : "未完成", '3a2f18')}` }],
        "blank",
        ["microtabs", "stuff"],
        ["blank", "65px"],
    ],
    microtabs: {
        stuff: {
            "smelt": {
                unlocked() { return tmp.blast_furnace.layerShown },
                name() { return '熔炼' },
                content: [
                    ["blank", "15px"],
                    "blank",
                    ["clickables", [3, 4, 5]]
                ]
            },
            "milestones": {
                unlocked() { return tmp.blast_furnace.layerShown },
                name() { return '里程碑' },
                content: [
                    ["blank", "15px"],
                    "milestones"
                ]
            },
            "build": {
                unlocked() { return tmp.blast_furnace.layerShown },
                name() { return '搭建' },
                content: [
                    ["blank", "15px"],
                    ["clickables", [100]],
                    "blank",
                    ["grid", function () {
                        let y = player.blast_furnace.posY
                        return [[y * 5 - 4], [y * 5 - 3], [y * 5 - 2], [y * 5 - 1], [y * 5]]
                    }],
                    "blank",
                    ["clickables", [1]],
                    ["display-text", function () { if (hasUpgrade(furnace, 25)) return `你有 ${textStyle_h2(formatWhole(player.furnace.scorched_brick), '3a2f18')} 高炉砖` }],
                    "blank",
                    ["clickables", [2]],
                    ["display-text", function () { return player.blast_furnace.struText }],
                    "blank",
                    ["display-text", function () { return `高炉可以熔炼未来一系列复杂合金，要使用高炉，需要先建造对应的多方快结构` }],
                    ["display-text", function () { return `通过翻页调整Y值（高度），点击上方6个按钮选择放置的方块（或者移除放置错误的方块）` }],
                    ["display-text", function () { return `选中方块后点击上方的5x5方格进行放置，并扣除相应的高炉砖（高炉砖不足无法放置）` }],
                    ["display-text", function () { return `底部中间3x3放置高炉方块，第2层需要一个高炉控制器，高炉排液口。高炉浇注口需要在高炉排液口外进行连接` }],
                    ["display-text", function () { return `高炉浇注口的正下方需要一个高炉浇铸台，第3层3x3高炉方块封顶，另外中心点(3,2,3)需要为空` }],
                ],
            },
        },
    },
})

addLayer("energy", {
    name: "energy",
    position: 2001,
    row: 201,
    symbol() { return '↓ 能源 ↓' },
    small: true,// Set true to generate a slightly different layer
    nodeStyle: { "font-size": "15px", "height": "30px" },// Change layer button' style
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
        }
    },
    color: "#fefefe",
    type: "none",
    tooltip() { return false },
    layerShown() { return hasNormalAchievement(33) },// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.
    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }]
    ],
})

function RFAutobuyerActivated(id) {
    return player.rf.autobuyer[id]
}

//能源层1：红石通量
addLayer("rf", {
    componentStyles: {
        "clickable"() {
            return {
                'margin-left': '-7px',
                'margin-right': '-7px',
            }
        }
    },
    name: "rf",
    position: 2002,
    row: 201,
    symbol: '红石通量', // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),// This actually does nothing, but you have to write this. (Unless you want add something in this layer. #Todo, might change that later.)
            autobuyer: {

            },
            autoCurrencyPage: 1,
            maxAutoCurrencyPage: 1,
        }
    },
    color: "#fc0000",
    type: "none",
    layerType: "energy",
    resource: "RF",
    baseResource() { return "石头" },
    baseAmount() { return player.stone.points },
    exponent: 0.05,
    requires: d(1414213),
    tooltip() { return false },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        m = d(0)
        if (hasCraftingItem(61)) m = m.add(15)
        if (hasUpgrade(rf, 11)) m = m.times(3)
        if (hasCraftingItem(92)) m = m.times(4)
        if (hasUpgrade(rf, 13)) m = m.times(3)
        if (hasCraftingItem(121)) m = m.times(10)
        if (hasCraftingItem(222)) m = m.times(15)
        if (hasMilestone(brass, 1)) m = m.times(1.5)
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
        if (RFAutobuyerActivated(34)) g = g.sub(1080)
        if (RFAutobuyerActivated(35)) g = g.sub(1080)
        if (RFAutobuyerActivated(41)) g = g.sub(1080)
        if (RFAutobuyerActivated(51)) g = g.sub(600)
        if (RFAutobuyerActivated(61)) g = g.sub(800)
        if (RFAutobuyerActivated(62)) g = g.sub(12800)
        if (RFAutobuyerActivated(63)) g = g.sub(3240)

        if (RFAutobuyerActivated(10001)) g = g.sub(66)
        if (RFAutobuyerActivated(10002)) g = g.sub(66)
        if (RFAutobuyerActivated(10003)) g = g.sub(66)
        if (RFAutobuyerActivated(10004)) g = g.sub(1440)
        if (RFAutobuyerActivated(10005)) g = g.sub(1440)
        if (RFAutobuyerActivated(10011)) g = g.sub(1440)
        if (RFAutobuyerActivated(10012)) g = g.sub(1800)
        if (RFAutobuyerActivated(10013)) g = g.sub(1800)
        if (RFAutobuyerActivated(10014)) g = g.sub(2400)
        if (RFAutobuyerActivated(10015)) g = g.sub(2160)
        if (RFAutobuyerActivated(10021)) g = g.sub(2160)
        if (RFAutobuyerActivated(10022)) g = g.sub(4320)
        if (RFAutobuyerActivated(10023)) g = g.sub(4320)

        if (fuelID() == 10005) g = g.sub(51200)
        return g
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        e = d(1)
        return e
    },
    layerShown() { return hasNormalAchievement(33) },// If any layer in the array is unlocked, it will returns true. Otherwise it will return false.


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
            cost() { return new ExpantaNum(4) },
            unlocked() { return hasNormalAchievement(37) },
        },
        12: {
            title: "煤炭矿机",
            description: "解锁自动挖掘煤炭",
            currencyInternalName: "points",
            currencyDisplayName: "青铜锭",
            currencyLayer: bronze,
            cost() { return new ExpantaNum(12) },
            unlocked() { return hasNormalAchievement(37) },
        },
        13: {
            title: "太阳能板：铁矿石改良",
            description: "RF发电速度x3",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() { return new ExpantaNum(3) },
            unlocked() { return hasNormalAchievement(46) },
        },
        14: {
            title: "锡矿石矿机",
            description: "解锁自动挖掘锡矿石",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() { return new ExpantaNum(5) },
            unlocked() { return hasNormalAchievement(46) },
        },
        15: {
            title: "丛林树场",
            description: "解锁自动砍伐丛林原木",
            cost() { return new ExpantaNum(1e8) },
            unlocked() { return hasCraftingItem(121) },
        },
        21: {
            title: "虚空熔炼铜锭",
            description: "解锁自动熔炼铜矿石",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() { return new ExpantaNum(20) },
            unlocked() { return hasCraftingItem(112) },
        },
        22: {
            title: "虚空熔炼锡锭",
            description: "解锁自动熔炼锡矿石",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() { return new ExpantaNum(20) },
            unlocked() { return hasCraftingItem(112) },
        },
        23: {
            title: "虚空熔炼木炭",
            description: "解锁自动熔炼木炭",
            currencyInternalName: "ore",
            currencyDisplayName: "铁矿石",
            currencyLayer: iron,
            cost() { return new ExpantaNum(20) },
            unlocked() { return hasCraftingItem(112) },
        },
        24: {
            title: "虚空熔炼铁锭",
            description: "解锁自动熔炼铁锭",
            currencyInternalName: "points",
            currencyDisplayName: "康铜锭",
            currencyLayer: constantan,
            cost() { return new ExpantaNum(1e40) },
            unlocked() { return hasUpgrade(constantan, 35) },
        },
        25: {
            title: "虚空熔炼镍锭",
            description: "解锁自动熔炼镍锭",
            currencyInternalName: "points",
            currencyDisplayName: "康铜锭",
            currencyLayer: constantan,
            cost() { return new ExpantaNum(1e40) },
            unlocked() { return hasUpgrade(constantan, 35) },
        },
        31: {
            title: "铁矿石矿机",
            description: "解锁自动挖掘铁矿石",
            currencyInternalName: "ore",
            currencyDisplayName: "铝矿石",
            currencyLayer: aluminum,
            cost() { return new ExpantaNum(999) },
            unlocked() { return hasCraftingItem(162) },
        },
        32: {
            title: "虚空合金青铜锭",
            description: "解锁自动合金青铜锭",
            currencyInternalName: "ore",
            currencyDisplayName: "铅矿石",
            currencyLayer: lead,
            cost() { return new ExpantaNum(1) },
            unlocked() { return hasCraftingItem(162) },
        },
        33: {
            title: "镍矿石矿机",
            description: "解锁自动挖掘镍矿石",
            currencyInternalName: "points",
            currencyDisplayName: "铅锭",
            currencyLayer: lead,
            cost() { return new ExpantaNum(25) },
            unlocked() { return hasCraftingItem(171) },
        },
        34: {
            title: "铝矿石矿机",
            description: "解锁自动挖掘铝矿石",
            currencyInternalName: "points",
            currencyDisplayName: "康铜锭",
            currencyLayer: constantan,
            cost() { return new ExpantaNum(1e40) },
            unlocked() { return hasUpgrade(constantan, 35) },
        },
        35: {
            title: "铅矿石矿机",
            description: "解锁自动挖掘铅矿石",
            currencyInternalName: "points",
            currencyDisplayName: "康铜锭",
            currencyLayer: constantan,
            cost() { return new ExpantaNum(1e40) },
            unlocked() { return hasUpgrade(constantan, 35) },
        },
        41: {
            title: "金合欢树场",
            description: "解锁自动砍伐金合欢原木",
            currencyInternalName: "acacia",
            currencyDisplayName: "金合欢原木",
            currencyLayer: wood,
            cost() { return new ExpantaNum(77777) },
            unlocked() { return hasCraftingItem(212) },
        },
        51: {
            title: "自动蓄水",
            description: "需求：拥有蓄水器<br>解锁蓄水器蓄水",
            currencyInternalName: "water",
            currencyDisplayName: "mB 水",
            currencyLayer: iron,
            canAfford() { return hasCraftingItem(232) },
            cost() { return new ExpantaNum(300000000) },
            unlocked() { return hasCraftingItem(212) },
        },
        52: {
            title: "高温熔炼熔岩",
            description: "需求：拥有熔岩炉<br>解锁熔岩炉熔炼熔岩",
            currencyInternalName: "lava",
            currencyDisplayName: "mB 熔岩",
            currencyLayer: iron,
            canAfford() { return hasCraftingItem(241) },
            cost() { return new ExpantaNum(300000000) },
            unlocked() { return hasCraftingItem(212) },
        },
        53: {
            title: "虚空熔炼铝锭",
            description: "解锁自动熔炼铝锭",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            cost() { return new ExpantaNum(1e125) },
            unlocked() { return hasMilestone(invar, 4) },
        },
        54: {
            title: "虚空熔炼铅锭",
            description: "解锁自动熔炼铅锭",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            cost() { return new ExpantaNum(1e140) },
            unlocked() { return hasMilestone(invar, 4) },
        },
        55: {
            title: "虚空合金康铜锭",
            description: "解锁自动合金康铜锭",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            cost() { return new ExpantaNum('6.6666e666') },
            unlocked() { return hasUpgrade(alumbrass, 15) },
        },
        61: {
            title: "虚空合金殷钢锭",
            description: "解锁自动合金殷钢锭",
            currencyInternalName: "energy",
            currencyDisplayName: "殷钢能量",
            currencyLayer: invar,
            cost() { return new ExpantaNum('1e2260') },
            unlocked() { return hasMilestone(brass, 0) },
        },
        62: {
            title: "虚空合金铝黄铜锭",
            description: "解锁自动合金铝黄铜锭",
            currencyInternalName: "points",
            currencyDisplayName: "黄铜锭",
            currencyLayer: invar,
            cost() { return new ExpantaNum(700) },
            unlocked() { return hasMilestone(brass, 0) },
        },
        63: {
            title: "锌矿石矿机",
            description: "解锁自动挖掘锌矿石",
            currencyInternalName: "points",
            currencyDisplayName: "黄铜锭",
            currencyLayer: brass,
            cost() { return new ExpantaNum(0) },
            unlocked() { return hasMilestone(brass, 1) },
        },
        64: {
            title: "虚空熔炼锌锭",
            description: "解锁自动熔炼锌锭",
            currencyInternalName: "points",
            currencyDisplayName: "黄铜锭",
            currencyLayer: brass,
            cost() { return new ExpantaNum(0) },
            unlocked() { return hasMilestone(brass, 1) },
        },
        65: {
            title: "虚空合金黄铜锭",
            description: "解锁自动合金黄铜锭",
            currencyInternalName: "points",
            currencyDisplayName: "黄铜锭",
            currencyLayer: brass,
            cost() { return new ExpantaNum(0) },
            unlocked() { return hasMilestone(brass, 1) },
        },
    },

    clickables: {
        11: {
            title() {
                let t = "自动树场-木头"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：3 RF/t<br>
                效果：每秒自动获取一次撸树的木头的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(3)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.wood.points = player.wood.points.add(tmp.wood.gainMult.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return tmp.rf.layerShown },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    'background-color': '#b8945e',
                }
            },
        },
        12: {
            title() {
                let t = "自动树场-橡木原木"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：3 RF/t<br>
                效果：每秒自动获取一次撸树的橡木原木的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(3)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.wood.oak = player.wood.oak.add(tmp.wood.logGain.oak.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return tmp.rf.layerShown },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    'background-color': '#b8945e',
                }
            },
        },
        13: {
            title() {
                let t = "自动树场-云杉原木"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：3 RF/t<br>
                效果：每秒自动获取一次撸树的云杉原木的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(3)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.wood.spruce = player.wood.spruce.add(tmp.wood.logGain.spruce.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return tmp.rf.layerShown },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    'background-color': '#826038',
                }
            },
        },
        14: {
            title() {
                let t = "自动树场-白桦原木"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：3 RF/t<br>
                效果：每秒自动获取一次撸树的白桦原木的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(3)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.wood.birch = player.wood.birch.add(tmp.wood.logGain.birch.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return tmp.rf.layerShown },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    'background-color': '#ceb77c',
                }
            },
        },
        15: {
            title() {
                let t = "自动树场-丛林原木"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：300 RF/t<br>
                效果：每秒自动获取一次撸树的丛林原木的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(300)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.wood.jungle = player.wood.jungle.add(tmp.wood.logGain.jungle.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 15) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    'background-color': '#9f844d',
                }
            },
        },
        21: {
            title() {
                let t = "刷石机"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：8 RF/t<br>
                效果：每秒自动获取一次挖掘石头的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(8)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.stone.points = player.stone.points.add(tmp.stone.gainMult.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasNormalAchievement(37) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    'background-color': '#4a4a4a',
                    'color': 'white',
                }
            },
        },
        22: {
            title() {
                let t = "自动矿机-泥土"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：8 RF/t<br>
                效果：每秒自动获取一次挖掘石头的泥土的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(8)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.stone.dirt = player.stone.dirt.add(tmp.stone.otherGain.dirt.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasNormalAchievement(37) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    'background-color': '#5f452f',
                    'color': 'white',
                }
            },
        },
        23: {
            title() {
                let t = "自动矿机-沙子"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：8 RF/t<br>
                效果：每秒自动获取一次挖掘石头的沙子的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(8)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.stone.sand = player.stone.sand.add(tmp.stone.otherGain.sand.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasNormalAchievement(37) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    'background-color': '#d6cf97',
                }
            },
        },
        24: {
            title() {
                let t = "自动矿机-煤炭"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：16 RF/t<br>
                效果：每秒自动获取一次挖掘石头的煤炭的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(16)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.stone.coal = player.stone.coal.add(tmp.stone.otherGain.coal.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 12) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    'background-color': '#1e1e1e',
                    'color': 'white',
                }
            },
        },
        31: {
            title() {
                let t = "自动矿机-铜矿石"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：128 RF/t<br>
                效果：每秒自动获取一次挖掘铜矿石的10%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(128)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.copper.ore = player.copper.ore.add(tmp.copper.gainMult.div(10).div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasCraftingItem(92) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                }
            },
        },
        32: {
            title() {
                let t = "自动矿机-锡矿石"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：192 RF/t<br>
                效果：每秒自动获取一次挖掘锡矿石的10%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(192)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.tin.ore = player.tin.ore.add(tmp.tin.gainMult.div(10).div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 14) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #c4dce1 0%, #d3e4e4 100%)",
                }
            },
        },
        33: {
            title() {
                let t = "自动矿机-铁矿石"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：768 RF/t<br>
                效果：每秒自动获取一次挖掘铁矿石的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(768)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.iron.ore = player.iron.ore.add(tmp.iron.gainMult.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 31) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                }
            },
        },
        34: {
            title() {
                let t = "自动矿机-镍矿石"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：1080 RF/t<br>
                效果：每秒自动获取一次挖掘镍矿石的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(1080)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.nickel.ore = player.nickel.ore.add(tmp.nickel.gainMult.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 33) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #fffcc0 0%, #f5f5d7 25%, #fffcc0 50%, #e3df94 75%, #8b8566 100%)",
                }
            },
        },
        35: {
            title() {
                let t = "自动矿机-铝矿石"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：1080 RF/t<br>
                效果：每秒自动获取一次挖掘铝矿石的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(1080)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.aluminum.ore = player.aluminum.ore.add(tmp.aluminum.gainMult.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 34) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)"
                }
            },
        },
        41: {
            title() {
                let t = "自动矿机-铅矿石"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：1080 RF/t<br>
                效果：每秒自动获取一次挖掘铅矿石的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(1080)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.lead.ore = player.lead.ore.add(tmp.lead.gainMult.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 35) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #667397 0%, #acc0ff 20%, #97a9e0 50%, #6a7392 80%, #333848 100%)",
                }
            },
        },
        51: {
            title() {
                let t = "自动树场-金合欢原木"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：600 RF/t<br>
                效果：每秒自动获取一次撸树的丛林原木的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(600)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.wood.acacia = player.wood.acacia.add(tmp.wood.logGain.acacia.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 41) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    'background-color': '#ba5d3b',
                }
            },
        },
        61: {
            title() {
                let t = "蓄水器-自动蓄水"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：800 RF/t<br>
                效果：每秒自动蓄水获得${formatPercent(this.mult())}的水<br><br>
                状态：${onoff}<br>
                当前效率：${f(this.gain())}/秒`
                return d
            },
            cost() {
                return d(800)
            },
            baseGain() {
                return tmp.iron.fluidPerBucket.times(player.crafting_table.items[122])
            },
            mult() {
                let m = d(1)
                if (hasCraftingItem(242)) m = m.times(10)
                return m
            },
            gain() {
                return this.baseGain().times(this.mult())
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.iron.water = player.iron.water.add(this.gain().div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 51) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    'background-color': '#2b3cf4',
                }
            },
        },
        62: {
            title() {
                let t = "熔岩炉-熔炼熔岩"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：12,800 RF/t<br>
                效果：每秒自动熔炼获得${formatPercent(this.mult())}的熔岩<br><br>
                状态：${onoff}<br>
                当前效率：${f(this.gain())}/秒`
                return d
            },
            cost() {
                return d(12800)
            },
            baseGain() {
                return tmp.iron.fluidPerBucket.times(player.crafting_table.items[122])
            },
            mult() {
                let m = d(1)
                if (player[ct].items[242].gte(3)) m = m.times(10)
                return m
            },
            gain() {
                return this.baseGain().times(this.mult())
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.iron.lava = player.iron.lava.add(this.gain().div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 51) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    'background-color': '#d76013',
                }
            },
        },
        63: {
            title() {
                let t = "自动矿机-锌矿石"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：3240 RF/t<br>
                效果：每秒自动获取一次挖掘锌矿石获取期望的100%<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(3240)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.zinc.ore = player.zinc.ore.add(tmp.zinc.chainExpectation.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 63) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #a3be9e 0%, #fcfcfc 10%, #b7e6bf 40%, #b7e6bf 60%, #d3fcd9 80%, #4f6c62 100%)",
                }
            },
        },
        //自动熔炼
        10001: {
            title() {
                let t = "虚空熔炼-铜锭"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：66 RF/t<br>
                效果：每个游戏刻（tick）自动熔炼一次当前拥有的铜矿石的0.5%，且不消耗铜矿石，但不能超过当前铜矿石总量<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(66)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id) && player.copper.points.lt(player.copper.ore)) return player.copper.points = player.copper.points.add(player.copper.ore.div(200))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 21) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #ea8601 0%, #ffb53c 100%)",
                }
            },
        },
        10002: {
            title() {
                let t = "虚空熔炼-锡锭"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：66 RF/t<br>
                效果：每个游戏刻（tick）自动熔炼一次当前拥有的锡矿石的0.5%，且不消耗锡矿石，但不能超过当前锡矿石总量<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(66)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id) && player.tin.points.lt(player.tin.ore)) return player.tin.points = player.tin.points.add(player.tin.ore.div(200))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 22) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #c4dce1 0%, #d3e4e4 100%)",
                }
            },
        },
        10003: {
            title() {
                let t = "虚空熔炼-木炭"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：66 RF/t<br>
                效果：每个游戏刻（tick）自动熔炼获得${fw(this.mult())}木炭（即${fw(this.mult().times(20))}每秒），且不消耗木头<br><br>
                状态：${onoff}`
                return d
            },
            mult() {
                let m = d(100)
                if (hasCraftingItem(302)) m = m.times(clickableEffect(ct, 302))
                return m
            },
            cost() {
                return d(66)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.furnace.charcoal = player.furnace.charcoal.add(this.mult())
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 23) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    'background-color': '#2b261d',
                    'color': 'white',
                }
            },
        },
        10004: {
            title() {
                let t = "虚空合金-青铜锭"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：1440 RF/t<br>
                效果：每个游戏刻（tick）自动合金能够合金数量的0.5%的青铜锭，且不消耗原材料，但不能超过锡锭的4倍，铜锭的4/3倍<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(1440)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                let alloyPsec = player.copper.points.max(0).div(3).floor().min(player.tin.points).times(4).div(10)
                let alloyCap = player.copper.points.max(0).times(4 / 3).min(player.tin.points.times(4))
                if (player.bronze.points.gte(alloyCap)) alloyPsec = d(0)
                if (RFAutobuyerActivated(this.id)) return player.bronze.points = player.bronze.points.add(alloyPsec.div(tick))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 32) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #b77b2f 0%, #ffd7a1 80%, #ffeed8 100%)",
                }
            },
        },
        10005: {
            title() {
                let t = "虚空熔炼-铁锭"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：1440 RF/t<br>
                效果：每个游戏刻（tick）自动熔炼一次当前拥有的铁矿石的0.5%，且不消耗铁矿石，但不能超过当前铁矿石总量<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(1440)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id) && player.iron.points.lt(player.iron.ore)) return player.iron.points = player.iron.points.add(player.iron.ore.div(200))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 24) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #d8d8d8 0%, #d8d8d8 50%, #a8a8a8 70%, #5e5e5e 90%)",
                }
            },
        },
        10011: {
            title() {
                let t = "虚空熔炼-镍锭"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：1440 RF/t<br>
                效果：每个游戏刻（tick）自动熔炼一次当前拥有的镍矿石的0.5%，且不消耗镍矿石，但不能超过当前镍矿石总量<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(1440)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id) && player.nickel.points.lt(player.nickel.ore)) return player.nickel.points = player.nickel.points.add(player.nickel.ore.div(200))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 25) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #fffcc0 0%, #f5f5d7 25%, #fffcc0 50%, #e3df94 75%, #8b8566 100%)",
                }
            },
        },
        10012: {
            title() {
                let t = "虚空熔炼-铝锭"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：1800 RF/t<br>
                效果：每个游戏刻（tick）自动熔炼一次当前拥有的铝矿石的0.5%，且不消耗铝矿石，但不能超过当前铝矿石总量<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(1800)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id) && player.aluminum.points.lt(player.aluminum.ore)) return player.aluminum.points = player.aluminum.points.add(player.aluminum.ore.div(200))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 53) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(90deg, #e2e3ee 0%, #d4d5e4 50%, #a0a2ac 100%)",
                }
            },
        },
        10013: {
            title() {
                let t = "虚空熔炼-铅锭"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：1800 RF/t<br>
                效果：每个游戏刻（tick）自动熔炼一次当前拥有的铅矿石的0.5%，且不消耗铅矿石，但不能超过当前铅矿石总量<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(1800)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id) && player.lead.points.lt(player.lead.ore)) return player.lead.points = player.lead.points.add(player.lead.ore.div(200))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 54) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #667397 0%, #acc0ff 20%, #97a9e0 50%, #6a7392 80%, #333848 100%)",
                }
            },
        },
        10014: {
            title() {
                let t = "虚空熔炼-康铜锭"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：2400 RF/t<br>
                效果：每个游戏刻（tick）自动合金一次康铜锭合金倍率的5%，且不消耗原材料<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(2400)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.constantan.points = player.constantan.points.add(tmp.alloy_s.clickables[12].mult.div(20))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 55) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #d39f49 0%, #ffd37c 30%, #eeba4f 80%, #7d6233 100%)",
                }
            },
        },
        10015: {
            title() {
                let t = "虚空熔炼-殷钢锭"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：2160 RF/t<br>
                效果：每个游戏刻（tick）自动合金一次殷钢锭合金倍率的5%，且不消耗原材料<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(2160)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.invar.points = player.invar.points.add(tmp.alloy_s.clickables[13].mult.div(20))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 61) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #979a90 0%, #bcc4ba 20%, #e2e7e5 75%, #95a7a1 90%, #697672 100%)",
                }
            },
        },
        10021: {
            title() {
                let t = "虚空熔炼-铝黄铜锭"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：2160 RF/t<br>
                效果：每个游戏刻（tick）自动合金一次铝黄铜合金倍率的5%，且不消耗原材料<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(2160)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.alumbrass.points = player.alumbrass.points.add(tmp.alloy_s.clickables[14].mult.div(20))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 62) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #e6c34b 0%, #f0d467 30%, #e6c34b 75%, #ab7d1b 100%)",
                }
            },
        },
        10022: {
            title() {
                let t = "虚空熔炼-锌锭"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：4320 RF/t<br>
                效果：每个游戏刻（tick）自动熔炼一次当前拥有的锌矿石的0.5%，且不消耗锌矿石，但不能超过当前锌矿石总量<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(4320)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id) && player.zinc.points.lt(player.zinc.ore)) return player.zinc.points = player.zinc.points.add(player.zinc.ore.div(200))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 64) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #a3be9e 0%, #fcfcfc 10%, #b7e6bf 40%, #b7e6bf 60%, #d3fcd9 80%, #4f6c62 100%)",
                }
            },
        },
        10023: {
            title() {
                let t = "虚空熔炼-黄铜锭"
                return t
            },
            display() {
                let onoff = RFAutobuyerActivated(this.id) ? "开" : "关"
                let d = `
                需要耗能：4320 RF/t<br>
                效果：每个游戏刻（tick）自动合金一次黄铜合金倍率的5%，且不消耗原材料<br><br>
                状态：${onoff}`
                return d
            },
            cost() {
                return d(4320)
            },
            auto(diff) {
                if (player.rf.autobuyer[this.id] == undefined) return player.rf.autobuyer[this.id] = false
                if (RFAutobuyerActivated(this.id)) return player.brass.points = player.brass.points.add(tmp.alloy_s.clickables[15].mult.div(20))
            },
            canClick() { return player.rf.points.gte(this.cost().times(20)) },
            onClick() {
                if (RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = false
                if (!RFAutobuyerActivated(this.id)) return player.rf.autobuyer[this.id] = true
            },
            unlocked() { return hasUpgrade(rf, 65) },
            style() {
                return {
                    'min-height': '120px',
                    'width': '210px',
                    "background": "linear-gradient(45deg, #fce892 0%, #fce892 30%,  #f8ac67 60%, #f8ac67 80%, #75452c 100%)",
                }
            },
        },
        //翻页
        20002: {
            display() {
                let d = `<`
                return d
            },
            canClick() { return player.rf.autoCurrencyPage > 1 },
            onClick() {
                player.rf.autoCurrencyPage -= 1
            },
            style() {
                return {
                    'min-height': '50px',
                    'width': '50px',
                    'font-size': '20px',
                }
            },
        },
        20003: {
            display() {
                let d = `${formatWhole(player.rf.autoCurrencyPage)}/${formatWhole(player.rf.maxAutoCurrencyPage)}页`
                return d
            },
            canClick() { return false },
            style() {
                return {
                    'min-height': '50px',
                    'width': '150px',
                    'font-size': '20px',
                    'background-color': '#fc0000',
                    'border-radius': '2.5px',
                }
            },
        },
        20004: {
            display() {
                let d = `>`
                return d
            },
            canClick() { return player.rf.autoCurrencyPage < player.rf.maxAutoCurrencyPage },
            onClick() {
                player.rf.autoCurrencyPage += 1
            },
            style() {
                return {
                    'min-height': '50px',
                    'width': '50px',
                    'font-size': '20px',
                }
            },
        },
    },

    update(diff) {
        if (hasCraftingItem(61)) player.rf.points = player.rf.points.add(tmp.rf.netGrowth) //每tick计算
        if (player.rf.points.lte(tmp.rf.netGrowth.neg())) player.rf.autobuyer = {}
        //最多有
        if (player.rf.points.gte(player.rf.best)) player.rf.best = player.rf.points
        //更新最大页码
        if (tmp.rf.clickables[61].unlocked || tmp.rf.clickables[62].unlocked) player.rf.maxAutoCurrencyPage = 2
    },

    tabFormat: [
        ["display-text", function () { return getPointsDisplay() }],
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
                unlocked() { return tmp.rf.layerShown },
                name() { return '自动资源' },
                content: [
                    ["blank", "15px"],
                    ["clickables", [2000]],
                    "blank",
                    ["clickables", function () {
                        let p = player.rf.autoCurrencyPage
                        return [[p * 5 - 4], [p * 5 - 3], [p * 5 - 2], [p * 5 - 1], [p * 5]]
                    }],
                    "blank",
                    ["display-text", () => `请注意自己的RF发电速度`],
                    ["display-text", () => `若RF能源不足以保持自动化，将强制关闭所有自动化！`],
                    ["display-text", function () { return `自动获取的资源可以无视当前所在的位置直接获取` }],
                ]
            },
            "auto_smelt": {
                unlocked() { return hasCraftingItem(112) },
                name() { return '自动熔炼' },
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
                unlocked() { return tmp.rf.layerShown },
                name() { return '解锁' },
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
