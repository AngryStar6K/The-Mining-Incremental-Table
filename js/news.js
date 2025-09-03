var textlength = 147
var texts =
    [
        "欢迎来到挖矿增量！",
        "你为什么不去尝试一下马造2树呢？",
        "原作者AngryStar6K正在使用角色奇诺比珂通过终点",
        "你或许已经玩了很久了，如果你继续玩的话你父母可能会直接闯进你的房间催你睡觉。还有，记得导出存档。",
        `有一位玩家尝试把1.7976e308的木头从游戏中带到现实，幸好这是不可能实现的。`,
        "点击这条新闻并不会发生什么事。",
        "5小时后不一定更新",
        "↑↑↓↓←→←→BA",
        "你知道吗？Grahal，即G(1)在此记数法写作GF7.6255e12",
        "马力欧敲击了一个？砖块出了一个超级蘑菇。",
        "马力欧敲击了一个？砖块出了一条大型红色泡泡鱼，不好！",
        "加油吧！  输掉了……  请到这边来！",
        "本游戏的资源并不会像无尽贪婪一样以几千方块的数量就能合成奇点，在这里会贵得多。",
        "无论是软上限、软上限^2、软上限^3……软上限^8、溢出、溢出^2，本质上都是软上限。",
        "本游戏的残局并不是在‘强化疫苗’中得到1.1981F7病例。",
        "1e903是1 Trecentillion，1e312是1 Trescentillion。它们之间差了一个s，但是缩写就是1 Tc和1 TCe了。",
        "你有1.000e9.000e15反物质。啊不是，走错了。",
        "不可思议 adj. incredible, num. ten vigintillion",
        "200 400 800 1000 2000 4000 8000 <span style=\"color:#00ff00\">1UP 1UP 1UP</span>",
        "你当前不在反物质宇宙中。", //20
        "ExpantaNum.js: 我可以表示10{{1}}9e15！我是最大的！     PowiainaNum.js: 你好，我可以表示{10, 9e15, 1, 1, 1, 2}",
        `路易吉什么都没做就取得了胜利。这就是“路易不动定律”`,
        "5小时后更新，但是你在EC12里",
        "合金机制是被简化了的，不然完全可以将3铜锭熔融为432mB的熔融铜再将1锡锭熔融为144mB的熔融锡，然后合金为576mB熔融青铜，最后通过浇筑在锭铸模上凝固为4青铜锭。没错这是匠魂2",
        "break_infinity.js的上限是e1.798e308，break_eternity.js的上限是F1.798e308。那么是否存在break_reality.js，并且其上限是G1.798e308？",
        "你有了无敌星就会本能地向前冲",
        "你有猫你就会本能地向上爬",
        "超级折算|直尺 0'''''''''1'''''''''2'''''''''2.414'''''''''2.732'''''''''3",
        "无限、永恒、现实、毁灭的现实；转生、超越、转世、飞升、奇点",
        "这是一场超级马力欧派对：空前盛会的对局 回合15/15。你：7星星120金币；马力欧：4星星0金币；害羞幽灵：2星星177金币；罗莎塔：1星星64金币。罗莎塔掷出了9点，加上超级蘑菇的效果，走了14步，踩到了机会格。Chance time! 机会格最终导致了你和害羞幽灵的星星交换！你失去了5颗星星，害羞幽灵得到了5颗星星。",
        "这里是2024年度马造树层级评选现场。普通耐力挑战层级挺不错吧，其中复现了超级马力欧兄弟3的终点；奇诺比奥层级也许，十九重奇诺比奥阶层到v0.11版本终点还在输出；大师之剑层级也算是最早的多玩法层级了。我去，隐藏成就层级？",
        "1只羊、2只羊、3只羊、4只羊、5只羊、1.7976e308只羊，嗯？",
        `当前版本有${textlength}条不同的新闻，你也可以在更新日志里看到`,
        "新闻刷新是完全随机的，所以你有可能会连续两次刷到同一条新闻",
        "哈哈哈哈哈哈哈哈嗝",
        "LV、MV、HV、EV、IV、LuV、ZPM、UV、UHV、UEV、UIV、UMV、UXV",
        "你看到过这条新闻，至少你现在看到过了",
        "马力欧空中跳起，然后空中调整速度，然后空中使其水平速度在代码层面严格为0，你现在学会了绝对零度跳，快来逝一逝吧！",
        "⑨",
        "第⑨维度不存在", //40
        "蓝色的奇诺比奥是大聪明，那么红色的奇诺比奥是？",
        "《解谜》《多人对战》",
        "你的鲨鱼吃掉了0鱼，因为这里没有一条鱼",
        "一拳干爆 1 arv^500 的石头",
        "Who asked?",
        "如果这是一条真新闻，那么这是一条假新闻",
        "此记数法最长的数字是JJJHHHGGGFFFeee100,000,000,000。哇是真的长",
        "1.000 OcNnScIc-SxSeScEnc-SxSeScOtc-SxSeScHpc-SxSeScHec-SxSeScPec-SxSeScTec-SxSeScTrc-SxSeScDuc-SxSeScMec-SxSeScVec-SxSeScXn-SxSeScYc-SxSeScZp-SxSeScAt-SxSeScFm-SxSeScPc-SxSeScNa-SxSeScMc-SxSeScMi-QtSeSc",
        "10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10</sup></sup></sup></sup></sup></sup></sup></sup></sup></sup>看看可以叠多高",
        "<span style=\"color:#222;text-shadow: 1px 1px 2px #222, -1px -1px 2px #444, 0 0 24px #666\">\n 看不到我，嘿嘿！（什么？你看到了？你是不是用其他主题了？好吧你赢了）</span>",
        "这条新闻你只能在2025年或者之后才能看见，因为这条新闻就是在2025年1月1日写的",
        "请输入新闻文本",
        "呼呼！你的GTNH机械跳电了！",
        "EnOtcOHtIka'-MePCnTeHNeDa'-HeHCnHHeYoDa'-HeHCnHHeZeDa'-HeHCnHHeExDa'-HeHCnHHePeDa'-HeHCnHHeTeDa'-HeHCnHHeTrDa'-HeHCnHHeDoka'-HeHCnHHeHna'-HeHCnHHeDka'-HeHCnHHeXea'-HeHCnHHeYta'-HeHCnHHeZta'-HeHCnHHeExa'-HeHCnHHePta'-HeHCnHHeTera'-HeHCnHHeGia'-HeHCnHHeMga'-HeHCnHHeKla'-HeHCnHHe",
        "log对应^，slog对应^^，那么什么对应^^^？",
        "请说出接下来的词的颜色         <span style=\"color:red\">绿色</span> <span style=\"color:yellow\">红色</span> <span style=\"color:magenta\">灰色</span> <span style=\"color:cyan\">紫色</span> <span style=\"color:grey\">黄色</span> <span style=\"color:pink\">橙色</span>",
        "葛立恒函数的增长率是ω+1，TREE函数的增长率是φ(ω@ω)。天差地别，不要拿葛立恒函数嵌套来碰瓷TREE函数。",
        "所以说挖矿增量能不能到K9.0000e15？",
        "<span onclick=\"player.tab = 'statistics'\" style=\"color:#0080ff\">点此</span>查看你的统计数据，但是你可以直接在左侧层级栏点击“统计数据”",
        "<a href=\"https://www.bilibili.com/video/BV1GJ411x7h7\" target=\"_blank\" style=\"color:#0080ff;text-decoration:underline\" onclick=\"player.achievements.SA6 = true; window.open(this.href, '_blank'); return false;\">点此</a>到达挖矿增量版本终点", //60
        "那我问你",
        "I块！没有你我怎么活啊！(Game Over)",
        "<span style=\"color:#31b282\">I</span> <span style=\"color:#5239ce\">J</span> <span style=\"color:#b46432\">L</span> <span style=\"color:#b39931\">O</span> <span style=\"color:#83b332\">S</span> <span style=\"color:#a43d9a\">T</span> <span style=\"color:#b3333a\">Z</span>",
        "Unfamilar item: 你需要达成一定的进度才能解锁这个物品。说的就是你，黑曜石！水和熔岩接触时会生成黑曜石，但是解锁水和熔岩就获得黑曜石就是跳科技了！",
        "一组=64、一（潜影）盒=1728、一箱盒=46656、一大箱盒=93312。生电玩家的单位 “才几个大箱盒啊，根本不够用”",
        "——————————袭击——————————",
        "突击检查！你的同伴符文还在吗？",
        "加纳",
        "<span style=\"color:#a43d9a\">T-SPIN</span> DOUBLE &emsp;&emsp; <span style=\"color:#a43d9a\">T-SPIN</span> DOUBLE &emsp;&emsp; QUAD &emsp;&emsp; <span style=\"color:#b3333a\">MINI Z-SPIN</span> SINGLE &emsp;&emsp; B2B x 3",
        "你还在这里吗？",
        "FLOOR 1 HALL OF BEGINNINGS, FLOOR 2 THE HOTEL, FLOOR 3 THE CASINO, FLOOR 4 THE ARENA, FLOOR 5 THE MUSEUM, FLOOR 6 ABANDONED OFFICES, FLOOR 7 THE LABORATORY, FLOOR 8 THE CORE, FLOOR 9 CORRUPTED, FLOOR 10 PLATFORM OF GODS",
        "!!!!",
        "<a href=\"https://angrystar6k.github.io/The-Mario-Maker-2-Tree\" target=\"_blank\" style=\"color:#0080ff;text-decoration:underline\" onclick=\"; window.open(this.href, '_blank'); return false;\">点此</a>游玩作者的另一个增量游戏作品：The Mario Maker 2 Tree",
        "如果你第一次在存储够1小时的离线时间后打开100x游戏速度会有惊喜",
        "挖矿增量页暂无QQ群，但是有模组页QQ群，可以去信息页面找到",
        "经验到F1.0000e309后才能发挥ExpantaNum.js的价值，虽然还很远，但是迟早会到的（v0.8加入，到了后会修改）",
        "超大Spike",
        "你说得对，但是《挖矿增量》是由AngryStar6K制作的一款增量模组页游戏，使用Shinwmyste制作的模组页模板v3.0.10.0，并作了些许魔改。游戏发生在一个被称作「挖矿宇宙」的幻想世界，在这里，被创世之神选中的人将被给予「增量之力」，在挖矿宇宙中推进科技、魔法以及冒险进度，遇到各种见过和没见过的材料，获得指数膨胀甚至超过指数塔膨胀的资源——同时，逐步发掘「挖矿」的真相",
        "1.00000000L10经验怎么样，够多吗？ExpantaNum.js吃不下了",
        "为什么有时运附魔没有抢夺附魔？我不到啊！", //80
        "忠告：不要在家附近玩神秘时代",
        "SUSpicious sand",
        "自己喜欢的就是最好的",
        "如果遇到bug可以去github提issue，这才是正确的反映bug的方式，而不是[数据丢失]",
        "如果说无尽之锭就是这个游戏的最终版本终点，那么做到这里的时候得保证经验增长率到ω+1，否则需要延长或者等新大数库。",
        "有生之年系列：挖矿增量页集齐元素周期表",
        "植物魔法是科技mod",
        "请将下列事件按发生顺序排序 1、暮色森林更新终焉城堡最终BOSS；2、深渊国度更新高版本；3、GTA6发售；4、RE-LOGIC更新Terraria1.4.5；5、IMR更新v0.8正式版；6、五小时后",
        "1.21.9？不是吧！",
        "购买末地外岛一环的房子是否会比末地外岛二环的房子需要更多的末影珍珠？末地外岛三万环的房子会不会白送都没有末影人要？",
        "Mek纸箱 绝对的神",
        "懒人厨房水槽 唯一真神",
        "不做重置的层级那是否仍能被称为层级",
        "战斗，爽",
        "经验增长一小时.mp4",
        "唉，又是吃四碗",
        "鱿型！",
        "发生连接错误",
        "把标准记数法拓展到K9.0000e15是灾难性的，因为根本没有对应的词",
        "恭喜你遇到了第100条新闻！", //100
        "预言石上血痕现，星河倒悬月无光。莫问何处寻生路，轮回尽头万物殇。",
        "+100.00% Happiness Yay!",
        "player.devSpeed = 1.7976e308",
        "机心爆爆爆",
        "硬重置的二次确认被改成了输入特定文本确认",
        "很遗憾，挖矿增量的资源不能带进地球online",
        "做一个树游戏的门槛已经低到会一点英语阅读能力看docs就可以了，如果你看不懂建议重修九年义务教育",
        "奇诺比奥的蘑菇头不是帽子，这是他们的头",
        "马力欧顶问号砖是用的拳头，不是头",
        "目标：2027年前做到1H1000",
        "J的增长率是ω、K的增长率是ω+1、L的增长率是ω+2 但是M的增长率是ω2、N的增长率更是直接冲上了ω<sup>2</sup> 那么该怎么表示f<sub>ω3+1</sub>(100)这类的数？ 方法1：Ord(ω3+1)100 但是极端情况可能数字显示会变得极其长，例如...Ord(ω<sup>2</sup>+1)Ord(ω<sup>2</sup>+1)Ord(ω<sup>2</sup>+1)NNNOrd(ω3+3)Ord(ω3+3)Ord(ω3+3)Ord(ω3+2)Ord(ω3+2)Ord(ω3+2)Ord(ω3+1)Ord(ω3+1)Ord(ω3+1)Ord(ω3)Ord(ω3)Ord(ω3)Ord(ω2+3)Ord(ω2+3)Ord(ω2+3)Ord(ω2+2)Ord(ω2+2)Ord(ω2+2)Ord(ω2+1)Ord(ω2+1)Ord(ω2+1)MMMOrd(ω+3)Ord(ω+3)Ord(ω+3)LLLKKKJJJHHHGGGFFFeee10,000,000,000。也许需要平衡数字显示的精度。方法2：直接显示快速增长层级记数法 众所不周知f<sub>ω</sub>(4)≈2J4 = 1H10，是约等于而不是等于。容易产生误差，和之前记数法不统一。",
        "作者会给对挖矿增量做出重要贡献者加入到特别感谢名单。感谢为挖矿增量提供帮助的玩家们！",
        "RnJlZSByZWRlZW0gY29kZTogbWluaW5naW5jcmVtZW50YWxzb2dvb2Q=",
        ":thonk:",
        "[Neuro sama动态表情包_比心]",
        "Ciallo～(∠・ω<)⌒☆",
        "0d000721",
        "挖矿增量能否能够完成添加一千条新闻的壮举呢？",
        "如果出来了一个增长率能到BHO的大数库那么以此做的增量游戏能卡死",
        "本游戏的大部分Qol都需要一个叫做红石通量的东西来维持，一切生活的便利都需要付诸努力", //120
        "还是PVP大佬 &emsp;&emsp; 又或是起床大佬 &emsp;&emsp; 还是PVP大佬 &emsp;&emsp; 还是PVP大佬 &emsp;&emsp; 又或是红石大佬 &emsp;&emsp; 还是PVP大佬 &emsp;&emsp; 还是PVP大佬 &emsp;&emsp; 还是PVP大佬 &emsp;&emsp; 又或是什么都不知道的小白 &emsp;&emsp; 还是PVP大佬 &emsp;&emsp; 还是PVP大佬 &emsp;&emsp; 还是PVP大佬 &emsp;&emsp; 还是PVP大佬 &emsp;&emsp; 还是PVP大佬 &emsp;&emsp;......&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;还是PVP大佬",
        "你现在不能休息，周围有PVP大佬在游荡",
        "把企鹅丢进匠魂炉会产生熔融企鹅，将其浇入锭铸模产生企鹅锭，这存在于某mod中，太可怕了",
        "软上限是平衡的工具，但使用不慎可能会影响游戏正常推进",
        "层级解锁顺序不代表强度顺序。你可以或者将看到的是锌和银大约解锁顺序为第15左右，但是有个东西叫锌银合金，这玩意的解锁顺序在第85左右。没错，他大约是第85个矿锭/材料/宝石层级，在它之前有一堆超模怪",
        "新闻里隐藏着一个免费兑换码哦~你能发现吗？",
        "前面忘了，中间忘了，后面忘了……我要说什么来着？",
        "SUPERCHARGED BOOOOOOOM~!!!!",
        "♿️冲！冲刺！♿️",
        "Wait what?",
        "太美丽了，星门",
        "meow meow lol",
        "current_news_content = current_news_content.replace(/滚木/g, \"\")",
        "AAAAUUUUUUGGGGGGGHHHHHHHH!!!!",
        function () { return "才" + fw(player.points) + "经验，太小了吧！" },
        function () { return "现在是" + new Date },
        function () { let r = Math.ceil(Math.random() * 10); return "你掷出了一个骰子，掷出了" + fw(r) + "点" + (r > 6 ? "&emsp;&emsp;诶？怎么还能比6还大的？但是马里奥派对的骰子是这样的，哦对，是我忘了说了这是马里奥派对" : "") },
        "能全程使用标准记数法通关挖矿增量的也是神人了",
        "successor, addition, multiplication, exponentiation, tetration, pentation, hexation, heptation... ... ... expansion, multiexpansion, powerexpansion, expandotetration... ... ... explosion, multiexplotion, powerexplotion... ... ... detonation, multidetonation... ... ...",
        "反物质猫猫抓手.gif", //140
        "如果有人问你10爆炸10是多少，你可以回答他10{{{1}}}10，或者~f_ω2+1(10)",
        "Veblen序数到BHO就结束了，再往后就是OCF的世界",
        function () { return "你一共解锁了" + fw(player.stories.storyUnlocked) + "幕的剧情" },
        function () { return "你一共吃了" + fw(player.StevesLavaChicken) + "只熔岩烤鸡" + (tmp.obsidian.layerShown ? (player.StevesLavaChicken.gte(1) ? "。La-la-la-lava, chi-chi-chi-chicken~" : "。你没吃过？但是黑曜石层级有时候会有鸡乱跑，你可以去狩猎一下") : "。熔岩烤鸡是什么，挖矿增量不是没有饥饿值设定吗？") },
        "挖矿增量一定要有矿！\\o/\\o/\\o/",
        "Hyper meaning high. Glyc from gloucose meaning sugar. And -emia meaning presence in blood.",
        "点击这条新闻就能将经验获取变为原来的1J13/10倍！ &emsp;&emsp; &emsp;&emsp; &emsp;&emsp;... ... ... &emsp;&emsp; &emsp;&emsp; &emsp;&emsp;... ... ... &emsp;&emsp; &emsp;&emsp; &emsp;&emsp;你想说为什么没反应吗？并不是因为没有生效，是因为1J13 = 10，所以你的经验获取压根就没变。J13写成aJx的形式是2J13而不是1J13，2J13 = 10^^^^^^^^^^^^^10",
    ]
var nt = ""
var ntl = 0
var p = 50 + document.body.clientWidth
var l = -50
/*var newsTimer = setInterval(function () {
    if (player.tab == 'info-tab' || player.tab == 'changelog-tab' || player.tab == 'options-tab') return;
    p -= 7.5
    if (p <= l || nt == "") {
        nt = texts[Math.floor(Math.random() * texts.length)]
        //nt = texts[62]
        //测试用
        newsText.style.width = (newsText.innerText.length * 16).toString() + "px"
        l = -50 - (nt.length * 16)
        p = 50 + document.body.clientWidth
    }
    ntl = p.toFixed(1)
}, 50)*/
var lastTime = performance.now();
var invl = 50; // 目标间隔时间（毫秒）

function updateNews() {
    var currentTime = performance.now();
    var deltaTime = currentTime - lastTime;

    if (deltaTime >= invl) {
        lastTime = currentTime - (deltaTime % invl); // 修正时间偏差

        if (player && newsText) {
            if (player.tab == 'info-tab' || player.tab == 'changelog-tab' || player.tab == 'options-tab') return;
            p -= 7.5;
            if (p <= l || nt == "") {
                let chosen = Math.floor(Math.random() * texts.length)
                nt = (typeof texts[chosen] === 'function' ? texts[chosen]() : texts[chosen]);
                newsText.style.width = (newsText.innerText.length * 16).toString() + "px";
                l = -50 - (nt.length * 16);
                p = 50 + document.body.clientWidth;
            }
            ntl = p.toFixed(1);
        }
    }

    requestAnimationFrame(updateNews);
}

requestAnimationFrame(updateNews);
