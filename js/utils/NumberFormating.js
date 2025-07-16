// format-expantanum.js by cloudytheconqueror
// Code snippets from NumberFormating.js of ducdat0507's The Communitree,
// which is based on The Modding Tree by Acamaeda (and ported to OmegaNum by upvoid),
// in turn based on The Prestige Tree by Jacorb and Aarex

// Set to 1 to print debug information to console
let FORMAT_DEBUG = 0

// Maximum number of times you can apply 1+log10(x) to number < 10 until the result is
// indistinguishable from 1. I calculated it myself and got 45, though I set it to 48 to be safe.
// Reducing this will speed up formatting, but may lead to inaccurate results.
let MAX_LOGP1_REPEATS = 48

// Base 5 logarithm of e, used to calculate log base 5, which is used in the definition of J.
let LOG5E = 0.6213349345596119 // 1 / Math.log(5)

function commaFormat(num, precision) {
    num = new ExpantaNum(num)
    if (num === null || num === undefined) return "NaN"
    let zeroCheck = num.array ? num.array[0][1] : num
    if (zeroCheck < 0.001) return (0).toFixed(precision)
    let init = num.round().toString()
    let portions = init.split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    return portions[0]
}

function regularFormat(num, precision) {
    if (isNaN(num)) return "NaN"
    let zeroCheck = num.array ? num.array[0][1] : num
    if (zeroCheck < 0.001) return (0).toFixed(precision)
    let fmt = num.toString()
    let f = fmt.split(".")
    if (precision == 0) return commaFormat(num.round ? num.round() : Math.round(num))
    else if (f.length == 1) return fmt + "." + "0".repeat(precision)
    else if (f[1].length <= precision) return fmt + "0".repeat(precision - f[1].length)
    else return f[0] + "." + f[1].substring(0, precision)
}

// Basically does the opposite of what standardize in ExpantaNum does
// Set smallTop to true to force the top value in the result below 10
function polarize(array, smallTop = false) {
    if (FORMAT_DEBUG >= 1) console.log("Begin polarize: " + JSON.stringify(array) + ", smallTop " + smallTop)
    if (array.length == 0) array = [[0, 0]]

    let bottom = array[0][0] == 0 ? array[0][1] : 10, top = 0, height = 0
    if (!Number.isFinite(bottom)) { }
    else if (array.length <= 1 && array[0][0] == 0) {
        while (smallTop && bottom >= 10) {
            bottom = Math.log10(bottom)
            top += 1
            height = 1
        }
    }
    else {
        let elem = array[0][0] == 0 ? 1 : 0
        top = array[elem][1]
        height = array[elem][0]
        while (bottom >= 10 || elem < array.length || (smallTop && top >= 10)) {
            if (bottom >= 10) { // Bottom mode: the bottom number "climbs" to the top
                if (height == 1) {
                    // Apply one increment
                    bottom = Math.log10(bottom)
                    if (bottom >= 10) { // Apply increment again if necessary
                        bottom = Math.log10(bottom)
                        top += 1
                    }
                }
                else if (height < MAX_LOGP1_REPEATS) {
                    // Apply the first two increments (one or two logs on first, one log on second)
                    if (bottom >= 1e10) bottom = Math.log10(Math.log10(Math.log10(bottom))) + 2
                    else bottom = Math.log10(Math.log10(bottom)) + 1
                    // Apply the remaining increments
                    for (i = 2; i < height; i++) bottom = Math.log10(bottom) + 1
                }
                else bottom = 1 // The increment result is indistinguishable from 1

                top += 1
                if (FORMAT_DEBUG >= 1) console.log("Bottom mode: bottom " + bottom + ", top " + top + ", height " + height + ", elem " + elem)
            }
            else { // Top mode: height is increased by one, or until the next nonzero value
                // Prevent running top mode more times than necessary
                if (elem == array.length - 1 && array[elem][0] == height && !(smallTop && top >= 10)) break

                bottom = Math.log10(bottom) + top
                height += 1
                if (elem < array.length && height > array[elem][0]) elem += 1
                if (elem < array.length) {
                    if (height == array[elem][0]) top = array[elem][1] + 1
                    else if (bottom < 10) { // Apply top mode multiple times
                        let diff = array[elem][0] - height
                        if (diff < MAX_LOGP1_REPEATS) {
                            for (i = 0; i < diff; i++) bottom = Math.log10(bottom) + 1
                        }
                        else bottom = 1 // The increment result is indistinguishable from 1
                        height = array[elem][0]
                        top = array[elem][1] + 1
                    }
                    else top = 1
                }
                else top = 1
                if (FORMAT_DEBUG >= 1) console.log("Top mode: bottom " + bottom + ", top " + top + ", height " + height + ", elem " + elem)
            }
        }
    }

    if (FORMAT_DEBUG >= 1) console.log("Polarize result: bottom " + bottom + ", top " + top + ", height " + height)
    return { bottom: bottom, top: top, height: height }
}

// Search for the value at the requested height of an ExpantaNum array,
// and return the value if it exists; otherwise return a default value.
function arraySearch(array, height) {
    for (i = 0; i < array.length; i++) {
        if (array[i][0] == height) return array[i][1]
        else if (array[i][0] > height) break
    }
    return height > 0 ? 0 : 10
}

// Search for the value at the requested height of an ExpantaNum array,
// and set it to zero if it exists.
function setToZero(array, height) {
    for (i = 0; i < array.length; i++) {
        if (array[i][0] == height) break
    }
    if (i < array.length) array[i][1] = 0
}

function format(num, precision = 2) {
    let notation = options.notation
    if (notation == 'Scientific') return scientific(num, precision)
    if (notation == 'Hyper-E') return hyperE(num, precision)
    if (notation == 'Letter') return letter(num, precision)
    if (notation == 'Emoji') return letter(num, precision, ['😠', '🎂', '🎄', '💀', '🍆', '🐱', '🌈', '💯', '🍦', '🎃', '💋', '😂', '🌙', '⛔', '🐙', '💩', '❓', '☢', '🙈', '👍', '☂', '✌', '⚠', '❌', '😋', '⚡'])
}

function scientific(num, precision = 2, small = false) {
    if (ExpantaNum.isNaN(num)) return "NaN"
    let precision2 = Math.max(4, precision) // for e
    let precision3 = Math.max(6, precision) // for F, G, H
    let precision4 = Math.max(8, precision) // for J, K
    num = new ExpantaNum(num)
    let array = num.array
    if (num.abs().lt(1e-308)) return (0).toFixed(precision)
    if (num.sign < 0) return "-" + scientific(num.neg(), precision)
    if (num.isInfinite()) return "Infinity"
    if (num.lt("0.0001")) { return scientific(num.rec(), precision) + "⁻¹" }
    else if (num.lt(1)) return regularFormat(num, precision + (small ? 2 : 0))
    else if (num.lt(1000)) return regularFormat(num, precision)
    else if (num.lt(1e12)) return commaFormat(num)
    else if (num.lt("10^^5")) { // 1e9 ~ 1F5
        let bottom = arraySearch(array, 0)
        let rep = arraySearch(array, 1) - 1
        if (bottom >= 1e12) {
            bottom = Math.log10(bottom)
            rep += 1
        }
        let m = 10 ** (bottom - Math.floor(bottom))
        let e = Math.floor(bottom)
        let p = bottom < 1000 ? precision2 : precision2 - Math.floor(Math.min((Math.log10(bottom) - 1) / 2, 4));

        if (p >= 1) m = new ExpantaNum(m).toStringWithDecimalPlaces(p)
        else m = Math.round(m)
        if (m == 10) {
            m = 1
            e += 1
        }

        let f = "e".repeat(rep) + regularFormat(m, p) + "e" + commaFormat(e)
        if (bottom >= 1e9) f = "e".repeat(rep) + "e" + commaFormat(e)
        return f
    }
    else if (num.lt("10^^1000000000")) { // 1F5 ~ F1,000,000
        let pol = polarize(array)
        let p = pol.top < 1000 ? precision3 : precision3 - Math.floor(Math.log10(pol.top)) + 2;
        return regularFormat(pol.bottom, p) + "F" + commaFormat(pol.top)
    }
    else if (num.lt("10^^^5")) { // F1,000,000 ~ 1G5
        let rep = arraySearch(array, 2)
        if (rep >= 1) {
            setToZero(array, 2)
            return "F".repeat(rep) + scientific(array, precision)
        }
        let n = arraySearch(array, 1) + 1
        if (num.gte("10^^" + (n + 1))) n += 1
        return "F" + scientific(n, precision)
    }
    else if (num.lt("10^^^1000000")) { // 1G5 ~ G1,000,000
        let pol = polarize(array)
        return regularFormat(pol.bottom, precision3) + "G" + commaFormat(pol.top)
    }
    else if (num.lt("10^^^^5")) { // G1,000,000 ~ 1H5
        let rep = arraySearch(array, 3)
        if (rep >= 1) {
            setToZero(array, 3)
            return "G".repeat(rep) + scientific(array, precision)
        }
        let n = arraySearch(array, 2) + 1
        if (num.gte("10^^^" + (n + 1))) n += 1
        return "G" + scientific(n, precision)
    }
    else if (num.lt("10^^^^1000000")) { // 1H5 ~ H1,000,000
        let pol = polarize(array)
        return regularFormat(pol.bottom, precision3) + "H" + commaFormat(pol.top)
    }
    else if (num.lt("10^^^^^5")) { // H1,000,000 ~ 5J4
        let rep = arraySearch(array, 4)
        if (rep >= 1) {
            setToZero(array, 4)
            return "H".repeat(rep) + scientific(array, precision)
        }
        let n = arraySearch(array, 3) + 1
        if (num.gte("10^^^^" + (n + 1))) n += 1
        return "H" + scientific(n, precision)
    }
    else if (num.lt("J1000000")) { // 5J4 ~ J1,000,000
        let pol = polarize(array, true)
        return regularFormat(Math.log10(pol.bottom) + pol.top, precision4) + "J" + commaFormat(pol.height)
    }
    else if (num.lt("J^4 10")) { // J1,000,000 ~ 1K5
        let rep = num.layer
        if (rep >= 1) return "J".repeat(rep) + scientific(array, precision)
        let n = array[array.length - 1][0]
        if (num.gte("J" + (n + 1))) n += 1
        return "J" + scientific(n, precision)
    }
    else if (num.lt("J^999999 10")) { // 1K5 ~ K1,000,000
        // https://googology.wikia.org/wiki/User_blog:PsiCubed2/Letter_Notation_Part_II
        // PsiCubed2 defined Jx as Gx for x < 2, resulting in J1 = 10 rather than 10^10, to
        // prevent issues when defining K and beyond. Therefore, there should be separate
        // cases for when the "top value" is below 2, and above 2.
        // ExpantaNum.js considers J1 to be equal to 1e10 rather than 10,
        // hence num.lt("J^999999 10") rather than num.lt("J^1000000 1").
        let pol = polarize(array, true)
        let layerLess = new ExpantaNum(array)
        let layer = num.layer
        let topJ
        if (layerLess.lt("10^^10")) { // Below J2: use Jx = Gx
            // layerLess is equal to (10^)^top bottom here, so calculate x in Gx directly.
            topJ = 1 + Math.log10(Math.log10(pol.bottom) + pol.top)
            layer += 1
        }
        else if (layerLess.lt("10{10}10")) { // J2 ~ J10
            topJ = pol.height + Math.log((Math.log10(pol.bottom) + pol.top) / 2) * LOG5E
            layer += 1
        }
        else { // J10 and above: an extra layer is added, thus becoming JJ1 and above, where Jx = Gx also holds
            let nextToTopJ = pol.height + Math.log((Math.log10(pol.bottom) + pol.top) / 2) * LOG5E
            let bottom = nextToTopJ >= 1e10 ? Math.log10(Math.log10(nextToTopJ)) : Math.log10(nextToTopJ)
            let top = nextToTopJ >= 1e10 ? 2 : 1
            topJ = 1 + Math.log10(Math.log10(bottom) + top)
            layer += 2
        }
        return regularFormat(topJ, precision4) + "K" + commaFormat(layer)
    }
    // K1,000,000 and beyond
    let n = num.layer + 1
    if (num.gte("J^" + n + " 10")) n += 1
    return "K" + scientific(n, precision)
}

function formatWhole(num) {
    return format(num, 0)
}

function formatSmall(num, precision = 2) { //其他记数法应该有问题
    return format(num, precision, true)
}

function formatTime(ms) {
    if (ms < 0) return "-" + formatTime(-ms)
    let str = (Math.floor(ms % 60000) / 1000).toString() + "秒";
    if (ms >= 60000) str = Math.floor(ms / 60000 % 60).toString() + "分" + str;
    if (ms >= 3600000) str = Math.floor(ms / 3600000 % 24).toString() + "小时" + str;
    if (ms >= 86400000) str = Math.floor(ms / 86400000 % 365).toString() + "天" + str;
    if (ms >= 31536000000) str = Math.floor(ms / 31536000000).toString() + "年" + str;
    return str;
}

var formatPercent = fp = function (num) {
    num = d(num)
    return format(num.times(100)) + "%"
}

function verse(x) {
    s = ExpantaNum.slog(d(x)).sub(ExpantaNum.log10(9))
    let verse1 = [2, 3, 4, 5]
    let verse2 = ["multi", "meta", "xeno", "hyper"]
    let id = 0;
    if (s.gte(verse1[verse1.length - 1])) id = verse1.length - 1;
    else {
        while (s.gte(verse1[id])) id++;
        if (id > 0) id--;
    }
    let mag = ExpantaNum.layeradd(x, -verse1[id] + 1).div(1e9)
    return [mag, verse2[id]]
}

var formatTimeLong = ftl = function (seconds) {
    seconds = d(seconds).abs()
    let years = seconds.div(31556952)
    let mlt = verse(years)
    let arv1 = [1, 1e15, 1e30, 1e45, 1e60, 1e75, 1e90, 1e105, 1e120, 1e135]
    let arv2 = ["", "mega", "giga", "tera", "peta", "exa", "zetta", "yotta", "ronna", "quetta"]
    let id = 0;
    let arch = mlt[0].logBase(1e15).floor().add(1)
    let archs = mlt[0].logBase(1e15)
    if (mlt[0].gte(arv1[arv1.length - 1])) id = arv1.length - 1;
    else {
        while (mlt[0].gte(arv1[id])) id++;
        if (id > 0) id--;
    }
    let mverse = arv2[id] + (arv2[id] != "" ? "-" : "") + mlt[1]
    if (arch.gte(11)) {
        mverse = "arch^" + formatWhole(arch) + (arv2[id] != "" ? "-" : "") + mlt[1]
        if (arch.gte(10000)) mverse = "arch" + (arv2[id] != "" ? "-" : "") + mlt[1]
    }
    if (mlt[1] == "multi") {
        mverse = arv2[id]
        if (arch.gte(11)) mverse = "arch<sup>" + formatWhole(arch) + "</sup>"
        if (arch.gte(10000)) mverse = "arch"
        if (arv2[id] == "") mverse = "multi"
    }

    let scale1 = [5.39121e-44, 1e-30, 1e-27, 1e-24, 1e-21, 1e-18, 1e-15, 1e-12, 1e-9, 1e-6, 0.001, 1, 60, 3600, 86400, 31556952, 31556952e3, 31556952e6, 31556952e9, 31556952e12, 31556952e15, 31556952e18, 31556952e21, 31556952e24, 31556952e27, 31556952e30, 31556952e40, 31556952e100]
    let scale2 = [" Planck Times", " quectoseconds", " rontoseconds", " yoctoseconds", " zeptoseconds", " attoseconds", " femtoseconds"
        , " picoseconds", " nanoseconds", " microseconds", " milliseconds", " seconds", " minutes"
        , " hours", " days", " years", " millenniums", " megaannums", " gigaannums", " teraannums", " petaannums", " exaannums", " zettaannums", " yottaannums", " ronnaannums", " quettaannums", " degenerate eras", " black hole eras"]
    let id2 = 0;
    if (seconds.gte(scale1[scale1.length - 1])) id2 = scale1.length - 1;
    else {
        while (seconds.gte(scale1[id2])) id2++;
        if (id2 > 0) id2--;
    }
    if (seconds.lt('ee9') && seconds.gt(0)) return format(seconds.div(scale1[id2])) + scale2[id2]
    if (seconds.eq(0)) return format(seconds) + " seconds"
    else if (years.lt("(10^)^6 9")) {
        if (years.gte("eee56") && years.lt("eee69")) return format(years.log10().log10().div(1e56)) + " new big bangs"
        if (years.gte("ee120") && years.lt("ee129")) return format(years.log10().div(1e120)) + " big rips"
        if (years.gte("ee9") && years.lt("(10^)^6 9")) {
            if (arch.lt(11)) return format(mlt[0].div(arv1[id])) + " " + mverse + "verse ages"
            else if (arch.lt(10000)) return format(mlt[0].div(new ExpantaNum(1e15).pow(arch.sub(1)))) + " " + mverse + "verse ages"
            else return format(archs) + " " + mverse + "verse ages"
        }
    }
    else {
        return format(d(10).pow(ExpantaNum.slog(years)).div(9e6)) + " omniverse ages"
    }
    // lodverse ages 9G6~9H6
    // meskoverse ages 9H6~6.95J5
    // godverse ages 6.95J5~
}

function slog(x) {
    return x.slog(10)
}

function letter(EN, precision = 2, str = 'abcdefghijklmnopqrstuvwxyz') { //目前只支持26长的string和array
    EN = new ExpantaNum(EN)
    let ENa = EN.abs()
    let length = new ExpantaNum(str.length)
    let prec_tswdp = Math.max(precision, 1)
    let prec2 = Math.max(precision, 2)
    if (EN.lt(0)) return "-" + letter(ENa, precision, str)
    if (ENa.lt(0.001) && ENa.neq(0)) return "1/" + letter(ENa.rec(), precision, str)
    // 1e9之前
    if ((ENa.gte(0.001) && ENa.lt(1000)) || EN.eq(0)) return regularFormat(ENa, precision, str)
    if (ENa.gte(1000) && ENa.lt(1e9)) return commaFormat(ENa, precision, str)
    // 1e9~1e15
    if (ENa.gte(1e9) && ENa.lt(1e15)) {
        let std = ["", "K", "M", "B", "T"]
        let unit = ENa.log10().div(3).floor().min(4)
        let m = ENa.div(ExpantaNum.pow(1e3, unit))
        if (m.toStringWithDecimalPlaces(prec_tswdp) == 1000) {
            m = new ExpantaNum(1)
            unit = unit.add(1)
        }
        return regularFormat(m, prec2) + " " + (unit.eq(5) ? "aa" : std[unit])
    }
    if (ENa.gte(1e15) && ENa.lt('1e16940051478339')) { //9 z's
        let unit = ENa.log10().div(3).floor()
        let m = ENa.div(ExpantaNum.pow(1e3, unit))
        if (m.toStringWithDecimalPlaces(prec_tswdp) == 1000) {
            m = new ExpantaNum(1)
            unit = unit.add(1)
        }
        unit = unit.add(22)
        let uname = ''
        while (unit.gt(0)) {
            uname = str[(unit.sub(1)).toNumber() % length.toNumber()] + uname
            unit = ExpantaNum.ceil(unit.div(length)).sub(1)
        }
        if (ENa.gte(1e15) && ENa.lt('ee9')) return regularFormat(m, prec2) + " " + uname
        if (ENa.gte('ee9') && ENa.lt('1e16940051478339')) return uname
    }
    if (ENa.gte('1e16940051478339') && ENa.lt('eeeeeee1.1220161e1414973347')) { // 1.000 B{4}, 9.150748F9, E1414973347.970818#8
        let unit = ENa.log10().div(3).floor()
        unit = unit.add(22)
        let letamt = unit.add(1).times(25).add(1).logBase(26).sub(1).ceil()
        let skipped = letamt.sub(7)
        unit = ExpantaNum.floor(unit.sub(ExpantaNum.pow(26, skipped).sub(1).div(25).times(26)).div(ExpantaNum.pow(26, skipped)))
        let uname = ''
        while (unit.gt(0)) {
            uname = str[(unit.sub(1)).toNumber() % length.toNumber()] + uname
            unit = ExpantaNum.ceil(unit.div(length)).sub(1)
        }
        if (letamt.lt(1e9)) return uname + "[" + formatWhole(letamt) + "]" // EN < ee1,414,973,348, 即[1,000,000,000]
        else return "[" + letter(letamt, precision, str) + "]"
        //unit = (26^(letamt+1)-1)/25-1
        //letamt = (unit+1)*25+1
    }
    if (ENa.gte('eeeeeee1.1220161e1414973347') && ENa.lt("(10^^)^4 2e9")) {
        let unit = ENa.log10().div(3).floor()
        let letamt = unit.add(1).times(25).add(1).logBase(26).sub(1).ceil()
        let skipped = letamt.sub(7)
        let lett = ExpantaNum.mul(1e9, ExpantaNum.log10(length))
        let s = skipped.slog(10).sub(ExpantaNum.slog(lett)).div(2).floor().add(1)
        let sl = ExpantaNum.tetrate(10, ExpantaNum.slog(skipped).sub(ExpantaNum.slog(skipped).sub(ExpantaNum.slog(lett)).div(2).floor().mul(2))).mul(ExpantaNum.logBase(10, length))
        if (ENa.lt("10^^1e9")) return letter(sl) + '{' + fw(s) + '}'
        else return '{' + letter(s) + '}'
    }
    let G
    let Glayer // H
    let H
    let Hlayer // J5
    let J5
    let J5layer
    let pol = polarize(ENa.array)
    let polJ = polarize(ENa.array, true)
    let Jm = new ExpantaNum(polJ.bottom).log(10).add(polJ.top)
    let J = new ExpantaNum(polJ.height)
    let K = new ExpantaNum(ENa.layer)
    if (ENa.gte("(10^^)^4 1e9")) {
        if (pol.height == 2) {
            if (pol.bottom >= 1.9685310449694362) G = new ExpantaNum(10).tetr(pol.bottom),
                Glayer = new ExpantaNum(pol.top - 1)
            else if (pol.bottom < 1.9685310449694362) G = new ExpantaNum(10).tetr(d(10).tetr(pol.bottom)),
                Glayer = new ExpantaNum(pol.top - 2)
            if (ENa.lt("10^^^1e9")) return letter(G) + '(' + fw(Glayer) + ', 3)'
            else return '(' + letter(Glayer, precision, str) + ', 3)'
        }
        else if (ENa.lt("(10^^^^)^4 2e9")) {
            if (pol.bottom >= 1.2941422682766681) H = new ExpantaNum(10).pentate(pol.bottom),
                Hlayer = new ExpantaNum(pol.top - 1)
            else if (pol.bottom < 1.2941422682766681) H = new ExpantaNum(10).pentate(new ExpantaNum(10).pentate(pol.bottom)),
                Hlayer = new ExpantaNum(pol.top - 2)
            if (ENa.lt('(10^^^)^4 2e9')) return '('.repeat(Hlayer) + letter(H, precision, str) + ', 3)'.repeat(Hlayer)
            else if (ENa.lt("10^^^^1e9")) return letter(H, precision, str) + '(' + fw(Hlayer) + ', 4)'
            else if (pol.height == 3) return '(' + letter(Hlayer, precision, str) + ', 4)'
            else if (pol.height == 4) J5 = new ExpantaNum(10).hexate(pol.bottom),
                J5layer = Hlayer
            return '('.repeat(J5layer) + letter(J5, precision, str) + ', 4)'.repeat(J5layer)
        }
        else if (ENa.lt("J1e9")) {
            return '(' + regularFormat(Jm, precision) + ", " + fw(J.add(1)) + ")"
        }
        else if (ENa.layer == 0) {
            return "(10, " + letter(J.add(1), precision, str) + ")"
        }
        else if (ENa.lte("JJJ9007199254740991")) {
            let Km = ENa
            Km.layer = 0
            return "(10, ".repeat(K) + letter(Km, precision, str) + ")".repeat(K)
        }
        else if (ENa.lte('J^1000000000 10')) {
            let Km = ENa
            Km.layer = 0
            return "(10, " + letter(Km, precision, str) + ", " + fw(K) + ")"
        }
        else return "(10, " + "10" + ", " + fw(K) + ")"
    }
}

function hyperE(EN, precision) {
    p = Math.max(precision, 2)
    EN = new ExpantaNum(EN)
    if (EN.sign == -1) return "-" + hyperE(EN.abs())
    if (isNaN(EN.array[0][1])) return "NaN"
    if (!isFinite(EN.array[0][1])) return "Infinity"
    if (EN.lt(1e12)) return scientific(EN, precision)
    if (EN.lt(ExpantaNum.MAX_SAFE_INTEGER)) return scientific(EN, p)
    if (EN.lt(ExpantaNum.E_MAX_SAFE_INTEGER)) return "E" + scientific(EN.array[0][1], p)
    var simplifyEN = EN
    if (EN.operator(1) >= 1e12 || EN.operator(2) >= 1e12) simplifyEN.array[0][1] = 1
    if (EN.array.length >= 3) {
        if (simplifyEN.operator(2) >= 1e12) simplifyEN.array[1][1] = 1
    }
    var l = 1
    for (var i = EN.array.length - 1; i > 0; --i) {
        if (EN.array[i][1] >= 1e12) {
            for (sim = i; sim > 0; sim--) {
                if (sim >= 3) simplifyEN.array[sim - 1][1] = 0
                else simplifyEN.array[sim - 1][1] = 1
            }
        }
    }
    var r = "E" + scientific(simplifyEN.operator(0), 0) + "#" + scientific(simplifyEN.operator(1), 0)
    if (EN.lt("10{5}10")) for (var i = Math.ceil(EN.getOperatorIndex(2)); i < EN.array.length; ++i) {
        if (l + 1 < EN.array[i][0]) r += "#1".repeat(simplifyEN.array[i][0] - l - 1);
        l = EN.array[i][0];
        r = r + "#" + scientific(simplifyEN.array[i][1] + 1, 0);
    }
    else {
        let pol = polarize(EN.array, true)
        let Jm = new ExpantaNum(pol.bottom).log(10).add(pol.top)
        let J = new ExpantaNum(pol.height)
        let Jx = J.add(Jm.div(2).logBase(5))
        let K = EN.layer
        let EN_K = EN
        EN_K.layer = EN_K.layer - 1
        let Kx = Jx.log10().add(K)
        if (K == 0) r = 'E10##' + hyperE(Jx, 6)
        else if (K < 3 && K > 0) r = 'E10##(' + hyperE(EN_K) + ')'
        else r = 'E10##1#' + hyperE(Kx, 6)
    }
    return r;
}

/*function letter(EN, precision, str = 'abcdefghijklmnopqrstuvwxyz') { //AD NG+++
    EN = new ExpantaNum(EN)
    let len = new ExpantaNum(str.length);
    let ret = ''
    let power = EN.log10().div(3).floor()
    let m = EN.div(ExpantaNum.pow(1e3,power))
    if (m.toStringWithDecimalPlaces(precision) == 1000) {
        m = new ExpantaNum(1)
        power = power.add(1)
    }
    let skipped = ExpantaNum.floor(ExpantaNum.log10(power.mul(len.sub(1)).add(1)).div(ExpantaNum.log10(len))).sub(7)
    if (skipped.lt(4)) skipped = new ExpantaNum(0)
    // (power - () / (len - 1) * len) = ExpantaNum.floor(power.sub(ExpantaNum.pow(len,skipped).sub(1).div(len.sub(1)).mul(len)).div(ExpantaNum.pow(len,skipped)))
    else power = ExpantaNum.floor(power.sub(ExpantaNum.pow(len,skipped).sub(1).div(len.sub(1)).mul(len)).div(ExpantaNum.pow(len,skipped)))
    while (power.gt(0)) {
        ret = str[(power.sub(1)).toNumber() % len.toNumber()] + ret
        power = ExpantaNum.ceil(power.div(len)).sub(1)
    }
    if (isNaN(skipped.sign)||isNaN(skipped.layer)||isNaN(skipped.mag)) skipped = new ExpantaNum(0)
    skipped = skipped.add(7)
    let lett = ExpantaNum.mul(1e9,ExpantaNum.log10(len))
    let s = ExpantaNum.slog(skipped).sub(slog(lett)).div(2).floor().add(1)
    let sl = ExpantaNum.tetrate(ExpantaNum.slog(skipped).sub(ExpantaNum.slog(skipped).sub(slog(lett)).div(2).floor().mul(2)),10).mul(ExpantaNum.logBase(10,len))
    if (EN.layer >= 1e9) return '{'+formatWhole(s)+'}'
    if (EN.gte(ExpantaNum.tetrate(ExpantaNum.slog(lett).add(8),10))) return format(sl)+'{'+formatWhole(s)+'}'
    if (skipped.gte(1e9)) return "["+letter(skipped, precision, str)+"]"
    if (skipped.gt(7)) ret += "[" + commaFormat(skipped, 0) + "]"
    if (EN.gte("ee9")) return ret
    if (EN.gte(1e9)) return m.toStringWithExpantaNumPlaces(precision)+' '+ret
    if (EN.mag >= 1e3) return commaFormat(EN, 0)
    if (EN.mag >= 0.001) return regularFormat(EN, precision)
    if (EN.sign!=0) return '1/'+letter(EN.reciprocate(),precision,str)
    return regularFormat(EN,precision)
}*/

var formatExtremeSmallNum = fesn = function (num, precision = 2) { //伪装成极小数，ExpantaNum.js不支持像break_eternity.js那样的绝对值不为0且小于5e-324的极小数
    num = new ExpantaNum(num)
    let precision2 = Math.max(4, precision)
    if (num.abs().gte(1e-308) && num.abs().lt(1000)) return format(num.rec(), precision)
    if (num.abs().gte(1000) && num.abs().lt("10^^5")) {
        if (options.notation != 'Scientific') return format(num, precision) + "⁻¹"
        else {
            let array = num.array
            let bottom = arraySearch(array, 0)
            let rep = arraySearch(array, 1) - 1
            if (bottom >= 1e12 || num.lt(Number.MAX_SAFE_INTEGER)) {
                bottom = Math.log10(bottom)
                rep += 1
            }
            let m = 10 ** (bottom - Math.floor(bottom))
            let mr = m
            if (m != 1) mr = 10 / m
            let e = Math.floor(bottom)
            let er = e
            if (m != 1) er = e + 1
            let p = bottom < 1000 ? precision2 : precision2 - Math.floor(Math.min((Math.log10(bottom) - 1) / 2, 4));
            let f
            if (rep == 0) {
                if (bottom <= 1e9) f = regularFormat(mr, p) + "e-" + commaFormat(er)
                if (bottom > 1e9) f = "e-" + commaFormat(er)
            }
            else {
                if (bottom <= 1e9) f = "e-" + "e".repeat(rep - 1) + regularFormat(m, p) + "e" + commaFormat(e)
                if (bottom > 1e9) f = "e-" + "e".repeat(rep - 1) + "e" + commaFormat(e)
            }
            return f
        }
    }
    else if (num.abs().gte("10^^5")) return format(num, precision) + "⁻¹"
}

function roman(num) { //附魔等级，显示1~3999级，4000+正常显示
    num = new ExpantaNum(num)
    if (num.gte(4000) || num.lte(0)) return "Lv." + formatWhole(num)
    let n = num.toNumber()

    let k = Math.floor(n / 1000)
    let h = Math.floor(n / 100) % 10
    let d = Math.floor(n / 10) % 10
    let m = n % 10
    
    let kr = "M".repeat(k)
    let hr
    if (h == 9) hr = "CM"
    else if (h >= 5) hr = "D" + "C".repeat(h - 5) 
    else if (h == 4) hr = "CD"
    else hr = "C".repeat(h)
    let dr
    if (d == 9) dr = "XC"
    else if (d >= 5) dr = "L" + "X".repeat(d - 5)
    else if (d == 4) dr = "XL"
    else dr = "X".repeat(d)
    let mr
    if (m == 9) mr = "IX"
    else if (m >= 5) mr = "V" + "I".repeat(m - 5)
    else if (m == 4) mr = "IV"
    else mr = "I".repeat(m)

    let r = kr + hr + dr + mr
    return r
}