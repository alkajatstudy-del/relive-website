
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app");
  const page = document.body.dataset.page || "home";
  const $ = id => document.getElementById(id);

  const IMG = {
    fashion: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",
    donate: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85",
    reuse: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85",
    denim: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",
    jeans: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
    tshirt: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85",
    repair: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=1400&q=85",
    fabric: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85",
    recycle: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85",
    home: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85"
  };

  const navItems = [
    ["Home","index.html","home"],
    ["Reuse","reuse.html","reuse"],
    ["Repair","repair.html","repair"],
    ["Recycle","recycle.html","recycle"],
    ["Donate","donate.html","donate"],
    ["About","about.html","about"],
    ["Contact","contact.html","contact"],
    ["FAQ","faq.html","faq"]
  ];

  function read(key, fallback = []) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value == null ? fallback : value;
    } catch { return fallback; }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch { return false; }
  }

  function getUser() {
    try {
      const session = JSON.parse(
        sessionStorage.getItem("reliveDemoSession") || "null"
      );
      const users = read("reliveDemoUsers");
      if (!session || !Array.isArray(users)) return null;
      return users.find(u => u.email === session.email) || null;
    } catch { return null; }
  }

  function safeText(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&":"&amp;", "<":"&lt;", ">":"&gt;",
      '"':"&quot;", "'":"&#39;"
    }[char]));
  }

  
function header() {
  const user = getUser();
  const first = user ? user.name.trim().split(/\s+/)[0] : "";

  return `
    <div class="announcement">
      SUSTAINABLE FASHION ✦ GIVE FASHION ANOTHER CHANCE
    </div>

    <header class="header">
      <nav class="navbar container">

        


<a href="index.html" class="logo">
  RE<span class="logo-colon">:</span>LIVE
</a>



        <button
          class="menu-toggle"
          id="menuToggle"
          aria-label="Toggle navigation"
          aria-expanded="false"
        >☰</button>

        <div class="nav-links" id="navLinks">
          ${navItems.map(([name, url, id]) =>
            `<a href="${url}" class="${page === id ? "active" : ""}">
              ${name}
            </a>`
          ).join("")}

          <a
            href="${user ? "dashboard.html" : "login.html"}"
            class="nav-account"
          >
            ${user ? "Hi, " + safeText(first) + " ↗" : "Login / Signup ↗"}
          </a>
        </div>

      </nav>
    </header>
  `;
}


  
function footer() {
  return `
    <footer class="footer">
      <div class="container">

        <div class="footer-grid">

          <div>
            

<a href="index.html" class="logo">
  RE<span class="logo-colon">:</span>LIVE
</a>


            <p>
              Give fashion another chance through reuse,
              repair, recycling and donation.
            </p>
          </div>

          <div>
            <h4>EXPLORE</h4>
            <a href="index.html">Home</a>
            <a href="reuse.html">Reuse</a>
            <a href="repair.html">Repair</a>
            <a href="recycle.html">Recycle</a>
            <a href="about.html">About Us</a>
          </div>

          <div>
            <h4>GET INVOLVED</h4>
            <a href="donate.html">Donate Clothes</a>
            <a href="contact.html">Contact Us</a>
            <a href="faq.html">FAQs</a>
            <a href="dashboard.html">My Dashboard</a>
          </div>

        </div>

        <div class="footer-bottom">
          © ${new Date().getFullYear()}
          RELIVE | Community Engagement Project
        </div>

      </div>
    </footer>
  `;
}


  function hero(label, title, description, image, link, button, home = false) {
    return `
      <section class="hero ${home ? "home-hero" : ""}">
        <div class="hero-copy">
          <span class="eyebrow">${label}</span>
          <h1>${title}</h1>
          <p>${description}</p>
          <a href="${link}" class="btn btn-gold">${button} ↗</a>
        </div>
        <div class="hero-image">
          <img src="${image}" alt="RELIVE sustainable clothing photograph">
        </div>
      </section>`;
  }

  function heading(label, title, description = "") {
    return `<div class="section-heading center">
      <span class="eyebrow">${label}</span>
      <h2>${title}</h2>
      ${description ? `<p>${description}</p>` : ""}
    </div>`;
  }

  function cta(title, description, url, label) {
    return `<section class="cta">
      <span class="eyebrow" style="color:#d6ad6b">MAKE A DIFFERENCE</span>
      <h2>${title}</h2><p>${description}</p>
      <a href="${url}" class="btn btn-light">${label} ↗</a>
    </section>`;
  }

  function photoCard(name, description, image, link, label) {
    return `<article class="card">
      <img src="${image}" alt="${name}" loading="lazy">
      <div class="card-body">
        <h3>${name}</h3><p>${description}</p>
        <a href="${link}" class="card-link">${label} →</a>
      </div>
    </article>`;
  }

  const reuseIdeas = [
    {id:"tshirt-bag",title:"T-Shirt Tote Bag",cat:"tshirt",image:IMG.tshirt,
      desc:"Turn an old T-shirt into a reusable shopping bag.",
      steps:["Take a clean old T-shirt.","Cut off the sleeves and widen the neckline.","Turn the shirt inside out.","Stitch the bottom or tie fabric strips securely.","Turn it right side out and use your bag."]},
    {id:"denim-pouch",title:"Denim Pouch",cat:"denim",image:IMG.denim,
      desc:"Make a handy pouch from worn-out jeans.",
      steps:["Cut two equal rectangles from old jeans.","Place the pieces inside out.","Stitch three sides.","Add a zipper or button closure.","Turn right side out."]},
    {id:"scrunchie",title:"Fabric Scrunchie",cat:"fabric",image:IMG.fabric,
      desc:"Create a hair accessory from leftover fabric.",
      steps:["Cut a long strip of fabric.","Fold lengthwise and stitch the edge.","Turn the fabric tube right side out.","Insert elastic with a safety pin.","Tie elastic and close the opening."]},
    {id:"denim-shorts",title:"DIY Denim Shorts",cat:"denim",image:IMG.jeans,
      desc:"Give old jeans a fresh new style.",
      steps:["Try on jeans and mark the desired length.","Remove the jeans before cutting.","Cut slightly below the marking.","Fold and stitch the hem.","Decorate with patches if desired."]},
    {id:"crop-top",title:"Upcycled Crop Top",cat:"tshirt",image:IMG.reuse,
      desc:"Transform an oversized T-shirt.",
      steps:["Choose an old oversized T-shirt.","Mark your desired length.","Remove the shirt before cutting.","Cut carefully and fold the hem.","Stitch or decorate the finished edge."]},
    {id:"patchwork",title:"Patchwork Cushion",cat:"fabric",image:IMG.home,
      desc:"Create home decor with leftover fabric pieces.",
      steps:["Collect clean fabric scraps.","Cut squares of similar size.","Arrange them in a pattern.","Stitch the squares together.","Add a back panel to make a cushion cover."]}
  ];

  const repairIdeas = [
    {id:"button",title:"Sew a Button",cat:"stitching",image:IMG.repair,
      desc:"Replace a missing button.",
      steps:["Find a matching button.","Thread a needle.","Place the button over its original position.","Stitch through the holes several times.","Secure the thread on the inside."]},
    {id:"tear",title:"Fix a Small Tear",cat:"stitching",image:IMG.fabric,
      desc:"Mend a small fabric tear.",
      steps:["Turn the garment inside out.","Align the torn edges.","Use matching thread.","Sew small, even stitches.","Secure and trim the thread."]},
    {id:"hem",title:"Repair a Loose Hem",cat:"stitching",image:IMG.denim,
      desc:"Fix a loose or uneven hem.",
      steps:["Fold fabric along the original hem.","Press the fold.","Pin the edge.","Sew small stitches.","Remove pins and press again."]},
    {id:"stain",title:"Treat Fabric Stains",cat:"care",image:IMG.donate,
      desc:"Use gentle stain-care techniques.",
      steps:["Check the care label.","Blot rather than scrub.","Test detergent on a hidden area.","Wash according to the label.","Air dry before checking the stain."]},
    {id:"zipper",title:"Unstick a Zipper",cat:"fixing",image:IMG.jeans,
      desc:"Try a gentle zipper fix.",
      steps:["Avoid pulling forcefully.","Check for trapped fabric.","Carefully release any trapped material.","Try zipper-safe lubricant.","Replace a broken zipper if needed."]},
    {id:"care",title:"Clothing Care Tips",cat:"care",image:IMG.fashion,
      desc:"Help your favourite clothes last longer.",
      steps:["Read the garment care label.","Wash only when needed.","Use appropriate gentle cycles.","Air dry when suitable.","Store clean, dry clothes properly."]}
  ];

  function tutorialPage(type) {
    const isReuse = type === "reuse";
    const ideas = isReuse ? reuseIdeas : repairIdeas;
    const filters = isReuse
      ? [["all","All Ideas"],["tshirt","T-Shirts"],["denim","Denim"],["fabric","Fabric Scraps"]]
      : [["all","All Guides"],["stitching","Stitching"],["fixing","Fixing"],["care","Fabric Care"]];

    return hero(
      isReuse ? "REIMAGINE YOUR WARDROBE" : "CARE IS ALWAYS IN STYLE",
      isReuse ? "Old clothes.<br><em>New possibilities.</em>" : "Don't replace it.<br><em>Repair it.</em>",
      isReuse ? "Discover creative ways to transform pre-loved clothes." : "Learn simple skills to extend the life of your clothes.",
      isReuse ? IMG.reuse : IMG.repair,
      "#ideas", isReuse ? "Explore DIY Ideas" : "Explore Repair Guides"
    ) + `
      <section class="section" id="ideas">
        <div class="container">
          ${heading(isReuse ? "DIY / UPCYCLING" : "LEARN TO MEND",
            isReuse ? "Make something new." : "Simple repairs. Longer life.",
            "Choose a category and open a step-by-step tutorial.")}
          <div class="filter-bar" id="filters">
            ${filters.map(([id,label],i) =>
              `<button class="filter-btn ${i===0?"active":""}" data-filter="${id}">${label}</button>`
            ).join("")}
          </div>
          <div class="grid-3" id="ideaGrid">
            ${ideas.map(item => `
              <article class="card" data-category="${item.cat}">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="card-body">
                  <span class="tag">${item.cat.toUpperCase()}</span>
                  <h3>${item.title}</h3>
                  <p>${item.desc}</p>
                  <div class="action-row">
                    <button class="card-link" data-tutorial="${item.id}">View Tutorial →</button>
                    ${isReuse ? `<button class="fav-btn" data-favorite="${item.id}"
                      aria-label="Save ${item.title}">♡</button>` : ""}
                  </div>
                </div>
              </article>`).join("")}
          </div>
        </div>
      </section>
      ${isReuse ? "" : `
        <section class="section alt">
          <div class="container" style="max-width:800px">
            ${heading("BE PREPARED","Your Essential Repair Kit",
              "Tick the items you already have.")}
            <div class="form-card">
              <div class="grid-2">
                ${["needle","thread","scissors","buttons","pins","tape","patches"]
                  .map(x => `<label class="checkbox-line">
                    <input type="checkbox" data-kit="${x}"> ${x[0].toUpperCase()+x.slice(1)}
                  </label>`).join("")}
              </div>
              <p id="kitProgress"></p>
            </div>
          </div>
        </section>`}
      ${cta("Give your clothes another chance.",
        "Sustainable fashion starts with small everyday choices.",
        isReuse ? "repair.html" : "reuse.html",
        isReuse ? "Explore Repair" : "Explore Reuse")}
      <div class="modal" id="tutorialModal" hidden>
        <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
          <button class="modal-close" id="closeModal" aria-label="Close tutorial">×</button>
          <span class="eyebrow">RELIVE STEP-BY-STEP GUIDE</span>
          <h2 id="modalTitle"></h2>
          <ol id="modalSteps"></ol>
        </div>
      </div>`;
  }

  function homePage() {
    return hero("THE FUTURE OF FASHION IS CIRCULAR",
      "Give fashion<br>another <em>chance.</em>",
      "Every garment has a story. Help rewrite it through reuse, repair, recycling and donation.",
      IMG.fashion,"#explore","Explore RELIVE",true) + `
      <section class="section" id="explore">
        <div class="container">
          ${heading("WHAT WE BELIEVE IN",
            "Four ways to make fashion meaningful.",
            "Small choices today can create a more sustainable tomorrow.")}
          <div class="grid-4">
            ${photoCard("Reuse","Reimagine old clothes.",IMG.reuse,"reuse.html","Explore")}
            ${photoCard("Repair","Make favourites last longer.",IMG.repair,"repair.html","Explore")}
            ${photoCard("Recycle","Learn responsible textile recycling.",IMG.recycle,"recycle.html","Explore")}
            ${photoCard("Donate","Give wearable clothes another life.",IMG.donate,"donate.html","Donate")}
          </div>
        </div>
      </section>
      <section class="section alt" id="mission">
        <div class="container split">
          <img src="${IMG.fashion}" alt="Sustainable fashion collection" loading="lazy">
          <div>
            <span class="eyebrow">OUR MISSION</span>
            <h2>Less waste.<br>More purpose.</h2>
            <p>RELIVE is a Community Engagement Project encouraging conscious clothing habits and reducing unnecessary textile waste.</p>
            <a href="about.html" class="btn">Discover Our Story ↗</a>
          </div>
        </div>
      </section>
      ${cta("Ready to give fashion another chance?",
        "Join the movement and start with one small action.",
        "login.html#signup","Join RELIVE")}`;
  }

  function donatePage() {
    return hero("GIVE WITH PURPOSE",
      "Pass it on.<br><em>Spread kindness.</em>",
      "Your pre-loved clothes could become someone else's new favourite.",
      IMG.donate,"#donationSection","Start Donating") + `
      <section class="section">
        <div class="container">
          ${heading("HOW IT WORKS","Donate in three simple steps.")}
          <div class="grid-3">
            ${["Sort clean, wearable clothes","Fill in your donation details","Arrange a real handover separately"]
              .map((text,i)=>`<div class="step-card">
                <span class="step-number">0${i+1}</span>
                <h3>${["Sort","Submit","Give Again"][i]}</h3><p>${text}</p>
              </div>`).join("")}
          </div>
        </div>
      </section>
      <section class="section alt" id="donationSection">
        <div class="container" style="max-width:850px">
          ${heading("MAKE A DIFFERENCE","Clothing Donation Form",
            "Create a demo donation request. No actual pickup is booked.")}
          <div class="form-card">
            <form id="donationForm">
              <div class="form-grid">
                <div class="form-group">
                  <label for="donorName">Full Name *</label>
                  <input id="donorName" name="name" required minlength="2">
                </div>
                <div class="form-group">
                  <label for="donorPhone">Phone Number *</label>
                  <input id="donorPhone" name="phone" type="tel" pattern="[0-9]{10}" maxlength="10" required placeholder="10-digit number">
                </div>
              </div>
              <div class="form-group">
                <label for="donorEmail">Email *</label>
                <input id="donorEmail" name="email" type="email" required>
              </div>
              <div class="form-grid">
                <div class="form-group">
                  <label for="clothingType">Clothing Type *</label>
                  <select id="clothingType" name="clothingType" required>
                    <option value="">Select type</option>
                    <option>Men's Clothing</option><option>Women's Clothing</option>
                    <option>Children's Clothing</option><option>Mixed Clothing</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="quantity">Quantity (number of clothes)</label>
<input
  type="number"
  id="quantity"
  name="quantity"
  min="1"
  step="1"
  value="1"
  required
/>
                  <select id="quantity" name="quantity" required>
                    <option value="">Select quantity</option>
                    <option>1–5 Pieces</option><option>6–10 Pieces</option>
                    <option>11–20 Pieces</option><option>More than 20 Pieces</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="condition">Condition *</label>
                  <select id="condition" name="condition" required>
                    <option value="">Select condition</option>
                    <option>Excellent</option><option>Good</option>
                    <option>Minor Repair Needed</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="method">Preferred Method *</label>
                  <select id="method" name="method" required>
                    <option value="">Select method</option>
                    <option>Pickup Enquiry</option><option>Drop-off Enquiry</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="address">Address / Area *</label>
                <textarea id="address" name="address" minlength="8" required></textarea>
              </div>
              <div class="form-group">
                <label for="notes">Additional Notes</label>
                <textarea id="notes" name="notes"></textarea>
              </div>
              <label class="checkbox-line">
                <input type="checkbox" required>
                I understand this is a demo request and not an actual pickup booking.
              </label>
              <button class="btn btn-full" type="submit">Submit Donation Request ↗</button>
              <div id="donationMessage" hidden role="status"></div>
            </form>
          </div>
        </div>
      </section>
      ${cta("Give clothes a second story.",
        "Every wearable garment deserves another chance.",
        "reuse.html","Explore Reuse")}`;
  }

  function recyclePage() {
    const materials = [
      ["Cotton",IMG.fabric,"Natural fibre that may be mechanically recycled."],
      ["Denim",IMG.denim,"Can be reused, upcycled or processed at suitable facilities."],
      ["Polyester",IMG.tshirt,"Recycling options depend on local facilities."],
      ["Wool",IMG.donate,"Often suitable for repair and reuse before recycling."]
    ];
    return hero("CLOSE THE LOOP",
      "Waste less.<br><em>Recycle more.</em>",
      "Understand textile waste and responsible clothing recycling.",
      IMG.recycle,"#process","Explore Recycling") + `
      <section class="section" id="process">
        <div class="container">
          ${heading("THE PROCESS","From old fibres to new possibilities.")}
          <div class="grid-4">
            ${["Collect","Sort","Process","Recreate"].map((name,i) =>
              `<div class="step-card"><span class="step-number">0${i+1}</span>
                <h3>${name}</h3>
                <p>${[
                  "Gather unwanted textiles.",
                  "Separate by condition and material.",
                  "Recover suitable fibres or materials.",
                  "Create useful products where possible."
                ][i]}</p></div>`).join("")}
          </div>
        </div>
      </section>
      <section class="section alt">
        <div class="container">
          ${heading("KNOW YOUR FABRIC","Different materials. Different journeys.")}
          <div class="grid-4">
            ${materials.map(([name,img,desc]) =>
              photoCard(name,desc,img,"faq.html","Learn More")).join("")}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          ${heading("SMART SORTING","What should you do with old clothes?")}
          <div class="grid-3">
            <div class="step-card"><h3>Good Condition</h3><p>Wear, share, sell or donate.</p></div>
            <div class="step-card"><h3>Minor Damage</h3><p>Repair or creatively reuse.</p></div>
            <div class="step-card"><h3>Worn Out</h3><p>Check local textile recycling acceptance rules.</p></div>
          </div>
        </div>
      </section>
      <section class="section alt">
        <div class="container">
          ${heading("TEST YOUR KNOWLEDGE","RELIVE Recycling Quiz")}
          <div class="quiz-box" id="quizBox"></div>
        </div>
      </section>
      ${cta("Start with what you already own.",
        "Reuse, repair and donate before recycling whenever suitable.",
        "donate.html","Donate Clothes")}`;
  }

  function aboutPage() {
    return hero("THE STORY BEHIND RELIVE",
      "Fashion with<br><em>a purpose.</em>",
      "Every garment deserves a second chance.",
      IMG.fashion,"#story","Discover Our Story") + `
      <section class="section" id="story">
        <div class="container split">
          <img src="${IMG.reuse}" alt="Fashion and clothing" loading="lazy">
          <div>
            <span class="eyebrow">WHO WE ARE</span>
            <h2>Giving fashion another chance.</h2>
            <p>RELIVE is a Community Engagement Project promoting responsible clothing habits and awareness about textile waste.</p>
            <p>Our four pillars are reuse, repair, recycle and donate.</p>
            <a href="donate.html" class="btn">Get Involved ↗</a>
          </div>
        </div>
      </section>
      <section class="section alt">
        <div class="container">
          ${heading("OUR VALUES","Four Pillars of RELIVE")}
          <div class="grid-4">
            ${["Reuse","Repair","Recycle","Donate"].map((name,i) =>
              `<div class="step-card">
                <span class="step-number">0${i+1}</span>
                <h3>${name}</h3>
                <p>${["Reimagine old garments.","Mend and maintain clothing.",
                  "Understand responsible recycling.","Give wearable clothes another life."][i]}</p>
              </div>`).join("")}
          </div>
        </div>
      </section>
      ${cta("Make sustainable fashion a habit.",
        "Start with a small action today.","reuse.html","Explore RELIVE")}`;
  }

  function contactPage() {
    return hero("WE'D LOVE TO HEAR FROM YOU",
      "Let's start a<br><em>conversation.</em>",
      "Have a question or suggestion? Send a demo message.",
      IMG.donate,"#contactSection","Contact Us") + `
      <section class="section" id="contactSection">
        <div class="container split">
          <div>
            <span class="eyebrow">GET IN TOUCH</span>
            <h2>Every conversation matters.</h2>
            <p>Ask about reuse, repair, recycling, donation or suggest improvements to our college project.</p>
            <div class="step-card">
              <h3>Quick Answers</h3>
              <p>Visit our FAQ page for information about RELIVE.</p>
              <a href="faq.html" class="card-link">Read FAQs →</a>
            </div>
          </div>
          <div class="form-card">
            <h2>Send a message.</h2>
            <p>Messages are stored only in this browser.</p>
            <form id="contactForm">
              <div class="form-group">
                <label for="contactName">Full Name *</label>
                <input id="contactName" name="name" minlength="2" required>
              </div>
              <div class="form-group">
                <label for="contactEmail">Email *</label>
                <input id="contactEmail" name="email" type="email" required>
              </div>
              <div class="form-group">
                <label for="contactSubject">Subject *</label>
                <select id="contactSubject" name="subject" required>
                  <option value="">Select a topic</option>
                  <option>Clothing Donation</option>
                  <option>Reuse Ideas</option>
                  <option>Clothing Repair</option>
                  <option>Textile Recycling</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div class="form-group">
                <label for="contactMessage">Message *</label>
                <textarea id="contactMessage" name="message" minlength="10" required></textarea>
              </div>
              <label class="checkbox-line">
                <input type="checkbox" required>
                I understand this demo form does not send an email.
              </label>
              <button class="btn btn-full" type="submit">Submit Message ↗</button>
              <div id="contactStatus" hidden role="status"></div>
            </form>
          </div>
        </div>
      </section>
      ${cta("Be part of the change.",
        "Start your sustainable fashion journey.","donate.html","Explore Donation")}`;
  }

  const faqs = [
    ["What is RELIVE?","RELIVE is a Community Engagement Project promoting reuse, repair, recycling and donation of clothes."],
    ["What clothes can I donate?","Clean, wearable clothing may be suitable. Check a real organisation's requirements before donating."],
    ["Does RELIVE arrange actual pickups?","No. The current donation form is a browser-based demonstration and does not book a pickup."],
    ["Can old T-shirts and jeans be reused?","Yes. Try tote bags, pouches, shorts and other upcycling ideas."],
    ["Why repair clothes?","Repairing can extend garment life and avoid unnecessary replacement."],
    ["Can all textiles be recycled?","No. It depends on fibre type, contamination and available recycling facilities."],
    ["Do I need an account?","No. Educational pages are public. A demo account enables the dashboard."],
    ["Is the demo login secure?","No. It uses browser storage. Use only dummy credentials, never real passwords."],
    ["How does the contact form work?","It stores a demo message in your browser and does not send an email."]
  ];

  function faqPage() {
    return hero("HELP & GUIDANCE",
      "Questions?<br><em>We've got answers.</em>",
      "Find answers about RELIVE and sustainable clothing.",
      IMG.reuse,"#faqSection","Explore FAQs") + `
      <section class="section" id="faqSection">
        <div class="container" style="max-width:850px">
          ${heading("FREQUENTLY ASKED QUESTIONS","Everything you need to know.",
            "Click any question to see its answer.")}
          ${faqs.map(([question,answer]) =>
            `<details class="faq-item">
              <summary>${question}</summary><p>${answer}</p>
            </details>`).join("")}
        </div>
      </section>
      ${cta("Still have questions?",
        "Share your suggestions with RELIVE.","contact.html","Contact Us")}`;
  }

  function loginPage() {
    return `
      <main class="auth-layout">
        <section class="auth-brand">
          <span class="eyebrow" style="color:#d6ad6b">RELIVE COMMUNITY</span>
          <h1>Good fashion.<br><em>Better future.</em></h1>
          <p>Join the movement for more responsible fashion.</p>
          <img src="${IMG.fashion}" alt="RELIVE fashion">
        </section>
        <section class="auth-side">
          <div class="auth-box">
            <span class="eyebrow">YOUR RELIVE JOURNEY</span>
            <h2 id="authHeading">Welcome back.</h2>
            <div class="auth-tabs">
              <button id="loginTab" class="active" type="button">Login</button>
              <button id="signupTab" type="button">Create Account</button>
            </div>
            <div id="authMessage" hidden role="status"></div>
            <form id="loginForm">
              <div class="form-group">
                <label for="loginEmail">Email</label>
                <input id="loginEmail" type="email" required>
              </div>
              <div class="form-group">
                <label for="loginPassword">Password</label>
                <div class="password-wrap">
                  <input id="loginPassword" type="password" required>
                  <button type="button" data-show="loginPassword">Show</button>
                </div>
              </div>
              <button class="btn btn-full" type="submit">Sign In ↗</button>
              <p class="center" style="margin-top:20px;font-size:12px">
                New to RELIVE?
                <button type="button" class="card-link" data-switch="signup">Create Account</button>
              </p>
            </form>
            <form id="signupForm" hidden>
              <div class="form-group">
                <label for="signupName">Full Name</label>
                <input id="signupName" minlength="2" required>
              </div>
              <div class="form-group">
                <label for="signupEmail">Email</label>
                <input id="signupEmail" type="email" required>
              </div>
              <div class="form-group">
                <label for="signupPassword">Password</label>
                <div class="password-wrap">
                  <input id="signupPassword" type="password" minlength="8" required>
                  <button type="button" data-show="signupPassword">Show</button>
                </div>
              </div>
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input id="confirmPassword" type="password" required>
              </div>
              <label class="checkbox-line">
                <input type="checkbox" required>
                I understand this is a college project demo.
              </label>
              <button class="btn btn-full" type="submit">Create Account ↗</button>
            </form>
            <p class="muted" style="font-size:11px;margin-top:25px">
              Demo only. Use a dummy email and password, not real credentials.
            </p>
          </div>
        </section>
      </main>`;
  }

  function dashboardPage() {
    return `
      <section class="section" style="background:#183b30;color:white">
        <div class="container">
          <span class="eyebrow" style="color:#d6ad6b">MY RELIVE ACCOUNT</span>
          <h1 style="margin:20px 0">Welcome, <em id="dashboardName" style="color:#d6ad6b">Friend</em>.</h1>
          <p>Every small action counts.</p>
        </div>
      </section>
      <section class="section">
        <div class="container">
          ${heading("YOUR IMPACT","Your RELIVE Journey")}
          <div class="grid-3">
            <div class="step-card"><span class="step-number" id="donationCount">0</span><h3>Donation Requests</h3><p>Requests you've submitted.</p></div>
            <div class="step-card"><span class="step-number" id="favoriteCount">0</span><h3>Saved Reuse Ideas</h3><p>Your bookmarked tutorials.</p></div>
            <div class="step-card"><span class="step-number" id="repairCount">0 / 7</span><h3>Repair Kit</h3><p>Your checklist progress.</p></div>
          </div>
        </div>
      </section>
      <section class="section alt">
        <div class="container">
          ${heading("YOUR CONTRIBUTIONS","My Donation Requests")}
          <div class="grid-2" id="donationList"></div>
          <p id="noDonations" hidden class="center muted">
            No linked donations yet. <a class="card-link" href="donate.html">Donate Clothes →</a>
          </p>
        </div>
      </section>
      <section class="section">
        <div class="container">
          ${heading("YOUR INSPIRATION","Saved Reuse Ideas")}
          <div class="grid-3" id="favoriteList"></div>
          <p id="noFavorites" hidden class="center muted">
            No favourites yet. <a class="card-link" href="reuse.html">Explore Reuse →</a>
          </p>
        </div>
      </section>
      <section class="cta">
        <h2>Keep making a difference.</h2>
        <p>Continue your sustainable fashion journey.</p>
        <button class="btn btn-gold" id="logoutButton">Logout ↗</button>
      </section>`;
  }

  const pages = {
    home:homePage,
    donate:donatePage,
    reuse:()=>tutorialPage("reuse"),
    repair:()=>tutorialPage("repair"),
    recycle:recyclePage,
    login:loginPage,
    dashboard:dashboardPage,
    about:aboutPage,
    contact:contactPage,
    faq:faqPage
  };

  if (!pages[page]) {
    root.textContent = "Page not found.";
    return;
  }

  if (page === "dashboard" && !getUser()) {
    location.replace("login.html");
    return;
  }

  
root.innerHTML = pages[page]() + footer();


  // Navbar
  $("menuToggle")?.addEventListener("click", () => {
    const open = $("navLinks").classList.toggle("open");
    $("menuToggle").textContent = open ? "✕" : "☰";
    $("menuToggle").setAttribute("aria-expanded", String(open));
  });

  // Image failure fallback
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
      img.style.background = "#dbe4d9";
      img.alt = "RELIVE image unavailable";
    });
  });

  function showMessage(id, text, error = false) {
    const el = $(id);
    if (!el) return;
    el.hidden = false;
    el.className = error ? "message error" : "message";
    el.textContent = text;
  }

  // Donation form
  
/* RELIVE Donation Form — Save and Validate */

document.addEventListener("submit", function (event) {
  if (event.target.id !== "donationForm") return;

  event.preventDefault();

  const form = event.target;

  // Read a field using its name or ID
  function getValue(fieldName) {
    const field =
      form.elements.namedItem(fieldName) ||
      form.querySelector("#" + fieldName);

    return field ? field.value.trim() : "";
  }

  const donorName = getValue("donorName");
  const phone = getValue("phone");
  const email = getValue("email");
  const clothingType = getValue("clothingType");
  const quantity = Number(getValue("quantity"));
  const condition = getValue("condition");
  const method = getValue("method");
  const address = getValue("address");
  const notes = getValue("notes");

  // Basic validation
  if (
    !donorName ||
    !phone ||
    !email ||
    !clothingType ||
    !getValue("quantity") ||
    !condition ||
    !method ||
    !address
  ) {
    alert("Please fill in all required donation fields.");
    return;
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    alert("Please enter a valid quantity of at least 1.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  // Create a donation record
  const donation = {
    id: "RL" + Date.now(),
    donorName,
    phone,
    email,
    clothingType,
    quantity,
    condition,
    method,
    address,
    notes,
    date: new Date().toISOString(),
    status: "Pending"
  };

  // Save in browser LocalStorage
  try {
    const saved = localStorage.getItem("reliveDonations");
    const donations = saved ? JSON.parse(saved) : [];

    if (!Array.isArray(donations)) {
      throw new Error("Invalid donation records");
    }

    donations.push(donation);
    localStorage.setItem(
      "reliveDonations",
      JSON.stringify(donations)
    );

    alert(
      "Thank you for supporting RELIVE! " +
      "Your donation has been recorded. Reference: " +
      donation.id
    );

    form.reset();
  } catch (error) {
    console.error("Donation save error:", error);
    alert(
      "Donation could not be saved. Please check browser storage and try again."
    );
  }
});


  // Contact form
  $("contactForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const all = read("reliveContactMessages");
    if (!Array.isArray(all)) return;

    all.push({
      id:"MSG-" + Date.now(),
      name:String(data.get("name")).trim(),
      email:String(data.get("email")).trim(),
      subject:data.get("subject"),
      message:String(data.get("message")).trim(),
      date:new Date().toISOString()
    });

    if (!save("reliveContactMessages",all)) {
      showMessage("contactStatus","Unable to save message.",true);
      return;
    }
    form.reset();
    showMessage("contactStatus","Demo message saved in this browser.");
  });

  // Category filters
  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach(b =>
        b.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      document.querySelectorAll("#ideaGrid [data-category]").forEach(card => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });

  // Reuse favourites
  document.querySelectorAll("[data-favorite]").forEach(button => {
    const id = button.dataset.favorite;

    function update() {
      const favs = read("reliveReuseFavorites");
      const saved = Array.isArray(favs) && favs.includes(id);
      button.textContent = saved ? "♥" : "♡";
      button.classList.toggle("saved",saved);
      button.setAttribute("aria-pressed",String(saved));
    }

    button.addEventListener("click", () => {
      const favs = read("reliveReuseFavorites");
      if (!Array.isArray(favs)) return;
      const next = favs.includes(id)
        ? favs.filter(x => x !== id)
        : [...favs,id];
      if (save("reliveReuseFavorites",next)) update();
    });
    update();
  });

  // Tutorials
  const allTutorials = [...reuseIdeas,...repairIdeas];
  const modal = $("tutorialModal");

  if (modal) {
    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = "";
    }

    document.querySelectorAll("[data-tutorial]").forEach(button => {
      button.addEventListener("click", () => {
        const item = allTutorials.find(x =>
          x.id === button.dataset.tutorial);
        if (!item) return;
        $("modalTitle").textContent = item.title;
        $("modalSteps").replaceChildren();

        item.steps.forEach(step => {
          const li = document.createElement("li");
          li.textContent = step;
          $("modalSteps").appendChild(li);
        });

        modal.hidden = false;
        document.body.style.overflow = "hidden";
      });
    });

    $("closeModal").addEventListener("click",closeModal);
    modal.addEventListener("click", e => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeModal();
    });
  }

  // Repair checklist
  const kitBoxes = [...document.querySelectorAll("[data-kit]")];

  if (kitBoxes.length) {
    const savedKit = read("reliveRepairKit");
    const selected = Array.isArray(savedKit) ? savedKit : [];

    function updateKit() {
      const count = kitBoxes.filter(box => box.checked).length;
      $("kitProgress").textContent = count + " / 7 essentials ready";
    }

    kitBoxes.forEach(box => {
      box.checked = selected.includes(box.dataset.kit);
      box.addEventListener("change", () => {
        save("reliveRepairKit",
          kitBoxes.filter(x => x.checked).map(x => x.dataset.kit));
        updateKit();
      });
    });
    updateKit();
  }

  // Recycling quiz
  const questions = [
    ["What should you do with wearable clothes?",
      ["Throw away","Donate or reuse","Burn"],1],
    ["Which is a natural fibre?",
      ["Cotton","Polyester","Acrylic"],0],
    ["What comes before textile recycling?",
      ["Mix with waste","Sort by condition","Burn"],1],
    ["Can denim be reused?",
      ["Yes","Never","Only in factories"],0],
    ["What about contaminated textiles?",
      ["Put in donation box","Mix with clean clothes","Follow local disposal guidance"],2]
  ];

  if ($("quizBox")) {
    let index = 0, score = 0, selected = -1;

    function renderQuiz() {
      const box = $("quizBox");
      box.replaceChildren();

      if (index === questions.length) {
        const title = document.createElement("h3");
        title.textContent = "Your Score: " + score + " / 5";
        const note = document.createElement("p");
        note.textContent = "Keep learning about sustainable textiles!";
        const restart = document.createElement("button");
        restart.className = "btn";
        restart.textContent = "Try Again ↻";
        restart.addEventListener("click", () => {
          index = 0; score = 0; renderQuiz();
        });
        box.append(title,note,restart);
        return;
      }

      selected = -1;
      const [question,options,answer] = questions[index];
      const label = document.createElement("span");
      label.className = "eyebrow";
      label.textContent = "QUESTION " + (index+1) + " OF 5";
      const title = document.createElement("h3");
      title.textContent = question;
      box.append(label,title);

      options.forEach((option,i) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.textContent = option;
        btn.addEventListener("click", () => {
          selected = i;
          box.querySelectorAll(".quiz-option").forEach(x =>
            x.classList.remove("selected"));
          btn.classList.add("selected");
        });
        box.appendChild(btn);
      });

      const next = document.createElement("button");
      next.className = "btn";
      next.textContent = index === 4 ? "See Result →" : "Next Question →";
      next.addEventListener("click", () => {
        if (selected < 0) {
          alert("Please select an answer.");
          return;
        }
        if (selected === answer) score++;
        index++;
        renderQuiz();
      });
      box.appendChild(next);
    }
    renderQuiz();
  }

  // Login and Signup
  if ($("loginForm")) {
    function switchTab(mode) {
      const signup = mode === "signup";
      $("loginForm").hidden = signup;
      $("signupForm").hidden = !signup;
      $("loginTab").classList.toggle("active",!signup);
      $("signupTab").classList.toggle("active",signup);
      $("authHeading").textContent =
        signup ? "Join RELIVE." : "Welcome back.";
      $("authMessage").hidden = true;
      history.replaceState(null,"",signup ? "#signup" : "#login");
    }

    $("loginTab").addEventListener("click",()=>switchTab("login"));
    $("signupTab").addEventListener("click",()=>switchTab("signup"));
    document.querySelectorAll("[data-switch]").forEach(button =>
      button.addEventListener("click",() =>
        switchTab(button.dataset.switch)));

    document.querySelectorAll("[data-show]").forEach(button =>
      button.addEventListener("click",() => {
        const input = $(button.dataset.show);
        input.type = input.type === "password" ? "text" : "password";
        button.textContent = input.type === "password" ? "Show" : "Hide";
      }));

    $("signupForm").addEventListener("submit",event => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.reportValidity()) return;

      const name = $("signupName").value.trim();
      const email = $("signupEmail").value.trim().toLowerCase();
      const password = $("signupPassword").value;
      const confirm = $("confirmPassword").value;

      if (name.length < 2 ||
          password.length < 8 ||
          !/[A-Z]/.test(password) ||
          !/[a-z]/.test(password) ||
          !/[0-9]/.test(password)) {
        showMessage("authMessage",
          "Use a name and an 8+ character password with uppercase, lowercase and number.",true);
        return;
      }

      if (password !== confirm) {
        showMessage("authMessage","Passwords do not match.",true);
        return;
      }

      const users = read("reliveDemoUsers");
      if (!Array.isArray(users)) return;
      if (users.some(u => u.email === email)) {
        showMessage("authMessage","Email already registered.",true);
        return;
      }

      // DEMO ONLY: plain-text passwords are NOT secure.
      users.push({name,email,password,createdAt:new Date().toISOString()});

      if (!save("reliveDemoUsers",users)) {
        showMessage("authMessage","Unable to create demo account.",true);
        return;
      }

      form.reset();
      switchTab("login");
      $("loginEmail").value = email;
      showMessage("authMessage","Account created! Please login.");
    });

    $("loginForm").addEventListener("submit",event => {
      event.preventDefault();
      const email = $("loginEmail").value.trim().toLowerCase();
      const password = $("loginPassword").value;
      const users = read("reliveDemoUsers");
      const user = Array.isArray(users)
        ? users.find(u => u.email === email && u.password === password)
        : null;

      if (!user) {
        showMessage("authMessage","Incorrect email or password.",true);
        return;
      }

      try {
        sessionStorage.setItem("reliveDemoSession",JSON.stringify({email}));
        location.href = "dashboard.html";
      } catch {
        showMessage("authMessage","Unable to start demo session.",true);
      }
    });

    if (getUser()) {
      location.replace("dashboard.html");
    } else {
      switchTab(location.hash === "#signup" ? "signup" : "login");
    }
  }

  // Dashboard
  if ($("dashboardName")) {
    const user = getUser();
    $("dashboardName").textContent = user.name.trim().split(/\s+/)[0];

    const allDonations = read("reliveDonations");
    const donations = Array.isArray(allDonations)
      ? allDonations.filter(d => d.accountEmail === user.email)
      : [];

    $("donationCount").textContent = donations.length;
    $("noDonations").hidden = donations.length > 0;

    donations.slice().reverse().forEach(d => {
      const card = document.createElement("article");
      card.className = "step-card";

      const title = document.createElement("h3");
      title.textContent = d.clothingType || "Clothing Donation";
      const info = document.createElement("p");
      info.textContent =
        "Quantity: " + (d.quantity || "N/A") +
        " | Status: " + (d.status || "Submitted");
      const date = document.createElement("p");
      const parsed = new Date(d.date);
      date.textContent = Number.isNaN(parsed.getTime())
        ? "Date unavailable"
        : parsed.toLocaleDateString("en-IN");

      card.append(title,info,date);
      $("donationList").appendChild(card);
    });

    const favourites = read("reliveReuseFavorites");
    const favs = Array.isArray(favourites) ? favourites : [];
    $("favoriteCount").textContent = favs.length;
    $("noFavorites").hidden = favs.length > 0;

    favs.forEach(id => {
      const item = reuseIdeas.find(x => x.id === id);
      if (!item) return;

      const card = document.createElement("article");
      card.className = "step-card";
      const title = document.createElement("h3");
      title.textContent = item.title;
      const link = document.createElement("a");
      link.href = "reuse.html";
      link.className = "card-link";
      link.textContent = "Explore Tutorial →";
      card.append(title,link);
      $("favoriteList").appendChild(card);
    });

    const kit = read("reliveRepairKit");
    $("repairCount").textContent =
      (Array.isArray(kit) ? kit.length : 0) + " / 7";

    $("logoutButton").addEventListener("click", () => {
      sessionStorage.removeItem("reliveDemoSession");
      location.replace("login.html");
    });
  }
});
