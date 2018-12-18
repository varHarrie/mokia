import dayjs from 'dayjs'

export const MOCKABLE = Symbol('MOCKABLE')

export const MAX_INTEGER = 9007199254740992

export const GOLDEN_RATIO_CONJUGATE = 0.618033988749895

export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_FORMAT = 'HH:mm:ss'
export const MIN_DATE = new Date(0) // 1970-01-01
export const MAX_DATE = dayjs().add(10, 'year').toDate() // 10 years later

export const SYMBOLS = '!@#$%^&*()-_=+[]{}<>'
export const NUMBERS = '0123456789'
export const POSITIVE_INTEGERS = '123456789'
export const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz'
export const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const LETTERS = LOWERCASE_LETTERS + UPPERCASE_LETTERS

export const pools = {
  symbol: SYMBOLS,
  number: NUMBERS,
  positive: POSITIVE_INTEGERS,
  lower: LOWERCASE_LETTERS,
  upper: UPPERCASE_LETTERS,
  letter: LETTERS,
  word:  NUMBERS + LETTERS,
  username: NUMBERS + LETTERS + '_-',
  all: NUMBERS + LETTERS + SYMBOLS
}

// @references
// https://zh.wikipedia.org/wiki/%E7%BB%9F%E4%B8%80%E8%B5%84%E6%BA%90%E5%AE%9A%E4%BD%8D%E7%AC%A6
// https://tools.ietf.org/html/rfc1738#section-3
export const PROTOCOLS = 'ftp http https gopher mailto news nntp telnet wais file prosperos'

// @references
// https://zh.wikipedia.org/wiki/%E9%80%9A%E7%94%A8%E9%A0%82%E7%B4%9A%E5%9F%9F
// https://zh.wikipedia.org/wiki/%E5%9B%BD%E9%99%85%E5%8C%96%E5%9F%9F%E5%90%8D
export const TLDS =
  // gTLD
  'com info net org xyz biz name pro aero asia cat coop edu gov int jobs mil mobi museum post tel travel xxx' +
  // IDN
  'ac ad ae af ag ai al am ao aq ar as at au aw ax az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bw by bz ca cc cd cf cg ch ci ck cl cm cn co cr cu cv cw cx cy cz de dj dk dm do dz ec ee eg er es et eu fi fj fk fm fo fr ga gd ge gf gg gh gi gl gm gn gp gq gr gs gt gu gw gy hk hm hn hr ht hu id ie il im in io iq ir is it je jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md me mg mh mk ml mm mn mo mp mq mr ms mt mu mv mw mx my mz na nc ne nf ng ni nl no np nr nu nz om pa pe pf pg ph pk pl pm pn pr ps pt pw py qa re ro rs ru rw sa sb sc sd se sg sh si sk sl sm sn so sr ss st su sv sx sy sz tc td tf tg th tj tk tl tm tn to tr tt tv tw tz ua ug uk us uy uz va vc ve vg vi vn vu wf ws ye yt za zm zw'
