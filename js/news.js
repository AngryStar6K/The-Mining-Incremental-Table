var textlength = 50
var texts =
    [
    "欢迎来到挖矿增量！",
    "你为什么不去尝试一下马造2树呢？",
    "原作者AngrySrar6K正在使用角色奇诺比珂通过终点",
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
    "200 400 800 1000 2000 4000 8000 1UP 1UP 1UP",
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
    "<span style=\"color:#222;text-shadow: 1px 1px 2px #222, -1px -1px 2px #444, 0 0 24px #666\">\n 看不到我，嘿嘿！</span>"
    ]
var nt = ""
var ntl = 0
var p = 50 + document.body.clientWidth
var l = -50
var newsTimer = setInterval(function () {
    if (player.tab == 'info-tab' || player.tab == 'changelog-tab' || player.tab == 'options-tab') return;
    p -= 2
    if (p <= l || nt == "") {
        nt = texts[Math.floor(Math.random() * texts.length)]
        newsText.style.width = (newsText.innerText.length * 16).toString() + "px"
        l = -100 - (nt.length * 16)
        p = 50 + document.body.clientWidth
    }
    ntl = p.toFixed(1)
}, 10)
