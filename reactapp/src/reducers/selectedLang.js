export default function (selectedLang = "fr", action) {
  if (action.type == "changeLang") {
    return action.selectedLang;
  } else if (action.type == "reset") {
    return "fr";
  } else {
    return selectedLang;
  }
}
