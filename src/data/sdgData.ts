export interface SDGScore {
  id: number;
  name: string;
  score: number;
  trend: 'improving' | 'stable' | 'declining';
  color: string;
}

export interface CountryData {
  name: string;
  code: string;
  flag: string;
  overallScore: number;
  sdgs: SDGScore[];
  rank: number;
}

export const SDG_GOALS = [
  { id: 1, name: "No Poverty", color: "#E5243B" },
  { id: 2, name: "Zero Hunger", color: "#DDA63A" },
  { id: 3, name: "Good Health", color: "#4C9F38" },
  { id: 4, name: "Quality Education", color: "#C5192D" },
  { id: 5, name: "Gender Equality", color: "#FF3A21" },
  { id: 6, name: "Clean Water", color: "#26BDE2" },
  { id: 7, name: "Affordable Energy", color: "#FCC30B" },
  { id: 8, name: "Decent Work", color: "#A21942" },
  { id: 9, name: "Industry Innovation", color: "#FD6925" },
  { id: 10, name: "Reduced Inequalities", color: "#DD1367" },
  { id: 11, name: "Sustainable Cities", color: "#FD9D24" },
  { id: 12, name: "Responsible Consumption", color: "#BF8B2E" },
  { id: 13, name: "Climate Action", color: "#3F7E44" },
  { id: 14, name: "Life Below Water", color: "#0A97D9" },
  { id: 15, name: "Life on Land", color: "#56C02B" },
  { id: 16, name: "Peace and Justice", color: "#00689D" },
  { id: 17, name: "Partnerships", color: "#19486A" }
];

export const SAMPLE_COUNTRIES: CountryData[] = [
  {
    name: "Finland",
    code: "FI",
    flag: "🇫🇮",
    overallScore: 86.5,
    rank: 1,
    sdgs: SDG_GOALS.map((goal, idx) => ({
      ...goal,
      score: 75 + Math.random() * 20,
      trend: idx % 3 === 0 ? 'improving' : idx % 3 === 1 ? 'stable' : 'declining'
    }))
  },
  {
    name: "Sweden",
    code: "SE",
    flag: "🇸🇪",
    overallScore: 85.2,
    rank: 2,
    sdgs: SDG_GOALS.map((goal, idx) => ({
      ...goal,
      score: 74 + Math.random() * 20,
      trend: idx % 3 === 0 ? 'improving' : idx % 3 === 1 ? 'stable' : 'declining'
    }))
  },
  {
    name: "Denmark",
    code: "DK",
    flag: "🇩🇰",
    overallScore: 84.8,
    rank: 3,
    sdgs: SDG_GOALS.map((goal, idx) => ({
      ...goal,
      score: 73 + Math.random() * 20,
      trend: idx % 3 === 0 ? 'improving' : idx % 3 === 1 ? 'stable' : 'declining'
    }))
  },
  {
    name: "India",
    code: "IN",
    flag: "🇮🇳",
    overallScore: 66.3,
    rank: 120,
    sdgs: SDG_GOALS.map((goal, idx) => ({
      ...goal,
      score: 50 + Math.random() * 35,
      trend: idx % 3 === 0 ? 'improving' : idx % 3 === 1 ? 'stable' : 'declining'
    }))
  },
  {
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    overallScore: 76.4,
    rank: 32,
    sdgs: SDG_GOALS.map((goal, idx) => ({
      ...goal,
      score: 65 + Math.random() * 25,
      trend: idx % 3 === 0 ? 'improving' : idx % 3 === 1 ? 'stable' : 'declining'
    }))
  }
];

export function getScoreColor(score: number): string {
  if (score >= 75) return 'text-green-400';
  if (score >= 50) return 'text-yellow-400';
  return 'text-red-400';
}

export function getScoreStatus(score: number): string {
  if (score >= 75) return 'Achieved';
  if (score >= 50) return 'Progressing';
  return 'Lagging';
}
