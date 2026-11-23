/**
 * The commissioner's notes to the league, keyed by the week whose page shows
 * them. This is the file the commissioner edits each week; LeagueMessage
 * renders whichever note matches the week being viewed, and a week with no
 * note simply shows none rather than an old one shouting about a week gone by.
 *
 * Every fact in a note is checked against the real schedule and the real
 * results before it is published: a made-up stat in a note to the whole family
 * would be found out by Sunday lunch. The callout's deadline is asserted
 * against the schedule by notes.test.ts.
 *
 * Other people's picks for a week stay hidden until that week locks, so a note
 * published before the lock never names anyone's pick for that week.
 */
export interface LeagueNote {
  heading: string
  /** Paragraphs, in order. */
  lines: string[]
  /**
   * The instruction that costs a life if missed — where to send a pick, when it
   * locks, what missing costs — set apart from the banter so nobody skims past it.
   */
  callout?: string
  /**
   * Post this note before the previous week is officially over: as soon as
   * every pick in that week has a result, even if games nobody picked (say,
   * Monday night) are still to be played. See noteWeekFor.
   *
   * Only for a note written before its own week locks (a recap and preview),
   * so it must not name anyone's pick for its own week.
   */
  postEarly?: boolean
}

/**
 * Week 7, after the lock. It names every pick, so it replaced the welcome note
 * (and its "text me before 7:10" callout) only once the week had locked.
 */
const WEEK_7_PICKS: LeagueNote = {
  heading: 'Word from the commissioner',
  lines: [
    'The picks are in, and the crow that lives at the top of this page has started taking notes. He doesn’t say much. He doesn’t need to. He just looked at the Steelers line and tilted his head.',
    'Let’s start with the Harkovs. Michele, Steve, Jordan and Eli: four Harkovs, one team, one 8:30 Sunday morning kickoff in New Orleans. A third of this league is riding on a breakfast game. Aaron looked at the family plan, said “no thank you,” and took the Jets. Aaron, either you know something or the group chat is about to get very quiet.',
    'Now, Eden. Eden is a Bears fan. Everybody knows Eden is a Bears fan. And yet, with a life on the line, Eden picked the 49ers, the home team of Aunt Michele, Uncle Steve, and cousins Jordan, Aaron and Eli. A lovely gesture, except not one of those five picked the 49ers themselves. Eden is backing the Harkovs’ team harder than the Harkovs are. Somebody in that house owes Eden dinner.',
    'Then there’s Orit, who married my brother Eyal. Eyal bleeds navy and orange. Orit picked the Patriots. To beat the Bears. Tonight. In Chicago. In the first game of the week, so the whole house finds out before dessert. And Eyal, the die-hard? He took the Panthers. So nobody in that marriage trusted Chicago this week, but only one of them will be openly cheering against it from the couch. The crow respects it. He has also asked whether Orit has somewhere else to sleep tonight.',
    'Everyone else: Karin on the Vikings, Robin on the Browns, Tzvi on the Broncos, and your commissioner on the Texans. Twelve players, nine teams, and not a single one of you picked the Bears, including both Bears fans. Chicago, I’m sorry. Even your own people are on the run.',
    'Remember, you have two lives. Lose one this week and you’re still in it, just with a worse seat and a crow watching you a little more closely.',
  ],
  callout:
    'Your week 7 pick locked at 7:10 PM Thursday, so it’s out of your hands now. Next week works the same way: text me your pick before the lock, and a missed pick still costs a life.',
}

/**
 * Week 8, after the lock. It names every pick, so it replaced the week 7
 * recap only once the week had locked. Records and kickoffs checked against
 * the ESPN scoreboard.
 */
const WEEK_8_PICKS: LeagueNote = {
  heading: 'Word from the commissioner',
  lines: [
    'The picks are in, and the crow is bored. He was promised chaos. Instead, seven of the twelve of you picked the same team, which is the first thing this family has agreed on since the group chat was created.',
    'Cincinnati hosts Tennessee on Sunday at noon, and seven of you are on it: me, Steve, Michele, Jordan, Robin, Tzvi and Orit. That’s not a survivor pick, that’s a carpool. The Bengals are 4–2. The Titans are 1–6. On paper it’s the safest game of the week, which is exactly what Houston looked like last week, and we all know how that went. Orit and I are both on our last life, so if Cincinnati trips, two of us are out and five more are down to their last one. If you see me in a Bengals jersey on Sunday, no you didn’t.',
    'Over in the HP Israel household, the couple split for the second week running, which at this point is less a strategy and more a tradition. Orit joined the carpool. Eyal, still refusing to pick his own Bears, took Jacksonville (4–2) at home against Indianapolis (2–5), the same Colts that Karin’s Vikings beat last week. And Karin looked at the Patriots, the team that cost her mother a life seven days ago, and said “I can fix them.” New England is 4–3 and plays at Miami (1–5) on Sunday afternoon. If it works, Karin wins the next family dinner. Robin and Tzvi joined the Bengals carpool, presumably in the same car.',
    'The Harkovs, last week a united front of four Steelers, have splintered. Steve, Michele and Jordan joined the carpool. Eli went his own way with Green Bay (4–3), at home against Carolina (3–3) tonight, the same Carolina that turned it over four times last week and cost Uncle Eyal a life. So Eli finds out first, and the rest of us get to watch. Aaron, true to form, went solo again and took Buffalo (5–1) at home against Baltimore. Aaron, last week your solo run cost you a life, and you’re on your last one. Most people would take the hint. The crow respects that you didn’t.',
    'Eden, a Bears fan who backed the 49ers last week, has now picked the Cowboys. Dallas (3–4) hosts Arizona (2–5) on Sunday. That’s two weeks in a row of picking a team nobody in Chicago is allowed to like. The crow has questions.',
    'Which brings us to the Bears. They’re 5–2, they play at Seattle on Monday night, and for the second week in a row not one of you picked them. That includes every Bears fan in this family, which is most of it. Chicago, I’m sorry again.',
    'Five of you are on your last life: me, Orit, Eyal, Eden and Aaron. The other seven still have two. The crow has sharpened his pencil. Enjoy Sunday.',
  ],
  callout:
    'Your week 8 pick locked at 7:10 PM Thursday, so it’s out of your hands now. Next week works the same way: text me your pick before the lock, and a missed pick still costs a life.',
}

/**
 * Week 9, after the lock. It names every pick, so it replaced the week 8
 * recap only once the week had locked. Records and kickoffs checked against
 * the ESPN scoreboard.
 */
const WEEK_9_PICKS: LeagueNote = {
  heading: 'Word from the commissioner',
  lines: [
    'The picks are in, and this week the crow has company. Five of you picked an animal, four of you picked the 49ers, and two of you picked people. The crow has asked to be moved to a quieter page.',
    'Let’s start with the Harkovs, who have gotten the band back together. In Week 7 it was four Harkovs on the Steelers. This week it’s Steve, Michele, Eli and Jordan, all on San Francisco, at home against the Raiders on Sunday afternoon. For Michele, our half-49ers, half-Bears fan, this is a big day: the 49ers at 3:25, the Bears at 7:20, and for one Sunday her heart is whole. Eden backed the Harkovs’ 49ers back in Week 7 and lost a life for it. Now the Harkovs are finally backing them too. Eden would like it on the record that she was early.',
    'And Aaron? Aaron has now left the family plan three weeks running. This time he took the Rams at Washington, which means his new family plan is with his cousin Karin. Karin, undefeated so far, did not ask for a Harkov. She has one now.',
    'Over in the HP Israel household, the zoo is open. Orit, who picked the Bengals last week because of the family cat, has moved on to her other love, horses, and took the Broncos. Denver plays at Carolina. The Panthers. So on Sunday, Orit’s horse takes on a cat. Zoey has been informed, and her assistant commissioner title is under review. Eyal took the Lions at Miami, so that’s a cat too, and the third straight week the couple went different ways. And Robin took Jacksonville, the team her dad rode to a 42–7 win last week, which makes her the first of us to find out: the Jaguars play at Baltimore tonight.',
    'Robin’s husband Tzvi, meanwhile, took the Cowboys, the same Cowboys who knocked Eden out of the league last Sunday. Dallas plays at Indianapolis. The Colts. Horses. So on Sunday, Orit is riding a horse and her son-in-law is trying to beat one. Thanksgiving is going to be interesting.',
    'Your commissioner took Kansas City, at home against the 2–6 Jets. Yes, those Jets, who cost Aaron a life in Week 7. I’m on my last life, so I went with the most boring pick on the board. Don’t judge me. Judge Eyal.',
    'And the Bears? They’re 6–2, they host Tampa Bay on Sunday night, and for the third week in a row nobody picked them. At this point it’s not an oversight, it’s a family tradition. The crow has started wearing navy and orange out of pity.',
    'Four of you are on your last life: me with a Chief, Orit with a horse, Eyal with a cat, and Aaron with a Ram and his cousin. Everyone else still has two. Robin, good luck tonight. We’ll all be watching, and Eyal will be rooting for whatever helps Eyal.',
  ],
  callout:
    'Your week 9 pick locked at 7:10 PM Thursday, so it’s out of your hands now. Next week works the same way: text me your pick before the lock, and a missed pick still costs a life.',
}

/**
 * Week 10, after the lock. It names every pick, so it replaced the week 9
 * recap only once the week had locked. Records and kickoffs checked against
 * the ESPN scoreboard.
 */
const WEEK_10_PICKS: LeagueNote = {
  heading: 'Word from the commissioner',
  lines: [
    'The picks are in, and for the first time this season, all eleven of you sent yours without a single reminder. Not one nudge. Last week I said the reminders might stop, and apparently that’s all it took. Karin, Steve and Eyal, that’s four weeks in a row. Everyone else: see? You could do it all along. The crow had been practicing his reminder voice all week and never got to use it. He’s filed a second complaint.',
    'Let’s start with the Harkovs, who are back together, mostly. Steve, Jordan and Eli are on the 7–1 Bills, at the 2–7 Jets on Sunday at noon. Michele is on the Bills too, though she took the scenic route. She asked for the Bengals first, found out she’d already used them in Week 8, and then, completely on her own, landed on the exact same team as her husband, her son and her daughter. Pure coincidence. Just like Weeks 7, 8 and 9, when she also happened to pick exactly what Steve picked. Your commissioner is not saying there’s a secret Harkov group chat. Your commissioner is just asking questions. And yes, those are the same Jets who cost Aaron a life in Week 7, so the Harkovs are finally avenging him. Aaron won’t be there to see it.',
    'Because Aaron has left the family plan for the fourth week running. If there is a group chat, he has clearly muted it. He’s alone on the Bengals, at home against Pittsburgh on Sunday night. Those are the Steelers his whole family rode in Week 7. His mom tried to follow him to Cincinnati and got turned away at the door. Aaron is on his last life and in the last game of the weekend, so he gets to watch everyone else finish before he even kicks off. Aaron, we’ll be up. Probably.',
    'Over in the HP Israel household, the Jaguars have become a family heirloom. Eyal rode them in Week 8 and Robin rode them in Week 9. This week Orit and Karin both took them, at 1–7 Tennessee on Sunday at noon. For Orit, it’s the natural next step: a cat in Week 8, a horse in Week 9, and now a jaguar, which is a cat that got a promotion. Zoey has been told she has competition. Your commissioner is on the Jaguars too, which makes three of us. Orit and I are both on our last life, and the Titans are 1–7. Nothing could possibly go wrong.',
    'Meanwhile Eyal and Robin took the Rams, the team Karin rode last week. So the household split right down the middle: the mother-daughter wing on the cat, father and daughter on the Rams. The Rams play at Arizona, the same Cardinals who knocked Eden, my own daughter, out of this league in Week 8. Eyal, if you win this one, you can tell Eden it was for her. She won’t believe you either.',
    'And tonight, Tzvi goes first. Last week it was his wife Robin on Thursday night. This week it’s Tzvi, with the 5–2–1 Giants at home against 2–5–1 Washington. Yes, both teams have a tie this season, and in this league a tie counts as a loss, so Tzvi needs an actual win. A game where nobody wins is exactly what Eyal roots for every week. Tzvi, good luck. The rest of us get to enjoy a Thursday night game with nothing on the line.',
    'The Bears are on bye, which means for the fourth week in a row, nobody picked the Bears. This time it isn’t even our fault. The crow is wearing navy and orange anyway.',
    'The final board: four on the Bills, three on the Jaguars, two on the Rams, one Giant and one Bengal. Nobody took the 49ers at Dallas, because every Harkov has already used them. Nobody took the 8:30 AM game in Munich either, which is the most sensible thing this family has ever done. Seven of us play at noon on Sunday, so by lunchtime most of the league will know where it stands. Four of us are on our last life: Orit and me on the Jaguars, Eyal on the Rams, and Aaron on the Bengals.',
  ],
  callout:
    'Your week 10 pick locked at 7:10 PM Thursday, so it’s out of your hands now. Next week works the same way: text me your pick before the lock, and a missed pick still costs a life.',
}

/**
 * Week 11, after the lock. It names every pick, so it replaced the week 10
 * recap only once the week had locked. Records and kickoffs checked against
 * the ESPN scoreboard; the week 12 lock (Wednesday 6:55 PM) checked against
 * evaluateSeason.
 */
const WEEK_11_PICKS: LeagueNote = {
  heading: 'Word from the commissioner',
  lines: [
    'The picks are in, and the Bears finally have a believer. After four weeks of this family treating Chicago like a stove you’re not supposed to touch, somebody touched it. The crow has put on his navy and orange and is pretending he always had them on.',
    'It was Eyal, of course, and he did it on his birthday. Our die-hard Bears fan turned a year older on Thursday and gave himself the 7–2 Bears, at home against the 3–6 Saints at noon on Sunday, with his last life on the line. Last week I asked whether “don’t pick the Bears” was a strategy or a superstition, and the birthday boy has volunteered to find out. Happy birthday, Eyal. For once, the whole family will be rooting for you. Consider it your present. You would never return the favor.',
    'Meanwhile, Steve has gone into witness protection. He held off on sending his pick this week on purpose, to make sure nobody could copy him. Steve, the only person who has ever copied you is your wife. And this week, for the first time all season, she didn’t: Steve took the 7–2 Chiefs at home against the 3–7 Cardinals, and Michele took the Broncos with Jordan. Eli tried the Bills, found out he’d used them last week, and settled on the Panthers. That’s three different teams in one household. Either Steve’s plan worked, or the Harkov group chat is down. The investigation continues.',
    'And Aaron? After four straight weeks of leaving the family plan, Aaron finally rejoined it. He took the Broncos, same as his mom and his sister, in the one week the family plan fell apart. Aaron, your timing remains perfect.',
    'That makes the Broncos the most crowded team on the board: Michele, Jordan, Aaron and your commissioner, all at home against the 4–6 Raiders at 3:25 on Sunday. Orit started the horse craze in Week 9, and now four of us are riding it. Orit, meanwhile, has moved on.',
    'Orit took the Chiefs, and when I asked why, she sent me exactly one thing: 🏹. That’s it. That was the whole explanation. Your commissioner had no idea. So Orit spelled it out: she’s a Sagittarius. The archer. And the Chiefs have an arrowhead on their helmets. In Orit’s system this was obvious, and the rest of us just didn’t do our homework. That’s a cat, a horse, a cat with a promotion, and now her own star sign. Zoey would like to know what sign she is. Meanwhile, Steve held his pick back so nobody could copy him and still ended up with company. Steve, it wasn’t personal. It was astrological.',
    'Karin and Robin both took the 8–1 Bills, at home against the 1–8 Dolphins at noon. Four Harkovs rode the Bills last week, so the sisters have basically moved into a house the Harkovs just left. They’re also the only two in the HP Israel family with two lives left, and they picked the safest-looking game on the board. Karin and Robin, I asked you to stop showing off. You did not.',
    'Tzvi, on his last life after last Thursday’s heartbreak, took the 6–3 Steelers at the 2–7 Eagles. All four Harkovs rode the Steelers back in Week 7, so Tzvi is now the most Harkov member of the Herman household. And Eli’s Panthers host the 4–6 Ravens. Panthers. Big cats. Zoey approves.',
    'The final board: four on the Broncos, two on the Bills, two on the Chiefs, and one each on the Bears, the Steelers and the Panthers. Nobody took Thursday night’s game, so for the first time this season nobody goes first, and we all get to sweat together on Sunday. Seven of us play at noon. Five of us are on our last life: Aaron and me on the Broncos, Orit on the Chiefs, Eyal on the Bears and Tzvi on the Steelers.',
    'A word on reminders. Last week, all eleven of you sent your picks without a nudge. This week, the streak lasted exactly one week. Karin and Robin sent theirs in on their own, which, again, is showing off. Steve was holding his back on purpose, so he gets a pass. Eyal gets a birthday pass: he was busy reading his birthday wishes, and we all know he’d have remembered anyway. Everyone else needed a nudge. So here’s the important part: next week is Thanksgiving, and the NFL starts the week early. Week 12 opens Wednesday night with Green Bay at the Rams, so the lock is Wednesday at 6:55 PM, not Thursday. Between the travel and the turkey, I can’t promise anyone a nudge. Get your pick in before the turkey. Or at least before the pie.',
  ],
  callout:
    'Your week 11 pick locked at 7:10 PM Thursday, so it’s out of your hands now. Next week is different: the week 12 lock is 6:55 PM Wednesday, the night before Thanksgiving. Text me your pick before then, and a missed pick still costs a life.',
}

export const NOTES: Record<number, LeagueNote> = {
  7: WEEK_7_PICKS,
  8: WEEK_8_PICKS,
  9: WEEK_9_PICKS,
  10: WEEK_10_PICKS,
  11: WEEK_11_PICKS,
}
