import type { CrewFinding } from '../types';

const crewFindings: Record<string, CrewFinding> = {
  // ─── LANDING-PAGE ─────────────────────────────────────────

  // ─── SLAP ─────────────────────────────────
  'landing-page:slap:prompter': {
    perspective: 'I prompted for "professional SaaS landing page copy" and this is exactly what the model scores highest for professional tone. The headline hits every engagement metric the prompt optimization framework tracks.',
    confession: 'I know "Master the Art of the Perfectly Timed Fall" is indistinguishable from ten thousand other SaaS pages. But the model ranks it #1 for "professional authority" and I optimized for the metric, not the reader.',
    industryContext: 'Prompt engineering rewards outputs that score well on internal benchmarks. "Professional tone" has become a proxy for "sounds like everything else." The incentive structure produces convergence, not differentiation.',
  },
  'landing-page:slap:junior': {
    perspective: 'The template had 4.8 stars and 12,000 downloads. Hero section, three pricing tiers, testimonial carousel -- it checks every box in the landing page checklist I learned from that YouTube course.',
    confession: 'I picked the first template that matched the wireframe and changed the colors to brand. The testimonial from the "Chief Comedy Officer at Synergy Laughs" should have been a red flag but the deadline was yesterday.',
    industryContext: 'Junior designers are evaluated on speed and fidelity to wireframes, not on whether the content makes sense. Template marketplaces reward completeness over quality -- the more sections, the more stars.',
  },
  'landing-page:slap:pm': {
    perspective: 'We A/B tested this against a custom-designed version. Conversion was within margin of error. CTA click-through, email signup rate, scroll depth -- all identical. Why would I allocate design resources to a rounding error?',
    confession: 'The designed version had 3x the return visits. People came back. But return visits don\'t show up in the single-session conversion funnel I report to the board, so the data point disappeared.',
    industryContext: 'Product management metrics are optimized for single-session conversion. Brand affinity, return visits, and word-of-mouth referrals are real but unmeasured. What gets measured gets funded; what doesn\'t gets cut.',
  },
  'landing-page:slap:founder': {
    perspective: 'I built this landing page in 4 hours with AI. It got us our first 100 signups. Everyone debates design quality but nobody debates the 6 months of revenue you lose while designing. Ship the page, learn from real users.',
    confession: 'I saw a competitor\'s beautiful landing page and felt a pang of envy. Then I checked their launch date -- 8 months after ours. We had 400 users by then. But yeah, their page looked better.',
    industryContext: 'Startup culture valorizes shipping speed above all else. "Launch in a weekend" is a badge of honor. Design polish is reframed as procrastination, and the founders who ship ugly pages first write the blog posts that junior founders read.',
  },

  // ─── BRUTALIST ─────────────────────────────
  'landing-page:brutalist:prompter': {
    perspective: 'I didn\'t prompt for Brutalist. A designer chose it. That\'s the difference -- the content came from a prompt, but the design came from a human decision. The thick borders and monospace type weren\'t in any prompt template I\'ve seen.',
    confession: 'The brutalist framing makes my prompted copy look worse by exposing it. "Master the Art of the Perfectly Timed Fall" in 900-weight uppercase is like putting a spotlight on a cliche. The designer\'s choice revealed my shortcut.',
    industryContext: 'Prompt engineers optimize text in isolation from design. We test copy in plain text editors and score it against tone benchmarks. Nobody tests how prompted copy performs inside an actual design system until it\'s too late.',
  },
  'landing-page:brutalist:junior': {
    perspective: 'I chose the brutalist template because the brief said "bold and distinctive." It had thick borders, monospace accents, and zero decoration -- that felt intentional and confident.',
    confession: 'I didn\'t actually understand why the borders were thick or why the type was monospace. I liked how it looked in the Dribbble preview and the deadline was in 2 hours. Understanding comes later, shipping comes now.',
    industryContext: 'Design education is increasingly template-first. Juniors learn by copying, not by understanding principles. A brutalist template teaches you what brutalism looks like but not what it means or when it\'s appropriate.',
  },
  'landing-page:brutalist:pm': {
    perspective: 'Brutalist converts slightly better on first-click metrics because the CTA contrast is extreme. Black and white with a red button -- there\'s nowhere else to look. The above-the-fold scan time dropped by 1.2 seconds.',
    confession: 'But the bounce rate on mobile went up 15%. Turns out "bold and distinctive" reads as "broken" to users over 50. I buried that data point because it contradicted the narrative I\'d already presented.',
    industryContext: 'A/B tests measure what you configure them to measure. If you only track first-click, brutalist wins. If you track return visits, it loses. The choice of metric is the choice of outcome, and PMs choose metrics that confirm decisions already made.',
  },
  'landing-page:brutalist:founder': {
    perspective: 'The brutalist version took the same 4 hours as the default because the template was free. Zero decoration means zero design decisions. I respect the efficiency -- it looks like someone made a choice instead of accepting a default.',
    confession: 'My co-founder called it "aggressive" and my mom asked if the website was broken. Two data points from my target demographic of exactly zero, but they still stung.',
    industryContext: 'Founders conflate "having an opinion" with "having a good opinion." Brutalist design lets you skip the design process while looking like you made a deliberate aesthetic choice. It\'s the cargo cult of intentionality.',
  },

  // ─── NEO-MINIMAL ──────────────────────────
  'landing-page:neo-minimal:prompter': {
    perspective: 'The minimal design actually makes my prompted copy more palatable. "Master the Art of the Perfectly Timed Fall" with thin type and generous whitespace reads as understated confidence rather than corporate bluster. The design is doing damage control on my content.',
    confession: 'Same words, completely different reception. If design can make bad copy feel good, then I\'ve been optimizing the wrong variable this entire time. The frame matters more than the painting.',
    industryContext: 'Prompt engineers treat copy as the product and design as packaging. But users experience them simultaneously. A prompt-perfect headline in a bad design is worse than a mediocre headline in a good design. Nobody in the prompt community talks about this.',
  },
  'landing-page:neo-minimal:junior': {
    perspective: 'Minimal is safe. When you don\'t know what to do, remove things. Nobody gets fired for whitespace. The single blue accent is tasteful and the spacing feels intentional even if I just used the template defaults.',
    confession: 'The truth is I couldn\'t decide on a color palette so I used one blue accent and called it "restraint." My design rationale was "I ran out of time" rebranded as "less is more."',
    industryContext: 'Neo-minimal is the default refuge for junior designers who lack confidence. It\'s the safest possible aesthetic choice because excess is easy to criticize and restraint is hard to argue against. The result is a generation of designers who can\'t add, only subtract.',
  },
  'landing-page:neo-minimal:pm': {
    perspective: 'The minimal version tests identically to the default on conversion. Email signups, CTA clicks, scroll depth -- all within margin of error. The design investment produced zero measurable lift on any metric I track.',
    confession: 'Qualitative feedback was unanimously positive. Every user survey said "clean" and "professional." But I can\'t put sentiment in a dashboard, and dashboards are what get budget approved.',
    industryContext: 'Product management is structurally biased toward quantitative metrics because they\'re defensible in stakeholder meetings. Qualitative signals like "this feels trustworthy" are real but unfundable. The metrics infrastructure itself creates design apathy.',
  },
  'landing-page:neo-minimal:founder': {
    perspective: 'Clean, fast, mobile-friendly. The minimal version loads in 1.2 seconds, which means my Google Ads quality score goes up and my cost-per-click goes down. Design as performance optimization -- now we\'re speaking my language.',
    confession: 'I chose the minimal template because it was the fastest to customize, not because I had a design vision. But "fast to build" and "minimalist aesthetic" happen to be the same thing, so I got credit for taste I don\'t have.',
    industryContext: 'Startup economics accidentally reward minimal design. Fewer assets mean faster load times, which mean better ad performance, which mean lower customer acquisition cost. The cheapest design decision is often the most performant one.',
  },

  // ─── MAXIMALIST ───────────────────────────
  'landing-page:maximalist:prompter': {
    perspective: 'The maximalist design creates a contrast that makes my content\'s thinness more obvious. Serif headlines against decorative borders -- the visual richness raises expectations that "seamlessly streamline your workflow" can\'t meet.',
    confession: 'Rich design makes thin content feel like a broken promise. The more the page invests in presentation, the more the reader expects from the words. My prompted copy can\'t cash the checks this design is writing.',
    industryContext: 'AI-generated content is calibrated for median engagement across all possible designs. When a design raises the bar, the content stays at the median. This creates a "design-content gap" that nobody in the prompt community is measuring.',
  },
  'landing-page:maximalist:junior': {
    perspective: 'I layered everything the design system offered. Serif headlines, decorative borders, pull quotes, editorial spacing, coral accents on navy. More design means more effort, and effort means quality, right?',
    confession: 'I confused "using all the features" with "making design decisions." A buffet isn\'t a meal plan. The coral-on-navy palette came from five different Dribbble shots stitched together. It\'s a mood board, not a system.',
    industryContext: 'Design tools ship with more features every quarter. Juniors equate feature usage with skill because that\'s what tutorials reward. "Look at this effect I used" gets more likes than "look at this restraint I exercised."',
  },
  'landing-page:maximalist:pm': {
    perspective: 'The maximalist version increased time-on-page by 40% -- but conversion stayed flat. People lingered longer without buying more. That\'s a vanity metric disguised as engagement.',
    confession: 'The CEO loved the maximalist version because it "looks like we invested in design." Executive taste and user behavior are different metrics, and I optimize for whoever signs my performance review.',
    industryContext: 'Enterprise product management has a hidden metric: executive aesthetics. The design that gets internal buy-in isn\'t always the design that converts best. Political capital and conversion data pull in different directions.',
  },
  'landing-page:maximalist:founder': {
    perspective: 'The maximalist version took 3 weeks of designer time. For a landing page. I could have shipped the default, run 4 experiments, and iterated 3 times in those 3 weeks. Design is not the bottleneck -- learning speed is.',
    confession: 'But when I saw the finished page, I understood why investors respond to visual quality. The maximalist design says "we have resources" even when we don\'t. It\'s fundraising theater in CSS.',
    industryContext: 'Startups face a paradox: investors want to see polish that suggests investment, but the polish itself requires the investment they haven\'t made yet. Maximalist design is venture signaling -- spending money to look like you have money.',
  },

  // ─── DARK INDUSTRIAL ──────────────────────
  'landing-page:dark-industrial:prompter': {
    perspective: 'The dark industrial framing projects technical authority my content hasn\'t earned. "SYS.NAVIGATION" labels make a generic SaaS landing page feel like mission control. The design is manufacturing credibility from nothing.',
    confession: 'My prompted copy says "cutting-edge technology" but the dark industrial design actually looks like cutting-edge technology. The design is doing my job better than my prompt did.',
    industryContext: 'There\'s an emerging pattern of AI-generated content wrapped in technical-looking design to signal engineering depth. The terminal aesthetic implies "built by engineers" regardless of who actually built it.',
  },
  'landing-page:dark-industrial:junior': {
    perspective: 'I chose the dark theme because it looks "developer-friendly" in screenshots. Dark mode is always impressive on Dribbble -- the amber accents on navy felt like a premium portfolio piece.',
    confession: 'I never tested it with actual users. The dark background that gets 500 likes on Dribbble is hostile to the 68-year-old who just wants to read the pricing. My portfolio is not my user base.',
    industryContext: 'Design portfolios optimize for designer audiences, not user audiences. Dark themes dominate portfolio sites because they photograph well, which creates a feedback loop: juniors see dark themes win awards and replicate them regardless of context.',
  },
  'landing-page:dark-industrial:pm': {
    perspective: 'The dark industrial version had the highest conversion rate among developers but the lowest among general audiences. Our user base is 60% non-technical. The design serves 40% of users at the expense of 60%.',
    confession: 'I greenlit it anyway because the dev audience has 3x the lifetime value. Optimizing for the minority that pays more is rational. It\'s also exclusionary. I try not to think about it.',
    industryContext: 'Product metrics don\'t distinguish between inclusion and exclusion. A 3x LTV segment justifies design decisions that alienate the majority. The dashboard says "optimize for high-value users" and the human cost is invisible in the data.',
  },
  'landing-page:dark-industrial:founder': {
    perspective: 'The dark industrial version makes us look like a dev tools company, which is exactly what investors want to hear. "We\'re a platform for developers" is a $10M seed round pitch. The design tells that story without me saying a word.',
    confession: 'We\'re actually a marketing tool that developers happen to use. But the dark theme convinced two VCs we were a developer platform and we raised at a 40% higher valuation. Design is investor manipulation and I\'m fine with that.',
    industryContext: 'Visual identity shapes investor perception more than pitch decks. A dark-themed landing page signals "technical moat" regardless of the actual product. Founders learn this and use design as fundraising strategy, not user strategy.',
  },

  // ─── WARM ORGANIC ─────────────────────────
  'landing-page:warm-organic:prompter': {
    perspective: 'The warm design makes my prompted copy feel more trustworthy. Same words, different trust level. "Master the Art of the Perfectly Timed Fall" in earth tones with rounded corners reads as sincere rather than corporate. That\'s terrifying.',
    confession: 'If design can make bad content feel trustworthy, then visual design is a manipulation tool and I\'ve been complicit. My optimized-for-professional-tone copy wrapped in warm aesthetics is manufactured authenticity.',
    industryContext: 'The intersection of AI content and warm design is the most effective trust-manufacturing system ever created. The content sounds professional, the design feels human, and neither is genuine. This combination will define the next decade of web content.',
  },
  'landing-page:warm-organic:junior': {
    perspective: 'Earth tones and rounded corners are the design equivalent of a warm handshake. The template I used came from a "friendly brand" UI kit and every element says "we\'re approachable." It practically designed itself.',
    confession: 'I picked the warm palette because it\'s impossible to criticize. Nobody says "the earth tones are too warm." It\'s the design equivalent of cooking pasta -- you can\'t really fail, but you also can\'t really impress.',
    industryContext: 'Warm organic design is the new corporate default, replacing the blue-and-white SaaS template. It signals "we care about humans" at zero creative risk. The aesthetic spread through UI kits and Figma community files until warmth became as generic as the coldness it replaced.',
  },
  'landing-page:warm-organic:pm': {
    perspective: 'The warm version increased trust survey scores by 22% but conversion stayed identical. People felt better about the brand and then bought exactly the same amount. Trust is a leading indicator, not a conversion driver.',
    confession: 'I know trust compounds over time. I know the warm version probably wins on 6-month retention. But my OKRs are quarterly, my bonus is quarterly, and my dashboard updates hourly. Long-term trust doesn\'t fit in a sprint.',
    industryContext: 'Product management is structurally short-termist. OKR cycles, sprint planning, and quarterly reviews all optimize for immediate measurability. Design investments that pay off in 6 months are unfundable in a system that evaluates in 2-week increments.',
  },
  'landing-page:warm-organic:founder': {
    perspective: 'The warm version took an extra day because the designer insisted on "getting the border radius right." One day for rounded corners. I could have emailed 50 prospects in that time.',
    confession: 'But our churn rate dropped after the redesign. Users stayed longer, complained less, referred more friends. The rounded corners I dismissed as vanity actually reduced support tickets. Turns out "feeling welcome" is a feature.',
    industryContext: 'Founders discount design because its impact is indirect. A warm landing page doesn\'t close deals -- it reduces friction that prevents deals from closing. The ROI is real but invisible, which makes it easy to cut in every budget review.',
  },

  // ─── RETRO-FUTURISM ───────────────────────
  'landing-page:retro-futurism:prompter': {
    perspective: 'The gradient containers and teal-purple palette distract from my content in a way that actually helps. Nobody notices that "seamlessly streamline your workflow" is meaningless when the page feels like a synthwave album cover.',
    confession: 'The retro-futurism design is the best thing that ever happened to my mediocre copy. It provides the personality my prompt couldn\'t generate. I should be threatened by this but I\'m just relieved.',
    industryContext: 'Distinctive visual design can compensate for generic content indefinitely. Users remember the experience, not the words. This means prompt quality matters less in high-design contexts -- which undermines the entire value proposition of prompt engineering.',
  },
  'landing-page:retro-futurism:junior': {
    perspective: 'The gradients and bouncy interactions were fun to implement. The teal-to-purple transitions feel energetic and the rounded containers give everything a playful vibe. This is the first variation I was actually excited to build.',
    confession: 'I spent 3 hours tweaking the gradient angles and 10 minutes on the information hierarchy. The page looks amazing on my Instagram story and terrible on my manager\'s accessibility audit. Priorities, right?',
    industryContext: 'Visual flair is more shareable than structural quality. Juniors optimize for the screenshot because that\'s what their network rewards. A gradient hero gets 200 likes; a well-structured heading hierarchy gets nothing. Social incentives shape design priorities.',
  },
  'landing-page:retro-futurism:pm': {
    perspective: 'The retro-futurism version had the highest social share rate of any variation. People shared the page itself as content. But shares don\'t convert -- our attribution model shows zero signups from social shares.',
    confession: 'I know brand awareness matters. I know shares create future demand. But "future demand" is a concept I can\'t put in a slide. My stakeholders want pipeline, not vibes.',
    industryContext: 'Marketing attribution models are structurally hostile to brand awareness. Social shares, word-of-mouth, and visual memorability all create demand that converts weeks or months later through different channels. The attribution model credits the last click, not the first impression.',
  },
  'landing-page:retro-futurism:founder': {
    perspective: 'The retro-futurism version went viral on Twitter. 50K impressions, 200 retweets. Zero signups. The internet loved looking at our landing page and nobody bothered reading it. Virality is a vanity metric.',
    confession: 'But those 50K impressions included three journalists and an investor. The viral moment didn\'t convert users, but it converted attention from people who matter. Sometimes the funnel is sideways.',
    industryContext: 'Startup marketing is a power-law game. The top 1% of impressions drive 80% of outcomes. A beautiful design that reaches one investor is worth more than an ugly design that converts 100 users. Founders learn this accidentally and then optimize for it deliberately.',
  },

  // ─── MEMPHIS ──────────────────────────────
  'landing-page:memphis:prompter': {
    perspective: 'The Memphis design creates a tonal mismatch with my content that\'s genuinely jarring. "Seamlessly streamline your workflow" next to bold geometric shapes and primary colors -- the words say corporate, the design says playground.',
    confession: 'The mismatch actually reveals how bland my prompted copy is. If the content had any personality, the Memphis design would amplify it. Instead it amplifies the absence. My copy is so neutral it clashes with fun.',
    industryContext: 'AI models are trained on corporate content corpora and generate text calibrated for neutral contexts. When placed in a high-personality design, the neutrality becomes visible as a deficiency. The model can\'t match the design\'s energy because it was trained to avoid energy.',
  },
  'landing-page:memphis:junior': {
    perspective: 'I found this template on a design showcase and it was the most liked piece that month. The asymmetric shapes and primary colors felt creative and the bold geometric patterns made every section pop.',
    confession: 'Creative to me meant "different from what I usually make." I never asked whether floating triangles next to a pricing table served the content. The shapes are decorative noise, and I thought noise was the same as personality.',
    industryContext: 'Design showcases reward visual spectacle over contextual appropriateness. A Memphis pricing table wins awards on Dribbble and confuses users in production. The incentive gap between "impressive to designers" and "useful to users" keeps widening.',
  },
  'landing-page:memphis:pm': {
    perspective: 'The Memphis version had the highest bounce rate of any styled variation. Users spent 2 seconds on the page and left. The bold design made an impression -- just not the right one.',
    confession: 'I actually liked the Memphis version personally. It had energy. But "I like it" and "it converts" live in different universes, and I\'m paid to care about the second one.',
    industryContext: 'Product managers develop a split personality: personal taste and professional judgment. The best PMs can articulate why they like something that doesn\'t work and why they\'d ship something they hate. The gap is the job.',
  },
  'landing-page:memphis:founder': {
    perspective: 'The Memphis version polarized everyone. My target users loved it or hated it -- no middle ground. Polarization is a branding strategy when you\'re big enough to afford losing 50% of visitors. We\'re not.',
    confession: 'But the 50% who loved it REALLY loved it. They became evangelists. The Memphis design didn\'t convert more users, but it converted more passionate users. I\'m still not sure which matters more at our stage.',
    industryContext: 'Startups face the polarization dilemma: safe design attracts the median user, bold design attracts the extremes. At pre-revenue, you need volume. At product-market fit, you need passion. The right design depends on which stage you\'re lying about being in.',
  },

  // ─── ART DECO ─────────────────────────────
  'landing-page:art-deco:prompter': {
    perspective: 'Gold accents on my prompted copy is like putting a $200 frame on a gas station print. The serif headlines and geometric patterns create an expectation of substance that "leverages cutting-edge technology" cannot deliver.',
    confession: 'But here\'s the thing -- most people look at the frame first. And some never look past it. The art deco design is converting my mediocre copy into perceived quality through sheer visual authority.',
    industryContext: 'Visual design functions as a credibility proxy. Users equate production value with content value. A gold-accented landing page with AI-generated copy outperforms a plain page with expert copy because design is processed faster than language.',
  },
  'landing-page:art-deco:junior': {
    perspective: 'The gold accents and geometric patterns came from a premium UI kit I bought for $49. It looked premium in the Figma preview and the serif headlines felt sophisticated. The symmetrical layout practically designed itself.',
    confession: 'Premium in a UI kit preview and premium for your specific content are two different things. I bought sophistication off the shelf and expected it to transfer. The design is polished and the content inside it is still "Chief Comedy Officer at Synergy Laughs."',
    industryContext: 'Premium UI kits create an illusion of design investment. A $49 kit produces $5,000-looking output, which collapses the relationship between effort and quality. When anyone can buy premium aesthetics, premium aesthetics stop signaling premium products.',
  },
  'landing-page:art-deco:pm': {
    perspective: 'The art deco version had the highest perceived quality score in user surveys but identical conversion to the baseline. Users thought it was more trustworthy, more professional, more expensive -- and then signed up at exactly the same rate.',
    confession: 'Perceived quality should be worth something. Brand perception is a real asset. But I can\'t depreciate "perceived quality" on a balance sheet, so it doesn\'t exist in my planning model.',
    industryContext: 'The gap between perception metrics and behavior metrics is the most expensive blind spot in product management. Users consistently rate designed experiences higher and then behave identically. The value of design lives in the gap between what users say and what they do.',
  },
  'landing-page:art-deco:founder': {
    perspective: 'The art deco version costs 6 weeks of designer time and the gold palette requires a custom icon set. Beautiful, but beautiful doesn\'t pay AWS bills in month three. I\'d rather ship ugly and iterate than design pretty and starve.',
    confession: 'I showed the art deco version to an enterprise prospect and they signed a pilot the same day. The default version had been sitting in their inbox for 2 weeks with no reply. Maybe pretty does pay bills. Just not the ones I was tracking.',
    industryContext: 'Enterprise sales is the one context where design ROI is immediate and measurable. A polished landing page closes enterprise deals that ugly pages leave on the table. But founders building for SMB and consumer audiences don\'t see this signal, and it doesn\'t apply to their market anyway.',
  },

  // ─── TEXT-HEAVY ───────────────────────────────────────────

  // ─── SLAP ─────────────────────────────────
  'text-heavy:slap:prompter': {
    perspective: 'I prompted for "authoritative thought leadership article" and got 12 minutes of confident nothing. The model opened with "In today\'s rapidly evolving comedic landscape" -- the most parodied sentence in content marketing -- and I shipped it because the alternative was silence.',
    confession: 'The "timing triad" isn\'t a real framework. The model invented it because it needed a three-point structure and couldn\'t find one that fit. I knew it was fabricated and I shipped it because it sounded plausible enough.',
    industryContext: 'AI-generated thought leadership is an oxymoron. The models are trained on existing thought leadership, so they can only recombine existing thoughts. The result is authoritative-sounding text that says nothing new -- which is, depressingly, indistinguishable from most human thought leadership.',
  },
  'text-heavy:slap:junior': {
    perspective: 'The article layout is a single column of text with no visual treatment. I used the default typography, default spacing, default everything. The article has 5 sections and they all look identical because I didn\'t design any of them.',
    confession: 'I read the first paragraph, realized the content was nonsense, and decided not to invest design effort in content nobody would read. Self-fulfilling prophecy: nobody reads it because I didn\'t design it, and I didn\'t design it because nobody reads it.',
    industryContext: 'Long-form content is the orphan of web design. Landing pages get hero treatments, e-commerce gets product photography, and articles get... a text column. The design investment is proportional to perceived revenue impact, and articles are the lowest on the totem pole.',
  },
  'text-heavy:slap:pm': {
    perspective: 'Nobody reads 12-minute articles. Our analytics show average time-on-page is 47 seconds. Design investment for a 12-minute article is solving a problem that doesn\'t exist because the problem is the content, not the design.',
    confession: 'The 8% who did read the whole thing shared it 5x more than short-form content. Design didn\'t increase readership, but it might have increased advocacy among readers. That\'s a metric I chose not to track.',
    industryContext: 'Content analytics are structurally biased against long-form. Average time-on-page is dragged down by bounces, making every article look unread. The readers who matter -- the ones who finish and share -- are invisible in aggregate metrics.',
  },
  'text-heavy:slap:founder': {
    perspective: 'This article exists because our SEO consultant said we need "thought leadership content" for domain authority. The content is a means to a PageRank end. Nobody on the team has read it all the way through, including me.',
    confession: 'I generated 12 articles in one afternoon with AI. This is the one that ranked. It ranked because it\'s long, has headers, and uses keywords -- not because it says anything. Google rewarded the structure, not the substance.',
    industryContext: 'SEO-driven content creation has created a quantity-over-quality feedback loop. Google\'s algorithm rewards length, structure, and keyword density -- all of which AI produces effortlessly. The result is an internet flooded with well-structured, keyword-rich, substantively empty articles.',
  },

  // ─── BRUTALIST ─────────────────────────────
  'text-heavy:brutalist:prompter': {
    perspective: 'The brutalist typography turns my content into a manifesto. The 900-weight uppercase headers make "The First Punchline Problem" sound like a declaration of war. The design gives my words an authority the words didn\'t earn.',
    confession: 'But the extreme hierarchy also makes every flaw visible. "In today\'s rapidly evolving comedic landscape" in monospace at 900 weight is impossible to ignore. The design that gives authority also refuses to let mediocrity hide.',
    industryContext: 'Brutalist design has an honesty problem in AI content contexts. It was created to strip away pretension, but applied to AI-generated text, it strips away the only thing protecting the content from scrutiny. Honesty and AI slop are incompatible aesthetics.',
  },
  'text-heavy:brutalist:junior': {
    perspective: 'The brutalist article template was the most visually striking option for long-form content. The extreme font weights create a clear hierarchy and the monospace pull quotes feel like the article is quoting source code -- technical and authoritative.',
    confession: 'I picked brutalist because I couldn\'t find any templates for text-heavy pages in my usual libraries. Brutalist was the only option that made a wall of text look intentional instead of lazy. The aesthetic covered for my lack of editorial design skills.',
    industryContext: 'Long-form web design is an underserved skill in the template economy. Most templates are for landing pages, dashboards, and e-commerce. When juniors need an article template, the options are "blog post basic" or "brutalist experimental." The middle ground doesn\'t exist in template libraries.',
  },
  'text-heavy:brutalist:pm': {
    perspective: 'The brutalist version had 30% higher scroll depth than the default. The extreme hierarchy gave readers structural landmarks that made the 12-minute article feel navigable instead of endless.',
    confession: 'Higher scroll depth doesn\'t mean higher comprehension. Readers may have been scanning the bold headers and skipping the body text. The metric I\'m celebrating might actually indicate that people read less of the content, faster.',
    industryContext: 'Engagement metrics for long-form content are fundamentally ambiguous. Scroll depth, time-on-page, and scroll velocity can all indicate either deep reading or rapid scanning. PMs choose the interpretation that supports their narrative.',
  },
  'text-heavy:brutalist:founder': {
    perspective: 'The brutalist article looks like a developer wrote it, which is on-brand for us. Technical audience, technical aesthetic. The monospace type says "we\'re engineers" even though the article was written by an AI.',
    confession: 'Our technical audience saw through the content in about 30 seconds. Turns out developers are really good at detecting AI-generated text. The brutalist design attracted exactly the audience most capable of identifying the content as fake.',
    industryContext: 'Technical audiences have the highest AI detection rate and the strongest negative reaction to detected AI content. Targeting developers with AI-generated text is the highest-risk content strategy in the market -- and every startup does it because developers are the highest-value audience.',
  },

  // ─── NEO-MINIMAL ──────────────────────────
  'text-heavy:neo-minimal:prompter': {
    perspective: 'The minimal design makes my AI-generated article feel like a Medium post from 2015 -- clean, restrained, confidence in the content to carry itself. The generous whitespace says "these words are worth the space they occupy."',
    confession: 'The words are not worth the space they occupy. The minimal design is gaslighting the reader into thinking there\'s substance in the whitespace. Every empty margin is a lie about the content\'s value.',
    industryContext: 'Minimal design has become the default credibility frame for content of any quality. Medium\'s design template taught a generation of writers that clean typography makes any content feel authoritative. The aesthetic has completely decoupled from the quality it was meant to signal.',
  },
  'text-heavy:neo-minimal:junior': {
    perspective: 'I used the neo-minimal template because long-form content needs breathing room. The thin fonts, generous margins, and single-column layout create a focused reading experience. I followed the typography guidelines from a web design course.',
    confession: 'I followed the guidelines mechanically -- 65 characters per line, 1.6 line height, 16px minimum -- without understanding why they work. The article is technically well-typeset and absolutely soulless. Correct and empty is still empty.',
    industryContext: 'Web typography best practices are widely documented and easy to implement. This has created a floor of typographic quality that any junior can hit, which means typography alone no longer differentiates. The bar is higher than "correct" now, and most juniors don\'t know what\'s above it.',
  },
  'text-heavy:neo-minimal:pm': {
    perspective: 'The minimal version had the longest average read time of any variation -- 4 minutes 12 seconds vs. the 47-second baseline. The clean design literally made people read more. That\'s a 5x improvement in engagement.',
    confession: 'They read more of the same bad content. Is "people spent longer reading AI slop" a success metric? I reported it as engagement growth. My manager congratulated me. Nobody asked what they were reading.',
    industryContext: 'Engagement metrics don\'t account for content quality. A 5x increase in time-on-page is celebrated equally whether users are reading brilliance or consuming AI-generated filler. The metrics infrastructure treats all attention as equal.',
  },
  'text-heavy:neo-minimal:founder': {
    perspective: 'The minimal article template took 30 minutes to set up. Single column, one font, one accent color. Time-to-publish is the only metric I care about for content, and minimal is the fastest path from "no article" to "published article."',
    confession: 'My investors asked about our "content strategy" and I pointed them to this article. They read the first paragraph, saw the clean design, and said "looks professional." Nobody reads past the fold. Design is the first-paragraph strategy for people who don\'t read.',
    industryContext: 'Minimal design has become the visual shorthand for "this company has its act together." The aesthetic communicates organizational maturity regardless of organizational reality. Startups use neo-minimal design the way job candidates use professional headshots -- signaling competence through presentation.',
  },

  // ─── MAXIMALIST ───────────────────────────
  'text-heavy:maximalist:prompter': {
    perspective: 'The editorial richness of the maximalist design makes my AI article look like a magazine feature. Serif headings, decorative borders, pull quotes -- the presentation implies that an editor curated this content. No editor touched it.',
    confession: 'The pull quotes are my biggest shame. The design literally pulls out sentences from the article and frames them as noteworthy insights. "The timing triad is a concept that has guided typographic decision-making for centuries" in a decorative pull quote box. It\'s a fabricated framework in a decorative lie frame.',
    industryContext: 'Editorial design conventions like pull quotes, sidebars, and decorative headers were created for content that earned that treatment through editorial curation. Applying them to AI-generated content borrows the authority of curation without the substance of editorial judgment.',
  },
  'text-heavy:maximalist:junior': {
    perspective: 'The maximalist text-heavy template was the most exciting to implement. Drop caps, decorative dividers, mixed typefaces, editorial sidebars -- every section felt like a design challenge. This is the first article layout I was proud to show in my portfolio.',
    confession: 'I spent more time designing the decorative dividers between sections than reading the content of the sections. The ornamental borders are pixel-perfect. The article they frame is 12 minutes of AI-generated nothing. Beautiful wrapping paper on an empty box.',
    industryContext: 'Design portfolios evaluate craft independent of content. A beautifully designed article full of AI slop gets the same portfolio response as a beautifully designed article full of Pulitzer-worthy prose. The portfolio format itself incentivizes visual investment over content investment.',
  },
  'text-heavy:maximalist:pm': {
    perspective: 'The maximalist article had the highest social share rate -- people shared screenshots of the design, not the content. The pull quotes, the editorial layout, the decorative elements all created shareworthy moments that had nothing to do with the words.',
    confession: 'We optimized for social sharing by making the design more elaborate. Then we measured the traffic from shares and found bounce rates of 90%. People came for the design, realized the content was empty, and left. We manufactured interest we couldn\'t convert.',
    industryContext: 'Social sharing metrics reward packaging over substance. A well-designed article with thin content gets shared more than a plainly designed article with deep insight. The share economy selects for visual appeal, which creates an evolutionary pressure toward elaborate design around shallow content.',
  },
  'text-heavy:maximalist:founder': {
    perspective: 'The maximalist article costs us $2,000 in designer time for a piece of content that generates $0 in direct revenue. The ROI calculation is simple: negative. Every dollar in editorial design is a dollar not spent on product.',
    confession: 'But our brand perception shifted after publishing it. Potential partners started calling us "that company with the beautiful blog." Perception opened doors that product alone couldn\'t. The $2,000 was brand investment, not content investment.',
    industryContext: 'Content marketing ROI is notoriously difficult to measure because the value accrues indirectly and over long time horizons. This makes it easy to cut in budget reviews and impossible to justify in spreadsheets. The companies that invest in content design can\'t prove it works; the companies that don\'t can\'t prove it doesn\'t.',
  },

  // ─── DARK INDUSTRIAL ──────────────────────
  'text-heavy:dark-industrial:prompter': {
    perspective: 'The dark industrial design makes my AI article read like technical documentation. The monospace section labels, amber accents, and dark background transform "thought leadership" into something that feels like a spec sheet. The design chose a genre my content can\'t support.',
    confession: 'The content says "In today\'s rapidly evolving comedic landscape" and the design says "SYSTEM DOCUMENTATION." The cognitive dissonance should be disqualifying, but somehow the design\'s authority overrides the content\'s emptiness. People trust the frame.',
    industryContext: 'Technical design aesthetics create a "documentation halo" -- content presented in terminal-style typography is perceived as more accurate and precise, regardless of actual accuracy. This is the visual equivalent of wearing a lab coat to sell vitamins.',
  },
  'text-heavy:dark-industrial:junior': {
    perspective: 'The dark theme with amber accents reduced eye strain for long-form reading. The monospace headers create clear section breaks and the terminal-inspired labels make navigation feel structured. This is the first article design that felt functional, not just pretty.',
    confession: 'I tested it at 2 AM in my dark apartment and it looked perfect. I tested it at noon on my manager\'s bright office monitor and it was illegible. Dark mode design needs to survive all lighting conditions, and I designed for exactly one.',
    industryContext: 'Dark mode has a testing gap. Most designers work in dim environments with high-end monitors, creating designs that fail on average screens in average lighting. The gap between design conditions and usage conditions is widest for dark themes.',
  },
  'text-heavy:dark-industrial:pm': {
    perspective: 'The dark industrial version had the highest engagement among our developer segment -- 6 minutes average read time vs. 47 seconds on default. But developers are 15% of our readership. Optimizing design for 15% is a segmentation decision, not a design decision.',
    confession: 'The developer segment also has the highest NPS and lowest churn. If I optimize content design for them, I\'m investing in our best users. If I optimize for the majority, I\'m investing in our most replaceable users. The math is uncomfortable.',
    industryContext: 'Content design segmentation doesn\'t exist as a product discipline. Most companies serve one design to all readers, which means the design optimizes for the average reader -- who doesn\'t exist. The lack of content personalization is a structural gap, not a design failure.',
  },
  'text-heavy:dark-industrial:founder': {
    perspective: 'The dark industrial article looks like it was written by our engineering team, which adds credibility to our "built by engineers, for engineers" brand narrative. The design sells the positioning even when the content is AI-generated marketing copy.',
    confession: 'Our engineering team writes documentation in Markdown. They\'ve never used amber accents or terminal labels in their life. The dark industrial design is engineering cosplay -- it looks like engineers without being engineers. My audience hasn\'t noticed the difference.',
    industryContext: 'Technical brand credibility is increasingly performed through design rather than demonstrated through product. Dark themes, monospace type, and terminal aesthetics have become the "tech company uniform" -- worn by companies regardless of their actual technical depth.',
  },

  // ─── WARM ORGANIC ─────────────────────────
  'text-heavy:warm-organic:prompter': {
    perspective: 'The warm design makes 12 minutes of AI content feel almost pleasant to read. The earth tones, soft spacing, and rounded containers create a reading environment where the content\'s emptiness is cushioned by comfort. People finish the article because the design makes staying easy.',
    confession: 'Comfort is not the same as quality. Readers finish the article and feel satisfied without having learned anything. The warm design creates the sensation of a good reading experience without the substance of one. It\'s a content placebo effect.',
    industryContext: 'User experience research consistently shows that perceived experience quality correlates more with visual design than content quality. A well-designed reading experience with mediocre content is rated higher than a poorly designed experience with excellent content. UX is winning the credibility war against editorial.',
  },
  'text-heavy:warm-organic:junior': {
    perspective: 'The warm organic template was the gentlest option for a 12-minute article. Earth tones, generous line height, soft section breaks -- everything is designed to reduce reading fatigue. The template documentation said "optimized for long-form comfort" and that\'s exactly what I needed.',
    confession: 'I optimized for comfort without questioning what the reader was being made comfortable reading. The article is 12 minutes of AI-generated cliches, and my design made those cliches feel like a fireside chat. I made the bad content harder to reject.',
    industryContext: 'Long-form reading comfort is a well-studied design problem with established best practices. Warm palettes, generous spacing, and rounded containers all reduce cognitive load. But "reduced cognitive load" applied to low-quality content means readers accept mediocrity more passively.',
  },
  'text-heavy:warm-organic:pm': {
    perspective: 'The warm organic version had the lowest bounce rate of any text-heavy variation. 62% of visitors scrolled past the first section, compared to 23% on default. The design kept people reading, which is the entire goal of a content page.',
    confession: 'They scrolled past the first section and into four more sections of the same quality. I celebrated a 62% scroll rate without asking whether the content justified the scrolling. Engagement without value is just well-designed distraction.',
    industryContext: 'Content engagement metrics have become divorced from content utility metrics. A reader who scrolls through an entire article registers as "engaged" regardless of whether they found the article useful, memorable, or actionable. The metric celebrates attention capture, not value delivery.',
  },
  'text-heavy:warm-organic:founder': {
    perspective: 'The warm organic article feels like it belongs on a wellness brand blog. The soft design communicates care and intentionality. Our brand positioning is "thoughtful tech," and this article design delivers that positioning even when the content is generic.',
    confession: 'I showed the warm article to a friend who said "this feels really well-written." She was talking about the design, not the words. The design created a perception of writing quality that the writing doesn\'t have. I thanked her and didn\'t correct the misunderstanding.',
    industryContext: 'Design-content conflation is a known cognitive bias: users attribute positive design feelings to the content itself. Founders exploit this by investing in design to compensate for content quality. It works, and the fact that it works is the uncomfortable truth of content marketing.',
  },

  // ─── RETRO-FUTURISM ───────────────────────
  'text-heavy:retro-futurism:prompter': {
    perspective: 'The gradient containers and teal-purple palette make a 12-minute article feel like a multimedia experience. My AI-generated text is wrapped in so much visual energy that readers confuse sensory stimulation with intellectual stimulation.',
    confession: 'Reading an article about "the timing triad" in gradient containers is like attending a lecture in a bounce house. The content is trying to be authoritative and the design is undermining it with every color transition. But engagement is up, so who\'s wrong?',
    industryContext: 'Content design is increasingly optimized for engagement over comprehension. Visually stimulating designs keep readers on-page longer but may reduce information retention. The metrics reward attention, not understanding, and attention is easier to design for.',
  },
  'text-heavy:retro-futurism:junior': {
    perspective: 'The retro-futurism article template was the most visually dynamic option for long-form content. The gradient section dividers create natural reading breaks and the teal-purple palette keeps the eye engaged through a long scroll.',
    confession: 'I designed the article to be visually interesting because the content isn\'t intellectually interesting. The gradients are compensation for substance. If the writing were genuinely compelling, it wouldn\'t need a color show.',
    industryContext: 'Visual compensation for content weakness is an unspoken design strategy. Designers intuitively add more visual interest when content is weaker, which creates a perverse relationship: the worse the content, the more designed it becomes. The best writing gets the plainest treatment.',
  },
  'text-heavy:retro-futurism:pm': {
    perspective: 'The retro-futurism version had unique engagement patterns -- users scrolled fast through text and slow through gradient transitions. They were consuming the design, not the content. The article became a visual experience that happened to contain words.',
    confession: 'I reported "high engagement" without noting that users were engaging with the wrong thing. Scroll velocity data showed they were skimming text and pausing on design elements. The content was the filler between the visual moments.',
    industryContext: 'Engagement analytics can\'t distinguish between content engagement and design engagement. A user pausing on a gradient transition and a user pausing on a key insight register identically in the data. This ambiguity allows PMs to claim engagement wins for design investments that bypass the content entirely.',
  },
  'text-heavy:retro-futurism:founder': {
    perspective: 'The retro-futurism article generated more backlinks than any other version -- other sites linked to it as a design example, not a content resource. The article\'s value to our SEO strategy came from being beautiful, not from being informative.',
    confession: 'We accidentally discovered that link-building through design quality is more effective than link-building through content quality. Other sites linked to our page because it looked amazing. The irony is that the content those links point to is AI-generated filler.',
    industryContext: 'SEO link-building strategies are evolving toward design-driven linkbait. A visually stunning article attracts links from design blogs, resource roundups, and inspiration sites -- regardless of content quality. Design has become an SEO strategy independent of content.',
  },

  // ─── MEMPHIS ──────────────────────────────
  'text-heavy:memphis:prompter': {
    perspective: 'The Memphis design creates the most extreme tonal mismatch of any variation. My AI article about "content excellence" is wrapped in floating geometric shapes and primary colors. The content is trying to be a thought leader and the design is throwing a party.',
    confession: 'The mismatch is so severe it almost becomes commentary. If someone did this intentionally, it would be brilliant satire of corporate content marketing. I didn\'t do it intentionally, so it\'s just a mistake that looks like art.',
    industryContext: 'Tonal mismatch between content and design is one of the most reliable slop indicators. When content tone and design tone diverge, it signals that the content and design were produced by different systems without coordination -- which is exactly how most AI-assisted content is made.',
  },
  'text-heavy:memphis:junior': {
    perspective: 'The Memphis template broke every rule I learned about text-heavy design. The geometric interruptions in the body text, the asymmetric margins, the bold color blocks between paragraphs -- it\'s anti-readability on purpose.',
    confession: 'I chose it because it was the most portfolio-worthy option. An article with floating triangles gets noticed at portfolio review. An article with correct typography doesn\'t. I optimized my portfolio at the expense of the user\'s reading experience.',
    industryContext: 'Portfolio-driven design selection is a systemic problem in junior design culture. The designs that advance careers are rarely the designs that serve users best. Memphis articles win portfolio reviews and lose readability audits -- and juniors are evaluated on portfolios.',
  },
  'text-heavy:memphis:pm': {
    perspective: 'The Memphis version had the most polarized feedback of any variation. NPS scores were bimodal -- 9s and 1s, almost nothing in between. Half the readers loved the energy, half couldn\'t finish the article.',
    confession: 'Bimodal NPS is usually a red flag. It means you\'re serving nobody well. But I reframed it as "strong reactions indicate a memorable experience" in my stakeholder report. I turned a failure signal into a success narrative.',
    industryContext: 'Data storytelling in product management is a euphemism for data manipulation. The same bimodal distribution is a warning sign or a success metric depending on the narrative frame. PMs learn to present data in the frame that supports the decision already made.',
  },
  'text-heavy:memphis:founder': {
    perspective: 'The Memphis article scared our enterprise prospects. One said "we can\'t share this internally -- it looks like a children\'s activity book." Enterprise buyers evaluate content by whether they can forward it to their boss. Bold shapes disqualify content from the forward chain.',
    confession: 'Our consumer users loved it though. The Memphis article was the most-read piece on our blog among the under-30 audience. I killed it because one enterprise prospect complained, even though it was working for a larger audience that pays less per head.',
    industryContext: 'Enterprise revenue concentration distorts design decisions. One $50K enterprise prospect has more influence on design direction than 1,000 $29/month consumers. The highest-paying customer\'s aesthetic preference becomes the company\'s design system by default.',
  },

  // ─── ART DECO ─────────────────────────────
  'text-heavy:art-deco:prompter': {
    perspective: 'The art deco design gives my AI article the gravitas of a financial prospectus. Serif headings with gold underline rules, geometric section dividers, symmetrical column layouts -- the design says "this content was written by someone important."',
    confession: 'It was written by a language model in 4 seconds. The gold underlines are doing more work than my prompt did. Every decorative element adds credibility my content doesn\'t deserve, and the accumulated effect is a lie told in typography.',
    industryContext: 'Typography has always been a credibility tool -- but historically, prestigious typesetting required prestigious resources. Now AI generates content and premium templates provide the typography. The credibility signals that once required institutional investment are available for $49.',
  },
  'text-heavy:art-deco:junior': {
    perspective: 'The art deco article template was the most sophisticated option in the UI kit. The geometric headers, gold accent system, and symmetrical layouts created a reading experience that felt like a published book, not a blog post.',
    confession: 'I couldn\'t identify what specifically made it feel sophisticated. I just knew it looked expensive. Understanding the "why" behind art deco design is a level of design literacy I haven\'t reached yet. I\'m cargo-culting elegance.',
    industryContext: 'Design literacy has a depth problem. Juniors can identify and apply aesthetic styles without understanding their historical context, proportional systems, or appropriate use cases. Art deco in a UI kit is style without theory -- which is sufficient for most production environments.',
  },
  'text-heavy:art-deco:pm': {
    perspective: 'The art deco article version had the highest completion rate among readers aged 40+. The serif typography and gold accents resonated with an audience that associates those elements with quality publishing. Design matched audience expectation.',
    confession: 'We accidentally discovered age-based design segmentation. The same article in art deco vs. retro-futurism attracted completely different demographics. I didn\'t plan for this -- I stumbled into it. But I presented it as a strategic insight in my quarterly review.',
    industryContext: 'Demographic design affinity is a real but underexploited variable in content strategy. Different age groups respond to different typographic and color conventions, but most content teams serve one design to all readers. The gap between what we know and what we implement is a resource problem, not a knowledge problem.',
  },
  'text-heavy:art-deco:founder': {
    perspective: 'The art deco article made us look established. A VC told me "your content looks like it comes from a 10-year-old company." We\'re 18 months old. The design is aging us up in the best possible way.',
    confession: 'Looking established when you\'re a startup is a form of deception. Investors and customers are making trust decisions based on perceived maturity. The art deco design is giving us credit for years of brand-building we haven\'t done. I feel both grateful and guilty.',
    industryContext: 'Visual maturity signaling is a competitive strategy for early-stage companies. Art deco, serif typography, and gold accents communicate institutional permanence. In markets where trust correlates with longevity, new companies use design to borrow the credibility of older ones.',
  },

  // ─── E-COMMERCE ───────────────────────────────────────────

  // ─── SLAP ─────────────────────────────────
  'e-commerce:slap:prompter': {
    perspective: 'I asked for "premium product descriptions" and got "experience physical comedy the way it was meant to be performed." The banana peel has a proprietary technology name because the model thinks that\'s what "premium" means. SlipShield\u2122 — it tests well in copy evaluation frameworks.',
    confession: 'SlipShield is not a real technology. The model invented a trademarked-sounding word because the training data associates premium products with proprietary terminology. I shipped a fake technology name because it scored high on "perceived premium." Every product description reads like a Kickstarter stretch goal.',
    industryContext: 'AI product copy has created a naming crisis. Every AI-generated product description invents proprietary technology names, which means the market is filling with fake features that all sound equally impressive. When everything has a trademarked-sounding technology, nothing does.',
  },
  'e-commerce:slap:junior': {
    perspective: 'The product grid is standard -- 4 columns, white cards, system font. Every e-commerce template on the internet looks like this because it\'s the proven layout. Products, prices, add-to-cart. What else do you need?',
    confession: 'I searched "e-commerce template" and used the first result. Product cards, cart drawer, checkout form -- it\'s a copy of a copy of a copy. Every decision was someone else\'s decision from three generations of templates ago.',
    industryContext: 'E-commerce design has converged on a single template: grid of cards with image, title, price, and button. This convergence is driven by Shopify themes, which represent 80%+ of new e-commerce design. Deviation from the template feels like risk, so nobody deviates.',
  },
  'e-commerce:slap:pm': {
    perspective: 'Product photos drive 80% of purchase decisions. The page design around them is a rounding error in conversion data. I\'d rather invest in better product photography than in redesigning the grid layout.',
    confession: 'Amazon is ugly. It converts at 74%. The best-designed e-commerce site I\'ve seen converts at 2.1%. Design is not the variable we think it is -- at least not for single-transaction conversion. But brand loyalty is a different metric entirely, and I\'m not measured on that.',
    industryContext: 'E-commerce product management has a "Amazon problem." The ugliest marketplace in the world has the highest conversion rate. This creates a false proof that design doesn\'t matter for commerce, ignoring that Amazon\'s conversion is driven by selection, price, and Prime shipping -- not page design.',
  },
  'e-commerce:slap:founder': {
    perspective: 'I launched the store in a weekend using Shopify\'s free theme. First sale came in 72 hours. The product descriptions are AI-generated, the product photos are from the supplier, and the design is a template. Total investment: $29/month and one Saturday.',
    confession: 'Average order value is $34.99. Competitors with designed storefronts average $89.99. The same products, positioned differently, command 2.5x the price. I\'m leaving money on the table because "ship fast" doesn\'t account for "sell premium."',
    industryContext: 'Direct-to-consumer e-commerce has a design-price correlation that founders ignore. Products in designed environments sell for higher prices. But the data only becomes visible at scale, and startups optimize for survival metrics (any sale > no sale) before they optimize for value metrics (high margin > low margin).',
  },

  // ─── BRUTALIST ─────────────────────────────
  'e-commerce:brutalist:prompter': {
    perspective: 'The brutalist product grid strips everything down to name, price, and button. My AI product descriptions are still there, but the design minimizes them. "Experience physical comedy the way it was meant to be performed" is set in monospace at 12px. The design is burying my copy.',
    confession: 'Good. The less visible my AI product descriptions are, the less damage they do. The brutalist design accidentally solved the AI copy problem by making the copy an afterthought. The product speaks through the grid, not through the words.',
    industryContext: 'Product page design has an inverse relationship with copy quality: the more the design emphasizes copy, the more copy quality matters. Brutalist e-commerce inadvertently solves the AI copy problem by deprioritizing words entirely. The design strategy is "less copy surface area = less slop exposure."',
  },
  'e-commerce:brutalist:junior': {
    perspective: 'The brutalist product grid is the most efficient layout I\'ve ever seen. Every card is identical, the prices are monospace and aligned, and the add-to-cart button is impossible to miss. It\'s not pretty but it\'s functional.',
    confession: 'I can\'t find brutalist e-commerce in any template library. I had to build this from scratch, which means I actually learned something about grid layout, spacing, and visual hierarchy. The template-less approach forced me to become a better designer.',
    industryContext: 'Template scarcity in unconventional design styles accidentally creates learning opportunities. When juniors can\'t find a template, they build from scratch. Building from scratch teaches principles that templates hide. The design education gap is largest in the most template-saturated categories.',
  },
  'e-commerce:brutalist:pm': {
    perspective: 'The brutalist store had the fastest time-to-purchase of any variation. Cart addition to checkout completion in 47 seconds. The stripped-down interface eliminates every decision point between "I want this" and "I bought this."',
    confession: 'But the average order value dropped 18%. People bought faster but bought cheaper items. The brutalist design removes the emotional context that justifies premium pricing. Efficiency and premium perception are competing objectives.',
    industryContext: 'E-commerce checkout optimization has a speed vs. value tradeoff that most PMs don\'t acknowledge. Faster checkout means fewer upsell opportunities, less time to build purchase confidence, and reduced willingness to pay premium. The "reduce friction" mantra has a hidden cost in average order value.',
  },
  'e-commerce:brutalist:founder': {
    perspective: 'The brutalist store looks like a product spec sheet. For props, that\'s actually what power users want. Name, specs, price, buy. No lifestyle imagery, no aspirational copy, no emotional manipulation. Just commerce.',
    confession: 'It works for props and gags. It fails completely for sets and costume products. The whoopee cushion and foam brick collection look clinical in a brutalist grid. Products that sell on emotion need emotional design. I learned this by losing sales.',
    industryContext: 'Category-appropriate design is obvious in retrospect and invisible in advance. Props shoppers and lifestyle shoppers have fundamentally different decision processes, and a single design system serves one at the expense of the other. Most startups can\'t afford category-specific design until they\'re big enough that the damage is already done.',
  },

  // ─── NEO-MINIMAL ──────────────────────────
  'e-commerce:neo-minimal:prompter': {
    perspective: 'The minimal product cards let my AI descriptions breathe without drowning in them. The clean layout gives each product a contained space where "crafted with meticulous attention to detail" doesn\'t feel as aggressive as it does in a dense grid.',
    confession: 'The whitespace around my product descriptions is doing the same thing for e-commerce that it does for landing pages -- creating a perception of quality through emptiness. The less crowded the card, the more premium the product feels. My copy is riding the design\'s credibility.',
    industryContext: 'Whitespace has become the primary premium signaling tool in e-commerce. Apple, Aesop, and luxury brands all use generous spacing to imply exclusivity. This has trickled down to template marketplaces, where "minimal" is synonymous with "premium." The signal has become noise.',
  },
  'e-commerce:neo-minimal:junior': {
    perspective: 'The minimal product grid follows every e-commerce best practice: clear product images, readable prices, prominent add-to-cart buttons, generous spacing between cards. This is the Shopify checkout of product grids -- proven, reliable, invisible.',
    confession: 'I spent so little time on this design that my timesheet shows 2 hours for the entire store. The template did everything. My contribution was choosing the accent color. I\'m a designer who didn\'t design anything, and the result is fine. That\'s the uncomfortable part.',
    industryContext: 'E-commerce design has been so thoroughly templated that a designer\'s contribution can approach zero. Shopify themes, BigCommerce templates, and WooCommerce skins handle layout, typography, and interaction patterns. The junior designer\'s role has been reduced to accent color selection and asset swapping.',
  },
  'e-commerce:neo-minimal:pm': {
    perspective: 'The minimal store had the highest cart completion rate at 68%. Clean layout, clear pricing, no distractions between the product and the purchase. The design removes every reason to abandon the cart.',
    confession: 'Cart completion is my headline metric, but average order value was the lowest of the styled variations. People completed their carts but bought the cheapest items. The minimal design creates functional confidence but not premium aspiration. Users buy what they need, not what they want.',
    industryContext: 'E-commerce metric optimization has a portfolio effect: improving one metric often degrades another. Cart completion and average order value are inversely correlated in minimal designs. PMs report whichever metric moved in the right direction.',
  },
  'e-commerce:neo-minimal:founder': {
    perspective: 'The minimal store launched in a weekend and looks clean on mobile. 78% of our traffic is mobile. A minimal design that works on a 375px screen is worth more than a beautiful design that breaks at small viewports.',
    confession: 'I chose minimal because responsive design is expensive and minimal is the only aesthetic that survives viewport compression without breaking. "Mobile-first" and "minimal" are the same decision wearing different hats. I\'m not a minimalist -- I\'m a pragmatist.',
    industryContext: 'Mobile commerce has created a convergence pressure toward minimal design. Decorative elements, editorial layouts, and maximalist compositions all degrade at small viewports. The physics of mobile screens rewards simplicity, and mobile traffic share keeps growing. Eventually all e-commerce design will be minimal because phones demand it.',
  },

  // ─── MAXIMALIST ───────────────────────────
  'e-commerce:maximalist:prompter': {
    perspective: 'The maximalist product cards make my AI descriptions feel like editorial copy. Each product gets a decorative frame, a serif product name, and a curated presentation that implies someone hand-selected these items. The design is manufacturing curation.',
    confession: 'Every product card looks like a magazine advertisement. "Experience physical comedy the way it was meant to be performed" in serif type with decorative borders actually reads as a real ad tagline. My AI copy works best when the design treats it like advertising -- surface appeal without depth.',
    industryContext: 'Editorial e-commerce design borrows the conventions of print advertising, where surface appeal IS the content. Product descriptions in editorial frames aren\'t evaluated for informational content -- they\'re evaluated for tonal fit. AI copy that sounds "premium enough" passes the editorial test even when it says nothing.',
  },
  'e-commerce:maximalist:junior': {
    perspective: 'The maximalist product grid was the hardest to build. Each card has layered borders, mixed typography, editorial spacing, and decorative elements that need to stay proportional across screen sizes. This is the first time I understood why senior designers charge what they charge.',
    confession: 'The mobile version is broken. The decorative borders overlap product images, the serif text is too small on phone screens, and the editorial spacing creates infinite scroll on a 375px viewport. I designed for desktop and the 78% mobile audience got a degraded experience.',
    industryContext: 'Maximalist design has a mobile tax. Every decorative element that looks elegant on desktop becomes a liability on mobile. The design hours multiply because mobile adaptation isn\'t simplification -- it\'s redesign. Most teams don\'t budget for this, so mobile maximalism ships broken.',
  },
  'e-commerce:maximalist:pm': {
    perspective: 'The maximalist store had the highest average order value at $94.50 -- 2.7x the default. The editorial presentation made every product feel curated and premium. People spent more because the design implied the products were worth more.',
    confession: 'But cart abandonment was 62%. People added premium items and then abandoned at checkout, possibly experiencing sticker shock when the cart total appeared without the editorial framing. The design sold aspirations that the checkout page couldn\'t sustain.',
    industryContext: 'E-commerce cart abandonment is highest in premium-designed stores. The emotional context of the product page creates purchase intent that evaporates at checkout\'s functional context. The gap between "browsing" emotion and "buying" reality is the maximalist store\'s structural weakness.',
  },
  'e-commerce:maximalist:founder': {
    perspective: 'The maximalist store took 4 weeks of design time. For 8 products. Each product card was individually art-directed. At that velocity, adding new products costs $500 each in design time. The operational cost is unsustainable at our scale.',
    confession: 'But a customer emailed saying our store was "the most beautiful online shop she\'d ever seen" and linked it in her newsletter to 12,000 subscribers. That single email drove more traffic than our entire paid ad budget for the month. Beautiful is expensive until it goes viral.',
    industryContext: 'Maximalist e-commerce creates a scaling paradox: the design quality that drives word-of-mouth growth can\'t be maintained as the product catalog grows. Every startup hits the wall where adding a product card takes longer than sourcing the product. Design complexity becomes the operational bottleneck.',
  },

  // ─── DARK INDUSTRIAL ──────────────────────
  'e-commerce:dark-industrial:prompter': {
    perspective: 'The dark industrial product cards read like equipment spec sheets. Product names in monospace, prices in amber, descriptions set small and functional. My AI copy is still visible, but the design recontextualizes it as technical data instead of marketing fluff.',
    confession: '"SlipShield technology" sounds more plausible when it\'s displayed next to a product name in monospace amber on dark navy. The terminal aesthetic projects engineering credibility onto my fabricated feature names. The design is laundering my fake technologies through technical aesthetics.',
    industryContext: 'Technical design aesthetics create a "spec sheet credibility" for product features. Proprietary technology names displayed in monospace type are perceived as more real than the same names in serif type. The design vocabulary of engineering becomes a trust-manufacturing tool.',
  },
  'e-commerce:dark-industrial:junior': {
    perspective: 'The dark product grid looks like a high-end props retailer. The amber accents on dark background make every product feel like professional equipment. The monospace prices feel precise and technical.',
    confession: 'Half our products are stage sets -- a breakaway chair and foam bricks. They look absurd in a terminal aesthetic. The dark industrial design works for props and fails spectacularly for everything else. I didn\'t build a product grid; I built a tech store that happens to sell foam bricks.',
    industryContext: 'Design systems that work for one product category rarely work for all categories. E-commerce platforms need design flexibility that matches their product diversity. Dark industrial is a category-specific design applied as a universal system -- which means half the catalog is fighting the design.',
  },
  'e-commerce:dark-industrial:pm': {
    perspective: 'The dark industrial store had a strong conversion rate for props -- 4.2% vs. 2.8% baseline. But sets conversion dropped to 0.9%. The design self-selected for tech-savvy shoppers who don\'t buy foam bricks.',
    confession: 'I reported the props conversion rate as the headline number and buried the sets data. Category-level metrics paint a different picture than aggregate metrics, and I chose the picture that made my design decision look smart.',
    industryContext: 'Aggregate e-commerce metrics hide category-level failures. A strong overall conversion rate can mask a design that\'s killing specific product categories. Most PM dashboards show top-line numbers, and drilling into category performance requires effort that busy PMs don\'t invest.',
  },
  'e-commerce:dark-industrial:founder': {
    perspective: 'The dark industrial store attracted a developer audience that we didn\'t know we had. Developers buying banana peels through a terminal-aesthetic store became our highest-LTV segment. The design accidentally discovered a market segment.',
    confession: 'We accidentally lost our sets customers in the process. The breakaway chair that sold 20 units/month in the default store sold 3 in dark industrial. The design optimized for one audience by making another audience feel unwelcome. Discovery and exclusion were the same action.',
    industryContext: 'Design-driven market segmentation is powerful but zero-sum. A design that attracts one segment repels another. Startups with diverse product catalogs need design flexibility, but design flexibility costs more than design consistency. The budget constraint forces a segment choice masquerading as a design choice.',
  },

  // ─── WARM ORGANIC ─────────────────────────
  'e-commerce:warm-organic:prompter': {
    perspective: 'The warm organic design makes my product descriptions feel handcrafted. "Crafted with meticulous attention to detail" in a soft serif with earth-tone background reads as artisanal rather than algorithmic. The design turns AI copy into cottage-industry marketing.',
    confession: 'The warmth is so effective at manufacturing authenticity that I feel guilty. "Each piece is a unique expression of artisanal excellence" in a warm design is indistinguishable from a genuine artisan\'s product page. The design is erasing the line between AI-generated and human-crafted.',
    industryContext: 'Warm organic design is the most effective disguise for AI-generated product copy. The aesthetic association with handmade, artisanal, and authentic products creates a context where AI copy reads as genuine human voice. This combination is the most commercially effective -- and ethically questionable -- design-content pairing.',
  },
  'e-commerce:warm-organic:junior': {
    perspective: 'The warm product grid makes everything look like it came from a curated boutique. Earth tones, soft shadows, rounded cards -- the template was marketed as "artisan marketplace" and it delivers that feeling even for banana peels.',
    confession: 'Making mass-produced banana peels look artisanal is design dishonesty and I know it. The whoopee cushion genuinely deserves this treatment. The props don\'t. But the template applies the same warm wrapper to everything, and I wasn\'t confident enough to push for product-specific design.',
    industryContext: 'One-size-fits-all e-commerce templates can\'t distinguish between products that deserve artisanal presentation and products that don\'t. The warm organic template treats banana peels and hand-crafted whoopee cushions identically, which is dishonest for one and appropriate for the other.',
  },
  'e-commerce:warm-organic:pm': {
    perspective: 'The warm organic store had the highest return customer rate -- 34% of buyers came back within 30 days. The warm design creates an emotional attachment to the shopping experience that transcends individual products.',
    confession: 'Return customers bought more sets and fewer props on repeat visits. The warm design trained our customer base to see us as a lifestyle store, not a tech store. The design changed our product-market fit without anyone deciding to change it.',
    industryContext: 'Design inadvertently shapes product-market fit. A warm organic store attracts lifestyle shoppers regardless of the product catalog. The design becomes a customer acquisition filter that attracts one segment and repels another. Over time, the design\'s taste becomes the company\'s identity.',
  },
  'e-commerce:warm-organic:founder': {
    perspective: 'The warm organic store feels like a Sunday farmers market in a browser. Customers trust it, browse longer, and leave positive reviews about the "shopping experience." For the first time, people are complimenting the store, not just the products.',
    confession: 'Customers are trusting the design more than the products deserve. Our foam brick supplier ships the same foam bricks to 200 other stores. The warm organic design makes our $19.99 foam bricks feel like $45 foam bricks from a hand-pour studio. We\'re selling ambiance, not products.',
    industryContext: 'E-commerce design has become the product. In commodity markets where identical products are sold by hundreds of retailers, the shopping experience is the only differentiator. Warm organic design is the most effective experience investment because trust and warmth drive repeat purchases more than price or selection.',
  },

  // ─── RETRO-FUTURISM ───────────────────────
  'e-commerce:retro-futurism:prompter': {
    perspective: 'The gradient product cards and teal-purple palette make shopping feel like browsing a tech lifestyle brand. My AI product descriptions are still generic, but the visual energy of the design creates excitement that the words can\'t generate alone.',
    confession: 'The retro-futurism design turns product browsing into entertainment. Users add items to cart because the interaction is fun, not because the product description convinced them. My carefully prompted copy is irrelevant -- the add-to-cart animation is doing the selling.',
    industryContext: 'Interactive design is replacing persuasive copy in e-commerce conversion. Hover effects, cart animations, and micro-interactions drive purchases more effectively than product descriptions. This shifts the value chain from copywriters to interaction designers and makes AI product copy a commodity input.',
  },
  'e-commerce:retro-futurism:junior': {
    perspective: 'The retro-futurism product grid was the most fun to build. Hover animations on every card, gradient transitions between product images, bouncy add-to-cart buttons. The store feels alive. Every interaction gives feedback.',
    confession: 'I spent 2 days on hover animations and 0 days on the checkout flow. The product browsing is delightful and the checkout is a default Stripe form. The experience peaks at "add to cart" and flatlines at "enter your credit card." The fun stops where the money starts.',
    industryContext: 'Design effort in e-commerce is inversely distributed to business importance. Product browsing gets the most design attention and generates no revenue. Checkout gets the least design attention and generates all revenue. Designers optimize for delight, businesses need conversion, and the two rarely overlap.',
  },
  'e-commerce:retro-futurism:pm': {
    perspective: 'The retro-futurism store had the highest add-to-cart rate at 28% -- but the lowest checkout completion at 31%. People added products for fun and abandoned at checkout. The gap between "I want to play" and "I want to pay" is the store\'s fatal flaw.',
    confession: 'I know the checkout experience is the problem. The retro-futurism store creates a dopamine loop during browsing that crashes when you reach a plain checkout form. But redesigning checkout is a 6-sprint project and my OKR deadline is in 2 sprints.',
    industryContext: 'E-commerce has a "last mile" design problem. The distance between product discovery and purchase completion is where most design investment should go, but most investment goes to the browsing experience because it\'s more visible and more fun to design. The checkout funnel is the unsexy work that drives all revenue.',
  },
  'e-commerce:retro-futurism:founder': {
    perspective: 'The retro-futurism store gets the most social media mentions of any variation. People share screenshots of the product cards, the hover animations, the gradient backgrounds. Our store is a content source for design Twitter.',
    confession: 'Design Twitter shares don\'t buy banana peels. Our most-shared product card -- the banana peels with the teal gradient hover -- has a conversion rate of 0.3%. The most admired product is the least purchased product. Virality and viability are different metrics.',
    industryContext: 'Social visibility and commercial viability are poorly correlated in e-commerce. The most shareable stores (bold, animated, visually distinctive) are rarely the highest-converting stores (clean, fast, frictionless). Founders who optimize for social proof discover this gap at scale.',
  },

  // ─── MEMPHIS ──────────────────────────────
  'e-commerce:memphis:prompter': {
    perspective: 'The Memphis product grid makes shopping feel like browsing an art gallery. Bold geometric shapes around product cards, primary color backgrounds, asymmetric layouts -- my product descriptions are the least interesting thing on the page.',
    confession: 'For the first time, I\'m OK with my copy being invisible. The Memphis design doesn\'t need persuasive copy because the design IS the persuasion. Products in Memphis frames feel like collectibles regardless of what the description says. The words are irrelevant, and the designer in me should be alarmed.',
    industryContext: 'Design-led commerce (where visual presentation drives purchases more than product information) is growing as AI floods the market with indistinguishable product descriptions. When every product has an AI-generated "premium" description, the words stop mattering and the design becomes the only differentiator.',
  },
  'e-commerce:memphis:junior': {
    perspective: 'The Memphis product grid was the most creative e-commerce layout I\'ve ever built. Geometric shapes as product card backgrounds, bold color blocking between categories, asymmetric grid that makes every product feel like a feature. This is e-commerce as art direction.',
    confession: 'Finding the buy button takes 6 seconds on average. I timed it. The geometric shapes are competing with the add-to-cart buttons for visual attention. The design is so bold that functional elements disappear into the composition. Art direction and usability are fighting.',
    industryContext: 'Creative e-commerce design has a diminishing returns curve. Visual differentiation improves brand recall and social sharing up to a point, then degrades usability. The Memphis store sits past the inflection point -- more creative than functional. Most design teams don\'t have the data to find the curve, so they can\'t locate the optimum.',
  },
  'e-commerce:memphis:pm': {
    perspective: 'The Memphis store had the youngest average customer age at 24.3 years. The bold, playful design attracted Gen Z shoppers who are otherwise hard to reach. Demographics data shows the design is functioning as a customer acquisition filter.',
    confession: 'Gen Z has the lowest average order value of any segment -- $28.50 vs. $67.00 for the 35+ demographic. The Memphis design attracts the audience with the least purchasing power. Customer acquisition cost per dollar of revenue is the worst of any variation.',
    industryContext: 'Youth-targeting design is a long-term bet with short-term costs. Gen Z shoppers spend less now but build brand loyalty that compounds over a decade. The financial model to justify this investment doesn\'t exist in quarterly planning cycles.',
  },
  'e-commerce:memphis:founder': {
    perspective: 'The Memphis store has personality. In a market full of identical Shopify stores, being memorable is its own competitive advantage. People describe our store as "the one with the bold shapes" and that recognition is worth more than a 2% conversion lift.',
    confession: 'But brand memorability doesn\'t appear in my investor dashboard. My investors want GMV growth, not brand recall. I\'m making a 5-year brand bet with money I need to survive the next 12 months. The timeframe mismatch between brand building and startup survival is the real problem.',
    industryContext: 'E-commerce brand building operates on a different timeline than e-commerce revenue generation. Design investments in brand distinctiveness take 2-3 years to produce measurable returns, but startup runway is measured in months. The companies that survive long enough to benefit from brand design are the companies that could afford to wait.',
  },

  // ─── ART DECO ─────────────────────────────
  'e-commerce:art-deco:prompter': {
    perspective: 'The art deco product cards make every item feel like a luxury good. Gold borders, serif product names, geometric price badges -- "Professional-Grade Banana Peel" in an art deco frame looks like something from a Bergdorf window. The design is manufacturing luxury out of commodity products.',
    confession: 'My AI product descriptions finally found their context. "Experience physical comedy the way it was meant to be performed" in serif type with gold accents reads as aspirational luxury copy, not as generic AI filler. The design gave my copy a social class it didn\'t have.',
    industryContext: 'Luxury design aesthetics are being democratized through templates and UI kits, which means commodity products can now look premium at template prices. This is collapsing the design-quality correlation that luxury brands spent decades building. When $12.99 banana peels look like $129.99 banana peels, the premium signal becomes noise.',
  },
  'e-commerce:art-deco:junior': {
    perspective: 'The art deco product grid is the most polished e-commerce layout I\'ve built. Geometric patterns, gold accent systems, symmetrical product cards with serif typography -- every element feels considered and intentional.',
    confession: 'The UI kit cost $49 and did 90% of the work. My contribution was swapping product images and adjusting the gold accent hex code. I\'m in my portfolio presenting "art direction" that was entirely designed by someone I\'ve never met. The craft I\'m taking credit for isn\'t mine.',
    industryContext: 'Attribution in template-based design is an ethical gray area. Juniors present template-customized work as portfolio pieces, and hiring managers can\'t distinguish template assembly from original design. The template economy has made "designed by" meaningless as a credit.',
  },
  'e-commerce:art-deco:pm': {
    perspective: 'The art deco store had the highest average order value at $112.40 and the lowest cart abandonment at 23%. The premium design created purchase confidence -- users felt they were buying quality products from a quality store.',
    confession: 'The products are identical across all variations. The $112.40 AOV vs. $34.99 on the default store means the art deco design is adding $77 of perceived value through aesthetics alone. I should celebrate this. Instead I feel like I\'m running a con.',
    industryContext: 'Design-driven price perception is the most powerful -- and least discussed -- lever in e-commerce. The same product in different design contexts commands different prices because visual design modifies perceived value. This is well-documented in retail psychology but rarely acknowledged in product management because it feels manipulative.',
  },
  'e-commerce:art-deco:founder': {
    perspective: 'The art deco store makes us look like a premium brand. Enterprise purchasing departments evaluate vendors partly on visual professionalism. One procurement manager said "your store looks like a real company." The design crossed us from "startup" to "vendor."',
    confession: 'How many designer hours went into those gold accents? How much did the geometric patterns cost? The art deco store is our most expensive design asset and our most effective sales tool. Every time I question the design budget, I remember the procurement manager\'s face.',
    industryContext: 'B2B e-commerce design is evaluated by procurement teams who use visual quality as a vendor legitimacy signal. A premium-looking store suggests organizational maturity, financial stability, and product quality -- none of which are guaranteed by design. But the signal is strong enough that design investment has direct revenue impact in B2B channels.',
  },
};

export function getCrewFinding(slug: string, variationId: string, crewId: string): CrewFinding | undefined {
  return crewFindings[`${slug}:${variationId}:${crewId}`];
}

export function getAllCrewFindings(slug: string, variationId: string): { crewId: string; finding: CrewFinding }[] {
  const crewIds = ['prompter', 'junior', 'pm', 'founder'];
  return crewIds
    .map(id => ({ crewId: id, finding: crewFindings[`${slug}:${variationId}:${id}`] }))
    .filter((entry): entry is { crewId: string; finding: CrewFinding } => entry.finding !== undefined);
}
