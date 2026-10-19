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

const WEEK_7_WELCOME: LeagueNote = {
  heading: 'Word from the commissioner',
  lines: [
    'Welcome to the league. Every week you pick one NFL team to win. You can never use the same team twice. That is the whole game, and it will still find a way to hurt you.',
    'You get two lives. Not three — two. Your team loses, it costs a life. Your team ties, it costs a life. You forget to text me, it costs a life. Lose both and you get a headstone on this page and a eulogy written by me, which should scare you more than anything the NFL can do.',
    'A word from experience: in the other league I play in, twenty-one people picked Dallas in the same week, and all twenty-one lost a life to a Tampa Bay team that had not won a game all season. I was one of the twenty-one. Dallas plays at Philadelphia on Monday night this week. Do with that what you will.',
    'Week 7: Buffalo, Jacksonville, Washington and the Chargers are on bye, so they cannot be picked. Pittsburgh at New Orleans kicks off at 8:30 Sunday morning our time, for anyone who likes their heartbreak with breakfast. Kansas City is at Seattle on Sunday night.',
    'Everybody’s pick stays hidden until the lock, then they all show up here at once. No peeking, no copying, no “what did you take?” at dinner.',
  ],
  callout:
    'Text me your week 7 pick before 7:10 PM Thursday — five minutes before New England at Chicago kicks off. Every pick locks then, even if your game is on Sunday. No pick costs a life, and you only have two.',
}

export const NOTES: Record<number, LeagueNote> = {
  7: WEEK_7_WELCOME,
}
