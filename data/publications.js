// Publications, interviews and features, newest first. Rendered by
// app/publications. Content from sanjadevic.com/portfolio_page/publications-2.
// Images live in public/images/publications/ and need width and height.

const DIR = "/images/publications";

export const publications = [
  {
    id: "aperto-7",
    kind: "Interview",
    title: "Aperto Magazine",
    issue: "Issue 7, March 2020",
    publisher: "Art magazine of the Faculty of Arts Niš",
    description: "Interview with Aperto Magazine about my career as a designer and as an educator at the Faculty of Arts Niš.",
    cover: { src: `${DIR}/cover.jpg`, width: 991, height: 1403, alt: "Aperto Magazine issue 7 cover, with Sanja Devic's portrait" },
    spreads: [1, 2, 3, 4, 5].map((n) => ({
      src: `${DIR}/spread-${n}.jpg`,
      width: 1983,
      height: 1403,
      alt: `Aperto Magazine interview with Sanja Devic, spread ${n} of 5`,
    })),
  },
];
