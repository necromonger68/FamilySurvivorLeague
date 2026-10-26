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
 * Week 8: the week 7 recap plus what week 8 holds. Shows once every week 7
 * game is final. Scores and records checked against the ESPN scoreboard; it
 * names no week 8 picks.
 */
const WEEK_8: LeagueNote = {
  heading: 'Word from the commissioner',
  lines: [
    'Last week I said the crow had started taking notes. This week he needed a second notebook. Five of you lost a life, and I’m one of them, so I’ll go first. I took Houston at home against the Giants. The Texans dragged it to overtime, which was just long enough for me to start writing this paragraph as a victory lap, and then the Giants ran it in from thirty yards and won 27–21. The same Texans knocked me out of my other league that same afternoon. Two leagues, one team, one very long Sunday.',
    'Then there’s the HP Israel household. On Thursday night, Orit’s Patriots went to Chicago to beat Eyal’s Bears, and the Bears won 30–24. So my brother got to watch his team win and his wife lose a life in the same game. On Sunday the universe evened things out: the die-hard, who still didn’t pick his own Bears, took Carolina instead, and Carolina turned it over four times and lost 43–13 to Tampa Bay. Both parents lost a life. Their girls did not. More on that below.',
    'Eden backed the Harkovs’ 49ers, who had not lost a game all season. They lost their first one in Atlanta, 29–20, with four turnovers. So Eden lost a life on the Harkovs’ team, and the Harkovs didn’t, because the Harkovs were on the Steelers. I’m told dinner is still owed.',
    'Aaron, the one Harkov who said no to the family plan, took the Jets at home against a Miami team that had not won a game all season. Miami won 28–25. The Jets made a late run, which only made it worse. The group chat has been quiet, as predicted.',
    'The official count: five of you lost a life. Maya with Houston, Orit with New England, Eyal with Carolina, Eden with San Francisco, Aaron with the Jets. Nobody is out, because this league gives you two lives for exactly this kind of week. But five of you are already on your last one.',
    'The seven still on two lives. My sister Michele, Steve, Jordan and Eli went to breakfast in Paris (the Steelers game was the NFL’s first regular-season game in France) and came home with a 16–10 win. And while their parents went down, Karin and Robin carried the HP Israel name: Karin’s Vikings ground out a 16–10 win over Indianapolis and are now 6–0, the only unbeaten team left in football, and Robin’s Browns needed another game-winning drive to get past Tennessee 27–24. Robin’s husband Tzvi made it a clean sweep, with Denver winning 30–16 in Arizona and a 62-yard touchdown run from their quarterback thrown in.',
    'Nobody picked Dallas at Philadelphia, so the week was settled before Monday night. The crow has the night off.',
    'Week 8: Houston, New Orleans, the Giants and San Francisco are on bye. Thursday night is Carolina at Green Bay, which locks the week. The Vikings, 6–0, go to Detroit, and Karin can’t use them again. Cleveland plays at Pittsburgh, which makes it Robin against her Aunt Michele’s family, except Robin has already used the Browns and four of the Harkovs have already used the Steelers. And the Bears, the team more than half the family loves and none of you picked, play at Seattle on Monday night. Nobody has used them yet. Just saying.',
    'Remember, you have two lives. Five of you have spent one. Choose accordingly.',
  ],
  callout:
    'Text me your week 8 pick before 7:10 PM Thursday, five minutes before Carolina at Green Bay kicks off. Five of you are on your last life, and a missed pick costs a life like any other.',
}

export const NOTES: Record<number, LeagueNote> = {
  7: WEEK_7_PICKS,
  8: WEEK_8,
}
