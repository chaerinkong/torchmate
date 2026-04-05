// Curated English language topics with reference links.
// These are included in the LLM prompt to ground question generation
// in real English concepts and link to authoritative sources.

export interface EnglishTopic {
  category: string;
  topics: {
    name: string;
    docUrl: string;
    description: string;
  }[];
}

export const ENGLISH_TOPICS: EnglishTopic[] = [
  {
    category: "Vocabulary & Word Choice",
    topics: [
      {
        name: "Commonly Confused Words",
        docUrl: "https://www.merriam-webster.com/grammar/commonly-confused-words",
        description: "affect/effect, complement/compliment, principal/principle, elicit/illicit",
      },
      {
        name: "Advanced Vocabulary",
        docUrl: "https://www.merriam-webster.com/word-of-the-day",
        description: "SAT/GRE-level words, nuanced synonyms, precise word choice in context",
      },
      {
        name: "Idioms & Phrasal Verbs",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/idioms",
        description: "Common English idioms, phrasal verbs, figurative expressions",
      },
      {
        name: "Collocations",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/about-words-clauses-and-sentences",
        description: "Natural word pairings: make/do, strong/heavy rain, deeply concerned",
      },
    ],
  },
  {
    category: "Grammar & Syntax",
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
        name: "Relative Clauses",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/relative-clauses",
        description: "Defining vs non-defining, who/which/that, reduced relative clauses",
      },
      {
        name: "Subject-Verb Agreement",
        docUrl: "https://owl.purdue.edu/owl/general_writing/grammar/subject_verb_agreement.html",
        description: "Collective nouns, indefinite pronouns, tricky agreement patterns",
      },
    ],
  },
  {
    category: "Writing & Style",
    topics: [
      {
        name: "Sentence Structure",
        docUrl: "https://owl.purdue.edu/owl/general_writing/mechanics/sentence_structure.html",
        description: "Simple, compound, complex sentences; parallelism; avoiding fragments and run-ons",
      },
      {
        name: "Punctuation",
        docUrl: "https://owl.purdue.edu/owl/general_writing/punctuation/index.html",
        description: "Commas, semicolons, colons, dashes, apostrophes — correct usage and common errors",
      },
      {
        name: "Conciseness & Clarity",
        docUrl: "https://owl.purdue.edu/owl/general_writing/academic_writing/conciseness/index.html",
        description: "Eliminating wordiness, active vs passive voice, precise expression",
      },
      {
        name: "Tone & Register",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/formal-and-informal-language",
        description: "Formal vs informal, academic register, business English, adjusting tone for audience",
      },
    ],
  },
  {
    category: "Reading Comprehension",
    topics: [
      {
        name: "Inference & Implication",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/discourse-markers",
        description: "Drawing conclusions from context, understanding implied meaning, reading between the lines",
      },
      {
        name: "Figurative Language",
        docUrl: "https://www.merriam-webster.com/grammar/figurative-language",
        description: "Metaphor, simile, personification, hyperbole, irony, understatement",
      },
      {
        name: "Context Clues",
        docUrl: "https://www.merriam-webster.com/grammar/how-to-use-context-clues",
        description: "Deducing word meaning from surrounding text, roots, prefixes, suffixes",
      },
    ],
  },
  {
    category: "Common Errors",
    topics: [
      {
        name: "Articles (a/an/the)",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/determiners-and-quantifiers",
        description: "Definite vs indefinite articles, zero article, common article mistakes",
      },
      {
        name: "Prepositions",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/prepositions",
        description: "Prepositions of time/place/movement, dependent prepositions, common errors",
      },
      {
        name: "Modals & Auxiliary Verbs",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/modals-and-modality",
        description: "Can/could, may/might, must/have to, should/ought to — nuances and common mistakes",
      },
      {
        name: "Pronoun Reference",
        docUrl: "https://owl.purdue.edu/owl/general_writing/grammar/pronouns/index.html",
        description: "Ambiguous pronoun reference, who/whom, reflexive pronouns, pronoun-antecedent agreement",
      },
    ],
  },
  {
    category: "Word Formation",
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
      {
        name: "Word Families & Derivation",
        docUrl: "https://dictionary.cambridge.org/grammar/british-grammar/word-formation",
        description: "Noun/verb/adjective/adverb forms, converting between parts of speech",
      },
    ],
  },
];

export function getRandomTopicWithDoc(): { name: string; docUrl: string; description: string; category: string } {
  const category = ENGLISH_TOPICS[Math.floor(Math.random() * ENGLISH_TOPICS.length)];
  const topic = category.topics[Math.floor(Math.random() * category.topics.length)];
  return { ...topic, category: category.category };
}
