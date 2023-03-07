// Кнопка назад (если в контексте есть куда вернуться то идем нативно, либо идем в extraPath)
// extraPath -> роут в который надо вернуться если у пользователя нет истории
const goBack = ({router, context}, extraPath) => {
  if (context.from && router.currentRoute.name !== context.from.name && context.from.name !== "login") router.go(-1);
  else if (extraPath.startsWith("http")) window.location.href = extraPath;
  else router.push(extraPath);
}

export default function ({app}, inject) {
  inject("goBack", extraPath => goBack(app, extraPath))
  inject("isMobile", window.innerWidth < 800);
}
