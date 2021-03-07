const ObjectId = require('mongodb').ObjectID;

module.exports = bookData = [
    {
        _id: ObjectId('60441f7b5e326e35748449ec'),
        title: 'Clean code',
        subtitle: 'A Handbook of Agile Software Craftsmanship',
        author: 'Bob Martin',
        description:
            'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way.\n\nNoted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship . Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code “on the fly” into a book that will instill within you the values of a software craftsman and make you a better programmer—but only if you work at it.\n\nWhat kind of work will you be doing? You’ll be reading code—lots of code. And you will be challenged to think about what’s right about that code, and what’s wrong with it. More importantly, you will be challenged to reassess your professional values and your commitment to your craft.',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615077243/a1zn7terjr5lg0d8l8uc.jpg',
        price: 46,
        seller: ObjectId('604416846e054e3438767fd4'),
        createdAt: 1615077243382,
        __v: 0,
    },
    {
        _id: ObjectId('60441fdb5e326e35748449ed'),
        title: 'Designing Data-Intensive Applications',
        subtitle:
            'The Big Ideas Behind Reliable, Scalable, and Maintainable Systems',
        author: 'Martin Kleppmann',
        description:
            'Data is at the center of many challenges in system design today. Difficult issues need to be figured out, such as scalability, consistency, reliability, efficiency, and maintainability. In addition, we have an overwhelming variety of tools, including relational databases, NoSQL datastores, stream or batch processors, and message brokers. What are the right choices for your application? How do you make sense of all these buzzwords?\n\nIn this practical and comprehensive guide, author Martin Kleppmann helps you navigate this diverse landscape by examining the pros and cons of various technologies for processing and storing data. Software keeps changing, but the fundamental principles remain the same. With this book, software engineers and architects will learn how to apply those ideas in practice, and how to make full use of data in modern applications.',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615077339/xgcnwjnlmds0gj3jixwj.jpg',
        price: 59,
        seller: ObjectId('604416846e054e3438767fd4'),
        createdAt: 1615077339660,
        __v: 0,
    },
    {
        _id: ObjectId('604420195e326e35748449ee'),
        title: 'Learning Node',
        subtitle: 'Moving to the Server-Side',
        author: 'Tony Robbins',
        description:
            'Take your web development skills from browser to server with Node—and learn how to write fast, highly scalable network applications on this JavaScript-based platform. Updated for the latest Node Long Term Support (LTS) and Node Current (6.0) releases, this hands-on edition helps you master Node’s core fundamentals and gain experience with several built-in and contributed modules.\n\nGet up to speed on Node’s event-driven, asynchronous I/O model for developing data-intensive applications that are frequently accessed but computationally simple. If you’re comfortable working with JavaScript, this book provides many programming and deployment examples to help you take advantage of server-side development with Node.',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615077401/zaivsgoiuwlplzl0drcn.jpg',
        price: 32,
        seller: ObjectId('604416846e054e3438767fd4'),
        createdAt: 1615077401820,
        __v: 0,
    },
    {
        _id: ObjectId('604420c85e326e35748449ef'),
        title: 'Design Patterns',
        subtitle: 'Elements of Reusable Object-Oriented Software',
        author: 'Gamma Erich, Helm Richard, Johnson Ralph, Vlissides John',
        description:
            'Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems. Previously undocumented, these 23 patterns allow designers to create more flexible, elegant, and ultimately reusable designs without having to rediscover the design solutions themselves.\n\nThe authors begin by describing what patterns are and how they can help you design object-oriented software. They then go on to systematically name, explain, evaluate, and catalog recurring designs in object-oriented systems. With Design Patterns as your guide, you will learn how these important patterns fit into the software development process, and how you can leverage them to solve your own design problems most efficiently.\n\nEach pattern describes the circumstances in which it is applicable, when it can be applied in view of other design constraints, and the consequences and trade-offs of using the pattern within a larger design. All patterns are compiled from real systems and are based on real-world examples. Each pattern also includes code that demonstrates how it may be implemented in object-oriented programming languages like C++ or Smalltalk.',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615077576/qcfp1txfcuuxw3w7feie.jpg',
        price: 63,
        seller: ObjectId('604416846e054e3438767fd4'),
        createdAt: 1615077576655,
        __v: 0,
    },
    {
        _id: ObjectId('6044213f5e326e35748449f0'),
        title: 'Ruby on Rails Tutorial',
        subtitle: 'Learn Web Development with Rails',
        author: 'Michael Hartl',
        description:
            ' Used by sites as varied as Twitter, GitHub, Disney, and Airbnb, Ruby on Rails is one of the most popular frameworks for developing web applications, but it can be challenging to learn and use. Whether you’re new to web development or new only to Rails, Ruby on Rails™ Tutorial, Fourth Edition, is the solution.\n \n\nBest-selling author and leading Rails developer Michael Hartl teaches Rails by guiding you through the development of three example applications of increasing sophistication. The tutorial’s examples focus on the general principles of web development needed for virtually any kind of website. The updates to this edition include full compatibility with Rails 5, a division of the largest chapters into more manageable units, and a huge number of new exercises interspersed in each chapter for maximum reinforcement of the material.\n\n \n\nThis indispensable guide provides integrated tutorials not only for Rails, but also for the essential Ruby, HTML, CSS, and SQL skills you need when developing web applications. Hartl explains how each new technique solves a real-world problem, and then he demonstrates it with bite-sized code that’s simple enough to understand, yet novel enough to be useful. Whatever your previous web development experience, this book will guide you to true Rails mastery.',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615077694/jq3zy0e2ccas3uvwy0rr.jpg',
        price: 65,
        seller: ObjectId('604416846e054e3438767fd4'),
        createdAt: 1615077695776,
        __v: 0,
    },
    {
        _id: ObjectId('6044231f5e326e35748449f2'),
        title: "Harry Potter and the Philosopher's Stone",
        subtitle: '',
        author: 'J.K. Rowling',
        description:
            "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!\n\nThese new editions of the classic and internationally bestselling, multi-award-winning series feature instantly pick-up-able new jackets by Jonny Duddle, with huge child appeal, to bring Harry Potter to the next generation of readers. It's time to PASS THE MAGIC ON …",
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615078175/jkltvjpsbfu5kpicpdo0.jpg',
        price: 23,
        seller: ObjectId('6044219a5e326e35748449f1'),
        createdAt: 1615078175533,
        __v: 0,
    },
    {
        _id: ObjectId('6044250fc3f1af2d50014914'),
        title: 'Lord of the rings',
        subtitle: '',
        author: 'J.r.r. Tolkien',
        description:
            'Continuing the story of The Hobbit, this three-volume paperback boxed set of Tolkien’s epic masterpiece, The Lord of the Rings, features exclusive covers from Peter Jackson’s award-winning film trilogy, the definitive text, and a detailed map of Middle-earth.\n\nSauron, the Dark Lord, has gathered to him all the Rings of Power – the means by which he intends to rule Middle-earth. All he lacks in his plans for dominion is the One Ring – the ring that rules them all – which has fallen into the hands of the hobbit, Bilbo Baggins.\n\nIn a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as the Ring is entrusted to his care. He must leave his home and make a perilous journey across the realms of Middle-earth to the Crack of Doom, deep inside the territories of the Dark Lord. There he must destroy the Ring forever and foil the Dark Lord in his evil purpose.\n\nTo celebrate the release of the first of Peter Jackson’s three-part film adaptation of The Hobbit, THE HOBBIT: AN UNEXPECTED JOURNEY, readers can discover how the journey continues in The Lord of the Rings with this special boxed set of the complete work, with exclusive cover images from the award-winning film trilogy.',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615078672/s5ycajpxlb3rfxdglzqf.jpg',
        price: 81,
        seller: ObjectId('6044219a5e326e35748449f1'),
        createdAt: 1615078671950,
        __v: 0,
    },
    {
        _id: ObjectId('6044255cc3f1af2d50014915'),
        title: 'The Hobbit',
        subtitle: '',
        author: 'J. R. R. Tolkien',
        description:
            'This popular paperback edition of the classic work of fantasy, with a striking new black cover based on JRR Tolkien’s own design and featuring brand new reproductions of all his drawings and maps.\n\nBilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely travelling further than the pantry of his hobbit-hole in Bag End. But his contentment is disturbed when the wizard, Gandalf, and a company of thirteen dwarves arrive on his doorstep one day to whisk him away on an unexpected journey ‘there and back again’. They have a plot to raid the treasure hoard of Smaug the Magnificent, a large and very dangerous dragon…\n\nThe prelude to The Lord of the Rings, The Hobbit has sold many millions of copies since its publication in 1937, establishing itself as one of the most beloved and influential books of the twentieth century.',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615078748/bkhgiuh2uezvljwkfqgz.jpg',
        price: 8,
        seller: ObjectId('6044219a5e326e35748449f1'),
        createdAt: 1615078748446,
        __v: 0,
    },
    {
        _id: ObjectId('604425ebc3f1af2d50014916'),
        title: 'The Book Thief',
        subtitle: '',
        author: 'Markus Zusak',
        description:
            "The extraordinary #1 New York Times bestseller that is now a major motion picture, Markus Zusak's unforgettable story is about the ability of books to feed the soul.\n\nIt is 1939. Nazi Germany. The country is holding its breath. Death has never been busier, and will become busier still.\n\nLiesel Meminger is a foster girl living outside of Munich, who scratches out a meager existence for herself by stealing when she encounters something she can’t resist–books. With the help of her accordion-playing foster father, she learns to read and shares her stolen books with her neighbors during bombing raids as well as with the Jewish man hidden in her basement.\n\nIn superbly crafted writing that burns with intensity, award-winning author Markus Zusak, author of I Am the Messenger, has given us one of the most enduring stories of our time.",
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615078891/hlbaahtigvc1yrmea4ch.jpg',
        price: 10,
        seller: ObjectId('6044219a5e326e35748449f1'),
        createdAt: 1615078891566,
        __v: 0,
    },
    {
        _id: ObjectId('60442680c3f1af2d50014917'),
        title: 'Delivering Happiness',
        subtitle: 'A Path to Profits, Passion, and Purpose',
        author: 'Tony Hsieh',
        description:
            "Pay brand-new employees $2,000 to quit\nMake customer service the responsibility of the entire company-not just a department\nFocus on company culture as the #1 priority\nApply research from the science of happiness to running a business\nHelp employees grow-both personally and professionally\nSeek to change the world\nOh, and make money too . . .\nSound crazy? It's all standard operating procedure at Zappos, the online retailer that's doing over $1 billion in gross merchandise sales annually. After debuting as the highest-ranking newcomer in Fortune magazine's annual \"Best Companies to Work For\" list in 2009, Zappos was acquired by Amazon in a deal valued at over $1.2 billion on the day of closing.\nIn DELIVERING HAPPINESS, Zappos CEO Tony Hsieh shares the different lessons he has learned in business and life, from starting a worm farm to running a pizza business, through LinkExchange, Zappos, and more. Fast-paced and down-to-earth, DELIVERING HAPPINESS shows how a very different kind of corporate culture is a powerful model for achieving success-and how by concentrating on the happiness of those around you, you can dramatically increase your own.",
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615079040/luu6uupmhz6qoc1hje0y.jpg',
        price: 28,
        seller: ObjectId('6044219a5e326e35748449f1'),
        createdAt: 1615079040546,
        __v: 0,
    },
    {
        _id: ObjectId('60442821c3f1af2d50014919'),
        title: 'How to Win Friends and Influence People',
        subtitle: '',
        author: 'Dale Carnegie',
        description:
            'For more than sixty years the rock-solid, time-tested advice in this book has carried thousands of now famous people up the ladder of success in their business and personal lives.\nNow this previously revised and updated bestseller is available in trade paperback for the first time to help you achieve your maximum potential throughout the next century! Learn:\n\n* Three fundamental techniques in handling people\n\n* The six ways to make people like you\n\n* The twelve ways to win people to you way of thinking\n\n* The nine ways to change people without arousing resentment',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615079457/qf8kkit96n3ylhspcs0q.jpg',
        price: 15,
        seller: ObjectId('604426e2c3f1af2d50014918'),
        createdAt: 1615079457549,
        __v: 0,
    },
    {
        _id: ObjectId('6044285bc3f1af2d5001491a'),
        title: 'MONEY Master the Game',
        subtitle: '7 Simple Steps to Financial Freedom',
        author: 'Tony Robbins',
        description:
            'Tony Robbins is one of the most revered writers and thinkers of our time. People from all over the world—from the disadvantaged to the well-heeled, from twenty-somethings to retirees—credit him for giving them the inspiration and the tools for transforming their lives. From diet and fitness, to business and leadership, to relationships and self-respect, Tony Robbins’s books have changed people in profound and lasting ways. Now, for the first time, he has assembled an invaluable “distillation of just about every good personal finance idea of the last forty years” (The New York Times).\n\nBased on extensive research and interviews with some of the most legendary investors at work today (John Bogle, Warren Buffett, Paul Tudor Jones, Ray Dalio, Carl Icahn, and many others), Tony Robbins has created a 7-step blueprint for securing financial freedom. With advice about taking control of your financial decisions, to setting up a savings and investing plan, to destroying myths about what it takes to save and invest, to setting up a “lifetime income plan,” the book brims with advice and practices for making the financial game not only winnable—but providing financial freedom for the rest of your life. “Put MONEY on your short list of new books to read…It’s that good” (Marketwatch.com).',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615079515/c64cwhxhd8rufx36begs.jpg',
        price: 34,
        seller: ObjectId('604426e2c3f1af2d50014918'),
        createdAt: 1615079515118,
        __v: 0,
    },
    {
        _id: ObjectId('60442883c3f1af2d5001491b'),
        title: "Dave Ramsey's Complete Guide To Money",
        subtitle: '',
        author: 'Dave Ramsey',
        description:
            'Dave Ramsey’s Complete Guide to Money covers the A to Z of Dave’s money teaching, including how to budget, save, dump debt, and invest. If you’re looking for practical information to answer all your “How?” “What?” and “Why?” questions about money, this book is for you. You’ll also learn all about insurance, mortgage options, marketing, bargain hunting and the most important element of all—giving. Now let’s be honest: This is the handbook of Financial Peace University.',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615079555/dqjlpowew1arisacuqhx.jpg',
        price: 28,
        seller: ObjectId('604426e2c3f1af2d50014918'),
        createdAt: 1615079555585,
        __v: 0,
    },
    {
        _id: ObjectId('604428c6c3f1af2d5001491c'),
        title: 'Think Like a Monk',
        subtitle: 'Train Your Mind for Peace and Purpose Every Day',
        author: 'Jay Shetty',
        description:
            'Shetty grew up in a family where you could become one of three things—a doctor, a lawyer, or a failure. His family was convinced he had chosen option three: instead of attending his college graduation ceremony, he headed to India to become a monk, to meditate every day for four to eight hours, and devote his life to helping others. After three years, one of his teachers told him that he would have more impact on the world if he left the monk’s path to share his experience and wisdom with others. Heavily in debt, and with no recognizable skills on his résumé, he moved back home in north London with his parents.\n\nShetty reconnected with old school friends—many working for some of the world’s largest corporations—who were experiencing tremendous stress, pressure, and unhappiness, and they invited Shetty to coach them on well-being, purpose, and mindfulness. Since then, Shetty has become one of the world’s most popular influencers. In 2017, he was named in the Forbes magazine 30-under-30 for being a game-changer in the world of media. In 2018, he had the #1 video on Facebook with over 360 million views. His social media following totals over 38 million, he has produced over 400 viral videos which have amassed more than 8 billion views, and his podcast, On Purpose, is consistently ranked the world’s #1 Health and Wellness podcast.\n\nIn this inspiring, empowering book, Shetty draws on his time as a monk to show us how we can clear the roadblocks to our potential and power. Combining ancient wisdom and his own rich experiences in the ashram, Think Like a Monk reveals how to overcome negative thoughts and habits, and access the calm and purpose that lie within all of us. He transforms abstract lessons into advice and exercises we can all apply to reduce stress, improve relationships, and give the gifts we find in ourselves to the world. Shetty proves that everyone can—and should—think like a monk.',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615079622/dpngb9ejptidl8rvcw2t.jpg',
        price: 18,
        seller: ObjectId('604426e2c3f1af2d50014918'),
        createdAt: 1615079622125,
        __v: 0,
    },
    {
        _id: ObjectId('60442922c3f1af2d5001491d'),
        title: 'Steve Jobs',
        subtitle: 'The Exclusive Biography',
        author: 'Walter Isaacson',
        description:
            'Based on more than forty interviews with Jobs conducted over two years—as well as interviews with more than a hundred family members, friends, adversaries, competitors, and colleagues—Walter Isaacson has written a riveting story of the roller-coaster life and searingly intense personality of a creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries: personal computers, animated movies, music, phones, tablet computing, and digital publishing.\nAt a time when America is seeking ways to sustain its innovative edge, and when societies around the world are trying to build digital-age economies, Jobs stands as the ultimate icon of inventiveness and applied imagination. He knew that the best way to create value in the twenty-first century was to connect creativity with technology. He built a company where leaps of the imagination were combined with remarkable feats of engineering.  \n\nAlthough Jobs cooperated with this book, he asked for no control over what was written nor even the right to read it before it was published. He put nothing off-limits. He encouraged the people he knew to speak honestly. And Jobs speaks candidly, sometimes brutally so, about the people he worked with and competed against. His friends, foes, and colleagues provide an unvarnished view of the passions, perfectionism, obsessions, artistry, devilry, and compulsion for control that shaped his approach to business and the innovative products that resulted.\n\nDriven by demons, Jobs could drive those around him to fury and despair. But his personality and products were interrelated, just as Apple’s hardware and software tended to be, as if part of an integrated system. His tale is instructive and cautionary, filled with lessons about innovation, character, leadership, and values.',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615079714/n5xupueb3qpantqkawv9.jpg',
        price: 17,
        seller: ObjectId('604426e2c3f1af2d50014918'),
        createdAt: 1615079714552,
        __v: 0,
    },
    {
        _id: ObjectId('6044294ec3f1af2d5001491e'),
        title: 'The Everything Store',
        subtitle: 'Jeff Bezos and the Age of Amazon',
        author: 'Brad Stone',
        description:
            "Amazon.com started off delivering books through the mail. But its visionary founder, Jeff Bezos, wasn't content with being a bookseller. He wanted Amazon to become the everything store, offering limitless selection and seductive convenience at disruptively low prices. To do so, he developed a corporate culture of relentless ambition and secrecy that's never been cracked. Until now. Brad Stone enjoyed unprecedented access to current and former Amazon employees and Bezos family members, giving readers the first in-depth, fly-on-the-wall account of life at Amazon. Compared to tech's other elite innovators -- Jobs, Gates, Zuckerberg -- Bezos is a private man. But he stands out for his restless pursuit of new markets, leading Amazon into risky new ventures like the Kindle and cloud computing, and transforming retail in the same way Henry Ford revolutionized manufacturing.\n\nThe Everything Store is the revealing, definitive biography of the company that placed one of the first and largest bets on the Internet and forever changed the way we shop and read.",
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615079758/urybc92ppnp5mr7v1rz9.jpg',
        price: 17,
        seller: ObjectId('604426e2c3f1af2d50014918'),
        createdAt: 1615079758080,
        __v: 0,
    },
    {
        _id: ObjectId('60442987c3f1af2d5001491f'),
        title: 'Elon Musk',
        subtitle: 'Tesla, SpaceX, and the Quest for a Fantastic Future',
        author: 'Ashlee Vance',
        description:
            'In the spirit of Steve Jobs and Moneyball, Elon Musk is both an illuminating and authorized look at the extraordinary life of one of Silicon Valley’s most exciting, unpredictable, and ambitious entrepreneurs—a real-life Tony Stark—and a fascinating exploration of the renewal of American invention and its new “makers.”\n\nElon Musk spotlights the technology and vision of Elon Musk, the renowned entrepreneur and innovator behind SpaceX, Tesla, and SolarCity, who sold one of his Internet companies, PayPal, for $1.5 billion. Ashlee Vance captures the full spectacle and arc of the genius’s life and work, from his tumultuous upbringing in South Africa and flight to the United States to his dramatic technical innovations and entrepreneurial pursuits.\n\nVance uses Musk’s story to explore one of the pressing questions of our age: can the nation of inventors and creators who led the modern world for a century still compete in an age of fierce global competition? He argues that Musk—one of the most unusual and striking figures in American business history—is a contemporary, visionary amalgam of legendary inventors and industrialists including Thomas Edison, Henry Ford, Howard Hughes, and Steve Jobs. More than any other entrepreneur today, Musk has dedicated his energies and his own vast fortune to inventing a future that is as rich and far-reaching as the visionaries of the golden age of science-fiction fantasy.\n\nThorough and insightful, Elon Musk brings to life a technology industry that is rapidly and dramatically changing by examining the life of one of its most powerful and influential titans.',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615079815/jztzgwmnvcbomtffvdrs.jpg',
        price: 22,
        seller: ObjectId('604426e2c3f1af2d50014918'),
        createdAt: 1615079815926,
        __v: 0,
    },
    {
        _id: ObjectId('60442a64c3f1af2d50014921'),
        title: 'Good To Great',
        subtitle: "Why Some Companies Make the Leap...And Others Don't",
        author: 'Jim Collins',
        description:
            'Built to Last, the defining management study of the nineties, showed how great companies triumph over time and how long-term sustained performance can be engineered into the DNA of an enterprise from the very beginning.\n\nBut what about the company that is not born with great DNA? How can good companies, mediocre companies, even bad companies achieve enduring greatness?',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615080036/c7z4f53ee6xiwikhsp08.jpg',
        price: 29,
        seller: ObjectId('60442a1fc3f1af2d50014920'),
        createdAt: 1615080036065,
        __v: 0,
    },
    {
        _id: ObjectId('60442aa3c3f1af2d50014922'),
        title: 'The 4-Hour Workweek',
        subtitle: 'Escape 9-5, Live Anywhere, and Join the New Rich',
        author: 'Timothy Ferriss',
        description:
            'Forget the old concept of retirement and the rest of the deferred-life plan–there is no need to wait and every reason not to, especially in unpredictable economic times. Whether your dream is escaping the rat race, experiencing high-end world travel, or earning a monthly five-figure income with zero management, The 4-Hour Workweek is the blueprint.\n\nThis step-by-step guide to luxury lifestyle design teaches:\n• How Tim went from $40,000 per year and 80 hours per week to $40,000 per month and 4 hours per week\n• How to outsource your life to overseas virtual assistants for $5 per hour and do whatever you want\n• How blue-chip escape artists travel the world without quitting their jobs\n• How to eliminate 50% of your work in 48 hours using the principles of a forgotten Italian economist\n• How to trade a long-haul career for short work bursts and frequent “mini-retirements”',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615080099/p6gqmu7qvxoh3tfppkvc.jpg',
        price: 11,
        seller: ObjectId('60442a1fc3f1af2d50014920'),
        createdAt: 1615080099192,
        __v: 0,
    },
    {
        _id: ObjectId('60442ad1c3f1af2d50014923'),
        title: 'The Lean Startup',
        subtitle:
            "How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses",
        author: 'Eric Ries',
        description:
            'Eric Ries defines a startup as an organization dedicated to creating something new under conditions of extreme uncertainty. This is just as true for one person in a garage or a group of seasoned professionals in a Fortune 500 boardroom. What they have in common is a mission to penetrate that fog of uncertainty to discover a successful path to a sustainable business.\n\nThe Lean Startup approach fosters companies that are both more capital efficient and that leverage human creativity more effectively. Inspired by lessons from lean manufacturing, it relies on “validated learning,” rapid scientific experimentation, as well as a number of counter-intuitive practices that shorten product development cycles, measure actual progress without resorting to vanity metrics, and learn what customers really want. It enables a company to shift directions with agility, altering plans inch by inch, minute by minute.\n\nRather than wasting time creating elaborate business plans, The Lean Startup offers entrepreneurs—in companies of all sizes—a way to test their vision continuously, to adapt and adjust before it’s too late. Ries provides a scientific approach to creating and managing successful startups in a age when companies need to innovate more than ever.',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615080145/o4db1pxbd5wsbu2jmm9g.jpg',
        price: 35,
        seller: ObjectId('60442a1fc3f1af2d50014920'),
        createdAt: 1615080145859,
        __v: 0,
    },
    {
        _id: ObjectId('60442b0dc3f1af2d50014924'),
        title: 'Principles',
        subtitle: 'Life and Work',
        author: 'Ray Dalio',
        description:
            'In Principles, Dalio shares what he’s learned over the course of his remarkable career. He argues that life, management, economics, and investing can all be systemized into rules and understood like machines. The book’s hundreds of practical lessons, which are built around his cornerstones of “radical truth” and “radical transparency,” include Dalio laying out the most effective ways for individuals and organizations to make decisions, approach challenges, and build strong teams. He also describes the innovative tools the firm uses to bring an idea meritocracy to life, such as creating “baseball cards” for all employees that distill their strengths and weaknesses, and employing computerized decision-making systems to make believability-weighted decisions. While the book brims with novel ideas for organizations and institutions, Principles also offers a clear, straightforward approach to decision-making that Dalio believes anyone can apply, no matter what they’re seeking to achieve.\n\nHere, from a man who has been called both “the Steve Jobs of investing” and “the philosopher king of the financial universe” (CIO magazine), is a rare opportunity to gain proven advice unlike anything you’ll find in the conventional business press.',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615080204/kcanvxcrucjgwgjs2mr1.jpg',
        price: 15,
        seller: ObjectId('60442a1fc3f1af2d50014920'),
        createdAt: 1615080205016,
        __v: 0,
    },
    {
        _id: ObjectId('60442b73c3f1af2d50014925'),
        title: 'Tools of Titans',
        subtitle:
            'The Tactics, Routines, and Habits of Billionaires, Icons, and World-Class Performers',
        author: 'Timothy Ferriss',
        description:
            'For the last two years, I’ve interviewed more than 200 world-class performers for my podcast,The Tim Ferriss Show.The guests range from super celebs (Jamie Foxx, Arnold Schwarzenegger, etc.) and athletes (icons of powerlifting, gymnastics, surfing, etc.) to legendary Special Operations commanders and black-market biochemists. For most of my guests, it’s the first time they’ve agreed to a two-to-three-hour interview. This unusual depth has helped makeThe Tim Ferriss Show the first business/interview podcast to pass 100 million downloads.\nThis book contains the distilled tools, tactics, and ‘inside baseball’ you won’t find anywhere else. It also includes new tips from past guests, and life lessons from new ‘guests’ you haven’t met',
        image:
            'http://res.cloudinary.com/dh0eho4vx/image/upload/v1615080307/oxqge1tckirufexqpuej.jpg',
        price: 29,
        seller: ObjectId('60442a1fc3f1af2d50014920'),
        createdAt: 1615080307608,
        __v: 0,
    },
];
