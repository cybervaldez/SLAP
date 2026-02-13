# Persona x Variation Interaction Guide

## Purpose

This document shows how personas with cultural identities react differently to the same design variation -- and how those reactions change across archetypes. It's the practical companion to `SLAPSTICK_CONCEPT.md`: that doc defines the system, this doc shows it in action.

Use this document as:
1. A reference for writing persona findings with cultural depth
2. Examples showing how the same variation triggers different reactions based on persona taste
3. A guide for the Crew panel's meta-commentary
4. Content for the landing page showing the Rotten Tomatoes effect in action

---

## How Cultural Identity Changes the Critique

### The Old Way (Functional Lens Only)

When Marcus was just "a colorblind user," every finding was about color contrast:
- Brutalist Marcus: "High contrast, good."
- Neo-Minimal Marcus: "Blue accent on near-white, safe."
- Art Deco Marcus: "Gold on dark, needs care."

Technically correct. Boring. Predictable. You could generate his feedback with a WCAG checker.

### The New Way (Functional Lens + Cultural Identity)

Marcus is a manga reader, indie gamer, and mechanical keyboard collector. His cultural identity adds a second dimension to every observation:

**Marcus on Brutalist (his natural critic)**
- Functional: "High contrast black/white passes WCAG AAA easily -- clearest text of any variation."
- Cultural: "This layout has zero information density. In manga, a single page can have 6-8 panels each telling a different part of the story. This page has one column of text with thick borders around nothing. It's like a game HUD with no data in it."
- Tension: Marcus respects the contrast but is bored by the emptiness. His gaming background makes him crave information density that Brutalist deliberately strips away.

**Marcus on Dark Industrial (his home variation)**
- Functional: "Gold on dark navy provides sufficient contrast for my color vision. The monospace type is readable."
- Cultural: "THIS is a proper interface. The monospace type, the technical labels, the dark background -- it feels like a game settings menu or a dev console. Information is dense and structured. I'd mod this if I could."
- Tension: Marcus loves the aesthetic but his accessibility training makes him flag the smaller monospace body text that slows reading speed.

**Marcus on Neo-Minimal (his nightmare variation)**
- Functional: "Blue accent on white is safe for color vision. Clean, no issues."
- Cultural: "Where's all the information? This is like an empty inventory screen with beautiful UI chrome and nothing in it. All this whitespace could hold actual content. The restraint is elegant -- and completely wasteful."
- Tension: Technically accessible, culturally offensive to a power user who values density.

---

## Variation x Persona Reaction Matrix (With Examples)

### BRUTALIST -- "Raw & Honest"

The brutalist variation polarizes on the comfort/efficiency axis. People who value efficiency love it. People who value comfort hate it.

#### Fans

**Frank** (frustrated, ESPN-obsessed, 41)
> **Landing Page:** "This is the ESPN scoreboard of landing pages. Headline, price, button. Done. I found what I needed in 3 seconds. No animations, no gradients, no noise. If every website worked like this I'd have an extra hour in my day."
> **E-Commerce:** "Grid gap is consistent, every product card is identical, prices are massive and monospace. I can comparison-shop at a glance. This is how commerce should work."
> **Text-Heavy:** "The extreme hierarchy means I can scan the headers and skip the paragraphs. The article is still bad but at least the design doesn't make me work to discover that."

**Sarah** (skeptical evaluator, spreadsheet enthusiast, 33)
> **Landing Page:** "No gradients hiding bad design. No glassmorphism distracting from empty content. The brutalist frame is like putting a spotlight on a witness -- every flaw in the copy is visible. I respect that honesty."
> **E-Commerce:** "Monospace prices aligned in a grid? That's a spreadsheet person's dream. I can compare values without the design adding emotional manipulation. What you see is what you get."

**Dex** (subculture evaluator, vinyl DJ, zine maker, 30)
> **Landing Page:** "This is punk rock in web form. No polish, no compromise, no 'please like us' energy. The thick borders and uppercase type feel like a gig poster. Raw and authentic."
> **E-Commerce:** "The product grid looks like a record shop catalog -- minimal, functional, letting the products speak. No lifestyle photography, no aspirational BS."

#### Critics

**Dorothy** (non-technical novice, romance novels, Hallmark movies, 68)
> **Landing Page:** "I thought the page didn't load properly. Everything is flat and harsh. The ALL CAPS headings feel like someone's yelling at me. Where's the welcome? Where's the warmth? I'd close this tab and look for something friendlier."
> **E-Commerce:** "FIELD_01? FIELD_02? At checkout? I thought the website was broken. I almost called my son-in-law to fix 'the internet' again."
> **Text-Heavy:** "Reading an article that SHOUTS at you with every heading is exhausting. In my romance novels, chapters have gentle titles that invite you in. This article hits you over the head."

**Maya** (multitasking parent, DIY YouTube, IKEA hacker, 38)
> **Landing Page:** "I came back to this tab after putting the kids to bed and genuinely thought my browser had crashed. The stark black and white with no rounded corners looks like a CSS reset, not a finished website. When you're tired, harsh design feels hostile."

---

### NEO-MINIMAL -- "Less is More"

The neo-minimal variation polarizes on the trust/density axis. People who value clarity love the restraint. People who value substance see it as empty.

#### Fans

**Priya** (motor disability, crossword puzzle devotee, bird watcher, 31)
> **Landing Page:** "Generous click targets, ample spacing between interactive elements, and a layout I can navigate with minimal precision. The thin borders create clear zones without clutter. This is the crossword grid of landing pages -- every square is intentional, nothing competes for my attention."
> **E-Commerce:** "The spacing between 'Add to Cart' buttons means I'll never accidentally hit the wrong product. For someone with cerebral palsy, that isn't a nice-to-have -- it's the difference between shopping independently and needing help."

**Jasmine** (customer support, K-drama binger, bullet journal obsessive, 29)
> **Landing Page:** "This is the bullet journal spread of web design. Clean headers, minimal decoration, everything in its place. After reading 50+ support tickets a day, my brain craves this level of visual calm. No element is fighting for attention."
> **E-Commerce:** "If our customer portal looked like this, my ticket count would drop 30%. Every action is obvious, every label is clear, every interaction has breathing room. Customers wouldn't need to email us because they can actually find the button."

**Mike** (screen-sharing professional, architecture photography, minimalist lifestyle, 44)
> **Landing Page:** "I share screens for a living. This is the only variation I wouldn't need to apologize for during a client call. The restraint says 'we're confident in our content' rather than 'we're hiding behind decoration.' In architecture, we call this honest materials."
> **E-Commerce:** "Clean enough to present, clear enough to discuss. The single-accent-color system means nothing competes with the product images. It's a white gallery wall -- the art speaks."

#### Critics

**Marcus** (colorblind developer, manga reader, indie gamer, 34)
> **Landing Page:** "Blue on white is fine for my color vision, but the information density is embarrassing. One headline, three bullet points, and a football field of whitespace. A manga page would fit six times the content in this space. The restraint isn't elegant, it's empty."
> **Text-Heavy:** "The line length is comfortable and the type is readable, but the page uses vertical space like it's free. I'm scrolling through paragraph breaks that could fit entire data tables. Minimalism isn't supposed to mean minimum information."

**Kevin** (14, digital native, anime fan, speedrun viewer)
> **Landing Page:** "I scrolled through the whole thing in 3 seconds because there's nothing to stop on. No animation, no color, no surprises. This is the loading screen of websites -- technically functional, zero reason to stay. My attention went to the next tab immediately."
> **E-Commerce:** "The product cards look like placeholder thumbnails. Where's the hover effect? Where's the quick-view? Shopping should feel like browsing, not like reading a grocery list."

**Raj** (power user, vim enthusiast, D&D dungeon master, 45)
> **Text-Heavy:** "Minimal is a polite word for 'we ran out of ideas.' The single-column layout with generous margins is wasting 40% of my viewport on nothing. I have a 32-inch monitor and I'm reading a column narrower than a vim split. Give me a sidebar, a table of contents, something to anchor navigation."

---

### MAXIMALIST -- "More is More"

The maximalist variation polarizes on the sensory-load axis. People who love rich environments are energized. People who value efficiency are exhausted.

#### Fans

**Yuki** (aesthetic-first evaluator, BookTok, Studio Ghibli, cottagecore, 25)
> **Landing Page:** "The layered textures, the serif headlines against sans-serif body, the coral accents on navy -- this is mood board material. Every scroll reveals another detail. This is the web design equivalent of a Ghibli background: dense with intention, rewarding careful looking."
> **E-Commerce:** "Each product card feels like a page from a design magazine. The editorial density makes even headphones feel like a curated discovery. I'd save every screenshot to my BookTok inspiration folder."
> **Text-Heavy:** "Finally, a variation that treats long-form content like it deserves decoration. The pull quotes, the editorial spacing, the mixed typefaces -- this is what reading looks like when someone cares about the experience of reading. It's a physical book, not a web page."

**Nora** (luxury evaluator, opera season tickets, first-edition books, 55)
> **Landing Page:** "Visual richness signals investment. A company that decorates this carefully is a company that will care about the product. The navy and gold palette, the serif headlines, the layered compositions -- this is how you communicate 'we take ourselves seriously' without saying a word."
> **E-Commerce:** "This is the department store experience online. Each product gets its own theatrical presentation. The decorative frames, the editorial layout, the considered typography -- this is retail as ceremony."

**Diana** (delighted by craft, Wes Anderson completionist, Japanese stationery, 36)
> **Text-Heavy:** "The ornamental details! The pull quotes with decorative borders! The way the serif headings create a rhythm with the sans-serif body! Every element is a craft decision. This is the Wes Anderson of web design -- obsessively detailed, perfectly asymmetric, delightful."

#### Critics

**Frank** (frustrated, ESPN-obsessed, 41)
> **Landing Page:** "Beautiful chaos, but I just need to find the button. The layered design is competing with the content, and the content is already competing with my patience. I count three different type styles in the hero alone. Pick one."
> **E-Commerce:** "Beautiful but exhausting. Every product card has ornamental elements that my eye has to parse before reaching the price. At this rate, comparison shopping takes five times longer than Brutalist. I didn't come here for a visual experience, I came here to buy headphones."

**Priya** (motor disability, crossword puzzle devotee, 31)
> **Landing Page:** "The dense layout means interactive elements are close together. My click targets overlap with decorative elements. The visual richness that others find delightful is a motor precision minefield for me. Every ornamental border is another thing I might accidentally activate."
> **E-Commerce:** "There are so many hover states and layered interactions that my assistive input device triggers unintended actions. The decorative density that makes this beautiful also makes it physically difficult for me to use."

**Sam** (mobile commuter, comic book reader, gacha games, 27)
> **Landing Page:** "I'm on the subway and this page just loaded four decorative web fonts and a parallax effect. The editorial density is gorgeous on a 27-inch monitor and unusable on a phone screen with one bar of signal. The coral accents bleed into the navy on a small viewport. Desktop luxury is mobile hostility."

---

### DARK INDUSTRIAL -- "Built to Spec"

The dark industrial variation polarizes on the technical-comfort axis. People who live in terminals love it. People who expect consumer-friendly design find it alienating.

#### Fans

**Marcus** (colorblind developer, manga reader, indie gamer, 34)
> **Landing Page:** "Amber on dark navy passes every color vision deficiency test I can throw at it. But that's not why I love it. The monospace labels, the terminal aesthetic, the data-dense layout -- this is a game settings menu that happens to be a landing page. Information density is finally respected."
> **E-Commerce:** "Every product card reads like a stat sheet. Name, specs, price -- no emotional manipulation, no lifestyle imagery. Just data. This is how I shop for mechanical keyboards: give me the specs, give me the price, let me decide."
> **Text-Heavy:** "The amber accents create visual anchors in long-form content without relying on color-only differentiation. The monospace section labels make the article feel like documentation -- which, for someone who reads docs all day, is a compliment."

**Raj** (power user, vim enthusiast, D&D dungeon master, 45)
> **Landing Page:** "The terminal labels, the dark background, the monospace everywhere -- this is the first variation that respects how I actually use computers. I've spent 20 years in terminals. This design acknowledges that expertise instead of hiding it behind rounded corners."
> **Text-Heavy:** "I could configure this. The structured layout with clear section breaks and monospace labels feels like a config file I could edit. The dark background reduces eye strain for extended reading. As a dungeon master who reads 300-page rulebooks, reading comfort at scale matters more than first-impression prettiness."

**Kevin** (14, digital native, anime fan, speedrun viewer)
> **E-Commerce:** "The dark theme with amber highlights is giving cyberpunk vibes. Each product card looks like a tech loadout screen. If this had hover animations, it would be the best e-commerce page I've seen. It's already better than every light-mode store."

#### Critics

**Dorothy** (non-technical novice, romance novels, Hallmark movies, 68)
> **Landing Page:** "This looks like the inside of a submarine. Dark, technical, covered in labels I don't understand. I don't know what 'SYS.NAVIGATION' means and I don't want to learn. Websites should welcome you, not make you feel like you need a security clearance."
> **E-Commerce:** "Shopping in the dark? Everything is dark gray on slightly darker gray. I had to increase my screen brightness to read the product descriptions. My church newsletter is black text on white paper and it's worked for 30 years. Why is the internet reinventing reading?"

**Jasmine** (customer support, K-drama binger, bullet journal, 29)
> **Landing Page:** "If a customer sent me a screenshot of this page with a support ticket, I'd escalate it as a rendering bug. The terminal aesthetic is cool if you know what terminals are. Our customers don't. This is an interface for the people who built it, not the people who use it."

**Yuki** (aesthetic-first evaluator, BookTok, cottagecore, 25)
> **E-Commerce:** "Everything here is angular and cold. The amber accents have a clinical precision that's the opposite of warm. This is a server room pretending to be a store. Where's the softness? Where's the invitation? I'd never browse this for pleasure -- and shopping should be a pleasure."

---

### WARM ORGANIC -- "Grown, Not Made"

The warm organic variation polarizes on the professional/personal axis. People who value comfort love it. People who value authority find it lacks seriousness.

#### Fans

**Dorothy** (non-technical novice, romance novels, 68)
> **Landing Page:** "Oh, this is lovely! It feels like walking into a friend's kitchen. The soft colors, the rounded edges -- nothing feels sharp or scary. I actually read all the way down because I felt comfortable."
> **E-Commerce:** "Shopping here feels like visiting the Sunday farmers market. Everything looks handmade and trustworthy. I want to buy the ceramic vase just because the page makes it look so inviting."
> **Text-Heavy:** "This is the first variation where I finished the whole article. The earth tones and soft spacing feel like reading a book in my favorite chair. The content is still nonsense but the design makes it almost enjoyable."

**Yuki** (aesthetic-first evaluator, BookTok, Studio Ghibli, cottagecore, 25)
> **Landing Page:** "The color palette is giving cottagecore and I'm HERE for it. The rounded containers look like they could be from a Ghibli interface. If this were a real product, I'd screenshot the design for my mood board."
> **E-Commerce:** "Every product card looks like something from a curated Etsy shop. The soft shadows and natural textures make even the wireless headphones feel artisanal. Design is doing 80% of the selling here."

**Elena** (screen reader user, audiobook marathoner, pottery class, 28)
> **Text-Heavy:** "The structured layout with clear section boundaries is excellent for navigation. I can jump between sections confidently. The warm design doesn't affect my experience directly, but I can tell from the DOM structure that this was designed with care -- the heading hierarchy is correct, ARIA labels are present, and content areas are well-defined."

**Maya** (multitasking parent, DIY YouTube, IKEA hacker, 38)
> **Landing Page:** "After a day of screaming children and burning dinner, this page feels like a warm bath. The rounded corners, the earthy palette, the generous spacing -- nothing demands my attention aggressively. I can engage at my own pace. This is the IKEA showroom of landing pages: calm, organized, and I can picture myself living here."
> **E-Commerce:** "The soft shadows and natural tones make me trust these products. I know it's just design, but when I'm buying something for the house, I want the store to feel like a home, not a warehouse. This feels curated, not algorithmic."

#### Critics

**Frank** (frustrated, ESPN-obsessed, 41)
> **Landing Page:** "Soothing pace? I don't need soothing, I need information. The generous spacing means I have to scroll three times as far to reach the pricing. Stop trying to make me relax and start telling me what this costs."
> **E-Commerce:** "The rounded 'Add to Cart' button looks like a suggestion, not a command. Make it a rectangle. Make it bold. Stop asking nicely and tell me what to do."

**Raj** (power user, vim enthusiast, D&D dungeon master, 45)
> **Text-Heavy:** "This design is the bard of the party -- charming, pleasant, and absolutely useless in combat. The earth tones and soft spacing are lovely but they're wrapping around content with zero substance. At least Dark Industrial would expose the emptiness honestly."

**Dex** (subculture evaluator, zine maker, 30)
> **E-Commerce:** "This is the Etsy-fication of everything. Making mass-produced headphones look 'artisanal' with earth tones and rounded corners is exactly the kind of design dishonesty I can't stand. The ceramic vase might deserve this treatment. The headphones don't."

---

### RETRO-FUTURISM -- "Tomorrow, Today"

The retro-futurism variation polarizes on the novelty/credibility axis. People who value energy and playfulness love the optimistic aesthetic. People who value substance see it as surface-level flash.

#### Fans

**Kevin** (14, digital native, anime fan, speedrun viewer)
> **Landing Page:** "FINALLY, something that moves! The gradient transitions, the rounded containers, the teal-to-purple palette -- this feels like an app, not a website. The bouncy interactions make scrolling actually fun. This is what the internet should look like."
> **E-Commerce:** "Each product card has a hover animation. HOVER ANIMATIONS. That's the bare minimum of life and none of the other variations bothered. The neon accents on product names make everything feel like a drop. I'd refresh this page for fun."

**Sam** (mobile commuter, comic book reader, gacha games, 27)
> **Landing Page:** "The rounded containers and gradient backgrounds work perfectly on mobile. Nothing breaks at small viewports, the touch targets are generous, and the teal-purple palette pops on a phone screen. This feels like it was designed phone-first, which is where I live."
> **E-Commerce:** "The card-based layout with rounded corners is exactly how mobile shopping should work. Swipeable, tappable, bright enough to read on a subway. This is the gacha game aesthetic applied to commerce and it works."

**Tommy** (intern, sneaker collector, hip-hop producer, 22)
> **Landing Page:** "The gradient energy is hard. The teal-purple combo feels like a Spotify Wrapped page meets a streetwear site. It's got personality without being chaotic. I'd send this link to my group chat."

#### Critics

**Sarah** (skeptical evaluator, spreadsheet enthusiast, 33)
> **Landing Page:** "The gradients are doing a lot of heavy lifting for content that has nothing to say. Strip away the teal-to-purple transitions and you're left with the same empty buzzwords, now with a '90s-nostalgia coat of paint. I don't trust websites that try this hard to look fun."
> **E-Commerce:** "The bouncy hover animations on product cards add 200ms of delay to every interaction. That's not delight, that's friction with a smile. When I'm comparison shopping, I want data, not a light show."

**Carlos** (CEO evaluator, business biographies, jazz vinyl, 52)
> **Landing Page:** "Gradients and rounded corners signal 'early-stage startup,' not 'established enterprise.' I see teal-to-purple and I think 'they'll pivot in 6 months.' The design is energetic but unserious. Energy without authority is just noise."
> **Text-Heavy:** "Reading a 12-minute article wrapped in gradient containers is like attending a lecture in a bounce house. The content is trying to be authoritative. The design is undermining it with every rounded corner and color transition."

**Nora** (luxury evaluator, opera season tickets, 55)
> **E-Commerce:** "This aesthetic says 'mass market.' The gradients, the bouncy interactions, the bright palette -- it's trying to make everything feel exciting, which means nothing feels special. Luxury is selective energy. This is indiscriminate energy."

---

### MEMPHIS -- "Post-Modern Pop"

Memphis polarizes on the serious/playful axis more than any other variation.

#### Fans

**Tommy** (intern, sneaker collector, hip-hop producer, 22)
> **Landing Page:** "NOW we're talking. The bold shapes, the asymmetry, the unapologetic color -- this is what design looks like when someone actually has an opinion. This is a Supreme drop, not a corporate brochure."
> **E-Commerce:** "This store has personality. The geometric shapes around product cards make each one feel like a collector's item. I'd screenshot this and post it. The bold colors say 'we're not afraid to be different.'"

**Dex** (subculture evaluator, zine maker, skate culture, 30)
> **Landing Page:** "Memphis design is zine culture on the web. Asymmetric, irreverent, anti-corporate. The bold shapes and primary colors feel like Keith Haring meets web design. This is the only variation that has actual creative courage."
> **Text-Heavy:** "The geometric interruptions in the body text break the reading rhythm on purpose -- just like a zine would. It's not comfortable. It's not supposed to be. It's making you pay attention instead of glazing over another paragraph of corporate nothing."

**Kevin** (14, digital native, anime fan, speedrun viewer)
> **E-Commerce:** "The bold shapes make every product card feel like a character select screen. The primary colors pop on any screen. This is what shopping looks like when it's not designed by accountants."

#### Critics

**Carlos** (CEO, jazz vinyl collector, 52)
> **Landing Page:** "This looks like a kindergarten art project. I can't show this to investors. The asymmetric layout is disorienting, the bold shapes compete with the content, and the primary colors suggest 'fun startup' not 'serious business.' Would you put your money in a company with this website?"
> **Text-Heavy:** "An article about content excellence decorated with floating geometric shapes? The tonal mismatch is jarring. It's like wearing a clown costume to a job interview -- the content is trying to be authoritative and the design is undermining it at every turn."

**Nora** (luxury evaluator, opera season tickets, 55)
> **E-Commerce:** "I would never purchase premium sunglasses from a store that looks like a children's toy catalog. The bold shapes and primary colors cheapen everything they touch. Design should elevate products, not make them look like Happy Meal prizes."

**Mike** (screen-sharing professional, architecture photography, 44)
> **Landing Page:** "I was sharing my screen in a client meeting and tabbed to this mockup. My client said 'that's... fun.' In architecture, 'fun' is a death sentence. Memphis is for mood boards, not deliverables."
> **Text-Heavy:** "The asymmetric shapes create visual noise that competes with the reading experience. In architecture, we say 'form follows function.' Here, form follows fun and function is left standing in the parking lot."

---

### ART DECO -- "Gilded Geometry"

The art deco variation polarizes on the age/authority axis. People who value tradition love it. People who value freshness find it stuffy.

#### Fans

**Carlos** (CEO evaluator, business biographies, jazz vinyl collector, 52)
> **Landing Page:** "This is the only variation I'd put in front of a board of directors. The gold accents, the geometric patterns, the elegant serifs -- it projects earned authority. When I see Art Deco design, I think 'this company has been around long enough to afford taste.'"
> **E-Commerce:** "Monospace prices feel precise. Gold borders feel premium. The symmetrical layout feels intentional. This is how you charge $129.99 for sunglasses and nobody questions it."
> **Text-Heavy:** "The serif headings with gold underline rules give every paragraph a gravitas the content hasn't earned -- but the design provides freely. If this were a prospectus, I'd invest."

**Diana** (delighted by craft, Wes Anderson completionist, Japanese stationery, 36)
> **Landing Page:** "The geometric patterns! The symmetry! The deliberate restraint of the gold palette! This is the design equivalent of a Wes Anderson tracking shot -- every element placed with obsessive precision. I want to frame this."
> **E-Commerce:** "Each product card is a tiny masterpiece. The gold borders, the serif product names, the geometric price badges -- this is what happens when a designer actually cares. This is craft."

**Nora** (luxury evaluator, opera season tickets, first-edition books, 55)
> **Text-Heavy:** "Finally, a variation that treats typography as art. The serifs have character. The gold accents provide visual punctuation. Reading this article in Art Deco framing is like reading mediocre prose in a first-edition binding -- the vessel elevates the content."
> **E-Commerce:** "Gold borders, geometric precision, serif product names -- this is how luxury presents itself. The design says 'we curated this' even though the products are ordinary. That's the power of visual authority: it makes the ordinary feel considered."

#### Critics

**Tommy** (intern, sneaker collector, hip-hop producer, 22)
> **Landing Page:** "This looks like my grandpa's law firm website. Gold and serifs? In 2025? The geometric patterns are giving 'fancy hotel lobby,' not 'product I'd actually use.' Nobody on my timeline would share this."
> **E-Commerce:** "I'd never buy headphones from a store that looks like a jewelry counter at Macy's. The gold borders make $79.99 headphones look like they should cost $799 -- and not in a good way. It's pretending."

**Dex** (subculture evaluator, zine maker, 30)
> **E-Commerce:** "Art Deco is the graphic design equivalent of a suit and tie. Polished, corporate, pre-approved. Every edge is filed smooth, every color is safe. This is what design looks like when nobody in the room is allowed to have a bad idea."
> **Text-Heavy:** "Putting gold accents on proud-slop content is the definition of lipstick on a pig. The more elegant the frame, the more obvious the emptiness inside. At least Brutalist was honest about what it was framing."

**Kevin** (14, digital native, anime fan, speedrun viewer)
> **Landing Page:** "Serifs? SERIFS? Are we in a library? This feels like it was designed for people who still use desktop computers. Nothing moves, nothing bounces, nothing feels alive. I scrolled through the whole thing in 4 seconds because nothing caught my eye."

---

## How Archetypes Change the Reaction

The SAME persona reacting to the SAME variation produces DIFFERENT feedback across archetypes because context changes expectations:

### Dorothy x Brutalist

| Archetype | Reaction | Why |
|-----------|----------|-----|
| **Landing Page** | "Looks broken on purpose and that confuses me" | She expects marketing pages to be welcoming -- Brutalist feels hostile |
| **E-Commerce** | "FIELD_01 at checkout? I thought it was broken" | Commerce requires trust -- the technical aesthetic destroys it |
| **Text-Heavy** | "Reading for 12 minutes in ALL CAPS is exhausting" | Long-form reading needs comfort -- Brutalist provides the opposite |

**The archetype gradient:** Dorothy's discomfort INCREASES from landing page to e-commerce to text-heavy because the time commitment increases. A harsh 5-second landing page is startling. A harsh 12-minute reading experience is punishing.

### Carlos x Warm Organic

| Archetype | Reaction | Why |
|-----------|----------|-----|
| **Landing Page** | "Trustworthy warmth, but is it serious enough for B2B?" | Business positioning needs authority -- warmth can read as soft |
| **E-Commerce** | "Beautiful brand promise -- now deliver the substance" | Product pages need credibility -- warm design creates expectations |
| **Text-Heavy** | "Approachable and trustworthy, like a well-crafted annual report" | Long-form content benefits from warmth -- it keeps readers engaged |

**The archetype gradient:** Carlos's opinion IMPROVES from landing page to text-heavy because warmth hurts first impressions but helps sustained engagement. A warm landing page says "we're friendly." A warm 12-minute article says "we respect your time."

### Tommy x Art Deco (Across Archetypes)

| Archetype | Reaction | Why |
|-----------|----------|-----|
| **Landing Page** | "Grandpa's law firm. Nobody under 40 designed this." | First impressions are snap judgments -- Art Deco reads as old immediately |
| **E-Commerce** | "The gold borders are pricing me out psychologically" | Commerce framing matters -- Art Deco implies luxury he can't afford |
| **Text-Heavy** | "OK, the serif headings actually help me read this" | Sustained reading benefits from typographic hierarchy -- even Tommy notices |

**The archetype gradient:** Tommy's resistance DECREASES from landing page to text-heavy because Art Deco's strengths (clear hierarchy, elegant typography) become more useful as reading time increases. He'll never love it, but he grudgingly admits it reads well.

### Frank x Every Variation (The Efficiency Index)

Frank is the universal stress test. His frustration level reveals how much friction each variation adds:

| Variation | Landing Page | E-Commerce | Text-Heavy |
|-----------|-------------|------------|------------|
| **Brutalist** | "3 seconds to find the price. Perfect." | "Grid is scannable, spacing is consistent." | "Extreme hierarchy -- I find what I need fast." |
| **Neo-Minimal** | "Clean but I had to guess where to click." | "Focus rings saved me." | "Clean layout, but I'm squinting." |
| **Maximalist** | "Beautiful chaos, but I just need to find the button." | "Beautiful but exhausting." | "Beautiful but exhausting for a long read." |
| **Dark Industrial** | "Fast if you know terminals. I do." | "Stat sheets instead of sales pitches. Efficient." | "Dark background is easy on my eyes at 11pm." |
| **Warm Organic** | "Soothing is slow. Where's the price?" | "Rounded buttons feel like suggestions." | "Comfortable but I'm here for info, not comfort." |
| **Retro-Futurism** | "Gradients are distracting." | "Bouncy animations waste 200ms per click." | "Gradient containers slow my scanning." |
| **Art Deco** | "Gold borders are elegant but where's the CTA?" | "Luxury feel delays my purchase." | "Symmetrical -- my eyes know where to go." |
| **Memphis** | "All spectacle, maximum friction." | "Bold but where's the 'buy' button?" | "Shapes keep stealing my focus." |

**The Frank gradient:** His patience is inversely proportional to decoration density. Brutalist (fastest) then Neo-Minimal then Dark Industrial then Art Deco then Warm Organic then Retro-Futurism then Maximalist then Memphis (most friction).

### Elena x Layout Variations (The Semantic Test)

Elena uses a screen reader, so visual design is invisible to her. Her evaluation is a purity test for semantic quality:

| Variation | Landing Page | E-Commerce | Text-Heavy |
|-----------|-------------|------------|------------|
| **Brutalist** | "Heading hierarchy is flat -- too many h2s." | "Product cards lack ARIA labels." | "Section structure is clear but repetitive." |
| **Neo-Minimal** | "Clean DOM, proper heading nesting." | "Simple structure, easy navigation." | "Well-structured, headings guide me perfectly." |
| **Warm Organic** | "Proper ARIA labels, correct heading hierarchy." | "Form labels are associated correctly." | "Section landmarks are well-defined." |
| **Dark Industrial** | "Custom components break screen reader flow." | "Technical labels confuse my reader." | "Code-like structure maps well to headings." |
| **Memphis** | "Decorative elements lack aria-hidden." | "Geometric shapes announce as images." | "Visual noise is silent but structure suffers." |

**The Elena test:** If Elena's experience doesn't change between two variations, the design difference is purely visual. If her experience DOES change, something structural happened -- for better or worse.

---

## The Crew's Meta-Commentary

The Crew panel doesn't evaluate design quality -- they explain WHY the design choices exist. Their commentary is consistent across variations but changes across archetypes:

### Alex (AI Prompt Engineer) x SLAP Baseline

| Archetype | Perspective | Confession |
|-----------|-------------|------------|
| **Landing Page** | "I prompted for 'professional SaaS landing page copy' and got exactly what every other prompt produces." | "I know 'rapidly evolving digital landscape' is a cliche. But the model scores it highest for 'professional tone.' The incentive structure rewards generic." |
| **E-Commerce** | "I asked for 'premium product descriptions' and got 'experience audio the way it was meant to be heard.' Every product has a proprietary technology name because the model thinks that's what 'premium' means." | "NoiseShield is not a real technology. AuraWeave is not a real technology. But they test well in A/B tests because people assume trademarked words mean quality." |
| **Text-Heavy** | "I prompted for 'authoritative thought leadership article' and got 12 minutes of confident nothing. The model opened with the most parodied sentence in content marketing -- and I shipped it because the alternative was silence." | "The readability triad isn't a real framework. The model invented it because it needed a three-point structure and couldn't find one that fit." |

### Alex x Styled Variations (The Prompt Paradox)

| Variation | Perspective | Confession |
|-----------|-------------|------------|
| **Brutalist** | "I didn't prompt for Brutalist. A designer chose it. That's the difference -- the content came from a prompt, but the design came from a human decision." | "The irony is that Brutalist makes my prompted content look worse by exposing it. The designer's choice revealed my shortcut." |
| **Warm Organic** | "The warm design makes my content feel more trustworthy. Same words, different trust level. That's terrifying if you think about it." | "If design can make bad content feel good, then visual design is a manipulation tool. I'm not sure how to feel about that." |
| **Art Deco** | "Gold accents on my prompted copy is like putting a $200 frame on a gas station print. The frame doesn't make the art better -- it makes the gap more obvious." | "But here's the thing: most people look at the frame first. And some never look past it." |

### Kai (Junior Designer) x Styled Variations

| Variation | Perspective | Confession |
|-----------|-------------|------------|
| **Brutalist** | "I chose Brutalist because the design brief said 'bold and distinctive.' The template had thick borders and monospace -- it felt intentional." | "I didn't actually understand why the borders were thick. I just liked the aesthetic and the deadline was in 2 hours." |
| **Neo-Minimal** | "Minimal is safe. When you don't know what to do, remove things. Nobody gets fired for whitespace." | "The truth is I couldn't decide on a color palette so I used one blue accent and called it 'restraint.'" |
| **Maximalist** | "I layered everything the design system offered. Serif headlines, decorative borders, pull quotes, editorial spacing. More design means more effort, right?" | "I confused 'using all the features' with 'making design decisions.' A buffet isn't a meal plan." |
| **Dark Industrial** | "I chose the dark theme because it looks 'developer-friendly' in the portfolio. Dark mode is always impressive in screenshots." | "I never tested it with actual users. The dark background that looks cool on Dribbble is hostile to the 68-year-old who just wants to read." |
| **Memphis** | "I found this template on a design showcase and thought 'this will get likes.' The asymmetric shapes felt creative." | "Creative to me meant 'different from what I usually make.' I never asked whether the shapes served the content." |
| **Art Deco** | "The gold accent and geometric patterns came from a UI kit I bought. It looked premium in the preview." | "Premium in a UI kit preview and premium for your specific content are two different things. I didn't know that yet." |

### Jordan (PM) x The Business Case

| Archetype | Perspective | Industry Context |
|-----------|-------------|-----------------|
| **Landing Page** | "We A/B tested the SLAP baseline against a custom-designed version. Conversion was identical within margin of error. So why would I allocate design resources?" | "The dirty secret: most landing page visitors decide in under 3 seconds based on headline + CTA. Design below the fold barely matters for conversion. It matters for brand, but brand doesn't show up in quarterly metrics." |
| **E-Commerce** | "Product photos drive 80% of purchase decisions. The page design around them is a rounding error in conversion data." | "Amazon is ugly. It converts at 74%. The best-designed e-commerce site I've seen converts at 2.1%. Design is not the variable we think it is -- at least not for conversion." |
| **Text-Heavy** | "Nobody reads 12-minute articles. Our analytics show average time-on-page is 47 seconds. Design for a 12-minute article is solving a problem that doesn't exist." | "The real question isn't 'does design improve readability?' It's 'will anyone read this regardless?' Content strategy beats design investment for long-form." |

### Jordan x The Counterargument (What Metrics Miss)

| Archetype | What Metrics Say | What Metrics Miss |
|-----------|-----------------|-------------------|
| **Landing Page** | "Conversion is identical, so design doesn't matter." | "But the designed version had 3x the return visits. People came back. That doesn't show up in single-session conversion funnels." |
| **E-Commerce** | "Same cart completion rate, so the page design is irrelevant." | "But average order value was 22% higher on the designed version. People bought more expensive items. Design influenced what they bought, not whether they bought." |
| **Text-Heavy** | "47 seconds average time-on-page, so nobody reads." | "But the 8% who did read all the way shared it 5x more. Design didn't increase readership, but it increased advocacy among readers. That's a different metric entirely." |

### Riley (Startup Founder) x The Shipping Imperative

> **Universal perspective across all archetypes:** "I built the whole site in a weekend with AI. Is it perfect? No. Did it get us our first 100 users? Yes. Everyone talks about 'design quality' but nobody talks about the 6 months of revenue you lose while designing. Every week without a shipped product is a week of zero customer feedback. Ship the slop, learn from real users, redesign when you have actual data."

> **The twist (Riley's reaction to the styled variations):** "OK, I see the Art Deco version now and... yeah. That does look better. But is it 6-weeks-of-design-work better? Is it hire-a-designer better? Show me the conversion data, not the beauty pageant."

### Riley x The Maturity Curve

| Stage | Riley's Position | The Tension |
|-------|-----------------|-------------|
| **Pre-launch** | "Ship anything. Design is a luxury." | Valid -- you can't optimize what doesn't exist. |
| **First 100 users** | "The slop works. Users complain about features, not design." | Survivorship bias -- the users who left because of design never became users to complain. |
| **First 1000 users** | "OK, the bounce rate is 80%. Maybe the design IS the feature." | The moment where shipping fast stops being an advantage and starts being debt. |
| **Scale** | "We're redesigning everything. Should have invested earlier." | The startup paradox: you can't afford design until you can't afford not to have it. |

---

## Cross-Archetype Persona Consistency

Each persona's cultural identity creates CONSISTENT reactions regardless of archetype. This is the authenticity test -- if you swapped their names, you could still identify who said what:

### The Marcus Test (Manga reader, indie gamer, mechanical keyboard collector)

**Always notices:** Information density, layout structure, data-to-decoration ratio
**Always compares to:** Manga panel layouts, game HUDs, mechanical keyboard forums, dev console interfaces
**Always frustrated by:** Wasted space, low-information-density designs, decoration without data
**Never says:** "The warm tones make me feel comfortable" (that's Dorothy)
**Voice signature:** Technical precision mixed with gaming metaphors. Evaluates space efficiency like a game inventory.

### The Dorothy Test (Romance novels, Hallmark movies, church newsletter editor)

**Always notices:** Warmth, friendliness, whether she'd "trust this page"
**Always compares to:** Her church newsletter, greeting cards, recipe websites, the bookstore
**Always frustrated by:** Technical-looking interfaces, jargon, aggressive aesthetics, ALL CAPS
**Never says:** "The information density is insufficient" (that's Marcus)
**Voice signature:** Gentle, personal, often confused by technical aesthetics. Measures design by whether it feels like it was made by a friendly person.

### The Carlos Test (Business biographies, jazz vinyl, CNBC, single malt)

**Always notices:** Authority, professionalism, investor-readiness
**Always compares to:** Pitch decks, Bloomberg Terminal, Apple Keynote, boardroom presentations
**Always frustrated by:** Playful or casual aesthetics that undermine credibility
**Never says:** "The bouncy animations are fun" (that's Kevin)
**Voice signature:** Corporate framing, ROI thinking, always asks "would I show this to a board?" Measures design by whether it commands respect.

### The Frank Test (Fantasy football, ESPN, action movies, 5-ingredient meals)

**Always notices:** Time-to-information, visual noise, obstacle count between him and the data
**Always compares to:** ESPN live scores, fantasy football dashboards, sports tickers
**Always frustrated by:** Decoration, animation, anything between him and the data
**Never says:** "The gentle spacing creates breathing room" (that's Dorothy)
**Voice signature:** Impatient, efficiency-obsessed, counts the seconds. Measures design by how fast he can leave the page with the information he came for.

### The Tommy Test (Sneaker collector, hip-hop producer, streetwear forums, basketball highlights)

**Always notices:** Visual energy, brand boldness, shareability, cultural relevance
**Always compares to:** Supreme drops, sneaker release pages, album cover art, Instagram stories
**Always frustrated by:** Traditional or "corporate" aesthetics, anything that looks like it was designed for his parents
**Never says:** "This projects the gravitas of a boardroom" (that's Carlos)
**Voice signature:** Generational, culture-forward, thinks in terms of "would I share this?" Measures design by whether it has main-character energy.

### The Dex Test (Vinyl DJ, graffiti-to-gallery art, zine maker, skate culture)

**Always notices:** Authenticity, subculture alignment, whether the design has an opinion
**Always compares to:** Gig posters, zine layouts, record shop catalogs, gallery openings
**Always frustrated by:** Corporate polish, design that plays it safe, the Etsy-fication of mass production
**Never says:** "This is professional and boardroom-ready" (that's Carlos)
**Voice signature:** Anti-corporate, values raw over polished, can detect design cowardice at 100 yards. Measures design by whether it would survive in a zine.

### The Yuki Test (BookTok, Studio Ghibli, cottagecore, tea ceremony)

**Always notices:** Mood, texture, whether the design creates an emotional atmosphere
**Always compares to:** Ghibli backgrounds, BookTok aesthetics, mood boards, curated Etsy shops
**Always frustrated by:** Clinical or cold interfaces, angular designs without softness
**Never says:** "The monospace labels feel like a proper terminal" (that's Raj)
**Voice signature:** Aesthetic-first, mood-board thinking, experiences design as atmosphere. Measures design by whether she'd screenshot it.

### The Raj Test (Vim enthusiast, sci-fi audiobooks, home automation, D&D dungeon master)

**Always notices:** Configurability, information architecture, whether the design respects expertise
**Always compares to:** Terminal interfaces, config files, D&D rulebooks, home automation dashboards
**Always frustrated by:** Oversimplified interfaces that hide power, consumer-friendly defaults that remove control
**Never says:** "The rounded corners feel safe and inviting" (that's Dorothy)
**Voice signature:** Power-user perspective, system-thinker, wants to see the guts. Measures design by whether he could modify it.

### The Priya Test (Motor disability, crossword puzzles, bird watching, cozy mysteries)

**Always notices:** Click target size, spacing between interactive elements, motor precision requirements
**Always compares to:** Crossword grids (intentional spacing), bird-watching guides (clear visual hierarchy)
**Always frustrated by:** Densely packed interactive elements, hover-dependent interactions, decorative elements near click targets
**Never says:** "The information density is impressive" (that's Marcus)
**Voice signature:** Precision-aware, values generous spacing as a physical necessity not an aesthetic choice. Measures design by whether she can use it without hitting the wrong thing.

### The Elena Test (Screen reader user, audiobook marathoner, pottery, true crime podcasts)

**Always notices:** Heading hierarchy, ARIA labels, semantic structure, keyboard navigation
**Always compares to:** Audiobook chapter navigation, podcast episode structure
**Always frustrated by:** Visual-only information, missing alt text, broken tab order, decorative elements that announce to screen readers
**Never says:** "The gold accents create visual gravitas" (she can't see them)
**Voice signature:** Structure-first, evaluates the DOM not the pixels. Measures design by its invisible architecture.

---

## Writing Guide: How to Use Cultural Identity in Findings

### The 70/30 Rule

Every persona finding should be approximately:
- **70% functional observation** (the lens -- accessibility, usability, mobile, etc.)
- **30% cultural color** (the taste -- comparisons, preferences, personal reactions)

The functional observation is the insight. The cultural color is the personality. Both are required. Neither is sufficient alone.

### Good Example (70/30 balanced)

> **Marcus on Dark Industrial e-commerce:** "The amber accent on dark navy provides excellent luminance contrast for my color vision -- I can distinguish every interactive element without strain. *The monospace product names and grid layout remind me of a well-organized game inventory. Each card is a loot drop with clear stats. I'd browse this for fun even without buying.*"

- First sentence: functional (color contrast accessibility)
- Second sentence: cultural (game inventory comparison)
- The functional observation is useful to a designer. The cultural comparison makes it memorable.

### Good Example (Persona-specific insight)

> **Priya on Neo-Minimal e-commerce:** "The generous spacing between 'Add to Cart' buttons means I'll never accidentally trigger the wrong product. For someone with cerebral palsy, that gap isn't whitespace -- it's the difference between shopping independently and asking for help. *It's like a well-set crossword grid: every square is its own space, nothing bleeds into its neighbor.*"

- Functional: Motor-accessibility insight about button spacing
- Cultural: Crossword grid comparison that only Priya would make
- The designer learns about motor accessibility. The reader remembers the crossword metaphor.

### Bad Example (all functional, no personality)

> **Marcus on Dark Industrial e-commerce:** "Amber on dark navy passes WCAG AA contrast. Monospace type is readable. Grid layout is well-spaced."

This could be generated by an accessibility checker. It has no Marcus in it.

### Bad Example (all cultural, no function)

> **Marcus on Dark Industrial e-commerce:** "This is like a game inventory! The dark background is giving cyberpunk vibes. I want to mod this interface."

Fun, but useless as design feedback. No accessibility insight.

### Bad Example (wrong persona voice)

> **Frank on Warm Organic landing page:** "The earth tones create a soothing atmosphere that invites me to explore at a leisurely pace."

Frank would never say "leisurely pace." Frank would say "I have to scroll three times to find the price." If a finding sounds like it could belong to any persona, it belongs to no persona.

### The Swap Test

After writing a finding, remove the persona name. Can you tell who said it? If not, the cultural identity isn't strong enough. Every finding should pass the swap test: distinctive enough that the voice alone identifies the speaker.

---

## Archetype-Specific Interaction Patterns

### Landing Page Interactions

Landing pages are judged in 3-5 seconds. Persona reactions are IMMEDIATE and VISCERAL:
- **First impression dominates.** Dorothy decides "broken or friendly" before scrolling. Tommy decides "shareable or skip" before the hero finishes loading.
- **Cultural references are about RECOGNITION.** Dex sees a gig poster. Carlos sees a pitch deck. Kevin sees a loading screen. Same page, different pattern matching.
- **The CTA is the verdict.** Frank's entire evaluation collapses to "how fast did I find the button?" Priya's collapses to "can I click it without hitting something else?"

### E-Commerce Interactions

E-commerce pages are judged on TRUST and EFFICIENCY:
- **Trust is cultural.** Dorothy trusts what feels handmade. Carlos trusts what feels expensive. Dex trusts what feels authentic. Same trust mechanism, different signals.
- **Efficiency is functional.** Frank counts seconds. Sarah counts comparison steps. Priya counts misclicks. Same efficiency goal, different measurement.
- **The product card is the unit of analysis.** Every persona evaluates the product card as a contained design object. Their reaction to the card predicts their reaction to the page.

### Text-Heavy Interactions

Text-heavy pages are judged on SUSTAINED COMFORT:
- **Time amplifies reactions.** A 5-second annoyance on a landing page becomes a 12-minute punishment in text-heavy. Dorothy's discomfort with Brutalist escalates from "startling" to "exhausting." Frank's love of efficiency peaks because scanning actually saves significant time.
- **Reading fatigue reveals design truth.** Variations that charm in 5 seconds can exhaust in 12 minutes. Maximalist's editorial richness is delightful for one scroll and overwhelming for twenty.
- **The scroll depth is the vote.** If a persona finishes the article, the design succeeded. If they abandon it, the design failed -- regardless of what their critique says.

---

## Genre Shift: How Personas Adapt

The persona roster and affinity matrix are genre-independent. Cultural identities and functional lenses don't change when the genre changes — only the content they're reacting to does.

**Same persona, different genre (genre = content domain, not just entertainment):**

| Persona | Comedy (current) | SaaS (hypothetical) | Healthcare (hypothetical) |
|---------|-----------------|---------------------|--------------------------|
| **Dorothy** | "The ALL CAPS headings feel like yelling" | "The ALL CAPS headings feel like a software warning" | "The ALL CAPS headings feel clinical, not caring" |
| **Marcus** | "Low information density — like a game HUD with no data" | "Where's the API reference? This has three bullet points and a CTA" | "The sparse layout wastes space that could show my health data" |
| **Carlos** | "This projects no authority" | "This doesn't project enterprise readiness" | "This doesn't project the trust a patient portal needs" |

The functional observation (accessibility, usability, density) stays constant. The cultural framing shifts to match what the genre's content is trying to accomplish. Dorothy always wants warmth. Marcus always wants density. Carlos always wants authority. Genre just changes what "warmth," "density," and "authority" mean in context — whether that context is a comedy product page, a SaaS dashboard, or a healthcare portal.

---

## See Also

- `SLAPSTICK_CONCEPT.md` -- System architecture (18 personas, crew panel, affinity matrix)
- `DIRECTORS_NOTES.md` -- Narrative context (how the project evolved)
- `kaizen/references/persona-roster.md` -- Full persona definitions
- `team/references/expert-personas.md` -- Expert panel voice definitions
- `src/data/personaFindings.ts` -- Existing findings (to be enriched)
