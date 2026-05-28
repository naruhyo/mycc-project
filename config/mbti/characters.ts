import type { CharacterTriple, TypeCode } from "@/types/mbti";

export const mbtiCharacters: CharacterTriple = {
  ENFP: [
    { name: "나루토", work: "나루토 질풍전", emoji: "🍥🔥💨", comment: "무한한 에너지와 꿈으로 모두를 끌어당기는 바람개비" },
    { name: "루피", work: "원피스", emoji: "🏴‍☠️😄🍖", comment: "자유와 동료를 향한 거침없는 열정의 화신" },
    { name: "Anna", work: "겨울왕국", emoji: "❄️💛🌸", comment: "순수한 사랑과 낙천주의로 어둠도 녹여버리는 존재" },
  ],
  ENFJ: [
    { name: "All Might", work: "나의 히어로 아카데미아", emoji: "💪🌟😤", comment: "모두를 구하겠다는 신념으로 세대를 이끄는 영웅" },
    { name: "아이리스", work: "포켓몬스터 BW", emoji: "🐉🌿✨", comment: "다른 이의 성장을 진심으로 응원하는 따뜻한 선배" },
    { name: "Zuko", work: "아바타: 아앙의 전설", emoji: "🔥🌙🌊", comment: "고통을 딛고 진정한 리더로 성장한 귀감" },
  ],
  ENTP: [
    { name: "L", work: "데스노트", emoji: "🍰🔍🧠", comment: "어떤 규칙도 뒤집을 수 있다고 믿는 천재 탐정" },
    { name: "Edward Elric", work: "강철의 연금술사", emoji: "⚗️💢🔧", comment: "세상의 진리를 찾아 모든 것에 의문을 던지는 아이" },
    { name: "사스케", work: "나루토", emoji: "⚡🌑🗡️", comment: "기존 질서를 뒤집는 도발적인 반골 천재" },
  ],
  ENTJ: [
    { name: "에런 예거", work: "진격의 거인", emoji: "⛓️🌊🔥", comment: "압도적 의지로 역사의 흐름을 바꾸려는 비전가" },
    { name: "Roy Mustang", work: "강철의 연금술사", emoji: "🔥🎩💼", comment: "냉철한 전략과 카리스마로 정점을 향해 달려가는 리더" },
    { name: "Erwin Smith", work: "진격의 거인", emoji: "🦅📜💡", comment: "대의를 위해 모든 것을 내던지는 냉혹한 총지휘관" },
  ],
  ESFP: [
    { name: "제코", work: "원피스", emoji: "🦒🎵🎊", comment: "어디서든 파티를 만드는 세상에서 가장 긍정적인 남자" },
    { name: "Pinkie Pie", work: "마이 리틀 포니", emoji: "🎉🩷🎈", comment: "존재 자체가 축제인 에너지 과부하 파티 메이커" },
    { name: "Haruhi Suzumiya", work: "스즈미야 하루히의 우울", emoji: "⭐🔆🌀", comment: "일상에서 비일상을 창조하는 카오스의 중심" },
  ],
  ESFJ: [
    { name: "이노우에 오리히메", work: "블리치", emoji: "💛🌸🍙", comment: "모두를 보살피려는 따뜻한 마음이 힘이 되는 존재" },
    { name: "Tohru Honda", work: "후루츠 바스켓", emoji: "🍚💗🌻", comment: "무조건적인 사랑으로 상처 입은 마음을 치유하는 천사" },
    { name: "Winry Rockbell", work: "강철의 연금술사", emoji: "🔧💙🌟", comment: "사랑하는 사람의 상처를 자신의 손으로 고치려는 헌신" },
  ],
  ESTP: [
    { name: "바쿠고 카츠키", work: "나의 히어로 아카데미아", emoji: "💥🔥😤", comment: "폭발적인 본능과 압도적인 실력으로 최전선을 달리는 승부사" },
    { name: "Natsu Dragneel", work: "페어리 테일", emoji: "🔥🐉👊", comment: "생각보다 주먹이 먼저 나가는 즉흥 전투 중독자" },
    { name: "가프", work: "원피스", emoji: "✊💪🌊", comment: "어떤 상황도 두 주먹으로 해결하는 전설의 해군 영웅" },
  ],
  ESTJ: [
    { name: "Levi Ackerman", work: "진격의 거인", emoji: "🗡️🧹🌑", comment: "흔들리는 세상에서도 규율과 임무를 지키는 강철 조장" },
    { name: "Byakuya Kuchiki", work: "블리치", emoji: "🌸🧊👘", comment: "법과 자존심을 생명보다 소중히 여기는 귀족 대장" },
    { name: "Olivier Armstrong", work: "강철의 연금술사", emoji: "❄️⚔️🏰", comment: "냉혹한 명령과 철저한 책임으로 요새를 수호하는 장군" },
  ],
  INFP: [
    { name: "Frodo Baggins", work: "반지의 제왕", emoji: "💍🌄🕊️", comment: "작은 가슴 속에 세상을 구할 용기를 품은 순수한 영혼" },
    { name: "미도리야 이즈쿠", work: "나의 히어로 아카데미아", emoji: "💚🌀✨", comment: "누구도 포기하지 않겠다는 순수한 이상으로 영웅의 길을 걷는 소년" },
    { name: "Alphonse Elric", work: "강철의 연금술사", emoji: "⚗️💛🐱", comment: "자신을 잃어도 인간에 대한 믿음을 놓지 않는 따뜻함" },
  ],
  INFJ: [
    { name: "Itachi Uchiha", work: "나루토", emoji: "🌙🦅🌑", comment: "혼자 모든 짐을 지고 어둠 속에서 동생을 지킨 비전가" },
    { name: "Johan Liebert", work: "몬스터", emoji: "🥀🌙🪞", comment: "인간의 심연을 꿰뚫는 차갑고 심오한 거울" },
    { name: "Armin Arlert", work: "진격의 거인", emoji: "📖💡🌊", comment: "미래를 내다보는 전략과 희생으로 역사를 바꾼 이상주의자" },
  ],
  INTP: [
    { name: "L", work: "데스노트", emoji: "🍰🔎🧁", comment: "모든 것에 의문을 품고 답을 찾을 때까지 멈추지 않는 탐정" },
    { name: "Shikamaru Nara", work: "나루토", emoji: "🌤️🧩♟️", comment: "귀찮음을 원동력으로 최적의 해법을 찾는 천재 게으름뱅이" },
    { name: "Senku Ishigami", work: "Dr. STONE", emoji: "🔬⚗️🌿", comment: "과학으로 문명을 재건하는 10억점 두뇌의 소유자" },
  ],
  INTJ: [
    { name: "Light Yagami", work: "데스노트", emoji: "📓🍎✒️", comment: "완벽한 세계를 설계하려는 냉혹하고 철두철미한 전략가" },
    { name: "Levi Ackerman", work: "진격의 거인", emoji: "⚔️🌑🧊", comment: "감정을 통제하며 최고 효율로 임무를 수행하는 고독한 전사" },
    { name: "Vegeta", work: "드래곤볼Z", emoji: "👑⚡💢", comment: "오만하지만 치밀한 계획으로 자신의 한계를 끊임없이 갱신하는 자" },
  ],
  ISFP: [
    { name: "Mikasa Ackerman", work: "진격의 거인", emoji: "🧣⚔️❄️", comment: "말 없이 행동으로 사랑을 증명하는 조용한 수호자" },
    { name: "Kaneki Ken", work: "도쿄 구울", emoji: "☕📚🌑", comment: "상처받은 감수성으로 아름다움과 고통 사이를 걷는 예술가" },
    { name: "히무라 켄신", work: "바람의 검심", emoji: "🌸⚔️🌙", comment: "조용하지만 자신만의 신념을 위해 목숨을 거는 방랑자" },
  ],
  ISFJ: [
    { name: "Hinata Hyuga", work: "나루토", emoji: "💜🌸🌊", comment: "조용한 헌신과 응원으로 사랑하는 사람의 등불이 되는 존재" },
    { name: "Tohru Honda", work: "후루츠 바스켓", emoji: "🌷💞🏠", comment: "모두를 받아들이는 따뜻한 포용력으로 상처를 치유하는 천사" },
    { name: "Krillin", work: "드래곤볼", emoji: "🥚👊💛", comment: "평범한 힘으로도 소중한 사람을 지키려는 용감한 수호자" },
  ],
  ISTP: [
    { name: "Levi Ackerman", work: "진격의 거인", emoji: "⚔️🧹🌑", comment: "최소한의 말과 최대한의 실력으로 문제를 해결하는 달인" },
    { name: "Toph Beifong", work: "아바타: 아앙의 전설", emoji: "🪨🦶😏", comment: "규칙 따위는 모르고 오직 결과로 말하는 맹인 천재 전사" },
    { name: "로로노아 조로", work: "원피스", emoji: "🗡️🌿🥊", comment: "세계 최강을 향해 묵묵히 칼을 갈며 나아가는 고독한 검사" },
  ],
  ISTJ: [
    { name: "Erwin Smith", work: "진격의 거인", emoji: "📋🦅🌑", comment: "규율과 사명감으로 혼돈 속에서 체계를 세우는 총지휘관" },
    { name: "Byakuya Kuchiki", work: "블리치", emoji: "🌸❄️🎴", comment: "원칙과 책임을 위해 감정도 억누르는 엄격한 수호자" },
    { name: "Sasuke Uchiha", work: "나루토", emoji: "⚡🌑🦅", comment: "한번 세운 목표를 위해 흔들리지 않고 전진하는 집념의 화신" },
  ],
};
