import { Goals } from '../definitions/types';

export const getGoals = (goals: Goals) => `${goals.home}-${goals.away}`;
