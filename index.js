import { list, more, ul, li, a } from "./elements.js";

const IO = "katai5plate.github.io";
const PER = 100;

const regexUrl =
  /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const findUrl = (x) => {
  if (x.homepage?.match("katai5plate.github.io")) return x.homepage;
  if (regexUrl.test(x.description)) {
    const url = x.description.match(regexUrl)?.[0] ?? "";
    if (url.match(IO)) return url;
  }
  return null;
};

const main = async (offset = 0) => {
  try {
    const res = await (
      await fetch(
        `https://api.github.com/users/katai5plate/repos?per_page=${PER}&page=${
          offset + 1
        }`
      )
    ).json();
    console.log(res);
    if (res.length) {
      list.innerHTML = ul(
        res
          .filter((x) => findUrl(x))
          .map((x) => li([a(findUrl(x), x.name), ul([li([x.description])])]))
      );
    } else {
      list.innerHTML = `<p>いや、ないよ。</p>`;
      more.remove();
    }
  } catch (error) {
    list.innerHTML = `<h2>エラーが発生しました</h2><pre>${error}\n${JSON.stringify(
      error
    )}\n${error.toString()}</pre>`;
  }
};

main();

let count = 0;

more.onclick = () => {
  count++;
  main(count);
};
