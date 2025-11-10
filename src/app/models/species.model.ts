export interface Species {
  id?: number;
  name: string;
  powerLevel: number;
  specialSkill: string;
  victories?: number;
}

export interface BattleResult {
  id: number;
  winnerName: string;
  loserName: string;
  result: string;
  createdAt: string;
}



