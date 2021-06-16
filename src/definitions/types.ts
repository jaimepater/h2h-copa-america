export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface Item {
  id: number;
  name: string;
  logo?: string;
}

export interface Paging {
  current: number;
  total: number;
}

export interface Team {
  id: number;
  name: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
}

export interface ResponseTeams {
  team: Team;
  venue: Venue;
}

export interface Fixture {
  id: number;
  referee: string;
  timezone: string;
  date: Date;
  timestamp: number;
  periods: Periods;
  venue: Venue;
  status: Status;
}

export interface Periods {
  first?: number;
  second?: number;
}

export interface Status {
  long: string;
  short: string;
  elapsed?: number;
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag?: any;
  season: number;
  round: string;
}

export interface Home {
  id: number;
  name: string;
  logo: string;
  winner?: boolean;
}

export interface Away {
  id: number;
  name: string;
  logo: string;
  winner?: boolean;
}

export interface Teams {
  home: Home;
  away: Away;
}

export interface Goals {
  home?: number;
  away?: number;
}

export interface Halftime {
  home?: number;
  away?: number;
}

export interface Fulltime {
  home?: number;
  away?: number;
}

export interface Extratime {
  home?: any;
  away?: any;
}

export interface Penalty {
  home?: any;
  away?: any;
}

export interface Venue {
  id?: number;
  name: string;
  address: string;
  city: string;
  capacity?: number;
  surface: string;
  image: string;
}

export interface Score {
  halftime: Halftime;
  fulltime: Fulltime;
  extratime: Extratime;
  penalty: Penalty;
}

export interface FixtureResponse {
  fixture: Fixture;
  league: League;
  teams: Teams;
  goals: Goals;
  score: Score;
}

export interface Data<T> {
  get: string;
  errors: any[];
  results: number;
  paging: Paging;
  response: T;
}

export interface FootballApiResult<T> {
  data: Data<T>;
  status: number;
  statusText: string;
}

export interface PredictionsResponse {
  predictions: Predictions;
  league: League;
  teams: Teams;
  h2h: FixtureResponse[];
}

export interface Predictions {
  winner: Winner;
  // eslint-disable-next-line camelcase
  win_or_draw: boolean;
  // eslint-disable-next-line camelcase
  under_over: string;
  goals: Goals;
  advice: string;
  percent: Percent;
}

export interface Percent {
  home: string;
  draw: string;
  away: string;
}

export interface Winner {
  id: number;
  name: string;
  comment: string;
}
