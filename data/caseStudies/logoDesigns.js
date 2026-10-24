// Logo Designs: the gallery from sanjadevic.com/portfolio_page/logo-designs,
// in the same order. Each image carries its own client/year caption.
//
// TODO(Sanja): replace the numbered alt text with the client and project name
// for each logo (screen readers can't read the caption baked into the image).

const DIR = "/images/logo-designs";
const COUNT = 70;

const logos = Array.from({ length: COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { src: `${DIR}/logo-${n}.jpg`, width: 1200, height: 1200, alt: `Logo design ${i + 1} of ${COUNT}` };
});
logos[0].alt = "Sanja Devic signum: an SD monogram drawn as one line, white on pink";

export const logoDesigns = {
  slug: "logo-designs",
  eyebrow: "Identity",
  title: "Logo Designs",
  lede: "A selection of realized logo designs, created for clients all over the world.",
  meta: [
    { label: "Role", value: "Logo and identity designer" },
    { label: "Clients", value: "Serbia, USA, UK, Austria" },
    { label: "Years", value: "2006 – 2022" },
    { label: "Logos", value: String(COUNT) },
  ],
  explore: ["sample-project", "project-two"],
  sections: [
    {
      id: "logos",
      label: "Logos",
      title: "Selected logos",
      blocks: [{ type: "gallery", columns: 3, items: logos }],
    },
  ],
};
