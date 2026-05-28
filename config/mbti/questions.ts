import type { Question } from "@/types/mbti";

export const TOTAL_QUESTIONS = 12;

export const questions: Question[] = [
  {
    id: 1,
    prompt: "주말 약속이 갑자기 취소됐다. 나는?",
    choices: [
      { label: "바로 다른 친구에게 연락해 새 약속을 잡는다", dimension: "EI", value: "E", weight: 1 },
      { label: "혼자 집에서 쉬며 재충전한다", dimension: "EI", value: "I", weight: 1 },
    ],
  },
  {
    id: 2,
    prompt: "새 카페를 고를 때 나는?",
    choices: [
      { label: "인스타그램 후기와 메뉴 사진을 꼼꼼히 비교하고 간다", dimension: "SN", value: "S", weight: 1 },
      { label: "\"분위기 좋을 것 같은\" 곳을 감으로 선택한다", dimension: "SN", value: "N", weight: 1 },
    ],
  },
  {
    id: 3,
    prompt: "친구가 고민을 털어놓을 때 나는?",
    choices: [
      { label: "상황을 분석하고 실질적인 해결책을 제안한다", dimension: "TF", value: "T", weight: 1 },
      { label: "\"많이 힘들었겠다\"며 감정에 먼저 공감한다", dimension: "TF", value: "F", weight: 1 },
    ],
  },
  {
    id: 4,
    prompt: "여행 전날, 나의 짐 싸기는?",
    choices: [
      { label: "체크리스트대로 미리 다 챙겨뒀다", dimension: "JP", value: "J", weight: 1 },
      { label: "출발 1시간 전에 대충 던져 넣는다", dimension: "JP", value: "P", weight: 1 },
    ],
  },
  {
    id: 5,
    prompt: "새로운 모임에 참석했을 때 나는?",
    choices: [
      { label: "먼저 다가가 여러 사람과 대화를 나눈다", dimension: "EI", value: "E", weight: 1 },
      { label: "아는 사람을 찾거나 조용히 분위기를 파악한다", dimension: "EI", value: "I", weight: 1 },
    ],
  },
  {
    id: 6,
    prompt: "여행 계획을 세울 때 나는?",
    choices: [
      { label: "시간대별 일정과 맛집 예약까지 미리 정한다", dimension: "SN", value: "S", weight: 1 },
      { label: "목적지만 정하고 즉흥으로 돌아다닌다", dimension: "SN", value: "N", weight: 1 },
    ],
  },
  {
    id: 7,
    prompt: "팀 프로젝트에서 의견 충돌이 생길 때 나는?",
    choices: [
      { label: "데이터와 논리로 최선의 방향을 설득한다", dimension: "TF", value: "T", weight: 1 },
      { label: "모두가 만족하는 타협점을 찾으려 한다", dimension: "TF", value: "F", weight: 1 },
    ],
  },
  {
    id: 8,
    prompt: "할 일 목록을 대하는 나의 태도는?",
    choices: [
      { label: "우선순위를 정해 하나씩 완료 표시하며 처리한다", dimension: "JP", value: "J", weight: 1 },
      { label: "머릿속에 있지만 기분에 따라 순서를 바꿔가며 한다", dimension: "JP", value: "P", weight: 1 },
    ],
  },
  {
    id: 9,
    prompt: "일이 잘 풀리지 않을 때 나는?",
    choices: [
      { label: "친구나 동료에게 이야기하며 기운을 되찾는다", dimension: "EI", value: "E", weight: 1 },
      { label: "혼자 생각을 정리하고 마음을 다잡는다", dimension: "EI", value: "I", weight: 1 },
    ],
  },
  {
    id: 10,
    prompt: "영화를 볼 때 더 좋아하는 것은?",
    choices: [
      { label: "현실감 있는 묘사와 세밀한 디테일이 살아있는 영화", dimension: "SN", value: "S", weight: 1 },
      { label: "세계관이 방대하고 상징·은유가 가득한 영화", dimension: "SN", value: "N", weight: 1 },
    ],
  },
  {
    id: 11,
    prompt: "중요한 결정을 내릴 때 나는?",
    choices: [
      { label: "장단점을 적어보고 객관적으로 따진다", dimension: "TF", value: "T", weight: 1 },
      { label: "내가 어떻게 느끼는지, 주변 사람은 어떻게 생각하는지를 본다", dimension: "TF", value: "F", weight: 1 },
    ],
  },
  {
    id: 12,
    prompt: "갑작스럽게 일정이 바뀌면 나는?",
    choices: [
      { label: "당황스럽지만 빠르게 새 계획을 짜기 시작한다", dimension: "JP", value: "J", weight: 1 },
      { label: "오히려 새로운 가능성이 열린 것 같아 설레기도 한다", dimension: "JP", value: "P", weight: 1 },
    ],
  },
];
