// Curated English language topics with reference links.
// Heavily weighted toward idioms, expressions, and vocabulary acquisition.
// These are included in the LLM prompt to ground question generation
// in real English concepts and link to authoritative sources.

export interface EnglishTopic {
  category: string;
  weight: number; // relative probability of being selected
  topics: {
    name: string;
    docUrl: string;
    description: string;
  }[];
}

export const ENGLISH_TOPICS: EnglishTopic[] = [
  // --- EXPRESSIONS & IDIOMS (main focus) ---
  {
    category: "Everyday Idioms",
    weight: 4,
    topics: [
      {
        name: "Idioms About Consequences & Limits",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/idioms",
        description: "the straw that broke the camel's back, the last straw, cross the line, push the envelope, burn bridges, bite off more than you can chew",
      },
      {
        name: "Idioms About Letting Go & Moving On",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/idioms",
        description: "water under the bridge, let bygones be bygones, turn over a new leaf, bury the hatchet, wipe the slate clean, move the goalposts",
      },
      {
        name: "Idioms About Effort & Hard Work",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/idioms",
        description: "burn the midnight oil, go the extra mile, pull your weight, roll up your sleeves, bend over backwards, leave no stone unturned",
      },
      {
        name: "Idioms About Success & Failure",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/idioms",
        description: "hit the nail on the head, miss the boat, back to square one, saved by the bell, steal someone's thunder, the ball is in your court",
      },
      {
        name: "Idioms About Money & Value",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/idioms",
        description: "cost an arm and a leg, break the bank, penny for your thoughts, a dime a dozen, pay through the nose, worth its weight in gold",
      },
      {
        name: "Idioms About Honesty & Deception",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/idioms",
        description: "spill the beans, let the cat out of the bag, beat around the bush, pull the wool over someone's eyes, take with a grain of salt, call a spade a spade",
      },
      {
        name: "Idioms About Emotions & Reactions",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/idioms",
        description: "blow off steam, get cold feet, bite the bullet, keep your chin up, butterflies in your stomach, at the end of your rope, on cloud nine",
      },
      {
        name: "Idioms About Relationships",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/idioms",
        description: "see eye to eye, get along like a house on fire, give someone the cold shoulder, have a chip on your shoulder, rub someone the wrong way, thick as thieves",
      },
    ],
  },
  {
    category: "Proverbs & Sayings",
    weight: 3,
    topics: [
      {
        name: "Proverbs About Wisdom & Caution",
        docUrl: "https://www.merriam-webster.com/grammar/proverbs",
        description: "look before you leap, don't count your chickens before they hatch, curiosity killed the cat, better safe than sorry, a bird in the hand is worth two in the bush",
      },
      {
        name: "Proverbs About Time & Patience",
        docUrl: "https://www.merriam-webster.com/grammar/proverbs",
        description: "Rome wasn't built in a day, the early bird catches the worm, better late than never, time heals all wounds, haste makes waste, strike while the iron is hot",
      },
      {
        name: "Proverbs About Character & Actions",
        docUrl: "https://www.merriam-webster.com/grammar/proverbs",
        description: "actions speak louder than words, the pen is mightier than the sword, don't judge a book by its cover, every cloud has a silver lining, practice makes perfect",
      },
      {
        name: "Proverbs About Life Lessons",
        docUrl: "https://www.merriam-webster.com/grammar/proverbs",
        description: "when it rains it pours, you can't have your cake and eat it too, the grass is always greener on the other side, two wrongs don't make a right, beggars can't be choosers",
      },
    ],
  },
  {
    category: "Borrowed Expressions & Foreign Phrases",
    weight: 3,
    topics: [
      {
        name: "French Expressions in English",
        docUrl: "https://www.merriam-webster.com/wordplay/foreign-words-in-english",
        description: "touché, faux pas, cliché, déjà vu, je ne sais quoi, carte blanche, raison d'être, c'est la vie, bon voyage, RSVP, vis-à-vis, en route",
      },
      {
        name: "Latin Expressions in English",
        docUrl: "https://www.merriam-webster.com/wordplay/foreign-words-in-english",
        description: "ad hoc, bona fide, carpe diem, et cetera, per se, status quo, vice versa, de facto, mea culpa, quid pro quo, persona non grata",
      },
      {
        name: "Other Borrowed Expressions",
        docUrl: "https://www.merriam-webster.com/wordplay/foreign-words-in-english",
        description: "kindergarten (German), tsunami (Japanese), schadenfreude (German), kaput (German), guru (Sanskrit), zeitgeist (German), wanderlust (German), angst (German)",
      },
    ],
  },
  {
    category: "Phrasal Verbs & Verb Expressions",
    weight: 3,
    topics: [
      {
        name: "Common Phrasal Verbs",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/phrasal-verbs",
        description: "break down, bring up, carry on, come across, figure out, give up, look into, put off, run into, turn out, work out, call off",
      },
      {
        name: "Tricky Phrasal Verbs",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/phrasal-verbs",
        description: "let on, own up, phase out, iron out, pan out, fizzle out, bank on, factor in, touch on, hone in on, zero in on",
      },
      {
        name: "Informal Verb Expressions",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/phrasal-verbs",
        description: "hit the road, call it a day, play it by ear, sleep on it, get the hang of, jump the gun, pull someone's leg, ring a bell, cut corners",
      },
    ],
  },
  {
    category: "Figurative & Colorful Expressions",
    weight: 3,
    topics: [
      {
        name: "Metaphors & Similes in Daily Speech",
        docUrl: "https://www.merriam-webster.com/grammar/figurative-language",
        description: "a breath of fresh air, at a crossroads, tip of the iceberg, elephant in the room, light at the end of the tunnel, a piece of cake, apples and oranges",
      },
      {
        name: "Exaggerations & Understatements",
        docUrl: "https://www.merriam-webster.com/grammar/figurative-language",
        description: "once in a blue moon, when pigs fly, it's not rocket science, I wasn't born yesterday, break a leg, that's an understatement, not too shabby",
      },
      {
        name: "Body-Related Expressions",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/idioms",
        description: "keep an eye on, lend a hand, get something off your chest, turn a blind eye, put your foot in your mouth, play it by ear, cost an arm and a leg, cold feet",
      },
      {
        name: "Animal-Related Expressions",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/idioms",
        description: "let the cat out of the bag, the elephant in the room, a wild goose chase, hold your horses, straight from the horse's mouth, kill two birds with one stone",
      },
    ],
  },
  {
    category: "Expressive & Nuanced Vocabulary",
    weight: 3,
    topics: [
      {
        name: "Words for Emotions & States of Mind",
        docUrl: "https://www.merriam-webster.com/word-of-the-day",
        description: "melancholy, euphoria, ambivalent, nonchalant, exasperated, apprehensive, complacent, wistful, indignant, bewildered, elated, despondent",
      },
      {
        name: "Sophisticated Adjectives",
        docUrl: "https://www.merriam-webster.com/word-of-the-day",
        description: "ubiquitous, ephemeral, quintessential, serendipitous, juxtaposed, candid, eloquent, pragmatic, meticulous, resilient, profound, nuanced",
      },
      {
        name: "Useful Verbs Beyond the Basics",
        docUrl: "https://www.merriam-webster.com/word-of-the-day",
        description: "exacerbate, alleviate, scrutinize, contemplate, consolidate, undermine, advocate, elaborate, encompass, reconcile, transcend, navigate (figurative)",
      },
      {
        name: "Words People Often Misuse",
        docUrl: "https://www.merriam-webster.com/grammar/commonly-confused-words",
        description: "ironic vs coincidental, literally vs figuratively, envy vs jealousy, empathy vs sympathy, imply vs infer, bemused vs amused, peruse vs skim",
      },
    ],
  },
  {
    category: "Conversational Expressions & Slang",
    weight: 2,
    topics: [
      {
        name: "Polite & Diplomatic Phrases",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/formal-and-informal-language",
        description: "I'd rather not, if you don't mind, with all due respect, for what it's worth, to be perfectly honest, no offense but, if I may, that said",
      },
      {
        name: "Casual & Everyday Expressions",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/formal-and-informal-language",
        description: "hang in there, no big deal, you bet, that makes two of us, long story short, go figure, fair enough, it is what it is, my bad, I'm all ears",
      },
      {
        name: "Witty & Sharp Responses",
        docUrl: "https://www.merriam-webster.com/wordplay/foreign-words-in-english",
        description: "touché, the pot calling the kettle black, that's rich, easier said than done, famous last words, you can say that again, speak of the devil",
      },
    ],
  },

  // --- GRAMMAR & OTHER (lighter weight) ---
  {
    category: "Grammar & Syntax",
    weight: 1,
    topics: [
      {
        name: "Tense & Aspect",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/tenses-and-time",
        description: "Present perfect vs past simple, continuous vs simple, future forms",
      },
      {
        name: "Conditionals",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/conditionals",
        description: "Zero, first, second, third, and mixed conditionals; wish/if only",
      },
      {
        name: "Common Errors",
        docUrl: "https://owl.purdue.edu/owl/general_writing/grammar/subject_verb_agreement.html",
        description: "Subject-verb agreement, article usage, preposition errors, pronoun reference",
      },
    ],
  },
  {
    category: "Word Formation & Etymology",
    weight: 1,
    topics: [
      {
        name: "Prefixes & Suffixes",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/word-formation",
        description: "Common prefixes (un-, re-, dis-, mis-), suffixes (-tion, -ness, -able, -ment)",
      },
      {
        name: "Root Words & Etymology",
        docUrl: "https://www.merriam-webster.com/help/faq-history",
        description: "Latin and Greek roots, how etymology helps with spelling and meaning",
      },
    ],
  },
];

// Weighted random selection — expression-heavy categories are picked much more often
export function getRandomTopicWithDoc(): { name: string; docUrl: string; description: string; category: string } {
  const totalWeight = ENGLISH_TOPICS.reduce((sum, cat) => sum + cat.weight, 0);
  let roll = Math.random() * totalWeight;

  for (const category of ENGLISH_TOPICS) {
    roll -= category.weight;
    if (roll <= 0) {
      const topic = category.topics[Math.floor(Math.random() * category.topics.length)];
      return { ...topic, category: category.category };
    }
  }

  // Fallback (shouldn't happen)
  const category = ENGLISH_TOPICS[0];
  const topic = category.topics[Math.floor(Math.random() * category.topics.length)];
  return { ...topic, category: category.category };
}
