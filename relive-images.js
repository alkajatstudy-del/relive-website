
/*
  RELIVE - Automatic Website Images
  Online images: Unsplash
  No local images folder required.
*/

document.addEventListener("DOMContentLoaded", function () {

  const images = {
    home: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",

    donate: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85",

    reuse: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85",

    repair: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=1400&q=85",

    recycle: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85"
  };

  const filename =
    window.location.pathname.split("/").pop().toLowerCase();

  const page = {
    "": "home",
    "index.html": "home",
    "donate.html": "donate",
    "reuse.html": "reuse",
    "repair.html": "repair",
    "recycle.html": "recycle"
  }[filename];

  if (!page) return;

  const imageURL = images[page];

  // Prefer replacing existing hero image instead of
  // creating a duplicate.
  const hero = document.querySelector(
    ".hero, .hero-section, .donate-hero, " +
    ".reuse-hero, .repair-hero, .page-hero"
  );

  if (!hero) {
    console.warn("RELIVE: Hero section not found.");
    return;
  }

  const heroImage = hero.querySelector("img");

  if (heroImage) {
    heroImage.src = imageURL;
    heroImage.removeAttribute("srcset");
    heroImage.removeAttribute("sizes");
    heroImage.loading = "eager";

    heroImage.alt = {
      home: "RELIVE sustainable fashion",
      donate: "Clothing collection for donation",
      reuse: "Clothing for creative reuse",
      repair: "Clothing repair and care",
      recycle: "Sustainable clothing"
    }[page];

    heroImage.style.display = "block";
    heroImage.style.width = "100%";
    heroImage.style.height = "100%";
    heroImage.style.objectFit = "cover";

    console.log("RELIVE hero image added:", page);
    return;
  }

  // For hero sections without an img tag,
  // use a background image only if the hero
  // already uses a CSS background image.
  const currentBackground =
    window.getComputedStyle(hero).backgroundImage;

  if (currentBackground !== "none") {
    hero.style.backgroundImage =
      'linear-gradient(rgba(16,43,35,.52), ' +
      'rgba(16,43,35,.65)), url("' + imageURL + '")';

    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";

    console.log("RELIVE background image added:", page);
    return;
  }

  // Otherwise add a photo panel to the hero
  // without deleting its existing content.
  const photo = document.createElement("div");
  photo.className = "relive-auto-photo";
  photo.setAttribute("role", "img");
  photo.setAttribute(
    "aria-label",
    "RELIVE sustainable clothing photograph"
  );

  photo.style.backgroundImage = 'url("' + imageURL + '")';

  const target =
    hero.querySelector(".hero-grid, .hero-container, .hero-inner") ||
    hero;

  target.appendChild(photo);

  console.log("RELIVE photo panel added:", page);

});
