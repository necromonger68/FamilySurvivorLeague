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
 * Week 9: the week 8 recap plus what week 9 holds. Shows once every week 8
 * game is final. Scores and records checked against the ESPN scoreboard; it
 * names no week 9 picks.
 */
const WEEK_9: LeagueNote = {
  heading: 'Word from the commissioner',
  lines: [
    'We have our first casualty, and it’s Eden, my own daughter. For two weeks Eden picked teams nobody in Chicago is allowed to like, and on Sunday the crow finally collected. Dallas was at home against a 2–5 Arizona team, which is about as safe as this league gets, so naturally the Cowboys let the Cardinals rally, went to overtime, and lost 33–30 on a field goal. As her mother, I’m heartbroken. As commissioner, I’m required to report it without bias, and I’d like the record to show I did not overturn it. Eden, you went out the way you played: boldly, loudly, and nowhere near the Bears. The crow is keeping your seat warm, and you’re still expected in the group chat. Heckling from the bleachers is encouraged.',
    'Now, the carpool. Seven of us were on Cincinnati, at home, against a 1–6 Tennessee team. Easy, right? The Titans scored 36 points. Thirty-six. The team with one win all year turned into the ’85 Bears for an afternoon. The Bengals had to come from behind and needed overtime, and Joe Burrow threw five touchdown passes and then, apparently tired of waiting for anyone else, ran in the winner himself, 43–36. Seven of us survived. Seven of us also need a nap.',
    'One person in this family was rooting for the Titans. Eyal, sitting safely on Jacksonville, did the math: if Cincinnati lost, seven of his rivals would lose a life and two would be out. I pointed out that those two would be his wife and his baby sister. He thought about it, nodded, and kept cheering for Tennessee. His Jaguars won 42–7, so he spent the afternoon with his own team winning by five touchdowns and his heart somewhere in Nashville. Eyal, we love you. We’re also never telling you our picks early again.',
    'And Orit? Orit picks teams by colors and mascot, and she picked the Bengals because the HP Israel household has a Bengal cat named Zoey. That’s the whole strategy. No stats, no matchups, just the cat. So while her husband was on the couch rooting against her, the cat carried her through overtime. Science has no explanation. Zoey has been promoted to assistant commissioner and will be consulted on all future picks.',
    'Everyone else got through. Karin’s Patriots won 24–19 at Miami, so the team that cost her mother a life last week turned around and saved Karin. She said she could fix them, and she did. Somebody get her a podcast. Eli’s Packers beat Carolina 27–19 on Thursday night, so Eli got to relax for three whole days while the rest of us suffered. And Aaron’s Bills beat Baltimore 36–10. After a week of going solo and getting burned, Aaron went solo again and was right. The crow is reconsidering everything.',
    'The official count: Eden is out, and eleven of you are still alive. Four of you are on your last life: me, Orit, Eyal and Aaron. Seven still have two: Karin, Steve, Michele, Jordan, Eli, Robin and Tzvi.',
    'And then Monday night. The Bears went to Seattle and won 34–17, and they’re now 6–2. For the second week in a row, not a single one of you was on them. A family full of Bears fans watched their team cruise on national television and got absolutely nothing for it. The crow watched the whole thing and laughed the entire time.',
    'Week 9: Pittsburgh is on bye, so the Harkovs will have to find a new security blanket. Tennessee is off too, and Bengals fans everywhere are grateful. Thursday night is Jacksonville at Baltimore, which locks the week, and Eyal can’t use the Jaguars again. The Bengals play Atlanta in Madrid on Sunday at 8:30 in the morning, because this league apparently only plays breakfast games in Europe, but only Karin, Eli, Eyal and Aaron still have Cincinnati available. Buffalo goes to Minnesota on Monday night, two 6–1 teams, and the two players who’d want that game, Aaron and Karin, have already burned Buffalo and Minnesota. And the 6–2 Bears host Tampa Bay on Sunday night. Still unused. By anyone. In a family that is mostly Bears fans. The crow has stopped asking.',
    'Four of you are on your last life. Choose like Orit: find a team with a good cat.',
  ],
  callout:
    'Text me your week 9 pick before 7:10 PM Thursday, five minutes before Jacksonville at Baltimore kicks off. Four of you are on your last life, and a missed pick costs a life like any other.',
}

export const NOTES: Record<number, LeagueNote> = {
  7: WEEK_7_PICKS,
  8: WEEK_8_PICKS,
  9: WEEK_9,
}
